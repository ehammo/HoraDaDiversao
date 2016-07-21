var app = angular.module('HoraDiversao', ['ngRoute']);

function router($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController',
        controllerAs: 'HC'
    })
    .when('/orders', {
        templateUrl: 'views/orders.html',
        controller: 'OrderListController',
        controllerAs: 'OLC'
    })
    .when('/products', {
        templateUrl: 'views/products.html',
        controller: 'ProductListController',
        controllerAs: 'PLC'
    })
    .when('/editProduct', {
        templateUrl: 'views/editProduct.html',
        controller: 'ProductController',
        controllerAs: 'PC'
    })
    .otherwise({
        redirectTo: '/'
    })
}

app.config(router);
