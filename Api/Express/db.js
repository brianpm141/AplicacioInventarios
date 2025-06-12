const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const dbConfig = {
  host: 'mysql',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

let db;

function connectWithRetry() {
  db = mysql.createConnection(dbConfig);

  db.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err.message);
      console.log('Reintentando conexión...');
      setTimeout(connectWithRetry, 10000); // Espera 10 segundos y vuelve a intentar
    } else {
      console.log('Base de datos conectada');
    }
  });
}

// Iniciar conexión
connectWithRetry();

module.exports = db;