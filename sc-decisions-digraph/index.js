if (typeof module !== 'undefined') {
    var { DesktopDistant, DesktopDistantVM } = require('./lib/lib.js');
}

//--------------------------------------

function init() {
    const calc = new DesktopDistant();
    const vm = new DesktopDistantVM(calc);
    console.log(vm.steps())
    console.log('------------------------------------');
    vm.grounds(15);
    vm.on_next();
    console.log(vm.steps());
};

init();

// 254 254