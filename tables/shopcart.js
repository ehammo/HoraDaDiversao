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
	createShopcart(id,status,orders,email){
		ShopcartTable.find({
			where: {id : id}
		})
		.then(function(Shopcart){
			if (Shopcart) {
				console.log("error! already has Shopcart with id " + id);
				return ("Erro! Já existe um Shopcart cadastrado com o id " + id);
			} else{
				UserTable.find({
					where: {email: email}
				}).then(function(user){
					if(!user){
						console.log("error! no user found");
						return ("err");
					}else{
						ShopcartTable.create({
							id: id,
							status: status
						}).then((Shopcart2)=> {							
							user.getHistory().then((shops) => {
								var count = 0;
								var resp = [];
								for(count;count<shops.length;shops++){
									var v = shops[count].id;
									resp.push(v);
								}
								resp.push(Shopcart2.id);
								user.setHistory(resp);
							});
						
							Shopcart2.setOrders(orders);
							console.log("created Shopcart: " + JSON.stringify(Shopcart2.dataValues) );
							return(Shopcart2);
						});
					}
				});
			}
		});
		
	}

	readShopcart(id){ // get mesmo?
  		ShopcartTable.find({
  			where: {id : id}
  		}).then(function(Shopcart){
  			if (Shopcart) { // not found returns null
				console.log("found Shopcart: " + JSON.stringify(Shopcart.dataValues) );
//				TODO checar de qual email é?
				return(Shopcart);
  				
  			} else{
				return(Shopcart);
  				//res.send("Erro! Não encontrou usuário com id " + id);
  				console.log("did not found Shopcart with id " + id);
  			}
  		});

	};

	updateShopcart(id,status,orders,email){
		ShopcartTable.update({
			id: id,
			status: status
		}, { where : {id : id }
		}).then((Shopcart2)=> {
			UserTable.find({
				where: {email: email}
			}).then(function(user2){
				if(!user){
					console.log("error! no user found");
					return ("err");
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
			return(Shopcart);
			console.log(Shopcart);
			console.log('updated %d Shopcarts to: (%s,%s,%s)',Shopcart,id,status,orders);
			});
		};
	
	deleteShopcart(id){
  	// TODO falta verificar se a senha bate

  	ShopcartTable.destroy({
  		where : { id: id}
  	}).then(function (Shopcart) {
  		return ([Shopcart]);
  		console.log("removed %d Shopcarts and references with id: %s",Shopcart, id);
  	});
		
	}

	
}


module.exports = {
	Shopcart: Shopcart,
	setAdapter: setAdapter
};