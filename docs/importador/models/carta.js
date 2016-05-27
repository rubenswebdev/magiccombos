var mongoose = require('mongoose');

var Schema = mongoose.Schema({
      "artist": String,
      "cmc": String,
      "colorIdentity": [],
      "colors": [],
      "flavor": String,
      "foreignNames": [],
      "id": String,
      "imageName": String,
      "layout": String,
      "legalities": [],
      "manaCost": String,
      "mciNumber": String,
      "multiverseid": Number,
      "name": String,
      "number": String,
      "originalText": String,
      "originalType": String,
      "power": String,
      "printings": [],
      "rarity": String,
      "subtypes": [],
      "text": String,
      "toughness": String,
      "type": String,
      "types": []
});

module.exports = mongoose.model('Carta', Schema);
