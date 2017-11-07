// This file provides routes for changing the html pages.


// Requiring the models
var db = require("../models");

// The Routes
// ===================
module.exports = function(app) {

	// GET routes
	//====================================================
	// Get the index.handlebars page when localhost is accessed
	app.get("/", function(req, res) {
	  res.render("index");
	});

	// Get the userView.handlebars page
	app.get("/userView", function(req, res) {
		res.render("userView");
	});

	// Get the manageView.handelbars page
	app.get("/manageView", function(req, res) {
		res.render("manageView");
	});

	app.get("/functionView", function (req, res) {
		res.render("functionView");
	});

};