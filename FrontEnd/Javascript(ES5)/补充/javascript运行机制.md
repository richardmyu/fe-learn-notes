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

JavaScript 语言的一大特点就是单线程。JavaScript 的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript 的主要用途是与用户互动，以及操作 DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。

为了利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM。所以，这个新标准并没有改变 JavaScript 单线程的本质。

## 二.浏览器内核

## 三.任务队列

一个 JavaScript 运行时包含了一个待处理的消息队列。每一个消息都关联着一个用以处理这个消息的函数。

在事件循环期间的某个时刻，运行时从最先进入队列的消息开始处理队列中的消息。为此，这个消息会被移出队列，并作为输入参数调用与之关联的函数。正如前面所提到的，调用一个函数总是会为其创造一个新的栈帧。

函数的处理会一直进行到执行栈再次为空为止；然后事件循环将会处理队列中的下一个消息（如果还有的话）。

### 1.概念

任务可以分成两种，一种是**同步任务**（synchronous），另一种是**异步任务**（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"**任务队列**"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

具体来说，js 的运行机制大体如下：

1. 所有同步任务都在主线程上执行，形成一个**执行栈**（execution context stack）。

2. 主线程之外，还存在一个**事件(/任务)队列**（Event queue）。只要异步任务有了运行结果，就在"事件队列"之中放置一个事件。

3. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"事件队列"，进入执行栈，开始执行。

4. 主线程不断重复上面的第三步。

### 2.事件和回调函数

"任务队列"中的事件，除了 IO 设备的事件以外，还包括一些用户产生的事件（比如鼠标点击、页面滚动等等）。只要指定过回调函数，这些事件发生时就会进入"任务队列"，等待主线程读取。

所谓**回调函数**（callback），就是那些会被主线程挂起来的代码。异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行对应的回调函数。（？？？）

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

不同的任务源会被分配到不同的 Task 队列中，任务源可以分为 **微任务**（microtask） 和 **宏任务**（macrotask）。在 ES6 规范中，microtask 称为 **jobs**，macrotask 称为 **task**。

Tasks 被列入队列，于是浏览器能从它的内部转移到 Javascript/DOM 领地，并且确使这些 tasks 按序执行。在 tasks 之间，浏览器可以更新渲染。来自鼠标点击的事件回调需要安排一个 task，解析 HTML 和 setTimeout 同样需要。setTimeout 延迟给定的时间，然后为它的回调安排一个新的 task。

Mircotasks 通常用于安排一些事，它们应该在正在执行的代码之后立即发生，例如响应操作，或者让操作异步执行，以免付出一个全新 task 的代价。mircotask 队列在回调之后处理，只要没有其它执行当中的（mid-execution）代码；或者在每个 task 的末尾处理。在处理 microtasks 队列期间，新添加的 microtasks 添加到队列的末尾并且也被执行。

promise 来自 ECMAScript 规范而不是 HTML 规范。ECAMScript 有一个概念 job，和 microtask 相似，但是两者的关系在邮件列表讨论中没有明确。不过，一般共识是 promise 应该是 microtask 队列的一部分，并且有充足的理由。

将 promise 当作 task 会导致性能问题，因为回调可能不必要地被与 task 相关的事（比如渲染）延迟。与其它 task 来源交互时它也导致不确定性，也会打断与其它 API 的交互。

划分方式:

- macrotask(宏任务)：
  - script
  - setTimeout
  - setInterval
  - setImmediate
  - I/O
  - UI rendering
- microtask(微任务)：
  - process.nextTick
  - Promise
  - Object.observe
  - MutationObserver

按照这种分类方式: JS 的执行机制是

- 执行同步代码，这属于宏任务
- 执行栈为空，查询是否有微任务需要执行
- 执行所有微任务
- 必要的话渲染 UI
- 然后开始下一轮 Event loop，执行宏任务中的异步代码

通过上述的 Event loop 顺序可知，如果宏任务中的异步代码有大量的计算并且需要操作 DOM 的话，为了更快的响应界面响应，我们可以把操作 DOM 放入微任务中。

## 四.Node.js 的 Event Loop

事件循环是 Node.js 处理非阻塞 I/O 操作的机制——尽管 JavaScript 是单线程处理的——当有可能的时候，它们会把操作转移到系统内核中去。

![Node.js 的 Event Loop](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014100803.png)

根据上图，Node.js 的运行机制如下。

1. V8 引擎解析 JavaScript 脚本。

2. 解析后的代码，调用 Node API。

3. libuv 库负责 Node API 的执行。它将不同的任务分配给不同的线程，形成一个 Event Loop（事件循环），以异步的方式将任务的执行结果返回给 V8 引擎。

4. V8 引擎再将结果返回给用户。

### 1.事件轮询机制解析

当 Node.js 启动后，它会初始化事件轮询；处理已提供的输入脚本（或丢入 REPL，本文不涉及到），它可能会调用一些异步的 API 函数调用，安排任务处理事件，或者调用 `process.nextTick()`，然后开始处理事件循环。

下面的图表显示了事件循环的概述以及操作顺序。

```javascript
// 每一步都是事件循环机制的一个阶段

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
  |<-- close callbacks

```

每个阶段都有一个 FIFO 队列来执行回调。虽然每个阶段都是特殊的，但通常情况下，当事件循环进入给定的阶段时，它将执行特定于该阶段的任何操作，然后在该阶段的队列中执行回调，直到队列用尽或最大回调数已执行。当该队列已用尽或达到回调限制，事件循环将移动到下一阶段，等等。

由于这些操作中的任何一个都可能计划 更多的 操作，并且在 轮询 阶段处理的新事件由内核排队，因此在处理轮询事件时，轮询事件可以排队。因此，长时间运行回调可以允许轮询阶段运行大量长于计时器的阈值。

**阶段概述**

- timers 定时器：本阶段执行已经安排的 `setTimeout()` 和 `setInterval()` 的回调函数。
- pending callbacks 待定回调：执行延迟到下一个循环迭代的 I/O 回调。
- idle, prepare：仅系统内部使用。
- poll 轮询：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，它们由计时器和 `setImmediate()` 排定的之外），其余情况 node 将在此处阻塞。
- check 检测：`setImmediate()` 回调函数在这里执行。
- close callbacks 关闭的回调函数：一些准备关闭的回调函数，如：`socket.on('close', ...)`。

在每次运行的事件循环之间，Node.js 检查它是否在等待任何异步 I/O 或计时器，如果没有的话，则关闭干净。

### 2.阶段的详细概述

#### 2.1.timers

计时器指定可执行所提供回调的**阈值**，而不是用户希望其执行的确切时间。计时器回调将尽可能早地运行，因为它们可以在指定的时间间隔后进行调度。但是，操作系统调度或其它回调的运行可能会延迟它们。

> 注意：轮询 阶段控制何时定时器执行。

#### 2.2.pending callbacks

此阶段对某些系统操作（如 TCP 错误类型）执行回调。例如，如果 TCP 套接字在尝试连接时接收到 ECONNREFUSED，则某些 \*nix 的系统希望等待报告错误。这将被排队以在 pending callbacks 阶段执行。

#### 2.3.poll

poll 阶段有两个重要的功能：

- 1.计算应该阻塞和轮询 I/O 的时间。
- 2.然后，处理 poll 队列里的事件。

当事件循环进入 poll 阶段且没有计划计时器时，将发生以下两种情况之一：

- 如果 poll 队列 不是空的，事件循环将循环访问其回调队列并同步执行它们，直到队列已用尽，或者达到了与系统相关的硬限制。
- 如果 poll 队列 是空的，还有两件事发生：
  - 如果脚本已按 `setImmediate()` 排定，则事件循环将结束 poll 阶段，并继续 check 阶段以执行这些计划脚本。
  - 如果脚本尚未按 `setImmediate()` 排定，则事件循环将等待回调添加到队列中，然后立即执行。

一旦 poll 队列为空，事件循环将检查 已达到时间阈值的计时器。如果一个或多个计时器已准备就绪，则事件循环将绕回计时器阶段以执行这些计时器的回调。

#### 2.4.check

此阶段允许人员在轮询阶段完成后立即执行回调。如果轮询阶段变为空闲状态，并且脚本已排队使用 `setImmediate()`，则事件循环可能继续到 检查 阶段而不是等待。

`setImmediate()` 实际上是一个在事件循环的单独阶段运行的特殊计时器。它使用一个 libuv API 来安排回调在 轮询 阶段完成后执行。

通常，在执行代码时，事件循环最终会命中轮询阶段，等待传入连接、请求等。但是，如果回调已计划为 `setImmediate()`，并且轮询阶段变为空闲状态，则它将结束并继续到检查阶段而不是等待轮询事件。

#### 2.5.close callbacks

如果套接字或处理函数突然关闭（例如 `socket.destroy()`），则 'close' 事件将在这个阶段发出。否则它将通过 `process.nextTick()` 发出。

### 3.setImmediate() 对比 setTimeout()

`setImmediate()` 和 `setTimeout()` 很类似，但何时调用行为完全不同。

- `setImmediate()` 设计为在当前 poll 阶段完成后执行脚本。
- `setTimeout()` 计划在毫秒的最小阈值经过后运行的脚本。

执行计时器的顺序将根据调用它们的上下文而异。如果二者都从主模块内调用，则计时将受进程性能的约束（这可能会受到计算机上运行的其它应用程序的影响）。

例如，如果运行的是不属于 I/O 周期（即主模块）的以下脚本，则执行两个计时器的顺序是非确定性的，因为它受进程性能的约束。

```js
// timeout_vs_immediate.js
setTimeout(() => {
  console.log("timeout");
}, 0);

setImmediate(() => {
  console.log("immediate");
});

// timeout
// immediate

// immediate
// timeout
```

但是，如果你把这两个函数放入一个 I/O 循环内调用，setImmediate 总是被优先调用。

```js
const fs = require("fs");

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log("timeout");
  }, 0);
  setImmediate(() => {
    console.log("immediate");
  });
});

// immediate
// timeout
```

使用 `setImmediate()` 超过 `setTimeout()` 的主要优点是 `setImmediate()` 在任何计时器（如果在 I/O 周期内）都将始终执行，而不依赖于存在多少个计时器。

### 4.process.nextTick()

`process.nextTick()` 在技术上不是事件循环的一部分。相反，无论事件循环的当前阶段如何，都将在当前操作完成后处理 nextTickQueue。这里的一个操作被视作为一个从 C++ 底层处理开始过渡，并且处理需要执行的 JavaScript 代码。

回顾我们的关系图，任何时候在给定的阶段中调用 `process.nextTick()`，所有传递到 `process.nextTick()` 的回调将在事件循环继续之前得到解决。这可能会造成一些糟糕的情况, 因为它允许您通过进行递归 `process.nextTick()` 来“饿死”您的 I/O 调用，阻止事件循环到达 poll 阶段。

通过将回调置于 `process.nextTick()` 中，脚本仍具有运行完成的能力，允许在调用回调之前初始化所有变量、函数等。它还具有不允许事件循环继续的优点。在允许事件循环继续之前，对用户发出错误警报可能很有用。下面是使用 `process.nextTick()` 的上一个示例：

```js
let bar;

function someAsyncApiCall(callback) {
  process.nextTick(callback);
}

someAsyncApiCall(() => {
  console.log("bar", bar); // 1
});

bar = 1;
```

#### 4.1.process.nextTick() 对比 setImmediate()

就用户而言我们有两个类似的调用，但它们的名称令人费解。

- `process.nextTick()` 在同一个阶段立即执行。
- `setImmediate()` 在以下迭代或 ‘tick’ 上触发事件循环。

实质上，这两个名称应该交换，因为 `process.nextTick()` 比 `setImmediate()` 触发得更直接，但这是过去遗留问题，因此不太可能改变。如果贸然进行名称交换，将破坏 npm 上的大部分软件包。每天都有新的模块在不断增长，这意味着我们我们每等待一天，就有更多的潜在破损在发生。所以说尽管这些名称使人感到困惑，但它们的名字本身不会改变。

> 我们建议开发人员在所有情况下都使用 `setImmediate()`，因为它更容易被推理（并且它导致代码与更广泛的环境，如浏览器 JS 所兼容。）

#### 4.2.为什么要使用 process.nextTick()

主要有两个原因：

1. 允许用户处理错误，清理任何不需要的资源，或者在事件循环继续之前重试请求。
2. 有时在调用堆栈已解除但在事件循环继续之前，必须允许回调运行。

### 5.轮询机制在浏览器和 Node 中的区别

## 参考

[JavaScript 运行机制详解：再谈 Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

[并发模型与事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)

[Node.js 事件循环，定时器和 process.nextTick()](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/#what-is-the-event-loop)

[Tasks, microtasks, queues and schedules（译）](https://juejin.im/entry/55dbd51a60b2f3a92a8f5bff)
