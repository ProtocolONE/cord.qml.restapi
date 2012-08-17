var http = function() {
};

http.request = function(options, callback) {
    var xhr = new XMLHttpRequest(),
        method = options.method || 'get',
        uri;

    if (options instanceof Uri) {
        uri = options;
    } else if (typeof options === 'string') {
        uri =  new Uri(options);
    } else if (options.hasOwnProperty('uri') && options.uri instanceof Uri) {
        uri = options.uri;
    } else {
        throw new Exception('Wrong options');
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) { // full body received
            return;
        }

        callback({status: xhr.status, header: xhr.getAllResponseHeaders(), body: xhr.responseText});
    };

    if (method === 'get') {
        xhr.open('GET', uri.toString());
        xhr.send(null);
    } else {
        xhr.open('POST', uri.protocol() + '://' + uri.host()  + uri.path());
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(uri.query().toString().substring(1)); //jsuri return query with '?' always
    }
}

