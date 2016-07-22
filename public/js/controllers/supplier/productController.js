function ProductController ($http) {
    var vm = this;

    vm.product = {};
    vm.product.supplierId = "1";

    vm.createProduct = function() {
        $http.post('/product/create/', vm.product)
            .success(function(data) {
                vm.product = {};
                vm.product.supplierId = "1";
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}

appSupplier.controller('ProductController', ProductController);
