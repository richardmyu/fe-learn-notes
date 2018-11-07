# javascript 面向对象编程

参考：

[Javascript面向对象编程（一）：封装]("http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html")
[Javascript面向对象编程（二）：构造函数的继承]("http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html")
[Javascript面向对象编程（三）：非构造函数的继承]("http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance_continued.html")

## 一.构造函数（Constructor）模式

所谓"构造函数"，其实就是一个普通函数，但是内部使用了 this 变量。对构造函数使用 new 运算符，就能生成实例，并且 this 变量会绑定在实例对象上。

```javascript
// this 指向
// new 构造
function Cat(name, color) {
  this.name = name;
  this.color = color;
}
let cat1 = new Cat("大毛", "黄色");
let cat2 = new Cat("二毛", "黑色");
console.dir(cat1);
console.log(cat2);
console.log("==constructor属性，指向它们的构造函数==");
console.log(cat1.constructor == Cat);
console.log(cat2.constructor === Cat);
console.log("==验证原型对象与实例对象之间的关系==");
console.log(cat1 instanceof Cat);
console.log(cat2 instanceof Cat);
```

看看 `console.dir(cat1)`

```javascript
// _ _proto_ _ 中 _ _ 实际没有空格
Cat
  - color: "黄色"
  - name: "大毛"
  - _ _proto_ _: Object
    - constructor: f Cat(name,color)
      - arguments: null
      - caller: null
      - length: 2
      - name: "Cat"
      - prototype: {constructor: f}
      - _ _proto_ _: f ()
      - [[FunctionLocation]]: xx.html:xx
      - [[Scopes]]: Scopes[2]
        - 0: Script {type: "script",name: "",object: {...}}
          - cat1:Cat {name: "大毛",color: "黄色"}
          - cat1:Cat {name: "二毛",color: "黑色"}
        - 1: Global {type: "global",name: "",object: Window}
    - _ _proto_ _: Object
      - constructor: f Object()
      - hasOwnProperty: f hasOwnProperty()
      - isPrototypeOf: f isPrototypeOf()
      - propertyIsEnumerable: f propertyIsEnumerable()
      - toLocaleString: f toLocaleString()
      - toString: f toString()
      - valueOf: f valueOf()
      ...
      - get _ _proto_ _: f _ _proto_ _()
      - set _ _proto_ _: f _ _proto_ _()
```

实例的 `__proto__` 属性指向构造函数的 prototype。定义在构造函数的 prototype 的方法和属性，为公有，所有实例都会继承并共享；而定义在构造函数上的属性和方法则为私有，实例会继承但不共享。

```javascript
console.log(cat1.__proto__); //{constructor: f}
console.log(Cat.prototype); //{constructor: f}
console.log(cat1.prototype); //undefined
console.log(Cat.prototype.constructor === cat1.constructor); //true
```

> 构造函数方法很好用，但是存在一个浪费内存的问题。

对于每一个实例对象，不变的属性和方法都是一模一样的内容，每一次生成一个实例，都必须为重复的内容，多占用一些内存。这样既不环保，也缺乏效率。

## 二.Prototype 模式

**Javascript 规定，每一个构造函数都有一个 prototype 属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。**

这意味着，我们可以把那些不变的属性和方法，直接定义在 prototype 对象上。这时所有实例的不变的属性和方法，其实都是同一个内存地址，指向 prototype 对象，因此就提高了运行效率。

## 三.Prototype 模式的验证方法

为了配合 prototype 属性，Javascript 定义了一些辅助方法，帮助我们使用它。

### 1.isPrototypeOf()

这个方法用来判断，某个 prototype 对象和某个实例之间的关系。

`console.log(Cat.prototype.isPrototypeOf(cat1)); //true`

`console.log(Cat.prototype.isPrototypeOf(cat2)); //true`

### 2.hasOwnProperty()

每个实例对象都有一个 `hasOwnProperty()` 方法，用来判断某一个属性到底是本地属性（私有属性），还是继承自 prototype 对象的属性（公有属性）。

`console.log(cat1.hasOwnProperty("name")); // true`

`console.log(cat1.hasOwnProperty("type")); // false`

### 3.in 运算符

in 运算符可以用来判断，某个实例是否含有某个属性，不管是不是本地属性（不论公有还是私有）。

`console.log("name" in cat1); // true`

`console.log("type" in cat1); // true`

in 运算符还可以用来遍历某个对象的所有属性。

```javascript
for (var prop in cat1) {
  console.log("cat1[" + prop + "]=" + cat1[prop]);
}
```

## 四.继承

```javascript
function Animal() {
  this.species = "动物";
}
function Cat(name, color) {
  this.name = name;
  this.color = color;
}
```

怎样才能使"猫"继承"动物"呢？

### 1.构造函数绑定

使用 call 或 apply 方法，将父对象的构造函数绑定在子对象上

```javascript
function Cat(name, color) {
  Animal.apply(this, arguments);
  this.name = name;
  this.color = color;
}

let cat = new Cat("大毛", "黄色");
console.log(cat.species); //动物
```

### 2.prototype 模式

```javascript
function Cat(name, color) {
  this.name = name;
  this.color = color;
}

// 相当于完全删除了prototype 对象原先的值，然后赋予一个新值
Cat.prototype = new Animal();
// 任何一个 prototype 对象都有一个 constructor 属性，指向它的构造函数
// 每一个实例也有一个 constructor 属性，默认调用 prototype 对象的 constructor 属性
// 这显然会导致继承链的紊乱，因此必须手动纠正，将 Cat.prototype 对象的 constructor 值改为 Cat。
Cat.prototype.constructor = Cat;

let cat = new Cat("大毛", "黄色");
console.log(cat.species); //动物
```

### 3.直接继承 prototype

第三种方法是对第二种方法的改进。由于 Animal 对象中，不变的属性都可以直接写入 `Animal.prototype`。所以，我们也可以让 `Cat()` 跳过 `Animal()`，直接继承 `Animal.prototype`。

```javascript
function Animal() {}
Animal.prototype.species = "动物";

function Cat(name, color) {
  this.name = name;
  this.color = color;
}

Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;

let cat = new Cat("大毛", "黄色");
console.log(cat.species); //动物
```

与前一种方法相比，这样做的优点是效率比较高（不用执行和建立 Animal 的实例了），比较省内存。缺点是 `Cat.prototype` 和 `Animal.prototype` 现在指向了同一个对象，那么任何对 `Cat.prototype` 的修改，都会反映到 `Animal.prototype`。

所以，上面这一段代码其实是有问题的。请看第二行

`Cat.prototype.constructor = Cat;`

这一句实际上把 `Animal.prototype` 对象的 constructor 属性也改掉了！

`alert(Animal.prototype.constructor); // Cat`

### 4.利用空对象作为中介

由于"直接继承 prototype"存在上述的缺点，所以就有第四种方法，利用一个空对象作为中介。

```javascript
function Animal() {}
Animal.prototype.species = "动物";

function Cat(name, color) {
  this.name = name;
  this.color = color;
}

let F = function() {};
F.prototype = Animal.prototype;
Cat.prototype = new F();
Cat.prototype.constructor = Cat;

let cat = new Cat("大毛", "黄色");
console.log(cat.species); //动物
```

F 是空对象，所以几乎不占内存。这时，修改 Cat 的 prototype 对象，就不会影响到 Animal 的 prototype 对象。

我们将上面的方法，封装成一个函数，便于使用。

```javascript
function extend(Child, Parent) {
  var F = function() {};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.prototype.constructor = Child;
  Child.uber = Parent.prototype;
}
```

使用的时候，方法如下

```javascript
extend(Cat, Animal);
let cat = new Cat("大毛", "黄色");
console.log(cat.species); //动物
```

这个 extend 函数，就是 YUI 库如何实现继承的方法。

另外，说明一点，函数体最后一行

`Child.uber = Parent.prototype;`

意思是为子对象设一个 uber 属性，这个属性直接指向父对象的 prototype 属性。（uber 是一个德语词，意思是"向上"、"上一层"。）这等于在子对象上打开一条通道，可以直接调用父对象的方法。这一行放在这里，只是为了实现继承的完备性，纯属备用性质。

### 5.拷贝继承

上面是采用 prototype 对象，实现继承。我们也可以换一种思路，纯粹采用"拷贝"方法实现继承。简单说，如果把父对象的所有属性和方法，拷贝进子对象，不也能够实现继承吗？这样我们就有了第五种方法。

```javascript
function extend(Child, Parent) {
  var F = function() {};
  let p = Parent.prototype;
  let c = Child.prototype;
  for (let i in p) {
    c[i] = p[i];
  }
  c.uber = p;
}

extend(Cat, Animal);
let cat = new Cat("大毛", "黄色");
console.log(cat.species); //动物
```

### 6.非构造函数的继承

这两个对象都是普通对象，不是构造函数，无法使用构造函数方法实现"继承"。

```javascript
let Chinese = {
  nation: "中国"
};
let Doctor = {
  career: "医生"
};
```

#### 6.1 object()方法

json 格式的发明人 Douglas Crockford，提出了一个 `object()` 函数

```javascript
// 就是把子对象的 prototype 属性，指向父对象，从而使得子对象与父对象连在一起
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

// 先在父对象的基础上，生成子对象
let Doctor = object(Chinese);
// 加上子对象本身的属性
Doctor.career = "医生";
// 子对象已经继承了父对象的属性
console.log(Doctor.nation);
```

### 6.2 浅拷贝

除了使用"prototype 链"以外，还有另一种思路：把父对象的属性，全部拷贝给子对象，也能实现继承。

```javascript
function extendCopy(p) {
  let c = {};
  for (let i in p) {
    c[i] = p[i];
  }
  c.uber = p;
  return c;
}
let Doctor = extendCopy(Chinese);
Doctor.career = "医生";
console.log(Doctor.nation);
```

但是，这样的拷贝有一个问题。那就是，如果父对象的属性等于数组或另一个对象，那么实际上，子对象获得的只是一个内存地址，而不是真正拷贝，因此存在父对象被篡改的可能。

```javascript
Chinese.birthPlaces = ["北京", "上海"];
let Doctor = extendCopy(Chinese);
Doctor.birthPlaces.push("厦门");
console.log(Chinese.birthPlaces); //["北京", "上海","厦门"]
console.log(Doctor.birthPlaces); //["北京", "上海","厦门"]
```

所以，`extendCopy()` 只是拷贝基本类型的数据，我们把这种拷贝叫做"浅拷贝"。这是早期 jQuery 实现继承的方式。

### 6.3 深拷贝

所谓"深拷贝"，就是能够实现真正意义上的数组和对象的拷贝。它的实现并不难，只要递归调用"浅拷贝"就行了。

```javascript
function deepCopy(p, c = {}) {
  for (let i in p) {
    if (typeof p[i] === "object" && p[i] !== null) {
      c[i] = p[i].constructor === Array ? [] : {};
      deepCopy(p[i], c[i]);
    } else {
      c[i] = p[i];
    }
  }
  return c;
}
Chinese.birthPlaces = ["北京", "上海"];
let Doctor = deepCopy(Chinese);
Doctor.birthPlaces.push("厦门");
console.log(Chinese.birthPlaces); //["北京", "上海"]
console.log(Doctor.birthPlaces); //["北京", "上海","厦门"]
```

目前，jQuery 库使用的就是这种继承方法。
