# Node 对象

## 小结

### 1.接口

一个节点，自动继承 `Node` 接口，当该节点有一个子节点，即该节点时一个父节点，则会继承 `ParentNode` 接口；当该节点有一个父节点，则会继承 `ChildNode` 接口，也就是说若一个节点同时有父节点和子节点，则该节点会继承至少三个接口：`Node`，`ParentNode` 和 `ChildNode`。

| Node                      | ParentNode                         | ChildNode      |
| ------------------------- | ---------------------------------- | -------------- |
| nodeType                  | children                           | remove()       |
| nodeName                  | firstElementChild/lastElementChild | before/after() |
| nodeValue                 | childElementCount                  | replaceWith()  |
| textContent               | append/prepend()                   |
| baseURI                   |
| ownerDocument             |
| nextSibling               |
| previousSibling           |
| parentNode                |
| parentElement             |
| firstChild/lastChild      |
| childNodes                |
| isConnected               |
| appendChild()             |
| hasChildNodes()           |
| cloneNode()               |
| insertBefore()            |
| removeChild()             |
| replaceChild()            |
| contains()                |
| compareDocumentPosition() |
| isEqualNode/isSameNode()  |
| normalize()               |
| getRootNode()             |

### 2.类型

DOM 提供两种节点集合，用于容纳多个节点：`NodeList` 和 `HTMLCollection`。

| deg          | NodeList                                                                | HTMLCollection                                 |
| ------------ | ----------------------------------------------------------------------- | ---------------------------------------------- |
| 范围         | 所有类型节点                                                            | 元素节点                                       |
| 获取实例方法 | `Node.childNodes`, `querySelectorAll`, `getElementByName`等节点搜索方法 | `document.images/links/form`,`getElementBy...` |
| 类数组       | 可以使用 `forEach`                                                      | 不可以使用 `forEach`                           |
| 状态         | `Node.childNodes` 获取动态，其他静态                                    | 都是动态                                       |
