const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const librosController = require('../controllers/libros.controller');

// Validaciones
const validarLibro = [
  body('titulo').notEmpty().withMessage('El título es obligatorio'),
  body('genero').notEmpty().withMessage('El género es obligatorio'),
  body('anio_publicacion')
    .isInt({ min: 1000 }).withMessage('El año debe ser un número válido'),
  body('autor_id')
    .isInt({ min: 1 }).withMessage('Debe seleccionar un autor válido'),
];

// Rutas CRUD
router.get('/', librosController.obtenerLibros);
router.get('/:id', librosController.obtenerLibroPorId);
router.post('/', validarLibro, librosController.crearLibro);
router.put('/:id', validarLibro, librosController.actualizarLibro); 
router.delete('/:id', librosController.eliminarLibro);

module.exports = router;

