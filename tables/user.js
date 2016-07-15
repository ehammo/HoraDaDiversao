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
				res.status(500);
					res.send("Erro! Já existe um usuário cadastrado com o email " + email);
					console.log("error! already has user with email " + email);
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
					return(user2);
					console.log("created user: " + JSON.stringify(user2.dataValues) );
				});
			}
		});
		
	}

	readUser(email){ // get mesmo?
  		User.find({
  			where: {email : email}
  		}).then(function(user){
  			if (user) { // not found returns null
  				return(user);
  				console.log("found user: " + JSON.stringify(user.dataValues) );
  			} else{
				return(user);
  				res.send("Erro! Não encontrou usuário com email " + email);
  				console.log("did not found user with email " + email);
  			}
  		});

	};

	updateUser(name, email,pass,address,phone,kids,orders){
		User.update({
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
			console.log('updated %d users to: (%s,%s,%s)',user,name,email,password);
		});
	};
	
	deleteUser(email){
  	// TODO falta verificar se a senha bate
	// TODO falta verificar se existe pedidos em andamento
	// TODO falta checar se os pedidos e as crianças dependentes sao apagadas. se nao forem implementar.

  	User.destroy({
  		where : { email: email}
  	}).then(function (user) {
  		res.send([user]);
  		console.log("removed %d users and references with email: %s",user, email);
  	});
		
	}

	
}


module.exports = {
	User: User,
	setAdapter: setAdapter
};