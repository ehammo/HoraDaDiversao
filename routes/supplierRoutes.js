var express = require('express');
var app = express.Router();
var Sequelize = require('sequelize');

module.exports = function(supplier){
	
app.get("/", function(req, res) {
    var ret = supplier.readSuppliers();
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.get("/:category", function(req, res) {
    var category = req.params.category;
    console.log("category: " + category);
    var ret = supplier.readSuppliersByCategory(category);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.post("/create/", function(req, res) {
    var ret = supplier.createSupplier(req.body);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.get("/read/:id", function(req, res) {
    var id = req.params.id;
    var ret = supplier.readSupplier(id);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.post("/update/", function(req, res) {
    var name = req.body.name;
    var id = req.body.id;
    var password = req.body.password;
    var address = req.body.address;
    var phone = req.body.phone;
    var banner = req.body.banner;
    var description = req.body.description;
    var categories = ["id11", "id22", "id33"];
    var ret = supplier.updateSupplier(name, id, password, address, phone, banner, description, categories);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.post("/delete", function(req, res) {
    var id = req.body.id;
    var ret = supplier.deleteSupplier(id);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.post("/deleteRead", function(req, res) {
    var id = req.body.id;
    var ret = supplier.deleteSupplierRead(id);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

return app;
}