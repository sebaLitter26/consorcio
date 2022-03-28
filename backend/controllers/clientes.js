
const Cliente = require('../models/cliente');

// ==========================================
// Obtener todos los clientes
// ==========================================
const clientesGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = {};

    const [ total, clientes ] = await Promise.all([
        Cliente.count(query),
        Cliente.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
        .populate([{
            path: 'usuario',
            model: 'Usuario',
            select: 'nombre email img'
        },{
            path: 'empresa',
            model: 'Empresa',
        }])
        // .populate('Empresa')
    ]);

    res.status(200).json({
        ok: true,
        clientes,
        total
    });
}

// ==========================================
// Obtener médico
// ==========================================
const obtenerCliente = async(req, res = response ) => {

    const { id } = req.params;

    Cliente.findById(id)
        .populate('usuario', 'nombre email img')
        .populate('empresa')
        .exec((err, cliente) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar cliente',
                    errors: err
                });
            }

            if (!cliente) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El cliente con el id ' + id + ' no existe',
                    errors: { message: 'No existe un cliente con ese ID' }
                });
            }

            res.status(200).json({
                ok: true,
                cliente: cliente
            });

        })


}

// ==========================================
// Actualizar cliente
// ==========================================
const actualizarCliente = async( req, res = response ) => {

    const { id } = req.params;
    const { nombre, usuario, empresa, ...data } = req.body;

    data.nombre = nombre.toUpperCase();
    data.usuario = usuario;
    data.empresa = empresa;

    Cliente.findByIdAndUpdate(id, data, (err, clienteActualizado) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar cliente',
                errors: err
            });
        }

        if (!clienteActualizado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El cliente con el id ' + id + ' no existe',
                errors: { message: 'No existe un cliente con ese ID' }
            });

            
        }

        res.status(200).json({
            ok: true,
            cliente: clienteActualizado
        });

    });

}



// ==========================================
// Crear un nuevo cliente
// ==========================================
const crearCliente = async(req, res = response ) => {

    const { nombre, empresa } = req.body;

    const newCliente = new Cliente({
        nombre: nombre,
        usuario: req.usuario.uid,
        empresa: empresa
    });

    newCliente.save((err, clienteGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Error al crear cliente ${nombre}`,
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            cliente: clienteGuardado
        });


    });

}


// ============================================
//   Borrar un cliente por el id
// ============================================
const clienteDelete = async(req, res = response) => {
    const { id } = req.params;

    Cliente.findByIdAndRemove(id, (err, clienteBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar cliente',
                errors: err
            });
        }

        if (!clienteBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: `No existe un cliente el id ${id}`,
                errors: { message: `No existe un cliente el id ${id}` }
            });
        }

        res.status(200).json({
            ok: true,
            cliente: clienteBorrado
        });

    });

}


module.exports = {
    clientesGet,
    obtenerCliente,
    crearCliente,
    actualizarCliente,
    clienteDelete,
}