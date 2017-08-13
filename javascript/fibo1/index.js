function fibo1(n) {
    let a = 0;
    let b = 1;
    for(let i = 0; i < n; i++) {
        [a, b] = [b, a + b];
    }
    return a;
}

for(let i = 1; i <=10; i++) {
    console.log(fibo1(i));
}