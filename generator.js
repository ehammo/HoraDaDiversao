var express = require('express');
var router = express.Router();

module.exports = function(connection, user, product, shopcart, supplier) {

    router.get("/f", function(req, res) {
        var tamarindus = {
            name: "Tamarindus",
            password: "password",
            address: "R. Dr. José Maria, 848, Recife - PE",
            phone: "(81) 3242-3042",
            banner: "https://lh3.googleusercontent.com/xSeCWQgbze32oKga4-tCZsjC4ehSHl6xAMeDzyW0LVgouoHCh9RcTYDJ-HddM7FOleq1=w300",
            description: "Tamarindus Festa é uma empresa especializada em doces e salgados,tortas em Recife. Aqui você encontra,kit festa,decoração,balão de gás hélio,torta …",
            categories: ["doces", "salgados"]
        };

        var delidoces = {
            name: "Deli Doces",
            password: "password",
            address: "Av. Caxangá, 255 - Cordeiro, Recife - PE, 50721-000",
            phone: "(81) 3087-0707",
            banner: "http://www.delidoces.com.br/images/logo.png",
            description: "Toda nossa linha de doces e salgados, exclusividade Delidoces, varias lojas em recife, entrega tortas, doces, salgados, kit festa.",
            categories: ["doces", "salgados"]
        };

        var prod1 = {
            name: "Box 25 Salgados",
            price: 15,
            photo: "http://tamarindus.com.br/v2/components/com_pagseguro/pagseguro/tbs_51ac5a9d32eca45fbec132f3253ddc6b.jpg",
            availability: true,
            description: "Opcões: coxinha,risoles,croquete queijo e croquete camarão.",
            category: "salgados",
            metric: "unidade"
        };

        var prod2 = {
            name: "Box 50 Salgados",
            price: 26,
            photo: "http://tamarindus.com.br/v2/components/com_pagseguro/pagseguro/tbs_3c79ebc435cb2a3849d7b780af530709.jpg",
            availability: true,
            description: "Opcões: coxinha,risoles,croquete queijo e croquete camarão.",
            category: "salgados",
            metric: "unidade"
        };

        var prod3 = {
            name: "Box 20 brigadeiros",
            price: 20,
            photo: "http://tamarindus.com.br/v2/components/com_pagseguro/pagseguro/tbs_e183535eb096e4cfe046f57a9b049d13.jpg",
            availability: true,
            description: "20 brigadeiros",
            category: "doces",
            metric: "unidade"
        };

        var prod4 = {
            name: "Torta de Brigadeiro (Kg)",
            price: 44.90,
            photo: "http://tamarindus.com.br/v2/components/com_pagseguro/pagseguro/tbs_46d7140882d59adb1a4ecdbce48d732e.JPG",
            availability: true,
            description: "Massa: de chocolate. - Recheio: de brigadeiro. - Cobertura: granulado de chocolate",
            category: "doces",
            metric: "Kg"
        };

        var prod5 = {
            name: "Kit Grande (T3)",
            price: 372.40,
            photo: "",
            availability: true,
            description: "80 doces simples + torta de doce de leite ou brigadeiro (grande) + 150 coxinhas + 150 croquetes de queijos + 3 guaraná 2LT + 1 vela",
            category: "kit",
            metric: "unidade"
        };

        var ret, ret2;

        connection.sync({
            force: true
        }).then(function(a) {
            ret = supplier.createSupplier(tamarindus);
            ret.then(function(data) {
                prod1.supplierId = prod2.supplierId = prod3.supplierId = prod4.supplierId = prod5.supplierId = data.id;
                product.createProduct(prod1);
                product.createProduct(prod2);
                product.createProduct(prod3);
                product.createProduct(prod4);
                product.createProduct(prod5);
                res.send("doing");
            }, function(err) {
                res.send(err);
            });

            ret2 = supplier.createSupplier(delidoces);
            ret2.then(function(data) {
                var prod1b = prod1;
                var prod2b = prod2;
                var prod3b = prod3;
                var prod4b = prod4;
                var prod5b = prod5;
                prod1b.supplierId = prod2b.supplierId = prod3b.supplierId = prod4b.supplierId = prod5b.supplierId = data.id;
                product.createProduct(prod1b);
                product.createProduct(prod2b);
                product.createProduct(prod3b);
                product.createProduct(prod4b);
                product.createProduct(prod5b);
                res.send("doing");
            }, function(err) {
                res.send(err);
            });
        });
    });

    router.get("/u", function(req, res) {
        var joao = {
            name: "Joao",
            email: "joao@gmail.com",
            password: "senha",
            address: "",
            phone: ""
        };

        var cart = {
            date: "",
            address: "",
            status: "",
            email: joao.email
        };

        var ret;

        ret = user.createUser(joao);
        ret.then(function(data) {
            ret = shopcart.createShopcart(cart);
            ret.then(function(data) {
                var productId = req.body.productId;
                var shopcartId = req.body.shopcartId;
                var qtd = req.body.qtd;

                shopcart.addProduct(2, 1, 2);
                shopcart.addProduct(3, 1, 2);
                shopcart.addProduct(4, 1, 1);
                res.send("doing");
            }, function(err) {
                res.send(err);
            });
        }, function(err) {
            res.send(err);
        });
    });

    return router;
}
