/**
 * Created by Ilya on 18.10.16.
 */
AsyncTestCase("MiscAsyncTest", {
    setUp: function () {
        Core.setUserId("400001000012483830");
        Core.setAppKey("0f9bdd2498d4eae40d16db171d8c46212636a5a7");
    },

    testGetTime: function(queue) {
        var response;

        queue.call('Send a request', function(callbacks) {
            Misc.getTime(callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(response.timestamp);
            assertTrue(response.hasOwnProperty('atom'))
        });
    }
});