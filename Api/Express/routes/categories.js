const express = require('express');
const router = express.Router();
const pool = require('../db');
const registrarMovimiento = require('../utils/movimientos');

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
  const { name, description, type } = req.body;
  const userId = req.user?.id || 1; // temporal
  try {
    const [result] = await pool.query(
      'INSERT INTO categories (name, description, type, status) VALUES (?, ?, ?, 1)',
      [name, description, type]
    );

    await registrarMovimiento({
      table: 'categories',
      type: 1,
      objectId: result.insertId,
      userId,
      before: null,
      after: { name, description, type, status: 1 }
    });

    res.status(201).json({ message: 'Categoría creada', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT actualizar categoría
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, type } = req.body;
  const userId = req.user?.id || 1;
  try {
    const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ message: 'Categoría no encontrada' });

    const before = rows[0];

    await pool.query(
      'UPDATE categories SET name=?, description=?, type=? WHERE id=?',
      [name, description, type, id]
    );

    await registrarMovimiento({
      table: 'categories',
      type: 2,
      objectId: parseInt(id),
      userId,
      before,
      after: { name, description, type }
    });

    res.json({ message: 'Categoría actualizada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE desactivar categoría
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id || 1;
  try {
    const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ message: 'Categoría no encontrada' });

    const before = rows[0];

    await pool.query('UPDATE categories SET status = 0 WHERE id = ?', [id]);

    await registrarMovimiento({
      table: 'categories',
      type: 3,
      objectId: parseInt(id),
      userId,
      before,
      after: null
    });

    res.json({ message: 'Categoría eliminada (status=0)' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
