var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const repartidorSchema = new Schema({
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
}, { collection: 'repartidores' });


module.exports = mongoose.model('Repartidor', repartidorSchema);