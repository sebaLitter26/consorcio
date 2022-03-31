const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var rolesValidos = {
    values: ['ADMIN', 'TENANT', 'OWNER'],
    message: '{VALUE} no es un rol permitido'
};


const UsuarioSchema = new mongoose.Schema({

    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'El correo es necesario'] },
    password: { type: String, required: [true, 'La contraseña es necesaria'] },
    img: { type: String, required: false },
    estado: { type: Boolean, default: true },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos },
    google: { type: Boolean, required: true, default: false },
});

UsuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario  } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = mongoose.model('Usuario', UsuarioSchema);