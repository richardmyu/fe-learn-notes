## 十.console.log 对象

`console`对象是 JavaScript 的原生对象，它有点像 Unix 系统的标准输出`stdout`和标准错误`stderr`，可以输出各种信息到控制台，并且还提供了很多有用的辅助方法。

`console`的常见用途有两个。

- 调试程序，显示网页代码运行时的错误信息。
- 提供了一个命令行接口，用来与网页代码互动。

### 1.浏览器实现

`console`对象的浏览器实现，包含在浏览器自带的开发工具之中。

`Console`面板基本上就是一个命令行窗口，你可以在提示符下，键入各种命令。

### 2.console 对象的静态方法

`console`对象提供的各种静态方法，用来与控制台窗口互动。

#### 1.console.log()，console.info()，console.debug()

`console.log`方法用于在控制台输出信息。它可以接受一个或多个参数，将它们连接起来输出。

`console.log`方法会自动在每次输出的结尾，添加换行符。

如果第一个参数是格式字符串（使用了格式占位符），console.log 方法将依次用后面的参数替换占位符，然后再进行输出。

```javascript
console.log(" %s + %s = %s", 1, 1, 2);
//  1 + 1 = 2
```

上面代码中，`console.log`方法的第一个参数有三个占位符（`%s`），第二、三、四个参数会在显示时，依次替换掉这个三个占位符。

`console.log`方法支持以下占位符，不同类型的数据必须使用对应的占位符。

---

- `%s` 字符串
- `%d` 整数
- `%i` 整数
- `%f` 浮点数
- `%o` 对象的链接
- `%c` CSS 格式字符串

---

使用`%c`占位符时，对应的参数必须是 CSS 代码，用来对输出内容进行 CSS 渲染。

```javascript
console.log(
  "%cThis text is styled!",
  "color: red; background: yellow; font-size: 24px;"
);
```

`console.log`方法的两种参数格式，可以结合在一起使用。

```javascript
console.log(" %s + %s ", 1, 1, "= 2");
// 1 + 1  = 2
```

如果参数是一个对象，`console.log`会显示该对象的值。

```javascript
console.log({ foo: "bar" });
// Object {foo: "bar"}
console.log(Date);
// function Date() { [native code] }
```

上面代码输出 Date 对象的值，结果为一个构造函数。

`console.info`是`console.log`方法的别名，用法完全一样。只不过`console.info`方法会在输出信息的前面，加上一个蓝色图标。

`console.debug`方法与`console.log`方法类似，会在控制台输出调试信息。但是，默认情况下，`console.debug`输出的信息不会显示，只有在打开显示级别在 verbose 的情况下，才会显示。

`console`对象的所有方法，都可以被覆盖。因此，可以按照自己的需要，定义`console.log`方法。

```javascript
["log", "info", "warn", "error"].forEach(function(method) {
  console[method] = console[method].bind(console, new Date().toISOString());
});

console.log("出错了！");
// 2014-05-18T09:00.000Z 出错了！
```

上面代码表示，使用自定义的`console.log`方法，可以在显示结果添加当前时间。

#### 2.console.warn()，console.error()

`warn`方法和`error`方法也是在控制台输出信息，它们与`log`方法的不同之处在于，`warn`方法输出信息时，在最前面加一个黄色三角，表示警告；`error`方法输出信息时，在最前面加一个红色的叉，表示出错。同时，还会高亮显示输出文字和错误发生的堆栈。其他方面都一样。

```javascript
console.error("Error: %s (%i)", "Server is not responding", 500);
// Error: Server is not responding (500)
console.warn("Warning! Too few nodes (%d)", document.childNodes.length);
// Warning! Too few nodes (1)
```

#### 3.console.table()

对于某些复合类型的数据，`console.table`方法可以将其转为表格显示。

```javascript
var languages = [
  { name: "JavaScript", fileExtension: ".js" },
  { name: "TypeScript", fileExtension: ".ts" },
  { name: "CoffeeScript", fileExtension: ".coffee" }
];

console.table(languages);
```

上面代码的`language`变量，转为表格显示如下。

| (index) | name           | fileExtension |
| ------- | -------------- | ------------- |
| 0       | “JavaScript”   | “.js”         |
| 1       | “TypeScript”   | “.ts”         |
| 2       | “CoffeeScript” | “.coffee”     |

##### 4.console.count()

`count`方法用于计数，输出它被调用了多少次。

```javascript
function greet(user) {
  console.count();
  return "hi " + user;
}

greet("bob");
//  : 1
// "hi bob"

greet("alice");
//  : 2
// "hi alice"

greet("bob");
//  : 3
// "hi bob"
```

上面代码每次调用 greet 函数，内部的 console.count 方法就输出执行次数。

该方法可以接受一个字符串作为参数，作为标签，对执行次数进行分类。

```javascript
function greet(user) {
  console.count(user);
  return "hi " + user;
}

greet("bob");
// bob: 1
// "hi bob"

greet("alice");
// alice: 1
// "hi alice"

greet("bob");
// bob: 2
// "hi bob"
```

上面代码根据参数的不同，显示 bob 执行了两次，alice 执行了一次。

#### 5.console.dir()，console.dirxml()

`dir`方法用来对一个对象进行检查（inspect），并以易于阅读和打印的格式显示。

该方法对于输出 DOM 对象非常有用，因为会显示 DOM 对象的所有属性。

`console.dir(document.body)`

Node 环境之中，还可以指定以代码高亮的形式输出。

`console.dir(obj, {colors: true})`

`dirxml`方法主要用于以目录树的形式，显示 DOM 节点。

`console.dirxml(document.body)`

如果参数不是 DOM 节点，而是普通的 JavaScript 对象，`console.dirxml`等同于`console.dir`。

#### 6.console.assert()

`console.assert`方法主要用于程序运行过程中，进行条件判断，如果不满足条件，就显示一个错误，但不会中断程序执行。这样就相当于提示用户，内部状态不正确。

它接受两个参数，第一个参数是表达式，第二个参数是字符串。只有当第一个参数为 false，才会提示有错误，在控制台输出第二个参数，否则不会有任何结果。

```javascript
console.assert(false, "判断条件不成立");
// Assertion failed: 判断条件不成立

// 相当于
try {
  if (false) {
    throw new Error("判断条件不成立");
  }
} catch (e) {
  console.error(e);
}
```

下面是一个例子，判断子节点的个数是否大于等于 500。

`console.assert(list.childNodes.length < 500, '节点个数大于等于500')`

#### 7.console.time()，console.timeEnd()

这两个方法用于计时，可以算出一个操作所花费的准确时间。

```javascript
console.time("Array initialize");

var array = new Array(1000000);
for (var i = array.length - 1; i >= 0; i--) {
  array[i] = new Object();
}

console.timeEnd("Array initialize");
// Array initialize: 1914.481ms
```

`time`方法表示计时开始，`timeEnd`方法表示计时结束。它们的参数是计时器的名称。调用`timeEnd`方法之后，控制台会显示“计时器名称: 所耗费的时间”。

#### 8.console.group()，console.groupEnd()，console.groupCollapsed()

`console.group`和`console.groupEnd`这两个方法用于将显示的信息分组。它只在输出大量信息时有用，分在一组的信息，可以用鼠标折叠/展开。

```javascript
console.group("一级分组");
console.log("一级分组的内容");

console.group("二级分组");
console.log("二级分组的内容");

console.groupEnd(); // 一级分组结束
console.groupEnd(); // 二级分组结束
```

上面代码会将“二级分组”显示在“一级分组”内部，并且“一级分类”和“二级分类”前面都有一个折叠符号，可以用来折叠本级的内容。

`console.groupCollapsed`方法与`console.group`方法很类似，唯一的区别是该组的内容，在第一次显示时是收起的（collapsed），而不是展开的。

```javascript
console.groupCollapsed("Fetching Data");

console.log("Request Sent");
console.error("Error: Server not responding (500)");

console.groupEnd();
```

#### 9.console.trace()，console.clear()

`console.trace`方法显示当前执行的代码在堆栈中的调用路径。

```javascript
console.trace();
// console.trace()
//   (anonymous function)
//   InjectedScript._evaluateOn
//   InjectedScript._evaluateAndWrap
//   InjectedScript.evaluate
```

`console.clear`方法用于清除当前控制台的所有输出，将光标回置到第一行。如果用户选中了控制台的“Preserve log”选项，`console.clear`方法将不起作用。

### 3.命令行 API

浏览器控制台中，除了使用`console`对象，还可以使用一些控制台自带的命令行方法。

#### 1.`$_`

`$_`属性返回上一个表达式的值。

#### 2.`$0` - `$4`

控制台保存了最近 5 个在 Elements 面板选中的 DOM 元素，`$0`代表倒数第一个（最近一个），`$1`代表倒数第二个，以此类推直到`$4`。

#### 3.`$(selector)`

`$(selector)`返回第一个匹配的元素，等同于`document.querySelector()`。注意，如果页面脚本对`$`有定义，则会覆盖原始的定义。比如，页面里面有 jQuery，控制台执行`$(selector)`就会采用 jQuery 的实现，返回一个数组。

#### 4.`$$(selector)`

`$$(selector)`返回选中的 DOM 对象，等同于`document.querySelectorAll`。

#### 5.`$x(path)`

`$x(path)`方法返回一个数组，包含匹配特定 XPath 表达式的所有 DOM 元素。

`$x("//p[a]")`

上面代码返回所有包含 a 元素的 p 元素。

#### 6.`inspect(object)`

`inspect(object)`方法打开相关面板，并选中相应的元素，显示它的细节。DOM 元素在 Elements 面板中显示，比如`inspect(document)`会在 Elements 面板显示 document 元素。JavaScript 对象在控制台面板 Profiles 面板中显示，比如`inspect(window)`。

#### 7.`getEventListeners(object)`

`getEventListeners(object)`方法返回一个对象，该对象的成员为`object`登记了回调函数的各种事件（比如`click`或`keydown`），每个事件对应一个数组，数组的成员为该事件的回调函数。

#### 8.`keys(object)，values(object)`

`keys(object)`方法返回一个数组，包含 object 的所有键名。

`values(object)`方法返回一个数组，包含 object 的所有键值。

```javascript
var o = { p1: "a", p2: "b" };

keys(o);
// ["p1", "p2"]
values(o);
// ["a", "b"]
```

#### 9.`monitorEvents(object[, events]) ，unmonitorEvents(object[, events])`

`monitorEvents(object[, events])`方法监听特定对象上发生的特定事件。事件发生时，会返回一个 Event 对象，包含该事件的相关信息。`unmonitorEvents`方法用于停止监听。

`monitorEvents(window, "resize");`

`monitorEvents(window, ["resize", "scroll"])`

上面代码分别表示单个事件和多个事件的监听方法。

`monitorEvents($0, 'mouse');`

`unmonitorEvents($0, 'mousemove');`

上面代码表示如何停止监听。

`monitorEvents`允许监听同一大类的事件。所有事件可以分成四个大类。

- `mouse：”mousedown”, “mouseup”, “click”, “dblclick”, “mousemove”, “mouseover”, “mouseout”, “mousewheel”`
- `key：”keydown”, “keyup”, “keypress”, “textInput”`
- `touch：”touchstart”, “touchmove”, “touchend”, “touchcancel”`
- `control：”resize”, “scroll”, “zoom”, “focus”, “blur”, “select”, “change”, “submit”, “reset”`

`monitorEvents($("#msg"), "key");`

上面代码表示监听所有 key 大类的事件。

#### 10.其他方法

命令行 API 还提供以下方法。

- `clear()`：清除控制台的历史。
- `copy(object)`：复制特定 DOM 元素到剪贴板。
- `dir(object)`：显示特定对象的所有属性，是`console.dir`方法的别名。
- `dirxml(object)`：显示特定对象的 XML 形式，是`console.dirxml`方法的别名。

### 4.debugger 语句

`debugger`语句主要用于除错，作用是设置断点。如果有正在运行的除错工具，程序运行到`debugger`语句时会自动停下。如果没有除错工具，`debugger`语句不会产生任何结果，JavaScript 引擎自动跳过这一句。

Chrome 浏览器中，当代码运行到`debugger`语句时，就会暂停运行，自动打开脚本源码界面。

```javascript
for (var i = 0; i < 5; i++) {
  console.log(i);
  if (i === 2) debugger;
}
```

上面代码打印出 0，1，2 以后，就会暂停，自动打开源码界面，等待进一步处理。

## 十一.错误处理机制

### 1.Error 实例对象

JavaScript 解析或运行时，一旦发生错误，引擎就会抛出一个错误对象。JavaScript 原生提供`Error`构造函数，所有抛出的错误都是这个构造函数的实例。

```javascript
var err = new Error("出错了");
err.message; // "出错了"
```

上面代码中，我们调用`Error`构造函数，生成一个实例对象 err。`Error`构造函数接受一个参数，表示错误提示，可以从实例的`message`属性读到这个参数。抛出`Error`实例对象以后，整个程序就中断在发生错误的地方，不再往下执行。

JavaScript 语言标准只提到，`Error`实例对象必须有`message`属性，表示出错时的提示信息，没有提到其他属性。大多数 JavaScript 引擎，对`Error`实例还提供`name`和`stack`属性，分别表示错误的名称和错误的堆栈，但它们是非标准的，不是每种实现都有。

- message：错误提示信息
- name：错误名称（非标准属性）
- stack：错误的堆栈（非标准属性）

使用`name`和`message`这两个属性，可以对发生什么错误有一个大概的了解。

```javascript
if (error.name) {
  console.log(error.name + ": " + error.message);
}
```

`stack`属性用来查看错误发生时的堆栈。

```javascript
function throwit() {
  throw new Error("");
}

function catchit() {
  try {
    throwit();
  } catch (e) {
    console.log(e.stack); // print stack trace
  }
}

catchit();
// Error
//    at throwit (~/examples/throwcatch.js:9:11)
//    at catchit (~/examples/throwcatch.js:3:9)
//    at repl:1:5
```

上面代码中，错误堆栈的最内层是 throwit 函数，然后是 catchit 函数，最后是函数的运行环境。

### 2.原生错误类型

`Error`实例对象是最一般的错误类型，在它的基础上，JavaScript 还定义了其他 6 种错误对象。也就是说，存在`Error`的 6 个派生对象。

#### 1.SyntaxError 对象

`SyntaxError`对象是解析代码时发生的语法错误。

#### 2.ReferenceError 对象

`ReferenceError`对象是引用一个不存在的变量时发生的错误。

另一种触发场景是，将一个值分配给无法分配的对象，比如对函数的运行结果或者 this 赋值。

#### 3.RangeError 对象

`RangeError`对象是一个值超出有效范围时发生的错误。主要有几种情况，一是数组长度为负数，二是`Number`对象的方法参数超出范围，以及函数堆栈超过最大值。

#### 4.TypeError 对象

`TypeError`对象是变量或参数不是预期类型时发生的错误。比如，对字符串、布尔值、数值等原始类型的值使用 new 命令，就会抛出这种错误，因为 new 命令的参数应该是一个构造函数。

调用对象不存在的方法，也会抛出 TypeError 错误，因为方法的值是`undefined`，而不是一个函数。

#### 5.URIError 对象

`URIError`对象是 URI 相关函数的参数不正确时抛出的错误，主要涉及`encodeURI()`、`decodeURI()`、`encodeURIComponent()`、`decodeURIComponent()`、`escape()`和`unescape()`这六个函数。

#### 6.EvalError 对象

`eval`函数没有被正确执行时，会抛出`EvalError`错误。该错误类型已经不再使用了，只是为了保证与以前代码兼容，才继续保留。

#### 7.总结

以上这 6 种派生错误，连同原始的`Error`对象，都是构造函数。开发者可以使用它们，手动生成错误对象的实例。这些构造函数都接受一个函数，代表错误提示信息（message）。

```javascript
var err1 = new Error("出错了！");
var err2 = new RangeError("出错了，变量超出有效范围！");
var err3 = new TypeError("出错了，变量类型无效！");

err1.message; // "出错了！"
err2.message; // "出错了，变量超出有效范围！"
err3.message; // "出错了，变量类型无效！"
```

### 3.自定义错误

除了 JavaScript 原生提供的七种错误对象，还可以定义自己的错误对象。

```javascript
function UserError(message) {
  this.message = message || "默认信息";
  this.name = "UserError";
}

UserError.prototype = new Error();
UserError.prototype.constructor = UserError;
```

上面代码自定义一个错误对象`UserError`，让它继承`Error`对象。然后，就可以生成这种自定义类型的错误了。

`new UserError('这是自定义的错误！');`

### 4.throw 语句

`throw`语句的作用是手动中断程序执行，抛出一个错误。

```javascript
if (x < 0) {
  throw new Error("x 必须为正数");
}
// Uncaught ReferenceError: x is not defined
```

上面代码中，如果变量 x 小于 0，就手动抛出一个错误，告诉用户 x 的值不正确，整个程序就会在这里中断执行。可以看到，`throw`抛出的错误就是它的参数，这里是一个 Error 实例。`throw`也可以抛出自定义错误。

实际上，`throw`可以抛出任何类型的值。也就是说，它的参数可以是任何值。

对于 JavaScript 引擎来说，遇到`throw`语句，程序就中止了。引擎会接收到`throw`抛出的信息，可能是一个错误实例，也可能是其他类型的值。

### 5.try…catch 结构

一旦发生错误，程序就中止执行了。JavaScript 提供了`try...catch`结构，允许对错误进行处理，选择是否往下执行。

```javascript
try {
  throw new Error("出错了!");
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

```javascript
try {
  f();
} catch (e) {
  // 处理错误
}
```

`catch`代码块捕获错误之后，程序不会中断，会按照正常流程继续执行下去。

`catch`代码块之中，还可以再抛出错误，甚至使用嵌套的`try...catch`结构。

```javascript
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

```javascript
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

```javascript
function cleansUp() {
  try {
    throw new Error("出错了……");
    console.log("此行不会执行");
  } finally {
    console.log("完成清理工作");
  }
}

cleansUp();
// 完成清理工作
// Error: 出错了……
```

上面代码中，由于没有`catch`语句块，所以错误没有捕获。执行`finally`代码块以后，程序就中断在错误抛出的地方。

```javascript
function idle(x) {
  try {
    console.log(x);
    return "result";
  } finally {
    console.log("FINALLY");
  }
}

idle("hello");
// hello
// FINALLY
// "result"
```

上面代码说明，`try`代码块没有发生错误，而且里面还包括`return`语句，但是`finally`代码块依然会执行。注意，只有在其执行完毕后，才会显示`return`语句的值。

下面的例子说明，`return`语句的执行是排在`finally`代码之前，只是等`finally`代码执行完毕后才返回。

```javascript
var count = 0;
function countUp() {
  try {
    return count;
  } finally {
    count++;
  }
}

countUp();
// 0
count;
// 1
```

上面代码说明，`return`语句的`count`的值，是在`finally`代码块运行之前就获取了。

下面是`finally`代码块用法的典型场景。

```javascript
openFile();

try {
  writeFile(Data);
} catch (e) {
  handleError(e);
} finally {
  closeFile();
}
```

上面代码首先打开一个文件，然后在`try`代码块中写入文件，如果没有发生错误，则运行`finally`代码块关闭文件；一旦发生错误，则先使用`catch`代码块处理错误，再使用`finally`代码块关闭文件。

下面的例子充分反映了`try...catch...finally`这三者之间的执行顺序。

```javascript
function f() {
  try {
    console.log(0);
    throw "bug";
  } catch (e) {
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

result;
// false
```

上面代码中，`catch`代码块结束执行之前，会先执行`finally`代码块。

`catch`代码块之中，触发转入`finally`代码快的标志，不仅有`return`语句，还有`throw`语句。

```javascript
function f() {
  try {
    throw "出错了！";
  } catch (e) {
    console.log("捕捉到内部错误");
    throw e; // 这句原本会等到finally结束再执行
  } finally {
    return false; // 直接返回
  }
}

try {
  f();
} catch (e) {
  // 此处不会执行
  console.log('caught outer "bogus"');
}

//  捕捉到内部错误
```

上面代码中，进入`catch`代码块之后，一遇到`throw`语句，就会去执行`finally`代码块，其中有`return false`语句，因此就直接返回了，不再会回去执行`catch`代码块剩下的部分了。

