exports = module.exports = function (app, io) {
    var server = require('http').createServer(app);

    var mongoose = require('mongoose');
    var User = mongoose.model('user');

    var default_settings = {
        key: "settings",
        user_life: 75,
        colors: [
            {r: 255, g: 107, b: 107},
            {r: 78, g: 203, b: 195},
            {r: 199, g: 242, b: 100},
            {r: 83, g: 99, b: 111}
        ],
        history_length: 20,
        blob_height: 30,
        sensitivity: 1,
        background: ''
    };

    var timeouts = {};

    var Hex2RGB = function (hex) {
        if (hex.lastIndexOf('#') > -1) {
            hex = hex.replace(/#/, '0x');
        } else {
            hex = '0x' + hex;
        }
        var r = hex >> 16;
        var g = (hex & 0x00FF00) >> 8;
        var b = hex & 0x0000FF;
        return {r: r, g: g, b: b};
    };
    var settings_id;
    var settings_current = default_settings;
    var return_settings = function (socket, settings) {
        // console.log("Return settings", settings);
        if (socket) {
            if (settings._id !== undefined)delete settings._id;
            if (settings.key !== undefined)delete settings.key;
            socket.emit('settings', settings);
        }
    };
    var save_settings = function (settings, callback) {
        if (settings.colors) {
            for (i in settings.colors) {
                if (settings.colors[i].constructor === String)settings.colors[i] = Hex2RGB(settings.colors[i]);
            }
        }
        app.db.data.update({key: 'settings'}, {$set: settings}, {upsert: true}, callback);
        // console.log('Return saved settings');
        return_settings(bsock, settings);
        return_settings(csock, settings);
        settings_current = JSON.parse(JSON.stringify(settings));
    };
    var load_settings = function (socket) {
        app.db.data.find({key: 'settings'}, function (err, settings) {
            var changed = false;
            if (settings.length == 0) {
                settings[0] = default_settings;
                changed = true;
            }
            else {
                for (setting in default_settings) {
                    if (settings[0][setting] === undefined) {
                        settings[0][setting] = default_settings[setting];
                        changed = true;
                    }
                }
            }
            settings_current = JSON.parse(JSON.stringify(settings[0]));
            if (changed) save_settings(settings[0], function (err, numReplaced, new_settings) {
            });
            else return_settings(socket, settings[0]);
        });
    };

    var bsock = io.of('/bsock').on('connection', function (socket) {
        // Socket for Browser Screens
        app.db.users.find({}, function (err, users) {
            load_settings(socket);
            socket.emit('init', {users: users});
        });

        socket.on('finalize', function (data) {

            app.db.users.update({_id: data._id}, {
                $set: {
                    status: 'final',
                    pos: data.pos
                }
            }, {}, function (err, numReplaced) {
                csock.emit('user_finalized', data._id);
                socket.emit('user_finalized', data._id);
                timeouts[data._id] = setTimeout(function () {
                    app.db.users.remove({_id: data._id}, {}, function (err, numRemoved) {
                        if (numRemoved === 1) {
                            bsock.emit('user_expired', data._id);
                            socket.emit('user_expired', data._id);
                        }
                        delete timeouts[data._id];
                    });
                }, settings_current.user_life * 1000);
            });

        });
        socket.on('settings', function (s) {

            // console.log('Settings requested', s);
            if (s)save_settings(s, function (err, numReplaced, new_settings) {
            });
            else app.db.data.find({key: 'settings'}, function (err, settings) {
                // console.log("Settings in database", settings);
                return_settings(socket, settings[0]);
            });
        });
    });

    // enter , finilize , setting ,,,,,,, 3 event

    var csock = io.of('/csock').on('connection', function (socket) {


                console.log('[' + Date.now() + ']', 'Connected socket ', socket.id);
                // Socket for Client Apps
                load_settings(socket);

                socket.emit('conn', 'connected');

                socket.on('register', function (user) {

                    console.log('[' + Date.now() + ']', 'Received user registration request on socket', socket.id);

                    // Pass the following data to register a user
                    // Object(name, msg, dp, color)
                    // On registration the event new_user is emitted back to the client with the full user object

                    if (user.name) {
                        console.log(user.name);
                        user.status = 'init';
                        user.history = [];
                        if (user.color) {
                            if (user.color.constructor == String) user.color = Hex2RGB(user.color);
                        }
                        else user.color = null;
                        if (!user.color) user.color = settings_current.colors[Math.floor(Math.random() * settings_current.colors.length)];
                        user._created = new Date().getTime();

                        app.db.users.insert(user, function (err, new_user) {
                            bsock.emit('new_user', new_user);
                            socket.emit('new_user', new_user);
                            if (!user.pos) user.pos = {x: 0, y: 0};
                        });

                        var userInfo = new User({

                            'name': user.name,
                            'msg': user.msg,
                            'dp': user.dp,
                            'color': user.color,
                            'created': user.created

                        });

                        userInfo.save(function (err, res) {

                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('user save in db successfully');
                                }
                            }
                        );

                    }
                });


                socket.on('shake', function (data) {

                    csock.emit('user_finalized', data._id);
                    bsock.emit('finalize', data);
                    // bsock.emit('user_expired', data._id);
                    // socket.emit('user_expired', data._id);
                    //  socket.emit('user_finalized', data._id);


                    timeouts[data._id] = setTimeout(function () {
                        app.db.users.remove({_id: data._id}, {}, function (err, numRemoved) {
                            if (numRemoved === 1) {
                                bsock.emit('user_expired', data._id);
                                socket.emit('user_expired', data._id);
                            }
                            delete timeouts[data._id];
                        });
                    }, settings_current.user_life * 1000);


                    app.db.users.update({_id: data._id}, {$set: {shake: 'done'}}, {}, function (err, numReplaced) {
                    });

                });

                var pos_ts = [];
                socket.on('position', function (data) {


                    if (!pos_ts[data._id]) pos_ts[data._id] = Math.floor(Date.now() / 1000);
                    if (Math.floor(Date.now() / 1000) - pos_ts[data._id] >= 5) {
                        console.log('[' + Date.now() + ']', 'Received position data for', data._id, 'on socket', socket.id);
                        pos_ts[data._id] = Math.floor(Date.now() / 1000);
                    }
                    // Pass the following data to position a user
                    // Object(_id, pos)
                    // pos examples: {x: 0, y: 0} for (50%, 50%), {x: 50, y: 50} for (100%, 100%), {x: -50, y: -50} for (0%, 0%)
                    //	console.log(data);
                    var g = 9.80665;
                    var gc = {x: data.gyro.x / g, y: data.gyro.y / g, z: data.gyro.z / g};
                    var new_data = {_id: data._id, pos: {}};
                    new_data.g_force = Math.sqrt(gc.x * gc.x + gc.y * gc.y + gc.z * gc.z);
                    if (data) {
                        if (typeof data.acc !== undefined) new_data.acc = data.acc;
                        if (typeof data.gyro !== undefined) new_data.gyro = data.gyro;
                        new_data.pos.x = Math.floor(-data.acc.x * 49) / 10;
                        new_data.pos.y = Math.floor(data.acc.z * 65) / 10;

                        // change y coordinate vale

                    }
                    else {
                        new_data.pos = {x: 0, y: 0};
                    }

                    if (data._id) {
                        app.db.users.findOne({_id: data._id}, {history: 1, status: 1}, function (err, user) {
                            if (!user) {
                                socket.emit('user_expired', data._id);
                                return;
                            }
                            if (user.status == 'paused') {
                                var d = JSON.parse(JSON.stringify(new_data));
                                if (user.history.length >= settings_current.history_length) {
                                    app.db.users.update({_id: data._id}, {$pop: {history: -1}});
                                    user.history.shift();
                                }
                                app.db.users.update({_id: data._id}, {$push: {history: d}});
                                user.history.push(d);
                            }
                            else if (user.status == 'positioning') app.db.users.update({_id: data._id}, {$set: new_data}, {}, function (err, numReplaced) {
                            });
                            new_data.history = user.history;
                            new_data.status = user.status;
                            bsock.emit('user_position', new_data);
                        });
                    }
                });


                socket.on('position_started', function (data) {

                    console.log("position start");
                    app.db.users.update({_id: data._id}, {$set: {status: 'positioning'}}, {}, function (err, numReplaced) {
                    });
                });


                socket.on('position_stopped', function (data) {

                    app.db.users.update({_id: data._id}, {$set: {status: 'paused'}}, {}, function (err, numReplaced) {
                    });

                });


                socket.on('reposition', function (data) {

                    console.log('[' + Date.now() + ']', 'Received repositioning request on socket', socket.id);
                    var exists = false;
                    app.db.users.findOne({_id: data._id, status: 'final'}, function (err, user) {
                        if (user) {
                            app.db.users.update({_id: user._id}, {$set: {status: 'positioning'}}, {}, function (err, numReplaced) {
                                if (timeouts[user._id]) {
                                    clearTimeout(timeouts[user._id]);
                                    delete timeouts[user._id];
                                }
                                bsock.emit('reposition', {_id: user._id});
                                socket.emit('reposition', {_id: user._id});
                            });
                        }
                        else socket.emit('reposition_failed', {_id: user._id, err: 'no_user'});
                    });
                });

                socket.on('settings', function (s) {

                    console.log('[' + Date.now() + ']', 'Received settings request/data on', socket.id);
                    if (s)save_settings(s, function (err, numReplaced, new_settings) {
                    });
                    else app.db.data.find({key: 'settings'}, function (err, settings) {
                        return_settings(socket, settings[0]);
                    });
                });

                socket.on('disconnect', function () {

                    console.log('[' + Date.now() + ']', 'Disconnected', socket.id);
                });
            }
        )
        ;


    var psock = io.of('/psock').on('connection', function (socket) {

        app.db.users.find({}, function (err, users) {
            load_settings(socket);
            socket.emit('init', {users: users});
        });
    });
    load_settings();
    return server;
}
;