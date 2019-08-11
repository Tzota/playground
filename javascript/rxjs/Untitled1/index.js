const {Observable, Subject, ReplaySubject, from, of, range, interval, merge} = require('rxjs');
const {map, filter, switchMap, mergeMap, finalize} = require('rxjs/operators');

// https://www.learnrxjs.io/operators/filtering/debounce.html

// range(1, 2)
//     .pipe(filter(x => x % 2 === 1), map(x => x + x))
//     .subscribe(x => console.log(x));

let sum = 0;

const api = num =>
    new Observable(observer => {
        setTimeout(() => {
            observer.next(num);
            observer.complete();
        }, Math.random() * 5000);
    });

from([1, 2, 3])
    .pipe(
        mergeMap(x => api(x)),
        finalize(() => console.log('--------')),
    )
    .subscribe(
        value => {
            console.log('Adding: ' + value);
            sum = sum + value;
        },
        undefined,
        () => {
            console.log('Sum equals: ' + sum);
        },
    );

// const bbb = new Observable(obs => {
//     let i = 0;
//     const aaa = () => {
//         obs.next(i++);
//         setTimeout(aaa, Math.random() * 5000);
//     };
//     aaa();
// });

// const autorefresh = interval(3000);

// const result = autorefresh.debounce(() => bbb);

// bbb.subscribe(() => console.log('1'));
// autorefresh.subscribe(() => console.log('\t2'));
// result.subscribe(() => console.log('\t\t3'));
// result(console.log);
