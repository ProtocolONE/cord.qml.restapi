var Games = function() {
};

Games.getAnnouncement = function(successCallback, failedCallback) {
    Core.execute('games.getAnnouncement', { version: 2 }, false, successCallback, failedCallback);
};

// Метод используется для особой внутренней утилиты. В продакшене не использовать.
Games.getAnnouncementWithUnpublished = function(successCallback, failedCallback) {
    Core.execute('games.getAnnouncement', { version: 2, isPublished: 0, rnd: Math.random() }, false, successCallback, failedCallback);
};