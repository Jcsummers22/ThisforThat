// Bring in dependencies
var express = require('express');  
var methodOverride = require('method-override'); 
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

// Set up Express App
var app = express(); 
var PORT = process.env.PORT || 3000;
 

//static content
app.use(express.static('/public'));

// require everything in the models folder
var db = require("./models/");

// Setting up Express to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//override with POST command
app.use(methodOverride('_method')); 

// Sets Handlebars as the default templating engine.
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
})); 

app.set('view engine', 'handlebars'); 

// The routes
require("./routes/item-api-routes.js")(app);

// Starts our Express server
db.sequelize.sync({ force: true }).then(function() {
	app.listen(PORT, function() {
  	console.log("App listening on PORT " + PORT);
	});
});