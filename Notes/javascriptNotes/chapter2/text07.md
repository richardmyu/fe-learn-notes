#### 9.6.元属性

属性描述对象的各个属性称为“**元属性**”，因为它们可以看作是控制属性的属性。

##### 9.6.1 value

`value`属性是目标属性的值。

```javascript
var obj = {};
obj.p = 123;

Object.getOwnPropertyDescriptor(obj, "p").value;
// 123

Object.defineProperty(obj, "p", { value: 246 });
obj.p; // 246
```

##### 9.6.2 writable

`writable`属性是一个布尔值，决定了目标属性的值是否可以被改变。

```javascript
var obj = {};

Object.defineProperty(obj, "a", {
  value: 37,
  writable: false
});

obj.a; // 37
obj.a = 25;
obj.a; // 37
```

注意，正常模式下，对`writable`为 false 的属性赋值不会报错，只会默默失败。但是，严格模式下会报错，即使对 a 属性重新赋予一个同样的值。

```javascript
"use strict";
var obj = {};

Object.defineProperty(obj, "a", {
  value: 37,
  writable: false
});

obj.a = 37;
// Uncaught TypeError: Cannot assign to read only property 'a' of object
```

如果原型对象的某个属性的`writable`为 false，那么子对象将无法自定义这个属性。

```javascript
var proto = Object.defineProperty({}, "foo", {
  value: "a",
  writable: false
});

var obj = Object.create(proto);

obj.foo = "b";
obj.foo; // 'a'
```

上面代码中，proto 是原型对象，它的 foo 属性不可写。obj 对象继承 proto，也不可以再自定义这个属性了。如果是严格模式，这样做还会抛出一个错误。

但是，有一个规避方法，就是通过覆盖属性描述对象，绕过这个限制。原因是这种情况下，原型链会被完全忽视。

```javascript
var proto = Object.defineProperty({}, "foo", {
  value: "a",
  writable: false
});

var obj = Object.create(proto);
Object.defineProperty(obj, "foo", {
  value: "b"
});

obj.foo; // "b"
```

##### 9.6.3 enumerable

`enumerable`（可遍历性）返回一个布尔值，表示目标属性是否可遍历。

JavaScript 的早期版本，`for...in`循环是基于`in`运算符的。我们知道，`in`运算符不管某个属性是对象自身的还是继承的，都会返回 true。

```javascript
var obj = {};
"toString" in obj; // true
```

这显然不太合理，后来就引入了“可遍历性”这个概念。只有可遍历的属性，才会被`for...in`循环遍历，同时还规定`toString`这一类实例对象继承的原生属性，都是不可遍历的，这样就保证了`for...in`循环的可用性。

具体来说，如果一个属性的`enumerable`为 false，下面三个操作不会取到该属性。

---

- `for..in`循环
- `Object.keys`方法
- `JSON.stringify`方法

---

因此，`enumerable`可以用来设置“秘密”属性。

```javascript
var obj = {};

Object.defineProperty(obj, "x", {
  value: 123,
  enumerable: false
});

obj.x; // 123

let count = 0;
for (var key in obj) {
  count++;
  console.log("key " + "[" + key + "]");
}

console.log(count); // 0
// 没有可遍历属性时，基本就是没有执行

Object.keys(obj); // []
JSON.stringify(obj); // "{}"
```

上面代码中，obj.x 属性的`enumerable`为 false，所以一般的遍历操作都无法获取该属性，使得它有点像“秘密”属性，但不是真正的私有属性，还是可以直接获取它的值。

> 注意，获取可遍历属性中，`for...in`循环包括继承的属性，`Object.keys`方法不包括继承的属性。如果需要获取对象自身的所有属性，不管是否可遍历，可以使用`Object.getOwnPropertyNames`方法。

另外，`JSON.stringify`方法会排除`enumerable`为 false 的属性，有时可以利用这一点。如果对象的 `JSON` 格式输出要排除某些属性，就可以把这些属性的`enumerable`设为 false。

##### 9.6.4 configurable

`configurable`(可配置性）返回一个布尔值，决定了是否可以修改属性描述对象。也就是说，`configurable`为 false 时，`writable`、`enumerable`和`configurable`都不能被修改了。

```javascript
var obj = Object.defineProperty({}, "p", {
  value: 1,
  writable: false,
  enumerable: false,
  configurable: false
});

Object.defineProperty(obj, "p", { value: 2 });
// TypeError: Cannot redefine property: p

Object.defineProperty(obj, "p", { writable: true });
// TypeError: Cannot redefine property: p

Object.defineProperty(obj, "p", { enumerable: true });
// TypeError: Cannot redefine property: p

Object.defineProperty(obj, "p", { configurable: true });
// TypeError: Cannot redefine property: p
```

注意，`writable`只有在 false 改为 true 会报错，true 改为 false 是允许的。

```javascript
var obj = Object.defineProperty({}, "p", {
  writable: true,
  configurable: false
});

Object.defineProperty(obj, "p", { writable: false });
// 修改成功
```

至于`value`，只要`writable`和`configurable`有一个为 true，就允许改动。

```javascript
var o1 = Object.defineProperty({}, "p", {
  value: 1,
  writable: true,
  configurable: false
});

Object.defineProperty(o1, "p", { value: 2 });
// 修改成功

var o2 = Object.defineProperty({}, "p", {
  value: 1,
  writable: false,
  configurable: true
});

Object.defineProperty(o2, "p", { value: 2 });
// 修改成功
```

另外，`configurable`为 false 时，直接目标属性赋值，不报错，但不会成功。如果是严格模式，还会报错。

```javascript
var obj = Object.defineProperty({}, "p", {
  value: 1,
  configurable: false
});

obj.p = 2;
obj.p; // 1
```

可配置性决定了目标属性是否可以被删除（`delete`）。

```javascript
var obj = Object.defineProperties(
  {},
  {
    p1: { value: 1, configurable: true },
    p2: { value: 2, configurable: false }
  }
);

delete obj.p1; // true
delete obj.p2; // false

obj.p1; // undefined
obj.p2; // 2
```

#### 9.7.存取器

除了直接定义以外，属性还可以用**存取器（accessor）**定义。其中，存值函数称为`setter`，使用属性描述对象的`set`属性；取值函数称为`getter`，使用属性描述对象的`get`属性。

一旦对目标属性定义了存取器，那么存取的时候，都将执行对应的函数。利用这个功能，可以实现许多高级特性，比如某个属性禁止赋值。

```javascript
var obj = Object.defineProperty({}, "p", {
  get: function() {
    return "getter";
  },
  set: function(value) {
    console.log("setter: " + value);
  }
});

obj.p; // "getter"
obj.p = 123; // "setter: 123"
```

JavaScript 还提供了存取器的另一种写法。

```javascript
var obj = {
  get p() {
    return "getter";
  },
  set p(value) {
    console.log("setter: " + value);
  }
};
```

上面的写法与定义属性描述对象是等价的，而且使用更广泛。

> 注意，取值函数`get`不能接受参数，存值函数`set`只能接受一个参数（即属性的值）。

存取器往往用于，属性的值依赖对象内部数据的场合。

```javascript
var obj = {
  $n: 5,
  get next() {
    return this.$n;
  },
  set next(n) {
    if (n >= this.$n) {
      this.$n = n;
    } else {
      throw new Error("新的值必须大于当前值");
    }
  }
};

obj.next; // 5

obj.next = 10;
obj.next; // 10

obj.next = 5;
// Uncaught Error: 新的值必须大于当前值
```

#### 9.8.对象的拷贝

有时，我们需要将一个对象的所有属性，拷贝到另一个对象，可以用下面的方法实现。

```javascript
var extend = function(to, from) {
  for (var property in from) {
    to[property] = from[property];
  }
  return to;
};

extend(
  {},
  {
    a: 1
  }
);
// {a: 1}
```

上面这个方法的问题在于，如果遇到存取器定义的属性，会只拷贝值。

```javascript
extend(
  {},
  {
    get a() {
      return 1;
    }
  }
);
// {a: 1}
```

为了解决这个问题，我们可以通过`Object.defineProperty`方法来拷贝属性。

```javascript
var extend = function(to, from) {
  for (var property in from) {
    if (!from.hasOwnProperty(property)) continue;
    //将私有属性 “定义” to对象上
    Object.defineProperty(
      to,
      property,
      Object.getOwnPropertyDescriptor(from, property)
    );
  }

  return to;
};

//Object.keys
var extend = function(to, from) {
  Object.keys(from).forEach(item => {
    Object.defineProperty(
      to,
      item,
      Object.getOwnPropertyDescriptor(from, item)
    );
  });

  return to;
};

extend(
  {},
  {
    get a() {
      return 1;
    }
  }
);
// { get a(){ return 1 } })
```

> 注意，`hasOwnProperty`那一行用来过滤掉继承的属性，否则会报错，因为`Object.getOwnPropertyDescriptor`读不到继承属性的属性描述对象。
