// Bring in dependencies
var express = require('express');  
var methodOverride = require('method-override'); 
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

// Set up Express App
var app = express(); 
var PORT = process.env.PORT || 3000;
 

//static content
app.use(express.static(process.cwd() + '/public'));

// require everything in the models folder
var db = require("./models/");

// Setting up Express to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//override with POST command
app.use(methodOverride('_method')); 

// Sets default layout for handlebars to "main"
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
})); 

// Looks for .handlebars extension
app.set('view engine', 'handlebars'); 

// The routes
// var routes = require('./controllers/swap_controller.js'); 
// app.use('/', routes); 

// Starts our Express server
db.sequelize.sync({ force: true }).then(function() {
	app.listen(PORT, function() {
  	console.log("App listening on PORT " + PORT);
	});
});