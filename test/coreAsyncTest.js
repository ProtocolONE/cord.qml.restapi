var TestCase = require('njsunit').TestCase;

var RestApi = require('../build/RestApi.Test.js'),
    Core = RestApi.Core,
    Error = RestApi.Error;

class CoreAsyncTestCase extends TestCase {
    static testCaseTimeout() {
        return 30000;
    }

    constructor() {
        super();
        this.coreObj = null;
        this.responseObject = null;
    }

    onBodyReceived(body) {
        this.responseObject = body;
    }

    setUp() {
        this.coreObj = new Core();
        Core.setUserId("400001000012483830");
        Core.setAppKey("0f9bdd2498d4eae40d16db171d8c46212636a5a7");
    }

    tearDown() {
        RestApi.disableLog();
        if (Core.instance) {
            delete Core.instance;
        }
    }

    testRequest(queue) {
        this.coreObj.execute("wall.getNews", {}, (body) => {
            this.assertNotNull(body);
            queue();
        });
    }

    testStaticRequest(queue) {
        this.coreObj.execute("wall.getNews", {}, (body) => {
            this.assertNotNullOrUndefined(body.news);
            queue();
        });
    }

    testRequestWithBadAuth(queue) {
        var userId = "400001000001634860";
        this.coreObj.execute("user.getProfile", {profileId: userId}, (body) => {
            this.assertEqual(Error.AUTHORIZATION_FAILED, body.error.code);
            queue();
        });
    }

    testRequestWithRightAuth(queue) {
        var userId = "400001000001634860";
        this.coreObj.auth = true;

        this.coreObj.execute("user.getProfile", {profileId: userId}, (body) => {
            this.assertEqual(userId, body.userInfo[0].userId);
            queue();
        });
    }

    testErrorRequest(queue) {
        this.coreObj.execute("some.BadRequest", {}, (body) => {
            this.assertEqual(Error.INVALID_REQUEST, body.error.code);
            queue();
        });
    }

    // testHttpErrorRequest(queue) {
    //     this.coreObj.url = "http://badUrl";
    //     this.coreObj.execute("/", {}, function () {
    //     }, (status) => {
    //         this.assertNotEqual(200, status);
    //         queue();
    //     });
    // }

    testMultiQuery(queue) {
        var callCount = 3;
        this.coreObj.execute("wall.getNews", {}, (body) => {
            this.assertNotNullOrUndefined(body.news);
            --callCount;
            if (callCount === 0) {
                queue();
            }
        });

        this.coreObj.execute("wall.getNews", {}, (body) => {
            this.assertNotNullOrUndefined(body.news);
            --callCount;
            if (callCount === 0) {
                queue();
            }
        });

        this.coreObj.execute("wall.getNews", {}, (body) => {
            this.assertNotNullOrUndefined(body.news);
            --callCount;
            if (callCount === 0) {
                queue();
            }
        });
    }

    testGenericError(queue) {
        var responseCode;

        this.coreObj.genericErrorCallback = function (code) {
            responseCode = code;
        };

        this.coreObj.execute("some.BadRequest", {}, (body) => {
            this.assertEqual(Error.INVALID_REQUEST, body.error.code);
            this.assertEqual(Error.INVALID_REQUEST, responseCode);
            queue();
        });
    }
}

module.exports = CoreAsyncTestCase;
