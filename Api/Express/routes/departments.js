const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET departamentos activos
router.get('/', (req, res) => {
  pool.query('SELECT * FROM departments WHERE status = 1', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error al obtener departamentos' });
    }
    res.json(results);
  });
});

// POST crear departamento
router.post('/', (req, res) => {
  const { name, description, department_head } = req.body;
  pool.query(
    'INSERT INTO departments (name, description, department_head, status) VALUES (?, ?, ?, 1)',
    [name, description, department_head],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al crear departamento' });
      }
      res.status(201).json({ message: 'Departamento creado exitosamente' });
    }
  );
});

// PUT actualizar departamento (opcional si lo necesitas después)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, department_head } = req.body;
  pool.query(
    'UPDATE departments SET name = ?, description = ?, department_head = ? WHERE id = ?',
    [name, description, department_head, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al actualizar el departamento' });
      }
      res.json({ message: 'Departamento actualizado correctamente' });
    }
  );
});

// PUT soft delete departamento
router.put('/:id/delete', (req, res) => {
  const { id } = req.params;
  pool.query('UPDATE departments SET status = 0 WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error al eliminar el departamento' });
    }
    res.json({ message: 'Departamento eliminado' });
  });
});

// DELETE eliminación física (opcional si realmente lo necesitas)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM departments WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error al eliminar el departamento de forma permanente' });
    }
    res.json({ message: 'Departamento eliminado permanentemente' });
  });
});

module.exports = router;
