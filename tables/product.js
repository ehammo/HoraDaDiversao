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
    createProduct(product) {
      var name = product.name;
      var price = product.price;
      var photo = product.photo;
      var availability = product.availability;
      var description = product.description;
      var category = product.category;
      var supplierId = product.supplierId;
      var metric = product.metric;

        return new Promise(function(resolve, reject) {
			SupplierTable.find({
				where: {
					id: supplierId
				}
			}).then(function(s) {
				if (!s) {
					reject("Erro! não existe um supplier cadastrado com o id" + supplierId);
				} else {
					s.getProducts().then((products) => {
						var counter = 0;
                        for (counter; counter < products.length; counter++) {
                            var values = products[counter].dataValues;
                            if(values.name==name){
								reject("Error! There is a prooduct in this supplier with this name")
							}
                        }
					}).then(() =>{
						ProductTable.create({
							name: name,
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

    readProductsBySupplier(id) {
        return new Promise(function(resolve, reject) {
            ProductTable.findAll({
              where : {
                SupplierId : id
              }
            }).then(function(products) {
                resolve(products);
            });
        });
    };

    updateProduct(name, id, price, photo, availability, description, category, supplierId, metric) {
	   return new Promise(function(resolve, reject) {
            SupplierTable.find({
				where: {
					id: supplierId
				}
			}).then(function(s) {
				if (!s) {
					reject("Erro! não existe um supplier cadastrado com o id" + supplierId);
				} else {
					s.getProducts().then((products) => {
						var counter = 0;
                        for (counter; counter < products.length; counter++) {
                            var values = products[counter].dataValues;
                            if(values.name==name){
								reject("Error! There is a product in this supplier with this name")
							}
                        }
					}).then(() =>{
						ProductTable.update({
							name: name,
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
				}
			});

		});
    };

    deleteProductRead(id) {
        // TODO falta verificar se a senha do fornecedor bate
        // TODO falta verificar se h� pedidos em andamento com esse produto. Caso haja, este produto torna-se
        //indisponivel para outros usuarios at� os pedidos finalizarem

        return new Promise(function(resolve, reject) {
            ProductTable.destroy({
                where: {
                    id: id
                }
            }).then(function(Product) {
                ProductTable.findAll({}).then(function(products) {
					resolve(products);
					console.log("removed %d Products and references with id: %s", Product, id);
				});

            });
        });
    }

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
