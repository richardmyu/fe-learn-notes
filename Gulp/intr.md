## Gulp

[Gulp（中文）](https://www.gulpjs.com.cn/docs/getting-started/quick-start/)
[Gulp（English）](https://gulpjs.com/)

```shell
# config
node -v
# v12.13.0

npm -v
# 6.14.10

npx -v
# 6.14.10

gulp-cli
# CLI version 2.3.0

gulp
# local version 4.0.2
```

### 快速入门

> 如果你先前将 `gulp` 安装到全局环境中了，请执行 `npm rm --global gulp` 将 `gulp` 删除再继续以下操作。

```shell
npm install -g gulp-cli
# create project
# ..
npm install -D gulp
```

#### 1.注册任务

每个 gulp 任务（task）都是一个异步的 JavaScript 函数，此函数是一个可以接收 `callback` 作为参数的函数，或者是一个返回 `stream`、`promise`、`event emitter`、`child process` 或 `observable` 类型值的函数。

> 在以前的 gulp 版本中，`task()` 方法用来将函数注册为任务（task）。虽然这个 API 依旧是可以使用的，但是 **导出（export）** 将会是主要的【注册机制】，除非遇到 `export` 不起作用的情况。

```js
// 旧版本
gulp.task('sayHello', function(){
  console.log('Hello);
});


// 新版本
function sayHello(){
  console.log('Hello');
}

exports.sayHello = sayHello;
// or
exports.default = sayHello;
```

#### 2.组合任务

Gulp 提供了两个强大的组合方法： `series()` 和 `parallel()`，允许将多个独立的任务组合为一个更大的操作。这两个方法都可以：

- 接受任意数目的任务（task）函数或已经组合的操作；
- 互相嵌套至任意深度；

如果需要让任务（task）按顺序执行，请使用 `series()` 方法。

```js
const { series, parallel } = require("gulp");

function sayHello() {
  console.log('Hello world');
}

function sayBye() {
  console.log('bye bye');
}

exports.order = series(sayHello, sayBye);
```

结果：

```js
[20:00:34] Using gulpfile D:\xx\xx\my-project\gulpfile.js
[20:00:34] Starting 'order'...
[20:00:34] Starting 'sayHello'...
Hello world
[20:00:34] The following tasks did not complete: order, sayHello
```

可以看到只执行了两个任务，预期应该是执行三个任务的。让微妙稍作修改：

```js
const { series, parallel } = require("gulp");

function sayHello(cb) {
  console.log('Hello world');
  cb();
}

function sayBye(cb) {
  console.log('bye bye');
  cb();
}

exports.order = series(sayHello, sayBye);
```

再看结果：

```js
[20:03:15] Using gulpfile D:\xx\xx\my-project\gulpfile.js
[20:03:15] Starting 'order'...
[20:03:15] Starting 'sayHello'...
Hello world
[20:03:15] Finished 'sayHello' after 1.57 ms
[20:03:15] Starting 'sayBye'...
bye bye
[20:03:15] Finished 'sayBye' after 955 μs
[20:03:15] Finished 'order' after 5.45 ms
```

若要让顺序（`series`）执行任务，则需要在任务中执行对应的回调函数。

> 如果任务（task）不返回任何内容，则必须使用 callback 来指示任务已完成。[使用 callback](https://www.gulpjs.com.cn/docs/getting-started/async-completion/#%E4%BD%BF%E7%94%A8-callback)


但是使用 **并发（`parallel`）** 组合任务，则没有问题。

```js
const { series, parallel } = require("gulp");

function sayHello(cb) {
  console.log('Hello world');
  // cb();
}

function sayBye(cb) {
  console.log('bye bye');
  // cb();
}

exports.concu = parallel(sayHello, sayBye);

// console
[20:05:55] Using gulpfile D:\xx\xx\my-project\gulpfile.js
[20:05:55] Starting 'concu'...
[20:05:55] Starting 'sayHello'...
[20:05:55] Starting 'sayBye'...
Hello world
[20:05:55] Finished 'sayHello' after 2.14 ms
bye bye
[20:05:55] Finished 'sayBye' after 2.87 ms
[20:05:55] Finished 'concu' after 5.86 ms
```

#### 3.异步执行

Node 库以多种方式处理异步功能。最常见的模式是 `error-first callbacks`，但是你还可能会遇到 `streams`、`promises`、`event emitters`、`child processes`, 或 `observables`。gulp 任务（task）规范化了所有这些类型的异步功能。

当从任务（task）中返回 `stream`、`promise`、`event emitter`、`child process` 或 `observable` 时，成功或错误值将通知 gulp 是否继续执行或结束。如果任务（task）出错，gulp 将立即结束执行并显示该错误。

> [Error-first callbacks](https://nodejs.org/api/errors.html#errors_error_first_callbacks)
> > Node.js 核心 API 公开的大多数异步方法都遵循惯用模式，称为 **错误优先回调**。通过这种模式，回调函数作为参数传递给方法。当操作完成或引发错误时，将以 `Error` 对象（如果有）作为第一个参数传递来调用回调函数。如果未引发错误，则第一个参数将作为 `null` 传递。

```js
const fs = require('fs');

function errorFirstCallback(err, data) {
  if (err) {
    console.error('There was an error', err);
    return;
  }
  console.log(data);
}

fs.readFile('/some/file/that/does-not-exist', errorFirstCallback);
fs.readFile('/some/file/that/does-exist', errorFirstCallback);
```

> [Stream](https://nodejs.org/api/stream.html#stream_stream)
> > 流是用于在 Node.js 中处理流数据的抽象接口。流模块提供用于实现流接口的API。流可以是可读的，可写的，或两者均可。所有流都是 `EventEmitter` 的实例。
>
> [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
> > Promise 是一个对象，它代表了一个异步操作的最终完成或者失败。本质上 Promise 是一个函数返回的对象，我们可以在它上面绑定回调函数，这样我们就不需要在一开始把回调函数作为参数传入这个函数了。
>
> [event emitter](https://nodejs.org/api/events.html#events_events)
> > 所有发出事件的对象都是 `EventEmitter` 类的实例。这些对象公开了`eventEmitter.on（）` 函数，该函数允许将一个或多个函数附加到该对象发出的命名事件。当 `EventEmitter` 对象发出一个事件时，该特定事件附带的所有函数都会被同步调用，被调用的侦听器返回的任何值都将被忽略并丢弃。
>
> [Child process](https://nodejs.org/api/child_process.html#child_process_child_process)
>
> [observable](https://github.com/tc39/proposal-observable/blob/master/README.md)

当使用 `series()` 组合多个任务（task）时，任何一个任务（task）的错误将导致整个任务组合结束，并且不会进一步执行其他任务。

当使用 `parallel()` 组合多个任务（task）时，一个任务的错误将结束整个任务组合的结束，但是其他并行的任务（task）可能会执行完，也可能没有执行完。

#### 4.模式

`src()` 可以工作在三种模式下：缓冲（buffering）、流动（streaming）和空（empty）模式。这些模式可以通过对 `src()` 的 `buffer` 和 `read` 参数 进行设置。

- **缓冲（Buffering）** 模式是默认模式，将文件内容加载内存中。插件通常运行在缓冲（buffering）模式下，并且许多插件不支持流动（streaming）模式。
- **流动（Streaming）** 模式的存在主要用于操作无法放入内存中的大文件，例如巨幅图像或电影。文件内容从文件系统中以小块的方式流式传输，而不是一次性全部加载。如果需要流动（streaming）模式，请查找支持此模式的插件或自己编写。
- **空（Empty）** 模式不包含任何内容，仅在处理文件元数据时有用。

#### 5.Glob 详解

**字符串片段（segment）** 是指两个分隔符之间的所有字符组成的字符串。在 `glob` 中，分隔符永远是 `/` 字符 - 不区分操作系统 - 即便是在采用 `\\` 作为分隔符的 Windows 操作系统中。在 `glob` 中，`\\` 字符被保留作为转义符使用。

> 避免使用 Node 的 `path` 类方法来创建 `glob`，例如 `path.join`。在 Windows 中，由于 Node 使用 `\\` 作为路径分隔符，因此将会产生一个无效的 `glob`。还要避免使用 `__dirname` 和 `__filename` 全局变量，由于同样的原因，`process.cwd()` 方法也要避免使用。

由于 `glob` 匹配时是按照每个 `glob` 在数组中的位置依次进行匹配操作的，所以 `glob` 数组中的取反（negative）`glob` 必须跟在一个非取反（non-negative）的 `glob` 后面。第一个 `glob` 匹配到一组匹配项，然后后面的取反 `glob` 删除这些匹配项中的一部分。

```js
// 官网例子 1
['script/**/*.js', '!scripts/vendor/']

// 实际
['script/**/*.js', '!scripts/vendor/*.js']

// 官网例子 2
['**/*.js', '!node_modules/']

// 实际
['**/*.js', '!node_modules/**/*.js']
```

#### 5.插件

Gulp **插件** 实质上是 Node 转换流（Transform Streams），它封装了通过管道（pipeline）转换文件的常见功能，通常是使用 `.pipe()` 方法并放在 `src()` 和 `dest()` 之间。他们可以更改经过流（stream）的每个文件的文件名、元数据或文件内容。

- 每个插件应当只完成必要的工作，因此你可以把它们像构建块一样连接在一起；
- 插件应当总是用来转换文件的。其他操作都应该使用（非插件的） Node 模块或库来实现；

#### 6.文件监控

对匹配 `glob` 的文件进行监控，如果有文件被修改了就执行关联的任务（task）。如果被执行的任务（task）没有触发 异步完成 信号，它将永远不会再次运行了。

> 避免同步任务

- **可监控事件**

- `add`
- `addDir`
- `change`
- `unlink`
- `unlinkDir`
- `ready`
- `error`
- `all`：除了 `ready` 和 `error` 之外所有的事情；

- **初次执行**

```js
// 触发事件后才执行
watch('src/**.js', inlineStream);
// or
watch('src/**.js', { ignoreInitial: true }, inlineStream);

// 自动执行一次
watch('src/**.js', { ignoreInitial: false }, inlineStream);
```

- **队列**

> 保证当前执行的任务（task）不会再次并发执行。

```js
// 顺序执行
watch('src/**.js', inlineStream);
// or
watch('src/**.js', { queue: true }, inlineStream);

// 非顺序执行（有可能并发执行）
watch('src/**.js', { queue: false }, inlineStream);
```

使用 `setInterval` 或 `setTimeout` 不会报错，但始终无法进入执行状态。

### 自定义注册

允许将自定义注册表插入任务系统，该系统可以提供共享任务或增强功能。

#### 1.结构

自定义注册表必须遵循特定的格式。如果传递给 `registry` 的注册表实例没有所有四个方法，则将引发错误。

```js
// as a function
function TestRegistry() {}
TestRegistry.prototype.init = function (gulpInst) {}
TestRegistry.prototype.get = function (name) {}
TestRegistry.prototype.set = function (name, fn) {}
TestRegistry.prototype.tasks = function () {}

// or as a class
class TestRegistry {
  init(gulpInst) { }
  get(name) { }
  set(name) { }
  tasks() { }
}
```

#### 2.注册

```js
const { registry } = require('gulp');

// ... TestRegistry setup code

// good!
registry(new TestRegistry())

// bad!
registry(TestRegistry())
// This will trigger an error: 'Custom registries must be instantiated, but it looks like you passed a constructor'
```

#### 3.方法

- **init(gulpInst)**

在 `Registry` 函数中，注册表的 `init` 方法会被最后调用。作为唯一参数（gulpInst）传递的 `gulp` 实例，可用于使用 `gulpInst.task(taskName，fn)` 预定义任务。

| parameter | type   | note             |
| --------- | ------ | ---------------- |
| gulpInst  | object | Instance of gulp |

- **get(name)**

`get` 方法接收供自定义注册表解析和返回的任务名称，如果不存在具有该名称的任务，则返回 `undefined`。

| parameter | type   | note                             |
| --------- | ------ | -------------------------------- |
| name      | string | Name of the task to be retrieved |

- **set(name,fn)**

`set` 方法接收任务名称和 `fn`。由 `task` 在内部调用，以将用户注册的任务提供给自定义注册表。

| parameter | type     | note                       |
| --------- | -------- | -------------------------- |
| name      | string   | Name of the task to be set |
| fn        | function | Task function to be set    |

- **tasks()**

必须返回一个列出注册表中所有任务的对象。

#### 4.例子

```js

```






