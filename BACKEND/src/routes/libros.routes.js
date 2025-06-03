const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const librosController = require('../controllers/libros.controller');

const validarLibro = [
  body('titulo').notEmpty().withMessage('El título es obligatorio'),
  body('genero').notEmpty().withMessage('El género es obligatorio'),
  body('anio_publicacion')
    .isInt({ min: 1000 }).withMessage('El año debe ser un número válido'),
  body('autor_id')
    .isInt({ min: 1 }).withMessage('Debe seleccionar un autor válido'),
];

router.get('/', librosController.getAllLibros);
router.get('/:id', librosController.getLibroById);
router.post('/', validarLibro, librosController.createLibro);
router.put('/:id', validarLibro, librosController.updateLibro); 
router.delete('/:id', librosController.deleteLibro);

module.exports = router;