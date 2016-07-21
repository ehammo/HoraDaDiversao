'use strict';
var Adapter;
var ShopcartTable;
var UserTable;
var ProductTable;

function setAdapter(adapter) {
    Adapter = adapter;
    setShopcart();
}

function setShopcart() {
    ShopcartTable = Adapter.ShopCart;
    UserTable = Adapter.User;
    ProductTable = Adapter.Product;
}

class Shopcart {

    constructor() {}

    //create
    createShopcart(id, date, address, status, products, email) {
        return new Promise(function(resolve, reject) {
            ShopcartTable.find({
                    where: {
                        id: id
                    }
                })
                .then(function(Shopcart) {
                    if (Shopcart) {
                        console.log("error! already has Shopcart with id " + id);
                        reject("Erro! J� existe um Shopcart cadastrado com o id " + id);
                    } else {
                        UserTable.find({
                            where: {
                                email: email
                            }
                        }).then(function(user) {
                            if (!user) {
                                console.log("error! no user found");
                                reject("err");
                            } else {
                                ShopcartTable.create({
                                    id: id,
                                    date: date,
                                    address: address,
                                    status: status,
                                    UserEmail: email
                                }).then((Shopcart2) => {
                                    user.getHistory().then((shops) => {
                                        var count = 0;
                                        var resp = [];
                                        for (count; count < shops.length; shops++) {
                                            var v = shops[count].id;
                                            resp.push(v);
                                        }
                                        resp.push(Shopcart2.id);
                                        user.setHistory(resp);

                                        Shopcart2.setProducts(products);
                                        console.log("created Shopcart: " + JSON.stringify(Shopcart2.dataValues));
                                        resolve(Shopcart2);
                                    });

                                });
                            }
                        });
                    }
                });
        });
    }

    readShopcart(id) { // get mesmo?
        return new Promise(function(resolve, reject) {
            ShopcartTable.find({
                where: {
                    id: id
                }
            }).then(function(Shopcart) {
                if (Shopcart) { // not found returns null
                    console.log("found Shopcart: " + JSON.stringify(Shopcart.dataValues));
                    //				TODO checar de qual email �?
                    resolve(Shopcart);

                } else {
                    reject(Shopcart);
                    //res.send("Erro! N�o encontrou usu�rio com id " + id);
                    console.log("did not found Shopcart with id " + id);
                }
            });
        });
    };

    readShopcarts() { // get mesmo?
        return new Promise(function(resolve, reject) {
            ShopcartTable.findAll({}).then(function(shopcarts) {
                resolve(shopcarts);
            });
        });

    };

    updateShopcart(id, date, address, status, products, email) {
        return new Promise(function(resolve, reject) {
            ShopcartTable.update({
                id: id,
                date: date,
                address: address,
                status: status,
                UserEmail: email
            }, {
                where: {
                    id: id
                }
            }).then((Shopcart) => {
                UserTable.find({
                    where: {
                        email: email
                    }
                }).then(function(user) {
                    if (!user) {
                        console.log("error! no user found");
                        reject("error! no user found");
                    } else {
                        ShopcartTable.find({
                            where: {
                                id: id
                            }
                        }).then((Shopcart2) => {
                            user.getHistory().then((shops) => {
                                var count = 0;
                                var resp = [];
                                for (count; count < shops.length; shops++) {
                                    var v = shops[count].id;
                                    resp.push(v);
                                }
                                resp.push(Shopcart2.id);
                                user.setHistory(resp);
                                console.log(Shopcart2);
                                Shopcart2.setProducts(products);
                                resolve(Shopcart2);
                            });
                        });
                    }
                });
                //			console.log('updated %d Shopcarts to: (%s,%s,%s)',Shopcart,id,status,orders);
            });
        });
    };

    addProduct(idP, idS, qtd) {
        return new Promise(function(resolve, reject) {
            ShopcartTable.find({
                where: {
                    id: idS
                }
            }).then(function(shopcart) {
                console.log(shopcart);
                if (!shopcart) {
                    console.log("error! no shopcart found");
                    reject("error! no shopcart found");
                } else {
                    ProductTable.find({
                        where: {
                            id: idP
                        }
                    }).then(function(product) {
                        if (!product) {
                            console.log("error! no product found");
                            reject("error! no product found");
                        } else {
                            console.log(qtd);
                            shopcart.addProduct(product, {
                                qtd: qtd
                            });
                            resolve("Product added with sucess");
                        }

                    })
                }
            });

        });
    }

    getProducts(id) {
        console.log("promise");
        return new Promise(function(resolve, reject) {
            ShopcartTable.find({
                where: {
                    id: id
                }
            }).then(function(shopcart) {
                console.log("hey yo");
                console.log(shopcart);
                if (!shopcart) {
                    console.log("error! no shopcart found");
                    reject("error! no shopcart found");
                } else {
                    console.log("yay?");
                    resolve(shopcart.getProducts());
                    console.log("maorreu?");
                }

            });
        });
    }

    deleteShopcart(id) {
        // TODO falta verificar se a senha bate
        return new Promise(function(resolve, reject) {

            ShopcartTable.destroy({
                where: {
                    id: id
                }
            }).then(function(Shopcart) {
                resolve([Shopcart]);
                console.log("removed %d Shopcarts and references with id: %s", Shopcart, id);
            });
        });
    }

}


module.exports = {
    Shopcart: Shopcart,
    setAdapter: setAdapter
};
