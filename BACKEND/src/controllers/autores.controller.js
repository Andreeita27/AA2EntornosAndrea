const autoresService = require('../services/autores.service');

const getAllAutores = async (req, res) => {
    try {
        const autores = await autoresService.getAllAutores();
        res.json(autores);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los autores', error });
    }
};

const getAutorById = async (req, res) => {
    try {
        const autor = await autoresService.getAutorById(req.params.id);
        if (!autor) {
            return res.status(404).json({ mensaje: 'Autor no encontrado' });
        }
        res.json(autor);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el autor', error });
    }
};

const createAutor = async (req, res) => {
    try {
        const nuevoAutor = await autoresService.createAutor(req.body);
        res.status(201).json(nuevoAutor);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el autor', error });
    }
};

const updateAutor = async (req, res) => {
    try {
        await autoresService.updateAutor(req.params.id, req.body);
        res.json({ mensaje: 'Autor actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el autor', error });
    }
};

const deleteAutor = async (req, res) => {
    try {
        await autoresService.deleteAutor(req.params.id);
        res.json({ mensaje: 'Autor eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el autor', error });
    }
};

module.exports = {
    getAllAutores,
    getAutorById,
    createAutor,
    updateAutor,
    deleteAutor
};