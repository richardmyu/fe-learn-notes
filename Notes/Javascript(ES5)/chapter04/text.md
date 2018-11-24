# JavaScript笔记四

## 七.DOM 模型

### 1.DOM 模型概述

#### 1.1.基本概念

##### 1.1.1 DOM

DOM 是 JavaScript 操作网页的接口，全称为“文档对象模型”（Document Object Model）。它的作用是将网页转为一个 JavaScript 对象，从而可以用脚本进行各种操作（比如增删内容）。

浏览器会根据 DOM 模型，将结构化文档（比如 HTML 和 XML）解析成一系列的节点，再由这些节点组成一个**树状结构（DOM Tree）**。所有的节点和最终的树状结构，都有规范的对外接口。

DOM 只是一个接口规范，可以用各种语言实现。所以严格地说，DOM 不是 JavaScript 语法的一部分，但是 DOM 操作是 JavaScript 最常见的任务，离开了 DOM，JavaScript 就无法控制网页。另一方面，JavaScript 也是最常用于 DOM 操作的语言。后面介绍的就是 JavaScript 对 DOM 标准的实现和用法。

##### 1.1.2 节点

DOM 的最小组成单位叫做**节点（node）**。文档的树形结构（DOM 树），就是由各种不同类型的节点组成。每个节点可以看作是文档树的一片叶子。

节点的类型有七种。

- --
- `Document`：整个文档树的顶层节点
- `DocumentType`：doctype 标签（比如`<!DOCTYPE html>`）
- `Element`：网页的各种HTML标签（比如`<body>`、`<a>`等）
- `Attribute`：网页元素的属性（比如`class="right"`）
- `Text`：标签之间或标签包含的文本
- `Comment`：注释
- `DocumentFragment`：文档的片段
- --

浏览器提供一个原生的节点对象`Node`，上面这七种节点都继承了`Node`，因此具有一些共同的属性和方法。

##### 1.1.3 节点树

一个文档的所有节点，按照所在的层级，可以抽象成一种树状结构。这种树状结构就是 DOM 树。它有一个顶层节点，下一层都是顶层节点的子节点，然后子节点又有自己的子节点，就这样层层衍生出一个金字塔结构，倒过来就像一棵树。

浏览器原生提供`document`节点，代表整个文档。

文档的第一层只有一个节点，就是 HTML 网页的第一个标签`<html>`，它构成了树结构的**根节点（root node）**，其他 HTML 标签节点都是它的下级节点。

除了根节点，其他节点都有三种层级关系。

- --
- 父节点关系（parentNode）：直接的那个上级节点
- 子节点关系（childNodes）：直接的下级节点
- 同级节点关系（sibling）：拥有同一个父节点的节点
- --

DOM 提供操作接口，用来获取这三种关系的节点。比如，子节点接口包括`firstChild`（第一个子节点）和`lastChild`（最后一个子节点）等属性，同级节点接口包括`nextSibling`（紧邻在后的那个同级节点）和`previousSibling`（紧邻在前的那个同级节点）属性。

#### 1.2.Node 接口的属性

所有 DOM 节点都继承了 `Node` 接口，拥有一些共同的属性和方法。这是 DOM 操作的基础。

##### 1.2.1 Node.nodeType

`nodeType`属性返回一个整数值，表示节点的类型。

`document.nodeType // 9`

Node 对象定义了几个常量，对应这些类型值。

`document.nodeType === Node.DOCUMENT_NODE // true`

不同节点的`nodeType`属性值和对应的常量如下。

- --
- a.文档节点（document）：9，对应常量`Node.DOCUMENT_NODE`
- b.元素节点（element）：1，对应常量`Node.ELEMENT_NODE`
- c.属性节点（attr）：2，对应常量`Node.ATTRIBUTE_NODE`
- d.文本节点（text）：3，对应常量`Node.TEXT_NODE`
- e.文档片断节点（DocumentFragment）：11，对应常量`Node.DOCUMENT_FRAGMENT_NODE`
- f.文档类型节点（DocumentType）：10，对应常量`Node.DOCUMENT_TYPE_NODE`
- g.注释节点（Comment）：8，对应常量`Node.COMMENT_NODE`
- --

确定节点类型时，使用`nodeType`属性是常用方法。

```javascript
var node = document.documentElement.firstChild;
if (node.nodeType !== Node.ELEMENT_NODE) {
  console.log('该节点是元素节点');
}
```

##### 1.2.2 Node.nodeName

`nodeName`属性返回节点的名称。

```javascript
// HTML 代码如下
// <div id="d1">hello world</div>
var div = document.getElementById('d1');
div.nodeName // "DIV"
```

不同节点的`nodeName`属性值如下。

- --
- a.文档节点（document）：`#document`
- b.元素节点（element）：大写的标签名
- c.属性节点（attr）：属性的名称
- d.文本节点（text）：`#text`
- e.文档片断节点（DocumentFragment）：`#document-fragment`
- f.文档类型节点（DocumentType）：文档的类型
- g.注释节点（Comment）：`#comment`
- --

##### 1.2.3 Node.nodeValue

`nodeValue`属性返回一个字符串，表示当前节点本身的文本值，该属性可读写。

只有文本节点（text）和注释节点（comment）有文本值，因此这两类节点的`nodeValue`可以返回结果，其他类型的节点一律返回`null`。同样的，也只有这两类节点可以设置`nodeValue`属性的值，其他类型的节点设置无效。

```javascript
// HTML 代码如下
// <div id="d1">hello world</div>
var div = document.getElementById('d1');
div.nodeValue // null
div.firstChild.nodeValue // "hello world"
```

##### 1.2.4 Node.textContent

`textContent`属性返回当前节点和它的所有后代节点的文本内容。

```javascript
// HTML 代码为
// <div id="divA">This is <span>some</span> text</div>

document.getElementById('divA').textContent
// This is some text
```

> `textContent`属性自动忽略当前节点内部的 HTML 标签，返回所有文本内容。

该属性是可读写的，设置该属性的值，会用一个新的文本节点，替换所有原来的子节点。它还有一个好处，就是自动对 HTML 标签转义。这很适合用于用户提供的内容。

`document.getElementById('foo').textContent = '<p>GoodBye!</p>';`

上面代码在插入文本时，会将`<p>`标签解释为文本，而不会当作标签处理。

对于文本节点（text）和注释节点（comment），`textContent`属性的值与`nodeValue`属性相同。对于其他类型的节点，该属性会将每个子节点的内容连接在一起返回，但是不包括注释节点。如果一个节点没有子节点，则返回空字符串。

文档节点（document）和文档类型节点（doctype）的`textContent`属性为`null`。如果要读取整个文档的内容，可以使用`document.documentElement.textContent`。

##### 1.2.5 Node.baseURI

`baseURI`属性返回一个字符串，表示当前网页的绝对路径。浏览器根据这个属性，计算网页上的相对路径的 URL。该属性为只读。

```javascript
// 当前网页的网址为
// http://www.example.com/index.html
document.baseURI
// "http://www.example.com/index.html"
```

如果无法读到网页的 URL，`baseURI`属性返回`null`。

该属性的值一般由当前网址的 URL（即`window.location`属性）决定，但是可以使用 HTML 的`<base>`标签，改变该属性的值。

`<base href="http://www.example.com/page.html">`

设置了以后，`baseURI`属性就返回`<base>`标签设置的值。

##### 1.2.6 Node.ownerDocument

`Node.ownerDocument`属性返回当前节点所在的顶层文档对象，即`document`对象。

```javascript
var d = p.ownerDocument;
d === document // true
```

`document`对象本身的`ownerDocument`属性，返回`null`。

##### 1.2.7 Node.nextSibling

`Node.nextSibling`属性返回紧跟在当前节点后面的第一个同级节点。如果当前节点后面没有同级节点，则返回`null`。

```javascript
// HTML 代码如下
// <div id="d1">hello</div><div id="d2">world</div>
var div1 = document.getElementById('d1');
var div2 = document.getElementById('d2');

d1.nextSibling === d2 // true
```

上面代码中，d1.nextSibling就是紧跟在d1后面的同级节点d2。

注意，该属性还包括文本节点和评论节点。因此如果当前节点后面有空格，该属性会返回一个文本节点，内容为空格。

`nextSibling`属性可以用来遍历所有子节点。

```javascript
var el = document.getElementById('div1').firstChild;

while (el !== null) {
  console.log(el.nodeName);
  el = el.nextSibling;
}
```

##### 1.2.8 Node.previousSibling

`previousSibling`属性返回当前节点前面的、距离最近的一个同级节点。如果当前节点前面没有同级节点，则返回`null`。

```javascript
// HTML 代码如下
// <div id="d1">hello</div><div id="d2">world</div>
var div1 = document.getElementById('d1');
var div2 = document.getElementById('d2');

d2.nextSibling === d1 // true
```

上面代码中，d2.nextSibling就是d2前面的同级节点d1。

注意，该属性还包括文本节点和评论节点。因此如果当前节点前面有空格，该属性会返回一个文本节点，内容为空格。

##### 1.2.9 Node.parentNode

`parentNode`属性返回当前节点的父节点。对于一个节点来说，它的父节点只可能是三种类型：元素节点（element）、文档节点（document）和文档片段节点（documentfragment）。

```javascript
if (node.parentNode) {
  node.parentNode.removeChild(node);
}
```

上面代码中，通过`node.parentNode`属性将`node`节点从文档里面移除。

文档节点（document）和文档片段节点（documentfragment）的父节点都是`null`。另外，对于那些生成后还没插入 DOM 树的节点，父节点也是`null`。

##### 1.2.10 Node.parentElement

`parentElement`属性返回当前节点的父元素节点。如果当前节点没有父节点，或者父节点类型不是元素节点，则返回`null`。

```javascript
if (node.parentElement) {
  node.parentElement.style.color = 'red';
}
```

由于父节点只可能是三种类型：元素节点、文档节点（document）和文档片段节点（documentfragment）。`parentElement`属性相当于把后两种父节点都排除了。

##### 1.2.11 Node.firstChild，Node.lastChild

`firstChild`属性返回当前节点的第一个子节点，如果当前节点没有子节点，则返回`null`。

```javascript
// HTML 代码如下
// <p id="p1"><span>First span</span></p>
var p1 = document.getElementById('p1');
p1.firstChild.nodeName // "SPAN"
```

上面代码中，p元素的第一个子节点是span元素。

注意，`firstChild`返回的除了元素节点，还可能是文本节点或评论节点。

```javascript
// HTML 代码如下
// <p id="p1">
//   <span>First span</span>
//  </p>
var p1 = document.getElementById('p1');
p1.firstChild.nodeName // "#text"
```

上面代码中，`p`元素与`span`元素之间有空白字符，这导致`firstChild`返回的是文本节点。

`lastChild`属性返回当前节点的最后一个子节点，如果当前节点没有子节点，则返回`null`。用法与`firstChild`属性相同。

##### 1.2.12 Node.childNodes

`childNodes`属性返回一个类似数组的对象（`NodeList`集合），成员包括当前节点的所有子节点。

`var children = document.querySelector('ul').childNodes;`

上面代码中，children就是ul元素的所有子节点。

使用该属性，可以遍历某个节点的所有子节点。

```javascript
var div = document.getElementById('div1');
var children = div.childNodes;

for (var i = 0; i < children.length; i++) {
  // ...
}
```

文档节点（document）就有两个子节点：文档类型节点（docType）和 HTML 根元素节点。

```javascript
var children = document.childNodes;
for (var i = 0; i < children.length; i++) {
  console.log(children[i].nodeType);
}
// 10
// 1
```

上面代码中，文档节点的第一个子节点的类型是10（即文档类型节点），第二个子节点的类型是1（即元素节点）。

注意，除了元素节点，`childNodes`属性的返回值还包括文本节点和注释节点。如果当前节点不包括任何子节点，则返回一个空的`NodeList`集合。由于`NodeList`对象是一个动态集合，一旦子节点发生变化，立刻会反映在返回结果之中。

##### 1.2.13 Node.isConnected

`isConnected`属性返回一个布尔值，表示当前节点是否在文档之中。

```javascript
var test = document.createElement('p');
test.isConnected // false

document.body.appendChild(test);
test.isConnected // true
```

上面代码中，`test`节点是脚本生成的节点，没有插入文档之前，`isConnected`属性返回false，插入之后返回true。

#### 1.3.Node 接口的方法

##### 1.3.1 Node.appendChild()

`appendChild`方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点。该方法的返回值就是插入文档的子节点。

```javascript
var p = document.createElement('p');
document.body.appendChild(p);
```

上面代码新建一个`<p>`节点，将其插入`document.body`的尾部。

如果参数节点是 DOM 已经存在的节点，`appendChild`方法会将其从原来的位置，移动到新位置。

```javascript
var element = document
  .createElement('div')
  .appendChild(document.createElement('b'));
```

上面代码的返回值是`<b></b>`，而不是`<div></div>`。

如果`appendChild`方法的参数是`DocumentFragment`节点，那么插入的是`DocumentFragment`的所有子节点，而不是`DocumentFragment`节点本身。返回值是一个空的`DocumentFragment`节点。

##### 1.3.2 Node.hasChildNodes()

`hasChildNodes`方法返回一个布尔值，表示当前节点是否有子节点。

```javascript
var foo = document.getElementById('foo');

if (foo.hasChildNodes()) {
  foo.removeChild(foo.childNodes[0]);
}
```

上面代码表示，如果foo节点有子节点，就移除第一个子节点。

注意，子节点包括所有节点，哪怕节点只包含一个空格，`hasChildNodes`方法也会返回true。

判断一个节点有没有子节点，有许多种方法，下面是其中的三种。

- --
- `node.hasChildNodes()`
- `node.firstChild !== null`
- `node.childNodes && node.childNodes.length > 0`
- --

`hasChildNodes`方法结合`firstChild`属性和`nextSibling`属性，可以遍历当前节点的所有后代节点。

```javascript
function DOMComb(parent, callback) {
  if (parent.hasChildNodes()) {
    for (var node = parent.firstChild; node; node = node.nextSibling) {
      DOMComb(node, callback);
    }
  }
  callback(parent);
}

// 用法
DOMComb(document.body, console.log)
```

上面代码中，DOMComb函数的第一个参数是某个指定的节点，第二个参数是回调函数。这个回调函数会依次作用于指定节点，以及指定节点的所有后代节点。

##### 1.3.3 Node.cloneNode()

`cloneNode`方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点。它的返回值是一个克隆出来的新节点。

`var cloneUL = document.querySelector('ul').cloneNode(true);`

该方法有一些使用注意点。

- --

1).克隆一个节点，会拷贝该节点的所有属性，但是会丧失addEventListener方法和on-属性（即node.onclick = fn），添加在这个节点上的事件回调函数。

- --

2).该方法返回的节点不在文档之中，即没有任何父节点，必须使用诸如Node.appendChild这样的方法添加到文档之中。

- --

3).克隆一个节点之后，DOM 有可能出现两个有相同id属性（即id="xxx"）的网页元素，这时应该修改其中一个元素的id属性。如果原节点有name属性，可能也需要修改。

- --

##### 1.3.4 Node.insertBefore()

`insertBefore`方法用于将某个节点插入父节点内部的指定位置。

`var insertedNode = parentNode.insertBefore(newNode, referenceNode);`

`insertBefore`方法接受两个参数，第一个参数是所要插入的节点`newNode`，第二个参数是父节点`parentNode`内部的一个子节点`referenceNode`。`newNode`将插在`referenceNode`这个子节点的前面。返回值是插入的新节点`newNode`。

```javascript
var p = document.createElement('p');
document.body.insertBefore(p, document.body.firstChild);
```

上面代码中，新建一个`<p>`节点，插在`document.body.firstChild`的前面，也就是成为`document.body`的第一个子节点。

如果`insertBefore`方法的第二个参数为`null`，则新节点将插在当前节点内部的最后位置，即变成最后一个子节点。

```javascript
var p = document.createElement('p');
document.body.insertBefore(p, null);
```

上面代码中，`p`将成为`document.body`的最后一个子节点。这也说明`insertBefore`的第二个参数不能省略。

注意，如果所要插入的节点是当前 DOM 现有的节点，则该节点将从原有的位置移除，插入新的位置。

由于不存在`insertAfter`方法，如果新节点要插在父节点的某个子节点后面，可以用`insertBefore`方法结合`nextSibling`属性模拟。

`parent.insertBefore(s1, s2.nextSibling);`

上面代码中，`parent`是父节点，s1是一个全新的节点，s2是可以将s1节点，插在s2节点的后面。如果s2是当前节点的最后一个子节点，则s2.nextSibling返回`null`，这时s1节点会插在当前节点的最后，变成当前节点的最后一个子节点，等于紧跟在s2的后面。

如果要插入的节点是`DocumentFragment`类型，那么插入的将是`DocumentFragment`的所有子节点，而不是`DocumentFragment`节点本身。返回值将是一个空的`DocumentFragment`节点。

##### 1.3.5 Node.removeChild()

`removeChild`方法接受一个子节点作为参数，用于从当前节点移除该子节点。返回值是移除的子节点。

```javascript
var divA = document.getElementById('A');
divA.parentNode.removeChild(divA);
```

上面代码移除了divA节点。注意，这个方法是在divA的父节点上调用的，不是在divA上调用的。

下面是如何移除当前节点的所有子节点。

```javascript
var element = document.getElementById('top');
while (element.firstChild) {
  element.removeChild(element.firstChild);
}
```

被移除的节点依然存在于内存之中，但不再是 DOM 的一部分。所以，一个节点移除以后，依然可以使用它，比如插入到另一个节点下面。

如果参数节点不是当前节点的子节点，`removeChild`方法将报错。

##### 1.3.6 Node.replaceChild()

`replaceChild`方法用于将一个新的节点，替换当前节点的某一个子节点。

`var replacedNode = parentNode.replaceChild(newChild, oldChild);`

上面代码中，`replaceChild`方法接受两个参数，第一个参数`newChild`是用来替换的新节点，第二个参数`oldChild`是将要替换走的子节点。返回值是替换走的那个节点`oldChild`。

```javascript
var divA = document.getElementById('divA');
var newSpan = document.createElement('span');
newSpan.textContent = 'Hello World!';
divA.parentNode.replaceChild(newSpan, divA);
```

上面代码是如何将指定节点divA替换走。

##### 1.3.7 Node.contains()

`contains`方法返回一个布尔值，表示参数节点是否满足以下三个条件之一。

- --
- 参数节点为当前节点。
- 参数节点为当前节点的子节点。
- 参数节点为当前节点的后代节点。
- --

`document.body.contains(node)`

上面代码检查参数节点node，是否包含在当前文档之中。

注意，当前节点传入`contains`方法，返回true。

`nodeA.contains(nodeA) // true`

##### 1.3.8 Node.compareDocumentPosition()

`compareDocumentPosition`方法的用法，与`contains`方法完全一致，返回一个七个比特位的二进制值，表示参数节点与当前节点的关系。

|二进制值|十进制值|含义|
|--|:--:|--|
|000000|0|两个节点相同|
|000001|1|两个节点不在同一个文档（即有一个节点不在当前文档）|
|000010|2|参数节点在当前节点的前面|
|000100|4|参数节点在当前节点的后面|
|001000|8|参数节点包含当前节点|
|010000|16|当前节点包含参数节点|
|100000|32|浏览器内部使用|

```javascript
// HTML 代码如下
// <div id="mydiv">
//   <form><input id="test" /></form>
// </div>

var div = document.getElementById('mydiv');
var input = document.getElementById('test');

div.compareDocumentPosition(input) // 20
input.compareDocumentPosition(div) // 10
```

上面代码中，节点div包含节点`input`（二进制010000），而且节点`input`在节点div的后面（二进制000100），所以第一个`compareDocumentPosition`方法返回20（二进制010100，即010000 + 000100），第二个`compareDocumentPosition`方法返回10（二进制001010）。

由于`compareDocumentPosition`返回值的含义，定义在每一个比特位上，所以如果要检查某一种特定的含义，就需要使用比特位运算符。

```javascript
var head = document.head;
var body = document.body;
if (head.compareDocumentPosition(body) & 4) {
  console.log('文档结构正确');
} else {
  console.log('<body> 不能在 <head> 前面');
}
```

上面代码中，`compareDocumentPosition`的返回值与4（又称掩码）进行与运算（`&`），得到一个布尔值，表示`<head>`是否在`<body>`前面。

##### 1.3.9 Node.isEqualNode()，Node.isSameNode()

`isEqualNode`方法返回一个布尔值，用于检查两个节点是否相等。所谓相等的节点，指的是两个节点的类型相同、属性相同、子节点相同。

```javascript
var p1 = document.createElement('p');
var p2 = document.createElement('p');

p1.isEqualNode(p2) // true
```

`isSameNode`方法返回一个布尔值，表示两个节点是否为同一个节点。

```javascript
var p1 = document.createElement('p');
var p2 = document.createElement('p');

p1.isSameNode(p2) // false
p1.isSameNode(p1) // true
```

##### 1.3.10 Node.normalize()

`normailize`方法用于清理当前节点内部的所有文本节点（text）。它会去除空的文本节点，并且将毗邻的文本节点合并成一个，也就是说不存在空的文本节点，以及毗邻的文本节点。

```javascript
var wrapper = document.createElement('div');

wrapper.appendChild(document.createTextNode('Part 1 '));
wrapper.appendChild(document.createTextNode('Part 2 '));

wrapper.childNodes.length // 2
wrapper.normalize();
wrapper.childNodes.length // 1
```

上面代码使用`normalize`方法之前，wrapper节点有两个毗邻的文本子节点。使用`normalize`方法之后，两个文本子节点被合并成一个。

该方法是`Text.splitText`的逆方法。

##### 1.3.11 Node.getRootNode()

`getRootNode`方法返回当前节点所在文档的根节点。

`document.body.firstChild.getRootNode() === document // true`

#### 1.4.NodeList 接口

节点都是单个对象，有时需要一种数据结构，能够容纳多个节点。DOM 提供两种节点集合，用于容纳多个节点：`NodeList`和`HTMLCollection`。

这两种集合都属于接口规范。许多 DOM 属性和方法，返回的结果是`NodeList`实例或`HTMLCollection`实例。

##### 1.4.1 概述

`NodeList`实例是一个类似数组的对象，它的成员是节点对象。通过以下方法可以得到`NodeList`实例。

- `Node.childNodes`
- `document.querySelectorAll()、document.getElementsByTagName()`等节点搜索方法

`document.body.childNodes instanceof NodeList // true`

`NodeList`实例很像数组，可以使用`length`属性和`forEach`方法。但是，它不是数组，不能使用`pop`或`push`之类数组特有的方法。

```javascript
var children = document.body.childNodes;

Array.isArray(children) // false

children.length // 34
children.forEach(console.log)
```

上面代码中，`NodeList` 实例`children`不是数组，但是具有`length`属性和`forEach`方法。

如果`NodeList`实例要使用数组方法，可以将其转为真正的数组。

```javascript
var children = document.body.childNodes;
var nodeArr = Array.prototype.slice.call(children);
```

除了使用`forEach`方法遍历 `NodeList` 实例，还可以使用`for`循环。

```javascript
var children = document.body.childNodes;

for (var i = 0; i < children.length; i++) {
  var item = children[i];
}
```

注意，`NodeList` 实例可能是动态集合，也可能是静态集合。所谓动态集合就是一个活的集合，DOM 删除或新增一个相关节点，都会立刻反映在 `NodeList` 实例。目前，只有`Node.childNodes`返回的是一个动态集合，其他的 `NodeList` 都是静态集合。

```javascript
var children = document.body.childNodes;
children.length // 18
document.body.appendChild(document.createElement('p'));
children.length // 19
```

上面代码中，文档增加一个子节点，`NodeList` 实例`children`的`length`属性就增加了1。

##### 1.4.2 NodeList.prototype.length

`length`属性返回 `NodeList` 实例包含的节点数量。

`document.getElementsByTagName('xxx').length// 0`

上面代码中，`document.getElementsByTagName`返回一个 `NodeList` 集合。对于那些不存在的 HTML 标签，`length`属性返回0。

##### 1.4.3 NodeList.prototype.forEach()

`forEach`方法用于遍历 `NodeList` 的所有成员。它接受一个回调函数作为参数，每一轮遍历就执行一次这个回调函数，用法与数组实例的`forEach`方法完全一致。

```javascript
var children = document.body.childNodes;
children.forEach(function f(item, i, list) {
  // ...
}, this);
```

上面代码中，回调函数f的三个参数依次是当前成员、位置和当前 `NodeList` 实例。`forEach`方法的第二个参数，用于绑定回调函数内部的`this`，该参数可省略。

##### 1.4.4 NodeList.prototype.item()

`item`方法接受一个整数值作为参数，表示成员的位置，返回该位置上的成员。

`document.body.childNodes.item(0)`

如果参数值大于实际长度，或者索引不合法（比如负数），`item`方法返回`null`。如果省略参数，`item`方法会报错。

所有类似数组的对象，都可以使用方括号运算符取出成员。一般情况下，都是使用方括号运算符，而不使用`item`方法。

`document.body.childNodes[0]`

##### 1.4.5 NodeList.prototype.keys()，NodeList.prototype.values()，NodeList.prototype.entries()

这三个方法都返回一个 ES6 的遍历器对象，可以通过`for...of`循环遍历获取每一个成员的信息。区别在于，`keys()`返回键名的遍历器，`values()`返回键值的遍历器，`entries()`返回的遍历器同时包含键名和键值的信息。

```javascript
var children = document.body.childNodes;

for (var key of children.keys()) {
  console.log(key);
}
// 0
// 1
// 2
// ...

for (var value of children.values()) {
  console.log(value);
}
// #text
// <script>
// ...

for (var entry of children.entries()) {
  console.log(entry);
}
// Array [ 0, #text ]
// Array [ 1, <script> ]
// ...
```

#### 1.5.HTMLCollection 接口

##### 1.5.1 概述

`HTMLCollection`是一个节点对象的集合，只能包含元素节点（element），不能包含其他类型的节点。它的返回值是一个类似数组的对象，但是与`NodeList`接口不同，`HTMLCollection`没有`forEach`方法，只能使用`for`循环遍历。

返回`HTMLCollection`实例的，主要是一些`Document`对象的集合属性，比如`document.links、docuement.forms、document.images`等。

`document.links instanceof HTMLCollection // true`

`HTMLCollection`实例都是动态集合，节点的变化会实时反映在集合中。

如果元素节点有`id`或`name`属性，那么`HTMLCollection`实例上面，可以使用`id`属性或`name`属性引用该节点元素。如果没有对应的节点，则返回`null`。

```javascript
// HTML 代码如下
// <img id="pic" src="http://example.com/foo.jpg">

var pic = document.getElementById('pic');
document.images.pic === pic // true
```

上面代码中，`document.images`是一个`HTMLCollection`实例，可以通过`<img>`元素的`id`属性值，从`HTMLCollection`实例上取到这个元素。

##### 1.5.2 HTMLCollection.prototype.length

`length`属性返回`HTMLCollection`实例包含的成员数量。

`document.links.length // 18`

##### 1.5.3 HTMLCollection.prototype.item()

`item`方法接受一个整数值作为参数，表示成员的位置，返回该位置上的成员。

```javascript
var c = document.images;
var img0 = c.item(0);
```

上面代码中，`item(0)`表示返回0号位置的成员。由于方括号运算符也具有同样作用，而且使用更方便，所以一般情况下，总是使用方括号运算符。

如果参数值超出成员数量或者不合法（比如小于0），那么`item`方法返回`null`。

##### 1.5.4 HTMLCollection.prototype.namedItem()

`namedItem`方法的参数是一个字符串，表示`id`属性或`name`属性的值，返回对应的元素节点。如果没有对应的节点，则返回`null`。

```javascript
// HTML 代码如下
// <img id="pic" src="http://example.com/foo.jpg">

var pic = document.getElementById('pic');
document.images.namedItem('pic') === pic // true
```

#### 1.6.ParentNode 接口

节点对象除了继承 Node 接口以外，还会继承其他接口。`ParentNode`接口表示当前节点是一个父节点，提供一些处理子节点的方法。`ChildNode`接口表示当前节点是一个子节点，提供一些相关方法。

如果当前节点是父节点，就会继承`ParentNode`接口。由于只有元素节点（element）、文档节点（document）和文档片段节点（documentFragment）拥有子节点，因此只有这三类节点会继承`ParentNode`接口。

##### 1.6.1 ParentNode.children

`children`属性返回一个`HTMLCollection`实例，成员是当前节点的所有元素子节点。该属性只读。

下面是遍历某个节点的所有元素子节点的示例。

```javascript
for (var i = 0; i < el.children.length; i++) {
  // ...
}
```

注意，`children`属性只包括元素子节点，不包括其他类型的子节点（比如文本子节点）。如果没有元素类型的子节点，返回值`HTMLCollection`实例的`length`属性为0。

另外，`HTMLCollection`是动态集合，会实时反映 DOM 的任何变化。

##### 1.6.2 ParentNode.firstElementChild

`firstElementChild`属性返回当前节点的第一个元素子节点。如果没有任何元素子节点，则返回`null`。

`document.firstElementChild.nodeName// "HTML"`

##### 1.6.3 ParentNode.lastElementChild

`lastElementChild`属性返回当前节点的最后一个元素子节点，如果不存在任何元素子节点，则返回`null`。

`document.lastElementChild.nodeName// "HTML"`

上面代码中，`document`节点的最后一个元素子节点是`<HTML>`（因为`document`只包含这一个元素子节点）。

##### 1.6.4 ParentNode.childElementCount

`childElementCount`属性返回一个整数，表示当前节点的所有元素子节点的数目。如果不包含任何元素子节点，则返回0。

`document.body.childElementCount // 13`

##### 1.6.5 ParentNode.append()，ParentNode.prepend()

`append`方法为当前节点追加一个或多个子节点，位置是最后一个元素子节点的后面。

该方法不仅可以添加元素子节点，还可以添加文本子节点。

```javascript
var parent = document.body;

// 添加元素子节点
var p = document.createElement('p');
parent.append(p);

// 添加文本子节点
parent.append('Hello');

// 添加多个元素子节点
var p1 = document.createElement('p');
var p2 = document.createElement('p');
parent.append(p1, p2);

// 添加元素子节点和文本子节点
var p = document.createElement('p');
parent.append('Hello', p);
```

注意，该方法没有返回值。

`prepend`方法为当前节点追加一个或多个子节点，位置是第一个元素子节点的前面。它的用法与`append`方法完全一致，也是没有返回值。

#### 1.7.ChildNode 接口

如果一个节点有父节点，那么该节点就继承了`ChildNode`接口。

##### 1.7.1 ChildNode.remove()

`remove`方法用于从父节点移除当前节点。

`el.remove()`

##### 1.7.2 ChildNode.before()，ChildNode.after()

`before`方法用于在当前节点的前面，插入一个或多个同级节点。两者拥有相同的父节点。

注意，该方法不仅可以插入元素节点，还可以插入文本节点。

```javascript
var p = document.createElement('p');
var p1 = document.createElement('p');

// 插入元素节点
el.before(p);

// 插入文本节点
el.before('Hello');

// 插入多个元素节点
el.before(p, p1);

// 插入元素节点和文本节点
el.before(p, 'Hello');
```

`after`方法用于在当前节点的后面，插入一个或多个同级节点，两者拥有相同的父节点。用法与`before`方法完全相同。

##### 1.7.3ChildNode.replaceWith()

`replaceWith`方法使用参数节点，替换当前节点。参数可以是元素节点，也可以是文本节点。

```javascript
var span = document.createElement('span');
el.replaceWith(span);
```

### 2.document 对象

#### 2.1.概述

`document`对象是文档的根节点，每张网页都有自己的`document`对象。`window.document`属性就指向这个对象。只要浏览器开始载入 HTML 文档，该对象就存在了，可以直接使用。

`document`对象有不同的办法可以获取。

- --
- a.正常的网页，直接使用`document`或`window.document`。
- b.`iframe`框架里面的网页，使用`iframe`节点的`contentDocument`属性。
- c.Ajax 操作返回的文档，使用`XMLHttpRequest`对象的`responseXML`属性。
- d.内部节点的`ownerDocument`属性。
- --

`document`对象继承了`EventTarget`接口、`Node`接口、`ParentNode`接口。这意味着，这些接口的方法都可以在`document`对象上调用。除此之外，`document`对象还有很多自己的属性和方法。

#### 2.2.属性

##### 2.2.1 快捷方式属性

以下属性是指向文档内部的某个节点的快捷方式。

1).document.defaultView

`document.defaultView`属性返回`document`对象所属的`window`对象。如果当前文档不属于`window`对象，该属性返回`null`。

`document.defaultView === window // true`

2).document.doctype

对于 HTML 文档来说，`document`对象一般有两个子节点。第一个子节点是`document.doctype`，指向`<DOCTYPE>`节点，即文档类型（Document Type Declaration，简写DTD）节点。HTML 的文档类型节点，一般写成`<!DOCTYPE html>`。如果网页没有声明 DTD，该属性返回`null`。

```javascript
var doctype = document.doctype;
doctype // "<!DOCTYPE html>"
doctype.name // "html"
```

`document.firstChild`通常就返回这个节点。

3).document.documentElement

`document.documentElement`属性返回当前文档的根节点（root）。它通常是`document`节点的第二个子节点，紧跟在`document.doctype`节点后面。HTML网页的该属性，一般是`<html>`节点。

4).document.body，document.head

`document.body`属性指向`<body>`节点，`document.head`属性指向`<head>`节点。

这两个属性总是存在的，如果网页源码里面省略了`<head>`或`<body>`，浏览器会自动创建。另外，这两个属性是可写的，如果改写它们的值，相当于移除所有子节点。

5).document.scrollingElement

`document.scrollingElement`属性返回文档的滚动元素。也就是说，当文档整体滚动时，到底是哪个元素在滚动。

标准模式下，这个属性返回的文档的根元素`document.documentElement`（即`<html>`）。**兼容（quirk）**模式下，返回的是`<body>`元素，如果该元素不存在，返回`null`。

```javascript
// 页面滚动到浏览器顶部
document.scrollingElement.scrollTop = 0;
```

6).document.activeElement

`document.activeElement`属性返回获得当前**焦点（focus）**的 DOM 元素。通常，这个属性返回的是`<input>`、`<textarea>`、`<select>`等表单元素，如果当前没有焦点元素，返回`<body>`元素或`null`。

7).document.fullscreenElement

`document.fullscreenElement`属性返回当前以全屏状态展示的 DOM 元素。如果不是全屏状态，该属性返回`null`。

```javascript
if (document.fullscreenElement.nodeName == 'VIDEO') {
  console.log('全屏播放视频');
}
```

上面代码中，通过`document.fullscreenElement`可以知道`<video>`元素有没有处在全屏状态，从而判断用户行为。

##### 2.2.2 节点集合属性

以下属性返回一个`HTMLCollection`实例，表示文档内部特定元素的集合。这些集合都是动态的，原节点有任何变化，立刻会反映在集合中。

1).document.links

`document.links`属性返回当前文档所有设定了`href`属性的`<a>`及`<area>`节点。

```javascript
// 打印文档所有的链接
var links = document.links;
for(var i = 0; i < links.length; i++) {
  console.log(links[i]);
}
```

2).document.forms

`document.forms`属性返回所有`<form>`表单节点。

`var selectForm = document.forms[0];`

3).document.images

`document.images`属性返回页面所有`<img>`图片节点。

```javascript
var imglist = document.images;

for(var i = 0; i < imglist.length; i++) {
  if (imglist[i].src === 'banner.gif') {
    // ...
  }
}
```

4).document.embeds，document.plugins

`document.embeds`属性和`document.plugins`属性，都返回所有`<embed>`节点。

5).document.scripts

`document.scripts`属性返回所有`<script>`节点。

```javascript
var scripts = document.scripts;
if (scripts.length !== 0 ) {
  console.log('当前网页有脚本');
}
```

6).document.styleSheets

`document.styleSheets`属性返回文档内嵌或引入的样式表集合。

7).小结

除了`document.styleSheets`，以上的集合属性返回的都是`HTMLCollection`实例。

```javascript
document.links instanceof HTMLCollection // true
document.images instanceof HTMLCollection // true
document.forms instanceof HTMLCollection // true
document.embeds instanceof HTMLCollection // true
document.scripts instanceof HTMLCollection // true
```

`HTMLCollection`实例是类似数组的对象，所以这些属性都有`length`属性，都可以使用方括号运算符引用成员。如果成员有`id`或`name`属性，还可以用这两个属性的值，在`HTMLCollection`实例上引用到这个成员。

```javascript
// HTML 代码如下
// <form name="myForm">
document.myForm === document.forms.myForm // true
```

##### 2.2.3 文档静态信息属性

以下属性返回文档信息。

1).document.documentURI，document.URL

`document.documentURI`属性和`document.URL`属性都返回一个字符串，表示当前文档的网址。不同之处是它们继承自不同的接口，`documentURI`继承自`Document`接口，可用于所有文档；URL继承自`HTMLDocument`接口，只能用于 HTML 文档。

```javascript
document.URL
// http://www.example.com/about

document.documentURI === document.URL
// true
```

如果文档的**锚点（#anchor）**变化，这两个属性都会跟着变化。

2).document.domain

`document.domain`属性返回当前文档的域名，不包含协议和接口。比如，网页的网址是`http://www.example.com:80/hello.html`，那么`domain`属性就等于`www.example.com`。如果无法获取域名，该属性返回`null`。

`document.domain`基本上是一个只读属性，只有一种情况除外。次级域名的网页，可以把`document.domain`设为对应的上级域名。比如，当前域名是`a.sub.example.com`，则`document.domain`属性可以设置为`sub.example.com`，也可以设为`example.com`。修改后，`document.domain`相同的两个网页，可以读取对方的资源，比如设置的 `Cookie`。

另外，设置`document.domain`会导致端口被改成`null`。因此，如果通过设置`document.domain`来进行通信，双方网页都必须设置这个值，才能保证端口相同。

3).document.location

`Location`对象是浏览器提供的原生对象，提供 URL 相关的信息和操作方法。通过`window.location和document.location`属性，可以拿到这个对象。

4).document.lastModified

`document.lastModified`属性返回一个字符串，表示当前文档最后修改的时间。不同浏览器的返回值，日期格式是不一样的。

`document.lastModified// "03/07/2018 11:18:27"`

注意，`document.lastModified`属性的值是字符串，所以不能直接用来比较。`Date.parse`方法将其转为`Date`实例，才能比较两个网页。

```javascript
var lastVisitedDate = Date.parse('01/01/2018');
if (Date.parse(document.lastModified) > lastVisitedDate) {
  console.log('网页已经变更');
}
```

如果页面上有 JavaScript 生成的内容，`document.lastModified`属性返回的总是当前时间。

5).document.title

`document.title`属性返回当前文档的标题。默认情况下，返回`<title>`节点的值。但是该属性是可写的，一旦被修改，就返回修改后的值。

```javascript
document.title = '新标题';
document.title // "新标题"
```

6).document.characterSet

`document.characterSet`属性返回当前文档的编码，比如`UTF-8`、`ISO-8859-1`等等。

7).document.referrer

`document.referrer`属性返回一个字符串，表示当前文档的访问者来自哪里。

`document.referrer// "https://example.com/path"`

如果无法获取来源，或者用户直接键入网址而不是从其他网页点击进入，`document.referrer`返回一个空字符串。

`document.referrer`的值，总是与 HTTP 头信息的`Referer`字段保持一致。但是，`document.referrer`的拼写有两个r，而头信息的`Referer`字段只有一个r。

8).document.dir

`document.dir`返回一个字符串，表示文字方向。它只有两个可能的值：`rtl`表示文字从右到左，阿拉伯文是这种方式；`ltr`表示文字从左到右，包括英语和汉语在内的大多数文字采用这种方式。

9).document.compatMode

`compatMode`属性返回浏览器处理文档的模式，可能的值为`BackCompat`（向后兼容模式）和`CSS1Compat`（严格模式）。

一般来说，如果网页代码的第一行设置了明确的`DOCTYPE`（比如`<!doctype html>`），`document.compatMode`的值都为`CSS1Compat`。

##### 2.2.4 文档状态属性

1).document.hidden

`document.hidden`属性返回一个布尔值，表示当前页面是否可见。如果窗口最小化、浏览器切换了 Tab，都会导致导致页面不可见，使得`document.hidden`返回true。

这个属性是 Page Visibility API 引入的，一般都是配合这个 API 使用。

2).document.visibilityState

`document.visibilityState`返回文档的可见状态。

它的值有四种可能。

- --
- a.visible：页面可见。注意，页面可能是部分可见，即不是焦点窗口，前面被其他窗口部分挡住了。
- b.hidden： 页面不可见，有可能窗口最小化，或者浏览器切换到了另一个 Tab。
- c.prerender：页面处于正在渲染状态，对于用于来说，该页面不可见。
- d.unloaded：页面从内存里面卸载了。
- --

这个属性可以用在页面加载时，防止加载某些资源；或者页面不可见时，停掉一些页面功能。

（3）document.readyState

`document.readyState`属性返回当前文档的状态，共有三种可能的值。

- --
- `loading`：加载 HTML 代码阶段（尚未完成解析）
- `interactive`：加载外部资源阶段
- `complete`：加载完成
- --

这个属性变化的过程如下。

- --
- a.浏览器开始解析 HTML 文档，`document.readyState`属性等于`loading`。
- b.浏览器遇到 HTML 文档中的`<script>`元素，并且没有`async`或`defer`属性，就暂停解析，开始执行脚本，这时`document.readyState`属性还是等于`loading`。
- c.HTML 文档解析完成，`document.readyState`属性变成`interactive`。
- d.浏览器等待图片、样式表、字体文件等外部资源加载完成，一旦全部加载完成，`document.readyState`属性变成`complete`。
- --

下面的代码用来检查网页是否加载成功。

```javascript
// 基本检查
if (document.readyState === 'complete') {
  // ...
}

// 轮询检查
var interval = setInterval(function() {
  if (document.readyState === 'complete') {
    clearInterval(interval);
    // ...
  }
}, 100);
```

另外，每次状态变化都会触发一个`readystatechange`事件。

##### 2.2.5 document.cookie

`document.cookie`属性用来操作浏览器 `Cookie`。

##### 2.2.6 document.designMode

`document.designMode`属性控制当前文档是否可编辑，通常用在所见即所得编辑器。该属性只有两个值`on`和`off`，默认值为`off`。

下面代码打开`iframe`元素内部文档的`designMode`属性，就能将其变为一个所见即所得的编辑器。

```javascript
// HTML 代码如下
// <iframe id="editor" src="about:blank"></iframe>
var editor = document.getElementById('editor');
editor.contentDocument.designMode = 'on';
```

##### 2.2.7 document.implementation

`document.implementation`属性返回一个`DOMImplementation`对象。该对象有三个方法，主要用于创建独立于当前文档的新的 `Document` 对象。

- --
- DOMImplementation.createDocument()：创建一个 XML 文档。
- DOMImplementation.createHTMLDocument()：创建一个 HTML 文档。
- DOMImplementation.createDocumentType()：创建一个 DocumentType 对象。
- --

下面是创建 HTML 文档的例子。

```javascript
var doc = document.implementation.createHTMLDocument('Title');
var p = doc.createElement('p');
p.innerHTML = 'hello world';
doc.body.appendChild(p);

document.replaceChild(
  doc.documentElement,
  document.documentElement
);
```

上面代码中，第一步生成一个新的 HTML 文档doc，然后用它的根元素`document.documentElement`替换掉`document.documentElement`。这会使得当前文档的内容全部消失，变成hello world。

#### 2.3.方法

##### 2.3.1 document.open()，document.close()

`document.open`方法清除当前文档所有内容，使得文档处于可写状态，供`document.write`方法写入内容。

`document.close`方法用来关闭`document.open()`打开的文档。

```javascript
document.open();
document.write('hello world');
document.close();
```

##### 2.3.2 document.write()，document.writeln()

`document.write`方法用于向当前文档写入内容。

在网页的首次渲染阶段，只要页面没有关闭写入（即没有执行`document.close()`），`document.write`写入的内容就会追加在已有内容的后面。

```javascript
// 页面显示“helloworld”
document.open();
document.write('hello');
document.write('world');
document.close();
```

注意，`document.write`会当作 HTML 代码解析，不会转义。

`document.write('<p>hello world</p>');`

上面代码中，`document.write`会将`<p>`当作 HTML 标签解释。

如果页面已经解析完成（`DOMContentLoaded`事件发生之后），再调用`write`方法，它会先调用`open`方法，擦除当前文档所有内容，然后再写入。

```javascript
document.addEventListener('DOMContentLoaded', function (event) {
  document.write('<p>Hello World!</p>');
});

// 等同于
document.addEventListener('DOMContentLoaded', function (event) {
  document.open();
  document.write('<p>Hello World!</p>');
  document.close();
});
```

如果在页面渲染过程中调用`write`方法，并不会自动调用`open`方法。（可以理解成，`open`方法已调用，但`close`方法还未调用。）

```javascript
<html>
<body>
hello
<script type="text/javascript">
  document.write("world")
</script>
</body>
</html>
```

在浏览器打开上面网页，将会显示hello world。

`document.write`是JavaScript语言标准化之前就存在的方法，现在完全有更符合标准的方法向文档写入内容（比如对`innerHTML`属性赋值）。所以，除了某些特殊情况，应该尽量避免使用`document.write`这个方法。

`document.writeln`方法与`write`方法完全一致，除了会在输出内容的尾部添加换行符。

```javascript
document.write(1);
document.write(2);
// 12

document.writeln(1);
document.writeln(2);
// 1
// 2
//
```

注意，`writeln`方法添加的是 `ASCII` 码的换行符，渲染成 HTML 网页时不起作用，即在网页上显示不出换行。网页上的换行，必须显式写入`<br>`。

##### 2.3.3 document.querySelector()，document.querySelectorAll()

`document.querySelector`方法接受一个 CSS 选择器作为参数，返回匹配该选择器的元素节点。如果有多个节点满足匹配条件，则返回第一个匹配的节点。如果没有发现匹配的节点，则返回`null`。

```javascript
var el1 = document.querySelector('.myclass');
var el2 = document.querySelector('#myParent > [ng-click]');
```

`document.querySelectorAll`方法与`querySelector`用法类似，区别是返回一个`NodeList`对象，包含所有匹配给定选择器的节点。

`elementList = document.querySelectorAll('.myclass');`

这两个方法的参数，可以是逗号分隔的多个 CSS 选择器，返回匹配其中一个选择器的元素节点，这与 CSS 选择器的规则是一致的。

`var matches = document.querySelectorAll('div.note, div.alert');`

这两个方法都支持复杂的 CSS 选择器。

```javascript
// 选中 data-foo-bar 属性等于 someval 的元素
document.querySelectorAll('[data-foo-bar="someval"]');

// 选中 myForm 表单中所有不通过验证的元素
document.querySelectorAll('#myForm :invalid');

// 选中div元素，那些 class 含 ignore 的除外
document.querySelectorAll('DIV:not(.ignore)');

// 同时选中 div，a，script 三类元素
document.querySelectorAll('DIV, A, SCRIPT');
```

但是，它们不支持 CSS 伪元素的选择器（比如`:first-line`和`:first-letter`）和伪类的选择器（比如`:link`和`:visited`），即无法选中伪元素和伪类。

如果`querySelectorAll`方法的参数是字符串*，则会返回文档中的所有元素节点。另外，`querySelectorAll`的返回结果不是动态集合，不会实时反映元素节点的变化。

最后，这两个方法除了定义在`document`对象上，还定义在元素节点上，即在元素节点上也可以调用。

##### 2.3.4 document.getElementsByTagName()

`document.getElementsByTagName`方法搜索 HTML 标签名，返回符合条件的元素。它的返回值是一个类似数组对象（`HTMLCollection`实例），可以实时反映 HTML 文档的变化。如果没有任何匹配的元素，就返回一个空集。

```javascript
var paras = document.getElementsByTagName('p');
paras instanceof HTMLCollection // true
```

HTML 标签名是大小写不敏感的，因此`getElementsByTagName`方法也是大小写不敏感的。另外，返回结果中，各个成员的顺序就是它们在文档中出现的顺序。

如果传入`*`，就可以返回文档中所有 HTML 元素。

`var allElements = document.getElementsByTagName('*');`

注意，元素节点本身也定义了`getElementsByTagName`方法，返回该元素的后代元素中符合条件的元素。也就是说，这个方法不仅可以在`document`对象上调用，也可以在任何元素节点上调用。

```javascript
var firstPara = document.getElementsByTagName('p')[0];
var spans = firstPara.getElementsByTagName('span');
```

##### 2.3.5 document.getElementsByClassName()

`document.getElementsByClassName`方法返回一个类似数组的对象（`HTMLCollection`实例），包括了所有`class`名字符合指定条件的元素，元素的变化实时反映在返回结果中。

`var elements = document.getElementsByClassName(names);`

由于`class`是保留字，所以 JavaScript 一律使用`className`表示 CSS 的`class`。

参数可以是多个`class`，它们之间使用空格分隔。

`var elements = document.getElementsByClassName('foo bar');`

上面代码返回同时具有foo和bar两个`class`的元素，foo和bar的顺序不重要。

注意，正常模式下，CSS 的`class`是大小写敏感的。（`quirks mode`下，大小写不敏感。）

与`getElementsByTagName`方法一样，`getElementsByClassName`方法不仅可以在`document`对象上调用，也可以在任何元素节点上调用。

```javascript
// 非document对象上调用
var elements = rootElement.getElementsByClassName(names);
```

##### 2.3.6 document.getElementsByName()

`document.getElementsByName`方法用于选择拥有`name`属性的 HTML 元素（比如`<form>`、`<radio>`、`<img>`、`<frame>`、`<embed>`和`<object>`等），返回一个类似数组的的对象（`NodeList`实例），因为`name`属性相同的元素可能不止一个。

```javascript
// 表单为 <form name="x"></form>
var forms = document.getElementsByName('x');
forms[0].tagName // "FORM"
```

##### 2.3.7 document.getElementById()

`document.getElementById`方法返回匹配指定`id`属性的元素节点。如果没有发现匹配的节点，则返回`null`。

`var elem = document.getElementById('para1');`

注意，该方法的参数是大小写敏感的。比如，如果某个节点的`id`属性是main，那么`document.getElementById('Main')`将返回`null`。

`document.getElementById`方法与`document.querySelector`方法都能获取元素节点，不同之处是`document.querySelector`方法的参数使用 CSS 选择器语法，`document.getElementById`方法的参数是元素的`id`属性。

```javascript
document.getElementById('myElement')
document.querySelector('#myElement')
```

上面代码中，两个方法都能选中`id`为myElement的元素，但是`document.getElementById()`比`document.querySelector()`效率高得多。

另外，这个方法只能在`document`对象上使用，不能在其他元素节点上使用。

##### 2.3.8 document.elementFromPoint()，document.elementsFromPoint()

`document.elementFromPoint`方法返回位于页面指定位置最上层的元素节点。

`var element = document.elementFromPoint(50, 50);`

上面代码选中在(50, 50)这个坐标位置的最上层的那个 HTML 元素。

`elementFromPoint`方法的两个参数，依次是相对于当前视口左上角的横坐标和纵坐标，单位是像素。如果位于该位置的 HTML 元素不可返回（比如文本框的滚动条），则返回它的父元素（比如文本框）。如果坐标值无意义（比如负值或超过视口大小），则返回`null`。

`document.elementsFromPoint()`返回一个数组，成员是位于指定坐标（相对于视口）的所有元素。

`var elements = document.elementsFromPoint(x, y);`

##### 2.3.9 document.caretPositionFromPoint()

`document.caretPositionFromPoint()`返回一个 CaretPosition 对象，包含了指定坐标点在节点对象内部的位置信息。CaretPosition 对象就是光标插入点的概念，用于确定光标点在文本对象内部的具体位置。

`var range = document.caretPositionFromPoint(clientX, clientY);`

上面代码中，`range`是指定坐标点的 CaretPosition 对象。该对象有两个属性。

- --
- CaretPosition.offsetNode：该位置的节点对象
- CaretPosition.offset：该位置在`offsetNode`对象内部，与起始位置相距的字符数。
- --

##### 2.3.10 document.createElement()

`document.createElement`方法用来生成元素节点，并返回该节点。

`var newDiv = document.createElement('div');`

`createElement`方法的参数为元素的标签名，即元素节点的`tagName`属性，对于 HTML 网页大小写不敏感，即参数为div或DIV返回的是同一种节点。如果参数里面包含尖括号（即`<`和`>`）会报错。

```javascript
document.createElement('<div>');
// DOMException: The tag name provided ('<div>') is not a valid name
```

注意，`document.createElement`的参数可以是自定义的标签名。

##### 2.3.11 document.createTextNode()

`document.createTextNode`方法用来生成文本节点（Text实例），并返回该节点。它的参数是文本节点的内容。

```javascript
var newDiv = document.createElement('div');
var newContent = document.createTextNode('Hello');
newDiv.appendChild(newContent);
```

上面代码新建一个div节点和一个文本节点，然后将文本节点插入div节点。

这个方法可以确保返回的节点，被浏览器当作文本渲染，而不是当作 HTML 代码渲染。因此，可以用来展示用户的输入，避免 XSS 攻击。

```javascript
var div = document.createElement('div');
div.appendChild(document.createTextNode('<span>Foo & bar</span>'));
console.log(div.innerHTML)
// &lt;span&gt;Foo &amp; bar&lt;/span&gt;
```

上面代码中，`createTextNode`方法对大于号和小于号进行转义，从而保证即使用户输入的内容包含恶意代码，也能正确显示。

需要注意的是，该方法不对单引号和双引号转义，所以不能用来对 HTML 属性赋值。

```javascript
function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

var userWebsite = '" onmouseover="alert(\'derp\')" "';
var profileLink = '<a href="' + escapeHtml(userWebsite) + '">Bob</a>';
var div = document.getElementById('target');
div.innerHTML = profileLink;
// <a href="" onmouseover="alert('derp')" "">Bob</a>
```

上面代码中，由于`createTextNode`方法不转义双引号，导致`onmouseover`方法被注入了代码。

##### 2.3.12 document.createAttribute()

`document.createAttribute`方法生成一个新的属性节点（Attr实例），并返回它。

`var attribute = document.createAttribute(name);`

`document.createAttribute`方法的参数`name`，是属性的名称。

```javascript
var node = document.getElementById('div1');

var a = document.createAttribute('my_attrib');
a.value = 'newVal';

node.setAttributeNode(a);
// 或者
node.setAttribute('my_attrib', 'newVal');
```

##### 2.3.13 document.createComment()

`document.createComment`方法生成一个新的注释节点，并返回该节点。

`var CommentNode = document.createComment(data);`

`document.createComment`方法的参数是一个字符串，会成为注释节点的内容。

##### 2.3.14 document.createDocumentFragment()

`document.createDocumentFragment`方法生成一个空的文档片段对象（`DocumentFragment`实例）。

`var docFragment = document.createDocumentFragment();`

`DocumentFragment`是一个存在于内存的 DOM 片段，不属于当前文档，常常用来生成一段较复杂的 DOM 结构，然后再插入当前文档。这样做的好处在于，因为`DocumentFragment`不属于当前文档，对它的任何改动，都不会引发网页的重新渲染，比直接修改当前文档的 DOM 有更好的性能表现。

```javascript
var docfrag = document.createDocumentFragment();

[1, 2, 3, 4].forEach(function (e) {
  var li = document.createElement('li');
  li.textContent = e;
  docfrag.appendChild(li);
});

var element  = document.getElementById('ul');
element.appendChild(docfrag);
```

上面代码中，文档片断docfrag包含四个`<li>`节点，这些子节点被一次性插入了当前文档。

##### 2.3.15 document.createEvent()

`document.createEvent`方法生成一个事件对象（`Event`实例），该对象可以被`element.dispatchEvent`方法使用，触发指定事件。

`var event = document.createEvent(type);`

`document.createEvent`方法的参数是事件类型，比如`UIEvents`、`MouseEvents`、`MutationEvents`、`HTMLEvents`。

```javascript
var event = document.createEvent('Event');
event.initEvent('build', true, true);
document.addEventListener('build', function (e) {
  console.log(e.type); // "build"
}, false);
document.dispatchEvent(event);
```

##### 2.3.16 document.addEventListener()，document.removeEventListener()，document.dispatchEvent()

这三个方法用于处理`document`节点的事件，它们都继承自`EventTarget`接口。

```javascript
// 添加事件监听函数
document.addEventListener('click', listener, false);

// 移除事件监听函数
document.removeEventListener('click', listener, false);

// 触发事件
var event = new Event('click');
document.dispatchEvent(event);
```

##### 2.3.17 document.hasFocus()

`document.hasFocus`方法返回一个布尔值，表示当前文档之中是否有元素被激活或获得焦点。

`var focused = document.hasFocus();`

注意，有焦点的文档必定被**激活（active）**，反之不成立，激活的文档未必有焦点。比如，用户点击按钮，从当前窗口跳出一个新窗口，该新窗口就是激活的，但是不拥有焦点。

##### 2.3.18 document.adoptNode()，document.importNode()

`document.adoptNode`方法将某个节点及其子节点，从原来所在的文档或`DocumentFragment`里面移除，归属当前`document`对象，返回插入后的新节点。插入的节点对象的`ownerDocument`属性，会变成当前的`document`对象，而`parentNode`属性是`null`。

```javascript
var node = document.adoptNode(externalNode);
document.appendChild(node);
```

注意，`document.adoptNode`方法只是改变了节点的归属，并没有将这个节点插入新的文档树。所有，还要再用`appendChild`方法或`insertBefore`方法，将新节点插入当前文档树。

`document.importNode`方法则是从原来所在的文档或`DocumentFragment`里面，拷贝某个节点及其子节点，让它们归属当前`document`对象。拷贝的节点对象的`ownerDocument`属性，会变成当前的`document`对象，而`parentNode`属性是`null`。

`var node = document.importNode(externalNode, deep);`

`document.adoptNode`方法的第一个参数是外部节点，第二个参数是一个布尔值，表示对外部节点是深拷贝还是浅拷贝，默认是浅拷贝（false）。虽然第二个参数是可选的，但是建议总是保留这个参数，并设为true。

注意，`document.importNode`方法只是拷贝外部节点，这时该节点的父节点是`null`。下一步还必须将这个节点插入当前文档树。

```javascript
var iframe = document.getElementsByTagName('iframe')[0];
var oldNode = iframe.contentWindow.document.getElementById('myNode');
var newNode = document.importNode(oldNode, true);
document.getElementById("container").appendChild(newNode);
```

##### 2.3.19 document.createNodeIterator()

`document.createNodeIterator`方法返回一个子节点遍历器。

```javascript
var nodeIterator = document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_ELEMENT
);
```

上面代码返回`<body>`元素子节点的遍历器。

`document.createNodeIterator`方法第一个参数为所要遍历的根节点，第二个参数为所要遍历的节点类型，这里指定为元素节点（`NodeFilter.SHOW_ELEMENT`）。几种主要的节点类型写法如下。

- --
- 所有节点：NodeFilter.SHOW_ALL
- 元素节点：NodeFilter.SHOW_ELEMENT
- 文本节点：NodeFilter.SHOW_TEXT
- 评论节点：NodeFilter.SHOW_COMMENT
- --

`document.createNodeIterator`方法返回一个“遍历器”对象（`NodeFilter`实例）。该实例的`nextNode()`方法和`previousNode()`方法，可以用来遍历所有子节点。

```javascript
var nodeIterator = document.createNodeIterator(document.body);
var pars = [];
var currentNode;

while (currentNode = nodeIterator.nextNode()) {
  pars.push(currentNode);
}
```

上面代码中，使用遍历器的`nextNode`方法，将根节点的所有子节点，依次读入一个数组。`nextNode`方法先返回遍历器的内部指针所在的节点，然后会将指针移向下一个节点。所有成员遍历完成后，返回`null`。`previousNode`方法则是先将指针移向上一个节点，然后返回该节点。

```javascript
var nodeIterator = document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_ELEMENT
);

var currentNode = nodeIterator.nextNode();
var previousNode = nodeIterator.previousNode();

currentNode === previousNode // true
```

上面代码中，`currentNode`和`previousNode`都指向同一个的节点。

注意，遍历器返回的第一个节点，总是根节点。

`pars[0] === document.body // true`

##### 2.3.20 document.createTreeWalker()

`document.createTreeWalker`方法返回一个 DOM 的子树遍历器。它与`document.createNodeIterator`方法基本是类似的，区别在于它返回的是`TreeWalker`实例，后者返回的是`NodeIterator`实例。另外，它的第一个节点不是根节点。

`document.createTreeWalker`方法的第一个参数是所要遍历的根节点，第二个参数指定所要遍历的节点类型（与`document.createNodeIterator`方法的第二个参数相同）。

```javascript
var treeWalker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_ELEMENT
);

var nodeList = [];

while(treeWalker.nextNode()) {
  nodeList.push(treeWalker.currentNode);
}
```

上面代码遍历`<body>`节点下属的所有元素节点，将它们插入nodeList数组。

##### 2.3.21 document.getSelection()

这个方法指向`window.getSelection()`。

### 3.Element对象

`Element`对象对应网页的 HTML 元素。每一个 HTML 元素，在 DOM 树上都会转化成一个`Element`节点对象（以下简称元素节点）。

元素节点的`nodeType`属性都是1。

```javascript
var p = document.querySelector('p');
p.nodeName // "P"
p.nodeType // 1
```

`Element`对象继承了`Node`接口，因此`Node`的属性和方法在`Element`对象都存在。此外，不同的 HTML 元素对应的元素节点是不一样的，浏览器使用不同的构造函数，生成不同的元素节点，比如`<a>`元素的节点对象由`HTMLAnchorElement`构造函数生成，`<button>`元素的节点对象由`HTMLButtonElement`构造函数生成。因此，元素节点不是一种对象，而是一组对象，这些对象除了继承`Element`的属性和方法，还有各自构造函数的属性和方法。

#### 3.1.实例属性

##### 3.1.1 元素特性的相关属性

1).Element.id

`Element.id`属性返回指定元素的`id`属性，该属性可读写。

```javascript
// HTML 代码为 <p id="foo">
var p = document.querySelector('p');
p.id // "foo"
```

注意，`id`属性的值是大小写敏感，即浏览器能正确识别`<p id="foo">`和`<p id="FOO">`这两个元素的`id`属性，但是最好不要这样命名。

2).Element.tagName

`Element.tagName`属性返回指定元素的大写标签名，与`nodeName`属性的值相等。

```javascript
// HTML代码为
// <span id="myspan">Hello</span>
var span = document.getElementById('myspan');
span.id // "myspan"
span.tagName // "SPAN"
```

3).Element.dir

`Element.dir`属性用于读写当前元素的文字方向，可能是从左到右（"`ltr`"），也可能是从右到左（"`rtl`"）。

4).Element.accessKey

`Element.accessKey`属性用于读写分配给当前元素的快捷键。

```javascript
// HTML 代码如下
// <button accesskey="h" id="btn">点击</button>
var btn = document.getElementById('btn');
btn.accessKey // "h"
```

上面代码中，btn元素的快捷键是h，按下Alt + h就能将焦点转移到它上面。

5).Element.draggable

`Element.draggable`属性返回一个布尔值，表示当前元素是否可拖动。该属性可读写。

6).Element.lang

`Element.lang`属性返回当前元素的语言设置。该属性可读写。

```javascript
// HTML 代码如下
// <html lang="en">
document.documentElement.lang // "en"
```

7).Element.tabIndex

`Element.tabIndex`属性返回一个整数，表示当前元素在 Tab 键遍历时的顺序。该属性可读写。

`tabIndex`属性值如果是负值（通常是-1），则 Tab 键不会遍历到该元素。如果是正整数，则按照顺序，从小到大遍历。如果两个元素的`tabIndex`属性的正整数值相同，则按照出现的顺序遍历。遍历完所有`tabIndex`为正整数的元素以后，再遍历所有`tabIndex`等于0、或者属性值是非法值、或者没有`tabIndex`属性的元素，顺序为它们在网页中出现的顺序。

8).Element.title

`Element.title`属性用来读写当前元素的 HTML 属性`title`。该属性通常用来指定，鼠标悬浮时弹出的文字提示框。

##### 3.1.2 元素状态的相关属性

1).Element.hidden

`Element.hidden`属性返回一个布尔值，表示当前元素的`hidden`属性，用来控制当前元素是否可见。该属性可读写。

```javascript
var btn = document.getElementById('btn');
var mydiv = document.getElementById('mydiv');

btn.addEventListener('click', function () {
  mydiv.hidden = !mydiv.hidden;
}, false);
```

注意，该属性与 CSS 设置是互相独立的。CSS 对这个元素可见性的设置，`Element.hidden`并不能反映出来。也就是说，这个属性并不难用来判断当前元素的实际可见性。

CSS 的设置高于`Element.hidden`。如果 CSS 指定了该元素不可见（`display: none`）或可见（`display: hidden`），那么`Element.hidden`并不能改变该元素实际的可见性。换言之，这个属性只在 CSS 没有明确设定当前元素的可见性时才有效。

2).Element.contentEditable，Element.isContentEditable

HTML 元素可以设置`contentEditable`属性，使得元素的内容可以编辑。

`<div contenteditable>123</div>`

上面代码中，`<div>`元素有`contenteditable`属性，因此用户可以在网页上编辑这个区块的内容。

`Element.contentEditable`属性返回一个字符串，表示是否设置了`contenteditable`属性，有三种可能的值。该属性可写。

- --
- `"true"`：元素内容可编辑
- `"false"`：元素内容不可编辑
- `"inherit"`：元素是否可编辑，继承了父元素的设置
- --

`Element.isContentEditable`属性返回一个布尔值，同样表示是否设置了`contenteditable`属性。该属性只读。

##### 3.1.3 Element.attributes

`Element.attributes`属性返回一个类似数组的对象，成员是当前元素节点的所有属性节点。

```javascript
var p = document.querySelector('p');
var attrs = p.attributes;

for (var i = attrs.length - 1; i >= 0; i--) {
  console.log(attrs[i].name + '->' + attrs[i].value);
}
```

##### 3.1.4 Element.className，Element.classList

`className`属性用来读写当前元素节点的`class`属性。它的值是一个字符串，每个`class`之间用空格分割。

`classList`属性返回一个类似数组的对象，当前元素节点的每个`class`就是这个对象的一个成员。

```javascript
// HTML 代码 <div class="one two three" id="myDiv"></div>
var div = document.getElementById('myDiv');

div.className
// "one two three"

div.classList
// {
//   0: "one"
//   1: "two"
//   2: "three"
//   length: 3
// }
```

上面代码中，`className`属性返回一个空格分隔的字符串，而`classList`属性指向一个类似数组的对象，该对象的`length`属性（只读）返回当前元素的`class`数量。

`classList`对象有下列方法。

- --
- a.`add()`：增加一个 class。
- b.`remove()`：移除一个 class。
- c.`contains()`：检查当前元素是否包含某个 class。
- d.`toggle()`：将某个 class 移入或移出当前元素。
- e.`item()`：返回指定索引位置的 class。
- f.`toString()`：将 class 的列表转为字符串。
- --

```javascript
var div = document.getElementById('myDiv');

div.classList.add('myCssClass');
div.classList.add('foo', 'bar');
div.classList.remove('myCssClass');
div.classList.toggle('myCssClass'); // 如果 myCssClass 不存在就加入，否则移除
div.classList.contains('myCssClass'); // 返回 true 或者 false
div.classList.item(0); // 返回第一个 Class
div.classList.toString();
```

下面比较一下，`className`和`classList`在添加和删除某个 class 时的写法。

```javascript
var foo = document.getElementById('foo');

// 添加class
foo.className += 'bold';
foo.classList.add('bold');

// 删除class
foo.classList.remove('bold');
foo.className = foo.className.replace(/^bold$/, '');
```

`toggle`方法可以接受一个布尔值，作为第二个参数。如果为true，则添加该属性；如果为false，则去除该属性。

```javascript
el.classList.toggle('abc', boolValue);

// 等同于
if (boolValue) {
  el.classList.add('abc');
} else {
  el.classList.remove('abc');
}
```

##### 3.1.5 Element.dataset

网页元素可以自定义`data-`属性，用来添加数据。

`<div data-timestamp="1522907809292"></div>`

上面代码中，`<div>`元素有一个自定义的data-timestamp属性，用来为该元素添加一个时间戳。

`Element.dataset`属性返回一个对象，可以从这个对象读写`data-`属性。

```javascript
// <article
//   id="foo"
//   data-columns="3"
//   data-index-number="12314"
//   data-parent="cars">
//   ...
// </article>
var article = document.getElementById('foo');
foo.dataset.columns // "3"
foo.dataset.indexNumber // "12314"
foo.dataset.parent // "cars"
```

注意，`dataset`上面的各个属性返回都是字符串。

HTML 代码中，`data-`属性的属性名，只能包含英文字母、数字、连词线（`-`）、点（`.`）、冒号（`:`）和下划线（`_`）。它们转成 JavaScript 对应的`dataset`属性名，规则如下。

- --
- 开头的`data-`会省略。
- 如果连词线后面跟了一个英文字母，那么连词线会取消，该字母变成大写。
- 其他字符不变。
- --

因此，`data-abc-def`对应`dataset.abcDef`，`data-abc-1`对应`dataset["abc-1"]`。

除了使用`dataset`读写`data-`属性，也可以使用`Element.getAttribute()`和`Element.setAttribute()`，通过完整的属性名读写这些属性。

```javascript
var mydiv = document.getElementById('mydiv');

mydiv.dataset.foo = 'bar';
mydiv.getAttribute('data-foo') // "bar"
```

##### 3.1.6 Element.innerHTML

`Element.innerHTML`属性返回一个字符串，等同于该元素包含的所有 HTML 代码。该属性可读写，常用来设置某个节点的内容。它能改写所有元素节点的内容，包括`<HTML>`和`<body>`元素。

如果将`innerHTML`属性设为空，等于删除所有它包含的所有节点。

`el.innerHTML = '';`

上面代码等于将el节点变成了一个空节点，el原来包含的节点被全部删除。

注意，读取属性值的时候，如果文本节点包含`&`、小于号（`<`）和大于号（`>`），`innerHTML`属性会将它们转为实体形式`&amp;`、`&lt;`、`&gt;`。如果想得到原文，建议使用`element.textContent`属性。

```javascript
// HTML代码如下 <p id="para"> 5 > 3 </p>
document.getElementById('para').innerHTML
// 5 &gt; 3
```

写入的时候，如果插入的文本包含 HTML 标签，会被解析成为节点对象插入 DOM。注意，如果文本之中含有`<script>`标签，虽然可以生成`script`节点，但是插入的代码不会执行。

```javascript
var name = "<script>alert('haha')</script>";
el.innerHTML = name;
```

上面代码将脚本插入内容，脚本并不会执行。但是，`innerHTML`还是有安全风险的。

```javascript
var name = "<img src=x onerror=alert(1)>";
el.innerHTML = name;
```

上面代码中，`alert`方法是会执行的。因此为了安全考虑，如果插入的是文本，最好用`textContent`属性代替`innerHTML`。

##### 3.1.7 Element.outerHTML

`Element.outerHTML`属性返回一个字符串，表示当前元素节点的所有 HTML 代码，包括该元素本身和所有子元素。

```javascript
// HTML 代码如下
// <div id="d"><p>Hello</p></div>
var d = document.getElementById('d');
d.outerHTML
// '<div id="d"><p>Hello</p></div>'
```

`outerHTML`属性是可读写的，对它进行赋值，等于替换掉当前元素。

```javascript
// HTML 代码如下
// <div id="container"><div id="d">Hello</div></div>
var container = document.getElementById('container');
var d = document.getElementById('d');
container.firstChild.nodeName // "DIV"
d.nodeName // "DIV"

d.outerHTML = '<p>Hello</p>';
container.firstChild.nodeName // "P"
d.nodeName // "DIV"
```

上面代码中，变量d代表子节点，它的`outerHTML`属性重新赋值以后，内层的div元素就不存在了，被p元素替换了。但是，变量d依然指向原来的div元素，这表示被替换的DIV元素还存在于内存中。

注意，如果一个节点没有父节点，设置`outerHTML`属性会报错。

```javascript
var div = document.createElement('div');
div.outerHTML = '<p>test</p>';
// DOMException: This element has no parent node.
```

##### 3.1.8 Element.clientHeight，Element.clientWidth

`Element.clientHeight`属性返回一个整数值，表示元素节点的 CSS 高度（单位像素），只对块级元素生效，对于行内元素返回0。如果块级元素没有设置 CSS 高度，则返回实际高度。

除了元素本身的高度，它还包括`padding`部分，但是不包括`border`、`margin`。如果有水平滚动条，还要减去水平滚动条的高度。注意，这个值始终是整数，如果是小数会被四舍五入。

`Element.clientWidth`属性返回元素节点的 CSS 宽度，同样只对块级元素有效，也是只包括元素本身的宽度和`padding`，如果有垂直滚动条，还要减去垂直滚动条的宽度。

`document.documentElement`的`clientHeight`属性，返回当前视口的高度（即浏览器窗口的高度），等同于`window.innerHeight`属性减去水平滚动条的高度（如果有的话）。`document.body`的高度则是网页的实际高度。一般来说，`document.body.clientHeight`大于`document.documentElement.clientHeight`。

```javascript
// 视口高度
document.documentElement.clientHeight

// 网页总高度
document.body.clientHeight
```

##### 3.1.9 Element.clientLeft，Element.clientTop

`Element.clientLeft`属性等于元素节点左边框（left border）的宽度（单位像素），不包括左侧的`padding`和`margin`。如果没有设置左边框，或者是行内元素（`display: inline`），该属性返回0。该属性总是返回整数值，如果是小数，会四舍五入。

`Element.clientTop`属性等于网页元素顶部边框的宽度（单位像素），其他特点都与`clientTop`相同。

##### 3.1.10 Element.scrollHeight，Element.scrollWidth

`Element.scrollHeight`属性返回一个整数值（小数会四舍五入），表示当前元素的总高度（单位像素），包括溢出容器、当前不可见的部分。它包括`padding`，但是不包括`border`、`margin`以及水平滚动条的高度（如果有水平滚动条的话），还包括伪元素（`::before`或`::after`）的高度。

`Element.scrollWidth`属性表示当前元素的总宽度（单位像素），其他地方都与`scrollHeight`属性类似。这两个属性只读。

整张网页的总高度可以从`document.documentElement`或`document.body`上读取。

```javascript
// 返回网页的总高度
document.documentElement.scrollHeight
document.body.scrollHeight
```

注意，如果元素节点的内容出现溢出，即使溢出的内容是隐藏的，`scrollHeight`属性仍然返回元素的总高度。

```javascript
// HTML 代码如下
// <div id="myDiv" style="height: 200px; overflow: hidden;">...<div>
document.getElementById('myDiv').scrollHeight // 356
```

上面代码中，即使myDiv元素的 CSS 高度只有200像素，且溢出部分不可见，但是`scrollHeight`仍然会返回该元素的原始高度。

##### 3.1.11 Element.scrollLeft，Element.scrollTop

`Element.scrollLeft`属性表示当前元素的水平滚动条向右侧滚动的像素数量，`Element.scrollTop`属性表示当前元素的垂直滚动条向下滚动的像素数量。对于那些没有滚动条的网页元素，这两个属性总是等于0。

如果要查看整张网页的水平的和垂直的滚动距离，要从`document.documentElement`元素上读取。

```javascript
document.documentElement.scrollLeft
document.documentElement.scrollTop
```

这两个属性都可读写，设置该属性的值，会导致浏览器将当前元素自动滚动到相应的位置。

##### 3.1.12 Element.offsetParent

`Element.offsetParent`属性返回最靠近当前元素的、并且 CSS 的`position`属性不等于`static`的上层元素。

```javascript
<div style="position: absolute;">
  <p>
    <span>Hello</span>
  </p>
</div>
```

上面代码中，span元素的`offsetParent`属性就是div元素。

该属性主要用于确定子元素位置偏移的计算基准，`Element.offsetTop`和`Element.offsetLeft`就是`offsetParent`元素计算的。

如果该元素是不可见的（`display`属性为`none`），或者位置是固定的（`position`属性为`fixed`），则`offsetParent`属性返回`null`。

```javascript
<div style="position: absolute;">
  <p>
    <span style="display: none;">Hello</span>
  </p>
</div>
```

上面代码中，span元素的`offsetParent`属性是`null`。

如果某个元素的所有上层节点的`position`属性都是`static`，则`Element.offsetParent`属性指向`<body>`元素。

##### 3.1.13 Element.offsetHeight，Element.offsetWidth

`Element.offsetHeight`属性返回一个整数，表示元素的 CSS 垂直高度（单位像素），包括元素本身的高度、`padding` 和 `border`，以及垂直滚动条的高度（如果存在滚动条）。

`Element.offsetWidth`属性表示元素的 CSS 水平宽度（单位像素），其他都与`Element.offsetHeight`一致。

这两个属性都是只读属性，只比`Element.clientHeight`和`Element.clientWidth`多了边框的高度或宽度。如果元素的 CSS 设为不可见（比如`display: none;`），则返回0。

##### 3.1.14 Element.offsetLeft，Element.offsetTop

`Element.offsetLeft`返回当前元素左上角相对于`Element.offsetParent`节点的水平位移，`Element.offsetTop`返回垂直位移，单位为像素。通常，这两个值是指相对于父节点的位移。

下面的代码可以算出元素左上角相对于整张网页的坐标。

```javascript
function getElementPosition(e) {
  var x = 0;
  var y = 0;
  while (e !== null)  {
    x += e.offsetLeft;
    y += e.offsetTop;
    e = e.offsetParent;
  }
  return {x: x, y: y};
}
```

##### 3.1.15 Element.style

每个元素节点都有`style`用来读写该元素的行内样式信息。

##### 3.1.16 Element.children，Element.childElementCount

`Element.children`属性返回一个类似数组的对象（`HTMLCollection`实例），包括当前元素节点的所有子元素。如果当前元素没有子元素，则返回的对象包含零个成员。

```javascript
if (para.children.length) {
  var children = para.children;
    for (var i = 0; i < children.length; i++) {
      // ...
    }
}
```

这个属性与`Node.childNodes`属性的区别是，它只包括元素类型的子节点，不包括其他类型的子节点。

`Element.childElementCount`属性返回当前元素节点包含的子元素节点的个数，与`Element.children.length`的值相同。

##### 3.1.17 Element.firstElementChild，Element.lastElementChild

`Element.firstElementChild`属性返回当前元素的第一个元素子节点，`Element.lastElementChild`返回最后一个元素子节点。

如果没有元素子节点，这两个属性返回`null`。

##### 3.1.18 Element.nextElementSibling，Element.previousElementSibling

`Element.nextElementSibling`属性返回当前元素节点的后一个同级元素节点，如果没有则返回`null`。

```javascript
// HTML 代码如下
// <div id="div-01">Here is div-01</div>
// <div id="div-02">Here is div-02</div>
var el = document.getElementById('div-01');
el.nextElementSibling
// <div id="div-02">Here is div-02</div>
```

`Element.previousElementSibling`属性返回当前元素节点的前一个同级元素节点，如果没有则返回`null`。

#### 3.2.实例方法

##### 3.2.1 属性相关方法

以下方法用来操作当前节点的属性。

1).Element.getAttribute()

`Element.getAttribute`方法接受一个字符串作为参数，返回同名属性的值。如果没有该属性，则返回`null`。

```javascript
var mydiv = document.getElementById('mydiv');
var id = mydiv.getAttribute('id');
```

2).Element.getAttributeNames()

`Element.getAttributeNames()`返回一个数组，成员是当前元素的所有属性的名字。如果当前元素没有任何属性，则返回一个空数组。使用`Element.attributes`属性，也可以拿到同样的结果，唯一的区别是它返回的是类似数组的对象。

```javascript
var mydiv = document.getElementById('mydiv');

mydiv.getAttributeNames().forEach(function (key) {
  var value = mydiv.getAttribute(key);
  console.log(key, value);
})
```

3).Element.setAttribute()

`Element.setAttribute`方法用于为当前节点设置属性。如果属性已经存在，将更新属性值，否则将添加该属性。该方法没有返回值。

```javascript
// HTML 代码为
// <button>Hello World</button>
var b = document.querySelector('button');
b.setAttribute('name', 'myButton');
b.setAttribute('disabled', true);
```

上面代码中，button元素的name属性被设成myButton，`disabled`属性被设成true。

这里有两个地方需要注意，首先，属性值总是字符串，其他类型的值会自动转成字符串，比如布尔值true就会变成字符串true；其次，上例的`disable`属性是一个布尔属性，对于`<button>`元素来说，这个属性不需要属性值，只要设置了就总是会生效，因此`setAttribute`方法里面可以将`disabled`属性设成任意值。

4).Element.hasAttribute()

`Element.hasAttribute`方法返回一个布尔值，表示当前元素节点是否有指定的属性。

```javascript
var foo = document.getElementById('foo');
foo.hasAttribute('bar') // false
```

5).Element.hasAttributes()

`Element.hasAttributes`方法返回一个布尔值，表示当前元素是否有属性，如果没有任何属性，就返回false，否则返回true。

```javascript
var foo = document.getElementById('foo');
foo.hasAttributes() // true
```

6).Element.removeAttribute()

`Element.removeAttribute`方法移除指定属性。该方法没有返回值。

`document.getElementById('div1').removeAttribute('id')`

##### 3.2.2 Element.querySelector()

`Element.querySelector`方法接受 CSS 选择器作为参数，返回父元素的第一个匹配的子元素。如果没有找到匹配的子元素，就返回`null`。

```javascript
var content = document.getElementById('content');
var el = content.querySelector('p');
```

`Element.querySelector`方法可以接受任何复杂的 CSS 选择器。

`document.body.querySelector("style[type='text/css'], style:not([type])");`

注意，这个方法无法选中伪元素。

它可以接受多个选择器，它们之间使用逗号分隔。

`element.querySelector('div, p')`

上面代码返回element的第一个div或p子元素。

需要注意的是，浏览器执行`querySelector`方法时，是先在全局范围内搜索给定的 CSS 选择器，然后过滤出哪些属于当前元素的子元素。因此，会有一些违反直觉的结果，下面是一段 HTML 代码。

```javascript
<div>
<blockquote id="outer">
  <p>Hello</p>
  <div id="inner">
    <p>World</p>
  </div>
</blockquote>
</div>
```

那么，像下面这样查询的话，实际上返回的是第一个p元素，而不是第二个。

```javascript
var outer = document.getElementById('outer');
outer.querySelector('div p')
// <p>Hello</p>
```

##### 3.2.3 Element.querySelectorAll()

`Element.querySelectorAll`方法接受 CSS 选择器作为参数，返回一个`NodeList`实例，包含所有匹配的子元素。

```javascript
var el = document.querySelector('#test');
var matches = el.querySelectorAll('div.highlighted > p');
```

该方法的执行机制与`querySelector`方法相同，也是先在全局范围内查找，再过滤出当前元素的子元素。因此，选择器实际上针对整个文档的。

它也可以接受多个 CSS 选择器，它们之间使用逗号分隔。如果选择器里面有伪元素的选择器，则总是返回一个空的`NodeList`实例。

##### 3.2.4 Element.getElementsByClassName()

`Element.getElementsByClassName`方法返回一个`HTMLCollection`实例，成员是当前元素节点的所有具有指定 class 的子元素节点。该方法与`document.getElementsByClassName`方法的用法类似，只是搜索范围不是整个文档，而是当前元素节点。

`element.getElementsByClassName('red test');`

注意，该方法的参数大小写敏感。

由于`HTMLCollection`实例是一个活的集合，`document`对象的任何变化会立刻反应到实例，下面的代码不会生效。

```javascript
// HTML 代码如下
// <div id="example">
//   <p class="foo"></p>
//   <p class="foo"></p>
// </div>
var element = document.getElementById('example');
var matches = element.getElementsByClassName('foo');

for (var i = 0; i< matches.length; i++) {
  matches[i].classList.remove('foo');
  matches.item(i).classList.add('bar');
}
// 执行后，HTML 代码如下
// <div id="example">
//   <p></p>
//   <p class="foo bar"></p>
// </div>
```

上面代码中，matches集合的第一个成员，一旦被拿掉 class 里面的foo，就会立刻从matches里面消失，导致出现上面的结果。

##### 3.2.5 Element.getElementsByTagName()

`Element.getElementsByTagName`方法返回一个`HTMLCollection`实例，成员是当前节点的所有匹配指定标签名的子元素节点。该方法与`document.getElementsByClassName`方法的用法类似，只是搜索范围不是整个文档，而是当前元素节点。

```javascript
var table = document.getElementById('forecast-table');
var cells = table.getElementsByTagName('td');
```

注意，该方法的参数是大小写不敏感的。

##### 3.2.6 Element.closest()

`Element.closest`方法接受一个 CSS 选择器作为参数，返回匹配该选择器的、最接近当前节点的一个祖先节点（包括当前节点本身）。如果没有任何节点匹配 CSS 选择器，则返回`null`。

```javascript
// HTML 代码如下
// <article>
//   <div id="div-01">Here is div-01
//     <div id="div-02">Here is div-02
//       <div id="div-03">Here is div-03</div>
//     </div>
//   </div>
// </article>

var div03 = document.getElementById('div-03');

// div-03 最近的祖先节点
div03.closest("#div-02") // div-02
div03.closest("div div") // div-03
div03.closest("article > div") //div-01
div03.closest(":not(div)") // article
```

上面代码中，由于`closest`方法将当前节点也考虑在内，所以第二个`closest`方法返回div-03。

##### 3.2.7 Element.matches()

`Element.matches`方法返回一个布尔值，表示当前元素是否匹配给定的 CSS 选择器。

```javascript
if (el.matches('.someClass')) {
  console.log('Match!');
}
```

##### 3.2.8 事件相关方法

以下三个方法与`Element`节点的事件相关。这些方法都继承自`EventTarget`接口，详见相关章节。

- --
- `Element.addEventListener()`：添加事件的回调函数
- `Element.removeEventListener()`：移除事件监听函数
- `Element.dispatchEvent()`：触发事件
- --

```javascript
element.addEventListener('click', listener, false);
element.removeEventListener('click', listener, false);

var event = new Event('click');
element.dispatchEvent(event);
```

##### 3.2.9 Element.scrollIntoView()

`Element.scrollIntoView`方法滚动当前元素，进入浏览器的可见区域，类似于设置`window.location.hash`的效果。

```javascript
el.scrollIntoView(); // 等同于el.scrollIntoView(true)
el.scrollIntoView(false);
```

该方法可以接受一个布尔值作为参数。如果为true，表示元素的顶部与当前区域的可见部分的顶部对齐（前提是当前区域可滚动）；如果为false，表示元素的底部与当前区域的可见部分的尾部对齐（前提是当前区域可滚动）。如果没有提供该参数，默认为true。

##### 3.2.10 Element.getBoundingClientRect()

`Element.getBoundingClientRect`方法返回一个对象，提供当前元素节点的大小、位置等信息，基本上就是 CSS 盒状模型的所有信息。

`var rect = obj.getBoundingClientRect();`

上面代码中，`getBoundingClientRect`方法返回的rect对象，具有以下属性（全部为只读）。

- --
- `x`：元素左上角相对于视口的横坐标
- `y`：元素左上角相对于视口的纵坐标
- `height`：元素高度
- `width`：元素宽度
- `left`：元素左上角相对于视口的横坐标，与x属性相等
- `right`：元素右边界相对于视口的横坐标（等于`x + width`）
- `top`：元素顶部相对于视口的纵坐标，与y属性相等
- `bottom`：元素底部相对于视口的纵坐标（等于`y + height`）
- --

由于元素相对于**视口（viewport）**的位置，会随着页面滚动变化，因此表示位置的四个属性值，都不是固定不变的。如果想得到绝对位置，可以将`left`属性加上`window.scrollX`，`top`属性加上`window.scrollY`。

注意，`getBoundingClientRect`方法的所有属性，都把边框（`border`属性）算作元素的一部分。也就是说，都是从边框外缘的各个点来计算。因此，`width`和`height`包括了元素本身 + `padding` + `border`。

另外，上面的这些属性，都是继承自原型的属性，`Object.keys`会返回一个空数组，这一点也需要注意。

```javascript
var rect = document.body.getBoundingClientRect();
Object.keys(rect) // []
```

上面代码中，rect对象没有自身属性，而`Object.keys`方法只返回对象自身的属性，所以返回了一个空数组。

##### 3.2.11 Element.getClientRects()

`Element.getClientRects`方法返回一个类似数组的对象，里面是当前元素在页面上形成的所有矩形（所以方法名中的Rect用的是复数）。每个矩形都有`bottom`、`height`、`left`、`right`、`top`和`width`六个属性，表示它们相对于视口的四个坐标，以及本身的高度和宽度。

对于盒状元素（比如`<div>`和`<p>`），该方法返回的对象中只有该元素一个成员。对于行内元素（比如`<span>`、`<a>`、`<em>`），该方法返回的对象有多少个成员，取决于该元素在页面上占据多少行。这是它和`Element.getBoundingClientRect()`方法的主要区别，后者对于行内元素总是返回一个矩形。

```javascript
<span id="inline">
Hello World
Hello World
Hello World
</span>
```

上面代码是一个行内元素`<span>`，如果它在页面上占据三行，`getClientRects`方法返回的对象就有三个成员，如果它在页面上占据一行，`getClientRects`方法返回的对象就只有一个成员。

```javascript
var el = document.getElementById('inline');
el.getClientRects().length // 3
el.getClientRects()[0].left // 8
el.getClientRects()[0].right // 113.908203125
el.getClientRects()[0].bottom // 31.200000762939453
el.getClientRects()[0].height // 23.200000762939453
el.getClientRects()[0].width // 105.908203125
```

这个方法主要用于判断行内元素是否换行，以及行内元素的每一行的位置偏移。

##### 3.2.12 Element.insertAdjacentElement()

`Element.insertAdjacentElement`方法在相对于当前元素的指定位置，插入一个新的节点。该方法返回被插入的节点，如果插入失败，返回`null`。

`element.insertAdjacentElement(position, element);`

`Element.insertAdjacentElement`方法一共可以接受两个参数，第一个参数是一个字符串，表示插入的位置，第二个参数是将要插入的节点。第一个参数只可以取如下的值。

- --
- `beforebegin`：当前元素之前
- `afterbegin`：当前元素内部的第一个子节点前面
- `beforeend`：当前元素内部的最后一个子节点后面
- `afterend`：当前元素之后
- --

注意，`beforebegin`和`afterend`这两个值，只在当前节点有父节点时才会生效。如果当前节点是由脚本创建的，没有父节点，那么插入会失败。

```javascript
var p1 = document.createElement('p')
var p2 = document.createElement('p')
p1.insertAdjacentElement('afterend', p2) // null
```

如果插入的节点是一个文档里现有的节点，它会从原有位置删除，放置到新的位置。

##### 3.2.13 Element.insertAdjacentHTML()，Element.insertAdjacentText()

`Element.insertAdjacentHTML`方法用于将一个 HTML 字符串，解析生成 DOM 结构，插入相对于当前节点的指定位置。

`element.insertAdjacentHTML(position, text);`

该方法接受两个参数，第一个是一个表示指定位置的字符串，第二个是待解析的 HTML 字符串。第一个参数只能设置下面四个值之一。

- --
- beforebegin：当前元素之前
- afterbegin：当前元素内部的第一个子节点前面
- beforeend：当前元素内部的最后一个子节点后面
- afterend：当前元素之后
- --

```javascript
// HTML 代码：<div id="one">one</div>
var d1 = document.getElementById('one');
d1.insertAdjacentHTML('afterend', '<div id="two">two</div>');
// 执行后的 HTML 代码：
// <div id="one">one</div><div id="two">two</div>
```

该方法只是在现有的 DOM 结构里面插入节点，这使得它的执行速度比`innerHTML`方法快得多。

注意，该方法不会转义 HTML 字符串，这导致它不能用来插入用户输入的内容，否则会有安全风险。

`Element.insertAdjacentText`方法在相对于当前节点的指定位置，插入一个文本节点，用法与`Element.insertAdjacentHTML`方法完全一致。

```javascript
// HTML 代码：<div id="one">one</div>
var d1 = document.getElementById('one');
d1.insertAdjacentText('afterend', 'two');
// 执行后的 HTML 代码：
// <div id="one">one</div>two
```

##### 3.2.14 Element.remove()

`Element.remove`方法继承自 `ChildNode` 接口，用于将当前元素节点从它的父节点移除。

```javascript
var el = document.getElementById('mydiv');
el.remove();
```

##### 3.2.15 Element.focus()，Element.blur()

`Element.focus`方法用于将当前页面的焦点，转移到指定元素上。

`document.getElementById('my-span').focus();`

该方法可以接受一个对象作为参数。参数对象的`preventScroll`属性是一个布尔值，指定是否将当前元素停留在原始位置，而不是滚动到可见区域。

```javascript
function getFocus() {
  document.getElementById('btn').focus({preventScroll:false});
}
```

上面代码会让btn元素获得焦点，并滚动到可见区域。

最后，从`document.activeElement`属性可以得到当前获得焦点的元素。

`Element.blur`方法用于将焦点从当前元素移除。

##### 3.2.16 Element.click()

`Element.clic`k方法用于在当前元素上模拟一次鼠标点击，相当于触发了`click`事件。