var Service = function() {
};

Service.getServices = function(sessionId, successCallback, failedCallback) {
    Core.execute('service.getServices', { sessionId : sessionId }, true, successCallback, failedCallback);
};

Service.getUi = function(successCallback, failedCallback) {
    Core.execute('service.getUi', {}, false, successCallback, failedCallback);
};

Service.getGrid = function(successCallback, failedCallback) {
    Core.execute('service.getGrid', {}, true, successCallback, failedCallback);
};