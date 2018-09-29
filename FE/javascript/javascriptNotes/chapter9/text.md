# JavaScript笔记六（ES6）

<!-- TOC -->

- [JavaScript笔记六（ES6）](#javascript笔记六es6)
  - [八.错误处理机制](#八错误处理机制)
    - [1.Error 实例对象](#1error-实例对象)
    - [2.原生错误类型](#2原生错误类型)
      - [1.SyntaxError 对象](#1syntaxerror-对象)
      - [2.ReferenceError 对象](#2referenceerror-对象)
      - [3.RangeError 对象](#3rangeerror-对象)
      - [4.TypeError 对象](#4typeerror-对象)
      - [5.URIError 对象](#5urierror-对象)
      - [6.EvalError 对象](#6evalerror-对象)
      - [7.总结](#7总结)
    - [3.自定义错误](#3自定义错误)
    - [4.throw 语句](#4throw-语句)
    - [5.try…catch 结构](#5trycatch-结构)
    - [6.finally 代码块](#6finally-代码块)
  - [九.编程风格](#九编程风格)
    - [1.概述](#1概述)
    - [2.缩进](#2缩进)
    - [3.区块](#3区块)
    - [4.圆括号](#4圆括号)
    - [5.行尾的分号](#5行尾的分号)
      - [1.不使用分号的情况](#1不使用分号的情况)
        - [1.1 for 和 while 循环](#11-for-和-while-循环)
        - [1.2 分支语句：if，switch，try](#12-分支语句ifswitchtry)
        - [1.3 函数的声明语句](#13-函数的声明语句)
      - [2.分号的自动添加](#2分号的自动添加)
      - [3.小结](#3小结)
    - [6.全局变量](#6全局变量)
    - [7.变量声明](#7变量声明)
    - [8.with语句](#8with语句)
    - [9.相等和严格相等](#9相等和严格相等)
    - [10.语句的合并](#10语句的合并)
    - [11.自增和自减运算符](#11自增和自减运算符)
    - [12.switch…case 结构](#12switchcase-结构)
  - [ES6](#es6)
    - [1.变量，块级作用域及全局属性](#1变量块级作用域及全局属性)
    - [2.变量的解构赋值](#2变量的解构赋值)
    - [3.字符串扩展](#3字符串扩展)
    - [4.ES7的方法](#4es7的方法)
    - [5.数组扩展](#5数组扩展)
    - [6.`Map()`](#6map)
    - [7.`Set()`](#7set)
    - [8.HTML5新增的3种selector方法](#8html5新增的3种selector方法)
    - [9.class 类的基本方法](#9class-类的基本方法)
        - [1.简介](#1简介)
        - [2.严格模式](#2严格模式)
        - [3.constructor 方法](#3constructor-方法)
        - [4.类的实例对象](#4类的实例对象)
        - [5.Class 表达式](#5class-表达式)
        - [6.不存在变量提升](#6不存在变量提升)
        - [7.私有方法](#7私有方法)
        - [8.私有属性](#8私有属性)
        - [9.this 的指向](#9this-的指向)
        - [10.name 属性](#10name-属性)
        - [11.Class 的取值函数（getter）和存值函数（setter）](#11class-的取值函数getter和存值函数setter)
        - [12.Class 的 Generator 方法](#12class-的-generator-方法)
        - [13.Class 的静态方法](#13class-的静态方法)
        - [14.Class 的静态属性和实例属性](#14class-的静态属性和实例属性)
        - [15.new.target 属性](#15newtarget-属性)
        - [定义类](#定义类)
        - [类体和方法定义](#类体和方法定义)
        - [使用 extends 创建子类](#使用-extends-创建子类)
        - [Species](#species)
        - [class类继承](#class类继承)

<!-- /TOC -->

## 八.错误处理机制

### 1.Error 实例对象

JavaScript 解析或运行时，一旦发生错误，引擎就会抛出一个错误对象。JavaScript 原生提供`Error`构造函数，所有抛出的错误都是这个构造函数的实例。

```
var err = new Error('出错了');
err.message // "出错了"
```

上面代码中，我们调用`Error`构造函数，生成一个实例对象err。`Error`构造函数接受一个参数，表示错误提示，可以从实例的`message`属性读到这个参数。抛出`Error`实例对象以后，整个程序就中断在发生错误的地方，不再往下执行。

JavaScript 语言标准只提到，`Error`实例对象必须有`message`属性，表示出错时的提示信息，没有提到其他属性。大多数 JavaScript 引擎，对`Error`实例还提供`name`和`stack`属性，分别表示错误的名称和错误的堆栈，但它们是非标准的，不是每种实现都有。

- message：错误提示信息
- name：错误名称（非标准属性）
- stack：错误的堆栈（非标准属性）

使用`name`和`message`这两个属性，可以对发生什么错误有一个大概的了解。

```
if (error.name) {
  console.log(error.name + ': ' + error.message);
}
```

`stack`属性用来查看错误发生时的堆栈。

```
function throwit() {
  throw new Error('');
}

function catchit() {
  try {
    throwit();
  } catch(e) {
    console.log(e.stack); // print stack trace
  }
}

catchit()
// Error
//    at throwit (~/examples/throwcatch.js:9:11)
//    at catchit (~/examples/throwcatch.js:3:9)
//    at repl:1:5
```

上面代码中，错误堆栈的最内层是throwit函数，然后是catchit函数，最后是函数的运行环境。

### 2.原生错误类型

`Error`实例对象是最一般的错误类型，在它的基础上，JavaScript 还定义了其他6种错误对象。也就是说，存在`Error`的6个派生对象。

#### 1.SyntaxError 对象

`SyntaxError`对象是解析代码时发生的语法错误。

#### 2.ReferenceError 对象

`ReferenceError`对象是引用一个不存在的变量时发生的错误。

另一种触发场景是，将一个值分配给无法分配的对象，比如对函数的运行结果或者this赋值。

#### 3.RangeError 对象

`RangeError`对象是一个值超出有效范围时发生的错误。主要有几种情况，一是数组长度为负数，二是`Number`对象的方法参数超出范围，以及函数堆栈超过最大值。

#### 4.TypeError 对象

`TypeError`对象是变量或参数不是预期类型时发生的错误。比如，对字符串、布尔值、数值等原始类型的值使用new命令，就会抛出这种错误，因为new命令的参数应该是一个构造函数。

调用对象不存在的方法，也会抛出TypeError错误，因为方法的值是`undefined`，而不是一个函数。

#### 5.URIError 对象

`URIError`对象是 URI 相关函数的参数不正确时抛出的错误，主要涉及`encodeURI()`、`decodeURI()`、`encodeURIComponent()`、`decodeURIComponent()`、`escape()`和`unescape()`这六个函数。

#### 6.EvalError 对象

`eval`函数没有被正确执行时，会抛出`EvalError`错误。该错误类型已经不再使用了，只是为了保证与以前代码兼容，才继续保留。

#### 7.总结

以上这6种派生错误，连同原始的`Error`对象，都是构造函数。开发者可以使用它们，手动生成错误对象的实例。这些构造函数都接受一个函数，代表错误提示信息（message）。

```
var err1 = new Error('出错了！');
var err2 = new RangeError('出错了，变量超出有效范围！');
var err3 = new TypeError('出错了，变量类型无效！');

err1.message // "出错了！"
err2.message // "出错了，变量超出有效范围！"
err3.message // "出错了，变量类型无效！"
```

### 3.自定义错误

除了 JavaScript 原生提供的七种错误对象，还可以定义自己的错误对象。

```
function UserError(message) {
  this.message = message || '默认信息';
  this.name = 'UserError';
}

UserError.prototype = new Error();
UserError.prototype.constructor = UserError;
```

上面代码自定义一个错误对象`UserError`，让它继承`Error`对象。然后，就可以生成这种自定义类型的错误了。

`new UserError('这是自定义的错误！');`

### 4.throw 语句

`throw`语句的作用是手动中断程序执行，抛出一个错误。

```
if (x < 0) {
  throw new Error('x 必须为正数');
}
// Uncaught ReferenceError: x is not defined
```

上面代码中，如果变量x小于0，就手动抛出一个错误，告诉用户x的值不正确，整个程序就会在这里中断执行。可以看到，`throw`抛出的错误就是它的参数，这里是一个Error实例。`throw`也可以抛出自定义错误。

实际上，`throw`可以抛出任何类型的值。也就是说，它的参数可以是任何值。

对于 JavaScript 引擎来说，遇到`throw`语句，程序就中止了。引擎会接收到`throw`抛出的信息，可能是一个错误实例，也可能是其他类型的值。

### 5.try…catch 结构

一旦发生错误，程序就中止执行了。JavaScript 提供了`try...catch`结构，允许对错误进行处理，选择是否往下执行。

```
try {
  throw new Error('出错了!');
} catch (e) {
  console.log(e.name + ": " + e.message);
  console.log(e.stack);
}
// Error: 出错了!
//   at <anonymous>:3:9
//   ...
```

上面代码中，`try`代码块抛出错误（上例用的是`throw`语句），JavaScript 引擎就立即把代码的执行，转到`catch`代码块，或者说错误被`catch`代码块捕获了。`catch`接受一个参数，表示`try`代码块抛出的值。

如果你不确定某些代码是否会报错，就可以把它们放在`try...catch`代码块之中，便于进一步对错误进行处理。

```
try {
  f();
} catch(e) {
  // 处理错误
}
```

`catch`代码块捕获错误之后，程序不会中断，会按照正常流程继续执行下去。

`catch`代码块之中，还可以再抛出错误，甚至使用嵌套的`try...catch`结构。

```
var n = 100;

try {
  throw n;
} catch (e) {
  if (e <= 50) {
    // ...
  } else {
    throw e;
  }
}
// Uncaught 100
```

上面代码中，`catch`代码之中又抛出了一个错误。

为了捕捉不同类型的错误，`catch`代码块之中可以加入判断语句。

```
try {
  foo.bar();
} catch (e) {
  if (e instanceof EvalError) {
    console.log(e.name + ": " + e.message);
  } else if (e instanceof RangeError) {
    console.log(e.name + ": " + e.message);
  }
  // ...
}
```

上面代码中，`catch`捕获错误之后，会判断错误类型（`EvalError`还是`RangeError`），进行不同的处理。

### 6.finally 代码块

`try...catch`结构允许在最后添加一个`finally`代码块，表示不管是否出现错误，都必需在最后运行的语句。

```
function cleansUp() {
  try {
    throw new Error('出错了……');
    console.log('此行不会执行');
  } finally {
    console.log('完成清理工作');
  }
}

cleansUp()
// 完成清理工作
// Error: 出错了……
```

上面代码中，由于没有`catch`语句块，所以错误没有捕获。执行`finally`代码块以后，程序就中断在错误抛出的地方。

```
function idle(x) {
  try {
    console.log(x);
    return 'result';
  } finally {
    console.log("FINALLY");
  }
}

idle('hello')
// hello
// FINALLY
// "result"
```

上面代码说明，`try`代码块没有发生错误，而且里面还包括`return`语句，但是`finally`代码块依然会执行。注意，只有在其执行完毕后，才会显示`return`语句的值。

下面的例子说明，`return`语句的执行是排在`finally`代码之前，只是等`finally`代码执行完毕后才返回。

```
var count = 0;
function countUp() {
  try {
    return count;
  } finally {
    count++;
  }
}

countUp()
// 0
count
// 1
```

上面代码说明，`return`语句的`count`的值，是在`finally`代码块运行之前就获取了。

下面是`finally`代码块用法的典型场景。

```
openFile();

try {
  writeFile(Data);
} catch(e) {
  handleError(e);
} finally {
  closeFile();
}
```

上面代码首先打开一个文件，然后在`try`代码块中写入文件，如果没有发生错误，则运行`finally`代码块关闭文件；一旦发生错误，则先使用`catch`代码块处理错误，再使用`finally`代码块关闭文件。

下面的例子充分反映了`try...catch...finally`这三者之间的执行顺序。

```
function f() {
  try {
    console.log(0);
    throw 'bug';
  } catch(e) {
    console.log(1);
    return true; // 这句原本会延迟到 finally 代码块结束再执行
    console.log(2); // 不会运行
  } finally {
    console.log(3);
    return false; // 这句会覆盖掉前面那句 return
    console.log(4); // 不会运行
  }

  console.log(5); // 不会运行
}

var result = f();
// 0
// 1
// 3

result
// false
```

上面代码中，`catch`代码块结束执行之前，会先执行`finally`代码块。

`catch`代码块之中，触发转入`finally`代码快的标志，不仅有`return`语句，还有`throw`语句。

```
function f() {
  try {
    throw '出错了！';
  } catch(e) {
    console.log('捕捉到内部错误');
    throw e; // 这句原本会等到finally结束再执行
  } finally {
    return false; // 直接返回
  }
}

try {
  f();
} catch(e) {
  // 此处不会执行
  console.log('caught outer "bogus"');
}

//  捕捉到内部错误
```

上面代码中，进入`catch`代码块之后，一遇到`throw`语句，就会去执行`finally`代码块，其中有`return false`语句，因此就直接返回了，不再会回去执行`catch`代码块剩下的部分了。

## 九.编程风格

### 1.概述

”编程风格“（programming style）指的是编写代码的样式规则。不同的程序员，往往有不同的编程风格。

有人说，编译器的规范叫做”**语法规则**“（grammar），这是程序员必须遵守的；而编译器忽略的部分，就叫”**编程风格**“（programming style），这是程序员可以自由选择的。这种说法不完全正确，程序员固然可以自由选择编程风格，但是好的编程风格有助于写出质量更高、错误更少、更易于维护的程序。

所以，编程风格的选择不应该基于个人爱好、熟悉程度、打字量等因素，而要考虑如何尽量使代码清晰易读、减少出错。你选择的，不是你喜欢的风格，而是一种能够清晰表达你的意图的风格。这一点，对于 JavaScript 这种语法自由度很高的语言尤其重要。

必须牢记的一点是，如果你选定了一种“编程风格”，就应该坚持遵守，切忌多种风格混用。如果你加入他人的项目，就应该遵守现有的风格。

### 2.缩进

行首的空格和 Tab 键，都可以产生代码缩进效果（indent）。

Tab 键可以节省击键次数，但不同的文本编辑器对 Tab 的显示不尽相同，有的显示四个空格，有的显示两个空格，所以有人觉得，空格键可以使得显示效果更统一。

无论你选择哪一种方法，都是可以接受的，要做的就是始终坚持这一种选择。不要一会使用 Tab 键，一会使用空格键。

### 3.区块

如果循环和判断的代码体只有一行，JavaScript 允许该区块（block）省略大括号。建议总是使用大括号表示区块。

另外，区块起首的大括号的位置，有许多不同的写法。最流行的有两种，一种是起首的大括号另起一行。

```
block
{
  // ...
}
```

另一种是起首的大括号跟在关键字的后面。

```
block {
  // ...
}
```

一般来说，这两种写法都可以接受。但是，JavaScript 要使用后一种，因为 JavaScript 会自动添加句末的分号，导致一些难以察觉的错误。

```
return
{
  key: value
};

// 相当于
return;
{
  key: value
};
```

上面的代码的原意，是要返回一个对象，但实际上返回的是undefined，因为 JavaScript 自动在return语句后面添加了分号。

### 4.圆括号

圆括号（parentheses）在 JavaScript 中有两种作用，一种表示函数的调用，另一种表示表达式的组合（grouping）。

建议可以用空格，区分这两种不同的括号。

- 1.表示函数调用时，函数名与左括号之间没有空格。

- 2.表示函数定义时，函数名与左括号之间没有空格。

- 3.其他情况时，前面位置的语法元素与左括号之间，都有一个空格。

### 5.行尾的分号

分号表示一条语句的结束。JavaScript 允许省略行尾的分号。事实上，确实有一些开发者行尾从来不写分号。但是，由于下面要讨论的原因，建议还是不要省略这个分号。

#### 1.不使用分号的情况

首先，以下三种情况，语法规定本来就不需要在结尾添加分号。

##### 1.1 for 和 while 循环

> 注意，do...while循环是有分号的。

##### 1.2 分支语句：if，switch，try

##### 1.3 函数的声明语句

> 注意，函数表达式仍然要使用分号。

以上三种情况，如果使用了分号，并不会出错。因为，解释引擎会把这个分号解释为空语句。

#### 2.分号的自动添加

除了上三种情况，所有语句都应该使用分号。但是，如果没有使用分号，大多数情况下，JavaScript 会自动添加。

这种语法特性被称为“分号的自动添加”（Automatic Semicolon Insertion，简称 **ASI**）。

因此，有人提倡省略句尾的分号。麻烦的是，如果下一行的开始可以与本行的结尾连在一起解释，JavaScript 就不会自动添加分号。

上面代码都会多行放在一起解释，不会每一行自动添加分号。

只有下一行的开始与本行的结尾，无法放在一起解释，JavaScript 引擎才会自动添加分号。

另外，如果一行的起首是“自增”（`++`）或“自减”（`--`）运算符，则它们的前面会自动添加分号。

如果`continue`、`break`、`return`和`throw`这四个语句后面，直接跟换行符，则会自动添加分号。这意味着，如果`return`语句返回的是一个对象的字面量，起首的大括号一定要写在同一行，否则得不到预期结果。

#### 3.小结

由于解释引擎自动添加分号的行为难以预测，因此编写代码的时候不应该省略行尾的分号。

不应该省略结尾的分号，还有一个原因。有些 JavaScript 代码压缩器（uglifier）不会自动添加分号，因此遇到没有分号的结尾，就会让代码保持原状，而不是压缩成一行，使得压缩无法得到最优的结果。

另外，不写结尾的分号，可能会导致脚本合并出错。所以，有的代码库在第一行语句开始前，会加上一个分号。

```
;var a = 1;
// ...
```

上面这种写法就可以避免与其他脚本合并时，排在前面的脚本最后一行语句没有分号，导致运行出错的问题。

### 6.全局变量

JavaScript 最大的语法缺点，可能就是全局变量对于任何一个代码块，都是可读可写。这对代码的模块化和重复使用，非常不利。

因此，建议避免使用全局变量。如果不得不使用，可以考虑用大写字母表示变量名，这样更容易看出这是全局变量，比如`UPPER_CASE`。

### 7.变量声明

JavaScript 会自动将变量声明”提升“（hoist）到代码块（block）的头部。

这意味着，变量x是`if`代码块之前就存在了。为了避免可能出现的问题，最好把变量声明都放在代码块的头部。

```
for (var i = 0; i < 10; i++) {
  // ...
}

// 写成
var i;
for (i = 0; i < 10; i++) {
  // ...
}
```

上面这样的写法，就容易看出存在一个全局的循环变量i。

另外，所有函数都应该在使用之前定义。函数内部的变量声明，都应该放在函数的头部。

### 8.with语句

`with`可以减少代码的书写，但是会造成混淆。

```
with (o) {
　foo = bar;
}
```

上面的代码，可以有四种运行结果：

```
o.foo = bar;
o.foo = o.bar;
foo = bar;
foo = o.bar;
```

这四种结果都可能发生，取决于不同的变量是否有定义。因此，不要使用`with`语句。

### 9.相等和严格相等

JavaScript 有两个表示相等的运算符：”相等“（`==`）和”严格相等“（`===`）。

相等运算符会自动转换变量类型，造成很多意想不到的情况。

因此，建议不要使用相等运算符（`==`），只使用严格相等运算符（`===`）。

### 10.语句的合并

有些程序员追求简洁，喜欢合并不同目的的语句。比如，原来的语句是

```
a = b;
if (a) {
  // ...
}
```

他喜欢写成下面这样。

```
if (a = b) {
  // ...
}
```

虽然语句少了一行，但是可读性大打折扣，而且会造成误读。

建议不要将不同目的的语句，合并成一行。

### 11.自增和自减运算符

自增（`++`）和自减（`--`）运算符，放在变量的前面或后面，返回的值不一样，很容易发生错误。事实上，所有的`++`运算符都可以用`+= 1`代替。

建议自增（`++`）和自减（`--`）运算符尽量使用`+=`和`-=`代替。

### 12.switch…case 结构

`switch...case`结构要求，在每一个`case`的最后一行必须是`break`语句，否则会接着运行下一个`case`。这样不仅容易忘记，还会造成代码的冗长。

而且，`switch...case`不使用大括号，不利于代码形式的统一。此外，这种结构类似于`goto`语句，容易造成程序流程的混乱，使得代码结构混乱不堪，不符合面向对象编程的原则。

```
function doAction(action) {
  switch (action) {
    case 'hack':
      return 'hack';
      break;
    case 'slash':
      return 'slash';
      break;
    case 'run':
      return 'run';
      break;
    default:
      throw new Error('Invalid action.');
  }
}
```

上面的代码建议改写成对象结构。

```
function doAction(action) {
  var actions = {
    'hack': function () {
      return 'hack';
    },
    'slash': function () {
      return 'slash';
    },
    'run': function () {
      return 'run';
    }
  };

  if (typeof actions[action] !== 'function') {
    throw new Error('Invalid action.');
  }

  return actions[action]();
}
```

因此，建议`switch...case`结构可以用对象结构代替。


## ES6

### 1.变量，块级作用域及全局属性

1）.定义变量

- `let`

(1).不能重复声明；不论在全局作用域还是块级作用域，用let声明的变量不能与函数同名，否则报错；
(2).没有变量提声；
(3).暂时性死区，即在块级作用域中，不能提前使用未定义的变量。
(4).使用let定义的变量在定义它的代码块之外没有定义。即let语句会创建自己的作用域，这个作用域里的变量与外界变量无关。

```
    let a=2;
    {
        function a(){
            console.log("ok");
        }
    }
    console.log(a);//2

    {
        let a=2;
    }
    function a(){
        console.log("ok");
    }
    console.log(a);//function a(){}

    let a=2;
    function a(){
        console.log("ok");
    }
    console.log(a);
    //Identifier 'a' has already been declared
```

- `const`

(1).不能重复声明；const声明的变量是唯一的变量，不能有同名的函数或变量，否则报错；
(2).声明时必须赋值；
(3).赋值以后，不能修改；
(4).没有变量提声；
(5).暂时性死区；

```
    {const a=2;}
    function a(){
        console.log("ok");
    }
    console.log(a);//function a(){}

    const a=2;
    function a(){
        console.log("ok");
    }
    console.log(a);
    //Identifier 'a' has already been declared
```

2）.块级作用域
以大括号为界，形成的作用域；块级作用域内的变量是私有的，外界无法访问；

> 要调用的对象，不能置于行首，会形成块级作用域；所以使用`eval()`转换时，注意用小括号包含对象；

3）.全局属性
> window等价于self

### 2.变量的解构赋值

1）.数组的解构赋值
- 1.基本用法

类似于简单赋值，只是可以整体对应赋值，不存在的为undefined；

```
    let ary=[1,2,3];
    let a=ary[0];
    let b=ary[1];
    let c=ary[2];
    let [a,b,c]=ary;
    console.log(a,b,c);
```

- 2.嵌套赋值

```
    let ary=[[[[[1]]]],[[[[3]]]],[[[[5]]]]];
    console.log(ary.toString());//"1,3,5"
    let [[[[[x]]]],[[[[y]]]],[[[[z]]]]]=ary;
    console.log(x,y,z);//1,3,5
```

- 3.省略赋值

```
    let [,,,a4]=[10,20,30,40];
    console.log(a4);//40
```

- 4.不定参数赋值

使用扩展运算符；

```
//注意省略的时候最后一个逗号后面没有值
//扩展运算符只能放在最后面使用
    let [,,,...a]=[1,2,3,4,5,6];
    console.log(a);//4,5,6
```

- 5.数组解构赋值的默认值

当变量有默认值时，当且仅当有变量的对应值为undefined时，才会调用默认值

```
    let [a,s=10,d]=[1,2,3];
    console.log(a,s,d);//1 2 3
    //过程误解：s=10过程是否执行
    let [a1,s2=(function(){
        console.log("kk");
        return 20;})(),d3]=[1,2,3];
    //结果 未执行
    //当且仅当有变量的对应值为undefined时，才会调用默认值
    let [a11,s22=(function(){
        console.log("kk");
        return 20;})(),d33]=[1];
    //"kk"
```

2）.对象的解构赋值
- 1.基本用法

```
//变量名和属性名相同，简写如下
    let obj1={name:"qq",age:12};
    let {name,age}=obj1;
    console.log(name,age);//"qq" 12

//变量名和属性名不相同时
    let {name:a1,age:a2}=obj1;
    console.log(a1,a2);//"qq" 12
```

- 2.嵌套赋值

```
    let {a:aa,b}={a:1,b:[1,2,3]};
    console.log(aa, b);

    let {a:aa,b:[,x,y]}={a:1,b:[1,2,3]};
    console.log(aa,x,y);//1 2 3
```

- 3.复制目标非对象

默认调用`Object()`方法将非对象转换为对象；

```
    let {n,m}=1;
    console.log(n, m);//undefined undefined
```

3）.字符的解构赋值
默认将字符串变成类数组，作用类似于扩展运算符；

```
    let [x,c,v]="123";
    console.log(x, c, v);
```

4）.解构赋值的用途
- 1.变量之间交换值
`[a,b]=[b,a]`

- 2.函数返回多个值或接收多个参数

```
    function fn(){
        return{
            x:1,y:2
        }
    }
    let {x,y}=fn();
    console.log(x, y);

    function gn([x,y,z]){

    }
    gn([1,2,3]);
```

### 3.字符串扩展

- `startsWith()`/`endsWith()`

```
//是否以指定字符开头/结尾；
//是返回true，不是返回false
//第二个参数是可选的，表示匹配开始的索引

    var str="zxcvbnmmnbvcxzashzncb";
    console.log(str.startsWith("z"));//true
    console.log(str.startsWith("x"));//false
    console.log(str.startsWith("x",1));//true
    console.log(str.endsWith("b"));//true
    console.log(str.endsWith("x"));//false
    console.log(str.endsWith("x",0));//false

//不论哪里开始查找，结尾都只有一个，然而每次都可能有不同的开头；

    //用来计数
    let str1 = "aaaabbbbaaacccacacac";
    let code = 0;
    for (var i = 0; i < str1.length; i++) {
        if(str1.startsWith("a",i)){
            code++;
        }
    }
    console.log(code);
```

### 4.ES7的方法

- `padStart()/padEnd()`

```
//返回值是新字符串
//不改变原字符串
//第一个参数是数值，表示新字符串的长度
//第二个参数是字符串，表示延长字符串所用的补位字符串，字符的个数会自动重复调节
    //区别：padStart()从前补，padEnd()从后补）;

    console.log("m".padStart(2, "ab"));//am
    console.log("m".padStart(3, "ab"));//abm
    console.log("m".padStart(4, "ab"));//abam
    console.log("m".padStart(9, "ab"));//ababababm
    console.log("m".padEnd(9, "ab"));//mabababab
    console.log("m".padEnd(4, "ab"));//maba
    console.log("m".padEnd(3, "ab"));//mab
    console.log("m".padEnd(2, "ab"));//ma

    //回文数/字符
    console.log(("5".padStart(5, "1234")).padEnd(9,"4321"));

```

### 5.数组扩展

- 1.`Array.from()`

Array.from() lets you create Arrays from:
- array-like objects (objects with a length property and indexed elements)
- iterable objects (objects where you can get its elements, such as Map and Set).

```
//若参数是数组，则克隆数组；若是类数组，则将类数组转换为数组

    const bar = ["a", "b", "c"];
    console.log(Array.from(bar));
    // ["a", "b", "c"]
    console.log(Array.from('foo'));
    // ["f", "o", "o"]

//...可以把类数组变成数组，也可以将数组变类数组（在数组中）
    let ary=[1,2,3,4];
    console.log([...ary]);
```

- 2.`copyWidthin()`

```
//Array.prototype.copyWidthin(target,start,end)
//返回值是替换后的新数组
//改变原数组
//参数：
//target：必要，指定开始替换数据的位置，即被替换的范围；
//第二个，第三个参数表示用来替换的范围
//start：非必要，指定开始读取数据的位置，默认为0；如果是负值，则表示倒数
//end：非必要，指定开始读取数据的位置，默认为数组长度；如果是负值，则表示倒数

//在用来替换的字符中，包括起始索引，而不包括终止索引；
//替换的长度由用来替换的字符长度决定；替换字符长于被替换字符，完全覆盖，多余忽略；若替换字符长度小于被替换字符长度，则只替换前面几个替换字符长度的字符，不够的不替换；

    let ary=[1,2,3,4,5,6];
    console.log(ary.copyWithin(2, 0, 2));//[1, 2, 1, 2, 5, 6]
    console.log(ary);//[1, 2, 1, 2, 5, 6]
```

- 3.`keys()/entries()`

```
    var ary=[1,2,3,4,5];
    for(var key of ary.keys()){
        //key 索引
        console.log(key);
    }

    for(var [index,item] of ary.entries()){
        //index 索引  item 对应项
        console.log(index, item);
    }

    for(var item of ary){
        //item 当前项
        console.log(item);
    }
```

### 6.`Map()`

```
//1.使用构造函数方式创建Map的实例
//2.参数是个数组,数组中每一项都是一个数组,而且这个数组有俩项,第一项作为键key,第二项是值value
//3.这里的键key 可以是任意数据类型的
//4.值value只能是字符串形式

    var map1=new Map([[1,"a"],["A","A"],[{name:"珠峰"},"zhufeng"],[true,"true"],[new Date(),"今天"],[/\d+/,"正则"]]);
    console.log(map1);
```

使用方法：

```
    var ary1=[1,2];
    var obj1={name:"珠峰"};

    var map1=new Map([[1,1],["str","str"],[ary1,[1,2]],[obj1,{name:"zhufeng"}]]);
```

- 1.`has()`

判断有没有

```
    console.log(map1.has(ary1));//true
    console.log(map1.has("str"));//true
    console.log(map1.has(1));//true
```
 - 2.`get(key)`

获取值

```
    console.log(map1.get(obj1));//{name: "zhufeng"}
```

- 3.`set(key,value)`

增加

```
//返回增加后的新数组；
    console.log(map1.set(2, 2));
    //{1 => 1, "str" => "str", Array(2) => Array(2), {…} => {…}, 2 => 2}
    console.log(map1);
    //{1 => 1, "str" => "str", Array(2) => Array(2), {…} => {…}, 2 => 2}
```

- 4.`delete(key)`

删除

```
//返回true(删除已有的)/false(删除不存在的)
//返回值:true成功删除,false:删除失败
    console.log(map1.delete(obj1));//true
    console.log(map1.delete(obj1));//false
    console.log(map1);
    //{1 => 1, "str" => "str", Array(2) => Array(2), 2 => 2}
```

- 5.`clear()`

清空

```
//没有返回值
//不需要参数
    console.log(map1.clear(obj1));//undefined
    console.log(map1.clear());//undefined
    console.log(map1);//{}
```

遍历：

```
    var map=new Map([[1,10],["a","aa"],[{name:"zhufeng"},{name:"珠峰"}]]);

    map.forEach((value,key,map)=>{
          value:值
          key:键
          map:实例
    });

    for(var key of map.keys()){
       // key:键
        console.log(key);
    }
    console.log("");
    for(var val of map.values()){
        //val:值
        console.log(val);
    }
    console.log("");
    for(var [key,val] of map.entries()){
        // key:键
        // val:值
        console.log([key,val]);//[...]
        console.log(key,val);//...
    }
```

### 7.`Set()`

`Set`对象允许您存储任何类型的唯一值，无论是原始值还是对象引用。

```
参数
//如果传递一个可迭代的对象，它的所有元素将被添加到新的对象Set。如果不指定此参数或其值null，则新建Set为空。
//返回值：一个新的Set对象。

描述
//Set对象是值的集合。您可以按插入顺序遍历集合的元素。一个值Set 只能发生一次 ; 它Set的收藏是独一无二的。

属性
    Set.length
//该length 属性的值为0。

    get Set[@@species]
//用于创建派生对象的构造函数。

    Set.prototype
//代表Set构造函数的原型。允许向所有Set对象添加属性。
```

- Set 实例

所有Set实例都继承自Set.prototype。

```
属性
    Set.prototype.constructor
//返回创建实例原型的函数。这是Set默认的功能。

    Set.prototype.size
//返回Set对象中的值的数量。


方法
    Set.prototype.add(value)
//用给定的值追加一个新的元素到Set对象。返回Set对象。

    Set.prototype.clear()
//从Set对象中删除所有元素。

    Set.prototype.delete(value)
//删除与之关联的元素，value并返回Set.prototype.has(value)先前返回的值。Set.prototype.has(value)将会返回false。

    Set.prototype.entries()
//以插入顺序返回Iterator对象中包含对象中每个元素的数组的[value, value]新对象Set。这与Map对象保持相似，因此每个条目的键和值都具有相同的值。

    Set.prototype.forEach(callbackFn[, thisArg])
//以插入顺序callbackFn为Set对象中存在的每个值调用一次。如果thisArg提供了一个参数forEach，它将被用作this每个回调的值。

    Set.prototype.has(value)
//返回一个布尔值，用于断言元素是否与Set对象中的给定值一起存在。

    Set.prototype.keys()
//与函数具有相同的功能，values()并返回一个新Iterator对象，其中包含Set对象中每个元素的值的插入顺序。

    Set.prototype.values()
//返回一个新Iterator对象，其中包含对象中每个元素的值的Set插入顺序。

    Set.prototype[@@iterator]()
//返回一个新Iterator对象，其中包含对象中每个元素的值的Set插入顺序。
```

### 8.HTML5新增的3种selector方法

尽管DOM作为API已经非常完善了，但是为了实现更多的功能，DOM仍然进行了扩展，其中一个重要的扩展就是对选择器API的扩展。人们对jQuery的称赞，很多是由于jQuery方便的元素选择器。除了前面已经介绍过的`getElementsByClassName()`方法外，DOM拓展了`querySelectorAll()`、`querySelector()`和`matchesSelector()`这3种方法，通过CSS选择符查询DOM文档取得元素的引用的功能变成了原生的API，解析和树查询操作在浏览器内部通过编译后的代码来完成，极大地改善了性能。

> 使用`querySelector()`和`querySelectorAll()`这两个方法无法查找带伪类状态的元素，比如`querySelector(':hover')`不会得到预期结果。

- `querySelector`

`querySelector()`方法接收一个CSS选择符，按照深度优先和先序遍历的原则使用参数提供的CSS选择器在DOM进行查找，返回第一个满足条件的元素；如果没有找到匹配的元素，返回null。该方法既可用于文档document类型，也可用于元素element类型。
```
element = document.querySelector('div#container');
//返回id为container的首个div
element = document.querySelector('.foo,.bar');
//返回带有foo或者bar样式类的首个元素
```

- `querySelectorAll`

`querySelectorAll()`接收一个CSS选择符，返回一个类数组对象NodeList的实例。具体来说，返回的值实际上是带有所有属性和方法的NodeList，而其底层实现则类似于一组元素的快照，而非不断对文档进行搜索的动态查询。这样实现可以避免使用NodeList对象通常会引起的大多数性能问题。只要传给`querySelectorAll()`方法的CSS选择符有效，该方法都会返回一个NodeList对象，而不管找到多少匹配的元素没有匹配元素时，返回空的类数组对象，而不是null。
```
elements = document.querySelectorAll('div.foo');
//返回所有带foo类样式的div
```

但需要注意的是返回的nodeList集合中的元素是非实时`（no-live）`的，想要区别什么是实时非实时的返回结果，请看下例：
```
<div id="container">
    <div></div>
    <div></div>
</div>

container=document.getElementById('#container');
console.log(container.childNodes.length)  //2
container.appendChild(document.createElement('div'));
console.log(container.childNodes.length)  //3
```

通过上面的例子就很好地理解了什么是会实时更新的元素。`document.getElementById`返回的便是实时结果，上面对其添加一个子元素后，再次获取所有子元素个数，已经由原来的2个更新为3个(这里不考虑有些浏览器比如Chrome会把空白也解析为一个子节点)。

- `matchesSelector()`

`matchesSelector()`方法接收一个CSS选择符参数，如果调用元素与该选择符相匹配，返回true；否则返回false

```
<body id="test">
<script>
    //Uncaught TypeError: document.body.matchesSelector is not a function
    console.log(document.body.matchesSelector('#test'));
</script>
</body>
```

由于兼容性问题，现在各个浏览器都只支持加前缀的方法。IE9+浏览器支持`msMatchesSelector()`方法，firefox支持`mozMatchesSelector()`方法，safari和chrome支持`webkitMatchesSelector()`方法。

- 非实时
　　
与`getElementById()`和`getElementsByTagName()`方法不同，`querySelector()`和`querySelectorAll()`方法得到的类数组对象是非动态实时的。

- 缺陷

selector类方法在元素上调用时，指定的选择器仍然在整个文档中进行匹配，然后过滤出结果集，以便它只包含指定元素的后代元素。这看起来是违反常规的，因为它意味着选择器字符串能包含元素的祖先而不仅仅是所匹配的元素。
```
<div id="container">
    <div>1</div>
    <div>2</div>
</div>
<script>
var container = document.getElementById('container');
console.log(container.querySelectorAll('div div'));//[div div]
</script>
```
按照正常理解，控制台应该返回空的类数组对象，因为id为container的div元素的子元素中，不存在div元素嵌套的情况

但是，该方法实际返回[div div]。这是因为参数中的选择器包含了元素的祖先

所以，如果出现后代选择器，为了防止该问题，可以在参数中显式地添加当前元素的选择器
```
<div id="container">
    <div>1</div>
    <div>2</div>
</div>
<script>
var container = document.getElementById('container');
console.log(container.querySelectorAll('#container div div'));//[]
console.log(container.querySelectorAll('#container div'));//[div div]
console.log(container.querySelectorAll('div'));//[div div]
</script>
```

- 关于转义

我们知道反斜杠是用来转义用的，比如在字符串里我们想表示空字符就使用'\b'，换行'\n'。同样，在提供给`querySelector`和`querySelectorAll`的参数也支持转义，了解这点非常重要。

先看个例子，比如我们有个div它的样式类为`'foo:bar'`，当然我知道你一般不会这样写。当我们需要选择它的时候，就需要将其中的冒号进行转义，否则抛错。

同时，有趣的事情来了，或许你以为将冒号直接转义就解决问题了。

同样，也表示非法。原因就在于反斜杠在字符串中本身就表示转义的意思，它于冒号结合转不出东西来，于是抛错。

所以正确的做法是将反斜杠转义后'.foo\:bar'再传递给`querySelector`，后者在接收到'.foo\:bar'这个参数后，字符串将两个反斜杠转义成一个，然后`querySelector`前面得到的一个反斜杠与冒号结合进行转义得到正确结果。

### 9.class 类的基本方法

##### 1.简介

JavaScript 语言中，生成实例对象的传统方法是通过构造函数。下面是一个例子。

```
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
console.log(p);//Point { x: 1, y: 2 }
```

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。类实质上是 JavaScript 现有的基于原型的继承的语法糖。类语法不是向JavaScript引入一个新的面向对象的继承模型。JavaScript类提供了一个更简单和更清晰的语法来创建对象并处理继承。

```
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```
上面代码定义了一个“类”，可以看到里面有一个constructor方法，这就是构造方法，而this关键字则代表实例对象。也就是说，ES5 的构造函数Point，对应 ES6 的Point类的构造方法。

Point类除了构造方法，还定义了一个toString方法。注意，定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。另外，方法之间不需要逗号分隔，加了会报错。

ES6 的类，完全可以看作构造函数的另一种写法。
```
class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true
```
上面代码表明，类的数据类型就是函数，类本身就指向构造函数。

使用的时候，也是直接对类使用new命令，跟构造函数的用法完全一致。
```
class Bar {
  doStuff() {
    console.log('stuff');
  }
}

var b = new Bar();
b.doStuff() // "stuff"
```
构造函数的prototype属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。
```
class Point {
  constructor() {
    // ...
  }
  toString() {
    // ...
  }
  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```
在类的实例上面调用方法，其实就是调用原型上的方法。
```
class B {}
let b = new B();

b.constructor === B.prototype.constructor // true
```
上面代码中，b是B类的实例，它的constructor方法就是B类原型的constructor方法。

由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。Object.assign方法可以很方便地一次向类添加多个方法。
```
class Point {
  constructor(){
    // ...
  }
}

Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
```
prototype对象的constructor属性，直接指向“类”的本身，这与 ES5 的行为是一致的。
`Point.prototype.constructor === Point // true`

另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。
```
class Point {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}

Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```

上面代码中，toString方法是Point类内部定义的方法，它是不可枚举的。这一点与 ES5 的行为不一致。
```
var Point = function (x, y) {
  // ...
};

Point.prototype.toString = function() {
  // ...
};

Object.keys(Point.prototype)
// ["toString"]
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```
上面代码采用 ES5 的写法，toString方法就是可枚举的。

类的属性名，可以采用表达式。
```
let methodName = 'getArea';

class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}
```
上面代码中，Square类的方法名getArea，是从表达式得到的。

##### 2.严格模式

类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。

考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。

##### 3.constructor 方法

constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
```
class Point {
}
// 等同于
class Point {
  constructor() {}
}
```
上面代码中，定义了一个空的类Point，JavaScript 引擎会自动为它添加一个空的constructor方法。

constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。
```
class Foo {
    constructor() {
        console.log(this);//Foo {}
        return Object.create(null);
    }
}
console.log(new Foo() instanceof Foo);
// false
```
上面代码中，constructor函数返回一个全新的对象，结果导致实例对象不是Foo类的实例。

类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。
```
class Foo {
  constructor() {
    return Object.create(null);
  }
}

Foo()
// TypeError: Class constructor Foo cannot be invoked without 'new'
```

##### 4.类的实例对象

生成类的实例对象的写法，与 ES5 完全一样，也是使用new命令。前面说过，如果忘记加上new，像函数那样调用Class，将会报错。
```
class Point {
  // ...
}
var point = Point(2, 3);// 报错
var point = new Point(2, 3);// 正确
```

与 ES5 一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。
```
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
var point = new Point(2, 3);
point.toString() // (2, 3)
point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
```
上面代码中，x和y都是实例对象point自身的属性（因为定义在this变量上），所以`hasOwnProperty`方法返回true，而toString是原型对象的属性（因为定义在Point类上），所以`hasOwnProperty`方法返回false。这些都与 ES5 的行为保持一致。

与 ES5 一样，类的所有实例共享一个原型对象。
```
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__
//true
```
上面代码中，p1和p2都是Point的实例，它们的原型都是`Point.prototype`，所以`__proto__`属性是相等的。

这也意味着，可以通过实例的`__proto__`属性为“类”添加方法。

> `__proto__` 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用 `Object.getPrototypeOf` 方法来获取实例对象的原型，然后再来为原型添加方法/属性。
```
var p1 = new Point(2,3);
var p2 = new Point(3,2);
p1.__proto__.printName = function () { return 'Oops' };
p1.printName() // "Oops"
p2.printName() // "Oops"
var p3 = new Point(4,2);
p3.printName() // "Oops"
```
上面代码在p1的原型上添加了一个printName方法，由于p1的原型就是p2的原型，因此p2也可以调用这个方法。而且，此后新建的实例p3也可以调用这个方法。这意味着，使用实例的`__proto__`属性改写原型，必须相当谨慎，不推荐使用，因为这会改变“类”的原始定义，影响到所有实例。

##### 5.Class 表达式

与函数一样，类也可以使用表达式的形式定义。
```
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
```
上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是MyClass而不是Me，Me只在 Class 的内部代码可用，指代当前类。
```
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined
```
上面代码表示，Me只在 Class 内部有定义。

如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式。
`const MyClass = class { /* ... */ };`

采用 Class 表达式，可以写出立即执行的 Class。
```
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"
```
上面代码中，person是一个立即执行的类的实例。

##### 6.不存在变量提升

类不存在变量提升（hoist），这一点与 ES5 完全不同。
```
new Foo(); // ReferenceError
class Foo {}
```
上面代码中，Foo类使用在前，定义在后，这样会报错，因为 ES6 不会把类的声明提升到代码头部。这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。
```
{
  let Foo = class {};
  class Bar extends Foo {
  }
}
```
上面的代码不会报错，因为Bar继承Foo的时候，Foo已经有定义了。但是，如果存在class的提升，上面代码就会报错，因为class会被提升到代码头部，而let命令是不提升的，所以导致Bar继承Foo的时候，Foo还没有定义。

##### 7.私有方法
私有方法是常见需求，但 ES6 不提供，只能通过变通方法模拟实现。

一种做法是在命名上加以区别。
```
class Widget {
  // 公有方法
  foo (baz) {
    this._bar(baz);
  }
  // 私有方法
  _bar(baz) {
    return this.snaf = baz;
  }
  // ...
}
```
上面代码中，_bar方法前面的下划线，表示这是一个只限于内部使用的私有方法。但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法。

另一种方法就是索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的。
```
class Widget {
  foo (baz) {
    bar.call(this, baz);
  }
  // ...
}
function bar(baz) {
  return this.snaf = baz;
}
```
上面代码中，foo是公有方法，内部调用了bar.call(this, baz)。这使得bar实际上成为了当前模块的私有方法。

还有一种方法是利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值。
```
const bar = Symbol('bar');
const snaf = Symbol('snaf');
export default class myClass{
  // 公有方法
  foo(baz) {
    this[bar](baz);
  }
  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }
  // ...
};
```
上面代码中，bar和snaf都是Symbol值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果。

##### 8.私有属性

与私有方法一样，ES6 不支持私有属性。目前，有一个提案，为class加了私有属性。方法是在属性名之前，使用#表示。
```
class Point {
  #x;
  constructor(x = 0) {
    #x = +x; // 写成 this.#x 亦可
  }
  get x() { return #x }
  set x(value) { #x = +value }
}
```
上面代码中，#x就表示私有属性x，在Point类之外是读取不到这个属性的。还可以看到，私有属性与实例的属性是可以同名的（比如，#x与get x()）。

私有属性可以指定初始值，在构造函数执行时进行初始化。
```
class Point {
  #x = 0;
  constructor() {
    #x; // 0
  }
}
```
之所以要引入一个新的前缀#表示私有属性，而没有采用private关键字，是因为 JavaScript 是一门动态语言，使用独立的符号似乎是唯一的可靠方法，能够准确地区分一种属性是否为私有属性。另外，Ruby 语言使用@表示私有属性，ES6 没有用这个符号而使用#，是因为@已经被留给了 Decorator。

该提案只规定了私有属性的写法。但是，很自然地，它也可以用来写私有方法。
```
class Foo {
  #a;
  #b;
  #sum() { return #a + #b; }
  printSum() { console.log(#sum()); }
  constructor(a, b) { #a = a; #b = b; }
}
```

##### 9.this 的指向

类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。
```
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }
  print(text) {
    console.log(text);
  }
}
const logger = new Logger();
const { printName } = logger;
printName();
// TypeError: Cannot read property 'print' of undefined
```
上面代码中，printName方法中的this，默认指向Logger类的实例。但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境，因为找不到print方法而导致报错。

一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。
```
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  // ...
}
```
另一种解决方法是使用箭头函数。
```
class Logger {
  constructor() {
    this.printName = (name = 'there') => {
      this.print(`Hello ${name}`);
    };
  }
  // ...
}
```
还有一种解决方法是使用Proxy，获取方法的时候，自动绑定this。
```
function selfish (target) {
  const cache = new WeakMap();
  const handler = {
    get (target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}
const logger = selfish(new Logger());
```

##### 10.name 属性

由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。
```
class Point {}
Point.name // "Point"
```

name属性总是返回紧跟在class关键字后面的类名。

##### 11.Class 的取值函数（getter）和存值函数（setter）

与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
```
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}
let inst = new MyClass();
inst.prop = 123;
// setter: 123
inst.prop
// 'getter'
```
上面代码中，prop属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。

存值函数和取值函数是设置在属性的 Descriptor 对象上的。
```
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }
  get html() {
    return this.element.innerHTML;
  }
  set html(value) {
    this.element.innerHTML = value;
  }
}
var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html"
);
"get" in descriptor  // true
"set" in descriptor  // true
```
上面代码中，存值函数和取值函数是定义在html属性的描述对象上面，这与 ES5 完全一致。

##### 12.Class 的 Generator 方法

如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数。
```
class Foo {
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}
for (let x of new Foo('hello', 'world')) {
  console.log(x);
}
// hello
// world
```
上面代码中，Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个 Generator 函数。Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器。

##### 13.Class 的静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
```
class Foo {
  static classMethod() {
    return 'hello';
  }
}
Foo.classMethod() // 'hello'
var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

上面代码中，Foo类的classMethod方法前有static关键字，表明该方法是一个静态方法，可以直接在Foo类上调用（Foo.classMethod()），而不是在Foo类的实例上调用。如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法。

注意，如果静态方法包含this关键字，这个this指的是类，而不是实例。
```
class Foo {
  static bar () {
    this.baz();
  }
  static baz () {
    console.log('hello');
  }
  baz () {
    console.log('world');
  }
}
Foo.bar() // hello
```

上面代码中，静态方法bar调用了this.baz，这里的this指的是Foo类，而不是Foo的实例，等同于调用Foo.baz。另外，从这个例子还可以看出，静态方法可以与非静态方法重名。

父类的静态方法，可以被子类继承。
```
class Foo {
  static classMethod() {
    return 'hello';
  }
}
class Bar extends Foo {
}
Bar.classMethod() // 'hello'
```
上面代码中，父类Foo有一个静态方法，子类Bar可以调用这个方法。

静态方法也是可以从super对象上调用的。
```
class Foo {
  static classMethod() {
    return 'hello';
  }
}
class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}
Bar.classMethod() // "hello, too"
```

##### 14.Class 的静态属性和实例属性

静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。
```
class Foo {
}
Foo.prop = 1;
Foo.prop // 1
```
上面的写法为Foo类定义了一个静态属性prop。

目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。
```
// 以下两种写法都无效
class Foo {
  // 写法一
  prop: 2
  // 写法二
  static prop: 2
}
Foo.prop // undefined
```
目前有一个静态属性的提案，对实例属性和静态属性都规定了新的写法。

（1）类的实例属性

类的实例属性可以用等式，写入类的定义之中。
```
class MyClass {
  myProp = 42;
  constructor() {
    console.log(this.myProp); // 42
  }
}
```
上面代码中，myProp就是MyClass的实例属性。在MyClass的实例上，可以读取这个属性。

以前，我们定义实例属性，只能写在类的constructor方法里面。
```
class ReactCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
}
```
上面代码中，构造方法constructor里面，定义了this.state属性。

有了新的写法以后，可以不在constructor方法里面定义。
```
class ReactCounter extends React.Component {
  state = {
    count: 0
  };
}
```
这种写法比以前更清晰。

为了可读性的目的，对于那些在constructor里面已经定义的实例属性，新写法允许直接列出。
```
class ReactCounter extends React.Component {
  state;
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
}
```

（2）类的静态属性

类的静态属性只要在上面的实例属性写法前面，加上static关键字就可以了。
```
class MyClass {
  static myStaticProp = 42;

  constructor() {
    console.log(MyClass.myStaticProp); // 42
  }
}
```
同样的，这个新写法大大方便了静态属性的表达。
```
// 老写法
class Foo {
  // ...
}
Foo.prop = 1;

// 新写法
class Foo {
  static prop = 1;
}
```
上面代码中，老写法的静态属性定义在类的外部。整个类生成以后，再生成静态属性。这样让人很容易忽略这个静态属性，也不符合相关代码应该放在一起的代码组织原则。另外，新写法是显式声明（declarative），而不是赋值处理，语义更好。

##### 15.new.target 属性

new是从构造函数生成实例对象的命令。ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。如果构造函数不是通过new命令调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。
```
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
```

上面代码确保构造函数只能通过new命令调用。

Class 内部调用new.target，返回当前 Class。
```
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}
var obj = new Rectangle(3, 4); // 输出 true
```

需要注意的是，子类继承父类时，new.target会返回子类。
```
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    // ...
  }
}
class Square extends Rectangle {
  constructor(length) {
    super(length, length);
  }
}
var obj = new Square(3); // 输出 false
```
上面代码中，new.target会返回子类。

利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。
```
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}
class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}
var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
```
上面代码中，Shape类不能被实例化，只能用于继承。

注意，在函数外部，使用new.target会报错。


##### 定义类

类实际上是个“特殊的函数”，就像你能够定义的函数表达式和函数声明一样，类语法有两个组成部分：类表达式和类声明。

- 类声明

定义一个类的一种方法是使用一个类声明。要声明一个类，你可以使用带有class关键字的类名（这里是“Rectangle”）。

```
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

> 函数声明和类声明之间的一个重要区别是函数声明会声明提升，类声明不会。你首先需要声明你的类，然后访问它，否则会抛出一个`ReferenceError`。

- 类表达式

类表达式是定义类的另一种方式。类表达式可以是被命名的或匿名的。赋予一个命名类表达式的名称是类的主体的本地名称。
```
/* 匿名类 */
let Rectangle = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
```
```
/* 命名的类 */
let Rectangle = class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
```

注意: 类表达式也同样受到类声明中提到的提升问题的困扰。

##### 类体和方法定义

一个类的类体是一对花括号/大括号 `{}` 中的部分。这是你定义类成员的位置，如方法或构造函数。

- 严格模式

类声明和类表达式的主体都执行在严格模式下。比如，构造函数，静态方法，原型方法，getter和setter都在严格模式下执行。

- 构造函数

构造函数方法是一个特殊的方法，其用于创建和初始化使用一个类创建的一个对象。一个类只能拥有一个名为 `constructor`的特殊方法。如果类包含多个构造函数的方法，则将抛出 一个`SyntaxError` 。

一个构造函数可以使用 `super` 关键字来调用一个父类的构造函数。

- 原型方法

```
class Rectangle {
    // constructor
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
    // Getter
    get area() {
        return this.calcArea()
    }
    // Method
    calcArea() {
        return this.height * this.width;
    }
}
const square = new Rectangle(10, 10);

console.log(square.area);
// 100
```

- 静态方法

static 关键字用来定义一个类的一个静态方法。调用静态方法不需要实例化该类，但不能通过一个类实例调用静态方法。静态方法通常用于为一个应用程序创建工具函数。
```
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.hypot(dx, dy);
    }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(Point.distance(p1, p2));
```

- 用原型和静态方法装箱

当一个对象调用静态或原型方法时，如果该对象没有“this”值（或“this”作为布尔，字符串，数字，未定义或null) ，那么“this”值在被调用的函数内部将为 undefined。不会发生自动装箱。即使我们以非严格模式编写代码，它的行为也是一样的，因为所有的函数、方法、构造函数、getters或setters都在严格模式下执行。因此如果我们没有指定this的值，this值将为undefined。
```
class Animal {
  speak() {
    return this;
  }
  static eat() {
    return this;
  }
}

let obj = new Animal();
obj.speak(); // Animal {}
let speak = obj.speak;
speak(); // undefined

Animal.eat() // class Animal
let eat = Animal.eat;
eat(); // undefined
```
如果我们使用传统的基于函数的类来编写上述代码，那么基于调用该函数的“this”值将发生自动装箱。
```
function Animal() { }

Animal.prototype.speak = function() {
  return this;
}

Animal.eat = function() {
  return this;
}

let obj = new Animal();
let speak = obj.speak;
speak(); // global object

let eat = Animal.eat;
eat(); // global object
```

##### 使用 extends 创建子类

`extends` 关键字在类声明或类表达式中用于创建一个类作为另一个类的一个子类。
```
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  speak() {
    console.log(this.name + ' barks.');
  }
}

var b = new Animal('Mitzie');
var d = new Dog('Mitzie');
b.speak();//Mitzie makes a noise.
d.speak();//Mitzie barks.
```
如果子类中存在构造函数，则需要在使用“this”之前首先调用`super()`。

子类必须在constructor方法中调用super方法，否则新建实例时会报错。 这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。

也可以扩展传统的基于函数的“类”：
```
function Animal (name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  console.log(this.name + ' makes a noise.');
}

class Dog extends Animal {
  speak() {
    super.speak();
    console.log(this.name + ' barks.');
  }
}

var d = new Dog('Mitzie');
d.speak();
```
请注意，类不能扩展常规（不可构造/非构造的）对象。如果要继承常规对象，可以改用 `Object.setPrototypeOf()`:
```
var Animal = {
  speak() {
    console.log(this.name + ' makes a noise.');
  }
};

class Dog {
  constructor(name) {
    this.name = name;
  }
}

Object.setPrototypeOf(Dog.prototype, Animal);
// If you do not do this you will get a TypeError when you invoke speak

var d = new Dog('Mitzie');
d.speak(); // Mitzie makes a noise.
```

##### Species

你可能希望在派生数组类 MyArray 中返回 Array对象。这种类/种类模式允许你覆盖默认的构造函数。

例如，当使用像`map()`返回默认构造函数的方法时，您希望这些方法返回一个父Array对象，而不是MyArray对象。`Symbol.species` 符号可以让你这样做：
```
class MyArray extends Array {
  // Overwrite species to the parent Array constructor
  static get [Symbol.species]() { return Array; }
}
var a = new MyArray(1,2,3);
var mapped = a.map(x => x * x);

console.log(mapped instanceof MyArray);
// false
console.log(mapped instanceof Array);
// true
```

- 使用 super 调用超类

`super` 关键字用于调用对象的父对象上的函数。
```
class Cat {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Lion extends Cat {
  speak() {
    super.speak();
    console.log(this.name + ' roars.');
  }
}
```

- Mix-ins 混合

抽象子类或者 `mix-ins` 是类的模板。 一个 `ECMAScript` 类只能有一个单超类，所以想要从工具类来多重继承的行为是不可能的。子类继承的只能是父类提供的功能性。因此，例如，从工具类的多重继承是不可能的。该功能必须由超类提供。

一个以超类作为输入的函数和一个继承该超类的子类作为输出可以用于在ECMAScript中实现混合：
```
var calculatorMixin = Base => class extends Base {
  calc() { }
};

var randomizerMixin = Base => class extends Base {
  randomize() { }
};
```
使用 mix-ins 的类可以像下面这样写：
```
class Foo { }
class Bar extends calculatorMixin(randomizerMixin(Foo)) { }
```

##### class类继承

- 1 基本用法

Class 之间可以通过 `extends` 关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。
`class ColorPoint extends Point {} `

上面代码定义了一个 ColorPoint 类，该类通过`extends`关键字，继承了Point类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个Point类。下面，我们在ColorPoint内部加上代码。

```
class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y);
        //  调用父类的 constructor(x, y)
        this.color = color;
    }
    toString() {
        return this.color + ' ' + super.toString();
        //  调用父类的 toString()
    }
}
```
上面代码中，constructor 方法和`toString`方法之中，都出现了`super` 关键字，它在这里表示父类的构造函数，用来新建父类的this对象。

子类必须在 constructor 方法中调用`super`方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用`super`方法，子类就得不到this对象。
```
class Point { /* ... */ }
class ColorPoint extends Point {
    constructor() {}
}
let cp = new ColorPoint(); // ReferenceError
```

上面代码中，ColorPoint 继承了父类 Point，但是它的构造函数没有调用super方法，导致新建实例时报错。

ES5 的继承，实质是先创造子类的实例对象 this，然后再将父类的方法添加到this上面（`Parent.apply(this)`）。ES6 的继承机制完全不同， 实质是先创造父类的实例对象 this（所以必须先调用super方法），然后再用子类的构造函数修改 this。

如果子类没有定义 constructor 方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有 constructor 方法。
```
constructor(...args) {
    super(...args);
}
```

另一个需要注意的地方是，在子类的构造函数中，只有调用`super`之后，才可以使用`this`关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有`super`方法才能返回父类实例。
```
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class ColorPoint extends Point {
    constructor(x, y, color) {
        this.color = color; // ReferenceError
        super(x, y);
        this.color = color; //  正确
    }
}
```

上面代码中，子类的 constructor 方法没有调用`super`之前，就使用`this`关键字，结果报错，而放在`super`方法之后就是正确的。
下面是生成子类实例的代码。
```
let cp = new ColorPoint(25, 8, 'green');
cp instanceof ColorPoint // true
cp instanceof Point // true
```

上面代码中， 实例对象cp同时是 ColorPoint 和 Point 两个类的实例， 这与 ES5 的行为完全一致。

- 类的`prototype`属性和 `__proto__` 属性

大多数浏览器的 ES5 实现之中，每一个对象都有`__proto__`属性，指向对应的构造函数的`prototype`属性。Class 作为构造函数的语法糖，同时有`prototype`属性和`__proto__`属性，因此同时存在两条继承链。

1).子类的`__proto__`属性，表示构造函数的继承，总是指向父类。
2).子类`prototype`属性的`__proto__`属性，表示方法的继承，总是指向父类的`prototype`属性。

```
class A {}
class B extends A {}
B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```

上面代码中，子类B的`__proto__`属性指向父类A，子类B的`prototype`属性的`__proto__`属性指向父类A的`prototype`属性。

这样的结果是因为， 类的继承是按照下面的模式实现的。
```
class A {}
class B {}
// B 的实例继承 A 的实例
Object.setPrototypeOf(B.prototype, A.prototype);
// B 继承 A 的静态属性
Object.setPrototypeOf(B, A);
```

《对象的扩展》一章给出过`Object.setPrototypeOf`方法的实现。
```
Object.setPrototypeOf = function(obj, proto) {
    obj.__proto__ = proto;
    return obj;
}
```

因此， 就得到了上面的结果。
```
Object.setPrototypeOf(B.prototype, A.prototype);
//  等同于
B.prototype.__proto__ = A.prototype;

Object.setPrototypeOf(B, A);
//  等同于
B.__proto__ = A;
```

这两条继承链，可以这样理解：作为一个对象，子类(B)的原型（ `__proto__`属性）是父类(A)；作为一个构造函数，子类(B)的原型（ `prototype`属性）是父类的实例。
```
Object.create(A.prototype);
//  等同于
B.prototype.__proto__ = A.prototype;
```

- Extends 的继承目标

extends关键字后面可以跟多种类型的值。
`class B extends A {}`

上面代码的A，只要是一个有`prototype`属性的函数，就能被B继承。由于函数都有`prototype`属性（ 除了`Function.prototype`函数），因此A可以是任意函数。

下面， 讨论三种特殊情况。
第一种特殊情况， 子类继承 Object 类。

```
class A extends Object {}
A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true
```

这种情况下， A其实就是构造函数Object的复制， A的实例就是 Object 的实例。

第二种特殊情况， 不存在任何继承。
```
class A {}
A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true
```

这种情况下，A 作为一个基类（即不存在任何继承），就是一个普通函数， 所以直接继承`Funciton.prototype`。但是，A调用后返回一个空对象（即Object实例），所以`A.prototype.__proto__`指向构造函数（Object）的`prototype`属性。

第三种特殊情况， 子类继承null。
```
class A extends null {}
A.__proto__ === Function.prototype // true
A.prototype.__proto__ === undefined // true
```

这种情况与第二种情况非常像。A 也是一个普通函数，所以直接继承Funciton.prototype。但是，A 调用后返回的对象不继承任何方法，所以它的`__proto__`指向`Function.prototype`，即实质上执行了下面的代码。
```
class C extends null {
    constructor() {
        return Object.create(null);
    }
}
```

- `Object.getPrototypeOf()`

`Object.getPrototypeOf`方法可以用来从子类上获取父类。

`Object.getPrototypeOf(ColorPoint) === Point  // true `
因此， 可以使用这个方法判断， 一个类是否继承了另一个类。

- `super` 关键字

super这个关键字，有两种用法，含义不同。
1).作为函数调用时（即`super(...args)`），super代表父类的构造函数。
2).作为对象调用时（即`super.prop`或`super.method()`），super代表父类。注意，此时super即可以引用父类实例的属性和方法，也可以引用父类的静态方法。

```
class B extends A {
    get m() {
        return this._p * super._p;
    }
    set m() {
        throw new Error(' 该属性只读 ');
    }
}
```

上面代码中，子类通过super关键字，调用父类实例的_p属性。
由于，对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。
```
var obj = {
    toString() {
        return "MyObject: " + super.toString();
    }
};
obj.toString(); // MyObject: [object Object]
```

- 实例的`__proto__`属性

子类实例的`__proto__`属性的`__proto__`属性，指向父类实例的 `__proto__`属性。也就是说，子类的原型的原型，是父类的原型。

```
var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');
p2.__proto__ === p1.__proto__ // false
p2.__proto__.__proto__ === p1.__proto__ // true
```

上面代码中，ColorPoint 继承了 Point，导致前者原型的原型是后者的原型。

因此，通过子类实例的`__proto__.__proto__`属性，可以修改父类实例的行为。
```
p2.__proto__.__proto__.printName = function() {
    console.log('Ha');
};
p1.printName() // "Ha"
```

上面代码在 ColorPoint 的实例p2上向Point类添加方法，结果影响到了Point的实例p1。

- 原生构造函数的继承

原生构造函数是指语言内置的构造函数，通常用来生成数据结构。

ECMAScript 的原生构造函数大致有下面这些。
```
Boolean()
Number()
String()
Array()
Date()
Function()
RegExp()
Error()
Object()
```
以前，这些原生构造函数是无法继承的，比如，不能自己定义一个Array的子类。
```
function MyArray() {
    Array.apply(this, arguments);
}
MyArray.prototype = Object.create(Array.prototype, {
    constructor: {
        value: MyArray,
        writable: true,
        configurable: true,
        enumerable: true
    }
});
```

上面代码定义了一个继承 Array 的MyArray类。 但是， 这个类的行为与Array完全不一致。
```
var colors = new MyArray();
colors[0] = "red";
colors.length // 0
colors.length = 0;
colors[0] // "red"
```
之所以会发生这种情况，是因为子类无法获得原生构造函数的内部属性，通过`Array.apply()`或者分配给原型对象都不行。原生构造函数会忽略apply方法传入的this，也就是说，原生构造函数的this无法绑定， 导致拿不到内部属性。

ES5 是先新建子类的实例对象this，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。比如，Array 构造函数有一个内部属性`[[DefineOwnProperty]]`，用来定义新属性时，更新length属性，这个内部属性无法在子类获取，导致子类的length属性行为不正常。

下面的例子中，我们想让一个普通对象继承Error对象。
```
var e = {};
Object.getOwnPropertyNames(Error.call(e))
    // [ 'stack' ]
Object.getOwnPropertyNames(e)
    // []
```

上面代码中，我们想通过`Error.call(e)`这种写法，让普通对象e具有Error对象的实例属性。但是，`Error.call()`完全忽略传入的第一个参数，而是返回一个新对象，e本身没有任何变化。这证明了`Error.call(e)`这种写法，无法继承原生构造函数。

ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承。下面是一个继承Array的例子。
```
class MyArray extends Array {
    constructor(...args) {
        super(...args);
    }
}
var arr = new MyArray();
arr[0] = 12;
arr.length // 1
arr.length = 0;
arr[0] // undefined
```

上面代码定义了一个MyArray类，继承了Array构造函数，因此就可以从MyArray生成数组的实例。这意味着，ES6 可以自定义原生数据结构（比如Array、String 等）的子类，这是 ES5 无法做到的。

上面这个例子也说明，extends关键字不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的基础上，定义自己的数据结构。下面就是定义了一个带版本功能的数组。
```
class VersionedArray extends Array {
    constructor() {
        super();
        this.history = [
            []
        ];
    }
    commit() {
        this.history.push(this.slice());
    }
    revert() {
        this.splice(0, this.length, ...this.history[this.history.length - 1]);
    }
}
var x = new VersionedArray();
x.push(1);
x.push(2);
x // [1, 2]
x.history // [[]]
x.commit();
x.history // [[], [1, 2]]
x.push(3);
x // [1, 2, 3]
x.revert();
x // [1, 2]
```

上面代码中，VersionedArray 结构会通过 commit 方法，将自己的当前状态存入 history 属性，然后通过 revert 方法，可以撤销当前版本，回到上一个版本。除此之外，VersionedArray依然是一个数组，所有原生的数组方法都可以在它上面调用。

下面是一个自定义Error子类的例子。
```
class ExtendableError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.stack = (new Error()).stack;
        this.name = this.constructor.name;
    }
}
class MyError extends ExtendableError {
    constructor(m) {
        super(m);
    }
}
var myerror = new MyError('ll');
myerror.message // "ll"
myerror instanceof Error // true
myerror.name // "MyError"
myerror.stack
    // Error
    // at MyError.ExtendableError
    // ...
```

注意，继承 Object 的子类，有一个行为差异。
```
class NewObj extends Object {
    constructor() {
        super(...arguments);
    }
}
var o = new NewObj({
    attr: true
});
console.log(o.attr === true); // false
```
上面代码中，NewObj 继承了 Object，但是无法通过 super 方法向父类Object 传参。这是因为 ES6 改变了Object 构造函数的行为， 一旦发现 Object 方法不是通过`new Object()`这种形式调用， ES6 规定Object构造函数会忽略参数。
