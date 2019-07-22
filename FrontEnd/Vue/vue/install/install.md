# 安装

## 兼容性

Vue 不支持 IE8 及以下版本，因为 Vue 使用了 IE8 无法模拟的 ECMAScript 5 特性（`Object.defineProperty()`）。但它支持所有兼容 ECMAScript 5 的浏览器。

[Can I use defineProperty](https://caniuse.com/#search=defineProperty)

## 更新日志

最新稳定版本：2.6.10

查看：`Vue.version`

## 直接用 `<script>` 引入

直接下载并用 `<script>` 标签引入，Vue 会被注册为一个全局变量。

### CDN

对于制作原型或学习，你可以这样使用最新版本：

`<script src="https://cdn.jsdelivr.net/npm/vue"></script>`

```js
// 控制台输出
Download the Vue Devtools extension for a better development experience:
https://github.com/vuejs/vue-devtools

You are running Vue in development mode.
Make sure to turn on production mode when deploying for production.
See more tips at https://vuejs.org/guide/deployment.html
```

对于生产环境，我们推荐链接到一个明确的版本号和构建文件，以避免新版本造成的不可预期的破坏：

`<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>`

### module

如果你使用原生 ES Modules，这里也有一个兼容 ES Module 的构建文件：

```html
<script type="module">
  import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js";
</script>
```

## NPM

在用 Vue 构建大型应用时推荐使用 NPM 安装。NPM 能很好地和诸如 webpack 或 Browserify 模块打包器配合使用。同时 Vue 也提供配套工具来开发单文件组件。

```shell
# 最新稳定版
$ npm install vue
```

## CLI

Vue 提供了一个官方的 CLI，为单页面应用 (SPA) 快速搭建繁杂的脚手架。它为现代前端工作流提供了 batteries-included 的构建设置。只需要几分钟的时间就可以运行起来并带有热重载、保存时 lint 校验，以及生产环境可用的构建版本。

## 对不同构建版本的解释

|                    | UMD                | CommonJS              | ES Module(基于构建工具) | ES Module(直接用于浏览器) |
| ------------------ | ------------------ | --------------------- | ----------------------- | ------------------------- |
| 完整版(开发环境)   | vue.js             | vue.common.js         | vue.esm.js              | vue.esm.browser.js        |
| 运行时版(开发环境) | vue.runtime.js     | vue.runtime.common.js | vue.runtime.esm.js      | -                         |
| 完整版(生产环境)   | vue.min.js         | -                     | -                       | vue.esm.browser.min.js    |
| 运行时版(生产环境) | vue.runtime.min.js | -                     | -                       | -                         |

> 带 `min` 表示压缩版本，一般用于生产环境。

vue.common.js 会自动根据环境选择：

```js
if (process.env.NODE_ENV === "production") {
  module.exports = require("./vue.common.prod.js");
} else {
  module.exports = require("./vue.common.dev.js");
}

// vue.runtime.common.js 同理
if (process.env.NODE_ENV === "production") {
  module.exports = require("./vue.runtime.common.prod.js");
} else {
  module.exports = require("./vue.runtime.common.dev.js");
}
```

### 第一对概念

- 完整版（包含编译器和运行时）
  - 编译器：用来将模板字符串编译成为 JavaScript 渲染函数的代码。
  - 运行时：用来创建 Vue 实例、渲染并处理虚拟 DOM 等的代码。基本上就是除去编译器的其它一切。

带有 `runtime` 的，比如 `vue.runtime.js`等，表示运行时版本，不能使用 `template` ，而只能使用渲染函数 `render`。

### 第二队概念

开发环境：包含完整的警告和调试模式

生产环境：删除了警告，体积更小（一般都会压缩代码）

### 第三队概念

**UMD**：UMD 版本可以通过 `<script>` 标签直接用在浏览器中。jsDelivr CDN 的 `https://cdn.jsdelivr.net/npm/vue` 默认文件就是运行时 + 编译器的 UMD 版本 (vue.js)。

**CommonJS**：CommonJS 版本用来配合老的打包工具比如 Browserify 或 webpack 1。这些打包工具的默认文件 (pkg.main) 是只包含运行时的 CommonJS 版本 (vue.runtime.common.js)。

**ES Module**：从 2.6 开始 Vue 会提供两个 ES Modules (ESM) 构建文件：

- 为打包工具提供的 ESM：为诸如 webpack 2 或 Rollup 提供的现代打包工具。ESM 格式被设计为可以被静态分析，所以打包工具可以利用这一点来进行“tree-shaking”并将用不到的代码排除出最终的包。为这些打包工具提供的默认文件 (pkg.module) 是只有运行时的 ES Module 构建 (vue.runtime.esm.js)。
  >
- 为浏览器提供的 ESM (2.6+)：用于在现代浏览器中通过 `<script type="module">` 直接导入。

## 运行时 + 编译器 vs. 只包含运行时

如果你需要在客户端编译模板 (比如传入一个字符串给 template 选项，或挂载到一个元素上并以其 DOM 内部的 HTML 作为模板)，就将需要加上编译器，即完整版：

```js
// 需要编译器
// template 就是要使用编译模板，将字符串编译为 HTML 元素
new Vue({
  template: "<div>{{ hi }}</div>"
});

// 不需要编译器
new Vue({
  render(h) {
    return h("div", this.hi);
  }
});
```

当使用 vue-loader 或 vueify 的时候，`*.vue` 文件内部的模板会在构建时预编译成 JavaScript。你在最终打好的包里实际上是不需要编译器的，所以只用运行时版本即可。

因为运行时版本相比完整版体积要小大约 30%，所以应该尽可能使用这个版本。如果你仍然希望使用完整版，则需要在打包工具里配置一个别名：

**webpack**

```js
module.exports = {
  // ...
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js" // 用 webpack 1 时需用 'vue/dist/vue.common.js'
    }
  }
};
```

## 开发环境 vs. 生产环境模式

对于 UMD 版本来说，开发环境/生产环境模式是硬编码好的：开发环境下用未压缩的代码，生产环境下使用压缩后的代码。

CommonJS 和 ES Module 版本是用于打包工具的，因此我们不提供压缩后的版本。你需要自行将最终的包进行压缩。

CommonJS 和 ES Module 版本同时保留原始的 process.env.NODE_ENV 检测，以决定它们应该运行在什么模式下。你应该使用适当的打包工具配置来替换这些环境变量以便控制 Vue 所运行的模式。把 process.env.NODE_ENV 替换为字符串字面量同时可以让 UglifyJS 之类的压缩工具完全丢掉仅供开发环境的代码块，以减少最终的文件尺寸。

development(开发环境) 和 production(生产环境) 这两个环境下的构建目标存在着巨大差异。在开发环境中，我们需要：强大的 source map 和一个有着 live reloading(实时重新加载) 或 hot module replacement(热模块替换) 能力的 localhost server。而生产环境目标则转移至其他方面，关注点在于压缩 bundle、更轻量的 source map、资源优化等，通过这些优化方式改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置。

**webpack**

在 webpack 4+ 中，你可以使用 mode 选项：

```js
module.exports = {
  mode: "production"
};
```

但是在 webpack 3 及其更低版本中，你需要使用 DefinePlugin：

```js
var webpack = require("webpack");

module.exports = {
  // ...
  plugins: [
    // ...
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ]
};
```

## process.env.NODE_ENV

在 node 中，有全局变量 process 表示的是当前的 node 进程。process.env 包含着关于系统环境的信息。但是 process.env 中并不存在 NODE_ENV 这个东西。NODE_ENV 是用户一个自定义的变量，在 webpack 中它的用途是判断生产环境或开发环境的依据的。

打开命令行（请先装 node），输入 node，再输入 process.env，可以看见 process.env 是一个对象。

```shell
> node
> process.env
{ ALLUSERSPROFILE: 'C:\\ProgramData',
  APPDATA: 'C:\\Users\\DELL\\AppData\\Roaming',
  CommonProgramFiles: 'C:\\Program Files\\Common Files',
  'CommonProgramFiles(x86)': 'C:\\Program Files (x86)\\Common Files',
  CommonProgramW6432: 'C:\\Program Files\\Common Files',
  COMPUTERNAME: 'DESKTOP-ECB0V60',
  ...
	 }
```

on Windows：

`set NODE_ENV=dev`

on OS X or Linux：

`export NODE_ENV=dev`

直接写在 js 文件:

`process.env.NODE_ENV = 'production';`

然后在 package.json：

```js
"scripts": {
  "start": "set NODE_ENV=dev && node app.js"
 }
```

许多 library 通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容。例如，当不处于生产环境中时，某些 library 为了使调试变得容易，可能会添加额外的 log(日志记录) 和 test(测试) 功能。并且，在使用 `process.env.NODE_ENV === 'production'` 时，一些 library 可能针对具体用户的环境，删除或添加一些重要代码，以进行代码执行方面的优化。从 webpack v4 开始, 指定 mode 会自动地配置 DefinePlugin：

webpack.prod.js

```js
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production"
});
```

技术上讲，NODE_ENV 是一个由 Node.js 暴露给执行脚本的系统环境变量。通常用于决定在开发环境与生产环境(dev-vs-prod)下，server tools(服务期工具)、build scripts(构建脚本) 和 client-side libraries(客户端库) 的行为。然而，与预期相反，无法在构建脚本 webpack.config.js 中，将 process.env.NODE_ENV 设置为 "production"，请查看 [#2537](https://github.com/webpack/webpack/issues/2537)。因此，在 webpack 配置文件中，`process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js'` 这样的条件语句，无法按照预期运行。

## CSP 环境

有些环境，如 Google Chrome Apps，会强制应用**内容安全策略** (CSP)，不能使用 `new Function()` 对表达式求值。这时可以用 CSP 兼容版本。完整版本依赖于该功能来编译模板，所以无法在这些环境下使用。

另一方面，运行时版本则是完全兼容 CSP 的。当通过 webpack + vue-loader 或者 Browserify + vueify 构建时，模板将被预编译为 render 函数，可以在 CSP 环境中完美运行。

参考：

[生产环境](https://webpack.docschina.org/guides/production/)

[理解 webpack 之 process.env.NODE_ENV 详解(十八)](https://www.cnblogs.com/tugenhua0707/p/9780621.html)

[process.env.NODE_ENV](https://www.jianshu.com/p/ce8f405935b9)
