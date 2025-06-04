const mysql = require('mysql2/promise');
const { config } = require('../config/configuration');

const dbConfig = {
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  port: config.db.port
};

const pool = mysql.createPool(dbConfig);

const inicializarDB = async () => {
  try {
    const connection = await pool.getConnection();
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS autores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        nacionalidad VARCHAR(255) NOT NULL,
        fecha_nacimiento DATE NOT NULL
      )
    `);
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS libros (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        genero VARCHAR(255) NOT NULL,
        anio_publicacion INT NOT NULL,
        autor_id INT,
        FOREIGN KEY (autor_id) REFERENCES autores(id) ON DELETE CASCADE
      )
    `);
    
    connection.release();
    console.log('Base de datos inicializada correctamente');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
};

inicializarDB();

module.exports = pool;