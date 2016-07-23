var appUser = angular.module('HoraDiversaoUser', ['ngRoute']);

function router($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'views/user/home.html',
        controller: 'HomeController',
        controllerAs: 'HC'
    })
    .when('/party', {
        templateUrl: 'views/user/party.html',
        controller: 'PartyController',
        controllerAs: 'PC'
    })
    .when('/cart/:id', {
        templateUrl: 'views/user/cart.html',
        controller: 'CartController',
        controllerAs: 'CC'
    })
    .when('/suppliers', {
        templateUrl: 'views/user/supplierList.html',
        controller: 'SupplierListController',
        controllerAs: 'SLC'
    })
    .when('/suppliers/:id', {
        templateUrl: 'views/user/supplier.html',
        controller: 'SupplierController',
        controllerAs: 'SC'
    })
    .when('/cart/:id/suppliers', {
        templateUrl: 'views/user/supplierListCart.html',
        controller: 'SupplierListCartController',
        controllerAs: 'SLCC'
    })
    .when('/cart/:id/suppliers/:spid', {
        templateUrl: 'views/user/supplierCart.html',
        controller: 'SupplierCartController',
        controllerAs: 'SCC'
    })
    .when('/carts', {
        templateUrl: 'views/user/cartList.html',
        controller: 'CartListController',
        controllerAs: 'CLC'
    })
    .otherwise({
        redirectTo: '/'
    })
}

appUser.config(router);
