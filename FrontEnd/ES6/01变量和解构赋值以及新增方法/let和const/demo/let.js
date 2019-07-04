/* var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i);
  };
}
a[6](); // 6 */

/* for (let i = 0; i < 3; i++) {
  let i = "abc";
  console.log(i);
} */

/* var tmp = 123;

if (true) {
  tmp = "abc"; //ReferenceError: tmp is not defined
  let tmp = "abc";
  console.log(tmp);
} */

/* function bar(x = y, y = 2) {
  return [x, y];
}

bar(); // ReferenceError: y is not defined */

/* function bar(x = 2, y = x) {
  return [x, y];
}

bar(); // */

// function func() {
//   let a = 10;
//   let a = 1;
// }

// 报错
// function func() {
//   var a = 10;
//   let a = 1;
// }

// // 报错
// function func(a) {
// 	{
// 		let a = 10;
// 	}
// }

// function f1() {
//   var n = 5;
//   if (true) {
//     // let n = 10;
//     var n = 10;
//   }
//   console.log(n); // 5
// }
// f1()

// if (true) {
//   function f() {}
// }

// function f() {
//   console.log("I am outside!");
// }

// (function() {
//   if (false) {
//     // 重复声明一次函数 f
//     var f = function() {
//       console.log("I am inside!");
//     };
//   }

//   f();
// })();

// if (true) let x = 1;

// 'use strict';
// if (true)
//   function f() {}

// const foo = {};

// foo.prop = 123;
// console.log(foo.prop);

// // foo = {};
// foo.prop = 234;
// console.log(foo.prop);

// 'use strict'
// const foo = Object.freeze({});

// foo.prop = 123;

// let b = 1;
// console.log(window.b);; // undefined

// console.log(new Function("return this")());

// var getGlobal = (function() {
//   if (typeof self !== "undefined") {
//     return self;
//   }
//   if (typeof window !== "undefined") {
//     return window;
//   }
//   if (typeof global !== "undefined") {
//     return global;
//   }
//   throw new Error("unable to locate global object");
// })();

// console.log(global);
// console.log(self);
// console.log(window);

// console.log(getGlobal);

// console.log(globalThis);
