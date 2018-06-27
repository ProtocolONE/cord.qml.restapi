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

Service.getGridById = function(id, successCallback, failedCallback) {
    Core.execute('service.getGrid', {id : id}, true, successCallback, failedCallback);
};

Service.getItems = function(serviceId, type, successCallback, failedCallback) {
    Core.execute('service.getItems', { serviceId: serviceId, type: type }, true, successCallback, failedCallback);
};

Service.getPromoKeysSettings = function(serviceId, successCallback, failedCallback) {
    Core.execute('service.getPromoKeysSettings', { serviceId: serviceId }, false, successCallback, failedCallback);
};

