var TestCase = require('njsunit').TestCase;

var RestApi = require('../../build/RestApi.Test.js'),
    Core = RestApi.Core,
    Wall = RestApi.Wall;

class WallAsyncTestCase extends TestCase {
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

    testGetNews(queue) {
        Wall.getNews((response) => {
            this.assertNotUndefined(response);
            this.assertNotUndefined(response.news);
            queue();
        });
    }

    testGetNewsXml(queue) {
        Wall.getNewsXml((response) => {
            this.assertNotUndefined(response);
            queue();
        });
    }
};

module.exports = WallAsyncTestCase;
