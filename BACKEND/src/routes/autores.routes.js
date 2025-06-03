const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const autoresController = require('../controllers/autores.controller');

const validarAutor = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('nacionalidad').notEmpty().withMessage('La nacionalidad es obligatoria'),
  body('fecha_nacimiento').isDate().withMessage('La fecha debe ser válida (AAAA-MM-DD)'),
];

router.get('/', autoresController.getAllAutores);
router.get('/:id', autoresController.getAutorById);
router.post('/', validarAutor, autoresController.createAutor);
router.put('/:id', validarAutor, autoresController.updateAutor);
router.delete('/:id', autoresController.deleteAutor);

module.exports = router;