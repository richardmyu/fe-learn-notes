### 3.JavaScript 中的变量

#### 1.`var`

1).用来声明一个变量（对于未经初始化的变量，会保存一个特殊的值: `undefined` ），可以重复声明；

2).在全局域下用 `var` 关键字定义一个变量 a 或者不使用声明变量而直接写一个变量则表示该变量为全局变量，都相当于给 `window` 增加一个属性 a，可以写成 `window.a`；

3).用 `var` 操作符定义的变量将成为定义该变量的作用域中的局部变量，在该作用域之外无法访问该变量。也就是说，如果在函数中使用 `var` 定义一个变量，那么这个变量在函数退出后就会被销毁；

4).可以用一条语句定义多个变量，用逗号隔开(因为 ECMAScript 的变量是松散类型的，所以不同类型初始化变量的操作可以放在一条语句中来完成)。

严格地说，`var a = 1` 与 `a = 1`，这两条语句的效果不完全一样，主要体现在 `delete` 命令无法删除前者。不过，绝大多数情况下，这种差异是可以忽略的。

> 严格模式下，不能定义 `eval` 或 `arguments` 的变量，否则导致语法错误。

虽然省略 `var` 操作符可以定义全局变量，但我们不推荐这种做法。因为在局部作用域中定义的全局变量很难维护，而且如果有意的忽略 `var` 操作符，也会由于相应的变量不会马上就有定义而导致不必要的混乱。给未经声明的变量赋值在严格模式下会导致抛出 `ReferenceRrror` 错误。

#### 2.变量提升

JavaScript 引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部，这就叫做**变量提升（hoisting）**。

变量提升是一种机制，在作用域形成后，代码执行之前，把关键词 `var` 和 `function` 提前声明或定义；`var` 只会声明，`function` 定义；

> JS 的变量提升是以段为处理单元的。

对引用数据类型变量提升，会把内容放在堆内存，任意类型数据都会记录（变量也会存放），若是表达式（函数也是表达式）则将结果存放；待代码执行时，才将对应的变量赋值；

变量提升注意事项：

---

1).`if` 或 `while` 判断语句中：不管条件判断是否成立，判断体中的内容都要进行变量提升，但是 `var` 和 `function` 都只能起声明的作用（即块级作用域之外，`function` 只作声明）；若条件成立，先给 `function` 赋值再执行代码(声明和赋值同时进行)；

```javascript
console.log(a); //undefined
console.log(aa); //undefined
console.log(cc); //Fn cc(){}
if (true) {
  console.log(a); //undefined
  console.log(aa); //Fn aa(){}
  var a = 6;

  function aa() {
    return "aa"
  }
}
console.log(b); //undefined
console.log(bb); //undefined
while (false) {
  var b = 6;

  function bb() {
    return "bb"
  }
}

function cc() {
  return "cc"
}
```

---

2).变量提升的时候只对 "`=`" 等号左边的变量进行变量提升，右边代表的都是值，是不进行变量提升的；

```javascript
console.log(a); //undefined
console.log(b); //b is not defined

var a = b + 1;
```

---

3).在全局作用域下变量提升的时候，自执行函数中的 `function` 是不参与的，当代码执行到对应的区域后，声明、定义、执行一起完成；

```javascript
console.log(a); //Fn a(){}
console.log(b); //b is not defined

function a() {
  return "a"
}
(function b(str) {
  return str;
})("123");
```

---

4).匿名函数当做参数的时候不进行变量提升；

---

5).虽然函数体中 `return` 下面的代码是不执行的，但是需要进行私有作用域下的变量提升；而 `return` 的代码会执行，但是不进行变量提升的；

```javascript
function a() {
  console.log(b); //b is not defined
  console.log(c); //ƒ c() {}
  return function b() {};

  function c() {};
}
a();
```

---

6).在变量提升的时候，如果发现名字冲突了，不需要重新声明，可能需要重新的赋值。（在 JS 中不管是变量还是函数，只要名字一样了，就是相互冲突，JS 中一个名字就代表一个变量，只不过存储的值可以是任意数据类型的）；

```javascript
//同名函数会覆盖变量
console.log(a); //ƒ a() {}
var a = 6;
function a() {}
//同名变量不会覆盖函数
console.log(a); //ƒ a() {}
function a() {}
var a = 6;
//同名函数会覆盖函数
console.log(a); //ƒ a() { return "2"}
function a() {
  return "1"
}

function a() {
  return "2"
}
```

---

7).对于函数定义式，会将函数定义提前。而函数表达式，会在执行过程中才计算。

---

> 变量提声时，先声明的拥有声明权，后声明的会被忽略；但是不会忽略赋值行为；

#### 3.变量赋值

变量进行连续赋值时，只有最左边才会被声明，中间变量不会被声明（但有赋值）；

```javascript
console.log(m); //undefined
console.log(n); //n is not defined
var m = n = 2;
console.log(m); //2
console.log(n); //2
```

#### 4.执行环境

**执行环境（execution context）**定义变量或函数有权访问的其他数据，决定了它们各自的行为。每个执行环境都有一个与之关联的**变量对象（variable object）**，环境中定义的所有变量和函数都保持在这个对象中。

#### 5.作用域链

当代码在一个环境中执行的时候，会创建变量对象的一个**作用域链（scope chain）**；

在私有作用域中变量调用时，先检查私有作用域是否有变量声明，若没有则往上一级查找，直至 `window`，若还找不到则报错，这个过程称为作用域链；

> 私有作用域之间没有关联；

#### 6.作用域销毁机制

堆内存销毁需要手动销毁，否则待全局作用域退出才销毁 （即赋值 `null`）;

---

栈内存：

- 全局：关闭浏览器；

- 私有：
  - 销毁：一个函数没有返回值，或者返回值的内容没有被外界占用（返回值为引用数据类型，且被外界变量接受）；
  - 不销毁：一个函数返回值（通常是函数）被外界占用；

---

### 4.数据类型

ECMAScript 的数据类型具有动态性

#### 0.`typeof` 操作符

`typeof` 用来检测给定变量的数据类型。对一个值使用 `typeof` 操作符可能返回以下某个字符串：

---

- `“undefined”` 该值未定义
- `“boolean”` 该值是布尔值
- `“string”` 该值是字符串
- `“number”` 该值是数值
- `“object”` 该值是对象或者 `null`
- `“function”` 该值是函数

---

```javascript
s; // ReferenceError: v is not defined

console.log(typeof s); //undefined

s = "tian";
console.log(typeof s); //string
```

上面代码中，变量 s 没有用 `var` 命令声明，直接使用就会报错。但是，放在 `typeof` 后面，就不报错了，而是返回 `undefined`。

实际编程中，这个特点通常用在判断语句。

```javascript
// 错误的写法
if (s) {
  // ...
}
// ReferenceError: s is not defined

// 正确的写法
if (typeof s === "undefined") {
  // ...
}
```

`typeof` 操作符的操作数可以是变量，也可以是字面量。注意 `typeof` 是一个操作符而不是函数，因而圆括号可用可不用。

`typeof` 操作符对 `null` 返回 `"object"`，因为特殊值 `"object"` 被认为是一个空的对象引用。Safari 及之前版本、chrome7 及之前版本对正则表达式调用 `typeof` 操作符时会返回 `"function"`，而其他浏览器在这种情况下会返回 `"object"`。

> 从技术角度讲，函数在 ECMAScript 中是对象，不是一种数据类型。然而，函数也确实有一些特殊的属性，因此通过 `typeof` 操作符来区分函数和其他对象是很有必要的。

#### 1.基本数据类型（值类型）

由简单的结构组成

1).`number` 数字

2).`string` 字符串

3).`boolean` 布尔

4).`null` 空对象指针

5).`undefined` 未定义(即由于目前没有定义，所以此处暂时没有任何值)

6).`Symbol`

> 为了避免属性名的冲突，ES6 新增了 `Symbol` 类型，`Symbol` 是一种原始数据类型，表示独一无二的值；

#### 2.引用数据类型（地址类型）

结构相对复杂

1).`object` 对象数据类型

2).`function` 函数数据类型

引用类型的值（对象）是引用类型的一个实例。在 ECMAScript 中，**引用类型**是一种数据结构，用于将数据和功能组织在一起。它也常被称为**类**，但这并不妥当。尽管从技术上讲，ECMAScript 是一门面向对象的语言，但它不具备传统的面向对象语言所支持的类和接口等基本结构。引用类型有时也被称为**对象定义**，因为它描述的是一类对象所具有的属性和方法。

**对象是某个特定引用类型的实例**。新对象是使用 `new` 操作符后跟一个构造函数来创建的。构造函数本身就是一个函数，只不过该函数是出于用来创建新对象而定义的。

> 函数其实是处理数据的方法，JavaScript 把它当成一种数据类型，可以赋值给变量，这为编程带来了很大的灵活性，也为 JavaScript 的“函数式编程”奠定了基础。

#### 3.基本数据类型和引用数据类型的区别

原始值：存储在**栈（stack）**中的简单数据，也就是说，它们的值直接存储在变量访问的位置。这是因为这些原始类型占据的空间是固定的，所以可将他们存储在较小的内存区域 – 栈中。这样存储便于迅速查寻变量的值。

引用值：存储在**堆（heap）**中的对象，也就是说，存储在变量处的值是一个**指针（point）**，指向存储对象的内存地址。这是因为：引用值的大小会改变，所以不能把它放在栈中，否则会降低变量查寻的速度。相反，放在变量的栈空间中的值是该对象存储在堆中的地址。地址的大小是固定的，所以把它存储在栈中对变量性能无任何负面影响。

基本数据类型是把值直接的给变量，在接下来的操作过程中，直接拿这个值进行操作但是两者直接不会相互影响，各自独立；

而引用数据类型：

---

- a：定义了一个变量；
- b：开辟了一个新空间，并把属性名和属性值存储在这个空间中，有相应的空间地址；
- c：把空间地址给这个变量（不是直接给值），变量并没有存储这个值，而是存储这个值的引用空间地址；
- d：接下来我们把这个地址传递给新变量，此时两个变量操作的是同一空间，当其中一个变量改变，另一个变量也会改变（因为引用空间里的值发生改变）。

---

#### 4.`undefined` 类型

`undefined` 是 JavaScript 独有的数据和数据类型，这种类型数据只有一个值，即 `undefined`，它的类型也是 `undefined`。

> 一般而言，不需要显示的把变量的值设置为 `undefined`。字面值 `undefined` 的主要目的是用来比较。ECMA-262 第 3 版引入这个值，是为了正是区分空对象指针与未经初始化的变量。

不过，包含 `undefined` 值的变量与尚未定义的变量还是不一样的：

```javascript
var mess;
console.log(mess); //undefined
console.log(me);
//Uncaught ReferenceError: me is not defined

console.log(typeof mess); //undefined
console.log(typeof me); //undefined
```

对于尚未定义的变量，只能进行一项操作，即使用 `typeof` 检测其数据类型（使用 `delete` 也不会报错，但没什么实际意义，严格模式下则会报错）。

然而对未初始化的变量和未声明的变量执行 `typeof` 操作，均返回 `undefined`，这个结果有其逻辑上的合理性。因为虽然这两种变量从技术角度看有本质区别，但实际上无论对哪种变量也不可能执行真正的操作。

`undefined` 表示“未定义”，下面是返回 `undefined` 的典型场景。

```javascript
// 变量声明了，但没有赋值
var i;
i; // undefined

// 调用函数时，应该提供的参数没有提供，该参数等于 undefined
function f(x) {
  return x;
}
f(); // undefined

// 对象没有赋值的属性
var o = new Object();
o.p; // undefined

// 函数没有返回值时，默认返回 undefined
function f() {}
f(); // undefined
```

#### 5.`null` 类型

`null` 是 JavaScript 第二个独有的数据和数据类型，这种类型数据只有一个值，即 `null`，它的类型也是 `null`。从逻辑角度看，`null` 值表示一个空对象指针，而这也是使用 `typeof` 操作符检测 `null` 值返回 `"object"` 的原因。

`null` 的用 typeof 操作符检测的类型是 `object`，这是由于历史原因造成的。1995 年的 JavaScript 语言第一版，只设计了五种数据类型（对象、整数、浮点数、字符串和布尔值），没考虑 `null`，只把它当作 `object` 的一种特殊值。后来 `null` 独立出来，作为一种单独的数据类型，为了兼容以前的代码，`typeof null` 返回 `object` 就没法改变了。

如果定义的变量准备用来保存一个对象，那么最好将该变量初始化为 `null` 而不是其他值。这样只要直接检测 `null` 值就可以知道相应的变量是否保存了一个对象的引用。

只要在意保存对象还没有真正的保存对象，就应该明确地让该变量保存 `null` 值。这样不仅可以体现 `null` 作为空对象指针的惯例，而且有助于区分 `null` 和 `undefined`。

`null` 表示空值，即该处的值现在为空。调用函数时，某个参数未设置任何值，这时就可以传入 `null`，表示该参数为空。比如，某个函数接受引擎抛出的错误作为参数，如果运行过程中未出错，那么这个参数就会传入 `null`，表示未发生错误。

#### 6.`null` 和 `undefined`

`null` 和 `undefined`，既然含义与用法都差不多，为什么要同时设置两个这样的值，这不是无端增加复杂度？这与历史原因有关。

1995 年 JavaScript 诞生时，最初像 Java 一样，只设置了 `null` 表示”无”。根据 C 语言的传统，`null` 可以自动转为 0。

```javascript
Number(null); // 0
5 + null; // 5
```

但是，JavaScript 的设计者 Brendan Eich，觉得这样做还不够。首先，第一版的 JavaScript 里面，`null` 就像在 Java 里一样，被当成一个对象，Brendan Eich 觉得表示“无”的值最好不是对象。其次，那时的 JavaScript 不包括错误处理机制，Brendan Eich 觉得，如果 `null` 自动转为 0，很不容易发现错误。

因此，他又设计了一个 `undefined`。区别是这样的：`null` 是一个表示“空”的对象，转为数值时为 0；`undefined` 是一个表示”此处无定义”的原始值，转为数值时为 `NaN`。

```javascript
Number(undefined); // NaN
5 + undefined; // NaN
```

在 JavaScript 里，`null` 和 `undefined` 都表示不存在的数据，并且 `undefined` 也是从 `null` 中继承而来；主要区别如下：

---

- 1).`null` 和 `undefined` 都是表示没有的、不存在的值。他们在进行逻辑转换时都是 false，这两个值进行(`==`)比较是 true；

---

- 2).`null` 表示空引用，它是 `object` 类型；`undefined` 表示未定义，是 `undefined` 类型；

---

- 3).如果一个变量的值是 `null`，那么必须主动给它赋值 `null`；如果这个对象以后要用，但是现在还没有值，一般情况下，会给它一个 `null` 值；

---

- 4).一个变量未声明（对未声明的变量，只能进行一个操作，即使用 `typeof` 操作符检测其数据类型），报错：`xx is not defined`；一个变量定义了未赋值，则值是 `undefined`。

---

- 5).对属性来说，如果原来没有这个属性，根本就不存在这个属性，那么他的值就是 `undefined`。（对象的属性不需要定义，如果不存在也可以直接读取，不会报错，而会给出一个 `undefined` 的值出来）；

---

- 6).在函数（方法）里，如果必须返回值，但是值又计算不出来，那就返回一个 `null`（这是规范，不是语法规定，js 遵循）；但是没有返回值的函数，它的返回值都是 `undefined`。

---

#### 7.Boolean 类型

该类型只有两个字面值：true 和 false (区分大小写)，这两个值与数字值不是一回事，因此 true 不一定等于 1，而 false 不一定等于 0； 但 ECMAScript 中所有数据类型都有与这两个值等价的值。

下列运算符会返回布尔值：

---

- 两元逻辑运算符： `&& (And)，|| (Or)`
- 前置逻辑运算符： `! (Not)`
- 相等运算符：`===，!==，==，!=`
- 比较运算符：`>，>=，<，<=`

---

##### 7.1 `Boolean()`

强制将其他类型数据转换为布尔型，对 `0、NaN、null、undefined、""、false` (空字符串不是空格字符串)这 6 个为 false，其余为 true；

> 在流控制语句中，自动执行相应的 `Boolean` 转换。

##### 7.2 `！`

取反，先将值转为布尔类型，然后取反；

```javascript
let a = 6;
console.log(typeof a); //number
console.log(typeof !a); //boolean
console.log(!a); //false
```

##### 7.3 `！！`

再次取反；将其他数据类型转换为布尔数据类型，相当于 `Boolean（）`；

#### 8.Number 类型

##### 8.1 `isNaN()`

检测一个值不是有效数字；若是有效数字返回 false，不是有效数字返回 true；若传入非数值会自动转换为数值。对于空数组和只有一个数组成员(能转化为数值的)的数组，会返回 false。因此在使用 `isNaN` 之前，最好先判断数据类型：

```javascript
console.log(isNaN(6)); //false
console.log(isNaN("1.23")); //false
console.log(isNaN(" .1.23 ")); //true
console.log(isNaN("123jjj")); //true
//空数组和只有一个数组成员的数组
console.log(isNaN([])); //false
console.log(isNaN([1])); //false
console.log(isNaN(["123"])); //false
console.log(isNaN(["as"])); //true
console.log(isNaN([1, 2])); //true

//[].valueOf() = [] ===> [].toString() = "" ===> 0
//[1].valueOf() = [1] ===> [].toString() = "1" ===> 1

function myIsNaN(value) {
  return typeof value === "number" && isNaN(value);
  //推荐用法
  return value !== value;
}
```

`isNaN()` 也适用于对象。在基于对象调用 `isNaN()` 函数时，会首先调用对象的 `valueOf()` 方法，然后确定该方法返回的值是否可以装换为数值。如果不能，则基于这个返回值再调用 `toString()` 方法，再测试(`parseFloat()`)返回值，而这个过程也是 ECMAScript 中内置函数和操作符的一般执行流程。

##### 8.2 `isFinite()`

`isFinite` 方法返回一个布尔值，表示某个值是否为正常的数值。

除了 `Infinity`、`-Infinity`、`NaN` 和 `undefined` 这几个值会返回 false，`isFinite` 对于其他的数值都会返回 true。

```javascript
console.log(isFinite(Infinity)); //false
console.log(isFinite(-Infinity)); //false
console.log(isFinite(NaN)); //false
console.log(isFinite(undefined)); //false
console.log(isFinite(null)); //true
console.log(isFinite("1.23")); //true
```
