module.exports = function () {
    var socket = require('socket.io-client')('http://localhost:5050');

    socket.on('connect', function () {
        console.log('Tiozao ta vigiando nois!', socket.id);
    });

    function ioMid(req, res, next) {
        if (!req.skt && socket.id) {
            console.log('Request > ', socket.id, '>', req.decoded);
            req.skt = socket;
        }

        next();
    }

    return {
        mid: ioMid,
    };
};
