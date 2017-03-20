// ./node_modules/watchify/bin/cmd.js index.js -t babelify -o lib/index.js -v

if (typeof module !== 'undefined') {
    require('babel-polyfill');
    var { NetVpn, NetVpnVM } = require('./src/NetVpn.js');
}


//--------------------------------------

function init() {
    const calc = new NetVpn();
    const vm = new NetVpnVM(calc);

    ko.applyBindings(vm, document.getElementById('viewmodel'));

    // console.log(vm.steps())
    // console.log('------------------------------------');
    // vm.grounds(15);
    // vm.on_next();
    // vm.grounds10(5);
    // vm.grounds300(5);
    // vm.grounds1000(5);
    // vm.on_next();
    // let steps = vm.steps();
    // console.log(steps);
    // console.log(
    //     steps[steps.length - 1].Answers
    //         .filter(o => o.Visible())
    //         .map(o => o.Caption + ': ' + o.Value())
    //         .reduce((acc, val, index, arr) => acc + '\n' + val)
    // );
};

init();