const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const departmentsRoutes = require('./routes/departments');
const usersRoutes = require('./routes/users');
const databaseRoutes = require('./routes/database');
const backupConfigRoutes = require('./routes/backupConfig');
const categoriesRoutes = require('./routes/categories');
const historyRoutes = require('./routes/history');
const { iniciarCronAutomatico } = require('./cron/autoBackup');
const authRoutes = require('./routes/auth');

iniciarCronAutomatico();

dotenv.config();
const app = express();


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json()); // para parsear JSON

// Rutas
app.use('/api/departments', departmentsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/database', databaseRoutes);
app.use('/api/backup-config', backupConfigRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/auth', authRoutes);
// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor API escuchando en puerto ${PORT}`);
});