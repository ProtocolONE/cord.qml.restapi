var Social = function() {
};

Social.sendInvite = function(friendId, successCallback, failedCallback) {
    Core.execute('social.sendInvite', {friendId : friendId}, true, successCallback, failedCallback);
};

Social.removeFriend = function(friendId, successCallback, failedCallback) {
     Core.execute('social.removeFriend', {friendId : friendId}, true, successCallback, failedCallback);
};

Social.getInvitesList = function(offset, count, successCallback, failedCallback) {
    Core.execute('social.getInvitesList', {offset : offset, count : count}, true, successCallback, failedCallback);
};

Social.agreeInvite = function(friendId, successCallback, failedCallback) {
    Core.execute('social.agreeInvite', {friendId : friendId}, true, successCallback, failedCallback);
};

Social.discardInvite = function(friendId, successCallback, failedCallback) {
    Core.execute('social.discardInvite', {friendId : friendId}, true, successCallback, failedCallback);
};