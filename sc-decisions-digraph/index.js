if (typeof module !== 'undefined') {
    require('babel-polyfill');
    var { NetVpn, NetVpnVM } = require('./lib/NetVpn.js');
}

//--------------------------------------

function init() {
    const calc = new NetVpn();
    const vm = new NetVpnVM(calc);
    console.log(vm.steps())
    console.log('------------------------------------');
    vm.grounds(15);
    vm.on_next();
    vm.grounds300(5);
    vm.on_next();
    console.log(vm.steps());
};

init();