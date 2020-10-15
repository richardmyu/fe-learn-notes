## this 和对象原型

[TOC]

### 1.关于 this

`this` 关键字是 JavaScript 中最复杂的机制之一。它是一个很特别的关键字，被自动定义在所有函数的作用域中。

#### 1.1.为什么要用 this

```js
function identify() {
  return this.name.toUpperCase();
}

function speak() {
  var greeting = "Hello, I'm " + identify.call(this);
  console.log(greeting);
}

var me = {
  name: "Kyle"
};

var you = {
  name: "Reader"
};

identify.call(me); // KYLE
identify.call(you); // READER

speak.call(me); // Hello, I'm KYLE
speak.call(you); // Hello, I'm READER
```

如果不使用 `this` ，那就需要给 `identify()` 和 `speak()` 显式传入一个上下文对象。

```js
function identify(context) {
  return context.name.toUpperCase();
}

function speak(context) {
  var greeting = "Hello, I'm " + identify(context);
  console.log(greeting);
}

identify(you); // READER
speak(me); //Hello, I'm KYLE
```

然而，`this` 提供了一种更优雅的方式来隐式“传递”一个对象引用，因此可以将 API 设计得更加简洁并且易于复用。

随着你的使用模式越来越复杂，显式传递上下文对象会让代码变得越来越混乱，使用 `this` 则不会这样。当我们介绍对象和原型时，你就会明白函数可以自动引用合适的上下文对象有多重要。

#### 1.2.误解

太拘泥于“this”的字面意思就会产生一些误解。有两种常见的对于 `this` 的解释，但是它们都是错误的。

##### 1.2.1.指向自身

人们很容易把 `this` 理解成指向函数自身，这个推断从英语的语法角度来说是说得通的。

```js
function foo(num) {
  console.log("foo: " + num);

  // 记录foo被调用的次数
  this.count++;
}

foo.count = 0;

var i;

for (i = 0; i < 10; i++) {
  if (i > 5) {
    foo(i);
  }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// foo被调用了多少次？
console.log(foo.count); // 0 -- 什么？！
```

显然从字面意思来理解 `this` 是错误的。如果要从函数对象内部引用它自身，那只使用 `this` 是不够的。一般来说你需要通过一个指向函数对象的词法标识符（变量）来引用它。

##### 1.2.2.函数作用域

第二种常见的误解是，`this` 指向函数的作用域。这个问题有点复杂，因为在某种情况下它是正确的，但是在其他情况下它却是错误的。

需要明确的是，`this` 在任何情况下都不指向函数的词法作用域。在 JavaScript 内部，作用域确实和对象类似，可见的标识符都是它的属性。但是作用域“对象”无法通过 JavaScript 代码访问，它存在于【JavaScript 引擎】内部。

> 每当你想要把 `this` 和词法作用域的查找混合使用时，一定要提醒自己，这是无法实现的（使用 `this` 不可能在词法作用域中查到什么。）。

#### 1.3.this 到底是什么

`this` 是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调用时的各种条件。`this` 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。

当一个函数被调用时，会创建一个活动记录（有时候也称为 **执行上下文**）。这个记录会包含函数在哪里被调用（调用栈）、函数的调用方式、传入的参数等信息。`this` 就是这个记录的一个属性，会在函数执行的过程中用到。

### 2.this 全面解析

#### 2.1.调用位置

在理解 `this` 的绑定过程之前，首先要理解调用位置：调用位置就是函数在代码中被调用的位置（而不是声明的位置）。只有仔细分析调用位置才能回答这个问题：这个 `this` 到底引用的是什么？

最重要的是要分析 **调用栈**（就是为了到达当前执行位置所调用的所有函数）。我们关心的 **调用位置就在当前正在执行的函数的前一个调用中**。

```js
function baz() {
  // 当前调用栈是：baz
  // 因此，当前调用位置是全局作用域

  console.log("baz");
  bar(); // <-- bar 的调用位置
}

function bar() {
  // 当前调用栈是：baz -> bar
  // 因此，当前调用位置在 baz 中

  console.log("bar");
  foo(); // <-- foo 的调用位置
}

function foo() {
  // 当前调用栈是：baz -> bar -> foo
  // 因此，当前调用位置在 bar 中

  console.log("foo");
}

baz(); // <-- baz 的调用位置
```

#### 2.2.绑定规则

我们来看看在函数的执行过程中调用位置如何决定this的绑定对象。

##### 2.2.1.默认绑定

首先要介绍的是最常用的函数调用类型：独立函数调用。直接使用不带任何修饰的函数引用进行调用的，因此只能使用默认绑定，无法应用其他规则。也可以把这条规则看作是无法应用其他规则时的默认规则。

默认绑定时，`this` 指向全局对象（严格模式下，不能将全局对象用于默认绑定，因此 `this` 会绑定到 `undefined`）。

```js
function foo() {
  console.log(this.a);
}

function bar() {
  'use strict';
  console.log(this.a);
}

var a = 2;

foo(); // 2
bar(); // TypeError
```

##### 2.2.2.隐式绑定

当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 `this` 绑定到这个上下文对象。

```js
function foo() {
  console.log( this.a );
}

var obj = {
  a: 2,
  foo: foo,
  bar: function () {
    console.log( this.a );
  }
};

obj.foo(); // 2
obj.bar(); // 2
```

但对象属性引用链中只有上一层或者说最后一层在调用位置中起作用。

```js
function foo() {
  console.log( this.a );
}

var obj2 = {
  a: 42,
  foo: foo
};

var obj1 = {
  a: 2,
  obj2: obj2
};

obj1.obj2.foo(); // 42
```

- **隐式丢失**

一个最常见的 `this` 绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定。

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo
};

var bar = obj.foo; // 函数别名！虽然 bar 是 obj.foo 的一个引用，但是实际上，它引用的是 foo 函数本身

var a = "oops, global"; // a是全局对象的属性

bar(); // "oops, global"
```

一种更微妙、更常见并且更出乎意料的情况发生在传入回调函数时：

```js
function foo() {
  console.log(this.a);
}

function doFoo(fn) {
  // fn其实引用的是foo

  fn(); // <-- 调用位置！
}

var obj = {
  a: 2,
  foo: foo
};

var a = "oops, global"; // a是全局对象的属性

doFoo(obj.foo); // "oops, global"
```

> 参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式赋值。

如果把函数传入语言内置的函数而不是传入你自己声明的函数，结果是一样的，没有区别。

除此之外，还有一种情况 `this` 的行为会出乎我们意料：调用回调函数的函数可能会修改 `this`。在一些流行的 JavaScript 库中事件处理器常会把回调函数的 `this` 强制绑定到触发事件的 DOM 元素上。这在一些情况下可能很有用，但是有时它可能会让你感到非常郁闷。

无论是哪种情况，`this` 的改变都是意想不到的，实际上你无法控制回调函数的执行方式，因此就没有办法控制调用位置以得到期望的绑定。

##### 2.2.3.显式绑定

在分析隐式绑定时，我们必须在一个对象内部包含一个指向函数的属性，并通过这个属性间接引用函数，从而把 `this` 间接（隐式）绑定到这个对象上。

那么如果我们不想在对象内部包含函数引用，而想在某个对象上强制调用函数，该怎么做呢？

JavaScript 中的“所有”函数都有一些有用的特性（这和它们的 `[[Prototype]]` 有关），可以用来解决这个问题。具体点说，可以使用函数的 `call(..)` 和 `apply(..)` 方法。严格来说，JavaScript 的宿主环境有时会提供一些非常特殊的函数，它们并没有这两个方法。但是这样的函数非常罕见，JavaScript 提供的绝大多数函数以及自定义的所有函数都可以使用 `call(..)` 和 `apply(..)` 方法。

这两个方法是如何工作的呢？它们的第一个参数是一个对象，是给 `this` 准备的，接着在调用函数时将其绑定到 `this`。因为你可以直接指定 `this` 的绑定对象，因此我们称之为**显式绑定**。

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2
};

foo.call(obj); // 2
```

如果你传入了一个原始值（字符串类型、布尔类型或者数字类型）来当作 `this` 的绑定对象，这个原始值会被转换成它的对象形式（也就是 `new String(..)`、`new Boolean(..)` 或者 `new Number(..)`）。这通常被称为“包装”。

可惜，显式绑定仍然无法解决我们之前提出的丢失绑定问题。

- **硬绑定**

但是显式绑定的一个变种可以解决这个问题。

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2
};

var bar = function () {
  foo.call(obj);
};

bar(); // 2
setTimeout(bar, 100); // 2

// 硬绑定的 bar 不可能再修改它的 this
bar.call(window); // 2
```

无论之后如何调用函数 `bar`，它总会手动在 `obj` 上调用 `foo`。这种绑定是一种显式的强制绑定，因此我们称之为**硬绑定**。

硬绑定的典型应用场景就是创建一个【包裹函数】，负责接收参数并返回值：

```js
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}

var obj = {
  a: 2
};

var bar = function () {
  return foo.apply(obj, arguments);
};

var b = bar(3); // 2 3
console.log(b); // 5
```

另一种使用方法是创建一个可以重复使用的辅助函数：

```js
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}

// 简单的辅助绑定函数
function Bind(fn, obj) {
  return function () {
    return fn.apply(obj, arguments);
  };
}

var obj = {
  a: 2
};

var bar = Bind(foo, obj);

var b = bar(3); // 2 3
console.log(b); // 5
```

由于硬绑定是一种非常常用的模式，所以 ES5 提供了内置的方法 `Function.prototype.bind`。`bind(..)` 会返回一个硬绑定的新函数，它会把你指定的参数设置为 `this` 的上下文并调用原始函数。

- **API调用的“上下文”**

第三方库的许多函数，以及 JavaScript 语言和宿主环境中许多新的内置函数，都提供了一个可选的参数，通常被称为“上下文”（context），其作用和 `bind(..)` 一样，确保你的回调函数使用指定的 `this`。

```js
function foo(el) {
  console.log( el, this.id );
}

var obj = {
  id: "awesome"
};

// 调用 foo(..) 时把 this 绑定到 obj
[1, 2, 3].forEach( foo, obj );
// 1 awesome 2 awesome 3 awesome
```

##### 2.2.4.new 绑定

在传统的面向类的语言中，“构造函数”是类中的一些特殊方法，使用 `new` 初始化类时会（自动）调用类中的构造函数。通常的形式是这样的：

```js
something = new MyClass(..);
```

JavaScript 也有一个 `new` 操作符，使用方法看起来也和那些面向类的语言一样，绝大多数开发者都认为 JavaScript 中 `new` 的机制也和那些语言一样。然而，JavaScript 中 `new` 的机制实际上和面向类的语言完全不同。

首先我们重新定义一下 JavaScript 中的“构造函数”。JavaScript 中的构造函数只是一些使用 `new` 操作符时被调用的函数，它们并不会属于某个类，也不会实例化一个类。实际上，它们甚至都不能说是一种特殊的函数类型，它们只是被 `new` 操作符调用的普通函数而已。

举例来说，思考一下 `Number(..)` 作为构造函数时的行为，ES5.1 中这样描述它：

> 15.7.2 Number 构造函数
>
> 当 Number 在 `new` 表达式中被调用时，它是一个构造函数：它会初始化新创建的对象。

所以，包括内置对象函数（比如 `Number(..)`）在内的所有函数都可以用 `new` 来调用，这种函数调用被称为 **构造函数调用**。这里有一个重要但是非常细微的区别：实际上并不存在所谓的“构造函数”，只有对于函数的“**构造调用**”。

使用 `new` 来调用函数，或者说发生“构造调用”时，会自动执行下面的操作。

1. 创建（或者说构造）一个全新的对象。

2. 这个新对象会被执行 `[[Prototype]]` 连接。

3. 这个新对象会绑定到函数调用的 `this`。

4. 如果函数没有返回其他对象，那么 `new` 表达式中的函数调用会自动返回这个新对象。

```js
function foo(a) {
 this.a = a;
}

var bar = new foo(2);

console.log( bar.a ); // 2
```

使用 `new` 来调用 `foo(..)` 时，我们会构造一个新对象并把它绑定到 `foo(..)` 调用中的 `this` 上。`new` 是最后一种可以影响函数调用时 `this` 绑定行为的方法，我们称之为 **`new` 绑定**。

#### 2.3.优先级

毫无疑问，默认绑定的优先级是四条规则中最低的，所以我们可以先不考虑它。

```js
function foo() {
  console.log(this.a);
}

var obj1 = {
  a: 2,
  foo: foo
};

var obj2 = {
  a: 3,
  foo: foo
};

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call(obj2); // 3
obj2.foo.call(obj1); // 2
```

可以看到，显式绑定优先级更高，也就是说在判断时应当先考虑是否可以存在显式绑定。

```js
function foo(something) {
  this.a = something;
}

var obj1 = {
  foo: foo
};

var obj2 = {};

obj1.foo(2);
console.log(obj1.a); // 2

obj1.foo.call(obj2, 3);
console.log(obj2.a); // 3

var bar = new obj1.foo(4);
console.log(obj1.a); // 2
console.log(bar.a); // 4
```

可以看到 `new` 绑定比隐式绑定优先级高。

> `new` 和 `call/apply` 无法一起使用，使用了 `call/apply` 之后的函数不是函数，不是函数就不能使用 `new`。

实际上，ES5 中内置的 `Function.prototype.bind(..)` 更加复杂。下面是 MDN 提供的一种 `bind(..)` 实现：

```js
//  Yes, it does work with `new (funcA.bind(thisArg, args))`
if (!Function.prototype.bind) (function(){
  var ArrayPrototypeSlice = Array.prototype.slice;
  Function.prototype.bind = function(otherThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var baseArgs= ArrayPrototypeSlice.call(arguments, 1),
        baseArgsLength = baseArgs.length,
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          baseArgs.length = baseArgsLength; // reset to default base arguments
          baseArgs.push.apply(baseArgs, arguments);
          return fToBind.apply(fNOP.prototype.isPrototypeOf(this) ? this : otherThis, baseArgs);
        };

    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
})();
```

> 这种 `bind(..)` 是一种 polyfill 代码（polyfill 就是我们常说的刮墙用的腻子，polyfill 代码主要用于旧浏览器的兼容，比如说在旧的浏览器中并没有内置 `bind` 函数，因此可以使用 polyfill 代码在旧浏览器中实现新的功能），对于 `new` 使用的硬绑定函数来说，这段 polyfill 代码和 ES5 内置的 `bind(..)` 函数并不完全相同。由于 polyfill 并不是内置函数，所以无法创建一个不包含 `.prototype` 的函数，因此会具有一些副作用。如果你要在 `new` 中使用硬绑定函数并且依赖 polyfill 代码的话，一定要非常小心。

下面是 `new` 修改 `this` 的相关代码：

```js
fNOP.prototype.isPrototypeOf(this) ? this : otherThis
// ...
fNOP.prototype = this.prototype;
// ...
fBound.prototype = new fNOP();
```

简单来说，这段代码会判断硬绑定函数是否是被 `new` 调用，如果是的话就会使用新创建的 `this` 替换硬绑定的 `this`。

那么，为什么要在 `new` 中使用硬绑定函数呢？直接使用普通函数不是更简单吗？

之所以要在 `new` 中使用硬绑定函数，主要目的是预先设置函数的一些参数，这样在使用 `new` 进行初始化时就可以只传入其余的参数。`bind(..)` 的功能之一就是可以把除了第一个参数（第一个参数用于绑定 `this`）之外的其他参数都传给下层的函数（这种技术称为“部分应用”，是“柯里化”的一种）。

```js
function foo(p1,p2) {
  this.val = p1 + p2;
}

// 之所以使用null是因为在本例中我们并不关心硬绑定的this是什么
// 反正使用new时this会被修改
var bar = foo.bind( null, "p1" );

var baz = new bar( "p2" );

baz.val; // p1p2
```

小结：

---

- 函数是否在 `new` 中调用（`new` 绑定）？
  >
  - 是：`this` 绑定的是新创建的对象;
  - 否：函数是否通过 `call`、`apply`（显式绑定）或者硬绑定调用？
    >
    - 是：`this` 绑定的是指定的对象；
    - 否：函数是否在某个上下文对象中调用（隐式绑定）？
      >
      - 是：`this` 绑定的是那个上下文对象；
      - 否：使用默认绑定。如果在严格模式下，就绑定到 `undefined`，否则绑定到全局对象。

---

#### 2.4.绑定例外

在某些场景下 `this` 的绑定行为会出乎意料，你认为应当应用其他绑定规则时，实际上应用的可能是默认绑定规则。

##### 2.4.1.被忽略的 this

如果你把 `null` 或者 `undefined` 作为 `this` 的绑定对象传入 `call`、`apply` 或者 `bind`，这些值在调用时会被忽略，实际应用的是默认绑定规则：

```js
function foo() {
  console.log( this.a );
}

var a = 2;

foo.call( null ); // 2
```

那么什么情况下你会传入 `null` 呢？

一种非常常见的做法是使用 `apply(..)` 来“展开”一个数组，并当作参数传入一个函数。类似地，`bind(..)` 可以对参数进行柯里化（预先设置一些参数），这种方法有时非常有用：

```js
function foo(a,b) {
  console.log( "a:" + a + ", b:" + b );
}

// 把数组“展开”成参数
foo.apply( null, [2, 3] ); // a:2, b:3

// 使用 bind 进行柯里化
var bar = foo.bind( null, 2 );
bar( 3 ); // a:2, b:3
```

这些方法都需要传入一个参数当作 `this` 的绑定对象。如果函数并不关心 `this` 的话，你仍然需要传入一个占位值，这时 `null` 可能是一个不错的选择。

> 在ES6中，可以用 `...` 操作符代替 `apply(..)` 来“展开”数组，这样可以避免不必要的 `this` 绑定。可惜，在 ES6 中没有柯里化的相关语法，因此还是需要使用 `bind(..)`。

然而，总是使用 `null` 来忽略 `this` 绑定可能产生一些副作用。如果某个函数确实使用了 `this`（比如第三方库中的一个函数），那默认绑定规则会把 `this` 绑定到全局对象（在浏览器中这个对象是 window），这将导致不可预计的后果（比如修改全局对象）。显而易见，这种方式可能会导致许多难以分析和追踪的 bug。

- **更安全的this**

一种“更安全”的做法是传入一个特殊的对象，比如可以创建一个“DMZ”（demilitarized zone，非军事区）对象——它就是一个空的非委托的对象。

如果我们在忽略 `this` 绑定时总是传入一个 DMZ 对象，那就什么都不用担心了，因为任何对于 `this` 的使用都会被限制在这个空对象中，不会对全局对象产生任何影响。

无论你叫它什么，在 JavaScript 中创建一个空对象最简单的方法都是 `Object.create(null)`。`Object.create(null)` 和 `{}` 很像，但是并不会创建 `Object.prototype` 这个委托，所以它比 `{}` “更空”。

##### 2.4.2.间接引用

可能（有意或者无意地）创建一个函数的“间接引用”，在这种情况下，调用这个函数会应用默认绑定规则。

间接引用最容易在赋值时发生：

```js
function foo() {
  console.log( this.a );
}

var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };

o.foo(); // 3
(p.foo = o.foo)(); // 2
```

> 注意：对于默认绑定来说，决定 `this` 绑定对象的并不是调用位置是否处于严格模式，而是函数体是否处于严格模式。如果函数体处于严格模式，`this` 会被绑定到 `undefined`，否则 `this` 会被绑定到全局对象。

##### 2.4.3.软绑定

硬绑定这种方式可以把 `this` 强制绑定到指定的对象（除了使用 `new` 时），防止函数调用应用默认绑定规则。问题在于，硬绑定会大大降低函数的灵活性，使用硬绑定之后就无法使用隐式绑定或者显式绑定来修改 `this`。

如果可以给默认绑定指定一个全局对象和 `undefined` 以外的值，那就可以实现和硬绑定相同的效果，同时保留隐式绑定或者显式绑定修改 `this` 的能力，这种方式被称为 **软绑定**。

```js
if (!Function.prototype.softBind) {
  Function.prototype.softBind = function(obj) {
      var fn = this;
      // 捕获所有 curried 参数
      var curried = [].slice.call( arguments, 1 );
      var bound = function() {
          return fn.apply(
              (!this || this === (window || global)) ?obj : this,
              curried.concat.apply( curried, arguments )
          );
      };
      bound.prototype = Object.create( fn.prototype );
      return bound;
  };
}

// TODO: curried.concat.apply( curried, arguments );
// arguments 去掉好像也没有什么影响

// TODO: bound.prototype = Object.create( fn.prototype );
// 整句移除，也好像没什么影响
```

#### 2.5.箭头函数

箭头函数并不是使用 `function` 关键字定义的，而是使用被称为“胖箭头”的操作符 `=>` 定义的。箭头函数不使用 `this` 的四种标准规则，而是根据外层（函数或者全局）作用域来决定 `this`。具体来说，箭头函数会继承外层函数调用的 `this` 绑定（无论 `this` 绑定到什么）。

```js
function foo() {
  // 返回一个箭头函数
  return (a) => {
      //this继承自foo()
      console.log( this.a );
  };
}

var obj1 = {
  a:2
};

var obj2 = {
  a:3
};

var bar = foo.call( obj1 );
bar.call( obj2 ); // 2, 不是3！
```

箭头函数可以像 `bind(..)` 一样确保函数的 `this` 被绑定到指定对象，此外，其重要性还体现在它用更常见的词法作用域取代了传统的 `this` 机制。实际上，在 ES6 之前我们就已经在使用一种几乎和箭头函数完全一样的模式。

```js
function foo() {
  var self = this; // lexical capture of this
  setTimeout( function(){
      console.log( self.a );
  }, 100 );
}

var obj = {
  a: 2
};

foo.call( obj ); // 2
```

虽然 `self = this` 和箭头函数看起来都可以取代 `bind(..)`，但是从本质上来说，它们想替代的是 `this` 机制。

如果你经常编写 `this` 风格的代码，但是绝大部分时候都会使用 `self = this` 或者箭头函数来否定 `this` 机制，那你或许应当：

1. 只使用词法作用域并完全抛弃错误 `this` 风格的代码；
2. 完全采用 `this` 风格，在必要时使用 `bind(..)`，尽量避免使用 `self = this` 和箭头函数。

当然，包含这两种代码风格的程序可以正常运行，但是在同一个函数或者同一个程序中混合使用这两种风格通常会使代码更难维护，并且可能也会更难编写。

### 3.对象

#### 3.1.类型

`null` 有时会被当作一种对象类型，但是这其实只是语言本身的一个 bug，即对 `null` 执行 `typeof null` 时会返回字符串"object"。实际上，`null` 本身是基本类型。

> 原理是这样的，不同的对象在底层都表示为二进制，在 JavaScript 中二进制前三位都为 0 的话会被判断为 `object` 类型， `null` 的二进制表示是全 0，自然前三位也是 0，所以执行 typeof 时会返回“object”。

有一种常见的错误说法是“JavaScript 中万物皆是对象”，这显然是错误的。

实际上，JavaScript 中有许多特殊的对象子类型，我们可以称之为复杂基本类型。

函数就是对象的一个子类型（从技术角度来说就是“可调用的对象”）。JavaScript 中的函数是“一等公民”，因为它们本质上和普通的对象一样（只是可以调用），所以可以像操作其他对象一样操作函数（比如当作另一个函数的参数）。

数组也是对象的一种类型，具备一些额外的行为。数组中内容的组织方式比一般的对象要稍微复杂一些。

**内置对象**

JavaScript中还有一些对象子类型，通常被称为内置对象。有些内置对象的名字看起来和简单基础类型一样，不过实际上它们的关系更复杂。

- `String`
- `Number`
- `Boolean`
- `Object`
- `Function`
- `Array`
- `Date`
- `RegExp`
- `Error`

这些内置对象从表现形式来说很像其他语言中的类型（type）或者类（class），比如 Java 中的 `String` 类。

但是在 JavaScript 中，它们实际上只是一些内置函数。这些内置函数可以当作构造函数（由 `new` 产生的函数调用）来使用，从而可以构造一个对应子类型的新对象。

原始值"I am a string"并不是一个对象，它只是一个字面量，并且是一个不可变的值。如果要在这个字面量上执行一些操作，比如获取长度、访问其中某个字符等，那需要将其转换为 `String` 对象。

幸好，在必要时语言会自动把字符串字面量转换成一个 `String` 对象，也就是说你并不需要显式创建一个对象。JavaScript 社区中的大多数人都认为能使用文字形式时就不要使用构造形式。

> `null` 和 `undefined` 没有对应的构造形式，它们只有文字形式。相反，`Date` 只有构造，没有文字形式。

对于 `Objec`t、`Array`、`Function` 和 `RegExp`（正则表达式）来说，无论使用文字形式还是构造形式，它们都是对象，不是字面量。在某些情况下，相比用文字形式创建对象，构造形式可以提供一些额外选项。由于这两种形式都可以创建对象，所以我们首选更简单的文字形式。建议只在需要那些额外选项时使用构造形式。

`Error` 对象很少在代码中显式创建，一般是在抛出异常时被自动创建。也可以使用 `new Error(..)` 这种构造形式来创建，不过一般来说用不着。

#### 3.2.内容

对象的内容是由一些存储在特定命名位置的（任意类型的）值组成的，我们称之为**属性**。

需要强调的一点是，在引擎内部，这些值的存储方式是多种多样的，一般并不会存在对象容器内部。存储在对象容器内部的是这些属性的名称，它们就像指针（从技术角度来说就是引用）一样，指向这些值真正的存储位置。

```js
var myObject = {
  a: 2
};

myObject.a; // 2

myObject["a"]; // 2
```

如果要访问 `myObject` 中 `a` 位置上的值，我们需要使用 `.` 操作符或者 `[]` 操作符。`.a` 语法通常被称为“**属性访问**”，`["a"]` 语法通常被称为“**键访问**”。实际上它们访问的是同一个位置。

这两种语法的主要区别在于 `.` 操作符要求属性名满足标识符的命名规范，而 `[]` 语法可以接受任意 UTF-8/Unicode 字符串作为属性名。此外，由于 `[]` 语法使用字符串来访问属性，所以可以在程序中构造这个字符串。

在对象中，属性名永远都是字符串。如果你使用 `string`（字面量）以外的其他值作为属性名，那它首先会被转换为一个字符串。

##### 3.2.1.可计算属性名

如果需要通过表达式来计算属性名，那么 `[]` 这种属性访问语法就可以派上用场了。ES6 增加了可计算属性名，可以在文字形式中使用 `[]` 包裹一个表达式来当作属性名：

```js
var prefix = "foo";

var myObject = {
  [prefix + "bar"]: "hello",
  [prefix + "baz"]: "world"
};

myObject["foobar"]; // hello
myObject["foobaz"]; // world
```

可计算属性名最常用的场景可能是 ES6 的符号（Symbol），一般来说你不会用到符号的实际值（因为理论上来说在不同的 JavaScript 引擎中值是不同的），所以通常你接触到的是符号的名称：

```js
var myObject = {
  [Symbol('Something')]: "hello world"
}

console.log(myObject); // Symbol(Something): "hello world"
```

##### 3.2.2.属性与方法

由于函数很容易被认为是属于某个对象，在其他语言中，属于对象（也被称为“类”）的函数通常被称为“方法”，因此把“属性访问”说成是“方法访问”也就不奇怪了。有意思的是，JavaScript 的语法规范也做出了同样的区分。

从技术角度来说，函数永远不会“属于”一个对象，所以把对象内部引用的函数称为“方法”似乎有点不妥。确实，有些函数具有 `this` 引用，有时候这些 `this` 确实会指向调用位置的对象引用。但是这种用法从本质上来说并没有把一个函数变成一个“方法”，因为 `this` 是在运行时根据调用位置动态绑定的，所以函数和对象的关系最多也只能说是间接关系。

无论返回值是什么类型，每次访问对象的属性就是属性访问。如果属性访问返回的是一个函数，那它也并不是一个“方法”。属性访问返回的函数和其他函数没有任何区别（除了可能发生的隐式绑定this，就像我们刚才提到的）。

或许有人会辩解说，函数并不是在定义时成为方法，而是在被调用时根据调用位置的不同（是否具有上下文对象）成为方法。即便如此，这种说法仍然有些不妥。

最保险的说法可能是，“函数”和“方法”在 JavaScript 中是可以互换的。

> ES6 增加了 `super` 引用，一般来说会被用在 `class` 中。`super` 的行为似乎更有理由把 `super` 绑定的函数称为“方法”。但是再说一次，这些只是一些语义（和技术）上的微妙差别，本质是一样的。

##### 3.2.3.数组

数组也支持 `[]` 访问形式，数组有一套更加结构化的值存储机制（不过仍然不限制值的类型）。数组期望的是数值下标，也就是说值存储的位置（通常被称为索引）是非负整数。数组也是对象，所以虽然每个下标都是整数，你仍然可以给数组添加属性：

```js
var myArray = [ "foo", 42, "bar" ];

myArray.baz = "baz";
myArray.length; // 3

myArray['3'] = "bazz";
myArray.length; // 4

myArray.baz; // "baz"
myArray['3']; // "bazz"


```

可以看到虽然添加了命名属性（无论是通过 `.` 语法还是 `[]` 语法），数组的 `length` 值并未发生变化。

你完全可以把数组当作一个普通的键/值对象来使用，并且不添加任何数值索引，但是这并不是一个好主意。数组和普通的对象都根据其对应的行为和用途进行了优化，所以最好只用对象来存储键/值对，只用数组来存储数值下标/值对。

> 注意：如果你试图向数组添加一个属性，但是属性名“看起来”像一个数字，那它会变成一个数值下标（因此会修改数组的内容而不是添加一个属性）。

##### 3.2.4.复制对象

JavaScript 最常见的问题之一就是如何复制一个对象。看起来应该有一个内置的 `copy()` 方法，是吧？实际上事情更复杂，因为我们无法选择一个默认的复制算法。

```js
function anotherFunction() { /*..*/ }

var anotherObject = {
  c: true
};

var anotherArray = [];

var myObject = {
  a: 2,
  b: anotherObject, // 引用，不是复本！
  c: anotherArray, // 另一个引用！
  d: anotherFunction
};

anotherArray.push( anotherObject, myObject );
```

如何准确地表示myObject的复制呢？

首先，我们应该判断它是浅复制还是深复制。

对于浅拷贝来说，复制出的新对象中 `a` 的值会复制旧对象中 `a` 的值，也就是 2，但是新对象中 `b`、`c`、`d` 三个属性其实只是三个引用，它们和旧对象中 `b`、`c`、`d` 引用的对象是一样的。

对于深复制来说，除了复制 `myObject` 以外还会复制 `anotherObject` 和 `anotherArray`。这时问题就来了，`anotherArray` 引用了 `anotherObject` 和 `myObject`，所以又需要复制 `myObject`，这样就会由于循环引用导致死循环。

我们是应该检测循环引用并终止循环（不复制深层元素）？还是应当直接报错或者是选择其他方法？

除此之外，我们还不确定“复制”一个函数意味着什么。有些人会通过 `toString()` 来序列化一个函数的源代码（但是结果取决于 JavaScript 的具体实现，而且不同的引擎对于不同类型的函数处理方式并不完全相同）。

那么如何解决这些棘手问题呢？许多 JavaScript 框架都提出了自己的解决办法，但是 JavaScript 应当采用哪种方法作为标准呢？在很长一段时间里，这个问题都没有明确的答案。

对于 JSON 安全（也就是说可以被序列化为一个 JSON 字符串并且可以根据这个字符串解析出一个结构和值完全一样的对象）的对象来说，有一种巧妙的复制方法：

```js
var newObj = JSON.parse( JSON.stringify( someObj ) );
```

当然，这种方法需要保证对象是 `JSON` 安全的，所以只适用于部分情况。

相比深复制，浅复制非常易懂并且问题要少得多，所以 ES6 定义了 `Object.assign(..)` 方法来实现浅复制。

`Object.assign(..)` 方法的第一个参数是目标对象，之后还可以跟一个或多个源对象。它会遍历一个或多个源对象的所有可枚举（enumerable）的私有属性（owned key）并把它们复制（使用 `=` 操作符赋值）到目标对象，最后返回目标对象，就像这样：

```js
var newObj = Object.assign( {}, myObject );

newObj.a; // 2
newObj.b === anotherObject; // true
newObj.c === anotherArray; // true
newObj.d === anotherFunction; // true
```

> 但是需要注意的一点是，由于 `Object.assign(..)` 就是使用 `=` 操作符来赋值，所以源对象属性的一些特性（比如 `writable`）不会被复制到目标对象。

##### 3.2.5.属性描述符

在 ES5 之前，JavaScript 语言本身并没有提供可以直接检测属性特性的方法，比如判断属性是否是只读。但是从 ES5 开始，所有的属性都具备了属性描述符。

```js
var myObject = {
  a:2
};

// Object.getOwnPropertyDescriptor
Object.getOwnPropertyDescriptor( myObject, "a" );
// {
//    value: 2,
//    writable: true, // 可写
//    enumerable: true, // 可枚举
//    configurable: true // 可配置
// }
```

在创建普通属性时属性描述符会使用默认值，我们也可以使用 `Object.defineProperty(..)` 来添加一个新属性或者修改一个已有属性（如果它是 `configurable`）并对特性进行设置。

```js
var myObject = {};

Object.defineProperty( myObject, "a", {
  value: 2,
  writable: true,
  configurable: true,
  enumerable: true
} );

myObject.a; // 2
```

一般来说不会使用这种方式，除非需要修改属性描述符。

1.**Writable**

`writable` 决定是否可以修改属性的值。为 `false` 时，对于属性值的修改静默失败（silently failed）了。如果在严格模式下，这种方法会抛出 `TypeError` 错误。

> 简单来说，可以把 `writable:false` 看作是属性不可改变，相当于你定义了一个空操作 `setter`。严格来说，如果要和 `writable:false` 一致的话，你的 `setter` 被调用时应当抛出一个 `TypeError` 错误。

2.**Configurable**

只要属性是可配置的，就可以使用 `defineProperty(..)` 方法来修改属性描述符。

不管是不是处于严格模式，尝试修改一个不可配置的属性描述符都会产生一个 `TypeError` 错误。注意：如把 `configurable` 修改成 `false` 是单向操作，无法撤销！

> 要注意有一个小小的例外：即便属性是 `configurable:false`， 我们还是可以把 `writable` 的状态由 `true` 改为 `false`，但是无法由 `false` 改为 `true`。

除了无法修改，`configurable:false` 还会禁止删除这个属性。

> `delete` 只用来直接删除对象的（可删除）属性。如果对象的某个属性是某个对象/函数的最后一个引用者，对这个属性执行 `delete` 操作之后，这个未引用的对象/函数就可以被垃圾回收。但是，不要把 `delete` 看作一个释放内存的工具（就像 C/C++ 中那样），它就是一个删除对象属性的操作，仅此而已。

3.**Enumerable**

从名字就可以看出，这个描述符控制的是属性是否会出现在对象的属性枚举中，比如说 `for..in` 循环。如果把 `enumerable` 设置成 `false`，这个属性就不会出现在枚举中，虽然仍然可以正常访问它。相对地，设置成 `true` 就会让它出现在枚举中。

> 用户定义的所有的普通属性默认都是 `enumerable:true`。

##### 3.2.6.不变性

有时候希望属性或者对象是不可改变（无论有意还是无意）的，在 ES5 中可以通过很多种方法来实现。

很重要的一点是，所有的方法创建的都是【浅不变性】，也就是说，它们只会影响目标对象和它的直接属性。如果目标对象引用了其他对象（数组、对象、函数，等），其他对象的内容不受影响，仍然是可变的：

```js
myImmutableObject.foo; // [1,2,3]
myImmutableObject.foo.push( 4 );
myImmutableObject.foo; // [1,2,3,4]
```

> 在 JavaScript 程序中很少需要【深不可变性】。有些特殊情况可能需要这样做，但是根据通用的设计模式，如果你发现需要密封或者冻结所有的对象，那你或许应当退一步，重新思考一下程序的设计，让它能更好地应对对象值的改变。

1.**对象常量**

结合 `writable:false` 和 `configurable:false` 就可以创建一个真正的常量属性（不可修改、重定义或者删除）：

```js
var myObject = {};

Object.defineProperty( myObject, "FAVORITE_NUMBER", {
  value: 42,
  writable: false,
  configurable: false
} );
```

### 4.混合对象“类”

### 5.原型

### 6.行为委托
