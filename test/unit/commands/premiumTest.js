AsyncTestCase("PremiumAsyncTest", {
    setUp: function () {

        Core.setUserId("400001000012483830");
        Core.setAppKey("0f9bdd2498d4eae40d16db171d8c46212636a5a7");
    },

    testGetStatus: function(queue) {
        var response;

        queue.call('Send a request', function(callbacks) {
            Premium.getStatus(callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined('Duration', response.duration);
        });
    },

    testGetGrid: function(queue) {
        var response;

        queue.call('Send a request', function(callbacks) {
            Premium.getGrid(callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertUndefined('Grid', response.error)
            assertNotUndefined('Grid', response);
            assertArray('Response should be array', response)
        });
    }
});
