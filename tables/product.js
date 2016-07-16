'use strict';
var Adapter;
var ProductTable;

function setAdapter(adapter) {
	Adapter = adapter;
	setProduct();
}

function setProduct() {
	ProductTable = Adapter.Product;
}

class Product{	
	
	constructor(){}
	
	//create
	createProduct(name, id,price,photo,availability,description, category){
		ProductTable.find({
			where: {id : id}
		})
		.then(function(Product){
			if (Product) {
				console.log("error! already has Product with id " + id);
				return ("Erro! Já existe um Product cadastrado com o id " + id);
			} else{
				ProductTable.create({
					name: name,
					id: id,
					price: price,
					photo: photo,
					availability: availability,
					description: description,
					category: category
				}).then(function (Product2) {
					console.log("created Product: " + JSON.stringify(Product2.dataValues) );
					return(Product2);
				});
			}
		});
		
	}

	readProduct(id){ // get mesmo?
  		ProductTable.find({
  			where: {id : id}
  		}).then(function(Product){
  			if (Product) { // not found returns null
				console.log("found Product: " + JSON.stringify(Product.dataValues) );
//				TODO checar de qual user é?
				return(Product);
  				
  			} else{
				return(Product);
  				//res.send("Erro! Não encontrou usuário com id " + id);
  				console.log("did not found Product with id " + id);
  			}
  		});

	};

	updateProduct(name, id,price,photo,availability,description, category){
		ProductTable.update({
			name: name,
			id: id,
			price: price,
			photo: photo,
			availability: availability,
			description: description,
			category: category
		}, { where : {id : id }
		}).then(function (Product) {
			return(Product);
			console.log(Product);
			console.log('updated %d Products to: (%s,%s,%s)',Product,name, id,price,photo,availability,description, category);
		});
	};
	
	deleteProduct(id){
  	// TODO falta verificar se a senha do fornecedor bate
	// TODO falta verificar se há pedidos em andamento com esse produto. Caso haja, este produto torna-se
		//indisponivel para outros usuarios até os pedidos finalizarem
	
  	ProductTable.destroy({
  		where : { id: id}
  	}).then(function (Product) {
  		return ([Product]);
  		console.log("removed %d Products and references with id: %s",Product, id);
  	});
		
	}

	
}


module.exports = {
	Product: Product,
	setAdapter: setAdapter
};