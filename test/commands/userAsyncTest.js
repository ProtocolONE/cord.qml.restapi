var TestCase = require('njsunit').TestCase;

var RestApi = require('../../build/RestApi.Test.js'),
    Core = RestApi.Core,
    User = RestApi.User;

class UserAsyncTestCase extends TestCase {
    static testCaseTimeout() {
        return 30000;
    }

    setUp() {
        //RestApi.enableLog()
        Core.setUserId("400001000012483830");
        Core.setAppKey("0f9bdd2498d4eae40d16db171d8c46212636a5a7");
    }

    tearDown() {
        RestApi.disableLog();
    }

    testSearch(queue) {
        User.search("a", false, (response) => {
            this.assertNotUndefined(response);
            queue();
        });
    }

    testGetProfile(queue) {
        var userId = "400001000012483830";
        User.getProfile(userId, (response) => {
            this.assertNotUndefined(response);
            this.assertNotUndefined(response.userInfo);
            this.assertNotUndefined(response.userInfo[0]);
            this.assertEqual(userId, response.userInfo[0].userId)
            queue();
        });
    }

    testGetBalance(queue) {
        User.getBalance((response) => {
            this.assertNotUndefined(response.speedyInfo.balance);
            queue();
        });
    }

    testValidateNickname(queue) {
        Core.setUserId("400007000068924890");
        Core.setAppKey("d0876633b14a43cbbf4ac5df9e52bcd776c47461");

        User.validateNickname('fakesomenick22everexists', (response) => {
            this.assertEqual(1, response.result)
            queue();
        });
    }

    testValidateTechNickname(queue) {
        Core.setUserId("400007000068924890");
        Core.setAppKey("d0876633b14a43cbbf4ac5df9e52bcd776c47461");

        User.validateTechNickname('fakesomenick22everexists', (response) => {
            this.assertEqual(1, response.result)
            queue();
        });
    }

    testGetPlayedInfo(queue) {
        User.getPlayedInfo('400001000005869460',  (response) => {
            this.assertNotUndefined(response);
            this.assertNotUndefined(response.userInfo);
            this.assertNotUndefined(response.userInfo[0]);
            this.assertEqual('400001000005869460', response.userInfo[0].userId)
            this.assertNotUndefined(response.userInfo[0].games)

            queue();
        });
    }

    testGetChars(queue) {
        User.getChars('400001000005869460',  (response) => {
            this.assertNotUndefined(response);
            this.assertNotUndefined(response[0]);

            queue();
        });
    }
};

module.exports = UserAsyncTestCase;
