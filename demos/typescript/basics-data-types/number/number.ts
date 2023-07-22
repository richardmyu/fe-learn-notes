let decLiteral: number = 6;
let floatingNumber: number = 0.12;

// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
// ES6 中的十六进制表示法
let hexLiteral: number = 0xf00d;

console.log(binaryLiteral); // 10
console.log(octalLiteral); // 484
console.log(hexLiteral); //61453

// 科学计数法
let minNumbersub: number = 0.000002;
let minNumbersup: number = 0.0000003;
console.log(minNumbersub); // 0.000002
console.log(minNumbersup); // 3e-7
let maxNumbersub: number = 800000000000000000000;
let maxNumbersup: number = 9000000000000000000000;
console.log(maxNumbersub); // 800000000000000000000
console.log(maxNumbersup); // 9e+21

let notANumber: number = NaN;
let infinityNumber: number = Infinity;
