var fs = require('fs');
var Edicao = require('./models/edicao.js');
var Carta = require('./models/carta.js');
var Controle = require('./models/controle.js');
var config = require('./config');
var mongoose = require('mongoose');
var async = require('async');
var Q = require('q');
var edicoes = [];
var goNext = true;

mongoose.connect(config.database);

start();

function start() {
    importarEdicoes();
}

function importarEdicoes() {

        var queueEdicoes = async.queue(function(_edicao, next){
                try {
                    if (_edicao.releaseDate) {
                        Edicao.findOne({ code: _edicao.code }, function(err, doc) {
                            if (!doc) {
                                var edicao = new Edicao(_edicao);
                                edicao.language = 'en';
                                edicao.save(function(err, doc) {
                                    console.log("importando...", doc.name);
                                    importarCartas(_edicao).then(function () {
                                        if (goNext) {
                                            next();
                                        }
                                    });
                                });
                            } else {
                                console.log(_edicao.name, 'já foi importada');
                                importarCartas(_edicao).then(function () {
                                    if (goNext) {
                                        next();
                                    }
                                });
                            }
                        });
                    } else {
                        try {
                            importarCartas(_edicao).then(function () {
                                if (goNext) {
                                    next();
                                }
                            });
                        } catch (e) {
                            console.error(e); // pass exception object to error handler
                        }
                    }
                } catch (e) {
                    console.error(e); // pass exception object to error handler
                }
        }, 1);


        var arquivos = fs.readdirSync('mtgjson/json');

        arquivos.forEach(function(fileName){
            console.log('Arquivo', fileName);
            var arquivo = fs.readFileSync('mtgjson/json/' + fileName);
            if (fileName !== '.editorconfig') {
                arquivo = JSON.parse(arquivo);
                queueEdicoes.push(arquivo);
            }
        });

        queueEdicoes.drain = function() {
            console.log("!!!Fila de edicoes finalizada!!!");
        };
}

function importarCartas(arquivo) {
    var deferred = Q.defer();
    var cartas = arquivo.cards;
    var cartasImportar = [];

    arquivo.language = arquivo.language ? arquivo.language : 'en';




    var queueCartas = async.queue(function(_carta, next) {

        Carta.findOne({$or: [{multiverseid: _carta.multiverseid}, {id: _carta.id}]}, { _id: 1 }, function(err, doc) {
            if (!doc) {
                var carta = _carta;
                carta.code = arquivo.code;
                carta.language = arquivo.language;
                cartasImportar.push(carta);
                //carta.save(function(err, doc) {
                    //console.log("importando carta", _carta.id, _carta.name, _carta.multiverseid);
                    if (goNext) {
                        next();
                    }
                //});
            } else {
                //console.log("Carta", _carta.id, " => ", _carta.multiverseid,"já foi importada.");
                if (goNext) {
                    next();
                }
            }
        });

    }, 1);

    if (cartas.length === 0) {
        deferred.resolve();
    } else {
        Controle.findOne({ code: arquivo.code, language: arquivo.language }, function (err, jafoi) {
            if (!jafoi) {
                console.log('QUANTIDADE:', cartas.length);
                cartas.forEach(function (carta) {
                    queueCartas.push(carta);
                });
            } else {
                deferred.resolve();
            }
        });
    }

    queueCartas.drain = function () {
        Carta.create(cartasImportar, function (err, res){
            Controle.create([{
                code: arquivo.code,
                language: arquivo.language
            }], function () {
                deferred.resolve();
                console.log("Fila finalizada=>>>>>>>>>", arquivo.name);
            });
        });
    };



    return deferred.promise;
}
