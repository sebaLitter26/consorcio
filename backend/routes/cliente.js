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



const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { clientesGet,
    obtenerCliente,
    crearCliente,
    actualizarCliente,
    clienteDelete, } = require('../controllers/clientes');


var cliente = require('../models/cliente');

// ==========================================
// Obtener todos los clientes
// ==========================================
router.get('/', clientesGet);

// ==========================================
// Obtener médico
// ==========================================
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
], obtenerCliente);

// ==========================================
// Actualizar cliente
// ==========================================
router.put('/:id', [
    verificaToken, 
    esAdminRole, 
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], actualizarCliente);



// ==========================================
// Crear un nuevo cliente
// ==========================================
router.post('/', [
    verificaToken, 
    esAdminRole,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('empresa', 'No es un ID válido').isMongoId(),
    check('usuario', 'No es un ID válido').isMongoId(),
    // check('empresa').custom( existeEmpresaPorId ),
    // check('usuario').custom( existeUsuarioPorId ),
    validarCampos
], crearCliente);


// ============================================
//   Borrar un cliente por el id
// ============================================
router.delete('/:id', [
    verificaToken, 
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], clienteDelete);


module.exports = router;