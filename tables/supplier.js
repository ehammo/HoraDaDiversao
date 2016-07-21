'use strict';
var Adapter;
var SupplierTable;

function setAdapter(adapter) {
    Adapter = adapter;
    setSupplier();
}

function setSupplier() {
    SupplierTable = Adapter.Supplier;
}

class Supplier {

    constructor() {}

    //create
    createSupplier(name, id, pass, address, phone, banner, description, categories, products) {
        return new Promise(function(resolve, reject) {
            SupplierTable.find({
                    where: {
                        id: id
                    }
                })
                .then(function(supplier) {
                    if (supplier) {
                        console.log("error! already has supplier with id " + id);
                        reject("Erro! J� existe um usu�rio cadastrado com o id " + id);
                    } else {
                        SupplierTable.create({
                            name: name,
                            id: id,
                            password: pass,
                            address: address,
                            phone: phone,
                            banner: banner,
                            description: description,
                            categories: categories
                        }).then(function(supplier2) {
                            supplier2.setProducts(products);
                            console.log("created supplier: " + JSON.stringify(supplier2.dataValues));
                            resolve(supplier2);
                        });
                    }
                });
        });

    }

    readSupplier(id) { // get mesmo?
        return new Promise(function(resolve, reject) {
            SupplierTable.find({
                where: {
                    id: id
                }
            }).then(function(supplier) {
                if (supplier) { // not found returns null
                    console.log("found supplier: " + JSON.stringify(supplier.dataValues));
                    console.log("\n\n");
                    resolve(supplier);

                } else {
                    //res.send("Erro! N�o encontrou usu�rio com id " + id);
                    console.log("did not found supplier with id " + id);
                    reject(supplier);
                }
            });
        });
    };

    readSuppliers() { // get mesmo?
        return new Promise(function(resolve, reject) {
            SupplierTable.findAll({}).then(function(suppliers) {
                resolve(suppliers);
            });
        });
    };

    updateSupplier(name, id, pass, address, phone, banner, description, categories, products) {
        return new Promise(function(resolve, reject) {
            SupplierTable.update({
                name: name,
                id: id,
                password: pass,
                address: address,
                phone: phone,
                banner: banner,
                description: description,
                categories: categories
            }, {
                where: {
                    id: id
                }
            }).then((query) => {
                SupplierTable.find({
                    where: {
                        id: id
                    }
                }).then(function(supplier) {
                    supplier.setProducts(products)
                    console.log(supplier);
                    console.log('updated %d suppliers to: (%s,%s,%s)', supplier, name, id, pass, address, phone, banner, description, categories);
                    resolve(supplier);
                });
            });
        });
    }
    deleteSupplier(id) {
        // TODO falta verificar se a senha bate
        // TODO falta verificar se existe pedidos em andamento
        // TODO falta apagar os pedidos e as crian�as dependentes.
        return new Promise(function(resolve, reject) {

            SupplierTable.destroy({
                where: {
                    id: id
                }
            }).then(function(supplier) {
                console.log("removed %d suppliers and references with id: %s", supplier, id);
                resolve([supplier]);
            });
        });
    }
}

module.exports = {
    Supplier: Supplier,
    setAdapter: setAdapter
};
