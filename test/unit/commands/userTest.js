AsyncTestCase("UserAsyncTest", {
    setUp: function () {
        Core.setUserId("400001000001634860");
        Core.setAppKey("4c2f65777d38eb07d32d111061005dcd5a119150");
    },

    testSearch: function(queue) {
        var userId = "400001000012483830",
            response;

        queue.call('Send a request', function(callbacks) {
            User.search("a", false, callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(userId, response);
        });
    },

    testGetProfile: function(queue) {
        var userId = "400001000012483830",
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
                console.log(1111)
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(response.speedyInfo.balance);
        });
    },

    testValidateNickname: function(queue) {
        var response;
        Core.setUserId("400007000068924890");
        Core.setAppKey("d0876633b14a43cbbf4ac5df9e52bcd776c47461");

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
        Core.setUserId("400007000068924890");
        Core.setAppKey("d0876633b14a43cbbf4ac5df9e52bcd776c47461");

        queue.call('Send a request', function(callbacks) {
            User.validateTechNickname('fakesomenickeverexists', callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertEquals(response.result, 1)
        });
    },
    testGetPlayedInfo: function(queue) {
        var response;
        queue.call('Send a request', function(callbacks) {
            User.getPlayedInfo('400001000005869460', callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(response);
        });
    }
});