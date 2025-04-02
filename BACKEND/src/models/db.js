const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta absoluta al archivo de base de datos
const dbPath = path.resolve(__dirname, '../../database.sqlite');

// Crear conexión
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite');
  }
});

// Crear tablas si no existen
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS autores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      nacionalidad TEXT NOT NULL,
      fecha_nacimiento TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS libros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      genero TEXT NOT NULL,
      anio_publicacion INTEGER NOT NULL,
      autor_id INTEGER,
      FOREIGN KEY (autor_id) REFERENCES autores(id)
    )
  `);
});

module.exports = db;
