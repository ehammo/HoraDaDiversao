var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');

module.exports = function(connection) {

    var User = connection.define('User', {
        name: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        password: Sequelize.STRING,
        address: Sequelize.STRING,
//		kids: Sequelize.ARRAY(Sequelize.STRING), //array de kids_ids
//		orders: Sequelize.ARRAY(Sequelize.STRING), //array de orders_ids
		phone: Sequelize.STRING
    });
	
    var Kid = connection.define('Kid', {
        name: Sequelize.STRING,
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        gender: Sequelize.STRING,
        birth: Sequelize.STRING
    });
		
    var Product = connection.define('Product', {
        name: Sequelize.STRING,
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        price: Sequelize.STRING,
        photo: Sequelize.STRING, //photo adress on net
		availability: Sequelize.BOOLEAN, 
		description: Sequelize.STRING, 
		category: Sequelize.STRING
    });
	
    var ShopCart = connection.define('ShopCart', {
        status: Sequelize.STRING,
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
//		orders: Sequelize.ARRAY(Sequelize.STRING), //array de orders_ids	
    });

    var Order = connection.define('Order', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
/*		user_email: {
            type: Sequelize.STRING,
            references: {
                model: 'Users',
                key: 'email'
            }
        },*/
/*        supplier_id: {
            type: Sequelize.STRING,
            references: {
                model: 'Supplier',
                key: 'id'
            }
        },*/
//		products: Sequelize.ARRAY(Sequelize.STRING), //array de product_ids	
		qtd: Sequelize.ARRAY(Sequelize.INTEGER),
		date: Sequelize.STRING,
		address: Sequelize.STRING,
		status: Sequelize.STRING
    });

	var Supplier = connection.define('Supplier', {
        name: Sequelize.STRING,
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        address: Sequelize.STRING,
        phone: Sequelize.STRING, 
		banner: Sequelize.BOOLEAN, //photo adress on net 
		description: Sequelize.STRING, 
		categories: Sequelize.ARRAY(Sequelize.STRING)
    });
	
	//cardinalidades
	User.hasMany(Kid, {as: 'Kids'})
	User.hasMany(Order, {as: 'History'})
	ShopCart.hasMany(Order, {as: 'Orders'})
	Order.hasOne(User, {as: 'User'})
	Order.hasOne(Supplier, {as: 'Supplier'})
	Order.hasMany(Product, {as: 'Products'})
	
    connection.sync(); // create tables if dont exist

    router.get("/resetdb",function(req,res){ // bugado

      connection.sync({force: true}); // reset db

      // connection.query('SET FOREIGN_KEY_CHECKS = 0') // necessario por causa da tabela ElderUser
      // .then(function(){
      // 	return connection.sync({ force: true });
      // })
      // .then(function(){
      // 	return connection.query('SET FOREIGN_KEY_CHECKS = 1')
      // })
      // .then(function(){
      // 	console.log('Database synchronised.');
      // }, function(err){
      // 	console.log(err);
      // });

        res.send("tables reset!");
      console.log('tables reset by user');
    });

//    return router;

  var tables = {User,Kid,Product,ShopCart,Order,Supplier};
  return tables;
}
