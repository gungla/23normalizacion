const mongoose = require('mongoose');

const schema = mongoose.Schema({
    author: { type:Object },
    mensaje: { type: String, max: 400 }
});

const Mensaje = mongoose.model('mensaje', schema);

module.exports = Mensaje;


