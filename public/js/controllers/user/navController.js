function NavController () {
    var vm = this;
    vm.generalClass = 'active';
    vm.partyClass = '';
    vm.suppliersClass = '';
    vm.accountClass = '';

    vm.changeClassHome = function(){
        vm.generalClass = 'active';
        vm.partyClass = '';
        vm.suppliersClass = '';
    };

    vm.changeClassParty = function(){
        vm.generalClass = '';
        vm.partyClass = 'active';
        vm.suppliersClass = '';
    };

    vm.changeClassSupplier = function(){
        vm.generalClass = '';
        vm.partyClass = '';
        vm.suppliersClass = 'active';
    };

}

appUser.controller('NavController', NavController);
