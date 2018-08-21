var Misc = function() {
};

Misc.getTime = function(successCallback, failedCallback) {
    Core.execute('misc.getTime', {}, false, successCallback, failedCallback);
};

