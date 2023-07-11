(function () {

    $.get('/user', function (data) {
        usersData.init(data);
    });

    var list = {
        container: $('#photos_list'),
        add: function (user) {
            this.container.prepend(user);
        },
        clear: function () {
            this.container.empty();
        }

    };

    var usersData = {

        dummy: $('#user-dummy').html(),
        init: function (user_list) {

            for (i = 0; i < user_list.length; i++) {
                this.create(user_list[i]);
            }

        },
        create: function (user) {
            if (user._id) {
                var dummy = $(this.dummy);
                dummy.attr('id', user._id);
                dummy.find('.name').text(user.name);
                dummy.find('.msg').text(user.msg);
                if (user.dp) dummy.find('.dp img').attr('src', user.dp);
                dummy.find('.print_button').click(function () {
                    window.open('/userImage/' + user._id, 'slingshot_photo', 'width=400, height=600, left=100, top=100');
                });
                list.add(dummy);
            }
        }
    };

    $('#filter').on('input', function () {

        var val = $(this).val();

        $.get('/user?name=' + val, function (data) {

            list.clear();
            usersData.init(data);
        });

    });


    /*

     var socket = io.connect(':3000/psock', {transports: ['websocket', 'polling']});

     var settings = {};
     var settings_init = false;
     var settings_update = function(s) {
     if(s) $.extend(settings, s);
     };


     var users = {
     dummy: $('#user-dummy').html(),
     init: function(user_list) {
     if(user_list && user_list.constructor == Array) for(i=0; i < user_list.length; i++) {
     this.create(user_list[i]);
     }
     },
     create: function(user) {
     if(user._id && (user.status == 'final' || user.status == 'expired')) {
     var dummy = $(this.dummy);
     dummy.attr('id', user._id);
     dummy.find('.name').text(user.name);
     if(user.dp) dummy.find('.dp img').attr('src', user.dp);
     dummy.find('.print_button').click(function() {
     window.open('/print?id=' + user._id, 'slingshot_photo', 'width=400, height=600, left=100, top=100');
     });
     list.add(dummy);
     }
     }
     };

     var list = {
     container: $('#photos_list'),
     add: function(user) {
     this.container.prepend(user);
     }
     };

     socket.on('settings', function(s) {
     settings_update(s);
     // if(!settings_init) users.init();
     // settings_init = true;
     });

     socket.on('init', function(data) {

     if(data.users) users.init(data.user);
     });

     */

}());