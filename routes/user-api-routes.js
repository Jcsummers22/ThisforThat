// This file provides routes for adding users to the database

// Requiring the models
var db = require("../models");

// Requiring dependencies
var forge = require('node-forge');


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

		var newPassword = forge.md.sha256.create();
		newPassword.update(req.body.password);
		console.log(newPassword.digest().toHex());

		db.User.create({
			userName: 	req.body.userName,
			firstName: 	req.body.firstName,
			lastName: 	req.body.lastName,
			email: 			req.body.email,
			zipcode: 		req.body.zipcode,
			password: 	newPassword.digest().toHex()
		}).then(function(result) {
			res.json({ id: result.insertId });
		}).catch(function(err) {
			console.log(err);
		});

	});

	// Signing in an existing user
	app.post("/api/signin", function(req, res) {

		db.User.findOne({
			where: {
				user_id: req.params.id
			}
		}).then(function(dbSignIn) {
			console.log(dbSignIn);
			res.json(dbSignIn);
		});


		passwordTest = req.body.password;

		var holder = forge.md.sha256.create();
		holder.update(passwordTest);

		console.log("Holder: ", holder.digest().toHex());

		console.log("db password:", db.User.password);

		console.log("User:", db.User.user_id);

		if (holder.digest().toHex() === db.User.password) {
			console.log("It Worked.");
		}
		else {
			console.log("It DID NOT work.");
		}

	})




};