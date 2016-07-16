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

class Supplier{	
	
	constructor(){}
	
	//create
	createSupplier(name, id,pass,address,phone,banner,description,categories,products){
		SupplierTable.find({
			where: {id : id}
		})
		.then(function(supplier){
			if (supplier) {
				console.log("error! already has supplier with id " + id);
				return true;
				return ("Erro! Já existe um usuário cadastrado com o id " + id);
			} else{
				SupplierTable.create({
					name: name,
					id: id,
					password: pass,
					address:address,
					phone: phone,
					banner: banner,
					description: description,
					categories: categories
				}).then(function (supplier2) {
					supplier2.setProducts(products);
					console.log("created supplier: " + JSON.stringify(supplier2.dataValues) );
					return(supplier2);
				});
			}
		});
		
	}

	readSupplier(id){ // get mesmo?
  		SupplierTable.find({
  			where: {id : id}
  		}).then(function(supplier){
  			if (supplier) { // not found returns null
				console.log("found supplier: " + JSON.stringify(supplier.dataValues) );
				console.log("\n\n");
				return(supplier);
  				
  			} else{
				return(supplier);
  				//res.send("Erro! Não encontrou usuário com id " + id);
  				console.log("did not found supplier with id " + id);
  			}
  		});

	};

	updateSupplier(name, id,pass,address,phone,banner,description,categories,products){
		SupplierTable.update({
			name: name,
			id: id,
			password: pass,
			address:address,
			phone: phone,
			banner: banner,
			description: description,
			categories: categories
		}, { where : {id : id }
		}).then((query) => {
			SupplierTable.find({
				where: {id : id}
			}).then(function(supplier){			
				supplier.setProducts(products)
				return(supplier);
				console.log(supplier);
				console.log('updated %d suppliers to: (%s,%s,%s)',supplier,name, id,pass,address,phone,banner,description,categories);
			});
		});
	}
	deleteSupplier(id){
  	// TODO falta verificar se a senha bate
	// TODO falta verificar se existe pedidos em andamento
	// TODO falta apagar os pedidos e as crianças dependentes.

  	SupplierTable.destroy({
  		where : { id: id}
  	}).then(function (supplier) {
  		return ([supplier]);
  		console.log("removed %d suppliers and references with id: %s",supplier, id);
  	});
		
	}

	
}


module.exports = {
	Supplier: Supplier,
	setAdapter: setAdapter
};