# DocumentFragment

DocumentFragment，文档片段接口，表示一个没有父级文件的最小文档对象。它被作为一个轻量版的 `Document` 使用，用于存储已排好版的或尚未打理好格式的 XML 片段。最大的区别是因为 DocumentFragment 不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的重新渲染（reflow），且不会导致性能等问题。

> 因为文档片段存在于内存中，并不在 DOM 树中，所以将子元素插入到文档片段时不会引起页面回流（对元素位置和几何上的计算）。因此，使用文档片段通常会带来更好的性能。

最常用的方法是使用文档片段作为参数（例如，任何 Node 接口类似 `Node.appendChild` 和 `Node.insertBefore` 的方法），这种情况下被添加（append）或被插入（inserted）的是片段的所有子节点，而非片段本身。

因为所有的节点会被一次插入到文档中，而这个操作仅发生一个重渲染的操作，而不是每个节点分别被插入到文档中，因为后者会发生多次重渲染的操作。

## 1. 属性

该接口没有特殊的属性，其属性都继承自 Node ，并补充了 `ParentNode` 接口中的属性。

### 1.1. `ParentNode.children` [readonly]

返回一个实时（live） `HTMLCollection` ，包含所有属于 DocumentFragment 的元素类型的子对象。

### 1.2.`ParentNode.firstElementChild` [readonly]

返回 DocumentFragment 的第一个 `Element` 类型的子对象，如果没有则返回 `null`。

### 1.3.`ParentNode.lastElementChild` [readonly]

返回 DocumentFragment 的最后一个 `Element` 类型的子对象，如果没有则返回 `null`。

### 1.4.`ParentNode.childElementCount` [readonly]

返回给出 DocumentFragment 具有的 `Element` 类型的子对象的数量。

```js
const fruits = ['Apple', 'Orange', 'Banana', 'Melon']
const fragment = new DocumentFragment()
fruits.forEach(fruit => {
  const p = document.createElement('p')
  p.textContent = fruit
  fragment.appendChild(p)
})

fragment.children // HTMLCollection(4) [p, p, p, p]
fragment.firstElementChild // <p>Apple</p>
fragment.lastElementChild // <p>Melon</p>
fragment.childElementCount // 4
```

## 2. 构造函数

### 2.1.`DocumentFragment` [non-normative]

返回一个空的 DocumentFragment 对象。

```js
const fragment = new DocumentFragment()
fragment // #document-fragment

// 关于 DocumentFragment
 /*
  * #document-fragment
  *   baseURI: "http://www.example.com/page.html"
  *   childElementCount: 0
  *   childNodes: NodeList []
  *   children: HTMLCollection []
  *   firstChild: null
  *   firstElementChild: null
  *   isConnected: false
  *   lastChild: null
  *   lastElementChild: null
  *   nextSibling: null
  *   nodeName: "#document-fragment"
  *   nodeType: 11
  *   nodeValue: null
  *   ownerDocument: document
  *   parentElement: null
  *   parentNode: null
  *   previousSibling: null
  *   textContent: ""
  *   __proto__: DocumentFragment
  *     append: ƒ append()
  *     baseURI: (...)
  *     childElementCount: (...)
  *     childNodes: (...)
  *     children: (...)
  *     firstChild: (...)
  *     firstElementChild: (...)
  *     getElementById: ƒ getElementById()
  *     isConnected: (...)
  *     lastChild: (...)
  *     lastElementChild: (...)
  *     nextSibling: (...)
  *     nodeName: (...)
  *     nodeType: (...)
  *     nodeValue: (...)
  *     ownerDocument: (...)
  *     parentElement: (...)
  *     parentNode: (...)
  *     prepend: ƒ prepend()
  *     previousSibling: (...)
  *     querySelector: ƒ querySelector()
  *     querySelectorAll: ƒ querySelectorAll()
  *     textContent: (...)
  *     Symbol(Symbol.unscopables): {append: true, prepend: true}
  */
```

### 2.2.`Document.createDocumentFragment`

创建一个新的空白的 **文档片段** ( DocumentFragment)。

```html
<div id="app" class="container" data-node="哈哈哈哈">
  <div class="item item--first">1234</div>
  <div class="item item--last">2341</div>
</div>
<ul id="list"></ul>
```

```js
const list = document.querySelector('#list')
const fruits = ['Apple', 'Orange', 'Banana', 'Melon']

const fragment = document.createDocumentFragment()

fruits.forEach(fruit => {
  const li = document.createElement('li')
  li.textContent = fruit
  fragment.appendChild(li)
})

// 将 DocumentFragment 挂在到真实 DOM 上
list.appendChild(fragment)
fragment // #document-fragment
fragment.children // HTMLCollection[]

// 将一个真实 DOM 挂在在 DocumentFragment
fragment.appendChild(item)
fragment // HTMLCollection [div.item.item--first]
app
// HTMLCollection(5) [div.item.item--last, p.item-p, p.item-p, p#hhh.item-p, p.item-p, hhh: p#hhh.item-p]
```

注意到，当 DocumentFragment 插入到文档中，是所有的子节点插入，而不是 DocumentFragment 自身，并且在插入以后，会被清空，即只留下一个 DocumentFragment 容器，所有子节点都没有了。

再一次注意，如果将一个真实的 DOM 插入 DocumentFragment，那么这个 DOM 就会在文档树中消失，也就是该节点被移除；添加到 DocumentFragment 中，就不再属于文档树。

## 3. 方法

该接口继承 Node 的全部方法，并实现了 ParentNode 接口中的方法。

### 3.1.`DocumentFragment.querySelector`

按照文档的顺序，返回第一个 DocumentFragment 中与选择器匹配的元素节点。（其使用深度优先，前序遍历规则遍历文档中的节点。）如果没有匹配结果，返回 null 。

### 3.2.`DocumentFragment.querySelectorAll`

返回所有 DocumentFragment 中与选择器匹配的元素节点，返回值是一个 NodeList。

### 3.3.`DocumentFragment.getElementById`

按照文档的顺序，返回第一个 DocumentFragment 中与指定 ID 匹配的元素节点。

```js
const fruits = ['Apple', 'Orange', 'Banana', 'Melon']
const fragment = new DocumentFragment()

fruits.forEach(fruit => {
  const p = document.createElement('p')
    if (fruit === 'Banana') {
      p.id = 'hhh'
    }
  p.className = 'item-p'
  p.innerHTML = fruit
  fragment.appendChild(p)
})

let sele = fragment.querySelector('.item-p')
sele // <p class="item-p">Apple</p>

let seleAll = fragment.querySelectorAll('.item-p')
seleAll
// NodeList(4) [p.item-p, p.item-p, p#hhh.item-p, p.item-p]

let seleId = fragment.getElementById('hhh')
seleId // <p id="hhh" class="item-p">Banana</p>
```

## 4. 测试

关于使用 DocumentFragment 和不使用 DocumentFragment 的情况下：

测试代码：

```js
let number = 1000

document.addEventListener('DOMContentLoaded', function() {
  let startTime = Date.now()
  let app = document.getElementById('app')
  for (let i = 0; i < number; i++) {
    let div = document.createElement('div')
    div.textContent = 'test' + i
    app.appendChild(div)
  }
  console.log(Date.now() - startTime)
})

document.addEventListener('DOMContentLoaded', function() {
  let startTime = Date.now()
  let app = document.getElementById('app')
  let fragment = document.createDocumentFragment()
  for (let i = 0; i < number; i++) {
    let div = document.createElement('div')
    div.textContent = 'test' + i
    fragment.appendChild(div)
  }
  app.appendChild(fragment)
  console.log(Date.now() - startTime)
})
```

插入元素 10,000 次的测试结果：

| 浏览器 | 使用           | 不使用         |
| ------ | -------------- | -------------- |
| 谷歌   | 47/38/38       | 41/39/43       |
| 欧鹏   | 66/55/74       | 48/49/37       |
| 火狐   | 19/24/24       | 20/18/20       |
| Edge   | 1107/1043/1187 | 1151/1163/1135 |

插入元素 100,000 次的测试结果：

| 浏览器 | 使用              | 不使用            |
| ------ | ----------------- | ----------------- |
| 谷歌   | 278/265/269       | 240/242/247       |
| 欧鹏   | 390/300/332       | 333/283/405       |
| 火狐   | 169/165/172       | 158/159/167       |
| Edge   | 10950/10695/11144 | 10509/10727/10572 |

插入元素 1,000,000 次的测试结果：

| 浏览器 | 使用                 | 不使用              |
| ------ | -------------------- | ------------------- |
| 谷歌   | 2614/3270/3222       | 2468/2504/3054      |
| 欧鹏   | 3049/3455/3457       | 2856/3148/3104      |
| 火狐   | 1671/1756/1858       | 1729/1571/1610      |
| Edge   | 106690/103410/106682 | 11224/105440/104301 |

插入元素 10,000,000 次的测试结果（谷歌控制台能有输出，但是页面已经崩溃，欧鹏直接报内存不足，火狐经过漫长时间，竟然成功渲染了，虽然期间会有问你浏览器慢了，要怎么处理。)：

| 浏览器 | 使用              | 不使用            |
| ------ | ----------------- | ----------------- |
| 谷歌   | 36905/34970/34970 | 34411/31711/33820 |
| 欧鹏   | 46192/46755/46699 | 40863/40914/42394 |
| 火狐   | 18096/18425/17888 | 16568/17456/16850 |
| Edge   | --                | --                |

---

参考：

1.[DocumentFragment](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)

2.[DocumentFragment](https://dom.spec.whatwg.org/#interface-documentfragment)

3.[Document.createDocumentFragment()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createDocumentFragment)

4.[DocumentFragment 的优化小知识](https://juejin.im/post/590f4eadac502e006cf718c3)

5.[DocumentFragment 真的能提高 JS 动态添加 DOM 的性能吗？](https://www.zhihu.com/question/27260165)

6.[使用 DocumentFragment 提升性能 #5](https://github.com/justjavac/the-front-end-knowledge-you-may-not-know/issues/5)
