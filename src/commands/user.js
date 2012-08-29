var User = function() {
};

User.getProfile = function(profiles, successCallback, failedCallback) {
    Core.execute('user.getProfile', {profileId : profiles, shortInfo : 1}, true, successCallback, failedCallback);
};

//Следующий метод не должен тестироваться по понятным причинам
User.sendMobileActivationCode = function(phone, successCallback, failedCallback) {
    Core.execute('user.sendMobileActivationCode', {phone: phone, version: 2}, true, successCallback, failedCallback);
};

//Следующий метод не должен тестироваться по понятным причинам
User.validateMobileActivationCode = function(code, successCallback, failedCallback) {
    Core.execute('user.validateMobileActivationCode', {code: code, version: 2}, true, successCallback, failedCallback);
};

User.getBalance = function(successCallback, failedCallback) {
    Core.execute('user.getSpeedyInfo', {}, true, successCallback, failedCallback);
};