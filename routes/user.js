const { Router } = require( 'express' );
const { check } = require('express-validator');

const validarCampos = require('../middlewares/validateCampos');
const { isRoleValid, emailExists, idExists } = require('../helpers/db-validators');

const {
    getUsuarios,
    postUsuarios,
    updateUsuarios,
    deleteUsuarios
} = require('../controllers/user');

const userRouter = Router();

// /api/usuarios

userRouter.get( '/', getUsuarios );

userRouter.post(
    '/',
    [
        check( 'nombre', 'El nombre es obligatorio.' ).not().isEmpty(),
        check( 'password', 'El password es obligatorio y debe tener entre 6 y 25 caracteres.' ).isLength({
            min: 6,
            max: 25
        }),
        check( 'correo', 'El correo no es válido.' ).isEmail(),
        check( 'correo' ).custom( emailExists ),
        check( 'rol' ).custom( isRoleValid ),
        validarCampos
    ],
    postUsuarios
);

userRouter.put(
    '/:id',
    [
        check( 'id', 'No es un ID válido' ).isMongoId(),
        check( 'id' ).custom( idExists ),
        check( 'rol' ).custom( isRoleValid ),
        validarCampos
    ],
    updateUsuarios
);

userRouter.delete(
    '/:id',
    [
        check( 'id', 'No es un ID válido' ).isMongoId(),
        check( 'id' ).custom( idExists ),
        validarCampos
    ],
    deleteUsuarios
);


module.exports = userRouter;
