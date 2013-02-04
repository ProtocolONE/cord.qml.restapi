/**
 * Created with JetBrains PhpStorm.
 * User: Ilya
 * Date: 04.02.13
 * Time: 11:45
 * To change this template use File | Settings | File Templates.
 */
var Wall = function() {
};

Wall.getNews = function(successCallback, failedCallback) {
    Core.execute('wall.getNews', {}, false, successCallback, failedCallback);
};

Wall.getNewsXml = function(successCallback, failedCallback) {
    Core.execute('wall.getNews', { format: 'xml' }, false, successCallback, failedCallback);
};