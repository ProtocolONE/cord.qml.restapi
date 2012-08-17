var Virality = function() {
};

//INFO Метод не может быть протестирован.
Virality.linkAccount = function(code, successCallback, failedCallback) {
    Core.execute('virality.linkAccount', {code : code}, true, successCallback, failedCallback);
};