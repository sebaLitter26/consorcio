const { Chat } = require('../controllers/chat'),
    { Mensaje } = require('../models/mensaje'),
    { comprobarJWT } = require('../helpers'),
    { Socket } = require('socket.io');

const socketConnection = async( client = new Socket(), io ) => {

    const usuario = await comprobarJWT(client.handshake.headers['x-token']);
    if ( !usuario ) {
        return client.disconnect();
    }

    // Agregar el usuario conectado
    Chat.conectarUsuario( usuario );
    io.emit('usuarios-activos',     Chat.usuariosArr );
    socket.emit('recibir-mensajes', Chat.ultimos10 );

    // Conectarlo a una sala especial
    socket.join( usuario.id ); // global, socket.id, usuario.id
    
    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });

    socket.on('entrarChat', (data, callback) => {


        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        client.join(data.sala);

        Chat.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersona', Chat.getPersonasPorSala(data.sala));
        client.broadcast.to(data.sala).emit('Mensaje', Mensaje('Administrador', `${ data.nombre } se unió`));

        callback(Chat.getPersonasPorSala(data.sala));

    });

    client.on('Mensaje', (data, callback) => {

        let persona = Chat.getPersona(client.id);

        let mensaje = Mensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('Mensaje', mensaje);

        callback(mensaje);
    });


    client.on('disconnect', () => {

        let personaBorrada = Chat.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit('Mensaje', Mensaje('Administrador', `${ personaBorrada.nombre } salió`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', Chat.getPersonasPorSala(personaBorrada.sala));


    });

    // Mensajes privados
    client.on('mensajePrivado', data => {

        let persona = Chat.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', Mensaje(persona.nombre, data.mensaje));

    });
    

}

module.exports = socketConnection; 
