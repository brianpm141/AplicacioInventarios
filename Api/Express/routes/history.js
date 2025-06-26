const express = require('express');
const router = express.Router();
const pool = require('../db');
const registrarMovimiento = require('../utils/movimientos');

// 1) Listar todo el historial
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT m.*, u.name AS user_name 
       FROM movements m 
       JOIN users u ON m.user_id = u.id 
       ORDER BY m.movement_time DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener historial' });
  }
});

// 2) Restaurar cambio al estado anterior
router.post('/restore/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [movs] = await pool.query('SELECT * FROM movements WHERE id = ?', [id]);
    if (!movs.length) return res.status(404).json({ error: 'Movimiento no encontrado' });

    const mov = movs[0];
    const table = mov.affected_table;
    const objId = mov.object_id;
    const userId = mov.user_id;
    const before = mov.before_info ? JSON.parse(mov.before_info) : {};

    switch (mov.change_type) {
      case 1:
        await pool.query(`DELETE FROM \`${table}\` WHERE id = ?`, [objId]);
        await pool.query(
          `DELETE FROM movements WHERE object_id = ? AND affected_table = ? AND change_type = 1`,
          [objId, table]
        );
        break;

      case 2: {
        const sets = Object.keys(before).map(f => `\`${f}\` = ?`).join(', ');
        await pool.query(
          `UPDATE \`${table}\` SET ${sets} WHERE id = ?`,
          [...Object.values(before), objId]
        );

        const [estadoFinal] = await pool.query(
          `SELECT * FROM \`${table}\` WHERE id = ?`,
          [objId]
        );

        await registrarMovimiento({
          table,
          type: 5, // restauración
          objectId: objId,
          userId,
          before,
          after: estadoFinal[0] || {}
        });

        // Eliminar todos los movimientos previos de modificación o eliminación
        await pool.query(
          `DELETE FROM movements WHERE object_id = ? AND affected_table = ? AND change_type IN (2, 3)`,
          [objId, table]
        );
        break;
      }

      case 3: {
        const campos = Object.keys(before).filter(k => k !== 'id');
        const sets = campos.map(f => `\`${f}\` = ?`).join(', ');
        const values = campos.map(k => before[k]);

        await pool.query(
          `UPDATE \`${table}\` SET ${sets} WHERE id = ?`,
          [...values, objId]
        );

        const [estadoFinal] = await pool.query(
          `SELECT * FROM \`${table}\` WHERE id = ?`,
          [objId]
        );

        await registrarMovimiento({
          table,
          type: 5, // restauración
          objectId: objId,
          userId,
          before,
          after: estadoFinal[0] || {}
        });

        // Eliminar todos los movimientos previos de modificación o eliminación
        await pool.query(
          `DELETE FROM movements WHERE object_id = ? AND affected_table = ? AND change_type IN (2, 3)`,
          [objId, table]
        );
        break;
      }

      default:
        return res.status(400).json({ error: 'Tipo de cambio inválido' });
    }

    res.json({ message: 'Restaurado con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al restaurar' });
  }
});

// 3) Borrado permanente (hard delete)
router.delete('/delete-permanent/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [movs] = await pool.query('SELECT * FROM movements WHERE id = ?', [id]);
    if (!movs.length) return res.status(404).json({ error: 'Movimiento no encontrado' });

    const mov = movs[0];
    const table = mov.affected_table;
    const objId = mov.object_id;
    const userId = mov.user_id;
    const before = mov.before_info ? JSON.parse(mov.before_info) : {};

    await pool.query(`DELETE FROM \`${table}\` WHERE id = ?`, [objId]);

    await registrarMovimiento({
      table,
      type: 4,
      objectId: objId,
      userId,
      before,
      after: {}
    });

    await pool.query(
      `DELETE FROM movements WHERE object_id = ? AND affected_table = ? AND change_type IN (2, 3)`,
      [objId, table]
    );

    res.json({ message: 'Elemento eliminado permanentemente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar permanentemente' });
  }
});

// 4) Revertir modificación
router.post('/revert/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [movs] = await pool.query('SELECT * FROM movements WHERE id = ?', [id]);
    if (!movs.length) return res.status(404).json({ error: 'Movimiento no encontrado' });

    const mov = movs[0];
    if (mov.change_type !== 2)
      return res.status(400).json({ error: 'Solo se pueden revertir modificaciones' });

    const table = mov.affected_table;
    const objId = mov.object_id;
    const userId = mov.user_id;
    const before = JSON.parse(mov.before_info);
    const after = JSON.parse(mov.after_info);

    const sets = Object.keys(before).map(f => `\`${f}\` = ?`).join(', ');
    await pool.query(
      `UPDATE \`${table}\` SET ${sets} WHERE id = ?`,
      [...Object.values(before), objId]
    );

    const [estadoFinal] = await pool.query(
      `SELECT * FROM \`${table}\` WHERE id = ?`,
      [objId]
    );

    await pool.query(
  `DELETE FROM movements WHERE object_id = ? AND affected_table = ? AND change_type IN (2, 3)`,
  [objId, table]
);

await registrarMovimiento({
  table,
  type: 5,
  objectId: objId,
  userId,
  before,
  after: estadoFinal[0] || {}
});

    res.json({ message: 'Modificación revertida exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al revertir modificación' });
  }
});

module.exports = router;
