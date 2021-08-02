## 4 数据类型

ECMAScript 的数据类型具有动态性。JavaScript 的类型有数字，字符串，布尔值，函数和对象，以及 `undefined` 和 `null`。尽管 JavaScript 有多种变量类型，然而不同于 C/C++，C# 或 Java，它并不是一种强类型语言。在强类型语言中，声明变量是需要指定变量的类型。在 JavaScript 中只需要使用关键字 `var`，而不必指定变量类型。因此， JavaScript 不是强类型语言。

### 4.1 typeof 操作符

`typeof` 用来检测给定变量或表达式的数据类型。对一个值使用 `typeof` 操作符可能返回以下某个字符串：

---

- `undefined` 该值未定义
- `boolean` 该值是布尔值
- `string` 该值是字符串
- `number` 该值是数值
- `object` 该值是对象或者 `null`
- `function` 该值是函数

---

> 如果检测表达式，要注意 `typeof` 的优先级仅次于括号运算符，并且不能检测 递增/递减表达式

```javascript
s; // ReferenceError: v is not defined

typeof s; //undefined

s = "lalala";
typeof s; //string
```

上面代码中，变量 `s` 没有用 `var` 命令声明，直接使用就会报错。但是，放在 `typeof` 后面，就不报错了，而是返回 `undefined`。

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

### 4.2 数据类型

#### 4.2.1 基本数据类型（值类型）

由简单的结构组成

1).`number` 数字

2).`string` 字符串

3).`boolean` 布尔

4).`null` 空对象指针

5).`undefined` 未定义(即由于目前没有定义，所以此处暂时没有任何值)

6).`Symbol`

> 为了避免属性名的冲突，ES6 新增了 `Symbol` 类型，`Symbol` 是一种原始数据类型，表示独一无二的值；

#### 4.2.2 引用数据类型（地址类型）

结构相对复杂

1).`object` 对象数据类型

2).`function` 函数数据类型

引用类型的值（对象）是引用类型的一个实例。在 ECMAScript 中，**引用类型**是一种数据结构，用于将数据和功能组织在一起。它也常被称为**类**，但这并不妥当。尽管从技术上讲，ECMAScript 是一门面向对象的语言，但它不具备传统的面向对象语言所支持的类和接口等基本结构。引用类型有时也被称为**对象定义**，因为它描述的是一类对象所具有的属性和方法。

**对象是某个特定引用类型的实例**。新对象是使用 `new` 操作符后跟一个构造函数来创建的。构造函数本身就是一个函数，只不过该函数是出于用来创建新对象而定义的。

> 函数其实是处理数据的方法，JavaScript 把它当成一种数据类型，可以赋值给变量，这为编程带来了很大的灵活性，也为 JavaScript 的“函数式编程”奠定了基础。

#### 4.2.3 基本数据类型和引用数据类型的区别

基本数据类型：值是存储在**栈（stack）**中的简单数据，也就是说，它们的值直接存储在变量访问的位置。这是因为这些原始类型占据的空间是固定的，所以可将他们存储在较小的内存区域 – 栈中。这样存储便于迅速查寻变量的值。

引用数据类型：值是存储在**堆（heap）**中的对象，也就是说，存储在变量处的值是一个**指针（point）**，指向存储对象的内存地址。这是因为：引用值的大小会改变，所以不能把它放在栈中，否则会降低变量查寻的速度。相反，放在变量的栈空间中的值是该对象存储在堆中的地址。地址的大小是固定的，所以把它存储在栈中对变量性能无任何负面影响。

基本数据类型是把值直接的给变量，在接下来的操作过程中，直接拿这个值进行操作但是两者直接不会相互影响，各自独立；

而引用数据类型：

---

- a：定义了一个变量；
- b：开辟了一个新空间，并把属性名和属性值存储在这个空间中，有相应的空间地址；
- c：把空间地址给这个变量（不是直接给值），变量并没有存储这个值，而是存储这个值的引用空间地址；
- d：接下来我们把这个地址传递给新变量，此时两个变量操作的是同一空间，当其中一个变量改变，另一个变量也会改变（因为引用空间里的值发生改变）。

---

### 4.3 null and undefined

#### 4.3.1 `undefined` 类型

`undefined` 是 JavaScript 独有的数据和数据类型，这种类型数据只有一个值，即 `undefined`，它的类型也是 `undefined`。

> 一般而言，不需要显示的把变量的值设置为 `undefined`。字面值 `undefined` 的主要目的是用来比较。ECMA-262 第 3 版引入这个值，是为了正是区分空对象指针与未经初始化的变量。

不过，包含 `undefined` 值的变量与尚未定义的变量还是不一样的：

```javascript
var mess;
console.log(mess); //undefined
console.log(me);
//Uncaught ReferenceError: me is not defined

typeof mess; //undefined
typeof me; //undefined
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

#### 4.3.2 `null` 类型

`null` 是 JavaScript 第二个独有的数据和数据类型，这种类型数据只有一个值，即 `null`，它的类型也是 `null`。从逻辑角度看，`null` 值表示一个空对象指针，而这也是使用 `typeof` 操作符检测 `null` 值返回 `"object"` 的原因。

`null` 的用 `typeof` 操作符检测的类型是 `object`，这是由于历史原因造成的。1995 年的 JavaScript 语言第一版，只设计了五种数据类型（对象、整数、浮点数、字符串和布尔值），没考虑 `null`，只把它当作 `object` 的一种特殊值。后来 `null` 独立出来，作为一种单独的数据类型，为了兼容以前的代码，`typeof null` 返回 `object` 就没法改变了。

如果定义的变量准备用来保存一个对象，那么最好将该变量初始化为 `null` 而不是其他值。这样只要直接检测 `null` 值就可以知道相应的变量是否保存了一个对象的引用。

只要在意保存对象还没有真正的保存对象，就应该明确地让该变量保存 `null` 值。这样不仅可以体现 `null` 作为空对象指针的惯例，而且有助于区分 `null` 和 `undefined`。

`null` 表示空值，即该处的值现在为空。调用函数时，某个参数未设置任何值，这时就可以传入 `null`，表示该参数为空。比如，某个函数接受引擎抛出的错误作为参数，如果运行过程中未出错，那么这个参数就会传入 `null`，表示未发生错误。

`null`、`undefined` 和空对象的区别：

```js
console.dir(null); //null
console.dir(undefined); //undefined
console.dir({});
//Object
// __proto__:
//   constructor
//   hasOwnProperty
//   isPrototypeof
//   propertyIsEnnumberable
//   toLocaseString
//   toString
//   valueOf
//   ...

// Number
Number(null); //0
Number(undefined); //NaN
Number({}); //NaN

// Boolean
Boolean(null); //false
Boolean(undefined); //false
Boolean({}); //true
```

#### 4.3.3 `null` 和 `undefined`

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

- 2).`null` 表示空引用，它是 `object` 类型(typeof 检测)；`undefined` 表示未定义，是 `undefined` 类型；

---

- 3).如果一个变量的值是 `null`，那么必须主动给它赋值 `null`；如果这个对象以后要用，但是现在还没有值，一般情况下，会给它一个 `null` 值；

---

- 4).一个变量未声明（对未声明的变量，只能进行一个操作，即使用 `typeof` 操作符检测其数据类型），报错：`xx is not defined`；一个变量定义了未赋值，则值是 `undefined`。

---

- 5).对属性来说，如果原来没有这个属性，根本就不存在这个属性，那么他的值就是 `undefined`。（对象的属性不需要定义，如果不存在也可以直接读取，不会报错，而会给出一个 `undefined` 的值出来）；

---

- 6).在函数（方法）里，如果必须返回值，但是值又计算不出来，那就返回一个 `null`（这是规范，不是语法规定，js 遵循）；但是没有返回值的函数，它的返回值都是 `undefined`。

---

更多 demo 见 <a href="./demo/typeof.html" target="_blank">typeof.html</a>
