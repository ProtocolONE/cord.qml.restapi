AsyncTestCase("GamesAsyncTest", {
    setUp: function () {
        Core.setUserId("400001000001634860");
        Core.setAppKey("4c2f65777d38eb07d32d111061005dcd5a119150");
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
	
    testSetSteamId: function(queue) {
		var setResponse,
		    getResponse,
			steamId = "someSteamId";

        queue.call('Send a request', function(callbacks) {
            Games.setSteamId(steamId, true, callbacks.add(function(body){
                setResponse = body;
            }));
            User.getMainInfo(callbacks.add(function(body){
                getResponse = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(setResponse);
            assertNotUndefined(getResponse);
            assertEquals(setResponse.result, 1);
            assertEquals(getResponse.mainInfo.steamId, steamId);
        });
    },

    testGetCSWeaponsStat: function(queue) {
        var response;

        queue.call('Send a request', function(callbacks) {
            Games.getCSWeaponsStat(callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(response.result);
        });
    },

    testGetCSMapsStat: function(queue) {
        var response;

        queue.call('Send a request', function(callbacks) {
            Games.getCSMapsStat(callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(response.result);
        });
    },

    testGetCSCharStat: function(queue) {
        var response;

        queue.call('Send a request', function(callbacks) {
            Games.getCSCharStat(callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(response.result);
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
            assertNotUndefined(response.result);
        });
    }
});