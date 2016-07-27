var express = require('express');
var app = express(); // create our app w/ express
var Sequelize = require('sequelize'); // sequelize for postGree
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================
var env = process.env.NODE_ENV || 'production';
var config = require('./config')[env];
var db = config.database;
var connection = new Sequelize(db.db, db.user, db.password, {
    host: db.host,
    dialect: db.dialect,
    dialectOptions: db.dialectOptions
}); // connect to database


app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride());

var tables = require('./tables/tables')(connection);

var UserClass = require('./tables/user');
var KidClass = require('./tables/kid');
//var OrderClass = require('./tables/orders');
var ProductClass = require('./tables/product');
var ShopcartClass = require('./tables/shopcart');
var SupplierClass = require('./tables/supplier');

var user = new UserClass.User(tables);
var kid = new KidClass.Kid(tables);
//var order = new OrderClass.Order();
var product = new ProductClass.Product(tables);
var shopcart = new ShopcartClass.Shopcart(tables);
var supplier = new SupplierClass.Supplier(tables);

connection
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function(err) {
        console.log('Unable to connect to the database:', err);
    });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//routes

app.get("/", function(req, res) {
    res.send("<h1>Hello from HoraDiversao WebServer</h1>");
    console.log('index');
});

app.get("/resetdb", function(req, res) {
    connection.sync({
        force: true
    });
    res.send("resetou!");
    console.log("resetou!");
});

var generator = require('./generator')(connection, user, product, shopcart, supplier);
app.use('/gen',generator);

//User
var userRoute = require("./routes/user")(user)
app.use("/user",userRoute)

//Kid
var kidRoute = require("./routes/kid")(kid)
app.use("/kid",kidRoute)

//product
var productRoute = require("./routes/product")(product)
app.use("/product",productRoute)

//shopcart
var shopcartRoute = require("./routes/shopcart")(shopcart)
app.use("/shopcart",shopcartRoute)

//supplier
var supplierRoute = require("./routes/supplier")(supplier)
app.use("/supplier",supplierRoute)

// listen (start app with node server.js) ======================================
var port = process.env.PORT || 3000;
app.listen(port);
console.log("App listening on port 3000");
