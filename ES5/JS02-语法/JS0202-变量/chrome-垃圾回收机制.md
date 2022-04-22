# chrome 垃圾回收机制

> V8 是谷歌使用 C++ 编写的开源高性能 JavaScript 和 WebasseMbly 引擎。被用于 Chrome 和 Node.js 等项目中。

V8 的垃圾回收策略主要基于 *分代式垃圾回收机制*，现代的垃圾回收算法中按对象的存活时间将内存的垃圾回收进行不同的分代，然后分别对不同分代的内存施以更高效的算法。

在 Chrome 中，v8 被限制了内存的使用（64 位约 1.4G， 32 位约 0.7G）。

```js
// 一个内存溢出超出边界限制的例子
// overflow.js
const format = function (bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
};

const print = function() {
    const memoryUsage = process.memoryUsage();
    console.log(`heapTotal: ${format(memoryUsage.heapTotal)}, heapUsed: ${format(memoryUsage.heapUsed)}`);
}

const total = [];
setInterval(function() {
    total.push(new Array(20 * 1024 * 1024)); // 大内存占用
    print();
}, 1000)
```

以上例子中 `total` 为全局变量每次大约增长 160MB 左右且不会被回收，在接近 V8 边界时无法在分配内存导致进程内存溢出。

```js
$ node overflow.js
heapTotal: 166.84 MB, heapUsed: 164.23 MB
heapTotal: 326.85 MB, heapUsed: 324.26 MB
heapTotal: 487.36 MB, heapUsed: 484.27 MB
heapTotal: 649.38 MB, heapUsed: 643.98 MB
heapTotal: 809.39 MB, heapUsed: 803.98 MB
heapTotal: 969.40 MB, heapUsed: 963.98 MB
heapTotal: 1129.41 MB, heapUsed: 1123.96 MB
heapTotal: 1289.42 MB, heapUsed: 1283.96 MB

<--- Last few GCs --->

[87581:0x103800000]    11257 ms: Mark-sweep 1283.9 (1290.9) -> 1283.9 (1290.9) MB, 512.1 / 0.0 ms  allocation failure GC in old space requested
[87581:0x103800000]    11768 ms: Mark-sweep 1283.9 (1290.9) -> 1283.9 (1287.9) MB, 510.7 / 0.0 ms  last resort GC in old space requested
[87581:0x103800000]    12263 ms: Mark-sweep 1283.9 (1287.9) -> 1283.9 (1287.9) MB, 495.3 / 0.0 ms  last resort GC in old space requested

<--- JS stacktrace --->
```

在 V8 中也提供了两个参数仅在启动阶段调整内存限制大小，分别为调整老生代、新生代空间：

- `--max-old-space-size=2048`
- `--max-new-space-size=2048`

当然内存也并非越大越好，一方面服务器资源是昂贵的，另一方面据说 V8 以 1.5GB 的堆内存进行一次小的垃圾回收大约需要 50 毫秒以上时间，这将会导致 JavaScript 线程暂停，这也是最主要的一方面。

## 1.V8 内存结构

### 1.1. 栈内存

栈用于 **静态内存分配**（Static Memory Allocation），它具有以下特点：

- 操作数据快，因为是在栈顶操作
- 数据必须是静态的，数据大小在编译时是已知的
- 多线程应用程序中，每个线程可以有一个栈
- 堆的内存管理简单，且由操作系统完成
- 栈大小有限，可能发生栈溢出（Stack Overflow）
- 值大小有限制

### 1.2. 堆内存

堆用于 **动态内存分配**（Dynamic Memory Allocation），与栈不同，程序需要使用指针在堆中查找数据。它的特点是：

- 操作速度慢，但容量大
- 可以将动态大小的数据存储在此处
- 堆在应用程序的线程之间共享
- 因为堆的动态特性，堆管理起来比较困难
- 值大小没有限制

堆内存的进一步划分：

- **新生代**（New space / Young generation）：空间小，并且分为了两个半空间（Semi-space），由 **Minor GC**(Scavenger) 管理，其中的数据存活期短（short-lived）。
- **老生代**（Old Space / Old generation）：空间大，由 **Major GC**(Mark-Sweep & Mark-Compact) 管理。进一步分为：
  - 旧指针空间（Old pointer space）：包含的对象中还存在指针，这个指针指向其他对象
  - 旧数据空间（Old data space）：包含的对象中仅有数据
- **大对象空间**（Large object space）：这里对象的大小超过了其他空间大小限制。
- **代码空间**（Code-space）：即时（Just In Time，JIT）编译器在这里存储已编译的代码块。
- **元空间**（Cell Space），属性元空间（Property Cell Apace），映射空间（Map Space）：这些空间中的每个空间都包含相同大小的对象，并且对它们指向的对象有某种约束，从而简化了收集。

**页**（Page）：页是从操作系统分配的连续内存块，以上的空间都由一组组的页构成的。

## 2. 回收栈内存

V8 会通过移动记录当前执行状态的指针（ESP） 来销毁该函数保存在栈中的执行上下文。

## 3. 回收堆内存

V8 中的垃圾收集器（Garbage Collector），它的工作是：跟踪内存的分配和使用，以便当分配的内存不再使用时，自动释放它。并且，这个垃圾收集器是分代的，也就是说，堆中的对象按其年龄分组并在不同阶段清除。

回收堆内存有两种思路：

- 引用计数法（Reference-counting garbage collection）
- 标记清除法（Mark-and-sweep algorithm）

在 V8 中，使用两个阶段和三种算法来进行 GC (Garbage Collection)：

- Minor GC：针对新生代，使用 Scavenger 和 Cheney’s algorithm 两种算法
- Major GC：针对老生代，使用 Mark-Sweep & Mark-Compact 算法

## 2. 新生代与老生代

绝对大多数的应用程序对象的存活周期都会很短，而少数对象的存活周期将会很长为了利用这种情况，V8 将堆分为两类新生代和老生代，新空间中的对象都非常小大约为 1-8MB，这里的垃圾回收也很快。新生代空间中垃圾回收过程中幸存下来的对象会被提升到老生代空间。

### 2.1. 新生代空间与 Minor GC

由于新空间中的垃圾回收很频繁，因此它的处理方式必须非常的快，采用的 Scavenge 算法。

> **Scavenge 算法**
>> 由 C.J. Cheney 在 1970 年在论文 [A nonrecursive list compacting algorithm](https://dl.acm.org/citation.cfm?doid=362790.362798) 提出。Scavenge 是一种复制算法，新生代空间会被一分为二划分成两个相等大小的 from-space 和 to-space。它的工作方式是将 from space 中存活的对象复制出来，然后移动它们到 to space 中或者被提升到老生代空间中，对于 from space 中没有存活的对象将会被释放。完成这些复制后在将 from space 和 to space 进行互换。
> Scavenge 算法非常快适合少量内存的垃圾回收，但是它有很大的空间开销，对于新生代少量内存是可以接受的。

![https://github.com/qufei1993/Nodejs-Roadmap/blob/master/docs/nodejs/img/scavenge.png?raw=true](https://github.com/qufei1993/Nodejs-Roadmap/blob/master/docs/nodejs/img/scavenge.png?raw=true)

Minor GC 是针对新生区进行垃圾回收。Minor GC 的总体思路：（这个过程使用到了 Scavenger 和 Cheney’s algorithm。）

1. 新生代分为两个半区，分别为 to-space 和 from-space ，我们先不断地在 from-space 上分配内存；
2. 如果 from-space 满了，就触发 GC；
3. 找出 from-space 上的活动对象，如果这个活动对象存活过两个 minor GC 周期，就把它移到老生代，否则并把它们移到 to-space；
4. 清空 from-space；
5. 转换 to-space 和 from-space 的角色；
6. 不断重复上述过程；

### 2.2. 老生代空间

新生代空间在垃圾回收满足一定条件（是否经历过 Scavenge 回收、to space 的内存占比）会被晋升到老生代空间中，在老生代空间中的对象都已经至少经历过一次或者多次的回收所以它们的存活概率会更大。在使用 Scavenge 算法则会有两大缺点：

- 一是将会重复的复制存活对象使得效率低下；
- 二是对于空间资源的浪费；

所以在老生代空间中采用了 Mark-Sweep（标记清除） 和 Mark-Compact（标记整理） 算法，思路为：

- **标记**（Marking）：对堆进行深度优先搜索（depth-first-search），标记可达对象；
- **清除**（Sweeping）：垃圾收集器遍历堆并记下未标记为活动的对象的内存地址。现在，该空间在空闲列表中被标记为空闲，可用于存储其他对象；
- **压缩**（Compacting）：将所有存活的对象移到一起，以减少碎片化，并提高为新对象分配内存的性能；

#### 2.2.1.Mark-Sweep

Mark-Sweep 处理时分为标记、清除两个步骤，与 Scavenge 算法只复制存活对象相反的是，在老生代空间中由于存活对象占多数，Mark-Sweep 在标记阶段遍历堆中的所有对象，仅标记存活对象，把未标记的死对象清除，这时一次标记清除就已经完成了。

![https://github.com/qufei1993/Nodejs-Roadmap/blob/master/docs/nodejs/img/mark-sweep.png?raw=true](https://github.com/qufei1993/Nodejs-Roadmap/blob/master/docs/nodejs/img/mark-sweep.png?raw=true)

但是还遗留一个问题，被清除的对象遍布于各内存地址，产生很多内存碎片。

#### 2.2.2.Mark-Compact

在老生代空间中为了解决 Mark-Sweep 算法的内存碎片问题，引入了 Mark-Compact（标记整理算法），其在工作过程中将活着的对象往一端移动，这时内存空间是紧凑的，移动完成之后，直接清理边界之外的内存。

![https://github.com/qufei1993/Nodejs-Roadmap/blob/master/docs/nodejs/img/mark-compact.png?raw=true](https://github.com/qufei1993/Nodejs-Roadmap/blob/master/docs/nodejs/img/mark-compact.png?raw=true)

#### 2.2.3.Stop-The-World

由于垃圾回收是在 JavaScript 引擎中进行的，而 Mark-Compact 算法在执行过程中需要移动对象，而当活动对象较多的时候，它的执行速度不可能很快，为了避免 JavaScript 应用逻辑和垃圾回收器的内存资源竞争导致的不一致性问题，垃圾回收器会将 JavaScript 应用暂停，这个过程，被称为 **全停顿**（stop-the-world）。

在新生代中，由于空间小、存活对象较少、Scavenge 算法执行效率较快，所以全停顿的影响并不大。而老生代中就不一样，如果老生代中的活动对象较多，垃圾回收器就会暂停主线程较长的时间，使得页面变得卡顿。

### 2.3.Orinoco

orinoco 为 V8 的垃圾回收器的项目代号，为了提升用户体验，解决全停顿问题，它利用了增量标记、懒性清理、并发、并行来降低主线程挂起的时间。

#### 2.3.1.Incremental marking

为了降低全堆垃圾回收的停顿时间，**增量标记**（Incremental marking）将原本的标记全堆对象拆分为一个一个任务，让其穿插在 JavaScript 应用逻辑之间执行，它允许堆的标记时的 5~10ms 的停顿。增量标记在堆的大小达到一定的阈值时启用，启用之后每当一定量的内存分配后，脚本的执行就会停顿并进行一次增量标记。

#### 2.3.2.Lazy sweeping

增量标记只是对活动对象和非活动对象进行标记，**惰性清理**（Lazy sweeping）用来真正的清理释放内存。当增量标记完成后，假如当前的可用内存足以让我们快速的执行代码，其实我们是没必要立即清理内存的，可以将清理的过程延迟一下，让 JavaScript 逻辑代码先执行，也无需一次性清理完所有非活动对象内存，垃圾回收器会按需逐一进行清理，直到所有的页都清理完毕。

增量标记与惰性清理的出现，使得主线程的最大停顿时间减少了 80%，让用户与浏览器交互过程变得流畅了许多，从实现机制上，由于每个小的增量标价之间执行了 JavaScript 代码，堆中的对象指针可能发生了变化，需要使用写屏障技术来记录这些引用关系的变化，所以也暴露出来增量标记的缺点：

- 并没有减少主线程的总暂停的时间，甚至会略微增加
- 由于 **写屏障**（Write-barrier）机制的成本，增量标记可能会降低应用程序的吞吐量

#### 2.3.3.Concurrent

并发（Concurrent）式 GC 允许在在垃圾回收的同时不需要将主线程挂起，两者可以同时进行，只有在个别时候需要短暂停下来让垃圾回收器做一些特殊的操作。但是这种方式也要面对增量回收的问题，就是在垃圾回收过程中，由于 JavaScript 代码在执行，堆中的对象的引用关系随时可能会变化，所以也要进行写屏障操作。

#### 2.3.4.Parallel

并行（Parallel）式 GC 允许主线程和辅助线程同时执行同样的 GC 工作，这样可以让辅助线程来分担主线程的 GC 工作，使得垃圾回收所耗费的时间等于总时间除以参与的线程数量（加上一些同步开销）。

### 2.4.V8 当前垃圾回收机制

2011 年，V8 应用了增量标记机制。直至 2018 年，Chrome64 和 Node.js V10 启动并发标记（Concurrent），同时在并发的基础上添加并行（Parallel）技术，使得垃圾回收时间大幅度缩短。

#### 2.4.1. 副垃圾回收器

V8 在新生代垃圾回收中，使用并行（parallel）机制，在整理排序阶段，也就是将活动对象从 from-to 复制到 space-to 的时候，启用多个辅助线程，并行的进行整理。由于多个线程竞争一个新生代的堆的内存资源，可能出现有某个活动对象被多个线程进行复制操作的问题，为了解决这个问题，V8 在第一个线程对活动对象进行复制并且复制完成后，都必须去维护复制这个活动对象后的指针转发地址，以便于其他协助线程可以找到该活动对象后可以判断该活动对象是否已被复制。

#### 2.4.2. 主垃圾回收器

V8 在老生代垃圾回收中，如果堆中的内存大小超过某个阈值之后，会启用并发标记任务。每个辅助线程都会去追踪每个标记到的对象的指针以及对这个对象的引用，而在 JavaScript 代码执行时候，并发标记也在后台的辅助进程中进行，当堆中的某个对象指针被 JavaScript 代码修改的时候，写入屏障技术会在辅助线程在进行并发标记的时候进行追踪。

当并发标记完成或者动态分配的内存到达极限的时候，主线程会执行最终的快速标记步骤，这个时候主线程会挂起，主线程会再一次的扫描根集以确保所有的对象都完成了标记，由于辅助线程已经标记过活动对象，主线程的本次扫描只是进行 check 操作，确认完成之后，某些辅助线程会进行清理内存操作，某些辅助进程会进行内存整理操作，由于都是并发的，并不会影响主线程 JavaScript 代码的执行。

---

参考：

1.[What is V8?](https://v8.dev/)
2.[Nodejs 中的内存管理和 V8 垃圾回收机制](https://github.com/qufei1993/Nodejs-Roadmap/blob/master/docs/nodejs/memory.md)
3.[V8 中 JavaScript 的内存管理与垃圾回收](https://juejin.cn/post/6891614154134667272)
4.[深入理解 Chrome V8 垃圾回收机制](https://juejin.cn/post/6876638765025067015)
5.[Trash talk: the Orinoco garbage collector](https://v8.dev/blog/trash-talk)
6.[Chrome 浏览器垃圾回收机制与内存泄漏分析](https://www.cnblogs.com/LuckyWinty/p/11739573.html)
