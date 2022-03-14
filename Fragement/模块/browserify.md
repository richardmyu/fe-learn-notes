# browserify

Browserify 是一个 node.js 模块，主要用于改写现有的 CommonJS 模块，使得浏览器端也可以使用这些模块。使用下面的命令，在全局环境下安装 Browserify。

`$ npm install -g browserify`

## 1.基本用法

假定有一个很简单的 CommonJS 模块文件 `foo.js`。

```js
// foo.js

module.exports = function(x) {
  console.log(x)
}
```

然后，还有一个 `main.js` 文件，用来加载 `foo` 模块。

```js
// main.js

var foo = require('./foo')
foo('Hi')
```

使用 Browserify，将 `main.js` 转化为浏览器可以加载的脚本 `compiled.js`。

```shell
browserify main.js > compiled.js

# 或者

browserify main > compiled.js

# 或者

browserify main.js -o compiled.js
```

之所以转化后的文件叫做 `compiled.js`，是因为该文件不仅包括了 `main.js`，还包括了它所依赖的 `foo.js`。两者打包在一起，保证浏览器加载时的依赖关系。

```html
<script src="compiled.js"></script>
```

## 2.管理前端模块

Browserify 的主要作用是将 CommonJS 模块转为浏览器可以调用的格式，但是纯粹的前端模块，也可以用它打包。

首先，新建一个项目目录，添加 `package.json` 文件。

接着，新建 `index.html`，引入 Browserify 打包后将生成的文件。

## 3.生成前端模块

有时，我们只是希望将 node.js 的模块，移植到浏览器，使得浏览器端可以调用。这时，可以采用 browserify 的 `-r` 参数（`–require` 的简写）。

`browserify -r through -r ./my-file.js:my-module > bundle.js`

上面代码将 `through` 和 `my-file.js`（后面的冒号表示指定模块名为 `my-module`）都做成了模块，可以在其他 `script` 标签中调用。

```html
<script src="bundle.js"></script>
<script>
  var through = require('through')
  var myModule = require('my-module')
  /* ... */
</script>
```

可以看到，`-r` 参数的另一个作用，就是为浏览器端提供 `require` 方法。

---

参考：

1.[Browserify：浏览器加载 Node.js 模块](https://javascript.ruanyifeng.com/tool/browserify.html)

2.[Browserify 使用指南](https://zhaoda.net/2015/10/16/browserify-guide/)

3.[browserify 原理](http://zhenhua-lee.github.io/nodejs/browserify.html)
