function CartListController ($http, $location) {
    var vm = this;

    $http.get('/shopcart/')
    .success(function (data) {
        vm.cartList = data;
        console.log(data);
    })
    .error(function (data) {
        console.log('Error: ' + data);
    });

    vm.cartDetails = function(cart){
        $location.path('/cart/' + cart.id);
    }
}

appUser.controller('CartListController', CartListController);
