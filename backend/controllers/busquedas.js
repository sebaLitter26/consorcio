
const empresa = require('../models/empresa');
const repartidor = require('../models/repartidor');
const Usuario = require('../models/usuario');

// ==============================
// Busqueda por colección
// ==============================
const busquedaColeccion = async(req, res = response) => {

    const { busqueda, tabla }  = req.params;
    var regex = new RegExp(busqueda, 'i');

    var promesa;

    switch (tabla) {

        case 'usuarios':
            promesa = buscarUsuarios(busqueda, regex);
            break;

        case 'repartidores':
            promesa = buscarrepartidores(busqueda, regex);
            break;

        case 'empresas':
            promesa = buscarempresas(busqueda, regex);
            break;

        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda sólo son: usuarios, repartidores y empresas',
                error: { message: 'Tipo de tabla/coleccion no válido' }
            });

    }

    promesa.then(data => {

        res.status(200).json({
            ok: true,
            [tabla]: data
        });

    })

}


// ==============================
// Busqueda general
// ==============================
const busquedaGeneral = async(req, res = response) => {


    const busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');


    Promise.all([
            buscarempresas(busqueda, regex),
            buscarrepartidores(busqueda, regex),
            buscarUsuarios(busqueda, regex)
        ])
        .then(respuestas => {

            res.status(200).json({
                ok: true,
                empresas: respuestas[0],
                repartidores: respuestas[1],
                usuarios: respuestas[2]
            });
        })


}


function buscarempresas(busqueda, regex) {

    return new Promise((resolve, reject) => {

        empresa.find({ nombre: regex })
            .populate('usuario', 'nombre email img')
            .exec((err, empresas) => {

                if (err) {
                    reject('Error al cargar empresas', err);
                } else {
                    resolve(empresas)
                }
            });
    });
}

function buscarrepartidores(busqueda, regex) {

    return new Promise((resolve, reject) => {

        repartidor.find({ nombre: regex })
            .populate('usuario', 'nombre email img')
            .populate('empresa')
            .exec((err, repartidores) => {

                if (err) {
                    reject('Error al cargar repartidores', err);
                } else {
                    resolve(repartidores)
                }
            });
    });
}

function buscarUsuarios(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Usuario.find({}, 'nombre email role img')
            .or([{ 'nombre': regex }, { 'email': regex }])
            .exec((err, usuarios) => {

                if (err) {
                    reject('Erro al cargar usuarios', err);
                } else {
                    resolve(usuarios);
                }


            })


    });
}

module.exports = {
    busquedaGeneral,
    busquedaColeccion
};