function OrderListController () {
    var vm = this;

    vm.orders = [
        { name : "Pedro", date : new Date(), address : "Rua Cabo Honório, 76", status : "A confirmar", details : false },
        { name : "Maia", date : new Date(), address : "Tua Cabo Honório, 76", status : "Confirmado", details : false },
        { name : "Gio", date : new Date(), address : "Gua Cabo Honório, 76", status :   "Confirmado", details : false },
        { name : "Caio", date : new Date(), address : "Zua Cabo Honório, 76", status : "Entregue", details : false }
    ];
}

app.controller('OrderListController', OrderListController);
