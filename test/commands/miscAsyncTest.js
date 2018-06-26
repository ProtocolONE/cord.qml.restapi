var TestCase = require('njsunit').TestCase;

var RestApi = require('../../build/RestApi.Test.js'),
    Core = RestApi.Core,
    Misc = RestApi.Misc;

class MiscAsyncTestCase extends TestCase {
    setUp() {
        //RestApi.enableLog()
        Core.setUserId("400001000012483830");
        Core.setAppKey("0f9bdd2498d4eae40d16db171d8c46212636a5a7");
    }

    tearDown() {
        RestApi.disableLog();
    }

    testGetTime(queue) {
        Misc.getTime((response) => {
            this.assertNotUndefined(response.timestamp);
            this.assertNotUndefined(response.atom);
            queue();
        });
    }
};

module.exports = MiscAsyncTestCase;
