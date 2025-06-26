const pool = require('../db');

module.exports = async function registrarMovimiento({ table, type, objectId, userId, before, after }) {
  await pool.query(
    `INSERT INTO movements (affected_table, change_type, object_id, user_id, before_info, after_info)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [table, type, objectId, userId, JSON.stringify(before), JSON.stringify(after)]
  );
};
