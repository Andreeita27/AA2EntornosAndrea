const express = require('express');
const router = express.Router();
const autoresController = require('../controllers/autores.controller');
const { validateAutor, validateAutorUpdate } = require('../middleware/autores.validation');

router.get('/', autoresController.getAllAutores);
router.get('/:id', autoresController.getAutorById);
router.post('/', validateAutor, autoresController.createAutor);
router.put('/:id', validateAutorUpdate, autoresController.updateAutor);
router.delete('/:id', autoresController.deleteAutor);

module.exports = router;