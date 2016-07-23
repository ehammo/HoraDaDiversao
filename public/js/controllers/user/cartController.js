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
        vm.priceSum = 0;
        vm.products = data;
        for( var i = 0; i < vm.products.length; i++ ){
            vm.priceSum += vm.products[i].price * vm.products[i].ShopCartProduct.qtd;
        }
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
