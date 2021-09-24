
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    nombre: { type: String, max: 400 },
    apellido: { type: String, max: 400 },
    edad: { type: Number, max: 400 },
    timestamp: { type: Date, default: new Date() }
});

const Author = mongoose.model('author', schema);

module.exports = Author;