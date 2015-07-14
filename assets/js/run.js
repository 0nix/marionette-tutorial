var app = new Marionette.Application();
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
app.RegionContainer = Marionette.LayoutView.extend({
	el:"#app-container",
	regions:{
		main: "#main-region"
	}
});
app.Contact = Backbone.Model.extend({
	defaults:{
		firstName:"",
		lastName:"",
		phoneNumber:""
	}
});

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
	var a = new app.Contact({
		firstName: "Fuck",
		lastName: "McDickface",
		phoneNumber: "fuckyou"
	});
	var aView = new app.ContactView({model: a});
	app.regions.main.show(aView);
})
app.start();
