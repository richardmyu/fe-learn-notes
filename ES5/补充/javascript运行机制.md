# javascript 运行机制

## 1.线程与进程

### 1.1.概念

官方的说法是：进程是 CPU 资源分配的最小单位；线程是 CPU 调度的最小单位。

### 1.2.进程与线程

#### 1.2.1.进程

进程是 cpu 资源分配的最小单位（是能拥有资源和独立运行的最小单位）。

#### 1.2.2.线程

线程是 cpu 调度的最小单位（线程是建立在进程的基础上的一次程序运行单位，一个进程中可以有多个线程）。

### 1.3.多进程与多线程

#### 1.3.1.多进程

在同一个时间里，同一个计算机系统中如果允许两个或两个以上的进程处于运行状态。多进程带来的好处是明显的，比如你可以听歌的同时，打开编辑器敲代码，编辑器和听歌软件的进程之间丝毫不会相互干扰。

#### 1.3.2.多线程

程序中包含多个执行流，即在一个程序中可以同时运行多个不同的线程来执行不同的任务，也就是说允许单个程序创建多个并行执行的线程来完成各自的任务。

#### 1.3.3.JavaScript 是单线程

JavaScript 语言的一大特点就是单线程。JavaScript 的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript 的主要用途是与用户互动，以及操作 DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。

为了利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM。所以，这个新标准并没有改变 JavaScript 单线程的本质。

#### 1.3.4.浏览器是多进程

> **Browser 进程**：浏览器的主进程（负责协调、主控），只有一个。作用有

- 负责浏览器界面显示，与用户交互。如前进，后退等
  >
- 负责各个页面的管理，创建和销毁其他进程
  >
- 将 Renderer 进程得到的内存中的 Bitmap，绘制到用户界面上
  >
- 网络资源的管理，下载等

> **第三方插件进程**：每种类型的插件对应一个进程，仅当使用该插件时才创建
>
> **GPU 进程**：最多一个，用于 3D 绘制等
>
> **浏览器渲染进程**（浏览器内核）（Renderer 进程，内部是多线程的）：默认每个 Tab 页面一个进程，互不影响。主要作用为
>
>> 页面渲染，脚本执行，事件处理等

- **浏览器多进程的优势**

- 避免单个 page crash 影响整个浏览器
  >
- 避免第三方插件 crash 影响整个浏览器
  >
- 多进程充分利用多核优势
  >
- 方便使用沙盒模型隔离插件等进程，提高浏览器稳定性

## 2.浏览器内核

可以这样理解，页面的渲染，JS 的执行，事件的循环，都在渲染进程内进行。

### 2.1.渲染进程的线程

> **GUI 渲染线程**
>
>> 负责渲染浏览器界面，解析 HTML，CSS，构建 DOM 树和 RenderObject 树，布局和绘制等。
>>
>> 当界面需要重绘（Repaint）或由于某种操作引发回流 (reflow) 时，该线程就会执行。
>>
>> 注意，GUI 渲染线程与 JS 引擎线程是互斥的，当 JS 引擎执行时 GUI 线程会被挂起（相当于被冻结了），GUI 更新会被保存在一个队列中等到 JS 引擎空闲时立即被执行。

---

> **JS 引擎线程**（也称为 JS 内核，负责处理 Javascript 脚本程序。例如 V8 引擎）
>
>> 负责解析 Javascript 脚本，运行代码。
>>
>> 一直等待着任务队列中任务的到来，然后加以处理，一个 Tab 页（renderer 进程）中无论什么时候都只有一个 JS 线程在运行 JS 程序
>>
>> 同样注意，GUI 渲染线程与 JS 引擎线程是互斥的，所以如果 JS 执行的时间过长，这样就会造成页面的渲染不连贯，导致页面渲染加载阻塞。

---

> **事件触发线程**
>
>> 归属于浏览器而不是 JS 引擎，用来控制事件循环
>>
>> 当 JS 引擎执行代码块如 setTimeOut 时（也可来自浏览器内核的其他线程，如鼠标点击、AJAX 异步请求等），会将对应任务添加到事件线程中
>>
>> 当对应的事件符合触发条件被触发时，该线程会把事件添加到待处理队列的队尾，等待 JS 引擎的处理
>>
>> 注意，由于 JS 的单线程关系，所以这些待处理队列中的事件都得排队等待 JS 引擎处理（当 JS 引擎空闲时才会去执行）

---

> **定时触发器线程**
>
>> 传说中的 setInterval 与 setTimeout 所在线程
>>
>> 浏览器定时计数器并不是由 JavaScript 引擎计数的，（因为 JavaScript 引擎是单线程的，如果处于阻塞线程状态就会影响记计时的准确）
>>
>> 因此通过单独线程来计时并触发定时（计时完毕后，添加到事件队列中，等待 JS 引擎空闲后执行）
>>
>> 注意，W3C 在 HTML 标准中规定，规定要求 setTimeout 中低于 4ms 的时间间隔算为 4ms。

---

> **异步 http 请求线程**
>
>> 在 `XMLHttpRequest` 在连接后是通过浏览器新开一个线程请求
>>
>> 将检测到状态变更时，如果设置有回调函数，异步线程就产生状态变更事件，将这个回调再放入事件队列中。再由 JavaScript 引擎执行。

### 2.2.Browser 进程和 Renderer 进程的通信过程

打开任务管理器，然后打开一个浏览器，就可以看到：任务管理器中出现了两个进程（一个是主控进程，一个则是打开 Tab 页的渲染进程）， 然后在这前提下，看下整个的过程：

> 1.Browser 进程收到用户请求，首先需要获取页面内容（譬如通过网络下载资源），随后将该任务通过 RendererHost 接口传递给 Render 进程
>
> 2.Renderer 进程的 Renderer 接口收到消息，简单解释后，交给 GUI 渲染线程，然后开始渲染
>
>> GUI 渲染线程接收请求，加载网页并渲染网页，这其中可能需要 Browser 进程获取资源和需要 GPU 进程来帮助渲染
>>
>> 当然可能会有 JS 线程操作 DOM（这样可能会造成回流并重绘）
>>
>> 最后 Render 进程将结果传递给 Browser 进程
>
> 3.Browser 进程接收到结果并将结果绘制出来

### 2.3.线程之间的关系

#### 2.3.1.GUI 渲染线程与 JS 引擎线程互斥

由于 JavaScript 是可操纵 DOM 的，如果在修改这些元素属性同时渲染界面（即 JS 线程和 UI 线程同时运行），那么渲染线程前后获得的元素数据就可能不一致了。

因此为了防止渲染出现不可预期的结果，浏览器设置 GUI 渲染线程与 JS 引擎为互斥的关系，当 JS 引擎执行时 GUI 线程会被挂起， GUI 更新则会被保存在一个队列中等到 JS 引擎线程空闲时立即被执行。

#### 2.3.2.JS 阻塞页面加载

从上述的互斥关系，可以推导出，JS 如果执行时间过长就会阻塞页面。

譬如，假设 JS 引擎正在进行巨量的计算，此时就算 GUI 有更新，也会被保存到队列中，等待 JS 引擎空闲后执行。 然后，由于巨量计算，所以 JS 引擎很可能很久很久后才能空闲，自然会感觉到巨卡无比。

所以，要尽量避免 JS 执行时间过长，这样就会造成页面的渲染不连贯，导致页面渲染加载阻塞的感觉。

#### 2.3.3.WebWorker

前文中有提到 JS 引擎是单线程的，而且 JS 执行时间过长会阻塞页面，那么 JS 就真的对 cpu 密集型计算无能为力么？

所以，后来 HTML5 中支持了 Web Worker。

MDN 的官方解释是：

> Web Worker 为 Web 内容在后台线程中运行脚本提供了一种简单的方法。线程可以执行任务而不干扰用户界面
>
> 一个 worker 是使用一个构造函数创建的一个对象 (e.g. Worker()) 运行一个命名的 JavaScript 文件
>
> 这个文件包含将在工作线程中运行的代码；workers 运行在另一个全局上下文中，不同于当前的 window
>
> 因此，使用 window 快捷方式获取当前全局的范围 （而不是 self) 在一个 Worker 内将返回错误

这样理解下：

- 创建 Worker 时，JS 引擎向浏览器申请开一个子线程（子线程是浏览器开的，完全受主线程控制，而且不能操作 DOM）
  >
- JS 引擎线程与 worker 线程间通过特定的方式通信（postMessage API，需要通过序列化对象来与线程交互特定的数据）

所以，如果有非常耗时的工作，请单独开一个 Worker 线程，这样里面不管如何翻天覆地都不会影响 JS 引擎主线程， 只待计算出结果后，将结果通信给主线程即可，perfect!

而且注意下，JS 引擎是单线程的，这一点的本质仍然未改变，Worker 可以理解是浏览器给 JS 引擎开的外挂，专门用来解决那些大量计算问题。

#### 2.3.4.WebWorker 与 SharedWorker

- WebWorker 只属于某个页面，不会和其他页面的 Render 进程（浏览器内核进程）共享
  >
  - 所以 Chrome 在 Render 进程中（每一个 Tab 页就是一个 render 进程）创建一个新的线程来运行 Worker 中的 JavaScript 程序。
    >
- SharedWorker 是浏览器所有页面共享的，不能采用与 Worker 同样的方式实现，因为它不隶属于某个 Render 进程，可以为多个 Render 进程共享使用
  >
  - 所以 Chrome 浏览器为 SharedWorker 单独创建一个进程来运行 JavaScript 程序，在浏览器中每个相同的 JavaScript 只存在一个 SharedWorker 进程，不管它被创建多少次。

SharedWorker 由独立的进程管理，WebWorker 只是属于 render 进程下的一个线程。本质上就是进程和线程的区别。

## 3.任务队列

一个 JavaScript 运行时包含了一个待处理的消息队列。每一个消息都关联着一个用以处理这个消息的函数。

在事件循环期间的某个时刻，运行时从最先进入队列的消息开始处理队列中的消息。为此，这个消息会被移出队列，并作为输入参数调用与之关联的函数。正如前面所提到的，调用一个函数总是会为其创造一个新的栈帧。

函数的处理会一直进行到执行栈再次为空为止；然后事件循环将会处理队列中的下一个消息（如果还有的话）。

### 3.1.概念

任务可以分成两种，一种是**同步任务**（synchronous），另一种是**异步任务**（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"**任务队列**"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

> 具体来说，JavaScript 运行环境的运行机制（不是 JavaScript 的运行机制）大体如下：
>
>> 1.所有同步任务都在主线程上执行，形成一个**执行栈**（execution context stack）。
>>
>> 2.主线程之外，还存在一个**事件 (/任务）队列**（Event queue）。只要异步任务有了运行结果，就在"事件队列"之中放置一个事件。
>>
>> 3.一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"事件队列"，进入执行栈，开始执行。
>>
>> 4.主线程不断重复上面的第三步。

![event-loop](https://dailc.github.io/staticResource/blog/basicKnowledge/singlethreadeventloop/js_event_loop2.png)

### 3.2.事件和回调函数

~~"任务队列"中的事件，除了 IO 设备的事件以外，还包括一些用户产生的事件（比如鼠标点击、页面滚动等等）。只要指定过回调函数，这些事件发生时就会进入"任务队列"，等待主线程读取。~~

任务队列既不是事件的队列，也不是消息的队列。任务队列就是你在主线程上的一切调用。所谓的事件驱动，就是将一切抽象为事件。IO 操作完成是一个事件，用户点击一次鼠标是事件，Ajax 完成了是一个事件，一个图片加载完成是一个事件。一个任务不一定产生事件，比如获取当前时间。当产生事件后，这个事件会被放进队列中，等待被处理。

~~所谓**回调函数**（callback），就是那些会被主线程挂起来的代码（？？？）。异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行对应的回调函数。~~

异步任务不一定要回调函数。从来就没有什么执行栈。主线程永远在执行中。主线程会不断检查事件队列。

~~"任务队列"是一个先进先出的数据结构，排在前面的事件，优先被主线程读取。主线程的读取过程基本上是自动的，只要执行栈一清空，"任务队列"上第一位的事件就自动进入主线程。但是，由于存在"定时器"功能，主线程首先要检查一下执行时间，某些事件只有到了规定的时间，才能返回主线程。~~

先产生的事件，先被处理。永远在主线程上，没有返回主线程之说。某些事件也不是必须要在规定的时间执行，有时候没办法在规定的时间执行。

### 3.3.浏览器的 Event Loop

~~主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为** Event Loop**（事件循环）。~~

事件循环的职责，就是不断得等待事件的发生，然后将这个事件的所有处理器，以它们订阅这个事件的时间顺序，依次执行。当这个事件的所有处理器都被执行完毕之后，事件循环就会开始继续等待下一个事件的触发，不断往复。

当同时并发地处理多个请求时，以上的概念也是正确的，可以这样理解：在单个的线程中，事件处理器是一个一个按顺序执行的。

即如果某个事件绑定了两个处理器，那么第二个处理器会在第一个处理器执行完毕后，才开始执行。在这个事件的所有处理器都执行完毕之前，事件循环不会去检查是否有新的事件触发。在单个线程中，一切都是有顺序地一个一个地执行的！

事件驱动的的实现过程主要靠 **事件循环**（Event Loop）完成。进程启动后就进入主循环。主循环的过程就是不停的从事件队列里读取事件。如果事件有关联的 handle（也就是注册的 callback)，就执行 handle。一个事件并不一定有 callback。

![https://img-blog.csdn.net/20160922091924733](https://img-blog.csdn.net/20160922091924733)

之所以称之为事件循环，是因为它经常按照类似如下的方式来被实现：

> 异步跟 event loop 其实没有关系。准确的讲，event loop 是实现异步的一种机制。

```js
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
```

如果当前没有任何消息，`queue.waitForMessage()` 会同步地等待消息到达。

每一个消息完整的执行后，其它消息才会被执行。这为程序的分析提供了一些优秀的特性，包括：一个函数执行时，它永远不会被抢占，并且在其他代码运行之前完全运行（且可以修改此函数操作的数据）。这与 C 语言不同，例如，如果函数在线程中运行，它可能在任何位置被终止，然后在另一个线程中运行其他代码。

这个模型的一个缺点在于当一个消息需要太长时间才能处理完毕时，Web 应用就无法处理用户的交互，例如点击或滚动。浏览器用“程序需要过长时间运行”的对话框来缓解这个问题。一个很好的做法是缩短消息处理，并在可能的情况下将一个消息裁剪成多个消息。

```js
setTimeout(function() {
  console.log("定时器开始啦");
});

new Promise(function(resolve) {
  console.log("马上执行 for 循环啦");
  for (var i = 0; i < 10000; i++) {
    i == 99 && resolve();
  }
}).then(function() {
  console.log("执行 then 函数啦");
});

console.log("代码执行结束");
// 马上执行 for 循环啦
// 代码执行结束
// 执行 then 函数啦
// 定时器开始啦
```

- **多个运行时互相通信节**

一个 web worker 或者一个跨域的 iframe 都有自己的栈，堆和消息队列。两个不同的运行时只能通过 postMessage 方法进行通信。如果另一个运行时侦听 message 事件，则此方法会向该运行时添加消息。

### 3.4.任务

不同的任务源会被分配到不同的 Task 队列中，任务源可以分为 **微任务**（microtask） 和 **宏任务**（macrotask）。在 ES6 规范中，microtask 称为 **jobs**，macrotask 称为 **task**。

按照这种分类方式：event loop 机制：

>

- 1. 在一个事件循环的周期 (cycle) 中一个 (macro)task 应该从 macrotask 队列开始执行；
  >
- 2. 当这个 macrotask 结束后，（当前 macrotask 中）所有的 microtasks 将在同一个 cycle 中执行
  - 执行 microtasks 的过程中，遇到的 microtasks 会添加到 microtasks 队列后面，并在该次循环内一次执行；
    >
- 3. 直到 microtask 队列清空，进入下一个 macrotask，或者更新 DOM。

一个 event loop 有一或多个 task 队列。每个 task 由一个确定的 task 源提供。从不同 task 源而来的 task 可能会放到不同的 task 队列中。例如，浏览器可能单独为鼠标键盘事件维护一个 task 队列，所有其他 task 都放到另一个 task 队列。通过区分 task 队列的优先级，使高优先级的 task 优先执行，保证更好的交互体验。

- **macrotask/task**：
  - script
  - setTimeout
  - setInterval
  - setImmediate
  - I/O
  - UI rendering

> macrotask 中的事件都是放在一个事件队列中的，而这个队列由事件触发线程维护；

每一个 event loop 都有一个 microtask 队列。microtask 会排在 microtask 队列而非 task 队列中。

- **microtask/jobs**：
  - process.nextTick
  - Promise.then
  - MutationObserver(html5 新特性）
  - Object.observe（已废弃）

> microtask 中的所有微任务都是添加到微任务队列中，而这个队列由 JS 引擎线程维护

通过上述的 Event loop 顺序可知，如果宏任务中的异步代码有大量的计算并且需要操作 DOM 的话，为了更快的响应界面响应，我们可以把操作 DOM 放入微任务中。

> 定时器并不是特例。到达时间点后，会形成一个事件（timeout 事件）。不同的是一般事件是靠底层系统或者线程池之类的产生事件，但定时器事件是靠事件循环不停检查系统时间来判定是否到达时间点来产生事件

#### 3.4.1.microtask 的执行时机

Tasks 被列入队列，于是浏览器能从它的内部转移到 Javascript/DOM 领地，并且确使这些 tasks 按序执行。**在 tasks 之间，浏览器可以更新渲染**。

Mircotasks 通常用于安排一些事，它们应该在正在执行的代码之后立即发生，例如响应操作，或者让操作异步执行，以免付出一个全新 task 的代价。mircotask 队列在回调之后处理，只要没有其它执行当中的（mid-execution）代码；或者在每个 task 的末尾处理。在处理 microtasks 队列期间，新添加的 microtasks 添加到队列的末尾并且也被执行。

promise 来自 ECMAScript 规范而不是 HTML 规范。ECAMScript 有一个概念 job，和 microtask 相似，但是两者的关系在邮件列表讨论中没有明确。不过，一般共识是 promise 应该是 microtask 队列的一部分，并且有充足的理由。

将 promise 当作 task 会导致性能问题，因为回调可能不必要地被与 task 相关的事（比如渲染）延迟。与其它 task 来源交互时它也导致不确定性，也会打断与其它 API 的交互。

有如下的 Javascript 代码，假如我点击 `div.inner` 会打印什么？

```js {.line-numbers}
// Let's get hold of those elements
var outer = document.querySelector(".outer");
var inner = document.querySelector(".inner");

// Let's listen for attribute changes on the
// outer element
new MutationObserver(function() {
  console.log("mutate");
}).observe(outer, {
  attributes: true
});

// Here's a click listener…
function onClick() {
  console.log("click");

  setTimeout(function() {
    console.log("timeout");
  }, 0);

  Promise.resolve().then(function() {
    console.log("promise");
  });

  outer.setAttribute("data-random", Math.random());
}

// …which we'll attach to both elements
inner.addEventListener("click", onClick);
outer.addEventListener("click", onClick);

// test
// chrome 版本 75.0.3770.100（正式版本） （64 位）
// ff 版本：67.0.1 （64 位）
// opera 版本：60.0.3255.170

// click
// promise
// mutate
// click
// promise
// mutate
// timeout
```

假如我们运行下面代码会怎么样：

`inner.click();`

跟之前一样，它会触发 click 事件，不过是通过代码而不是实际的交互动作。

```JS
// chrome FF OP
// click
// promise
// mutate
// promise
// timeout
```

`click()` 让事件同步触发，所以调用 `.click()` 的代码仍然在事件回调之间的栈内。microtasks 不会中断执行当中的（mid-execution）代码。这意味着 microtasks 队列在事件回调之间不处理，而是在它们之后处理。

#### 3.4.2.requestAnimationFrame

在一些文章中将 requestAnimationFrame 划分为 task，理由是假如你在 requestAnimationFrame 的 callback 中注册了 microtask 任务，你会发现该 microtask 任务会在 requestAnimationFrame 的 callback 结束后立刻执行。

```js
setTimeout(() => {
  console.log("A");
}, 0);
requestAnimationFrame(() => {
  console.log("B");
  Promise.resolve().then(() => {
    console.log("C");
  });
});

// A
// B
// C
// or
// B
// C
// A
```

> 起初我认为规范明摆着表明 eventloop 由执行 task、执行 microtask、UI render 三部分构成，从属于 render 阶段的 requestAnimationFrame 说是 task 怎么不大合适。但是多检索了一下，发现 W3C 工作组在 2015 年 9 月 22 日的一篇工作笔记《Timing control for script-based animations》 中提到了 animation task source 这一概念，在该文中，确实将 animation frame request callback list 中的 callback 作为 task 处理。另外，在 zone.js 中也将 requestAnimationFrame 划进 macrotask 分类中。但 whatwg 规范中对 requestAnimationFrame callback 未明确出现任何 task 相关字眼，由于 whatwg 和 w3c 的分歧，我对 requestAnimationFrame 是否该划分为 task 存保留意见。

#### 3.4.3.requestAnimationFrame callback 的执行时机

执行 requestAnimationFrame callback 是 UI Render 的其中一步。

> 如果浏览器试图实现 60Hz 的刷新率，那么 UI Render 只需要每秒执行 60 次（每 16.7 ms）。如果浏览器发现『顶层浏览器上下文』无法维持住这个频率，可能会下调到可维持的 30Hz，而不是掉帧。（本规范并不对何时进行 render 做任何规定。）类似的，如果一个顶层浏览器上下文在后台运行，用户代理可能决定将该页面的刷新率降到 4Hz，甚至更低。

由于规范没有做约定，所以浏览器在 render 策略上有充分的自主性。既有可能出现每一轮 event loop 后都 render 的现象，也有可能出现几十轮 event loop 都不 render 的情况。

```js{.line-numbers}
const startingTimePoint = Date.now();

console.log(Date.now() - startingTimePoint, "A console");

setTimeout(() => {
  console.log(Date.now() - startingTimePoint, "B setTimeout");
}, 0);

setTimeout(() => {
  console.log(Date.now() - startingTimePoint, "F setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log(Date.now() - startingTimePoint, "C promise");
});

requestAnimationFrame(() => {
  console.log(Date.now() - startingTimePoint, "D raf");
});

console.log(Date.now() - startingTimePoint, "E console");

block(200);

function block(time) {
  //假装我是一个耗时任务
  const now = Date.now();
  while (Date.now() - now < time) {}
}
```

每个 eventloop 由三个阶段构成：执行一个 task，执行 microtask 队列，可选的 ui render 阶段，requestAnimationFrame callback 在 render 阶段执行。我们平时写的逻辑代码会被分类为不同的 task 和 microtask。requestAnimationFrame callback 的执行时机与浏览器的 render 策略有关，是黑箱的。

> 总结：
>
> tasks 按序执行，浏览器会在 tasks 之间执行渲染。
>
> microtasks 按序执行，在下面情况时执行：
>
>> 1.在每个回调之后，只要没有其它代码正在运行 (mid-execution)。
>> 2.在每个 task 的末尾。

## 4.Node.js 的 Event Loop

事件循环是 Node.js 处理非阻塞 I/O 操作的机制——尽管 JavaScript 是单线程处理的——当有可能的时候，它们会把操作转移到系统内核中去。

### 4.1.事件轮询机制解析

An event loop must continually run through the following steps for as long as it exists:

> 1.Let taskQueue be one of the event loop's task queues, chosen in a user-agent-defined manner, with the constraint that the chosen task queue must contain at least one runnable task. If there is no such task queue, then jump to the microtasks step below.
>
> 2.Let oldestTask be the first runnable task in taskQueue, and remove it from taskQueue.
>
> 3.Report the duration of time during which the user agent does not execute this loop by performing the following steps:
>
> > 3.1.Set event loop begin to the current high resolution time.
> >
> > 3.2.If event loop end is set, then let top-level browsing contexts be the set of all top-level browsing contexts of all Document objects associated with the event loop. Report long tasks, passing in event loop end, event loop begin, and top-level browsing contexts.
>
> 4.Set the event loop's currently running task to oldestTask.
>
> 5.Perform oldestTask's steps.
>
> 6.Set the event loop's currently running task back to null.
>
> 7.Remove oldestTask from its task queue.
>
> 8.Microtasks: Perform a microtask checkpoint.
> **...**

![https://www.404forest.com/imgs/blog/eventloop-1.png](https://www.404forest.com/imgs/blog/eventloop-1.png)

当 Node.js 启动后，它会初始化事件轮询；处理已提供的输入脚本（或丢入 REPL，本文不涉及到），它可能会调用一些异步的 API 函数调用，安排任务处理事件，或者调用 `process.nextTick()`，然后开始处理事件循环。

- **阶段 (phase) 概述**
  >
  - timers：执行 `setTimeout()` 和 `setInterval()` 中到期的 callback。
  >
  - I/O callbacks：上一轮循环中有少数的 I/O callback 会被延迟到这一轮的这一阶段执行。
  >
  - idle, prepare：仅系统内部使用
  >
  - poll：最为重要的阶段，执行 I/O callback，在适当的条件下会阻塞在这个阶段
  >
  - check：执行 `setImmediate()` 的 callback。
  >
  - close callbacks：执行 close 事件的 callback，如：`socket.on('close', ...)`。

event loop 的每一次循环都需要依次经过上述的阶段。每个阶段都有自己的 callback 队列，每当进入某个阶段，都会从所属的队列中取出 callback 来执行，当队列为空或者被执行 callback 的数量达到系统的最大数量时，进入下一阶段。这六个阶段都执行完毕称为一轮循环。

下面的图表显示了事件循环的概述以及操作顺序。

```js
// 每一步都是事件循环机制的一个阶段

  |-->   timer
  |        |
  |    I/O callbacks
  |        |
  |    idle,prepare
  |        |
  |        |                  incoming:
  |      poll <-------------  connections,
  |        |                  data,etc.
  |        |
  |      check
  |        |
  |<-- close callbacks

```

每个阶段都有一个 FIFO 队列来执行回调。虽然每个阶段都是特殊的，但通常情况下，当事件循环进入给定的阶段时，它将执行特定于该阶段的任何操作，然后在该阶段的队列中执行回调，直到队列用尽或最大回调数已执行。当该队列已用尽或达到回调限制，事件循环将移动到下一阶段，等等。

由于这些操作中的任何一个都可能计划 更多的 操作，并且在 轮询 阶段处理的新事件由内核排队，因此在处理轮询事件时，轮询事件可以排队。因此，长时间运行回调可以允许轮询阶段运行大量长于计时器的阈值。

### 4.2.阶段的详细概述

#### 4.2.1.timers

在 timer 阶段其实使用一个最小堆而不是队列来保存所有元素（其实也可以理解，因为 timeout 的 callback 是按照超时时间的顺序来调用的，并不是先进先出的队列逻辑），然后循环取出所有到期的 callback 执行。

#### 4.2.2.I/O callbacks

根据 libuv 的文档，一些应该在上轮循环 poll 阶段执行的 callback，因为某些原因不能执行，就会被延迟到这一轮的循环的 I/O callbacks 阶段执行。换句话说这个阶段执行的 callbacks 是上轮残留的。

#### 4.2.3.poll

poll 阶段的任务就是阻塞等待监听的事件来临，然后执行对应的 callback，其中阻塞是带有超时时间的，以下几种情况都会使得超时时间为 0

- uv_run 处于 UV_RUN_NOWAIT 模式下
  >
- uv_stop() 被调用
  >
- 没有活跃的 handles 和 request
  >
- 有活跃的 idle handles
  >
- 有等待关闭的 handles

如果上述都不符合，则超时时间为距离现在最近的 timer；如果没有 timer 则 poll 阶段会一直阻塞下去

poll 阶段有两个重要的功能：

- 1. 计算应该阻塞和轮询 I/O 的时间。
  >
- 2. 然后，处理 poll 队列里的事件。

当事件循环进入 poll 阶段且没有计划计时器时，将发生以下两种情况之一：

- 如果 poll 队列 不是空的，事件循环将循环访问其回调队列并同步执行它们，直到队列已用尽，或者达到了与系统相关的硬限制。
  >
- 如果 poll 队列 是空的，还有两件事发生：
  >
  - 如果脚本已按 `setImmediate()` 排定，则事件循环将结束 poll 阶段，并继续 check 阶段以执行这些计划脚本。
  - 如果脚本尚未按 `setImmediate()` 排定，则事件循环将等待回调添加到队列中，然后立即执行。

一旦 poll 队列为空，事件循环将检查 已达到时间阈值的计时器。如果一个或多个计时器已准备就绪，则事件循环将绕回计时器阶段以执行这些计时器的回调。

#### 4.2.4.check

此阶段允许人员在轮询阶段完成后立即执行回调。如果轮询阶段变为空闲状态，并且脚本已排队使用 `setImmediate()`，则事件循环可能继续到 检查 阶段而不是等待。

`setImmediate()` 实际上是一个在事件循环的单独阶段运行的特殊计时器。它使用一个 libuv API 来安排回调在 轮询 阶段完成后执行。

通常，在执行代码时，事件循环最终会命中轮询阶段，等待传入连接、请求等。但是，如果回调已计划为 `setImmediate()`，并且轮询阶段变为空闲状态，则它将结束并继续到检查阶段而不是等待轮询事件。

#### 4.2.5.close callbacks

如果套接字或处理函数突然关闭（例如 `socket.destroy()`），则 'close' 事件将在这个阶段发出。否则它将通过 `process.nextTick()` 发出。

### 4.3.`setImmediate()` 对比 `setTimeout()`

`setImmediate()` 和 `setTimeout()` 很类似，但何时调用行为完全不同。

- `setImmediate()` 在 check 阶段才会执行
- `setTimeout()` 在 timer 阶段执行，并且是在 poll 阶段进行判断是否达到指定的 time 时间才会执行

执行计时器的顺序将根据调用它们的上下文而异。如果二者都从主模块内调用，则计时将受进程性能的约束（这可能会受到计算机上运行的其它应用程序的影响）。

例如，如果运行的是不属于 I/O 周期（即主模块）的以下脚本，则执行两个计时器的顺序是非确定性的，因为它受进程性能的约束。

```js
// demo1
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

### 4.4.`process.nextTick()`

`process.nextTick()` 在技术上不是事件循环的一部分。相反，无论事件循环的当前阶段如何，都将在当前操作完成后处理 nextTickQueue。这里的一个操作被视作为一个从 C++ 底层处理开始过渡，并且处理需要执行的 JavaScript 代码。

回顾我们的关系图，任何时候在给定的阶段中调用 `process.nextTick()`，所有传递到 `process.nextTick()` 的回调将在事件循环继续之前得到解决。这可能会造成一些糟糕的情况，因为它允许您通过进行递归 `process.nextTick()` 来“饿死”您的 I/O 调用，阻止事件循环到达 poll 阶段。

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

#### 4.4.1.`process.nextTick()` 对比 `setImmediate()`

就用户而言我们有两个类似的调用，但它们的名称令人费解。

- `process.nextTick()` 设置的回调函数会存放到数组中，一次性执行所有回调函数。
- `setImmediate()` 属于 check 观察者，其设置的回调函数，会插入到下次事件循环的末尾，每次事件循环只执行链表中的一个回调函数。

实质上，这两个名称应该交换，因为 `process.nextTick()` 比 `setImmediate()` 触发得更直接，但这是过去遗留问题，因此不太可能改变。如果贸然进行名称交换，将破坏 npm 上的大部分软件包。每天都有新的模块在不断增长，这意味着我们我们每等待一天，就有更多的潜在破损在发生。所以说尽管这些名称使人感到困惑，但它们的名字本身不会改变。

> 我们建议开发人员在所有情况下都使用 `setImmediate()`，因为它更容易被推理（并且它导致代码与更广泛的环境，如浏览器 JS 所兼容。）

#### 4.4.2.为什么要使用 `process.nextTick()`

主要有两个原因：

1. 允许用户处理错误，清理任何不需要的资源，或者在事件循环继续之前重试请求。
   >
2. 有时在调用堆栈已解除但在事件循环继续之前，必须允许回调运行。

### 4.5.轮询机制在浏览器和 Node 中的区别

浏览器和 Node 环境下，microtask 任务队列的执行时机不同

- Node 端，microtask 在事件循环的各个阶段之间执行
- 浏览器端，microtask 在事件循环的 macrotask 执行完之后执行

> 准确讲，使用事件驱动的系统中，必然有非常非常多的事件。如果事件都产生，都要主循环去处理，必然会导致主线程繁忙。那对于应用层的代码而言，肯定有很多不关心的事件（比如只关心点击事件，不关心定时器事件）。这会导致一定浪费。没有讲到的一个重要概念是 watcher。观察者。
>
> 事实上，不是所有的事件都放置在一个队列里。不同的事件，放置在不同的队列。当我们没有使用定时器时，则完全不用关心定时器事件这个队列。当我们进行定时器调用时，首先会设置一个定时器 watcher。事件循环的过程中，会去调用该 watcher，检查它的事件队列上是否产生事件（比对时间的方式）。当我们进行磁盘 IO 的时候，则首先设置一个 io watcher，磁盘 IO 完成后，会在该 io watcher 的事件队列上添加一个事件。事件循环的过程中从该 watcher 上处理事件。处理完已有的事件后，处理下一个 watcher。检查完所有 watcher 后，进入下一轮检查，对某类事件不关心时，则没有相关 watcher。

---

参考：

[Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

[Event Loop](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop)

[JavaScript 运行机制详解：再谈 Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

[并发模型与事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)

[Node.js 事件循环，定时器和 process.nextTick()](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/#what-is-the-event-loop)

[Tasks, microtasks, queues and schedules（译）](https://juejin.im/entry/55dbd51a60b2f3a92a8f5bff)

[从浏览器多进程到 JS 单线程，JS 运行机制最全面的一次梳理](http://www.dailichun.com/2018/01/21/js_singlethread_eventloop.html)

[深入探究 eventloop 与浏览器渲染的时序问题](https://www.404forest.com/2017/07/18/how-javascript-actually-works-eventloop-and-uirendering/)

[深入浅出 JavaScript 运行机制](https://github.com/ljianshu/Blog/issues/2)

[Js 基础知识（四） - js 运行原理与机制](https://segmentfault.com/a/1190000013119813)

[【朴灵评注】JavaScript 运行机制详解：再谈 Event Loop](https://blog.csdn.net/lin_credible/article/details/40143961)

[浏览器与 Node 的事件循环 (Event Loop) 有何区别](https://juejin.im/post/5c337ae06fb9a049bc4cd218)

[浏览器和 NodeJS 中不同的 Event Loop](https://github.com/kaola-fed/blog/issues/234)

[不要混淆 nodejs 和浏览器中的 event loop](https://cnodejs.org/topic/5a9108d78d6e16e56bb80882)

[事件循环](https://github.com/yjhjstz/deep-into-node/blob/master/chapter5/chapter5-1.md)

[44. 理解事件循环一（浅析）](https://github.com/ccforward/cc/issues/47)

[45. 理解事件循环二 (macrotask 和 microtask)](https://github.com/ccforward/cc/issues/48)

[Node.js 的 event loop 及 timer/setImmediate/nextTick](https://github.com/creeperyang/blog/issues/26)

[Node.js Event Loop 的理解 Timers，process.nextTick()](https://cnodejs.org/topic/57d68794cb6f605d360105bf)

[node 中的 Event 模块（上）](https://github.com/SunShinewyf/issue-blog/issues/34)

[node 中的 Event 模块（下）](https://github.com/SunShinewyf/issue-blog/issues/35)
