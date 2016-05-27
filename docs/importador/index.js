var fs = require('fs');
var Edicao = require('./models/edicao.js');
var Carta = require('./models/carta.js');
var config = require('./config');
var mongoose = require('mongoose');
var async = require('async');
var edicoes = [];


mongoose.connect(config.database);

start();

function start() {
    importarEdicoes();
}

function importarEdicoes() {

        var queueEdicoes = async.queue(function(_edicao, next){
                try {
                    if (_edicao.mkm_id > 0) {
                        Edicao.findOne({ mkm_id: _edicao.mkm_id }, function(err, doc) {
                            if (!doc) {
                                var edicao = new Edicao(_edicao);
                                edicao.save(function(err, doc) {
                                    console.log("importando...", doc.name);
                                    importarCartas(_edicao);
                                    next();
                                });
                            } else {
                                console.log(_edicao.name, 'já foi importada');
                                importarCartas(_edicao);
                                next();
                            }
                        });
                    } else {
                        try {
                            importarCartas(_edicao);
                            next();
                        } catch (e) {
                            console.error(e); // pass exception object to error handler
                        }
                    }
                } catch (e) {
                    console.error(e); // pass exception object to error handler
                }
        });


        var arquivos = fs.readdirSync('mtgjson/json');

        arquivos.forEach(function(fileName){
            var arquivo = fs.readFileSync('mtgjson/json/' + fileName);
            arquivo = JSON.parse(arquivo);
            queueEdicoes.push(arquivo);
        });

        queueEdicoes.drain = function() {
            console.log("!!!Fila de edicoes finalizada!!!");
        };
}

function importarCartas(arquivo) {
    edicoes[arquivo.code] = 'importando...';
    console.log(arquivo.cards.length, "CARTAS");
    var cartas = arquivo.cards;

    var queueCartas = async.queue(function(_carta, next) {

        Carta.findOne({$or: [{multiverseid: _carta.multiverseid}, {id: _carta.id}]}, function(err, doc) {
            if (!doc) {
                var carta = new Carta(_carta);
                carta.save(function(err, doc) {
                    console.log("importando carta", _carta.id, _carta.name, _carta.multiverseid);
                    next();
                });
            } else {
                console.log("|||||||||| Carta", _carta.id, " => ", _carta.multiverseid,"já foi importada ||||||||||");
                next();
            }
        });

    }, 1);

    cartas.forEach(function (carta) {
        queueCartas.push(carta);
    });

    queueCartas.drain = function () {
        delete edicoes[arquivo.code];
        console.log("Fila finalizada=>>>>>>>>>", arquivo.name);
    };
}
