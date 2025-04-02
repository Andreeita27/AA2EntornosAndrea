const db = require('../models/db');

// Obtener todos los libros
exports.obtenerLibros = (req, res) => {
  db.all(
    `SELECT libros.*, autores.nombre AS autor_nombre 
     FROM libros 
     LEFT JOIN autores ON libros.autor_id = autores.id`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
};

// Obtener un libro por ID
exports.obtenerLibroPorId = (req, res) => {
  const { id } = req.params;
  db.get(
    `SELECT libros.*, autores.nombre AS autor_nombre 
     FROM libros 
     LEFT JOIN autores ON libros.autor_id = autores.id 
     WHERE libros.id = ?`,
    [id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Libro no encontrado' });
      res.json(row);
    }
  );
};

// Crear nuevo libro
exports.crearLibro = (req, res) => {
  const { titulo, genero, anio_publicacion, autor_id } = req.body;
  db.run(
    `INSERT INTO libros (titulo, genero, anio_publicacion, autor_id) 
     VALUES (?, ?, ?, ?)`,
    [titulo, genero, anio_publicacion, autor_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
};

// Actualizar libro
exports.actualizarLibro = (req, res) => {
  const { id } = req.params;
  const { titulo, genero, anio_publicacion, autor_id } = req.body;
  db.run(
    `UPDATE libros SET titulo = ?, genero = ?, anio_publicacion = ?, autor_id = ? 
     WHERE id = ?`,
    [titulo, genero, anio_publicacion, autor_id, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: 'Libro no encontrado' });
      res.json({ mensaje: 'Libro actualizado correctamente' });
    }
  );
};

// Eliminar libro
exports.eliminarLibro = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM libros WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res.status(404).json({ error: 'Libro no encontrado' });
    res.json({ mensaje: 'Libro eliminado correctamente' });
  });
};
