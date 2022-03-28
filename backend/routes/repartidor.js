const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const {
    validarCampos,
    verificaToken,
    esAdminRole,
    tieneRole,
    verificaADMIN_o_MismoUsuario
} = require('../middlewares');



const { 
    esRoleValido, 
    emailExiste, 
    existeUsuarioPorId, 
    existeEmpresaPorId 
} = require('../helpers/db-validators');

const { 
    repartidoresGet,
    obtenerRepartidor,
    crearRepartidor,
    actualizarRepartidor,
    repartidorDelete, 
} = require('../controllers/repartidores');


const Repartidor = require('../models/repartidor');

// ==========================================
// Obtener todos los repartidores
// ==========================================
router.get('/', repartidoresGet);

// ==========================================
// Obtener médico
// ==========================================
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
], obtenerRepartidor);

// ==========================================
// Actualizar repartidor
// ==========================================
router.put('/:id', [
    verificaToken, 
    esAdminRole, 
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], actualizarRepartidor);



// ==========================================
// Crear un nuevo repartidor
// ==========================================
router.post('/', [
    verificaToken, 
    esAdminRole,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('empresa', 'No es un ID válido').isMongoId(),
    check('usuario', 'No es un ID válido').isMongoId(),
    check('empresa').custom( existeEmpresaPorId ),
    check('usuario').custom( existeUsuarioPorId ),
    validarCampos
], crearRepartidor);


// ============================================
//   Borrar un repartidor por el id
// ============================================
router.delete('/:id', [
    verificaToken, 
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], repartidorDelete);


module.exports = router;