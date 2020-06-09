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

##### 1.2.错误传递

通常，一遇到异常抛出，浏览器就会顺着 promise 链寻找下一个 `onRejected` 失败回调函数或者由 `.catch()` 指定的回调函数。这和以下的同步代码的执行过程很相似。

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
- 被捕获的错误不会继续被传递；但若 `onRejected` 回调有返回值，则在下一个 `then()` 可以获取到这个返回值，否则后续调用（若有）都将获取不到参数（都只会得到 `undefined`）；

参考：

1.[使用 Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)

2.[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

3.[Promise原理浅析](https://imweb.io/topic/565af932bb6a753a136242b0)
