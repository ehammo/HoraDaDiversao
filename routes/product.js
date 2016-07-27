var express = require('express');
var app = express.Router();
var Sequelize = require('sequelize');

module.exports = function(product){

app.get("/", function(req, res) {
    var ret = product.readProducts();
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.get("/supplier/", function(req, res) {
    var id = req.query.id;
    var ret = product.readProductsBySupplier(id);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.post("/create/", function(req, res) {
    var ret = product.createProduct(req.body);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.get("/read/", function(req, res) {
    var id = req.query.id;
    console.log("id: " + id);
    var ret = product.readProduct(id);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.post("/update/", function(req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var id = req.body.id;
    var photo = req.body.photo;
    var availability = req.body.availability;
    var description = req.body.description;
    var category = req.body.category;
    var metric = req.body.metric;
    var supplierId = req.body.supplierId;
    var ret = product.updateProduct(name, id, price, photo, availability, description, category, supplierId, metric);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.post("/delete", function(req, res) {
    var id = req.body.id;
    var ret = product.deleteProduct(id);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.post("/deleteRead", function(req, res) {
    var id = req.body.id;
    var ret = product.deleteProductRead(id);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

return app;
}
