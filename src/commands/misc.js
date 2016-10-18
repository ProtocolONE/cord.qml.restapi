/**
 * Created by Ilya on 18.10.16.
 */
var Misc = function() {
};

Misc.getTime = function(successCallback, failedCallback) {
    Core.execute('misc.getTime', {}, false, successCallback, failedCallback);
};

