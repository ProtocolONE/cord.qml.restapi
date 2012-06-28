var Core = function() {
    this._lang = 'en';
    this._auth = false;
    this._url = "https://api.gamenet.ru/restapi";

    this.__defineSetter__('lang', function(value){
        this._lang = arg;
    });

    this.__defineSetter__("auth", function(value){
        this._auth = value;
    });

    this.__defineSetter__("url", function(value){
        this._url = value;
    });
};

Core.instance = undefined;
Core.execute = function(method, params, auth, successCallback, errorCallback) {
    if (Core.instance == undefined) {
        Core.instance = new Core();
    }

    Core.instance.auth = auth;
    Core.instance.execute(method, params, successCallback, errorCallback);
};

Core._userId = '';
Core.setUserId = function(value) {
    Core._userId = value;
} ;
Core._appKey = '';
Core.setAppKey = function(value) {
    Core._appKey = value;
};

Core.prototype = {
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
                case 'array':
                    paramValue = params[field].join(",");
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
        var self = this,
            xhr = new XMLHttpRequest(),
            responseObject,
            stringParams;

        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) { // full body received
                return;
            }

            if (xhr.status !== 200) {
                if (typeof errorCallback == 'function') {
                    errorCallback(xhr.status);
                }
                return;
            }

            if (typeof successCallback !== 'function') {
                return;
            }

            try {
                responseObject = eval('(' + xhr.responseText + ')');
            } catch (e) {
            }

            if (!responseObject.hasOwnProperty('response')) {
                if (typeof errorCallback == 'function') {
                    errorCallback(0);
                }
                return;
            }

            successCallback(responseObject.response);
        };

        stringParams = "method=" + method
            + "&format=json&lang=" + this._lang
            + this.prepareRequestArgs(params);

        if (this._auth && Core._userId.length && Core._appKey.length) {
            stringParams += "&userId=" + Core._userId + "&appKey=" + Core._appKey;
        }

        if (stringParams.length < 2048) {
            xhr.open('GET', this._url + '?' + stringParams);
            xhr.send(null);
        } else {
            xhr.open('POST', this._url);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(stringParams);
        }
    }
};
