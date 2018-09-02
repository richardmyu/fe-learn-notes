# test

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


### vue-cli 目录结构

```javascript
  |
  |----  build  webpack 相关配置文件
  |
  |----  config  vue 基本配置
  |
  |----  node_modules  依赖包
  |
  |----  src  项目核心文件
  |
  |----  static  静态资源
  |
  |----  .babelrc  babel 编译参数
  |
  |----  .editorconfig  代码格式
  |
  |----  .gitignore  git 上传忽略文件
  |
  |----  .postcssrc.js  转换 css 工具
  |
  |----  index.html  主页
  |
  |----  package.json  项目基本信息
  |
  |----  README.md 项目说明
  |
```

#### 1.build

build 文件主要是 webpack 的配置，主要启动文件是`dev-server.js`，当我们输入 `npm run dev` 首先启动的就是 `dev-server.js`，它会去检查 node 及 npm 版本，加载配置文件，启动服务。

```
build
  |
  |----  build.js
  |
  |----  check-versions.js
  |
  |----  
  |
  |
  |
  |
  |
```
