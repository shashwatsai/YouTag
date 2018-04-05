var Controller = (function(){
	var Controller = function(model, view){
		this.model = model;
		this.view  = view;
		this.tagResult = null;

	}

	Controller.prototype.addNewTag = function(tagname, callback){
		this.model.addNewTag(tagname, callback);
		
	}

	Controller.prototype.addNewTagResult = function(){

	}

	Controller.prototype.getFavoriteTags = function(favTagsCallback){
		this.model.getFavoriteTags(favTagsCallback);
	}

	Controller.prototype.getAllTags = function(allTagsCallback){
		this.model.getAllTags(allTagsCallback);
	}

	Controller.prototype.getListByTagName = function(tagname, listsCallback){

		this.model.getListByTagName(tagname, listsCallback);
	}

	Controller.prototype.addLinkToTag = function(tagname, link, addLinkCallback){
		this.model.addLinkToTag(tagname, link, addLinkCallback);
	}

	Controller.prototype.clearAll = function(){
		this.model.clearAll();
	}

	return Controller;
})();