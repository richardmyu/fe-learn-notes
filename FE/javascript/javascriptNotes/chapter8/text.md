# JavaScript笔记五

<!-- TOC -->

- [JavaScript笔记五](#javascript笔记五)
  - [九. JSON](#九-json)
    - [1.JSON 格式](#1json-格式)
    - [2.JSON对象](#2json对象)
      - [1.JSON对象](#1json对象)
      - [2.JSON字符串](#2json字符串)
    - [3.JSON.parse()](#3jsonparse)
    - [4.JSON.stringify()](#4jsonstringify)
      - [1.基本用法](#1基本用法)
      - [2.第二个参数](#2第二个参数)
      - [3.第三个参数](#3第三个参数)
      - [4.参数对象的 toJSON 方法](#4参数对象的-tojson-方法)
  - [十.console.log对象](#十consolelog对象)
    - [1.浏览器实现](#1浏览器实现)
    - [2.console 对象的静态方法](#2console-对象的静态方法)
      - [1.console.log()，console.info()，console.debug()](#1consolelogconsoleinfoconsoledebug)
      - [2.console.warn()，console.error()](#2consolewarnconsoleerror)
      - [3.console.table()](#3consoletable)
        - [4.console.count()](#4consolecount)
      - [5.console.dir()，console.dirxml()](#5consoledirconsoledirxml)
      - [6.console.assert()](#6consoleassert)
      - [7.console.time()，console.timeEnd()](#7consoletimeconsoletimeend)
      - [8.console.group()，console.groupEnd()，console.groupCollapsed()](#8consolegroupconsolegroupendconsolegroupcollapsed)
      - [9.console.trace()，console.clear()](#9consoletraceconsoleclear)
    - [3.命令行 API](#3命令行-api)
      - [1.`$_`](#1_)
      - [2.`$0` - `$4`](#20---4)
      - [3.`$(selector)`](#3selector)
      - [4.`$$(selector)`](#4selector)
      - [5.`$x(path)`](#5xpath)
      - [6.`inspect(object)`](#6inspectobject)
      - [7.`getEventListeners(object)`](#7geteventlistenersobject)
      - [8.`keys(object)，values(object)`](#8keysobjectvaluesobject)
      - [9.`monitorEvents(object[, events]) ，unmonitorEvents(object[, events])`](#9monitoreventsobject-events-unmonitoreventsobject-events)
      - [10.其他方法](#10其他方法)
    - [4.debugger 语句](#4debugger-语句)
  - [十二.JQurey](#十二jqurey)
    - [1.链式写法](#1链式写法)
    - [2.jQurey选择器](#2jqurey选择器)
        - [1.基本选择器](#1基本选择器)
        - [2.层级选择器](#2层级选择器)
        - [3.基本过滤选择器](#3基本过滤选择器)
        - [4.内容过滤选择器(不常用)](#4内容过滤选择器不常用)
        - [5.可见性过滤选择器](#5可见性过滤选择器)
        - [6.属性过滤选择器](#6属性过滤选择器)
        - [7.子元素过滤选择器](#7子元素过滤选择器)
        - [8.状态过滤选择器](#8状态过滤选择器)
        - [9.表单选择器](#9表单选择器)
    - [3.属性](#3属性)
      - [1.获取/设置内容或属性](#1获取设置内容或属性)
        - [1.1 attr()](#11-attr)
        - [1.2 prop()](#12-prop)
        - [1.3 text()、html()、val()](#13-texthtmlval)
      - [2.添加属性](#2添加属性)
        - [2.1 `append()`](#21-append)
        - [2.2 `元素.appendTo(父级)`](#22-元素appendto父级)
        - [2.3 `prepend()`](#23-prepend)
        - [2.4 `after()/before()`](#24-afterbefore)
        - [2.5 `insetBefore()/insetAfter()`](#25-insetbeforeinsetafter)
      - [3.删除属性](#3删除属性)
        - [3.1 `remove()`](#31-remove)
        - [3.2 `empty()`](#32-empty)
        - [3.3 `removeAttr() `](#33-removeattr-)
        - [3.4 `replaceAll(选择器)`](#34-replaceall选择器)
      - [4.获取并设置css类](#4获取并设置css类)
        - [4.1 `addClass()`](#41-addclass)
        - [4.2 `removeClass()`](#42-removeclass)
        - [4.3 `toggleClass()`](#43-toggleclass)
        - [4.4 `css()`](#44-css)
      - [5.尺寸](#5尺寸)
        - [5.1 width()/height()](#51-widthheight)
        - [5.2 innerWidth()/innerHeight()](#52-innerwidthinnerheight)
        - [5.3 outerWidth()/outerHeight()](#53-outerwidthouterheight)
        - [5.4 `offset()`](#54-offset)
        - [5.5 `scrollTop()/scrollLeft()`](#55-scrolltopscrollleft)
    - [4.遍历](#4遍历)
      - [1.祖先](#1祖先)
        - [1.1 parent()](#11-parent)
        - [1.2 parents()](#12-parents)
        - [1.3 parentsUntil()](#13-parentsuntil)
      - [2.后代](#2后代)
        - [2.1 children()](#21-children)
        - [2.2 find()](#22-find)
      - [3.siblings](#3siblings)
        - [3.1 siblings()](#31-siblings)
        - [3.2 `next()/prev()`](#32-nextprev)
        - [3.3 `nextAll()/prevAll()`](#33-nextallprevall)
        - [3.4 `nextUntil()/prevUntil()`](#34-nextuntilprevuntil)
    - [5.过滤](#5过滤)
      - [1.指定过滤](#1指定过滤)
        - [1.1 `first()/last()`](#11-firstlast)
        - [1.2 `eq()`](#12-eq)
      - [2.匹配过滤](#2匹配过滤)
        - [2.1 `filter()`](#21-filter)
        - [2.2 `not()`](#22-not)
        - [2.3 `each()`](#23-each)
        - [2.4 `map()`](#24-map)
    - [6.事件](#6事件)
      - [1.鼠标事件](#1鼠标事件)
        - [1.1 click()](#11-click)
        - [1.2 dblclick()](#12-dblclick)
        - [1.3 mouseenter()](#13-mouseenter)
        - [1.4 mouseleave()](#14-mouseleave)
        - [1.5 mousedown()](#15-mousedown)
        - [1.6 mouseup()](#16-mouseup)
        - [1.7 mousemove()](#17-mousemove)
        - [1.8 mouseover()](#18-mouseover)
        - [1.9 mouseout()](#19-mouseout)
        - [1.10 hover()](#110-hover)
      - [2.键盘事件](#2键盘事件)
        - [2.1 keydown()](#21-keydown)
        - [2.2 keypress()](#22-keypress)
        - [2.3 keyup()](#23-keyup)
      - [3.表单事件](#3表单事件)
        - [3.1 focus()](#31-focus)
        - [3.2 focusin()](#32-focusin)
        - [3.3 focusout()](#33-focusout)
        - [3.4 blur()](#34-blur)
        - [3.5 change()](#35-change)
      - [4.文档/窗口事件](#4文档窗口事件)
        - [4.1 resize()](#41-resize)
        - [4.2 scroll()](#42-scroll)
        - [4.3 select()](#43-select)
        - [4.4 submit()](#44-submit)
      - [5.event事件](#5event事件)
        - [5.1 event.currentTarget 属性](#51-eventcurrenttarget-属性)
        - [5.2 event.data 属性](#52-eventdata-属性)
        - [5.3 event.delegateTarget 属性](#53-eventdelegatetarget-属性)
        - [5.4 event.isDefaultPrevented()](#54-eventisdefaultprevented)
        - [5.5 event.isImmediatePropagationStopped()](#55-eventisimmediatepropagationstopped)
        - [5.6 event.isPropagationStopped()](#56-eventispropagationstopped)
        - [5.7 event.namespace 属性](#57-eventnamespace-属性)
        - [5.8 event.pageX/event.pageY 属性](#58-eventpagexeventpagey-属性)
        - [5.9 event.preventDefault()](#59-eventpreventdefault)
        - [5.10 event.relatedTarget 属性](#510-eventrelatedtarget-属性)
        - [5.11 event.result 属性](#511-eventresult-属性)
        - [5.12 event.stopImmediatePropagation()](#512-eventstopimmediatepropagation)
        - [5.13 event.stopPropagation()](#513-eventstoppropagation)
        - [5.14 event.target 属性](#514-eventtarget-属性)
        - [5.15 event.timeStamp 属性](#515-eventtimestamp-属性)
        - [5.16 event.type 属性](#516-eventtype-属性)
        - [5.17 event.which 属性](#517-eventwhich-属性)
        - [5.18 event.metakey 属性](#518-eventmetakey-属性)
      - [6.其他事件](#6其他事件)
        - [6.1 on()](#61-on)
        - [6.2 off()](#62-off)
        - [6.3 one()](#63-one)
        - [6.4 $.proxy 方法](#64-proxy-方法)
        - [6.5 ready()](#65-ready)
        - [6.6 holdReady()](#66-holdready)
        - [6.7 trigger()](#67-trigger)
        - [6.8 triggerHandler()](#68-triggerhandler)
    - [7.效果和动画](#7效果和动画)
      - [1.隐藏/显示](#1隐藏显示)
        - [1.1 hide()/show()](#11-hideshow)
        - [1.2 toggle()](#12-toggle)
      - [2.淡入淡出](#2淡入淡出)
        - [2.1 fadeIn()](#21-fadein)
        - [2.2 fadeOut()](#22-fadeout)
        - [2.3 fadeToggle()](#23-fadetoggle)
        - [2.4 fadeTo()](#24-fadeto)
      - [3.滑动（收展）](#3滑动收展)
        - [3.1 slideDown()](#31-slidedown)
        - [3.2 slideUp()](#32-slideup)
        - [3.3 slideToggle()](#33-slidetoggle)
      - [4.动画](#4动画)
        - [4.1 animate()](#41-animate)
        - [4.2 使用相对值](#42-使用相对值)
        - [4.3 使用预定义的值](#43-使用预定义的值)
        - [4.4 使用队列功能](#44-使用队列功能)
      - [5.停止动画](#5停止动画)
        - [5.1 delay(ms)](#51-delayms)
        - [5.2 stop()](#52-stop)
        - [5.3 queue()](#53-queue)
        - [5.4 dequeue()](#54-dequeue)
        - [5.5 clearQueue()](#55-clearqueue)
      - [6.callback](#6callback)
    - [8.AJAX](#8ajax)
      - [1.load()](#1load)
      - [2.get() 和 post()](#2get-和-post)
        - [2.1 $.get()](#21-get)
        - [2.2 `$.post()`](#22-post)
      - [3.ajax()](#3ajax)
      - [4.ajaxSetup()](#4ajaxsetup)
      - [5.getJSON()](#5getjson)
      - [6.getScript()](#6getscript)
      - [7.param()](#7param)
      - [8.serialize()](#8serialize)
      - [9.serializeArray()](#9serializearray)
    - [9.其他方法](#9其他方法)
      - [1.data()](#1data)
      - [2.each()](#2each)
      - [3.get()](#3get)
      - [4.index()](#4index)
      - [5.noConflict](#5noconflict)
    - [10.JSONP](#10jsonp)
    - [11.小技巧](#11小技巧)
        - [1.JQ变量](#1jq变量)
        - [2.禁止右键](#2禁止右键)
        - [3.阻止a标签跳转](#3阻止a标签跳转)
        - [4.鼠标键值](#4鼠标键值)
        - [5.关闭动画效果](#5关闭动画效果)
        - [6.`$.trim()`   去除首尾空格](#6trim---去除首尾空格)
        - [8.`isEmptyObject()`  判断是否空对象](#8isemptyobject--判断是否空对象)
        - [9.`isPlainObject()`  判断是否对象](#9isplainobject--判断是否对象)
  - [十三.移动端](#十三移动端)
    - [1.新标签](#1新标签)
    - [2.表单元素](#2表单元素)
    - [3.字体图标](#3字体图标)
    - [4.audio & video](#4audio--video)
    - [5.本地储存和浏览器储存](#5本地储存和浏览器储存)
  - [十四.交互](#十四交互)
    - [1.CMD基本命令](#1cmd基本命令)
    - [2.网站发布](#2网站发布)
    - [3.请求网页、URL解析](#3请求网页url解析)

<!-- /TOC -->

## 九. JSON

### 1.JSON 格式

JSON 格式（JavaScript Object Notation 的缩写）是一种用于数据交换的文本格式，2001年由 Douglas Crockford 提出，目的是取代繁琐笨重的 XML 格式。

相比 XML 格式，JSON 格式有两个显著的优点：书写简单，一目了然；符合 JavaScript 原生语法，可以由解释引擎直接处理，不用另外添加解析代码。所以，JSON 迅速被接受，已经成为各大网站交换数据的标准格式，并被写入标准。

JSON 对值的类型和格式有严格的规定。

- 1.复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。

- 2.原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和`null`（不能使用`NaN`, `Infinity`, `-Infinity`和`undefined`）。

- 3.字符串必须使用双引号表示，不能使用单引号。

- 4.对象的键名必须放在双引号里面。

- 5.数组或对象最后一个成员的后面，不能加逗号。

> 注意，null、空数组和空对象都是合法的 JSON 值。

### 2.JSON对象

#### 1.JSON对象

```
var dataObj=[{"name":"a","age":2},
        {"name":"b","age":12},
        {"name":"c","age":22},
        {"name":"d","age":32}];
```

#### 2.JSON字符串

把JSON对象使用单引号包起来

```
    var dataStr='[{"name":"a","age":2},
        {"name":"b","age":12},
        {"name":"c","age":22},
        {"name":"d","age":32}]';
```

### 3.JSON.parse()

将JSON字符串变成JSON对象(数组形式)

```
JSON.parse('{}') // {}
JSON.parse('"foo"') // "foo"
JSON.parse('[1, 5, "false"]') // [1, 5, "false"]
JSON.parse('null') // null
```

如果传入的字符串不是有效的 JSON 格式，`JSON.parse`方法将报错。

```
JSON.parse("'String'") // illegal single quotes
// SyntaxError: Unexpected token ILLEGAL
```

上面代码中，双引号字符串中是一个单引号字符串，因为单引号字符串不符合 JSON 格式，所以报错。

为了处理解析错误，可以将`JSON.parse`方法放在`try...catch`代码块中。

`JSON.parse`方法可以接受一个处理函数，作为第二个参数，用法与`JSON.stringify`方法类似。

```
function f(key, value) {
  if (key === 'a') {
    return value + 10;
  }
  return value;
}

JSON.parse('{"a": 1, "b": 2}', f)
// {a: 11, b: 2}
```

### 4.JSON.stringify()

#### 1.基本用法

将JSON对象(数组形式)串变成JSON字符

> 注意，对于原始类型的字符串，转换结果会带双引号。

```
JSON.stringify('foo') === "foo" // false
JSON.stringify('foo') === "\"foo\"" // true
```

上面代码中，字符串foo，被转成了"\"foo"\"。这是因为将来还原的时候，内层双引号可以让 JavaScript 引擎知道，这是一个字符串，而不是其他类型的值。

如果对象的属性是`undefined`、函数或 XML 对象，该属性会被`JSON.stringify`过滤。

如果数组的成员是`undefined`、函数或 XML 对象，则这些值被转成`null`。

正则对象会被转成空对象。

`JSON.stringify`方法会忽略对象的不可遍历属性。

```
var obj = {};
Object.defineProperties(obj, {
  'foo': {
    value: 1,
    enumerable: true
  },
  'bar': {
    value: 2,
    enumerable: false
  }
});

JSON.stringify(obj); // "{"foo":1}"
```

#### 2.第二个参数

`JSON.stringify`方法还可以接受一个数组，作为第二个参数，指定需要转成字符串的属性。

```
var obj = {
  'prop1': 'value1',
  'prop2': 'value2',
  'prop3': 'value3'
};

var selectedProperties = ['prop1', 'prop2'];

JSON.stringify(obj, selectedProperties)
// "{"prop1":"value1","prop2":"value2"}"
```

这个类似白名单的数组，只对对象的属性有效，对数组无效。

```
JSON.stringify(['a', 'b'], ['0'])
// "["a","b"]"

JSON.stringify({0: 'a', 1: 'b'}, ['0'])
// "{"0":"a"}"
```

上面代码中，第二个参数指定 JSON 格式只转0号属性，实际上对数组是无效的，只对对象有效。

第二个参数还可以是一个函数，用来更改`JSON.stringify`的返回值。

```
function f(key, value) {
  if (typeof value === "number") {
    value = 2 * value;
  }
  return value;
}

JSON.stringify({ a: 1, b: 2 }, f)
// '{"a": 2,"b": 4}'
```

上面代码中的f函数，接受两个参数，分别是被转换的对象的键名和键值。如果键值是数值，就将它乘以2，否则就原样返回。

> 注意，这个处理函数是递归处理所有的键。

```
var o = {a: {b: 1}};

function f(key, value) {
  console.log("["+ key +"]:" + value);
  return value;
}

JSON.stringify(o, f)
// []:[object Object]
// [a]:[object Object]
// [b]:1
// '{"a":{"b":1}}'
```

上面代码中，对象o一共会被f函数处理三次，最后那行是`JSON.stringify`的输出。第一次键名为空，键值是整个对象o；第二次键名为a，键值是{b: 1}；第三次键名为b，键值为1。

递归处理中，每一次处理的对象，都是前一次返回的值。

```
var o = {a: 1};

function f(key, value) {
  if (typeof value === 'object') {
    return {b: 2};
  }
  return value * 2;
}

JSON.stringify(o, f)
// "{"b": 4}"
```

上面代码中，f函数修改了对象o，接着`JSON.stringify`方法就递归处理修改后的对象o。

如果处理函数返回`undefined`或没有返回值，则该属性会被忽略。

```
function f(key, value) {
  if (typeof(value) === "string") {
    return undefined;
  }
  return value;
}

JSON.stringify({ a: "abc", b: 123 }, f)
// '{"b": 123}'
```

上面代码中，a属性经过处理后，返回`undefined`，于是该属性被忽略了。

#### 3.第三个参数

`JSON.stringify`还可以接受第三个参数，用于增加返回的 JSON 字符串的可读性。如果是数字，表示每个属性前面添加的空格（最多不超过10个）；如果是字符串（不超过10个字符），则该字符串会添加在每行前面。

```
JSON.stringify({ p1: 1, p2: 2 }, null, 2);
/*
"{
  "p1": 1,
  "p2": 2
}"
*/

JSON.stringify({ p1:1, p2:2 }, null, '|-');
/*
"{
|-"p1": 1,
|-"p2": 2
}"
*/
```

#### 4.参数对象的 toJSON 方法

如果参数对象有自定义的`toJSON`方法，那么`JSON.stringify`会使用这个方法的返回值作为参数，而忽略原对象的其他属性。

下面是一个普通的对象。

```
var user = {
  firstName: '三',
  lastName: '张',

  get fullName(){
    return this.lastName + this.firstName;
  }
};

JSON.stringify(user)
// "{"firstName":"三","lastName":"张","fullName":"张三"}"
```

现在，为这个对象加上`toJSON`方法。

```
var user = {
  firstName: '三',
  lastName: '张',

  get fullName(){
    return this.lastName + this.firstName;
  },

  toJSON: function () {
    return {
      name: this.lastName + this.firstName
    };
  }
};

JSON.stringify(user)
// "{"name":"张三"}"
```

上面代码中，`JSON.stringify`发现参数对象有`toJSON`方法，就直接使用这个方法的返回值作为参数，而忽略原对象的其他参数。

`Date`对象就有一个自己的`toJSON`方法。

```
var date = new Date('2015-01-01');
date.toJSON() // "2015-01-01T00:00:00.000Z"
JSON.stringify(date) // ""2015-01-01T00:00:00.000Z""
```

上面代码中，`JSON.stringify`发现处理的是Date对象实例，就会调用这个实例对象的`toJSON`方法，将该方法的返回值作为参数。

`toJSON`方法的一个应用是，将正则对象自动转为字符串。因为`JSON.stringify`默认不能转换正则对象，但是设置了`toJSON`方法以后，就可以转换正则对象了。

```
var obj = {
  reg: /foo/
};

// 不设置 toJSON 方法时
JSON.stringify(obj) // "{"reg":{}}"

// 设置 toJSON 方法时
RegExp.prototype.toJSON = RegExp.prototype.toString;
JSON.stringify(/foo/) // ""/foo/""
```

上面代码在正则对象的原型上面部署了`toJSON`方法，将其指向`toString`方法，因此遇到转换成JSON时，正则对象就先调用`toJSON`方法转为字符串，然后再被`JSON.stingify`方法处理。



在低版本IE下没有JSON

```
    function toObj(str) {
        if("JSON" in window){
            return JSON.parse(str)
        }else {
            return eval(str);
        }
    }
```

> 1.`{}`表示对象千万不要放在行首，要置于行首可以使用一个`()`包起来，保证语法正确  `({a:1,b:2});`

> 2.以后eval字符串中遇到转为对象的大括号时候,一定要使用小括号`()`包起来  `eval("("+{}+")");`

## 十.console.log对象

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

如果第一个参数是格式字符串（使用了格式占位符），console.log方法将依次用后面的参数替换占位符，然后再进行输出。

```
console.log(' %s + %s = %s', 1, 1, 2)
//  1 + 1 = 2
```

上面代码中，`console.log`方法的第一个参数有三个占位符（`%s`），第二、三、四个参数会在显示时，依次替换掉这个三个占位符。

`console.log`方法支持以下占位符，不同类型的数据必须使用对应的占位符。

- --
- `%s` 字符串
- `%d` 整数
- `%i` 整数
- `%f` 浮点数
- `%o` 对象的链接
- `%c` CSS 格式字符串
- --

使用`%c`占位符时，对应的参数必须是 CSS 代码，用来对输出内容进行CSS渲染。

```
console.log(
  '%cThis text is styled!',
  'color: red; background: yellow; font-size: 24px;'
)
```

`console.log`方法的两种参数格式，可以结合在一起使用。

```
console.log(' %s + %s ', 1, 1, '= 2')
// 1 + 1  = 2
```

如果参数是一个对象，`console.log`会显示该对象的值。

```
console.log({foo: 'bar'})
// Object {foo: "bar"}
console.log(Date)
// function Date() { [native code] }
```

上面代码输出Date对象的值，结果为一个构造函数。

`console.info`是`console.log`方法的别名，用法完全一样。只不过`console.info`方法会在输出信息的前面，加上一个蓝色图标。

`console.debug`方法与`console.log`方法类似，会在控制台输出调试信息。但是，默认情况下，`console.debug`输出的信息不会显示，只有在打开显示级别在verbose的情况下，才会显示。

`console`对象的所有方法，都可以被覆盖。因此，可以按照自己的需要，定义`console.log`方法。

```
['log', 'info', 'warn', 'error'].forEach(function(method) {
  console[method] = console[method].bind(
    console,
    new Date().toISOString()
  );
});

console.log("出错了！");
// 2014-05-18T09:00.000Z 出错了！
```

上面代码表示，使用自定义的`console.log`方法，可以在显示结果添加当前时间。

#### 2.console.warn()，console.error()

`warn`方法和`error`方法也是在控制台输出信息，它们与`log`方法的不同之处在于，`warn`方法输出信息时，在最前面加一个黄色三角，表示警告；`error`方法输出信息时，在最前面加一个红色的叉，表示出错。同时，还会高亮显示输出文字和错误发生的堆栈。其他方面都一样。

```
console.error('Error: %s (%i)', 'Server is not responding', 500)
// Error: Server is not responding (500)
console.warn('Warning! Too few nodes (%d)', document.childNodes.length)
// Warning! Too few nodes (1)
```

#### 3.console.table()

对于某些复合类型的数据，`console.table`方法可以将其转为表格显示。

```
var languages = [
  { name: "JavaScript", fileExtension: ".js" },
  { name: "TypeScript", fileExtension: ".ts" },
  { name: "CoffeeScript", fileExtension: ".coffee" }
];

console.table(languages);
```

上面代码的`language`变量，转为表格显示如下。

|(index)|name|fileExtension|
|--|--|--|
|0|“JavaScript”|“.js”|
|1|“TypeScript”|“.ts”|
|2|“CoffeeScript”|“.coffee”|

##### 4.console.count()

`count`方法用于计数，输出它被调用了多少次。

```
function greet(user) {
  console.count();
  return 'hi ' + user;
}

greet('bob')
//  : 1
// "hi bob"

greet('alice')
//  : 2
// "hi alice"

greet('bob')
//  : 3
// "hi bob"
```
上面代码每次调用greet函数，内部的console.count方法就输出执行次数。

该方法可以接受一个字符串作为参数，作为标签，对执行次数进行分类。

```
function greet(user) {
  console.count(user);
  return "hi " + user;
}

greet('bob')
// bob: 1
// "hi bob"

greet('alice')
// alice: 1
// "hi alice"

greet('bob')
// bob: 2
// "hi bob"
```

上面代码根据参数的不同，显示bob执行了两次，alice执行了一次。

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

它接受两个参数，第一个参数是表达式，第二个参数是字符串。只有当第一个参数为false，才会提示有错误，在控制台输出第二个参数，否则不会有任何结果。

```
console.assert(false, '判断条件不成立')
// Assertion failed: 判断条件不成立

// 相当于
try {
  if (false) {
    throw new Error('判断条件不成立');
  }
} catch(e) {
  console.error(e);
}
```

下面是一个例子，判断子节点的个数是否大于等于500。

`console.assert(list.childNodes.length < 500, '节点个数大于等于500')`

#### 7.console.time()，console.timeEnd()

这两个方法用于计时，可以算出一个操作所花费的准确时间。

```
console.time('Array initialize');

var array= new Array(1000000);
for (var i = array.length - 1; i >= 0; i--) {
  array[i] = new Object();
};

console.timeEnd('Array initialize');
// Array initialize: 1914.481ms
```

`time`方法表示计时开始，`timeEnd`方法表示计时结束。它们的参数是计时器的名称。调用`timeEnd`方法之后，控制台会显示“计时器名称: 所耗费的时间”。

#### 8.console.group()，console.groupEnd()，console.groupCollapsed()

`console.group`和`console.groupEnd`这两个方法用于将显示的信息分组。它只在输出大量信息时有用，分在一组的信息，可以用鼠标折叠/展开。

```
console.group('一级分组');
console.log('一级分组的内容');

console.group('二级分组');
console.log('二级分组的内容');

console.groupEnd(); // 一级分组结束
console.groupEnd(); // 二级分组结束
```

上面代码会将“二级分组”显示在“一级分组”内部，并且“一级分类”和“二级分类”前面都有一个折叠符号，可以用来折叠本级的内容。

`console.groupCollapsed`方法与`console.group`方法很类似，唯一的区别是该组的内容，在第一次显示时是收起的（collapsed），而不是展开的。

```
console.groupCollapsed('Fetching Data');

console.log('Request Sent');
console.error('Error: Server not responding (500)');

console.groupEnd();
```

#### 9.console.trace()，console.clear()

`console.trace`方法显示当前执行的代码在堆栈中的调用路径。

```
console.trace()
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

####2.`$0` - `$4`

控制台保存了最近5个在 Elements 面板选中的 DOM 元素，`$0`代表倒数第一个（最近一个），`$1`代表倒数第二个，以此类推直到`$4`。

#### 3.`$(selector)`

`$(selector)`返回第一个匹配的元素，等同于`document.querySelector()`。注意，如果页面脚本对`$`有定义，则会覆盖原始的定义。比如，页面里面有 jQuery，控制台执行`$(selector)`就会采用 jQuery 的实现，返回一个数组。

#### 4.`$$(selector)`

`$$(selector)`返回选中的 DOM 对象，等同于`document.querySelectorAll`。

#### 5.`$x(path)`

`$x(path)`方法返回一个数组，包含匹配特定 XPath 表达式的所有 DOM 元素。

`$x("//p[a]")`

上面代码返回所有包含a元素的p元素。

#### 6.`inspect(object)`

`inspect(object)`方法打开相关面板，并选中相应的元素，显示它的细节。DOM 元素在Elements面板中显示，比如`inspect(document)`会在 Elements 面板显示document元素。JavaScript 对象在控制台面板Profiles面板中显示，比如`inspect(window)`。

#### 7.`getEventListeners(object)`

`getEventListeners(object)`方法返回一个对象，该对象的成员为`object`登记了回调函数的各种事件（比如`click`或`keydown`），每个事件对应一个数组，数组的成员为该事件的回调函数。

#### 8.`keys(object)，values(object)`

`keys(object)`方法返回一个数组，包含object的所有键名。

`values(object)`方法返回一个数组，包含object的所有键值。

```
var o = {'p1': 'a', 'p2': 'b'};

keys(o)
// ["p1", "p2"]
values(o)
// ["a", "b"]
```

#### 9.`monitorEvents(object[, events]) ，unmonitorEvents(object[, events])`

`monitorEvents(object[, events])`方法监听特定对象上发生的特定事件。事件发生时，会返回一个Event对象，包含该事件的相关信息。`unmonitorEvents`方法用于停止监听。

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

上面代码表示监听所有key大类的事件。

#### 10.其他方法

命令行 API 还提供以下方法。

- `clear()`：清除控制台的历史。
- `copy(object)`：复制特定 DOM 元素到剪贴板。
- `dir(object)`：显示特定对象的所有属性，是`console.dir`方法的别名。
- `dirxml(object)`：显示特定对象的 XML 形式，是`console.dirxml`方法的别名。

### 4.debugger 语句

`debugger`语句主要用于除错，作用是设置断点。如果有正在运行的除错工具，程序运行到`debugger`语句时会自动停下。如果没有除错工具，`debugger`语句不会产生任何结果，JavaScript 引擎自动跳过这一句。

Chrome 浏览器中，当代码运行到`debugger`语句时，就会暂停运行，自动打开脚本源码界面。
O
```
for(var i = 0; i < 5; i++){
  console.log(i);
  if (i === 2) debugger;
}
```

上面代码打印出0，1，2以后，就会暂停，自动打开源码界面，等待进一步处理。


## 十二.JQurey

### 1.链式写法

-  核心：return this

`$("#box").css({width:200,height:200,background:"yellow"});`

- 前提：不需要返回值的方法；


### 2.jQurey选择器

使用JQ选择器选择出来的是JQ对象，只能使用JQ中的方法，不能使用原生的方法；

将JQ对象变为原生对象，在后面加一个`[0]`
`$("#box") --> $("#box")[0]`

将原生对象变为JQ对象  -->  `$`（原生对象）

> jquery动画无法操作display属性；可以用CSS()方法；

##### 1.基本选择器

```
1.ID选择器    $("#box")
2.类选择器    $(".box")
3.标签选择器    $(div)
4.通配符选择器    $(*)
5.集合选择器    $()
```

##### 2.层级选择器

```
1.后代选择器    $("div p")
2.子代选择器    $("div>p")
3.下一个弟弟选择器    $("#box+")
4.所有的弟弟选择器    $("#box~")
5.所有特定弟弟选择器    $("#box~div")
```

##### 3.基本过滤选择器

```
1.  el:first 只能选择一个
//$("#list :first")    获取后代中的第一个
//没有空格，取第一个#list

2.  el:last 只能选择一个
//$("#list :first")    获取后代中的最后一个

3.  el:not  一组JQ集合
//$("#box :not(p)")    #box后代中不是p的

4.  el:odd  索引是奇数  一组JQ集合
//$("#list li:odd")

5.  el:even  索引是偶数  一组JQ集合
///$("#list li:even")

6.  el:eq(索引)
//$("#list li:eq(2)")    获取索引为2的li

7.  el:gt(索引)
//$("#list li:eq(2)")    获取索引大于2的li

8.  el:lt(索引)
//$("#list li:eq(2)")    获取索引小于2的li

9.  el:header  所有的h(h1-h6)标签

10. el:animated   选取所有进行动画的标签(JS动画,CSS动画不行)

```

##### 4.内容过滤选择器(不常用)

```
1.  el:contains("内容")
//$("p:contains("O(∩_∩)O哈哈~")")

2.  el:has(选择器)
//$("div:has(p)")    包含标签的div；

3.  el:empty  空元素
//$("div:empty")    没有包含物的标签

4.  el:parent   非空元素
//$("td:parent")    含有子元素或者文本的元素
```

##### 5.可见性过滤选择器

```
1.  :hidden 隐藏元素
//只针对 display：none 这种隐藏方式或 type 为 hidden 的元素
隐藏方式：
 display：none；       从页面中消失，占位不在
 visibility:hidden;     只是不可见，占位还在

2.  :visible 可见元素
除去display：none，皆为可见

```

##### 6.属性过滤选择器

```
1. $("div[p]");  //所有 有p属性的div
自定义属性和内置属性都可以

2. $("div[class=box]");  //所有class=box的div(只能一个)

3. $("div[class!=box]");  //所有class!=box的div

4. $("div[class^=box]");  //所有class以box开头的div

5. $("div[class$=box]");  //所有class以box结尾的div

6. $("div[class*=box]");  //所有class含有box的div

7. $("div[class|=box]");  //所有class=box或者是以"box-"作为前缀的div

8. $("div[class~=box]");  //所有class以空格分开后的class名中含有box的div
```

##### 7.子元素过滤选择器

```
1.  :nth-child(1)  第一个孩子
    $("div p:nth-child(1)");

2.  :nth-child(odd) 是第奇数个孩子
    $("div span:nth-child(odd)");

3.  :nth-child(even) 是第偶数个孩子
    $("div span:nth-child(even)");

4.  :nth-child(3n)   n从1开始 是第3的倍数个孩子
    $("div span:nth-child(3n)");

5.  :first-child

6.  :last-child
```

##### 8.状态过滤选择器

```
$("input:enabled")    // 匹配可用的 input
$("input:disabled")   // 匹配不可用的 input
$("input:checked")    // 匹配选中的 input
$("option:selected")  // 匹配选中的 option
$("#form1 select option:selected");  //下拉选项被选中的元素
```

##### 9.表单选择器

```
$(":input")      //匹配所有 input, textarea, select 和 button 元素
$(":text")       //所有的单行文本框，$(":text") 等价于$("[type=text]")，推荐使用$("input:text")效率更高，下同
$(":password")   //所有密码框
$(":radio")      //所有单选按钮
$(":checkbox")   //所有复选框
$(":submit")     //所有提交按钮
$(":reset")      //所有重置按钮
$(":button")     //所有button按钮
$(":file")       //所有文件域
```

### 3.属性

JQ中不会出现`undefined`和`null`的结果；

JQ中没有返回值的都默认返回`this`，可以实现链式写法

#### 1.获取/设置内容或属性

##### 1.1 attr()

```
//获取/设置元素的属性，一般都是自定义属性，而且这个属性会显示在HTML标签上
//一个参数：获取
//两个参数：设置(第一个参数是属性名，第二个是属性值)
//批量设置：参数写成对象

$("#app").attr("width");
$("#app").attr("width","100px")
$("#app").attr({"width":"100px","height":"100px"})
```

第二个参数也可以是回调函数。回调函数有两个参数：被选元素列表中当前元素的下标，以及原始（旧的）值。然后以函数新值返回预期使用的字符串。

```
$("button").click(function(){
  $("#runoob").attr("href", function(i,origValue){
    return origValue + "/jquery";
  });
});
```

##### 1.2 prop()

```
//设置/获取属性，一般是内置属性
//如果设置的是内置属性，则会显示在HTML标签上；若是自定义属性，则不会显示在HTML标签上；
//用法类似attr();只是设置属性时有所区别；

$("#box").prop("class","box1");
```

##### 1.3 text()、html()、val()

- --
text() - 设置或返回所选元素的文本内容
html() - 设置或返回所选元素的内容（包括 HTML 标记）
val() - 设置或返回表单字段的值
- --

```
//不带参数是获取，带参数是设置
$("#btn1").click(function(){
    $("#test1").text("Hello world!");
});
$("#btn2").click(function(){
    $("#test2").html("<b>Hello world!</b>");
});
$("#btn3").click(function(){
    $("#test3").val("RUNOOB");
});
```

同样拥有回调函数。回调函数有两个参数：被选元素列表中当前元素的下标，以及原始（旧的）值，返回替换的字符串。

#### 2.添加属性

##### 2.1 `append()`

在被选元素的结尾插入内容（仍然该元素的内部）。原生：`父级.appendChild(元素)`

##### 2.2 `元素.appendTo(父级)`

加在父级元素的后面

##### 2.3 `prepend()`

在被选元素的开头(有多个依次插入)插入内容（仍然该元素的内部）。

##### 2.4 `after()/before()`

在被选元素之后/前插入内容。

##### 2.5 `insetBefore()/insetAfter()`

原生：  `父级.insetBefore(元素1，元素2)`
JQ：`JQ对象.insetBefore/insetAfter(指定元素);`

把JQ对象放在指定元素前面/后面

> append/prepend 是在选择元素内部嵌入。after/before 是在元素外面追加。

#### 3.删除属性

##### 3.1 `remove()`

删除被选元素及其子元素。

> `remove()` 方法也可接受一个参数，允许您对被删元素进行过滤。

`$("p").remove(".italic");`

##### 3.2 `empty()`

删除被选元素的子元素。

##### 3.3 `removeAttr() `

```
//删除属性
//删除多个，用空格隔开

$("#box").removeAttr("t");
$("#box").removeAttr("t a ");
```

##### 3.4 `replaceAll(选择器)`

` 替换（JQ对象）.replaceAll(被替换)`
`$("ul").replaceAll("img");`

#### 4.获取并设置css类

##### 4.1 `addClass()`

向被选元素添加一个或多个类

##### 4.2 `removeClass()`

从被选元素删除一个或多个类

##### 4.3 `toggleClass()`

对被选元素进行添加/删除类的切换操作

##### 4.4 `css()`

设置或返回被选元素的一个或多个样式属性。获取的值，带单位；设置时，可以加单位，但是要写成字符串，无单位则可以写成数值形式；

如需返回指定的 CSS 属性的值：

`css("propertyname");`

如需设置指定的 CSS 属性：

`css("propertyname","value");`

设置多个 CSS 属性：

`css({"propertyname":"value","propertyname":"value",...});`

#### 5.尺寸

##### 5.1 width()/height()

`width()` 方法设置或返回元素的宽度（不包括内边距、边框或外边距）。

`height()` 方法设置或返回元素的高度（不包括内边距、边框或外边距）。

##### 5.2 innerWidth()/innerHeight()

对应原生的`clientWidth`和`clientHeight`;不同的是可以设置，修改的内容的`height/width`，不修改`padding`

`innerWidth()` 方法返回元素的宽度（包括内边距）。

`innerHeight()` 方法返回元素的高度（包括内边距）。

##### 5.3 outerWidth()/outerHeight()

对应原生的`offsettWidth`和`offsetHeight`;不同的是可以设置，修改的内容的`height/width`，不修改`padding`和`border`

`outerWidth()` 方法返回元素的宽度（包括内边距和边框）。

`outerHeight()` 方法返回元素的高度（包括内边距和边框）。

> 如果参数为true，则会获取并且把margin加上

##### 5.4 `offset()`

获取当前元素距离body的偏移量

```
$("#list").offset().left;
$("#list").offset().top;
```

##### 5.5 `scrollTop()/scrollLeft()`

没有单位

```
$("document.documentElement").scrollTop(300);
```

### 4.遍历

jQuery 遍历，意为"移动"，用于根据其相对于其他元素的关系来"查找"（或选取）HTML 元素。以某项选择开始，并沿着这个选择移动，直到抵达期望的元素为止。

遍历方法中最大的种类是树遍历（tree-traversal）。

#### 1.祖先

##### 1.1 parent()

返回被选元素的直接父元素。该方法只会向上一级对 DOM 树进行遍历。

##### 1.2 parents()

返回被选元素的所有祖先元素，它一路向上直到文档的根元素 (`<html>`)。也可以使用可选参数来过滤对祖先元素的搜索。

```
$(document).ready(function(){
  $("span").parents("ul");
});
```

##### 1.3 parentsUntil()

返回介于两个给定元素之间的所有祖先元素。

```
//返回介于 <span> 与 <div> 元素之间的所有祖先元素：

$(document).ready(function(){
  $("span").parentsUntil("div");
});
```

#### 2.后代

##### 2.1 children()

返回被选元素的所有直接子元素。该方法只会向下一级对 DOM 树进行遍历。

```
$(document).ready(function(){
  $("div").children("p.1");
});
```

##### 2.2 find()

返回被选元素的后代元素，一路向下直到最后一个后代。(一定要传递参数，查找所有后代，运用`“*”`)

#### 3.siblings

##### 3.1 siblings()

返回被选元素的所有同胞元素。

```
$(document).ready(function(){
  $("h2").siblings("p");
});
```

##### 3.2 `next()/prev()`

返回被选元素的 下/上 一个同胞元素。该方法只返回一个元素。

##### 3.3 `nextAll()/prevAll()`

返回被选元素的所有 下/上 的同胞元素。

##### 3.4 `nextUntil()/prevUntil()`

返回介于两个给定参数之间的所有 下/上 的同胞元素。

```
$(document).ready(function(){
  $("h2").nextUntil("h6");
});
```

### 5.过滤

#### 1.指定过滤

##### 1.1 `first()/last()`

返回被选元素的 首个/最后一个 元素。

##### 1.2 `eq()`

返回被选元素中带有指定索引号的元素(索引号从 0 开始)。

#### 2.匹配过滤

##### 2.1 `filter()`

允许您规定一个标准。不匹配这个标准的元素会被从集合中删除，匹配的元素会被返回。

```
//返回带有类名 "url" 的所有 <p> 元素：

$(document).ready(function(){
  $("p").filter(".url");
});
```

##### 2.2 `not()`

返回不匹配标准的所有元素。

```
//返回不带有类名 "url" 的所有 <p> 元素：

$(document).ready(function(){
  $("p").not(".url");
});
```

##### 2.3 `each()`

```
//参数是一个函数，函数执行时默认传递两个参数，有多少项执行多少次；
//第一个参数是索引
//第二个参数是当前元素（原生元素，是原生对象）
//this指向当前item

    $("#list>li").each(function(index,item){
        console.log(index);
        console.log($(item));
        console.log(this);
    })
```

##### 2.4 `map()`

```
//没有返回值则是空

$("#list>li").map(function(index,iten){});
```

### 6.事件

#### 1.鼠标事件

##### 1.1 click()

`click()` 方法是当按钮点击事件被触发时会调用一个函数。该函数在用户点击 HTML 元素时执行。

```
$("p").click(function(){
  $(this).hide();
});
```

##### 1.2 dblclick()

当双击元素时，会发生 dblclick 事件。

##### 1.3 mouseenter()

当鼠标指针穿过元素时，会发生 mouseenter 事件。

注意：与 `mouseover` 事件不同，`mouseenter` 事件只有在鼠标指针进入被选元素时被触发，`mouseover` 事件在鼠标指针进入任意子元素时也会被触发。

> 提示：该事件通常与 `mouseleave` 事件一起使用。

##### 1.4 mouseleave()

当鼠标指针离开元素时，会发生 mouseleave 事件。

注意：与 mouseout 事件不同，mouseleave 事件只有在鼠标指针离开被选元素时被触发，mouseout 事件在鼠标指针离开任意子元素时也会被触发。

##### 1.5 mousedown()

当鼠标指针移动到元素上方，并按下鼠标按键时，会发生 mousedown 事件。

> 提示：该方法通常与 `mouseup()` 方法一起使用。

##### 1.6 mouseup()

当在元素上松开鼠标按钮时，会发生 mouseup 事件。

##### 1.7 mousemove()

当鼠标指针在指定的元素中移动时，就会发生 mousemove 事件。`mousemove()` 方法触发 mousemove 事件，或添加当发生 mousemove 事件时运行的函数。

注意：用户把鼠标移动一个像素，就会发生一次 mousemove 事件。处理所有 mousemove 事件会耗费系统资源。请谨慎使用该事件。

##### 1.8 mouseover()

当鼠标指针位于元素上方时，会发生 mouseover 事件。`mouseover()` 方法触发 mouseover 事件，或添加当发生 mouseover 事件时运行的函数。

> 提示：该事件通常与 mouseout 事件一起使用。

##### 1.9 mouseout()

当鼠标指针离开被选元素时，会发生 mouseout 事件。

##### 1.10 hover()

`hover()`方法用于模拟光标悬停事件。当鼠标移动到元素上时，会触发指定的第一个函数(mouseenter);当鼠标移出这个元素时，会触发指定的第二个函数(mouseleave)。

```
$("#app").hover(
    // mouseenter
    function () {
        console.log('welcome')
    },
    // mouseleave
    function () {
        console.log('bb')
    }
)
```

> 注意: 如果只指定一个函数，则 `mouseenter` 和 `mouseleave` 都执行它。

#### 2.键盘事件

与 keydown 事件相关的事件顺序：
- --
- keydown - 键按下的过程
- keypress - 键被按下
- keyup - 键被松开
- --

##### 2.1 keydown()

在键盘上按下某键时发生,一直按着则会不断触发（opera浏览器除外）, 它返回的是键盘代码;

```
$(function () {
    $("#app").keydown(function () {
        console.log(event.which)
    });
})

// 1  ==>  97
```

##### 2.2 keypress()

在键盘上按下一个按键，并产生一个字符时发生, 返回ASCII码。注意: `shift、alt、ctrl、esc`等键按下并不会产生字符，所以监听无效 ,换句话说, 只有按下能在屏幕上输出字符的按键时keypress事件才会触发。若一直按着某按键则会不断触发。

```
$(function () {
    $("#app").keypress(function () {
        console.log(event.which)
    });
})

// 1  ==>  49
```

##### 2.3 keyup()

用户松开某一个按键时触发, 与keydown相对, 返回键盘代码.


#### 3.表单事件

##### 3.1 focus()

当元素获得焦点时，发生 focus 事件。当通过鼠标点击选中元素或通过 tab 键定位到元素时，该元素就会获得焦点。

触发被选元素的 focus 事件：

`$(selector).focus()`

添加函数到 focus 事件：

`$(selector).focus(function)`

> 提示：该方法通常与 `blur()` 方法一起使用。

##### 3.2 focusin()

当元素（或在其内的任意元素）获得焦点时发生 `focusin` 事件。当在元素或在其内的任意元素上发生 `focus` 事件时，`focusin()` 方法添加要运行的函数。

与 `focus()` 方法不同的是，`focusin()` 方法在任意子元素获得焦点时也会触发

`$(selector).focusin(function)`

> 提示：当通过鼠标点击选中元素或通过 tab 键定位到元素时，该元素就会获得焦点。

> 提示：该方法通常与 `focusout()` 方法一起使用。

##### 3.3 focusout()

当元素（或在其内的任意元素）失去焦点时发生 `focusout` 事件。当在元素或在其内的任意元素上发生 `focusout` 事件时，`focusout()` 方法添加要运行的函数。

与 `blur()` 方法不同的是，`focusout()` 方法在任意子元素失去焦点时也会触发。

##### 3.4 blur()

当元素失去焦点时，发生 blur 事件。

##### 3.5 change()

当元素的值改变时发生 change 事件（仅适用于表单字段）。

`change()` 方法触发 change 事件，或规定当发生 change 事件时运行的函数。

> 注意：当用于 select 元素时，change 事件会在选择某个选项时发生。当用于 text field 或 text area 时，change 事件会在元素失去焦点时发生。

触发被选元素的 change 事件：

`$(selector).change()`

添加函数到 change 事件：

`$(selector).change(function)`

#### 4.文档/窗口事件

##### 4.1 resize()

当调整浏览器窗口大小时，发生 resize 事件。resize() 方法触发 resize 事件，或规定当发生 focus 事件时运行的函数。

##### 4.2 scroll()

当用户滚动指定的元素时，会发生 scroll 事件。scroll 事件适用于所有可滚动的元素和 window 对象（浏览器窗口）。`scroll()` 方法触发 scroll 事件，或规定当发生 scroll 事件时运行的函数。

##### 4.3 select()

当 textarea 或文本类型的 input 元素中的文本被选择（标记）时，会发生 select 事件。`select()` 方法触发 select 事件，或规定当发生 select 事件时运行的函数。

##### 4.4 submit()

当提交表单时，会发生 submit 事件。该事件只适用于 `<form>` 元素。`submit()` 方法触发 submit 事件，或规定当发生 submit 事件时运行的函数。

#### 5.event事件

##### 5.1 event.currentTarget 属性

是在事件冒泡阶段内的当前 DOM 元素，通常等于 this。使用 `event.currentTarget.innerHTML` 来返回元素的内容。

##### 5.2 event.data 属性

包含当前执行的处理程序被绑定时传递到事件方法的可选数据。

##### 5.3 event.delegateTarget 属性

返回当前调用的 jQuery 事件处理程序所添加的元素。该属性对于由 on() 方法添加的委托事件非常有用，事件处理程序是在元素的祖先被处理时添加的。

> 提示：如果事件直接绑定到元素且没有委托发生，则 `event.delegateTarget` 等同于 `event.currentTarget`。

##### 5.4 event.isDefaultPrevented()

检查指定的事件上是否调用了 `preventDefault()` 方法。

##### 5.5 event.isImmediatePropagationStopped()

该方法检查指定的事件上是否调用了 `event.stopImmediatePropagation()` 方法。

##### 5.6 event.isPropagationStopped()

检查指定的事件上是否调用了 event.stopPropagation()。

##### 5.7 event.namespace 属性

当事件被触发时，`event.namespace` 属性返回自定义命名空间。该属性可被插件作者用来根据所使用的命名空间以不同的方式处理任务。

> 提示：对于 jQuery 而言，以下划线开始的命名空间会被保留。

```
// 移除对于某一特定单击事件的自定义命名空间，不移除其他任何单击事件处理程序

$(document).ready(function(){
  $("p").on("click.mySomething",function(){
    $(this).slideToggle();
  });
  $("button").click(function(){
    $("p").off("click.mySomething");
  });
});
```

##### 5.8 event.pageX/event.pageY 属性

返回鼠标指针的位置，相对于文档的 左/上 边缘。

##### 5.9 event.preventDefault()

阻止元素发生默认的行为。

##### 5.10 event.relatedTarget 属性

返回当鼠标移动时哪个元素进入或退出。

##### 5.11 event.result 属性

包含由被指定事件触发的事件处理程序返回的最后一个值。

##### 5.12 event.stopImmediatePropagation()

执行第一个事件处理程序，阻止剩下的事件处理程序被执行。该方法阻止事件在 DOM 树中向上冒泡。

##### 5.13 event.stopPropagation()

阻止事件冒泡到父元素，阻止任何父事件处理程序被执行。

##### 5.14 event.target 属性

返回哪个 DOM 元素触发了事件。这对比较 `event.target` 和 `this` 是非常有用的，以便判断事件是否因事件冒泡被处理。

##### 5.15 event.timeStamp 属性

返回返回鼠标左键第一次按下到最后一次抬起所消耗的毫秒数（所以多次点击会叠加）。

```
// 显示从最后一次 click 事件以来的毫秒数

$(document).ready(function(){
    var lastms,d;
    $("button").click(function(event){
        if (lastms){
            d=event.timeStamp - lastms
            $("p").text("Milliseconds since last click event: " + d);
        } else {
            $("p").text("Click the button again.");
        }
        lastms=event.timeStamp;
    });
});
```

##### 5.16 event.type 属性

返回哪种事件类型被触发。

##### 5.17 event.which 属性

which属性用于返回触发当前事件时按下的键盘按键或鼠标按钮。对于键盘和鼠标事件，该属性用于确定你按下的是哪一个键盘按键或鼠标按钮。

which属性对DOM原生的`event.keyCode`和`event.charCode`进行了标准化。

适用的事件类型主要有：
- --
在mousedown、mouseup事件中，`event.which`属性返回的是对应鼠标按钮的映射代码值(相当于`event.button`)。
- --
在keypress事件中，`event.which`属性返回的是输入的字符的Unicode值(相当于`event.charCode`)。
- --
在keydown、keyup事件中，`event.which`属性返回的是对应按键的映射代码值(相当于`event.keyCode`)。
- --

##### 5.18 event.metakey 属性

返回一个布尔值（true 或 false）表示事件触发时那个 META 键是否被按下。

#### 6.其他事件

##### 6.1 on()

`on()` 方法在被选元素及子元素上添加一个或多个事件处理程序。

自 jQuery 版本 1.7 起，`on()` 方法是 `bind()`、`live()` 和 `delegate()` 方法的新的替代品。该方法给 API 带来很多便利，我们推荐使用该方法，它简化了 jQuery 代码库。

> 注意：使用 `on()` 方法添加的事件处理程序适用于当前及未来的元素（比如由脚本创建的新元素）。

提示：如需移除事件处理程序，请使用 off() 方法。

提示：如需添加只运行一次的事件然后移除，请使用 one() 方法。

`$(selector).on(event,childSelector,data,function)`

- --
event: 必需。规定要从被选元素添加的一个或多个事件或命名空间。由空格分隔多个事件值，也可以是数组。必须是有效的事件。
- --
childSelector: 可选。规定只能添加到指定的子元素上的事件处理程序（且不是选择器本身，比如已废弃的 delegate() 方法）。
- --
data: 可选。规定传递到函数的额外数据。
- --
function: 可选。规定当事件发生时运行的函数。
- --

> `on()` 和 `click()` : 二者在绑定静态控件时没有区别，但是如果面对动态产生的控件，只有 `on()` 能成功的绑定到动态控件中。

```
// 如何在元素上添加自定义命名空间事件
$(document).ready(function(){
  $("p").on("myOwnEvent", function(event, showName){
    $(this).text(showName + "! What a beautiful name!").show();
  });
  $("button").click(function(){
    $("p").trigger("myOwnEvent",["Anja"]);
  });
});

// 如何向元素添加多个事件处理程序
$(document).ready(function(){
  $("p").on("mouseover mouseout",function(){
    $("p").toggleClass("intro");
  });
});

// 如何使用 map 参数向被选元素添加多个事件处理程序
$(document).ready(function(){
  $("p").on({
    mouseover:function(){$("body").css("background-color","lightgray");},
    mouseout:function(){$("body").css("background-color","lightblue");},
    click:function(){$("body").css("background-color","yellow");}
  });
});

// 如何向函数传递数据
function handlerName(event) {
  alert(event.data.msg);
}

$(document).ready(function(){
  $("p").on("click", {msg: "You just clicked me!"}, handlerName)
});

// 向未来的元素添加事件处理程序
$(document).ready(function(){
  $("div").on("click","p",function(){
    $(this).slideToggle();
  });
  $("button").click(function(){
    $("<p>This is a new paragraph.</p>").insertAfter("button");
  });
});
```

##### 6.2 off()

`off()` 方法通常用于移除通过 `on()` 方法添加的事件处理程序。

`$(selector).off(event,selector,function(eventObj),map)`

- --
event:必需。规定要从被选元素移除的一个或多个事件或命名空间。由空格分隔多个事件值。必须是有效的事件。
- --
selector:可选。规定添加事件处理程序时最初传递给 on() 方法的选择器。
- --
function(eventObj):可选。规定当事件发生时运行的函数。
- --
map:规定事件映射 `({event:function, event:function, ...})`，包含要添加到元素的一个或多个事件，以及当事件发生时运行的函数。
- --

```
function changeSize(){
	$(this).animate({fontSize:"+=10px"});
}
function changeSpacing(){
	$(this).animate({letterSpacing:"+=5px"});
}

// 移除一个通过 on() 添加的指定的事件函数
$(document).ready(function(){
	$("p").on("click",changeSize);
	$("p").on("click",changeSpacing);
	$("button").click(function(){
		$("p").off("click",changeSize);
	});
});

// 移除所有通过 on() 添加的 click 事件处理程序
$(document).ready(function(){
	$("body").on("click","p",changeSize);
	$("body").on("click","p",changeSpacing);
	$("button").click(function(){
		$("body").off("click","p");
	});
});

// 如何在事件触发某一确定次数后移除事件处理程序
$(document).ready(function(){
	var x=0;
	$("p").click(function(event){
		$("p").animate({fontSize:"+=5px"});
		x++;
		if (x>=2)
		{
			$(this).off(event);
		}
	});
});
```

##### 6.3 one()

`one()` 方法为被选元素添加一个或多个事件处理程序，并规定当事件发生时运行的函数。当使用 `one()` 方法时，每个元素只能运行一次事件处理程序函数。

`$(selector).one(event,data,function)`

##### 6.4 $.proxy 方法

接受一个已有的函数，并返回一个带特定上下文的新的函数。该方法通常用于向上下文指向不同对象的元素添加事件。

`$(selector).proxy(function,context)`
`$(selector).proxy(context,name)`

- --
function:  要被调用的已有的函数。
context:  函数所在的对象的名称。
name:  已有的函数，其上下文将被改变（应该是 context 对象的属性）。
- --

> 提示：如果您绑定从 `$.proxy` 返回的函数，jQuery 仍然可以通过传递的原先的函数取消绑定正确的函数。

```
$(document).ready(function(){
	test=function(){
		this.txt="这是一个对象属性";
		$("div").click($.proxy(this.myClick,this));
	};

	test.prototype.myClick = function(event){
		alert(this.txt);
		alert(event.currentTarget.nodeName);
	};

	var x = new test();
});
```

##### 6.5 ready()

当 DOM（document object model 文档对象模型）加载完毕且页面完全加载（包括图像）时发生 ready 事件。

由于该事件在文档就绪后发生，因此把所有其他的 jQuery 事件和函数置于该事件中是非常好的做法。`ready()` 方法规定当 ready 事件发生时执行的代码。

`ready()` 方法只能用于当前文档，因此无需选择器

`$(document).ready(function)/$(function)`

> 提示：`ready()` 方法不应该与 `<body onload="">` 一起使用。

##### 6.6 holdReady()

函数用于暂停或恢复 `.ready()` 事件的执行。

注意：
- --
1. 该方法必须在文档靠前部分被调用，例如，在头部加载完 jQuery 脚本之后，立刻调用该方法。如果在 ready 事件已经被调用后再调用该方法，将不会起作用。
- --
2. 首先调用`$.holdReady(true)`[调用后 ready 事件将被锁定]。当准备好执行 ready 事件时，调用`$.holdReady(false)`。
- --
3. 可以对 ready 事件添加多个锁定，每个锁定对应一次`$.holdReady(false)`[解锁]调用。ready 事件将在所有的锁定都被解除，并且页面也已经准备好的情况下被触发。
- --

```
$.holdReady(true)
$(document).ready(function(){
    $("#first").click(function(){
        alert("解除延迟后被弹出");
    })
})
$("#second").click(function(){
    $.holdReady(false);
})
```

##### 6.7 trigger()

触发被选元素上指定的事件以及事件的默认行为（比如表单提交）。该方法与 `triggerHandler()` 方法类似，不同的是 `triggerHandler()` 不触发事件的默认行为。

与 `triggerHandler()` 方法相比:

- --
- 会引起事件（比如表单提交）的默认行为
- --
- `.trigger()` 会操作 jQuery 对象匹配的所有元素，而 `.triggerHandler()` 只影响第一个匹配元素。
- --
- 由 `.triggerHandler()` 创建的事件不会在 DOM 树中冒泡；如果目标元素不直接处理它们，则不会发生任何事情。
- --

`$(selector).trigger(event,eventObj,param1,param2,...)`

- --
event:  必需。规定指定元素上要触发的事件。可以是自定义事件，或者任何标准事件。
- --
param1,param2,...:  可选。传递到事件处理程序的额外参数。
额外的参数对自定义事件特别有用。
- --

```
// 传递额外参数到自定义事件

$(document).ready(function(){
  $("p").click(function(){
    $("p").on("myPara", function(event, param1, param2, param3){
    alert(param1 + "\n" + param2 + "\n" + param3);
    });
  $("p").trigger("myPara", ['Pass', 'Along', 'Parameters']);
  });
});
```

##### 6.8 triggerHandler()

触发被选元素上指定的事件。该方法的返回的是事件处理函数的返回值，而不是具有可链性的 jQuery 对象。此外，如果没有处理程序被触发，则这个方法返回 `undefined`。

`$(selector).triggerHandler(event,param1,param2,...)`

### 7.效果和动画

#### 1.隐藏/显示

##### 1.1 hide()/show()

使用 `hide()` 和 `show()` 方法来隐藏和显示 HTML 元素：

`$(selector).hide(speed,callback);`
`$(selector).show(speed,callback);`

可选的 speed 参数规定隐藏/显示的速度，可以取以下值："slow"、"fast" 或毫秒数。

可选的 callback 参数是隐藏或显示完成后所执行的函数名称。

```
let flag = true;
$(function () {
    $("#app").click(function () {
        if (flag) {
            $("p").hide();
        } else {
            $("p").show();
        }
        flag = !flag;
    })
})
```

##### 1.2 toggle()

使用 `toggle()` 方法来切换 `hide()` 和 `show()` 方法。

`$(selector).toggle(speed,callback);`

可选的 speed 参数规定隐藏/显示的速度，可以取以下值："slow"、"fast" 或毫秒。

> 对于可选的 callback 参数，有以下两点说明：

> 1.`$(selector)`选中的元素的个数为n个，则callback函数会执行n次；

> 2.callback函数名后加括号，会立刻执行函数体，而不是等到显示/隐藏完成后才执行(这样的结果是不论`$(selector)`选择多少，都只会执行一次)；

> 3.callback既可以是函数名，也可以是匿名函数；

#### 2.淡入淡出

##### 2.1 fadeIn()

用于淡入已隐藏的元素。

`$(selector).fadeIn(speed,callback);`

##### 2.2 fadeOut()

用于淡出可见元素。

`$(selector).fadeOut(speed,callback);`

##### 2.3 fadeToggle()

在 `fadeIn()` 与 `fadeOut()` 方法之间进行切换。

`$(selector).fadeToggle(speed,callback);`

##### 2.4 fadeTo()

允许渐变为给定的不透明度（值介于 0 与 1 之间）。

`$(selector).fadeTo(speed,opacity,callback);`

#### 3.滑动（收展）

##### 3.1 slideDown()

用于向下滑动（展开）元素。

`$(selector).slideDown(speed,callback);`

##### 3.2 slideUp()

用于向上滑动（收缩）元素。

`$(selector).slideUp(speed,callback);`

##### 3.3 slideToggle()

可以在 `slideDown()` 与 `slideUp()` 方法之间进行切换。

`$(selector).slideToggle(speed,callback);`

#### 4.动画

##### 4.1 animate()

用于创建自定义动画。

`$(selector).animate({params},speed,callback);`

必需的 params 参数定义形成动画的 CSS 属性。

> 默认情况下，所有 HTML 元素都有一个静态位置，且无法移动。如需对位置进行操作，要记得首先把元素的 CSS position 属性设置为 relative、fixed 或 absolute！

是的，几乎可以！不过，需要记住一件重要的事情：当使用 `animate()` 时，必须使用 Camel 标记法书写所有的属性名，比如，必须使用 paddingLeft 而不是 padding-left，使用 marginRight 而不是 margin-right，等等。

同时，色彩动画并不包含在核心 jQuery 库中。如果需要生成颜色动画，需要从 jquery.com 下载 颜色动画 插件。

##### 4.2 使用相对值

也可以定义相对值（该值相对于元素的当前值）。需要在值的前面加上 `+=` 或 `-=`：

```
$("button").click(function(){
  $("div").animate({
    left:'250px',
    height:'+=150px',
    width:'+=150px'
  });
});
```

##### 4.3 使用预定义的值

甚至可以把属性的动画值设置为 "show"、"hide" 或 "toggle"：

```
$("button").click(function(){
  $("div").animate({
    height:'toggle'
  });
});
```

##### 4.4 使用队列功能

默认地，jQuery 提供针对动画的队列功能。这意味着如果在彼此之后编写多个 `animate()` 调用，jQuery 会创建包含这些方法调用的"内部"队列。然后逐一运行这些 animate 调用。

#### 5.停止动画

##### 5.1 delay(ms)

对被选元素的所有排队函数（仍未运行）设置延迟；因为show和hide不传参数时没有动画效果；delay对此无效果；

`$(selector).delay(speed [,queueName])`

##### 5.2 stop()

用于停止动画或效果，在它们完成之前。`stop()` 方法适用于所有 jQuery 效果函数，包括滑动、淡入淡出和自定义动画。

`$(selector).stop(stopAll,goToEnd);`

可选的 stopAll 参数规定是否应该清除动画队列。默认是 false，即仅停止活动的动画，允许任何排入队列的动画向后执行。

可选的 goToEnd 参数规定是否立即完成当前动画(即提前完成)。默认是 false。

因此，默认地，`stop()` 会清除在被选元素上指定的当前动画。

##### 5.3 queue()

显示被选元素上要执行的函数队列。队列是一个或多个等待运行的函数。一个元素可以有若干队列。大部分通常只有一个，"fx" 队列，即默认的 jQuery 队列。

> `queue()` 方法通常与 `dequeue()` 方法一起使用。

```
// 如何计算队列的长度 + 循环队列

$("button").click(function(){
		var div = $("div");
		startAnimation();
		showQueue();
		function startAnimation(){
			div.animate({height:300},"slow");
			div.animate({width:300},"slow");
			div.animate({height:100},"slow");
			div.animate({width:100},"slow",startAnimation);
		}
		function showQueue(){
			var q=div.queue();
			$("span").text(q.length);
			setTimeout(showQueue);
		}
	});
```

##### 5.4 dequeue()

从队列中移除下一个函数，然后执行函数。

> 注意：应该确保 `dequeue()` 方法在通过 `queue()` 添加一个函数之后被调用，以便允许要继续的进程。

##### 5.5 clearQueue()

从尚未运行的队列中移除所有项目。请注意当函数开始运行时，它会一直运行直到完成。

> 提示：与 `stop()` 方法（只适用于动画）不同的是，`clearQueue()` 方法移除任何排队的函数。

`$(selector).clearQueue(queueName)`

可选。规定队列的名称。默认是 "fx"，标准效果队列。

```
// 把 queue()、dequeue() 和 clearQueue() 一起使用

$(document).ready(function(){
	var div=$("div");
	$("#start").click(function(){
		div.animate({height:300},"slow");
		div.animate({width:300},"slow");
		div.queue(function () {
			div.css("background-color","red");
			div.dequeue();
		});
		div.animate({height:100},"slow");
		div.animate({width:100},"slow");
	});
	$("#stop").click(function(){
		div.clearQueue();
	});
});
```

#### 6.callback

Callback 函数在当前动画 100% 完成之后执行。

### 8.AJAX

编写常规的 AJAX 代码并不容易，因为不同的浏览器对 AJAX 的实现并不相同。这意味着必须编写额外的代码对浏览器进行测试。不过，jQuery 团队解决了这个难题，只需要一行简单的代码，就可以实现 AJAX 功能。

#### 1.load()

从服务器加载数据，并把返回的数据放入被选元素中(原有的会被覆盖)。

`$(selector).load(URL,data,callback);`

也可以把 jQuery 选择器添加到 URL 参数。

`$("#div1").load("demo_test.txt #p1");`

- --
必需的 URL 参数规定您希望加载的 URL。
可选的 data 参数规定与请求一同发送的查询字符串键/值对集合。
- --
可选的 callback 参数是 `load()` 方法完成后所执行的函数名称。

  - responseTxt - 包含调用成功时的结果内容
  - statusTXT - 包含调用的状态
  - xhr - 包含 XMLHttpRequest 对象
- --

> 注意：还存在一个名为 load 的 jQuery 事件方法。调用哪个，取决于参数。

```
$("button").click(function(){
  $("#div1").load("demo_test.txt",function(responseTxt,statusTxt,xhr){
    if(statusTxt=="success")
      alert("外部内容加载成功!");
    if(statusTxt=="error")
      alert("Error: "+xhr.status+": "+xhr.statusText);
  });
});
```

#### 2.get() 和 post()

HTTP 请求：GET vs. POST

两种在客户端和服务器端进行请求-响应的常用方法是：GET 和 POST。

- GET - 从指定的资源请求数据
- POST - 向指定的资源提交要处理的数据

GET 基本上用于从服务器获得（取回）数据。注释：GET 方法可能返回缓存数据。

POST 也可用于从服务器获取数据。不过，POST 方法不会缓存数据，并且常用于连同请求一起发送数据。

##### 2.1 $.get()

`$.get(URL,callback);`

必需的 URL 参数规定您希望请求的 URL。
可选的 callback 参数是请求成功后所执行的函数名。

```
$("button").click(function(){
  $.get("demo_test.php",function(data,status){
    alert("数据: " + data + "\n状态: " + status);
  });
});
```

第一个回调参数存有被请求页面的内容，第二个回调参数存有请求的状态。

##### 2.2 `$.post()`

`$.post(URL,data,callback);`

必需的 URL 参数规定您希望请求的 URL。
可选的 data 参数规定连同请求发送的数据。
可选的 callback 参数是请求成功后所执行的函数名。

```
$("button").click(function(){
    $.post("/try/ajax/demo_test_post.php",
    {
        name:"菜鸟教程",
        url:"http://www.runoob.com"
    },
        function(data,status){
        alert("数据: \n" + data + "\n状态: " + status);
    });
});
```

#### 3.ajax()

用于执行 AJAX（异步 HTTP）请求。所有的 jQuery AJAX 方法都使用 `ajax()` 方法。该方法通常用于其他方法不能完成的请求。

```
  $.ajax({
      //请求方式
      type: "GET",//"POST"
      //请求地址url
      url: "data.txt?_=" + Math.random(),
      //dataType 规定后台返回的数据格式
      dataType: "json",//"html","text"
      //是否异步
      async: false,//false同步,true异步(默认)
      //是否缓存
      cache: true,
      //传给后台的数据data
      data: null,

      //请求成功后执行的函数
      success: function (data) {
        //data 后台返回的数据
        window.data = data;
      },

      //请求失败执行的函数
      error: function () {
        console.log("请求失败!")
      }
  });
```

#### 4.ajaxSetup()

为将来的 AJAX 请求设置默认值。

#### 5.getJSON()

使用 AJAX 的 HTTP GET 请求获取 JSON 数据。

`$(selector).getJSON(url,data,success(data,status,xhr))`

- --
url:  必需。规定将请求发送到哪个 URL。
data:  可选。规定发送到服务器的数据。
success(data,status,xhr):  可选。规定当请求成功时运行的函数。
额外的参数：
- --
  - data - 包含从服务器返回的数据
  - status - 包含请求的状态（"success"、"notmodified"、"error"、"timeout"、"parsererror"）
  - xhr - 包含 XMLHttpRequest 对象
- --

#### 6.getScript()

使用 AJAX 的 HTTP GET 请求获取和执行 JavaScript。

$(selector).getScript(url,success(response,status))

- --
url:  必需。规定将请求发送到哪个 URL。
success(response,status):  可选。规定当请求成功时运行的函数。
额外的参数：
- --
  - response - 包含来自请求的结果数据
  - status - 包含请求的状态（"success"、"notmodified"、"error"、"timeout"、"parsererror"）
- --

#### 7.param()

创建数组或对象的序列化表示形式。序列化的值可在生成 AJAX 请求时用于 URL 查询字符串中。

`$.param(object,trad)`

- object:  必需。规定要序列化的数组或对象。
- trad:  可选。布尔值，指定是否使用参数序列化的传统样式。

#### 8.serialize()

过序列化表单值创建 URL 编码文本字符串。可以选择一个或多个表单元素（如输入和/或文本区），或表单元素本身。

#### 9.serializeArray()

通过序列化表单值来创建对象（name 和 value）的数组。

### 9.其他方法

#### 1.data()

向被选元素附加数据，或者从被选元素获取数据。

> 提示：如需移除数据，请使用 `removeData()` 方法。

从元素返回数据 `$(selector).data(name)`

> 如果没有规定名称，则该方法将以对象的形式从元素中返回所有存储的数据。

向元素附加数据
`$(selector).data(name,value)/$(selector).data(object)`

#### 2.each()

为每个匹配元素规定要运行的函数。

> 提示：返回 false 可用于及早停止循环。

`$(selector).each(function(index,element))`

#### 3.get()

获取由选择器指定的 DOM 元素。

`$(selector).get(index)`

#### 4.index()

返回指定元素相对于其他指定元素的 index 位置。这些元素可通过 jQuery 选择器或 DOM 元素来指定。

> 注意：如果未找到元素，`index()` 将返回 -1。

`$(selector).index( /element)`

#### 5.noConflict

其中某些框架也使用 $ 符号作为简写（就像 jQuery），如果您在用的两种不同的框架正在使用相同的简写符号，有可能导致脚本停止运行。jQuery 的团队考虑到了这个问题，并实现了 `noConflict()` 方法。

`noConflict()` 方法会释放对 `$` 标识符的控制，这样其他脚本就可以使用它了。

```
$.noConflict();
jQuery(document).ready(function(){
  jQuery("button").click(function(){
    jQuery("p").text("jQuery 仍然在工作!");
  });
});
```

也可以创建自己的简写。`noConflict()` 可返回对 jQuery 的引用，您可以把它存入变量，以供稍后使用。

```
var jq = $.noConflict();
jq(document).ready(function(){
  jq("button").click(function(){
    jq("p").text("jQuery 仍然在工作!");
  });
});
```

如果你的 jQuery 代码块使用 `$` 简写，并且您不愿意改变这个快捷方式，那么您可以把 `$` 符号作为变量传递给 `ready` 方法。这样就可以在函数内使用 `$` 符号了 - 而在函数外，依旧不得不使用 "jQuery"：

```
$.noConflict();
jQuery(document).ready(function($){
  $("button").click(function(){
    $("p").text("jQuery 仍然在工作!");
  });
});
```

### 10.JSONP

Jsonp(JSON with Padding) 是 json 的一种"使用模式"，可以让网页从别的域名（网站）那获取资料，即跨域读取数据。

```
$.getJSON("http://www.runoob.com/try/ajax/jsonp.php?jsoncallback=?", function(data) {

    var html = '<ul>';
    for(var i = 0; i < data.length; i++)
    {
        html += '<li>' + data[i] + '</li>';
    }
    html += '</ul>';

    $('#divCustomers').html(html);
});
```

### 11.小技巧

```
//JQ中，给用选择器选择的元素集合绑定点击事件，不需要循环绑定，
//直接给集合绑定即可，默认会给每个集合元素绑定点击事件
//JQ事件没有on-前缀；并且this也是指被绑定的元素（this都是原生对象）
//JQ对象是JQ类的实例;
//执行动画之前，要加stop()，作用:防止重复点击而影响视觉效果；

	$("#menu :header").click(function(){
	    $(this).next().stop().slideToggle().parent().siblings().children("ul").stop().slideUp()
	});
```

##### 1.JQ变量

```
//设置JQ变量时，$不是必须的，但为了标识就用$做前缀，以表示为JQ对象

    var $car=$(".shopCar");
    var $curDel=$(".curDetail");
    $car.mouseover(function(){
        $(this).addClass("bg");
        $curDel.stop().slideDown(500);
}).mouseout(function(){
        $(this).removeClass("bg");
        $curDel.stop().slideUp();
});
```

##### 2.禁止右键

```
//return false;  阻止事件的默认行为(可以设置其他行为)
	$(document).contextmenu(function(){
	    return false;
	})
```

##### 3.阻止a标签跳转

```
    $("a")[1].onclick=function(){
        return false;
	};
```

##### 4.鼠标键值

```
//mousedown() 鼠标按下
//e 事件对象
//左：1 中：2 右：3
	$("#box").mousedown(function(e){
        console.log(e.which);
   })
```

##### 5.关闭动画效果

```
//关闭效果
    jQuery.fx.off=true;

//不关闭效果
    jQuery.fx.off=false;

    $("#open").click(function(){
        jQuery.fx.off=true;
        $("#box").stop().slideUp(5000);
	});

	$("#close").click(function(){
         jQuery.fx.off=false;
         $("#box").stop().slideUp(5000);
	});

//$.proxy($代表jQuery)；JQ上的方法，JQ用；
//$.对象.方法  JQ原型上的方法，对象用；
//$.proxy(函数，对象):改变函数的this；
	function fn(){
        console.log(this);
    }
    var obj={};
    fn();  //window
    $.proxy(fn,obj)();  //{}
```

##### 6.`$.trim()`   去除首尾空格

```
		var str="  lmk  ";
        console.log($.trim(str).length);
```

7.`$.unique()`  去重
```
//bug :遇0,NaN出问题,null报错;一般处理纯数值
		var ary=[1,3,2,1,2,6,null];
        console.log($.unique(ary));
```

##### 8.`isEmptyObject()`  判断是否空对象

##### 9.`isPlainObject()`  判断是否对象

```
    var obj1={};
	var obj2={a:2};
	var ary=[];
    console.log($.isEmptyObject(obj1));//true
    console.log($.isEmptyObject(obj2));//false
    console.log($.isEmptyObject(null));//true
    console.log($.isPlainObject(obj1));//true
    console.log($.isPlainObject(ary));//false
    console.log($.isPlainObject(null));//false
```

## 十三.移动端

### 1.新标签

```
<header><!--头部-->
    <nav></nav><!--导航-->
    <main><!--主体-->
        <section></section><!--区块-->
        <section></section>
        <article></article><!--文章-->
        <aside></aside><!--侧边栏，广告-->
        <figure><!--配图块-->
            <img src="" alt="">
            <figcaption></figcaption><!--配图说明-->
        </figure>
        <hygroup><!--一组标题-->
            <h1></h1>
            <h2></h2>
        </hygroup>
        <progress max="100" value="50"></progress><!--进度条-->
        <time>12:00</time><!--时间标记-->
        <mark>O(∩_∩)O哈哈哈~</mark><!--高亮文本-->
        <input type="text" list="i">
        <datalist id="i"><!--配合input的隐藏列表，可以输入，也可以选择-->
            <option value="小明"></option><!--选项-->
            <option value="小兰"></option>
            <option value="小写"></option>
        </datalist>
        <details><!--隐藏列表，配合summary使用，只能选择，不能输入-->
            <summary>today</summary><!--标题-->
            <ul>
                <li>1</li><!--选项-->
                <li>2</li>
                <li>3</li>
            </ul>
        </details>
    </main>
</header>
<footer></footer><!--尾部-->
```

### 2.表单元素

- 1.HTML5表单的属性

`autocomplete`
自动填充（即输入提示（之前输入的内容））

 `autofocus`
 打开页面自动获取焦点；

`form`
让表单之外的表单元素也属于指定表单；（设置表单元素的form，指向特定的form；）

`width,height`
只存在于type为img的input表单元素中；

`list`
可以选择，可以输入；配合`datalist`；

`file`
选择文件；选择多个文件：`multiple`；

`required`
必填选项；

```
<form autocomplete="on" id="form1">
    <label for="user">用户</label>
    <input name="user" type="text" id="user" autofocus>
    <input type="submit" autofocus>
    <br>
    <input type="image" src="">
    <!--选择-->
    <select name="" id="">
        <option label="11" value="1"></option>
        <option label="22" value="2"></option>
        <option label="33" value="3"></option>
        <option label="44" value="4"></option>
    </select>
    <!--可以输入，也可以选择-->
    <input type="number" list="num_list">
    <datalist id="num_list">
        <option label="11" value=""></option>
        <option label="22" value=""></option>
        <option label="33" value=""></option>
        <option label="44" value=""></option>
    </datalist>
    <input type="file" multiple>
</form>
<input name="age" type="text" form="form1">
```

- 2.表单元素的type类型

```
    <form action="">
    //action:跳转地址，不写默认是自身

    文本：
    <input type="text"><br>

    网址：
    <input type="url"><br>

    邮箱：
    <input type="email"><br>

    密码：
    <input type="password"><br>

    数字：
    <input type="number" max="10" min="0" step="3"><br>

    色卡：
    <input type="color"><br>

    电话：
    <input type="tel" value=""><br>

    日期(年-月-日):
    <input type="date"><br>

    日期（时-分）:
    <input type="time"><br>

    日期（年-月-日-时-分）:
    <input type="datetime-local"><br>

    日期（年-月）:
    <input type="month"><br>

    日期（年-周）:
    <input type="week"><br>

    范围：
    <input type="range"><br>

    重置：
    <input type="reset"><br>

    默认提交按钮：
    <input type="submit"><br>
</form>
```
- 3.表单元素d 事件：

1).`onfocus`
获取焦点

2).`onblur`
失去焦点

3).`pattren`
在表单元素中的正则表达，用来匹配输入的信息是否符合规范；

4).`valid`
匹配符合时为true；

5).`novalidate`
让表单不作校验

6).`window.location.href`
拿到当前页面的url地址；

7).`window.decodeURIComponent`
解析url地址

8).`user.setCustomValidity`
("请输入正确用户名");

- 4.HTML5 表单验证属性

1).`Required`
```
//Required 属性主要防止域为空时提交表单。该属性不需要设置任何值。

//语法：<input type="text" required />
```

2).`Pattern`
```
//Pattern 属性的作用是实现元素的验证。它支持使用正则表达式定制验证规则。

//语法：<input type="text" pattern="13[0-9]\d{8}">
```

3).`Min` 和 `Max`

```
//min、max 和 step 属性用于为包含数字或日期的 input 类型规定限定。

//语法：：<input type="number" min="1" max="5">
```

4).`Minlength` 和 `Maxlength`
```
//Minlength 和 Maxlength 属性的作用是定制元素允许的最小字符串和最大字符串。

//语法：<input type="text" minlength="1" maxlength="5">
```

5).`Validity`
```
//在 HTML5 提供的有关表单验证的新特性中，提供了一个 validity 属性。该属性是利用 ValidityState 对象描述指定元素的有效状态。

//ValidityState 对象代表了有效状态，可以实现对指定元素进行约束验证功能，该对象提供了一系列的属性，这些属性用于描述指定元素的有效状态。

//如何获取 ValidityState 对象，使用其提供的属性内容：
//语法：指定元素 . validity 可以得到 ValidityState 对象
//例子：Ele .validity . valid
```
- 5.验证状态

5).`valid`
```
//执行完毕，我们会得到一个布尔值，它表示表单控件是否已通过了所有的验证约束条件。
//可以把 valid 特性看做是最终验证结果：如果所有约束条件都通过了，Valid 的值就是 true。否则，只要有一项约束没通过，valid 的值都是 false。

    if( username.validity.valid ){
        alert(‘通过‘);
    } else {
        alert(‘用户名称有问题‘);‘
    }
```

6).`valueMissing`
```
//如果表单控件设置了 required 特性，那么在用户填写完或者通过代码调用方式填值之前，控件会一直处于无效状态。例如：空的文本输入框无法通过必填检查，除非在其中输入任意文本。输入值为空时，valueMissing 会返回 true。

    if (username.validity.valueMissing ){
        alert(‘用户名称不能为空‘);
    } else {
        alert(‘通过‘);
    }
```

7).`typeMismatch`
```
//如果输入语法不符合指定的类型，那么这个状态就是 true。
//例如：email 类型输入元素的内容不是电子邮件地址。

    if( email.validity.typeMismatch ) {
        alert(‘Email格式不正确‘);
    } else {
        alert(‘通过‘);
    }
```

8).`pattenMismatch`
```
//如果输入内容与所设置模式不匹配，那么这个状态就是 true。

    if( phone.validity.patternMismatch ) {
        alert(‘电话号码格式不正确‘);
    } else {
        alert(‘通过‘);
    }
```

9).`tooLong`
```
//如果输入内容长度大于 maxlength 属性指定值，那么这个状态就是 true。

    if( pwd.validity.tooLong ) {
        alert(‘密码长度不能超过12位‘);
    } else {
        alert(‘通过‘);
    }
```

10).`rangeUnderflow`
```
//如果输入内容小于 min 属性声明的值，那么这个状态就是 true。

    if( age.validity.rangeUnderflow ) {
        alert(‘年龄不符合要求‘);
    } else {
        alert(‘通过‘);
    }
```

11).`stepMismatch`
```
//如果给定的值与 min，max，step 不一致，那么这个状态就是 true。

    if( elem.validity.setpMismatch ) {
        alert(‘范围设置不正确‘);
    } else {
        alert(‘通过‘);
    }
```

12).`customError`
```
//如果元素使用 setCustomValidity() 方法设置了自定义错误，那么这个状态就是 true。

    if( uname.value == "" ) {
        uname.setCustomValidity("用户名称不能为空");
    }

    if( uname.validity.customError ) {
        alert(‘验证未通过‘);
    }
```

### 3.字体图标
保留fonts文件夹和style.css文档就可以了。

### 4.audio & video
语法：
```
<audio src="">您的浏览器不支持audio元素</audio>
<video src="" width="300" height="250" controls poster=""></video>
```
由于各家浏览器制造商对标准音视频编解码器支持上为达成一致，通常需要`<source>`元素来指定不同格式的媒体源：
```
<vedio id="">
    <source src="img.mov" type="video/quicktime">
    <source src="img.ogv" type="video/ogg";codes="theora,vorbis">
</vedio>
```
source元素具有几个属性：src属性是指播放媒体的URL地址；type表示媒体类型，其属性值为播放文件的MIME类型，该属性中的codes参数表示所使用的媒体的编码格式。type属性是可选的，但最好不要省略type属性，否则浏览器会从上往下选择时无法判断自己能不能播放而先行下载一小段视频（音频）数据，这样有可能浪费宽带和时间。

```
    src:播放地址
    controls:控制条
    autoplay:自动播放
    loop:循环播放
    muted:静音
    poster:视频播放之前，用图片掩盖

    currentSrc:返回当前音视频的地址
    currentTime:获取或设置当前播放时间

    //获取音视频的总时间(缺解析文件)
    console.log(audio.duration);
    console.log(video.duration);

    ended 返回值：音视频是否播放完成
    paused 返回值：音视频是否暂停

    //设置播放速度
    video.playbackRate

    //已播放时间
    video.played.end()

    //设置或获取音量
    video.volume=0.4（rang:0-1）
```
常用属性和方法：
|方法|说明|
|:--:|--|
|**play()**  |    播放视频音频 |
|**pause()**   |  暂停播放
|**autoplay**  |  设置或返回是否在加载完成后随即播放音频/视频
|controller | 返回表示音频/视频当前媒体控制器的 MediaControl ler 对象
|**controls**  |  设置或返回音频/视频是否显示控件（比如播放/暂停 等）
|**currentSrc** | 返回当前音频/视频的 URL
|**currentTime** |设置或返回音频/视频中的当前播放位置（以秒计）
|**defaultMuted**|设置或返回音频/视频默认是否静音
|defaultPlaybackRate |设置或返回音频/视频的默认播放速度
|**duration** |返回当前音频/视频的长度（以秒计）
|ended       |返回音频/视频的播放是否已结束
|**loop**       | 设置或返回音频/视频是否应在结束时重新播放
|**muted **     | 设置或返回音频/视频是否静音
|**paused**     | 设置或返回音频/视频是否暂停
|**playbackRate**|设置或返回音频/视频播放的速度
|played     | 返回表示音频/视频已播放部分的 TimeRanges 对象
|preload   |  设置或返回音频/视频是否应该在页面加载后进行加载
|readyState  |返回音频/视频当前的就绪状态
|seekable    |返回表示音频/视频可寻址部分的 TimeRanges 对象
|seeking     |返回用户是否正在音频/视频中进行查找
|**src **       | 设置或返回音频/视频元素的当前来源
|startDate  | 返回表示当前时间偏移的 Date 对象
|**volume**    |  设置或返回音频/视频的音量 |

### 5.本地储存和浏览器储存

Web Storage存储机制是对HTML4中cookies存储机制的一个改善。而本地数据库是HTML5新增的一个功能，使用它可以在客户端本地建立一个数据库------原本必须要保存在服务端数据库中的内容现在可以直接保存在客户端了，这大大减轻了服务器端的负担，同时加快了数据访问的速度。

- Web Storage

Web Storage功能，顾名思义，就是在Web上存储数据的功能，而这里的存储，是针对客户端本地而言。

1).`localStorage`

将数据保存在客户端本地的硬件设备中，即便浏览器被关闭，该数据仍然还在，下次打开浏览器访问网站时仍然可以继续使用。

```
//localStorage,只要使用浏览器打开,存在里面的内容会被永久存储,关闭页 面再打开任然存在,在其他的网页也可以获取

    localStorage.zf="珠峰培训";
    alert(localStorage.zf);
    localStorage.setItem("QQ","1144709265");
    localStorage.removeItem("QQ");

//实现一个查看当前浏览次数的方法

    if(!localStorage.getItem("n")){
        localStorage.setItem("n",1)
    }else {
        localStorage.setItem("n",parseInt(localStorage.get Item("n"))+1) }
        alert("这是第"+localStorage.getItem("n")+"次")
```

2).`sessionStorage`

将数据保存到session对象中。所谓session是指用户访问某个网站时，从进入网站到浏览器关闭所进过的这段时间。session对象可以用来保存这段时间内要求保存的任何数据。
p153;

```
//sessionStorage:存储在浏览器上,只要浏览器不关闭,就会有, 关闭浏览器就是消失,但是在其他的页面中获取不到

     if(!sessionStorage.getItem("code")){
         sessionStorage.setItem("code",1)
     }else {
         sessionStorage.setItem("code",parseInt(sessionStorag e.getItem("code"))+1) }
```

## 十四.交互

### 1.CMD基本命令

1.查询ip信息
`log:ipconfig(MC:  ifconfig)`
`dir:ipconfig -all(MC:  ifconfig)`

2.清屏  `cls (MC:  clear)`

3.查看网速  `ping www.baidu.com -t`

4.终止运行  `ctrl+c`

5.退出命令窗口  `exit`

6.切换E盘  `E:` (不加cd)

7.创建文件夹(WW 文件夹名)  `mkdir WW`

8.删除文件夹  `rmdir WW`

9.进入文件夹  `cd WW`

10.创建文件（t.txt  前面是文件名，后面是文件类型）
```
1).copy con t.txt
2).输入内容
3).ctrl+z
4).enter
```

11.删除文件  `del t.txt`

12.返回当前目录的上一级目录
```
cd /     返回当前目录的根目录
cd ./    返回当前目录
cd ../   返回当前目录的上一级目录
```

13.查看当前目录下的所有文件  `dir (MC  ios)`

14.若要查看隐藏文件或系统文件  `dir /A`

### 2.网站发布

1.租一个服务器（通常是阿里云服务器：主机/虚拟服务器）

2.给服务器联网--联网后--产生外网IP--其他人可以通过外网IP链接本地服务器（一般公司服务器禁止外网IP访问）
百度外网IP（可访问的）61.135.169.121
京东               111.206.231.1

3.买域名（域名备案）--DNS服务器：域名解析--用域名代替外网IP访问
域名解析：关联域名和服务器IP地址
DNS：服务器，全球万维网联盟

4.将写好的项目放到服务器上，一般通过工具上传到指定位置（比如FTP）

5.发布一个或多个项目/网站，每个项目对应一个端口号，通过端口号来区分项目/网站，进行访问
    端口号：0-65535

6.发布项目的工具：IIS,apache，nginx,node

7.客户端访问，浏览器解析代码和渲染页面
W3C: 制定编程规范和标准

8.浏览器的内核/引擎:
补充：JavaScript引擎是SpiderMonkey
IE内核：Trident -- IE5-11，edge，360，猎豹，百度
火狐： Gecko
webkit:  V8 -- 最快 谷歌，Safari，QQ
presto:  Opera

### 3.请求网页、URL解析

请求网页：
`http事物=request+response`
- 请求（$request$）：
    1).DNS域名解析
    2).根据IP地址找到服务器
    3).根据端口找到对应的项目

- 响应（$response$）：
    4).返回当前请求项目内容（读取服务器上的内容，以字符串返回）

5).浏览器获得返回的数据，解析代码，渲染页面

- URL解析：

**`URI=URL+URN`**
URI:统一资源标识符
URL:统一资源定位符
URN:统一资源名称

完整的URI：
`https://www.baidu.com:443/xxx/xxx.html?name=zf&age=9#video`

|1|2|3|4|5|6|
|--|--|--|--|--|--|
| `https:`|`//www.baidu.com`|`:443`|`/xxx/xxx.html`|`?name=zf&age=9`  |`#video`|
|传输协议|域名|端口|请求路径及项目名称|参数|哈希值|


1.传输协议（http/https）
http: 超文本传输协议，除了文本还可以传递其他类型数据，如音视频、图片（转二进制流/base64）
https: 安全（safe）http，传输通道加密，
FTP:

2.域名
1）.买到的是一级域名，可以自行分配出二级、三级域名，一般不会超出三级域名；

3.端口
- 默认端口
  HTTP   --  80
  HTTPS  --  443
  FTP    --  21

4.请求路径及项目名称
可以设置默认的入口文件，一般是：index.html

5.`?xxx=xxz&xxx=xxx`    参数
1）.客户端通过参数来给服务器发送一些小数据（get请求），大量的请求用post
表单验证时，表单元素加name属性在提交时以参数的形式显示在URL上，是get请求，如果是post请求就不会显示在URL上

2）.服务器需要的参数，都是规定的参数名，多余的参数不影响；所以有时候可以通过时间戳或随机数，来防止缓存

6.`#xxx`  哈希值
服务器需要传递哈希值来作某个判断或区分时，才需要传递一个哈希值
作用：访问特定区域，类似于锚点链接，通过#访问区域ID来访问；
在Vue和react中，用来实现路由的跳转