const Role = require('../models/role');
const { Usuario, Empresa, Cliente, Repartidor } = require('../models');

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol }).exec();
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExiste = async( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo }).exec();
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id).exec();
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

// Empresa
 
const existeEmpresaPorId = async( id ) => {

    // Verificar si el correo existe
    const existeEmpresa = await Empresa.findById(id).exec();
    if ( !existeEmpresa ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

// Cliente
 
const existeClientePorId = async( id ) => {

    // Verificar si el correo existe
    const existeCliente = await Cliente.findById(id).exec();
    if ( !existeCliente ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

// Repartidor
 
const existeRepartidorPorId = async( id ) => {

    // Verificar si el correo existe
    const existeRepartidor = await Repartidor.findById(id).exec();
    if ( !existeRepartidor ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes( coleccion );
    if ( !incluida ) {
        throw new Error(`La colección ${ coleccion } no es permitida, ${ colecciones }`);
    }
    return true;
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeEmpresaPorId,
    existeClientePorId,
    existeRepartidorPorId,
    coleccionesPermitidas
}

