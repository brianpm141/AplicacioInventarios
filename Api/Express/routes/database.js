require('dotenv').config();
const express = require('express');
const mysqldump = require('mysqldump');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pool = require('../db');
const router = express.Router();

// Directorios
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
const BACKUP_DIR = path.join(__dirname, '..', 'backups');
[UPLOAD_DIR, BACKUP_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Multer para RESTORE
const upload = multer({ dest: UPLOAD_DIR });

/**
 * GET /api/database/export - Genera backup
 */
router.get('/export', async (req, res) => {
  const fileName = `backup_${Date.now()}.sql`;
  const filePath = path.join(BACKUP_DIR, fileName);
  console.log('Export DB -- HOST:', process.env.DB_HOST, 'PORT:', process.env.DB_PORT);

  try {
    // 1. Verificar conexión
    const conn = await pool.getConnection();
    await conn.query('SELECT 1');
    conn.release();

    // 2. Dump callback-based (v2.x)
    mysqldump(
      {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 3306),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        dest: filePath,
        addDropTable: true,
        addLocks: true,
        singleTransaction: false
      },
      (err) => {
        if (err) {
          console.error('Error en mysqldump:', err);
          return res.status(500).json({ error: 'Error generando backup', details: err.message });
        }

        // 3. Verificar archivo
        if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) {
          console.error('Backup no generado o vacío');
          return res.status(500).json({ error: 'Backup no generado o vacío' });
        }

        // 4. Enviar archivo
        res.setHeader('Content-Type', 'application/sql');
        res.setHeader('Content-Disposition', 'attachment; filename=backup.sql');
        const stream = fs.createReadStream(filePath);
        stream.pipe(res);
        stream.on('close', () => fs.unlink(filePath, () => {}));
        stream.on('error', (streamErr) => {
          console.error('Error envío backup:', streamErr);
          fs.unlink(filePath, () => {});
          res.status(500).end();
        });
      }
    );
  } catch (err) {
    console.error('Error backup:', err);
    res.status(500).json({ error: 'Error generando backup', details: err.message });
  }
});

/**
 * POST /api/database/restore - Restaura backup
 */
router.post('/restore', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se recibió archivo de backup' });
  }

  try {
    const sql = fs.readFileSync(req.file.path, 'utf8');
    fs.unlinkSync(req.file.path);

    const conn = await pool.getConnection();
    try {
      await conn.query('SET FOREIGN_KEY_CHECKS = 0');

      // Eliminar todas las tablas existentes
      const [tables] = await conn.query("SHOW TABLES");
      const tableNames = tables.map((row) => Object.values(row)[0]);
      for (const table of tableNames) {
        await conn.query(`DROP TABLE IF EXISTS \`${table}\``);
      }

      // Ejecutar el script del respaldo
      await conn.query(sql);

      await conn.query('SET FOREIGN_KEY_CHECKS = 1');
    } finally {
      conn.release();
    }

    res.json({ message: 'Base de datos restaurada exitosamente' });
  } catch (err) {
    console.error('Error restaurar:', err);
    res.status(500).json({ error: 'Error restaurando backup', details: err.message });
  }
});


module.exports = router;