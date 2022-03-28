const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const {
    renuevaToken,
    googleAutenticacion,
    autenticacion
} = require('../controllers/login');

    
const {
    validarCampos,
    verificaToken,
    esAdminRole,
    tieneRole,
    verificaADMIN_o_MismoUsuario
} = require('../middlewares');


// ==========================================
//  Autenticación De Google
// ==========================================
router.get('/renuevatoken', [verificaToken], renuevaToken);

// ==========================================
//  Autenticación De Google
// ==========================================
router.post('/google', [
    check('token', 'El token es necesario').not().isEmpty(),
    validarCampos
], googleAutenticacion);

// ==========================================
//  Autenticación normal
// ==========================================
router.post('/', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], autenticacion);


module.exports = router;