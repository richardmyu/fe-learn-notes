let isDone: boolean = false;

console.log(typeof isDone);

try {
	// let isCreate: boolean = new Boolean(1);
} catch (err) {
	console.log(err);
}

let noCreate: boolean = Boolean(1);

let decLiteral: number = 6;
let floatingNumber: number = 0.12;

// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
// ES6 中的十六进制表示法
let hexLiteral: number = 0xf00d;

// 科学计数法
let minNumbersub: number = 0.000002;
let minNumbersup: number = 0.0000003;
console.log(minNumbersub);
console.log(minNumbersup);
let maxNumbersub: number = 800000000000000000000;
let maxNumbersup: number = 9000000000000000000000;
console.log(maxNumbersub);
console.log(maxNumbersup);

let notANumber: number = NaN;
let infinityNumber: number = Infinity;

let myName: string = "Tom";

// 模板字符串
let sentence: string = `Hello, my name is ${myName}.`;

function alertName(): void {
	alert("My name is Tom");
}

let unusable: void = undefined;
let unusableStr: void = "undefined";

// let unusableStr: void = "undefined";

let u: undefined = undefined;
let n: null = null;
let un: undefined = null;
let nu: null = undefined;
// let uStr: undefined = "哈哈哈哈";
// let nStr: null = "哈哈哈";


let numU: number = undefined;
let numN: number = null;

let v: void;
let num: number = v;
