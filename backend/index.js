var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var path = require('path');
var cors = require('cors');

//socketio
var io = require('./io')();
app.use(io.mid);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

app.get('/api/', function (req, res, next) {
    res.json('online');
});

var config = require('./config');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
/*Seed - rota para cadastrar o admin no banco*/
app.use('/api/fixture', require('./app/usuario/fixture'));

//rota publicas
app.use('/api/cadastro/', require('./app/cadastro'));

/*Login de Usuarios*/
app.use('/api/', require('./app/usuario/auth'));

/*Mid para rotas da API verificar JWT*/
var jwt = require('./core/jwt');
app.use('/api/v1', jwt);

/*Modulos*/
jwt.use('/usuario', require('./app/usuario'));
jwt.use('/decks', require('./app/decks'));
jwt.use('/meusdados', require('./app/meusdados'));
jwt.use('/cartas', require('./app/cartas'));

var id = Number(process.env.id) || 0;
var hit = 0;

// app.use(function (req, res, next) {
//     console.log(req);
//     hit++;
//     console.log('Worker', id, 'received', hit, 'requests');
//     next();
// });

var port = parseInt(config.initialPort) + id;
server.listen(port, '127.0.0.1');
console.log('Server start: ' + port);
