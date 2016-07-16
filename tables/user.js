'use strict';
var Adapter;
var UserTable;

function setAdapter(adapter) {
	Adapter = adapter;
	setUser();
}

function setUser() {
	UserTable = Adapter.User;
}

class User{	
	
	constructor(){}
	
	//create
	createUser(name, email,pass,address,phone,kids,orders){
		UserTable.find({
			where: {email : email}
		})
		.then(function(user){
			if (user) {
				console.log("error! already has user with email " + email);
				return true;
				return ("Erro! Já existe um usuário cadastrado com o email " + email);
			} else{
				UserTable.create({
					name: name,
					email: email,
					password: pass,
					address:address,
					phone: phone
				}).then(function (user2) {
					user2.setKids(kids);
					user2.setHistory(orders);
					console.log("created user: " + JSON.stringify(user2.dataValues) );
					return(user2);
				});
			}
		});
		
	}

	readUser(email){ // get mesmo?
  		UserTable.find({
  			where: {email : email}
  		}).then(function(user){
  			if (user) { // not found returns null
				console.log("found user: " + JSON.stringify(user.dataValues) );
				console.log("\n\n");
				user.getKids().then((kids) => {
					var counter = 0;
					for (counter; counter < kids.length; counter++) {
						var values = kids[counter].dataValues;
						console.log(JSON.stringify(values)+"\n\n");
					}
					
				});
				return(user);
  				
  			} else{
				return(user);
  				//res.send("Erro! Não encontrou usuário com email " + email);
  				console.log("did not found user with email " + email);
  			}
  		});

	};

	updateUser(name, email,pass,address,phone,kids,orders){
		UserTable.update({
			name: name,
			email: email,
			password: pass,
			address:address,
			phone: phone
		}, { where : {email : email }
		}).then(function (user) {
			user.setKids(kids);
			user.setHistory(orders);
			return(user);
			console.log(user);
			console.log('updated %d users to: (%s,%s,%s)',user,name,email,password,address,phone);
		});
	};
	
	deleteUser(email){
  	// TODO falta verificar se a senha bate
	// TODO falta verificar se existe pedidos em andamento
	// TODO falta checar se os pedidos e as crianças dependentes sao apagadas. se nao forem implementar.

  	UserTable.destroy({
  		where : { email: email}
  	}).then(function (user) {
  		return ([user]);
  		console.log("removed %d users and references with email: %s",user, email);
  	});
		
	}

	
}


module.exports = {
	User: User,
	setAdapter: setAdapter
};