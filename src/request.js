var http = function() {
};

// INFO debug output
http.logRequest = false;

function setHeaders(xhr, options) {
    if (!options.hasOwnProperty('headers')) {
        return;
    }

    for (var hkey in options.headers) {
        if (options.headers.hasOwnProperty(hkey)) {
            xhr.setRequestHeader(hkey, options.headers[hkey]);
        }
    }
}

http.request = function(options, callback) {
    var xhr = new XMLHttpRequest(),
        method = options.method || 'get',
        uri,
        userAgent;

    if (options instanceof Uri) {
        uri = options;
    } else if (typeof options === 'string') {
        uri = new Uri(options);
    } else if (options.hasOwnProperty('uri') && options.uri instanceof Uri) {
        uri = options.uri;
        if (options.hasOwnProperty('userAgent')) {
            userAgent = options.userAgent;
        }
    } else {

        throw new Exception('Wrong options');
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) { // full body received
            return;
        }

        if (http.logRequest) {
            // INFO debug output
            var tmp = '[RestApi] Request: ' + uri.toString();
            if (options.hasOwnProperty('post')) {
                tmp += '\n[RestApi] Post:' + options.post;
            }

            if (options.hasOwnProperty('headers')) {
                tmp += '\n[RestApi] Request headers:' + JSON.stringify(options.headers, null, 2);
            }

            tmp += '\n[RestApi] Status: ' + xhr.status;
            try {
                var debugResponseObject = JSON.parse(xhr.responseText);
                tmp += '\n[RestApi] Response: \n' + JSON.stringify(debugResponseObject, null, 2);
            } catch (e) {
                tmp += '\n[RestApi] Response: \n' + xhr.responseText;
            }

            console.log(tmp);
        }

        callback({status: xhr.status, header: xhr.getAllResponseHeaders(), body: xhr.responseText});
    };

    if (method === 'get') {
        xhr.open('GET', uri.toString());

        if (userAgent) {
            xhr.setRequestHeader('QtBug', 'QTBUG-20473\r\nUser-Agent: ' + userAgent);

        }
        setHeaders(xhr, options);

        xhr.send(null);
    } else {
        xhr.open('POST', uri.toString());

        if (userAgent) {
            xhr.setRequestHeader('QtBug', 'QTBUG-20473\r\nUser-Agent: ' + userAgent);
        }

        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        setHeaders(xhr, options);

        if (options.hasOwnProperty('post')) {
            xhr.send(options.post);
        } else {
            xhr.send(uri.query().toString().substring(1)); //jsuri return query with '?' always
        }
    }
};

