var TestCase = require('njsunit').TestCase;

var RestApi = require('../../build/RestApi.Test.js'),
    Core = RestApi.Core,
    Service = RestApi.Service;

class ServiceAsyncTestCase extends TestCase {
    setUp() {
        //RestApi.enableLog()
        Core.setUserId("400001000005869460");
        Core.setAppKey("fac8da16caa762f91607410d2bf428fb7e4b2c5e");
    }

    tearDown() {
        RestApi.disableLog();
    }

    testGetServices(queue) {
        Service.getServices('{45ECE359-D0F3-494F-B2B4-4B1FF3BD67A5}', (response) => {
            this.assertNotNullOrUndefined(response);
            queue();
        });
    }

    testGetUi(queue) {
        Service.getUi((response) => {
            this.assertNotNullOrUndefined(response[0].name);
            queue();
        });
    }

    testGetGrid(queue) {
        Service.getGrid((response) => {
            this.assertNotNullOrUndefined(response);
            this.assertNotNullOrUndefined(response[0]);
            this.assertNotNullOrUndefined(response[0].id);
            queue();
        });
    }

    testGetItems(queue) {
        Service.getItems(30000000000, 3, (response) => {
            this.assertNotNullOrUndefined(response);
            this.assertNotNullOrUndefined(response[0]);
            this.assertNotNullOrUndefined(response[0].id);
            queue();
        });
    }

    testGetPromoKeysSettings(queue) {
        Service.getPromoKeysSettings(30000000000, (response) => {
            this.assertNotNullOrUndefined(response);
            this.assertNotNullOrUndefined(response.gameId);
            queue();
        });
    }
};

module.exports = ServiceAsyncTestCase;
