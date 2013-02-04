TestCase('CoreSyncTestCase' ,{
    tearDown:function () {
        if (Core.instance) {
            delete Core.instance;
        }
    },

    testPrepareRequestArgs: function() {
        var coreObj = new Core();
        assertEquals("&key=value", coreObj.prepareRequestArgs({key: "value"}));
        assertEquals("&key=1", coreObj.prepareRequestArgs({key: ["1"]}));
        assertEquals("&key=1,2", coreObj.prepareRequestArgs({key: ["1", 2]}));
    },

    testStaticGetSet: function() {
        Core.setUserId('value');
        assertEquals(Core._userId, 'value');

        Core.setAppKey('value');
        assertEquals(Core._appKey, 'value');
    },

    testSetup: function() {
        Core.setup({
            userId: "id",
            appKey: "key",
            url: "someUrl",
            lang: "lang",
            auth: true
        });

        assertEquals('id', Core._userId);
        assertEquals('key', Core._appKey);
        assertEquals('someUrl', Core.instance._url);
        assertEquals('lang', Core.instance._lang);
        assertEquals(true, Core.instance._auth);
    }
});

AsyncTestCase("CoreAsyncTest", {
    coreObj: null,
    responseObject: null,

    onBodyReceived: function(body) {
        this.responseObject = body;
    },

    setUp: function () {
        this.coreObj = new Core();
        Core.setUserId("400001000012483830");
        Core.setAppKey("0f9bdd2498d4eae40d16db171d8c46212636a5a7");
    },

    testRequest: function (queue) {
        queue.call('Send a request', function(callbacks) {
            this.coreObj.execute("wall.getNews", {}, callbacks.add(this.onBodyReceived));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(this.responseObject.news)
        });
    },

    testStaticRequest: function(queue) {
        queue.call('Send a request', function(callbacks) {
            Core.execute("wall.getNews", {}, false, callbacks.add(this.onBodyReceived));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(this.responseObject.news)
        });
    },

    testRequestWithBadAuth: function(queue) {
        var userId = "400001000001634860";
        queue.call('Send a request', function(callbacks) {
            this.coreObj.execute(
                "user.getProfile", {profileId : userId}, callbacks.add(this.onBodyReceived));
        });

        queue.call('Assert the response', function() {
            assertEquals(Error.AUTHORIZATION_FAILED, this.responseObject.error.code);
        });
    },

    testRequestWithRightAuth: function(queue) {
        var userId = "400001000001634860";
        queue.call('Send a request', function(callbacks) {
            this.coreObj.auth = true;
            this.coreObj.execute("user.getProfile", {profileId : userId}, callbacks.add(this.onBodyReceived));
        });

        queue.call('Assert the response', function() {
            assertEquals(userId, this.responseObject.userInfo[0].userId)
        });
    },

    testErrorRequest: function (queue) {
        queue.call('Send a request', function(callbacks) {
            this.coreObj.execute("some.BadRequest", {}, callbacks.add(this.onBodyReceived));
        });

        queue.call('Assert the response', function() {
            assertEquals(Error.INVALID_REQUEST, this.responseObject.error.code);
        });
    },

    testHttpErrorRequest: function (queue) {
        var errorCode = 200;
        queue.call('Send a request', function(callbacks) {
            this.coreObj.url = "http://badUrl";
            this.coreObj.execute(
                "/", {}, function() {}, callbacks.add(function(status) {
                    errorCode = status;
                }));
        });

        queue.call('Assert the response', function() {
            assertNotEquals(200, errorCode);
        });
    },

    testMultiQuery: function(queue) {
        var coreObj = new Core(),
            request1Response,
            request2Response,
            request3Response;

        queue.call('Send a request', function(callbacks) {
            coreObj.execute("wall.getNews", {}, callbacks.add(function(response) {
                request1Response = response;
            }));
            coreObj.execute("wall.getNews", {}, callbacks.add(function(response) {
                request2Response = response;
            }));
            coreObj.execute("wall.getNews", {}, callbacks.add(function(response) {
                request3Response = response;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(request1Response.news);
            assertNotUndefined(request2Response.news);
            assertNotUndefined(request3Response.news);
        });
    }
});
