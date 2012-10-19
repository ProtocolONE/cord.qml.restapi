AsyncTestCase("SocialAsyncTest", {
    setUp: function () {
        Core.setUserId("400001000001634860");
        Core.setAppKey("c99ebc84714c0c316dd891602dc916d238ef73ed");
    },

    testSendInvite: function(queue) {
        return; // Отключено, из-за ограничения в 5 запросов в сутки.
        var response,
            originId = "400001000001634860",
            originAppKey = "c99ebc84714c0c316dd891602dc916d238ef73ed",
            friendAppKey = "54113ca91ba4fd08e5f687ecc8a753bf81eca7c8",
            friendId = "400001000042460760";

         queue.call('Send a request', function(callbacks) {
            Social.sendInvite(friendId, callbacks.add(function(body) {
                response = body;
            }));

            Core.setUserId(friendId);
            Core.setAppKey(friendAppKey);

            Social.getInvitesList(0, 20, callbacks.add(function(body) {
                var testPassed = false;

                for (var n in body)
                    if (body[n][0].id == originId) {
                        testPassed = true;
                        break;
                    }

                assertEquals(testPassed, true);

                if (!testPassed)
                    return;

                Social.agreeInvite(originId, callbacks.add(function(body) {
                        assertEquals(body.result, 1);

                        Social.removeFriend(originId, callbacks.add(function(body) {
                            assertEquals(body.result, 1);
                        }));
                    }
                ));
            }));
        });

        queue.call('Assert the response', function() {
            assertEquals(response.result, 1);
        });
    }
});