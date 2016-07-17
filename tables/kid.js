'use strict';
var Adapter;
var KidTable;
var UserTable;

function setAdapter(adapter) {
	Adapter = adapter;
	setKid();
}

function setKid() {
	KidTable = Adapter.Kid;
	UserTable = Adapter.User;
}

class Kid{

	constructor(){}

	//create
	createKid(name, id,gender,birth,user){
		return new Promise(function(resolve,reject){
			KidTable.find({
				where: {id : id}
			})
			.then(function(Kid){
				if (Kid) {
					console.log("error! already has Kid with id " + id);
					reject("Erro! J� existe um Kid cadastrado com o id " + id);
				} else{
					UserTable.find({
					where: {email: user}
					}).then(function(user){
						if(!user){
							console.log("error! no user found with email " + user);
							reject("error! no user found");
						}else{
							KidTable.create({
								name: name,
								id: id,
								gender: gender,
								birth: birth,
							}).then((Kid2)=> {
								user.getKids().then((kids) => {
									var resp = [];
									var counter = 0;
									for (counter; counter < kids.length; counter++) {
										var values = kids[counter].id;
										resp.push(values)
									}
									resp.push(Kid2.id);
									user.setKids(resp);
								});
								console.log("created Kid: " + JSON.stringify(Kid2.dataValues) );
								resolve(Kid2);
							});
						}
					});

				}

			});
		});
	};

	readKid(id){ // get mesmo?
  		return new Promise(function(resolve,reject){
			KidTable.find({
				where: {id : id}
			}).then(function(Kid){
				if (Kid) { // not found returns null
					console.log("found Kid: " + JSON.stringify(Kid.dataValues) );
	//				TODO checar de qual user �?
					resolve(Kid);

				} else{
					reject("did not found Kid with id "+id);
					//res.send("Erro! N�o encontrou usu�rio com id " + id);
					console.log("did not found Kid with id " + id);
				}
			});
		});
	};

	readKids(){ // get mesmo?
		return new Promise(function(resolve,reject){
			KidTable.findAll({
			}).then(function(kids){
				resolve(kids);
			});
		});
	};

	updateKid(name, id,gender,birth,email){
		return new Promise(function(resolve,reject){
			KidTable.update({
				name: name,
				id: id,
				gender: gender,
				birth: birth,
				UserEmail: email
			}, { where : {id : id }
			}).then((Kid)=> {
				if(Kid!=0){
					UserTable.find({
						where: {email: email}
					}).then(function(user){
						if(!user){
							console.log("error! no user found");
							reject("error! no user found");
						}else{
							user.getKids().then((kids) => {
								var resp = [];
								var counter = 0;
								for (counter; counter < kids.length; counter++) {
									var values = kids[counter].id;
									resp.push(values)
								}
								resp.push(Kid.id);
								user.setKids(resp);
							});
							resolve('updated %d Kids to: (%s,%s,%s,%s)',Kid,name,id,gender,birth);
							console.log(Kid);
							console.log('updated %d Kids to: (%s,%s,%s)',Kid,name,id,gender,birth);
						}
					});
				}else{
					reject("error! no kid found");


				}
			});
		});
	};

	deleteKid(id){
  	// TODO falta verificar se a senha bate
	return new Promise(function(resolve,reject){
		KidTable.destroy({
			where : { id: id}
		}).then(function (kid) {
			if(kid>0){
				resolve("removed %d Kids and references with id: %s",kid, id);
			}else{
				reject("No kids found")
			}
		});

		});
	}


}


module.exports = {
	Kid: Kid,
	setAdapter: setAdapter
};
