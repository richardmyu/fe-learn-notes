# javascript 运行机制

## 一.线程与进程

### 1.概念

官方的说法是：进程是 CPU 资源分配的最小单位；线程是 CPU 调度的最小单位。

### 2.多进程与多线程

**多进程**

在同一个时间里，同一个计算机系统中如果允许两个或两个以上的进程处于运行状态。多进程带来的好处是明显的，比如你可以听歌的同时，打开编辑器敲代码，编辑器和听歌软件的进程之间丝毫不会相互干扰。

**多线程**

程序中包含多个执行流，即在一个程序中可以同时运行多个不同的线程来执行不同的任务，也就是说允许单个程序创建多个并行执行的线程来完成各自的任务。

### 3.JavaScript 是单线程

JavaScript 语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。JavaScript 的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript 的主要用途是与用户互动，以及操作 DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。

为了利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM。所以，这个新标准并没有改变 JavaScript 单线程的本质。

## 二.浏览器内核

## 三.任务队列

### 1.概念

单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。

如果排队是因为计算量大，CPU 忙不过来，倒也算了，但是很多时候 CPU 是闲着的，因为 IO 设备（输入输出设备）很慢（比如 Ajax 操作从网络读取数据），不得不等着结果出来，再往下执行。

JavaScript 语言的设计者意识到，这时主线程完全可以不管 IO 设备，挂起处于等待中的任务，先运行排在后面的任务。等到 IO 设备返回了结果，再回过头，把挂起的任务继续执行下去。

于是，所有任务可以分成两种，一种是**同步任务**（synchronous），另一种是**异步任务**（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

具体来说，异步执行的运行机制如下。（同步执行也是如此，因为它可以被视为没有异步任务的异步执行。）

- 1.所有同步任务都在主线程上执行，形成一个**执行栈**（execution context stack）。

- 2.主线程之外，还存在一个**事件(/任务)队列**（Event queue）。只要异步任务有了运行结果，就在"事件队列"之中放置一个事件。

- 3.一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"事件队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

- 4.主线程不断重复上面的第三步。

只要主线程空了，就会去读取"任务队列"，这就是 JavaScript 的运行机制。这个过程会不断重复。

### 2.事件和回调函数

"任务队列"中的事件，除了 IO 设备的事件以外，还包括一些用户产生的事件（比如鼠标点击、页面滚动等等）。只要指定过回调函数，这些事件发生时就会进入"任务队列"，等待主线程读取。

所谓**回调函数**（callback），就是那些会被主线程挂起来的代码。异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行对应的回调函数。

"任务队列"是一个先进先出的数据结构，排在前面的事件，优先被主线程读取。主线程的读取过程基本上是自动的，只要执行栈一清空，"任务队列"上第一位的事件就自动进入主线程。但是，由于存在"定时器"功能，主线程首先要检查一下执行时间，某些事件只有到了规定的时间，才能返回主线程。

### 3.Event Loop

主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为**Event Loop**（事件循环）。之所以称之为事件循环，是因为它经常按照类似如下的方式来被实现：

```js
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
```

如果当前没有任何消息，`queue.waitForMessage()` 会同步地等待消息到达。

每一个消息完整的执行后，其它消息才会被执行。这为程序的分析提供了一些优秀的特性，包括：一个函数执行时，它永远不会被抢占，并且在其他代码运行之前完全运行（且可以修改此函数操作的数据）。这与 C 语言不同，例如，如果函数在线程中运行，它可能在任何位置被终止，然后在另一个线程中运行其他代码。

这个模型的一个缺点在于当一个消息需要太长时间才能处理完毕时，Web 应用就无法处理用户的交互，例如点击或滚动。浏览器用“程序需要过长时间运行”的对话框来缓解这个问题。一个很好的做法是缩短消息处理，并在可能的情况下将一个消息裁剪成多个消息。

![Event Loop](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014100802.png)

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

**多个运行时互相通信节**

一个 web worker 或者一个跨域的 iframe 都有自己的栈，堆和消息队列。两个不同的运行时只能通过 postMessage 方法进行通信。如果另一个运行时侦听 message 事件，则此方法会向该运行时添加消息。

### 4.任务

划分方式:

- macro-task(宏任务)：包括整体代码 script，setTimeout，setInterval
- micro-task(微任务)：Promise，process.nextTick

![Event Loop](https://segmentfault.com/img/bV1TKz?w=879&h=723)

按照这种分类方式: JS 的执行机制是

- 执行一个宏任务,过程中如果遇到微任务,就将其放到微任务的"事件队列"里
- 当前宏任务执行完成后,会查看微任务的"事件队列",并将里面全部的微任务依次执行完

#### 4.1.定时器（timer）

定时器功能主要由 `setTimeout()` 和 `setInterval()` 这两个函数来完成。

`setTimeout()` 接受两个参数，第一个是回调函数，第二个是推迟执行的毫秒数。但是这种说并不严谨，准确的解释是: n 毫秒后，`setTimeout` 里的函数被会推入 event queue，而 event queue 里的任务，只有在主线程空闲时才会执行。如果将 `setTimeout()` 的第二个参数设为 0，就表示当前代码执行完（执行栈清空）以后，立即执行（0 毫秒间隔）指定的回调函数。

总之，`setTimeout(fn,0)` 的含义是，指定某个任务在主线程最早可得的空闲时间执行，也就是说，尽可能早得执行。它在"任务队列"的尾部添加一个事件，因此要等到同步任务和"任务队列"现有的事件都处理完（执行栈清空），才会得到执行。

HTML5 标准规定了 `setTimeout()` 的第二个参数的最小值（最短间隔），不得低于 4 毫秒，如果低于这个值，就会自动增加。在此之前，老版本的浏览器都将最短间隔设为 10 毫秒。另外，对于那些 DOM 的变动（尤其是涉及页面重新渲染的部分），通常不会立即执行，而是每 16 毫秒执行一次。这时使用 `requestAnimationFrame()` 的效果要好于 `setTimeout()`。

需要注意的是，`setTimeout()` 只是将事件插入了"任务队列"，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。要是当前代码耗时很长，有可能要等很久，所以并没有办法保证，回调函数一定会在 `setTimeout()` 指定的时间执行。

## 四.Node.js 的 Event Loop

Node.js 也是单线程的 Event Loop，但是它的运行机制不同于浏览器环境。

> Node.js 在 11.0 版本开始向浏览器靠拢

![Node.js 的 Event Loop（作者@BusyRich）](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014100803.png)

根据上图，Node.js 的运行机制如下。

- 1.V8 引擎解析 JavaScript 脚本。

- 2.解析后的代码，调用 Node API。

- 3.libuv 库负责 Node API 的执行。它将不同的任务分配给不同的线程，形成一个 Event Loop（事件循环），以异步的方式将任务的执行结果返回给 V8 引擎。

- 4.V8 引擎再将结果返回给用户。

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
```

上面代码中，`setImmediate` 与 `setTimeout(fn,0)` 各自添加了一个回调函数 A 和 timeout，都是在下一次 Event Loop 触发。那么，哪个回调函数先执行呢？答案是不确定。运行结果可能是 1--3--2，也可能是 3--1--2。

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
```

上面代码中，`setImmediate` 和 `setTimeout` 被封装在一个 `setImmediate` 里面，它的运行结果总是 1--3--2，这时函数 A 一定在 timeout 前面触发。至于 2 排在 3 的后面（即函数 B 在 timeout 后面触发），是因为 `setImmediate` 总是将事件注册到下一轮 Event Loop，所以函数 A 和 timeout 是在同一轮 Loop 执行，而函数 B 在下一轮 Loop 执行。

我们由此得到了 `process.nextTick` 和 `setImmediate` 的一个重要区别：多个 `process.nextTick` 语句总是在当前"执行栈"一次执行完，多个 `setImmediate` 可能则需要多次 loop 才能执行完。事实上，这正是 Node.js 10.0 版添加 `setImmediate` 方法的原因，否则像下面这样的递归调用 `process.nextTick`，将会没完没了，主线程根本不会去读取"事件队列"！

```javascript
process.nextTick(function foo() {
  process.nextTick(foo);
});
```

事实上，现在要是你写出递归的 `process.nextTick`，Node.js 会抛出一个警告，要求你改成 `setImmediate`。

另外，由于 `process.nextTick` 指定的回调函数是在本次"事件循环"触发，而 `setImmediate` 指定的是在下次"事件循环"触发，所以很显然，前者总是比后者发生得早，而且执行效率也高（因为不用检查"任务队列"）。

### 1.轮询机制在浏览器和 Node 中的区别

### 1.1 browsing contexts

Event Loop 在 HTML 规范中的定义

> To coordinate events, user interaction, scripts, rendering, networking, and so forth, user agents must use event loops as described in this section. There are two kinds of event loops: those for browsing contexts, and those for workers.

为了协调事件、用户交互、脚本、UI 渲染、网络请求等行为，用户引擎必须使用 Event Loop。Event Loop 包含两类：基于 browsing contexts，基于 worker。二者独立。本文讨论的浏览器中的 Event Loop 基于 browsing contexts。

> 浏览器上下文 是一个将 document 对象呈现给用户的环境。

![图解Event Loop](https://raw.githubusercontent.com/aooy/aooy.github.io/master/blog/issues5/img/eventLoop.jpg)

- **task**

一个 Event Loop 中有 一个或多个 task 队列。来自不同任务源的 task 会放入不同的 task 队列中：比如，用户代理会为鼠标键盘事件分配一个 task 队列，为其他的事件分配另外的队列。

task 执行顺序是由进入队列的时间决定的，先进队列的先被执行。

典型的任务源有以下几种（Generic task sources）：

---

- DOM 操作任务源：响应 DOM 操作
- 用户交互任务源：对用户交互作出反应，例如键盘或鼠标输入。响应用户操作的事件（例如 click）必须使用 task 队列
- 网络任务源：响应网络活动
- history traversal 任务源：当调用 `history.back()` 等类似的 api 时，将任务插进 task 队列

---

> task 在网上也被称为 macrotask 可能是为了和 microtask 做对照。但是规范中并不是这么描述任务的。

除了上述 task 来源，常见的来源还有 数据库操作、setTimeout/setInterval 等，可以概括为以下几种

---

- script 代码
- setTimeout/setInterval
- I/O
- UI 交互
- setImmediate(nodejs 环境中)

---

- **Microtask**

一个 Event Loop 中只有一个 microtask 队列，通常下面几种任务被认为是 microtask

---

- promise（promise 的 then 和 catch 才是 microtask，本身其内部的代码并不是）
- MutationObserver
- process.nextTick(nodejs 环境中)

---

- **Event Loop 循环过程**

一个 Event Loop 只要存在，就会不断执行下边的步骤：

---

- 1.在所有 task 队列中选择一个最早进队列的 task，用户代理可以选择任何 task 队列，如果没有可选的任务，则跳到 6Microtasks 步骤

- 2.将前一步选择的 task 设置为 currently running task

- 3.Run: 运行被选择的 task

- 4.运行结束之后，将 event loop 的 currently running task 置为 null

- 5.从 task 队列里移除前边 Run 里运行的 task

- 6.Microtasks: 执行 microtasks 任务检查点。（也就是执行 microtasks 队列里的任务）

- 7.更新渲染（可能会发生）

- 8.如果这是一个 worker event loop，但是 task 队列中没有任务，并且 WorkerGlobalScope 对象的 closing 标识为 true，则销毁 Event Loop，中止这些步骤，然后 run a worker

- 9.返回到第 1 步

---

简化一下上面的步骤，可以用下面的伪代码描述 Event Loop 循环过程：

> 一个宏任务，所有微任务（，更新渲染），一个宏任务，所有微任务（，更新渲染）......
> 执行完 microtask 队列里的任务，有可能会渲染更新。在一帧以内的多次 dom 变动浏览器不会立即响应，而是会积攒变动以最高 60HZ 的频率更新视图。

![Event Loop 循环过程](https://camo.githubusercontent.com/0f06e87b8257a838886422e139eff9bc5d683f6e/68747470733a2f2f692e6c6f6c692e6e65742f323031382f30372f30352f356233646364383536663536632e706e67)

### 1.2 node

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

---

- Timers Queue `setTimeout()` `setInterval()` 设定的回调函数
- I/O Queue 几乎所有的回调，除了 timers、close callbacks、check 阶段的回调
- Check Queue `setImmediate()` 设定的回调函数
- Close Queue 比如 `socket.on('close', ...)`

---

## 参考

[JavaScript 运行机制详解：再谈 Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

[并发模型与事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)

[Node.js 事件循环，定时器和 process.nextTick()](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/#what-is-the-event-loop)

[浏览器与 Node 的事件循环(Event Loop)有何区别?](https://juejin.im/post/5c337ae06fb9a049bc4cd218)
