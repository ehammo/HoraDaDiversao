function CartController ($http, $routeParams, $location) {
    var vm = this;

    $http.get('/shopcart/read/' + $routeParams.id)
    .success(function (data) {
        vm.cart = data;
        console.log(data);
    })
    .error(function (data) {
        console.log('Error: ' + data);
    });

    $http.post('/shopcart/getProducts/', { shopcartId: $routeParams.id })
    .success(function (data) {
        vm.products = data;
        console.log(data);
    })
    .error(function (data) {
        console.log('Error: ' + data);
    });

    vm.addProduct = function(){
        $location.path('/cart/' + vm.cart.id +'/suppliers');
    }

}

appUser.controller('CartController', CartController);
