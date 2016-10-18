var Billing = function() {
};

Billing.purchaseItem = function(game, item, itemCount, successCallback, failedCallback) {
	Core.execute('Billing.purchaseItem', {
		version: 2,
		gameId: game, 
		itemId: item, 
		count: itemCount
	}, true, successCallback, failedCallback);
};

Billing.isInGameRefillAvailable = function(successCallback, failedCallback) {
    Core.execute('billing.isInGameRefillAvailable', {
        version: 1
    }, true, successCallback, failedCallback);
};
