console.log(new String("abc"));
// String {0: "a", 1: "b", 2: "c", length: 3}

console.log(new String("abc")[1]);
//b

console.dir(String);
/*
ƒ String()
  arguments: (...)
  caller: (...)
  fromCharCode: ƒ fromCharCode()
  fromCodePoint: ƒ fromCodePoint()
  length: 1
  name: "String"
  prototype: String {"", constructor: ƒ, anchor: ƒ, big: ƒ, blink: ƒ, …}
  raw: ƒ raw()
  __proto__: ƒ ()
  [[Scopes]]: Scopes[0]
*/

// 将任意类型数据转换位字符串
console.log(String(123)); //'123'
console.log(String([1, 2])); //'1,2'
console.log(String({ a: 1, b: 2 })); //[object Object]
console.log(String(NaN)); //'NaN'
console.log(String(null)); //'null'
console.log(String(undefined)); //'undefined'

// 只有第一个参数有效
console.log(String(1, 2, 3)); //'1'
