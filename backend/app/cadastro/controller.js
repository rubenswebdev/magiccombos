/* Model*/
var Model = require('../usuario/model');
var bcrypt = require('bcrypt-nodejs');

exports.teste = function (req, res) {
  res.json('online');
}

exports.get = function (req, res) {
    Model.findOne(
      { _id: req.params.id },// Where
      { password: 0 },
      function (err, data) { // o que fazer com o resultado
        res.json(data);
    }
    );
};

exports.new = function (req, res) {
    var model = new Model(req.body);
    model.save(function (err, data) {
        //err null quando ta tudo certo, data traz o model inserido,
        if (!err && data) {
            //form apenas para debugar
            res.json({ success: true, data: data, err: err, form: req.body });
        } else {
            res.json({ success: false, data: data, err: err, form: req.body });
        }
    });
};

exports.delete = function (req, res) {
    Model.remove({ _id: req.params.id }, function (err, data) {
        res.json(data);
    });
};

exports.edit = function (req, res) {

    Model.findOne(
     { _id: req.body._id },
     function (err, model) {
        if (req.body.password && req.body.password !== '') {
            model.password = req.body.password;
            console.log('senha alterada!');
        }

        model.login = req.body.login;
        model.nome = req.body.nome;
        model.email = req.body.email;

        model.save(function (err, data) {
            if (!err && data) {
                res.json({ success: true, data: data, err: err, form: req.body });
            } else {
                res.json({ success: false, data: data, err: err, form: req.body });
            }
        });
    }
    );
    /*

     Model.update(
      {_id: req.body._id}, //where
      req.body,//options
      function (err, data){
       if (!err && data) {
        res.json({"success": true, "data": data, "err" : err, "form" : req.body});
       } else {
        res.json({"success": false, "data": data, "err" : err, "form" : req.body});
       }
      }
     );*/
};
