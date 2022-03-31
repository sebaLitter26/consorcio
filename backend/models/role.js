var mongoose = require('mongoose');

const RolSchema = new mongoose.Schema({
    //administrador, inquilino, propietario
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        unique: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        unique: true
    },
    status: { type: Boolean, default: true },
}, { collection: 'roles' });

const ProfileSchema = new mongoose.Schema({
    //reservations_base ,  control_tecnico, control_comercial, operations_base
    profile: {
        type: String,
        required: [true, 'El perfil es obligatorio'],
        unique: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        unique: true
    },
    status: { type: Boolean, default: true },
}, { collection: 'profiles' });

const AuthorizationSchema = new mongoose.Schema({
    //FORMATO: module_component-name     EX: reports_stock-plu
    authorization: {
        type: String,
        required: [true, 'El permiso es obligatorio'],
        unique: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        unique: true
    },
    status: { type: Boolean, default: true },
}, { collection: 'authorization' });

const RolPerfilSchema = new mongoose.Schema({
    id_rol: { 
        type: Schema.Types.ObjectId, 
        ref: 'roles', 
        required: [true, 'El id_role es un campo obligatorio']
    },
    id_perfil: {
        type: Schema.Types.ObjectId,
        ref: 'profiles',
        required: [true, 'El id empresa es un campo obligatorio']
    }
}, { collection: 'rolesProfiles' });

const ProfileAuthorizationSchema = new mongoose.Schema({
    id_authorization: { 
        type: Schema.Types.ObjectId, 
        ref: 'authorization', 
        required: [true, 'El id_authorization es un campo obligatorio']
    },
    id_profile: {
        type: Schema.Types.ObjectId,
        ref: 'profiles',
        required: [true, 'El id_profile es un campo obligatorio']
    }
}, { collection: 'profileAuthorization' });



module.exports = mongoose.model( 'Roles', RolSchema );
