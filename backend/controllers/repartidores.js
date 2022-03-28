
const Repartidor = require('../models/repartidor');

// ==========================================
// Obtener todos los repartidores
// ==========================================
const repartidoresGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = {};

    const [ total, repartidores ] = await Promise.all([
        Repartidor.count(query),
        Repartidor.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
        .populate('usuario', 'nombre email img')
        .populate('empresa')
    ]);

    res.status(200).json({
        ok: true,
        repartidores,
        total
    });
}

// ==========================================
// Obtener médico
// ==========================================
const obtenerRepartidor = async(req, res = response ) => {

    const { id } = req.params;

    Repartidor.findById(id)
        .populate('usuario', 'nombre email img')
        .populate('empresa')
        .exec((err, repartidor) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar repartidor',
                    errors: err
                });
            }

            if (!repartidor) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El repartidor con el id ' + id + ' no existe',
                    errors: { message: 'No existe un repartidor con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                repartidor: repartidor
            });

        })


}

// ==========================================
// Actualizar repartidor
// ==========================================
const actualizarRepartidor = async( req, res = response ) => {

    const { id } = req.params;
    const { nombre, usuario, empresa, ...data } = req.body;

    data.nombre = nombre.toUpperCase();
    data.usuario = usuario;
    data.empresa = empresa;

    Repartidor.findByIdAndUpdate(id, data, (err, repartidorActualizado) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar repartidor',
                errors: err
            });
        }

        if (!repartidorActualizado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El repartidor con el id ' + id + ' no existe',
                errors: { message: 'No existe un repartidor con ese ID' }
            });

            
        }

        res.status(200).json({
            ok: true,
            repartidor: repartidorActualizado
        });

    });

}



// ==========================================
// Crear un nuevo repartidor
// ==========================================
const crearRepartidor = async(req, res = response ) => {

    const { nombre, empresa, usuario } = req.body;

    const newRepartidor = new Repartidor({
        nombre: nombre,
        usuario: usuario,
        empresa: empresa
    });

    newRepartidor.save((err, repartidorGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Error al crear repartidor ${nombre}`,
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            repartidor: repartidorGuardado
        });


    });

}


// ============================================
//   Borrar un repartidor por el id
// ============================================
const repartidorDelete = async(req, res = response) => {
    const { id } = req.params;

    Repartidor.findByIdAndRemove(id, (err, repartidorBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar repartidor',
                errors: err
            });
        }

        if (!repartidorBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: `No existe un repartidor el id ${id}`,
                errors: { message: `No existe un repartidor el id ${id}` }
            });
        }

        res.status(200).json({
            ok: true,
            repartidor: repartidorBorrado
        });

    });

}


module.exports = {
    repartidoresGet,
    obtenerRepartidor,
    crearRepartidor,
    actualizarRepartidor,
    repartidorDelete,
}