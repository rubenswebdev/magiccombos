var mongoose = require('mongoose');

var Schema = mongoose.Schema({
      "code": String,
      "language": String
});

module.exports = mongoose.model('Controle', Schema);
