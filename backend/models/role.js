var mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
}, { collection: 'roles' });

module.exports = mongoose.model( 'Role', RoleSchema );
