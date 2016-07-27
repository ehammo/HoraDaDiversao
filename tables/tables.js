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
        phone: Sequelize.STRING
    });

    var Kid = connection.define('Kid', {
        name: Sequelize.STRING,
        gender: Sequelize.STRING,
        birth: Sequelize.STRING
    });

    var Product = connection.define('Product', {
        name: Sequelize.STRING,
        price: Sequelize.STRING,
        photo: Sequelize.STRING, //photo adress on net
        availability: Sequelize.BOOLEAN,
        description: Sequelize.STRING,
        category: Sequelize.STRING,
        metric: Sequelize.STRING
    });

    var ShopCart = connection.define('ShopCart', {
        date: Sequelize.STRING,
        address: Sequelize.STRING,
        status: Sequelize.STRING
    });

    /*    var Order = connection.define('Order', {
            id: {
                type: Sequelize.STRING,
                primaryKey: true
            },
    		qtd: Sequelize.ARRAY(Sequelize.INTEGER),
    		date: Sequelize.STRING,
    		address: Sequelize.STRING,
    		status: Sequelize.STRING
        });*/

    var Supplier = connection.define('Supplier', {
        name: Sequelize.STRING,
        password: Sequelize.STRING,
        address: Sequelize.STRING,
        phone: Sequelize.STRING,
        banner: Sequelize.STRING, //photo adress on net
        description: Sequelize.STRING,
        categories: Sequelize.ARRAY(Sequelize.STRING)
    });

    var ShopCartProduct = connection.define('ShopCartProduct', {
        qtd: Sequelize.INTEGER
    });

    //cardinalidades
    User.hasMany(Kid, {
        as: 'Kids'
    })
    User.hasMany(ShopCart, {
        as: 'History'
    })
    ShopCart.belongsToMany(Product, {
        through: 'ShopCartProduct',
        foreignKey: 'ShopCartId'
    });
    Product.belongsToMany(ShopCart, {
        through: 'ShopCartProduct',
        foreignKey: 'ProductId'
    });
    //	ShopCart.hasMany(Order, {as: 'Orders'})
    //Order.belongsTo(User, {as: 'User'})
    //Order.belongsTo(Supplier, {as: 'Supplier'})
    //Order.hasMany(Product, {as: 'Products'})
    Supplier.hasMany(Product, {
        as: 'Products'
    })

    connection.sync(); // create tables if dont exist

    //var tables = {User,Kid,Product,ShopCart,Order,Supplier};
    var tables = {
        User,
        Kid,
        Product,
        ShopCart,
        Supplier,
		ShopCartProduct
    };
    return tables;
}
