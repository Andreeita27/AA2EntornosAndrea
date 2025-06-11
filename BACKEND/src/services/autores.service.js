const db = require('../models/db');

const getAllAutores = async () => {
    const [results] = await db.query('SELECT * FROM autores');
    return results;
};

const getAutorById = async (id) => {
    const [results] = await db.query('SELECT * FROM autores WHERE id = ?', [id]);
    return results[0];
};

const createAutor = async (autor) => {
    const { nombre, nacionalidad, fecha_nacimiento } = autor;
    const [result] = await db.query(
        'INSERT INTO autores (nombre, nacionalidad, fecha_nacimiento) VALUES (?, ?, ?)', 
        [nombre, nacionalidad, fecha_nacimiento]
    );
    return { id: result.insertId, nombre, nacionalidad, fecha_nacimiento };
};

const updateAutor = async (id, autor) => {
    const { nombre, nacionalidad, fecha_nacimiento } = autor;
    await db.query(
        'UPDATE autores SET nombre = ?, nacionalidad = ?, fecha_nacimiento = ? WHERE id = ?', 
        [nombre, nacionalidad, fecha_nacimiento, id]
    );
};

const deleteAutor = async (id) => {
    await db.query('DELETE FROM autores WHERE id = ?', [id]);
};

module.exports = {
    getAllAutores,
    getAutorById,
    createAutor,
    updateAutor,
    deleteAutor
};