function ProductController ($http) {
    var vm = this;

    vm.product = {};
    vm.product.id = "12345";
    vm.product.supplierId = "tamarindos";

    vm.createProduct = function() {
        $http.post('/product/create/', vm.product)
            .success(function(data) {
                console.log("Entrou");
                vm.product = {};
                vm.product.id = "12345";
                vm.product.SupplierId = "tamarindos";
                console.log(data);
            })
            .error(function(data) {
                console.log("Tchau");
                console.log('Error: ' + data);
            });
    };

}

app.controller('ProductController', ProductController);
