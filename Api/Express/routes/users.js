const express = require('express');
const router  = express.Router();
const pool    = require('../db');

// (1) Obtener todos los usuarios activos
router.get('/', (req, res) => {
  const sql = `
    SELECT u.id,
           u.name     AS nombre,
           u.last_name AS apellidos,
           u.username AS usuario,
           d.name     AS departamento,
           IF(u.role = 1, 'Usuario', 'Administrador') AS rol
    FROM users u
    JOIN departments d ON u.department_id = d.id
    WHERE u.status = 1
    ORDER BY u.id DESC
  `;
  pool.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
});

// (2) Obtener 1 usuario por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  pool.query(
    `SELECT * FROM users WHERE id = ? AND status = 1`,
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      if (!results.length) return res.status(404).json({ message: 'Usuario no encontrado' });
      res.json(results[0]);
    }
  );
});

// (3) Crear usuario
router.post('/', (req, res) => {
  const { nombre, apellidos, usuario, departamento_id, rol, contrasena } = req.body;
  // Aquí deberías hashear la contraseña y crear la entrada en passwords…
  const sql = `
    INSERT INTO users (name, last_name, username, department_id, role, status)
    VALUES (?, ?, ?, ?, ?, 1)
  `;
  pool.query(
    sql,
    [nombre, apellidos, usuario, departamento_id, rol],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json({ id: result.insertId, ...req.body });
    }
  );
});

// (4) Actualizar usuario
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, apellidos, usuario, departamento_id, rol } = req.body;
  const sql = `
    UPDATE users
       SET name = ?, last_name = ?, username = ?, department_id = ?, role = ?
     WHERE id = ? AND status = 1
  `;
  pool.query(
    sql,
    [nombre, apellidos, usuario, departamento_id, rol, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado o inactivo' });
      res.json({ id: Number(id), ...req.body });
    }
  );
});

// (5) “Eliminar” usuario (soft delete)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  pool.query(
    `UPDATE users SET status = 0 WHERE id = ?`,
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
      res.status(204).send();
    }
  );
});

module.exports = router;
