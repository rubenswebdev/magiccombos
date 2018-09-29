var fs = require('fs');
var Edicao = require('./models/edicao.js');
var Carta = require('./models/carta.js');
var Controle = require('./models/controle.js');
var config = require('../config');
var async = require('async');
var crypto = require('crypto');
var Q = require('q');
var edicoes = [];
var goNext = true;

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

start();

function start() {
    importarEdicoes().catch(console.log);
}

async function importarEdicoes() {
    var arquivos = fs.readdirSync('mtgjson/json');
    let edicoes = [];

    //ler todos os arquivos
    for (let fileName of arquivos) {

        //console.log('Arquivo', fileName);
        let arquivo = fs.readFileSync('mtgjson/json/' + fileName);
        if (fileName !== '.editorconfig') {
            arquivo = JSON.parse(arquivo);
            edicoes.push(arquivo);
        }
    }

    //verificar existencia de cada edicao
    for (let e of edicoes) {

        //se for um arquivo da edicao completo
        if (e.releaseDate) {
            let edicao = await Edicao.findOne({ code: e.code }).exec();

            //se nao existe ainda criar
            if (!edicao) {
                edicao = new Edicao(e);
                edicao.language = 'en';
                await edicao.save();
            }
        }
    }

    //importar todas as cartas
    let totalCards = 0;
    for (let e of edicoes) {
        e.language =  e.language || 'en';
        totalCards += e.cards.length;

        for (let carta of e.cards) {

            let id = getHash(e.code + e.language + carta.number + carta.name + carta.multiverseid);
            carta.id = id;

            let card = await Carta.find({ id: carta.id }, { name: 1, multiverseid: 1, id: 1 }).limit(1).exec();

            if (!card[0]) {
                carta.code = e.code;
                carta.language = e.language;

                let newCard = new Carta(carta);
                await newCard.save();

                //console.log(totalCards, e.code, e.language, newCard.name, newCard.multiverseid, newCard.id);
            }

            //else {
            //console.log(totalCards, 'Carta já existe', e.code, e.language, card[0].name, card[0].multiverseid, card[0].id);
            //}
        }

        console.log(totalCards, e.code, e.language);
    }

    console.log('Done');
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

var getHash = function (text) {
    return crypto.createHash('sha1').update(text).digest('hex');
};
