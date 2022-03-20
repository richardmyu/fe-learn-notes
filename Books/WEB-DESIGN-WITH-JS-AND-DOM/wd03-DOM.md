# DOM

Document Object Model

即使是在 JavaScript 的最初版本里，对编写脚本来说非常重要的一些宿主对象已经可以用了，它们当中最基础的对象是 `window` 对象。`window` 对象对应着浏览器窗口本身，这个对象的属性和方法通常统称为 BOM （浏览器对象模型）。

DOM 把一份文档表示为一棵树（数学意义上的概念），更具体的说，DOM 把文档表示为一颗节点树。

> 节点（node）是一个网络术语，它表示网络中的一个连接点。一个网络就是由一些节点构成的集合。

类似于 DOM，CSS 也把文档的内容视为一颗节点树，节点树上的各个元素将继承其父元素的样式属性。

## 1.getElementById/getElementsByTagName/getElementsByTagName

`getElementsByTagName` 允许把一个通配符作为它的参数，而这意味着文档里的每个元素都将被捕获到。例如想知道文档内有多少个节点：

```js
console.log(document.getElementsByTagName('*').length);
```

> 注意，`getElementById` 和 `getElementsByClassName` 并不支持通配符查询。

## 2.getAttribute/setAttribute

通过 `setAttribute` 对文档做出修改后，再通过浏览器的 view source 选项去查看文档的源代码时，仍将看到改变前的属性值，也就是说，`setAttribute` 做出的修改不会反映在文档本身的源代码里。（简单说就是代码加载后不会被动态修改，所以才是源代码呀 O(∩_∩)O)

这种“表里不一”的现象源自 DOM 的工作模式：先加载文档的静态内容，再动态刷新，动态刷新不影响文档的静态内容。这正是 DOM 的正真威力：对页面内容进行刷新去不需要在浏览器里刷新页面。
