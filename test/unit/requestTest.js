AsyncTestCase("RequestAsyncTest", {
    responseObject: null,

    onCallback: function(response) {
        this.responseObject = response;
    },

    testRequest: function (queue) {
        queue.call('Send a request', function(callbacks) {
            //INFO Такой URL выбран не случайно - XMLHttpRequest не позволяет выполнить cross-domain запрос
            //на какой-попало сайт. У нашего же включен CORS - так, что проблем нет.
            http.request('https://api.gamenet.ru/restapi', callbacks.add(this.onCallback));
        });

        queue.call('Assert the response', function() {
            assertEquals(200, this.responseObject.status)
            assertNotUndefined(this.responseObject.header)
            assertNotUndefined(this.responseObject.body)
        });
    },

    testRequestParams: function (queue) {
        queue.call('Send a request', function(callbacks) {
            //INFO Такой URL выбран не случайно - XMLHttpRequest не позволяет выполнить cross-domain запрос
            //на какой-попало сайт. У нашего же включен CORS - так, что проблем нет.
            http.request({ method: 'post', uri: new Uri('https://api.gamenet.ru/restapi/?method=wall.getNews&test=1')}
                , callbacks.add(this.onCallback));
        });

        queue.call('Assert the response', function() {
            assertEquals(200, this.responseObject.status)
            assertNotUndefined(this.responseObject.header)
            assertNotUndefined(this.responseObject.body)
        });
    }
});