AsyncTestCase("BillingAsyncTest", {
    setUp: function () {
    },

    testIsInGameRefillAvailable: function(queue) {
        var response;

        queue.call('Send a request', function(callbacks) {
            Billing.isInGameRefillAvailable(callbacks.add(function(body){
                response = body;
            }));
        });

        queue.call('Assert the response', function() {
            assertNotUndefined('response', response.enabled);
        });
    }
});