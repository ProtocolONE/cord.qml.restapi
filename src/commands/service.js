var Service = function() {
};

Service.getServices = function(successCallback, failedCallback) {
    Core.execute('service.getServices', {}, false, successCallback, failedCallback);
};
