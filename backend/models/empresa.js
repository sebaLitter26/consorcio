const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const empresaSchema = new Schema({
    nombre: { 
        type: String, 
        required: [true, 'El nombre del empresa es necesario'], 
        unique: true 
    },
    img: { type: String, required: false },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
}, { collection: 'empresas' });



module.exports = mongoose.model('Empresa', empresaSchema);