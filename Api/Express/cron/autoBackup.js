const cron = require('node-cron');
const mysqldump = require('mysqldump');
const fs = require('fs');
const path = require('path');
const pool = require('../db');

const BACKUP_DIR = path.join(__dirname, '..', 'backups');
if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });

async function programarRespaldo() {
  try {
    const [configRows] = await pool.query('SELECT * FROM backup_config WHERE status = 1 LIMIT 1');
    const config = configRows[0];
    if (!config) return;

    const [hora, minutos] = config.hora.split(':');
    let expresion = '';

    switch (config.tipo) {
      case 'diario':
        expresion = `${minutos} ${hora} * * *`;
        break;
      case 'semanal':
        const dias = {
          'Domingo': 0, 'Lunes': 1, 'Martes': 2, 'Miércoles': 3,
          'Jueves': 4, 'Viernes': 5, 'Sábado': 6
        };
        expresion = `${minutos} ${hora} * * ${dias[config.dia_semana]}`;
        break;
      case 'mensual':
        expresion = `${minutos} ${hora} ${config.dia_mes} * *`;
        break;
      case 'anual':
        const mesNumero = {
          'Enero': 1, 'Febrero': 2, 'Marzo': 3, 'Abril': 4,
          'Mayo': 5, 'Junio': 6, 'Julio': 7, 'Agosto': 8,
          'Septiembre': 9, 'Octubre': 10, 'Noviembre': 11, 'Diciembre': 12
        };
        expresion = `${minutos} ${hora} 1 ${mesNumero[config.mes_anual]} *`;
        break;
      default:
        console.warn('Tipo de respaldo no reconocido');
        return;
    }

    console.log('Tarea programada con cron:', expresion);

    cron.schedule(expresion, async () => {
      const fileName = `auto_backup_${Date.now()}.sql`;
      const filePath = path.join(BACKUP_DIR, fileName);
      try {
        await mysqldump({
          connection: {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT || 3306),
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
          },
          dumpToFile: filePath,
        });

        await pool.query('UPDATE backup_config SET ultimo_respaldo = NOW() WHERE id = ?', [config.id]);
        console.log('Respaldo automático generado:', fileName);
      } catch (err) {
        console.error('Error generando respaldo automático:', err);
      }
    }, {
      timezone: 'America/Mexico_City'
    });

  } catch (err) {
    console.error('Error cargando configuración de respaldo:', err);
  }
}

module.exports = { programarRespaldo };
