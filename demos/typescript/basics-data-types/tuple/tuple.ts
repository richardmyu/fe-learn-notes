let x: [string, number];
x = ['hello', 10];
// x = [10, 'hello'];

console.log(x[0].slice());
// console.log(x[1].slice());
// console.log(x[2].slice());

// console.log(x[3].toString());
// console.log(x[3].valueOf());

// x[5] = 'hhh';

x[0] = 'jjjj';
console.log(x);
