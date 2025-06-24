const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET todas las categorías activas
router.get('/', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM categories WHERE status = 1');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST nueva categoría
router.post('/', async (req, res) => {
  try {
    const { name, description, type } = req.body;
    const [result] = await pool.query(
      'INSERT INTO categories (name, description, type, status) VALUES (?, ?, ?, 1)',
      [name, description, type]
    );
    res.status(201).json({ message: 'Categoría creada', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT actualizar categoría
router.put('/:id', async (req, res) => {
  try {
    const { name, description, type } = req.body;
    await pool.query(
      'UPDATE categories SET name=?, description=?, type=? WHERE id=?',
      [name, description, type, req.params.id]
    );
    res.json({ message: 'Categoría actualizada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE desactivar categoría
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('UPDATE categories SET status = 0 WHERE id = ?', [req.params.id]);
    res.json({ message: 'Categoría eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
