function NavController () {
    var vm = this;
    vm.generalClass = 'active';
    vm.ordersClass = '';
    vm.productsClass = '';
    vm.feedbackClass = '';
    vm.accountClass = '';

    vm.changeClassHome = function(){
        vm.generalClass = 'active';
        vm.ordersClass = '';
        vm.productsClass = '';
    };

    vm.changeClassOrder = function(){
        vm.generalClass = '';
        vm.ordersClass = 'active';
        vm.productsClass = '';
    };

    vm.changeClassProduct = function(){
        vm.generalClass = '';
        vm.ordersClass = '';
        vm.productsClass = 'active';
    };


    // vm.navbar = [
    //     {
    //         name: "Geral", direct : "home", class : "active"
    //     },
    //     {
    //         name: "Geral", direct : "home", class : "active"
    //     },
    //     {
    //         name: "Geral", direct : "home", class : "active"
    //     }
    // ];

}

app.controller('NavController', NavController);
