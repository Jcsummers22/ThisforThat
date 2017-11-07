// Bring in dependencies
var express = require('express');  
var methodOverride = require('method-override'); 
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var session = require('express-session');

// Set up Express App
var app = express(); 
var PORT = process.env.PORT || 3000;


//static content
app.use(express.static('./public'));

// require everything in the models folder
var db = require("./models/");

// Setting up Express to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//override with POST command
app.use(methodOverride('_method')); 

// setting up a session to use along with passport authentication
app.use(session({ 
  cookie: { maxAge: 60000 }, 
  secret: 'woot',
  resave: true, 
  saveUninitialized: true
}));

// use passport authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// load passport strategy
require("./config/passport/passport.js")(passport);



// Sets Handlebars as the default templating engine.
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
})); 

app.set('view engine', 'handlebars'); 

// The routes
require("./routes/item-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/html-routes.js")(app);


// Starts our Express server
db.sequelize.sync({ force: true }).then(function() {
	app.listen(PORT, function() {
  	console.log("App listening on PORT " + PORT);
	});
});