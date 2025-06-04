const { body, validationResult } = require('express-validator');

const validateAutor = [
    body('nombre')
        .notEmpty()
        .withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    
    body('nacionalidad')
        .notEmpty()
        .withMessage('La nacionalidad es obligatoria')
        .isLength({ min: 2, max: 50 })
        .withMessage('La nacionalidad debe tener entre 2 y 50 caracteres'),
    
    body('fecha_nacimiento')
        .notEmpty()
        .withMessage('La fecha de nacimiento es obligatoria')
        .isISO8601()
        .withMessage('La fecha de nacimiento debe ser una fecha válida (YYYY-MM-DD)')
        .custom((value) => {
            const fecha = new Date(value);
            const hoy = new Date();
            if (fecha >= hoy) {
                throw new Error('La fecha de nacimiento debe ser anterior a hoy');
            }
            return true;
        }),

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

const validateAutorUpdate = [
    body('nombre')
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    
    body('nacionalidad')
        .optional()
        .isLength({ min: 2, max: 50 })
        .withMessage('La nacionalidad debe tener entre 2 y 50 caracteres'),
    
    body('fecha_nacimiento')
        .optional()
        .isISO8601()
        .withMessage('La fecha de nacimiento debe ser una fecha válida (YYYY-MM-DD)')
        .custom((value) => {
            if (value) {
                const fecha = new Date(value);
                const hoy = new Date();
                if (fecha >= hoy) {
                    throw new Error('La fecha de nacimiento debe ser anterior a hoy');
                }
            }
            return true;
        }),

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
    validateAutor,
    validateAutorUpdate
};