const express = require('express');
const router  = express.Router();
const pool    = require('../db');
const registrarMovimiento = require('../utils/movimientos');

// GET departamentos activos
router.get('/', async (req, res) => {
  try {
    const [departments] = await pool.query(`
      SELECT id, name, Abbreviation AS abbreviation, description, department_head, status
      FROM departments WHERE status = 1
    `);
    res.json(departments);
  } catch (err) {
    console.error('Error al obtener departamentos:', err);
    res.status(500).json({ message: err.message });
  }
});

// POST crear departamento
router.post('/', async (req, res) => {
  const { name, abbreviation, description, department_head } = req.body;
  const userId = req.user?.id || 1; // temporal: usar 1 si no hay auth
  try {
    const [result] = await pool.query(
      'INSERT INTO departments (name, `Abbreviation`, description, department_head, status) VALUES (?, ?, ?, ?, 1)',
      [name, abbreviation, description, department_head]
    );
    await registrarMovimiento({
      table: 'departments',
      type: 1,
      objectId: result.insertId,
      userId,
      before: null,
      after: { name, abbreviation, description, department_head, status: 1 }
    });
    res.status(201).json({ message: 'Departamento creado exitosamente' });
  } catch (err) {
    console.error('Error al crear departamento:', err);
    res.status(500).json({ message: err.message });
  }
});

// PUT actualizar departamento
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, abbreviation, description, department_head } = req.body;
  const userId = req.user?.id || 1;
  try {
    const [rows] = await pool.query('SELECT * FROM departments WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ message: 'Departamento no encontrado' });

    const before = rows[0];
    const [result] = await pool.query(
      'UPDATE departments SET name = ?, `Abbreviation` = ?, description = ?, department_head = ? WHERE id = ?',
      [name, abbreviation, description, department_head, id]
    );

    await registrarMovimiento({
      table: 'departments',
      type: 2,
      objectId: parseInt(id),
      userId,
      before,
      after: { name, abbreviation, description, department_head }
    });

    res.json({ message: 'Departamento actualizado exitosamente' });
  } catch (err) {
    console.error('Error al actualizar departamento:', err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE lógico
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id || 1;
  try {
    const [rows] = await pool.query('SELECT * FROM departments WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ message: 'Departamento no encontrado' });

    const before = rows[0];
    await pool.query('UPDATE departments SET status = 0 WHERE id = ?', [id]);

    await registrarMovimiento({
      table: 'departments',
      type: 3,
      objectId: parseInt(id),
      userId,
      before,
      after: null
    });

    res.json({ message: 'Departamento eliminado (status=0)' });
  } catch (err) {
    console.error('Error al eliminar departamento:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
