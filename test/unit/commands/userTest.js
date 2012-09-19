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
    },

    testValidateNickname: function(queue) {
        var response;
        Core.setUserId("400001000012483830");
        Core.setAppKey("0f9bdd2498d4eae40d16db171d8c46212636a5a7");

        queue.call('Send a request', function(callbacks) {
            User.validateNickname('fakesomenick22everexists', callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertEquals(response.result, 1)
        });
    },

    testValidateTechNickname: function(queue) {
        var response;
        Core.setUserId("400001000012483830");
        Core.setAppKey("0f9bdd2498d4eae40d16db171d8c46212636a5a7");

        queue.call('Send a request', function(callbacks) {
            User.validateTechNickname('fakesomenickeverexists', callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertEquals(response.result, 1)
        });
    }
});