// routes/departments.js
const express = require('express');
const router  = express.Router();
const pool    = require('../db'); // Promise-based mysql2 pool

// GET departamentos activos, alias Abbreviation → abbreviation
router.get('/', async (req, res) => {
  try {
    const [departments] = await pool.query(`
      SELECT
        id,
        name,
        Abbreviation AS abbreviation,
        description,
        department_head,
        status
      FROM departments
      WHERE status = 1
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
  try {
    await pool.query(
      'INSERT INTO departments (name, `Abbreviation`, description, department_head, status) VALUES (?, ?, ?, ?, 1)',
      [name, abbreviation, description, department_head]
    );
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
  try {
    const [result] = await pool.query(
      'UPDATE departments SET name = ?, `Abbreviation` = ?, description = ?, department_head = ? WHERE id = ?',
      [name, abbreviation, description, department_head, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Departamento no encontrado' });
    }
    res.json({ message: 'Departamento actualizado exitosamente' });
  } catch (err) {
    console.error('Error al actualizar departamento:', err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE (soft delete) — marca status = 0 en lugar de borrar físicamente
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(
      'UPDATE departments SET status = 0 WHERE id = ?',
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Departamento no encontrado' });
    }
    res.json({ message: 'Departamento eliminado (status=0)' });
  } catch (err) {
    console.error('Error al eliminar departamento:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
