var express = require('express');
var app = express.Router();
var Sequelize = require('sequelize');

module.exports = function(user){

app.get("/", function(req, res) {
    var ret = user.readUsers();
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.post("/create/", function(req, res) {
    var ret = user.createUser(req.body);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.get("/read/", function(req, res) {
    var email = req.query.email;
    var ret = user.readUser(email);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.post("/update/", function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var address = req.body.address;
    var phone = req.body.phone;
    var ret = user.updateUser(name, email, password, address, phone);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.post("/delete", function(req, res) {
    var email = req.body.email;

    var ret = user.deleteUser(email);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.post("/check", function(req, res) {
    var email = req.body.email;
	var pass = req.body.password;
    var ret = user.check(email,pass);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

/*app.get("/read/:email", function(req,res){
	var email = req.params.email;
	console.log("email: "+email);
	user.readUser(email);
	ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});*/
return app;
}
