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

const { Chat } = require('../controllers/chat');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

// ==========================================
// Unirse a una sala de Chat
// ==========================================
// router.post('/join', [verificaToken], unirseChat);

module.exports = router;
