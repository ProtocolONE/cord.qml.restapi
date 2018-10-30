var App = function() {
};

App.getUi = function(callback) {
    Core.executeEx('app/ui/', 'get', {}, false, {}, callback);
};

App.getGrid = function(callback) {
    Core.executeEx('app/grid/', 'get', {}, true, {}, callback);
};

