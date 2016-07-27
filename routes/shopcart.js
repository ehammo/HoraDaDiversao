var express = require('express');
var app = express.Router();
var Sequelize = require('sequelize');

module.exports = function(shopcart){

app.get("/", function(req, res) {
    var ret = shopcart.readShopcarts();
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.post("/create/", function(req, res) {
      var ret = shopcart.createShopcart(req.body);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.get("/read/", function(req, res) {
    var id = req.query.id;
    var ret = shopcart.readShopcart(id);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.post("/delete", function(req, res) {
    var id = req.body.id;
    var ret = shopcart.deleteShopcart(id);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.post("/deleteRead", function(req, res) {
    var id = req.body.id;
    var ret = shopcart.deleteShopcartRead(id);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.post("/update/", function(req, res) {
    var id = req.body.id;
    var date = req.body.date;
    var address = req.body.address;
    var status = req.body.status;
    var email = req.body.email;
    console.log("email: " + email);
    var ret = shopcart.updateShopcart(id, date, address, status, email);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

app.post("/addProduct", function(req, res) {
    var productId = req.body.productId;
    var shopcartId = req.body.shopcartId;
    var qtd = req.body.qtd;
    console.log(qtd);
    var ret = shopcart.addProduct(productId, shopcartId, qtd);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    })

});

app.post("/removeProduct", function(req, res) {
    var productId = req.body.productId;
    var shopcartId = req.body.shopcartId;
    var ret = shopcart.removeProduct(productId, shopcartId);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    })

});

app.post("/updateProduct", function(req, res) {
    var productId = req.body.productId;
    var shopcartId = req.body.shopcartId;
    var qtd = req.body.qtd
	var ret = shopcart.updateProduct(productId, shopcartId,qtd);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    })

});

/*
app.get("/getProducts/:shopcartId", function(req,res){
	var shopcartId = req.params.shopcartId
	var ret = shopcart.getProducts(shopcartId);
	ret.then(function (ret2) {res.send(ret2)}, function (err){res.send(err)});
});*/

app.get("/getProducts/", function(req, res) {
    var shopcartId = req.query.shopcartId
    var ret = shopcart.getProducts(shopcartId);
    ret.then(function(ret2) {
        res.send(ret2)
    }, function(err) {
        res.send(err)
    });
});

return app;
}
