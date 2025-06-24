const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET todas las categorías activas
router.get('/', (req, res) => {
  pool.query('SELECT * FROM categories WHERE status = 1', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST nueva categoría
router.post('/', (req, res) => {
  const { name, description, type } = req.body;
  pool.query(
    'INSERT INTO categories (name, description, type, status) VALUES (?, ?, ?, 1)',
    [name, description, type],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Categoría creada', id: result.insertId });
    }
  );
});

// PUT actualizar categoría
router.put('/:id', (req, res) => {
  const { name, description, type } = req.body;
  pool.query(
    'UPDATE categories SET name=?, description=?, type=? WHERE id=?',
    [name, description, type, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Categoría actualizada' });
    }
  );
});

// DELETE desactivar categoría
router.delete('/:id', (req, res) => {
  pool.query(
    'UPDATE categories SET status = 0 WHERE id = ?',
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Categoría eliminada' });
    }
  );
});

module.exports = router;
