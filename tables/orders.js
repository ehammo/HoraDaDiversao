'use strict';
var Adapter;
var orderTable;

function setAdapter(adapter) {
	Adapter = adapter;
	setOrder();
}

function setOrder() {
	orderTable = Adapter.order;
}

class Order{	
	
	constructor(){}
	
	//create
	createOrder(id,qtd,date,address,status){
		orderTable.find({
			where: {id : id}
		})
		.then(function(order){
			if (order) {
				console.log("error! already has order with id " + id);
				return ("Erro! Já existe um order cadastrado com o id " + id);
			} else{
				orderTable.create({
					id: id,
					qtd: qtd,
					date: date,
					address: address,
					status: status
				}).then(function (order2) {
					console.log("created order: " + JSON.stringify(order2.dataValues) );
					return(order2);
				});
			}
		});
		
	}

	readOrder(id){ // get mesmo?
  		orderTable.find({
  			where: {id : id}
  		}).then(function(order){
  			if (order) { // not found returns null
				console.log("found order: " + JSON.stringify(order.dataValues) );
				//TODO checar de qual user é?
				return(order);
  				
  			} else{
				return(order);
  				//res.send("Erro! Não encontrou usuário com id " + id);
  				console.log("did not found order with id " + id);
  			}
  		});

	};

	updateOrder(name, id,pass,address,phone,orders,orders){
		orderTable.update({
			id: id,
			qtd: qtd,
			date: date,
			address: address,
			status: status
		}, { where : {id : id }
		}).then(function (order) {
			return(order);
			console.log(order);
			console.log('updated %d orders to: (%s,%s,%s)',order,id,qtd,date,address,status);
		});
	};
	
	deleteOrder(id){
 	// TODO falta verificar se o pedido já está em andamento

  	orderTable.destroy({
  		where : { id: id}
  	}).then(function (order) {
  		return ([order]);
  		console.log("removed %d orders and references with id: %s",order, id);
  	});
		
	}

	
}


module.exports = {
	order: order,
	setAdapter: setAdapter
};