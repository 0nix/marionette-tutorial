/* global Marionette */
var app = new Marionette.Application();
app.StaticView = Marionette.ItemView.extend({
	el:"#main-region",
	template:"#static-template"
});
app.on("start",function () {
	console.log("Contact manager started");
	var view = new app.StaticView();
	view.render();
})
app.start();
