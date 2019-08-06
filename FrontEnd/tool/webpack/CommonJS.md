# CommonJS 规范

CommonJS 是一个项目，其目标是为 JavaScript 在网页浏览器之外创建模块约定。创建这个项目的主要原因是当时缺乏普遍可接受形式的 JavaScript 脚本模块单元，模块在与运行 JavaScript 脚本的常规网页浏览器所提供的不同的环境下可以重复使用。

这个项目由 Mozilla 工程师 Kevin Dangoor 于 2009 年 1 月发起，最初名为 ServerJS。在 2009 年 8 月，这个项目被改名为“CommonJS”来展示其 API 的广泛的应用性。有关规定在一个开放进程中被创建和认可，一个规定只有在已经被多个实现完成之后才被认为是最终的。CommonJS 不隶属于致力于 ECMAScript 的 Ecma 国际的工作组 TC39，但是 TC39 的一些成员参与了这个项目。

在 2013 年 5 月，Node.js 包管理器 npm 的作者 Isaac Z. Schlueter，声称 Node.js 已经废弃了 CommonJS，Node.js 核心开发者应避免使用它。

> 由于 Node.js 模块是根据 commonJs 的 modules API 规范实现的。那么这里将以 node.js 的模块机制来讲解 commonJS 模块规范。

## 1.概述

每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。

CommonJS 规范规定，每个模块内部，module 变量代表当前模块。这个变量是一个对象，它的 exports 属性（即 module.exports）是对外的接口。加载某个模块，其实是加载该模块的 module.exports 属性。

```js
// example.js
var x = 5
var addX = function(value) {
  return value + x
}
exports.reducer = function(value) {
  return x - value
}
module.exports.x = x
module.exports.addX = addX
```

require 方法用于加载模块。

```js
var example = require('./example.js')

console.log(example.x) // 5
console.log(example.addX(1)) // 6
console.log(example.reducer(1)) // 4
```

CommonJS 模块的特点如下。

- 所有代码都运行在模块作用域，不会污染全局作用域。在文件里面定义的变量、函数、类，都是这个模块的私有的，对外不可见。
  >
- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
  >
- 模块加载的顺序，按照其在代码中出现的顺序。也就是说，是同步加载的。

```js
exports.timeTest = function() {
  console.log(Date.parse(new Date()))
  return Date.now()
}
```

```js
var example = require('./example.js')

console.log(example.timeTest())
// 1565082015000
// 1565082015456

let { timeTest } = require('./example')

console.log(timeTest())
// 1565082015000
// 1565082015457
```

## 2.module 对象

Node 内部提供一个 Module 构建函数。所有模块都是 Module 的实例。

每个模块内部，都有一个 module 对象，代表当前模块。它有以下属性。

- `module.id` 模块的识别符，通常是带有绝对路径的模块文件名。
  >
- `module.filename` 模块的文件名，带有绝对路径。
  >
- `module.loaded` 返回一个布尔值，表示模块是否已经完成加载。
  >
- `module.parent` 返回一个对象，表示调用该模块的模块。
  >
- `module.children` 返回一个数组，表示该模块要用到的其他模块。
  >
- `module.exports` 返回一个对像，表示模块对外输出的值。

下面是一个示例文件，最后一行输出 module 变量。

```js
// example.js
var jquery = require('jquery')
exports.$ = jquery
console.log(module)
```

配置 node 环境，安装 jQuery 以后，执行这个文件，命令行会输出如下信息：

```shell
> node example.js

Module {
  id: '.',
  exports: { '$': [Function] },
  parent: null,
  filename:
   'F:\\MyProject\\learnRep\\FrontEnd\\tool\\webpack\\moduleDemo\\commonjs\\example.js',
  loaded: false,
  children:
   [ Module {
      id: 'F:\\MyProject\\learnRep\\FrontEnd\\tool\\webpack\\moduleDemo\\commonjs\\node_modules\\jquery\\dist\\jquery.js',
      exports: [Function],
      parent: [Circular],
      filename: 'F:\\MyProject\\learnRep\\FrontEnd\\tool\\webpack\\moduleDemo\\commonjs\\node_modules\\jquery\\dist\\jquery.js',
      loaded: true,
      children: [],
      paths: [Array] } ],
      paths:
        [ 'F:\\MyProject\\learnRep\\FrontEnd\\tool\\webpack\\moduleDemo\\commonjs\\node_modules',
          'F:\\MyProject\\learnRep\\FrontEnd\\tool\\webpack\\moduleDemo\\node_modules',
          'F:\\MyProject\\learnRep\\FrontEnd\\tool\\webpack\\node_modules',
          'F:\\MyProject\\learnRep\\FrontEnd\\tool\\node_modules',
          'F:\\MyProject\\learnRep\\FrontEnd\\node_modules',
          'F:\\MyProject\\learnRep\\node_modules',
          'F:\\MyProject\\node_modules',
          'F:\\node_modules' ] }
```

如果在命令行下调用某个模块，那么 module.parent 就是 null。如果是在脚本之中调用，比如 `require('./xxx.js')`，那么 module.parent 就是调用它的模块。利用这一点，可以判断当前模块是否为入口脚本。

```js
// example.js 在 test.js 中调用，执行 node test.js 输出
Module {
  id: 'F:\\MyProject\\learnRep\\FrontEnd\\tool\\webpack\\moduleDemo\\commonjs\\example.js',
  exports:
    { reducer: [Function],
      timeTest: [Function],
      x: 5,
      addX: [Function: addX],
      '$': [Function] },
  parent:
    Module {
      id: '.',
      exports: {},
      parent: null,
      filename: 'F:\\MyProject\\learnRep\\FrontEnd\\tool\\webpack\\moduleDemo\\commonjs\\test.js',
      loaded: false,
      children: [ [Circular] ],
      paths:
        [ 'F:\\MyProject\\learnRep\\FrontEnd\\tool\\webpack\\moduleDemo\\commonjs\\node_modules',
          'F:\\MyProject\\learnRep\\FrontEnd\\tool\\webpack\\moduleDemo\\node_modules',
          ...
          'F:\\MyProject\\node_modules',
          'F:\\node_modules' ] },
  filename: 'F:\\MyProject\\learnRep\\FrontEnd\\tool\\webpack\\moduleDemo\\commonjs\\example.js',
  loaded: false,
  children:
    [ Module {
        id: 'F:\\MyProject\\learnRep\\FrontEnd\\tool\\webpack\\moduleDemo\\commonjs\\node_modules\\jquery\\dist\\jquery.js',
        exports: [Function],
        parent: [Circular],
        filename: 'F:\\MyProject\\learnRep\\FrontEnd\\tool\\webpack\\moduleDemo\\commonjs\\node_modules\\jquery\\dist\\jquery.js',
        loaded: true,
        children: [],
        paths: [Array] } ],
  paths:
    [ 'F:\\MyProject\\learnRep\\FrontEnd\\tool\\webpack\\moduleDemo\\commonjs\\node_modules',
      'F:\\MyProject\\learnRep\\FrontEnd\\tool\\webpack\\moduleDemo\\node_modules',
      ...
      'F:\\MyProject\\node_modules',
      'F:\\node_modules' ] }
...
```

**模块包装器**

在执行模块代码之前，Node.js 会使用一个如下的函数包装器将其包装：

```js
;(function(exports, require, module, __filename, __dirname) {
  // 模块的代码实际上在这里
})
```

通过这样做，Node.js 实现了以下几点：

- 它保持了顶层的变量（用 var、const 或 let 定义）作用在模块范围内，而不是全局对象。 (其实就是用闭包，使模块里定义的变量或函数有自己的作用域，避免全集作用域污染。而且模块里面的变量，函数，类都是私有的，对外不可见，需要对外公开的接口，可以赋值给 module.exports 属性或 exprots 变量)
  >
- 它有助于提供一些看似全局的但实际上是模块特定的变量，例如：
  >
  - 实现者可以使用 module 和 exports 对象从模块中导出值。
    >
  - 快捷变量 `__filename` 和 `__dirname` 包含模块的绝对文件名和目录路径。

## 3.module.exports 属性

module.exports 属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取 module.exports 变量。(CommonJS 暴露的模块到底是什么? 其实是加载该模块的 module.exports 属性)

```js
var EventEmitter = require('events').EventEmitter
module.exports = new EventEmitter()

setTimeout(function() {
  module.exports.emit('ready')
}, 1000)
```

上面模块会在加载后 1 秒后，发出 ready 事件。其他文件监听该事件，可以写成下面这样。

```js
var a = require('./a')
a.on('ready', function() {
  console.log('module a is ready')
})
```

## 4.exports 变量

为了方便，Node 为每个模块提供一个 exports 变量，指向 module.exports。这等同在每个模块头部，有一行这样的命令。

`var exports = module.exports;`
造成的结果是，在对外输出模块接口时，可以向 exports 对象添加方法。

```js
exports.area = function(r) {
  return Math.PI * r * r
}

exports.circumference = function(r) {
  return 2 * Math.PI * r
}
```

注意，不能直接将 exports 变量指向一个值，因为这样等于切断了 exports 与 module.exports 的联系。

`exports = function(x) {console.log(x)};`

这意味着，如果一个模块的对外接口，就是一个单一的值，不能使用 exports 输出，只能使用 module.exports 输出。

`module.exports = function (x){ console.log(x);};`

如果你觉得，exports 与 module.exports 之间的区别很难分清，一个简单的处理方法，就是放弃使用 exports，只使用 module.exports。(exports 不能直接操作，而只能添加属性/方法，module.exports 可以添加属性/方法，在唯一输出的情况下，可以直接赋值)

## 5.AMD 规范与 CommonJS 规范的兼容性

CommonJS 规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。AMD 规范则是非同步加载模块，允许指定回调函数。由于 Node.js 主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以 CommonJS 规范比较适用。但是，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用 AMD 规范。

AMD 规范使用 define 方法定义模块，下面就是一个例子：

```js
define(['package/lib'], function(lib) {
  function foo() {
    lib.log('hello world!')
  }

  return {
    foo: foo
  }
})
```

AMD 规范允许输出的模块兼容 CommonJS 规范，这时 define 方法需要写成下面这样：

```js
define(function(require, exports, module) {
  var someModule = require('someModule')
  var anotherModule = require('anotherModule')

  someModule.doTehAwesome()
  anotherModule.doMoarAwesome()

  exports.asplode = function() {
    someModule.doTehAwesome()
    anotherModule.doMoarAwesome()
  }
})
```

## 6.require 命令

### 6.1.基本用法

require 命令的基本功能是，读入并执行一个 JavaScript 文件，然后返回该模块的 exports 对象。如果没有发现指定模块，会报错。

### 6.2.加载规则

require 命令用于加载文件，后缀名默认为.js。

```js
var foo = require('foo')
//  等同于
var foo = require('foo.js')
```

根据参数的不同格式，require 命令去不同路径寻找模块文件。

（1）如果参数字符串以 `/` 开头，则表示加载的是一个位于绝对路径的模块文件。比如，`require('/home/marco/foo.js')` 将加载 `/home/marco/foo.js`。

（2）如果参数字符串以 `./` 开头，则表示加载的是一个位于相对路径（跟当前执行脚本的位置相比）的模块文件。比如，`require('./circle')` 将加载当前脚本同一目录的 circle.js。

（3）如果参数字符串不以 `./` 或 `/` 开头，则表示加载的是一个默认提供的核心模块（位于 Node 的系统安装目录中），或者一个位于各级 `node_modules` 目录的已安装模块（全局安装或局部安装），即第三方模块。

举例来说，脚本 `/home/user/projects/foo.js` 执行了 `require('bar.js')` 命令，Node 会依次搜索以下文件。

- `/usr/local/lib/node/bar.js`
  >
- `/home/user/projects/node_modules/bar.js`
  >
- `/home/user/node_modules/bar.js`
  >
- `/home/node_modules/bar.js`
  >
- `/node_modules/bar.js`

这样设计的目的是，使得不同的模块可以将所依赖的模块本地化。

（4）如果参数字符串不以 `./` 或 `/` 开头，而且是一个路径，比如 `require('example-module/path/to/file')`，则将先找到 example-module 的位置，然后再以它为参数，找到后续路径。

（5）如果指定的模块文件没有发现，Node 会尝试为文件名添加 `.js`、`.json`、`.node` 后，再去搜索。`.js` 件会以文本格式的 JavaScript 脚本文件解析，`.json` 文件会以 JSON 格式的文本文件解析，`.node`文件会以编译后的二进制文件解析。

（6）如果想得到 require 命令加载的确切文件名，使用 `require.resolve()` 方法。

### 6.3.目录的加载规则

通常，我们会把相关的文件会放在一个目录里面，便于组织。这时，最好为该目录设置一个入口文件，让 require 方法可以通过这个入口文件，加载整个目录。

在目录中放置一个 package.json 文件，并且将入口文件写入 main 字段。下面是一个例子。

```json
// package.json
{ "name": "some-library", "main": "./lib/some-library.js" }
```

require 发现参数字符串指向一个目录以后，会自动查看该目录的 package.json 文件，然后加载 main 字段指定的入口文件。如果 package.json 文件没有 main 字段，或者根本就没有 package.json 文件，则会加载该目录下的 index.js 文件或 index.node 文件。

### 6.4.模块的缓存

第一次加载某个模块时，Node 会缓存该模块。以后再加载该模块，就直接从缓存取出该模块的 module.exports 属性。

```js
require('./example.js')
require('./example.js').message = 'hello'
require('./example.js').message
// "hello"
```

上面代码中，连续三次使用 require 命令，加载同一个模块。第二次加载的时候，为输出的对象添加了一个 message 属性。但是第三次加载的时候，这个 message 属性依然存在，这就证明 require 命令并没有重新加载模块文件，而是输出了缓存。

如果想要多次执行某个模块，可以让该模块输出一个函数，然后每次 require 这个模块的时候，重新执行一下输出的函数。

所有缓存的模块保存在 `require.cache` 之中，如果想删除模块的缓存，可以像下面这样写。

```js
// 删除指定模块的缓存
delete require.cache[moduleName]

// 删除所有模块的缓存
Object.keys(require.cache).forEach(function(key) {
  delete require.cache[key]
})
```

注意，缓存是根据绝对路径识别模块的，如果同样的模块名，但是保存在不同的路径，require 命令还是会重新加载该模块。

### 6.5.环境变量 NODE_PATH

Node 执行一个脚本时，会先查看环境变量 NODE_PATH。它是一组以冒号分隔的绝对路径。在其他位置找不到指定模块时，Node 会去这些路径查找。

可以将 NODE_PATH 添加到 `.bashrc`。

`export NODE_PATH="/usr/local/lib/node"`

所以，如果遇到复杂的相对路径，比如下面这样。

`var myModule = require('../../../../lib/myModule');`

有两种解决方法，一是将该文件加入 node_modules 目录，二是修改 NODE_PATH 环境变量，package.json 文件可以采用下面的写法。

```shell
{
  "name": "node_path",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "NODE_PATH=lib node index.js"
  },
  "author": "",
  "license": "ISC"
}
```

NODE_PATH 是历史遗留下来的一个路径解决方案，通常不应该使用，而应该使用 node_modules 目录机制。

### 6.6.模块的循环加载

如果发生模块的循环加载，即 A 加载 B，B 又加载 A，则 B 将加载 A 的不完整版本。

```js
// a.js
exports.x = 'a1'
console.log('a.js ', require('./b.js').x)
exports.x = 'a2'

// b.js
exports.x = 'b1'
console.log('b.js ', require('./a.js').x)
exports.x = 'b2'

// main.js
console.log('main.js ', require('./a.js').x)
console.log('main.js ', require('./b.js').x)
```

上面代码是三个 JavaScript 文件。其中，a.js 加载了 b.js，而 b.js 又加载 a.js。这时，Node 返回 a.js 的不完整版本，所以执行结果如下。

```shell
$ node main.js
b.js  a1
a.js  b2
main.js  a2
main.js  b2
```

### 6.7.require.main

require 方法有一个 main 属性，可以用来判断模块是直接执行，还是被调用执行。

直接执行的时候（node module.js），require.main 属性指向模块本身。

```js
require.main === module
// true
```

调用执行的时候（通过 require 加载该脚本执行），上面的表达式返回 false。

## 7.模块的加载机制

CommonJS 模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。

### 7.1.require 的内部处理流程

虽然在 Node.js 8 之后开始做 Node.js 支持 ES Module 的工作，CommonJs 模块系统的实现还是经过了不小的变化。但是总体流程仍然是和之前几乎一致。

- 路径解析
  >
- 文件加载
  >
- 模块封装
  >
- 编译执行
  >
- 缓存

require 命令是 CommonJS 规范之中，用来加载其他模块的命令。它其实不是一个全局命令，而是指向当前模块的 `module.require` 命令，而后者又调用 Node 的内部命令 `Module._load`。

```js
Module._load = function(request, parent, isMain) {
  // 1. 检查 Module._cache，是否缓存之中有指定模块，如果有直接返回
  // 2. 如果缓存之中没有：
  //        如果是原生模块，直接调用 NativeModule.require()
  //        如果不是原生模块，就创建一个新的 Module 实例
  // 3. 将它保存到缓存
  // 4. 使用 module.load() 加载指定的模块文件，
  //    读取文件内容之后，使用 module.compile() 执行文件代码
  // 5. 如果加载/解析过程报错，就从缓存删除该模块
  // 6. 返回该模块的 module.exports
}
```

上面的第 4 步，采用 `module.compile()` 执行指定模块的脚本，逻辑如下。

```js
Module.prototype._compile = function(content, filename) {
  // 1. 生成一个 require 函数，指向 module.require
  // 2. 加载其他辅助方法到 require
  // 3. 将文件内容放到一个函数之中，该函数可调用 require
  // 4. 执行该函数
}
```

上面的第 1 步和第 2 步，require 函数及其辅助方法主要如下。

- `require()`: 加载外部模块

>

- `require.resolve()`：将模块名解析到一个绝对路径

>

- `require.main`：指向主模块

>

- `require.cache`：指向所有缓存的模块

>

- `require.extensions`：根据文件的后缀名，调用不同的执行函数

一旦 require 函数准备完毕，整个所要加载的脚本内容，就被放到一个新的函数之中，这样可以避免污染全局环境。该函数的参数包括 require、module、exports，以及其他一些参数。

```js
;(function(exports, require, module, __filename, __dirname) {
  // YOUR CODE INJECTED HERE!
})
```

`Module._compile` 方法是同步执行的，所以 `Module._load` 要等它执行完成，才会向用户返回 module.exports 的值。

参考：

1.[CommonJS](https://zh.wikipedia.org/wiki/CommonJS)

2.[CommonJS 规范](https://github.com/ruanyf/jstutorial/blob/gh-pages/nodejs/module.md)

3.[浅析当下的 Node.js CommonJS 模块系统](https://zhuanlan.zhihu.com/p/38382637)

4.[浏览器加载 CommonJS 模块的原理与实现](http://www.ruanyifeng.com/blog/2015/05/commonjs-in-browser.html)

5.[commonJS 模块规范](https://segmentfault.com/a/1190000010576927)
