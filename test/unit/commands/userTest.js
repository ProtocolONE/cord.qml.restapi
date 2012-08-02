AsyncTestCase("UserAsyncTest", {
    setUp: function () {
        Core.setUserId("400001000001634860");
        Core.setAppKey("c99ebc84714c0c316dd891602dc916d238ef73ed");
    },

    testGetProfile: function(queue) {
        var userId = "400001000001634860",
            response;

        queue.call('Send a request', function(callbacks) {
            User.getProfile(userId, callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(userId, response.userInfo[0].userId);
        });
    },

    testGetBalance: function(queue) {
        var response;

        queue.call('Send a request', function(callbacks) {
            User.getBalance(callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(response.speedyInfo.balance);
        });
    }
});