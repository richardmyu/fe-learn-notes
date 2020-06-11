# Promise

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了 Promise 对象。

Promise 对象是一个代理对象（代理一个值），被代理的值在 Promise 对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。 这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的 promise 对象。

### 1.初步了解和使用 Promise

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

> [demo](./demo/part01/test01.js)

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

`promise2` 不仅表示 `doSomething()` 函数的完成，也代表了你传入的 `successCallback` 或者 `failureCallback` 的完成，这两个函数也可以返回一个 Promise 对象，从而形成另一个异步操作，这样的话，在 `promise2` 上新增的回调函数会排在这个 Promise 对象的后面。

> [demo](./demo/part01/test02.js)
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

注意：一定要有返回值，否则，`callback` 将无法获取上一个 Promise 的结果。

### 2.详解 promise

Promise 对象是一个代理对象（代理一个值），被代理的值在 Promise 对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。 这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的 promise 对象

一个 Promise 有以下几种状态:

- `pending`: 初始状态，既不是成功，也不是失败状态。
- `fulfilled`: 意味着操作成功完成。
- `rejected`: 意味着操作失败。

`pending` 状态的 Promise 对象可能会变为 `fulfilled` 状态并传递一个值给相应的状态处理方法，也可能变为 `rejected` 并传递失败信息。当其中任一种情况出现时，Promise 对象的 `then` 方法绑定的处理方法（handlers ）就会被调用（`then` 方法包含两个参数：`onfulfilled` 和 `onrejected`，它们都是 Function 类型。当 Promise 状态为 `fulfilled` 时，调用 `then` 的 `onfulfilled` 方法，当 Promise 状态为 `rejected` 时，调用 `then` 的 `onrejected` 方法， 所以在异步操作的完成和绑定处理方法之间不存在竞争）。

因为 `Promise.prototype.then` 和  `Promise.prototype.catch` 方法返回 promise 对象， 所以它们可以被链式调用。

![](https://mdn.mozillademos.org/files/8633/promises.png)

> 不要和惰性求值混淆：有一些语言中有惰性求值和延时计算的特性，它们也被称为“promises”，例如 Scheme。 Javascript 中的 promise 代表一种已经发生的状态， 而且可以通过回调方法链在一起。 如果你想要的是表达式的延时计算，考虑无参数的"箭头方法":  `f = () =>表达式` 创建惰性求值的表达式，使用 `f()` 求值。
>
> 注意： 如果一个 promise 对象处在 `fulfilled` 或 `rejected` 状态而不是 `pending` 状态，那么它也可以被称为 `settled` 状态。你可能也会听到一个术语 `resolved` ，它表示 promise 对象处于 `settled` 状态。

Promise 对象有以下两个特点。

（1）对象的状态不受外界影响。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。如果改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

Promise 也有一些缺点：

（1）首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。

（2）其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。

（3）第三，当处于 `pending` 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

> 如果某些事件不断地反复发生，一般来说，使用 Stream 模式是比部署 Promise 更好的选择。

##### 2.1.语法

```js
new Promise( function(resolve, reject) {...} /* executor */  );
```

`executor` 是带有 `resolve` 和 `reject` 两个参数的函数。Promise 构造函数执行时立即调用 `executor` 函数， `resolve` 和 `reject` 两个函数作为参数传递给 `executor`（`executor` 函数在 Promise 构造函数返回所建 promise 实例对象前被调用）。

`executor` 内部通常会执行一些异步操作，一旦异步操作执行完毕(可能成功/失败)，要么调用 `resolve` 函数来将 promise 状态改成 `fulfilled`，要么调用 `reject` 函数将 promise 的状态改为 `rejected`。如果在 `executor` 函数中抛出一个错误，那么该 promise 状态为 `rejected`。`executor` 函数的返回值被忽略。

```js
const promise = new Promise((res, rej) => {
  // 立即执行
  console.log("同步执行")

  const timer = setTimeout(() => {
    clearTimeout(timer);
    const num = Math.random();

    if (num > 0.5) {
      // 通过断点，我们可以看到，在 resolve 或 reject 之前，promise 处于 <pedding> 状态
      // 而在 resolve 或 reject 之后，promise 跟着变为 <resolved> | <rejected> 状态
      debugger;
      res(1);
      debugger;
    } else {
      debugger;
      rej(0);
      debugger;
    }
  }, 1000)
})

console.log("我在 promise 外面哟");

promise.then(res => {
  // 异步执行
  console.log("异步执行");
  console.log("result: ", res);
  debugger
}).catch(err => {
  console.log("err info: ", err)
})
```

若没有使用 `reject`，而是手动抛出一个错误，或者其他代码错误，也能被 `onreject` 或 `catch` 捕获，但是 promise 自身状态不会变。

```js
const promiseErr = new Promise((res, rej) => {
  const num = Math.random();
  if (num < 1) {
    debugger;
    throw Error("err...");
  }
}).then(() => {
  debugger;
}).catch(err => {
  debugger;
  console.log(err, promiseErr)
})
```

结果（谷歌浏览器的输出有点让人疑惑）：

```js
// chrome
Promise {<pending>}
  __proto__: Promise
  [[PromiseStatus]]: "resolved" //这里为啥是 resolved
  [[PromiseValue]]: undefined

// foxfire
Promise { "pending" }
<state>: "pending"
<prototype>: PromiseProto { … }
```

##### 2.2.属性

- `Promise.length`

  - `length` 属性，其值总是为 1 (构造器参数的数目)
>
- `Promise.prototype`

  - 表示 Promise 构造器的原型

```js {highlight=[6,8]}
Promise()
  all: ƒ all()
  allSettled: ƒ allSettled()
  arguments: (...)
  caller: (...)
  length: 1
  name: "Promise"
  prototype: Promise {Symbol(Symbol.toStringTag): "Promise", constructor: ƒ, then: ƒ, catch: ƒ, finally: ƒ}
  race: ƒ race()
  reject: ƒ reject()
  resolve: ƒ resolve()
  Symbol(Symbol.species): (...)
  get Symbol(Symbol.species): ƒ [Symbol.species]()
  __proto__: ƒ ()
  [[Scopes]]: Scopes[0]
```

### 3.promise 方法

##### 3.1.Promise.prototype.then()

##### 3.2.Promise.prototype.catch()

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

##### 3.3.Promise.prototype.finally()

##### 3.4.Promise.all()

##### 3.5.Promise.race()

##### 3.6.Promise.allSettled()

##### 3.7.Promise.any()

##### 3.8.Promise.resolve()

##### 3.8.Promise.reject()

##### 3.10.Promise.try()

### 4.拒绝事件

当 Promise 被拒绝时，会有下文所述的两个事件之一被派发到全局作用域（通常而言，就是 window；如果是在 web worker 中使用的话，就是 Worker 或者其他 worker-based 接口）。

##### 4.1.异常传递

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

##### 4.2.PromiseRejectionEvent

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

##### 4.3.rejectionhandled

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

##### 4.4.unhandledrejection

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

##### 4.5.实际测试

> [浏览器环境](./demo/part04/test02.js)
> [node 环境](./demo/part04/test03.js)

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

5.[How to handle "unhandled Promise rejections" #72](https://github.com/tc39/ecmascript-asyncawait/issues/72)

6.[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

7.[Promise 对象](https://es6.ruanyifeng.com/#docs/promise)

8.[Promise原理浅析](https://imweb.io/topic/565af932bb6a753a136242b0)

9.[剖析 Promise 之基础篇](https://tech.meituan.com/2014/06/05/promise-insight.html)
