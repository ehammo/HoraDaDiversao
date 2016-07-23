function SupplierListCartController ($http, $location, $routeParams) {
    var vm = this;

    $http.get('/supplier')
    .success(function (data) {
        vm.suppliers = data;
        console.log(data);
    })
    .error(function (data) {
        console.log('Error: ' + data);
    });

    vm.supplierDetails = function(supplier){
        $location.path('/cart/' + $routeParams.id +'/suppliers/' + supplier.id);
    }
}

appUser.controller('SupplierListCartController', SupplierListCartController);
