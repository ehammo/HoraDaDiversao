function CartController ($http, $routeParams) {
    var vm = this;

    $http.get('/shopcart/read/' + $routeParams.id)
    .success(function (data) {
        vm.cart = data;
        console.log(data);
    })
    .error(function (data) {
        console.log('Error: ' + data);
    });

}

appUser.controller('CartController', CartController);
