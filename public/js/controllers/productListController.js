function ProductListController ($http) {
    var vm = this;

    $http.get('/product/')
    .success(function (data) {
        vm.products = data;
        console.log(data);
    })
    .error(function (data) {
        console.log('Error: ' + data);
    });

    vm.deleteProduct = function(product){
        $http.post('/product/delete/', product)
            .success(function(data) {
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}

app.controller('ProductListController', ProductListController);
