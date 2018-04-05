var Store = (function(){

	var Store = function(storeName){
		this.storeName = storeName;
		chrome.storage.sync.get('youtags', function(items) {
			if(items.youtags == null || items.youtags == undefined ){
			    chrome.storage.sync.set({youtags: {favorites_youtags:[]}}, function() {
			      console.log('Settings saved');
			    });
			}
	    });
	}

	return Store;
})();