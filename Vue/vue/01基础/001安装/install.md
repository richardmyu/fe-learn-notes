# 安装

[官方文档阅读](https://cn.vuejs.org/v2/guide/installation.html)

### 编译器 VS 运行时

- 完整版（包含编译器和运行时）
  - 编译器：用来将模板字符串编译成为 JavaScript 渲染函数的代码。
  - 运行时：用来创建 Vue 实例、渲染并处理虚拟 DOM 等的代码。基本上就是除去编译器的其它一切。

带有 `runtime` 的，比如 `vue.runtime.js`等，表示运行时版本，不能使用 `template` ，而只能使用渲染函数 `render`。

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

### 开发环境 VS 生产环境

开发环境：包含完整的警告和调试模式

生产环境：删除了警告，体积更小（一般都会压缩代码）

对于 UMD 版本来说，开发环境/生产环境模式是硬编码好的：开发环境下用未压缩的代码，生产环境下使用压缩后的代码。

CommonJS 和 ES Module 版本是用于打包工具的，因此不提供压缩后的版本。

### UMD VS CommonJS VS ES Module

**UMD**：UMD 版本可以通过 `<script>` 标签直接用在浏览器中。jsDelivr CDN 的 `https://cdn.jsdelivr.net/npm/vue` 默认文件就是运行时 + 编译器的 UMD 版本 (vue.js)。

**CommonJS**：CommonJS 版本用来配合老的打包工具比如 Browserify 或 webpack 1。这些打包工具的默认文件 (pkg.main) 是只包含运行时的 CommonJS 版本 (vue.runtime.common.js)。

**ES Module**：从 2.6 开始 Vue 会提供两个 ES Modules (ESM) 构建文件：

- 为打包工具提供的 ESM：为诸如 webpack 2 或 Rollup 提供的现代打包工具。ESM 格式被设计为可以被静态分析，所以打包工具可以利用这一点来进行“tree-shaking”并将用不到的代码排除出最终的包。为这些打包工具提供的默认文件 (pkg.module) 是只有运行时的 ES Module 构建 (vue.runtime.esm.js)。
  >
- 为浏览器提供的 ESM (2.6+)：用于在现代浏览器中通过 `<script type="module">` 直接导入。

### process.env.NODE_ENV

`process` 对象是 Node 的一个全局对象，提供当前 Node 进程的信息。它可以在脚本的任意位置使用，不必通过 `require` 命令加载。

`process.env`：返回一个对象，成员为当前 Shell 的环境变量。比如，process.env.HOME返回用户的主目录。

但是 `process.env` 中并不存在 `NODE_ENV`。`NODE_ENV` 是用户一个自定义的变量，在 webpack 中它的用途是判断生产环境或开发环境的依据的。

通常的做法是，新建一个环境变量 `NODE_ENV`，用它确定当前所处的开发阶段，生产阶段设为 production，开发阶段设为 develop 或 staging，然后在脚本中读取 `process.env.NODE_ENV` 即可。

打开命令行，输入 node，再输入 `process.env`，可以看见 `process.env` 是一个对象。

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

设置环境变量：

- on Windows：

`set NODE_ENV=dev`

- on OS X or Linux：

`export NODE_ENV=dev`

- 直接写在 js 文件:

`process.env.NODE_ENV = 'production';`

- 然后在 package.json：

```js
"scripts": {
  "start": "set NODE_ENV=dev && node app.js"
 }
```

许多 library 通过与 `process.env.NODE_ENV` 环境变量关联，以决定 library 中应该引用哪些内容。例如，当不处于生产环境中时，某些 library 为了使调试变得容易，可能会添加额外的 log(日志记录) 和 test(测试) 功能。并且，在使用 `process.env.NODE_ENV === 'production'` 时，一些 library 可能针对具体用户的环境，删除或添加一些重要代码，以进行代码执行方面的优化。从 webpack v4 开始, 指定 mode 会自动地配置 DefinePlugin：

```js
// webpack.prod.js

const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production"
});
```

技术上讲，`NODE_ENV` 是一个由 Node.js 暴露给执行脚本的系统环境变量。通常用于决定在开发环境与生产环境(dev-vs-prod)下，server tools(服务器工具)、build scripts(构建脚本) 和 client-side libraries(客户端库) 的行为。

然而，与预期相反，无法在构建脚本 `webpack.config.js` 中，将 `process.env.NODE_ENV` 设置为 "production"，请查看 [#2537](https://github.com/webpack/webpack/issues/2537)。

因此，在 webpack 配置文件中，`process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js'` 这样的条件语句，无法按照预期运行。

解决方法：使用 `DefinePlugin` 创建全局变量，在 `package.json` 文件中配置 `NODE_ENV` 变量值。

[process对象](https://javascript.ruanyifeng.com/nodejs/process.html)

## CSP 环境

内容安全策略 (CSP) 是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本 (XSS) 和数据注入攻击等。无论是数据盗取、网站内容污染还是散发恶意软件，这些攻击都是主要的手段。

CSP 被设计成完全向后兼容（除CSP2 在向后兼容有明确提及的不一致; ）。不支持CSP的浏览器也能与实现了CSP的服务器正常合作，反之亦然：不支持 CSP 的浏览器只会忽略它，如常运行，默认为网页内容使用标准的同源策略。如果网站不提供 CSP 头部，浏览器也使用标准的同源策略。

为使 CSP 可用, 你需要配置你的网络服务器返回  `Content-Security-Policy` HTTP头部 ( 有时你会看到一些关于 `X-Content-Security-Policy` 头部的提法, 那是旧版本，你无须再如此指定它)。

除此之外,  `<meta>` 元素也可以被用来配置该策略, 例如

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';">
```

[内容安全策略( CSP )](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)

参考：

[生产环境](https://webpack.docschina.org/guides/production/)

[理解 webpack 之 process.env.NODE_ENV 详解(十八)](https://www.cnblogs.com/tugenhua0707/p/9780621.html)
