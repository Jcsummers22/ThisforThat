// This file provides routes for adding users to the database

// Requiring the models
var db = require("../models");

// Requiring dependencies
var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");


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

		var hash = SHA256(req.body.password);
		hash = CryptoJS.enc.Base64.stringify(hash);
		console.log(hash);

		db.User.create({
			userName: 	req.body.userName,
			firstName: 	req.body.firstName,
			lastName: 	req.body.lastName,
			email: 			req.body.email,
			zipcode: 		req.body.zipcode,
			password: 	hash
		}).then(function(result) {
			res.json({ id: result.insertId });
		}).catch(function(err) {
			console.log(err);
		});

	});

	// Signing in an existing user
	app.post("/api/signin", function(req, res) {

		// Hashing problem here. This rehashes the password.
		// The new hash will never match the previously hashed password.
		var hash = SHA256(req.body.password);
		hash = CryptoJS.enc.Base64.stringify(hash);
		console.log(hash);

		if (hash === db.User.password) {
			console.log("It Worked.");
		}
		else {
			console.log("It DID NOT work.");
		}

	})




};