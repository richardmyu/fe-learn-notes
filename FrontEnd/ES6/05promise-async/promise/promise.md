# Promise 对象

## 1.Promise 的含义

Promise 是异步编程的一种解决方案，比传统的解决方案 —— 回调函数和事件 —— 更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了 Promise 对象。

所谓 Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

Promise 对象有以下两个特点。

（1）**对象的状态不受外界影响**。

Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

（2）**一旦状态改变，就不会再变，任何时候都可以得到这个结果**。

Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

> 注意，为了行文方便，本章后面的 resolved 统一只指 fulfilled 状态，不包含 rejected 状态。

有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise 对象提供统一的接口，使得控制异步操作更加容易。

Promise 也有一些缺点。

- 首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。
  >
- 其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。
  >
- 第三，当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

如果某些事件不断地反复发生，一般来说，使用 Stream 模式是比部署 Promise 更好的选择。

## 2.基本用法

ES6 规定，Promise 对象是一个构造函数，用来生成 Promise 实例。Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 和 reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

resolve 函数的作用是，将 Promise 对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；

reject 函数的作用是，将 Promise 对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

Promise 实例生成以后，可以用 then 方法分别指定 resolved 状态和 rejected 状态的回调函数。then 方法可以接受两个回调函数作为参数。第一个回调函数是 Promise 对象的状态变为 resolved 时调用，第二个回调函数是 Promise 对象的状态变为 rejected 时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受 Promise 对象传出的值作为参数。

```js
promise.then(
  function(value) {
    // success
  },
  function(error) {
    // failure
  }
);
```

Promise 新建后就会立即执行。

```js
// 异步加载图片
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error("Could not load image at " + url));
    };

    image.src = url;
  });
}

// 用Promise对象实现的 Ajax 操作
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject) {
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();
  });

  return promise;
};

getJSON("/posts.json").then(
  function(json) {
    console.log("Contents: " + json);
  },
  function(error) {
    console.error("出错了", error);
  }
);
```

如果调用 resolve 函数和 reject 函数时带有参数，那么它们的参数会被传递给回调函数。reject 函数的参数通常是 Error 对象的实例，表示抛出的错误；resolve 函数的参数除了正常的值以外，还可能是另一个 Promise 实例，比如像下面这样。

```js
const p1 = new Promise(function(resolve, reject) {
  // ...
});

const p2 = new Promise(function(resolve, reject) {
  // ...
  resolve(p1);
});
```

注意，这时 p1 的状态就会传递给 p2，也就是说，p1 的状态决定了 p2 的状态。如果 p1 的状态是 pending，那么 p2 的回调函数就会等待 p1 的状态改变；如果 p1 的状态已经是 resolved 或者 rejected，那么 p2 的回调函数将会立刻执行。

```js
const p1 = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("fail")), 3000);
});

// 由于p2返回的是p1，导致p2自己的状态无效了 ==> 由p1的状态决定p2的状态
const p2 = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(p1), 1000);
});

p2.then(result => console.log(result)).catch(error => console.log(error));
// Error: fail
```

注意，调用 resolve 或 reject 并不会终结 Promise 的参数函数的执行。

```js
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
```

一般来说，调用 resolve 或 reject 以后，Promise 的使命就完成了，后继操作应该放到 then 方法里面，而不应该直接写在 resolve 或 reject 的后面。所以，最好在它们前面加上 return 语句，这样就不会有意外。

```js
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
});
```

## 3.Promise.prototype.then()

Promise 实例具有 then 方法，也就是说，then 方法是定义在原型对象 Promise.prototype 上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，then 方法的第一个参数是 resolved 状态的回调函数，第二个参数（可选）是 rejected 状态的回调函数。

then 方法返回的是一个新的 Promise 实例（注意，不是原来那个 Promise 实例）。因此可以采用链式写法，即 then 方法后面再调用另一个 then 方法。

```js
getJSON("/posts.json")
  .then(function(json) {
    return json.post;
  })
  .then(function(post) {
    // ...
  });
```

采用链式的 then，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个 Promise 对象（即有异步操作），这时后一个回调函数，就会等待该 Promise 对象的状态发生变化，才会被调用。

```js
getJSON("/post/1.json")
  .then(function(post) {
    return getJSON(post.commentURL);
  })
  .then(
    function funcA(comments) {
      console.log("resolved: ", comments);
    },
    function funcB(err) {
      console.log("rejected: ", err);
    }
  );
```

## 4.Promise.prototype.catch()

Promise.prototype.catch 方法是 `.then(null, rejection)` 或 `.then(undefined, rejection)` 的别名，用于指定发生错误时的回调函数。另外，then 方法指定的回调函数，如果运行中抛出错误，也会被 catch 方法捕获。一般来说，不要在 then 方法里面定义 Reject 状态的回调函数（即 then 的第二个参数），总是使用 catch 方法。

```js
getJSON("/posts.json")
  .then(function(posts) {
    // ...
  })
  .catch(function(error) {
    // 处理 getJSON 和 前一个回调函数运行时发生的错误
    console.log("发生错误！", error);
  });
```

跟传统的 try/catch 代码块不同的是，如果没有使用 catch 方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。

```js
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log("everything is great");
});

setTimeout(() => {
  console.log(123);
}, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123
```

如果 Promise 状态已经变成 resolved，再抛出错误是无效的。

```js
const promise = new Promise(function(resolve, reject) {
  resolve("ok");
  throw new Error("test");
});
promise
  .then(function(value) {
    console.log(value);
  })
  .catch(function(error) {
    console.log(error);
  });
// ok
```

Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个 catch 语句捕获。

```js
getJSON("/post/1.json")
  .then(function(post) {
    return getJSON(post.commentURL);
  })
  .then(function(comments) {
    // some code
  })
  .catch(function(error) {
    // 处理前面三个Promise产生的错误
  });
```

一般总是建议，Promise 对象后面要跟 catch 方法，这样可以处理 Promise 内部发生的错误。catch 方法之中，还能再抛出错误。catch 方法返回的还是一个 Promise 对象，因此后面还可以接着调用 then 方法。

```js
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing()
  .catch(function(error) {
    console.log("oh no", error);
    return "hhhhh";
  })
  .then(function(val) {
    console.log("carry on", val);
  });
// oh no [ReferenceError: x is not defined]
// carry on hhhhh
```

## 5.Promise.prototype.finally()

finally 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

```js
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

finally 方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是 fulfilled 还是 rejected。这表明，finally 方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

finally 本质上是 then 方法的特例。

```js
promise.finally(() => {
  // 语句
});

// 等同于
promise.then(
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

## 6.Promise.all()

Promise.all 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。Promise.all 方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。如果参数不是 Promise 实例，就会先调用 Promise.resolve 方法，将参数转为 Promise 实例。

`const p = Promise.all([p1, p2, p3]);`

p 的状态由 p1、p2、p3 决定，分成两种情况。

（1）只有 p1、p2、p3 的状态都变成 fulfilled，p 的状态才会变成 fulfilled，此时 p1、p2、p3 的返回值组成一个数组，传递给 p 的回调函数。

（2）只要 p1、p2、p3 之中有一个被 rejected，p 的状态就变成 rejected，此时第一个被 reject 的实例的返回值，会传递给 p 的回调函数。

```js
let p1 = new Promise((res, rej) => {
  res(1);
});
let p2 = new Promise((res, rej) => {
  res(2);
});
let p3 = new Promise((res, rej) => {
  if (Math.random() > 0.5) {
    res("res 3");
  } else {
    rej("rej 3");
  }
});
Promise.all([p1, p2, p3])
  .then(res => {
    console.log(res); //[1, 2, "res 3"]
  })
  .catch(err => {
    console.log(err); //"rej 3"
  });
```

注意，如果作为参数的 Promise 实例，自己定义了 catch 方法，那么它一旦被 rejected，并不会触发 `Promise.all()` 的 catch 方法。

```js
const p1 = new Promise((resolve, reject) => {
  resolve("hello");
})
  .then(result => {
    console.log(result); //hello
    // 没有 return 在 Promise.all 中拿不到 helloF
    return result;
  })
  .catch(e => {
    console.log(e);
    return e;
  });

const p2 = new Promise((resolve, reject) => {
  throw new Error("报错了");
})
  .then(result => {
    console.log(result);
    return result;
  })
  .catch(e => {
    // 同样，没有 return 在 Promise.all 中拿不到错误信息
    console.log(e); //Error: 报错了
    return e;
  });

Promise.all([p1, p2])
  .then(result => {
    console.log(result); //["hello", Error: 报错了]
  })
  .catch(e => {
    console.log(e);
  });
```

## 7.Promise.race()

Promise.race 方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。只要 p1、p2、p3 之中有一个实例率先改变状态，p 的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给 p 的回调函数。Promise.race 方法的参数如果不是 Promise 实例，就会先调用 Promise.resolve 方法，将参数转为 Promise 实例，再进一步处理。

`const p = Promise.race([p1, p2, p3]);`

下面是一个例子：

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("hello");
  }, 1000);
}).then(result => {
  return result;
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("好想变成一根海草");
  }, 0);
}).then(result => {
  return result;
});

Promise.race([p1, p2])
  .then(result => {
    console.log(result); //好想变成一根海草
  })
  .catch(e => {
    console.log(e);
  });
```

## 8.Promise.resolve()

有时需要将现有对象转为 Promise 对象，Promise.resolve 方法就起到这个作用。Promise.resolve 等价于下面的写法。

```js
Promise.resolve("foo");
// 等价于
new Promise(resolve => resolve("foo"));
```

Promise.resolve 方法的参数分成四种情况。

（1）参数是一个 Promise 实例

如果参数是 Promise 实例，那么 Promise.resolve 将不做任何修改、原封不动地返回这个实例。

```js
let p = new Promise((res, rej) => {
  res("eee");
});

let p1 = Promise.resolve(p);
p1 === p; //true
```

（2）参数是一个 thenable 对象

thenable 对象指的是具有 then 方法的对象，比如下面这个对象。

```js
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
```

Promise.resolve 方法会将这个对象转为 Promise 对象，然后就立即执行 thenable 对象的 then 方法。

```js
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value); // 42
});
```

（3）参数不是具有 then 方法的对象，或根本就不是对象

如果参数是一个原始值，或者是一个不具有 then 方法的对象，则 Promise.resolve 方法返回一个新的 Promise 对象，状态为 resolved。

```js
let obj = { name: "派大星" };
const p = Promise.resolve(obj);

p.then(function(s) {
  console.log(s);
});
// {name: "派大星"}

const p = Promise.resolve("Hello");

p.then(function(s) {
  console.log(s);
});
// Hello
```

（4）不带有任何参数

`Promise.resolve()` 方法允许调用时不带参数，直接返回一个 resolved 状态的 Promise 对象。所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用 `Promise.resolve()` 方法。

```js
const p = Promise.resolve();

p.then(function(s) {
  console.log(s);
});
// undefined
```

需要注意的是，立即 `resolve()` 的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。

```js
setTimeout(function() {
  console.log("three");
}, 0);

Promise.resolve(
  (() => {
    console.log("你猜我在哪里");
  })()
).then(function() {
  console.log("two");
});

console.log("one");

// 你猜我在哪里
// one
// two
// three
```

## 9.Promise.reject()

`Promise.reject(reason)` 方法也会返回一个新的 Promise 实例，该实例的状态为 rejected。

```js
const p = Promise.reject("出错了");
// 等同于
const p = new Promise((resolve, reject) => reject("出错了"));

p.then(null, function(s) {
  console.log(s);
});
// 出错了
```

注意，`Promise.reject()` 方法的参数，会原封不动地作为 reject 的理由，变成后续方法的参数。这一点与 Promise.resolve 方法不一致。

```js
const thenable = {
  then(resolve, reject) {
    reject("出错了");
  }
};

Promise.reject(thenable).catch(e => {
  console.log(e === thenable);
});
// true
```

## 10.应用

### 10.1.加载图片

我们可以将图片的加载写成一个 Promise，一旦加载完成，Promise 的状态就发生变化。

```js
const preloadImage = function(path) {
  return new Promise(function(resolve, reject) {
    const image = new Image();
    image.onload = resolve;
    image.onerror = reject;
    image.src = path;
  });
};
```

### 10.2.Generator 函数与 Promise 的结合

使用 Generator 函数管理流程，遇到异步操作的时候，通常返回一个 Promise 对象。

```js
function getFoo() {
  return new Promise(function(resolve, reject) {
    resolve("foo");
  });
}

const g = function*() {
  try {
    const foo = yield getFoo();
    console.log(foo);
  } catch (e) {
    console.log(e);
  }
};

function run(generator) {
  const it = generator();

  function go(result) {
    if (result.done) return result.value;

    return result.value.then(
      function(value) {
        return go(it.next(value));
      },
      function(error) {
        return go(it.throw(error));
      }
    );
  }

  go(it.next());
}

run(g);
```

## 11.Promise.try()

实际开发中，经常遇到一种情况：不知道或者不想区分，函数 f 是同步函数还是异步操作，但是想用 Promise 来处理它。因为这样就可以不管 f 是否包含异步操作，都用 then 方法指定下一步流程，用 catch 方法处理 f 抛出的错误。一般就会采用下面的写法。

`Promise.resolve().then(f)`

这样的写法有一个缺点，就是如果 f 是同步函数，那么它会在本轮事件循环的末尾执行。

```js
const f = () => console.log("now");
Promise.resolve().then(f);
console.log("next");
// next
// now
```

那么有没有一种方法，让同步函数同步执行，异步函数异步执行，并且让它们具有统一的 API 呢？回答是可以的，并且还有两种写法。第一种写法是用 async 函数来写。

```js
const f = () => console.log("now");
(async () => f())();
console.log("next");
// now
// next
```

需要注意的是，`async () => f()` 会吃掉 `f()` 抛出的错误。所以，如果想捕获错误，要使用 promise.catch 方法。

```js
(async () => f())()
.then(...)
.catch(...)
```

第二种写法是使用 `new Promise()`。

```js
const f = () => console.log("now");
(() => new Promise(resolve => resolve(f())))();
console.log("next");
// now
// next
```

鉴于这是一个很常见的需求，所以现在有一个提案，提供 Promise.try 方法替代上面的写法。

```js
const f = () => console.log("now");
Promise.try(f);
console.log("next");
// now
// next
```
