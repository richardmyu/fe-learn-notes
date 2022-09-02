# Node 对象

## 1.Node 接口的属性

所有 DOM 节点都继承了 `Node` 接口，拥有一些共同的属性和方法。这是 DOM 操作的基础。

```html
<!DOCTYPE html>
<html lang="en">
  <head></head>
  <body>
    <div id="app" class="container" data-node="哈哈哈哈">
      <!-- hjdshfs -->2434
    </div>
    <script>
      // to do something
    </script>
  </body>
</html>
```

### 1.1.`Node.prototype.nodeType`

`nodeType` 属性返回一个整数值，表示节点的类型。

```js
document.nodeType; // 9

var fChildren = document.childNodes;
fChildren[0].nodeType; // 10
fChildren[1].nodeType; // 1

var sChildren = fChildren[1].childNodes;
sChildren[0].nodeType; // 1
sChildren[1].nodeType; // 3
sChildren[2].nodeType; // 1

var app = document.getElementById('app');
app.nodeType; // 1
app.attributes[0].nodeType; // 2
app.childNodes[0].nodeType; // 3
app.childNodes[1].nodeType; // 8
app.childNodes[2].nodeType; // 3
```

Node 对象定义了几个常量，对应这些类型值。

`document.nodeType === Node.DOCUMENT_NODE // true`

不同节点的 `nodeType` 属性值和对应的常量如下。

| node                             | nodeType | const                         |
| -------------------------------- | :------: | ----------------------------- |
| 元素节点（element）              |    1     | `Node.ELEMENT_NODE`           |
| 属性节点（attr）                 |    2     | `Node.ATTRIBUTE_NODE`         |
| 文本节点（text）                 |    3     | `Node.TEXT_NODE`              |
| 注释节点（Comment）              |    8     | `Node.COMMENT_NODE`           |
| 文档节点（document）             |    9     | `Node.DOCUMENT_NODE`          |
| 文档片断节点（DocumentFragment） |    10    | `Node.DOCUMENT_FRAGMENT_NODE` |
| 文档类型节点（DocumentType）     |    11    | `Node.DOCUMENT_TYPE_NODE`     |

确定节点类型时，使用 `nodeType` 属性是常用方法。

```js
var node = document.documentElement.firstChild;

if (node.nodeType !== Node.ELEMENT_NODE) {
  console.log('该节点是元素节点');
}
```

### 1.2.`Node.prototype.nodeName`

`nodeName` 属性返回节点的名称。

```js
nodeNamedocument.nodeName; // #document

var fChildren = document.childNodes;
nodeNamefChildren[0].nodeName; // html
nodeNamefChildren[1].nodeName; // HTML

var sChildren = fChildren[1].childNodes;
nodeNamesChildren[0].nodeName; // HEAD
nodeNamesChildren[1].nodeName; // #text
nodeNamesChildren[2].nodeName; // BODY

var app = document.getElementById('app');
app.nodeName; // DIV
app.attributes[0].nodeName; // id
app.childNodes[0].nodeName; // #text
app.childNodes[1].nodeName; // #comment
app.childNodes[2].nodeName; // #text
```

不同节点的 `nodeName` 属性值如下。

- 文档节点（document）：`#document`
- 元素节点（element）：大写的标签名
- 属性节点（attr）：属性的名称
- 文本节点（text）：`#text`
- 文档片断节点（DocumentFragment）：`#document-fragment`
- 文档类型节点（DocumentType）：文档的类型
- 注释节点（Comment）：`#comment`

### 1.3.`Node.prototype.nodeValue`

`nodeValue` 属性返回一个字符串，表示当前节点本身的文本值，该属性可读写。

只有文本节点（text）和注释节点（comment）有文本值，因此这两类节点的 `nodeValue` 可以返回结果，其他类型的节点一律返回 `null`。同样的，也只有这两类节点可以设置 `nodeValue` 属性的值，其他类型的节点设置无效。

```js
var app = document.getElementById('app');
app.nodeValue; // null
app.attributes[0].nodeValue; // app
app.childNodes[0].nodeValue; // ''
app.childNodes[1].nodeValue; // hjdshfs
app.childNodes[2].nodeValue; // 2434

app.childNodes[2].nodeValue = 1234;
app.childNodes[2].nodeValue; // 1234
```

### 1.4.`Node.prototype.textContent`

`textContent` 属性返回当前节点和它的所有后代节点的文本内容。

```js
nodeTypedocument.textContent; // null

var fChildren = document.childNodes;
nodeTypefChildren[0].textContent; // null
nodeTypefChildren[1].textContent; // dom...

var sChildren = fChildren[1].childNodes;
nodeTypesChildren[0].textContent; // dom
nodeTypesChildren[1].textContent; // ''
nodeTypesChildren[2].textContent; // 2434...

var app = document.getElementById('app');
nodeTypeapp.textContent; // 2434
nodeTypeapp.attributes[0].textContent; // app
nodeTypeapp.childNodes[0].textContent; // ''
nodeTypeapp.childNodes[1].textContent; // hjdsfs
nodeTypeapp.childNodes[2].textContent; // 2434
```

> `textContent` 属性自动忽略当前节点内部的 HTML 标签，返回所有文本内容。

该属性是可读写的，设置该属性的值，会用一个新的文本节点，替换所有原来的子节点。它还有一个好处，就是自动对 HTML 标签转义（即会将标签解释为文本，而不会当作标签处理）。这很适合用于用户提供的内容。

```js
app.textContent = `<p>咳咳咳</p>`;
app.textContent; // <p>咳咳咳</p>
```

对于文本节点（text）和注释节点（comment），`textContent` 属性的值与 `nodeValue` 属性相同。对于其他类型的节点，该属性会将每个子节点的内容连接在一起返回，但是不包括注释节点。如果一个节点没有子节点，则返回空字符串。

文档节点（document）和文档类型节点（doctype）的 `textContent` 属性为 `null`。如果要读取整个文档的内容，可以使用 `document.documentElement.textContent`。

```js
document.documentElement === document.lastElementChild;
// true

// document.documentElement === <html>...</html> ???

document.documentElement === document.getElementsByTagName('html')[0];
// true
```

### 1.5.`Node.prototype.baseURI`

`baseURI` 属性返回一个字符串，表示当前网页的绝对路径。浏览器根据这个属性，计算网页上的相对路径的 URL。该属性为只读。

```js
// 当前网页的网址为
// http://www.example.com/index.html

document.baseURI;
// "http://www.example.com/index.html"
```

如果无法读到网页的 URL，`baseURI` 属性返回 `null`。

该属性的值一般由当前网址的 URL（即 `window.location` 属性）决定，但是可以使用 HTML 的 `<base>` 标签，改变该属性的值。

`<base href="http://www.example.com/page.html">`

设置了以后，`baseURI` 属性就返回 `<base>` 标签设置的值。

```js
document.baseURI
// "http://www.example.com/page.html"
```

### 1.6.`Node.prototype.ownerDocument`

`Node.ownerDocument` 属性返回当前节点所在的顶层文档对象，即 `document` 对象。

```js
var p1 = app.ownerDocument;
var p2 = app.lastChild.ownerDocument;
p1 === document; // true
p1 === p2; // true

document.ownerDocument; // null
sChildren[0].ownerDocument === document; // true
```

### 1.7.`Node.prototype.nextSibling`

`Node.nextSibling` 属性返回紧跟在当前节点后面的第一个同级节点。如果当前节点后面没有同级节点，则返回 `null`。

```js
sChildren[1].nextSibling === sChildren[2];
// true

sChildren[2].nextSibling; // null

app.nextSibling; // #text
```

> 注意，该属性还包括文本节点和评论节点。因此如果当前节点后面有空格，该属性会返回一个文本节点，内容为空格。

`nextSibling` 属性可以用来遍历所有子节点。

```js
var el = fChildren[1].firstChild;

while (el !== null) {
  console.log(el.nodeName);
  el = el.nextSibling;
}

// HEAD
// #text
// BODY
```

### 1.8.`Node.prototype.previousSibling`

`previousSibling` 属性返回当前节点前面的、距离最近的一个同级节点。如果当前节点前面没有同级节点，则返回 `null`。

> 注意，该属性还包括文本节点和评论节点。因此如果当前节点前面有空格，该属性会返回一个文本节点，内容为空格。

基本同 `nextSibling` 一致。

### 1.9.`Node.prototype.parentNode`

`parentNode` 属性返回当前节点的父节点。对于一个节点来说，它的父节点只可能是三种类型：元素节点（element）、文档节点（document）和文档片段节点（documentfragment）。

```js
fChildren[1].parentNode.nodeName; // #document
sChildren[1].parentNode.nodeName; // HTML
app.parentNode.nodeName; //BODY
document.parentNode; // null
```

文档节点（document）和文档片段节点（documentfragment）的父节点都是 `null`。另外，对于那些生成后还没插入 DOM 树的节点，父节点也是 `null`。

### 1.10.`Node.prototype.parentElement`

`parentElement` 属性返回当前节点的父元素节点。如果当前节点没有父节点，或者父节点类型不是元素节点，则返回 `null`。

```js
fChildren[1].parentNode.parentElement; // null
sChildren[1].parentNode.parentElement; // HTML
app.parentNode.parentElement; //BODY
document.parentElement; // null
```

由于父节点只可能是三种类型：元素节点、文档节点（document）和文档片段节点（documentfragment）。`parentElement` 属性相当于把后两种父节点都排除了。

### 1.11.`Node.prototype.firstChild/lastChild`

`firstChild` 属性返回当前节点的第一个子节点（注意是节点，不是元素节点），如果当前节点没有子节点，则返回 `null`。

`lastChild` 属性返回当前节点的最后一个子节点，如果当前节点没有子节点，则返回 `null`。用法与 `firstChild` 属性相同。

### 1.12.`Node.prototype.childNodes`

`childNodes` 属性返回一个类似数组的对象（`NodeList` 集合），成员包括当前节点的所有子节点。

```js
var fChildren = document.childNodes;
typeof fChildren; // object

ary.map(item => {
  console.log(item.nodeName);
})
// html
// HTML
```

如果当前节点不包括任何子节点，则返回一个空的 `NodeList` 集合。由于 `NodeList` 对象是一个动态集合，一旦子节点发生变化，立刻会反映在返回结果之中。

```js
var app = document.getElementById('app');
app.childNodes;
// NodeList(3) [text, comment, text]

var div = document.createElement('div');
div.className = 'box';
div.innerHTML = `<p>卡的健康</p>`;
app.appendChild(div);
app.childNodes;
// NodeList(4) [text, comment, text, div.box]
```

### 1.13.`Node.prototype.isConnected`

`isConnected` 属性返回一个布尔值，表示当前节点是否在文档之中。

```js
var div = document.createElement('div');
div.isConnected; // false

app.appendChild(div);
div.isConnected; // true
```

上面代码中，`test` 节点是脚本生成的节点，没有插入文档之前，`isConnected` 属性返回 `false`，插入之后返回 `true`。
