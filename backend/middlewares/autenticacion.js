var jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

// ==========================================
//  Verificar token
// ==========================================
exports.verificaToken = async (req, res, next) => {

    const { token } = req.query;

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
        
    jwt.verify(token, process.env.SEED, (err, verifiedJwt) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido',
                errors: err
            });
        } else {
            // leer el usuario que corresponde al uid
            Usuario.findById( verifiedJwt.usuario.uid, function (err, usuario) {
                if (err) {
                    return res.status(401).json({
                        ok: false,
                        msg: 'Error al buscar usuario en DB',
                        errors: err
                    });
                } else {
                    if( !usuario ) {
                        return res.status(401).json({
                            msg: 'Token no válido - usuario no existe DB'
                        })
                    }
        
                    // Verificar si el uid tiene estado true
                    if ( !usuario.estado ) {
                        return res.status(401).json({
                            msg: 'Token no válido - Usuario con estado: false'
                        })
                    }
                    
                    req.user = usuario;
        
                    next();
                }
            
            });
        }
    });
}


// ==========================================
//  Verificar ADMIN
// ==========================================
exports.esAdminRole = function(req, res, next) {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    const { role, nombre } = req.user;

    if (role === 'ADMIN_ROLE') {
        next();
        return;
    } else {

        return res.status(401).json({
            ok: false,
            mensaje: `Token incorrecto - ${ nombre } no es administrador`,
            errors: { message: 'No es administrador, no puede hacer eso' }
        });

    }


}


// ==========================================
//  Verificar ADMIN o Mismo Usuario
// ==========================================
exports.verificaADMIN_o_MismoUsuario = function(req, res, next) {


    var usuario = req.user;
    var id = req.params.id;

    if (usuario.role === 'ADMIN_ROLE' || usuario.uid === id) {
        next();
        return;
    } else {

        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto - No es administrador ni es el mismo usuario',
            errors: { message: 'No es administrador, no puede hacer eso' }
        });

    }


}

exports.tieneRole = ( ...roles  ) => {
    return (req, res = response, next) => {
        
        if ( !req.user ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if ( !roles.includes( req.user.role ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }


        next();
    }
}