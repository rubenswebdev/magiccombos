var config = require('./config');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

var Model = require('./app/cartas/model');

Model.aggregate([

    { $match:
        {
            $or: [
                { name: { $regex: 'angel', $options: 'ig' } },
                { 'foreignNames.name': { $regex: 'angel', $options: 'ig' } },
            ],
            language: 'en',
        },
},

    { $limit: 1 },
    { $unwind: '$foreignNames' },
    { $match:
        {
            $or: [
                { name: { $regex: 'angel', $options: 'ig' } },
                { 'foreignNames.language': { $regex: 'Brazil', $options: 'ig' } },
            ],
        },
},
    { $project: { name: 1, 'foreignNames.name': 1 } },
], parseResults);

function parseResults(err, res) {
    console.log(res);
}
