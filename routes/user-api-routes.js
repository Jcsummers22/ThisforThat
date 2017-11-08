// This file provides routes for adding users to the database

// Requiring the models
var db = require("../models");

// Requiring dependencies
// Node Forge helps with authentication for signing in
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

		// variable to hold a hashed version of the new user's password
		var newPassword = forge.md.sha256.create();

		// passing in the new user's input for password, and then hashing it
		newPassword.update(req.body.password);

		// .digest().toHex() turns newPassword into a hex code
		// Below, the hex code will be stored in the password column 
		// in the database
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

		passwordTest = req.body.password;

		var holder = forge.md.sha256.create();
		holder.update(passwordTest);

		console.log("Holder: ", holder.digest().toHex());

		db.User.findAll({}).then(function(result) {
			console.log(result);

			for (var i = 0; i < result.length; i++) {

				console.log("These are the users in the database: ", result[i]);
				console.log("This is the password for the user previously created: ", result[i].password);
				console.log("This is the hashed password the current user passed in: ", holder.digest().toHex())

				console.log("Email of previously created user: ", result[i].email);
				console.log("Email passed in by current user: ", req.body.email);
				
				if (holder.digest().toHex() === result[i].password && req.body.email === result[i].email) {
					console.log("It Worked.");

					// pulls in http://host. 
					// On localhost:3000 it becomes http://localhost:3000
					var fullUrl = req.protocol + '://' + req.get('host');

					// Test. On localhost:3000, it should show
					// http://localhost:3000/manageView
					console.log(fullUrl + "/manageView");

					// Redirect to new page
					res.send({redirect: fullUrl + "/manageView"});
				}
				else {
					console.log("It DID NOT work.");
				}
			}

		});

	});




};