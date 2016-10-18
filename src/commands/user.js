var User = function() {
};

User.getMainInfo = function(successCallback, failedCallback) {
    Core.execute('user.getMainInfo', {}, true, successCallback, failedCallback);
};

User.getSpeedyInfo = function(successCallback, failedCallback) {
    Core.execute('user.getSpeedyInfo', {}, true, successCallback, failedCallback);
};

User.getProfile = function(profiles, successCallback, failedCallback) {
    Core.execute('user.getProfile', {profileId: profiles, shortInfo: 1, achievements: 1, subscriptions: 1}, true, successCallback, failedCallback);
};

User.getPlayedInfo = function(profiles, successCallback, failedCallback) {
    Core.execute('user.getProfile', {profileId: profiles, playedGames: 1}, true, successCallback, failedCallback);
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

User.validateNickname = function(nickname, successCallback, failedCallback) {
    Core.execute('user.validateMainInfo', { nickname : nickname }, true, successCallback, failedCallback);
};

User.validateTechNickname = function(techname, successCallback, failedCallback) {
    Core.execute('user.validateMainInfo', { techname : techname }, true, successCallback, failedCallback);
};

// тестирование этого метода требует регистрацию новых пользователей - что не хочется
User.saveNickname = function(nickname, successCallback, failedCallback) {
    Core.execute('user.saveMainInfo', { nickname : nickname }, true, successCallback, failedCallback);
};

// тестирование этого метода требует регистрацию новых пользователей - что не хочется
User.saveTechNickname = function(techname, successCallback, failedCallback) {
    Core.execute('user.saveMainInfo', { techname : techname }, true, successCallback, failedCallback);
};

// тестирование этого метода требует получение актуальных промо ключей - что не хочется
User.activatePromoKey = function(promoKey, successCallback, failedCallback) {
    Core.execute('user.activatePromoKey', { key : promoKey }, true, successCallback, failedCallback);
};

User.search = function(query, priorityForFriends, successCallback, failedCallback) {
    Core.execute('user.search', { q : query, priorityForFriends: priorityForFriends }, true, successCallback, failedCallback);
};

User.getChars = function(userId, successCallback, failedCallback) {
    Core.execute('user.getChars', { targetId: userId }, true, successCallback, failedCallback);
};
