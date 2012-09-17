var Games = function() {
};

Games.getAnnouncement = function(successCallback, failedCallback) {
    // HACK поменять апи на нормальное когда пройдет тестирвоание
    Core.execute('games.getAnnouncement', { version: 2, restapiUrl:'http://api.sabirov.dev/restapi' }, false, successCallback, failedCallback);
};
