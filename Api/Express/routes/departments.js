const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los departamentos (ya lo tienes)
router.get('/', (req, res) => {
  db.query('SELECT * FROM departments where status = 1', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Agregar nuevo departamento (NUEVO)
router.post('/', (req, res) => {
  const { name, description, department_head } = req.body;

  // Puedes agregar validación aquí si deseas

  const sql = 'INSERT INTO departments (name, description, department_head, status) VALUES (?, ?, ?, 1)';
  db.query(sql, [name, description, department_head], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    
    res.status(201).json({ message: 'Departamento creado correctamente', id: result.insertId });
  });
});

app.delete('/departments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await connection.query('UPDATE departments SET status = 0 WHERE id = ?', [id]);
    res.status(200).json({ message: 'Departamento eliminado (soft delete)' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error eliminando el departamento' });
  }
});


module.exports = router;
