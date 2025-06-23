const express = require('express');
const router = express.Router();
const pool = require('../db');
const { reiniciarCron } = require('../cron/autoBackup');

// Obtener configuración activa
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM backup_config WHERE status = 1 LIMIT 1');
    res.json(rows[0] || null);
  } catch (err) {
    console.error('Error al obtener config:', err);
    res.status(500).json({ error: 'Error al obtener configuración' });
  }
});

// Guardar o actualizar configuración
router.post('/', async (req, res) => {
  const { tipo, diaSemana, diaMes, mesAnual, hora } = req.body;

  try {
    // Eliminar configuraciones anteriores activas
    await pool.query('UPDATE backup_config SET status = 0 WHERE status = 1');

    // Insertar nueva configuración
    await pool.query(`
      INSERT INTO backup_config (tipo, dia_semana, dia_mes, mes_anual, hora, status)
      VALUES (?, ?, ?, ?, ?, 1)
    `, [tipo, diaSemana || null, diaMes || null, mesAnual || null, hora]);

    res.json({ message: 'Configuración guardada correctamente' });
    
    await reiniciarCron();
  } catch (err) {
    console.error('Error al guardar configuración:', err);
    res.status(500).json({ error: 'Error al guardar configuración' });
  }
});

module.exports = router;
