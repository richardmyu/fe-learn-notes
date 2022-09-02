# document 对象

## 1.方法

### 1.1.`document.open/close`

`document.open` 方法清除当前文档所有内容，使得文档处于可写状态，供 `document.write` 方法写入内容（但是会添加到 `body` 的最后面）。

`document.close` 方法用来关闭 `document.open()` 打开的文档。

```js
document.open();
document.write('hello world');
document.close();
```

### 1.2.`document.write/writeln`

`document.write` 方法用于向当前文档写入内容。

在网页的首次渲染阶段，只要页面没有关闭写入（即没有执行 `document.close`），`document.write` 写入的内容就会追加在已有内容的后面。

> 注意，`document.write` 会当作 HTML 代码解析，不会转义。

```js
document.open();
document.write('<p>hello</p>');
document.write('<p>world</p>');
document.close();
```

如果页面已经解析完成（`DOMContentLoaded` 事件发生之后），再调用 `write` 方法，它会先调用 `open` 方法，擦除当前文档所有内容，然后再写入。

```js
document.addEventListener('DOMContentLoaded', function(event) {
  document.write('<p>Hello World!</p>');
});

// 等同于
document.addEventListener('DOMContentLoaded', function(event) {
  document.open();
  document.write('<p>Hello World!</p>');
  document.close();
});
```

如果在页面渲染过程中调用 `write` 方法，并不会自动调用 `open` 方法。（可以理解成，`open` 方法已调用，但 `close` 方法还未调用。）

```html
<html>
  <body>
    hello
    <script type="text/javascript">
      document.write('world')
    </script>
  </body>
</html>
```

在浏览器打开上面网页，将会显示 `hello world`。

`document.write` 是 JavaScript 语言标准化之前就存在的方法，现在完全有更符合标准的方法向文档写入内容（比如对 `innerHTML` 属性赋值）。所以，除了某些特殊情况，应该尽量避免使用 `document.write` 这个方法。

`document.writeln` 方法与 `write` 方法完全一致，除了会在输出内容的尾部添加换行符。

```js
document.write(1);
document.write(2);
// 12

document.writeln(1);
document.writeln(2);
// 1
// 2
//
```

> 注意，`writeln` 方法添加的是 `ASCII` 码的换行符，渲染成 HTML 网页时不起作用，即在网页上显示不出换行。网页上的换行，必须显式写入 `<br>`。

### 1.3.`document.querySelector/querySelectorAll`

`document.querySelector` 方法接受一个 CSS 选择器作为参数，返回匹配该选择器的元素节点。如果有多个节点满足匹配条件，则返回第一个匹配的节点。如果没有发现匹配的节点，则返回 `null`。

```js
var el1 = document.querySelector('.myclass');
var el2 = document.querySelector('#myParent > [ng-click]');
```

`document.querySelectorAll` 方法与 `querySelector` 用法类似，区别是返回一个 `NodeList` 对象，包含所有匹配给定选择器的节点。

这两个方法的参数，可以是逗号分隔的多个 CSS 选择器，返回匹配其中一个选择器的元素节点，这与 CSS 选择器的规则是一致的。

这两个方法都支持复杂的 CSS 选择器。

```js
// 选中 data-foo-bar 属性等于 someval 的元素
document.querySelectorAll('[data-foo-bar="someval"]');

// 选中 myForm 表单中所有不通过验证的元素
document.querySelectorAll('#myForm :invalid');

// 选中 div 元素，那些 class 含 ignore 的除外
document.querySelectorAll('DIV:not(.ignore)');

// 同时选中 div，a，script 三类元素
document.querySelectorAll('DIV, A, SCRIPT');
```

但是，它们不支持 CSS 伪元素的选择器（比如 `:first-line` 和 `:first-letter`）和伪类的选择器（比如 `:link` 和 `:visited`），即无法选中伪元素和伪类。

如果 `querySelectorAll` 方法的参数是字符串 `*`，则会返回文档中的所有元素节点。另外，`querySelectorAll` 的返回结果不是动态集合，不会实时反映元素节点的变化。

最后，这两个方法除了定义在 `document` 对象上，还定义在元素节点上，即在元素节点上也可以调用。

### 1.4.`document.getElementsByTagName`

`document.getElementsByTagName` 方法搜索 HTML 标签名，返回符合条件的元素。它的返回值是一个 `HTMLCollection` 实例，可以实时反映 HTML 文档的变化。如果没有任何匹配的元素，就返回一个空集。

```js
var p = document.getElementsByTagName('p');
p; // HTMLCollection []
```

HTML 标签名是大小写不敏感的，因此 `getElementsByTagName` 方法也是大小写不敏感的。另外，返回结果中，各个成员的顺序就是它们在文档中出现的顺序。

如果传入 `*`，就可以返回文档中所有 HTML 元素。

```js
var p = document.getElementsByTagName('*');
p; // HTMLCollection(12) [html,head,meta...]
```

注意，元素节点本身也定义了 `getElementsByTagName` 方法，返回该元素的后代元素中符合条件的元素。也就是说，这个方法不仅可以在 `document` 对象上调用，也可以在任何元素节点上调用。

### 1.5.`document.getElementsByClassName`

`document.getElementsByClassName` 方法也返回一个 `HTMLCollection` 实例，包括了所有 `class` 名字符合指定条件的元素，元素的变化实时反映在返回结果中。

由于 `class` 是保留字，所以 JavaScript 一律使用 `className` 表示 CSS 的 `class`。

参数可以是多个 `class`，它们之间使用空格分隔。

```js
var elements = document.getElementsByClassName('foo bar');
```

返回同时具有 `foo` 和 `bar` 两个 `class` 的元素，但 `foo` 和 `bar` 的顺序不重要。

> 注意，正常模式下，CSS 的 `class` 是大小写敏感的。（`quirks mode` 下，大小写不敏感。）

与 `getElementsByTagName` 方法一样，`getElementsByClassName` 方法不仅可以在 `document` 对象上调用，也可以在任何元素节点上调用。

### 1.6.`document.getElementsByName`

`document.getElementsByName` 方法用于选择拥有 `name` 属性的 HTML 元素（比如 `<form>`、`<radio>`、`<img>`、`<frame>`、`<embed>` 和 `<object>` 等），返回一个`NodeList` 实例，因为 `name` 属性相同的元素可能不止一个。

```js
// <form name="form"></form>
var forms = document.getElementsByName('form');
forms[0].tagName; // "FORM"
```

### 3.7.`document.getElementById`

`document.getElementById` 方法返回匹配指定 `id` 属性的元素节点。如果没有发现匹配的节点，则返回 `null`。

> 注意，该方法的参数是大小写敏感的。

`document.getElementById` 方法与 `document.querySelector` 方法都能获取元素节点，不同之处是 `document.querySelector` 方法的参数使用 CSS 选择器语法，`document.getElementById` 方法的参数是元素的 `id` 属性。

```js
document.getElementById('myElement');
document.querySelector('#myElement');
```

两个方法都能选中 `id` 为 myElement 的元素，但是 `document.getElementById` 比 `document.querySelector` 效率高得多。

另外，这个方法只能在 `document` 对象上使用，不能在其他元素节点上使用。

### 1.8.`document.elementFromPoint/elementsFromPoint`

`document.elementFromPoint` 方法返回位于页面指定位置最上层的元素节点。

```js
document.elementFromPoint(10, 10).nodeName; // INPUT
document.elementFromPoint(50, 50).nodeName; // BODY
document.elementFromPoint(100, 100).nodeName; // HTML
```

`elementFromPoint` 方法的两个参数，依次是相对于当前视口左上角的横坐标和纵坐标，单位是像素。如果位于该位置的 HTML 元素不可返回（比如文本框的滚动条），则返回它的父元素（比如文本框）。如果坐标值无意义（比如负值或超过视口大小），则返回 `null`。

`document.elementsFromPoint` 返回一个数组，成员是位于指定坐标（相对于视口）的所有元素。

```js
document.elementsFromPoint(12, 12);
// [input#inp, body, html]
```

> 边界线上，属于父元素

### 1.9.`document.caretPositionFromPoint`

`document.caretPositionFromPoint` 返回一个 `CaretPosition` 对象，包含了指定坐标点在节点对象内部的位置信息。`CaretPosition` 对象就是光标插入点的概念，用于确定光标点在文本对象内部的具体位置。

`var range = document.caretPositionFromPoint(clientX, clientY);`

上面代码中，`range` 是指定坐标点的 `CaretPosition` 对象。该对象有两个属性。

- `CaretPosition.offsetNode`：该位置的节点对象
- `CaretPosition.offset`：该位置在 `offsetNode` 对象内部，与起始位置相距的字符数。

### 1.10.`document.createElement`

`document.createElement` 方法用来生成元素节点，并返回该节点。

`createElement` 方法的参数为元素的标签名，即元素节点的 `tagName` 属性，对于 HTML 网页大小写不敏感，即参数为 `div` 或 `DIV` 返回的是同一种节点。如果参数里面包含尖括号（即 `<` 和 `>`）会报错。

```js
document.createElement('<div>');
// DOMException: The tag name provided ('<div>') is not a valid name
```

> 注意，`document.createElement` 的参数可以是自定义的标签名。

```js
let di = document.createElement('di');
di; // <di></di>
```

### 1.11.`document.createTextNode`

`document.createTextNode` 方法用来生成文本节点（Text 实例），并返回该节点。它的参数是文本节点的内容。

```js
var newDiv = document.createElement('div');
var newContent = document.createTextNode('Hello');
newDiv.appendChild(newContent);
```

这个方法可以确保返回的节点，被浏览器当作文本渲染，而不是当作 HTML 代码渲染。因此，可以用来展示用户的输入，避免 XSS 攻击。

```js
var div = document.createElement('div');
div.appendChild(document.createTextNode('<span>Foo & bar</span>'));
console.log(div.innerHTML);
// &lt;span&gt;Foo &amp; bar&lt;/span&gt;
```

`createTextNode` 方法对大于号和小于号进行转义，从而保证即使用户输入的内容包含恶意代码，也能正确显示。

需要注意的是，该方法不对单引号和双引号转义，所以不能用来对 HTML 属性赋值。

```js
function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

var userWebsite = '" onmouseover="alert(\'derp\')" "';
var profileLink = '<a href="' + escapeHtml(userWebsite) + '">Bob</a>';
var div = document.getElementById('target');
div.innerHTML = profileLink;
// <a href="" onmouseover="alert('derp')" "">Bob</a>
```

### 1.12.`document.createAttribute`

`document.createAttribute` 方法生成一个新的属性节点（`Attr` 实例），并返回它。

`document.createAttribute` 方法的参数 `name`，是属性的名称。

```js
var node = document.getElementById('div1');
var a = document.createAttribute('my_attrib');
a.value = 'newVal';
node.setAttributeNode(a);
// 或者
node.setAttribute('my_attrib', 'newVal');
```

### 1.13.`document.createComment`

`document.createComment` 方法生成一个新的注释节点，并返回该节点。

`document.createComment` 方法的参数是一个字符串，会成为注释节点的内容。

### 1.14.`document.createDocumentFragment`

`document.createDocumentFragment` 方法生成一个空的文档片段对象（`DocumentFragment` 实例）。

`DocumentFragment` 是一个存在于内存的 DOM 片段，不属于当前文档，常常用来生成一段较复杂的 DOM 结构，然后再插入当前文档。这样做的好处在于，因为 `DocumentFragment` 不属于当前文档，对它的任何改动，都不会引发网页的重新渲染，比直接修改当前文档的 DOM 有更好的性能表现。

### 1.15.`document.createEvent`

`document.createEvent` 方法生成一个事件对象（`Event` 实例），该对象可以被 `element.dispatchEvent` 方法使用，触发指定事件。

`document.createEvent` 方法的参数是事件类型，比如 `UIEvents`、`MouseEvents`、`MutationEvents`、`HTMLEvents`。

```js
var event = document.createEvent('Event');
event.initEvent('build', true, true);

document.addEventListener(
  'build',
  function(e) {
    console.log(e.type) // "build"
  },
  false
);

document.dispatchEvent(event);
```

### 1.16.`document.addEventListener/removeEventListener/dispatchEvent`

这三个方法用于处理 `document` 节点的事件，它们都继承自 `EventTarget` 接口。

```js
// 添加事件监听函数
document.addEventListener('click', listener, false);

// 移除事件监听函数
document.removeEventListener('click', listener, false);

// 触发事件
var event = new Event('click');
document.dispatchEvent(event);
```

### 1.17.`document.hasFocus`

`document.hasFocus` 方法返回一个布尔值，表示当前文档之中是否有元素被激活或获得焦点。

> 注意，有焦点的文档必定被 **激活**（active），反之不成立，激活的文档未必有焦点。比如，用户点击按钮，从当前窗口跳出一个新窗口，该新窗口就是激活的，但是不拥有焦点。

### 1.18.`document.adoptNode/importNode`

`document.adoptNode` 方法将某个节点及其子节点，从原来所在的文档或 `DocumentFragment` 里面移除，归属当前 `document` 对象，返回插入后的新节点。插入的节点对象的 `ownerDocument` 属性，会变成当前的 `document` 对象，而 `parentNode` 属性是 `null`。

```js
var node = document.adoptNode(externalNode);
document.appendChild(node);
```

注意，`document.adoptNode` 方法只是改变了节点的归属，并没有将这个节点插入新的文档树。所有，还要再用 `appendChild` 方法或 `insertBefore` 方法，将新节点插入当前文档树。

`document.importNode` 方法则是从原来所在的文档或 `DocumentFragment` 里面，拷贝某个节点及其子节点，让它们归属当前 `document` 对象。拷贝的节点对象的 `ownerDocument` 属性，会变成当前的 `document` 对象，而 `parentNode` 属性是 `null`。

`var node = document.importNode(externalNode, deep);`

`document.adoptNode` 方法的第一个参数是外部节点，第二个参数是一个布尔值，表示对外部节点是深拷贝还是浅拷贝，默认是浅拷贝（false）。虽然第二个参数是可选的，但是建议总是保留这个参数，并设为 true。

注意，`document.importNode` 方法只是拷贝外部节点，这时该节点的父节点是 `null`。下一步还必须将这个节点插入当前文档树。

```js
var iframe = document.getElementsByTagName('iframe')[0];
var oldNode = iframe.contentWindow.document.getElementById('myNode');
var newNode = document.importNode(oldNode, true);
document.getElementById('container').appendChild(newNode);
```

### 1.19.`document.createNodeIterator`

`document.createNodeIterator` 方法返回一个子节点遍历器。

```js
var nodeIterator = document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_ELEMENT
);
```

上面代码返回 `<body>` 元素子节点的遍历器。

`document.createNodeIterator` 方法第一个参数为所要遍历的根节点，第二个参数为所要遍历的节点类型，这里指定为元素节点（`NodeFilter.SHOW_ELEMENT`）。几种主要的节点类型写法如下。

- 所有节点：`NodeFilter.SHOW_ALL`
- 元素节点：`NodeFilter.SHOW_ELEMENT`
- 文本节点：`NodeFilter.SHOW_TEXT`
- 评论节点：`NodeFilter.SHOW_COMMENT`

`document.createNodeIterator` 方法返回一个“遍历器”对象（`NodeFilter` 实例）。该实例的 `nextNode` 方法和 `previousNode` 方法，可以用来遍历所有子节点。

```js
var nodeIterator = document.createNodeIterator(document.body);
var pars = [];
var currentNode;

while ((currentNode = nodeIterator.nextNode())) {
  pars.push(currentNode);
}
```

上面代码中，使用遍历器的 `nextNode` 方法，将根节点的所有子节点，依次读入一个数组。`nextNode` 方法先返回遍历器的内部指针所在的节点，然后会将指针移向下一个节点。所有成员遍历完成后，返回 `null`。`previousNode` 方法则是先将指针移向上一个节点，然后返回该节点。

```js
var nodeIterator = document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_ELEMENT
);
var currentNode = nodeIterator.nextNode();
var previousNode = nodeIterator.previousNode();

currentNode === previousNode; // true
```

上面代码中，`currentNode` 和 `previousNode` 都指向同一个的节点。

注意，遍历器返回的第一个节点，总是根节点。

`pars[0] === document.body // true`

### 1.20.`document.createTreeWalker`

`document.createTreeWalker` 方法返回一个 DOM 的子树遍历器。它与 `document.createNodeIterator` 方法基本是类似的，区别在于它返回的是 `TreeWalker` 实例，后者返回的是 `NodeIterator` 实例。另外，它的第一个节点不是根节点。

`document.createTreeWalker` 方法的第一个参数是所要遍历的根节点，第二个参数指定所要遍历的节点类型（与 `document.createNodeIterator` 方法的第二个参数相同）。

```js
var treeWalker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_ELEMENT
);
var nodeList = [];

while (treeWalker.nextNode()) {
  nodeList.push(treeWalker.currentNode);
}
```

### 1.21.`document.getSelection`

这个方法指向 `window.getSelection`。
