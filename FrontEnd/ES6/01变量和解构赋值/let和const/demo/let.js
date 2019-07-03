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
function func(a) {
	{
		let a = 10;
	}
}
