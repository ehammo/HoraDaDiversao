var express  = require('express');
var app      = express();                               // create our app w/ express
var Sequelize = require('sequelize');                     // sequelize for postGree
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================
var env = process.env.NODE_ENV || 'production';
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
//var OrderClass = require('./tables/orders');
var ProductClass = require('./tables/product');
var ShopcartClass = require('./tables/shopcart');
var SupplierClass = require('./tables/supplier');
UserClass.setAdapter(tables);
KidClass.setAdapter(tables);
//OrderClass.setAdapter(tables);
ProductClass.setAdapter(tables);
ShopcartClass.setAdapter(tables);
SupplierClass.setAdapter(tables);
var kid = new KidClass.Kid();
var user = new UserClass.User();
//var order = new OrderClass.Order();
var product = new ProductClass.Product();
var shopcart = new ShopcartClass.Shopcart();
var supplier = new SupplierClass.Supplier();
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
app.get("/user/", function(req,res){
	var ret = user.readUsers();
  ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

app.post("/user/create/",function(req,res){
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var address = req.body.address;
  var phone = req.body.phone;
  var kidstest = ["id1","id2","id3"];
  var shopcarttest = ["carrinho1","carrinho2","carrinho3"];
  var ret = user.createUser(name,email,password,address,phone);
  ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

app.get("/user/read/", function(req,res){
	var email = req.params.email;
	console.log("email: "+email);
	var ret = user.readUser(email);
  ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

app.post("/user/update/",function(req,res){
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;
	var address = req.body.address;
	var phone = req.body.phone;
	var ret = user.updateUser(name,email,password,address,phone);
	ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

app.post("/user/delete",function(req,res){
	var email = req.body.email;

	var ret = user.deleteUser(email);
	ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});


/*app.get("/user/read/:email", function(req,res){
	var email = req.params.email;
	console.log("email: "+email);
	user.readUser(email);
	ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});*/

//Kid
app.get("/kid/", function(req,res){
	var ret = kid.readKids();
	ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

app.post("/kid/create/",function(req,res){
	var name = req.body.name;
	var id = req.body.id;
	var gender = req.body.gender;
	var birth = req.body.birth;
	var email = req.body.userEmail;
	var ret = kid.createKid(name,id,gender,birth,email);
	ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

app.get("/kid/read/", function(req,res){
	var id = req.params.id;
	console.log("id: "+id);
	var ret = kid.readKid(id);
	ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

app.post("/kid/update/",function(req,res){
  var name = req.body.name;
  var id = req.body.id;
  var gender = req.body.gender;
  var birth = req.body.birth;
  var email = req.body.userEmail;
  var ret = kid.updateKid(name,id,gender,birth,email);
  ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

app.post("/kid/delete",function(req,res){
	var id = req.body.id;
	var ret = kid.deleteKid(id);
	ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

//orders
/*

app.post("/order/create/",function(req,res){
  var id = req.body.id;
//  var qtd = req.body.qtd;
  var qtd = [1,2];
  var products = ["produto1","produto2"];
  var date = req.body.date;
  var address = req.body.address;
  var status = req.body.status;
  var ret = order.createOrder(id,qtd,date,address,status,products);
  ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

app.post("/order/read/", function(req,res){
	var id = req.body.id;
	console.log("id: "+id);
	order.readOrder(id);
	ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

app.post("/order/delete",function(req,res){
	var id = req.body.id;
	order.deleteOrder(id);
	ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

app.post("/order/update/",function(req,res){
	var id = req.body.id;
	var qtd = [1,2];
	var products = ["produto1","produto2"];
	var date = req.body.date;
	var address = req.body.address;
	var status = req.body.status;
	var ret = order.updateOrder(id,qtd,date,address,status,products);
	ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});
*/
//product

app.get("/product/", function(req,res){
	var ret = product.readProducts();
	ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

app.post("/product/create/",function(req,res){
	var name = req.body.name;
	var id = req.body.id;
	var price = req.body.price;
	var photo = req.body.photo;
	var availability = req.body.availability;
	var description = req.body.description;
	var category = req.body.category;
	var ret = product.createProduct(name, id,price,photo,availability,description, category);
	ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

app.get("/product/read/:id", function(req,res){
	var id = req.params.id;
	console.log("id: "+id);
	var ret = product.readProduct(id);
	ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

app.post("/product/update/",function(req,res){
  var name = req.body.name;
  var id = req.body.id;
  var price = req.body.price;
  var photo = req.body.photo;
  var availability = req.body.availability;
  var description = req.body.description;
  var category = req.body.category;
  var ret = product.updateProduct(name, id,price,photo,availability,description, category);
  ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

app.post("/product/delete",function(req,res){
	var id = req.body.id;
	var ret = product.deleteProduct(id);
	ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});


//shopcart

app.get("/shopcart/",function(req,res){
	var ret = shopcart.readShopcarts();
	ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

app.post("/shopcart/create/",function(req,res){
	var id = req.body.id;
	var date = req.body.date;
	var address = req.body.address;
	var status = req.body.status;
  var products = JSON.parse(req.body.products);
  var qtd = JSON.parse(req.body.qtd);
	var email = req.body.email;
	var ret = shopcart.createShopcart(id,qtd,date,address,status,products,email);
	ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

app.get("/shopcart/read/", function(req,res){
	var id = req.params.id;
	console.log("id: "+id);
	var ret = shopcart.readShopcart(id);
	ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

app.post("/shopcart/delete",function(req,res){
	var id = req.body.id;
	var ret = shopcart.deleteShopcart(id);
	ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

app.post("/shopcart/update/",function(req,res){
var id = req.body.id;
	var date = req.body.date;
	var address = req.body.address;
	var status = req.body.status;
  var products = JSON.parse(req.body.products);
  var qtd = JSON.parse(req.body.qtd);
	var email = req.body.email;
	console.log("email: " + email);
	var ret = shopcart.updateShopcart(id,qtd,date,address,status,products,email);
	ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

//supplier

app.get("/supplier/", function(req,res){
	var ret = supplier.readSuppliers();
	ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

app.post("/supplier/create/",function(req,res){
  var name = req.body.name;
  var id = req.body.id;
  var password = req.body.password;
  var address = req.body.address;
  var phone = req.body.phone;
  var banner = req.body.banner;
  var description = req.body.description;
  var categories = ["id11","id22","id33"];
  var products = ["Product 1","Product 2","Product 3","Product 4"]
  var ret = supplier.createSupplier(name, id,password,address,phone,banner,description,categories,products);
  ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

app.get("/supplier/read/", function(req,res){
  var id = req.params.id;
  console.log("id: "+id);
  var ret = supplier.readSupplier(id);
  ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

app.post("/supplier/update/",function(req,res){
	var name = req.body.name;
	var id = req.body.id;
	var password = req.body.password;
	var address = req.body.address;
	var phone = req.body.phone;
	var banner = req.body.banner;
	var description = req.body.description;
	var categories = ["id11","id22","id33"];
	var products = ["Product 1","Product 2","Product 3","Product 4"]
	var ret = supplier.updateSupplier(name, id,password,address,phone,banner,description,categories,products);
	ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

app.post("/supplier/delete",function(req,res){
  var id = req.body.id;
  var ret = supplier.deleteSupplier(id);
  ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});

// listen (start app with node server.js) ======================================
var port = process.env.PORT || 3000;
app.listen(port);
console.log("App listening on port 3000");
