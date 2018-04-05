var Model = (function(){
	var result = {};
	var Model = function(store){
		this.store = store;
	}

	Model.prototype.addNewTag = function(tagname, callback){
	    // Read it using the storage API
	    chrome.storage.sync.get('youtags', function(items) {
	    	// case when the clearAll occures
	    	console.log("items:"+items.youtags);
	    	if(items.youtags == null || items.youtags == undefined){
				chrome.storage.sync.get('youtags', function(items) {
					if(items.youtags == null || items.youtags == undefined ){
					    chrome.storage.sync.set({youtags: {favorites_youtags:[]}}, function() {
					      console.log('Settings saved');
					    });
					}
			    });
	    		callback(false);
	    	}

	    	// item is the complete object
	      	else if(items.youtags[tagname] == null || items.youtags[tagname] == undefined){
				items.youtags[tagname] = [];
	      		chrome.storage.sync.set({youtags:items.youtags})
	      		callback(true);
	      	}else{
	      		console.log('tag already exists');
	      		callback(false);
	      		return;
	      	}
	    });

	    

	    return this.newTagResult;


	}

	Model.prototype.getFavoriteTags = function(favTagsCallback){
	    chrome.storage.sync.get('youtags', function(items){
	    	if(items == null || items == undefined || Object.keys(items).length == 0){
	    		console.log("no recent tags");
	    		favTagsCallback(null);
	    	}else{
	    		console.log(items.youtags.favorites_youtags);
	    		favTagsCallback(items.youtags.favorites_youtags);	
	    	}
	    	
	    });

	}

	Model.prototype.getAllTags = function(allTagsCallback){
	    chrome.storage.sync.get('youtags', function(items){
	    	if(items == null || items == undefined || Object.keys(items).length == 0){
	    		console.log("no tags");
	    		allTagsCallback(null);
	    	}else{
	    		console.log(items.youtags);
	    		var allTags = Object.keys(items.youtags);
	    		var index = allTags.indexOf("favorites_youtags");
	    		if (index > -1) {
				    allTags.splice(index, 1);
				}
	    		allTagsCallback(allTags);
	    	}
	    	
	    });

	}

	Model.prototype.getListByTagName = function(tagname, listsCallback){
	    chrome.storage.sync.get('youtags', function(items){
	    	//console.log(items.youtags[tagname]);
	    	if(items == null || items == undefined || Object.keys(items).length == 0){
	    		console.log("no lists defined");
	    		listsCallback(null, tagname);	
	    	}else{
	    		listsCallback(items.youtags[tagname], tagname);	
	    	}
	    	
	    });
	}

	Model.prototype.addLinkToTag = function(tagname, link, addLinkCallback){
	    chrome.storage.sync.get('youtags', function(items) {
	    	// item is the complete object
	    	console.log("tagname: "+tagname);
	      	if(items.youtags[tagname] == null || items.youtags[tagname] == undefined){
				console.log('tag does not exists');
				addLinkCallback(false);
	      	}else{
	      		items.youtags[tagname].push(link);
	      		chrome.storage.sync.set({youtags:items.youtags});
	      		addLinkCallback(true);
	      	}
	    });

	}

	Model.prototype.clearAll = function(){
		chrome.storage.sync.clear(function(){
			console.log("cleared");
		});
	}

	return Model;
})();