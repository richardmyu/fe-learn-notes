// let someValue: any = "this is a string";
let someValue: any = 1234;

console.log(<string>someValue);
console.log(someValue as string);
console.log(someValue);

console.log((<string>someValue).length);
console.log((someValue as string).length);
console.log(someValue.length);

let strLength: number = (<string>someValue).length;
let strLengthAs: number = (someValue as string).length;
let strLengthNo: number = someValue.length;

console.log(strLength, strLengthAs, strLengthNo);
