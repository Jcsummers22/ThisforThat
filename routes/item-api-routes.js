// This file provides routes for displaying and saving data
// to the database.
// This is specificially for the table/model Items

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

	// Show us (Get) everything in table items when this route is accessed
  app.get("/api/items", function(req, res) {
    db.Item.findAll({}).then(function(dbItem) {
      res.json(dbItem);
    });
  });


};



