var Auth = function() {
};

Auth.getRedirectToken = function(successCallback, failedCallback) {
    Core.execute('auth.getRedirectToken', {}, true, successCallback, failedCallback);
};

Auth.getCentrifugoToken = function(timestamp, successCallback, failedCallback) {
    Core.execute('auth.getCentrifugoToken', {timestamp:timestamp}, true, successCallback, failedCallback);
};
