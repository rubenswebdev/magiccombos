var mongoose = require('mongoose');

var Schema = mongoose.Schema({
    nome: String,
    usuario:  {
        type: mongoose.Schema.ObjectId,
        ref: 'Usuario',
    },
    ativo: { type: Boolean, default: true },
    cartas:
    [
        {
            carta: {
                type: mongoose.Schema.ObjectId,
                ref: 'Carta',
            },
            quantidade: { type: Number, default: 1 },
            name: { type: String },
            manaCost: { type: String },
            type: { type: String },
        },
    ],
});

module.exports = mongoose.model('Deck', Schema);
