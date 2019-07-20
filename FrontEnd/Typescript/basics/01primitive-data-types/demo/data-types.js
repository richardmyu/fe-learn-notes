var isDone = false;
console.log(typeof isDone);
try {
    // let isCreate: boolean = new Boolean(1);
}
catch (err) {
    console.log(err);
}
var noCreate = Boolean(1);
var decLiteral = 6;
var floatingNumber = 0.12;
// ES6 中的二进制表示法
var binaryLiteral = 10;
// ES6 中的八进制表示法
var octalLiteral = 484;
// ES6 中的十六进制表示法
var hexLiteral = 0xf00d;
// 科学计数法
var minNumbersub = 0.000002;
var minNumbersup = 0.0000003;
console.log(minNumbersub);
console.log(minNumbersup);
var maxNumbersub = 800000000000000000000;
var maxNumbersup = 9000000000000000000000;
console.log(maxNumbersub);
console.log(maxNumbersup);
var notANumber = NaN;
var infinityNumber = Infinity;
var myName = "Tom";
// 模板字符串
var sentence = "Hello, my name is " + myName + ".";
function alertName() {
    alert("My name is Tom");
}
var unusable = undefined;
// let unusableStr: void = "undefined";
var u = undefined;
var n = null;
var un = null;
var nu = undefined;
var uStr = "哈哈哈哈";
var nStr = "哈哈哈";
