var appSupplier = angular.module('HoraDiversaoSupplier', ['ngRoute']);

function router($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'views/supplier/home.html',
        controller: 'HomeController',
        controllerAs: 'HC'
    })
    .when('/orders', {
        templateUrl: 'views/supplier/orders.html',
        controller: 'OrderListController',
        controllerAs: 'OLC'
    })
    .when('/products', {
        templateUrl: 'views/supplier/products.html',
        controller: 'ProductListController',
        controllerAs: 'PLC'
    })
    .when('/editProduct', {
        templateUrl: 'views/supplier/editProduct.html',
        controller: 'ProductController',
        controllerAs: 'PC'
    })
    .otherwise({
        redirectTo: '/'
    })
}

appSupplier.config(router);
