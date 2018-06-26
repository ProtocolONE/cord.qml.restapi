var TestCase = require('njsunit').TestCase;

var RestApi = require('../build/RestApi.Test.js'),
    http = RestApi.http,
    Uri = RestApi.Uri,
    Core = RestApi.Core;

class RequestAsyncTestCase extends TestCase {

    static testCaseTimeout() {
        return 30000;
    }

    tearDown() {
        RestApi.disableLog();
        if (Core.instance) {
            delete Core.instance;
        }
    }

    testRequest (queue) {
        http.request('https://gnapi.com/restapi', (responseObject) => {
            this.assertEqual(200, responseObject.status);
            this.assertNotUndefined(responseObject.header);
            this.assertNotUndefined(responseObject.body);
            queue();
        });
    }

    testRequestParams (queue) {
        http.request({ method: 'post', uri: new Uri('https://gnapi.com/restapi/?method=wall.getNews&test=1')}, (responseObject) => {
            this.assertEqual(200, responseObject.status);
            this.assertNotUndefined(responseObject.header);
            this.assertNotUndefined(responseObject.body);
            queue();
        });
    }
};

module.exports = RequestAsyncTestCase;
