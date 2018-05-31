var Games = function() {
};

Games.getAnnouncement = function(successCallback, failedCallback) {
    Core.execute('games.getAnnouncement', { version: 2 }, true, successCallback, failedCallback);
};

// Метод используется для особой внутренней утилиты. В продакшене не использовать.
Games.getAnnouncementWithUnpublished = function(successCallback, failedCallback) {
    Core.execute('games.getAnnouncement', { version: 2, isPublished: 0, rnd: Math.random() }, false, successCallback, failedCallback);
};

//Метод сложно протестировать на бою, т.к. расписание и вообще его наличие постоянно меняется
Games.getMaintenance = function(successCallback, failedCallback) {
    Core.execute('games.getMaintenance', {}, false, successCallback, failedCallback);
};

Games.getFacts = function(successCallback, failedCallback) {
    Core.execute('games.getFacts', {version: 2}, false, successCallback, failedCallback);
};

Games.getAdvertising = function(game, successCallback, failedCallback) {
    Core.execute('games.getAdvertising', {
		gameId: game,
		version: 2
	},
	false, successCallback, failedCallback);
};

Games.getGallery = function(game, successCallback, failedCallback) {
    Core.execute('games.getGallery', {
            gameId: game,
            version: 1
        },
        false, successCallback, failedCallback);
};

Games.getThemes = function(successCallback, failedCallback) {
    Core.execute('games.getThemes', {}, false, successCallback, failedCallback);
};

Games.resetBlackDesertPin = function(code, successCallback, failedCallback) {
    Core.execute('games.resetBlackDesertPin', {
        code: code
    },
    true, successCallback, failedCallback);
};

