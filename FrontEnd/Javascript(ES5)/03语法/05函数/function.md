## 7 Function

函数是一段可以反复调用的代码块。

### 7.1 函数声明

JavaScript 有三种声明函数的方法。

#### 7.1.1 function 命令

ECMAScript 中的函数用 `function` 关键字来定义，可以用在函数定义表达式或者**函数声明**（Function Declaration）语句中，后面跟随以下组成部分：

1).函数名标识符

是函数声明语句必需的部分。用途类似变量名，新定义的函数对象会赋值给这个变量。对于函数定义表达式，这个名是可选的；如果存在，则该名字只存在于函数体中，并指代该函数本身。

2).一对圆括号

其中包含 0 个或多个标识符组成的列表，这些标识符是函数的参数名称；

3).一对花括号

其中包含 0 条或多条 JavaScript 语句，这些语句构成函数体，一旦函数调用，就会执行这些语句。

> 一条函数声明语句实际上声明了一个变量，并把一个函数对象赋值给它。相对而言，定义函数表达式时并没有声明一个变量。

```javascript
function print(s) {
  //...
}
```

#### 7.1.2 函数表达式

除了用 `function` 命令声明函数，还可以采用变量赋值的写法。

```javascript
var print = function(s) {
  //...
};
```

这种写法将一个匿名函数赋值给变量。这时，这个匿名函数又称**函数表达式**（Function Expression），因为赋值语句的等号右侧只能放表达式。

采用函数表达式声明函数时，`function` 命令后面不带有函数名。如果加上函数名，该函数名只在函数体内部有效，指代函数表达式本身，在函数体外部无效。

```javascript
var print = function fnP() {
  console.log(fnP);
  console.log(typeof fnP);
};

print();
// f fnP(){...}
// function

fnP();
// ReferenceError: fnP is not defined

print();
// function
```

这种写法的用处有两个，一是可以在函数体内部调用自身，二是方便除错（除错工具显示函数调用栈时，将显示函数名，而不再显示这里是一个匿名函数）。

因此，下面的形式声明函数（也叫匿名函数表达式）也非常常见。

`var f = function f() {};`

需要注意的是，函数的表达式需要在语句的结尾加上分号，表示语句结束。而函数的声明在结尾的大括号后面不用加分号。总的来说，这两种声明函数的方式，差别很细微，可以近似认为是等价的。

> 函数表达式特别适合用来定义那些只会用到一次的函数。

其他形式的函数表达式（这些也叫立即执行函数表达式）：

```
(function foo() {
  //...
}());

(function() {
  //...
})();
```

函数声明和函数表达式之间最重要的区别是它们的名称标识符将会绑定在何处。函数声明的标识符绑定在当前作用域，而函数表达式的标识符绑定在函数表达式自身的函数作用域中。

匿名函数表达式的缺点：

- 1.匿名函数表达式不会显示有意义的函数名，难以调试；
- 2.引用自身时，只能使用过期的 `arguments.callee`；
- 3.降低代码的可读性/可理解性。

#### 7.1.3 Function 构造函数

第三种声明函数的方式是 `Function` 构造函数。

```javascript
var add = new Function("x", "y", "return x + y");

// 等同于
function add(x, y) {
  return x + y;
}
```

上面代码中，`Function` 构造函数接受三个参数，除了最后一个参数是 `add` 函数的“函数体”，其他参数都是 `add` 函数的参数。

你可以传递任意数量的参数给 `Function` 构造函数，只有最后一个参数会被当做函数体，如果只有一个参数，该参数就是函数体。

> `Function` 构造函数可以不使用 `new` 命令，返回结果完全一样。总的来说，这种声明函数的方式非常不直观，几乎无人使用。

### 7.2 重复声明

如果同一个函数被同种方式多次声明，后面的声明就会覆盖前面的声明。

> 由于函数名的提升，前一次声明在任何时候都是无效的，这一点要特别注意。

严格模式的限制：

---

- 不能把函数命名为 `eval` 或 `arguments`
- 不能把参数命名为 `eval` 或 `arguments`
- 不能出现两个命名参数同名的情况

---

### 7.3 return 语句和递归

调用函数时，要使用圆括号运算符。圆括号之中，可以加入函数的参数。

ECMAScript 中的函数在定义时不必指定是否返回值，实际上，任何函数在任何时候都可以通过 `return` 语句后跟要返回的值来实现返回值；当然应该函数中也可以包含多个 `return` 语句。

另外，`return` 语句也可以不带有任何返回值，在这种情况下，函数停止执行返回 `undefined`，这种用法一般应在需要提前停止函数执行而又不需要返回值的时候。

> 注意，`return` 语句后面的语句是不会被执行的；对于多个 `return` 语句的情况，也是如此。
> 推荐的做法是要么让函数始终返回一个值，要么永远都不要返回值。
> `return` 语句后面，访问 `window` 属性，返回都是 false；

函数可以调用自身，这就是**递归（recursion）**。下面就是通过递归，计算斐波那契数列的代码。

```javascript
function fib(num) {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fib(num - 2) + fib(num - 1);
}

fib(6); // 8
```

### 7.4 函数的特殊性

JavaScript 语言将函数看作一种值，与其它值（数值、字符串、布尔值等等）地位相同。**凡是可以使用值的地方，就能使用函数**。比如，可以把函数赋值给变量和对象的属性，也可以当作参数传入其他函数，或者作为函数的结果返回。

### 7.5 函数名的提升

JavaScript 引擎将函数名视同变量名，所以采用 `function` 命令声明函数时，整个函数会像变量声明一样，被提升到代码头部。但是，如果采用赋值语句定义函数，不会提升。

如果同时采用 `function` 命令和赋值语句声明(`var`)同一个函数，最后总是采用赋值语句的定义。

```js
// case 1
f1; //f f1(){return 2;}
var f1 = function() {
  return 1;
};
function f1() {
  return 2;
}
f1(); //1

// case 2
f2); //f f2(){return 22;}
function f2() {
  return 11;
}
var f2 = function() {
  return 22;
};
f2(); //22

// case 3
f3; //f f3(){return 222;}
function f3() {
  return 111;
}
function f3() {
  return 222;
}
f3(); //222

// case 4
f4; //undefined
var f4 = function() {
  return 1111;
};
var f4 = function() {
  return 2222;
};
f4(); //2222

// case 5
f5; //f f5(){return 5;}
function f5() {
  return 5;
}
var f5 = 123;
f5(); //TypeError: f5 is not a function
```

### 7.6 不能在条件语句中声明函数

根据 ES5 的规范，不得在非函数的代码块中声明函数，最常见的情况就是 `if` 和 `try` 语句。

```javascript
if (foo) {
  function x() {}
}

try {
  function x() {}
} catch (e) {
  console.log(e);
}
```

上面代码按照语言规范，这是不合法的。但是，实际情况是各家浏览器往往并不报错，能够运行。

但是由于存在函数名的提升，所以在条件语句中声明函数，可能是无效的，这是非常容易出错的地方。

```javascript
if (false) {
  function f() {}
}

f(); // 不报错
```

上面代码的原始意图是不声明函数 `f`，但是由于 `f` 的提升，导致 `if` 语句无效，所以上面的代码不会报错。要达到在条件语句中定义函数的目的，只有使用函数表达式。

```javascript
if (false) {
  var f = function() {};
}

f(); // undefined
```

### 7.7 函数的属性

#### 7.7.1 name 属性

函数的 `name` 属性返回函数的名字。

```javascript
function f1() {}
f1.name; // "f1"
```

如果是通过变量赋值定义的函数，那么 `name` 属性返回变量名。

```javascript
var f2 = function() {};
f2.name; // "f2"
```

但是，上面这种情况，只有在变量的值是一个匿名函数时才是如此。如果变量的值是一个具名函数，那么 `name` 属性返回 `function` 关键字之后的那个函数名。

```javascript
var f3 = function myName() {};
f3.name; // 'myName'
```

上面代码中，`f3.name` 返回函数表达式的名字。注意，真正的函数名还是 `f3`，而 `myName` 这个名字只在函数体内部可用。

`name` 属性的一个用处，就是获取参数函数的名字。

```javascript
var myFunc = function() {};
function test(f) {
  console.log(f.name);
}
test(myFunc); // myFunc

//1.函数 f.bind 函数的函数名是:  bound 函数 f
function f1() {}
var f2 = f1.bind(1);
console.log(f2.name); //bound f1

//2.通过构造函数创建方式创建的函数： name :anonymous
var ff = new Function();
console.log(ff.name); //anonymous
console.log(function() {}.name); //""
```

#### 7.7.2 length 属性

函数的 `length` 属性返回函数预期传入的参数个数，即形参个数。

```javascript
function f(a, b) {}
f.length; // 2
```

`length` 属性提供了一种机制，判断定义时和调用时参数的差异，以便实现面向对象编程的方法**重载**（overload）。

```js
```

### 7.8 toString

函数的 `toString` 方法返回一个字符串，内容是函数的源码。函数内部的注释也可以返回。

### 7.9 函数作用域

形成私有作用域 -> 变量提声 -> 给形参赋值 -> 执行代码

#### 7.9.1 定义

**作用域（scope）**指的是变量存在的范围。在 ES5 的规范中，Javascript 只有两种作用域：一种是全局作用域，变量在整个程序中一直存在，所有地方都可以读取；另一种是函数作用域，变量只在函数内部存在。

函数外部声明的变量就是**全局变量（global variable）**，它可以在函数内部读取。在函数内部定义的变量，外部无法读取，称为**局部变量（local variable）**。函数内部定义的变量，会在该作用域内覆盖同名全局变量。

JavaScript 中的函数运行在它们被定义的作用域里,而不是它们被执行的作用域里。

在一个函数被定义的时候, 会将它定义时刻的**作用域链（scope chain）**链接到这个函数对象的 `[[Scopes]]` 属性.

在一个函数对象被调用的时候，会创建一个活动对象(也就是一个对象)，然后对于每一个函数的形参，都命名为该活动对象的命名属性，然后将这个活动对象做为此时的作用域链最前端，并将这个函数对象的 `[[Scopes]]` 加入到 `scope chain` 中。

```javascript
var fn = function(lps, rps) {
  var name = "laruence";
};
fn();
```

在执行 fn 的定义语句的时候，会创建一个这个函数对象的 `[[Scopes]]` 属性(内部属性，只有 JS 引擎可以访问，但 FireFox 的几个引擎(SpiderMonkey 和 Rhino)提供了私有属性 `__parent__` 来访问它)，并将这个 `[[Scopes]]` 属性，链接到定义它的作用域链上，此时因为 `fn` 定义在全局环境，所以此时的 `[[Scopes]]` 只是指向全局活动对象 `window active object`。

在调用 `fn` 的时候，会创建一个活动对象(假设为 `aObj`，由 JS 引擎预编译时刻创建)，并创建 `arguments` 属性，然后会给这个对象添加俩个命名属性 `aObj.lps`，`aObj.rps`；对于每一个在这个函数中申明的局部变量和函数定义，都作为该活动对象的同名命名属性。然后将调用参数赋值给形参数，对于缺少的调用参数，赋值为 `undefined`。

然后将这个活动对象做为 `scope chain` 的最前端，并将 `fn` 的 `[[Scopes]]` 属性所指向的，定义 `fn` 时候的顶级活动对象，加入到 `scope chain`。

有了上面的作用域链, 在发生标识符解析的时候，就会逆向查询当前 `scope chain` 列表的每一个活动对象的属性，如果找到同名的就返回。找不到，那就是这个标识符没有被定义。

注意到，因为函数对象的 `[[Scopes]]` 属性是在定义一个函数的时候决定的，而非调用的时候，所以如下面的例子：

```javascript
var name = "laruence";
function echo() {
  console.log(name);
}

function env() {
  var name = "eve";
  echo();
}

env(); //laruence
```

#### 7.9.2 函数内部的变量提升

与全局作用域一样，函数作用域内部也会产生“**变量提升**”现象。`var` 命令声明的变量，不管在什么位置，变量声明都会被提升到函数体的头部。

#### 7.9.3 函数本身的作用域

函数本身也是一个值，也有自己的作用域。它的作用域与变量一样，就是其声明时所在的作用域，与其运行时所在的作用域无关。

```javascript
var a = 1;
var x = function() {
  console.log(a);
};

function f() {
  var a = 2;
  x();
}

f(); // 1
```

总之，**函数执行时所在的作用域，是定义时的作用域**，而不是调用时所在的作用域。同样的，函数体内部声明的函数，作用域绑定函数体内部。

### 7.10 参数

#### 7.10.1 概述

函数运行的时候，有时需要提供外部数据，不同的外部数据会得到不同的结果，这种外部数据就叫参数。

javascript 函数是参数化的：函数的定义会包括一个被称为**形参（parameter）**的标识符列表，这些参数在函数体中像局部变量一样工作。

函数调用会为形参提供实参的值。除了实参外，每次调用还会拥有另一个值--本次调用的上下文 ——— 这就是 `this` 关键字的值。

如果函数挂载在一个对象上，作为对象的一个属性，就称它为对象的方法。当通过对象来调用函数时，该对象就是此次调用的**上下文（context）**。

用于初始化一个新创建的对象的函数称为**构造函数（constructor）**。

> 在 JavaScript 里，函数即对象，程序可以随意操控它们。

#### 7.10.2 参数的省略

函数参数不是必需的，Javascript 允许省略参数。

但是运行时无论提供多少个参数（或者不提供参数），JavaScript 都不会报错。省略的参数的值就变为 `undefined`。

但是，没有办法只省略靠前的参数，而保留靠后的参数。如果一定要省略靠前的参数，只有显式传入 `undefined`。

#### 7.10.3 传递方式

函数参数如果是原始类型的值（数值、字符串、布尔值），传递方式是**传值传递（passes by value）**。这意味着，在函数体内修改参数值，不会影响到函数外部。

但是，如果函数参数是复合类型的值（数组、对象、其他函数），传递方式是**传址传递（pass by reference）**。也就是说，传入函数的原始值的地址，因此在函数内部修改参数，将会影响到原始值。

实际上应用的策略是 `call by sharing`，通俗的说就是，它并不是把引用直接传递进去，而是把引用的拷贝（浅拷贝）传递进去存储在函数内部的活动对象里。因此，如果你对这个引用进行第二次赋值的时候，实际上把这份引用指向了另外一个对象，所以之后对这个对象的操作不会影响到外部的对象。

> 注意，如果函数内部修改的，不是参数对象的某个属性，而是替换掉整个参数(改变了引用地址)，这时不会影响到原始值。

#### 7.10.4 同名参数

如果有同名的参数，则取最后出现的那个值。

```javascript
function f(a, a) {
  console.log(a);
}

f(1, 2); // 2
f(1); //undefined
```

### 7.11.arguments 对象

#### 7.11.1 定义

ECMAScript 函数不限制传递参数的个数和类型。因为参数在函数内部是用一个数组来表示的。函数始终接收的都是这个数组。

在函数体内可以通过 `arguments` 对象来访问这个参数数组，从而获取传递给函数的每一个参数（所以可以不写形参）。这个对象只有在函数体内部，才可以使用。

ECMAScript 函数的重要特点：

---

- 1).形参只提供便利，不是必须的；
- 2).`arguments` 对象可以与形参一起使用；
- 3).`arguments` 的值永远与对应形参的值保持同步（他们是值同步的，但空间独立）；
- 4).`arguments` 对象的长度由传入参数的长度来决定（跟定义函数的命名参数的个数 `length` 无关）；
- 5).没有传递值的形参将自动被赋予 `undefined`；

---

> 正常模式下，`arguments` 对象可以在运行时修改。严格模式：重写 `arguments` 会导致语法错误（不执行）；对 `arguments` 元素赋值无效。

#### 7.11.2 类数组

与数组类似（但并不是 `Array` 的实例），因此可以使用方括号语法访问它的任意元素，使用 `length` 属性来确定传递进来多少个参数。

如果要让 `arguments` 对象使用数组方法，真正的解决方法是将 `arguments` 转为真正的数组。下面是两种常用的转换方法：`slice` 方法和逐一填入新数组。

```javascript
var args = Array.prototype.slice.call(arguments);

// 或者
var args = [];
for (var i = 0; i < arguments.length; i++) {
  args.push(arguments[i]);
}
```

#### 7.11.3 callee

`arguments` 对象带有一个 `callee` 属性，返回它所对应的原函数。

```javascript
var f = function() {
  console.log(arguments.callee === f);
};

f(); // true
```

可以通过 `arguments.callee`，达到调用函数自身的目的。这个属性在严格模式里面是禁用的，因此不建议使用。

#### 7.11.4 caller

指向调用当前函数的函数(即只有在函数被调用时才能取到值)

```javascript
function f1() {
  console.log(f1.caller); //指向调用该函数的函数
  console.log(arguments.callee); //指向该函数本身
}

function f2() {
  f1();
}
f2();
```

### 7.12 没有重载

ECMAScript 函数没有**签名**（接收的参数的类型和数量），因为其参数是由包含 0 或多个值的数组来表示的。而没有函数签名，真正的重载是不可能做到的。

### 7.13 闭包

理解**闭包（closure）**，首先必须理解变量作用域。JavaScript 有两种作用域：全局作用域和函数作用域。函数内部可以直接读取全局变量。但是，函数外部无法读取函数内部声明的变量。

如果出于种种原因，需要得到函数内的局部变量。正常情况下，这是办不到的，只有通过变通方法才能实现。那就是在函数的内部，再定义一个函数。

```javascript
function f1() {
  var n = 999;
  function f2() {
    console.log(n); // 999
  }
}
```

上面代码中，函数 `f2` 就在函数 `f1` 内部，这时 `f1` 内部的所有局部变量，对 `f2` 都是可见的。但是反过来就不行，`f2` 内部的局部变量，对 `f1` 就是不可见的。这就是 JavaScript 语言特有的**链式作用域（chain scope）**结构，子对象会一级一级地向上寻找所有父对象的变量。所以，父对象的所有变量，对子对象都是可见的，反之则不成立。

既然 `f2` 可以读取 `f1` 的局部变量，那么只要把 `f2` 作为返回值，我们不就可以在 `f1` 外部读取它的内部变量了吗！

```javascript
function f1() {
  var n = 999;
  function f2() {
    console.log(n);
  }
  return f2;
}

var result = f1();
result(); // 999
```

闭包就是函数 `f2`，即**能够读取其他函数内部变量的函数**。由于在 JavaScript 语言中，只有函数内部的子函数才能读取内部变量，因此可以把闭包简单理解成“定义在一个函数内部的函数”。

闭包最大的特点，就是它可以“记住”诞生的环境，比如 `f2` 记住了它诞生的环境 `f1`，所以从 `f2` 可以得到 `f1` 的内部变量。**在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁**。

闭包的最大用处有两个，一个是可以读取函数内部的变量，另一个就是让这些变量始终保持在内存中，即闭包可以使得它诞生环境一直存在。请看下面的例子，闭包使得内部变量记住上一次调用时的运算结果。

```javascript
function createIncrementor(start) {
  return function() {
    return start++;
  };
}

var inc = createIncrementor(5);

inc(); // 5
inc(); // 6
inc(); // 7
```

上面代码中，`start` 是函数 `createIncrementor` 的内部变量。通过闭包，`start` 的状态被保留了，每一次调用都是在上一次调用的基础上进行计算。从中可以看到，闭包 `inc` 使得函数 `createIncrementor` 的内部环境，一直存在。所以，**闭包可以看作是函数内部作用域的一个接口**。

为什么会这样呢？原因就在于 `inc` 始终在内存中，而 `inc` 的存在依赖于 `createIncrementor`，因此也始终在内存中，不会在调用结束后，被垃圾回收机制回收。

闭包的另一个用处，是封装对象的私有属性和私有方法。

```javascript
function Person(name) {
  var _age;
  function setAge(n) {
    _age = n;
  }
  function getAge() {
    return _age;
  }

  return {
    name: name,
    getAge: getAge,
    setAge: setAge
  };
}

var p1 = Person("mark");
p1.setAge(25);
p1.getAge(); // 25
```

注意，外层函数每次运行，都会生成一个新的闭包，而这个闭包又会保留外层函数的内部变量，所以内存消耗很大。因此不能滥用闭包，否则会造成网页的性能问题。

### 7.14 立即调用的函数表达式（IIFE）

在 Javascript 中，圆括号 `()` 是一种运算符，跟在函数名之后，表示调用该函数。

有时，我们需要在定义函数之后，立即调用该函数。这时，你不能在函数的定义之后加上圆括号，这会产生语法错误。

产生这个错误的原因是，`function` 这个关键字即可以当作语句，也可以当作表达式。

为了避免解析上的歧义，JavaScript 引擎规定，如果 `function` 关键字出现在行首，一律解释成语句。因此，JavaScript 引擎看到行首是 `function` 关键字之后，认为这一段都是函数的定义，不应该以圆括号结尾，所以就报错了。

解决方法就是不要让 `function` 出现在行首，让引擎将其理解成一个表达式。最简单的处理，就是将其放在一个圆括号里面。

```javascript
(function() {
  /* code */
})();
// 或者
(function() {
  /* code */
})();
```

上面两种写法都是以圆括号开头，引擎就会认为后面跟的是一个表示式，而不是函数定义语句，所以就避免了错误。这就叫做**立即调用的函数表达式（Immediately-Invoked Function Expression）**，简称 IIFE。

> 注意，上面两种写法最后的分号都是必须的。如果省略分号，遇到连着两个 IIFE，可能就会报错(JavaScript 会将它们连在一起解释，将第二行解释为第一行的参数。)。

推而广之，任何让解释器以表达式来处理函数定义的方法，都能产生同样的效果，比如下面三种写法。

```javascript
var i = (function() {
  return 10;
})();
true &&
  (function() {
    /* code */
  })();
0,
  (function() {
    /* code */
  })();
```

> 函数名对 IIFE 不是必要的。

通常情况下，只对匿名函数使用这种“立即执行的函数表达式”。它的目的有两个：

- 一是不必为函数命名，避免了污染全局变量；
- 二是 IIFE 内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量。

```javascript
// 写法一
var tmp = newData;
processData(tmp);
storeData(tmp);

// 写法二
(function() {
  var tmp = newData;
  processData(tmp);
  storeData(tmp);
})();
```

上面代码中，写法二比写法一更好，因为完全避免了污染全局变量。

IIFE 的一个普遍的进阶用法，是把它们当做函数调用并传递参数进去。

```js
var a = 2;
(function IIFE(global) {
  var a = 3;
  console.log(a); //3
  console.log(global.a); //2
})(window);

console.log(s); //2
```

这个模式的一个应用场景是解决 `undefined` 标识符的默认值被错误覆盖导致异常。

```js
undefined = true; //不建议
(function IIFE(undefined) {
  var a;
  if (a === undefined) {
    console.log("Undefined is safe here");
  }
})();
```

IIFE 还有一种变化的用途是倒置代码的运行顺序，将需要运行的函数放在第二位，在 IIFE 执行之后当做参数传递进去。

```js
var a = 2;
(function IIFE(def) {
  def(window);
})(function def(global) {
  var a = 3;
  console.log(a); //3
  console.log(global.a); //2
});
```

### 7.15 eval

`eval` 命令的作用是，将字符串当作语句执行。

放在 `eval` 中的字符串，应该有独自存在的意义，不能用来与 `eval` 以外的命令配合使用。

`eval` 没有自己的作用域，都在当前作用域内执行，因此可能会修改当前作用域的变量的值，造成安全问题。

为了防止这种风险，JavaScript 规定，如果使用严格模式，`eval` 内部声明的变量，不会影响到外部作用域。

```javascript
(function f() {
  "use strict";
  eval("var foo = 123");
  console.log(foo); // ReferenceError: foo is not defined
})();
```

不过，即使在严格模式下，`eval` 依然可以读写当前作用域的变量。

```javascript
(function f() {
  "use strict";
  var foo = 1;
  eval("foo = 2");
  console.log(foo); // 2
})();
```

上面代码中，严格模式下，`eval` 内部还是改写了外部变量，可见安全风险依然存在。

此外，`eval` 的命令字符串不会得到 JavaScript 引擎的优化，运行速度较慢。这也是一个不应该使用它的理由。

> 通常情况下，`eval` 最常见的场合是解析 `JSON` 数据字符串，不过正确的做法应该是使用浏览器提供的 `JSON.parse` 方法。

JavaScript 引擎内部，`eval` 实际上是一个引用，默认调用一个内部方法。这使得 `eval` 的使用分成两种情况，一种是像上面这样的调用 `eval(expression)`，这叫做“直接使用”，这种情况下 `eval` 的作用域就是当前作用域。除此之外的调用方法，都叫“间接调用”，此时 `eval` 的作用域总是全局作用域。

```javascript
var a = 1;

function f() {
  var a = 2;
  var e = eval;
  e("console.log(a)");
}

f(); // 1
```

上面代码中，`eval` 是间接调用，所以即使它是在函数中，它的作用域还是全局作用域，因此输出的 `a` 为全局变量。

与 `eval` 作用类似的还有 `Function` 构造函数。利用它生成一个函数，然后调用该函数，也能将字符串当作命令执行。

```javascript
var jsonp = 'foo({"id": 42})';

var f = new Function("foo", jsonp);
// 相当于定义了如下函数
// function f(foo) {
//   foo({"id":42});
// }

f(function(json) {
  console.log(json.id); // 42
});
```

上面代码中，`jsonp` 是一个字符串，`Function` 构造函数将这个字符串，变成了函数体。调用该函数的时候，`jsonp` 就会执行。这种写法的实质是将代码放到函数作用域执行，避免对全局作用域造成影响。

不过，`new Function()` 的写法也可以读写全局作用域，所以也是应该避免使用它。

### 7.16 try/catch

catch 分句也会创建一个块作用域，其中声明的变量仅在 catch 内部有效：

```js
try {
  undefined();
} catch (err) {
  console.log(err); //undefined is not a function
}
console.log(err); //err is not defined
```
