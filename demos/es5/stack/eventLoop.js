setTimeout(() => console.log('setTimeout1'), 0);
setTimeout(() => {
  console.log('setTimeout2');
  Promise.resolve().then(() => {
    console.log('promise3');
    Promise.resolve().then(() => {
      console.log('promise4');
    })
    console.log(5)
  })
  setTimeout(() => console.log('setTimeout4'), 0);
}, 0);
setTimeout(() => console.log('setTimeout3'), 0);
Promise.resolve().then(() => {
  console.log('promise1');
})

// promise1;
// setTimeout1;
// setTimeout2;
// setTimeout3;
// promise3;
// 5;
// promise4;
// setTimeout4;