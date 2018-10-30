var TestCase = require('njsunit').TestCase;

var RestApi = require('../build/RestApi.Test.js'),
    Core = RestApi.Core;

class CoreSyncTestCase extends TestCase {
    tearDown () {
        RestApi.disableLog();
        if (Core.instance) {
            delete Core.instance;
        }
    }

    testPrepareRequestArgs() {
        var coreObj = new Core();
        this.assertEqual("&key=value", coreObj.prepareRequestArgs({key: "value"}));
        this.assertEqual("&key=1", coreObj.prepareRequestArgs({key: ["1"]}));
        this.assertEqual("&key=1,2", coreObj.prepareRequestArgs({key: ["1", 2]}));
    }

    testStaticGetSet() {
        Core.setUserId('value');
        this.assertEqual(Core._userId, 'value');

        Core.setAppKey('value');
        this.assertEqual(Core._appKey, 'value');
    }

    testSetup() {
        Core.setup({
            userId: "id",
            appKey: "key",
            url: "someUrl",
            lang: "lang",
            auth: true
        });

        this.assertEqual('id', Core._userId);
        this.assertEqual('key', Core._appKey);
        this.assertEqual('someUrl', Core.instance._url);
        this.assertEqual('lang', Core.instance._lang);
        this.assertEqual(true, Core.instance._auth);
    }

    testCacheCallback(queue) {

        function cacheCallback(params, cb) {
            if (params.uri.query().getParamValue("method") == "a.a") {

                cb(JSON.stringify({
                    response: {
                        result: 1
                    }
                }));

                return true;
            }

            return false;
        }

        Core.setup({
            userId: "id",
            appKey: "key",
            url: "someUrl",
            lang: "lang",
            auth: true,
            cacheLookupCallback: cacheCallback
        });

        Core.execute("a.a", {}, true,  (body) => {
            this.assertEqual(1, body.result);
            queue();
        })
    }
}

module.exports = CoreSyncTestCase;

