// This file provides routes for adding users to the database


// Requiring the models
var db = require("../models");

// Requiring dependencies
//var passport = require('passport');

// Require passport strategy
//require("../config/passport/passport.js");

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
		db.User.create({
			userName: 	req.body.userName,
			firstName: 	req.body.firstName,
			lastName: 	req.body.lastName,
			email: 			req.body.email,
			zipcode: 		req.body.zipcode,
			password: 	req.body.password
		}).then(function(result) {
			res.json({ id: result.insertId });
		}).catch(function(err) {
			console.log(err);
		});

	});

	// Authenticate user on login
	



};