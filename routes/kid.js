var express = require('express');
var app = express.Router();
var Sequelize = require('sequelize');

module.exports = function(kid){

app.get("/", function(req, res) {
    var ret = kid.readKids();
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.post("/create/", function(req, res) {
    var name = req.body.name;
    var gender = req.body.gender;
    var birth = req.body.birth;
    var email = req.body.UserEmail;
    var ret = kid.createKid(name, gender, birth, email);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.get("/read/", function(req, res) {
    var id = req.query.id;
    console.log("id: " + id);
    var ret = kid.readKid(id);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.post("/update/", function(req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var gender = req.body.gender;
    var birth = req.body.birth;
    var email = req.body.UserEmail;
    var ret = kid.updateKid(name, id, gender, birth, email);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.post("/delete", function(req, res) {
    var id = req.body.id;
    var ret = kid.deleteKid(id);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.post("/deleteRead", function(req, res) {
    var id = req.body.id;
    var ret = kid.deleteKidRead(id);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

return app;
}
