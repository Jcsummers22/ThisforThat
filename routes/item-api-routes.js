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
  app.get("/api/items", function(req, res) {
    db.Item.findAll({}).then(function(dbItem) {
      res.json(dbItem);
    });
	});
	
	app.get("/api/cash/", function (req, res) {
		db.Item.findAll({
			where:{
				for_cash: true
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

	app.get("api/buy", function (req, res){
		db.Item.findAll({
			where: {
				for_cash: true
			},
			where: {
				trade_good: true
			},
			where: {
				trade_service: true
			}
		}).then(function(results){
			res.json(results);
		});
	});

	app.get("api/recent", function (req, res){
		db.Item.findAll({
			order: [
				['created_at', 'DESC'],
				
			]
		}).then(function(results){
			res.json(results);
		});
	});


	app.post("/api/posts", function (req, res) {
		console.log(req.body);
		db.Item.create({
			item_name: req.body.item_name,
			category: req.body.category,
			good_or_service: req.body.good_or_service,
			for_cash: req.body.for_cash,
			trade_good: req.body.trade_good,
			created_at: req.body.created_at,
			updated_at: req.body.updated_at
		
		}).then(function (dbPost) {
				res.json(dbPost);
			});
	});

	



};
