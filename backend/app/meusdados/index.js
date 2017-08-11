var express = require('express');
var rotas = express.Router();
/*arquivo com as funcoes da rota*/
var controller = require('./controller');

/*Rotas*/

/*get by id*/
rotas.get('/:id', controller.get);

/*Edit one */
rotas.put('/', controller.edit);

/*Export*/
module.exports = rotas;
