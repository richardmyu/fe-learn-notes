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

> 在 chrome 中，用 resolved 代替了 fulfilled，而 foxfire 则使用 fulfilled，在下文中，不具体分 resolved 或 fulfilled，当作同义词使用。

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

很自然的，若没有使用 `reject`，而是手动抛出一个错误，或者其他代码错误，或怎么样呢？当然也能被 `onreject` 或 `catch` 捕获，但是 promise 自身状态不会变（改变 promise 状态的方法只有一个，调用 `resolve` 或者 `reject`，如果同时调用呢？记住 promise 状态改变以后就固定了，所以谁先调用谁改变状态）。

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

> [demo](./demo/part02/test01.js)

谷歌浏览器的输出有时候有点让人疑惑：

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

作用是为 Promise 实例添加状态改变时的回调函数。`then` 方法的第一个参数是 `resolved` 状态的回调函数，第二个参数（可选）是 `rejected` 状态的回调函数。

`then` 方法返回的是一个**新** Promise 实例（注意，不是原来那个 Promise 实例）。因此可以采用链式写法，即 `then` 方法后面再调用另一个 `then` 或者其他方法。

```js
new Promise((res, rej) => {
  const num = Math.random();

  if (num > 0.5) {
    res(1);
  } else {
    rej(0);
  }
}).then(res => {
  console.log("resolve: ", res)
}, err => {
  console.log("reject: ", err)
})
```

采用链式的 `then`，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个 Promise 对象（即有异步操作），这时后一个回调函数，就会等待该 Promise 对象的状态发生变化，才会被调用。

```js
const p1 = new Promise((res, rej) => {
  const timer = setTimeout(() => {
    clearTimeout(timer);
    res(1);
  }, 2000)
});

const p2 = new Promise((res, rej) => {
  // 等到 p1 的状态确定以后，才会执行
  res(p1);
});

const p2then = p2.then(res => {
  console.log("res: ", res);
});

p2then.catch(err => {
  console.log(err);
}).finally(() => {
  // 可以看出 then 返回了【新】promise
  console.log(p2); // Promise {<resolved>: 1}
  console.log(p2then); // Promise {<resolved>: undefined}
});
```

##### 3.2.Promise.prototype.catch()

`catch()` 方法是 `.then(null, rejection)` 或 `.then(undefined, rejection)` 的等价写法，用于指定发生错误时的回调函数。

```js
// catch
new Promise((res, rej) => {
  rej(1);
}).catch(err => {
  console.log(err)
})

// 等价方法 1
new Promise((res, rej) => {
  rej(2);
}).then(null, err => {
  console.log(err)
})

// 等价方法 2
new Promise((res, rej) => {
  rej(3);
}).then(undefined, err => {
  console.log(err)
})

// 等价方法 3
new Promise((res, rej) => {
  rej(4);
}).then(() => { }, err => {
  console.log(err)
})
```

> 一般来说，不要在 `then()` 方法里面定义 `onreject` 状态的回调函数，总是使用 `catch` 方法。理由是 `catch` 可以捕获前面 `then` 方法执行中的错误，也更接近同步的写法（try/catch）。

如果 Promise 状态已经改变，再抛出错误是无效的。

```js
// 先改变状态，再抛出错误
new Promise((res, rej) => {
  res(1);
  throw new Error('err res');
}).then(res => {
  console.log('res-res', res); // res-res 1
}).catch(err => {
  console.log('res-err', err);
});

// 先抛出错误，再改变状态
new Promise((res, rej) => {
  throw new Error('err res');
  res(1);
}).then(res => {
  console.log('res-res', res);
}).catch(err => {
  console.log('res-err', err); // res-err Error:err res
});

// 在 promise 外（此时 promise已完成）抛出错误
new Promise((res, rej) => {
  rej(22);
  setTimeout(() => {
    throw new Error('err res');
  }, 0)
}).then(res => {
  console.log('rej-res', res);
}).catch(err => {
  console.log('rej-err', err);
});
// rej-err 22
// Error: err res
```

综合前文，结合上文，可知：`onReject` 或 `catch` 只能捕获状态改变之前的非 `reject` 异常，以及 `reject` 本身。

跟传统的 `try/catch` 代码块不同的是，如果没有使用 `catch()` 方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。但是会再控制台打印错误。具体细节见 【拒绝事件】。

一般总是建议，Promise 对象后面要跟 `catch()` 方法，这样可以处理 Promise 内部发生的错误。`catch()` 方法返回的还是一个 Promise 对象，因此后面还可以接着调用 `then()` 方法。

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

// 更好的例子
new Promise((res, rej) => {
  console.log("初始化");
  res();
}).then(() => {
  throw new Error("哪里不对");
  console.log("执行【这个】");
}).catch(err => {
  console.log("执行【那个】");
}).finally(() => {
  console.log("不管你们执行不执行，反正我要执行")
});
```

结果如下：

```js
初始化
执行【那个】
不管你们执行不执行，反正我要执行
```

> `catch`方法之中，还能再抛出错误。若没有下一个 `catch` 方法，这个错误也会被漏掉。

##### 3.3.Promise.prototype.finally()

`finally()` 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

```js
new Promise((res, rej) => {
  const num = Math.random();
  if (num > 0.5) {
    res(1);
  } else {
    rej(0);
  }
}).then(res => {
  console.log("resolve: ", res);
}).catch(err => {
  console.log("reject/err: ", err);
}).finally((str) => {
  console.log("啦啦啦", str); // 啦啦啦 undefined
});
```

`finally` 方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是 `fulfilled` 还是 `rejected`。这表明，`finally` 方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

`finally` 本质上是 `then` 方法的特例。

```js
promise
.finally(() => {
  // 语句
});

// 等同于
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
);
```

它的实现也很简单。

```js
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```

> [demo](./demo/part03/mock_finally.js)

`finally` 也会返回一个**新** promise：

```js
const p1 = new Promise((res, rej) => {
  res(1);
});

const p2 = p1.then(res => {
  console.log("res ", res);
});

const p3 = p2.catch(err => {
  console.log("err ", err);
});

const p4 = p3.finally((str) => {
  console.log("str ", str);
});

setTimeout(() => {
  console.log("p1 ", p1); // Promise { <state>: "fulfilled", <value>: 1 }
  console.log("p2 ", p2); // Promise { <state>: "fulfilled", <value>: undefined }
  console.log("p3 ", p3); // Promise { <state>: "fulfilled", <value>: undefined }
  console.log("p4 ", p4); // Promise { <state>: "fulfilled", <value>: undefined }
}, 1000)
```

##### 3.4.Promise.all()

`Promise.all()` 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.all([p1, p2, p3]);
```

`Promise.all()` 方法接受一个数组作为参数，p1、p2、p3 都是 Promise 实例，如果不是，就会先调用 `Promise.resolve` 方法，将参数转为 Promise 实例，再进一步处理。另外，`Promise.all()` 方法的参数可以不是数组，但必须具有 `Iterator` 接口，且返回的每个成员都是 Promise 实例。

p 的状态由 p1、p2、p3 决定，分成两种情况。

（1）只有 p1、p2、p3 的状态都变成 `fulfilled`，p 的状态才会变成 `fulfilled`，此时 p1、p2、p3 的返回值组成一个数组，传递给 p 的回调函数。

（2）只要 p1、p2、p3 之中有一个被 `rejected`，p 的状态就变成 `rejected`，此时第一个被 `reject` 的实例的返回值，会传递给 p 的回调函数。

```js
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

const p3 = new Promise((res, rej) => {
  const num = Math.random();
  if (num > 0.5) {
    res(1);
  } else {
    rej(0);
  }
});

const p = Promise.all([p1, p2, p3]);

p.then(() => {
  console.log(p1)
  console.log(p2)
  console.log(p3)
  console.log(p)
});
```

chrome:

```js
// Promise {<resolved>: 1}
// Promise {<resolved>: 2}
// Promise {<resolved>: 1}
// Promise {<resolved>: [1, 2, 1]}

// or

// Promise {<resolved>: 1}
// Promise {<resolved>: 2}
// Promise {<resolved>: 0}
// Promise {<resolved>: 0}
```

foxfire:

```js
// Promise { <state>: "fulfilled", <value>: 1 }
// Promise { <state>: "fulfilled", <value>: 2 }
// Promise { <state>: "fulfilled", <value>: 1 }
// Promise { <state>: "fulfilled", <value>: (3) [1, 2, 1] }

// or

// Promise { <state>: "fulfilled", <value>: 1 }
// Promise { <state>: "fulfilled", <value>: 1 }
// Promise { <state>: "rejected" }
// Promise { <state>: "rejected" }
```

注意：p3 中没有添加 `then` 或 `catch`，如果添加了，会有不一样的情况。如果作为参数的 Promise 实例，自己定义了 `catch` 方法，那么它一旦被 `rejected`，并不会触发 `Promise.all()` 的 `catch` 方法。见 [demo](demo/part03/all.js)。

##### 3.5.Promise.race()

`Promise.race()` 方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.race([p1, p2, p3]);
```

参数与 `Promise.all()` 方法一样，如果不是 Promise 实例，就会先调用 `Promise.resolve()`方法，将参数转为 Promise 实例，再进一步处理。只要有一个参数状态改变，`p` 的状态就改变，并且会得到率先改变的参数 promise 的返回值。

```js
const p1 = new Promise((res, rej) => {
  const timer = setTimeout(() => {
    clearTimeout(timer);
    res(1);
  }, 1000)
});

const p2 = new Promise((res, rej) => {
  const timer = setTimeout(() => {
    clearTimeout(timer);
    res(2);
  }, 2000)
});

const p3 = new Promise((res, rej) => {
  const timer = setTimeout(() => {
    clearTimeout(timer);
    res(3);
  }, 3000)
});

const p = Promise.race([p1, p2, p3]);

p.then(res => {
  const timer = setTimeout(() => {
    clearTimeout(timer);
    console.log("p-res: ", res); // p-res:  1
    console.log("p1 ", p1); // Promise {<resolved>: 1}
    console.log("p2 ", p2); // Promise {<resolved>: 2}
    console.log("p3 ", p3); // Promise {<resolved>: 3}
    console.log("p ", p); // Promise {<resolved>: 1}
  }, 4000);
});
```

参数 promise 若没有 `catch` 处理，会被 `Promise.race` 的 `catch` 捕获。

##### 3.6.Promise.allSettled()

`Promise.allSettled()` 方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，不管是 `fulfilled` 还是`rejected`，包装实例才会结束。该方法由 ES2020 引入。

```js
const p1 = new Promise((res, rej) => {
  const timer = setTimeout(() => {
    clearTimeout(timer);
    res(1);
  }, 1000)
});

const p2 = new Promise((res, rej) => {
  const timer = setTimeout(() => {
    clearTimeout(timer);
    res(2);
  }, 2000)
});

const p3 = new Promise((res, rej) => {
  const timer = setTimeout(() => {
    clearTimeout(timer);
    res(3);
  }, 3000)
});

const p = Promise.allSettled([p1, p2, p3]);

p.then(res => {
  console.log("p-res: ", res);
  // p-res: [{status: "fulfilled", value: 1}, {status: "fulfilled", value: 2}, {status: "fulfilled", value: 3}]

  console.log("p1 ", p1); // Promise {<resolved>: 1}
  console.log("p2 ", p2); // Promise {<resolved>: 2}
  console.log("p3 ", p3); // Promise {<resolved>: 3}

  // 一旦结束，总是 resolve
  console.log("p ", p); // Promise {<resolved>: Array(3)}
});
```

该方法返回的新的 Promise 实例，一旦结束，状态总是 `fulfilled`，不会变成 `rejected`。状态变成 `fulfilled` 后，Promise 的监听函数接收到的参数是一个数组，每个成员对应一个传入 `Promise.allSettled()` 的 Promise 实例。

> 若参数 promise 执行一个 `rejected`，即便没有 `catch`，也能正常被 `Promise.allSettled` 处理。

有时候，我们不关心异步操作的结果，只关心这些操作有没有结束。这时，`Promise.allSettled()` 方法就很有用。如果没有这个方法，想要确保所有操作都结束，就很麻烦。`Promise.all()` 方法无法做到这一点。

##### 3.7.Promise.any()

> 注意！ `Promise.any()` 方法依然是实验性的，尚未被所有的浏览器完全支持。它当前处于 [TC39 第三阶段草案（Stage 3）](https://github.com/tc39/proposal-promise-any)。

`Promise.any()` 方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只要参数实例有一个变成 `fulfilled` 状态，包装实例就会变成 `fulfilled` 状态；如果所有参数实例都变成 `rejected` 状态，包装实例就会变成 `rejected` 状态。

`Promise.any()` 跟 `Promise.race()` 方法很像，只有一点不同，就是不会因为某个 Promise 变成 `rejected` 状态而结束。

`Promise.any()` 抛出的错误，不是一个一般的错误，而是一个 `AggregateError` 实例。它相当于一个数组，每个成员对应一个被 `rejected` 的操作所抛出的错误。

##### 3.8.Promise.resolve()

有时需要将现有对象转为 Promise 对象，`Promise.resolve()` 方法就起到这个作用。

`Promise.resolve()` 等价于下面的写法。

```js
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

`Promise.resolve` 方法的参数分成四种情况。

（1）参数是一个 Promise 实例

如果参数是 Promise 实例，那么 `Promise.resolve` 将不做任何修改、原封不动地返回这个实例。

```js
const p1 = new Promise((res, rej) => {
  res(1);
});

const p2 = Promise.resolve(p1);

p2.then(res => {
  console.log("res: ", res); // res:  1
  console.log("p1 ", p1); // p1 Promise {<resolved>: 1}
  console.log("p2 ", p2); // p2 Promise {<resolved>: 1}
})
```

（2）参数是一个 `thenable` 对象

> `thenable` 对象指的是具有 `then` 方法的 promise 对象。

`Promise.resolve` 方法会将这个对象转为 Promise 对象，然后就立即执行 `thenable` 对象的 `then` 方法。

```js
const p3 = {
  then: function (resolve, reject) {
    resolve(11);
  }
};

const p4 = Promise.resolve(p3);

p4.then(res => {
  console.log("p4-res: ", res); // p4-res:  11
  console.log("p3 ", p3); // p3 {then: ƒ}
  console.log("p4 ", p4); // p4 Promise {<resolved>: 11}
});
```

注意，会落后其他类型参数一轮（此处有两次 `then`，其他类型只有一次）。

（3）参数不是具有 `then` 方法的对象，或根本就不是对象

如果参数是一个原始值，或者是一个不具有 `then` 方法的对象，则 `Promise.resolve` 方法返回一个新的 Promise 对象，状态为 `resolved`。

```js
// 没有 then 方法的对象
const p5 = {
  say: function () {
    return 'hi';
  }
}
const p6 = Promise.resolve(p5);

p6.then(res => {
  console.log("p6-res: ", res); // p6-res:  {say: ƒ}
  console.log("p5 ", p5); // p5 {say: ƒ}
  console.log("p6 ", p6); // p6 Promise {<resolved>: {say: ƒ}}
});

// 原始值
const p7 = 123
const p8 = Promise.resolve(p7);

p8.then(res => {
  console.log("p8-res: ", res); // p8-res:  123
  console.log("p7 ", p7); // p7  123
  console.log("p8 ", p8); // p8  Promise {<resolved>: 123}
})
```

（4）不带有任何参数

`Promise.resolve()` 方法允许调用时不带参数，直接返回一个 `resolved` 状态的 Promise 对象。

所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用 `Promise.resolve()` 方法。

```js
const p9 = Promise.resolve();

p9.then(res => {
  console.log("p9-res: ", res);  // p9-res:  undefined
  console.log("p9 ", p9); // p9 Promise {<resolved>: undefined}
});
```

##### 3.8.Promise.reject()

`Promise.reject()` 方法会返回一个**新**的 Promise 实例，该实例的状态为 `rejected`。`Promise.reject()` 方法的参数，会原封不动地作为 `reject` 的理由，变成后续方法的参数。这一点与 `Promise.resolve` 方法不一致。

```js
// 参数是一个 Promise 实例
const p1 = new Promise((res, rej) => {
  res(1);
});

const p2 = Promise.reject(p1);

p2.then(res => {
  console.log("p2-res: ", res);

}).catch(err => {
  console.log("p2-err: ", err)
}).finally(() => {
  console.log("p1 ", p1); // p1  Promise {<resolved>: 1}
  console.log("p2 ", p2); // p2  Promise {<rejected>: Promise}
});
```

##### 3.10.Promise.try()

> 草案

实际开发中，经常遇到一种情况：不知道或者不想区分，函数 `f` 是同步函数还是异步操作，但是想用 Promise 来处理它。因为这样就可以不管 `f` 是否包含异步操作，都用 `then` 方法指定下一步流程，用 `catch` 方法处理 `f` 抛出的错误。一般就会采用下面的写法。

```js
Promise.resolve().then(f);
```

但这样的写法有一个缺点，就是如果 `f` 是同步函数，那么它会在本轮事件循环的末尾执行。

```js
const f = () => console.log("hello");

Promise.resolve().then(f);

console.log('world');

// world
// hello
```

那么有没有一种方法，让同步函数同步执行，异步函数异步执行，并且让它们具有统一的 API 呢？回答是可以的，并且还有两种写法。第一种写法是用 `async` 函数来写。

```js
const f = () => console.log("hello");

// Promise.resolve().then(f);
(async () => f())();

console.log('world');

// hello
// world
```

需要注意的是，`async () => f()` 会吃掉 `f()` 抛出的错误。所以，如果想捕获错误，要使用 `promise.catch` 方法。

第二种写法是使用 `new Promise()`。

```js
const f = () => console.log("hello");

// Promise.resolve().then(f);
// (async () => f())();
(() => new Promise(res => res(f())))();

console.log('world');

// hello
// world
```

鉴于这是一个很常见的需求，所以现在有一个提案，提供 `Promise.try` 方法替代上面的写法。

```js
const f = () => console.log('now');
Promise.try(f);
console.log('next');
// now
// next
```

事实上，`Promise.try` 就是模拟 `try` 代码块，就像 `promise.catch` 模拟的是 `catch` 代码块。

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

当 Promise 被 `rejected` 且有 `rejection` 处理器时会在全局触发 `rejectionhandled` 事件(通常是发生在 window 下，但是也可能发生在 Worker 中)。

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

当 Promise 被 `reject` 且没有 `reject` 处理器的时候，会触发 `unhandledrejection` 事件；这可能发生在 window 下，但也可能发生在 Worker 中。

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

2.[PromiseRejectionEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/PromiseRejectionEvent)

3.[How to handle "unhandled Promise rejections" #72](https://github.com/tc39/ecmascript-asyncawait/issues/72)

4.[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

5.[Promise 对象](https://es6.ruanyifeng.com/#docs/promise)
