// This file provides routes for displaying and saving data
// to the database.
// This is specificially for the table/model Items

// Requiring the models
var db = require("../models");
//var item = require("../models/itemModel");
// The Routes
// ===================
module.exports = function(app) {

	// GET routes
	//====================================================
	// Get the index.handlebars page when localhost is accessed
	//app.get("/", function(req, res) {
	  //  res.render("index");
	//});

	// Show us (Get) everything in table items when this route is accessed

	app.get("/api/itemSearch", function (req, res) {
		var handlebarsObject;
		db.Item.findAll(
			handlebarsObject = {  
			item_name: req.body.item_name
			
		}).then(function (data) {
			console.log(handlebarsObject);
			res.render("userView", handlebarsObject);
		});
	});


	app.get("/api/items", function (req, res) {
		db.Item.findAll({
			item_name: req.body.item_name,

		}).then(function (data) {
			res.json(data)
			for (i = 0; i < data.length; i++) {
				console.log(data[i].item_name);
			}
		});
	});

  app.get("/api/items", function (req, res) {
	  db.Item.findAll({
		  item_name: req.body.item_name	  
	  }).then(function (results) {
		  res.json(results);
	  });
  });

  app.get("/api/posts", function (req, res) {
	  var query = {};
	  if (req.query.item_name) {
		  query.item_name = req.query.item_name;
	  
	};
  });
	
	app.get("/api/money", function (req, res) {
		db.Item.findAll({
			where:{
				accept_money: true
			}
		}).then(function (results) {
			console.log(results);
				res.json(results);
			});
	});

	app.get("/api/goods", function (req, res) {
		db.Item.findAll({
			where: {
				trade_good: true
			}
		}).then(function (results) {
			res.json(results);
		});
	});

	app.get("/api/service", function (req, res) {
		db.Item.findAll({
			where: {
				trade_service: true
			}
		}).then(function (results) {
			res.json(results);
		});
	});

	app.get("/api/buy", function (req, res){
		db.Item.findAll({
			where: {
				
			}
			
		}).then(function(results){
			res.json(results);
		});
	});

	app.get("/api/recent", function (req, res){
		db.Item.findAll({
			limit: 5,
			where:{

			},
			order: [['item_created', 'DESC']]
		}).then(function(results){
			console.log(results)
			res.json(results);
		});
	});


	app.post("/api/newitem", function (req, res) {
		console.log(req.body);
		db.Item.create({
			item_name: req.body.item_name,
			category: req.body.category,
			accept_money: req.body.accept_money,
			trade_good: req.body.trade_good,
			trade_service: req.body.trade_service,
			item_created: req.body.item_created
		}).then(function (results) {
			res.json({ id: results.insertId });
		}).catch(function (err) {
		console.log(err);
	});
});

	


	// DELETE route for deleting posts
	app.delete("/api/posts/:id", function (req, res) {
		db.Post.destroy({
			where: {
				id: req.params.id
			}
		})
			.then(function (dbPost) {
				res.json(dbPost);
			});
	});
	// PUT route for updating posts
	app.put("/api/posts", function (req, res) {
		db.Post.update(req.body,
			{
				where: {
					id: req.body.id
				}
			})
			.then(function (dbPost) {
				res.json(dbPost);
			});
	});
	



};
