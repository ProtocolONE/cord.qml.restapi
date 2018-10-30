var TestCase = require('njsunit').TestCase;

var RestApi = require('../build/RestApi.Test.js')
    , Core = RestApi.Core
    , ErrorEx = RestApi.ErrorEx;

function getFailToken() {
    return {
        value: 'failToken',
        exp: 1
    }
}

function getSuccessToken() {
    return {
        value: 'successToken',
        exp: +(Date.now()) + 30000
    }
}

function refreshToken(cb) {
    var token = getSuccessToken();
    cb(token.value, token.exp);
}

class CoreExTestCase extends TestCase {
    tearDown () {
        RestApi.disableLog();
        if (Core.instance) {
            delete Core.instance;
        }
    }

    testSetup() {
        Core.setupEx({
            version: "v1",
            url: "https://p1_api.eu.gamenet.ru/",
        });

        this.assertEqual('https://p1_api.eu.gamenet.ru/api/v1/', Core.instance._urlEx);
    }

    testExecuteExSuccess(queue) {
        RestApi.enableLog();

        var core = new Core()
        core.setupEx({
            version: "v1",
            url: 'http://local-auth.protocol.one:3000',
            jwtRefreshCallback: function() {
                var token = getSuccessToken();
                core.setJwt(token.value, token.exp);
                // cb(token.value, token.exp);
            }
        });

        core.executeEx('app/grid', 'get', {}, true, {}, (code, response) => {
            console.log('app/grid', code, response)
            this.assertEqual(ErrorEx.Success, code);
            queue();
        })
    }

    testExecuteExUnauth(queue) {
        RestApi.enableLog();

        var core = new Core()
        core.setupEx({
            version: "v1",
            url: 'http://local-auth.protocol.one:3000',
            jwtRefreshCallback: function() {
                var token = getSuccessToken();
                core.setJwt(token.value, 2);
            }
        });

        core.executeEx('app/grid', 'get', {}, true, {}, (code, response) => {
            console.log('app/grid', code, response)
            this.assertEqual(ErrorEx.Unauthorized, code);
            queue();
        })
    }

    testExecuteExErrorCode(queue) {
        RestApi.enableLog();

        var core = new Core()
        core.setupEx({
            version: "v1",
            url: 'http://local-auth.protocol.one:3000',
            jwtRefreshCallback: function() {
                var token = getSuccessToken();
                core.setJwt('badRequest', token.exp);
            }
        });

        core.executeEx('app/grid', 'get', {}, true, {
            '403': 615
        }, (code, response) => {
            console.log('app/grid', code, response)
            this.assertEqual(615, code);
            queue();
        })
    }

}

module.exports = CoreExTestCase;

