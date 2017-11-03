// This file provides routes for displaying and saving data
// to the database.
// This is specificially for the table/model Items

// Requiring the models
var db = require("../models");

// The Routes
// ===================
module.exports = function(app) {

	// GET route
	app.get("/", function(req, res) {
	  db.Item.findAll({}).then(function(data) {
	    var hbsObject = {
	       Item: data
	    };
	    console.log(hbsObject);
	    res.render("index", hbsObject);
	  });
	});

};



