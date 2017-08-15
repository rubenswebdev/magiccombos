var config = require('./config');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
var Carta = require('./models/carta.js');

start().catch(console.log);

async function start() {
    let cartas = await Carta.find({}).limit(30000).skip(30000).exec();

    let total = cartas.length;

    for (let carta of cartas) {
        let totalF = carta.foreignNames.length;
        total--;
        for (let fcarta of carta.foreignNames) {

            if (fcarta.multiverseid) {
                let c = await Carta.update({ multiverseid: fcarta.multiverseid }, { $set: { name: fcarta.name } });
                console.log(total, totalF, fcarta.name, c, fcarta.multiverseid);
            }

            totalF--;
        }

    }
}
