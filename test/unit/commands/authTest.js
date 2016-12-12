AsyncTestCase("AuthAsyncTest", {
    setUp: function () {
        Core.setUserId("400001000012483830");
        Core.setAppKey("0f9bdd2498d4eae40d16db171d8c46212636a5a7");
    },

    testGetRedirectToken: function(queue) {
        var userId = "400001000012483830",
            token;

        queue.call('Send a request', function(callbacks) {
            Auth.getRedirectToken(callbacks.add(function(body){
                response = body.token;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(userId, response);
        });
    }
});
