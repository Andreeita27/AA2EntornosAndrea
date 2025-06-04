const { body, validationResult } = require('express-validator');

const validateLibro = [
    body('titulo')
        .notEmpty()
        .withMessage('El título es obligatorio')
        .isLength({ min: 1, max: 200 })
        .withMessage('El título debe tener entre 1 y 200 caracteres'),
    
    body('genero')
        .notEmpty()
        .withMessage('El género es obligatorio')
        .isLength({ min: 2, max: 50 })
        .withMessage('El género debe tener entre 2 y 50 caracteres'),
    
    body('anio_publicacion')
        .notEmpty()
        .withMessage('El año de publicación es obligatorio')
        .isInt({ min: 1000, max: new Date().getFullYear() + 1 })
        .withMessage(`El año de publicación debe estar entre 1000 y ${new Date().getFullYear() + 1}`),
    
    body('autor_id')
        .notEmpty()
        .withMessage('El ID del autor es obligatorio')
        .isInt({ min: 1 })
        .withMessage('El ID del autor debe ser un número entero positivo'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                mensaje: 'Errores de validación',
                errors: errors.array()
            });
        }
        next();
    }
];

const validateLibroUpdate = [
    body('titulo')
        .optional()
        .isLength({ min: 1, max: 200 })
        .withMessage('El título debe tener entre 1 y 200 caracteres'),
    
    body('genero')
        .optional()
        .isLength({ min: 2, max: 50 })
        .withMessage('El género debe tener entre 2 y 50 caracteres'),
    
    body('anio_publicacion')
        .optional()
        .isInt({ min: 1000, max: new Date().getFullYear() + 1 })
        .withMessage(`El año de publicación debe estar entre 1000 y ${new Date().getFullYear() + 1}`),
    
    body('autor_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('El ID del autor debe ser un número entero positivo'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                mensaje: 'Errores de validación',
                errors: errors.array()
            });
        }
        next();
    }
];

module.exports = {
    validateLibro,
    validateLibroUpdate
};