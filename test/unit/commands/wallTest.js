/**
 * Created with JetBrains PhpStorm.
 * User: Ilya
 * Date: 04.02.13
 * Time: 11:47
 * To change this template use File | Settings | File Templates.
 */
AsyncTestCase("WallAsyncTest", {
    testGetNews: function(queue) {
        var response;

        queue.call('Send a request', function(callbacks) {
            Wall.getNews(callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(response);
        });
    },

    testGetNewsXml: function(queue) {
        var response;

        queue.call('Send a request', function(callbacks) {
            Wall.getNewsXml(callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(response);
        });
    }

});