# 三 语法

## 1 组成

1).**ECMAScript**：定义了 js 里面的命名规范、变量、数据类型、基本语法、操作语句等最核心的东西；

2).**DOM**（document object modle）文档对象模型 ：DOM 结构中提供了很多用来操作 DOM 元素的方法和属性（`api`）；

3).**BOM**（brower object modle）浏览器对象模型 ：提供一系列的方法（`api`）来操作浏览器；

## 2 命名规范

1).严格区分大小写；

2).使用小驼峰命名法：

---

- a.首字母小写，其余每个有意义的单词首字母大写；
- b.可以使用数字（但不能作为首位）、字母、下划线、`$`；
- c.不能使用关键字（在 js 中有特殊意义的字）和保留字（未来可能成为关键字的词）；

---

- 规范如下：

  1.变量：匈牙利命名法

  2.函数：Camel (第一个单词首字母小写，其他单词首字母大写)

  3.属性：Camel

| 类型     | 前缀 | 实例      |
| -------- | :--: | --------- |
| Array    |  a   | aNameList |
| Boolean  |  b   | bVisible  |
| Float    |  f   | fMoney    |
| Function |  fn  | fnMethod  |
| Int      |  i   | iAge      |
| Object   |  o   | oType     |
| Regexp   |  re  | rePattern |
| String   |  s   | sName     |

## 3 JavaScript 中的变量

### 3.1 var

1).用来声明一个变量（对于未经初始化的变量，会保存一个特殊的值: `undefined` ），可以重复声明；

2).使用 var 声明的变量会自动添加到最接近的环境中，若初始化变量没有使用 var 声明，则会默认添加到全局环境；

3).用 `var` 操作符定义的变量将成为定义该变量的作用域中的局部变量，在该作用域之外无法访问该变量。也就是说，如果在函数中使用 `var` 定义一个变量，那么这个变量在函数退出后就会被销毁；

4).可以用一条语句定义多个变量，用逗号隔开(因为 ECMAScript 的变量是松散类型的，所以不同类型初始化变量的操作可以放在一条语句中来完成)。

5).严格地说，`var a = 1` 与 `a = 1`，这两条语句的效果不完全一样，主要体现在 `delete` 命令无法删除前者（因为使用 var 声明变量，创建的属性是不可配置的）。不过，绝大多数情况下，这种差异是可以忽略的。

```javascript
// demo1
var a;
console.log(a); //undefined

// demo2
var b = 6;
c = 7;
console.log(window.b); //6
console.log(window.c); //7

// demo3
function fn() {
  var d = 12;
}
// console.log(d);
//Uncaught ReferenceError: d is not defined

// demo4
var str = "我是字符串呀",
  ary = ["数组哥哥", "数组弟弟0_0"],
  obj = {
    name: "没有对象 o(╥﹏╥)o"
  };
console.log(str, ary, obj);
// 我是字符串呀 ["数组哥哥", "数组弟弟0_0"] {name: "没有对象 o(╥﹏╥)o"}

// demo5
var e = 123;
console.log(delete e); //false
console.log(e); //123
f = 123;
console.log(delete f); //true
console.log(f);
//Uncaught ReferenceError: f is not defined
```

> 严格模式下，不能定义 `eval` 或 `arguments` 的变量，否则导致语法错误。见 <a href="./demo/var.html">var.html</a>

虽然省略 `var` 操作符可以定义全局变量，但我们不推荐这种做法。因为在局部作用域中定义的全局变量很难维护，而且如果有意的忽略 `var` 操作符，也会由于相应的变量不会马上就有定义而导致不必要的混乱。给未经声明的变量赋值在严格模式下会导致抛出 `ReferenceRrror` 错误。

### 3.2 变量提升

JavaScript 引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部，这就叫做**变量提升（hoisting）**。

> 变量提升是在 js 引擎的“预编译”时进行，是在代码开始运行之前。

变量提升是一种机制，在作用域形成后，代码执行之前，把关键词 `var` 和 `function` 提前声明或定义；`var` 只会声明，`function` 定义；

> JS 的变量提升是以段为处理单元的。

对引用数据类型变量提升，会把内容放在堆内存，任意类型数据都会记录（变量也会存放），若是表达式（函数也是表达式）则将结果存放；待代码执行时，才将对应的变量赋值；

变量提升注意事项：

---

1).`if` 或 `while` 判断语句中：不管条件判断是否成立，判断体中的内容都要进行变量提升(在判断体中)

```javascript
// 条件不成立
console.log(b); //undefined
console.log(bb); //undefined
while (false) {
  console.log(b); //undefined
  console.log(bb); //undefined
  var b = 6;
  function bb() {
    return "bb";
  }
}

//条件成立
console.log(a); //undefined
console.log(aa); //undefined
if (true) {
  console.log(a); //undefined
  console.log(aa); //Fn aa(){}
  var a = 6;

  function aa() {
    return "aa";
  }
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

---

4).匿名函数当做参数的时候不进行变量提升；

---

5).虽然函数体中 `return` 下面的代码是不执行的，但是需要进行私有作用域下的变量提升；而 `return` 的代码会执行，但是不进行变量提升的；

```javascript
function a() {
  console.log(b); //b is not defined
  console.log(c); //ƒ c() {}

  return function b() {};
  function c() {}
}
a();
```

---

6).在变量提升的时候，如果发现名字冲突了，不需要重新声明，可能需要重新的赋值。（在 JS 中不管是变量还是函数，只要名字一样了，就是相互冲突，JS 中一个名字就代表一个变量，只不过存储的值可以是任意数据类型的）；

```javascript
//同名函数会覆盖变量
console.log(name1);
var name1 = 6; //undefined
function name1() {} //ƒ name1() {}

//同名变量不会覆盖函数
console.log(name2); //ƒ name2() {}
function name2() {}
var name2 = 6;

// //同名变量/函数会进行值覆盖
console.log(name3); //undefined
var name3 = 6;
var name3 = 7;
console.log(name3); //7
console.log(namefn); //ƒ namefn() { return "2"}
function namefn() {
  return "1";
}

function namefn() {
  return "2";
}
```

---

7).对于函数定义式，会将函数定义提前。而函数表达式，会在执行过程中才计算。

```javascript
console.log(fn); //f fn(){...}
console.log(f); //undefined
function fn() {
  return "小黄人";
}
var f = function() {
  console.log(fn); //f fn(){...}
  console.log(f); //f(){...}
  return "大黄蜂";
};
f();
```

---

> 变量提声时，先声明的拥有声明权，后声明的会被忽略；但是不会忽略赋值行为；

### 3.3 变量赋值

变量进行连续赋值时，只有最左边才会被声明，中间变量不会被声明（但有赋值）；

```javascript
console.log(m); //undefined
console.log(n); //n is not defined
var m = (n = 2);
console.log(m); //2
console.log(n); //2
```

### 3.4 执行环境

**执行环境/执行上下文**（execution context）定义变量或函数有权访问的其他数据，决定了它们各自的行为。每个执行环境都有一个与之关联的**变量对象**（variable object），环境中定义的所有变量和函数都保持在这个对象中。

根据 ECMAScript 实现所在的宿主环境不同，表示执行环境的对象也不一样。在 web 浏览器中，全局执行环境被认为是 window 对象，因此所有的全局变量和函数都是作为 window 对象的属性和方法创建的。某个执行环境中所有的代码执行完毕后，该环境被销毁，保存其中的所有变量和函数定义也随之销毁。

每个函数都有自己的执行环境。当执行流进入一个函数时，函数的环境就会被推入一个环境栈中。而在函数执行以后，栈将其环境弹出，把控制权返回给之前的执行环境。

### 3.5 作用域

一个变量的作用域（scope）是程序源代码中定义这个变量的区域。在函数内部定义的变量，则是局部变量，作用域是局部的。函数参数也是局部变量，只在函数体内有定义。

在函数体内，局部变量的优先级高于同名的全局变量。如果在函数体内声明的一个局部变量或者函数参数与全局变量重名，那么全局变量就会被局部变量所遮盖。

> ES6 正式引入块级作用域（block scope）。

### 3.6 作用域链

当代码在一个环境中执行的时候，会创建变量对象的一个**作用域链**（scope chain）。作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问。作用域的前端，始终都是当前执行的代码所在环境的变量对象。如果这个环境是函数，则将其活动对象（activation object）作为变量对象。活动对象在最开始时只包含一个变量，即 arguments 对象（在全局环境中是不存在的）。作用域链中的下一个变量对象来自包含环境，而再下一个变量对象则来自于下一个包含环境。这样，一直延伸到全局执行环境。全局执行环境的变量对象始终是作用域链中的最后一个对象。

在私有作用域中变量调用时，先检查私有作用域是否有变量声明，若没有则往上一级查找，直至 `window`，若还找不到则报错，这个过程称为作用域链；

> 私有作用域之间没有关联；

### 3.7 作用域销毁机制

堆内存销毁需要手动销毁，否则待全局作用域退出才销毁 （即赋值 `null`）;

---

栈内存：

- 全局：关闭浏览器；

- 私有：
  - 销毁：一个函数没有返回值，或者返回值的内容没有被外界占用（返回值为引用数据类型，且被外界变量接受）；
  - 不销毁：一个函数返回值（通常是函数）被外界占用；

---
