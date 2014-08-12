var Service = function() {
};

Service.getServices = function(sessionId, successCallback, failedCallback) {
    Core.execute('service.getServices', { sessionId : sessionId }, true, successCallback, failedCallback);
};
