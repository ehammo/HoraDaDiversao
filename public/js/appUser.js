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
    .otherwise({
        redirectTo: '/'
    })
}

appUser.config(router);
