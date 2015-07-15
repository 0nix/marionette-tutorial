var app = new Marionette.Application();
//MODULES
app.module("Entities",function(Entities, app, Backbone, Marionette, $, _){
	Entities.Contact = Backbone.Model.extend({
		defaults:{
			firstName:"",
			lastName:"",
			phoneNumber:""
		}
	});
	Entities.ContactCollection = Backbone.Collection.extend({
		model: Entities.Contact,
		comparator: function(i){
			return[i.get("lastName"),i.get("firstName")];
		}
	});
	var contacts;
	var initContacts = function(){
		contacts = new Entities.ContactCollection([
			{ id: 1, firstName: "Alice", lastName: "Arten",
			phoneNumber: "555-0184" },
			{ id: 2, firstName: "Bob", lastName: "Brigham",
			phoneNumber: "555-0163" },
			{ id: 3, firstName: "Charlie", lastName: "Campbell",
			phoneNumber: "555-0129" }
		]);	
	};
	var API = {
		getContactEntities:function(){
			if(!contacts) initContacts();
			return contacts;
		}
	};
	Entities.bridge = new Backbone.Wreqr.RequestResponse();
	Entities.bridge.setHandler("contact:entities", API.getContactEntities);
});
app.module("App.List",function(List, app, Backbone, Marionette, $, _){
	List.ContactItemView = Marionette.ItemView.extend({
		template:"#contact-list-item",
		tagName:"li",
		events:{
			"click p":"alertPhone"
		},
		alertPhone:function(){
			var pn = this.model.escape("phoneNumber"); 
			alert((!pn) ? "No Phone Number!" : pn);
		}
	});
	List.ContactsView = Marionette.CollectionView.extend({
		tagName: "ul",
		childView: List.ContactItemView
	});
	List.Controller = {
		listContacts: function(){
			var data = 
			app.regions.main.show(new List.ContactsView({
				collection: app.Entities.bridge.request("contact:entities")
			}));
		}
	}
});
// VIEW DEFINITION
app.StaticView = Marionette.ItemView.extend({
	//el:"#main-region",
	template:"#static-template",
});
app.ContactView = Marionette.ItemView.extend({
	template:"#contact-template",
	events:{
		"click p":"alertPhone"
	},
	alertPhone:function(){
		var pn = this.model.escape("phoneNumber"); 
		alert((!pn) ? "No Phone Number!" : pn);
	}
});
// CONTAINERS
app.RegionContainer = Marionette.LayoutView.extend({
	el:"#app-container",
	regions:{
		main: "#main-region"
	}
});
// EVENT LISTENERS
app.on("before:start",function(){
	app.regions = new app.RegionContainer();
});
app.on("start",function () {
	/*var view = new app.StaticView({
		template:"#dynamic-template",
		tagName: "span"
	});
	view.render()*/
	/*var view = new app.StaticView();
	app.regions.main.show(view);*/
	/*var a = new app.Contact({
		firstName: "Fuck",
		lastName: "McDickface",
		phoneNumber: "fuckyou"
	});
	var aView = new app.ContactView({model: a});
	app.regions.main.show(aView);*/
	/*var con = new app.Entities.ContactCollection([
		{
			firstName: "Alexys",
			lastName: "Hegmann",
			phoneNumber: "+52123812390123"
		},
		{
			firstName: "Lisandro",
			lastName: "Zvijer",
			phoneNumber: "+5212312312321"

		},
		{
			firstName: "Marco Antonio",
			lastName: "Solis",
			phoneNumber: "+52898923482233"			
		}]);*/
	/*var con = app.Entities.bridge.request("contact:entities");
	var listView = new app.App.List.ContactsView({
		collection: con
	});
	app.regions.main.show(listView);*/
	app.App.List.Controller.listContacts();
});
app.start();
