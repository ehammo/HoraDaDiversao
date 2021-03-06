function PartyController ($http, $location) {
    var vm = this;

    vm.dataCart = {};
    vm.dataCart.email = "joao@gmail.com";
    vm.dataCart.status = "Aberto";

    vm.createCart = function(){
        $http.post('/shopcart/create/', vm.dataCart)
        .success(function(data) {
            console.log(data);
            $location.path('/cart/' + data.id);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    }
}

appUser.controller('PartyController', PartyController);
