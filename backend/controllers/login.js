const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const { GoogleAuth } = require('google-auth-library');
const auth = new GoogleAuth();


// ==========================================
//  Autenticación De Google
// ==========================================
const renuevaToken = async(req, res = response) => {

    const token = jwt.sign({ usuario: req.usuario }, process.env.SEED, { expiresIn: 14400 }); // 4 horas

    res.status(200).json({
        ok: true,
        token: token
    });

}

// ==========================================
//  Autenticación De Google
// ==========================================
const googleAutenticacion = async(req, res = response) => {

    const token = req.body.token || 'XXX';

    const client = new auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_SECRET, '');

    client.verifyIdToken(
        token,
        process.env.GOOGLE_CLIENT_ID,
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3],
        function(e, login) {
            console.log( e );
            if (e) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Token no válido',
                    errors: e
                });
            }


            var payload = login.getPayload();
            var userid = payload['sub'];
            // If request specified a G Suite domain:
            //var domain = payload['hd'];

            Usuario.findOne({ email: payload.email }, (err, usuario) => {

                if (err) {
                    return res.status(500).json({
                        ok: true,
                        mensaje: 'Error al buscar usuario - login',
                        errors: err
                    });
                }

                if (usuario) {

                    if (usuario.google === false) {
                        return res.status(400).json({
                            ok: true,
                            mensaje: 'Debe de usar su autenticación normal'
                        });
                    } else {

                        usuario.password = ':)';

                        var token = jwt.sign({ usuario: usuario }, process.env.SEED, { expiresIn: 14400 }); // 4 horas
                        req.session.user_id = usuario._id;
                        res.status(200).json({
                            ok: true,
                            usuario: usuario,
                            token: token,
                            id: usuario._id,
                            menu: obtenerMenu(usuario.role)
                        });

                    }

                    // Si el usuario no existe por correo
                } else {

                    var usuario = new Usuario();


                    usuario.nombre = payload.name;
                    usuario.email = payload.email;
                    usuario.password = ':)';
                    usuario.img = payload.picture;
                    usuario.google = true;

                    usuario.save((err, usuarioDB) => {

                        if (err) {
                            return res.status(500).json({
                                ok: true,
                                mensaje: 'Error al crear usuario - google',
                                errors: err
                            });
                        }


                        var token = jwt.sign({ usuario: usuarioDB }, process.env.SEED, { expiresIn: 14400 }); // 4 horas
                        req.session.user_id = usuarioDB._id;
                        res.status(200).json({
                            ok: true,
                            usuario: usuarioDB,
                            token: token,
                            id: usuarioDB._id,
                            ID_MELI: process.env.ID_MELI,
                            menu: obtenerMenu(usuarioDB.role)
                        });

                    });

                }


            });


        });

}

// ==========================================
//  Autenticación normal
// ==========================================
const autenticacion = async(req, res = response) => {

    const { email, password } = req.body;

    Usuario.findOne({ email: email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });
        }

        if (!bcrypt.compareSync(password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }

        // Crear un token!!!
        usuarioDB.password = ':)';

        var token = jwt.sign({ usuario: usuarioDB }, process.env.SEED, { expiresIn: 14400 }); // 4 horas
        req.session.user_id = usuarioDB._id;
        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id,
            ID_MELI: process.env.ID_MELI,
            menu: obtenerMenu(usuarioDB.role)
        });

    })


}


function obtenerMenu(ROLE) {

    var menu = [{
            titulo: 'Principal',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Dashboard', url: '/dashboard' },
                { titulo: 'ProgressBar', url: '/progress' },
                { titulo: 'Gráficas', url: '/graficas1' },
                { titulo: 'Promesas', url: '/promesas' },
                { titulo: 'RxJs', url: '/rxjs' }
            ]
        },
        {
            titulo: 'Mantenimientos',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                // { titulo: 'Usuarios', url: '/usuarios' },
                { titulo: 'Empresas', url: '/empresas' },
                { titulo: 'Repartidores', url: '/repartidores' },
                { titulo: 'Clientes', url: '/clientes' },
            ]
        }
    ];

    // console.log('ROLE', ROLE);

    if (ROLE === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: '/usuarios' });
    }


    return menu;

}


module.exports = {
    renuevaToken,
    googleAutenticacion,
    autenticacion
};