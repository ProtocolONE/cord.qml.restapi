AsyncTestCase("GamesAsyncTest", {
    setUp: function () {
//        Core.setUserId("400001000001634860");
//        Core.setAppKey("4c2f65777d38eb07d32d111061005dcd5a119150");
        Core.setUserId("400001000012483830");
        Core.setAppKey("0f9bdd2498d4eae40d16db171d8c46212636a5a7");
    },

    testGetAnnouncement: function(queue) {
        var response;

        queue.call('Send a request', function(callbacks) {
            Games.getAnnouncement(callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(response.announcement);
        });
    },

    testGetFacts: function(queue) {
        var response;

        queue.call('Send a request', function(callbacks) {
            Games.getFacts(callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(response.facts);
        });
    },

    testGetAdvertising: function(queue) {
        var response;

        queue.call('Send a request', function(callbacks) {
            Games.getAdvertising("71", callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(response.banners);
        });
    },

    testGetGallery: function(queue) {
        var response;

        queue.call('Send a request', function(callbacks) {
            Games.getGallery("92", callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(response.gallery);
        });
    }

});