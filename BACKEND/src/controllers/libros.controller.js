const librosService = require('../services/libros.service');

const getAllLibros = async (req, res) => {
    try {
        const libros = await librosService.getAllLibros();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los libros', error });
    }
};

const getLibroById = async (req, res) => {
    try {
        const libro = await librosService.getLibroById(req.params.id);
        if (!libro) {
            return res.status(404).json({ mensaje: 'Libro no encontrado' });
        }
        res.json(libro);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el libro', error });
    }
};

const createLibro = async (req, res) => {
    try {
        const nuevoLibro = await librosService.createLibro(req.body);
        res.status(201).json(nuevoLibro);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el libro', error });
    }
};

const updateLibro = async (req, res) => {
    try {
        await librosService.updateLibro(req.params.id, req.body);
        res.json({ mensaje: 'Libro actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el libro', error });
    }
};

const deleteLibro = async (req, res) => {
    try {
        await librosService.deleteLibro(req.params.id);
        res.json({ mensaje: 'Libro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el libro', error });
    }
};

module.exports = {
    getAllLibros,
    getLibroById,
    createLibro,
    updateLibro,
    deleteLibro
};