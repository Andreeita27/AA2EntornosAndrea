const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const autoresController = require('../controllers/autores.controller');

// Validaciones
const validarAutor = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('nacionalidad').notEmpty().withMessage('La nacionalidad es obligatoria'),
  body('fecha_nacimiento').isDate().withMessage('La fecha debe ser válida (AAAA-MM-DD)'),
];

// Endpoints CRUD
router.get('/', autoresController.obtenerAutores);
router.get('/:id', autoresController.obtenerAutorPorId);
router.post('/', validarAutor, autoresController.crearAutor);
router.put('/:id', validarAutor, autoresController.actualizarAutor);
router.delete('/:id', autoresController.eliminarAutor);

module.exports = router;
