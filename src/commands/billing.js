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
