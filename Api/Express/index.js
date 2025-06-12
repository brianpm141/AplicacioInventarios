const express = require('express');
const dotenv = require('dotenv');
const departmentsRoutes = require('./routes/departments');

dotenv.config();

const app = express();
app.use(express.json()); // para parsear JSON

// Rutas
app.use('/api/departments', departmentsRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor API escuchando en puerto ${PORT}`);
});