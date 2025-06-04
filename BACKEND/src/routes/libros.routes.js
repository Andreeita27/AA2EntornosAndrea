const express = require('express');
const router = express.Router();
const librosController = require('../controllers/libros.controller');
const { validateLibro, validateLibroUpdate } = require('../middleware/libros.validation');

router.get('/', librosController.getAllLibros);
router.get('/:id', librosController.getLibroById);
router.post('/', validateLibro, librosController.createLibro);
router.put('/:id', validateLibroUpdate, librosController.updateLibro);
router.delete('/:id', librosController.deleteLibro);

module.exports = router;