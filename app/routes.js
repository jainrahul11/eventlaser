var mongoose = require('mongoose');

exports = module.exports = function (app) {

    var User = mongoose.model('user');

    app.get('/', function (req, res, next) {
        res.render('index.html', {title: 'Laser Shoot'});
    });

    app.get('/users', function (req, res, next) {
        res.render('photos.html', {title: 'Laser Shoot'});
    });

    app.get('/userImage/:id', function (req, res, next) {

        var id = new mongoose.Types.ObjectId(req.params.id);
        User.findOne({_id: id}, {__v: 0}).exec(function (err, user) {

            if (err) {
                console.log(err);
                req.send(err);
                return;
            }
            res.render('print.html', {title: 'Laser Shoot', user: user});

        });
    });

    return app;
};