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
	createUser (name, email,pass,address,phone){
	  return new Promise(function (resolve,reject){
	    UserTable.find({
	      where: {email : email}
	    })
	    .then(function(user){
	      if (user) {
	        console.log("error! already has user with email " + email);
	        //res.send(user);
	        reject(user);
	        //return ("Erro! Já existe um usuário cadastrado com o email " + email);
	      } else {
	        UserTable.create({
	          name: name,
	          email: email,
	          password: pass,
	          address:address,
	          phone: phone
	        }).then((user2) => {
	          console.log("created user: " + JSON.stringify(user2.dataValues) );
	          resolve(user2);
	        });
	      }
	    });
	});
	}

	readUser(email){ // get mesmo?
		return new Promise(function (resolve,reject){
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
					resolve (user);

  			} else{
					reject ("not found");
  				//res.send("Erro! Não encontrou usuário com email " + email);
  				console.log("did not found user with email " + email);
  			}
  		});
		});

	};

	updateUser(name, email,pass,address,phone){
		UserTable.update({
			name: name,
			email: email,
			password: pass,
			address:address,
			phone: phone
		}, { where : {email : email }
		}).then((query) => {
			UserTable.find({
				where: {email : email}
			}).then(function(user){
				return(user);
				console.log(user);
				console.log('updated %d users to: (%s,%s,%s)',user,name,email,password,address,phone);
			});
		});
	}
	deleteUser(email){
  	// TODO falta verificar se a senha bate
	// TODO falta verificar se existe pedidos em andamento
	// TODO falta apagar os pedidos e as crianças dependentes.

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
