const Empresa = require('../models/empresa');

// ==========================================
// Obtener todos los empresas
// ==========================================
const empresasGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = {};

    const [ total, empresas ] = await Promise.all([
        Empresa.count(query),
        Empresa.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
            .populate('usuario', 'nombre email')
    ]);

    res.status(200).json({
        ok: true,
        empresas,
        total
    });

}

// ==========================================
//  Obtener empresa por ID
// ==========================================
const obtenerEmpresa = async(req, res = response ) => {

    const { id } = req.params;

    Empresa.findById(id)
        .populate('usuario', 'nombre img email')
        .exec((err, empresa) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar empresa',
                    errors: err
                });
            }

            if (!empresa) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El empresa con el id ' + id + 'no existe',
                    errors: { message: 'No existe un empresa con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                empresa
            });
        });
}





// ==========================================
// Actualizar empresa
// ==========================================
const actualizarEmpresa = async( req, res = response ) => {
    const { id } = req.params;
    const { nombre, ...data } = req.body;

    data.nombre = nombre.toUpperCase();
    data.usuario = req.usuario.uid;
    console.log(data);

    Empresa.findByIdAndUpdate(id, data, (err, empresaActualizada) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar empresa',
                errors: err
            });
        }

        if (!empresaActualizada) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El empresa con el id ' + id + ' no existe',
                errors: { message: 'No existe un empresa con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            empresa: empresaActualizada
        });

    });

}



// ==========================================
// Crear un nuevo empresa
// ==========================================
const crearEmpresa = async(req, res = response ) => {

    const { nombre, img } = req.body;

    const newEmpresa = new Empresa({
        nombre: nombre.toUpperCase(),
        img: img,
        usuario: req.usuario.uid
    });

    newEmpresa.save((err, nuevaEmpresa) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Error al crear el empresa ${nombre}`,
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            empresa: nuevaEmpresa
        });


    });

}


// ============================================
//   Borrar un empresa por el id
// ============================================
const empresaDelete = async(req, res = response) => {

    const { id } = req.params;

    Empresa.findByIdAndRemove(id, (err, empresaBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar empresa',
                errors: err
            });
        }

        if (!empresaBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: `No existe un empresa con el id ${id}`,
                errors: { message: `No existe un empresa con el id ${id}` }
            });
        }

        res.status(200).json({
            ok: true,
            empresa: empresaBorrado
        });

    });

}


module.exports = {
    empresasGet,
    obtenerEmpresa,
    crearEmpresa,
    actualizarEmpresa,
    empresaDelete,
}