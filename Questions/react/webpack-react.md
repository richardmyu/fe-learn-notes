# webpack-react

这是学习 webpack 配置中遇到的问题，项目用 react 搭建。

阅读文章：[入门 Webpack，看这篇就够了](https://segmentfault.com/a/1190000006178770)

文章是在 2016-08-05 发布的，2017-12-07 更新。学习时间 2019-08-07，下面记录学习过程中遇到的问题及解决方法。

1.安装 webpack

文章说安装：

`npm install --save-dev webpack`

其实还要安装 webpack-cli（如果不安装的话，在执行 `webpack` 时，会有提示，让你安装 webpack-cli）：

`npm i --save-dev webpack-cli`

2.webpack 打包

在配置环境后，调用 `node_modules/.bin/webpack` (本案例 webpack 是非全局安装，也可以在 package.json 中配置 `"start": "webpack"`，然后调用 `npm start`)，脚本会输出一个警告：

```shell
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
```

在 webpack.config.js 文件中，添加 `mode:'development'`：

```js
module.exports = {
  mode: 'development',
  entry: __dirname + '/app/main.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  }
}
```

3.babel 安装与配置

按照文章来安装配置：

```shell
npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react

npm install --save react react-dom
```

然后运行 `npm start` 或 `npm run server`，会有一个报错：

```shell
Error: Cannot find module '@babel/core'
 babel-loader@8 requires Babel 7.x (the package '@babel/core'). If you'd like to use Babel 6.x ('babel-core'), you should install 'babel-loader@7'.
```

再看看 package.json:

```json
"babel-core": "^6.26.3",
"babel-loader": "^8.0.6",
```

我们安装的 `babel-loader` 已经达到 8.x 版本，对应的 core 包应该是 `@babel/core` 而不是 `babel-core`；如果要使用 `babel-core`，需要将 `babel-loader` 降级，建议 `babel-loader@7`。

如果把 `babel-core` 升级到 `@babel/core` 呢？

```shell
Error: Plugin/Preset files are not allowed to export objects, only functions.
```

> 1.[Plugin/Preset files are not allowed to export objects, only functions. #6808](https://github.com/babel/babel/issues/6808) 2.[reactjs - Preset files are not allowed to export objects - Stack Overflow](https://stackoverflow.com/questions/49182862/preset-files-are-not-allowed-to-export-objects) 3.[Plugin/Preset files are not allowed to export objects, only functions #8707](https://github.com/babel/babel/issues/8707)

如果在你的 package.json 依赖包中既有 babel 7.0 版本，又有 babel 6.0 版本，就会报这个错误，因为这两个版本是不兼容的。

按照我的理解（也许是误解）把 `babel-preset-env babel-preset-react` 换成 `@babel/preset-env @babel/preset-react`，然后 '双' 报错了：

```shell
Error: Cannot find module 'babel-preset-env' from 'F:\MyProject\learnRep\Questions\react\demo'
- Did you mean "@babel/env"?
```

于是我卸载 `@babel/preset-env`，换上 `@babel/env`，然而 '叒' 报错：

```shell
npm ERR! 404 Not Found - GET https://registry.npmjs.com/@babel%2fenv - Not found
```

于是只好换回 `babel-preset-env`，不出意料，'叕' 报错：

```shell
Error: Cannot find module 'babel-preset-react' from 'F:\MyProject\learnRep\Questions\react\demo'
- If you want to resolve "react", use "module:react"
- Did you mean "@babel/react"?
```

。。。到这里，我也不知道怎么配置了 o(╥﹏╥)o，先记录下来吧！
