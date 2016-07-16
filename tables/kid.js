'use strict';
var Adapter;
var KidTable;

function setAdapter(adapter) {
	Adapter = adapter;
	setKid();
}

function setKid() {
	KidTable = Adapter.Kid;
}

class Kid{	
	
	constructor(){}
	
	//create
	createKid(name, id,gender,birth){
		KidTable.find({
			where: {id : id}
		})
		.then(function(Kid){
			if (Kid) {
				console.log("error! already has Kid with id " + id);
				return ("Erro! Já existe um usuário cadastrado com o id " + id);
			} else{
				KidTable.create({
					name: name,
					id: id,
					password: pass,
					gender: gender,
					birth: birth
				}).then(function (Kid2) {
					console.log("created Kid: " + JSON.stringify(Kid2.dataValues) );
					return(Kid2);
				});
			}
		});
		
	}

	readKid(id){ // get mesmo?
  		KidTable.find({
  			where: {id : id}
  		}).then(function(Kid){
  			if (Kid) { // not found returns null
				console.log("found Kid: " + JSON.stringify(Kid.dataValues) );
//				console.log("\n\n");
//				var kids = Kid.getKids();
//				console.log(kids[0]);
				return(Kid);
  				
  			} else{
				return(Kid);
  				//res.send("Erro! Não encontrou usuário com id " + id);
  				console.log("did not found Kid with id " + id);
  			}
  		});

	};

	updateKid(name, id,pass,address,phone,kids,orders){
		KidTable.update({
			name: name,
			id: id,
			password: pass,
			gender: gender,
			birth: birth
		}, { where : {id : id }
		}).then(function (Kid) {
			return(Kid);
			console.log(Kid);
			console.log('updated %d Kids to: (%s,%s,%s)',Kid,name,id,password,gender,birth);
		});
	};
	
	deleteKid(id){
  	// TODO falta verificar se a senha bate
	// TODO falta verificar se existe pedidos em andamento
	// TODO falta checar se os pedidos e as crianças dependentes sao apagadas. se nao forem implementar.

  	KidTable.destroy({
  		where : { id: id}
  	}).then(function (Kid) {
  		return ([Kid]);
  		console.log("removed %d Kids and references with id: %s",Kid, id);
  	});
		
	}

	
}


module.exports = {
	Kid: Kid,
	setAdapter: setAdapter
};