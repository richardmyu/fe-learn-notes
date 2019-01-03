## 六.语法专题

### 1.异步操作概述

#### 1.1.单线程模型

单线程模型指的是，JavaScript 只在一个线程上运行。也就是说，JavaScript 同时只能执行一个任务，其他任务都必须在后面排队等待。

注意，JavaScript 只在一个线程上运行，不代表 JavaScript 引擎只有一个线程。事实上，JavaScript 引擎有多个线程，单个脚本只能在一个线程上运行（称为**主线程**），其他线程都是在后台配合。

JavaScript 之所以采用单线程，而不是多线程，跟历史有关系。JavaScript 从诞生起就是单线程，原因是不想让浏览器变得太复杂，因为多线程需要共享资源、且有可能修改彼此的运行结果，对于一种网页脚本语言来说，这就太复杂了。

如果 JavaScript 同时有两个线程，一个线程在网页 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？是不是还要有锁机制？所以，为了避免复杂性，JavaScript 一开始就是单线程，这已经成了这门语言的核心特征，将来也不会改变。

这种模式的好处是实现起来比较简单，执行环境相对单纯；坏处是只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。常见的浏览器无响应（假死），往往就是因为某一段 JavaScript 代码长时间运行（比如死循环），导致整个页面卡在这个地方，其他任务无法执行。

JavaScript 语言本身并不慢，慢的是读写外部数据，比如等待 Ajax 请求返回结果。这个时候，如果对方服务器迟迟没有响应，或者网络不通畅，就会导致脚本的长时间停滞。

如果排队是因为计算量大，CPU 忙不过来，倒也算了，但是很多时候 CPU 是闲着的，因为 IO 操作（输入输出）很慢（比如 Ajax 操作从网络读取数据），不得不等着结果出来，再往下执行。JavaScript 语言的设计者意识到，这时 CPU 完全可以不管 IO 操作，挂起处于等待中的任务，先运行排在后面的任务。等到 IO 操作返回了结果，再回过头，把挂起的任务继续执行下去。这种机制就是 JavaScript 内部采用的**事件循环（Event Loop）**机制。

单线程模型虽然对 JavaScript 构成了很大的限制，但也因此使它具备了其他语言不具备的优势。如果用得好，JavaScript 程序是不会出现堵塞的，这就是为什么 Node 可以用很少的资源，应付大流量访问的原因。

为了利用多核 CPU 的计算能力，HTML5 提出 `Web Worker` 标准，允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM。所以，这个新标准并没有改变 JavaScript 单线程的本质。

#### 1.2.同步任务和异步任务

程序里面所有的任务，可以分成两类：**同步任务（synchronous）**和**异步任务（asynchronous）**。

同步任务是那些没有被引擎挂起、在主线程上排队执行的任务。只有前一个任务执行完毕，才能执行后一个任务。

异步任务是那些被引擎放在一边，不进入主线程、而进入任务队列的任务。只有引擎认为某个异步任务可以执行了（比如 Ajax 操作从服务器得到了结果），该任务（采用回调函数的形式）才会进入主线程执行。排在异步任务后面的代码，不用等待异步任务结束会马上运行，也就是说，异步任务不具有”堵塞“效应。

举例来说，Ajax 操作可以当作同步任务处理，也可以当作异步任务处理，由开发者决定。如果是同步任务，主线程就等着 Ajax 操作返回结果，再往下执行；如果是异步任务，主线程在发出 Ajax 请求以后，就直接往下执行，等到 Ajax 操作有了结果，主线程再执行对应的回调函数。

#### 1.3.任务队列和事件循环

JavaScript 运行时，除了一个正在运行的主线程，引擎还提供一个**任务队列（task queue）**，里面是各种需要当前程序处理的异步任务。（实际上，根据异步任务的类型，存在多个任务队列。为了方便理解，这里假设只存在一个队列。）

首先，主线程会去执行所有的同步任务。等到同步任务全部执行完，就会去看任务队列里面的异步任务。如果满足条件，那么异步任务就重新进入主线程开始执行，这时它就变成同步任务了。等到执行完，下一个异步任务再进入主线程开始执行。一旦任务队列清空，程序就结束执行。

异步任务的写法通常是回调函数。一旦异步任务重新进入主线程，就会执行对应的回调函数。如果一个异步任务没有回调函数，就不会进入任务队列，也就是说，不会重新进入主线程，因为没有用回调函数指定下一步的操作。

JavaScript 引擎怎么知道异步任务有没有结果，能不能进入主线程呢？答案就是引擎在不停地检查，一遍又一遍，只要同步任务执行完了，引擎就会去检查那些挂起来的异步任务，是不是可以进入主线程了。这种循环检查的机制，就叫做**事件循环（Event Loop）**。维基百科的定义是：“事件循环是一个程序结构，用于等待和发送消息和事件（a programming construct that waits for and dispatches events or messages in a program）”。

#### 1.4.异步操作的模式

##### 1.4.1 回调函数

回调函数是异步操作最基本的方法。

下面是两个函数 f1 和 f2，编程的意图是 f2 必须等到 f1 执行完成，才能执行。

```javascript
function f1() {
  // ...
}
function f2() {
  // ...
}
f1();
f2();
```

上面代码的问题在于，如果 f1 是异步操作，f2 会立即执行，不会等到 f1 结束再执行。

这时，可以考虑改写 f1，把 f2 写成 f1 的回调函数。

```javascript
function f1(callback) {
  // ...
  callback();
}
function f2() {
  // ...
}
f1(f2);
```

回调函数的优点是简单、容易理解和实现，缺点是不利于代码的阅读和维护，各个部分之间**高度耦合（coupling）**，使得程序结构混乱、流程难以追踪（尤其是多个回调函数嵌套的情况），而且每个任务只能指定一个回调函数。

##### 1.4.2 事件监听

另一种思路是采用**事件驱动模式**。异步任务的执行不取决于代码的顺序，而取决于某个事件是否发生。

还是以 f1 和 f2 为例。首先，为 f1 绑定一个事件（这里采用的 jQuery 的写法）。

`f1.on('done', f2);`

上面这行代码的意思是，当 f1 发生 done 事件，就执行 f2。然后，对 f1 进行改写：

```javascript
function f1() {
  setTimeout(function() {
    // ...
    f1.trigger("done");
  }, 1000);
}
```

上面代码中，`f1.trigger('done')`表示，执行完成后，立即触发 done 事件，从而开始执行 f2。

这种方法的优点是比较容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，而且可以**去耦合（decoupling）**，有利于实现模块化。缺点是整个程序都要变成事件驱动型，运行流程会变得很不清晰。阅读代码的时候，很难看出主流程。

##### 1.4.3 发布/订阅

事件完全可以理解成”信号“，如果存在一个”信号中心“，某个任务执行完成，就向信号中心**发布（publish）**一个信号，其他任务可以向信号中心**订阅（subscribe）**这个信号，从而知道什么时候自己可以开始执行。这就叫做**”发布/订阅模式”（publish-subscribe pattern）**，又称**“观察者模式”（observer pattern）**。

这个模式有多种实现，下面采用的是 Ben Alman 的 Tiny Pub/Sub，这是 jQuery 的一个插件。

首先，f2 向信号中心 jQuery 订阅 done 信号。

`jQuery.subscribe('done', f2);`

然后，f1 进行如下改写。

```javascript
function f1() {
  setTimeout(function() {
    // ...
    jQuery.publish("done");
  }, 1000);
}
```

上面代码中，`jQuery.publish('done')`的意思是，f1 执行完成后，向信号中心 jQuery 发布 done 信号，从而引发 f2 的执行。

f2 完成执行后，可以**取消订阅（unsubscribe）**。

`jQuery.unsubscribe('done', f2);`

这种方法的性质与“事件监听”类似，但是明显优于后者。因为可以通过查看“消息中心”，了解存在多少信号、每个信号有多少订阅者，从而监控程序的运行。

#### 1.5.异步操作的流程控制

如果有多个异步操作，就存在一个流程控制的问题：如何确定异步操作执行的顺序，以及如何保证遵守这种顺序。

```javascript
function async(arg, callback) {
  console.log("参数为 " + arg + " , 1秒后返回结果");
  setTimeout(function() {
    callback(arg * 2);
  }, 1000);
}
```

上面代码的 async 函数是一个异步任务，非常耗时，每次执行需要 1 秒才能完成，然后再调用回调函数。

如果有六个这样的异步任务，需要全部完成后，才能执行最后的 final 函数。请问应该如何安排操作流程？

```javascript
function final(value) {
  console.log("完成: ", value);
}

async(1, function(value) {
  async(value, function(value) {
    async(value, function(value) {
      async(value, function(value) {
        async(value, function(value) {
          async(value, final);
        });
      });
    });
  });
});
```

上面代码中，六个回调函数的嵌套，不仅写起来麻烦，容易出错，而且难以维护。

##### 1.5.1 串行执行

我们可以编写一个流程控制函数，让它来控制异步任务，一个任务完成以后，再执行另一个，这就叫**串行执行**。

```javascript
var items = [1, 2, 3, 4, 5, 6];
var results = [];

function async(arg, callback) {
  console.log("参数为 " + arg + " , 1秒后返回结果");
  setTimeout(function() {
    callback(arg * 2);
  }, 1000);
}

function final(value) {
  console.log("完成: ", value);
}

function series(item) {
  if (item) {
    async(item, function(result) {
      results.push(result);
      return series(items.shift());
    });
  } else {
    return final(results[results.length - 1]);
  }
}

series(items.shift());
```

上面代码中，函数 series 就是串行函数，它会依次执行异步任务，所有任务都完成后，才会执行 final 函数。items 数组保存每一个异步任务的参数，results 数组保存每一个异步任务的运行结果。

注意，上面的写法需要六秒，才能完成整个脚本。

##### 1.5.2 并行执行

流程控制函数也可以是**并行执行**，即所有异步任务同时执行，等到全部完成以后，才执行 final 函数。

```javascript
var items = [1, 2, 3, 4, 5, 6];
var results = [];

function async(arg, callback) {
  console.log("参数为 " + arg + " , 1秒后返回结果");
  setTimeout(function() {
    callback(arg * 2);
  }, 1000);
}

function final(value) {
  console.log("完成: ", value);
}

items.forEach(function(item) {
  async(item, function(result) {
    results.push(result);
    if (results.length === items.length) {
      final(results[results.length - 1]);
    }
  });
});
```

上面代码中，`forEach`方法会同时发起六个异步任务，等到它们全部完成以后，才会执行 final 函数。

相比而言，上面的写法只要一秒，就能完成整个脚本。这就是说，并行执行的效率较高，比起串行执行一次只能执行一个任务，较为节约时间。但是问题在于如果并行的任务较多，很容易耗尽系统资源，拖慢运行速度。因此有了第三种流程控制方式。

##### 1.5.3 并行与串行的结合

所谓并行与串行的结合，就是设置一个门槛，每次最多只能并行执行 n 个异步任务，这样就避免了过分占用系统资源。

```javascript
var items = [1, 2, 3, 4, 5, 6];
var results = [];
var running = 0;
var limit = 2;

function async(arg, callback) {
  console.log("参数为 " + arg + " , 1秒后返回结果");
  setTimeout(function() {
    callback(arg * 2);
  }, 1000);
}

function final(value) {
  console.log("完成: ", value);
}

function launcher() {
  while (running < limit && items.length > 0) {
    var item = items.shift();
    async(item, function(result) {
      results.push(result);
      running--;
      if (items.length > 0) {
        launcher();
      } else if (running == 0) {
        final(results);
      }
    });
    running++;
  }
}

launcher();
```

上面代码中，最多只能同时运行两个异步任务。变量 running 记录当前正在运行的任务数，只要低于门槛值，就再启动一个新的任务，如果等于 0，就表示所有任务都执行完了，这时就执行 final 函数。

这段代码需要三秒完成整个脚本，处在串行执行和并行执行之间。通过调节 limit 变量，达到效率和资源的最佳平衡。


## 4 javascript 运行机制

### 4.1 任务队列

具体来说，异步执行的运行机制如下。

（1）所有同步任务都在主线程上执行，形成一个**执行栈**（execution context stack）。

（2）主线程之外，还存在一个**事件(/任务)队列**（Event queue）。只要异步任务有了运行结果，就在"事件队列"之中放置一个事件。

（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"事件队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

（4）主线程不断重复上面的第三步。

![异步执行的运行机制](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014100801.jpg)

只要主线程空了，就会去读取"任务队列"，这就是 JavaScript 的运行机制。这个过程会不断重复。

### 4.2 事件和回调函数

"任务队列"中的事件，除了 IO 设备的事件以外，还包括一些用户产生的事件（比如鼠标点击、页面滚动等等）。只要指定过回调函数，这些事件发生时就会进入"任务队列"，等待主线程读取。

所谓**回调函数**（callback），就是那些会被主线程挂起来的代码。异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行对应的回调函数。

"任务队列"是一个先进先出的数据结构，排在前面的事件，优先被主线程读取。主线程的读取过程基本上是自动的，只要执行栈一清空，"任务队列"上第一位的事件就自动进入主线程。但是，由于存在"定时器"功能，主线程首先要检查一下执行时间，某些事件只有到了规定的时间，才能返回主线程。

### 4.3 Event Loop

主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为**Event Loop**（事件循环）。

![Event Loop（转引自Philip Roberts的演讲《Help, I'm stuck in an event-loop》）](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014100802.png)

上图中，主线程运行的时候，产生堆（heap）和栈（stack），栈中的代码调用各种外部 API，它们在"任务队列"中加入各种事件（click，load，done）。只要栈中的代码执行完毕，主线程就会去读取"任务队列"，依次执行那些事件所对应的回调函数。**执行栈中的代码（同步任务），总是在读取"任务队列"（异步任务）之前执行**。

```javascript
setTimeout(function() {
  console.log("定时器开始啦");
});

new Promise(function(resolve) {
  console.log("马上执行for循环啦");
  for (var i = 0; i < 10000; i++) {
    i == 99 && resolve();
  }
}).then(function() {
  console.log("执行then函数啦");
});

console.log("代码执行结束");
// 马上执行for循环啦
// 代码执行结束
// 执行then函数啦
// 定时器开始啦
```

划分方式:

- macro-task(宏任务)：包括整体代码 script，setTimeout，setInterval
- micro-task(微任务)：Promise，process.nextTick

![Event Loop](https://segmentfault.com/img/bV1TKz?w=879&h=723)

按照这种分类方式: JS 的执行机制是

- 执行一个宏任务,过程中如果遇到微任务,就将其放到微任务的"事件队列"里
- 当前宏任务执行完成后,会查看微任务的"事件队列",并将里面全部的微任务依次执行完

### 4.4 定时器（timer）

定时器功能主要由 `setTimeout()` 和 `setInterval()` 这两个函数来完成，它们的内部运行机制完全一样，区别在于前者指定的代码是一次性执行，后者则为反复执行。

`setTimeout()` 接受两个参数，第一个是回调函数，第二个是推迟执行的毫秒数。但是这种说并不严谨,准确的解释是: n 毫秒后,`setTimeout` 里的函数被会推入 event queue,而 event queue 里的任务,只有在主线程空闲时才会执行。如果将 `setTimeout()` 的第二个参数设为 0，就表示当前代码执行完（执行栈清空）以后，立即执行（0 毫秒间隔）指定的回调函数。

总之，`setTimeout(fn,0)` 的含义是，指定某个任务在主线程最早可得的空闲时间执行，也就是说，尽可能早得执行。它在"任务队列"的尾部添加一个事件，因此要等到同步任务和"任务队列"现有的事件都处理完（执行栈清空），才会得到执行。

HTML5 标准规定了 `setTimeout()` 的第二个参数的最小值（最短间隔），不得低于 4 毫秒，如果低于这个值，就会自动增加。在此之前，老版本的浏览器都将最短间隔设为 10 毫秒。另外，对于那些 DOM 的变动（尤其是涉及页面重新渲染的部分），通常不会立即执行，而是每 16 毫秒执行一次。这时使用 `requestAnimationFrame()` 的效果要好于 `setTimeout()`。

需要注意的是，`setTimeout()` 只是将事件插入了"任务队列"，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。要是当前代码耗时很长，有可能要等很久，所以并没有办法保证，回调函数一定会在 `setTimeout()` 指定的时间执行。

### 4.5 Node.js 的 Event Loop

Node.js 也是单线程的 Event Loop，但是它的运行机制不同于浏览器环境。

![Node.js 的 Event Loop（作者@BusyRich）](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014100803.png)

根据上图，Node.js 的运行机制如下。

-（1）V8 引擎解析 JavaScript 脚本。

-（2）解析后的代码，调用 Node API。

-（3）libuv 库负责 Node API 的执行。它将不同的任务分配给不同的线程，形成一个 Event Loop（事件循环），以异步的方式将任务的执行结果返回给 V8 引擎。

-（4）V8 引擎再将结果返回给用户。

除了 `setTimeout` 和 `setInterval` 这两个方法，Node.js 还提供了另外两个与"任务队列"有关的方法：`process.nextTick` 和 `setImmediate`。它们可以帮助我们加深对"任务队列"的理解。

`process.nextTick` 方法可以在*当前*"执行栈"的尾部 ---- 下一次 Event Loop（主线程读取"任务队列"）之前 ---- 触发回调函数。也就是说，它指定的任务总是发生在所有异步任务之前。

`setImmediate` 方法则是在*当前*"任务队列"的尾部添加事件，也就是说，它指定的任务总是在下一次 Event Loop 时执行，这与 `setTimeout(fn, 0)` 很像。请看下面的例子。

```javascript
process.nextTick(function A() {
  console.log(1);
  process.nextTick(function B() {
    console.log(2);
  });
});

setTimeout(function timeout() {
  console.log(3);
}, 0);
// 1
// 2
// 3
```

上面代码中，由于 `process.nextTick` 方法指定的回调函数，总是在当前"执行栈"的尾部触发，所以不仅函数 A 比 `setTimeout` 指定的回调函数 timeout 先执行，而且函数 B 也比 timeout 先执行。这说明，如果有多个 `process.nextTick` 语句（不管它们是否嵌套），将全部在当前"执行栈"执行。

现在，再看 `setImmediate`。

```javascript
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
```

上面代码中，`setImmediate` 与 `setTimeout(fn,0)` 各自添加了一个回调函数 A 和 timeout，都是在下一次 Event Loop 触发。那么，哪个回调函数先执行呢？答案是不确定。运行结果可能是 1--TIMEOUT FIRED--2，也可能是 TIMEOUT FIRED--1--2。

令人困惑的是，Node.js 文档中称，`setImmediate` 指定的回调函数，总是排在 `setTimeout` 前面。实际上，这种情况只发生在递归调用的时候。

```javascript
setImmediate(function() {
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
```

上面代码中，`setImmediate` 和 `setTimeout` 被封装在一个 `setImmediate` 里面，它的运行结果总是 1--TIMEOUT FIRED--2（？？？实践的结果是 TIMEOUT FIRED--1--2），这时函数 A 一定在 timeout 前面触发。至于 2 排在 TIMEOUT FIRED 的后面（即函数 B 在 timeout 后面触发），是因为 `setImmediate` 总是将事件注册到下一轮 Event Loop，所以函数 A 和 timeout 是在同一轮 Loop 执行，而函数 B 在下一轮 Loop 执行。

> 实践代码见 <a href="./stack.js">stack.js</a>

我们由此得到了 `process.nextTick` 和 `setImmediate` 的一个重要区别：多个 `process.nextTick` 语句总是在当前"执行栈"一次执行完，多个 `setImmediate` 可能则需要多次 loop 才能执行完。事实上，这正是 Node.js 10.0 版添加 `setImmediate` 方法的原因，否则像下面这样的递归调用 `process.nextTick`，将会没完没了，主线程根本不会去读取"事件队列"！

```javascript
process.nextTick(function foo() {
  process.nextTick(foo);
});
```

事实上，现在要是你写出递归的 `process.nextTick`，Node.js 会抛出一个警告，要求你改成 `setImmediate`。

另外，由于 `process.nextTick` 指定的回调函数是在本次"事件循环"触发，而 `setImmediate` 指定的是在下次"事件循环"触发，所以很显然，前者总是比后者发生得早，而且执行效率也高（因为不用检查"任务队列"）。

### 4.6 轮询机制在浏览器和 Node 中的区别

#### 4.6.1 browsing contexts

Event Loop 在 HTML 规范中的定义

> To coordinate events, user interaction, scripts, rendering, networking, and so forth, user agents must use event loops as described in this section. There are two kinds of event loops: those for browsing contexts, and those for workers.

为了协调事件、用户交互、脚本、UI 渲染、网络请求等行为，用户引擎必须使用 Event Loop。Event Loop 包含两类：基于 browsing contexts，基于 worker。二者独立。本文讨论的浏览器中的 Event Loop 基于 browsing contexts。

> 浏览器上下文 是一个将 document 对象呈现给用户的环境。

![图解Event Loop](https://raw.githubusercontent.com/aooy/aooy.github.io/master/blog/issues5/img/eventLoop.jpg)

- **task**

一个 Event Loop 中有 一个或多个 task 队列。来自不同任务源的 task 会放入不同的 task 队列中：比如，用户代理会为鼠标键盘事件分配一个 task 队列，为其他的事件分配另外的队列。

task 执行顺序是由进入队列的时间决定的，先进队列的先被执行。

典型的任务源有以下几种（Generic task sources）：

- --

- DOM 操作任务源：响应 DOM 操作
- 用户交互任务源：对用户交互作出反应，例如键盘或鼠标输入。响应用户操作的事件（例如 click）必须使用 task 队列
- 网络任务源：响应网络活动
- history traversal 任务源：当调用 `history.back()` 等类似的 api 时，将任务插进 task 队列

- --

> task 在网上也被称为 macrotask 可能是为了和 microtask 做对照。但是规范中并不是这么描述任务的。

除了上述 task 来源，常见的来源还有 数据库操作、setTimeout/setInterval 等，可以概括为以下几种

- --

- script 代码
- setTimeout/setInterval
- I/O
- UI 交互
- setImmediate(nodejs 环境中)

- --

- **Microtask**

一个 Event Loop 中只有一个 microtask 队列，通常下面几种任务被认为是 microtask

- --

- promise（promise 的 then 和 catch 才是 microtask，本身其内部的代码并不是）
- MutationObserver
- process.nextTick(nodejs 环境中)

- --

- **Event Loop 循环过程**

一个 Event Loop 只要存在，就会不断执行下边的步骤：

- --

- 1.在所有 task 队列中选择一个最早进队列的 task，用户代理可以选择任何 task 队列，如果没有可选的任务，则跳到 6Microtasks 步骤

- 2.将前一步选择的 task 设置为 currently running task

- 3.Run: 运行被选择的 task

- 4.运行结束之后，将 event loop 的 currently running task 置为 null

- 5.从 task 队列里移除前边 Run 里运行的 task

- 6.Microtasks: 执行 microtasks 任务检查点。（也就是执行 microtasks 队列里的任务）

- 7.更新渲染（可能会发生）

- 8.如果这是一个 worker event loop，但是 task 队列中没有任务，并且 WorkerGlobalScope 对象的 closing 标识为 true，则销毁 Event Loop，中止这些步骤，然后 run a worker

- 9.返回到第 1 步

- --

简化一下上面的步骤，可以用下面的伪代码描述 Event Loop 循环过程：

> 一个宏任务，所有微任务（，更新渲染），一个宏任务，所有微任务（，更新渲染）......
> 执行完 microtask 队列里的任务，有可能会渲染更新。在一帧以内的多次 dom 变动浏览器不会立即响应，而是会积攒变动以最高 60HZ 的频率更新视图。

![Event Loop 循环过程](https://camo.githubusercontent.com/0f06e87b8257a838886422e139eff9bc5d683f6e/68747470733a2f2f692e6c6f6c692e6e65742f323031382f30372f30352f356233646364383536663536632e706e67)

#### 4.6.2 node

Node 中的 Event Loop 由 libuv 库实现，它为 Node.js 提供了跨平台，线程池，事件池，异步 I/O 等能力。

Event Loop 是 libuv 的核心所在，js 是单线程的，会把回调和任务交给 libuv
何时来调用回调就是 libuv 实现的 Event Loop 来控制的。

Event Loop 首先会在内部维持多个事件队列，比如 时间队列、网络队列等等，而 libuv 会执行一个相当于 while true 的无限循环，不断的检查各个事件队列上面是否有需要处理的 pending 状态事件，如果有则按顺序去触发队列里面保存的事件，同时由于 libuv 的事件循环每次只会执行一个回调，从而避免了竞争的发生。

```javascript

  |-->   timer
  |        |
  |        |
  |    I/O callbacks
  |        |
  |        |
  |    idle,prepare
  |        |
  |        |                  incoming:
  |      poll <-------------  connections,
  |        |                  data,etc.
  |        |
  |      check
  |        |
  |        |
  |--> close callbacks

```

事件循环必须跑完这六个阶段才算一个轮回。每个阶段都有一个回调函数 FIFO（先进先出）队列。

Event Loop 进入一个阶段会执行里面所有的操作，然后执行回调函数，直到队列消耗尽，或是回调函数执行数量达到最大限制，清理 `nextTickQueue/microtasks` 之后进入下一个阶段。

阶段里的执行队列：

- --

- Timers Queue `setTimeout()` `setInterval()` 设定的回调函数
- I/O Queue 几乎所有的回调，除了 timers、close callbacks、check 阶段的回调
- Check Queue `setImmediate()` 设定的回调函数
- Close Queue 比如 `socket.on('close', ...)`

- --
