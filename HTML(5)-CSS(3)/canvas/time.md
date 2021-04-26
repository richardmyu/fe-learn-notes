# 定时器与 `requestAnimationFrame`

### 1.`window.setInterval`

在窗口和工作接口上提供的 `setInterval()` 方法重复调用函数或执行代码片段，每次调用之间有固定的时间延迟。

**语法**

```js
var intervalID = scope.setInterval(func, delay, [arg1, arg2, ...]);
// or
var intervalID = scope.setInterval(code, delay);
```

**参数**

- `func`
  - 要重复调用的函数。
- `code`
  - 这个语法是可选的，你可以传递一个字符串来代替一个函数对象，你传递的字符串会被编译然后每个 `delay` 毫秒时间内执行一次。*这个语法因为存在安全风险所以不被推荐使用。*
- `delay`
  - 是每次延迟的毫秒数，函数的每次调用会在该延迟之后发生。如果这个参数值小于 10，则默认使用值为 10。
- `arg1, ..., argN` 可选
  - 当定时器过期的时候，将被传递给 `func` 指定函数的附加参数。

**返回值**

返回值 `intervalID` 是一个非零数值，用来标识通过 `setInterval()` 创建的计时器，这个值可以用来作为 `clearInterval()` 的参数来清除对应的计时器 。

> 值得注意的是，`setInterval()` 和 `setTimeout()` 共享同一个 ID 池，并且 `clearInterval()` 和 `clearTimeout()` 在技术上是可互换使用的。但是，我们必须去匹配 `clearInterval()` 和 `clearTimeout()` 对应的 id，以避免代码杂乱无章，增强代码的可维护性。

### 2.`window.setTimeout`

置一个定时器，该定时器在定时器到期后执行一个函数或指定的一段代码。

**语法**

```js
var timeoutID = scope.setTimeout(func[, delay, arg1, arg2, ...]);
var timeoutID = scope.setTimeout(func[, delay]);
var timeoutID = scope.setTimeout(code[, delay]);
```

**参数**

- `func`
  - `func` 是你想要在到期时间(`delay` 毫秒)之后执行的函数。
- `code`
  - 这是一个可选语法，你可以使用字符串而不是 `func`，在 `delay` 毫秒之后编译和执行字符串 (使用该语法是不推荐的, 原因和使用 `eval()` 一样，有安全风险)。
- `delay` 可选
  - 延迟的毫秒数，函数的调用会在该延迟之后发生。如果省略该参数，`delay` 取默认值 0，意味着“马上”执行，或者尽快执行。
- `arg1, ..., argN` 可选
  - 附加参数，一旦定时器到期，它们会作为参数传递给 `func`。

**返回值**

返回值 `timeoutID` 是一个正整数，表示定时器的编号。这个值可以传递给 `clearTimeout()` 来取消该定时器。

在同一个对象上（一个 `window` 或者 `worker`），`setTimeout()` 或者 `setInterval()` 在后续的调用不会重用同一个定时器编号。但是不同的对象使用独立的编号池。

**关于"this"的问题**

由 `setInterval()/setTimeout()` 调用的代码运行在与所在函数完全分离的执行环境上。这会导致，这些代码中包含的 `this` 关键字在非严格模式会指向 `window` (或全局)对象，严格模式下为 `undefined`，这和所期望的 `this` 的值是不一样的。

> 备注：即使是在严格模式下，`setTimeout()` 的回调函数里面的 `this`仍然默认指向 `window` 对象， 并不是 `undefined`。

注意：Node 中也有这两种方法，但是参数有点不一样：

- Node 中第一个参数是回调函数，所以必须是函数类型。
- delay
  - Node：`setInterval/setTimeout` delay 范围在 1 - 214748647，超过范围被设置为 1，默认值为 1。
  - JavaScript：`setInterval` delay 范围在 10 - 214748647，默认值为 10；`setTimeout`  delay 范围在 0 - 214748647，默认值为 0。

```js
// 字符串代替回调函数，在浏览器环境正常；在 Node 中会报错

// TypeError Callback must be a function. Received 'setInterval'
let timer = setInterval('setInterval', 100);

// TypeError Callback must be a function. Received 'setTimeout'
let timer2 = setTimeout('setTimeout', 100);
```

### 3.`window.requestAnimationFrame`

需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

> 若想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用 `window.requestAnimationFrame()`。

当准备更新动画时你应该调用此方法。这将使浏览器在下一次重绘之前调用你传入给该方法的动画函数(即你的回调函数)。

回调函数执行次数通常是每秒 60 次，但在大多数遵循 W3C 建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配。为了提高性能和电池寿命，因此在大多数浏览器里，当 `requestAnimationFrame()` 运行在后台标签页或者隐藏的 `<iframe>` 里时，`requestAnimationFrame()` 会被暂停调用以提升性能和电池寿命。

回调函数会被传入 `DOMHighResTimeStamp` 参数，`DOMHighResTimeStamp` 指示当前被 `requestAnimationFrame()` 排序的回调函数被触发的时间。在同一个帧中的多个回调函数，它们每一个都会接受到一个相同的时间戳，即使在计算上一个回调函数的工作负载期间已经消耗了一些时间。该时间戳是一个十进制数，单位毫秒，最小精度为 1ms(1000μs)。

> [`DOMHighResTimeStamp`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMHighResTimeStamp) 是一个 `double` 类型，用于存储毫秒级的时间值。这种类型可以用来描述离散的时间点或者一段时间（两个离散时间点之间的时间差）。

---

参考

[window.setInterval](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)

[window.setTimeout](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)

[window.requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)
