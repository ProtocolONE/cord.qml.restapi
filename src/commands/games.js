var Games = function() {
};

Games.getAnnouncement = function(successCallback, failedCallback) {
    Core.execute('games.GetAnnouncement', {}, false, successCallback, failedCallback);
};
