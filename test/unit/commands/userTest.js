AsyncTestCase("UserAsyncTest", {
    setUp: function () {
        Core.setUserId("400001000000065690");
        Core.setAppKey("e8d6b0a31b408946334f23355ee2a0297f2758ac");
    },

    testGetProfile: function(queue) {
        var userId = "400001000000065690",
            response;

        queue.call('Send a request', function(callbacks) {
            User.getProfile(userId, callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(userId, response.userInfo[0].userId);
        });
    }
});