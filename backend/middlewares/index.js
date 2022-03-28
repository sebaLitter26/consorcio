
const autenticacion = require('../middlewares/autenticacion');
const validaCampos = require('../middlewares/validar-campos');
const validarArchivo = require('../middlewares/validar-archivo');

module.exports = {
    ...validaCampos,
    ...validarArchivo,
    ...autenticacion
}