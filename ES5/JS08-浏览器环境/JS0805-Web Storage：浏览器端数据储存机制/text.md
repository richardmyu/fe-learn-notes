# Web Storage：浏览器端数据储存机制

## 1.概述

这个 API 的作用是，使得网页可以在浏览器端储存数据。它分成两类：`sessionStorage` 和 `localStorage`。

`sessionStorage` 保存的数据用于浏览器的一次会话，当会话结束（通常是该窗口关闭），数据被清空；`localStorage` 保存的数据长期存在，下一次访问该网站的时候，网页可以直接读取以前保存的数据。除了保存期限的长短不同，这两个对象的属性和方法完全一样。它们很像 `cookie` 机制的强化版，能够动用大得多的存储空间。

> 目前，每个域名的存储上限视浏览器而定，Chrome 是 2.5MB，Firefox 和 Opera 是 5MB，IE 是 10MB。其中，Firefox 的存储空间由一级域名决定，而其他浏览器没有这个限制。也就是说，在 Firefox 中，`a.example.com` 和 `b.example.com` 共享 5MB 的存储空间。
> 另外，与 `Cookie` 一样，它们也受同域限制。某个网页存入的数据，只有同域下的网页才能读取。

通过检查 `window` 对象是否包含 `sessionStorage` 和 `localStorage` 属性，可以确定浏览器是否支持这两个对象。

```js
function checkStorageSupport() {
  // sessionStorage
  if (window.sessionStorage) {
    return true;
  } else {
    return false;
  }

  // localStorage
  if (window.localStorage) {
    return true;
  } else {
    return false;
  }
}
```

## 2.操作方法

### 2.1.存入/读取数据

`sessionStorage` 和 `localStorage` 保存的数据，都以“键值对”的形式存在。也就是说，每一项数据都有一个键名和对应的值。所有的数据都是以文本格式保存。

存入数据使用 `setItem` 方法。它接受两个参数，第一个是键名，第二个是保存的数据。

```js
sessionStorage.setItem("key", "value");
localStorage.setItem("key", "value");
```

读取数据使用 `getItem` 方法。它只有一个参数，就是键名。

```js
var valueSession = sessionStorage.getItem("key");
var valueLocal = localStorage.getItem("key");
```

### 2.2.清除数据

`removeItem` 方法用于清除某个键名对应的数据。

```js
sessionStorage.removeItem("key");
localStorage.removeItem("key");
```

`clear` 方法用于清除所有保存的数据。

```js
sessionStorage.clear();
localStorage.clear();
```

### 2.3.遍历操作

利用 `length` 属性和 `key` 方法，可以遍历所有的键。

```js
for (var i = 0; i < localStorage.length; i++) {
  console.log(localStorage.key(i));
}
```

其中的 `key` 方法，根据位置（从 0 开始）获得键值。

```js
localStorage.key(1);
```

## 3.`storage` 事件

当储存的数据发生变化时，会触发 `storage` 事件。我们可以指定这个事件的回调函数。

```js
window.addEventListener("storage",onStorageChange);
```

回调函数接受一个 `event` 对象作为参数。这个 `event` 对象的 `key` 属性，保存发生变化的键名。

```js
function onStorageChange(e) {
  console.log(e.key);
}
```

除了 `key` 属性，`event` 对象的属性还有三个：

- `oldValue`：更新前的值。如果该键为新增加，则这个属性为 `null`。
- `newValue`：更新后的值。如果该键被删除，则这个属性为 `null`。
- `url`：原始触发 `storage` 事件的那个网页的网址。

值得特别注意的是，该事件不在导致数据变化的当前页面触发。如果浏览器同时打开一个域名下面的多个页面，当其中的一个页面改变 `localStorage` 的数据时，其他所有页面的 `storage` 事件会被触发，而原始页面并不触发 `storage` 事件。可以通过这种机制，实现多个窗口之间的通信。所有浏览器之中，只有 IE 浏览器除外，它会在所有页面触发 `storage` 事件。
