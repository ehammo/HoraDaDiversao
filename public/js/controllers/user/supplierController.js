function SupplierController ($http, $routeParams) {
    var vm = this;

    $http.get('/supplier/read/' + $routeParams.id)
    .success(function (data) {
        vm.supplier = data;
        console.log(data);
    })
    .error(function (data) {
        console.log('Error: ' + data);
    });



}

appUser.controller('SupplierController', SupplierController);
