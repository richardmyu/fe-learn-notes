# [译]DOM: 元素 ID 就是全局变量

## 1. 标准规范

HTML5 规范文档中指出：如果一个元素符合下面两条规则中的任一条，则 window 对象中必须要有与之对应的一个属性，属性值就是这个对象。

- 如果一个元素拥有 `id` 属性，那么 `id` 属性的属性值就会成为 window 对象的属性名。
- 如果一个元素拥有 `name` 属性，那么 `name` 属性的属性值就会成为 window 对象的属性名。但这个元素的标签名必须是：`<a>`， `<applet>`， `<area>`， `<embed>`， `<form>`， `<frame>`， `<frameset>`， `<iframe>`， `<img>`， `<object>`，其中的一个。

参考：

[[译]DOM: 元素 ID 就是全局变量](http://www.cnblogs.com/ziyunfei/archive/2012/09/19/2693458.html)

[带有 ID 的 DOM 树元素是否成为全局变量？](https://cloud.tencent.com/developer/ask/35853)

[javascript – DOM 树元素与 id 成为全局变量？](https://codeday.me/bug/20170314/4813.html)
