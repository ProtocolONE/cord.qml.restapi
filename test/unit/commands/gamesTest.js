AsyncTestCase("GamesAsyncTest", {
    setUp: function () {
        Core.setUserId("400001000001634860");
        Core.setAppKey("c99ebc84714c0c316dd891602dc916d238ef73ed");
    },

    testGetAnnouncement: function(queue) {
        var response;

        queue.call('Send a request', function(callbacks) {
            Games.getAnnouncement(callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            console.log(response.announcement);
            assertNotUndefined(response.announcement);
        });
    }
});