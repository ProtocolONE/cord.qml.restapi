var Virality = function() {
};

//INFO Метод не может быть протестирован.
Virality.linkAccount = function(code, vkReturnPath, successCallback, failedCallback) {
    Core.execute('virality.linkAccount', {code : code, vkReturnPath: vkReturnPath}, true, successCallback, failedCallback);
};
