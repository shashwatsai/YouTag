var App = (function(){

	var STORE_NAME = 'youtags';
	var App = function(){

		this.view = new View();
		this.store = new Store(STORE_NAME);
		this.model = new Model(this.store);
		this.controller = new Controller(this.model, this.view);
	}

	return App;
})();