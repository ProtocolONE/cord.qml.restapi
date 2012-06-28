var User = function() {
};

User.getProfile = function(profiles, successCallback, failedCallback) {
    Core.execute('user.getProfile', {profileId : profiles}, true, successCallback, failedCallback);
};

//Следующий метод не должен тестироваться, т.к. каждая СМС стоит $
User.sendMobileActivationCode = function(phone, successCallback, failedCallback) {
    Core.execute('user.sendMobileActivationCode', {phone: phone}, true, successCallback, failedCallback);
};

//Следующий метод не должен тестироваться, т.к. каждая СМС стоит $
User.validateMobileActivationCode = function(code, successCallback, failedCallback) {
    Core.execute('user.validateMobileActivationCode', {code: code}, true, successCallback, failedCallback);
};