AsyncTestCase("ServiceAsyncTest", {
    testGetServices: function(queue) {
        var response;

        queue.call('Send a request', function(callbacks) {
            Service.getServices(callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined(response.services);
        });
    }
});