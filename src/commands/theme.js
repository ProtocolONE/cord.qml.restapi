var Theme = function() {
};

Theme.getList = function(callback) {
    Core.executeEx('theme/list/', 'get', {}, false, {}, callback);
};

