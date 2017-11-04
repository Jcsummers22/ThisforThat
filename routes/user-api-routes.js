// This file provides routes for adding users to the database


// Requiring the models
var db = require("../models");

// The Routes
// ===================
module.exports = function(app) {

	// GET routes
	//====================================================
	// Get all users in database
	app.get("/api/users", function(req, res) {
		db.User.findAll({}).then(function(dbUser) {
			console.log(dbUser);
			res.json(dbUser);
		});
	});


	// Add (Post) new user to the database
	app.post("/api/newuser", function(req, res) {
		console.log(req.body);
		db.User.create([
			"userName", "firstName", "lastName", "email", "zipcode", "password"
		], [
				req.body.user_name, req.body.first_name, req.body.last_name, req.body.email, req.body.zipcode, req.body.password
		], function(result) {
			res.json({ id: result.insertId });
		});

	});




};