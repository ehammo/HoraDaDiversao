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
var KidClass = require('./tables/kid');
var OrderClass = require('./tables/orders');
UserClass.setAdapter(tables);
KidClass.setAdapter(tables);
OrderClass.setAdapter(tables);
var kid = new KidClass.Kid();
var user = new UserClass.User();
var order = new OrderClass.Order();

connection
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

//routes
app.get("/",function(req,res){
    res.send("<h1>Hello from HoraDiversao WebServer</h1>");
		console.log('index');
});


//User
app.post("/user/create/",function(req,res){
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var address = req.body.address;
  var phone = req.body.phone;
  var kidstest = ["id1","id2","id3"];
  var orderstest = ["id11","id22","id33"];	
  var ret = user.createUser(name,email,password,address,phone,kidstest,orderstest);
  res.send("okay");
});

app.post("/user/delete",function(req,res){
	var email = req.body.email;
	
	user.deleteUser(email);
	res.send("ok");
});

app.post("/user/update/",function(req,res){
	var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var address = req.body.address;
  var phone = req.body.phone;
  var kidstest = ["id1","id2","id3"];
  var orderstest = ["id11","id22","id33"];	
  var ret = user.updateUser(name,email,password,address,phone,kidstest,orderstest);
  res.send("okay");
});

app.post("/user/read/", function(req,res){
	var email = req.body.email;
	console.log("email: "+email);
	user.readUser(email);
	res.send("okay");
});


/*app.get("/user/read/:email", function(req,res){
	var email = req.params.email;
	console.log("email: "+email);
	user.readUser(email);
	res.send("okay");
});*/

//Kid

app.post("/kid/create/",function(req,res){
  var name = req.body.name;
  var id = req.body.id;
  var gender = req.body.gender;
  var birth = req.body.birth;
  var ret = kid.createKid(name,id,gender,birth);
  res.send("okay");
});

/*app.get("/kid/read/:id", function(req,res){
	var id = req.params.id;
	kid.readKid(id);
	res.send("okay");
});*/

app.post("/kid/read/", function(req,res){
	var id = req.body.id;
	console.log("id: "+id);
	kid.readKid(id);
	res.send("okay");
});

app.post("/kid/delete",function(req,res){
	var id = req.body.id;
	kid.deleteKid(id);
	res.send("ok");
});

app.post("/kid/update/",function(req,res){
	var name = req.body.name;
	var id = req.body.id;
	var gender = req.body.gender;
	var birth = req.body.birth;
	var ret = kid.updateKid(name,id,gender,birth);
	res.send("okay");
});

//orders

app.post("/order/create/",function(req,res){
  var id = req.body.id;
  var qtd = req.body.qtd;
  var date = req.body.date;
  var address = req.body.address;
  var status = req.body.status;
  var ret = order.createOrder(id,qtd,date,address,status);
  res.send("okay");
});

app.post("/order/read/", function(req,res){
	var id = req.body.id;
	console.log("id: "+id);
	order.readOrder(id);
	res.send("okay");
});

app.post("/order/delete",function(req,res){
	var id = req.body.id;
	order.deleteOrder(id);
	res.send("ok");
});

app.post("/order/update/",function(req,res){
	var id = req.body.id;
	var qtd = req.body.qtd;
	var date = req.body.date;
	var address = req.body.address;
	var status = req.body.status;
	var ret = order.updateOrder(id,qtd,date,address,status);
	res.send("okay");
});





// listen (start app with node server.js) ======================================
var port = process.env.PORT || 3000;
app.listen(port);
console.log("App listening on port 3000");
