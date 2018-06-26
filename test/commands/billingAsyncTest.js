var TestCase = require('njsunit').TestCase;

var RestApi = require('../../build/RestApi.Test.js'),
    Core = RestApi.Core,
    Billing = RestApi.Billing;

class BillingAsyncTestCase extends TestCase {
    setUp() {
        Core.setUserId("400001000012483830");
        Core.setAppKey("0f9bdd2498d4eae40d16db171d8c46212636a5a7");
    }

    tearDown() {
        RestApi.disableLog();
    }

    testIsInGameRefillAvailable(queue) {
        Billing.isInGameRefillAvailable((response) => {
            this.assertNotUndefined(response.enabled);
            queue();
        });
    }
};

module.exports = BillingAsyncTestCase;

