# `this` 全面解析

## 1.调用位置

在理解 `this` 的绑定过程之前，首先要理解 *调用位置*：调用位置就是函数在代码中被调用的位置（而不是声明的位置）。只有仔细分析调用位置才能回答这个问题：这个 `this` 到底引用的是什么？

最重要的是要分析 **调用栈**（就是为了到达当前执行位置所调用的所有函数）。我们关心的 *调用位置就在当前正在执行的函数的前一个调用中*。

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

## 2.绑定规则

### 2.1.默认绑定

首先要介绍的是最常用的函数调用类型：独立函数调用。直接使用不带任何修饰的函数引用进行调用的，因此只能使用默认绑定，无法应用其他规则。也可以把这条规则看作是无法应用其他规则时的默认规则。

默认绑定时，`this` 指向 【全局对象】（严格模式下，不能将全局对象用于默认绑定，因此 `this` 会绑定到 `undefined`）。

```js
function foo() {
  console.log(this.a);
}

function bar() {
  'use strict';
  console.log(this.a);
}

const a = 2;

foo(); // 2
bar(); // TypeError
```

> 通常来说不应该在代码中混合使用 `strict` 模式和非 `strict` 模式。

### 2.2.隐式绑定

当函数引用有【上下文对象】时，隐式绑定规则会把函数调用中的 `this` 绑定到这个上下文对象。

```js
function foo() {
  console.log(this.a);
}

const obj = {
  a: 2,
  foo: foo,
  bar: function () {
    console.log(this.a);
  }
};

obj.foo(); // 2
obj.bar(); // 2
```

但对象属性引用链中只有上一层或者说最后一层在调用位置中起作用。

```js
function foo() {
  console.log(this.a);
}

const obj2 = {
  a: 42,
  foo: foo
};

const obj1 = {
  a: 2,
  obj2: obj2
};

obj1.obj2.foo(); // 42
```

#### 2.2.1.隐式丢失

一个最常见的 `this` 绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定。

```js
function foo() {
  console.log(this.a);
}

const obj = {
  a: 2,
  foo: foo
};

const bar = obj.foo;
// 函数别名！虽然 bar 是 obj.foo 的一个引用，
// 但是实际上，它引用的是 foo 函数本身

const a = "oops, global"; // a 是全局对象的属性

bar(); // "oops, global"
```

一种更微妙、更常见并且更出乎意料的情况发生在传入回调函数时：

```js
function foo() {
  console.log(this.a);
}

function doFoo(fn) {
  // fn 其实引用的是 foo

  fn(); // <-- 调用位置！
}

const obj = {
  a: 2,
  foo: foo
};

const a = "oops, global"; // a 是全局对象的属性

doFoo(obj.foo); // "oops, global"
```

> *参数传递其实就是一种隐式赋值*，因此我们传入函数时也会被隐式赋值。如果把函数传入语言内置的函数而不是传入你自己声明的函数，结果是一样的，没有区别。

除此之外，还有一种情况 `this` 的行为会出乎我们意料：调用回调函数的函数可能会修改 `this`。在一些流行的 JavaScript 库中事件处理器常会把回调函数的 `this` 强制绑定到触发事件的 DOM 元素上。这在一些情况下可能很有用，但是有时它可能会让你感到非常郁闷。

无论是哪种情况，`this` 的改变都是意想不到的，实际上你无法控制回调函数的执行方式，因此就没有办法控制调用位置以得到期望的绑定。

### 2.3.显式绑定

在分析隐式绑定时，必须在一个对象内部包含一个指向函数的属性，并通过这个属性间接引用函数，从而把 `this` 间接（隐式）绑定到这个对象上。那么如果不想在对象内部包含函数引用，而想在某个对象上【强制调用函数】，该怎么做呢？

JavaScript 中的“所有”函数都有一些有用的特性（这和它们的 `[[Prototype]]` 有关），可以用来解决这个问题。具体点说，可以使用函数的 `call` 和 `apply` 方法。

这两个方法是如何工作的呢？它们的第一个参数是一个对象，是给 `this` 准备的，接着在调用函数时将其绑定到 `this`。因为可以直接指定 `this` 的绑定对象，因此称之为 **显式绑定**。

> `call` 和 `apply` 的区别在于，`call` 在第一个参数以后接收多个参数，而 `apply` 只能就收这些参数构成的数组。这些参数会默认传递给调用的函数。`apply` 的第二个数组参数（若有）传递给函数时，会自动展开这个数组。

```js
function foo() {
  console.log(this.a);
}

const obj = {
  a: 2
};

foo.call(obj); // 2
```

如果传入了一个原始值（字符串类型、布尔类型或者数字类型）来当作 `this` 的绑定对象，这个原始值会被转换成它的对象形式（也就是 `new String`、`new Boolean` 或者 `new Number`）。这通常被称为 “**包装**”。

可惜，显式绑定仍然无法解决我们之前提出的丢失绑定问题。

#### 2.3.1.硬绑定

但是显式绑定的一个变种可以解决这个问题。

```js
function foo() {
  console.log(this.a);
}

const obj = {
  a: 2
};

const bar = function () {
  foo.call(obj);
};

bar(); // 2
setTimeout(bar, 100); // 2

// 硬绑定的 bar 不可能再修改它的 this
bar.call(window); // 2
```

无论之后如何调用函数 `bar`，它总会手动在 `obj` 上调用 `foo`。这种绑定是一种显式的强制绑定，因此我们称之为 **硬绑定**。硬绑定的典型应用场景就是创建一个【包裹函数】，负责接收参数并返回值：

```js
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}

const obj = {
  a: 2
};

const bar = function () {
  return foo.apply(obj, arguments);
};

const b = bar(3); // 2 3
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

const obj = {
  a: 2
};

const bar = Bind(foo, obj);

const b = bar(3); // 2 3
console.log(b); // 5
```

由于硬绑定是一种非常常用的模式，所以 ES5 提供了内置的方法 `Function.prototype.bind`。`bind` 会返回一个硬绑定的新函数，它会把你指定的参数设置为 `this` 的上下文并调用原始函数。

#### 2.3.2.API 调用的“上下文”

第三方库的许多函数，以及 JavaScript 语言和宿主环境中许多新的内置函数，都提供了一个可选的参数，通常被称为 “**上下文**”（context），其作用和 `bind` 一样，确保你的回调函数使用指定的 `this`。

```js
function foo(el) {
  console.log(el, this.id);
}

const obj = {
  id: "awesome"
};

// 调用 foo() 时把 this 绑定到 obj
[1, 2, 3].forEach(foo, obj);
// 1 awesome
// 2 awesome
// 3 awesome
```

> 这些函数实际上就是通过 `call` 或者 `apply` 实现了显式绑定。

### 2.4.`new` 绑定

在传统的面向类的语言中，“构造函数”是类中的一些特殊方法，使用 `new` 初始化类时会（自动）调用类中的构造函数。通常的形式是这样的：

```js
something = new MyClass();
```

JavaScript 也有一个 `new` 操作符，使用方法看起来也和那些面向类的语言一样，绝大多数开发者都认为 JavaScript 中 `new` 的机制也和那些语言一样。然而，JavaScript 中 `new` 的机制实际上和面向类的语言完全不同。

首先我们重新定义一下 JavaScript 中的“构造函数”。JavaScript 中的构造函数只是一些使用 `new` 操作符时被调用的函数，它们并不会属于某个类，也不会实例化一个类。实际上，它们甚至都不能说是一种特殊的函数类型，它们只是被 `new` 操作符调用的普通函数而已。

举例来说，思考一下 `Number` 作为构造函数时的行为，ES5.1 中这样描述它：

> 15.7.2 Number 构造函数
>
> 当 Number 在 `new` 表达式中被调用时，它是一个构造函数：它会初始化新创建的对象。

所以，包括内置对象函数（比如 `Number`）在内的所有函数都可以用 `new` 来调用，这种函数调用被称为 **构造函数调用**。这里有一个重要但是非常细微的区别：实际上并不存在所谓的“构造函数”，只有对于函数的 “**构造调用**”。

使用 `new` 来调用函数，或者说发生“构造调用”时，会自动执行下面的操作。

1. 创建（或者说构造）一个全新的对象。
>
2. 这个新对象会被执行 `[[Prototype]]` 连接。
>
3. 这个新对象会绑定到函数调用的 `this`。
>
4. 如果函数没有返回其他对象，那么 `new` 表达式中的函数调用会自动返回这个新对象。

```js
function foo(a) {
 this.a = a;
}

const bar = new foo(2);

console.log(bar.a); // 2
```

使用 `new` 来调用 `foo` 时，我们会构造一个新对象并把它绑定到 `foo` 调用中的 `this` 上。`new` 是最后一种可以影响函数调用时 `this` 绑定行为的方法，我们称之为 **`new` 绑定**。

## 3.优先级

毫无疑问，默认绑定的优先级是四条规则中最低的，所以我们可以先不考虑它。

```js
function foo() {
  console.log(this.a);
}

const obj1 = {
  a: 2,
  foo: foo
};

const obj2 = {
  a: 3,
  foo: foo
};

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call(obj2); // 3
obj2.foo.call(obj1); // 2
```

可以看到，显式绑定优先级更高（对隐式绑定而言），也就是说在判断时应当先考虑是否可以存在显式绑定。

```js
function foo(something) {
  this.a = something;
}

const obj1 = {
  foo: foo
};

const obj2 = {};

obj1.foo(2);
console.log(obj1.a); // 2

obj1.foo.call(obj2, 3);
console.log(obj2.a); // 3

const bar = new obj1.foo(4);
console.log(obj1.a); // 2
console.log(bar.a); // 4
```

可以看到 `new` 绑定比隐式绑定优先级高。

> `new` 和 `call/apply` 无法一起使用，`TypeError: fn.call(...) is not constructor`。

实际上，ES5 中内置的 `Function.prototype.bind` 更加复杂。下面是 MDN 提供的一种 `bind` 实现：

```js
//  Yes, it does work with `new (funcA.bind(thisArg, args))`
if (!Function.prototype.bind) (function(){
  const ArrayPrototypeSlice = Array.prototype.slice;
  Function.prototype.bind = function(otherThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    const baseArgs= ArrayPrototypeSlice.call(arguments, 1),
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

> 这种 `bind` 是一种 polyfill 代码（polyfill 就是我们常说的刮墙用的腻子，polyfill 代码主要用于旧浏览器的兼容），对于 `new` 使用的硬绑定函数来说，这段 polyfill 代码和 ES5 内置的 `bind` 函数并不完全相同。由于 polyfill 并不是内置函数，所以无法创建一个不包含 `.prototype` 的函数，因此会具有一些副作用。如果你要在 `new` 中使用硬绑定函数并且依赖 polyfill 代码的话，一定要非常小心。

下面是 `new` 修改 `this` 的相关代码：

```js
fNOP.prototype.isPrototypeOf(this) ? this : otherThis
// ...
fNOP.prototype = this.prototype;
// ...
fBound.prototype = new fNOP();
```

简单来说，这段代码会判断硬绑定函数是否是被 `new` 调用，如果是的话就会使用新创建的 `this` 替换硬绑定的 `this`。那么，为什么要在 `new` 中使用硬绑定函数呢？直接使用普通函数不是更简单吗？之所以要在 `new` 中使用硬绑定函数，主要目的是预先设置函数的一些参数，这样在使用 `new` 进行初始化时就可以只传入其余的参数。`bind` 的功能之一就是可以把除了第一个参数（第一个参数用于绑定 `this`）之外的其他参数都传给下层的函数（这种技术称为“部分应用”，是“柯里化”的一种）。

```js
function foo(p1,p2) {
  this.val = p1 + p2;
}

// 之所以使用 null 是因为在本例中我们并不关心硬绑定的 this 是什么
// 反正使用 new 时 this 会被修改
const bar = foo.bind(null, "p1");

const baz = new bar("p2");

baz.val; // p1p2
```

### 3.1.小结

- 函数是否在 `new` 中调用（`new` 绑定）
  >
  - 是：`this` 绑定的是新创建的对象；
  - 否：函数是否通过 `call`、`apply`（显式绑定）或者硬绑定调用？
    >
    - 是：`this` 绑定的是指定的对象；
    - 否：函数是否在某个上下文对象中调用（隐式绑定）？
      >
      - 是：`this` 绑定的是那个上下文对象；
      - 否：使用默认绑定。如果在严格模式下，就绑定到 `undefined`，否则绑定到全局对象。

## 4.绑定例外

### 4.1.被忽略的 `this`

如果你把 `null` 或者 `undefined` 作为 `this` 的绑定对象传入 `call`、`apply` 或者 `bind`，这些值在调用时会被忽略，实际应用的是默认绑定规则：

```js
function foo() {
  console.log(this.a);
}

const a = 2;

foo.call(null); // 2
```

那么什么情况下你会传入 `null` 呢？一种非常常见的做法是使用 `apply` 来“展开”一个数组，并当作参数传入一个函数。类似地，`bind` 可以对参数进行柯里化（预先设置一些参数），这种方法有时非常有用：

```js
function foo(a, b) {
  console.log("a:" + a + ", b:" + b);
}

// 把数组“展开”成参数
// ...[]
// [].flat
foo.apply(null, [2, 3]); // a:2, b:3

// 使用 bind 进行柯里化
const bar = foo.bind(null, 2);
bar(3); // a:2, b:3

// 使用 bind 进行柯里化更明显的例子
function foo(a, b, c, d) {
  console.log(a, b, c, d);
}

var t1 = foo.bind(null, 1);
var t2 = t1.bind(null, 2);
var t3 = t2.bind(null, 3);
var t4 = t3.bind(null, 4);

t1(1, 2, 3); // 1 1 2 3
t2(2, 3); // 1 2 2 3
t3(3); // 1 2 3 3
t4(); // 1 2 3 4
```

这些方法都需要传入一个参数当作 `this` 的绑定对象。如果函数并不关心 `this` 的话，你仍然需要传入一个占位值，这时 `null` 可能是一个不错的选择。

> 在 ES6 中，可以用 `...` 操作符代替 `apply` 来“展开”数组，这样可以避免不必要的 `this` 绑定。可惜，在 ES6 中没有柯里化的相关语法，因此还是需要使用 `bind`。

然而，总是使用 `null` 来忽略 `this` 绑定可能产生一些副作用。如果某个函数确实使用了 `this`（比如第三方库中的一个函数），那默认绑定规则会把 `this` 绑定到全局对象，这将导致不可预计的后果（比如修改全局对象）。显而易见，这种方式可能会导致许多难以分析和追踪的 bug。

#### 4.1.1.更安全的 `this`

一种“更安全”的做法是传入一个特殊的对象，比如可以创建一个 “**DMZ**”（demilitarized zone，非军事区）对象——它就是一个空的非委托的对象。

如果我们在忽略 `this` 绑定时总是传入一个 DMZ 对象，那就什么都不用担心了，因为任何对于 `this` 的使用都会被限制在这个空对象中，不会对全局对象产生任何影响。

无论你叫它什么，在 JavaScript 中创建一个空对象最简单的方法都是 `Object.create(null)`。`Object.create(null)` 和 `{}` 很像，但是并不会创建 `Object.prototype` 这个委托，所以它比 `{}` “更空”。

```js
function foo(a, b) {
  console.log("a:" + a + ", b:" + b);
}

// 我们的 DMZ 空对象
var ø = Object.create(null);

// 把数组展开成参数
foo.apply(ø, [2, 3]); // a:2, b:3

// 使用 bind 进行柯里化
var bar = foo.bind(ø, 2);
bar(3); // a:2, b:3
```

### 4.2.间接引用

可能（有意或者无意地）创建一个函数的“间接引用”，在这种情况下，调用这个函数会应用默认绑定规则。间接引用最容易在赋值时发生：

```js
function foo() {
  console.log(this.a);
}

var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };

o.foo(); // 3
// 赋值表达式 p.foo = o.foo 的返回值是目标函数的引用
// 因此调用位置是 foo() 而不是
// p.foo() 或者 o.foo()
(p.foo = o.foo)(); // 2
p.foo = o.foo;
p.foo(); // 4
```

> 注意：对于默认绑定来说，决定 `this` 绑定对象的并不是调用位置是否处于严格模式，而是函数体是否处于严格模式。如果函数体处于严格模式，`this` 会被绑定到 `undefined`，否则 `this` 会被绑定到全局对象。

### 4.3.软绑定

硬绑定会大大降低函数的灵活性，使用硬绑定之后就无法使用隐式绑定或者显式绑定来修改 `this`。

如果可以给默认绑定指定一个全局对象和 `undefined` 以外的值，那就可以实现和硬绑定相同的效果，同时保留隐式绑定或者显式绑定修改 `this` 的能力，这种方式被称为 **软绑定**。

```js
if (!Function.prototype.softBind) {
  Function.prototype.softBind = function(obj) {
      const fn = this;

      // 捕获所有 curried 参数
      const curried = [].slice.call(arguments, 1);
      const bound = function() {
          // 若是默认绑定，则使用传入的参数作为新 this
          // 若已经 隐式/显示 绑定过，则保留原有的 this
          return fn.apply(
              (!this || this === (window || global)) ? obj : this,
              curried.concat.apply(curried, arguments)
         );
        //  curried.concat.apply(curried, arguments) == curried
      };
      bound.prototype = Object.create(fn.prototype);
      return bound;
  };
}

var obj = { name: "obj" },
  obj2 = { name: "obj2" },
  obj3 = { name: "obj3" };

var fooOBJ = foo.softBind(obj);
fooOBJ(); // name: obj
obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2 <---- 看！！！
fooOBJ.call(obj3); // name: obj3 <---- 看！
setTimeout(obj2.foo, 10);
// name: obj <---- 应用了软绑定
```

## 5.箭头函数

箭头函数并不是使用 `function` 关键字定义的，而是使用被称为“胖箭头”的操作符 `=>` 定义的。箭头函数不使用 `this` 的四种标准规则，而是根据 *外层（函数或者全局）作用域* 来决定 `this`。具体来说，*箭头函数会继承外层函数调用的 `this` 绑定*（无论 `this` 绑定到什么）。

```js
function foo() {
  // 返回一个箭头函数
  return (a) => {
    //this 继承自 foo()
    console.log(this.a);
  };
}
var obj1 = {
  a: 2
};s
var obj2 = {
  a: 3
};
var bar = foo.call(obj1);
bar.call(obj2); // 2, 不是 3
```

`foo` 内部创建的箭头函数会捕获调用时 `foo` 的 `this`。由于 `foo` 的 `this` 绑定到 `obj1`，`bar`（引用箭头函数）的 `this` 也会绑定到 `obj1`，箭头函数的绑定无法被修改。（`new` 也不行！）

箭头函数可以像 `bind` 一样确保函数的 `this` 被绑定到指定对象，此外，其重要性还体现在它用更常见的词法作用域取代了传统的 `this` 机制。实际上，在 ES6 之前我们就已经在使用一种几乎和箭头函数完全一样的模式。

```js
function foo() {
  var self = this; // lexical capture of this
  setTimeout(function(){
    console.log(self.a);
  }, 100);
}

var obj = {
  a: 2
};

foo.call(obj); // 2
```

虽然 `self = this` 和箭头函数看起来都可以取代 `bind`，但是从本质上来说，它们想替代的是 `this` 机制。如果经常编写 `this` 风格的代码，但是绝大部分时候都会使用 `self = this` 或者箭头函数来否定 `this` 机制，那你或许应当：

1. 只使用词法作用域并完全抛弃错误 `this` 风格的代码；
>
2. 完全采用 `this` 风格，在必要时使用 `bind`，尽量避免使用 `self = this` 和箭头函数。

当然，包含这两种代码风格的程序可以正常运行，但是在同一个函数或者同一个程序中混合使用这两种风格通常会使代码更难维护，并且可能也会更难编写。
