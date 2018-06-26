var TestCase = require('njsunit').TestCase;

var RestApi = require('../../build/RestApi.Test.js'),
    Core = RestApi.Core,
    Games = RestApi.Games;

class GamesAsyncTestCase extends TestCase {
    setUp() {
        Core.setUserId("400001000012483830");
        Core.setAppKey("0f9bdd2498d4eae40d16db171d8c46212636a5a7");
    }

    tearDown() {
        RestApi.disableLog();
    }

    testGetAnnouncement(queue) {
        Games.getAnnouncement((response) => {
            this.assertNotUndefined(response.announcement);
            queue();
        });
    }

    testGetFacts(queue) {
        Games.getFacts((response) => {
            this.assertNotUndefined(response.facts);
            queue();
        });
    }

    testGetAdvertising(queue) {
        Games.getAdvertising("71", (response) => {
            this.assertNotUndefined(response.banners);
            queue();
        });
    }

    testGetGallery(queue) {
        Games.getGallery("92", (response) => {
            this.assertNotUndefined(response.gallery);
            queue();
        });
    }

    testGetThemes(queue) {
        Games.getThemes((response) => {
            this.assertNotUndefined(response.themes);
            queue();
        });
    }

};

module.exports = GamesAsyncTestCase;
