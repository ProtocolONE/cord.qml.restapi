var Games = function() {
};

Games.getAnnouncement = function(successCallback, failedCallback) {
    Core.execute('games.getAnnouncement', { version: 2 }, false, successCallback, failedCallback);
};
