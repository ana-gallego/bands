const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');


const bands = new Bands();

bands.addBand(new Band('El canto del loco'));
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Skillet'));
bands.addBand(new Band('Don Tetto'));


/// Mensajes de sockets
io.on('connection', client => {
    client.emit(('active-bands'), bands.getBands());

    console.log('Cliente conectado');

    client.on('disconnect',
        () => { console.log('Cliente desconectado'); });


    client.on('new-message',
        (payload) => {
            client.broadcast.emit('new-message', payload);
        });
    client.on('vote-band',
        (payload) => {
            bands.voteBand(payload.id);
            io.emit(('active-bands'), bands.getBands());

        });
    client.on('add-band',
        (payload) => {
            const newBand = new Band(payload.name);
            bands.addBand(newBand);
            io.emit(('active-bands'), bands.getBands());

        });
    client.on('delete-band',
        (payload) => {
            bands.delete(payload.id);
            io.emit(('active-bands'), bands.getBands());

        });


});