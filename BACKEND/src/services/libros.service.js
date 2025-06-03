const db = require('../models/db');

const getAllLibros = async () => {
    const [results] = await db.query(`
        SELECT 
            l.id, 
            l.titulo, 
            l.genero, 
            l.anio_publicacion, 
            l.autor_id,
            a.nombre as autor_nombre
        FROM libros l
        LEFT JOIN autores a ON l.autor_id = a.id
    `);
    return results;
};

const getLibroById = async (id) => {
    const [results] = await db.query(`
        SELECT 
            l.id, 
            l.titulo,
            l.genero, 
            l.anio_publicacion, 
            l.autor_id,
            a.nombre as autor_nombre
        FROM libros l
        LEFT JOIN autores a ON l.autor_id = a.id
        WHERE l.id = ?
    `, [id]);
    return results[0];
};

const createLibro = async (libro) => {
    const { titulo, genero, anio_publicacion, autor_id } = libro; // ¡Faltaba anio_publicacion!
    const [result] = await db.query(
        'INSERT INTO libros (titulo, genero, anio_publicacion, autor_id) VALUES (?, ?, ?, ?)', 
        [titulo, genero, anio_publicacion, autor_id]
    );
    return { id: result.insertId, titulo, genero, anio_publicacion, autor_id };
};

const updateLibro = async (id, libro) => {
    const { titulo, genero, anio_publicacion, autor_id } = libro; // ¡Faltaba anio_publicacion!
    await db.query(
        'UPDATE libros SET titulo = ?, genero = ?, anio_publicacion = ?, autor_id = ? WHERE id = ?', 
        [titulo, genero, anio_publicacion, autor_id, id]
    );
};

const deleteLibro = async (id) => {
    await db.query('DELETE FROM libros WHERE id = ?', [id]);
};

module.exports = {
    getAllLibros,
    getLibroById,
    createLibro,
    updateLibro,
    deleteLibro
};