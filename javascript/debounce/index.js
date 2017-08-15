function debounce(func, msecs, onLeading = false) {
    const self = this;
    var t = null;
    return function() {
        const args = arguments;

        // if (onLeading && t === null) {
        //     func.apply(self, args);
        // }
        onLeading && !t && func.apply(self, args);

        // if (null !== t) {
        //     clearTimeout(t);
        // }
        !!t && clearTimeout(t);

        // t = setTimeout(function() {
        //     if (!onLeading) {
        //         func.apply(self, args);
        //     }
        // }, msecs);
        t = setTimeout(() => !onLeading && func.apply(self, args), msecs);
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

const debounced = debounce(showtime, 250);

const obj = new makeobj('original object');

const objForCall = new makeobj('debounced object');
const objForBind = new makeobj('debounced object 2');

const tObjForCall = debounce.call(objForCall, objForCall.showtime, 500);
const tObjForBind = debounce(objForBind.showtime.bind(objForBind), 500);

for(let i = 0; i < 10; i++) {
    setTimeout(
        function() {
            showtime('original', i);
            debounced('debounced', i);
            obj.showtime(i);
            tObjForCall(i);
            tObjForBind(i);
        },
        100 * i
    );
}