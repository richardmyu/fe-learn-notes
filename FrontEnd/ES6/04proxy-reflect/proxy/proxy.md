# Proxy

## 1.概述

Proxy 对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。roxy 本质上属于元编程非破坏性数据劫持，在原对象的基础上进行了功能的衍生而又不影响原对象，符合松耦合高内聚的设计理念。通俗的说 Proxy 在数据外层套了个壳，然后通过这层壳访问内部的数据。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“**代理器**”。

ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。

`var proxy = new Proxy(target, handler);`

Proxy 对象的所有用法，都是上面这种形式，不同的只是 handler 参数的写法。其中，`new Proxy()` 表示生成一个 Proxy 实例，target 参数表示所要拦截的目标对象，handler 参数也是一个对象，用来定制拦截行为，proxy 是一个被代理后的新对象,它拥有 target 的一切属性和方法.只不过其行为和结果是在 handler 中自定义的。

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

- `get(target, propKey, receiver)`：
  >
  - 拦截对象属性的读取
    >
- `set(target, propKey, value, receiver)`：
  >
  - 拦截对象属性的设置，返回一个布尔值。
    >
- `has(target, propKey)`：
  >
  - 拦截 propKey in proxy 的操作，返回一个布尔值。
    >
- `deleteProperty(target, propKey)`：
  >
  - 拦截 `delete proxy[propKey]` 的操作，返回一个布尔值。
    >
- `ownKeys(target)`：
  >
  - 拦截 `Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、for...in 循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 `Object.keys()`的返回结果仅包括目标对象自身的可遍历属性。
    >
- `getOwnPropertyDescriptor(target, propKey)`：
  >
  - 拦截 `Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。
    >
- `defineProperty(target, propKey, propDesc)`：
  >
  - 拦截 `Object.defineProperty(proxy, propKey, propDesc)`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。
    >
- `preventExtensions(target)`：
  >
  - 拦截 `Object.preventExtensions(proxy)`，返回一个布尔值。
    >
- `getPrototypeOf(target)`：
  >
  - 拦截 `Object.getPrototypeOf(proxy)`，返回一个对象。
    >
- `isExtensible(target)`：
  >
  - 拦截 `Object.isExtensible(proxy)`，返回一个布尔值。
    >
- `setPrototypeOf(target, proto)`：
  >
  - 拦截 `Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
    >
- `apply(target, object, args)`：
  >
  - 拦截 Proxy 实例作为函数调用的操作，比如 `proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。
    >
- `construct(target, args)`：
  >
  - 拦截 Proxy 实例作为构造函数调用的操作，比如 `new proxy(...args)`。

## 2.Proxy 实例的方法

### 2.1.get()

get 方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。

```js
var person = {
  name: "张三"
};

var proxy = new Proxy(person, {
  get: function(target, property) {
    if (property in target) {
      return target[property];
    } else {
      throw new ReferenceError('Property "' + property + '" does not exist.');
    }
  }
});

proxy.name; // "张三"
proxy.age; // 抛出一个错误
```

### 2.2.set()

set 方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。

使用 Proxy 实现表单校验

```js
let person = {
  name: "xiaoming",
  age: 30
};
let handler = {
  set(target, key, value, receiver) {
    if (key === "name" && typeof value !== "string") {
      throw new Error("用户姓名必须是字符串类型");
    }
    if (key === "age" && typeof value !== "number") {
      throw new Error("用户年龄必须是数字类型");
    }
    return Reflect.set(target, key, value, receiver);
  }
};
let boy = new Proxy(person, handler);
boy.name = "xiaohong"; // OK
boy.age = "18"; // 报错  用户年龄必须是数字类型
```

## 3.Proxy.revocable()

Proxy.revocable 方法返回一个可取消的 Proxy 实例。

```js
let target = {};
let handler = {};

let { proxy, revoke } = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo; // 123

revoke();
proxy.foo; // TypeError: Revoked
```

Proxy.revocable 方法返回一个对象，该对象的 proxy 属性是 Proxy 实例，revoke 属性是一个函数，可以取消 Proxy 实例。当执行 revoke 函数之后，再访问 Proxy 实例，就会抛出一个错误。

Proxy.revocable 的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。

## 4.this 问题

虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的 this 关键字会指向 Proxy 代理。

```js
const target = {
  m() {
    console.log(this === proxy);
  }
};
const handler = {};

const proxy = new Proxy(target, handler);

target.m(); // false
proxy.m(); // true
```

此外，有些原生对象的内部属性，只有通过正确的 this 才能拿到，所以 Proxy 也无法代理这些原生对象的属性。

```js
const target = new Date();
const handler = {};
const proxy = new Proxy(target, handler);

proxy.getDate();
// TypeError: this is not a Date object.

// this 绑定原始对象
const target = new Date("2015-01-01");
const handler = {
  get(target, prop) {
    if (prop === "getDate") {
      return target.getDate.bind(target);
    }
    return Reflect.get(target, prop);
  }
};
const proxy = new Proxy(target, handler);

proxy.getDate(); // 1
```

## 5.实例：Web 服务的客户端

Proxy 对象可以拦截目标对象的任意属性，这使得它很合适用来写 Web 服务的客户端。

```js
const service = createWebService("http://example.com/data");

service.employees().then(json => {
  const employees = JSON.parse(json);
  // ···
});
```

上面代码新建了一个 Web 服务的接口，这个接口返回各种数据。Proxy 可以拦截这个对象的任意属性，所以不用为每一种数据写一个适配方法，只要写一个 Proxy 拦截就可以了。

```js
function createWebService(baseUrl) {
  return new Proxy(
    {},
    {
      get(target, propKey, receiver) {
        return () => httpGet(baseUrl + "/" + propKey);
      }
    }
  );
}
```

同理，Proxy 也可以用来实现数据库的 ORM 层。
