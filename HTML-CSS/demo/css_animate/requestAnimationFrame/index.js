console.log("hello world");

const element = document.getElementById('box');
let start;

function step(timestamp) {
  // console.log('timestamp', timestamp);
  if (start === undefined) {
    start = timestamp;
  }

  const elapsed = timestamp - start;

  //这里使用 Math.min() 确保元素刚好停在 200px 的位置。
  element.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';
  // element.style.display = "block";
  // console.log(element);

  // if (elapsed >= 1000) {
  //   element.style.display = "none";
  // }
  if (elapsed < 2000) { // 在两秒后停止动画
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
// let init = 0;
// setInterval(function () {
//   init++;
//   document.getElementById('btn').innerHTML = init;
// }, 400)
