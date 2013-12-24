var Premium = function() {
};

Premium.getStatus = function(successCallback, failedCallback) {
    Core.execute('premium.getStatus', {version: 1}, true, successCallback, failedCallback);
};

Premium.getGrid = function(successCallback, failedCallback) {
    Core.execute('premium.getGrid', {version: 1}, true, successCallback, failedCallback);
};

Premium.purchase = function(gridId, successCallback, failedCallback) {
    Core.execute('premium.purchase', {version: 1, gridId: gridId}, true, successCallback, failedCallback);
};

