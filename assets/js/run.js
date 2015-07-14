var app = new Marionette.Application();
app.StaticView = Marionette.ItemView.extend({
	//el:"#main-region",
	template:"#static-template",
});
app.RegionContainer = Marionette.LayoutView.extend({
	el:"#app-container",
	regions:{
		main: "#main-region"
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
	var view = new app.StaticView();
	app.regions.main.show(view);

})
app.start();
