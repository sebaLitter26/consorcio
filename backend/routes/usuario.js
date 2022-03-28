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

const { usuariosGet,
        obtenerUsuario,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const Usuario = require('../models/usuario');

// ==========================================
// Obtener todos los usuarios
// ==========================================
router.get('/', usuariosGet);

// ==========================================
// Obtener usuario por ID
// ==========================================
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos,
    verificaToken, 
    esAdminRole,
], obtenerUsuario);

// ==========================================
// Actualizar usuario
// ==========================================
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('role').custom( esRoleValido ), 
    validarCampos,
    verificaToken, 
    verificaADMIN_o_MismoUsuario
], usuariosPut );



// ==========================================
// Crear un nuevo usuario
// ==========================================
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailExiste ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    // check('rol').custom( esRoleValido ), 
    validarCampos
], usuariosPost );


// ============================================
//   Borrar un usuario por el id
// ============================================
router.delete('/:id', [
    verificaToken, 
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete );

router.patch('/', usuariosPatch );

module.exports = router;

/*
tieneRole('ADMIN_ROLE'),
 */