const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

// ==========================================
// Obtener todos los usuarios
// ==========================================
const usuariosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        usuarios
    });
}


// ==========================================
//  Obtener empresa por ID
// ==========================================
const obtenerUsuario = async(req, res = response ) => {

    const { id } = req.params;

    Usuario.findById(id)
        .populate('usuario', 'nombre img email')
        .exec((err, usuario) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar usuario',
                    errors: err
                });
            }

            if (!usuario) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El usuario con el id ' + id + 'no existe',
                    errors: { message: 'No existe un usuario con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                usuario
            });
        });
}


// ==========================================
// Actualizar usuario
// ==========================================
const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { uid, password, google, correo, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt );
    }

    Usuario.findByIdAndUpdate( id, resto, function (err, usuario) {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuario
        });

    });
    

}



// ==========================================
// Crear un nuevo usuario
// ==========================================
const usuariosPost = async(req, res = response) => {

    const { nombre, email, password, role, img, mercadolibre } = req.body;

    var usuario = new Usuario({
        nombre: nombre,
        email: email,
        password: bcrypt.hashSync(password, 10),
        img: img,
        role: role
    });

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );

    usuario.save((err, usuarioGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuariotoken: req.usuario
        });


    });

}


// ============================================
//   Borrar un usuario por el id
// ============================================
const usuariosDelete = async(req, res = response) => {

    var id = req.params.id;

    Usuario.findByIdAndUpdate(id, { estado: false }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar usuario',
                errors: err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con ese id',
                errors: { message: 'No existe un usuario con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}


module.exports = {
    usuariosGet,
    obtenerUsuario,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}