// ./node_modules/watchify/bin/cmd.js index.js -t babelify -o lib/index.js -v

if (typeof module !== 'undefined') {
    require('babel-polyfill');
    var { NetVpn, NetVpnVM } = require('./src/NetVpn.js');
}


//--------------------------------------

function init() {
    const calc = new NetVpn();
    const vm = new NetVpnVM(calc);
    console.log(vm.steps())
    console.log('------------------------------------');
    vm.grounds(15);
    vm.on_next();
    vm.grounds10(5);
    vm.grounds300(5);
    vm.grounds1000(5);
    vm.on_next();
    console.log(vm.steps());
};

init();