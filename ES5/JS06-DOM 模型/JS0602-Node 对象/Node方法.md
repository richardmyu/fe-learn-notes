# Node 对象

## 2.Node 接口的方法

### 2.1 Node.prototype.appendChild()

`appendChild` 方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点。该方法的返回值就是插入文档的子节点。

```js
let app = document.getElementById('app')
let div = document.createElement('div')
app.appendChild(div)
```

如果参数节点是 DOM 已经存在的节点，`appendChild` 方法会将其从原来的位置，移动到新位置。

```js
// <div id="app" class="container" data-node="哈哈哈哈">
//   <div class="item item--first">1234</div>
//   <div class="item item--last">2341</div>
// </div>

let app = document.getElementById('app')
let item = app.getElementsByClassName('item')[0]
app.appendChild(item)

// <div id="app" class="container" data-node="哈哈哈哈">
//   <div class="item item--last">2341</div>
//   <div class="item item--first">1234</div>
// </div>
```

如果 `appendChild` 方法的参数是 `DocumentFragment` 节点，那么插入的是 `DocumentFragment` 的所有子节点，而不是 `DocumentFragment` 节点本身。返回值是一个空的 `DocumentFragment` 节点。

### 2.2 Node.prototype.hasChildNodes()

`hasChildNodes` 方法返回一个布尔值，表示当前节点是否有子节点。

```js
let app = document.getElementById('app')
app.hasChildNodes // ture
```

注意，子节点包括所有节点，哪怕节点只包含一个空格，`hasChildNodes` 方法也会返回 true。

判断一个节点有没有子节点，有许多种方法，下面是其中的三种。

- `node.hasChildNodes()`
  >
- `node.firstChild !== null`
  >
- `node.childNodes && node.childNodes.length > 0`

`hasChildNodes` 方法结合 `firstChild` 属性和 `nextSibling` 属性，可以遍历当前节点的所有后代节点。

```js
function DOMComb(parent, callback) {
  if (parent.hasChildNodes()) {
    for (var node = parent.firstChild; node; node = node.nextSibling) {
      DOMComb(node, callback)
    }
  }
  callback(parent)
}

// 用法
DOMComb(document.body, console.log)
```

### 2.3 Node.prototype.cloneNode()

`cloneNode` 方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点。它的返回值是一个克隆出来的新节点。

```js
let app = document.getElementById('app')
let simpClone = app.cloneNode()
simpClone // <div id="app"></div>
simpClone.childNodes // NodeList []

let deepClone = app.cloneNode(true)
deepClone // <div id="app">...</div>
deepClone.childNodes
// NodeList(5) [text, div.item.item--first, text, div.item.item--last, text]
```

该方法有一些使用注意点。

---

1). 克隆一个节点，会拷贝该节点的所有属性，但是会丧失 `addEventListener` 方法和 `on-` 属性（即 `node.onclick = fn`），添加在这个节点上的事件回调函数。（补：在标签上直接绑定的函数，会被当作属性节点而得以复制）

- **通过 node.onclick 绑定函数**

```js
let app = document.getElementById('app')
app.onclick = function() {
  console.log('onclick')
}
app
// div#app.container
//   ...
//   onlick: f()

let simpClone = app.cloneNode()
simpClone.id = 'appSimp'
simpClone
// div#appSimp.container
//   ...
//   onlick: null

let deepClone = app.cloneNode(true)
deepClone.id = 'appDeep'
deepClone
// div#appDeep.container
//   ...
//   onlick: null
```

- **通过 `addEventListener` 绑定函数**

```js
app.addEventListener('click', function() {
  console.log('add')
})
// app 可以触发点击事件

simpClone.textContent = 'simp'
document.body.appendChild(simpClone)
// simpClone 没有触发

deepClone.textContent = 'deep'
document.body.appendChild(deepClone)
// deepClone 也没有触发
```

- **在 node 上直接绑定函数**

```js
app
// div#app.container
//   attributes:
//     0: id
//     1: class
//     2: data-node
//     3: onclick

simpClone
// div#simpClone.container
//   attributes:
//     0: id
//     1: class
//     2: data-node
//     3: onclick

deepClone
// div#deepClone.container
//   attributes:
//     0: id
//     1: class
//     2: data-node
//     3: onclick

// 点击均可以触发函数
```

---

2). 该方法返回的节点不在文档之中，即没有任何父节点，必须使用诸如 `Node.appendChild` 这样的方法添加到文档之中。

```js
simpClone.parentNode // null
deepClone.parentNode // null
```

---

3). 克隆一个节点之后，DOM 有可能出现两个有相同 `id` 属性（即 `id="xxx"`）的网页元素，这时应该修改其中一个元素的 `id` 属性。如果原节点有 name 属性，可能也需要修改。

---

### 2.4 Node.prototype.insertBefore()

`insertBefore` 方法用于将某个节点插入父节点内部的指定位置。

`let insertedNode = parentNode.insertBefore(newNode, referenceNode);`

`insertBefore` 方法接受两个参数，第一个参数是所要插入的节点 `newNode`，第二个参数是父节点 `parentNode` 内部的一个子节点 `referenceNode`。`newNode` 将插在 `referenceNode` 这个子节点的前面。返回值是插入的新节点 `newNode`。

```js
let app = document.getElementById('app')
let div = document.createElement('div')
div.textContent = '我是新来的'
let newNode = app.insertBefore(div, app.firstElementChild)
newNode // <div>我是新来的</div>

newNode.nextElementSibling === app.children[1] // true
```

如果 `insertBefore` 方法的第二个参数为 `null`，则新节点将插在当前节点内部的最后位置，即变成最后一个子节点。

```js
// 显式传递 null
let newNode = app.insertBefore(div, null)
newNode === app.lastElementChild // true

// 没有子节点（隐式 null）
app.textContent = ''
let newNode = app.insertBefore(div, app.firstChild)
newNode === app.firstChild // true
newNode === app.lastChild // true
```

注意，如果所要插入的节点是当前 DOM 现有的节点，则该节点将从原有的位置移除，插入新的位置。

```js
app.insertBefore(app.lastElementChild, app.firstChild)
app.childNodes
// NodeList(5)[...]
//   0: div.item.item--last
//   1: text
//   2: div.item.item--first
//   3: text
//   4: text
```

由于不存在 `insertAfter` 方法，如果新节点要插在父节点的某个子节点后面，可以用 `insertBefore` 方法结合 `nextSibling` 属性模拟。

```js
let div = document.createElement('div')
div.textContent = '新来的'
app.insertBefore(div, app.firstChild.nextSibling)
app.childNodes
// NodeList(6)[...]
//   0: text
//   1: div
//   2: div.item.item--first
//   3: text
//   4: div.item.item--last
//   5: text

// 如果 node.nextSibling 为 null 呢 -- 添加到最后
// 这种情况等价于 parentNode.appendChild(newNode)
app.insertBefore(div, app.lastChild.nextSibling)
app.childNodes
// NodeList(6)[...]
//   0: text
//   1: div.item.item--first
//   2: text
//   3: div.item.item--last
//   4: text
//   5: div
```

如果要插入的节点是 `DocumentFragment` 类型，那么插入的将是 `DocumentFragment` 的所有子节点，而不是 `DocumentFragment` 节点本身。返回值将是一个空的 `DocumentFragment` 节点。

### 2.5 Node.prototype.removeChild()

`removeChild` 方法接受一个子节点作为参数，用于从当前节点移除该子节点。返回值是移除的子节点。

```js
let app = document.getElementById('app')
// 直接从父节点上移除
app.removeChild(app.lastElementChild)
// 在子节点找到父节点，再移除自身
app.parentNode.removeChild(app)
```

被移除的节点依然存在于内存之中，但不再是 DOM 的一部分。所以，一个节点移除以后，依然可以使用它，比如插入到另一个节点下面。

如果参数节点不是当前节点的子节点，`removeChild` 方法将报错。

```js
let removeNode = app.removeChild(app.lastElementChild)
removeNode // <div class="item item--last">2341</div>
removeNode.parentNode // null

app.removeChild(document.body.lastElementChild)
// Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.
```

### 2.6 Node.prototype.replaceChild()

`replaceChild` 方法用于将一个新的节点，替换当前节点的某一个子节点。

`let replacedNode = parentNode.replaceChild(newChild, oldChild);`

上面代码中，`replaceChild` 方法接受两个参数，第一个参数 `newChild` 是用来替换的新节点，第二个参数 `oldChild` 是将要替换走的子节点。返回值是替换走的那个节点 `oldChild`。

```js
let app = document.getElementById('app')
let div = document.createElement('div')
div.textContent = '还是新来的'
app.replaceChild(div, app.lastElementChild)
app.childNodes
// NodeList(5)[...]
//   0: text
//   1: div.item.item--first
//   2: text
//   3: div
//   4: text
```

如果新节点是已经存在的节点，那么新节点会从原来的位置移到被替换的节点处：

```js
app.replaceChild(app.firstElementChild, app.lastElementChild)
app.childNodes
// NodeList(4)[...]
//   0: text
//   1: text
//   2: div.item.item--first
//   3: text
```

### 2.7 Node.prototype.contains()

`contains` 方法返回一个布尔值，表示参数节点是否满足以下三个条件之一。

- 参数节点为当前节点。
- 参数节点为当前节点的子节点。
- 参数节点为当前节点的后代节点。

```js
let app = document.getElementById('app')
// 后代节点
document.contains(app) // true

// 子节点
document.body.contains(app) // true

// 当前节点
app.contains(app) // true
```

### 2.8 Node.prototype.compareDocumentPosition()

`compareDocumentPosition` 方法的用法，与 `contains` 方法完全一致，返回一个七个比特位的二进制值，表示参数节点与当前节点的关系。

| 二进制值 | 十进制值 | 含义                     |
| -------- | :------: | ------------------------ |
| 000000   |    0     | 两个节点相同             |
| 000001   |    1     | 两个节点不在同一个文档   |
| 000010   |    2     | 参数节点在当前节点的前面 |
| 000100   |    4     | 参数节点在当前节点的后面 |
| 001000   |    8     | 参数节点包含当前节点     |
| 010000   |    16    | 当前节点包含参数节点     |
| 100000   |    32    | 浏览器内部使用           |

```js
let app = document.getElementById('app')
let div = document.createElement('div')
document.compareDocumentPosition(app) // 20
document.body.compareDocumentPosition(app) // 20
app.compareDocumentPosition(app) // 0
app.compareDocumentPosition(div) // 37 ???
```

由于 `compareDocumentPosition` 返回值的含义，定义在每一个比特位上，所以如果要检查某一种特定的含义，就需要使用比特位运算符。

```js
let head = document.head
let body = document.body
if (head.compareDocumentPosition(body) === 4) {
  console.log('文档结构正确')
} else {
  console.log('<body> 不能在 <head> 前面')
}
```

### 2.9 Node.prototype.isEqualNode/isSameNode()

`isEqualNode` 方法返回一个布尔值，用于检查两个节点是否相等。所谓相等的节点，指的是两个节点的 类型相同、属性相同、子节点 相同。

```js
let p1 = document.createElement('p')
let p2 = document.createElement('p')
p1.isEqualNode(p2) // true

let app = document.getElementById('app')
app.isEqualNode(app) // true

let simpNode = app.cloneNode()
let deepnNode = app.cloneNode(true)
app.isEqualNode(simpNode) // false
app.isEqualNode(deepnNode) // true
```

`isSameNode` 方法返回一个布尔值，表示两个节点是否为同一个节点。

```js
let p1 = document.createElement('p')
let p2 = document.createElement('p')

p1.isSameNode(p2) // false
p1.isSameNode(p1) // true

let app = document.getElementById('app')
app.isSameNode(app) // true

let simpNode = app.cloneNode()
let deepnNode = app.cloneNode(true)
app.isSameNode(simpNode) // false
app.isSameNode(deepnNode) // false
```

可以看出，`isSameNode` 方法比 `isEqualNode` 方法更严格。

### 2.10 Node.prototype.normalize()

`normailize` 方法用于清理当前节点内部的所有文本节点（text）。它会去除空的文本节点，并且将毗邻的文本节点合并成一个，也就是说不存在空的文本节点，以及毗邻的文本节点。

```js
// 清除空文本节点
let app = document.getElementById('app')
let text = app.childNodes[2]
text.textContent = ''
app.childNodes
// NodeList(5)
//   0: text
//   1: div.item.item--first
//   2: text
//   3: div.item.item--last
//   4: text

app.normalize()
app.childNodes
// NodeList(4)
//   0: text
//   1: div.item.item--first
//   2: div.item.item--last
//   3: text

// 合并毗邻的文本节点
let app = document.getElementById('app')
let text = document.createTextNode('pp')
app.appendChild(text)
app.childNodes
// NodeList(6)
//   0: text
//   1: div.item.item--first
//   2: text
//   3: div.item.item--last
//   4: text
//   5: text

app.normalize()
app.childNodes
// NodeList(5)
//   0: text
//   1: div.item.item--first
//   2: text
//   3: div.item.item--last
//   4: text
```

> 该方法是 `Text.splitText` 的逆方法。

### 2.11 Node.prototype.getRootNode()

`getRootNode()` 方法返回当前节点所在文档的根节点 document，与 `ownerDocument` 属性的作用相同。

```js
let app = document.getElementById('app')
app.getRootNode() === document // true
app.getRootNode() === app.ownerDocument // true
```

该方法可用于 `document` 节点自身，这一点与 `document.ownerDocument` 不同。

```js
document.getRootNode() // #document
document.ownerDocument // null
```
