var Core = function(options) {
    this._lang = (options && options.lang) ? options.lang : 'ru';
    this._auth = (options && options.auth) ? options.auth : false;
    this._url =  (options && options.url) ? options.url : "https://api.gamenet.ru/restapi";

    this.__defineSetter__('lang', function(value) {
        this._lang = value;
    });

    this.__defineSetter__("auth", function(value) {
        this._auth = value;
    });

    this.__defineSetter__("url", function(value) {
        this._url = value;
    });
};

Core.instance = undefined;
Core.setup = function(options){
    if (Core.instance === undefined) {
        Core.instance = new Core();
    }

    if (options === undefined) {
        return;
    }

    if (options.userId) {
        Core._userId = options.userId;
    }

    if (options.appKey) {
        Core._appKey = options.appKey;
    }

    if (options.url) {
        Core.instance.url = options.url;
    }

    if (options.auth) {
        Core.instance.auth = options.auth;
    }

    if (options.lang) {
        Core.instance.lang = options.lang;
    }
};

Core.execute = function(method, params, auth, successCallback, errorCallback) {
    Core.setup();

    Core.instance.auth = auth;
    Core.instance.execute(method, params, successCallback, errorCallback);
};

Core._userId = '';
Core.setUserId = function(value) {
    Core._userId = value;
};
Core._appKey = '';
Core.setAppKey = function(value) {
    Core._appKey = value;
};

Core.prototype = {
    //Replaced during CI build
    version: "@VERSION",

    prepareRequestArgs: function(params) {
        var stringParams = '',
            paramValue,
            field;

        for (field in params) {
            if (!params.hasOwnProperty(field)) {
                continue;
            }

            switch(typeof params[field]) {
                case 'function':
                    paramValue = '';
                    break;
                case 'object':
                default:
                    paramValue = params[field].toString();
            }

            if (paramValue.length > 0) {
                stringParams += "&" + field + "=" + paramValue;
            }
        }

        return stringParams;
    },

    execute:  function(method, params, successCallback, errorCallback) {
        var responseObject, params, stringParams;

        stringParams = "?method=" + method
            + "&format=json&lang=" + this._lang
            + this.prepareRequestArgs(params);

        if (this._auth && Core._userId.length && Core._appKey.length) {
            stringParams += "&userId=" + Core._userId + "&appKey=" + Core._appKey;
        }

        params = {
            method: (stringParams.length < 2048) ? 'get' : 'post',
            uri: new Uri(this._url + stringParams)
        };

        http.request(params, function(response) {
            if (response.status !== 200) {
                if (typeof errorCallback === 'function') {
                    errorCallback(response.status);
                }
                return;
            }

            if (typeof successCallback !== 'function') {
                return;
            }

            try {
                responseObject = JSON.parse(response.body);
            } catch (e) {
            }

            if (!responseObject.hasOwnProperty('response')) {
                if (typeof errorCallback === 'function') {
                    errorCallback(0);
                }
                return;
            }

            successCallback(responseObject.response);
        });
    }
}

