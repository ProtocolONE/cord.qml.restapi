var Misc = function() {
};

Misc.getTime = function(callback) {
    Core.executeEx('misc/time/', 'get', {}, false, {}, callback);
};

Misc.getIp = function(callback) {
    Core.executeEx('misc/ip/', 'get', {}, false, {}, callback);
};

