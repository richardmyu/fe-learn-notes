# JavaScript笔记四

<!-- TOC -->

- [JavaScript笔记四](#javascript笔记四)
    - [4.属性的操作](#4属性的操作)
      - [4.1.Element.attributes 属性](#41elementattributes-属性)
      - [4.2.元素的标准属性](#42元素的标准属性)
      - [4.3.属性操作的标准方法](#43属性操作的标准方法)
        - [4.3.1 概述](#431-概述)
        - [4.3.2 Element.getAttribute()](#432-elementgetattribute)
        - [4.3.3 Element.setAttribute()](#433-elementsetattribute)
        - [4.3.4 Element.hasAttribute()](#434-elementhasattribute)
        - [4.3.5 Element.removeAttribute()](#435-elementremoveattribute)
      - [4.4.dataset 属性](#44dataset-属性)
    - [5.Text 节点和 DocumentFragment 节点](#5text-节点和-documentfragment-节点)
      - [5.1.Text 节点的概念](#51text-节点的概念)
      - [5.2.Text 节点的属性](#52text-节点的属性)
        - [5.2.1 data](#521-data)
        - [5.2.2 wholeText](#522-wholetext)
        - [5.2.3 length](#523-length)
        - [5.2.4 nextElementSibling，previousElementSibling](#524-nextelementsiblingpreviouselementsibling)
      - [5.3.Text 节点的方法](#53text-节点的方法)
        - [5.3.1 appendData()，deleteData()，insertData()，replaceData()，subStringData()](#531-appenddatadeletedatainsertdatareplacedatasubstringdata)
        - [5.3.2 remove()](#532-remove)
        - [5.3.3 splitText()](#533-splittext)
      - [5.4.DocumentFragment 节点](#54documentfragment-节点)
    - [6.事件模型](#6事件模型)
      - [6.1.EventTarget 接口](#61eventtarget-接口)
        - [6.1.1 EventTarget.addEventListener()](#611-eventtargetaddeventlistener)
        - [6.1.2 EventTarget.removeEventListener()](#612-eventtargetremoveeventlistener)
        - [6.1.3 EventTarget.dispatchEvent()](#613-eventtargetdispatchevent)
      - [6.2.监听函数](#62监听函数)
        - [6.2.1 HTML 的 on- 属性](#621-html-的-on--属性)
        - [6.2.2 元素节点的事件属性](#622-元素节点的事件属性)
        - [6.2.3 EventTarget.addEventListener()](#623-eventtargetaddeventlistener)
        - [6.2.4 小结](#624-小结)
      - [6.3.this 的指向](#63this-的指向)
      - [6.4.事件的传播](#64事件的传播)
      - [6.5.事件的代理](#65事件的代理)
      - [6.6.Event 对象概述](#66event-对象概述)
      - [6.7.Event 对象的实例属性](#67event-对象的实例属性)
        - [6.7.1 Event.bubbles，Event.eventPhase](#671-eventbubbleseventeventphase)
        - [6.7.2 Event.cancelable，Event.cancelBubble，event.defaultPrevented](#672-eventcancelableeventcancelbubbleeventdefaultprevented)
        - [6.7.3 Event.currentTarget，Event.target](#673-eventcurrenttargeteventtarget)
        - [6.7.4 Event.type](#674-eventtype)
        - [6.7.5 Event.timeStamp](#675-eventtimestamp)
        - [6.7.6 Event.isTrusted](#676-eventistrusted)
        - [6.7.7 Event.detail](#677-eventdetail)
      - [6.8.Event 对象的实例方法](#68event-对象的实例方法)
        - [6.8.1 Event.preventDefault()](#681-eventpreventdefault)
        - [6.8.2 Event.stopPropagation()](#682-eventstoppropagation)
        - [6.8.3 Event.stopImmediatePropagation()](#683-eventstopimmediatepropagation)
        - [6.8.4 Event.composedPath()](#684-eventcomposedpath)
      - [6.9.CustomEvent 接口](#69customevent-接口)
    - [7.事件类型](#7事件类型)
      - [7.1.鼠标事件](#71鼠标事件)
      - [7.2.MouseEvent 接口概述](#72mouseevent-接口概述)
      - [7.3.MouseEvent 接口的实例属性](#73mouseevent-接口的实例属性)
        - [7.3.1 MouseEvent.altKey，MouseEvent.ctrlKey，MouseEvent.metaKey，MouseEvent.shiftKey](#731-mouseeventaltkeymouseeventctrlkeymouseeventmetakeymouseeventshiftkey)
        - [7.3.2 MouseEvent.button，MouseEvent.buttons](#732-mouseeventbuttonmouseeventbuttons)
        - [7.3.3 MouseEvent.clientX，MouseEvent.clientY](#733-mouseeventclientxmouseeventclienty)
        - [7.3.4 MouseEvent.movementX，MouseEvent.movementY](#734-mouseeventmovementxmouseeventmovementy)
        - [7.3.5 MouseEvent.screenX，MouseEvent.screenY](#735-mouseeventscreenxmouseeventscreeny)
        - [7.3.6 MouseEvent.offsetX，MouseEvent.offsetY](#736-mouseeventoffsetxmouseeventoffsety)
        - [7.3.7 MouseEvent.pageX，MouseEvent.pageY](#737-mouseeventpagexmouseeventpagey)
        - [7.3.8 MouseEvent.relatedTarget](#738-mouseeventrelatedtarget)
      - [7.4.MouseEvent 接口的实例方法](#74mouseevent-接口的实例方法)
        - [7.4.1 MouseEvent.getModifierState()](#741-mouseeventgetmodifierstate)
      - [7.5.WheelEvent 接口](#75wheelevent-接口)
        - [7.5.1 概述](#751-概述)
        - [7.5.2 实例属性](#752-实例属性)
      - [7.6.键盘事件](#76键盘事件)
      - [7.7.KeyboardEvent 接口](#77keyboardevent-接口)
      - [7.8.KeyboardEvent 的实例属性](#78keyboardevent-的实例属性)
        - [7.8.1 KeyboardEvent.altKey，KeyboardEvent.metaKey.ctrlKey，KeyboardEvent.metaKey，KeyboardEvent.shiftKey](#781-keyboardeventaltkeykeyboardeventmetakeyctrlkeykeyboardeventmetakeykeyboardeventshiftkey)
        - [7.8.2 KeyboardEvent.code](#782-keyboardeventcode)
        - [7.8.3 KeyboardEvent.key](#783-keyboardeventkey)
        - [7.8.4 KeyboardEvent.location](#784-keyboardeventlocation)
        - [7.8.5 KeyboardEvent.repeat](#785-keyboardeventrepeat)
      - [7.9.KeyboardEvent 的实例方法](#79keyboardevent-的实例方法)
        - [7.9.1 KeyboardEvent.getModifierState()](#791-keyboardeventgetmodifierstate)
      - [7.10.进度事件](#710进度事件)
      - [7.11.ProgressEvent 接口](#711progressevent-接口)
      - [7.12.拖拉事件](#712拖拉事件)
      - [7.13.DragEvent 接口](#713dragevent-接口)
      - [7.14.DataTransfer 接口](#714datatransfer-接口)
        - [7.14.1 概述](#7141-概述)
        - [7.14.2 DataTransfer 的实例属性](#7142-datatransfer-的实例属性)
        - [7.14.3 DataTransfer 的实例方法](#7143-datatransfer-的实例方法)
      - [7.15.触摸操作概述](#715触摸操作概述)
      - [7.16.Touch 接口](#716touch-接口)
        - [7.16.1 Touch 接口概述](#7161-touch-接口概述)
        - [7.16.2 Touch 接口的实例属性](#7162-touch-接口的实例属性)
      - [7.17. TouchList 接口](#717-touchlist-接口)
      - [7.18.TouchEvent 接口](#718touchevent-接口)
        - [7.18.1 概述](#7181-概述)
        - [7.18.2 实例属性](#7182-实例属性)
      - [7.19.触摸事件的种类](#719触摸事件的种类)
      - [7.20.表单事件](#720表单事件)
        - [7.20.1 Input事件，select事件，change事件](#7201-input事件select事件change事件)
        - [7.20.2 reset事件，submit事件](#7202-reset事件submit事件)
      - [7.21.文档事件](#721文档事件)
        - [7.21.1 beforeunload事件，unload事件，load事件，error事件，pageshow事件，pagehide事件](#7211-beforeunload事件unload事件load事件error事件pageshow事件pagehide事件)
        - [7.21.2 DOMContentLoaded事件，readystatechange事件](#7212-domcontentloaded事件readystatechange事件)
        - [7.21.3 scroll事件，resize事件](#7213-scroll事件resize事件)
        - [7.21.4 hashchange事件，popstate事件](#7214-hashchange事件popstate事件)
        - [7.21.5 cut事件，copy事件，paste事件](#7215-cut事件copy事件paste事件)
        - [7.21.6 焦点事件](#7216-焦点事件)

<!-- /TOC -->

### 4.属性的操作

HTML 元素包括标签名和若干个键值对，这个键值对就称为**属性（attribute）**。

```javascript
<a id="test" href="http://www.example.com">
  链接
</a>
```

上面代码中，a元素包括两个属性：`id`属性和`href`属性。

属性本身是一个对象（`Attr`对象），但是实际上，这个对象极少使用。一般都是通过元素节点对象（`HTMlElement`对象）来操作属性。本章介绍如何操作这些属性。

#### 4.1.Element.attributes 属性

元素对象有一个`attributes`属性，返回一个类似数组的动态对象，成员是该元素标签的所有属性节点对象，属性的实时变化都会反映在这个节点对象上。其他类型的节点对象，虽然也有`attributes`属性，但返回的都是`null`，因此可以把这个属性视为元素对象独有的。

单个属性可以通过序号引用，也可以通过属性名引用。

```javascript
// HTML 代码如下
// <body bgcolor="yellow" onload="">
document.body.attributes[0]
document.body.attributes.bgcolor
document.body.attributes['ONLOAD']
```

注意，上面代码的三种方法，返回的都是属性节点对象，而不是属性值。

属性节点对象有`name`和`value`属性，对应该属性的属性名和属性值，等同于`nodeName`属性和`nodeValue`属性。

```javascript
// HTML代码为
// <div id="mydiv">
var n = document.getElementById('mydiv');

n.attributes[0].name // "id"
n.attributes[0].nodeName // "id"

n.attributes[0].value // "mydiv"
n.attributes[0].nodeValue // "mydiv"
```

下面代码可以遍历一个元素节点的所有属性。

```javascript
var para = document.getElementsByTagName('p')[0];
var result = document.getElementById('result');

if (para.hasAttributes()) {
  var attrs = para.attributes;
  var output = '';
  for(var i = attrs.length - 1; i >= 0; i--) {
    output += attrs[i].name + '->' + attrs[i].value;
  }
  result.textContent = output;
} else {
  result.textContent = 'No attributes to show';
}
```

#### 4.2.元素的标准属性

HTML 元素的标准属性（即在标准中定义的属性），会自动成为元素节点对象的属性。

```javascript
var a = document.getElementById('test');
a.id // "test"
a.href // "http://www.example.com/"
```

上面代码中，a元素标签的属性`id`和`href`，自动成为节点对象的属性。

这些属性都是可写的。

```javascript
var img = document.getElementById('myImage');
img.src = 'http://www.example.com/image.jpg';
```

上面的写法，会立刻替换掉`img`对象的`src`属性，即会显示另外一张图片。

这种修改属性的方法，常常用于添加表单的属性。

```javascript
var f = document.forms[0];
f.action = 'submit.php';
f.method = 'POST';
```

上面代码为表单添加提交网址和提交方法。

注意，这种用法虽然可以读写属性，但是无法删除属性，`delete`运算符在这里不会生效。

HTML 元素的属性名是大小写不敏感的，但是 JavaScript 对象的属性名是大小写敏感的。转换规则是，转为 JavaScript 属性名时，一律采用小写。如果属性名包括多个单词，则采用骆驼拼写法，即从第二个单词开始，每个单词的首字母采用大写，比如`onClick`。

有些 HTML 属性名是 JavaScript 的保留字，转为 JavaScript 属性时，必须改名。主要是以下两个。

- --
- `for`属性改为`htmlFor`
- `class`属性改为`className`
- --

另外，HTML 属性值一般都是字符串，但是 JavaScript 属性会自动转换类型。比如，将字符串true转为布尔值，将`onClick`的值转为一个函数，将style属性的值转为一个`CSSStyleDeclaration`对象。因此，可以对这些属性赋予各种类型的值。

#### 4.3.属性操作的标准方法

##### 4.3.1 概述

元素节点提供四个方法，用来操作属性。

- --
- `getAttribute()`
- `setAttribute()`
- `hasAttribute()`
- `removeAttribute()`
- --

这有几点注意。

1).适用性

这四个方法对所有属性（包括用户自定义的属性）都适用。

2).返回值

`getAttribute()`只返回字符串，不会返回其他类型的值。

3).属性名

这些方法只接受属性的标准名称，不用改写保留字，比如`for`和`class`都可以直接使用。另外，这些方法对于属性名是大小写不敏感的。

```javascript
var image = document.images[0];
image.setAttribute('class', 'myImage');
```

上面代码中，`setAttribute`方法直接使用class作为属性名，不用写成`className`。

##### 4.3.2 Element.getAttribute()

`Element.getAttribute`方法返回当前元素节点的指定属性。如果指定属性不存在，则返回`null`。

```javascript
// HTML代码为
// <div id="div1" align="left">
var div = document.getElementById('div1');
div.getAttribute('align') // "left"
```

##### 4.3.3 Element.setAttribute()

`Element.setAttribute`方法用于为当前元素节点新增属性。如果同名属性已存在，则相当于编辑已存在的属性。

```javascript
var d = document.getElementById('d1');
d.setAttribute('align', 'center');
```

下面是对img元素的src属性赋值的例子。

```javascript
var myImage = document.querySelector('img');
myImage.setAttribute('src', 'path/to/example.png');
```

##### 4.3.4 Element.hasAttribute()

`Element.hasAttribute`方法返回一个布尔值，表示当前元素节点是否包含指定属性。

```javascript
var d = document.getElementById('div1');

if (d.hasAttribute('align')) {
  d.setAttribute('align', 'center');
}
```

上面代码检查div节点是否含有`align`属性。如果有，则设置为居中对齐。

##### 4.3.5 Element.removeAttribute()

`Element.removeAttribute`方法用于从当前元素节点移除属性。

```javascript
// HTML 代码为
// <div id="div1" align="left" width="200px">
document.getElementById('div1').removeAttribute('align');
// 现在的HTML代码为
// <div id="div1" width="200px">
```

#### 4.4.dataset 属性

有时，需要在HTML元素上附加数据，供 JavaScript 脚本使用。一种解决方法是自定义属性。

`<div id="mydiv" foo="bar">`

上面代码为div元素自定义了foo属性，然后可以用`getAttribute()`和`setAttribute()`读写这个属性。

```javascript
var n = document.getElementById('mydiv');
n.getAttribute('foo') // bar
n.setAttribute('foo', 'baz')
```

这种方法虽然可以达到目的，但是会使得 HTML 元素的属性不符合标准，导致网页代码通不过校验。

更好的解决方法是，使用标准提供的`data-*`属性。

`<div id="mydiv" data-foo="bar">`

然后，使用元素节点对象的`dataset`属性，它指向一个对象，可以用来操作 HTML 元素标签的`data-*`属性。

```javascript
var n = document.getElementById('mydiv');
n.dataset.foo // bar
n.dataset.foo = 'baz'
```

上面代码中，通过dataset.foo读写`data-foo`属性。

删除一个`data-*`属性，可以直接使用`delete`命令。

`delete document.getElementById('myDiv').dataset.foo;`

除了`dataset`属性，也可以用`getAttribute('data-foo')`、`removeAttribute('data-foo')`、`setAttribute('data-foo')`、`hasAttribute('data-foo')`等方法操作`data-*`属性。

注意，`data-`后面的属性名有限制，只能包含字母、数字、连词线（`-`）、点（`.`）、冒号（`:`）和下划线（`_`)。而且，属性名不应该使用A到Z的大写字母，比如不能有`data-helloWorld`这样的属性名，而要写成`data-hello-world`。

转成`dataset`的键名时，连词线后面如果跟着一个小写字母，那么连词线会被移除，该小写字母转为大写字母，其他字符不变。反过来，`dataset`的键名转成属性名时，所有大写字母都会被转成连词线+该字母的小写形式，其他字符不变。比如，`dataset.helloWorld`会转成`data-hello-world`。

### 5.Text 节点和 DocumentFragment 节点

#### 5.1.Text 节点的概念

文本节点（Text）代表元素节点（Element）和属性节点（Attribute）的文本内容。如果一个节点只包含一段文本，那么它就有一个文本子节点，代表该节点的文本内容。

通常我们使用父节点的`firstChild`、`nextSibling`等属性获取文本节点，或者使用`Document`节点的`createTextNode`方法创造一个文本节点。

```javascript
// 获取文本节点
var textNode = document.querySelector('p').firstChild;

// 创造文本节点
var textNode = document.createTextNode('Hi');
document.querySelector('div').appendChild(textNode);
```

浏览器原生提供一个`Text`构造函数。它返回一个文本节点实例。它的参数就是该文本节点的文本内容。

```javascript
// 空字符串
var text1 = new Text();

// 非空字符串
var text2 = new Text('This is a text node');
```

注意，由于空格也是一个字符，所以哪怕只有一个空格，也会形成文本节点。比如，`<p> </p>`包含一个空格，它的子节点就是一个文本节点。

> 文本节点除了继承`Node`接口，还继承了`CharacterData`接口。

#### 5.2.Text 节点的属性

##### 5.2.1 data

`data`属性等同于`nodeValue`属性，用来设置或读取文本节点的内容。

```javascript
// 读取文本内容
document.querySelector('p').firstChild.data
// 等同于
document.querySelector('p').firstChild.nodeValue

// 设置文本内容
document.querySelector('p').firstChild.data = 'Hello World';
```

##### 5.2.2 wholeText

`wholeText`属性将当前文本节点与毗邻的文本节点，作为一个整体返回。大多数情况下，`wholeText`属性的返回值，与`data`属性和`textContent`属性相同。但是，某些特殊情况会有差异。

举例来说，HTML 代码如下。

`<p id="para">A <em>B</em> C</p>`

这时，文本节点的`wholeText`属性和`data`属性，返回值相同。

```javascript
var el = document.getElementById('para');
el.firstChild.wholeText // "A "
el.firstChild.data // "A "
```

但是，一旦移除`<em>`节点，`wholeText`属性与`data`属性就会有差异，因为这时其实`<p>`节点下面包含了两个毗邻的文本节点。

```javascript
el.removeChild(para.childNodes[1]);
el.firstChild.wholeText // "A C"
el.firstChild.data // "A "
```

##### 5.2.3 length

`length`属性返回当前文本节点的文本长度。

`(new Text('Hello')).length // 5`

##### 5.2.4 nextElementSibling，previousElementSibling

`nextElementSibling`属性返回紧跟在当前文本节点后面的那个同级元素节点。如果取不到元素节点，则返回`null`。

```javascript
// HTML 为
// <div>Hello <em>World</em></div>
var tn = document.querySelector('div').firstChild;
tn.nextElementSibling
// <em>World</em>
```

`previousElementSibling`属性返回当前文本节点前面最近的同级元素节点。如果取不到元素节点，则返回`null：`。

#### 5.3.Text 节点的方法

##### 5.3.1 appendData()，deleteData()，insertData()，replaceData()，subStringData()

以下5个方法都是编辑`Text`节点文本内容的方法。

- --
- `appendData()`：在Text节点尾部追加字符串。
- `deleteData()`：删除Text节点内部的子字符串，第一个参数为子字符串开始位置，第二个参数为子字符串长度。
- `insertData()`：在Text节点插入字符串，第一个参数为插入位置，第二个参数为插入的子字符串。
- `replaceData()`：用于替换文本，第一个参数为替换开始位置，第二个参数为需要被替换掉的长度，第三个参数为新加入的字符串。
- `subStringData()`：用于获取子字符串，第一个参数为子字符串在Text节点中的开始位置，第二个参数为子字符串长度。
- --

```javascript
// HTML 代码为
// <p>Hello World</p>
var pElementText = document.querySelector('p').firstChild;

pElementText.appendData('!');
// 页面显示 Hello World!
pElementText.deleteData(7, 5);
// 页面显示 Hello W
pElementText.insertData(7, 'Hello ');
// 页面显示 Hello WHello
pElementText.replaceData(7, 5, 'World');
// 页面显示 Hello WWorld
pElementText.substringData(7, 10);
// 页面显示不变，返回"World "
```

##### 5.3.2 remove()

`remove`方法用于移除当前Text节点。

```javascript
// HTML 代码为
// <p>Hello World</p>
document.querySelector('p').firstChild.remove()
// 现在 HTML 代码为
// <p></p>
```

##### 5.3.3 splitText()

`splitText`方法将Text节点一分为二，变成两个毗邻的Text节点。它的参数就是分割位置（从零开始），分割到该位置的字符前结束。如果分割位置不存在，将报错。

分割后，该方法返回分割位置后方的字符串，而原Text节点变成只包含分割位置前方的字符串。

```javascript
// html 代码为 <p id="p">foobar</p>
var p = document.getElementById('p');
var textnode = p.firstChild;

var newText = textnode.splitText(3);
newText // "bar"
textnode // "foo"
```

父节点的`normalize`方法可以将毗邻的两个Text节点合并。

接上面的例子，文本节点的`splitText`方法将一个Text节点分割成两个，父元素的`normalize`方法可以实现逆操作，将它们合并。

```javascript
p.childNodes.length // 2

// 将毗邻的两个 Text 节点合并
p.normalize();
p.childNodes.length // 1
```

#### 5.4.DocumentFragment 节点

`DocumentFragment`节点代表一个文档的片段，本身就是一个完整的 DOM 树形结构。它没有父节点，`parentNode`返回`null`，但是可以插入任意数量的子节点。它不属于当前文档，操作`DocumentFragment`节点，要比直接操作 DOM 树快得多。

它一般用于构建一个 DOM 结构，然后插入当前文档。`document.createDocumentFragment`方法，以及浏览器原生的`DocumentFragment`构造函数，可以创建一个空的`DocumentFragment`节点。然后再使用其他 DOM 方法，向其添加子节点。

```javascript
var docFrag = document.createDocumentFragment();
// 等同于
var docFrag = new DocumentFragment();

var li = document.createElement('li');
li.textContent = 'Hello World';
docFrag.appendChild(li);

document.querySelector('ul').appendChild(docFrag);
```

上面代码创建了一个`DocumentFragment`节点，然后将一个`li`节点添加在它里面，最后将`DocumentFragment`节点移动到原文档。

注意，`DocumentFragment`节点本身不能被插入当前文档。当它作为`appendChild()`、`insertBefore()`、`replaceChild()`等方法的参数时，是它的所有子节点插入当前文档，而不是它自身。一旦`DocumentFragment`节点被添加进当前文档，它自身就变成了空节点（`textContent`属性为空字符串），可以被再次使用。如果想要保存`DocumentFragment`节点的内容，可以使用`cloneNode`方法。

```javascript
document
  .queryselector('ul')
  .appendChild(docFrag.cloneNode(true));
```

上面这样添加`DocumentFragment`节点进入当前文档，不会清空`DocumentFragment`节点。

下面是一个例子，使用`DocumentFragment`反转一个指定节点的所有子节点的顺序。

```javascript
function reverse(n) {
  var f = document.createDocumentFragment();
  while(n.lastChild) f.appendChild(n.lastChild);
  n.appendChild(f);
}
```

`DocumentFragment`节点对象没有自己的属性和方法，全部继承自`Node`节点和`ParentNode`接口。也就是说，`DocumentFragment`节点比`Node`节点多出以下四个属性。

- --
- a.`children`：返回一个动态的`HTMLCollection`集合对象，包括当前 `DocumentFragment`对象的所有子元素节点。
- b.`firstElementChild`：返回当前`DocumentFragment`对象的第一个子元素节点，如果没有则返回`null`。
- c.`lastElementChild`：返回当前`DocumentFragment`对象的最后一个子元素节点，如果没有则返回`null`。
- d.`childElementCount`：返回当前`DocumentFragment`对象的所有子元素数量。
- --

### 6.事件模型

事件的本质是程序各个组成部分之间的一种通信方式，也是异步编程的一种实现。

#### 6.1.EventTarget 接口

DOM 的事件操作（监听和触发），都定义在`EventTarget`接口。所有节点对象都部署了这个接口，其他一些需要事件通信的浏览器内置对象（比如，`XMLHttpRequest`、`AudioNode`、`AudioContext`）也部署了这个接口。

该接口主要提供三个实例方法。

- --
- `addEventListener`：绑定事件的监听函数
- `removeEventListener`：移除事件的监听函数
- `dispatchEvent`：触发事件
- --

##### 6.1.1 EventTarget.addEventListener()

`EventTarget.addEventListener()`用于在当前节点或对象上，定义一个特定事件的监听函数。一旦这个事件发生，就会执行监听函数。该方法没有返回值。

`target.addEventListener(type, listener[, useCapture]);`

该方法接受三个参数。

- --
- `type`：事件名称，大小写敏感。
- `listener`：监听函数。事件发生时，会调用该监听函数。
- `useCapture`：布尔值，表示监听函数是否在捕获阶段（capture）触发，默认为false（监听函数只在冒泡阶段被触发）。该参数可选。
- --

下面是一个例子。

```javascript
function hello() {
  console.log('Hello world');
}

var button = document.getElementById('btn');
button.addEventListener('click', hello, false);
```

上面代码中，button节点的`addEventListener`方法绑定`click`事件的监听函数hello，该函数只在冒泡阶段触发。

关于参数，有两个地方需要注意。

首先，第二个参数除了监听函数，还可以是一个具有`handleEvent`方法的对象。

```javascript
buttonElement.addEventListener('click', {
  handleEvent: function (event) {
    console.log('click');
  }
});
```

上面代码中，`addEventListener`方法的第二个参数，就是一个具有`handleEvent`方法的对象。

其次，第三个参数除了布尔值`useCapture`，还可以是一个属性配置对象。该对象有以下属性。

- --
- `capture`：布尔值，表示该事件是否在捕获阶段触发监听函数。
- `once`：布尔值，表示监听函数是否只触发一次，然后就自动移除。
- `passive`：布尔值，表示监听函数不会调用事件的`preventDefault`方法。如果监听函数调用了，浏览器将忽略这个要求，并在监控台输出一行警告。
- --

`addEventListener`方法可以为针对当前对象的同一个事件，添加多个不同的监听函数。这些函数按照添加顺序触发，即先添加先触发。如果为同一个事件多次添加同一个监听函数，该函数只会执行一次，多余的添加将自动被去除（不必使用`removeEventListener`方法手动去除）。

```javascript
function hello() {
  console.log('Hello world');
}

document.addEventListener('click', hello, false);
document.addEventListener('click', hello, false);
```

如果希望向监听函数传递参数，可以用匿名函数包装一下监听函数。

```javascript
function print(x) {
  console.log(x);
}

var el = document.getElementById('div1');
el.addEventListener('click', function () { print('Hello'); }, false);
```

上面代码通过匿名函数，向监听函数print传递了一个参数。

监听函数内部的`this`，指向当前事件所在的那个对象。

```javascript
// HTML 代码如下
// <p id="para">Hello</p>
var para = document.getElementById('para');
para.addEventListener('click', function (e) {
  console.log(this.nodeName); // "P"
}, false);
```

上面代码中，监听函数内部的`this`指向事件所在的对象para。

##### 6.1.2 EventTarget.removeEventListener()

`EventTarget.removeEventListener`方法用来移除`addEventListener`方法添加的事件监听函数。该方法没有返回值。

```javascript
div.addEventListener('click', listener, false);
div.removeEventListener('click', listener, false);
```

`removeEventListener`方法的参数，与`addEventListener`方法完全一致。它的第一个参数“事件类型”，大小写敏感。

注意，`removeEventListener`方法移除的监听函数，必须是`addEventListener`方法添加的那个监听函数，而且必须在同一个元素节点，否则无效。

```javascript
div.addEventListener('click', function (e) {}, false);
div.removeEventListener('click', function (e) {}, false);
```

上面代码中，`removeEventListener`方法无效，因为监听函数不是同一个匿名函数。

```javascript
element.addEventListener('mousedown', handleMouseDown, true);
element.removeEventListener("mousedown", handleMouseDown, false);
```

上面代码中，`removeEventListener`方法也是无效的，因为第三个参数不一样。

##### 6.1.3 EventTarget.dispatchEvent()

`EventTarget.dispatchEvent`方法在当前节点上触发指定事件，从而触发监听函数的执行。该方法返回一个布尔值，只要有一个监听函数调用了`Event.preventDefault()`，则返回值为false，否则为true。

`target.dispatchEvent(event)`

`dispatchEvent`方法的参数是一个`Event`对象的实例。

```javascript
para.addEventListener('click', hello, false);
var event = new Event('click');
para.dispatchEvent(event);
```

如果`dispatchEvent`方法的参数为空，或者不是一个有效的事件对象，将报错。

下面代码根据`dispatchEvent`方法的返回值，判断事件是否被取消了。

```javascript
var canceled = !cb.dispatchEvent(event);
if (canceled) {
  console.log('事件取消');
} else {
  console.log('事件未取消');
}
```

#### 6.2.监听函数

浏览器的事件模型，就是通过监听函数（listener）对事件做出反应。事件发生后，浏览器监听到了这个事件，就会执行对应的监听函数。这是**事件驱动编程模式（event-driven）**的主要编程方式。

JavaScript 有三种方法，可以为事件绑定监听函数。

##### 6.2.1 HTML 的 on- 属性

HTML 语言允许在元素的属性中，直接定义某些事件的监听代码。

```javascript
<body onload="doSomething()">
<div onclick="console.log('触发事件')">
```

上面代码为body节点的`load`事件、div节点的`click`事件，指定了监听代码。一旦事件发生，就会执行这段代码。

元素的事件监听属性，都是`on`加上事件名，比如`onload`就是`on + load`，表示`load`事件的监听代码。

注意，这些属性的值是将会执行的代码，而不是一个函数。

```javascript
<!-- 正确 -->
<body onload="doSomething()">

<!-- 错误 -->
<body onload="doSomething">
```

一旦指定的事件发生，`on-`属性的值是原样传入 JavaScript 引擎执行。因此如果要执行函数，不要忘记加上一对圆括号。

使用这个方法指定的监听代码，只会在冒泡阶段触发。

```javascript
<div onClick="console.log(2)">
  <button onClick="console.log(1)">点击</button>
</div>
```

上面代码中，`<button>`是`<div>`的子元素。`<button>`的`click`事件，也会触发`<div>`的`click`事件。由于`on-`属性的监听代码，只在冒泡阶段触发，所以点击结果是先输出1，再输出2，即事件从子元素开始冒泡到父元素。

直接设置`on-`属性，与通过元素节点的`setAttribute`方法设置`on-`属性，效果是一样的。

```javascript
el.setAttribute('onclick', 'doSomething()');
// 等同于
// <Element onclick="doSomething()">
```

##### 6.2.2 元素节点的事件属性

元素节点对象的事件属性，同样可以指定监听函数。

```javascript
window.onload = doSomething;

div.onclick = function (event) {
  console.log('触发事件');
};
```

使用这个方法指定的监听函数，也是只会在冒泡阶段触发。

注意，这种方法与 HTML 的on-属性的差异是，它的值是函数名（doSomething），而不像后者，必须给出完整的监听代码（doSomething()）。

##### 6.2.3 EventTarget.addEventListener()

所有 DOM 节点实例都有`addEventListener`方法，用来为该节点定义事件的监听函数。

`window.addEventListener('load', doSomething, false);`

##### 6.2.4 小结

上面三种方法，第一种“HTML 的 `on-` 属性”，违反了 HTML 与 JavaScript 代码相分离的原则，将两者写在一起，不利于代码分工，因此不推荐使用。

第二种“元素节点的事件属性”的缺点在于，同一个事件只能定义一个监听函数，也就是说，如果定义两次`onclick`属性，后一次定义会覆盖前一次。因此，也不推荐使用。

第三种`EventTarget.addEventListener`是推荐的指定监听函数的方法。它有如下优点：

- --
- 同一个事件可以添加多个监听函数。
- 能够指定在哪个阶段（捕获阶段还是冒泡阶段）触发监听函数。
- 除了 DOM 节点，其他对象（比如`window`、`XMLHttpRequest`等）也有这个接口，它等于是整个 JavaScript 统一的监听函数接口。
- --

#### 6.3.this 的指向

监听函数内部的`this`指向触发事件的那个元素节点。

`<button id="btn" onclick="console.log(this.id)">点击</button>`

执行上面代码，点击后会输出btn。

其他两种监听函数的写法，`this`的指向也是如此。

```javascript
// HTML 代码如下
// <button id="btn">点击</button>
var btn = document.getElementById('btn');

// 写法一
btn.onclick = function () {
  console.log(this.id);
};

// 写法二
btn.addEventListener(
  'click',
  function (e) {
    console.log(this.id);
  },
  false
);
```

上面两种写法，点击按钮以后也是输出btn。

#### 6.4.事件的传播

一个事件发生后，会在子元素和父元素之间**传播（propagation）**。这种传播分成三个阶段。

- --
- 第一阶段：从window对象传导到目标节点（上层传到底层），称为**捕获阶段（capture phase）**。
- 第二阶段：在目标节点上触发，称为**目标阶段（target phase）**。
- 第三阶段：从目标节点传导回window对象（从底层传回上层），称为**冒泡阶段（bubbling phase）**。
- --

这种三阶段的传播模型，使得同一个事件会在多个节点上触发。

```javascript
<div>
  <p>点击</p>
</div>
```

如果对这两个节点，都设置`click`事件的监听函数（每个节点的捕获阶段和监听阶段，各设置一个监听函数），共计设置四个监听函数。然后，对`<p>`点击，`click`事件会触发四次。

```javascript
var phases = {
  1: 'capture',
  2: 'target',
  3: 'bubble'
};

var div = document.querySelector('div');
var p = document.querySelector('p');

div.addEventListener('click', callback, true);
p.addEventListener('click', callback, true);
div.addEventListener('click', callback, false);
p.addEventListener('click', callback, false);

function callback(event) {
  var tag = event.currentTarget.tagName;
  var phase = phases[event.eventPhase];
  console.log("Tag: '" + tag + "'. EventPhase: '" + phase + "'");
}

// 点击以后的结果
// Tag: 'DIV'. EventPhase: 'capture'
// Tag: 'P'. EventPhase: 'target'
// Tag: 'P'. EventPhase: 'target'
// Tag: 'DIV'. EventPhase: 'bubble'
```

上面代码表示，`click`事件被触发了四次：`<div>`节点的捕获阶段和冒泡阶段各1次，`<p>`节点的目标阶段触发了2次。

- --
- 捕获阶段：事件从`<div>`向`<p>`传播时，触发`<div>`的`click`事件；
- 目标阶段：事件从`<div>`到达`<p>`时，触发`<p>`的`click`事件；
- 冒泡阶段：事件从`<p>`传回`<div>`时，再次触发`<div>`的`click`事件。
- --

其中，`<p>`节点有两个监听函数（`addEventListener`方法第三个参数的不同，会导致绑定两个监听函数），因此它们都会因为`click`事件触发一次。所以，`<p>`会在`target`阶段有两次输出。

注意，浏览器总是假定`click`事件的目标节点，就是点击位置嵌套最深的那个节点（本例是`<div>`节点里面的`<p>`节点）。所以，`<p>`节点的捕获阶段和冒泡阶段，都会显示为`target`阶段。

事件传播的最上层对象是`window`，接着依次是`document`，`html（document.documentElement）`和`body（document.body）`。也就是说，上例的事件传播顺序，在捕获阶段依次为`window`、`document`、`html`、`body`、`div`、`p`，在冒泡阶段依次为`p`、`div`、`body`、`html`、`document`、`window`。

#### 6.5.事件的代理

由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的**代理（delegation）**。

```javascript
var ul = document.querySelector('ul');

ul.addEventListener('click', function (event) {
  if (event.target.tagName.toLowerCase() === 'li') {
    // some code
  }
});
```

上面代码中，`click`事件的监听函数定义在`<ul>`节点，但是实际上，它处理的是子节点`<li>`的click事件。这样做的好处是，只要定义一个监听函数，就能处理多个子节点的事件，而不用在每个`<li>`节点上定义监听函数。而且以后再添加子节点，监听函数依然有效。

如果希望事件到某个节点为止，不再传播，可以使用事件对象的`stopPropagation`方法。

```javascript
// 事件传播到 p 元素后，就不再向下传播了
p.addEventListener('click', function (event) {
  event.stopPropagation();
}, true);

// 事件冒泡到 p 元素后，就不再向上冒泡了
p.addEventListener('click', function (event) {
  event.stopPropagation();
}, false);
```

上面代码中，`stopPropagation`方法分别在捕获阶段和冒泡阶段，阻止了事件的传播。

但是，`stopPropagation`方法只会阻止事件的传播，不会阻止该事件触发`<p>`节点的其他`click`事件的监听函数。也就是说，不是彻底取消`click`事件。

```javascript
p.addEventListener('click', function (event) {
  event.stopPropagation();
  console.log(1);
});

p.addEventListener('click', function(event) {
  // 会触发
  console.log(2);
});
```

上面代码中，p元素绑定了两个`click`事件的监听函数。`stopPropagation`方法只能阻止这个事件向其他元素传播。因此，第二个监听函数会触发。输出结果会先是1，然后是2。

如果想要彻底阻止这个事件的传播，不再触发后面所有`click`的监听函数，可以使用`stopImmediatePropagation`方法。

```javascript
p.addEventListener('click', function (event) {
  event.stopImmediatePropagation();
  console.log(1);
});

p.addEventListener('click', function(event) {
  // 不会被触发
  console.log(2);
});
```

上面代码中，`stopImmediatePropagation`方法可以彻底阻止这个事件传播，使得后面绑定的所有`click`监听函数都不再触发。所以，只会输出1，不会输出2。

#### 6.6.Event 对象概述

事件发生以后，会产生一个事件对象，作为参数传给监听函数。浏览器原生提供一个`Event`对象，所有的事件都是这个对象的实例，或者说继承了`Event.prototype`对象。

`Event`对象本身就是一个构造函数，可以用来生成新的实例。

`event = new Event(type, options);`

`Event`构造函数接受两个参数。第一个参数`type`是字符串，表示事件的名称；第二个参数`options`是一个对象，表示事件对象的配置。该对象主要有下面两个属性。

- --
- `bubbles`：布尔值，可选，默认为false，表示事件对象是否冒泡。
- `cancelable`：布尔值，可选，默认为false，表示事件是否可以被取消，即能否用`Event.preventDefault()`取消这个事件。一旦事件被取消，就好像从来没有发生过，不会触发浏览器对该事件的默认行为。
- --

```javascript
var ev = new Event(
  'look',
  {
    'bubbles': true,
    'cancelable': false
  }
);
document.dispatchEvent(ev);
```

上面代码新建一个look事件实例，然后使用`dispatchEvent`方法触发该事件。

注意，如果不是显式指定`bubbles`属性为true，生成的事件就只能在“捕获阶段”触发监听函数。

```javascript
// HTML 代码为
// <div><p>Hello</p></div>
var div = document.querySelector('div');
var p = document.querySelector('p');

function callback(event) {
  var tag = event.currentTarget.tagName;
  console.log('Tag: ' + tag); // 没有任何输出
}

div.addEventListener('click', callback, false);

var click = new Event('click');
p.dispatchEvent(click);
```

上面代码中，p元素发出一个`click`事件，该事件默认不会冒泡。`div.addEventListener`方法指定在冒泡阶段监听，因此监听函数不会触发。如果写成`div.addEventListener('click', callback, true)`，那么在“捕获阶段”可以监听到这个事件。

另一方面，如果这个事件在div元素上触发。

`div.dispatchEvent(click);`

那么，不管div元素是在冒泡阶段监听，还是在捕获阶段监听，都会触发监听函数。因为这时div元素是事件的目标，不存在是否冒泡的问题，div元素总是会接收到事件，因此导致监听函数生效。

#### 6.7.Event 对象的实例属性

##### 6.7.1 Event.bubbles，Event.eventPhase

`Event.bubbles`属性返回一个布尔值，表示当前事件是否会冒泡。该属性为只读属性，一般用来了解 `Event` 实例是否可以冒泡。前面说过，除非显式声明，`Event`构造函数生成的事件，默认是不冒泡的。

`Event.eventPhase`属性返回一个整数常量，表示事件目前所处的阶段。该属性只读。

`var phase = event.eventPhase;`

`Event.eventPhase`的返回值有四种可能。

- --
- 0，事件目前没有发生。
- 1，事件目前处于捕获阶段，即处于从祖先节点向目标节点的传播过程中。
- 2，事件到达目标节点，即Event.target属性指向的那个节点。
- 3，事件处于冒泡阶段，即处于从目标节点向祖先节点的反向传播过程中。
- --

##### 6.7.2 Event.cancelable，Event.cancelBubble，event.defaultPrevented

`Event.cancelable`属性返回一个布尔值，表示事件是否可以取消。该属性为只读属性，一般用来了解 `Event` 实例的特性。

大多数浏览器的原生事件是可以取消的。比如，取消`click`事件，点击链接将无效。但是除非显式声明，`Event`构造函数生成的事件，默认是不可以取消的。

```javascript
var evt = new Event('foo');
evt.cancelable  // false
```

当`Event.cancelable`属性为true时，调用`Event.preventDefault()`就可以取消这个事件，阻止浏览器对该事件的默认行为。

如果事件不能取消，调用`Event.preventDefault()`会没有任何效果。所以使用这个方法之前，最好用`Event.cancelable`属性判断一下是否可以取消。

```javascript
function preventEvent(event) {
  if (event.cancelable) {
    event.preventDefault();
  } else {
    console.warn('This event couldn\'t be canceled.');
    console.dir(event);
  }
}
```

`Event.cancelBubble`属性是一个布尔值，如果设为true，相当于执行`Event.stopPropagation()`，可以阻止事件的传播。

`Event.defaultPrevented`属性返回一个布尔值，表示该事件是否调用过`Event.preventDefault`方法。该属性只读。

```javascript
if (event.defaultPrevented) {
  console.log('该事件已经取消了');
}
```

##### 6.7.3 Event.currentTarget，Event.target

`Event.currentTarget`属性返回事件当前所在的节点，即正在执行的监听函数所绑定的那个节点。

`Event.target`属性返回原始触发事件的那个节点，即事件最初发生的节点。事件传播过程中，不同节点的监听函数内部的`Event.target`与`Event.currentTarget`属性的值是不一样的，前者总是不变的，后者则是指向监听函数所在的那个节点对象。

```javascript
// HTML代码为
// <p id="para">Hello <em>World</em></p>
function hide(e) {
  console.log(this === e.currentTarget);  // 总是 true
  console.log(this === e.target);  // 有可能不是 true
  e.target.style.visibility = 'hidden';
}

para.addEventListener('click', hide, false);
```

上面代码中，如果在para节点的`<em>`子节点上面点击，则`e.target`指向`<em>`子节点，导致`<em>`子节点（即 World 部分）会不可见。如果点击 Hello 部分，则整个para都将不可见。

##### 6.7.4 Event.type

`Event.type`属性返回一个字符串，表示事件类型。事件的类型是在生成事件的时候。该属性只读。

```javascript
var evt = new Event('foo');
evt.type // "foo"
```

##### 6.7.5 Event.timeStamp

`Event.timeStamp`属性返回一个毫秒时间戳，表示事件发生的时间。它是相对于网页加载成功开始计算的。

```javascript
var evt = new Event('foo');
evt.timeStamp // 3683.6999999995896
```

它的返回值有可能是整数，也有可能是小数（高精度时间戳），取决于浏览器的设置。

下面是一个计算鼠标移动速度的例子，显示每秒移动的像素数量。

```javascript
var previousX;
var previousY;
var previousT;

window.addEventListener('mousemove', function(event) {
  if (
    previousX !== undefined &&
    previousY !== undefined &&
    previousT !== undefined
  ) {
    var deltaX = event.screenX - previousX;
    var deltaY = event.screenY - previousY;
    var deltaD = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

    var deltaT = event.timeStamp - previousT;
    console.log(deltaD / deltaT * 1000);
  }

  previousX = event.screenX;
  previousY = event.screenY;
  previousT = event.timeStamp;
});
```

##### 6.7.6 Event.isTrusted

`Event.isTrusted`属性返回一个布尔值，表示该事件是否由真实的用户行为产生。比如，用户点击链接会产生一个`click`事件，该事件是用户产生的；`Event`构造函数生成的事件，则是脚本产生的。

```javascript
var evt = new Event('foo');
evt.isTrusted // false
```

上面代码中，evt对象是脚本产生的，所以`isTrusted`属性返回false。

##### 6.7.7 Event.detail

`Event.detail`属性只有浏览器的 UI （用户界面）事件才具有。该属性返回一个数值，表示事件的某种信息。具体含义与事件类型相关。比如，对于`click`和`dbclick`事件，`Event.detail`是鼠标按下的次数（1表示单击，2表示双击，3表示三击）；对于鼠标滚轮事件，`Event.detail`是滚轮正向滚动的距离，负值就是负向滚动的距离，返回值总是3的倍数。

```javascript
// HTML 代码如下
// <p>Hello</p>
function giveDetails(e) {
  console.log(e.detail);
}

document.selectQuery('p') = giveDetails;
```

#### 6.8.Event 对象的实例方法

##### 6.8.1 Event.preventDefault()

`Event.preventDefault`方法取消浏览器对当前事件的默认行为。比如点击链接后，浏览器默认会跳转到另一个页面，使用这个方法以后，就不会跳转了；再比如，按一下空格键，页面向下滚动一段距离，使用这个方法以后也不会滚动了。该方法生效的前提是，事件对象的`cancelable`属性为true，如果为false，调用该方法没有任何效果。

注意，该方法只是取消事件对当前元素的默认影响，不会阻止事件的传播。如果要阻止传播，可以使用`stopPropagation()`或`stopImmediatePropagation()`方法。

```javascript
// HTML 代码为
// <input type="checkbox" id="my-checkbox" />
var cb = document.getElementById('my-checkbox');

cb.addEventListener(
  'click',
  function (e){ e.preventDefault(); },
  false
);
```

上面代码中，浏览器的默认行为是单击会选中单选框，取消这个行为，就导致无法选中单选框。

利用这个方法，可以为文本输入框设置校验条件。如果用户的输入不符合条件，就无法将字符输入文本框。

```javascript
// HTML 代码为
// <input type="text" id="my-input" />
var input = document.getElementById('my-input');
input.addEventListener('keypress', checkName, false);

function checkName(e) {
  if (e.charCode < 97 || e.charCode > 122) {
    e.preventDefault();
  }
}
```

上面代码为文本框的`keypress`事件设定监听函数后，将只能输入小写字母，否则输入事件的默认行为（写入文本框）将被取消，导致不能向文本框输入内容。

##### 6.8.2 Event.stopPropagation()

`stopPropagation`方法阻止事件在 DOM 中继续传播，防止再触发定义在别的节点上的监听函数，但是不包括在当前节点上其他的事件监听函数。

```javascript
function stopEvent(e) {
  e.stopPropagation();
}

el.addEventListener('click', stopEvent, false);
```

上面代码中，click事件将不会进一步冒泡到el节点的父节点。

##### 6.8.3 Event.stopImmediatePropagation()

`Event.stopImmediatePropagation`方法阻止同一个事件的其他监听函数被调用，不管监听函数定义在当前节点还是其他节点。也就是说，该方法阻止事件的传播，比`Event.stopPropagation()`更彻底。

如果同一个节点对于同一个事件指定了多个监听函数，这些函数会根据添加的顺序依次调用。只要其中有一个监听函数调用了`Event.stopImmediatePropagation`方法，其他的监听函数就不会再执行了。

```javascript
function l1(e){
  e.stopImmediatePropagation();
}

function l2(e){
  console.log('hello world');
}

el.addEventListener('click', l1, false);
el.addEventListener('click', l2, false);
```

上面代码在el节点上，为click事件添加了两个监听函数l1和l2。由于l1调用了`event.stopImmediatePropagation`方法，所以l2不会被调用。

##### 6.8.4 Event.composedPath()

`Event.composedPath()`返回一个数组，成员是事件的最底层节点和依次冒泡经过的所有上层节点。

```javascript
// HTML 代码如下
// <div>
//   <p>Hello</p>
// </div>
var div = document.querySelector('div');
var p = document.querySelector('p');

div.addEventListener('click', function (e) {
  console.log(e.composedPath());
}, false);
// [p, div, body, html, document, Window]
```

#### 6.9.CustomEvent 接口

`CustomEvent` 接口用于生成自定义的事件实例。那些浏览器预定义的事件，虽然可以手动生成，但是往往不能在事件上绑定数据。如果需要在触发事件的同时，传入指定的数据，就可以使用 `CustomEvent` 接口生成的自定义事件对象。

浏览器原生提供`CustomEvent()`构造函数，用来生成 `CustomEvent` 事件实例。

`new CustomEvent(type, options)`

`CustomEvent()`构造函数接受两个参数。第一个参数是字符串，表示事件的名字，这是必须的。第二个参数是事件的配置对象，这个参数是可选的。`CustomEvent`的配置对象除了接受 `Event` 事件的配置属性，只有一个自己的属性。

- `detail`：表示事件的附带数据，默认为`null`。

下面是一个例子。

```javascript
var event = new CustomEvent('build', { 'detail': 'hello' });

function eventHandler(e) {
  console.log(e.detail);
}

document.body.addEventListener('build', function (e) {
  console.log(e.detail);
});

document.body.dispatchEvent(event);
```

上面代码中，我们手动定义了build事件。该事件触发后，会被监听到，从而输出该事件实例的`detail`属性（即字符串hello）。

下面是另一个例子。

```javascript
var myEvent = new CustomEvent('myevent', {
  detail: {
    foo: 'bar'
  },
  bubbles: true,
  cancelable: false
});

el.addEventListener('myevent', function (event) {
  console.log('Hello ' + event.detail.foo);
});

el.dispatchEvent(myEvent);
```

上面代码也说明，`CustomEvent` 的事件实例，除了具有 `Event` 接口的实例属性，还具有`detail`属性。

### 7.事件类型

浏览器支持大量的事件，本章介绍其中一些主要的事件。

#### 7.1.鼠标事件

鼠标事件指与鼠标相关的事件，继承了`MouseEvent`接口。具体的事件主要有以下一些。

- --
- `click`：按下鼠标（通常是按下主按钮）时触发。
- `dblclick`：在同一个元素上双击鼠标时触发。
- --
- `mousedown`：按下鼠标键时触发。
- `mouseup`：释放按下的鼠标键时触发。
- `mousemove`：当鼠标在一个节点内部移动时触发。当鼠标持续移动时，该事件会连续触发。为了避免性能问题，建议对该事件的监听函数做一些限定，比如限定一段时间内只能运行一次。
- --
- `mouseenter`：鼠标进入一个节点时触发，进入子节点不会触发这个事件。
- `mouseover`：鼠标进入一个节点时触发，进入子节点会再一次触发这个事件。
- `mouseout`：鼠标离开一个节点时触发，离开父节点也会触发这个事件。
- `mouseleave`：鼠标离开一个节点时触发，离开父节点不会触发这个事件。
- --
- `contextmenu`：按下鼠标右键时（上下文菜单出现前）触发，或者按下“上下文菜单键”时触发。
- `wheel`：滚动鼠标的滚轮时触发，该事件继承的是WheelEvent接口。
- --

`click`事件指的是，用户在同一个位置先完成`mousedown`动作，再完成`mouseup`动作。因此，触发顺序是，`mousedown`首先触发，`mouseup`接着触发，`click`最后触发。

`dblclick`事件则会在`mousedown`、`mouseup`、`click`之后触发。

`mouseover`事件和`mouseenter`事件，都是鼠标进入一个节点时触发。两者的区别是，`mouseenter`事件只触发一次，而只要鼠标在节点内部移动，`mouseover`事件会在子节点上触发多次。

```javascript
/* HTML 代码如下
 <ul>
   <li>item 1</li>
   <li>item 2</li>
  <li>item 3</li>
 </ul>
*/

var ul = document.querySelector('ul');

// 进入 ul 节点以后，mouseenter 事件只会触发一次
// 以后只要鼠标在节点内移动，都不会再触发这个事件
// event.target 是 ul 节点
ul.addEventListener('mouseenter', function (event) {
  event.target.style.color = 'purple';
  setTimeout(function () {
    event.target.style.color = '';
  }, 500);
}, false);

// 进入 ul 节点以后，只要在子节点上移动，mouseover 事件会触发多次
// event.target 是 li 节点
ul.addEventListener('mouseover', function (event) {
  event.target.style.color = 'orange';
  setTimeout(function () {
    event.target.style.color = '';
  }, 500);
}, false);
```

上面代码中，在父节点内部进入子节点，不会触发`mouseenter`事件，但是会触发`mouseover`事件。

`mouseout`事件和`mouseleave`事件，都是鼠标离开一个节点时触发。两者的区别是，在父元素内部离开一个子元素时，`mouseleave`事件不会触发，而`mouseout`事件会触发。

```javascript
/* HTML 代码如下
 <ul>
   <li>item 1</li>
   <li>item 2</li>
  <li>item 3</li>
 </ul>
*/

var ul = document.querySelector('ul');

// 先进入 ul 节点，然后在节点内部移动，不会触发 mouseleave 事件
// 只有离开 ul 节点时，触发一次 mouseleave
// event.target 是 ul 节点
ul.addEventListener('mouseleave', function (event) {
  event.target.style.color = 'purple';
  setTimeout(function () {
    event.target.style.color = '';
  }, 500);
}, false);

// 先进入 ul 节点，然后在节点内部移动，mouseout 事件会触发多次
// event.target 是 li 节点
ul.addEventListener('mouseout', function (event) {
  event.target.style.color = 'orange';
  setTimeout(function () {
    event.target.style.color = '';
  }, 500);
}, false);
```

上面代码中，在父节点内部离开子节点，不会触发`mouseleave`事件，但是会触发`mouseout`事件。

#### 7.2.MouseEvent 接口概述

`MouseEvent`接口代表了鼠标相关的事件，单击（click）、双击（dblclick）、松开鼠标键（mouseup）、按下鼠标键（mousedown）等动作，所产生的事件对象都是`MouseEvent`实例。此外，滚轮事件和拖拉事件也是`MouseEvent`实例。

`MouseEvent`接口继承了`Event`接口，所以拥有`Event`的所有属性和方法。它还有自己的属性和方法。

浏览器原生提供一个`MouseEvent`构造函数，用于新建一个`MouseEvent`实例。

`var event = new MouseEvent(type, options);`

`MouseEvent`构造函数接受两个参数。第一个参数是字符串，表示事件名称；第二个参数是一个事件配置对象，该参数可选。除了`Event`接口的实例配置属性，该对象可以配置以下属性，所有属性都是可选的。

- --
- `screenX`：数值，鼠标相对于屏幕的水平位置（单位像素），默认值为0，设置该属性不会移动鼠标。
- `screenY`：数值，鼠标相对于屏幕的垂直位置（单位像素），其他与`screenX`相同。
- --
- `clientX`：数值，鼠标相对于程序窗口的水平位置（单位像素），默认值为0，设置该属性不会移动鼠标。
- `clientY`：数值，鼠标相对于程序窗口的垂直位置（单位像素），其他与`clientX`相同。
- --
- `ctrlKey`：布尔值，是否同时按下了 `Ctrl` 键，默认值为false。
- `shiftKey`：布尔值，是否同时按下了 `Shift` 键，默认值为false。
- `altKey`：布尔值，是否同时按下 `Alt` 键，默认值为false。
- `metaKey`：布尔值，是否同时按下 `Meta` 键，默认值为false。
- --
- `button`：数值，表示按下了哪一个鼠标按键，默认值为0，表示按下主键（通常是鼠标的左键）或者当前事件没有定义这个属性；1表示按下辅助键（通常是鼠标的中间键），2表示按下次要键（通常是鼠标的右键）。
- --
- `buttons`：数值，表示按下了鼠标的哪些键，是一个三个比特位的二进制值，默认为0（没有按下任何键）。1（二进制001）表示按下主键（通常是左键），2（二进制010）表示按下次要键（通常是右键），4（二进制100）表示按下辅助键（通常是中间键）。因此，如果返回3（二进制011）就表示同时按下了左键和右键。
- --
- `relatedTarget`：节点对象，表示事件的相关节点，默认为`null`。`mouseenter`和`mouseover`事件时，表示鼠标刚刚离开的那个元素节点；`mouseout`和`mouseleave`事件时，表示鼠标正在进入的那个元素节点。
- --

下面是一个例子。

```javascript
function simulateClick() {
  var event = new MouseEvent('click', {
    'bubbles': true,
    'cancelable': true
  });
  var cb = document.getElementById('checkbox');
  cb.dispatchEvent(event);
}
```

上面代码生成一个鼠标点击事件，并触发该事件。

#### 7.3.MouseEvent 接口的实例属性

##### 7.3.1 MouseEvent.altKey，MouseEvent.ctrlKey，MouseEvent.metaKey，MouseEvent.shiftKey

`MouseEvent.altKey`、`MouseEvent.ctrlKey`、`MouseEvent.metaKey`、`MouseEvent.shiftKey`这四个属性都返回一个布尔值，表示事件发生时，是否按下对应的键。它们都是只读属性。

- --
- altKey属性：Alt 键
- ctrlKey属性：Ctrl 键
- metaKey属性：Meta 键（Mac 键盘是一个四瓣的小花，Windows 键盘是 Windows 键）
- shiftKey属性：Shift 键
- --

```javascript
// HTML 代码如下
// <body onclick="showKey(event)">
function showKey(e) {
  console.log('ALT key pressed: ' + e.altKey);
  console.log('CTRL key pressed: ' + e.ctrlKey);
  console.log('META key pressed: ' + e.metaKey);
  console.log('SHIFT key pressed: ' + e.shiftKey);
}
```

上面代码中，点击网页会输出是否同时按下对应的键。

##### 7.3.2 MouseEvent.button，MouseEvent.buttons

`MouseEvent.button`属性返回一个数值，表示事件发生时按下了鼠标的哪个键。该属性只读。

- --
- 0：按下主键（通常是左键），或者该事件没有初始化这个属性（比如`mousemove`事件）。
- 1：按下辅助键（通常是中键或者滚轮键）。
- 2：按下次键（通常是右键）。
- --

```javascript
// HTML 代码为
// <button onmouseup="whichButton(event)">点击</button>
var whichButton = function (e) {
  switch (e.button) {
    case 0:
      console.log('Left button clicked.');
      break;
    case 1:
      console.log('Middle button clicked.');
      break;
    case 2:
      console.log('Right button clicked.');
      break;
    default:
      console.log('Unexpected code: ' + e.button);
  }
}
```

`MouseEvent.buttons`属性返回一个三个比特位的值，表示同时按下了哪些键。它用来处理同时按下多个鼠标键的情况。该属性只读。

- --
- 1：二进制为001（十进制的1），表示按下左键。
- 2：二进制为010（十进制的2），表示按下右键。
- 4：二进制为100（十进制的4），表示按下中键或滚轮键。
- --

同时按下多个键的时候，每个按下的键对应的比特位都会有值。比如，同时按下左键和右键，会返回3（二进制为011）。

##### 7.3.3 MouseEvent.clientX，MouseEvent.clientY

`MouseEvent.clientX`属性返回鼠标位置相对于浏览器窗口左上角的水平坐标（单位像素），`MouseEvent.clientY`属性返回垂直坐标。这两个属性都是只读属性。

```javascript
// HTML 代码为
// <body onmousedown="showCoords(event)">
function showCoords(evt){
  console.log(
    'clientX value: ' + evt.clientX + '\n' +
    'clientY value: ' + evt.clientY + '\n'
  );
}
```

> 这两个属性还分别有一个别名`MouseEvent.x`和`MouseEvent.y`。

##### 7.3.4 MouseEvent.movementX，MouseEvent.movementY

`MouseEvent.movementX`属性返回当前位置与上一个`mousemove`事件之间的水平距离（单位像素）。数值上，它等于下面的计算公式。

`currentEvent.movementX = currentEvent.screenX - previousEvent.screenX`

`MouseEvent.movementY`属性返回当前位置与上一个`mousemove`事件之间的垂直距离（单位像素）。数值上，它等于下面的计算公式。

`currentEvent.movementY = currentEvent.screenY - previousEvent.screenY。`

> 这两个属性都是只读属性。

##### 7.3.5 MouseEvent.screenX，MouseEvent.screenY

`MouseEvent.screenX`属性返回鼠标位置相对于屏幕左上角的水平坐标（单位像素），`MouseEvent.screenY`属性返回垂直坐标。这两个属性都是只读属性。

```javascript
// HTML 代码如下
// <body onmousedown="showCoords(event)">
function showCoords(evt) {
  console.log(
    'screenX value: ' + evt.screenX + '\n'
    'screenY value: ' + evt.screenY + '\n'
  );
}
```

##### 7.3.6 MouseEvent.offsetX，MouseEvent.offsetY

`MouseEvent.offsetX`属性返回鼠标位置与目标节点左侧的`padding`边缘的水平距离（单位像素），`MouseEvent.offsetY`属性返回与目标节点上方的`padding`边缘的垂直距离。这两个属性都是只读属性。

```javascript
/* HTML 代码如下
  <style>
    p {
      width: 100px;
      height: 100px;
      padding: 100px;
    }
  </style>
  <p>Hello</p>
*/
var p = document.querySelector('p');
p.addEventListener(
  'click',
  function (e) {
    console.log(e.offsetX);
    console.log(e.offsetY);
  },
  false
);
```

上面代码中，鼠标如果在p元素的中心位置点击，会返回150 150。因此中心位置距离左侧和上方的`padding`边缘，等于`padding`的宽度（100像素）加上元素内容区域一半的宽度（50像素）。

##### 7.3.7 MouseEvent.pageX，MouseEvent.pageY

`MouseEvent.pageX`属性返回鼠标位置与文档左侧边缘的距离（单位像素），`MouseEvent.pageY`属性返回与文档上侧边缘的距离（单位像素）。它们的返回值都包括文档不可见的部分。这两个属性都是只读。

```javascript
/* HTML 代码如下
  <style>
    body {
      height: 2000px;
    }
  </style>
*/
document.body.addEventListener(
  'click',
  function (e) {
    console.log(e.pageX);
    console.log(e.pageY);
  },
  false
);
```

上面代码中，页面高度为2000像素，会产生垂直滚动条。滚动到页面底部，点击鼠标输出的`pageY`值会接近2000。

##### 7.3.8 MouseEvent.relatedTarget

`MouseEvent.relatedTarget`属性返回事件的相关节点。对于那些没有相关节点的事件，该属性返回`null`。该属性只读。

下表列出不同事件的`target`属性值和`relatedTarget`属性值义。

|事件名称|`target` 属性|`relatedTarget` 属性|
|:--:|--|--|
|`focusin`|接受焦点的节点|丧失焦点的节点|
|`focusout`|丧失焦点的节点|接受焦点的节点|
|`mouseenter`|将要进入的节点|将要离开的节点|
|`mouseleave`|将要离开的节点|将要进入的节点|
|`mouseout`|将要离开的节点|将要进入的节点|
|`mouseover`|将要进入的节点|将要离开的节点|
|`dragenter`|将要进入的节点|将要离开的节点|
|`dragexit`|将要离开的节点|将要进入的节点|

下面是一个例子。

```javascript
/*
  HTML 代码如下
  <div id="outer" style="height:50px;width:50px;border-width:1px solid black;">
    <div id="inner" style="height:25px;width:25px;border:1px solid black;"></div>
  </div>
*/

var inner = document.getElementById('inner');
inner.addEventListener('mouseover', function (event) {
  console.log('进入' + event.target.id + ' 离开' + event.relatedTarget.id);
}, false);
inner.addEventListener('mouseenter', function (event) {
  console.log('进入' + event.target.id + ' 离开' + event.relatedTarget.id);
});
inner.addEventListener('mouseout', function () {
  console.log('离开' + event.target.id + ' 进入' + event.relatedTarget.id);
});
inner.addEventListener("mouseleave", function (){
  console.log('离开' + event.target.id + ' 进入' + event.relatedTarget.id);
});

// 鼠标从 outer 进入inner，输出
// 进入inner 离开outer
// 进入inner 离开outer

// 鼠标从 inner进入 outer，输出
// 离开inner 进入outer
// 离开inner 进入outer
```

#### 7.4.MouseEvent 接口的实例方法

##### 7.4.1 MouseEvent.getModifierState()

`MouseEvent.getModifierState`方法返回一个布尔值，表示有没有按下特定的功能键。它的参数是一个表示功能键的字符串。

```javascript
document.addEventListener('click', function (e) {
  console.log(e.getModifierState('CapsLock'));
}, false);
```

上面的代码可以了解用户是否按下了大写键。

#### 7.5.WheelEvent 接口

##### 7.5.1 概述

`WheelEvent` 接口继承了 `MouseEvent` 实例，代表鼠标滚轮事件的实例对象。目前，鼠标滚轮相关的事件只有一个`wheel`事件，用户滚动鼠标的滚轮，就生成这个事件的实例。

浏览器原生提供`WheelEvent()`构造函数，用来生成`WheelEvent`实例。

`var wheelEvent = new WheelEvent(type, options);`

`WheelEvent()`构造函数可以接受两个参数，第一个是字符串，表示事件类型，对于滚轮事件来说，这个值目前只能是`wheel`。第二个参数是事件的配置对象。该对象的属性除了`Event`、`UIEvent`的配置属性以外，还可以接受以下几个属性，所有属性都是可选的。

- --
- `deltaX`：数值，表示滚轮的水平滚动量，默认值是 0.0。
- `deltaY`：数值，表示滚轮的垂直滚动量，默认值是 0.0。
- `deltaZ`：数值，表示滚轮的 Z 轴滚动量，默认值是 0.0。
- `deltaMode`：数值，表示相关的滚动事件的单位，适用于上面三个属性。0表示滚动单位为像素，1表示单位为行，2表示单位为页，默认为0。
- --

##### 7.5.2 实例属性

`WheelEvent`事件实例除了具有`Event`和`MouseEvent`的实例属性和实例方法，还有一些自己的实例属性，但是没有自己的实例方法。

下面的属性都是只读属性。

- --
- `WheelEvent.deltaX`：数值，表示滚轮的水平滚动量。
- `WheelEvent.deltaY`：数值，表示滚轮的垂直滚动量。
- `WheelEvent.deltaZ`：数值，表示滚轮的 Z 轴滚动量。
- `WheelEvent.deltaMode`：数值，表示上面三个属性的单位，0是像素，1是行，2是页。
- --

#### 7.6.键盘事件

键盘事件由用户击打键盘触发，主要有`keydown`、`keypress`、`keyup`三个事件，它们都继承了`KeyboardEvent`接口。

- --
- `keydown`：按下键盘时触发。
- `keypress`：按下有值的键时触发，即按下 Ctrl、Alt、Shift、Meta 这样无值的键，这个事件不会触发。对于有值的键，按下时先触发`keydown`事件，再触发这个事件。
- `keyup`：松开键盘时触发该事件。
- --

如果用户一直按键不松开，就会连续触发键盘事件，触发的顺序如下。

- --
- a.keydown
- b.keypress
- c.keydown
- d.keypress
- e.…（重复以上过程）
- f.keyup
- --

#### 7.7.KeyboardEvent 接口

`KeyboardEvent`接口用来描述用户与键盘的互动。这个接口继承了`Event`接口，并且定义了自己的实例属性和实例方法。

浏览器原生提供`KeyboardEvent`构造函数，用来新建键盘事件的实例。

`new KeyboardEvent(type, options)`

`KeyboardEvent`构造函数接受两个参数。第一个参数是字符串，表示事件类型；第二个参数是一个事件配置对象，该参数可选。除了`Event`接口提供的属性，还可以配置以下字段，它们都是可选。

- --
- `key`：字符串，当前按下的键，默认为空字符串。
- `code`：字符串，表示当前按下的键的字符串形式，默认为空字符串。
- `location`：整数，当前按下的键的位置，默认为0。
- --
- `ctrlKey`：布尔值，是否按下 Ctrl 键，默认为false。
- `shiftKey`：布尔值，是否按下 Shift 键，默认为false。
- `altKey`：布尔值，是否按下 Alt 键，默认为false。
- `metaKey`：布尔值，是否按下 Meta 键，默认为false。
- `repeat`：布尔值，是否重复按键，默认为false。
- --

#### 7.8.KeyboardEvent 的实例属性

##### 7.8.1 KeyboardEvent.altKey，KeyboardEvent.metaKey.ctrlKey，KeyboardEvent.metaKey，KeyboardEvent.shiftKey

以下属性都是只读属性，返回一个布尔值，表示是否按下对应的键。

- --
- `KeyboardEvent.altKey`：是否按下 Alt 键
- `KeyboardEvent.ctrlKey`：是否按下 Ctrl 键
- `KeyboardEvent.metaKey`：是否按下 meta 键（Mac 系统是一个四瓣的小花，Windows 系统是 windows 键）
- `KeyboardEvent.shiftKey`：是否按下 Shift 键
- --

下面是一个示例。

```javascript
function showChar(e){
  console.log("ALT: " + e.altKey);
  console.log("CTRL: " + e.ctrlKey);
  console.log("Meta: " + e.metaKey);
  console.log("Meta: " + e.shiftKey);
}

document.body.addEventListener('click', showChar, false);
```

##### 7.8.2 KeyboardEvent.code

`KeyboardEvent.code`属性返回一个字符串，表示当前按下的键的字符串形式。该属性只读。

下面是一些常用键的字符串形式，其他键请查文档。

- --
- 数字键0 - 9：返回`digital0 - digital9`
- 字母键A - z：返回`KeyA - KeyZ`
- 功能键F1 - F12：返回 `F1 - F12`
- 方向键：返回`ArrowDown、ArrowUp、ArrowLeft、ArrowRight`
- Alt 键：返回`AltLeft`或`AltRight`
- Shift 键：返回`ShiftLeft`或`ShiftRight`
- Ctrl 键：返回`ControLeft`或`ControlRight`
- --

##### 7.8.3 KeyboardEvent.key

`KeyboardEvent.key`属性返回一个字符串，表示按下的键名。该属性只读。

如果按下的键代表可打印字符，则返回这个字符，比如数字、字母。

如果按下的键代表不可打印的特殊字符，则返回预定义的键值，比如 Backspace，Tab，Enter，Shift，Control，Alt，CapsLock，Esc，Spacebar，PageUp，PageDown，End，Home，Left，Right，Up，Down，PrintScreen，Insert，Del，Win，F1～F12，NumLock，Scroll 等。

如果同时按下一个控制键和一个符号键，则返回符号键的键名。比如，按下 Ctrl + a，则返回a；按下 Shift + a，则返回大写的A。

如果无法识别键名，返回字符串`Unidentified`。

##### 7.8.4 KeyboardEvent.location

`KeyboardEvent.location`属性返回一个整数，表示按下的键处在键盘的哪一个区域。它可能取以下值。

- --
- 0：处在键盘的主区域，或者无法判断处于哪一个区域。
- 1：处在键盘的左侧，只适用那些有两个位置的键（比如 Ctrl 和 Shift 键）。
- 2：处在键盘的右侧，只适用那些有两个位置的键（比如 Ctrl 和 Shift 键）。
- 3：处在数字小键盘。
- --

##### 7.8.5 KeyboardEvent.repeat

`KeyboardEvent.repeat`返回一个布尔值，代表该键是否被按着不放，以便判断是否重复这个键，即浏览器会持续触发`keydown`和`keypress`事件，直到用户松开手为止。

#### 7.9.KeyboardEvent 的实例方法

##### 7.9.1 KeyboardEvent.getModifierState()

`KeyboardEvent.getModifierState()`方法返回一个布尔值，表示是否按下或激活指定的功能键。它的常用参数如下。

- --
- Alt：Alt 键
- CapsLock：大写锁定键
- Control：Ctrl 键
- Meta：Meta 键
- NumLock：数字键盘开关键
- Shift：Shift 键
- --

```javascript
if (
  event.getModifierState('Control') +
  event.getModifierState('Alt') +
  event.getModifierState('Meta') > 1
) {
  return;
}
```

上面代码表示，只要Control、Alt、Meta里面，同时按下任意两个或两个以上的键就返回。

#### 7.10.进度事件

进度事件用来描述资源加载的进度，主要由 AJAX 请求、`<img>`、`<audio>`、`<video>`、`<style>`、`<link>`等外部资源的加载触发，继承了`ProgressEvent`接口。它主要包含以下几种事件。

- --
- `abort`：外部资源中止加载时（比如用户取消）触发。如果发生错误导致中止，不会触发该事件。
- `error`：由于错误导致外部资源无法加载时触发。
- `load`：外部资源加载成功时触发。
- `loadstart`：外部资源开始加载时触发。
- `loadend`：外部资源停止加载时触发，发生顺序排在`error`、`abort`、`load`等事件的后面。
- `progress`：外部资源加载过程中不断触发。
- `timeout`：加载超时时触发。
- --

注意，除了资源下载，文件上传也存在这些事件。

下面是一个例子。

```javascript
image.addEventListener('load', function (event) {
  image.classList.add('finished');
});

image.addEventListener('error', function (event) {
  image.style.display = 'none';
});
```

上面代码在图片元素加载完成后，为图片元素添加一个finished的 Class。如果加载失败，就把图片元素的样式设置为不显示。

有时候，图片加载会在脚本运行之前就完成，尤其是当脚本放置在网页底部的时候，因此有可能`load`和`error`事件的监听函数根本不会执行。所以，比较可靠的方式，是用`complete`属性先判断一下是否加载完成。

```javascript
function loaded() {
  // ...
}

if (image.complete) {
  loaded();
} else {
  image.addEventListener('load', loaded);
}
```

由于 DOM 的元素节点没有提供是否加载错误的属性，所以`error`事件的监听函数最好放在`<img>`元素的 HTML 代码中，这样才能保证发生加载错误时百分之百会执行。

`<img src="/wrong/url" onerror="this.style.display='none';" />`

`loadend`事件的监听函数，可以用来取代`abort`事件、`load`事件、`error`事件的监听函数，因为它总是在这些事件之后发生。

```javascript
req.addEventListener('loadend', loadEnd, false);

function loadEnd(e) {
  console.log('传输结束，成功失败未知');
}
```

`loadend`事件本身不提供关于进度结束的原因，但可以用它来做所有加载结束场景都需要做的一些操作。

另外，`error`事件有一个特殊的性质，就是不会冒泡。所以，子元素的`error`事件，不会触发父元素的`error`事件监听函数。

#### 7.11.ProgressEvent 接口

`ProgressEvent`接口主要用来描述外部资源加载的进度，比如 AJAX 加载、`<img>`、`<video>`、`<style>`、`<link>`等外部资源加载。进度相关的事件都继承了这个接口。

浏览器原生提供了`ProgressEvent()`构造函数，用来生成事件实例。

`new ProgressEvent(type, options)`

`ProgressEvent()`构造函数接受两个参数。第一个参数是字符串，表示事件的类型，这个参数是必须的。第二个参数是一个配置对象，表示事件的属性，该参数可选。配置对象除了可以使用`Event`接口的配置属性，还可以使用下面的属性，所有这些属性都是可选的。

- --
- `lengthComputable`：布尔值，表示加载的总量是否可以计算，默认是false。
- `loaded`：整数，表示已经加载的量，默认是0。
- `total`：整数，表示需要加载的总量，默认是0。
- --

`ProgressEvent`具有对应的实例属性。

- --
- `ProgressEvent.lengthComputable`
- `ProgressEvent.loaded`
- `ProgressEvent.total`
- --

如果`ProgressEvent.lengthComputable`为false，`ProgressEvent.total`实际上是没有意义的。

下面是一个例子。

```javascript
var p = new ProgressEvent('load', {
  lengthComputable: true,
  loaded: 30,
  total: 100,
});

document.body.addEventListener('load', function (e) {
  console.log('已经加载：' + (e.loaded / e.total) * 100 + '%');
});

document.body.dispatchEvent(p);
// 已经加载：30%
```

上面代码先构造一个`load`事件，抛出后被监听函数捕捉到。

下面是一个实际的例子。

```javascript
var xhr = new XMLHttpRequest();

xhr.addEventListener('progress', updateProgress, false);
xhr.addEventListener('load', transferComplete, false);
xhr.addEventListener('error', transferFailed, false);
xhr.addEventListener('abort', transferCanceled, false);

xhr.open();

function updateProgress(e) {
  if (e.lengthComputable) {
    var percentComplete = e.loaded / e.total;
  } else {
    console.log('不能计算进度');
  }
}

function transferComplete(e) {
  console.log('传输结束');
}

function transferFailed(evt) {
  console.log('传输过程中发生错误');
}

function transferCanceled(evt) {
  console.log('用户取消了传输');
}
```

上面是下载过程的进度事件，还存在上传过程的进度事件。这时所有监听函数都要放在`XMLHttpRequest.upload`对象上面。

```javascript
var xhr = new XMLHttpRequest();

xhr.upload.addEventListener('progress', updateProgress, false);
xhr.upload.addEventListener('load', transferComplete, false);
xhr.upload.addEventListener('error', transferFailed, false);
xhr.upload.addEventListener('abort', transferCanceled, false);

xhr.open();
```

#### 7.12.拖拉事件

**拖拉（drag）**指的是，用户在某个对象上按下鼠标键不放，拖动它到另一个位置，然后释放鼠标键，将该对象放在那里。

拖拉的对象有好几种，包括元素节点、图片、链接、选中的文字等等。在网页中，除了元素节点默认不可以拖拉，其他（图片、链接、选中的文字）都是可以直接拖拉的。为了让元素节点可拖拉，可以将该节点的`draggable`属性设为true。

```javascript
<div draggable="true">
  此区域可拖拉
</div>
```

`draggable`属性可用于任何元素节点，但是图片（`<img>`）和链接（`<a>`）不加这个属性，就可以拖拉。对于它们，用到这个属性的时候，往往是将其设为false，防止拖拉这两种元素。

注意，一旦某个元素节点的`draggable`属性设为true，就无法再用鼠标选中该节点内部的文字或子节点了。

当元素节点或选中的文本被拖拉时，就会持续触发拖拉事件，包括以下一些事件。

- --
- `drag`：拖拉过程中，在被拖拉的节点上持续触发（相隔几百毫秒）。
- `dragstart`：用户开始拖拉时，在被拖拉的节点上触发，该事件的`target`属性是被拖拉的节点。通常应该在这个事件的监听函数中，指定拖拉的数据。
- --
- `dragend`：拖拉结束时（释放鼠标键或按下 ESC 键）在被拖拉的节点上触发，该事件的`target`属性是被拖拉的节点。它与`dragstart`事件，在同一个节点上触发。不管拖拉是否跨窗口，或者中途被取消，`dragend`事件总是会触发的。
- --
- `dragenter`：拖拉进入当前节点时，在当前节点上触发一次，该事件的`target`属性是当前节点。通常应该在这个事件的监听函数中，指定是否允许在当前节点放下（drop）拖拉的数据。如果当前节点没有该事件的监听函数，或者监听函数不执行任何操作，就意味着不允许在当前节点放下数据。在视觉上显示拖拉进入当前节点，也是在这个事件的监听函数中设置。
- --
- `dragover`：拖拉到当前节点上方时，在当前节点上持续触发（相隔几百毫秒），该事件的`target`属性是当前节点。该事件与`dragenter`事件的区别是，`dragenter`事件在进入该节点时触发，然后只要没有离开这个节点，`dragover`事件会持续触发。
- --
- `dragleave`：拖拉操作离开当前节点范围时，在当前节点上触发，该事件的`target`属性是当前节点。如果要在视觉上显示拖拉离开操作当前节点，就在这个事件的监听函数中设置。
- --
- `drop`：被拖拉的节点或选中的文本，释放到目标节点时，在目标节点上触发。注意，如果当前节点不允许drop，即使在该节点上方松开鼠标键，也不会触发该事件。如果用户按下 ESC 键，取消这个操作，也不会触发该事件。该事件的监听函数负责取出拖拉数据，并进行相关处理。
- --

下面的例子展示，如何动态改变被拖动节点的背景色。

```javascript
div.addEventListener('dragstart', function (e) {
  this.style.backgroundColor = 'red';
}, false);

div.addEventListener('dragend', function (e) {
  this.style.backgroundColor = 'green';
}, false);
```

上面代码中，div节点被拖动时，背景色会变为红色，拖动结束，又变回绿色。

下面是一个例子，展示如何实现将一个节点从当前父节点，拖拉到另一个父节点中。

```javascript
/* HTML 代码如下
 <div class="dropzone">
   <div id="draggable" draggable="true">
     该节点可拖拉
   </div>
 </div>
 <div class="dropzone"></div>
 <div class="dropzone"></div>
 <div class="dropzone"></div>
*/

// 被拖拉节点
var dragged;

document.addEventListener('dragstart', function (event) {
  // 保存被拖拉节点
  dragged = event.target;
  // 被拖拉节点的背景色变透明
  event.target.style.opacity = 0.5;
}, false);

document.addEventListener('dragend', function (event) {
  // 被拖拉节点的背景色恢复正常
  event.target.style.opacity = '';
}, false);

document.addEventListener('dragover', function (event) {
  // 防止拖拉效果被重置，允许被拖拉的节点放入目标节点
  event.preventDefault();
}, false);

document.addEventListener('dragenter', function (event) {
  // 目标节点的背景色变紫色
  // 由于该事件会冒泡，所以要过滤节点
  if (event.target.className === 'dropzone') {
    event.target.style.background = 'purple';
  }
}, false);

document.addEventListener('dragleave', function( event ) {
  // 目标节点的背景色恢复原样
  if (event.target.className === 'dropzone') {
    event.target.style.background = '';
  }
}, false);

document.addEventListener('drop', function( event ) {
  // 防止事件默认行为（比如某些元素节点上可以打开链接），
  event.preventDefault();
  if (event.target.className === 'dropzone') {
    // 恢复目标节点背景色
    event.target.style.background = '';
    // 将被拖拉节点插入目标节点
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild( dragged );
  }
}, false);
```

关于拖拉事件，有以下几个注意点。

- --
- 拖拉过程只触发以上这些拖拉事件，尽管鼠标在移动，但是鼠标事件不会触发。
- 将文件从操作系统拖拉进浏览器，不会触发`dragstart`和`dragend`事件。
- --
- `dragenter`和`dragover`事件的监听函数，用来取出拖拉的数据（即允许放下被拖拉的元素）。由于网页的大部分区域不适合作为放下拖拉元素的目标节点，所以这两个事件的默认设置为当前节点不允许接受被拖拉的元素。如果想要在目标节点上放下的数据，首先必须阻止这两个事件的默认行为。
- --

```javascript
<div ondragover="return false">
<div ondragover="event.preventDefault()">
```

上面代码中，如果不取消拖拉事件或者阻止默认行为，就不能在div节点上放下被拖拉的节点。

#### 7.13.DragEvent 接口

拖拉事件都继承了`DragEvent`接口，这个接口又继承了`MouseEvent`接口和`Event`接口。

浏览器原生提供一个`DragEvent()`构造函数，用来生成拖拉事件的实例对象。

`new DragEvent(type, options)`

`DragEvent()`构造函数接受两个参数，第一个参数是字符串，表示事件的类型，该参数必须；第二个参数是事件的配置对象，用来设置事件的属性，该参数可选。配置对象除了接受`MouseEvent`接口和`Event`接口的配置属性，还可以设置`dataTransfer`属性要么是`null`，要么是一个`DataTransfer`接口的实例。

`DataTransfer`的实例对象用来读写拖拉事件中传输的数据。

#### 7.14.DataTransfer 接口

##### 7.14.1 概述

所有拖拉事件的实例都有一个`DragEvent.dataTransfer`属性，用来读写需要传递的数据。这个属性的值是一个`DataTransfer`接口的实例。

浏览器原生提供一个`DataTransfer()`构造函数，用来生成`DataTransfer`实例对象。

`var dataTrans = new DataTransfer();`

`DataTransfer()`构造函数不接受参数。

拖拉的数据分成两方面：数据的种类（又称格式）和数据的值。数据的种类是一个 MIME 字符串（比如`text/plain`、`image/jpeg`），数据的值是一个字符串。一般来说，如果拖拉一段文本，则数据默认就是那段文本；如果拖拉一个链接，则数据默认就是链接的 URL。

拖拉事件开始时，开发者可以提供数据类型和数据值。拖拉过程中，开发者通过`dragenter`和`dragover`事件的监听函数，检查数据类型，以确定是否允许放下（drop）被拖拉的对象。比如，在只允许放下链接的区域，检查拖拉的数据类型是否为`text/uri-list`。

发生drop事件时，监听函数取出拖拉的数据，对其进行处理。

##### 7.14.2 DataTransfer 的实例属性

`DataTransfer`实例对象有以下属性。

1).DataTransfer.dropEffect

`DataTransfer.dropEffect`属性用来设置放下（drop）被拖拉节点时的效果，会影响到拖拉经过相关区域时鼠标的形状。它可能取下面的值。

- --
- `copy`：复制被拖拉的节点
- `move`：移动被拖拉的节点
- `link`：创建指向被拖拉的节点的链接
- `none`：无法放下被拖拉的节点
- --

除了上面这些值，设置其他的值都是无效的。

```javascript
target.addEventListener('dragover', function (e) {
  e.preventDefault();
  e.stopPropagation();
  e.dataTransfer.dropEffect = 'copy';
});
```

上面代码中，被拖拉元素一旦drop，接受的区域会复制该节点。

`dropEffect`属性一般在`dragenter`和`dragover`事件的监听函数中设置，对于`dragstart`、`drag`、`dragleave`这三个事件，该属性不起作用。因为该属性只对接受被拖拉的节点的区域有效，对被拖拉的节点本身是无效的。进入目标区域后，拖拉行为会初始化成设定的效果。

2).DataTransfer.effectAllowed

`DataTransfer.effectAllowed`属性设置本次拖拉中允许的效果。它可能取下面的值。

- --
- `copy`：复制被拖拉的节点
- `move`：移动被拖拉的节点
- `link`：创建指向被拖拉节点的链接
- --
- `copyLink`：允许`copy`或`link`
- `copyMove`：允许`copy`或`move`
- `linkMove`：允许`link`或`move`
- --
- `all`：允许所有效果
- `none`：无法放下被拖拉的节点
- `uninitialized`：默认值，等同于all
- --

如果某种效果是不允许的，用户就无法在目标节点中达成这种效果。

这个属性与`dropEffect`属性是同一件事的两个方面。前者设置被拖拉的节点允许的效果，后者设置接受拖拉的区域的效果，它们往往配合使用。

`dragstart`事件的监听函数，可以用来设置这个属性。其他事件的监听函数里面设置这个属性是无效的。

```javascript
source.addEventListener('dragstart', function (e) {
  e.dataTransfer.effectAllowed = 'move';
});

target.addEventListener('dragover', function (e) {
  ev.dataTransfer.dropEffect = 'move';
});
```

只要`dropEffect`属性和`effectAllowed`属性之中，有一个为`none`，就无法在目标节点上完成drop操作。

3).DataTransfer.files

`DataTransfer.files`属性是一个 `FileList` 对象，包含一组本地文件，可以用来在拖拉操作中传送。如果本次拖拉不涉及文件，则该属性为空的 `FileList` 对象。

下面就是一个接收拖拉文件的例子。

```javascript
// HTML 代码如下
// <div id="output" style="min-height: 200px;border: 1px solid black;">
//   文件拖拉到这里
// </div>

var div = document.getElementById('output');

div.addEventListener("dragenter", function( event ) {
  div.textContent = '';
  event.stopPropagation();
  event.preventDefault();
}, false);

div.addEventListener("dragover", function( event ) {
  event.stopPropagation();
  event.preventDefault();
}, false);

div.addEventListener("drop", function( event ) {
  event.stopPropagation();
  event.preventDefault();
  var files = event.dataTransfer.files;
  for (var i = 0; i < files.length; i++) {
    div.textContent += files[i].name + ' ' + files[i].size + '字节\n';
  }
}, false);
```

上面代码中，通过`dataTransfer.files`属性读取被拖拉的文件的信息。如果想要读取文件内容，就要使用`FileReader`对象。

```javascript
div.addEventListener('drop', function(e) {
  e.preventDefault();
  e.stopPropagation();

  var fileList = e.dataTransfer.files;
  if (fileList.length > 0) {
    var file = fileList[0];
    var reader = new FileReader();
    reader.onloadend = function(e) {
      if (e.target.readyState === FileReader.DONE) {
        var content = reader.result;
        div.innerHTML = 'File: ' + file.name + '\n\n' + content;
      }
    }
    reader.readAsBinaryString(file);
  }
});
```

4).DataTransfer.types

`DataTransfer.types`属性是一个只读的数组，每个成员是一个字符串，里面是拖拉的数据格式（通常是 MIME 值）。比如，如果拖拉的是文字，对应的成员就是`text/plain`。

下面是一个例子，通过检查`dataTransfer`属性的类型，决定是否允许在当前节点执行drop操作。

```javascript
function contains(list, value){
  for (var i = 0; i < list.length; ++i) {
    if(list[i] === value) return true;
  }
  return false;
}

function doDragOver(event) {
  var isLink = contains(event.dataTransfer.types, 'text/uri-list');
  if (isLink) event.preventDefault();
}
```

上面代码中，只有当被拖拉的节点是一个链接时，才允许在当前节点放下。

5).DataTransfer.items

`DataTransfer.items`属性返回一个类似数组的只读对象（`DataTransferItemList` 实例），每个成员就是本次拖拉的一个对象（`DataTransferItem` 实例）。如果本次拖拉不包含对象，则返回一个空对象。

`DataTransferItemList` 实例具有以下的属性和方法。

- --
- `length`：返回成员的数量
- `add(data, type)`：增加一个指定内容和类型（比如`text/html`和`text/plain`）的字符串作为成员
- `add(file)`：增加一个文件作为成员
- `remove(index)`：移除指定位置的成员
- `clear()`：移除所有的成员
- --

`DataTransferItem` 实例具有以下的属性和方法。

- --
- `kind`：返回成员的种类（string还是file）
- `type`：返回成员的类型（通常是 MIME 值）
- `getAsFile()`：如果被拖拉是文件，返回该文件，否则返回`null`
- `getAsString(callback)`：如果被拖拉的是字符串，将该字符传入指定的回调函数处理

##### 7.14.3 DataTransfer 的实例方法

`DataTransfer`对象有以下方法。

1).setData()

`setData`方法用来设置事件所带有的指定类型的数据。它接受两个参数，第一个是数据类型，第二个是具体数据。如果指定的类型在现有数据中不存在，则该类型将写入`types`属性；如果已经存在，在该类型的现有数据将被替换。

`event.dataTransfer.setData("text/plain", "Text to drag");`

上面代码为事件加入纯文本格式的数据。

如果拖拉文本框或者拖拉选中的文本，会默认将文本数据添加到`dataTransfer`属性，不用手动指定。

```javascript
<div draggable="true" ondragstart="
  event.dataTransfer.setData('text/plain', 'bbb')">
  aaa
</div>
```

上面代码中，拖拉数据实际上是bbb，而不是aaa。

下面是添加其他类型的数据。由于`text/plain`是最普遍支持的格式，为了保证兼容性，建议最后总是将数据保存一份纯文本的格式。

```javascript
var dt = event.dataTransfer;

// 添加链接
dt.setData("text/uri-list", "http://www.example.com");
dt.setData("text/plain", "http://www.example.com");
// 添加HTML代码
dt.setData("text/html", "Hello there, <strong>stranger</strong>");
dt.setData("text/plain", "Hello there, <strong>stranger</strong>");
// 添加图像的URL
dt.setData("text/uri-list", imageurl);
dt.setData("text/plain", imageurl);
```

可以一次提供多种格式的数据。

```javascript
var dt = event.dataTransfer;
dt.setData("application/x-bookmark", bookmarkString);
dt.setData("text/uri-list", "http://www.example.com");
dt.setData("text/plain", "http://www.example.com");
```

上面代码中，通过在同一个事件上面，存放三种类型的数据，使得拖拉事件可以在不同的对象上面，drop不同的值。注意，第一种格式是一个自定义格式，浏览器默认无法读取，这意味着，只有某个部署了特定代码的节点，才可能drop（读取到）这个数据。

2).getData()

`getData`方法接受一个字符串（表示数据类型）作为参数，返回事件所带的指定类型的数据（通常是用`setData`方法添加的数据）。如果指定类型的数据不存在，则返回空字符串。通常只有`drop`事件触发后，才能取出数据。如果取出另一个域名存放的数据，将会报错。

下面是一个`drop`事件的监听函数，用来取出指定类型的数据。

```javascript
function onDrop(event){
  var data = event.dataTransfer.getData("text/plain");
  event.target.textContent = data;
  event.preventDefault();
}
```

上面代码取出拖拉事件的文本数据，将其替换成当前节点的文本内容。注意，这时还必须取消浏览器的默认行为，因为假如用户拖拉的是一个链接，浏览器默认会在当前窗口打开这个链接。

`getData`方法返回的是一个字符串，如果其中包含多项数据，就必须手动解析。

```javascript
function doDrop(event){
  var lines = event.dataTransfer.getData("text/uri-list").split("\n");
  for (let line of lines) {
    let link = document.createElement("a");
    link.href = line;
    link.textContent = line;
    event.target.appendChild(link);
  }
  event.preventDefault();
}
```

上面代码中，`getData`方法返回的是一组链接，就必须自行解析。

类型值指定为URL，可以取出第一个有效链接。

`var link = event.dataTransfer.getData("URL");`

下面是一次性取出多种类型的数据。

```javascript
function doDrop(event){
  var types = event.dataTransfer.types;
  var supportedTypes = ["text/uri-list", "text/plain"];
  types = supportedTypes.filter(function (value) types.includes(value));
  if (types.length)
    var data = event.dataTransfer.getData(types[0]);
  event.preventDefault();
}
```

3).clearData()

`clearData`方法接受一个字符串（表示数据类型）作为参数，删除事件所带的指定类型的数据。如果没有指定类型，则删除所有数据。如果指定类型不存在，则原数据不受影响。

`event.dataTransfer.clearData("text/uri-list");`

上面代码清除事件所带的 URL 数据。

4).setDragImage()

拖动过程中（`dragstart`事件触发后），浏览器会显示一张图片跟随鼠标一起移动，表示被拖动的节点。这张图片是自动创造的，通常显示为被拖动节点的外观，不需要自己动手设置。`setDragImage`方法可以用来自定义这张图片，它接受三个参数，第一个是`img`图片元素或者`canvas`元素，如果省略或为`null`则使用被拖动的节点的外观，第二个和第三个参数为鼠标相对于该图片左上角的横坐标和右坐标。

下面是一个例子。

```javascript
// HTML代码为
// <div id="drag-with-image" class="dragdemo" draggable="true">
     drag me
// </div>

var div = document.getElementById("drag-with-image");
div.addEventListener("dragstart", function(e) {
  var img = document.createElement("img");
  img.src = "http://path/to/img";
  e.dataTransfer.setDragImage(img, 0, 0);
}, false);
```

#### 7.15.触摸操作概述

浏览器的触摸 API 由三个部分组成。

- --
- `Touch`：一个触摸点
- `TouchList`：多个触摸点的集合
- `TouchEvent`：触摸引发的事件实例
- --

`Touch`接口的实例对象用来触摸点（一根手指或者一根触摸笔），包括位置、大小、形状、压力、目标元素等属性。有时，触摸动作由多个触摸点（多根手指）组成，多个触摸点的集合由`TouchList`接口的实例对象表示。`TouchEvent`接口的实例对象代表由触摸引发的事件，只有触摸屏才会引发这一类事件。

很多时候，触摸事件和鼠标事件同时触发，即使这个时候并没有用到鼠标。这是为了让那些只定义鼠标事件、没有定义触摸事件的代码，在触摸屏的情况下仍然能用。如果想避免这种情况，可以用`event.preventDefault`方法阻止发出鼠标事件。

#### 7.16.Touch 接口

##### 7.16.1 Touch 接口概述

`Touch` 接口代表单个触摸点。触摸点可能是一根手指，也可能是一根触摸笔。

浏览器原生提供`Touch`构造函数，用来生成`Touch`实例。

`var touch = new Touch(touchOptions);`

`Touch`构造函数接受一个配置对象作为参数，它有以下属性。

- --
- `identifier`：必需，类型为整数，表示触摸点的唯一 ID。
- `target`：必需，类型为元素节点，表示触摸点开始时所在的网页元素。
- --
- `clientX`：可选，类型为数值，表示触摸点相对于浏览器窗口左上角的水平距离，默认为0。
- `clientY`：可选，类型为数值，表示触摸点相对于浏览器窗口左上角的垂直距离，默认为0。
- --
- `screenX`：可选，类型为数值，表示触摸点相对于屏幕左上角的水平距离，默认为0。
- `screenY`：可选，类型为数值，表示触摸点相对于屏幕左上角的垂直距离，默认为0。
- --
- `pageX`：可选，类型为数值，表示触摸点相对于网页左上角的水平位置（即包括页面的滚动距离），默认为0。
- `pageY`：可选，类型为数值，表示触摸点相对于网页左上角的垂直位置（即包括页面的滚动距离），默认为0。
- --
- `radiusX`：可选，类型为数值，表示触摸点周围受到影响的椭圆范围的 X 轴半径，默认为0。
- `radiusY`：可选：类型为数值，表示触摸点周围受到影响的椭圆范围的 Y 轴半径，默认为0。
- --
- `rotationAngle`：可选，类型为数值，表示触摸区域的椭圆的旋转角度，单位为度数，在0到90度之间，默认值为0。
- --
- `force`：可选，类型为数值，范围在0到1之间，表示触摸压力。0代表没有压力，1代表硬件所能识别的最大压力，默认为0。
- --

##### 7.16.2 Touch 接口的实例属性

1).Touch.identifier

`Touch.identifier`属性返回一个整数，表示触摸点的唯一 ID。这个值在整个触摸过程保持不变，直到触摸事件结束。

```javascript
someElement.addEventListener('touchmove', function (e) {
  for (var i = 0; i < e.changedTouches.length; i++) {
    console.log(e.changedTouches[i].identifier);
  }
}, false);
```

2).Touch.screenX，Touch.screenY，Touch.clientX，Touch.clientY，pageX，pageY

`Touch.screenX`属性和`Touch.screenY`属性，分别表示触摸点相对于屏幕左上角的横坐标和纵坐标，与页面是否滚动无关。

`Touch.clientX`属性和`Touch.clientY`属性，分别表示触摸点相对于浏览器视口左上角的横坐标和纵坐标，与页面是否滚动无关。

`Touch.pageX`属性和`Touch.pageY`属性，分别表示触摸点相对于当前页面左上角的横坐标和纵坐标，包含了页面滚动带来的位移。

3).Touch.radiusX，Touch.radiusY，Touch.rotationAngle

`Touch.radiusX`属性和`Touch.radiusY`属性，分别返回触摸点周围受到影响的椭圆范围的 X 轴半径和 Y 轴半径，单位为像素。乘以 2 就可以得到触摸范围的宽度和高度。

`Touch.rotationAngle`属性表示触摸区域的椭圆的旋转角度，单位为度数，在0到90度之间。

上面这三个属性共同定义了用户与屏幕接触的区域，对于描述手指这一类非精确的触摸，很有帮助。指尖接触屏幕，触摸范围会形成一个椭圆，这三个属性就用来描述这个椭圆区域。

下面是一个示例。

```javascript
div.addEventListener('touchstart', rotate);
div.addEventListener('touchmove', rotate);
div.addEventListener('touchend', rotate);

function rotate(e) {
  var touch = e.changedTouches.item(0);
  e.preventDefault();

  src.style.width = touch.radiusX * 2 + 'px';
  src.style.height = touch.radiusY * 2 + 'px';
  src.style.transform = 'rotate(' + touch.rotationAngle + 'deg)';
};
```

4).Touch.force

`Touch.force`属性返回一个0到1之间的数值，表示触摸压力。0代表没有压力，1代表硬件所能识别的最大压力。

5).Touch.target

`Touch.target`属性返回一个元素节点，代表触摸发生时所在的那个元素节点。即使触摸点已经离开了这个节点，该属性依然不变。

#### 7.17. TouchList 接口

`TouchList`接口表示一组触摸点的集合。它的实例是一个类似数组的对象，成员是`Touch`的实例对象，表示所有触摸点。用户用三根手指触摸，产生的`TouchList`实例就会包含三个成员，每根手指的触摸点对应一个`Touch`实例对象。

它的实例主要通过触摸事件的`TouchEvent.touches`、`TouchEvent.changedTouches`、`TouchEvent.targetTouches`这几个属性获取。

它的实例属性和实例方法只有两个。

- --
- `TouchList.length`：数值，表示成员数量（即触摸点的数量）。
- `TouchList.item()`：返回指定位置的成员，它的参数是该成员的位置编号（从零开始）。
- --

#### 7.18.TouchEvent 接口

##### 7.18.1 概述

`TouchEvent` 接口继承了 `Event` 接口，表示由触摸引发的事件实例，通常来自触摸屏或轨迹板。除了被继承的属性以外，它还有一些自己的属性。

浏览器原生提供`TouchEvent()`构造函数，用来生成触摸事件的实例。

`new TouchEvent(type, options)`

`TouchEvent()`构造函数可以接受两个参数，第一个参数是字符串，表示事件类型；第二个参数是事件的配置对象，该参数是可选的，对象的所有属性也是可选的。除了`Event`接口的配置属性，该接口还有一些自己的配置属性。

- --
- `touches`：`TouchList`实例，代表所有的当前处于活跃状态的触摸点，默认值是一个空数组`[]`。
- `targetTouches`：`TouchList`实例，代表所有处在触摸的目标元素节点内部、且仍然处于活动状态的触摸点，默认值是一个空数组`[]`。
- `changedTouches`：`TouchList`实例，代表本次触摸事件的相关触摸点，默认值是一个空数组`[]`。
- --
- `ctrlKey`：布尔值，表示 Ctrl 键是否同时按下，默认值为false。
- `shiftKey`：布尔值，表示 Shift 键是否同时按下，默认值为false。
- `altKey`：布尔值，表示 Alt 键是否同时按下，默认值为false。
- `metaKey`：布尔值，表示 Meta 键（或 Windows 键）是否同时按下，默认值为false。
- --

##### 7.18.2 实例属性

`TouchEvent` 接口的实例具有`Event`实例的所有属性和方法，此外还有一些它自己的实例属性，这些属性全部都是只读。

1).TouchEvent.altKey，TouchEvent.ctrlKey，TouchEvent.shiftKey，TouchEvent.metaKey

- --
- `TouchEvent.altKey`：布尔值，表示触摸时是否按下了 Alt 键。
- `TouchEvent.ctrlKey`：布尔值，表示触摸时是否按下了 Ctrl 键。
- `TouchEvent.shiftKey`：布尔值：表示触摸时是否按下了 Shift 键。
- `TouchEvent.metaKey`：布尔值，表示触摸时是否按下了 Meta 键（或 Windows 键）。
- --

下面是一个示例。

```javascript
someElement.addEventListener('touchstart', function (e) {
  console.log('altKey = ' + e.altKey);
  console.log('ctrlKey = ' + e.ctrlKey);
  console.log('metaKey = ' + e.metaKey);
  console.log('shiftKey = ' + e.shiftKey);
}, false);
```

2).TouchEvent.changedTouches

`TouchEvent.changedTouches`属性返回一个`TouchList`实例，成员是一组`Touch`实例对象，表示本次触摸事件的相关触摸点。

对于不同的时间，该属性的含义有所不同。

- --
- `touchstart`事件：被激活的触摸点
- `touchmove`事件：发生变化的触摸点
- `touchend`事件：消失的触摸点（即不再被触碰的点）
- --

下面是一个示例。

```javascript
someElement.addEventListener('touchmove', function (e) {
  for (var i = 0; i < e.changedTouches.length; i++) {
    console.log(e.changedTouches[i].identifier);
  }
}, false);
```

3).TouchEvent.touches

`TouchEvent.touches`属性返回一个`TouchList`实例，成员是所有仍然处于活动状态（即触摸中）的触摸点。一般来说，一个手指就是一个触摸点。

下面是一个示例。

```javascript
someElement.addEventListener('touchstart', function (e) {
  switch (e.touches.length) {
    // 一根手指触摸
    case 1: handle_one_touch(e); break;
    // 两根手指触摸
    case 2: handle_two_touches(e); break;
    // 三根手指触摸
    case 3: handle_three_touches(e); break;
    // 其他情况
    default: console.log('Not supported'); break;
  }
}, false);
```

4).TouchEvent.targetTouches

`TouchEvent.targetTouches`属性返回一个`TouchList`实例，成员是触摸事件的目标元素节点内部、所有仍然处于活动状态（即触摸中）的触摸点。

```javascript
function touches_in_target(ev) {
  return (ev.touches.length === ev.targetTouches.length ? true : false);
}
```

上面代码用来判断，是否所有触摸点都在目标元素内。

#### 7.19.触摸事件的种类

触摸引发的事件，有以下几种。可以通过`TouchEvent.type`属性，查看到底发生的是哪一种事件。

- --
- `touchstart`：用户开始触摸时触发，它的`target`属性返回发生触摸的元素节点。
- --
- `touchend`：用户不再接触触摸屏时（或者移出屏幕边缘时）触发，它的`target`属性与`touchstart`事件一致的，就是开始触摸时所在的元素节点。它的`changedTouches`属性返回一个`TouchList`实例，包含所有不再触摸的触摸点（即`Touch`实例对象）。
- --
- `touchmove`：用户移动触摸点时触发，它的`target`属性与`touchstart`事件一致。如果触摸的半径、角度、力度发生变化，也会触发该事件。
- --
- `touchcancel`：触摸点取消时触发，比如在触摸区域跳出一个情态窗口（modal window）、触摸点离开了文档区域（进入浏览器菜单栏）、用户的触摸点太多，超过了支持的上限（自动取消早先的触摸点）。
- --

下面是一个例子。

```javascript
var el = document.getElementsByTagName('canvas')[0];
el.addEventListener('touchstart', handleStart, false);
el.addEventListener('touchmove', handleMove, false);

function handleStart(evt) {
  evt.preventDefault();
  var touches = evt.changedTouches;
  for (var i = 0; i < touches.length; i++) {
    console.log(touches[i].pageX, touches[i].pageY);
  }
}

function handleMove(evt) {
  evt.preventDefault();
  var touches = evt.changedTouches;
  for (var i = 0; i < touches.length; i++) {
    var touch = touches[i];
    console.log(touch.pageX, touch.pageY);
  }
}
```

#### 7.20.表单事件

##### 7.20.1 Input事件，select事件，change事件

以下事件与表单成员的值变化有关。

1).input事件

`input`事件当`<input>`、`<textarea>`的值发生变化时触发。此外，打开`contenteditable`属性的元素，只要值发生变化，也会触发`input`事件。

`input`事件的一个特点，就是会连续触发，比如用户每次按下一次按键，就会触发一次`input`事件。

2).select事件

`select`事件当在`<input>`、`<textarea>`中选中文本时触发。

```javascript
// HTML代码为
// <input id="test" type="text" value="Select me!" />

var elem = document.getElementById('test');
elem.addEventListener('select', function() {
  console.log('Selection changed!');
}, false);
```

3).Change事件

`Change`事件当`<input>`、`<select>`、`<textarea>`的值发生变化时触发。它与`input`事件的最大不同，就是不会连续触发，只有当全部修改完成时才会触发，而且`input`事件必然会引发`change`事件。具体来说，分成以下几种情况。

- --
- 激活单选框（radio）或复选框（checkbox）时触发。
- 用户提交时触发。比如，从下拉列表（select）完成选择，在日期或文件输入框完成选择。
- 当文本框或textarea元素的值发生改变，并且丧失焦点时触发。
- --

下面是一个例子。

```javascript
// HTML代码为
// <select size="1" onchange="changeEventHandler(event);">
//   <option>chocolate</option>
//   <option>strawberry</option>
//   <option>vanilla</option>
// </select>

function changeEventHandler(event) {
  console.log('You like ' + event.target.value + ' ice cream.');
}
```

##### 7.20.2 reset事件，submit事件

以下事件发生在表单对象上，而不是发生在表单的成员上。

1).reset事件

`reset`事件当表单重置（所有表单成员变回默认值）时触发。

2).submit事件

`submit`事件当表单数据向服务器提交时触发。注意，`submit`事件的发生对象是`form`元素，而不是`button`元素（即使它的类型是`submit`），因为提交的是表单，而不是按钮。

#### 7.21.文档事件

##### 7.21.1 beforeunload事件，unload事件，load事件，error事件，pageshow事件，pagehide事件

以下事件与网页的加载与卸载相关。

1).beforeunload事件

`beforeunload`事件在窗口将要关闭，或者网页（即`document`对象）将要卸载时触发。它可以用来防止用户不小心关闭网页。

根据标准，只要在该事件的回调函数中，调用了`event.preventDefault()`，或者`event.returnValue`属性的值是一个非空的值，就会自动跳出一个确认框，让用户确认是否关闭网页。如果用户点击“取消”按钮，网页就不会关闭。`event.returnValue`属性的值，会显示在确认对话框之中。

```javascript
window.addEventListener('beforeunload', function( event ) {
  event.returnValue = '你确认要离开吗？';
});

window.addEventListener('beforeunload', function( event ) {
  event.preventDefault();
});
```

但是，浏览器的行为很不一致，Chrome就不遵守`event.preventDefault()`，还是会关闭窗口，而IE需要显式返回一个非空的字符串。而且，大多数浏览器在对话框中不显示指定文本，只显示默认文本。因此，可以采用下面的写法，取得最大的兼容性。

```javascript
window.addEventListener('beforeunload', function (e) {
  var confirmationMessage = '确认关闭窗口？';

  e.returnValue = confirmationMessage;
  return confirmationMessage;
});
```

需要特别注意的是，许多手机浏览器默认忽视这个事件，而桌面浏览器也可以这样设置，所以这个事件有可能根本不生效。所以，不能依赖它来阻止用户关闭窗口。

2).unload事件

`unload`事件在窗口关闭或者`document`对象将要卸载时触发，发生在`window`、`body`、`frameset`等对象上面。它的触发顺序排在`beforeunload`、`pagehide`事件后面。`unload`事件只在页面没有被浏览器缓存时才会触发，换言之，如果通过按下“前进/后退”导致页面卸载，并不会触发`unload`事件。

当`unload`事件发生时，`document`对象处于一个特殊状态。所有资源依然存在，但是对用户来说都不可见，UI互动（`window.open`、`alert`、`confirm`方法等）全部无效。这时即使抛出错误，也不能停止文档的卸载。

```javascript
window.addEventListener('unload', function(event) {
  console.log('文档将要卸载');
});
```

如果在`window`对象上定义了该事件，网页就不会被浏览器缓存。

3).load事件，error事件

`load`事件在页面加载成功时触发，`error`事件在页面加载失败时触发。注意，页面从浏览器缓存加载，并不会触发`load`事件。

这两个事件实际上属于进度事件，不仅发生在`document`对象，还发生在各种外部资源上面。浏览网页就是一个加载各种资源的过程，图像（image）、样式表（style sheet）、脚本（script）、视频（video）、音频（audio）、Ajax请求（XMLHttpRequest）等等。这些资源和`document`对象、`window`对象、`XMLHttpRequestUpload`对象，都会触发`load`事件和`error`事件。

4).pageshow事件，pagehide事件

默认情况下，浏览器会在**当前会话（session）**缓存页面，当用户点击“前进/后退”按钮时，浏览器就会从缓存中加载页面。

`pageshow`事件在页面加载时触发，包括第一次加载和从缓存加载两种情况。如果要指定页面每次加载（不管是不是从浏览器缓存）时都运行的代码，可以放在这个事件的监听函数。

第一次加载时，它的触发顺序排在`load`事件后面。从缓存加载时，`load`事件不会触发，因为网页在缓存中的样子通常是`load`事件的监听函数运行后的样子，所以不必重复执行。同理，如果是从缓存中加载页面，网页内初始化的JavaScript脚本（比如`DOMContentLoaded`事件的监听函数）也不会执行。

```javascript
window.addEventListener('pageshow', function(event) {
  console.log('pageshow: ', event);
});
```

`pageshow`事件有一个`persisted`属性，返回一个布尔值。页面第一次加载时，这个属性是false；当页面从缓存加载时，这个属性是true。

```javascript
window.addEventListener('pageshow', function(event){
  if (event.persisted) {
    // ...
  }
});
```

`pagehide`事件与`pageshow`事件类似，当用户通过“前进/后退”按钮，离开当前页面时触发。它与`unload`事件的区别在于，如果在`window`对象上定义`unload`事件的监听函数之后，页面不会保存在缓存中，而使用`pagehide`事件，页面会保存在缓存中。

`pagehide`事件的`event`对象有一个`persisted`属性，将这个属性设为true，就表示页面要保存在缓存中；设为false，表示网页不保存在缓存中，这时如果设置了`unload`事件的监听函数，该函数将在`pagehide`事件后立即运行。

如果页面包含`frame`或`iframe`元素，则`frame`页面的`pageshow`事件和`pagehide`事件，都会在主页面之前触发。

##### 7.21.2 DOMContentLoaded事件，readystatechange事件

以下事件与文档状态相关。

1).DOMContentLoaded事件

当HTML文档下载并解析完成以后，就会在`document`对象上触发`DOMContentLoaded`事件。这时，仅仅完成了HTML文档的解析（整张页面的DOM生成），所有外部资源（样式表、脚本、`iframe`等等）可能还没有下载结束。也就是说，这个事件比`load`事件，发生时间早得多。

```javascript
document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM生成");
});
```

注意，网页的JavaScript脚本是同步执行的，所以定义`DOMContentLoaded`事件的监听函数，应该放在所有脚本的最前面。否则脚本一旦发生堵塞，将推迟触发`DOMContentLoaded`事件。

2).readystatechange事件

`readystatechange`事件发生在`Document`对象和`XMLHttpRequest`对象，当它们的`readyState`属性发生变化时触发。

```javascript
document.onreadystatechange = function () {
  if (document.readyState == "interactive") {
    // ...
  }
}
```

> IE8不支持`DOMContentLoaded`事件，但是支持这个事件。因此，可以使用`readystatechange`事件，在低版本的IE中代替`DOMContentLoaded`事件。

##### 7.21.3 scroll事件，resize事件

以下事件与窗口行为有关。

1).scroll事件

`scroll`事件在文档或文档元素滚动时触发，主要出现在用户拖动滚动条。

`window.addEventListener('scroll', callback);`

由于该事件会连续地大量触发，所以它的监听函数之中不应该有非常耗费计算的操作。推荐的做法是使用`requestAnimationFrame`或`setTimeout`控制该事件的触发频率，然后可以结合`customEvent`抛出一个新事件。

```javascript
(function() {
  var throttle = function(type, name, obj) {
    var obj = obj || window;
    var running = false;
    var func = function() {
      if (running) { return; }
      running = true;
      requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  // 将scroll事件重定义为optimizedScroll事件
  throttle('scroll', 'optimizedScroll');
})();

window.addEventListener('optimizedScroll', function() {
  console.log("Resource conscious scroll callback!");
});
```

上面代码中，throttle函数用于控制事件触发频率，`requestAnimationFrame`方法保证每次页面重绘（每秒60次），只会触发一次`scroll`事件的监听函数。也就是说，上面方法将`scroll`事件的触发频率，限制在每秒60次。

改用`setTimeout`方法，可以放置更大的时间间隔。

```javascript
(function() {
  window.addEventListener('scroll', scrollThrottler, false);

  var scrollTimeout;
  function scrollThrottler() {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function() {
        scrollTimeout = null;
        actualScrollHandler();
      }, 66);
    }
  }

  function actualScrollHandler() {
    // ...
  }
}());
```

上面代码中，`setTimeout`指定`scroll`事件的监听函数，每66毫秒触发一次（每秒15次）。

下面是一个更一般的throttle函数的写法。

```javascript
function throttle(fn, wait) {
  var time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}

window.addEventListener('scroll', throttle(callback, 1000));
```

上面的代码将`scroll`事件的触发频率，限制在一秒一次。

`lodash`函数库提供了现成的throttle函数，可以直接引用。

`window.addEventListener('scroll', _.throttle(callback, 1000));`

2).resize事件

`resize`事件在改变浏览器窗口大小时触发，发生在`window`、`body`、`frameset`对象上面。

```javascript
var resizeMethod = function(){
  if (document.body.clientWidth < 768) {
    console.log('移动设备');
  }
};

window.addEventListener("resize", resizeMethod, true);
```

该事件也会连续地大量触发，所以最好像上面的`scroll`事件一样，通过throttle函数控制事件触发频率。

##### 7.21.4 hashchange事件，popstate事件

以下事件与文档的URL变化相关。

1).hashchange事件

`hashchange`事件在URL的`hash`部分（即`#`号后面的部分，包括`#`号）发生变化时触发。如果老式浏览器不支持该属性，可以通过定期检查`location.hash`属性，模拟该事件，下面就是代码。

```javascript
(function(window) {
  if ( "onhashchange" in window.document.body ) { return; }

  var location = window.location;
  var oldURL = location.href;
  var oldHash = location.hash;

  // 每隔100毫秒检查一下URL的hash
  setInterval(function() {
    var newURL = location.href;
    var newHash = location.hash;

    if ( newHash != oldHash && typeof window.onhashchange === "function" ) {
      window.onhashchange({
        type: "hashchange",
        oldURL: oldURL,
        newURL: newURL
      });

      oldURL = newURL;
      oldHash = newHash;
    }
  }, 100);

})(window);
```

`hashchange`事件对象除了继承`Event`对象，还有`oldURL`属性和`newURL`属性，分别表示变化前后的URL。

2).popstate事件

`popstate`事件在浏览器的`history`对象的当前记录发生显式切换时触发。注意，调用`history.pushState()`或`history.replaceState()`，并不会触发`popstate`事件。该事件只在用户在`history`记录之间显式切换时触发，比如鼠标点击“后退/前进”按钮，或者在脚本中调用`history.back()`、`history.forward()`、`history.go()`时触发。

该事件对象有一个`state`属性，保存`history.pushState`方法和`history.replaceState`方法为当前记录添加的`state`对象。

```javascript
window.onpopstate = function(event) {
  console.log("state: " + event.state);
};
history.pushState({page: 1}, "title 1", "?page=1");
history.pushState({page: 2}, "title 2", "?page=2");
history.replaceState({page: 3}, "title 3", "?page=3");
history.back(); // state: {"page":1}
history.back(); // state: null
history.go(2);  // state: {"page":3}
```

上面代码中，`pushState`方法向`history`添加了两条记录，然后`replaceState`方法替换掉当前记录。因此，连续两次back方法，会让当前条目退回到原始网址，它没有附带`state`对象，所以事件的`state`属性为`null`，然后前进两条记录，又回到`replaceState`方法添加的记录。

> 浏览器对于页面首次加载，是否触发`popstate`事件，处理不一样，Firefox不触发该事件。

##### 7.21.5 cut事件，copy事件，paste事件

以下三个事件属于文本操作触发的事件。

- --
- `cut`事件：在将选中的内容从文档中移除，加入剪贴板后触发。
- `copy`事件：在选中的内容加入剪贴板后触发。
- `paste`事件：在剪贴板内容被粘贴到文档后触发。
- --

这三个事件都有一个`clipboardData`只读属性。该属性存放剪贴的数据，是一个`DataTransfer`对象。

##### 7.21.6 焦点事件

焦点事件发生在`Element`节点和`document`对象上面，与获得或失去焦点相关。它主要包括以下四个事件。

- --
- `focus`事件：`Element`节点获得焦点后触发，该事件不会冒泡。
- `blur`事件：`Element`节点失去焦点后触发，该事件不会冒泡。
- `focusin`事件：`Element`节点将要获得焦点时触发，发生在`focus`事件之前。该事件会冒泡。Firefox不支持该事件。
- `focusout`事件：`Element`节点将要失去焦点时触发，发生在`blur`事件之前。该事件会冒泡。Firefox不支持该事件。
- --

这四个事件的事件对象，带有`target`属性（返回事件的目标节点）和`relatedTarget`属性（返回一个`Element`节点）。对于`focusin`事件，`relatedTarget`属性表示失去焦点的节点；对于`focusout`事件，表示将要接受焦点的节点；对于`focus`和`blur`事件，该属性返回`null`。

由于`focus`和`blur`事件不会冒泡，只能在捕获阶段触发，所以`addEventListener`方法的第三个参数需要设为true。

```javascript
form.addEventListener("focus", function( event ) {
  event.target.style.background = "pink";
}, true);
form.addEventListener("blur", function( event ) {
  event.target.style.background = "";
}, true);
```

上面代码设置表单的文本输入框，在接受焦点时设置背景色，在失去焦点时去除背景色。

浏览器提供一个`FocusEvent`构造函数，可以用它生成焦点事件的实例。

`var focusEvent = new FocusEvent(typeArg, focusEventInit);`

上面代码中，`FocusEvent`构造函数的第一个参数为事件类型，第二个参数是可选的配置对象，用来配置`FocusEvent`对象。
