var mongoose = require('mongoose');

var Schema = mongoose.Schema({
  "name": String,
  "code": String,
  "magicCardsInfoCode": String,
  "releaseDate": String,
  "border": String,
  "type": String,
  "block": String,
  "booster": [],
  "translations": {
    "de": String,
    "fr": String,
    "it": String,
    "es": String,
    "pt": String,
    "jp": String,
    "cn": String,
    "ru": String,
    "tw": String,
    "ko": String
  },
  "mkm_name": String,
  "mkm_id": Number,
});

module.exports = mongoose.model('Edicao', Schema);
