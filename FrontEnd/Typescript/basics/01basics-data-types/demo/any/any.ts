let myNumberStr: string = "seven";
// myNumberStr = 7;
// error TS2322: Type '7' is not assignable to type 'string'.
console.log(myNumberStr);// 'seven'
console.log(typeof myNumberStr); // string

let myNumberAny: any;
console.log(myNumberAny);  // undefined
console.log(typeof myNumberAny); // 'undefined'
myNumberAny = "seven";
myNumberAny = 7;
console.log(myNumberAny); // 7
console.log(typeof myNumberAny); // number

let anyThing: any = "hello";
console.log(anyThing.myName); //undefined
console.log(typeof anyThing); //string
console.log(typeof anyThing.myName); //'undefined'
// console.log(anyThing.myName.firstName);
anyThing.toString();
// anyThing.setName("Jerry").sayHello();
// anyThing.myName.setFirstName("Cat");

let something;
console.log(something); // undefined
console.log(typeof something); // 'undefined'

something = "seven";
console.log(something); // seven
console.log(typeof something); // string

// something: number = 7;
something = 7;
console.log(something); // 7
console.log(typeof something); // number
