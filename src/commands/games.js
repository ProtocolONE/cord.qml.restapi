var Games = function() {
};

Games.getMaintenance = function(callback) {
    Core.executeEx('games/maintenance/', 'get', {}, false, {}, callback);
};

Games.getNews = function(callback) {
    Core.executeEx('games/news/', 'get', {}, false, {}, callback);
};

Games.getGallery = function(gameId, callback) {
    Core.executeEx('games/gallery/', 'get', {gameId:gameId}, false, {}, callback);
};

Games.getBanners = function(gameId, callback) {
    Core.executeEx('games/banners/', 'get', {gameId:gameId}, false, {}, callback);
};

Games.getAnnouncement = function(callback) {
    Core.executeEx('games/announcement/', 'get', {}, false, {}, callback);
};

