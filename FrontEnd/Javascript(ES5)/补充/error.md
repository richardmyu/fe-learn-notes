# JavaScript 错误处理

## 1.JavaScript 错误和一般处理

`Error` 对象有两个内置属性供我们使用。第一个是消息，作为参数传递给 `Error` 构造函数，例如 `new Error(“这是错误消息”)`。你可以通过 `message` 属性访问消息。

第二个是错误堆栈跟踪，这个属性非常重要。你可以通过 `stack` 属性访问它。错误堆栈将为你提供历史记录（调用堆栈），从中可以查看哪个文件导致了错误。堆栈的上部也包括消息，然后是实际的堆栈，从距离错误发生最近的点开始，一直到最外层“需要为错误负责”的文件。

现在，`Error` 实例本身不会导致任何结果，例如，`new Error(’…’)` 不会做任何事情。当错误被抛出时，脚本将停止执行，除非你在流程中以某种方式对它进行了处理。记住，是手动抛出错误，还是由库抛出错误，甚至由运行时本身（Node 或浏览器），都没有关系。让我们看看如何在不同的场景中处理这些错误。

`try … catch` 这是最简单但经常被遗忘的错误处理方法。它可以用来捕获任何类型的同步错误。

## 1.异步性 —— 回调

异步性，这是在使用 JavaScript 时必须考虑的一个主题。当你有一个异步函数，并且该函数内部发生错误时，你的脚本将继续执行，因此，不会立即出现任何错误。当使用回调函数处理异步函数时（不推荐），你通常会在回调函数中收到两个参数，如下所示：

如果有错误，err 参数就等同于那个错误。如果没有，参数将是 `undefined` 或 `null`。要么在 `if(err)` 块中返回某项内容，要么将其他指令封装在 `else` 块中，这一点很重要，否则你可能会得到另一个错误，例如，`result` 可能未定义，而你试图访问 `result.data`，类似这样的情况。

```javascript
myAsyncFunc(someInput, (err, result) => {
  if (err) {
    return console.error(err);
    // we will see later what to do with the error object.
  } else {
    console.log(result);
  }
});
```

## 2.异步性 —— Promises

处理异步性的更好方法是使用 `Promises`。在这一点上，除了代码可读性更强之外，我们还改进了错误处理。只要有一个 catch 块，我们就不再需要太关注具体的错误捕获。在链接 Promises 时，catch 块捕获会自 Promises 执行或上一个 catch 块以来的所有错误。注意，没有 catch 块的 Promises 不会终止脚本，但会给你一条可读性较差的消息。

因此，务必要在 Promises 中加入 catch 块。

```javascript
// condition 1
Promise.resolve(1)
  .then(res => {
    console.log(res); // 1
    throw new Error("something went wrong");
    return Promise.resolve(2);
  })
  .then(res => {
    console.log(res); // will not get executed
    // return Promise.resolve(2) not exe
  })
  .catch(err => {
    // catch throw new Error("something went wrong")
    console.error(err); // we will see what to do with it later
    return Promise.resolve(3);
  })
  .then(res => {
    // return Promise.resolve(3) exe
    console.log(res); // 3
  })
  .catch(err => {
    // not catch err
    // in case in the previous block occurs another error
    console.error(err);
  });

// condition 2
Promise.resolve(1)
  .then(res => {
    console.log(res); // 1
    // throw new Error("something went wrong");
    return Promise.resolve(2);
  })
  .then(res => {
    console.log(res); // 2
  })
  .catch(err => {
    // not catch err
    console.error(err);
    return Promise.resolve(3);
  })
  .then(res => {
    // not exe Promise.resolve()
    // params is undefined
    console.log(res); // undefined
  })
  .catch(err => {
    // not catch err
    console.error(err);
  });
```

随着 JavaScript 引入 `async/await`，我们回到了最初的错误处理方法，借助 `try … catch … finally`，错误处理变得非常简单。因为这和我们处理“普通”同步错误的方法是一样的，所以如果需要的话，更容易使用作用域更大的 `catch` 语句。

```javascript
function someFuncThatThrowsAnError() {
  localStorage.setItem("aa", "aaa");
  return localStorage.getItem("aa");
}

(async function() {
  try {
    await someFuncThatThrowsAnError();
  } catch (err) {
    console.error(err);
  }
  console.log("Easy!");
})();

// Easy!

function someFuncThatThrowsAnError() {
  throw new Error("123");
}

(async function() {
  try {
    await someFuncThatThrowsAnError();
  } catch (err) {
    console.error(err);
  }
  console.log("Easy!");
})();

// Error: 123 at someFuncThatThrowsAnError
// Easy!
```

## 2.前端开发中 js 代码异常处理及监控

常见的 js 异常捕获一般有 2 中方式

### 2.1 try..catch

1、无法捕捉到语法错误，只能捕捉运行时错误；

2、可以拿到出错的信息，堆栈，出错的文件、行号、列号；

3、需要借助工具把所有的 function 块以及文件块加入 `try...catch`，可以在这个阶段打入更多的静态信息。

### 2.2 window.onerror

由于 `try..catch` 只能捕获块里面的错误，全局的一些错误，例如：

1、JS 脚本里边存着语法错误；

2、JS 脚本在运行时发生错误。

针对这样的错误，我们用 `window.onerror` 来捕获。

但是这个方法存在兼容性问题，在不同的浏览器上提供的数据不完全一致，

部分过时的浏览器只能提供部分数据。它的用法如下:

`window.onerror = function (message, url, lineNo, columnNo, error)`

1、`message [String]` 错误信息。直观的错误描述信息，不过有时候你确实无法从这里面看出端倪，特别是压缩后脚本的报错信息，可能让你更加疑惑。

2、`url [String]` 发生错误对应的脚本路径，比如是你的 `https://www.haorooms.com/` 报错了还是 `http://resource.haorooms.com/` 报错了。

3、`lineNo [Number]` 错误发生的行号。

4、`columnNo [Number]` 错误发生的列号。

5、`error [Object]` 具体的 `error` 对象，包含更加详细的错误调用堆栈信息，这对于定位错误非常有帮助

### 2.3 window.onerror js 错误上报库

```javascript
(function() {
  "use strict";

  if (window.badJsReport) {
    return window.badJsReport;
  }

  /*
   *  默认上报的错误信息
   */

  var defaults = {
    msg: "", //错误的具体信息
    url: "", //错误所在的 url
    line: "", //错误所在的行
    col: "", //错误所在的列
    error: "" //具体的 error 对象
  };

  /*
   *ajax封装
   */
  function ajax(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    var params = formatParams(options.data);

    if (window.XMLHttpRequest) {
      var xhr = new XMLHttpRequest();
    } else {
      var xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var status = xhr.status;
        if (status >= 200 && status < 300) {
          options.success && options.success(xhr.responseText, xhr.responseXML);
        } else {
          options.fail && options.fail(status);
        }
      }
    };

    if (options.type == "GET") {
      xhr.open("GET", options.url + "?" + params, true);
      xhr.send(null);
    } else if (options.type == "POST") {
      xhr.open("POST", options.url, true);
      //设置表单提交时的内容类型
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(params);
    }
  }

  /*
   *格式化参数
   */
  function formatParams(data) {
    var arr = [];
    for (var name in data) {
      arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".", ""));
    return arr.join("&");
  }

  /*
   * 合并对象，将配置的参数也一并上报
   */
  function cloneObj(oldObj) {
    //复制对象方法
    if (typeof oldObj != "object") return oldObj;
    if (oldObj == null) return oldObj;
    var newObj = new Object();
    for (var prop in oldObj) newObj[prop] = oldObj[prop];
    return newObj;
  }

  function extendObj() {
    //扩展对象
    var args = arguments;
    if (args.length < 2) {
      return;
    }
    var temp = cloneObj(args[0]); //调用复制对象方法
    for (var n = 1, len = args.length; n < len; n++) {
      for (var index in args[n]) {
        temp[index] = args[n][index];
      }
    }
    return temp;
  }

  /**
   * 核心代码区
   **/
  var badJsReport = function(params) {
    if (!params.url) {
      return;
    }
    window.onerror = function(msg, url, line, col, error) {
      //采用异步的方式,避免阻塞
      setTimeout(function() {
        //不一定所有浏览器都支持col参数，如果不支持就用window.event来兼容
        col = col || (window.event && window.event.errorCharacter) || 0;

        defaults.url = url;
        defaults.line = line;
        defaults.col = col;

        if (error && error.stack) {
          //如果浏览器有堆栈信息，直接使用
          defaults.msg = error.stack.toString();
        } else if (arguments.callee) {
          //尝试通过callee拿堆栈信息
          var ext = [];
          var fn = arguments.callee.caller;
          var floor = 3; //这里只拿三层堆栈信息
          while (fn && --floor > 0) {
            ext.push(fn.toString());
            if (fn === fn.caller) {
              break; //如果有环
            }
            fn = fn.caller;
          }
          defaults.msg = ext.join(",");
        }
        // 合并上报的数据，包括默认上报的数据和自定义上报的数据
        var reportData = extendObj(params.data || {}, defaults);

        // 把错误信息发送给后台
        ajax({
          url: params.url, //请求地址
          type: "POST", //请求方式
          data: reportData, //请求参数
          dataType: "json",
          success: function(response, xml) {
            // 此处放成功后执行的代码
            params.successCallBack && params.successCallBack(response, xml);
          },
          fail: function(status) {
            // 此处放失败后执行的代码
            params.failCallBack && params.failCallBack(status);
          }
        });
      }, 0);

      return true; //错误不会console浏览器上,如需要，可将这样注释
    };
  };

  window.badJsReport = badJsReport;
})();
```

## 3.JavaScript 中错误堆栈处理

### 3.1 了解 Stack

Stack 部分主要在阐明 js 中函数调用栈的概念，它符合栈的基本特性『当调用时，压入栈顶。当它执行完毕时，被弹出栈』，简单看下面的代码：

```javascript
function c() {
  try {
    var bar = baz;
    throw new Error();
  } catch (e) {
    console.log(e.stack);
  }
}

function b() {
  c();
}

function a() {
  b();
}
a();
// 上述代码中会在执行到 c 函数的时候跑错，调用栈为 a -> b -> c，

// ReferenceError: baz is not defined
//   at c(file:///...)
//   at b(file:///...)
//   at a(file:///...)
//   at file:///C:/
```

很明显，错误堆栈可以帮助我们定位到报错的位置，在大型项目或者类库开发时，这很有意义。

### 3.2 抛 Error 对象的正确姿势

在我们日常开发中一定要抛出标准的 `Error` 对象。否则，无法知道抛出的类型，很难对错误进行统一处理。正确的做法应该是使用 `throw new Error(“error message here”)`，这里还引用了 Node.js 中推荐的异常 处理方式 :

- 区分操作异常和程序员的失误。操作异常指可预测的不可避免的异常，如无法连接服务器
- 操作异常应该被处理。程序员的失误不需要处理，如果处理了反而会影响错误排查
- 操作异常有两种处理方式：同步 `(try…catch)` 和异步（callback, event - emitter）两种处理方式，但只能选择其中一种。
- 函数定义时应该用文档写清楚参数类型，及可能会发生的合理的失败。以及错误是同步还是异步传给调用者的
- 缺少参数或参数无效是程序员的错误，一旦发生就应该 `throw`。 传递错误时，使用标准的 `Error` 对象，并附件尽可能多的错误信息，可以使用标准的属性名

### 3.3 异步（Promise）环境下错误处理方式

在 `Promise` 内部使用 `reject` 方法来处理错误，而不要直接调用 `throw Error`，这样你不会捕捉到任何的报错信息。

`reject` 如果使用 `Error` 对象，会导致捕获不到错误的情况，在我的博客中有讨论过这种情况：`Callback Promise Generator Async-Await` 和异常处理的演进，我们看以下代码：

```javascript
// condition 1 直接 reject('xxx')
// catch 可以捕获错误
function thirdFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("我可以被捕获");
      // throw Error('永远无法被捕获')
    });
  });
}

Promise.resolve(true)
  .then((resolve, reject) => {
    return thirdFunction();
  })
  .catch(error => {
    console.log("捕获异常", error); // 捕获异常 我可以被捕获
  });

// condition 2 直接 throw Error("xxx")
// 无法 catch
function thirdFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject("我可以被捕获");
      throw Error("永远无法被捕获");
      //Uncaught Error: 永远无法被捕获
    });
  });
}

Promise.resolve(true)
  .then((resolve, reject) => {
    return thirdFunction();
  })
  .catch(error => {
    console.log("捕获异常", error); //
  });

// condition 3 直接 reject(throw Error("xxx"))
// catch 可以捕获错误信息
// 在 reject 中正确使用 throw Error
function thirdFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("我可以被捕获"));
      // throw Error("永远无法被捕获");
    });
  });
}

Promise.resolve(true)
  .then((resolve, reject) => {
    return thirdFunction();
  })
  .catch(error => {
    console.log("捕获异常", error); //捕获异常 Error: 我可以被捕获
  });
```

我们发现，在 macroTask 队列中，`reject` 行为是可以被 `catch` 到的，而此时 `throw Error` 就无法捕获异常，大家可以贴到浏览器运行试一试，第二次把 `reject('我可以被捕获')` 注释起来，取消 `throw Error('永远无法被捕获')` 的注释，会发现异常无法 `catch` 住。

这是因为 `setTimeout` 中 `throw Error` 无论如何都无法捕获到，而 `reject` 是 `Promise` 提供的关键字，自己当然可以 `catch` 住。

### 3.4 监控客户端 Error 报错

文中提到的 `try...catch` 可以拿到出错的信息，堆栈，出错的文件、行号、列号等，但无法捕捉到语法错误，也没法去捕捉全局的异常事件。此外，在一些古老的浏览器下 `try...catch` 对 js 的性能也有一定的影响。

这里，想提一下另一个捕捉异常的方法，即 `window.onerror`，这也是我们在做错误监控中用到比较多的方案。它可以捕捉语法错误和运行时错误，并且拿到出错的信息，堆栈，出错的文件、行号、列号等。不过，由于是全局监测，就会统计到浏览器插件中的 js 异常。当然，还有一个问题就是浏览器跨域，页面和 js 代码在不同域上时，浏览器出于安全性的考虑，将异常内容隐藏，我们只能获取到一个简单的 Script Error 信息。不过这个解决方案也很成熟：

- 给应用内所需的 `<script>` 标签添加 `crossorigin` 属性；
- 在 js 所在的 cdn 服务器上添加 `Access-Control-Allow-Origin: * HTTP` 头；

## 4.Callback Promise Generator Async-Await 和异常处理的演进

根据笔者的项目经验，本文讲解了从函数回调，到 es7 规范的异常处理方式。异常处理的优雅性随着规范的进步越来越高，不要害怕使用 `try catch`，不能回避异常处理。

我们需要一个健全的架构捕获所有同步、异步的异常。业务方不处理异常时，中断函数执行并启用默认处理，业务方也可以随时捕获异常自己处理。

优雅的异常处理方式就像冒泡事件，任何元素可以自由拦截，也可以放任不管交给顶层处理。

### 4.1 回调

如果在回调函数中直接处理了异常，是最不明智的选择，因为业务方完全失去了对异常的控制能力。

下方的函数 请求处理 不但永远不会执行，还无法在异常时做额外的处理，也无法阻止异常产生时笨拙的 `console.log('请求失败')` 行为。

```javascript
// 不是 callback 没有执行的问题吗？？？
function fetch(callback) {
  setTimeout(() => {
    console.log("请求失败"); // 请求失败
  });
}

fetch(() => {
  console.log("请求处理"); // 永远不会执行
});

// callback()
function fetch(callback) {
  callback();
  setTimeout(() => {
    console.log("请求失败"); // 请求失败
  });
}

fetch(() => {
  console.log("请求处理"); // 请求处理
});
```

### 4.2 回调，无法捕获的异常

回调函数有同步和异步之分，区别在于对方执行回调函数的时机，异常一般出现在请求、数据库连接等操作中，这些操作大多是异步的。

异步回调中，回调函数的执行栈与原函数分离开，导致外部无法抓住异常。

从下文开始，我们约定用 `setTimeout` 模拟异步操作

```javascript
function fetch(callback) {
  setTimeout(() => {
    throw Error("请求失败");
  });
}

try {
  fetch(() => {
    console.log("请求处理"); // 永远不会执行
  });
} catch (error) {
  console.log("触发异常", error); // 永远不会执行
}

// Uncaught Error: 请求失败
```

### 4.3 回调，不可控的异常

我们变得谨慎，不敢再随意抛出异常，这已经违背了异常处理的基本原则。

虽然使用了 error-first 约定，使异常看起来变得可处理，但业务方依然没有对异常的控制权，是否调用错误处理取决于回调函数是否执行，我们无法知道调用的函数是否可靠。

更糟糕的问题是，业务方必须处理异常，否则程序挂掉就会什么都不做，这对大部分不用特殊处理异常的场景造成了很大的精神负担。

```javascript
function fetch(handleError, callback) {
  setTimeout(() => {
    handleError("请求失败");
  });
}

fetch(
  () => {
    console.log("失败处理"); // 失败处理
  },
  error => {
    console.log("请求处理"); // 永远不会执行
  }
);
```

### 4.4 番外 Promise 基础

`Promise` 是一个承诺，只可能是成功、失败、无响应三种情况之一，一旦决策，无法修改结果。

`Promise` 不属于流程控制，但流程控制可以用多个 `Promise` 组合实现，因此它的职责很单一，就是对一个决议的承诺。

`resolve` 表明通过的决议，`reject` 表明拒绝的决议，如果决议通过，`then` 函数的第一个回调会立即插入 microTask 队列，异步立即执行。

> 简单补充下事件循环的知识，js 事件循环分为 macroTask 和 microTask。microTask 会被插入到每一个 macroTask 的尾部，所以 microTask 总会优先执行，哪怕 macroTask 因为 js 进程繁忙被 hung 住。

```javascript
new Promise((resolve, reject) => {
  resolve("ok");
}).then(result => {
  console.log(result); // ok
});
```

如果决议结果是决绝，那么 `then` 函数的第二个回调会立即插入 microTask 队列。

```javascript
new Promise((resolve, reject) => {
  reject("no");
}).then(
  result => {
    console.log(result); // 永远不会执行
  },
  error => {
    console.log(error); // no
  }
);
```

如果一直不决议，此 `promise` 将处于 `pending` 状态。

```javascript
new Promise((resolve, reject) => {
  console.log("nothing"); // nothing
  // nothing
}).then(
  result => {
    console.log(result); // 永远不会执行
  },
  error => {
    console.log(error); // 永远不会执行
  }
);
```

未捕获的 `reject` 会传到末尾，通过 `catch` 接住；

```javascript
new Promise((resolve, reject) => {
  reject("no");
})
  .then(
    result => {
      console.log(result); // 永远不会执行
    }
    // error => {
    //   console.log(error);
    // }
  )
  .catch(error => {
    console.log(error); // no
  });
```

`resolve` 决议会被自动展开（reject 不会）

```javascript
// ???
new Promise((resolve, reject) => {
  return new Promise((resolve, reject) => {
    resolve("ok");
  });
}).then(result => {
  console.log(result); // 没有执行
});
// Promise {<pending>}

new Promise((resolve, reject) => {
  return resolve(
    new Promise((resolve, reject) => {
      resolve("ok");
    })
  );
}).then(
  result => {
    console.log(result); // ok
  },
  error => {
    console.log(error);
  }
);
```

链式流，`then` 会返回一个新的 `Promise`，其状态取决于 `then` 的返回值。

```javascript
new Promise((resolve, reject) => {
  resolve("ok");
})
  .then(result => {
    return Promise.reject("error1");
  })
  .then(result => {
    console.log(result); // 永远不会执行
    return Promise.resolve("ok1"); // 永远不会执行
  })
  .then(result => {
    console.log(result); // 永远不会执行
  })
  .catch(error => {
    console.log(error); // error1
  });
```

### 4.5 Promise 异常处理

不仅是 `reject`，抛出的异常也会被作为拒绝状态被 `Promise` 捕获。

```javascript
function fetch(callback) {
  return new Promise((resolve, reject) => {
    throw Error("用户不存在");
  });
}

fetch()
  .then(result => {
    console.log("请求处理", result); // 永远不会执行
  })
  .catch(error => {
    console.log("请求处理异常", error); // 请求处理异常 用户不存在
  });

// 请求处理异常 Error: 用户不存在
//   at Promise
//   at new Promise
//   at fetch
//   at file
```

### 4.6 Promise 无法捕获的异常

但是，永远不要在 macroTask 队列中抛出异常，因为 macroTask 队列脱离了运行上下文环境，异常无法被当前作用域捕获。

```javascript
function fetch(callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      throw Error("用户不存在");
    });
  });
}

fetch()
  .then(result => {
    console.log("请求处理", result); // 永远不会执行
  })
  .catch(error => {
    console.log("请求处理异常", error); // 永远不会执行
  });

// 程序崩溃
// Uncaught Error: 用户不存在
```

不过 microTask 中抛出的异常可以被捕获，说明 microTask 队列并没有离开当前作用域，我们通过以下例子来证明：

```javascript
// resolve 执行
Promise.resolve(true)
  .then((resolve, reject) => {
    throw Error("microTask 中的异常");
  })
  .catch(error => {
    console.log("捕获异常", error);
    // 捕获异常 Error: microTask 中的异常
    //   at Promise.resolve.then
  });

// reject 执行
Promise.reject(true)
  .then((resolve, reject) => {
    throw Error("microTask 中的异常");
  })
  .catch(error => {
    console.log("捕获异常", error);
    // 捕获异常 true
  });

Promise.resolve(true)
  .then(
    resolve => {
      throw Error("resolve 中的异常");
    },
    reject => {
      throw Error("reject 中的异常");
    }
  )
  .catch(error => {
    console.log("捕获异常", error);
    // 捕获异常 Error: resolve 中的异常
    //   at Promise.resolve.then.resolve
  });

Promise.reject(true)
  .then(
    resolve => {
      throw Error("resolve 中的异常");
    },
    reject => {
      throw Error("reject 中的异常");
    }
  )
  .catch(error => {
    console.log("捕获异常", error);
    // 捕获异常 Error: reject 中的异常
    //   at Promise.reject.then.reject
  });
```

至此，`Promise` 的异常处理有了比较清晰的答案，只要注意在 microTask 级别回调中使用 `reject`，就没有抓不住的异常。？？？

### 4.7 Promise 异常追问

如果第三方函数在 macroTask 回调中以 `throw Error` 的方式抛出异常怎么办？

```javascript
function thirdFunction() {
  setTimeout(() => {
    throw Error("就是任性");
  });
}

Promise.resolve(true)
  .then(resolve => {
    thirdFunction();
  })
  .catch(error => {
    console.log("捕获异常", error);
  });

// 程序崩溃
// Uncaught Error: 就是任性
//   at setTimeout
```

值得欣慰的是，由于不在同一个调用栈，虽然这个异常无法被捕获，但也不会影响当前调用栈的执行。

我们必须正视这个问题，唯一的解决办法，是第三方函数不要做这种傻事，一定要在 macroTask 抛出异常的话，请改为 `reject` 的方式。

```javascript
function thirdFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("收敛一些");
    });
  });
}

Promise.resolve(true)
  .then(resolve => {
    return thirdFunction();
  })
  .catch(error => {
    console.log("捕获异常", error); // 捕获异常 收敛一些
  });
```

请注意，如果 `return thirdFunction()` 这行缺少了 `return` 的话，依然无法抓住这个错误，这是因为没有将对方返回的 `Promise` 传递下去，错误也不会继续传递。

我们发现，这样还不是完美的办法，不但容易忘记 `return`，而且当同时含有多个第三方函数时，处理方式不太优雅：

```javascript
function thirdFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("收敛一些");
    });
  });
}

Promise.resolve(true)
  .then((resolve, reject) => {
    return thirdFunction()
      .then(() => {
        return thirdFunction();
      })
      .then(() => {
        return thirdFunction();
      })
      .then(() => {});
  })
  .catch(error => {
    console.log("捕获异常", error);
  });

// condition 2
function thirdFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("收敛一些");
    });
  });
}
Promise.resolve(true)
  .then(resolve => {
    console.log("1"); // 1
    return thirdFunction()
      .then(
        () => {
          console.log("2");
          return thirdFunction();
        },
        () => {
          console.log("2-");
          return thirdFunction();
        }
      )
      .then(
        () => {
          console.log("3");
          return thirdFunction();
        },
        () => {
          console.log("3-");
          return thirdFunction();
        }
      )
      .then(
        () => {
          console.log("4");
        },
        () => {
          // 执行到本处，error 信息丢失
          // catch 捕获的是最后一个 then 的错误信息
          console.log("4-");
        }
      );
  })
  .catch(error => {
    console.log("捕获异常", error);
  });
// 1
// 2-
// 3-
// 4-

function thirdFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("收敛一些");
    });
  });
}
Promise.reject(true)
  .then(
    resolve => {},
    reject => {
      console.log("1"); // 1
      return thirdFunction()
        .then(
          () => {
            console.log("2");
            return thirdFunction();
          },
          () => {
            console.log("2-");
            return thirdFunction();
          }
        )
        .then(
          () => {
            console.log("3");
            return thirdFunction();
          },
          () => {
            console.log("3-");
            return thirdFunction();
          }
        )
        .then(
          () => {
            console.log("4");
            return thirdFunction();
          },
          () => {
            console.log("4-");
            return thirdFunction();
          }
        );
    }
  )
  .catch(error => {
    console.log("捕获异常", error);
  });
// 1
// 2-
// 3-
// 4-
// 捕获异常 收敛一些
```

是的，我们还有更好的处理方式。

### 4.8 番外 Generator 基础 ???

`generator` 是更为优雅的流程控制方式，可以让函数可中断执行:

```javascript
function* generatorA() {
  console.log("a");
  yield;
  console.log("b");
}
const genA = generatorA();
genA.next(); // a
genA.next(); // b
```

`yield` 关键字后面可以包含表达式，表达式会传给 `next().value`。

`next()` 可以传递参数，参数作为 `yield` 的返回值。

这些特性足以孕育出伟大的生成器，我们稍后介绍。下面是这个特性的例子：

```javascript
function* generatorB(count) {
  console.log(count);
  const result = yield 5;
  console.log(result * count);
}
const genB = generatorB(2);
genB.next(); // 2
const genBValue = genB.next(7).value; // 14
console.log(genBValue); // genBValue undefined
```

第一个 `next` 是没有参数的，因为在执行 `generator` 函数时，初始值已经传入，第一个 `next` 的参数没有任何意义，传入也会被丢弃。

`const result = yield 5`

这一句，返回值不是想当然的 5。其作用是将 5 传递给 `genB.next()`，其值，由下一个 `next genB.next(7)` 传给了它，所以语句等于 `const result = 7`。

最后一个 `genBValue`，是最后一个 `next` 的返回值，这个值，就是函数的 `return` 值，显然为 `undefined`。

我们回到这个语句：

`const result = yield 5`

如果返回值是 5，是不是就清晰了许多？是的，这种语法就是 `await`。所以 `Async Await` 与 `generator` 有着莫大的关联，桥梁就是 生成器，我们稍后介绍 生成器。

### 4.9 番外 Async Await

如果认为 `Generator` 不太好理解，那 `Async Await` 绝对是救命稻草，我们看看它们的特征：

```javascript
const timeOut = (time = 0) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time + 200);
    }, time);
  });

async function main() {
  const result1 = await timeOut(200);
  console.log(result1); // 400
  const result2 = await timeOut(result1);
  console.log(result2); // 600
  const result3 = await timeOut(result2);
  console.log(result3); // 800
}

main();
```

所见即所得，`await` 后面的表达式被执行，表达式的返回值被返回给了 `await` 执行处。

但是程序是怎么暂停的呢？只有 `generator` 可以暂停程序。那么等等，回顾一下 `generator` 的特性，我们发现它也可以达到这种效果。

### 4.10 番外 async await 是 generator 的语法糖 ???

终于可以介绍 生成器 了！它可以魔法般将下面的 `generator` 执行成为 `await` 的效果。

```javascript
const timeOut = (time = 0) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time + 200);
    }, time);
  });

function* main() {
  const result1 = yield timeOut(200);
  console.log(result1);
  const result2 = yield timeOut(result1);
  console.log(result2);
  const result3 = yield timeOut(result2);
  console.log(result3);
}
```

下面的代码就是生成器了，生成器并不神秘，它只有一个目的，就是：

> 所见即所得，`yield` 后面的表达式被执行，表达式的返回值被返回给了 `yield` 执行处。

达到这个目标不难，达到了就完成了 `await` 的功能，就是这么神奇。

```javascript
function step(generator) {
  const gen = generator();
  // 由于其传值，返回步骤交错的特性，记录上一次 yield 传过来的值，在下一个 next 返回过去
  let lastValue;
  // 包裹为 Promise，并执行表达式
  return () =>
    Promise.resolve(gen.next(lastValue).value).then(value => {
      lastValue = value;
      return lastValue;
    });
}
```

利用生成器，模拟出 `await` 的执行效果：

```javascript
const run = step(main);

function recursive(promise) {
  promise().then(result => {
    if (result) {
      recursive(promise);
    }
  });
}

recursive(run);
// 400
// 600
// 800
```

可以看出，`await` 的执行次数由程序自动控制，而回退到 `generator` 模拟，需要根据条件判断是否已经将函数执行完毕。

### 4.11 Async Await 异常

不论是同步、异步的异常，await 都不会自动捕获，但好处是可以自动中断函数，我们大可放心编写业务逻辑，而不用担心异步异常后会被执行引发雪崩：

```javascript
function fetch(callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject();
    });
  });
}

async function main() {
  const result = await fetch();
  console.log("请求处理", result); // 永远不会执行
}

main();
```

### 4.12 Async Await 捕获异常 ???

我们使用 `try catch` 捕获异常。

认真阅读 `Generator` 番外篇的话，就会理解为什么此时异步的异常可以通过 `try catch` 来捕获。

因为此时的异步其实在一个作用域中，通过 `generator` 控制执行顺序，所以可以将异步看做同步的代码去编写，包括使用 `try catch` 捕获异常。

```javascript
function fetch(callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("no");
    });
  });
}

async function main() {
  try {
    const result = await fetch();
    console.log("请求处理", result); // 永远不会执行
  } catch (error) {
    console.log("异常", error); // 异常 no
  }
}

main();
```

### 4.13 Async Await 无法捕获的异常 ???

和 `Promise` 无法捕获的异常 一样，这也是 `await` 的软肋，不过任然可以解决：

```javascript
function thirdFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("收敛一些");
    });
  });
}

async function main() {
  try {
    const result = await thirdFunction();
    console.log("请求处理", result); // 永远不会执行
  } catch (error) {
    console.log("异常", error); // 异常 收敛一些
  }
}

main();
```

现在解答为什么 `await` 是更加优雅的方案：

```javascript
async function main() {
  try {
    const result1 = await secondFunction(); // 如果不抛出异常，后续继续执行
    const result2 = await thirdFunction(); // 抛出异常
    const result3 = await thirdFunction(); // 永远不会执行
    console.log("请求处理", result); // 永远不会执行
  } catch (error) {
    console.log("异常", error); // 异常 收敛一些
  }
}

main();
```

### 4.14 业务场景 ???

在如今 `action` 概念成为标配的时代，我们大可以将所有异常处理收敛到 `action` 中。

我们以如下业务代码为例，默认不捕获错误的话，错误会一直冒泡到顶层，最后抛出异常。

```javascript
const successRequest = () => Promise.resolve("a");
const failRequest = () => Promise.reject("b");

class Action {
  async successReuqest() {
    const result = await successRequest();
    console.log("successReuqest", "处理返回值", result); // successReuqest 处理返回值 a
  }

  async failReuqest() {
    const result = await failRequest();
    console.log("failReuqest", "处理返回值", result); // 永远不会执行
  }

  async allReuqest() {
    const result1 = await successRequest();
    console.log("allReuqest", "处理返回值 success", result1); // allReuqest 处理返回值 success a
    const result2 = await failRequest();
    console.log("allReuqest", "处理返回值 success", result2); // 永远不会执行
  }
}

const action = new Action();
action.successReuqest();
action.failReuqest();
action.allReuqest();

// 程序崩溃
// Uncaught (in promise) b
// Uncaught (in promise) b
```

为了防止程序崩溃，需要业务线在所有 `async` 函数中包裹 `try catch`。

我们需要一种机制捕获 `action` 最顶层的错误进行统一处理。

为了补充前置知识，我们再次进入番外话题。

### 4.15 番外 Decorator ???

`Decorator` 中文名是装饰器，核心功能是可以通过外部包装的方式，直接修改类的内部属性。

装饰器按照装饰的位置，分为 `class decorator` `method decorator` 以及 `property decorator`（目前标准尚未支持，通过 get set 模拟实现）。

- `Class Decorator`

类级别装饰器，修饰整个类，可以读取、修改类中任何属性和方法。

```javascript
const classDecorator = (target: any) => {
  const keys = Object.getOwnPropertyNames(target.prototype);
  console.log("classA keys,", keys); // classA keys ["constructor", "sayName"]
};

@classDecorator
class A {
  sayName() {
    console.log("classA ascoders");
  }
}
const a = new A();
a.sayName(); // classA ascoders
```

- `Method Decorator`

方法级别装饰器，修饰某个方法，和类装饰器功能相同，但是能额外获取当前修饰的方法名。

为了发挥这一特点，我们篡改一下修饰的函数。

```javascript
const methodDecorator = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  return {
    get() {
      return () => {
        console.log("classC method override");
      };
    }
  };
};

class C {
  @methodDecorator
  sayName() {
    console.log("classC ascoders");
  }
}
const c = new C();
c.sayName(); // classC method override
```

- `Property Decorator`

属性级别装饰器，修饰某个属性，和类装饰器功能相同，但是能额外获取当前修饰的属性名。

为了发挥这一特点，我们篡改一下修饰的属性值。

```javascript
const propertyDecorator = (target: any, propertyKey: string | symbol) => {
    Object.defineProperty(target, propertyKey, {
        get() {
            return 'github'
        },
        set(value: any) {
            return value
        }
    })
}

class B {
    @propertyDecorator
    private name = 'ascoders'

    sayName() {
      console.log(`classB ${this.name}`)
    }
}
const b = new B()
b.sayName() // classB github
```

### 4.16 业务场景 统一异常捕获 ???

我们来编写类级别装饰器，专门捕获 `async` 函数抛出的异常：

```javascript
const asyncClass = (errorHandler?: (error?: Error) => void) => (
  target: any
) => {
  Object.getOwnPropertyNames(target.prototype).forEach(key => {
    const func = target.prototype[key];
    target.prototype[key] = async (...args: any[]) => {
      try {
        await func.apply(this, args);
      } catch (error) {
        errorHandler && errorHandler(error);
      }
    };
  });
  return target;
};
```

将类所有方法都用 `try catch` 包裹住，将异常交给业务方统一的 `errorHandler` 处理：

```javascript
const successRequest = () => Promise.resolve("a");
const failRequest = () => Promise.reject("b");

const iAsyncClass = asyncClass(error => {
  console.log("统一异常处理", error); // 统一异常处理 b
});

@iAsyncClass
class Action {
  async successReuqest() {
    const result = await successRequest();
    console.log("successReuqest", "处理返回值", result);
  }

  async failReuqest() {
    const result = await failRequest();
    console.log("failReuqest", "处理返回值", result); // 永远不会执行
  }

  async allReuqest() {
    const result1 = await successRequest();
    console.log("allReuqest", "处理返回值 success", result1);
    const result2 = await failRequest();
    console.log("allReuqest", "处理返回值 success", result2); // 永远不会执行
  }
}

const action = new Action();
action.successReuqest();
action.failReuqest();
action.allReuqest();
```

我们也可以编写方法级别的异常处理：

```javascript
const asyncMethod = (errorHandler?: (error?: Error) => void) => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const func = descriptor.value;
  return {
    get() {
      return (...args: any[]) => {
        return Promise.resolve(func.apply(this, args)).catch(error => {
          errorHandler && errorHandler(error);
        });
      };
    },
    set(newValue: any) {
      return newValue;
    }
  };
};
```

业务方用法类似，只是装饰器需要放在函数上：

```javascript
const successRequest = () => Promise.resolve("a");
const failRequest = () => Promise.reject("b");

const asyncAction = asyncMethod(error => {
  console.log("统一异常处理", error); // 统一异常处理 b
});

class Action {
  @asyncAction async successReuqest() {
    const result = await successRequest();
    console.log("successReuqest", "处理返回值", result);
  }

  @asyncAction async failReuqest() {
    const result = await failRequest();
    console.log("failReuqest", "处理返回值", result); // 永远不会执行
  }

  @asyncAction async allReuqest() {
    const result1 = await successRequest();
    console.log("allReuqest", "处理返回值 success", result1);
    const result2 = await failRequest();
    console.log("allReuqest", "处理返回值 success", result2); // 永远不会执行
  }
}

const action = new Action();
action.successReuqest();
action.failReuqest();
action.allReuqest();
```

### 4.17 业务场景 没有后顾之忧的主动权 ???

我想描述的意思是，在这种场景下，业务方是不用担心异常导致的 `crash`，因为所有异常都会在顶层统一捕获，可能表现为弹出一个提示框，告诉用户请求发送失败。

业务方也不需要判断程序中是否存在异常，而战战兢兢的到处 `try catch`，因为程序中任何异常都会立刻终止函数的后续执行，不会再引发更恶劣的结果。

像 `golang` 中异常处理方式，就存在这个问题
通过 `err, result := func()` 的方式，虽然固定了第一个参数是错误信息，但下一行代码免不了要以 `if error {...}` 开头，整个程序的业务代码充斥着巨量的不必要错误处理，而大部分时候，我们还要为如何处理这些错误想的焦头烂额。

而 js 异常冒泡的方式，在前端可以用提示框兜底，nodejs 端可以返回 500 错误兜底，并立刻中断后续请求代码，等于在所有危险代码身后加了一层隐藏的 `return`。

同时业务方也握有绝对的主动权，比如登录失败后，如果账户不存在，那么直接跳转到注册页，而不是傻瓜的提示用户帐号不存在，可以这样做：

```javascript
async login(nickname, password) {
	try {
		const user = await userService.login(nickname, password)
		// 跳转到首页，登录失败后不会执行到这，所以不用担心用户看到奇怪的跳转
	} catch (error) {
		if (error.no === -1) {
			// 跳转到登录页
		} else {
			throw Error(error) // 其他错误不想管，把球继续踢走
		}
	}
}
```

### 4.18 补充

在 nodejs 端，记得监听全局错误，兜住落网之鱼：

```javascript
process.on("uncaughtException", (error: any) => {
  logger.error("uncaughtException", error);
});

process.on("unhandledRejection", (error: any) => {
  logger.error("unhandledRejection", error);
});
```

在浏览器端，记得监听 window 全局错误，兜住漏网之鱼：

```javascript
window.addEventListener("unhandledRejection", (event: any) => {
  logger.error("unhandledRejection", event);
});

window.addEventListener("onRejectionHandled", (event: any) => {
  logger.error("onRejectionHandled", event);
});
```

## 5.深入理解 JavaScript 错误和堆栈追踪

### 5.1 堆栈调用如何工作

在谈论 errors 之前我们必须明白堆栈调用如何工作。每当函数被调用，它都会被推到堆栈的顶部。函数执行完毕，便会从堆栈顶部移除。

这种数据结构的有趣之处在于最后一个入栈的将会第一个从堆栈中移除，这也就是我们所熟悉的 **LIFO** (后进，先出)特性。

这也就是说我们在函数 `x` 中调用函数 `y`，那么对应的堆栈中的顺序为 `x y`。

假设你有下面这样的代码：

```javascript
function c() {
  console.log("c");
}

function b() {
  console.log("b");
  c();
}

function a() {
  console.log("a");
  b();
}

a();
// a
// b
// c
```

在上面这里例子中，当执行 `a` 函数时，`a` 便会添加到堆栈的顶部，然后当 `b` 函数在 `a` 函数中被调用，`b` 也会被添加到堆栈的顶部，依次类推，在 `b` 中调用 `c` 也会发生同样的事情。

当 `c` 执行时，堆栈中的函数的顺序为 `a b c`。

`c` 执行完毕后便会从栈顶移除，这时控制流重新回到了 `b` 中，`b` 执行完毕同样也会从栈顶移除，最后控制流又回到了 `a` 中，最后 `a` 执行完毕，`a` 也从堆栈中移除。

我们可以利用 `console.trace()` 来更好的演示这种行为，它会在控制台打印出当前堆栈中的记录。此外，通常而言你应该从上到下读取堆栈记录。想想下面的每一行代码都是在哪调用的。

```javascript
function c() {
  console.log("c");
  console.trace();
}

function b() {
  console.log("b");
  c();
}

function a() {
  console.log("a");
  b();
}

a();
// a
// b
// c
// console.trace
// 	 c	@	index.html
//   b	@	index.html
//   a	@	index.html
//   (anonymous)	@	index.html
```

在 Node REPL 服务器上运行上述代码会得到如下结果：

```javascript
Trace
    at c (repl:3:9)
    at b (repl:3:1)
    at a (repl:3:1)
    at repl:1:1 // <-- For now feel free to ignore anything below this point, these are Node's internals
    at realRunInThisContextScript (vm.js:22:35)
    at sigintHandlersWrap (vm.js:98:12)
    at ContextifyScript.Script.runInThisContext (vm.js:24:12)
    at REPLServer.defaultEval (repl.js:313:29)
    at bound (domain.js:280:14)
    at REPLServer.runBound [as eval] (domain.js:293:12)
```

如你所见，当我们在 `c` 中打印堆栈，堆栈中的记录为 `a,b,c`。

如果我们现在在 `b` 中并且在 `c` 执行完之后打印堆栈，我们将会发现 `c` 已经从堆栈的顶部移除，只剩下了 `a` 和 `b`。

```javascript
function c() {
  console.log("c");
}

function b() {
  console.log("b");
  c();
  console.trace();
}

function a() {
  console.log("a");
  b();
}

a();
// a
// b
// c
// console.trace
//   b	@	index.html
//   a	@	index.html
//   (anonymous)	@	index.html
```

正如你看到的那样，堆栈中已经没有 `c`，因为它已经完成运行，已经被弹出去了。

```javascript
Trace
    at b (repl:4:9)
    at a (repl:3:1)
    at repl:1:1  // <-- For now feel free to ignore anything below this point, these are Node's internals
    at realRunInThisContextScript (vm.js:22:35)
    at sigintHandlersWrap (vm.js:98:12)
    at ContextifyScript.Script.runInThisContext (vm.js:24:12)
    at REPLServer.defaultEval (repl.js:313:29)
    at bound (domain.js:280:14)
    at REPLServer.runBound [as eval] (domain.js:293:12)
    at REPLServer.onLine (repl.js:513:10)
```

总结：调用方法，方法便会添加到堆栈顶部，执行完毕之后，它就会从堆栈中弹出。

### 5.2 Error 对象

错误堆栈记录包含从（堆栈底部）它自己的构造函数到（堆栈顶部）所有的堆栈帧。

`try` 代码块后面不必紧跟着 `catch`,但(此种情况下)其后必须紧跟着 `finally`。这意味着我们可以使用三种不同形式的 `try` 语句：

- `try...catch`

- `try...finally`

- `try...catch...finally`

`Try` 语句可以像下面这样互相嵌套：

```javascript
try {
  try {
    throw new Error("Nested error.");
  } catch (nestedErr) {
    console.log("Nested catch"); // This runs
  }
} catch (err) {
  console.log("This will not run."); // no exe
}
```

你甚至还可以在 `catch` 和 `finally` 代码块中嵌套 `try` 语句：

```javascript
try {
  throw new Error("First error");
} catch (err) {
  console.log("First catch running"); // This runs
  try {
    throw new Error("Second error");
  } catch (nestedErr) {
    console.log("Second catch running."); // This runs
  }
}

try {
  console.log("The try block is running..."); // This runs
} finally {
  try {
    throw new Error("Error inside finally.");
  } catch (err) {
    console.log("Caught an error inside the finally block.");
    // This runs
  }
}
```

还有很重要的一点值得注意，那就是我们甚至可以大可不必抛出 `Error` 对象。尽管这看起来非常 cool 且非常自由，但实际并非如此，尤其是对开发第三方库的开发者来说，因为他们必须处理用户(使用库的开发者)的代码。由于缺乏标准，他们并不能把控用户的行为。你不能相信用户并简单的抛出一个 `Error` 对象，因为他们不一定会那么做而是仅仅抛出一个字符串或者数字(鬼知道用户会抛出什么)。这也使得处理必要的堆栈跟踪和其他有意义的元数据变得更加困难。

假设有以下代码：

```javascript
function runWithoutThrowing(func) {
  try {
    func();
  } catch (e) {
    console.log("There was an error, but I will not throw it.");
    console.log("The error's message was: " + e.message);
  }
}

function funcThatThrowsError() {
  throw new TypeError("I am a TypeError.");
}

runWithoutThrowing(funcThatThrowsError);
// There was an error, but I will not throw it.
// The error's message was: I am a TypeError.
```

如果你的用户像上面这样传递一个抛出 `Error` 对象的函数给 `runWithoutThrowing` 函数(那就谢天谢地了)，然而总有些人偷想懒直接抛出一个 `String`,那你就麻烦了：

```javascript
function runWithoutThrowing(func) {
  try {
    func();
  } catch (e) {
    console.log("There was an error, but I will not throw it.");
    console.log("The error's message was: " + e.message);
  }
}

function funcThatThrowsError() {
  throw "I am a String.";
}

runWithoutThrowing(funcThatThrowsError);
// There was an error, but I will not throw it.
// The error's message was: undefined.
```

现在第二个 `console.log` 会打印出 `the error’s message is undefined`。这么看来也没多大的事(后果)呀，但是如果您需要确保某些属性存在于 `Error` 对象上，或以另一种方式（例如 Chai 的 throws 断言 does)）处理 `Error` 对象的特定属性，那么你做需要更多的工作，以确保它会正常。

此外，当抛出的值不是 `Error` 对象时，你无法访问其他重要数据，例如 `stack`，在某些环境中它是 `Error` 对象的一个属性。

`Errors` 也可以像其他任何对象一样使用，并不一定非得要抛出他们，这也是它们为什么多次被用作回调函数的第一个参数(俗称 **err first**)。 在下面的 `fs.readdir()` 例子中就是这么用的。

```javascript
const fs = require("fs");

fs.readdir("/example/i-do-not-exist", function callback(err, dirs) {
  if (err instanceof Error) {
    // `readdir` will throw an error because that directory does not exist
    // We will now be able to use the error object passed by it in our callback function
    console.log("Error Message: " + err.message);
    console.log("See? We can use Errors without using try statements.");
  } else {
    console.log(dirs);
  }
});
```

最后，在 `rejecting promises` 时也可以使用 `Error` 对象。这使得它更容易处理 `promise rejections`：

```javascript
new Promise(function(resolve, reject) {
  reject(new Error("The promise was rejected."));
})
  .then(function() {
    console.log("I am an error.");
  })
  .catch(function(err) {
    if (err instanceof Error) {
      console.log("The promise was rejected with an error.");
      console.log("Error Message: " + err.message);
    }
  });
```

## 6.从 JS 引擎理解 Await b() 与 Promise.then(b) 的堆栈处理

与直接使用 `Promise` 相比，使用 `Async/Await` 不仅可以提高代码的可读性，同时也可以优化 JavaScript 引擎的执行方式。这篇博客将介绍 `Async/Await` 是如何优化 JavaScript 引擎对堆栈信息的处理。

`Async/Await` 与 `Promise` 最大区别在于：`await b()` 会暂停所在的 `async` 函数的执行；而 `Promise.then(b)` 将 b 函数加入回调链中之后，会继续执行当前函数。对于堆栈来说，这个不同点非常关键。

当一个 `Promise` 链抛出一个未处理的错误时，无论我们使用 `await b()` 还是 `Promise.then(b)`，JavaScript 引擎都需要打印错误信息及其堆栈。对于 JavaScript 引擎来说，两者获取堆栈的方式是不同的。

### 6.1 Promise.then(b)

示例代码中，函数 `c()` 会在异步函数 `b()` 成功 `resolve` 之后执行：

```javascript
const a = () => {
  b().then(() => c());
};
```

当调用 `a()` 函数时，这些事情同步发生：

- `b()` 函数被调用，它会返回一个 `Promise`，这个 `Promise` 会在未来的某个时刻 `resolve`。
- `.then()` 回调函数(实际调用了 `c()` 函数)被添加到回调链。

这样，`a()` 函数内的代码就执行完了。`a()` 函数不会被暂停，因此在异步函数 `b()resolve` 时，`a()` 函数的作用域已经不存在了。假设 `b()` 或者 `c()` 抛出了一个错误，则堆栈信息中应该包含 `a()` 函数，因为它们都是在 `a()` 函数内被调用。对 `a()` 函数的任何引用都不存在了，要如何生成包含 `a()` 的堆栈信息呢？

为了解决这个问题，JavaScript 引擎需要做一些额外的工作：它会及时记录并且保存堆栈信息。对于 V8 引擎来说，堆栈信息附加在了 `b()` 函数所返回的 `Promise` 并在 `Promise` 链中传递，这样 `c()` 函数也能在需要的时候获取堆栈信息。

记录堆栈信息需要时间，这样会降低性能；而保存堆栈信息需要占用额外的内存。

### 6.2 Await b()

我们可以使用 `Async/Await` 实现同样的代码，同步函数 `c()` 会等到异步函数 `b()` 执行结束之后再执行：

```javascript
const a = async () => {
  await b();
  c();
};
```

使用 `await` 时，无需存储当前的堆栈信息，因为存储 `b()` 到 `a()` 的指针就足够了。当等待 `b()` 函数执行时，`a()` 函数被暂停了，因此 `a()` 函数的作用域还在内存可以访问。如果 `b()` 函数抛出一个错误，堆栈信息可以通过指针迅速生成。如果 `c()` 函数抛出一个错误，堆栈信息也可以像同步函数一样生成，因为 `c()` 函数是在 `a()` 函数中执行的。不论是 `b()` 还是 `c()`，我们都不需要去存储堆栈信息，因为堆栈信息可以在需要的时候立即生成。而存储指针，显然比存储堆栈更加节省内存。

### 6.3 建议

很多 ECMAScript 语法特性看起来都只是语法糖，其实并非如此，至少 `Async/Await` 绝不仅仅只是语法糖。

为了让 JavaScript 引擎处理堆栈的方式性能更高并且更加节省内存，请遵循这些建议：

- 使用 `Async/Await`，而不是直接使用 `Promise`
- 使用 `babel-preset-env`，避免 `Babel` 不必要地转换 `Async/Await`

尽管 V8 引擎还没有实现这些优化，请遵循这些建议。当我们为 V8 实现这些优化的时候，你的程序可以保证最佳的性能。(作者是 V8 引擎的开发者)

一般来说，尽量不要去使用 Babel 转码器。所有支持 [Service Workers](https://caniuse.com/#) 的浏览器都支持 `Async/Await`，因此没有必要去对 `Async/Await` 转码。这一点对于 [JavaScript modules via script tag](https://caniuse.com/#feat=es6-module) 同样适用。关于这一点，大家可以参考[Deploying ES2015+ Code in Production Today](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/)。

参考：

[JavaScript 错误和一般处理](https://www.infoq.cn/article/cQQKlPyjLsLwv_BQt9y0)

[Exceptional Exception Handling in JavaScript](https://www.sitepoint.com/exceptional-exception-handling-in-javascript/)

[解读 JavaScript 之引擎、运行时和堆栈调用](https://www.oschina.net/translate/how-does-javascript-actually-work-part-1?print)

[How JavaScript works: an overview of the engine, the runtime, and the call stack](https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf)

[前端开发中 js 代码异常处理及监控](https://www.haorooms.com/post/js_qd_error)

[JavaScript Errors and Stack Traces in Depth](https://lucasfcosta.com/2017/02/17/JavaScript-Errors-and-Stack-Traces.html?utm_source=javascriptweekly&utm_medium=email)

[JavaScript 中错误堆栈处理](https://www.ctolib.com/topics-115283.html)

[JavaScript 中错误堆栈处理](https://github.com/dt-fe/weekly/issues/9)

[Callback Promise Generator Async-Await 和异常处理的演进](https://github.com/ascoders/blog/issues/14)

[深入理解 JavaScript 错误和堆栈追踪](https://w3ctech.com/topic/1997)

[JavaScript 错误处理和堆栈追踪](https://github.com/dwqs/blog/issues/49)

[捕获页面中全局 Javascript 异常](https://foio.github.io/javascript-global-exceptions/)

[从 JS 引擎理解 Await b() 与 Promise.then(b) 的堆栈处理](https://blog.fundebug.com/2018/07/18/javascript-engine-await-promise/)

[显示 javascript 的异常堆栈( show javascript exception stack)](http://siwei.me/blog/posts/javascript-show-javascript-exception-stack)

[异常和错误处理](https://www.css88.com/doc/chrome-devtools/console/track-exceptions/)

[你不知道的 JS 错误和调用栈常识](https://zhuanlan.zhihu.com/p/25644447?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)
