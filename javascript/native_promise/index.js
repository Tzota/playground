// const log4js = require('log4js');
// const logger = log4js.getLogger();

logger = {
    trace: function (text) {
        const d = new Date();
        console.log(`[${d.getSeconds()}.${d.getMilliseconds()}] ${text}`);
    }
};

function simple_case() {

    const log_end = (f) => function(){
        logger.trace('called f for ' + Array.prototype.slice.call(arguments).join(','));
        f.apply(this, arguments);
        logger.trace('End task at ' + +new Date()%10000);
    };

    const log_start = (f) => function() {
        logger.trace('Begin task at ' + +new Date()%10000);
        f.apply(this, arguments);
    };

    const start = new Date();
    const p4 = new Promise(log_start((resolve, reject) => { setTimeout(log_end(resolve), 500, "p4")}));
    const p5 = new Promise(log_start((resolve, reject) => { setTimeout(log_end(resolve), 1000, "p5")}));

    Promise.all([p4, p5]).then(values => {
    logger.trace(new Date() - start);
    logger.trace(values);
    });

}


const datarace = [];

function perf(f) {
    return function() {
        const d = new Date();
        logger.trace('>');
        f.apply(this, arguments)
        logger.trace(`< ${new Date() - d}`);
    }
}

function very_slow_fibo(n) {
    if (n === 1) return 1;
    if (n === 2) return 1;
    return very_slow_fibo(n-1) + very_slow_fibo(n-2);
}

const insert_at_array = function(arr, val) {
    if (arr.indexOf(val) === -1) {
        very_slow_fibo(40);
        logger.trace(`inserting ${val}`);
        arr.push(val);
    }
}

const insert_hundred = function(arr, i) {
    i < 5 && (() => {insert_at_array(arr, i); insert_hundred(arr, i+1)})();
}

// insert_hundred(datarace, 0);
// insert_hundred(datarace, 0);
// logger.trace(datarace);
const start = new Date();

const p6 = new Promise(((resolve, reject) => {
    setTimeout(perf(function() {
        logger.trace('First');
        insert_hundred(datarace, 0);
        logger.trace('First resolving');
        resolve();
    }), 10);
}));

const p7 = new Promise(((resolve, reject) => {
    setTimeout(perf(function() {
        logger.trace('Second');
        very_slow_fibo(40);
        insert_hundred(datarace, 0);
        logger.trace('Second resolving');
        resolve();
    }), 10);
}));

Promise.all([p6, p7]).then(values => {
    logger.trace(`So, all together: ${new Date() - start}`);
    logger.trace(datarace);
});