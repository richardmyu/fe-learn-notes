### 使用 JavaScript 表达式

如 <a href="./index3.html">index3.html</a> 中所言，在使用 “Mustache” 语法进行文本插值时，除了键值，还可以使用 JavaScript 表达式。在使用表达式过程中发现以下几个问题：

##### 1.n++/++n

在 `{{}}` 中使用 `n++/++n` 表达式时，得到的结果比原值大很多，并且会报错：`You may have an infinite update loop in a component render function.`。

我们使用生命周期钩子来探索一下：

```
let vm = new Vue({
  el: '#app',
  data: {
    a: 0
  },
  beforeMount: function () {
    console.log('beforeMount a ', this.a)
    console.log('beforeMount p-a ')
    debugger
  },
  mounted: function () {
    console.log('mounted a ', this.a)
    console.log('mounted p-a ', document.getElementsByTagName('p')[0])
    debugger
  },
  beforeUpdate: function () {
    console.log('beforeUpdate a ', this.a)
    console.log('beforeUpdate p-a ', document.getElementsByTagName('p')[0])
    debugger
  },
  updated: function () {
    console.log('updated a ', this.a)
    console.log('updated p-a ', document.getElementsByTagName('p')[0])
  }
})
```

控制台输出：

```
beforeMount a  0
beforeMount p-a  <p>​{{ a++ }}​</p>​
mounted a  1
mounted p-a  <p>​0​</p>​

beforeUpdate a  2
beforeUpdate p-a  <p>​0​</p>​
beforeUpdate a  3
beforeUpdate p-a  <p>​1​</p>​
beforeUpdate a  4
beforeUpdate p-a  <p>​2​</p>​

...

beforeUpdate a  101
beforeUpdate p-a  <p>​99​</p>​
beforeUpdate a  102
beforeUpdate p-a  <p>​100​</p>​

[Vue warn]: You may have an infinite update loop in a component render function.

[102]
updated a  102
updated p-a  <p>​101​</p>​
```

变量 a 的初始值是 0，挂载时，进行了第一次运算 `a++`，变量 a 为 1，挂载后又进行了一次运算（为什么），a 变为 2，由于变量的变化，触发 `beforeUpdate` 钩子，然后触发渲染函数；再次运算（为什么，渲染函数引发？？？），变化后又触发，如此反复，直到超出范围...视图重绘触发 `updated`，所以 `updated` 得到的是最终的值。

将 a++ 换成 a+1，得到：

```
beforeMount a  0
beforeMount p-a  <p>​{{ a+1 }}​</p>​
mounted a  0
mounted p-a  <p>​1​</p>​
```

由上可知，若表达式改变变量，会引发重复渲染，可能进入死循环。有关细节还是不太明白...衰

