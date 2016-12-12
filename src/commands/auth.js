var Auth = function() {
};

Auth.getRedirectToken = function(successCallback, failedCallback) {
    Core.execute('auth.getRedirectToken', {}, true, successCallback, failedCallback);
};

