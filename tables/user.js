'use strict';
var Adapter;
var User;
function setAdapter(adapter) {
	Adapter = adapter;
	setUser();
}

function setUser() {
	User = Adapter.User;
}

class User(){	
	
	//create
	createUser(name, email,pass,address,phone,kids,orders){
		
		User.find({
			where: {email : email}
		})
		.then(function(user){
			if (user) {
				res.status(500);
					res.send("Erro! Já existe um usuário cadastrado com o email " + email);
					console.log("error! already has user with email " + email);
			} else{
				User.create({
					name: name,
					email: email,
					password: pass,
					address:address,
					phone: phone
				}).then(function (user2) {
					user2.setKids(kids);
					user2.setHistory(orders);
					console.log("created user: " + JSON.stringify(user2.dataValues) );
				});
			}
		});
		
	}
}

module.exports = function(tables) {
	User: user,
	setAdapter: setAdapter	
};