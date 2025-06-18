const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET departamentos activos, alias Abbreviation → abbreviation
router.get('/', (req, res) => {
  pool.query(
    `SELECT
       id,
       name,
       Abbreviation AS abbreviation,
       description,
       department_head,
       status
     FROM departments
     WHERE status = 1`,
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
      }
      res.json(results);
    }
  );
});

// POST crear departamento
router.post('/', (req, res) => {
  const { name, abbreviation, description, department_head } = req.body;
  pool.query(
    'INSERT INTO departments (name, `Abbreviation`, description, department_head, status) VALUES (?, ?, ?, ?, 1)',
    [name, abbreviation, description, department_head],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
      }
      res.status(201).json({ message: 'Departamento creado exitosamente' });
    }
  );
});

// PUT actualizar departamento
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, abbreviation, description, department_head } = req.body;
  pool.query(
    'UPDATE departments SET name = ?, `Abbreviation` = ?, description = ?, department_head = ? WHERE id = ?',
    [name, abbreviation, description, department_head, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
      }
      res.json({ message: 'Departamento actualizado exitosamente' });
    }
  );
});

// DELETE (soft delete) — marca status = 0 en lugar de borrar físicamente
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  pool.query(
    'UPDATE departments SET status = 0 WHERE id = ?',
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
      }
      // opcional: comprobar affectedRows para verificar que existe el id
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Departamento no encontrado' });
      }
      res.json({ message: 'Departamento eliminado (status=0)' });
    }
  );
});


module.exports = router;
