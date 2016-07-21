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

class User {

    constructor() {}

    //create
    createUser(user) {
      var name = user.name;
      var email = user.email;
      var password = user.password;
      var address = user.address;
      var phone = user.phone;
        return new Promise(function(resolve, reject) {
            UserTable.find({
                    where: {
                        email: email
                    }
                })
                .then(function(user) {
                    if (user) {
                        console.log("error! already has user with email " + email);
                        //res.send(user);
                        reject(user);
                        //return ("Erro! Já existe um usuário cadastrado com o email " + email);
                    } else {
                        UserTable.create({
                            name: name,
                            email: email,
                            password: password,
                            address: address,
                            phone: phone
                        }).then((user2) => {
                            console.log("created user: " + JSON.stringify(user2.dataValues));
                            resolve(user2);
                        });
                    }
                });
        });
    }

    readUser(email) { // get mesmo?
        return new Promise(function(resolve, reject) {
            UserTable.find({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (user) { // not found returns null
                    console.log("found user: " + JSON.stringify(user.dataValues));
                    console.log("\n\n");
                    user.getKids().then((kids) => {
                        var counter = 0;
                        for (counter; counter < kids.length; counter++) {
                            var values = kids[counter].dataValues;
                            console.log(JSON.stringify(values) + "\n\n");
                        }

                    });
                    resolve(user);

                } else {
                    reject("not found");
                    //res.send("Erro! Não encontrou usuário com email " + email);
                    console.log("did not found user with email " + email);
                }
            });
        });
    };

    readUsers() {
        return new Promise(function(resolve, reject) {
            UserTable.findAll({}).then(function(users) {
                resolve(users);
            });
        });
    };

    updateUser(name, email, password, address, phone) {
        return new Promise(function(resolve, reject) {
            UserTable.update({
                name: name,
                email: email,
                password: password,
                address: address,
                phone: phone
            }, {
                where: {
                    email: email
                }
            }).then((query) => {
                UserTable.find({
                    where: {
                        email: email
                    }
                }).then(function(user) {
                    if (user)
                        resolve(user);
                    else
                        reject(user);
                    console.log('updated %d users to: (%s,%s,%s)', user, name, email, password, address, phone);
                });
            });
        });
    }

	deleteUserRead(email) {
        // TODO falta verificar se a senha bate
        // TODO falta verificar se existe pedidos em andamento
        // TODO falta apagar os pedidos e as crianças dependentes.
        return new Promise(function(resolve, reject) {

            UserTable.destroy({
                where: {
                    email: email
                }
            }).then(function(user) {
                UserTable.findAll({}).then(function(users) {
					resolve(users);
				});
            });
        });

    }


    deleteUser(email) {
        // TODO falta verificar se a senha bate
        // TODO falta verificar se existe pedidos em andamento
        // TODO falta apagar os pedidos e as crianças dependentes.
        return new Promise(function(resolve, reject) {

            UserTable.destroy({
                where: {
                    email: email
                }
            }).then(function(user) {
                resolve([user]);
                console.log("removed %d users and references with email: %s", user, email);
            });
        });

    }


}


module.exports = {
    User: User,
    setAdapter: setAdapter
};
