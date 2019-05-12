// s; // ReferenceError: v is not defined

console.log(typeof s); //undefined

s = "hahaha";
console.log(typeof s); //string

console.log(typeof 1 + 2); //number2

console.log(typeof 1 * 2); //NaN

// console.log(typeof 2++);
//Invalid left-hand side expression in postfix operation

console.log(typeof (2++));
//Invalid left-hand side expression in postfix operation

console.log(typeof (1 + 2)); //number
