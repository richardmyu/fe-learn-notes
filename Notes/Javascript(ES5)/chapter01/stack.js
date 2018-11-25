process.nextTick(function A() {
  console.log(1);
  process.nextTick(function B() {
    console.log(2);
  });
});

setTimeout(function timeout() {
  console.log(3);
}, 0)
// 1
// 2
// 3

setImmediate(function A() {
  console.log(1);
  setImmediate(function B() {
    console.log(2);
  });
});

setTimeout(function timeout() {
  console.log(3);
}, 0);
// 执行时间间隔长的情况下
// 1
// 3
// 2
// 执行时间间隔短的情况下
// 3
// 1
// 2

setImmediate(function () {
  setImmediate(function A() {
    console.log(1);
    setImmediate(function B() {
      console.log(2);
    });
  });

  setTimeout(function timeout() {
    console.log(3);
  }, 0);
});
// 执行时间间隔长的情况下
// 1
// 3
// 2
// 执行时间间隔短的情况下
// 3
// 1
// 2

setTimeout(function () {
  setImmediate(function A() {
    console.log(1);
    setImmediate(function B() {
      console.log(2);
    });
  });

  setTimeout(function timeout() {
    console.log(3);
  }, 0);
}, 0);
// 1
// 3
// 2

process.nextTick(function foo() {
  process.nextTick(foo);
});