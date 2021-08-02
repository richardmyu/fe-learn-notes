# 十 console.log 对象

`console` 对象是 JavaScript 的原生对象，它有点像 Unix 系统的标准输出 `stdout` 和标准错误 `stderr`，可以输出各种信息到控制台，并且还提供了很多有用的辅助方法。

`console` 的常见用途有两个。

- 调试程序，显示网页代码运行时的错误信息。
- 提供了一个命令行接口，用来与网页代码互动。

## 1 浏览器实现

`console` 对象的浏览器实现，包含在浏览器自带的开发工具之中。

`Console` 面板基本上就是一个命令行窗口，你可以在提示符下，键入各种命令。

## 2 console 对象的静态方法

`console` 对象提供的各种静态方法，用来与控制台窗口互动。

### 2.1 console.log()，console.info()，console.debug()

`console.log` 方法用于在控制台输出信息。它可以接受一个或多个参数，将它们连接起来输出。`console.log` 方法会自动在每次输出的结尾，添加换行符。

```javascript
console.log("first", "second", "third"); //first second third
var a = "first";
var b = "second";
var c = "third";
console.log(a, b, c); //first second third
```

如果第一个参数是格式字符串（使用了格式占位符），`console.log` 方法将依次用后面的参数替换占位符，然后再进行输出。

```javascript
console.log(" %s + %s = %s", 1, 1, 2);
//  1 + 1 = 2
```

上面代码中，`console.log` 方法的第一个参数有三个占位符（`%s`），第二、三、四个参数会在显示时，依次替换掉这个三个占位符。

`console.log` 方法支持以下占位符，不同类型的数据必须使用对应的占位符。

---

- `%s` 字符串
- `%d` 整数
- `%i` 整数
- `%f` 浮点数
- `%o` 对象的链接
- `%c` CSS 格式字符串

---

> 当然参数可以结合在一起使用。区别 string 1 和 number 1 是 string 1 为灰色，而 number 1 为蓝色。在接下来的代码中只有需要显示区分时，用 'number' 表示 string-number，默认情况下根据条件区分。

```javascript
// %s 会将非字符串的参数转为字符串形式
console.log("%s", 1); //1
console.log("%s", "a"); //a
console.log(" %s + %s = %s", {}, [1], "c", "d"); //Object + Array(1) = c d

// %d & %i 都只能识别 number 类型
console.log(" %d + %i + %f", 1, 1, 1); //1 + 1 + 1
console.log(" %d + %i + %f", "a", "b", "c"); //NaN + NaN + NaN
console.log(" %d + %i + %f", "1", "2", "3"); //NaN + NaN + NaN
// %f 较 %d & %i 能识别浮点数
console.log(" %d + %i + %f", 1.0000001, 1.0000001, 1.0000001); //1 + 1 + 1.0000001
console.log(" %d + %i + %f", 3e7, 3e7, 3e7); //30000000 + 30000000 + 30000000
// 三者都能识别八进制、十六进制和二进制
console.log(" %d + %i + %f", 0123, 0123, 0123); //83 + 83 + 83
console.log(" %d + %i + %f", 0o123, 0o123, 0o123); //83 + 83 + 83
console.log(" %d + %i + %f", 0x123, 0x123, 0x123); //291 + 291 + 291
console.log(" %d + %i + %f", 0b111, 0b111, 0b111); //7 + 7 + 7

// %o 识别 url，但对于不是 www || http/https 开头的字符串会以红色形式输出
console.log(" %o", "www.jkl.com"); //"www.jkl.com"
console.log(" %o", "zxc.jkl.com"); //"zxc.jkl.com"
console.log(" %o", "zxcfhjdghdfj"); //"zxcfhjdghdfj"(字符串内字符为红色)
console.log(" %o", "www.zxcfhjdghdfj"); //"www.zxcfhjdghdfj"(字符串内字符为红色)
console.log(" %o", "http://zxcfhjdghdfj"); //"http://zxcfhjdghdfj"
console.log(" %o", "http://www.jkl.com"); //"http://www.jkl.com"
console.log(" %o", "https://www.jkl.com"); //"https://www.jkl.com"
```

使用 `%c` 占位符时，对应的参数必须是 CSS 代码，用来对输出内容进行 CSS 渲染。

```javascript
console.log(
  "%cThis text is styled!",
  "color: red; background: yellow; font-size: 24px;"
);
```

如果参数是一个对象，`console.log` 会显示该对象的值。

```javascript
console.log({ foo: "bar" }); //Object {foo: "bar"}
console.log({ foo: "bar" }.toString()); //[object Object]
console.log({ foo: "bar" }.valueOf()); //Object {foo: "bar"}

console.log(Date); //f Date() { [native code] }
console.log(Date.toString()); //function Date() { [native code] }
console.log(Date.valueOf()); //f Date() { [native code] }
```

> 可以看到，将对象输出的时候是调用对象的 `valueOf()` 方法。对于其他非 string 类型的数据，也是调用 `valueOf()` 方法。
> 详情见 <a href="./demo/console-log.html" target="_blank">console-log.html</a>

`console.info` 是 `console.log` 方法的别名，用法完全一样。只不过 `console.info` 方法会在输出信息的前面，加上一个蓝色图标(chrome 貌似没有...)。

`console.debug` 方法与 `console.log` 方法类似，会在控制台输出调试信息。但是，默认情况下(默认显示 `info`、`warnings` and `errors`)，`console.debug` 输出的信息不会显示，只有在打开显示级别在 verbose 的情况下，才会显示。

```javascript
console.log("哈哈哈哈"); //哈哈哈哈
console.info("哈哈哈哈"); //哈哈哈哈
console.debug("哈哈哈哈"); //
```

`console` 对象的所有方法，都可以被覆盖。因此，可以按照自己的需要，定义 `console.log` 方法。

```javascript
["log", "info", "warn", "error"].forEach(function(method) {
  console[method] = console[method].bind(console, new Date().toISOString());
});

console.log("出错了！");
// 2018-11-25T07:11:20.779Z 出错了！
```

### 2.2 console.warn()，console.error()

`warn` 方法和 `error` 方法也是在控制台输出信息，它们与 `log` 方法的不同之处在于，`warn` 方法输出信息时，在最前面加一个黄色三角，表示警告；`error` 方法输出信息时，在最前面加一个红色的叉，表示出错。同时，还会高亮显示输出文字和错误发生的堆栈。其他方面都一样。

```javascript
console.error("Error: %s (%i)", "Server is not responding", 500);
// Error: Server is not responding (500)

console.warn("Warning! Too few nodes (%d)", document.childNodes.length);
// Warning! Too few nodes (1)
```

### 2.3 console.table()

对于某些复合类型的数据(数组内每一项都是对象或者简单对象/嵌套对象，但只能将第一层对象解析出来,可以查看 <a href="./demo/console-table.html">console-table.html</a>)，`console.table` 方法可以将其转为表格显示。

```javascript
var languages = [
  { name: "JavaScript", fileExtension: ".js" },
  { name: "TypeScript", fileExtension: ".ts" },
  { name: "CoffeeScript", fileExtension: ".coffee" }
];

console.table(languages);
```

上面代码的 `language` 变量，转为表格显示如下。

| (index) | name           | fileExtension |
| ------- | -------------- | ------------- |
| 0       | “JavaScript”   | “.js”         |
| 1       | “TypeScript”   | “.ts”         |
| 2       | “CoffeeScript” | “.coffee”     |

> 对于数组型复杂数据，`index` 是索引，若是对象则为属性名。

### 2.4 console.count()

`count` 方法用于计数，输出它被调用了多少次。

```javascript
function greet(user) {
  console.count();
  return "hi " + user;
}

greet("bob");
// default: 1
// "hi bob"

greet("alice");
// default: 2
// "hi alice"

greet("bob");
// default: 3
// "hi bob"
```

上面代码每次调用 `greet` 函数，内部的 `console.count` 方法就输出执行次数。

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

> 若传入非 `string` 类型数据会自动转为 `string` 类型。见 <a href="./demo/console-count.html">console-count.html</a>

### 2.5 console.dir()，console.dirxml()

`dir` 方法用来对一个对象进行**检查**（inspect），并以易于阅读和打印的格式显示(即打印出打印对象的详情，而 `log` 只打印部分信息)。

该方法对于输出 DOM 对象非常有用，因为会显示 DOM 对象的所有属性。

`console.dir(document.body)`

Node 环境之中，还可以指定以代码高亮的形式输出。

`console.dir(obj, {colors: true})`

`dirxml` 方法主要用于以*目录树*的形式，显示 DOM 节点。

`console.dirxml(document.body)`

如果参数不是 DOM 节点，而是普通的 JavaScript 对象，`console.dirxml` 等同于 `console.dir`。但注意 `console.dir` 只能识别一个参数，并且对不同数据类型略有差异。简单说对于基本数据类型 `console.dir` 会返回 `string`，而 `console.dirxml` 返回值类似 `console.log`，返回其原始值；而对于复杂数据类型两者返回等同。详情见 <a href="./demo/console-count.html">console-count.html</a>

### 2.6 console.assert()

`console.assert` 方法主要用于程序运行过程中，进行条件判断，如果不满足条件，就显示一个*错误*，但不会中断程序执行。这样就相当于提示用户，内部状态不正确。

它接受两个参数，第一个参数是表达式，第二个参数是字符串(提示字符)。只有当第一个参数为 false，才会提示有错误，在控制台输出第二个参数，否则不会有任何结果。

```javascript
console.assert(false, "判断条件不成立");
// Assertion failed: 判断条件不成立

// 相当于
try {
  throw new Error("判断条件不成立");
} catch (e) {
  console.dir(e);
  console.error(e);
}
```

> 见 <a href="./demo/console-assert.html" target="_blank">console-assert.html</a>

### 2.7 console.time()，console.timeEnd()

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

`time` 方法表示计时开始，`timeEnd` 方法表示计时结束。它们的**参数是计时器的名称**。调用 `timeEnd` 方法之后，控制台会显示“计时器名称: 所耗费的时间”。一个 `time` 方法对应一个 `timeEnd` 方法。否则会抛出警告。见 <a href="./demo/console-time.html">console-time.html</a>

### 2.8 console.group()，console.groupEnd()，console.groupCollapsed()

`console.group` 和 `console.groupEnd` 这两个方法用于将显示的信息分组。它只在输出大量信息时有用，分在一组的信息，可以用鼠标折叠/展开。

```javascript
console.group("一级分组");

console.log("一级分组的内容");

console.group("二级分组");
console.log("二级分组的内容");

console.groupEnd(); // 一级分组结束
console.groupEnd(); // 二级分组结束
```

上面代码会将“二级分组”显示在“一级分组”内部，并且“一级分类”和“二级分类”前面都有一个折叠符号，可以用来折叠本级的内容。

`console.groupCollapsed` 方法与 `console.group` 方法很类似，唯一的区别是该组的内容，在第一次显示时是收起的（collapsed），而不是展开的。

### 2.9 console.trace()，console.clear()

`console.trace` 方法显示当前执行的代码在堆栈中的调用路径，第一次是定义路径。

```javascript
function add(a) {
  return function(b) {
    return function(c) {
      console.trace();
      return a + b + c;
    };
  };
}
// console.trace 为默认名，若传入字符，即为标签名，以显示其分类调用
// (anonymous) 作用域内的函数名（若函数为命名函数）
add(1)(2)(3);
// console.trace console-trace.html:16
// (anonymous) @ console-trace.html:16
// (anonymous) @ console-trace.html:21

add(2)(2)(3);
// console.trace console-trace.html:16
// (anonymous) @ console-trace.html:16
// (anonymous) @ console-trace.html:26

add(3)(2)(3);
// console.trace console-trace.html:16
// (anonymous) @ console-trace.html:16
// (anonymous) @ console-trace.html:31
```

> 细节见 <a href="./demo/console-trace.html" target="_blank">console-trace.html</a>

`console.clear` 方法用于清除当前控制台的所有输出，将光标回置到第一行。如果用户选中了控制台的 “Preserve log” 选项，`console.clear` 方法将不起作用。

## 3 命令行 API

浏览器控制台中，除了使用 `console` 对象，还可以使用一些控制台自带的命令行方法。

### 3.1 `$_`

`$_` 属性返回上一个表达式的值。

### 3.2 `$0` - `$4`

控制台保存了最近 5 个在 Elements 面板选中的 DOM 元素，`$0` 代表倒数第一个（最近一个），`$1` 代表倒数第二个，以此类推直到 `$4`。

### 3.3 `$(selector)`

`$(selector)` 返回第一个匹配的*元素*，等同于 `document.querySelector()`。注意，如果页面脚本对 `$` 有定义，则会覆盖原始的定义。比如，页面里面有 jQuery，控制台执行 `$(selector)` 就会采用 jQuery 的实现，返回一个数组。

### 3.4 `$$(selector)`

`$$(selector)` 返回选中的 _DOM 对象_，等同于 `document.querySelectorAll`。

### 3.5 `$x(path)`

`$x(path)` 方法返回一个数组，包含匹配特定 XPath 表达式的所有 DOM 元素。

`$x("//p[a]")`

上面代码返回所有包含 a 元素的 p 元素。

### 3.6 `inspect(object)`

`inspect(object)` 方法打开相关面板，并选中相应的元素，显示它的细节。DOM 元素在 Elements 面板中显示，比如 `inspect(document)` 会在 Elements 面板显示 document 元素。JavaScript 对象在控制台面板 Profiles 面板中显示，比如 `inspect(window)`。

```javascript
inspect(window);
//Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
```

### 3.7 `getEventListeners(object)`

`getEventListeners(object)` 方法返回一个对象，该对象的成员为 `object` 登记了回调函数的各种事件（比如 `click` 或 `keydown`），每个事件对应一个数组，数组的成员为该事件的回调函数。

```javascript
<div class="btn" onClick="console.log('\(^o^)/~')">
  btn
</div>;

getEventListeners($(".btn"));
//{click: Array(1)}
```

### 3.8 `keys(object)，values(object)`

`keys(object)` 方法返回一个数组，包含 object 的所有键名。

`values(object)` 方法返回一个数组，包含 object 的所有键值。

```javascript
var o = { p1: "a", p2: "b" };

keys(o);
// ["p1", "p2"]
values(o);
// ["a", "b"]
```

### 3.9 monitorEvents(object[, events]) ，unmonitorEvents(object[, events])

`monitorEvents(object[, events])` 方法监听特定对象上发生的特定事件。事件发生时，会返回一个 Event 对象，包含该事件的相关信息。`unmonitorEvents` 方法用于停止监听。

```javascript
monitorEvents(window, "resize");
// resize Event {isTrusted: true, type: "resize", target: Window, currentTarget: Window, eventPhase: 2, …}

monitorEvents(window, ["resize", "scroll"]);
```

上面代码分别表示单个事件和多个事件的监听方法。

`monitorEvents($0, 'mouse');`

`unmonitorEvents($0, 'mousemove');`

上面代码表示如何停止监听。

`monitorEvents` 允许监听同一大类的事件。所有事件可以分成四个大类。

- `mouse：”mousedown”, “mouseup”, “click”, “dblclick”, “mousemove”, “mouseover”, “mouseout”, “mousewheel”`
- `key：”keydown”, “keyup”, “keypress”, “textInput”`
- `touch：”touchstart”, “touchmove”, “touchend”, “touchcancel”`
- `control：”resize”, “scroll”, “zoom”, “focus”, “blur”, “select”, “change”, “submit”, “reset”`

`monitorEvents($("#msg"), "key");`

### 3.10 其他方法

命令行 API 还提供以下方法。

- `clear()`：清除控制台的历史。
- `copy(object)`：复制特定 DOM 元素到剪贴板。
- `dir(object)`：显示特定对象的所有属性，是 `console.dir` 方法的别名。
- `dirxml(object)`：显示特定对象的 XML 形式，是 `console.dirxml` 方法的别名。

## 4 debugger 语句

`debugger` 语句主要用于除错，作用是设置断点。如果有正在运行的除错工具，程序运行到 `debugger` 语句时会自动停下。如果没有除错工具，`debugger` 语句不会产生任何结果，JavaScript 引擎自动跳过这一句。

Chrome 浏览器中，当代码运行到 `debugger` 语句时，就会暂停运行，自动打开脚本源码界面。

```javascript
for (var i = 0; i < 9; i++) {
  console.log(i);
  if (i === 2) debugger;
  if (i === 4) debugger;
  if (i === 6) debugger;
  if (i === 8) debugger;
}
```

上面代码打印出 0，1，2 以后，就会暂停，自动打开源码界面，等待进一步处理。
