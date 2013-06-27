var Wall = function() {
};

Wall.getNews = function(successCallback, failedCallback) {
    Core.execute('wall.getNews', {}, false, successCallback, failedCallback);
};

Wall.getNewsXml = function(successCallback, failedCallback) {
    Core.execute('wall.getNews', { format: 'xml' }, false, successCallback, failedCallback);
};