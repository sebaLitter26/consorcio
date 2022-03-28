const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Usuario = mongoose.model('Usuario');


const clientesSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    img: { type: String, required: false },
    usuario: { 
        type: Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: [true, 'El id usuario es un campo obligatorio']
    },
    empresa: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa',
        required: [true, 'El id empresa es un campo obligatorio']
    }
}, { collection: 'clientes' });


module.exports = mongoose.model('Cliente', clientesSchema);