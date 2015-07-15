var app = new Marionette.Application();
// MODEL DEFINITION
app.Contact = Backbone.Model.extend({
	defaults:{
		firstName:"",
		lastName:"",
		phoneNumber:""
	}
});
app.ContactCollection = Backbone.Collection.extend({
	model: app.Contact
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
app.ContactItemView = Marionette.ItemView.extend({
	template:"#contact-list-item",
	events:{
		"click p":"alertPhone"
	},
	alertPhone:function(){
		var pn = this.model.escape("phoneNumber"); 
		alert((!pn) ? "No Phone Number!" : pn);
	}
});
app.ContactsView = Marionette.CollectionView.extend({
	tagName: "ul",
	childView: app.ContactItemView
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
	var con = new app.ContactCollection([
		{
			firstName: "Alexys",
			lastName: "Hegmann",
			phoneNumber: "+52123812390123"
		},
		{
			firstName: "Marco Antonio",
			lastName: "Solis",
			phoneNumber: "+52898923482233"			
		},
		{
			firstName: "Lisandro",
			lastName: "Zvijer",
			phoneNumber: "+5212312312321"

		}]);
	var listView = new app.ContactsView({
		collection: con
	});
	app.regions.main.show(listView);
});
app.start();
