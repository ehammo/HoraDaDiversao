function SupplierListController ($http, $location) {
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
        $location.path('/suppliers/' + supplier.id);
        // $http.post('/supplier/read/' + supplier.id,)
        // .success(function(data) {
        //     console.log(data);
        //     $location.path('/cart/' + data.id);
        // })
        // .error(function(data) {
        //     console.log('Error: ' + data);
        // });
    }
}

appUser.controller('SupplierListController', SupplierListController);
