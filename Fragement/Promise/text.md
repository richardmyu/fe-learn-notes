# Promise

### 1.使用 Promise

Promise 是一个对象，它代表了一个异步操作的最终完成或者失败。本质上 Promise 是一个函数返回的对象，我们可以在它上面绑定回调函数，这样我们就不需要在一开始把回调函数作为参数传入这个函数了。

以下为使用 `createImageFileAsync()` 的示例：

```js
// 成功的回调函数
function successCallback(result) {
  console.log("文件创建成功: " + result);
}

// 失败的回调函数
function failureCallback(error) {
  console.log("文件创建失败: " + error);
}

// 接收一些配置和两个回调函数，然后异步地生成文件
createImageFileAsync(imageSettings, successCallback, failureCallback)
```

更现代的函数会返回一个 promise 对象，使得你可以将你的回调函数绑定在该 promise 上。

如果函数 `createImageFileAsync()` 被重写为返回 promise 的形式，那么我们可以像下面这样简单地调用它：

```js
const promise = createImageFileAsync(imageSettings);
promise.then(successCallback, failureCallback);

// 或者简写为：
createImageFileAsync(imageSettings).then(successCallback, failureCallback);
```

> demo: [demo/test01.js](./demo/test01.js)

不同于“老式”的传入回调，在使用 Promise 时，会有以下约定：

- 在本轮 [事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop#%E6%89%A7%E8%A1%8C%E8%87%B3%E5%AE%8C%E6%88%90) 运行完成之前，回调函数是不会被调用的。
- 即使异步操作已经完成（成功或失败），在这之后通过 `then()` 添加的回调函数也会被调用。
- 通过多次调用 `then()` 可以添加多个回调函数，它们会按照插入顺序执行。

Promise 很棒的一点就是链式调用（chaining）。

##### 1.1.链式调用

连续执行两个或者多个异步操作是一个常见的需求，在上一个操作执行成功之后，开始下一个的操作，并带着上一步操作所返回的结果。我们可以通过创造一个 Promise 链来实现这种需求。

`then()` 函数会返回一个和原来不同的新的 Promise：

```js
const promise2 = doSomething().then(successCallback, failureCallback);
```

promise2 不仅表示 `doSomething()` 函数的完成，也代表了你传入的 successCallback 或者 failureCallback 的完成，这两个函数也可以返回一个 Promise 对象，从而形成另一个异步操作，这样的话，在 promise2 上新增的回调函数会排在这个 Promise 对象的后面。

> demo: [demo/test02.js](./demo/test02.js)
>
> 从测试结果看，promise2 确实返回了一个新的 promise，只是，在 node 环境中，表现为 `<pending>` 状态，而在浏览器则会表现为 `<resolve>` 状态（不论 promise 是 `<resolve>` 还是 `<reject>`）

基本上，每一个 Promise 都代表了链中另一个异步过程的完成。

在过去，要想做多重的异步操作，会导致经典的回调地狱：

```js
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```

现在，我们可以把回调绑定到返回的 Promise 上，形成一个 Promise 链：

```js
doSomething()
.then(result => doSomethingElse(result))
.then(newResult => doThirdThing(newResult))
.then(finalResult => {
  console.log(`Got the final result: ${finalResult}`);
})
.catch(failureCallback);
```

注意：一定要有返回值，否则，callback 将无法获取上一个 Promise 的结果。

**catch 的后续链式操作**

有可能会在一个回调失败之后继续使用链式操作，即在使用一个 `catch` 后再次使用 `then`，这对于在链式操作中抛出一个失败之后，再次进行新的操作很有用。请阅读下面的例子：

```js
new Promise((res, rej) => {
  console.log("初始化");
  res();
}).then(() => {
  throw new Error("哪里不对");
  console.log("执行【这个】");
}).catch(err => {
  console.log("执行【那个】");
}).then(() => {
  console.log("不管你们执行不执行，反正我要执行")
})
```

结果如下：

```js
初始化
执行【那个】
不管你们执行不执行，反正我要执行
```

> 本质上，`catch(callback)` 是 `then(null, callback)` 的缩略形式，所以一样也会返回一个新 promise，继续链式调用。

##### 1.2.异常传递

通常，一遇到异常抛出，浏览器就会顺着 promise 链寻找下一个 `onRejected` 失败回调函数或者由 `.catch()` 指定的回调函数（若没有指定 `onRejected` 回调函数或者 `.catch()` 调用，见下节：【promise 拒绝事件】 ）。这和以下的同步代码的执行过程很相似。

```js
try {
  let result = syncDoSomething();
  let newResult = syncDoSomethingElse(result);
  let finalResult = syncDoThirdThing(newResult);
  console.log(`Got the final result: ${finalResult}`);
} catch(error) {
  failureCallback(error);
}
```

在 ECMAScript 2017 标准的 async/await 语法糖中，这种与同步形式代码的对称性得到了极致的体现：

```js
async function foo() {
  try {
    const result = await doSomething();
    const newResult = await doSomethingElse(result);
    const finalResult = await doThirdThing(newResult);
    console.log(`Got the final result: ${finalResult}`);
  } catch(error) {
    failureCallback(error);
  }
}
```

来看看实际例子：

```js
new Promise((res, rej) => {
  let num = Math.random();
  if (num > 0.5) {
    res(1);
  } else {
    rej(0);
  }
}).then((res) => {
  console.log('promise1--res1: ', res);

  return res;
}, (err) => {
  console.log('promise1--err1: ', err);

  return err;
}).then((res) => {
  console.log('promise1--res2: ', res);

  return res;
}, (err) => {
  console.log('promise1--err2: ', err);

  return err;
}).then((res) => {
  console.log('promise1--res3: ', res);

}, (err) => {
  console.log('promise1--err3: ', err);

}).catch(err=>{
  console.log('promise1--catch: ', err);

});
```

结果：

```js
promise1--err1:  0
promise1--res2:  0
promise1--res3:  0

// or

promise1--res1:  1
promise1--res2:  1
promise1--res3:  1
```

在看一个例子：

```js
new Promise((res, rej) => {
  let num = Math.random();
  if (num > 0.5) {
    res(1);
  } else {
    rej(0);
  }
}).then((res) => {
  console.log('promise2--res1: ', res);

  return res;
}).then((res) => {
  console.log('promise2--res2: ', res);

  return res;
}).then((res) => {
  console.log('promise2--res3: ', res);

}, (err) => {
  console.log('promise2--err3: ', err);

}).catch(err => {
  console.log('promise2--catch: ', err);

});
```

结果：

```js
promise2--err3:  0

// or

promise2--res1:  1
promise2--res2:  1
promise2--res3:  1
```

第三个例子：

```js
new Promise((res, rej) => {
  let num = Math.random();
  if (num > 0.5) {
    res(1);
  } else {
    rej(0);
  }
}).then((res) => {
  console.log('promise3--res1: ', res);

  return res;
}).then((res) => {
  console.log('promise3--res2: ', res);

  return res;
}).then((res) => {
  console.log('promise3--res3: ', res);

}).catch(err => {
  console.log('promise3--catch: ', err);

})
```

结果：

```js
promise3--catch:  0

// or

promise3--res1:  1
promise3--res2:  1
promise3--res3:  1
```

由以上测试可知：

- 在调用过程出错的时候，程序沿着 promise 链寻找第一个 `onRejected` 回调（没有设置 `onRejected` 函数的时候，才会被 `.catch()` 捕获）；
- 被捕获的异常不会继续被传递；但若 `onRejected` 回调有返回值，则在下一个 `then()` 可以获取到这个返回值，否则后续调用（若有）都将获取不到参数（都只会得到 `undefined`）；

### 2.promise 拒绝事件

当 Promise 被拒绝时，会有下文所述的两个事件之一被派发到全局作用域（通常而言，就是 window；如果是在 web worker 中使用的话，就是 Worker 或者其他 worker-based 接口）。

##### 2.1.PromiseRejectionEvent

`PromiseRejectionEvent` 接口表示出现在 JavaScript Promises 被 `rejecte` (拒绝) 时触发的事件。这些事件对遥测(远程测试)和调试特别的有用。

**构造函数：**

`PromiseRejectionEvent()`

- 用给定的参数生成一个 `PromiseRejectionEvent` 事件。

语法：

```js
new PromiseRejectionEvent(type, {
  promise: somePromise,
  reason : someValue
});
```

参数：

`PromiseRejectionEvent()` 构造函数继承了 `Event()` 的参数。

- type

  - 一个代表 `PromiseRejectionEvent` 的类型名称的字符串。这是区分大小写的同时必须是 "`rejectionhandled`" 或者 "`unhandledrejection`" 其中之一。
>
- promise

  - 代表被 `rejected` 的Promise。
>
- reason

  - 代表 promise 被 `rejected` 的原因的值或者对象 Object 。

**属性：**

也从它的父级Event继承属性。

`PromiseRejectionEvent.promise` | 只读

- 被 rejected 的 JavaScript Promise 。

`PromiseRejectionEvent.reason` | 只读

- 一个值或 Object 表明为什么 promise 被 rejected，并传递给 `Promise.reject()`。

**方法：**

没有特定的方法; 从它的父级 Event继承方法。

**事件：**

`unhandledrejection`

`rejectionhandled`

##### 2.2.rejectionhandled

当 Promise 被 rejected 且有 rejection 处理器时会在全局触发 `rejectionhandled` 事件(通常是发生在 window 下，但是也可能发生在 Worker 中)。

根据当前测试时间阶段来看，`PromiseRejectionEvent` 的属性有添加：

```js
// chrome: rejectionhandled
PromiseRejectionEvent
  bubbles: false
  cancelBubble: false
  cancelable: false
  composed: false
  currentTarget: Window {…}
  defaultPrevented: false
  eventPhase: 0
  isTrusted: true
  path: [Window]
  promise: Promise {<rejected>: "Hello"}
  reason: "Hello"
  returnValue: true
  srcElement: Window {…}
  target: Window {…}
  timeStamp: 3018.260000011651
  type: "rejectionhandled"
  __proto__: PromiseRejectionEvent
```

```js
// firefox: rejectionhandled
​PromiseRejectionEvent
  bubbles: false
  cancelBubble: false
  cancelable: false
  composed: false
  currentTarget: null
  defaultPrevented: false
  eventPhase: 0
  explicitOriginalTarget: Window file:///D:/xxx/index.html
  isTrusted: true
  originalTarget: Window file:///D:/xxx/index.html
  reason: "Hello"
  returnValue: true
  srcElement: Window file:///D:/xxx/index.html
  target: Window file:///D:/xxx/index.html
  timeStamp: 3038
  type: "rejectionhandled"
  <get isTrusted()>: function isTrusted()
  <prototype>: PromiseRejectionEventPrototype { promise: Getter, reason: Getter, … }
```

##### 2.3.unhandledrejection

当Promise 被 reject 且没有 reject 处理器的时候，会触发 `unhandledrejection` 事件；这可能发生在 window 下，但也可能发生在 Worker 中。

根据当前测试时间阶段来看，`PromiseRejectionEvent` 的属性有添加：

```js
// chrome: unhandledrejection
PromiseRejectionEvent
  bubbles: false
  cancelBubble: false
  cancelable: true
  composed: false
  currentTarget: Window {…}
  defaultPrevented: false
  eventPhase: 0
  isTrusted: true
  path: [Window]
  promise: Promise {<rejected>: "Hello"}
  reason: "Hello"
  returnValue: true
  srcElement: Window {…}
  target: Window {…}
  timeStamp: 18.08500000333879
  type: "unhandledrejection"
  __proto__: PromiseRejectionEvent
```

```js
// firefox: unhandledrejection
​PromiseRejectionEvent
  bubbles: false
  cancelBubble: false
  cancelable: true
  composed: false
  currentTarget: null
  defaultPrevented: false
  eventPhase: 0
  explicitOriginalTarget: Window file:///D:/xxx/index.html
  isTrusted: true
  originalTarget: Window file:///D:/xxx/index.html
  reason: "Hello"
  returnValue: true
  srcElement: Window file:///D:/xxx/index.html
  target: Window file:///D:/xxx/index.html
  timeStamp: 40
  type: "unhandledrejection"
  <get isTrusted()>: function isTrusted()
  <prototype>: PromiseRejectionEventPrototype { promise: Getter, reason: Getter, … }
```

##### 2.4.实际测试

> demo: 浏览器环境 - [demo/test07.js](demo/test07.js)  node 环境 - [demo/test08.js](demo/test08.js)

两个环境中均没有监听到 `rejectionhandled` 和 `unhandledrejection` 事件？通过阅读 [unhandledrejection 处理没有显式捕获的 Promise 异常 #7](https://github.com/justjavac/the-front-end-knowledge-you-may-not-know/issues/7) 和 [unhandledrejection not working in Chrome](https://stackoverflow.com/questions/40026381/unhandledrejection-not-working-in-chrome)，解决了在浏览器端监听不到的问题。而在 [Tracking unhandled rejected Promises](https://2ality.com/2016/04/unhandled-rejections.html) 中指出， Node.js v6.6.0+ 默认自动处理 promise 拒绝事件，而不需要主动监听（即无法通过监听这两事件，来捕获 promise 异常）。

> **Note**: 据我所知，原因是 “unhandledrejection” 事件处理程序如果源于不同的脚本源，则会被静默忽略。Chrome 尤其严格要求文件 URL 的安全来源（firefox 也是如此），但我发现在不知不觉中破坏相同来源策略也可能由于其他原因而发生（例如在开启 Chrome 开发工具的 webpack-dev-server）。

浏览器测试环境中，确实把 promise 代码放到单独的文件中，使用代理服务或者将 promise 代码放回 HTML 文件，都可以正常监听到这两个函数。

还有一点：浏览器环境中，没有 reject 处理函数的时候，异常会在控制台被打印出来。原因在于，当 Promise 发生异常后，会从 `.then` 链进入到 `.catch` 链（若有）， 而 Promise 链结束后依然存在异常，即 Promise 依然是 reject 状态，Promise 会 `throw` 一个 `uncaughtException` 异常，此异常一层一层向外传播，如果所有函数都没有捕获，则在 devtools 的 `console` 输出此异常。为了避免这种异常打印，可以使用 `event.preventDefault` [Tracking unhandled rejected Promises](https://2ality.com/2016/04/unhandled-rejections.html):

```js
window.addEventListener("rejectionhandled", event => {
  // 阻止异常（在控制台）被打印出来
  event.preventDefault();
  console.log('rejectionhandled: ', event)
}, false)
```


参考：

1.[使用 Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)

2.[Window: rejectionhandled event](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/rejectionhandled_event)

3.[unhandledrejection](https://developer.mozilla.org/zh-CN/docs/Web/Events/unhandledrejection)

4.[PromiseRejectionEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/PromiseRejectionEvent)

2.[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

3.[Promise原理浅析](https://imweb.io/topic/565af932bb6a753a136242b0)
