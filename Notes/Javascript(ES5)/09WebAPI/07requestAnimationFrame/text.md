## 1.概述

`requestAnimationFrame` 是浏览器用于定时循环操作的一个接口，类似于 `setTimeout`，主要用途是按帧对网页进行重绘。

设置这个 API 的目的是为了让各种网页动画效果（DOM 动画、Canvas 动画、SVG 动画、WebGL 动画）能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果。代码中使用这个 API，就是告诉浏览器希望执行一个动画，让浏览器在下一个动画帧安排一次网页重绘。

`requestAnimationFrame` 的优势，在于充分利用显示器的刷新机制，比较节省系统资源。显示器有固定的刷新频率（60Hz 或 75Hz），也就是说，每秒最多只能重绘 60 次或 75 次，`requestAnimationFrame` 的基本思想就是与这个刷新频率保持同步，利用这个刷新频率进行页面重绘。此外，使用这个 API，一旦页面不处于浏览器的当前标签，就会自动停止刷新。这就节省了 CPU、GPU 和电力。

不过有一点需要注意，`requestAnimationFrame` 是在主线程上完成。这意味着，如果主线程非常繁忙，`requestAnimationFrame` 的动画效果会大打折扣。

`requestAnimationFrame` 使用一个回调函数作为参数。这个回调函数会在浏览器重绘之前调用。

`requestID = window.requestAnimationFrame(callback);`

目前，主要浏览器（Firefox 23 / IE 10 / Chrome / Safari）都支持这个方法。可以用下面的方法，检查浏览器是否支持这个 API。如果不支持，则自行模拟部署该方法。

```javascript
window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();
```

上面的代码按照 1 秒钟 60 次（大约每 16.7 毫秒一次），来模拟 `requestAnimationFrame`。

使用 `requestAnimationFrame` 的时候，只需反复调用它即可。

```javascript
function repeatOften() {
  // Do whatever
  requestAnimationFrame(repeatOften);
}

requestAnimationFrame(repeatOften);
```

## 2.cancelAnimationFrame 方法

`cancelAnimationFrame` 方法用于取消重绘。

`window.cancelAnimationFrame(requestID);`

它的参数是 `requestAnimationFrame` 返回的一个代表任务 ID 的整数值。

```javascript
var globalID;

function repeatOften() {
  $("<div />").appendTo("body");
  globalID = requestAnimationFrame(repeatOften);
}

$("#start").on("click", function() {
  globalID = requestAnimationFrame(repeatOften);
});

$("#stop").on("click", function() {
  cancelAnimationFrame(globalID);
});
```

上面代码持续在 `body` 元素下添加 `div` 元素，直到用户点击 `stop` 按钮为止。

## 3.实例

下面，举一个实例。

假定网页中有一个动画区块。

`<div id="anim">点击运行动画</div>`

然后，定义动画效果。

```javascript
var elem = document.getElementById("anim");

var startTime = undefined;

function render(time) {
  if (time === undefined) time = Date.now();
  if (startTime === undefined) startTime = time;

  elem.style.left = (((time - startTime) / 10) % 500) + "px";
}
```

最后，定义 click 事件。

```javascript
elem.onclick = function() {
  (function animloop() {
    render();
    requestAnimFrame(animloop);
  })();
};
```
