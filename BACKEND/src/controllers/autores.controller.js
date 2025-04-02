const db = require('../models/db');

// Obtener todos los autores
exports.obtenerAutores = (req, res) => {
  db.all('SELECT * FROM autores', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Obtener autor por ID
exports.obtenerAutorPorId = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM autores WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Autor no encontrado' });
    res.json(row);
  });
};

// Crear nuevo autor
exports.crearAutor = (req, res) => {
  const { nombre, nacionalidad, fecha_nacimiento } = req.body;
  db.run(
    'INSERT INTO autores (nombre, nacionalidad, fecha_nacimiento) VALUES (?, ?, ?)',
    [nombre, nacionalidad, fecha_nacimiento],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
};

// Actualizar autor
exports.actualizarAutor = (req, res) => {
  const { id } = req.params;
  const { nombre, nacionalidad, fecha_nacimiento } = req.body;
  db.run(
    'UPDATE autores SET nombre = ?, nacionalidad = ?, fecha_nacimiento = ? WHERE id = ?',
    [nombre, nacionalidad, fecha_nacimiento, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: 'Autor no encontrado' });
      res.json({ mensaje: 'Autor actualizado correctamente' });
    }
  );
};

// Eliminar autor
exports.eliminarAutor = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM autores WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res.status(404).json({ error: 'Autor no encontrado' });
    res.json({ mensaje: 'Autor eliminado correctamente' });
  });
};
