// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LaserShootSchema = new mongoose.Schema({

    name: {
        type: String
    },
    msg: {
        type: String
    },
    dp: {
        type: String
    },
    userId: {
        type: String
    },
    eventId: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    }

});

// create the model for users and expose it to our app
exports.LaserShootSchema = module.exports.LaserShootSchema = LaserShootSchema;

exports.boot = module.exports.boot = function (app) {
    mongoose.model('LaserShoot', LaserShootSchema);
    return app.models.LaserShoot = mongoose.model('LaserShoot');
};