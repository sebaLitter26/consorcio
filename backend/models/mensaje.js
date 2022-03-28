const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Mensaje = (usuario, mensaje) => {

    return {
        usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
        mensaje,
        fecha: new Date().getTime()
    };

}

module.exports = Mensaje;