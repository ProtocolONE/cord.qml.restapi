AsyncTestCase("ServiceAsyncTest", {
    setUp: function () {
        Core.setUserId("400001000005869460");
        Core.setAppKey("fac8da16caa762f91607410d2bf428fb7e4b2c5e");
    },

    testGetServices: function(queue) {
        var response;

        queue.call('Send a request', function(callbacks) {
            Service.getServices('{45ECE359-D0F3-494F-B2B4-4B1FF3BD67A5}', callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertArray(response);
        });
    },

    testGetUi: function(queue) {
        var response;

        queue.call('Send a request', function(callbacks) {
            Service.getUi(callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(response);
        });
    },

    testGetGrid: function(queue) {
        var response;

        queue.call('Send a request', function(callbacks) {
            Service.getGrid(callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(response);
        });
    },

    testGetItems: function(queue) {
        var response;

        queue.call('Send a request', function(callbacks) {
            Service.getItems(30000000000, 3, callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(response[0]);
        });
    },

    testGetPromoKeysSettings: function(queue) {
        var response;

        queue.call('Send a request', function(callbacks) {
            Service.getPromoKeysSettings(30000000000, callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(response);
            assertEquals(1021, response.gameId);
        });
    }
});