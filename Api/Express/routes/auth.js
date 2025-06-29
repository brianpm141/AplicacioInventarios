// routes/auth.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [user] = await pool.query(
      `SELECT u.id, u.username, u.role, u.status, p.password_hash 
       FROM users u 
       JOIN passwords p ON u.password_id = p.id 
       WHERE u.username = ? AND u.status = 1`, [username]);

    if (!user.length) return res.status(401).json({ message: 'Usuario no encontrado' });

    const usuario = user[0];
    const passwordValida = await bcrypt.compare(password, usuario.password_hash);
    if (!passwordValida) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: usuario.id, role: usuario.role },
      process.env.JWT_SECRET || 'secreto', // Define JWT_SECRET en .env
      { expiresIn: '4h' }
    );

    res.json({ token, role: usuario.role, username: usuario.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
