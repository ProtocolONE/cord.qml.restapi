var Marketing = function() {
};

// Пока не работает на лайве
Marketing.getMidDetails = function(mid, successCallback, failedCallback) {
    Core.execute('marketing.getMidDetails',
        { mid: mid,
          secret: 'd11f0c0ec44f08449ded2e49f47ff09298ced944' },
        false,
        successCallback,
        failedCallback);
};
