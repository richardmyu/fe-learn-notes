# 作用域和闭包

[TOC]

## 1. 什么是作用域

### 1.1.作用域

简单说，作用域就是一套规则：管理引擎如何在当前作用域以及嵌套的作用域中根据【标识符】名称（即变量名称）进行变量查找。

JavaScript 是一门“解释型”语言，但在执行代码前，会有“编译”行为，大部分情况下，编译发生在代码执行前的几微妙（甚至更短！）的时间内。

与传统的编译语言不同，JavaScript 不是提前编译（即不是发生在构建之前），编译结果也不能在分布式系统中进行移植。

尽管如此，JavaScript 引擎编译的步骤还是和传统的编译语言非常相似，某些环节可能比预想的复杂。

### 1.2.编译

传统编译语言的“编译”：

- 分词/词法分析（Tokenizing/Lexing）
  > 这个过程会将字符组成的字符串分解成（对编程语言来说）有意义的代码块，这些代码块称为**词法单元**（token）。

- 解析/语法分析（Parsing）
  > 这个过程是将词法单元流（数组）转换成一个由元素逐级嵌套所组成的代表程序语法结构的树，也就是“抽象语法树”（Abstract Syntax Tree，AST）。

- 代码生成
  > 将 AST 转换为可执行代码的过程。这个过程与语言、目标平台等有关。

比起那些编译过程只有三步的语言的编译器，JavaScript 引擎要复杂。在语法分析和代码生成阶段，会有特定的步骤来对运行性能进行优化，包括对冗余元素进行优化等。JavaScript 引擎为此引入了 JIT 来保障性能。

> **JIT**
>
> A JIT compiler runs after the program has started and compiles the code (usually bytecode or some kind of VM instructions) on the fly (or just-in-time, as it's called) into a form that's usually faster, typically the host CPU's native instruction set. A JIT has access to dynamic runtime information whereas a standard compiler doesn't and can make better optimizations like inlining functions that are used frequently.
>
> This is in contrast to a traditional compiler that compiles all the code to machine language before the program is first run.
>
> To paraphrase, conventional compilers build the whole program as an EXE file BEFORE the first time you run it. For newer style programs, an assembly is generated with pseudocode (p-code). Only AFTER you execute the program on the OS (e.g., by double-clicking on its icon) will the (JIT) compiler kick in and generate machine code (m-code) that the Intel-based processor or whatever will understand.
>
> 更多阅读：
> [Hello, JIT World: The Joy of Simple JITs](https://blog.reverberate.org/2012/12/hello-jit-world-joy-of-simple-jits.html)
> [深入浅出 JIT 编译器](https://developer.ibm.com/zh/articles/j-lo-just-in-time/)

- **例子**

```js
var a = 2;
```

处理：

1. 【编译器】查询【作用域】是否已存在该名称的变量在 **同一个作用域的集合** 中：
    >
    - 是：忽略该声明，继续编译（查询操作终止）；
    >
    - 否：“让”【作用域】在 **当前作用域的集合** 中声明一个新变量，并命名为 `a`（查询操作终止）；

2. （在【编译器】生成【引擎】运行时所需代码后）引擎运行时，先查询【作用域】，在当前作用域集合中是否存在该名称的变量：
    >
    - 是：直接使用该变量，并将其赋值为 2（查询操作终止）；
    >
    - 否：继续向上一级作用域查询，如果最终找到了，就进行赋值，否则抛出一个异常。
      > 其实也不一定就是异常，具体细节根查询策略以及是否“严格模式”有关，只是这四种（RHS-严格模式、RHS-非严格模式、LHS-严格模式、LHS-非严格模式）情况下只有一种（LHS-非严格模式）情况不会抛出异常。

### 1.3.LHS & RHS

在此过程中，【引擎】会采取两种查询策略：**LHS 查询** 和 **RHS 查询**。简单说，变量出现在赋值操作左侧是进行 LHS 出现，若出现在右侧则进行 RHS 查询。更准确说，RHS 查询就是简单的查找某个变量以得其值，而 LHS 查询则是试图找到变量的容器本身。

> 对于 LHS 查询和 RHS 查询一个合理的理解是：赋值操作的目标是谁（LHS），谁是赋值操作的源头（RHS）。

区分 LHS 和 RHS 查询，是因为在变量没有声明的情况下，这两种查询行为是不同。对于一个未声明的变量：

- RHS 查询在所有嵌套的作用域中都找不到该变量，引擎会抛出 `ReferenceError` 异常；
- LHS 查询在非“严格模式”下，会在【全局作用域】创建一个同名变量；而“严格模式”下（严格模式，禁止自动或者隐式地创建全局变量），也会抛出 `ReferenceError` 异常

```js
function foo() {
  return function bar() {
    a = 2;
    console.log(a); // 2
  }
}

foo()();

console.log(a, window.a); // 2 2
```

> `ReferenceError` 表示作用域判别失败，`TypeError` 则表示作用域判别成功，但操作是非法或者不合理的。

### 1.4.作用域嵌套

作用域的嵌套，会形成一条“链”，也叫“作用域链”。引擎也是通过这条作用域链，来（LHS 和 RHS）查询变量的。注意，作用域的嵌套，是【严格包含】的。

```js
function foo(a){
  // ...
}

foo(2);
```

还要注意：函数 `foo` 被赋予实参后执行时，为了给形参 `a`（隐式）分配值，需要进行一次 LHS 查询。

## 2.词法作用域

作用域共有两种主要的工作模型。第一种是最为普遍的，被大多数编程语言所采用的 **词法作用域**；另外一种叫作 **动态作用域**，仍有一些编程语言在使用（比如 Bash 脚本、Perl 中的一些模式等）。

> 动态作用域并不关心函数和作用域是如何声明以及在何处声明的，只关心它们从何处调用。换句话说，**动态作用域链是基于调用栈的**，而不是代码中的作用域嵌套。
>
> 需要明确的是，事实上 JavaScript 并不具有动态作用域。它只有词法作用域，简单明了。但是 `this` 机制某种程度上 *很像* 动态作用域。

简单讲，**词法作用域** 就是定义在【词法阶段】的作用域，即由编写代码时的位置决定，因而词法分析器处理代码时会保持作用域不变。

- 词法作用域查找到第一个匹配的标识符后会停止查找；
- 词法作用域只会查找一级标识符；（例如对于类似 `foo.bar.baz`只是查找 `foo`，找到这个变量以后，对象属性访问规则接管对 `bar` 和 `baz` 属性的访问。）

### 2.1.欺骗词法

所谓欺骗词法是指在运行时“修改”词法作用域。但是注意，欺骗词法作用域可能会导致性能下降。

#### 2.1.1.`eval`

`eval()` 函数接受一个字符串作为参数，并将其中的内容视为好像就在书写程序时就存在那个位置的代码一样。

```js
function foo(str, a){
  eval(str);
  console.log(a, b);
}

var b = 2;

foo('var b = 3;', 1); // 1, 3
```

> 非严格模式下，如果 `eval` 所执行的代码包含一个或多个声明，就会对 `eval` 所在的此法作用域进行修改。
> 严格模式下， `eval` 在运行时会有自己的词法作用域，而不会影响到其所处的词法作用域。

JavaScript 中还有其他一些功能效果和 `eval` 类似。`setTimeout` 和 `setInterval` 的第一个参数可以是字符串，字符串的内容可以被解释为一段动态生成的函数代码。这些功能已过时且不被提倡。

`new Function` 函数的行为也很类似，最后一个参数可以接受字符串，也是转换为动态生成的函数，这种构建函数的语法比 `eval` 略微安全，但也尽量避免使用。

```js
{
  setTimeout("let a = 100;", 100);
  setTimeout("console.log(a)", 200); // 100
}

setTimeout("console.log(a)", 200); // 100
```

#### 2.1.2.`with`

`with` 通常被当作重复引用一个对象中的多个属性的快捷方式。

```js
function foo(obj) {
  with (obj) {
    var c = 1;
    a = 2;
  }

  console.log(c); // 1 1
}

var o1 = {
  a: 3
};

var o2 = {
  b: 3
};

foo(o1);
console.log(o1.a); // 2

foo(o2);
console.log(o2.a); // undefined
console.log(a); // 2 -- a 被泄露到全局了
```

可以看到 `a = 2` 赋值操作创建了一个全局变量。

`with` 可以将一个没有或者由多个属性的对象处理为一个 *完全隔离* 的词法作用域，因此这个对象的属性也会被处理为定义在这个作用域中的词法标识符。

> `with` 内部正常的 `var` 声明并不会被局限在 `with` 的作用域中，而是被添加到 `with` 所处的作用域中 。
> 与 `eval` 修改词法作用域不同，`with` 是创建了一个全新的词法作用域。

严格模式下，`with` 被完全禁止。

#### 2.1.3.性能

JavaScript 引擎会在编译阶段进行数项的性能优化。其中有些优化依赖于能够根据代码的词法进行【静态分析】，并预先确定所有变量和函数的定义位置，才能在执行过程中快速找到标识符。

> 静态分析（static analysis ）：一种通过在程序运行之前自动检查源代码进行调试的调试方法。

但如果引擎在代码中发现了 `eval` 或 `with`，它只能简单地假设关于标识符位置的判断都是无效的，因为无法在词法分析阶段明确知道 `eval` 会接收到什么代码，这些代码会如何对作用域进行修改，也无法知道传递给 `with` 用来创建新词法作用域的对象的内容到底是什么。

最悲观的情况是如果出现了 `eval` 或 `with`，所有的优化可能都是无意义的，因此最简单的做法就是完全不做任何优化。

## 3.函数作用域和块作用域

> 函数作用域和块作用域的行为是一样的，可以总结为：任何声明在某个作用域内的变量，都将附属于这个作用域。

JavaScript 具有基于函数的作用域，意味着每声明一个函数都会为其自身创建一个作用域。

函数作用域的含义是指，属于这个函数的全部变量都可以在整个函数的范围内使用及复用（事实上在嵌套的作用域中也可以使用）。这种设计方案是非常有用的，能充分利用 JavaScript 变量可以根据需要改变值类型的“动态”特性。

> **最小特权原则**，也叫 **最小授权** 或 **最小暴露原则**。这个原则是指在软件设计中，应该最小限度地暴露必要内容，而将其他内容都“隐藏”起来，比如某个模块或对象的 API 设计。

### 3.1.命名空间

本质上，**命名空间**（namespace）就是定义了一个范围，可以作为附加信息来区分不同库中相同名称的函数、变量等。

变量冲突的一个典型例子存在于全局作用域中。当程序中加载了多个第三方库时，如果它们没有妥善地将内部私有的函数或变量隐藏起来，就会很容易引发冲突。

这些库通常会在全局作用域中声明一个名字足够独特的变量，通常是一个对象。这个对象被用作库的命名空间，所有需要暴露给外界的功能都会成为这个对象（命名空间）的属性，而不是将自己的标识符暴露在顶级的词法作用域中。

### 3.2.模块管理

另外一种避免冲突的办法和现代的模块机制很接近，就是从众多模块管理器中挑选一个来使用。使用这些工具，任何库都无需将标识符加入到全局作用域中，而是通过依赖管理器的机制将库的标识符显式地导入到另外一个特定的作用域中。

显而易见，这些工具并没有能够违反词法作用域规则的“神奇”功能。它们只是利用作用域的规则强制所有标识符都不能注入到共享作用域中，而是保持在私有、无冲突的作用域中，这样可以有效规避掉所有的意外冲突。

### 3.3.函数表达式

区分函数声明和表达式最简单的方法是看 `function` 关键字出现在声明中的位置（不仅仅是一行代码，而是整个声明中的位置）。如果 `function` 是声明中的第一个词，那么就是一个函数声明，否则就是一个 **函数表达式**。

函数声明和函数表达式之间最重要的区别是它们的名称标识符将会绑定在何处。

- 函数声明：被绑定在函数所处的作用域中，当前作用域可以访问该函数；
- 函数表达式：被绑定在函数表达式自身的函数作用域中，而非函数表达式所处的当前作用域，即当前作用域无法访问，只在表达式内部可以访问。

匿名函数表达式的缺点：

- 在栈追踪中不会显示有意义的函数名，调试很难；
- 引用自身时只能使用 *过期* 的 `arguments.callee`；
- 缺乏可读性/可理解性；

> 始终给函数表达式命名是一个最佳实践。

### 3.3.1.立即执行函数表达式（Immediately Invoked Function Expression, IIFE）

函数名对 IIFE 当然不是必须的，IIFE 最常见的用法是使用一个匿名函数表达式。虽然使用具名函数的 IIFE 并不常见，但它具有上述匿名函数表达式的所有优势，因此也是一个值得推广的实践。

```js
// 传统形式 IIFE
(function foo(){
  console.log("Hello?");
})();

// 改进形式 IIFE
(function bar(){
  console.log("World!")
}());
```

IIFE 的另一个非常普遍的进阶用法是把它们当作函数调用并传递参数进去。

```js
var person = '张三';

(function IIFE(global){
  if(globar && global.person){
    console.log('你好，' + global.person + '！');
  }else{
    console.log('你好，陌生人！');
  }
})(window);
```

IIFE 还有一种变化的用途是倒置代码的运行顺序，将需要运行的函数放在第二位，在 IIFE 执行之后当作参数传递进去。这种模式在 UMD（Universal Module Definition）项目中被广泛使用。尽管这种模式略显冗长，但有些人认为它更易理解。

```js
var person = '张三';

(function IIFE( def ) {
  def( window );
})(function def( global ) {
  var person = '李四';
  console.log( person ); // 李四
  console.log( global.person ); // 张三
});
```

### 3.4.块作用域

**块作用域** 是一个用来对最小授权原则进行扩展的工具，将代码从在函数中隐藏信息扩展为在块中隐藏信息。

```js
for (var i=0; i<10; i++) {
  console.log(i);
}
```

我们在 `for` 循环的头部直接定义了变量 `i`，通常是因为只想在 `for` 循环内部的上下文中使用 `i`，而忽略了 `i` 会被绑定在外部作用域（函数或全局）中的事实。

这就是块作用域的用处。变量的声明应该距离使用的地方越近越好，并最大限度地本地化。

```js
var foo = true;

if (foo) {
  var bar = foo * 2;
  bar = something( bar );
  console.log( bar );
}
```

#### 3.4.1.`with`

`with` 关键字不仅是一个难于理解的结构，同时也是块作用域的一个例子（块作用域的一种形式），用 `with` 从对象中创建出的作用域仅在 `with` 声明中而非外部作用域中有效。

#### 3.4.2.`try/catch`

JavaScript 的 ES3 规范中规定 `try/catch` 的 `catch` 分句会创建一个块作用域，其中声明的变量仅在 `catch` 内部有效。

例如：

```js
try {
  undefined(); // 执行一个非法操作来强制制造一个异常
} catch (err) {
  console.log( err ); // 能够正常执行！
}

console.log( err ); // ReferenceError: err not found
```

> 尽管这个行为已经被标准化，并且被大部分的标准 JavaScript 环境所支持，但是当同一个作用域中的两个或多个 `catch` 分句用同样的标识符名称声明错误变量时，很多静态检查工具还是会发出警告。实际上这并不是重复定义，因为所有变量都被安全地限制在块作用域内部，但是静态检查工具还是会很烦人地发出警告。

#### 3.4.3.`let`

ES6 引入了新的 `let` 关键字，提供了除 `var` 以外的另一种变量声明方式。

`let` 关键字可以将变量绑定到所在的任意作用域中（通常是 `{ .. }` 内部）。换句话说，`let` 为其声明的变量隐式地劫持了所在的块作用域。

```js
var foo = true;

if (foo) {
  let bar = foo * 2;
  console.log(bar);
}

console.log(bar); // ReferenceError
```

用 `let` 将变量附加在一个已经存在的块作用域上的行为是隐式的。在开发和修改代码的过程中，如果没有密切关注哪些块作用域中有绑定的变量，并且习惯性地移动这些块或者将其包含在其他的块中，就会导致代码变得混乱。

为块作用域显式地创建块可以部分解决这个问题，使变量的附属关系变得更加清晰。通常来讲，显式的代码优于隐式或一些精巧但不清晰的代码。显式的块作用域风格非常容易书写，并且和其他语言中块作用域的工作原理一致：

```js
var foo = true;

if (foo) {
  { // <-- 显式的块
    let bar = foo * 2;
    console.log(bar);
  }

  console.log(bar); // ReferenceError
}

console.log(bar); // ReferenceError
```

我们在 `if` 声明内部显式地创建了一个块，如果需要对其进行重构，整个块都可以被方便地移动而不会对外部 `if` 声明的位置和语义产生任何影响。

另外一种显式的块作用域表达式就是使用 `let` 声明（对比 `let` 定义）:

```js
let (a = 2) {
  console.log(a); // 2
}

console.log(a); // ReferenceError
```

同隐式地劫持一个已经存在的作用域不同，`let` 声明会创建一个显示的作用域并与其进行绑定。显式作用域不仅更加突出，在代码重构时也表现得更加健壮。在语法上，通过强制性地将所有变量声明提升到块的顶部来产生更简洁的代码。这样更容易判断变量是否属于某个作用域。

这种模式同很多人在函数作用域中手动将 `var` 声明提升到函数顶部的方式很接近。`let` 声明有意将变量声明放在块的顶部，如果你并没有到处使用 `let` 定义，那么你的块作用域就很容易辨识和维护。

但是这里有一个问题，`let` 声明并不包含在 ES6 中。

```js
// 退一步
/*let*/ { let a = 2;
  console.log(a);
}

console.log(a);
// 本质还是显示声明块 (ˉ▽ˉ；)...
```

注意：使用 `let` 进行的声明不会在块作用域中进行提升。声明的代码被运行之前，声明并不“存在”。

```js
{
  console.log( bar ); // ReferenceError!
  let bar = 2;
}
```

另一个块作用域非常有用的原因和闭包及回收内存垃圾的回收机制相关。

考虑以下代码：

```js
function process(data) {
  // dosomething(...)
}

var someReallyBigData = { .. };

process( someReallyBigData );

var btn = document.getElementById( "my_button" );

btn.addEventListener( "click", function click(evt) {
  console.log("button clicked");
}, /*<i>apcturingPhase</i>=*/false );
```

`click` 函数的点击回调并不需要 `someReallyBigData` 变量。理论上这意味着当 `process(..)` 执行后，在内存中占用大量空间的数据结构就可以被垃圾回收了。但是，由于 `click` 函数形成了一个覆盖整个作用域的闭包，JavaScript 引擎极有可能依然保存着这个结构（取决于具体实现）。

块作用域可以打消这种顾虑，可以让引擎清楚地知道没有必要继续保存 `someReallyBigData` 了：

```js
function process(data) {
  // dosomething(...)
}

// 在这个块中定义的内容完事可以销毁！
{
  // 函数不放进来，是遵循：不在块作用域内定义函数
  let someReallyBigData = { .. };

  process( someReallyBigData );
}

var btn = document.getElementById( "my_button" );

btn.addEventListener( "click", function click(evt) {
  console.log("button clicked");
}, /*<i>capturingPhase</i>=*/false );
```

当 `let` 用于 `for` 循环时，`for` 循环头部的 `let` 不仅将 `i` 绑定到了 `for` 循环的块中，事实上它将其重新绑定到了循环的每一个迭代中，确保使用上一个循环迭代结束时的值重新进行赋值。

#### 3.4.4.`const`

除了 `let` 以外，ES6 还引入了 `const`，同样可以用来创建块作用域变量，但其值是固定的（常量）。之后任何试图修改值的操作都会引起错误。

## 4.提升

直觉上会认为 JavaScript 代码在执行时是由上到下一行一行执行的。但实际上这并不完全正确，因为包括变量和函数在内的所有声明都会在任何代码被执行前首先被处理。可以将这个过程形象地想象成所有的声明（变量和函数）都会被“移动”到各自作用域的最顶端，这个过程被称为 **提升**。

编译阶段中的一部分工作就是找到所有的声明，并用合适的作用域将它们关联起来，也正是词法作用域的核心内容。

另外值得注意的是：

- 每个作用域都会进行提升操作；
- 函数声明会被提升，但是函数表达式却不会被提升；
- 函数会首先被提升，然后才是变量；

## 5.作用域闭包

闭包是基于词法作用域书写代码时所产生的自然结果。

> 当函数可以记住并访问所在的词法作用域时（且执行了），就产生了 **闭包**。

```js
function foo() {
  var a = 2;

  function bar() {
    console.log( a );
  }

  return bar;
}

var baz = foo();

baz(); // 2 ———— 这就是闭包的效果
```

在 `foo()` 执行后，通常会期待 `foo()` 的整个内部作用域都被销毁，因为我们知道引擎有垃圾回收器用来释放不再使用的内存空间。由于看上去 `foo()` 的内容不会再被使用，所以很自然地会考虑对其进行回收。

而闭包的“神奇”之处正是可以阻止这件事情的发生。事实上内部作用域依然存在，因此没有被回收。谁在使用这个内部作用域？原来是 `bar()` 本身在使用。

拜 `bar()` 所声明的位置所赐，它拥有涵盖 `foo()` 内部作用域的闭包，使得该作用域能够一直存活，以供 `bar()` 在之后任何时间进行引用。

`bar()` 依然持有对该作用域的引用，而这个引用就叫作 **闭包**。

在定时器、事件监听器、Ajax 请求、跨窗口通信、Web Workers 或者任何其他的异步（或者同步）任务中，只要使用了【回调函数】，实际上就是在使用闭包！

> 通常认为 IIFE 是典型的闭包例子。

### 5.1.模块

```js
function CoolModule() {
  var str = "cool";
  var ary = [1, 2, 3];

  function doSomething() {
    console.log(str);
  }

  function doAnother(i) {
    ary.push(i);
    console.log(ary);
  }

  return {
    doSomething: doSomething,
    doAnother: doAnother
  };
}

var foo = CoolModule();

foo.doSomething(); // cool
foo.doAnother(4); // [1, 2, 3, 4]
```

这个模式在 JavaScript 中被称为 **模块**。最常见的实现模块模式的方法通常被称为 **模块暴露**，这里展示的是其变体。

首先，`CoolModule()` 只是一个函数，必须要通过调用它来创建一个模块实例。如果不执行外部函数，内部作用域和闭包都无法被创建。

其次，`CoolModule()` 返回一个用对象字面量语法 `{ key: value, ... }` 来表示的对象。这个返回的对象中含有对内部函数而不是内部数据变量的引用。我们保持内部数据变量是隐藏且私有的状态。可以将这个对象类型的返回值看作本质上是 *模块的公共 API*。

这个对象类型的返回值最终被赋值给外部的变量 `foo`，然后就可以通过它来访问 API 中的属性方法，比如 `foo.doSomething()`。

> 从模块中返回一个实际的对象并不是必须的，也可以直接返回一个内部函数。jQuery 就是一个很好的例子。jQuery 和 `$` 标识符就是 jQuery 模块的公共 API，但它们本身都是函数（由于函数也是对象，它们本身也可以拥有属性）。

如果要更简单的描述，模块模式需要具备两个必要条件。

1. 必须有外部的封闭函数，该函数必须至少被调用一次（每次调用都会创建一个新的模块实例）。

2. 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态。

一个具有函数属性的对象本身并不是真正的模块。从方便观察的角度看，一个从函数调用所返回的，只有数据属性而没有闭包函数的对象并不是真正的模块。

单例模式：

```js
var foo = (function CoolModule() {
  var str = "cool";
  var ary = [1, 2, 3];

  function doSomething() {
    console.log(str);
  }

  function doAnother(i) {
    ary.push(i);
    console.log(ary);
  }

  return {
    doSomething: doSomething,
    doAnother: doAnother
  };
})();

foo.doSomething(); // cool
foo.doAnother(4); // [1, 2, 3, 4]
```

模块模式另一个简单但强大的用法是命名将要作为公共 API 返回的对象，通过在模块实例的内部保留对公共 API 对象的内部引用，可以从内部对模块实例进行修改，包括添加或删除方法和属性，以及修改它们的值。

```js
var foo = (function CoolModule(id) {
 function change() {
  // 修改公共 API
  publicAPI.identify = identify2;
 }

 function identify1() {
  console.log( id );
 }

 function identify2() {
  console.log( id.toUpperCase() );
 }

 var publicAPI = {
  change: change,
  identify: identify1
 };

 return publicAPI;
})( "foo module" );

foo.identify(); // foo module
foo.change();
foo.identify(); // FOO MODULE
```

#### 5.5.1.现代的模块机制

大多数模块依赖加载器/管理器本质上都是将这种模块定义封装进一个友好的 API。

```js
var MyModules = (function Manager() {
 var modules = {};

 function define(name, deps, impl) {
  for (var i=0; i<deps.length; i++) {
   deps[i] = modules[deps[i]];
  }
  modules[name] = impl.apply( impl, deps );
 }

 function get(name) {
  return modules[name];
 }

 return {
  define: define,
  get: get
 };
})();
```

这段代码的核心是 `modules[name] = impl.apply(impl, deps)`。为了模块的定义引入了包装函数（可以传入任何依赖），并且将返回值，也就是模块的 API，储存在一个根据名字来管理的模块列表中。

#### 5.5.2.ES6 的模块机制

ES6 中为模块增加了一级语法支持。在通过模块系统进行加载时，ES6 会将文件当作独立的模块来处理。每个模块都可以导入其他模块或特定的 API 成员，同样也可以导出自己的 API 成员。

> 基于函数的模块并不是一个能被静态识别的模式（编译器无法识别），它们的 API 语义只有在运行时才会被考虑进来。因此可以在运行时修改一个模块的 API。
>
> 相比之下，ES6 模块 API 是静态的（API 不会在运行时改变）。由于编辑器知道这一点，因此可以在（的确也这样做了）编译期检查对导入模块的 API 成员的引用是否真实存在。如果 API 引用并不存在，编译器会在编译时就抛出“早期”错误，而不会等到运行期再动态解析（并且报错）。

ES6 的模块没有“行内”格式，必须被定义在独立的文件中（一个文件一个模块）。浏览器或引擎有一个默认的“模块加载器”（可以被重载，但这远超出了我们的讨论范）可以在导入模块时同步地加载模块文件。

模块文件中的内容会被当作好像包含在作用域闭包中一样来处理，就和函数闭包模块一样。
