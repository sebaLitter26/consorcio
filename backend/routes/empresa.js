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

const { empresasGet,
    obtenerEmpresa,
    crearEmpresa,
    actualizarEmpresa,
    empresaDelete } = require('../controllers/empresas');

// ==========================================
// Obtener todos los empresas
// ==========================================
router.get('/', empresasGet);

// ==========================================
//  Obtener empresa por ID
// ==========================================
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
], obtenerEmpresa);


// ==========================================
// Actualizar empresa
// ==========================================
router.put('/:id', [
    verificaToken, 
    esAdminRole, 
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], actualizarEmpresa);



// ==========================================
// Crear un nuevo empresa
// ==========================================
router.post('/', [
    verificaToken, 
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearEmpresa);


// ============================================
//   Borrar un empresa por el id
// ============================================
router.delete('/:id', [
    verificaToken, 
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], empresaDelete);


module.exports = router;