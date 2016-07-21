'use strict';
var Adapter;
var ProductTable;
var SupplierTable;

function setAdapter(adapter) {
    Adapter = adapter;
    setProduct();
}

function setProduct() {
    ProductTable = Adapter.Product;
    SupplierTable = Adapter.Supplier;
}

class Product {

    constructor() {}

    //create
    createProduct(name, id, price, photo, availability, description, category, supplierId, metric) {
        return new Promise(function(resolve, reject) {
            ProductTable.find({
                    where: {
                        id: id
                    }
                })
                .then(function(Product) {
                    if (Product) {
                        console.log("error! already has Product with id " + id);
                        reject("Erro! J� existe um Product cadastrado com o id " + id);
                    } else {
                        SupplierTable.find({
                            where: {
                                id: supplierId
                            }
                        }).then(function(s) {
                            if (!s) {
                                reject("Erro! não existe um supplier cadastrado com o id" + supplierId);
                            } else {
                                ProductTable.create({
                                    name: name,
                                    id: id,
                                    price: price,
                                    photo: photo,
                                    availability: availability,
                                    description: description,
                                    category: category,
                                    metric: metric,
                                    SupplierId: supplierId
                                }).then(function(Product2) {
                                    console.log("created Product: " + JSON.stringify(Product2.dataValues));
                                    resolve(Product2);
                                });
                            }
                        });

                    }
                });
        });

    }

    readProduct(id) {
        return new Promise(function(resolve, reject) {
            ProductTable.find({
                where: {
                    id: id
                }
            }).then(function(Product) {
                if (Product) { // not found returns null
                    console.log("found Product: " + JSON.stringify(Product.dataValues));
                    //				TODO checar de qual user �?
                    resolve(Product);

                } else {
                    //res.send("Erro! N�o encontrou usu�rio com id " + id);
                    console.log("did not found Product with id " + id);
                    reject("not found");
                }
            });
        });
    };

    readProducts() {
        return new Promise(function(resolve, reject) {
            ProductTable.findAll({}).then(function(products) {
                resolve(products);
            });
        });
    };

    updateProduct(name, id, price, photo, availability, description, category, supplierId, metric) {
        return new Promise(function(resolve, reject) {
            ProductTable.update({
                name: name,
                id: id,
                price: price,
                photo: photo,
                availability: availability,
                description: description,
                category: category,
                metric: metric,
                SupplierId: supplierId
            }, {
                where: {
                    id: id
                }
            }).then(function(Product) {
                resolve(Product);
                console.log(Product);
                console.log('updated %d Products to: (%s,%s,%s)', Product, name, id, price, photo, availability, description, category);
            });
        });
    };

    deleteProduct(id) {
        // TODO falta verificar se a senha do fornecedor bate
        // TODO falta verificar se h� pedidos em andamento com esse produto. Caso haja, este produto torna-se
        //indisponivel para outros usuarios at� os pedidos finalizarem

        return new Promise(function(resolve, reject) {
            ProductTable.destroy({
                where: {
                    id: id
                }
            }).then(function(Product) {
                resolve([Product]);
                console.log("removed %d Products and references with id: %s", Product, id);
            });
        });
    }
}

module.exports = {
    Product: Product,
    setAdapter: setAdapter
};
