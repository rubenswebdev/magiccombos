var express = require('express');
var rotas = express.Router();
/*arquivo com as funcoes da rota*/
var controller = require('./controller');

/*Rotas*/

/*get by id*/
rotas.get('/', controller.teste);
rotas.get('/:id', controller.get);

/*save one*/
rotas.post('/', controller.new);

/*Edit one */
rotas.put('/', controller.edit);

/*Export*/
module.exports = rotas;
