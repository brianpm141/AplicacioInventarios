const cron = require('node-cron');
const mysqldump = require('mysqldump');
const fs = require('fs');
const path = require('path');
const pool = require('../db');

const BACKUP_DIR = path.join(__dirname, '..', 'backups');
if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });

let currentTask = null;

async function ejecutarRespaldo(config) {
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
    console.log(`[AUTO-BACKUP] Respaldo generado: ${fileName}`);
  } catch (err) {
    console.error('[AUTO-BACKUP] Error:', err);
  }
}

function obtenerExpresionCron(config) {
  const [hora, minutos] = config.hora.split(':');
  switch (config.tipo) {
    case 'diario':
      return `${minutos} ${hora} * * *`;
    case 'semanal':
      const dias = {
        'Domingo': 0, 'Lunes': 1, 'Martes': 2, 'Miércoles': 3,
        'Jueves': 4, 'Viernes': 5, 'Sábado': 6
      };
      return `${minutos} ${hora} * * ${dias[config.dia_semana]}`;
    case 'mensual':
      return `${minutos} ${hora} ${config.dia_mes} * *`;
    case 'anual':
      const mesNumero = {
        'Enero': 1, 'Febrero': 2, 'Marzo': 3, 'Abril': 4,
        'Mayo': 5, 'Junio': 6, 'Julio': 7, 'Agosto': 8,
        'Septiembre': 9, 'Octubre': 10, 'Noviembre': 11, 'Diciembre': 12
      };
      return `${minutos} ${hora} 1 ${mesNumero[config.mes_anual]} *`;
    default:
      return null;
  }
}

async function reiniciarCron() {
  try {
    const [rows] = await pool.query('SELECT * FROM backup_config WHERE status = 1 LIMIT 1');
    const config = rows[0];
    if (!config) {
      console.warn('[CRON] No hay configuración activa.');
      return;
    }

    const cronExp = obtenerExpresionCron(config);
    if (!cronExp) {
      console.warn('[CRON] Expresión no válida.');
      return;
    }

    if (currentTask) currentTask.stop();

    currentTask = cron.schedule(cronExp, () => ejecutarRespaldo(config), {
      timezone: 'America/Mexico_City'
    });

    console.log(`[CRON] Tarea programada con expresión: "${cronExp}"`);
  } catch (err) {
    console.error('[CRON] Error al reiniciar:', err);
  }
}

module.exports = {
  iniciarCronAutomatico: reiniciarCron,
  reiniciarCron // alias para usarlo después de guardar config
};
