var Premium = function() {
};

Premium.getStatus = function(successCallback, failedCallback) {
    Core.execute('premium.getStatus', {version: 1}, true, successCallback, failedCallback);
};
