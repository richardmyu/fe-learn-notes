# Proxy

## 1.概述

Proxy 对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）

- `handler`

包含陷阱（traps）的占位符对象。

- `traps`

提供属性访问的方法。这类似于操作系统中捕获器的概念。

- `target`

代理虚拟化的对象。它通常用作代理的存储后端。根据目标验证关于对象不可扩展性或不可配置属性的不变量（保持不变的语义）。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“**代理器**”。

ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。

`var proxy = new Proxy(target, handler);`

Proxy 对象的所有用法，都是上面这种形式，不同的只是 handler 参数的写法。其中，`new Proxy()` 表示生成一个 Proxy 实例，target 参数表示所要拦截的目标对象，handler 参数也是一个对象，用来定制拦截行为。

```js
var proxy = new Proxy(
  {},
  {
    get: function(target, property) {
      return 35;
    }
  }
);

proxy.time; // 35
proxy.name; // 35
proxy.title; // 35
```

注意，要使得 Proxy 起作用，必须针对 Proxy 实例（上例是 proxy 对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。

如果 handler 没有设置任何拦截，那就等同于直接通向原对象。

```js
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = "b";
target.a; // "b"
```

一个技巧是将 Proxy 对象，设置到 `object.proxy` 属性，从而可以在 object 对象上调用。

`var object = { proxy: new Proxy(target, handler) };`

Proxy 实例也可以作为其他对象的原型对象。

```js
var proxy = new Proxy(
  {},
  {
    get: function(target, property) {
      return 35;
    }
  }
);

let obj = Object.create(proxy);
obj.time; // 35
```

同一个拦截器函数，可以设置拦截多个操作。

```js
var handler = {
  get: function(target, name) {
    if (name === "prototype") {
      return Object.prototype;
    }
    return "Hello, " + name;
  },

  apply: function(target, thisBinding, args) {
    return args[0];
  },

  construct: function(target, args) {
    return { value: args[1] };
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2); // 1
new fproxy(1, 2); // {value: 2}
fproxy.prototype === Object.prototype; // true
fproxy.foo === "Hello, foo"; // true
```

下面是 Proxy 支持的拦截操作一览，一共 13 种。

- get(target, propKey, receiver)：拦截对象属性的读取，比如 proxy.foo 和 proxy['foo']。
  >
- set(target, propKey, value, receiver)：拦截对象属性的设置，比如 proxy.foo = v 或 proxy['foo'] = v，返回一个布尔值。
  >
- has(target, propKey)：拦截 propKey in proxy 的操作，返回一个布尔值。
  >
- deleteProperty(target, propKey)：拦截 delete proxy[propKey]的操作，返回一个布尔值。
  >
- ownKeys(target)：拦截 Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in 循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
  >
- getOwnPropertyDescriptor(target, propKey)：拦截 Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
  >
- defineProperty(target, propKey, propDesc)：拦截 Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
  >
- preventExtensions(target)：拦截 Object.preventExtensions(proxy)，返回一个布尔值。
  >
- getPrototypeOf(target)：拦截 Object.getPrototypeOf(proxy)，返回一个对象。
  >
- isExtensible(target)：拦截 Object.isExtensible(proxy)，返回一个布尔值。
  >
- setPrototypeOf(target, proto)：拦截 Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
  >
- apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
  >
- construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如 new proxy(...args)。

## 2.Proxy 实例的方法

## 3.Proxy.revocable()

## 4.this 问题

## 5.实例：Web 服务的客户端
