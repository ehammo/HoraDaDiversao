'use strict';
var Adapter;
var ShopcartTable;
var UserTable;

function setAdapter(adapter) {
	Adapter = adapter;
	setShopcart();
}

function setShopcart() {
	ShopcartTable = Adapter.ShopCart;
	UserTable = Adapter.User;
}

class Shopcart{

	constructor(){}

	//create
	createShopcart(id,qtd,date,address,status,products,email){
			return new Promise(function (resolve,reject){
				ShopcartTable.find({
					where: {id : id}
				})
				.then(function(Shopcart){
					if (Shopcart) {
						console.log("error! already has Shopcart with id " + id);
						reject ("Erro! J� existe um Shopcart cadastrado com o id " + id);
					} else{
						UserTable.find({
							where: {email: email}
						}).then(function(user){
							if(!user){
								console.log("error! no user found");
								reject ("err");
							}else{
								ShopcartTable.create({
									id: id,
									qtd: qtd,
									date: date,
									address: address,
									status: status
								}).then((Shopcart2)=> {
									user.getHistory().then((shops) => {
										// var count = 0;
										// var resp = [];
										// for(count;count<shops.length;shops++){
										// 	var v = shops[count].id;
										// 	resp.push(v);
										// }
										// resp.push(Shopcart2.id);
										// user.setHistory(resp);
										//
										// Shopcart2.setOrders(orders);
										// console.log("created Shopcart: " + JSON.stringify(Shopcart2.dataValues) );
										// resolve(Shopcart2);
									});

								});
							}
						});
					}
				});
		});
	}

	readShopcart(id){ // get mesmo?
		return new Promise(function (resolve,reject){
  		ShopcartTable.find({
  			where: {id : id}
  		}).then(function(Shopcart){
  			if (Shopcart) { // not found returns null
				console.log("found Shopcart: " + JSON.stringify(Shopcart.dataValues) );
//				TODO checar de qual email �?
				resolve(Shopcart);

  			} else{
					reject(Shopcart);
  				//res.send("Erro! N�o encontrou usu�rio com id " + id);
  				console.log("did not found Shopcart with id " + id);
  			}
  		});
		});
	};

	readShopcarts(){ // get mesmo?
		return new Promise(function (resolve,reject){
  		ShopcartTable.findAll({
  		}).then(function(shopcarts){
				resolve(shopcarts);
  		});
		});

	};

	updateShopcart(id,qtd,date,address,status,products,email){
		return new Promise(function (resolve,reject){
			ShopcartTable.update({
				id: id,
				qtd: qtd,
				date: date,
				address: address,
				status: status
			}, { where : {id : id }
			}).then((Shopcart2)=> {
				UserTable.find({
					where: {email: email}
				}).then(function(user2){
					if(!user){
						console.log("error! no user found");
						reject ("err");
					}else{
						user2.getHistory().then((shops) => {
							var count = 0;
							var resp = [];
							for(count;count<shops.length;shops++){
								var v = shops[count].id;
								resp.push(v);
							}
							resp.push(ShopCart2.id);
							user2.setHistory(resp);
						});
					}
				});
				Shopcart.setOrders(orders);
				resolve(Shopcart);
				console.log(Shopcart);
	//			console.log('updated %d Shopcarts to: (%s,%s,%s)',Shopcart,id,status,orders);
				});
		});
	};

	deleteShopcart(id){
  	// TODO falta verificar se a senha bate
		return new Promise(function (resolve,reject){

	  	ShopcartTable.destroy({
	  		where : { id: id}
	  	}).then(function (Shopcart) {
	  		resolve ([Shopcart]);
	  		console.log("removed %d Shopcarts and references with id: %s",Shopcart, id);
	  	});
		});
	}

}


module.exports = {
	Shopcart: Shopcart,
	setAdapter: setAdapter
};
