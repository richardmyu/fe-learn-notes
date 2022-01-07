# Babel 7 教程

## 1.babel/cli

```js
npm install --save-dev @babel/core @babel/cli
```

假定我们已通过 npm init 初始化项目，并安装完成。

现在假定我们的项目下有一个 `script.js` 文件，内容是：

```js
let fun = () => console.log('hello babel.js');
```

我们试试运行 `npx babel script.js`：

```js
$ npx babel script.js
let fun = () => console.log('hello babel.js');
```

还是原来的代码，没有任何变化。说好的编译呢？

这个调整则是在 babel 6 里发生的。Babel 6 做了大量模块化的工作，将原来集成一体的各种编译功能分离出去，独立成插件。这意味着，默认情况下，当下版本的 babel 不会编译代码。

## 2.babel 插件

换句话说，我们要将上面的箭头函数编译成 ES5 函数，需要安装额外的 babel 插件。

首先，安装 `@babel/plugin-transform-arrow-functions`：

```js
npm install --save-dev @babel/plugin-transform-arrow-functions
```

然后，在命令行编译时指定使用该插件：

```js
$ npx babel script.js --plugins @babel/plugin-transform-arrow-functions
let fun = function () {
  return console.log('hello babel.js');
};
```

编译成功。

## 3.配置文件 .babelrc

随着各种新插件的加入，我们的命令行参数会越来越长。

这时，我们可以新建一个 `.babelrc` 文件，把各种命令行参数统一到其中。

比如，要配置前面提到过的箭头函数插件：

```js
{
  "plugins": ["@babel/plugin-transform-arrow-functions"]
}
```

之后，在命令行只要运行 `npx babel script.js` 即可，babel 会自动读取 `.babelrc` 里的配置并应用到编译中：

```js
$ npx babel script.js
let fun = function () {
  return console.log('hello babel.js');
};
```

## 4.babel 套餐

我们有一个项目，页面要求支持 IE 10，但 IE 10 不支持箭头函数、`class` 及 `const`，可是你喜欢用这些新增的 JavaScript 语法，babel 有各种插件满足上述需求：

```js
{
  "plugins": [
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-block-scoping",
    "@babel/plugin-transform-classes"
    ]
}
```

但是这样安装插件、配置 `.babelrc` 的过程非常乏味，而且容易出错。通常，我们不会关心到具体的某个 ES2015 特性支持情况这个层面，我们更关心浏览器版本这个层面。于是就有了 `@babel/preset-env`。

首先在项目下安装：

```js
npm install --save-dev @babel/preset-env
```

然后修改 `.babelrc`：

```js
{
  "presets": ["@babel/preset-env"]
}
```

与前面辛苦配置各种插件后的输出结果几乎一模一样。

可是，我们还没告诉 babel 我们要支持 IE 10 的，为什么它却好像预知一切？

我们来看 `babel-preset-env` 的一段文档：

> Without any configuration options, babel-preset-env behaves exactly the same as babel-preset-latest (or babel-preset-es2015, babel-preset-es2016, and babel-preset-es2017 together).

默认情况下，`babel-preset-env` 等效于三个套餐，而不巧我们前面安装的几个插件已经囊括在 `babel-preset-es2015` 中。

那么，如果我只想支持最新版本的 Chrome 呢？

这时我们可以调整 `.babelrc` 的配置：

```js
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "browsers": ["last 1 Chrome versions"]
      }
    }]
  ]
}
```

最新版本的 Chrome 已经支持箭头函数、`class`、`const`，所以 babel 在编译过程中，不会编译它们。

## 5.babel-polyfill

> Babel includes a polyfill that includes a custom regenerator runtime and core-js.

基本上，`babel-polyfill` 就是 `regenerator runtime` 加 `core-js`。

> 如前面所说的，`babel-polyfill` 其实包含 `regenerator runtime`、`core-js`，如果你的代码只需要其中一部分 polyfill，那么你可以考虑直接引入 `core-js` 下的特定 polyfill，不必使用 `babel-polyfill` 这样的庞然大物。
>
> 另一种办法，是配合 `@babel/preset-env` 的 `useBuiltIns` 配置。

## 6.babel-runtime

`@babel/runtime` 是 babel 生态里最让人困惑的一个包。而在 babel 7 下，我们还多了一个 `@babel/runtime-corejs2`。

我们先来看看 `@babel/runtime` 的 `package.json` 里的 `description` 怎么写：

> babel's modular runtime helpers

有点不知所谓。

那么，`babel-runtime` 与 `babel-polyfill` 的区别究竟是什么？

我们拿 `Object.assign` 为例，剖析下 `babel-polyfill` 与 `babel-runtime` 的异同。

我们知道，IE 11 不支持 `Object.assign`，此时，我们有俩种候选方案：

1. 引入 `babel-polyfill`，补丁一打，`Object.assign` 就被创造出来
配置 `@babel/plugin-transform-object-assign`
2. 第二种方案中，babel 会将所有的 `Object.assign` 替换成 `_extends` 这样一个辅助函数。如下所示：

```js
Object.assign({}, {})
```

编译成：

```js
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

_extends({}, {});
```

问题是，如果你的项目里有 100 个文件，其中有 50 个文件里写了 `Object.assign`，那么，坏消息来了，`_extends` 辅助函数会出现 50 次。

怎么办？我们自然而然会想到把 `_extends` 分离出去，然后在每个文件中引入 - 这正是 `@babel/runtime` 的作用：

```js
var _extends = require("@babel/runtime/helpers/extends");

_extends({}, {});
```

非常漂亮。可没人想要手动转换这些代码。

于是 babel 提供了 `@babel/plugin-transform-runtime` 来替我们做这些转换。

我们首先安装插件：

```js
npm install --save-dev @babel/plugin-transform-runtime
```

然后再安装 `babel-runtime`：

```js
npm install @babel/runtime
```

最后在 `.babelrc` 中配置：

```js
{
  "plugins": [
    "@babel/plugin-transform-object-assign",
    "@babel/plugin-transform-runtime"
  ]
}
```

这样，我们不需要 `babel-polyfill` 也一样可以在程序中使用 `Object.assign`，编译后的代码最终能够正常运行在 IE 11 下。

提问：在经过 `@babel/plugin-transform-runtime` 的处理后，IE 11 下现在有 `Object.assign` 吗？

答案是，仍然没有。

这正是 `babel-polyfill` 与 `babel-runtime` 的一大区别，前者改造目标浏览器，让你的浏览器拥有本来不支持的特性；后者改造你的代码，让你的代码能在所有目标浏览器上运行，但不改造浏览器。

## 7.babel-register

经过 babel 的编译后，我们的源代码与运行在生产下的代码是不一样的。

`babel-register` 则提供了动态编译。换句话说，我们的源代码能够真正运行在生产环境下，不需要 babel 编译这一环节。

我们先在项目下安装 `babel-register`：

```js
npm install --save-dev @babel/register
```

然后在入口文件中 `require`：

```js
require('@babel/register')
require('./app')
```

在入口文件头部引入 `@babel/register` 后，我们的 app 文件中即可使用任意 es2015 的特性。

当然，坏处是动态编译，导致程序在速度、性能上有所损耗。

## 8.babel-node

我们上面说，`babel-register` 提供动态编译，能够让我们的源代码真正运行在生产环境下 - 但其实不然，我们仍需要做部分调整，比如新增一个入口文件，并在该文件中 `require('@babel/register')`。而 `babel-node` 能真正做到一行源代码都不需要调整：

```js
npm install --save-dev @babel/core @babel/node
npx babel-node app.js
```

只是，请不要在生产环境中使用 `babel-node`，因为它是动态编译源代码，应用启动速度非常慢。

**参考：**

[babel 7 教程](https://blog.zfanw.com/babel-js/)
