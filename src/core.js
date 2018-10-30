var Core = function(options) {
    var baseUrl;

    this._lang = (options && options.lang) ? options.lang : 'ru';
    this._auth = (options && options.auth) ? options.auth : false;
    this._url =  (options && options.url) ? options.url : "https://gnapi.com:8443/restapi";
    this._genericErrorCallback = undefined;
    this._cacheLookupCallback = undefined;
    this._cacheSaveCallback = undefined;

    this._jwt = undefined;
    this._jwtExpiredTime = undefined;
    this._jwtRefreshCallback = function() { this.setJwt(); };
    this._version = (options && options.version) ? options.version : "v1";

    baseUrl = (options && options.url) ? options.url : "http://api.protocol.local:8080";
    if (baseUrl[baseUrl.length - 1] == '/')
        baseUrl = baseUrl.slice(0, baseUrl.length - 1);

    this._urlEx = baseUrl + '/api/' + this._version + '/';

    this._refreshCallbackQueue = [];
    this._refreshInProgress = false;

    this.__defineSetter__('lang', function(value) {
        this._lang = value;
    });

    this.__defineSetter__("auth", function(value) {
        this._auth = value;
    });

    this.__defineSetter__("url", function(value) {
        this._url = value;
    });

    this.__defineSetter__("genericErrorCallback", function(value) {
        this._genericErrorCallback = value;
    });

    this.__defineSetter__('cacheLookupCallback', function(value) {
        this._cacheLookupCallback = value;
    });

    this.__defineSetter__('cacheSaveCallback', function(value) {
        this._cacheSaveCallback = value;
    });

    this.setupEx(options);
};

Core.instance = undefined;
Core.setupEx = function(options){
    if (Core.instance === undefined) {
        Core.instance = new Core();
    }

    Core.instance.setupEx(options)
};

Core.setJwt = function(jwt, jwtExpiredTime) {
    Core.instance.setJwt(jwt, jwtExpiredTime);
}

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

    if (options.genericErrorCallback) {
        Core.instance.genericErrorCallback = options.genericErrorCallback;
    }

    if (options.cacheLookupCallback) {
        Core.instance.cacheLookupCallback = options.cacheLookupCallback;
    }

    if (options.cacheSaveCallback) {
        Core.instance.cacheSaveCallback = options.cacheSaveCallback;
    }
};

Core.execute = function(method, params, auth, successCallback, errorCallback) {
    Core.setup();

    Core.instance.auth = auth;
    Core.instance.execute(method, params, successCallback, errorCallback);
};

Core.executeEx = function(apiMethod, httpMethod, params, auth, errorCodeMap, callback) {
    Core.setupEx();

    Core.instance.executeEx(apiMethod, httpMethod, params, auth, errorCodeMap, callback);
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

            if (field === 'restapiUrl') {
                continue;
            }

            switch(typeof params[field]) {
                case 'function':
                    paramValue = '';
                    break;
//                case 'object':
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
        var responseObject, internalParams, stringParams, format, response, genericErrorCallback, cacheResponse
            , cacheSaveCallback;

        format = params.format || 'json';

        stringParams = "?method=" + method + 
	    "&format=" + format + "&lang=" + this._lang +
             this.prepareRequestArgs(params);

        if (this._auth && Core._userId.length && Core._appKey.length) {
            stringParams += "&userId=" + Core._userId + "&appKey=" + Core._appKey;
        }

        internalParams = {
            method: (stringParams.length < 2048) ? 'get' : 'post',
            uri: new Uri((params.restapiUrl || this._url) + stringParams)
        };

        genericErrorCallback = this._genericErrorCallback;

        if (this._cacheLookupCallback) {
            if (this._cacheLookupCallback(internalParams, successCallback)) {
                if (http.logRequest) {
                    var tmp = '[RestApi] Request hit cache: ' + this._url + stringParams;
                    console.log(tmp);
                }
                return;
            }
        }

        cacheSaveCallback = this._cacheSaveCallback;
        http.request(internalParams, function(response) {

            if (response.status !== 200) {
                if (typeof errorCallback === 'function') {
                    errorCallback(response.status);
                }
                return;
            }

            if (typeof successCallback !== 'function') {
                return;
            }

            if (cacheSaveCallback) {
                cacheSaveCallback(internalParams, response.body);
            }

            if (format !== 'json') {
                successCallback(response.body);
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

            if (responseObject.response.hasOwnProperty('error')) {
                if (typeof genericErrorCallback === 'function') {
                    genericErrorCallback(
                        responseObject.response.error.code,
                        responseObject.response.error.message);
                }
            }

            successCallback(responseObject.response);
        });
    },

    executeEx: function(apiMethod, httpMethod, params, auth, errorCodeMap, callback) {
        var stringParams = ''
            , internalParams
            , responseObject
            , errorCode
            , self = this;

        if (httpMethod == 'get') {
            stringParams = '?' + this.prepareRequestArgs(params);
        }

        internalParams = {
            method: httpMethod,
            uri: new Uri(this._urlEx + apiMethod + stringParams)
        };

        if (httpMethod == 'post') {
            internalParams.post = JSON.stringify(params);
        }

        var continueCb = function() {
            if (!self.isAuthorized()) {
                // UNDONE Call genericErrorCallback
                callback(ErrorEx.Unauthorized);
                return;
            }

            self.setAuthHeader(internalParams);
            http.request(internalParams, finishCb);
        };

        var finishCb = function(response) {
            if (response.status == 401) {// HTTP/1.1 401 Unauthorized
                // UNDONE Call genericErrorCallback
                callback(ErrorEx.Unauthorized);
                return;
            }

            if (response.status != 200) {
                errorCode = ErrorEx.UNKNOWN;
                if (errorCodeMap.hasOwnProperty(response.status)) {
                    errorCode = errorCodeMap[response.status];
                }

                callback(errorCode);
                return;
            }

            responseObject = response.body;
            try {
                responseObject = JSON.parse(response.body);
            } catch (e) {
            }

            callback(ErrorEx.Success, responseObject);
        };

        var canRetryFinishCb = function(response) {
            if (response.status == 401) {// HTTP/1.1 401 Unauthorized
                self.refreshAuth(continueCb);
                return;
            }

            finishCb(response);
        };

        if (!auth) {
            http.request(internalParams, finishCb);
            return;
        }

        if (!this.isAuthorized()) {
            this.refreshAuth(continueCb);
            return;
        }

        this.setAuthHeader(internalParams);
        http.request(internalParams, canRetryFinishCb);
    },

    refreshAuth: function(cb) {
        this._refreshCallbackQueue.push(cb);

        if (this._refreshInProgress) {
            return;
        }

        this._refreshInProgress = true;
        this._jwtRefreshCallback();
    },
    isAuthorized: function() {
        return !!this._jwt && (+(Date.now()/1000) < this._jwtExpiredTime);
    },
    setAuthHeader: function(options) {
        if (!options.hasOwnProperty('headers')) {
            options.headers = {};
        }

        options.headers["Authorization"] = 'Bearer ' + this._jwt;
    },
    setJwt: function(jwt, jwtExpiredTime) {
        var c;

        this._jwt = jwt
        this._jwtExpiredTime = jwtExpiredTime;

        this._refreshInProgress = false;

        while(this._refreshCallbackQueue.length > 0) {
            c = this._refreshCallbackQueue.pop();
            c();
        }
    },
    setupEx: function(options){
        if (options === undefined) {
            return;
        }

        if (options.version) {
            this._version = options.version;
        }

        if (options.url && options.url.length > 0) {
            var baseUrl = options.url;
            if (baseUrl[baseUrl.length - 1] == '/')
                baseUrl = baseUrl.slice(0, baseUrl.length - 1);

            this._urlEx = baseUrl + '/api/' + this._version + '/';
        }

        if (options.jwtRefreshCallback) {
            this._jwtRefreshCallback = options.jwtRefreshCallback;
        }
    }

};
