function SupplierCartController ($http, $routeParams, $timeout, $location) {
    var vm = this;

    vm.sucess = false;

    $http.get('/supplier/read/' + $routeParams.spid)
    .success(function (data) {
        vm.supplier = data;
        console.log(data);
    })
    .error(function (data) {
        console.log('Error: ' + data);
    });

    $http.get('/product/supplier/' + $routeParams.spid)
    .success(function (data) {
        vm.products = data;
        console.log(data);
    })
    .error(function (data) {
        console.log('Error: ' + data);
    });

    vm.addProduct = function(product){
        var json = {
            productId: product.id,
            shopcartId: $routeParams.id,
            qtd: product.quantity
        };
        $http.post('/shopcart/addProduct', json)
        .success(function (data) {
            vm.sucess = true;
            $timeout(function () {
                vm.sucess = false;
            }, 2000);
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });
    }

    vm.return = function(){
        $location.path('/cart/' + $routeParams.id);
    }

}

appUser.controller('SupplierCartController', SupplierCartController);
