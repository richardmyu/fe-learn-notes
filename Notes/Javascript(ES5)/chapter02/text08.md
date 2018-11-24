#### 9.9.控制对象状态

有时需要冻结对象的读写状态，防止对象被改变。JavaScript 提供了三种冻结方法，最弱的一种是`Object.preventExtensions`，其次是`Object.seal`，最强的是`Object.freeze`。

##### 9.9.1 Object.preventExtensions()

`Object.preventExtensions`方法可以使得一个对象无法再添加新的属性。

```javascript
var obj = new Object();
Object.preventExtensions(obj);

Object.defineProperty(obj, "p", {
  value: "hello"
});
// TypeError: Cannot define property:p, object is not extensible.

//不报错但无效；严格模式报错
obj.p = 1;
obj.p; // undefined
```

##### 9.9.2 Object.isExtensible()

`Object.isExtensible`方法用于检查一个对象是否使用了`Object.preventExtensions`方法。也就是说，检查是否可以为一个对象添加属性。

```javascript
var obj = new Object();

Object.isExtensible(obj); // true
Object.preventExtensions(obj);
Object.isExtensible(obj); // false
```

##### 9.9.3 Object.seal()

`Object.seal`方法使得一个对象既无法添加新属性，也无法删除旧属性。

```javascript
var obj = { p: "hello" };
Object.seal(obj);

delete obj.p;
obj.p; // "hello"

obj.x = "world";
obj.x; // undefined
```

`Object.seal`实质是把属性描述对象的`configurable`属性设为 false，因此属性描述对象不再能改变了。

```javascript
var obj = {
  p: "a"
};

// seal方法之前
Object.getOwnPropertyDescriptor(obj, "p");
// Object {
//   value: "a",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

Object.seal(obj);

// seal方法之后
Object.getOwnPropertyDescriptor(obj, "p");
// Object {
//   value: "a",
//   writable: true,
//   enumerable: true,
//   configurable: false
// }

Object.defineProperty(obj, "p", {
  enumerable: false
});
// TypeError: Cannot redefine property: p
```

上面代码中，使用`Object.seal`方法之后，属性描述对象的`configurable`属性就变成了 false，然后改变`enumerable`属性就会报错(将`writable`属性改为 false 不会报错)。

`Object.seal`只是禁止新增或删除属性，并不影响修改某个属性的值。是因为此时`p`属性的可写性由`writable`决定。

```javascript
var obj = { p: "a" };
Object.seal(obj);
obj.p = "b";
obj.p; // 'b'
```

##### 9.9.4 Object.isSealed()

`Object.isSealed`方法用于检查一个对象是否使用了`Object.seal`方法。

```javascript
var obj = { p: "a" };

Object.seal(obj);
Object.isSealed(obj); // true
```

这时，`Object.isExtensible`方法也返回 false。

```javascript
var obj = { p: 'a' };

Object.seal(obj);
Object.isExtensible(obj)； // false
```

##### 9.9.5 Object.freeze()

`Object.freeze`方法可以使得一个对象无法添加新属性、无法删除旧属性、也无法改变属性的值，使得这个对象实际上变成了常量。

```javascript
var obj = {
  p: "hello"
};

Object.freeze(obj);

//这些操作并不报错，只是默默地失败。如果在严格模式下，则会报错
obj.p = "world";
obj.p; // "hello"

obj.t = "hello";
obj.t; // undefined

delete obj.p; // false
obj.p; // "hello"
```

##### 9.9.6 Object.isFrozen()

`Object.isFrozen`方法用于检查一个对象是否使用了`Object.freeze`方法。

```javascript
var obj = {
  p: "hello"
};

Object.freeze(obj);
Object.isFrozen(obj); // true
```

> 使用`Object.freeze`方法以后，`Object.isSealed`将会返回 true，`Object.isExtensible`返回 false。

`Object.isFrozen`的一个用途是，确认某个对象没有被冻结后，再对它的属性赋值。

```javascript
var obj = {
  p: "hello"
};

Object.freeze(obj);

if (!Object.isFrozen(obj)) {
  obj.p = "world";
}
```

##### 9.9.7 局限性

上面的三个方法锁定对象的可写性有一个漏洞：可以通过改变原型对象，来为对象增加属性。

```javascript
var obj = new Object();
Object.preventExtensions(obj);

var proto = Object.getPrototypeOf(obj);
proto.t = "hello";
obj.t;
// hello
```

一种解决方案是，把 obj 的原型也冻结住。

```javascript
var obj = new Object();
Object.preventExtensions(obj);

var proto = Object.getPrototypeOf(obj);
Object.preventExtensions(proto);

proto.t = "hello";
obj.t; // undefined
```

另外一个局限是，如果属性值是对象，上面这些方法只能冻结属性指向的对象，而不能冻结对象本身的内容。

```javascript
var obj = {
  foo: 1,
  bar: ["a", "b"]
};
Object.freeze(obj);

obj.bar.push("c");
obj.bar; // ["a", "b", "c"]
```
