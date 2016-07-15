var express  = require('express');
var app      = express();                               // create our app w/ express
var Sequelize = require('sequelize');                     // sequelize for postGree
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================
var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];
var db = config.database;
var connection = new Sequelize(db.db, db.user, db.password, {
      host: db.host,
      dialect: 'postgres'
});   // connect to database


app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var tables = require('./tables/tables')(connection);
var UserClass = require('./tables/user');
UserClass.setAdapter(tables);
var user = new UserClass.User();

//routes
app.get("/",function(req,res){
    res.send("<h1>Hello from HoraDiversao WebServer</h1>");
		console.log('index');
});

app.post("/user/create/",function(req,res){
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var address = req.body.address;
  var phone = req.body.phone;

  var kidstest = ["id1","id2","id3"];
  var orderstest = ["id11","id22","id33"];	
  user.createUser(name,email,password,address,phone,kidstest,orderstest);
   
});




// listen (start app with node server.js) ======================================
var port = process.env.PORT || 3000;
app.listen(port);
console.log("App listening on port 3000");
