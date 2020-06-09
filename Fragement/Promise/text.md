# Promise

Promise 是一个对象，它代表了一个异步操作的最终完成或者失败。本质上 Promise 是一个函数返回的对象，我们可以在它上面绑定回调函数，这样我们就不需要在一开始把回调函数作为参数传入这个函数了。

以下为使用 `createImageFileAsync()` 的示例：

```js
// 成功的回调函数
function successCallback(result) {
  console.log("文件创建成功: " + result);
}

// 失败的回调函数
function failureCallback(error) {
  console.log("文件创建失败: " + error);
}

// 接收一些配置和两个回调函数，然后异步地生成文件
createImageFileAsync(imageSettings, successCallback, failureCallback)
```

更现代的函数会返回一个 promise 对象，使得你可以将你的回调函数绑定在该 promise 上。

如果函数 `createImageFileAsync()` 被重写为返回 promise 的形式，那么我们可以像下面这样简单地调用它：

```js
const promise = createImageFileAsync(imageSettings);
promise.then(successCallback, failureCallback);

// 或者简写为：
createImageFileAsync(imageSettings).then(successCallback, failureCallback);
```

> demo: [demo/test01.js](./demo/test01.js)

参考：

1.[使用 Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)

2.[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

3.[Promise原理浅析](https://imweb.io/topic/565af932bb6a753a136242b0)
