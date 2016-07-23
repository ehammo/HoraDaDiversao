function NavController () {
    var vm = this;
    vm.generalClass = 'active';
    vm.partyClass = '';
    vm.suppliersClass = '';
    vm.accountClass = '';
    vm.cartClass = '';

    vm.changeClassHome = function(){
        vm.generalClass = 'active';
        vm.partyClass = '';
        vm.suppliersClass = '';
        vm.cartClass = '';
    };

    vm.changeClassParty = function(){
        vm.generalClass = '';
        vm.partyClass = 'active';
        vm.suppliersClass = '';
        vm.cartClass = '';
    };

    vm.changeClassSupplier = function(){
        vm.generalClass = '';
        vm.partyClass = '';
        vm.suppliersClass = 'active';
        vm.cartClass = '';
    };

    vm.changeClassCart = function(){
        vm.generalClass = '';
        vm.partyClass = '';
        vm.suppliersClass = '';
        vm.cartClass = 'active';
    };

}

appUser.controller('NavController', NavController);
