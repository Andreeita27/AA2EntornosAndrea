const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'AFERNANDEZ',
  password: '26011998',
  database: 'libreria',
  port: 3306
};

const pool = mysql.createPool(dbConfig);

const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    
    console.log('Conectado a base de datos');
    
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
    
    console.log('Tablas creadas correctamente');
    connection.release();
    
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error.message);
  }
};

initializeDatabase();

module.exports = pool;