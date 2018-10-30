var TestCase = require('njsunit').TestCase;

var RestApi = require('../../build/RestApi.Test.js'),
    Core = RestApi.Core,
    ErrorEx = RestApi.ErrorEx,
    Misc = RestApi.Misc;

class MiscAsyncTestCase extends TestCase {
    setUp() {
        //RestApi.enableLog()
    }

    tearDown() {
        RestApi.disableLog();
    }

    testGetTime(queue) {
        RestApi.enableLog()
        Misc.getTime((code, response) => {
            this.assert(ErrorEx.isSuccess(code), 'RestApi error : ' + code);
            this.assertNotUndefined(response.timestamp);
            this.assertNotUndefined(response.atom);
            queue();
        });
    }

    testGetIp(queue) {
        RestApi.enableLog()
        Misc.getIp((code, response) => {
            this.assert(ErrorEx.isSuccess(code), 'RestApi error : ' + code);
            this.assertNotUndefined(response.ip);
            queue();
        });
    }
};

module.exports = MiscAsyncTestCase;
