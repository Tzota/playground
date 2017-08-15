function throttle(func, msecs) {
    let needRun = true;
    const self = this;
    return function() {
        if (needRun) {
            func.apply(self, arguments);
            needRun = false;
            setTimeout(() => needRun = true, msecs);
        }
    }
}

function showtime(name, i) {
    console.log(`${name}: ${i} - ${(new Date()).getMilliseconds()}`);
}

function makeobj(name) {
    this.name = name;
};
makeobj.prototype.showtime = function(i) {
    console.log(`${this.name}: ${i} - ${(new Date()).getMilliseconds()}`);
};

const throttled = throttle(showtime, 250);

const obj = new makeobj('original object');

const objForCall = new makeobj('throttled object');
const objForBind = new makeobj('throttled object 2');

const tObjForCall = throttle.call(objForCall, objForCall.showtime, 500);
const tObjForBind = throttle(objForBind.showtime.bind(objForBind), 500);

for(let i = 0; i < 10; i++) {
    setTimeout(
        function() {
            showtime('original', i);
            throttled('throttled', i);
            obj.showtime(i);
            tObjForCall(i);
            tObjForBind(i);
        },
        100 * i
    );
}