# JavaScript笔记专题补充

## 细节补充

### 一.同步&异步

JavaScript的优势之一是其如何处理异步代码。异步代码会被放入一个事件队列($Event$ $queue$)，等到所有其他代码执行后才进行，而不会阻塞线程。

javascript最基础的异步函数是`setTimeout`和`setInterval`。`setTimeout`会在一定时间后执行给定的函数。它接受一个回调函数作为第一参数和一个毫秒时间作为第二参数。

```
    console.log( "a" );
    setTimeout(function() {
        console.log( "c" )
    }, 1500 );
    setTimeout(function() {
        console.log( "d" )
    }, 1500 );
    setTimeout(function() {
        console.log( "e" )
    }, 1500 );
    console.log( "b" );
    //a  d  c  b  e
```
正如预期，控制台先输出“a”、“b”，大约1500毫秒后，再看到“c”、“d”、“e”。我用“大约”是因为setTimeout事实上是不可预知的。实际上，甚至 HTML5规范都提到了这个问题：

“**这个API不能保证计时会如期准确地运行。由于CPU负载、其他任务等所导致的延迟是可以预料到的**。”

有趣的是，直到在同一程序段中所有其余的代码执行结束后，超时才会发生。所以如果设置了超时，同时执行了需长时间运行的函数，那么在该函数执行完成之前，超时甚至都不会启动。实际上，异步函数，如`setTimeout`和`setInterval`，被压入了称之为 $Event Loop$ 的队列。

$Event Loop$ 是一个回调函数队列。当异步函数执行时，回调函数会被压入这个队列。**JavaScript引擎直到异步函数执行完成后，才会开始处理事件循环**。这意味着JavaScript代码不是多线程的，即使表现的行为相似。事件循环是一个先进先出（$FIFO$）队列，这说明回调是按照它们被加入队列的顺序执行的。JavaScript被 node选做为开发语言，就是因为写这样的代码多么简单啊。

##### 3.主线程
JavaScript只有一个线程，称之为主线程。而事件循环是主线程中执行栈里的代码执行完毕之后，才开始执行的。所以，主线程中要执行的代码时间过长，会阻塞事件循环的执行，也就会阻塞异步操作的执行。只有当主线程中执行栈为空的时候（即同步代码执行完毕），才会进行数据循环来观察要执行的事件回调，当事件循环检测到任务队列中有事件就取出相关回调放到执行栈中由主线程执行。

##### 4.任务队列
异步操作会将相关回调添加到任务队列中。而不同的异步操作添加到任务队列的时机也不同。

##### 5.事件循环
每一次执行循环体的过程称之为“Tick”。每次Tick的过程就是查看是否有待处理事件，如果有，则取出相关事件及回调函数放入执行栈中由主线程执行。待处理的事件会存储在一个任务队列中。

##### 6.异步执行的运行机制
1.所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）;
2.主线程之外，还存在一个“任务队列”（task queue）。只要异步任务有了运行结果，就在“任务队列”中放置一个事件。
3.一旦“执行栈”中所有同步任务执行完毕，系统就会读取“任务队列”，检测待处理事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
4.主线程不断重复执行第三步。

##### 7.常见的异步任务
onclick等事件，由浏览器内核的DOM Binding模块来处理；当事件被触发的时候，回调函数会立即添加到任务队列中；

setTimeout会由浏览器内核的timer模块来进行延时处理，当时间到达的时候，才会将回调函数添加到任务队列中；

ajax则会由浏览器内核的network模块来处理，在网络请求完成返回之后，才将回调函数添加到任务队列中取；

##### 8.异步函数
所谓的异步函数，是包括ajax，事件触发，setTimeout , setInterval等回调的函数。

当解析文档流时如果遇到js代码，会立即执行。如果这期间有异步函数被触发，会被存放在队列结构中。当之前的代码执行完毕后，浏览器查看此队列，如有待执行函数，则执行；没有则等待触发。

所以，那个i 值会成为最大的那个。因为for循环在异步函数被执行前，已经跑完了。

另外有一点注意：如果两个setInterval触发的异步函数，相邻被压入队列，后者会被删除。因为如果不删除的话，可能会连着压进很多相同异步函数，会被浏览器一口气都执行完。起不到setInterval有时间间隔的效果了。

另外这部分内容不完全是W3C规定的，也有ECMA Spec规定的。W3C定义dom操作，ECMA spec规定pure js的属性。

### 二.JavaScript定时器

```
//安排函数f()在未来的调用模式
//在等待了若干毫秒之后调用函数f()
//如果设置了interval并没有设置end参数，则对函数f()调用将不会停止
//如果没有设置interval和end参数，只在若干秒以后调用函数f()一次
//只有指定了函数f()，才会从start=0的时刻开始
//注意：调用invoke()不会阻塞，它会立即返回

    function invoke(f,start,interval,end){
        if(!start)start=0;
        console.dir(arguments);
        if(arguments.length<=2){
            setTimeout(f,start);
        }else{
            console.log(start);
            setTimeout(repeat,start);
            function repeat(){
                var h=setInterval(f,interval);
                if(end){
                    setTimeout(function(){
                        clearInterval(h);
                    },end);
                }
            }
        }
    };

    function fn(){
        console.log("我是第3个")
    };

    invoke(fn,1000);
    //执行一次，时间1s
    invoke(fn,1000,2000);
    //第一次执行6s（???），以后每隔3s执行一次
    invoke(fn,1000,2000,3000);
    //执行一次，时间6s
```
由于历史原因，`setTimeout`和`setInterval`的第一个参数可以作为字符串传入。如果这么做，那这个字符串会在指定的超时时间或间隔时间之后进行求值（相当于执行`eval()`）。除前两个参数之外，HTML5规范（除IE外的所有浏览器）还允许传递额外的参数，并在调用函数时把这些参数传递过去。

如果以0毫秒的超时时间来执行`setTimeout`，那么指定的函数不会立即执行。相反，会把它放在队列中，等待前面处于等待状态的事件处理程序执行完毕后执行。（摘自《JavaScript权威指南》）

JavaScript计时器的工作原理
在基本层面上了解JavaScript定时器的工作原理很重要。通常，由于它们所在的单个线程，它们的行为是无意义的。我们首先检查可以构造和操作定时器的访问权限的三个函数。

var id = setTimeout(fn, delay); - 启动单个定时器，在延迟后调用指定的功能。该函数返回一个唯一的ID，可以在以后取消定时器。
var id = setInterval(fn, delay);- 类似于setTimeout但不断地调用函数（每次都有延迟），直到它被取消。
clearInterval(id);，clearTimeout(id);- 接受计时器ID（由上述功能返回），并停止定时器回调发生。
为了了解定时器如何在内部工作，有一个重要的概念需要探索：定时器延迟是不能保证的。由于浏览器中的所有JavaScript都在一个线程上执行，所以异步事件（例如鼠标点击和定时器）只在执行中打开时运行。这最好用一个图示出，如下所示：

在这个数字中有很多信息要消化，但是完全理解它将使您更好地了解异步JavaScript执行的工作原理。这个图是一维的：垂直我们有（挂钟）时间，以毫秒为单位。蓝色框表示正在执行的JavaScript的部分。例如，第一个JavaScript块大约运行18ms，鼠标点击块约11ms，依此类推。

由于JavaScript只能一次执行一段代码（由于其单线程性质），这些代码块中的每一个都“阻止”其他异步事件的进度。这意味着当异步事件发生时（例如鼠标点击，定时器触发或XMLHttpRequest完成），它将被排队等待稍后执行（这种排队实际发生的确发生在浏览器到浏览器之间，所以请考虑这一点简化）。

首先，在第一个JavaScript块中，启动了两个定时器：10ms setTimeout和10ms  setInterval。由于计时器的启动时间和时间，实际上是在我们实际完成第一个代码块之前触发的。但是，请注意，它不会立即执行（由于线程不能执行）。而是延迟功能排队，以便在下一个可用时刻执行。

另外，在第一个JavaScript块中，我们看到鼠标点击发生。与此异步事件相关联的JavaScript回调（我们从不知道用户何时可以执行某个操作，因此被认为是异步的）不能立即执行，因此，像初始定时器一样，它将被排队等待稍后执行。

JavaScript完成执行浏览器的初始程序块立即提出问题：什么是等待执行？在这种情况下，鼠标点击处理程序和定时器回调都在等待。浏览器然后选择一个（鼠标单击回调）并立即执行。定时器将等到下一个可能的时间，才能执行。

请注意，虽然鼠标点击处理程序正在执行第一个间隔回调执行。与定时器一样，其处理程序排队等待稍后执行。但是，请注意，当间隔再次触发（定时器处理程序正在执行时），这次处理程序执行被删除。如果要在大块代码执行时对所有间隔回调进行排队，结果将是完成后，它们之间的延迟不间断执行。相反，浏览器往往简单地等待，直到排队更多的间隔处理程序排队（有间隔）为止。

实际上，我们可以看到，当间隔本身正在执行时，第三个间隔回调触发是这种情况。这给我们提供了一个重要的事实：间隔不关心当前正在执行的内容，他们将不加区分地排队，即使这意味着回收之间的时间将被牺牲。

最后，在第二个间隔回调完成执行后，我们可以看到JavaScript引擎没有什么可执行的。这意味着浏览器现在等待发生新的异步事件。当间隔再次触发时，我们得到这个50ms的标记。但是，这一次，没有任何东西阻止它的执行，所以它立即触发。

让我们看一个例子，以更好地说明之间的差异setTimeout和setInterval。

```
  setTimeout(function(){
    /* Some long block of code... */
    setTimeout(arguments.callee, 10);
  }, 10);

  setInterval(function(){
    /* Some long block of code... */
  }, 10);
```

这两个代码似乎在功能上是等同的，乍一看，但他们不是。值得注意的是，setTimeout代码在上一次回调执行之后总是至少有10ms的延迟（它可能会更多，但是从不减少），而setInterval无论何时执行最后一次回调，它将尝试每10ms执行一次回调。

我们在这里学到了很多东西，让我们回顾一下：

JavaScript引擎只有一个线程，强制异步事件排队等待执行。
setTimeout并且setInterval在如何执行异步代码方面基本不同。
如果定时器被阻止立即执行，它将被延迟到下一个可能的执行点（这将比期望的延迟时间长）。
如果间隔时间足够长（超过指定的延迟时间），则可以无延迟地执行背对背。
所有这一切都是令人难以置信的重要知识。了解JavaScript引擎的工作原理，特别是通常会发生大量异步事件时，在构建高级应用程序代码的过程中构建了一个很好的基础。





#### [JavaScript定时机制和定时器](http://www.cnblogs.com/joyco773/p/6038022.html)

```
    var num = 10;
    console.log(1);
    num = 20;
    setTimeout("console.log(num)",0);
    console.log(3);
    // 1     47
    // 3     50
    // 20    (unknown)
```
JavaScript引擎是单线程运行的,浏览器无论在什么时候都只且只有一个线程在运行JavaScript程序.

JavaScript引擎用单线程运行也是有意义的,单线程不必理会线程同步这些复杂的问题,问题得到简化.

浏览器内核实现允许多个线程异步执行,这些线程在内核制控下相互配合以保持同步.假如某一浏览器内核的实现至少有三个常驻线程:javascript引擎线程,界面渲染线程,浏览器事件触发线程,除些以外,也有一些执行完就终止的线程,如Http请求线程,这些异步线程都会产生不同的异步事件,下面通过一个图来阐明单线程的JavaScript引擎与另外那些线程是怎样互动通信的.虽然每个浏览器内核实现细节不同,但这其中的调用原理都是大同小异.

![Alt text](./javascriptsetinterval.jpg)


- **Js线程图示**

由图可看出,浏览器中的JavaScript引擎是基于事件驱动的,这里的事件可看作是浏览器派给它的各种任务,这些任务可以源自JavaScript引擎当前执行的代码块,如调用setTimeout添加一个任务,也可来自浏览器内核的其它线程,如界面元素鼠标点击事件,定时触发器时间到达通知,异步请求状态变更通知等.从代码角度看来任务实体就是各种回调函数,JavaScript引擎一直等待着任务队列中任务的到来.由于单线程关系,这些任务得进行排队,一个接着一个被引擎处理.

上图t1-t2..tn表示不同的时间点,tn下面对应的小方块代表该时间点的任务,假设现在是t1时刻,引擎运行在t1对应的任务方块代码内,在这个时间点内,我们来描述一下浏览器内核其它线程的状态.

　　**t1时刻:**

- **GUI渲染线程**

该线程负责渲染浏览器界面HTML元素,当界面需要重绘(Repaint)或由于某种操作引发回流(reflow)时,该线程就会执行.本文虽然重点解释JavaScript定时机制,但这时有必要说说渲染线程,因为该线程与JavaScript引擎线程是互斥的,这容易理解,因为JavaScript脚本是可操纵DOM元素,在修改这些元素属性同时渲染界面,那么渲染线程前后获得的元素数据就可能不一致了.

在JavaScript引擎运行脚本期间,浏览器渲染线程都是处于挂起状态的,也就是说被”冻结”了.

所以,在脚本中执行对界面进行更新操作,如添加结点,删除结点或改变结点的外观等更新并不会立即体现出来,这些操作将保存在一个队列中,待JavaScript引擎空闲时才有机会渲染出来.

- **GUI事件触发线程**

JavaScript脚本的执行不影响html元素事件的触发,在t1时间段内,首先是用户点击了一个鼠标键,点击被浏览器事件触发线程捕捉后形成一个鼠标点击事件,由图可知,对于JavaScript引擎线程来说,这事件是由其它线程异步传到任务队列尾的,由于引擎正在处理t1时的任务,这个鼠标点击事件正在等待处理.

- **定时触发线程**

注意这里的浏览器模型定时计数器并不是由JavaScript引擎计数的,因为JavaScript引擎是单线程的,如果处于阻塞线程状态就计不了时,它必须依赖外部来计时并触发定时,所以队列中的定时事件也是异步事件.

由图可知,在这t1的时间段内,继鼠标点击事件触发后,先前已设置的setTimeout定时也到达了,此刻对JavaScript引擎来说,定时触发线程产生了一个异步定时事件并放到任务队列中, 该事件被排到点击事件回调之后,等待处理.

同理, 还是在t1时间段内,接下来某个setInterval定时器也被添加了,由于是间隔定时,在t1段内连续被触发了两次,这两个事件被排到队尾等待处理.

可见,假如时间段t1非常长,远大于setInterval的定时间隔,那么定时触发线程就会源源不断的产生异步定时事件并放到任务队列尾而不管它们是否已被处理,但一旦t1和最先的定时事件前面的任务已处理完,这些排列中的定时事件就依次不间断的被执行,这是因为,对于JavaScript引擎来说,在处理队列中的各任务处理方式都是一样的,只是处理的次序不同而已.

t1过后,也就是说当前处理的任务已返回,JavaScript引擎会检查任务队列,发现当前队列非空,就取出t2下面对应的任务执行,其它时间依此类推,由此看来:

如果队列非空,引擎就从队列头取出一个任务,直到该任务处理完,即返回后引擎接着运行下一个任务,在任务没返回前队列中的其它任务是没法被执行的.

**定时器注意问题**

Javascript是单线程执行的，也就是无法同时执行多段代码，当某一段代码正在执行的时候，所有后续的任务都必须等待，形成一个队列，一旦当前任务执行完毕，再从队列中取下一个任务。这也常被称为“阻塞式执行”。

如果代码中设定了一个setTimeout,那么浏览器便会在合适的时间，将代码插入到任务队列中，如果这个时间设为0，就代表立即插入到队列，但不是立即执行，仍要等待前面代码执行完毕。所以setTimeout并不能保证执行的时间，是否及时执行取决于javascript 线程拥挤还是空间。

### 三.异步编程的四种方法

#### 1.回调函数

这是异步编程最基本的方法。

假定有两个函数f1和f2，后者等待前者的执行结果。如果f1是一个很耗时的任务，可以考虑改写f1，把f2写成f1的回调函数。
```
    function f1(callback){
　　　　setTimeout(function () {
　　　　　　// f1的任务代码
　　　　　　callback();
　　　　}, 1000);
　　}
```
执行代码就变成下面这样：
　　`f1(f2);`
采用这种方式，我们把同步操作变成了异步操作，f1不会堵塞程序运行，相当于先执行程序的主要逻辑，将耗时的操作推迟执行。

回调函数的优点是简单、容易理解和部署；缺点是不利于代码的阅读和维护，各个部分之间高度耦合（Coupling），流程会很混乱，而且每个任务只能指定一个回调函数。

#### 2.事件监听

另一种思路是采用事件驱动模式。任务的执行不取决于代码的顺序，而取决于某个事件是否发生。

还是以f1和f2为例。首先，为f1绑定一个事件（这里采用的jQuery的写法）。
　　`f1.on('done', f2);`
上面这行代码的意思是，当f1发生done事件，就执行f2。然后，对f1进行改写：
```
　　function f1(){
　　　　setTimeout(function () {
　　　　　　// f1的任务代码
　　　　　　f1.trigger('done');
　　　　}, 1000);
　　}
```
`f1.trigger('done')`表示，执行完成后，立即触发done事件，从而开始执行f2。

这种方法的优点是比较容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，而且可以"去耦合"（Decoupling），有利于实现模块化。缺点是整个程序都要变成事件驱动型，运行流程会变得很不清晰。

#### 3.发布/订阅

上一节的"事件"，完全可以理解成"信号"。

我们假定，存在一个"信号中心"，某个任务执行完成，就向信号中心"发布"（publish）一个信号，其他任务可以向信号中心"订阅"（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做"发布/订阅模式"（publish-subscribe pattern），又称"观察者模式"（observer pattern）。

这个模式有多种实现，下面采用的是Ben Alman的Tiny Pub/Sub，这是jQuery的一个插件。

首先，f2向"信号中心"jQuery订阅"done"信号。
　　`jQuery.subscribe("done", f2);`
然后，f1进行如下改写：
```
　　function f1(){
　　　　setTimeout(function () {
　　　　　　// f1的任务代码
　　　　　　jQuery.publish("done");
　　　　}, 1000);
　　}
```

`jQuery.publish("done")`的意思是，f1执行完成后，向"信号中心"jQuery发布"done"信号，从而引发f2的执行。

此外，f2完成执行后，也可以取消订阅（unsubscribe）。

`jQuery.unsubscribe("done", f2);`
这种方法的性质与"事件监听"类似，但是明显优于后者。因为我们可以通过查看"消息中心"，了解存在多少信号、每个信号有多少订阅者，从而监控程序的运行。

#### 4.Promises对象

Promises对象是CommonJS工作组提出的一种规范，目的是为异步编程提供统一接口。

简单说，它的思想是，每一个异步任务返回一个Promise对象，该对象有一个then方法，允许指定回调函数。比如，f1的回调函数f2,可以写成：
`f1().then(f2);`

f1要进行如下改写（这里使用的是jQuery的实现）：

```
　　function f1(){
　　　　var dfd = $.Deferred();
　　　　setTimeout(function () {
　　　　　　// f1的任务代码
　　　　　　dfd.resolve();
　　　　}, 500);
　　　　return dfd.promise;
　　}
```
这样写的优点在于，回调函数变成了链式写法，程序的流程可以看得很清楚，而且有一整套的配套方法，可以实现许多强大的功能。

比如，指定多个回调函数：
`f1().then(f2).then(f3);`

再比如，指定发生错误时的回调函数：
`f1().then(f2).fail(f3);`

而且，它还有一个前面三种方法都没有的好处：如果一个任务已经完成，再添加回调函数，该回调函数会立即执行。所以，你不用担心是否错过了某个事件或信号。这种方法的缺点就是编写和理解，都相对比较难。

参考：
[Javascript异步编程的4种方法-阮一峰](http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html)

### 四.变量对象（Variable Object）

如果变量与执行上下文相关，那变量自己应该知道它的数据存储在哪里，并且知道如何访问。这种机制称为变量对象(variable object)。

变量对象(缩写为VO)是一个与执行上下文相关的特殊对象，它存储着在上下文中声明的以下内容：
- 变量 (var, 变量声明);
- 函数声明 (FunctionDeclaration, 缩写为FD);
- 函数的形参

举例来说，我们可以用普通的ECMAScript对象来表示一个变量对象：
`VO = {};`
就像我们所说的, VO就是执行上下文的属性(property)：
```
    activeExecutionContext = {
        VO: {
        // 上下文数据（var, FD, function arguments)
        }
    };
```
只有全局上下文的变量对象允许通过VO的属性名称来间接访问(因为在全局上下文里，全局对象自身就是变量对象，稍后会详细介绍)，在其它上下文中是不能直接访问VO对象的，因为它只是内部机制的一个实现。

当我们声明一个变量或一个函数的时候，和我们创建VO新属性的时候一样没有别的区别（即：有名称以及对应的值）。

例如：
```
    var a = 10;

    function test(x) {
        var b = 20;
    };

    test(30);
```

对应的变量对象是：
```
// 全局上下文的变量对象
    VO(globalContext) = {
        a: 10,
        test: <reference to function>
    };

// test函数上下文的变量对象
    VO(test functionContext) = {
        x: 30,
        b: 20
    };
```
在具体实现层面(以及规范中)变量对象只是一个抽象概念。(从本质上说，在具体执行上下文中，VO名称是不一样的，并且初始结构也不一样。

参考：
[深入理解JavaScript系列（12）：变量对象（Variable Object）](http://www.cnblogs.com/TomXu/archive/2012/01/16/2309728.html)

变量对象的创建，依次经历了以下几个过程。
1).建立arguments对象。检查当前上下文中的参数，建立该对象下的属性与属性值；

2).检查当前上下文的函数声明，也就是使用function关键字声明的函数。在变量对象中以函数名建立一个属性，属性值为指向该函数所在内存地址的引用。如果函数名的属性已经存在，那么该属性将会被新的引用所覆盖；

3).检查当前上下文中的变量声明，每找到一个变量声明，就在变量对象中以变量名建立一个属性，属性值为undefined。如果该变量名的属性已经存在，为了防止同名的函数被修改为undefined，则会直接跳过，原属性值不会被修改。

> 未进入执行阶段之前，变量对象中的属性都不能访问！但是进入执行阶段之后，变量对象转变为了活动对象，里面的属性都能被访问了，然后开始进行执行阶段的操作。这样，如果再面试的时候被问到变量对象和活动对象有什么区别，就又可以自如的应答了，他们其实都是同一个对象，只是处于执行上下文的不同生命周期。

### 五.JS是按值传递还是按引用传递?
[enter link description here](http://bosn.me/js/js-call-by-sharing/)
 - 最近遇到个有趣的问题：“JS中的值是按值传递，还是按引用传递呢？”
在分析这个问题之前，我们需了解什么是按值传递(call by value)，什么是按引用传递(call by reference)。在计算机科学里，这个部分叫求值策略(Evaluation Strategy)。它决定变量之间、函数调用时实参和形参之间值是如何传递的。

##### 按值传递 VS. 按引用传递

按值传递(call by value)是最常用的求值策略：函数的形参是被调用时所传实参的副本。修改形参的值并不会影响实参。

按引用传递(call by reference)时，函数的形参接收实参的隐式引用，而不再是副本。这意味着函数形参的值如果被修改，实参也会被修改。同时两者指向相同的值。

按引用传递会使函数调用的追踪更加困难，有时也会引起一些微妙的BUG。按值传递由于每次都需要克隆副本，对一些复杂类型，性能较低。两种传值方式都有各自的问题。

##### 按共享传递 call by sharing

准确的说，JS中的基本类型按值传递，对象类型按共享传递的(call by sharing，也叫按对象传递、按对象共享传递)。最早由Barbara Liskov. 在1974年的GLU语言中提出。该求值策略被用于Python、Java、Ruby、JS等多种语言。

该策略的重点是：调用函数传参时，函数接受对象实参引用的副本(既不是按值传递的对象副本，也不是按引用传递的隐式引用)。 它和按引用传递的不同在于：在共享传递中对函数形参的赋值，不会影响实参的值。如下面例子中，不可以通过修改形参o的值，来修改obj的值。

```
    var obj = {x : 1};
    function foo(o) {
        o = 100;
    }
    foo(obj);
    console.log(obj.x); // 仍然是1, obj并未被修改为100.
```

然而，虽然引用是副本，引用的对象是相同的。它们共享相同的对象，所以修改形参对象的属性值，也会影响到实参的属性值。
```
    var obj = {x : 1};
    function foo(o) {
        o.x = 3;
    }
    foo(obj);
    console.log(obj.x); // 3, 被修改了!
```

对于对象类型，由于对象是可变(mutable)的，修改对象本身会影响到共享这个对象的引用和引用副本。而对于基本类型，由于它们都是不可变的(immutable)，按共享传递与按值传递(call by value)没有任何区别，所以说JS基本类型既符合按值传递，也符合按共享传递。
`var a = 1; // 1是number类型，不可变 var b = a; b = 6;`

据按共享传递的求值策略，a和b是两个不同的引用(b是a的引用副本)，但引用相同的值。由于这里的基本类型数字1不可变，所以这里说按值传递、按共享传递没有任何区别。

##### 基本类型的不可变(immutable)性质

基本类型是不可变的(immutable)，只有对象是可变的(mutable). 例如数字值100, 布尔值true, false，修改这些值(例如把1变成3, 把true变成100)并没有什么意义。比较容易误解的，是JS中的string。有时我们会尝试“改变”字符串的内容，但在JS中，任何看似对string值的”修改”操作，实际都是创建新的string值。

```
var str = "abc";
str[0]; // "a"
str[0] = "d";
str;
// 仍然是"abc";赋值是无效的。没有任何办法修改字符串的内容
而对象就不一样了，对象是可变的。

var obj = {x : 1};
obj.x = 100;
var o = obj;
o.x = 1;
obj.x;   // 1  被修改
o = true;
obj.x;   // 1  不会因o = true改变
```

这里定义变量obj，值是object，然后设置obj.x属性的值为100。而后定义另一个变量o，值仍然是这个object对象，此时obj和o两个变量的值指向同一个对象（共享同一个对象的引用）。所以修改对象的内容，对obj和o都有影响。但对象并非按引用传递，通过o = true修改了o的值，不会影响obj。

##### 术语的不同版本

需要注意的是，求值策略中的“引用”和求值策略本身都是抽象概念，这里的引用和语言具体的引用(例如C++的&a, C#的ref参数)可以不同，请不要混淆。

由于JS在传递对象类型的值时，是按值传递引用的副本，参考Dmitry的博文(链接)目前，对JS的求值策略有两种解释：

JS采取的都是”按值传递”的求值策略, 其中对象类型较为特殊，实际为按值传递了引用(即传递引用的副本，而不是按引用传递引用)。从这个角度，说对象也是按值传递也是有道理的。(虽然笔者不是十分赞同).

引入“按共享传递”的求值策略，它让我们精确的区分按共享传递与经典的按值传递、按引用传递的不同。在这种情形下，可以按传参类型区分：“基本类型按值传递、而对象按共享传递。”（笔者更倾向的描述方式）
结论
虽然关于JS的求值策略有诸多争议和不同版本，博主比较倾向的结论是：

“JS中基本类型是按值传递的，对象类型是按共享传递的。”

语言抽象概念并非博主创造或臆造，文中所涉理论理论均有参考，详见下面之参考文献。

另感谢博客园园友@京山游侠 @greatim的精彩讨论和补充。

参考文献
Wikipedia.org-Evaluation strategy[enter link description here](https://en.wikipedia.org/wiki/Evaluation_strategy#Call_by_reference)
http://dmitrysoshnikov.com/-Evaluation Strategy[enter link description here](http://dmitrysoshnikov.com/ecmascript/chapter-8-evaluation-strategy/)
[enter link description here](https://en.wikipedia.org/wiki/Evaluation_strategy#Call_by_sharing)
[enter link description here](https://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language?lq=1)


每个函数在创建完成时，他有3个重要的内置属性（property）也同时被创建。{        AO //记录function内的变量，参数等信息        this // 就是在调用this.xx的时候的this        scope // 指向外层函数AO的一个链(在实现的时候，可能通过数组来实现).    }    JS中，大家经常讲的Scope其实是这样：SCOPE=AO+scope.
[enter link description here](https://www.zhihu.com/question/20019257/answer/13688887)

### 六.Symbol

#### 1.Symbol类型

1)为了避免属性名的冲突，ES6新增了Symbol类型。Symbol可以产生一个独一无二的值。
```
    let s1 = Symbol('a');
    let s2 = Symbol('a');
    console.log(s1); //Symbol(a)
    console.log(typeof s1); //symbol
    console.log(s1 == s2); //false
```

2)Symbol用于属性名
```
    var s1 = Symbol();
    var s2 = Symbol();
    var s3 = Symbol();
    var obj = {[s1]: 'hi'};
    obj[s2] = 'ES6';
    Object.defineProperty(obj, s3, {
        value: 'ES2015'
    });
    console.log(obj);
//Object {Symbol(): "hi", Symbol(): "ES6", Symbol(): "ES2015"}
    console.log(obj.s1);

//undefined -> 所以当用Symbol作为属性名时候，不能用.运算符访问属性
    console.log(obj[s1]); //hi
    console.log(obj['s1']); //undefined
```

> 注意：Symbol作为属性名，该属性不会出现在 for...in...和 for...of... 循环中，也不会被 `Object.keys()`, `Object.getOwnPropertyNames()` 返回。`Object.getOwnProertySymbols()`返回一个数组，成员是当前对象的所有用作属性名的symbol值。

> `Symbol.for()` 接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值，有就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值。

> `Symbol.keyFor()`方法返回一个已经登记的Symbol类型值的key。

Symbol()方法生成一个Symbol类型时，没有登记，所以每次调用Symbol（哪怕传入相同的字符串）会返回不同的Symbol，但是Symbol.for()在生成Symbol时候进行了登记，每次再次调用时，都会先寻找是否有传入相同参数的Symbol，故只有Symbol.for()产生的Symbol才能被Symbol.keyFor()找到。

```
    let s1 = Symbol('a');
    let s2 = Symbol('a');
    let s3 = Symbol.for('b');
    let s4 = Symbol.for('b');
    let name1 = Symbol.keyFor(s1);
    let name3 = Symbol.keyFor(s3);
    console.log(s1 == s2); //false
    console.log(s1 == s3); //false
    console.log(s2 == s3); //false
    console.log(s3 == s4); //true
    console.log(name1); //undefined
    console.log(name3); //b
```

### 七.CSS样式属性

##### `getComputedStyle`

是一个可以获取当前元素所有最终使用的CSS属性值。返回的是一个CSS样式声明对象([object CSSStyleDeclaration])，只读。

> `getComputedStyle()` gives the final used values of all the CSS properties of an element.

语法：
第一个参数是要获取属性的目标元素；第二个参数是可选的，用来获取某元素之下的伪类或者伪元素的属性；
```
    var box = window.getComputedStyle("元素");
    var dom = document.getElementById("test"),
    style = window.getComputedStyle(dom , "after");

//只是额外提示下：Gecko 2.0 (Firefox 4 / Thunderbird 3.3 / SeaMonkey 2.1) 之前，第二个参数“伪类”是必需的（如果不是伪类，设置为null），不过现在嘛，不是必需参数了。
```

`getComputedStyle`与`style`的区别
```
//我们使用`element.style`也可以获取元素的CSS样式声明对象，但是其与`getComputedStyle`方法还有有一些差异的。

//1.只读与可写
    正如上面提到的getComputedStyle方法是只读的，只能获取样式，不能设置；而element.style能读能写，能屈能伸。

//2.获取的对象范围
    getComputedStyle方法获取的是最终应用在元素上的所有CSS属性对象（即使没有CSS代码，也会把默认的都显示出来）；而element.style只能获取元素style属性中的CSS样式(即只能获取行内样式)。因此对于一个光秃秃的元素<p>，getComputedStyle方法返回对象中length属性值（如果有）就是190+(据我测试FF:192, IE9:195, Chrome:253, 不同环境结果可能有差异), 而element.style就是0。
```

`getComputedStyle`与`defaultView`
```
//1.如果我们查看jQuery源代码，会发现，其css()方法实现不是使用的`window.getComputedStyle`而是`document.defaultView.getComputedStyle`。

//2.实际上，使用`defaultView`基本上是没有必要的，`getComputedStyle`本身就存在window对象之中。根据DennisHall的说法，使用`defaultView`可能一是人们不太乐意在window上专门写个东西，二是让API在Java中也可用（这我不懂，忘指点~~）。

//3.不过有个特殊情况，在FireFox3.6上不使用`defaultView`方法就搞不定的，就是访问框架(`frame`)的样式。
```

`getComputedStyle`兼容性

对于桌面设备：
|浏览器|chrome|Firefox|IE|Opera|Safari|
|:--:|:--:|:--:|:--:|:--:|:--:|
|基本支持|√|√|9 |√|√|
|伪类元素支持|√|√|√|√|√|

对移动设备
|浏览器|Android|Firefox Mobile (Gecko)|IE Mobile|Opera Mobile|Safari Mobile|
|:--:|:--:|:--:|:--:|:--:|:--:|
|基本支持|√|√|WP7 Mango|√|√|
|伪类元素支持|√|√|√|√|√|
```
可以看到，getComputedStyle方法IE6~8是不支持的
```

`getComputedStyle`与`currentStyle`

`currentStyle`是IE浏览器自娱自乐的一个属性，其与`element.style`可以说是近亲，至少在使用形式上类似：`element.currentStyle`，差别在于`element.currentStyle`返回的是元素当前应用的最终CSS属性值（包括外链CSS文件，页面中嵌入的`<style>`属性等）。

因此，从作用上讲，`getComputedStyle`方法与`currentStyle`属性走的很近，形式上则`style`与`currentStyle`走的近。不过，`currentStyle`属性貌似不支持伪类样式获取，这是与`getComputedStyle`方法的差异，也是jQuery`css()`方法无法体现的一点。

仔细对比查看，我们可以看到不少差异，例如浮动属性，FireFox浏览器下是这个(cssFloat),而IE9浏览器下则是cssFloat和styleFloat都有。


`getPropertyValue`方法
可以获取CSS样式申明对象上的属性值（直接属性名称）；`window.getComputedStyle(element, null).getPropertyValue("float");`

如果我们不使用getPropertyValue方法，直接使用键值访问，其实也是可以的。但是，比如这里的的float，如果使用键值访问，则不能直接使用getComputedStyle(element, null).float，而应该是cssFloat与styleFloat，自然需要浏览器判断了，比较折腾！

使用getPropertyValue方法不必可以驼峰书写形式（不支持驼峰写法），例如：style.getPropertyValue("border-top-left-radius");

IE9+以及其他现代浏览器都支持,IE6-8不支持；

`getPropertyValue`和`getAttribute`

在老的IE浏览器（包括最新的），`getAttribute`方法提供了与`getPropertyValue`方法类似的功能，可以访问CSS样式对象的属性。用法与`getPropertyValue`类似：
   `style.getAttribute("float");`

注意到没，使用`getAttribute`方法也不需要`cssFloat`与`styleFloat`的怪异写法与兼容性处理。不过，还是有一点差异的，就是属性名需要驼峰写法，如下：
`style.getAttribute("backgroundColor");`

如果不考虑IE6浏览器，貌似也是可以这么写：
`style.getAttribute("background-color");`

```
getPropertyValue和getAttribute获取背景色：结果FireFox下一如既往的rgb颜色返回(Chrome也是返回rgb颜色)；

对于IE9浏览器，虽然应用的是currentStyle, 但是从结果上来讲，currentStyle返回的对象是完全支持getPropertyValue方法的。
```

`getPropertyValue`和`getPropertyCSSValue`
```
    从长相上看getPropertyCSSValue与getPropertyValue是近亲，但实际上，getPropertyCSSValue要顽劣的多。

    getPropertyCSSValue方法返回一个CSS最初值(CSSPrimitiveValue)对象(width, height, left, …)或CSS值列表(CSSValueList)对象(backgroundColor, fontSize, …)，这取决于style属性值的类型。在某些特别的style属性下，其返回的是自定义对象。该自定义对象继承于CSSValue对象（就是上面所说的getComputedStyle以及currentStyle返回对象）。

    getPropertyCSSValue方法兼容性不好，IE9浏览器不支持，Opera浏览器也不支持（实际支持，只是老是抛出异常）。而且，虽然FireFox中，style对象支持getPropertyCSSValue方法，但总是返回null. 因此，目前来讲，getPropertyCSSValue方法可以先不闻不问。
```

#### JavaScript有关的10个怪癖和秘密

1.Null是个对象
JavaScript众多类型中有个Null类型，它有个唯一的值null, 即它的字面量，定义为完全没有任何意义的值。其表现得像个对象，如下检测代码：`alert(typeof null); //弹出 'object'`

尽管typeof值显示是"object"，但null并不认为是一个对象实例。要知道，JavaScript中的值都是对象实例，每个数值都是Number对象，每个对象都是Object对象。因为null是没有值的，所以，很明显，null不是任何东西的实例。因此，下面的值等于false。

`alert(null instanceof Object); //为 false`
译者注：null还有被理解为对象占位符一说

2.NaN本意是表示某个值不是数值，但是其本身却又是数值，且不等于其自身，很奇怪吧，看下面的代码：
`alert(typeof NaN); //弹出 'Number'`
`alert(NaN === NaN); //为 false`

3.无关键字的数组等同于false(关于Truthy和Falsy)
下面是JavaScript另一个极品怪癖：
`alert(new Array() == false); //为 true`

想要知道这里发生了什么，你需要理解truthy和falsy这个概念。它们是一种true/flase字面量。在JavaScript中，所有的非Boolean型值都会内置一个boolean标志，当这个值被要求有boolean行为的时候，这个内置布尔值就会出现，例如当你要跟Boolean型值比对的时候。

因为苹果不能和梨做比较，所以当JavaScript两个不同类型的值要求做比较的时候，它首先会将其弱化成相同的类型。false, undefined, null, 0, "", NaN都弱化成false。这种强制转化并不是一直存在的，只有当作为表达式使用的时候。看下面这个简单的例子：
`var someVar = 0;`
`alert(someVar == false); //显示 true`

上面测试中，我们试图将数值0和boolean值false做比较，因两者的数据类型不兼容，JavaScript自动强制转换成统一的等同的truthy和falsy，其中0等同于false（正如上面所提及的）。

你可能注意到了，上面一些等同false的值中并没有空数组。只因空数组是个怪胚子：其本身实际上属于truthy，但是当空数组与Boolean型做比较的时候，其行为表现又属于falsy。不解？这是由原因的。先举个例子验证下空数组的奇怪脾气：
```
var someVar = []; //空数组
alert(someVar == false); //结果 true
if (someVar) alert('hello'); //alert语句执行, 所以someVar当作true
```

译者注：之所以会有这种差异，根据作者的说法，数组内置toString()方法，例如直接alert的时候，会以join(“,”)的形式弹出字符串，空数组自然就是空字符串，于是等同false。具体可参见作者另外一篇文章，Twisted logic: understanding truthy & falsy。不过我个人奇怪的是，像空对象，空函数，弱等于true或者false的时候都显示false，为何？真的因为数组是个怪胎，需要特殊考虑吗？

为避免强制转换在比较方面的问题，你可以使用强等于`===`代替弱等于`==`。


4.`replace()`可以接受回调函数

这是JavaScript最鲜为人知的秘密之一，v1.3中首次引入。大部分情况下，`replace()`的使用荧光类似下面：
`alert('10 13 21 48 52'.replace(/\d+/g, '*')); //用 * 替换所有的数字`

这是一个简单的替换，一个字符串，一个星号。但是，如果我们希望在替换发生的时候有更多的控制，该怎么办呢？我们只希望替换30以下的数值，该怎么办呢？此时如果仅仅依靠正则表达式是鞭长莫及的。我们需要借助回调函数的东风对每个匹配进行处理。

```
    alert('10 13 21 48 52'.replace(/\d+/g, function(m) {
        return parseInt(m) < 30 ? '*' : m;
}));
```

当每个匹配完成的时候，JavaScript应用回调函数，传递匹配内容给match参数。然后，根据回调函数里面的过滤规则，要么返回星号，要么返回匹配本身（无替换发生）。

5.正则表达式：不只是match和replace

不少javascript工程师都是只通过match和replace和正则表达式打交道。但JavaScript所定义的正则表达式相关方法远不止这两个。


其中值得一提的是test()，其工作方式类似match()，但是返回值却不一样：test()返回的是布尔型，用来验证是否匹配，执行速度高于match()。
`alert(/\w{3,}/.test('Hello')); //弹出 'true'`

上面行代码用来验证字符串是否有三个以上普通字符，显然"hello"是符合要求的，所以弹出true。

我们还应注意RegExp对象，你可以用此创建动态正则表达式对象，例如：

```
    function findWord(word, string) {
        var ofWord = string.match(new RegExp('\\b'+word+'\\b', 'ig'));
        alert(ofWord);
    }
    findWord('car', 'Carl went to buy a car but had forgotten his credit card.');
```

这儿，我们基于参数word动态创建了匹配验证。这段测试代码作用是不区分大小选的情况下选择car这个单词。眼睛一扫而过，测试英文句子中只有一个单词是car，因此这里的演出仅一个单词。\b是用来表示单词边界的。

6.你可以冒充作用域

作用域这玩意是用来决定什么变量是可用的，独立的JavaScript（如JavaScript不是运行在函数中）在window对象的全局作用域下操作，window对象在任何情况下都可以访问。然而函数中声明的局部变量只能在该函数中使用。

```
    var animal = 'dog';
    function getAnimal(adjective) {
        alert(adjective+' '+this.animal);
    }
    getAnimal('lovely'); //弹出 'lovely dog'
```

这儿我们的变量和函数都声明在全局作用域中。因为this指向当前作用域，在这个例子中就是window。因此，该函数寻找window.animal，也就是'dog'了。到目前为止，一切正常。然而，实际上，我们可以让函数运行在不同的作用域下，而忽视其本身的作用域。我们可以用一个内置的称为call()的方法来实现作用域的冒充。

```
    var animal = 'dog';
    function getAnimal(adjective) {
        alert(adjective+' '+this.animal);
    };
    var myObj = {animal: 'camel'};
    getAnimal.call(myObj, 'lovely'); //弹出 'lovely camel'

//call()方法中的第一个参数可以冒充函数中的this，因此，这里的this.animal实际上就是myObj.animal，也就是'camel'了。后面的参数就作为普通参数传给函数体。
```

另外一个与之相关的是apply()方法，其作用于call()一样，不同之处在于，传递给函数的参数是以数组形式表示的，而不是独立的变量们。所以，上面的测试代码如果用apply()表示就是：
`getAnimal.apply(myObj, ['lovely']); //函数参数以数组形式发送`

7.函数可以执行其本身
`(function() { alert('hello'); })(); //弹出 'hello'`

这里的解析足够简单：声明一个函数，然后因为()解析立即执行它。你可能会奇怪为何要这么做（指直接屁股后面()调用），这看上去是有点自相矛盾的：函数包含的通常是我们想稍后执行的代码，而不是当下解析即执行的，否则，我们就没有必要把代码放在函数中。

另外一个执行函数自身(self-executing functions (SEFs))的不错使用是为在延迟代码中使用绑定变量值，例如事件的回调(callback)，超时执行(timeouts)和间隔执行(intervals)。如下例子：

```
    var someVar = 'hello';
    setTimeout(function() {
        alert(someVar);
    }, 1000);
    var someVar = 'goodbye';
```
Newbies在论坛里总问这里timeout的弹出为什么是goodbye而不是hello？答案就timeout中的回调函数直到其运行的时候才去赋值someVar变量的值。而那个时候，someVar已经被goodbye重写了好长时间了。

SEFs提供了一个解决此问题的方法。不是像上面一样含蓄地指定timeout回调，而是直接将someVar值以参数的形式传进去。效果显著，这意味着我们传入并孤立了someVar值，保护其无论后面是地震海啸还是女朋友发飙咆哮都不会改变。

```
var someVar = 'hello';
setTimeout((function(someVar) {
	return function()  { alert(someVar); }
})(someVar), 1000);
var someVar = 'goodbye';
```

风水轮流转，这次，这里的弹出就是hello了。这就是函数参数和外部变量的点差别了哈。


8.FireFox以RGB格式读与返回颜色而非Hex

直到现在我都没有真正理解为何Mozilla会这样子。为了有个清晰的认识，看下面这个例子：
```
<!--
#somePara { color: #f90; }
-->

<p id="somePara">Hello, world!</p>

<script>
var ie = navigator.appVersion.indexOf('MSIE') != -1;
var p = document.getElementById('somePara');
alert(ie ? p.currentStyle.color : getComputedStyle(p, null).color);
</script>
```

大部分浏览器弹出的结果是`#ff9900`，而FireFox的结果却是`rgb(255, 153, 0)`，RGB的形式。经常，处理颜色的时候，我们需要花费不少代码将RGB颜色转为Hex。

9.`0.1 + 0.2 !== 0.3`

这个古怪的问题不只会出现在JavaScript中，这是计算机科学中一个普遍存在的问题，影响了很多的语言。标题等式输出的结果是0.30000000000000004。

这是个被称为机器精度的问题。当JavaScript尝试执行(0.1 + 0.2)这行代码的时候，会把值转换成它们喜欢的二进制口味。这就是问题的起源，0.1实际上并不是0.1，而是其二进制形式。

从本质上将，当你写下这些值的时候，它们注定要失去精度。你可能只是希望得到个简单的两位小数，但你得到的（根据Chris Pine的注解）是二进制浮点计算。好比你想把一段应该翻译成中文简体，结果出来的确实繁体，其中还是有差异是不一样的。

一般处理与此相关的问题有两个做法：
转换成整数在计算，计算完毕在转换成希望的小数内容
调整你的逻辑，设定允许范围为不是指定结果。
例如，我们不应该下面这样：
```
    var num1 = 0.1, num2 = 0.2, shouldEqual = 0.3;
    alert(num1 + num2 == shouldEqual); //false
    //而可以试试这样：
    alert(num1 + num2 > shouldEqual - 0.001 && num1 + num2 < shouldEqual + 0.001); //true
```

10.未定义(undefined)可以被定义(defined)
我们以一个和风细雨的小古怪结束。听起来可能有点奇怪，undefined并不是JavaScript中的保留字，尽管它有特殊的意义，并且是唯一的方法确实变量是否未定义。因此：
```
    var someVar;
    alert(someVar == undefined); //显示 true
```

目前为止，一切看上去风平浪静，正常无比，但剧情总是很狗血：
```
    undefined = "I'm not undefined!";
    var someVar;
    alert(someVar == undefined); //显示 false!
```

这就是为什么jQuery源码中最外部的闭包函数要有个并没有传入的undefined参数，目的就是保护undefined不要被外部的一些不良乘虚而入。

> 2013年08月10日 10:58 ：刚试了下，在最新的火狐、Chrome及IE9、10上，undefined不可以被defined。只有在IE6、8上才可以。
参考：[张鑫旭-鑫空间-鑫生活](http://www.zhangxinxu.com/wordpress/?p=2378)

##### `document.body` 与 `document.documentElement`区别介绍

- `document.body`：返回html dom中的body节点 即`<body>`
- `document.documentElement`：返回html dom中的root 节点 即`<html>`

```
//没使用DTD情况即怪异模式BackCompat下：
    document.documentElement.clientHeight=0;
    document.body.clientHeight=618 ;

//使用DTD情况即标准模式CSS1Compat下：
    document.documentElement.clientHeight=618;
    document.body.clientHeight=28(表示内容的高度);
```


### 八.JavaScript 全局对象

#### 1.顶层函数（全局函数）

|函数|描述|
|--|--|
|decodeURI()|解码某个编码的 URI。|
|decodeURIComponent()|解码一个编码的 URI 组件。|
|encodeURI()|把字符串编码为 URI。|
|encodeURIComponent()|把字符串编码为 URI 组件。|
|escape()|对字符串进行编码。|
|eval()|计算JS字符串，并作为脚本代码来执行。|
|getClass()|返回一个 JavaObject 的 JavaClass。|
|isFinite()|检查某个值是否为有穷大的数。|
|isNaN()|检查某个值是否是数字。|
|Number()|把对象的值转换为数字。|
|parseFloat()|解析一个字符串并返回一个浮点数。|
|parseInt()|解析一个字符串并返回一个整数。|
|String()|把对象的值转换为字符串。|
|unescape()|对由 escape() 编码的字符串进行解码|

- `decodeURI()`

```
定义和用法
decodeURI() 可对 encodeURI() 编码过的 URI 进行解码。

语法
decodeURI(URIstring)

参数
必需。一个字符串，含有要解码的 URI 或其他要解码的文本。

返回值
URIstring 的副本，其中的十六进制转义序列将被它们表示的字符替换。

var test1="http://www.w3school.com.cn/My first/";
console.log(encodeURI(test1)+ "<br />")
console.log(decodeURI(test1))
//  http://www.w3school.com.cn/My%20first/
//  http://www.w3school.com.cn/My first/
```

- `decodeURIComponent()`

```
定义和用法
decodeURIComponent() 可对 encodeURIComponent() 编码的 URI 进行解码。

语法
decodeURIComponent(URIstring)

参数
必需。一个字符串，含有编码 URI 组件或其他要解码的文本。

返回值
URIstring 的副本，其中的十六进制转义序列将被它们表示的字符替换。

var test1="http://www.w3school.com.cn/My first/";
console.log(encodeURIComponent(test1)+ "<br />")
console.log(decodeURIComponent(test1))
//  http%3A%2F%2Fwww.w3school.com.cn%2FMy%20first%2F
//  http://www.w3school.com.cn/My first/
```

- `encodeURI()`

```
定义和用法
encodeURI() 函数可把字符串作为 URI 进行编码。

语法
encodeURI(URIstring)

参数
必需。一个字符串，含有 URI 或其他要编码的文本。

返回值
URIstring 的副本，其中的某些字符将被十六进制的转义序列进行替换。

说明
该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。
该方法的目的是对 URI 进行完整的编码，因此对以下在 URI 中具有特殊含义的 ASCII 标点符号，encodeURI() 函数是不会进行转义的：;/?:@&=+$,#

提示和注释
提示：如果 URI 组件中含有分隔符，比如 ? 和 #，则应当使用 encodeURIComponent() 方法分别对各组件进行编码。

console.log(encodeURI("http://www.w3school.com.cn"))
console.log(encodeURI("http://www.w3school.com.cn/My first/"))
console.log(encodeURI(",/?:@&=+$#"))
//  http://www.w3school.com.cn
//  http://www.w3school.com.cn/My%20first/
//  ,/?:@&=+$#
```

- `encodeURIComponent()`

```
定义和用法
encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。

语法
encodeURIComponent(URIstring)

参数
必需。一个字符串，含有 URI 组件或其他要编码的文本。

返回值
URIstring 的副本，其中的某些字符将被十六进制的转义序列进行替换。

说明
该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： - _ . ! ~ * ' ( ) 。
其他字符（比如 ：;/?:@&=+$,# 这些用于分隔 URI 组件的标点符号），都是由一个或多个十六进制的转义序列替换的。

提示和注释
提示：请注意 encodeURIComponent() 函数 与 encodeURI() 函数的区别之处，前者假定它的参数是 URI 的一部分（比如协议、主机名、路径或查询字符串）。因此 encodeURIComponent() 函数将转义用于分隔 URI 各个部分的标点符号。

console.log(encodeURIComponent("http://www.w3school.com.cn"))
document.write(encodeURIComponent("http://www.w3school.com.cn/p 1/"))
console.log(encodeURIComponent(",/?:@&=+$#"))
//  http%3A%2F%2Fwww.w3school.com.cn
//  http%3A%2F%2Fwww.w3school.com.cn%2Fp%201%2F
//  %2C%2F%3F%3A%40%26%3D%2B%24%23
```

- `escape()`

```
定义和用法
escape() 函数可对字符串进行编码，这样就可以在所有的计算机上读取该字符串。

语法
escape(string)

参数
必需。要被转义或编码的字符串。

返回值
已编码的 string 的副本。其中某些字符被替换成了十六进制的转义序列。

说明
该方法不会对 ASCII 字母和数字进行编码，也不会对下面这些 ASCII 标点符号进行编码： * @ - _ + . / 。其他所有的字符都会被转义序列替换。

提示和注释
提示：可以使用 unescape() 对 escape() 编码的字符串进行解码。
注释：ECMAScript v3 反对使用该方法，应用使用 decodeURI() 和 decodeURIComponent() 替代它。

console.log(escape("Visit W3School!") + "<br />")
console.log(escape("?!=()#%&"))
//  Visit%20W3School%21
//  %3F%21%3D%28%29%23%25%26
```

- `eval()`

```
定义和用法
eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。

语法
eval(string)

参数
必需。要计算的字符串，其中含有要计算的 JavaScript 表达式或要执行的语句。

返回值
通过计算 string 得到的值（如果有的话）。

说明
该方法只接受原始字符串作为参数。如果 string 参数不是原始字符串，那么该方法将不作任何改变地返回。因此请不要为 eval() 函数传递 String 对象来作为参数。
如果试图覆盖 eval 属性或把 eval() 方法赋予另一个属性，并通过该属性调用它，则 ECMAScript 实现允许抛出一个 EvalError 异常。

抛出
如果参数中没有合法的表达式和语句，则抛出 SyntaxError 异常。
如果非法调用 eval()，则抛出 EvalError 异常。
如果传递给 eval() 的 Javascript 代码生成了一个异常，eval() 将把该异常传递给调用者。

提示和注释
提示：虽然 eval() 的功能非常强大，但在实际使用中用到它的情况并不多。

eval("x=10;y=20;document.write(x*y)")
console.log(eval("2+2"))
var x=10
console.log(eval(x+17))
//  200
//  4
//  27
：
eval("2+3")	// 返回 5
var myeval = eval;	// 可能会抛出 EvalError 异常
myeval("2+3");	// 可能会抛出 EvalError 异常

可以使用下面这段代码来检测 eval() 的参数是否合法：
    try  {
        alert("Result:" + eval(prompt("Enter an expression:","")));
    }catch(exception) {
        alert(exception);
    }
```

- `getClass()`

```
定义和用法
getClass() 函数可返回一个 JavaObject 的 JavaClass。

语法
getClass(javaobj)

参数
javaobj	一个 JavaObject 对象。

返回值
javaobj 的 JavaClass 对象。

说明
该函数可接受一个 JavaObject 对象作为其参数，并返回该对象的 JavaClass，即返回 JavaClass 对象。该 JavaClass 对象表示 Java 对象的 Java 类，而这个 Java 对象所表示的 Java 类是由 JavaObject 指定的。

习惯用法
请不要把 JavaScript 的 getClass() 函数与所有 Java 对象的 getClass 方法混淆在一起。也不要把 JavaScript 的 JavaClass 对象与 Java java.lang.Class 类混淆了。

请看下面这行代码，它可创建一个 Java Rectangle 对象：

    var obj = new java.awt.Rectangle();

obj 是一个保存了 JavaObject 的 JavaScript 变量。我们可以调用 JavaScript 函数 getClass() 返回一个 JavaClass 对象，该 JavaClass 对象表示 java.awt.Rectangle 类：

    var cls = getClass(obj);

而调用 Java getClass() 的方式有所不同，且执行完全不同的功能：

    cls = obj.getClass();

在执行了上面这行代码后，cls 是表示 java.lang.class 对象的一个 Java Object。这个 java.lang.class 对象是一个 Java 对象，它是 java.awt.Rectangle 类的一个 Java 表示。

最后，对于任何的 JavaObject obj，您do会看到下面的表示式始终为 true：

    (getClass(obj.getClass()) == java.lang.Class)
```

- `isFinite()`

```
定义和用法
isFinite() 函数用于检查其参数是否是无穷大。

语法
isFinite(number)

参数
必需。要检测的数字。

返回值
如果 number 是有限数字（或可转换为有限数字），那么返回 true。否则，如果 number 是 NaN（非数字），或者是正、负无穷大的数，则返回 false。

console.log(isFinite(123)+ "<br />")   //true
console.log(isFinite(-1.23)+ "<br />")  //true
console.log(isFinite(5-2)+ "<br />")  //true
console.log(isFinite(0)+ "<br />")  //true
console.log(isFinite("Hello")+ "<br />")  //false
console.log(isFinite("2005/12/12")+ "<br />")  //false
```

- `isNaN()`

```
定义和用法
isNaN() 函数用于检查其参数是否是非数字值。

语法
isNaN(x)
参数
必需。要检测的值。

返回值
如果 x 是特殊的非数字值 NaN（或者能被转换为这样的值），返回的值就是 true。如果 x 是其他值,则返回 false。

说明
isNaN() 函数可用于判断其参数是否是 NaN，该值表示一个非法的数字（比如被 0 除后得到的结果）。
如果把 NaN 与任何值（包括其自身）相比得到的结果均是 false，所以要判断某个值是否是 NaN，不能使用 == 或 === 运算符。正因为如此，isNaN() 函数是必需的。

提示和注释
提示：isNaN() 函数通常用于检测 parseFloat() 和 parseInt() 的结果，以判断它们表示的是否是合法的数字。当然也可以用 isNaN() 函数来检测算数错误，比如用 0 作除数的情况。

console.log(isNaN(123));  //false
console.log(isNaN(-1.23));  //false
console.log(isNaN(5-2));  //false
console.log(isNaN(0));  //false
console.log(isNaN("Hello"));  //true
console.log(isNaN("2005/12/12"));  //true
```

- `Number()`

```
定义和用法
Number() 函数把对象的值转换为数字。

语法
Number(object)

参数
必需。JavaScript 对象。

返回值
如果参数是 Date 对象，Number() 返回从 1970 年 1 月 1 日至今的毫秒数。
如果对象的值无法转换为数字，那么 Number() 函数返回 NaN。

var test1= new Boolean(true);
var test2= new Boolean(false);
var test3= new Date();
var test4= new String("999");
var test5= new String("999 888");
console.log(Number(test1)+ "<br />");  //1
console.log(Number(test2)+ "<br />");  //0
console.log(Number(test3)+ "<br />");  //125657776588
console.log(Number(test4)+ "<br />");  //999
console.log(Number(test5)+ "<br />");  //NaN
```

- `parseFloat()`

```
定义和用法
parseFloat() 函数可解析一个字符串，并返回一个浮点数。
该函数指定字符串中的首个字符是否是数字。如果是，则对字符串进行解析，直到到达数字的末端为止，然后以数字返回该数字，而不是作为字符串。

语法
parseFloat(string)

参数
必需。要被解析的字符串。

详细说明
parseFloat 是全局函数，不属于任何对象。
parseFloat 将它的字符串参数解析成为浮点数并返回。如果在解析过程中遇到了正负号（+ 或 -）、数字 (0-9)、小数点，或者科学记数法中的指数（e 或 E）以外的字符，则它会忽略该字符以及之后的所有字符，返回当前已经解析到的浮点数。同时参数字符串首位的空白符会被忽略。
如果参数字符串的第一个字符不能被解析成为数字，则 parseFloat 返回 NaN。
提示：您可以通过调用 isNaN 函数来判断 parseFloat 的返回结果是否是 NaN。如果让 NaN 作为了任意数学运算的操作数，则运算结果必定也是 NaN。

返回值
返回解析后的数字。

提示和注释
注释：开头和结尾的空格是允许的。
提示：如果字符串的第一个字符不能被转换为数字，那么 parseFloat() 会返回 NaN。
提示：如果只想解析数字的整数部分，请使用 parseInt() 方法。

console.log(parseFloat("10"))   //10
console.log(parseFloat("10.00"))   //10
console.log(parseFloat("10.33"))   //10.33
console.log(parseFloat("34 45 66"))   //34
console.log(parseFloat(" 60 "))   //60
console.log(parseFloat("40 years"))  //40
console.log(parseFloat("He was 40"))  //NaN
```

- `parseInt()`

```
定义和用法
parseInt() 函数可解析一个字符串，并返回一个整数。

语法
parseInt(string, radix)

参数
string	必需。要被解析的字符串。
radix	可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。如果省略该参数或其值为 0，则数字将以 10 为基础来解析。如果它以 “0x” 或 “0X” 开头，将以 16 为基数。如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN。

返回值
返回解析后的数字。

说明
当参数 radix 的值为 0，或没有设置该参数时，parseInt() 会根据 string 来判断数字的基数。
举例，如果 string 以 "0x" 开头，parseInt() 会把 string 的其余部分解析为十六进制的整数。如果 string 以 0 开头，那么 ECMAScript v3 允许 parseInt() 的一个实现把其后的字符解析为八进制或十六进制的数字。如果 string 以 1 ~ 9 的数字开头，parseInt() 将把它解析为十进制的整数。

提示和注释
注释：只有字符串中的第一个数字会被返回。
注释：开头和结尾的空格是允许的。
提示：如果字符串的第一个字符不能被转换为数字，那么 parseFloat() 会返回 NaN。

console.log(parseInt("10"));			//返回 10
console.log()parseInt("19",10);		//返回 19 (10+9)
console.log()parseInt("11",2);		//返回 3 (2+1)
console.log()parseInt("17",8);		//返回 15 (8+7)
console.log()parseInt("1f",16);		//返回 31 (16+15)
console.log()parseInt("010");		//未定：返回 10 或 8
```

- `String()`

```
定义和用法
String() 函数把对象的值转换为字符串。

语法
String(object)

参数
必需。JavaScript 对象。

var test1= new Boolean(1);
var test2= new Boolean(0);
var test3= new Boolean(true);
var test4= new Boolean(false);
var test5= new Date();
var test6= new String("999 888");
var test7=12345;
console.log(String(test1)+ "<br />");  //true
console.log(String(test2)+ "<br />");  //false
console.log(String(test3)+ "<br />");  //true
console.log(String(test4)+ "<br />");  //false
console.log(String(test5)+ "<br />");  //Wed Oct 28 00:17:40 UTC+0800 2009
console.log(String(test6)+ "<br />");  //999 888
console.log(String(test7)+ "<br />");  //12345
```

- `unescape()`

```
定义和用法
unescape() 函数可对通过 escape() 编码的字符串进行解码。

语法
unescape(string)

参数
必需。要解码或反转义的字符串。

返回值
string 被解码后的一个副本。

说明
该函数的工作原理是这样的：通过找到形式为 %xx 和 %uxxxx 的字符序列（x 表示十六进制的数字），用 Unicode 字符 \u00xx 和 \uxxxx 替换这样的字符序列进行解码。

提示和注释
注释：ECMAScript v3 已从标准中删除了 unescape() 函数，并反对使用它，因此应该用 decodeURI() 和 decodeURIComponent() 取而代之。

var test1="Visit W3School!"
test1=escape(test1)
console.log(test1)  //Visit%20W3School%21
test1=unescape(test1)
console.log(test1)  //Visit W3School!
```

#### 2.顶层属性（全局属性）

|方法|描述|
|--|--|
|Infinity|代表正的无穷大的数值。|
|java|代表 java.* 包层级的一个 JavaPackage。|
|NaN|指示某个值是不是数字值。|
|Packages|根 JavaPackage 对象。|
|undefined|指示未定义的值。|

- `Infinity`

```
定义和用法
Infinity 属性用于存放表示正无穷大的数值。

语法
Infinity

说明
无法使用 for/in 循环来枚举 Infinity 属性，也不能用 delete 运算符来删除它。
Infinity 不是常量，可以把它设置为其他值。

var t1=1.7976931348623157E+10308
console.log(t1)  //Infinity
var t2=-1.7976931348623157E+10308
console.log(t2)  //-Infinity
```

- `java `

```
定义和用法
表示 java.* 包层级的 JavaPackage。

语法
java

说明
在包含了 LiveConnect 或其他用于脚本化 Java 的技术的 JavaScript 实现中，全局 java 属性就是一个 JavaPackage 对象，它表示 java.* 包层级。这个属性的存在意味着像 java.util 这样的一个 JavaScript 表示式引用的是 java.util 包。对于不符合 java.* 层级的 Java 包，请参阅全局 Packages 属性。
```

- `NaN`

```
定义和用法
NaN 属性用于引用特殊的非数字值。

语法
NaN

说明
无法使用 for/in 循环来枚举 NaN 属性，也不能用 delete 运算符来删除它。
NaN 不是常量，可以把它设置为其他值。

提示和注释
提示：请使用 isNaN() 来判断一个值是否是数字。原因是 NaN 与所有值都不相等，包括它自己。

var test1="300"
var test2="Hello World!"
console.log(Number(test1))  //300
console.log(Number(test2))  //NaN
console.log(isNaN(test1))  //false
console.log(isNaN(test2))  //true
```

- `Packages`

```
定义和用法
根 JavaPackage。

语法
Packages

说明
在包含了 LiveConnect 或其他用于脚本化 Java 的技术的 JavaScript 实现中，全局 Packages 属性就是一个 JavaPackage 对象，其属性是 Java 解释器所知道的所有包的根。例如，Packages.javax.swing 引用的是 Java 包 javax.swing。全局属性 java 是 Packages.java 的简写。
```

- `undefined`

```
定义和用法
undefined 属性用于存放 JavaScript 的 undefined 值。

语法
undefined

说明
无法使用 for/in 循环来枚举 undefined 属性，也不能用 delete 运算符来删除它。
undefined 不是常量，可以把它设置为其他值。
当尝试读取不存在的对象属性时也会返回 undefined。

提示和注释
提示：只能用 === 运算来测试某个值是否是未定义的，因为 == 运算符认为 undefined 值等价于 null。
注释：null 表示无值，而 undefined 表示一个未声明的变量，或已声明但没有赋值的变量，或一个并不存在的对象属性。

var t1="";
var t2;
if (t1===undefined) {console.log("t1 is undefined")};
if (t2===undefined) {console.log("t2 is undefined")};

  //t2 is undefined
```

#### 3.全局对象描述

全局对象是预定义的对象，作为 JavaScript 的全局函数和全局属性的占位符。通过使用全局对象，可以访问所有其他所有预定义的对象、函数和属性。全局对象不是任何对象的属性，所以它没有名称。

在顶层 JavaScript 代码中，可以用关键字 this 引用全局对象。但通常不必用这种方式引用全局对象，因为全局对象是作用域链的头，这意味着所有非限定性的变量和函数名都会作为该对象的属性来查询。例如，当JavaScript 代码引用 parseInt() 函数时，它引用的是全局对象的 parseInt 属性。全局对象是作用域链的头，还意味着在顶层 JavaScript 代码中声明的所有变量都将成为全局对象的属性。
全局对象只是一个对象，而不是类。既没有构造函数，也无法实例化一个新的全局对象。

在 JavaScript 代码嵌入一个特殊环境中时，全局对象通常具有环境特定的属性。实际上，ECMAScript 标准没有规定全局对象的类型，JavaScript 的实现或嵌入的 JavaScript 都可以把任意类型的对象作为全局对象，只要该对象定义了这里列出的基本属性和函数。例如，在允许通过 LiveConnect 或相关的技术来脚本化 Java 的 JavaScript 实现中，全局对象被赋予了这里列出的 java 和 Package 属性以及 getClass() 方法。而在客户端 JavaScript 中，全局对象就是 Window 对象，表示允许 JavaScript 代码的 Web 浏览器窗口。
例子

在 JavaScript 核心语言中，全局对象的预定义属性都是不可枚举的，所有可以用 for/in 循环列出所有隐式或显式声明的全局变量，如下所示：

```
    var variables = "";
    for (var name in this) {
        variables += name;
    }
    console.log(variables);
```



## js方法总结

### 1.数组去重的四种方法

1.`includes()`
```
//方法一:循环数组ary1,拿到每一项,放到aryNew中,放之前先判断,数组aryNew中没有才往里面放,有的话就不要放了

    function fn1(aryOld) {
        var aryNew = [];
        for (var i = 0; i < aryOld.length; i++) {
            if (!aryNew.includes(aryOld[i])) {
                //只有aryNew中没有当前这一项的时候才放
                aryNew.push(aryOld[i])
            }
        }
        return aryNew;//返回值是去重后的新数组
    }
    console.log(fn1(ary1));

    //简化
    function fn2(aryOld) {
        var aryNew = [];
        aryOld.forEach(function (item) {
            !aryNew.includes(item) ? aryNew.push(item) : null;
        });
        return aryNew;
    }
    console.log(fn2(ary1));
```

2.`indexOf() & lastIndexOf()`
```
//循环数组ary1中的每一项,判断这一项的indexOf和lastIndexOf相不相等,不相等说明至少有俩个,那么我删掉前面的,注意i--
    for (var i = 0; i < ary1.length; i++) {
        if (ary1.indexOf(ary1[i]) !== ary1.lastIndexOf(ary1[i])) {
            ary1.splice(i, 1);
            i--;//防止数组塌陷
        }
    }
//注意:以后在循环数组的时候,如果你删掉了数组的前面项,一定要i--,防止数组塌陷
    console.log(ary1);
```

3.`filter()`
```
//方法三:使用的是filter方法 遍历每一项的时候,看看在这一项之前数组中没有,没有的话返回true留下,有的话返回false不要

    var aryNew = ary1.filter(function (item, index) {
        //ary1.slice(0, index)当前项之前的内容
        return !ary1.slice(0, index).includes(item)
    });
    console.log(aryNew);
```

4.利用对象的属性名不可以重复来实现数组去重
```
    Array.prototype.remove=function () {
        var obj={},ary=[];
        this.forEach(function (item) {
            obj[item]=item;
        });
        for (var key in obj){
            //key 是字符串
            ary.push(obj[key])
        }
        return ary
    };
    console.log(ary.remove());


let aryy=[1,2,3,1,2];
function sortAry(ary){
  if(ary instanceof Array){
    let obj={};
    ary.forEach((item)=>{
      obj[item]=item;
    });
    let newAry=Object.keys(obj);
    for(let i=0;i<newAry.length;i++){
      newAry[i]=Number(newAry[i]);
    }
    return newAry;
  }else{
    return "输入参数错误"
  }
}

console.log(sortAry(aryy));
console.log(sortAry({}));
```

### 2.类数组转为数组的四种方式

#### 1.扩展运算符

```
var a = 'asdf';

function toArray(arrayLike) {
  var ary = [];
  return ary = [...arrayLike];
}

toArray(a); //[ "a", "s", "d", "f" ]
```

#### 2.循环

```
var a = 'asdf';

function toArray(arrayLike) {
  var ary=[];
  for (var i=0;i<arrayLike.length;i++){
    ary.push(arrayLike[i])
  }
  return ary;
}

toArray(a); //[ "a", "s", "d", "f" ]
```

#### 3.`cal()`

```
var a = 'asdf';

function toArray(arrayLike) {
  return [].slice.call(arrayLike);
  // return [].slice.call(arrayLike,0);
  // return Array.prototype.slice.call(arrayLike);
}

toArray(a); //[ "a", "s", "d", "f" ]
```

#### 4.`Array.from()`

```
var a = 'asdf';

function toArray(arrayLike) {
  return Array.from(arrayLike);
}
toArray(a); //[ "a", "s", "d", "f" ]
```

> 在上面四个函数中，若用`arguments`代替`arrayLike`,会得到不一样的结果。一个转化的是参数，一个转化的是参数集合。

### 3.检测数据类型的四种方式，一个方法

1.`typeof 检测内容 `

可以详细检测基本数据类型(例外：`null--->Object`)，对于引用数据类型只有`Object`和`function` 2个结果。

有时候，`typeof`操作符会返回一些令人疑惑但技术上正确的值。比如，调用`typeof null`会返回`“object”`，因为特殊值`null`被认为是一个空的对象引用。Safari5及之前版本、chrome7及之前的版本在对正则表达式调用`typeof`操作符时会返回`“undefined”`，而其他浏览器会返回`“object”`。

> `typeof` 出现两次及以上，任何类型数据都会变成字符串数据类型；

1. `检测内容 instanceof 类 `

检测对象是不是类的一个实例，因为每一种数据类型都有自己所属的类，所以可以使用这个方法来检测数据类型；

但是要注意：对于基本数据类型只有通过构造函数创建方式可以检测出来，对于引用数据类型则两种方式都可以进行检测；

3. `检测内容.constructor.name `

利用的是类原型上的`constructor`属性指向类本身的原理。检测内容通过`__proto__`找到所属类的原型`prototype`，原型`prototype`上的`constructor`正好指向类本身。

> 类是个函数,我们可以通过函数名拿到；不能检测`null`，可以检测`undefined`；

4. `Object.prototype.toString.call(检测的内容)`

利用`Object`原型上的`toString`方法，通过改变`this`来实现数据类型的检测；

> 能检测`null`，也可以检测`undefined`；

```
    var obj={};
    console.log(obj.toString());
    //"[object Object]"

    var str=Object.prototype.toString.call({});
    console.log(str.slice(8, str.length - 1));
    //Object

    function getType1(o) {
        var type=typeof o;
        if(type=="object"){
            //type=o.constructor.name;
            type=Object.prototype.toString.call(o);
            type=type.slice(8,type.length-1);
        };
        return type;
    }

    console.log(getType1({}));//Object
    console.log(getType1(null));//Null
    console.log(getType1(undefined));//undefined
    console.log(getType1(NaN));//number
```

### 4.求最大/小值三种方式

```
    var ary=[1,25,42,12,3,6,9];
    //Math.max(1,25,42,12,3,6,9)

    //1  eval
    eval("Math.max("+ary+")");

    //2  apply
    Math.max.apply(null,ary);

    //3  ...
    Math.max(...ary);
```

### 5.日期格式转换的方法
```
    var str="2017-05-04";
    var ary=["年","月","日"];

    //1.
    var s=str.replace(/[-]/g,function(){
        return ary[0];
    });
    var s1=s.replace(/[-]/g,function(){
        return ary[1];
    });
    var s2=s1.replace(/04\b/,function(){
        return "04"+ary[2];
    });
    console.log(s2);//2017年05年04日

    //2.
    var a=str.split("-");
    var st="";
    a.forEach(function(item,index){
        st+=Number(item)+ary[index];
    })
    console.log(st);//2017年5月4日

    //3.
    var s=str.replace(/(\d+)-(\d+)-(\d+)/,function(){
    var m=arguments[1]+ary[0]+Number(arguments[2])+ary[1]+Number(arguments[3])+ary[2];
        return m;
    })
    console.log(s);//2017年5月4日

    //4.
    var s=str.replace(/(\d+)-(\d+)-(\d+)/,"$1年$2月$3日");
    //"$1"+ary[0]+"$2"+ary[1]+"$3"+ary[2];
    console.log(s);//2017年05月04日
```

### 6.数组方法

1.`forEach()`
```
    Array.prototype.forEach=function (fn,obj) {
        //this:数组实例
        //循环数组让函数fn 依次执行,执行的时候通过call来改变fn的this,给fn传三个参数(当前项this[i],索引i,原数组this)
        //forEach不需要要返回值
        for(var i=0;i<this.length;i++){
            fn.call(obj,this[i],i,this);
        }
    };
```

2.`map()`
```
    Array.prototype.map=function (fn,obj) {
        //this:数组实例
        //循环数组让函数fn 依次执行,执行的时候通过call来改变fn的this,给fn传三个参数(当前项this[i],索引i,原数组this),将返回值值push到数组ary中
        //返回值:fn每次执行的结果组成的新的数组ary
        var ary=[];
        for(var i=0;i<this.length;i++){
            ary.push(fn.call(obj,this[i],i,this))
        }
        return ary;
    };
```

3.`find()`
```
    Array.prototype.find=function (fn,obj) {
        //this:数组实例
        //循环数组让函数fn 依次执行,执行的时候通过call来改变fn的this,给fn传三个参数(当前项this[i],索引i,原数组this),一直到fn的返回值为true的时候停止循环,返回当前项this[i]
        for(var i=0;i<this.length;i++){
            if(fn.call(obj,this[i],i,this)){
                return this[i]
            }
        }
    };
```

4.`findIndex()`
```
    Array.prototype.findIndex=function (fn,obj) {
        //this:数组实例
        //循环数组让函数fn 依次执行,执行的时候通过call来改变fn的this,给fn传三个参数(当前项this[i],索引i,原数组this),一直到fn的返回值为true的时候停止循环,返回当前项的索引 i
        for(var i=0;i<this.length;i++){
            if(fn.call(obj,this[i],i,this)){
                return i
            }
        }
    };
```

5.`filter()`
```
    Array.prototype.filter=function (fn,obj) {
        //this:数组实例
        //循环数组让函数fn 依次执行,执行的时候通过call来改变fn的this,给fn传三个参数(当前项this[i],索引i,原数组this),将fn的返回值是true的对应的原数组this的那一项this[i],push到数组ary中
        //返回值:新的数组ary
        var ary=[];
        for(var i=0;i<this.length;i++){
            if(fn.call(obj,this[i],i,this)){
                ary.push(this[i])
            }
        }
        return ary;
    };
```

### 7.字符串翻转的三种方法

1.`split()+reverse()`
```
    var str="abcdef";
    console.log(str.split("").reverse().join(""));
    //fedcba
```

2.`charAt()`
```
    var str="abcdef"
    for(var i=str.length-1;i>=0;i--){
        console.log(str.charAt(i));
    }
    //f  e  d  c  b  a
```
