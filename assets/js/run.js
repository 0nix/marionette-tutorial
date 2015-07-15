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
app.module("App.Show",function(Show, app, Backbone, Marionette, $, _){
	Show.Contact = Marionette.ItemView.extend({
		template: "#contact-view"
	});
	Show.Controller = {
		showContact: function(m){
			var contactView = new Show.Contact({
				model: m
			});
			app.regions.main.show(contactView);
		}
	};
	
});
app.module("App.List",function(List, app, Backbone, Marionette, $, _){
	List.ContactItemView = Marionette.ItemView.extend({
		template:"#contact-list-item",
		tagName:"tr",
		events:{
			//"click td":"highlight",
			"click .el-deleto": "deletion",
			"click .el-show":"showesion"
		},
		showesion:function(ev){
			ev.preventDefault();
			ev.stopPropagation();
			this.trigger("contact:show", this.model);

		},
		deletion: function(ev){
			ev.preventDefault();
			ev.stopPropagation();
			//this.$el.fadeOut(2000);
			this.trigger("contact:delete",this.model);
		},
		alertPhone:function(){
			var pn = this.model.escape("phoneNumber"); 
			alert((!pn) ? "No Phone Number!" : pn);
		},
		highlight:function(){
			this.$el.toggleClass("warning");
			this.trigger("contact:clicky",this.model.attributes);
		},
		alertName:function(){
			alert(this.$el[0].innerText);
		}
	});
	/*List.ContactsView = Marionette.CollectionView.extend({
		tagName: "table",
		className: "table table-hover",
		childView: List.ContactItemView
	});*/
	List.ContactsView = Marionette.CompositeView.extend({
		tagName:"table",
		className:"table table-hover",
		template:"#contact-list",
		childView: List.ContactItemView,
		childViewContainer:"tbody"
	});
	List.Controller = {
		listContacts: function(){
			var lcv = new List.ContactsView({
				collection: app.Entities.bridge.request("contact:entities")
			})
			lcv.on("childview:contact:show",function(cview, model){
				app.App.Show.Controller.showContact(model);
			});
			lcv.on("childview:contact:clicky",function(cview, model){
				console.log(model);
			});
			lcv.on("childview:contact:delete", function(cview, model){
				model.collection.remove(model);
			});
			app.regions.main.show(lcv);

		}
	}
});

//CONTAINERS
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
	app.App.List.Controller.listContacts();
});
app.start();
