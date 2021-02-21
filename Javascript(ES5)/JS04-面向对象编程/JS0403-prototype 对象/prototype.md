### 3.prototype 对象

[TOC]

JavaScript 常被描述为一种基于原型的语言 (prototype-based language)——**每个对象拥有一个原型对象，对象以其原型为模板、从原型继承方法和属性**。

> 在 ES2015/ES6 中引入了 class 关键字，但那只是语法糖，JavaScript 仍然是基于原型的。

原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为**原型链 (prototype chain)**，它解释了为何一个对象会拥有定义在其他对象中的属性和方法。

> 准确地说，这些属性和方法定义在 Object 的 **构造函数(constructor functions)** 之上的 `prototype` 属性上，而非对象实例本身。

JavaScript 的原型链和 Java 的 `Class` 区别就在，它没有“Class”的概念，所有对象都是实例，所谓继承关系不过是把一个对象的原型指向另一个对象而已。

在传统的 OOP 中，首先定义“类”，此后创建对象实例时，类中定义的所有属性和方法都被复制到实例中。在 JavaScript 中并不如此复制——而是在对象实例和它的构造器之间建立一个链接（它是 `__proto__` 属性，是从构造函数的 `prototype` 属性派生的），之后通过上溯原型链，在构造器中找到这些属性和方法。

尽管这种原型继承通常被认为是 JavaScript 的弱点之一，但是原型继承模型本身实际上比经典模型更强大。例如，在原型模型的基础上构建经典模型相当简单。

#### 3.1.原型对象概述

##### 3.1.1 constructor

为了解决从原型对象生成实例的问题，Javascript 提供了一个**构造函数**（Constructor）模式。每个实例对象都从原型中继承了一个 `constructor` 属性，该属性指向了用于构造此实例对象的构造函数。

所谓"构造函数"，其实就是一个普通函数，但是内部使用了 `this` 变量。对构造函数使用 `new` 运算符，就能生成实例，并且 `this` 变量会绑定在实例对象上，同时实例会自动包含一个 `constructor` 属性。

`prototype` 对象有一个 `constructor` 属性，默认指向 `prototype` 对象所在的构造函数。

由于 `constructor` 属性定义在 `prototype` 对象上面，意味着可以被所有实例对象继承。

```javascript
function Foo() {}
var foo = new Foo();

foo.constructor === Foo; // true
foo.constructor === Foo.prototype.constructor; // true
Foo.prototype.constructor === Foo ; // true
foo.hasOwnProperty("constructor"); // false
```

`foo` 是构造函数 `Foo` 的实例对象，但是 **`foo` 自身没有 `constructor` 属性**，该属性其实是读取原型链上面的 `P.prototype.constructor` 属性。

`constructor` 属性的作用是，可以得知某个实例对象，到底是哪一个构造函数产生的。

```javascript
function F() {}
var f = new F();

f.constructor === F; // true
f.constructor === RegExp; // false
```

另一方面，有了 `constructor` 属性，就可以从一个实例对象新建另一个实例。

```javascript
function Constr() {}
var x = new Constr();

var y = new x.constructor();
y instanceof Constr; // true
```

这使得在实例方法中，调用自身的构造函数成为可能。

```javascript
Constr.prototype.createCopy = function() {
  return new this.constructor();
};
```

`constructor` 属性表示原型对象与构造函数之间的关联关系，如果修改了原型对象，一般会同时修改 `constructor` 属性，防止引用的时候出错。

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.constructor === Person; // true

Person.prototype = {
  method: function() {}
};

// 注意 constructor 属性是继承属性
// 所以修改原型以后，constructor 指向的时新的原型的构造函数

Person.prototype.constructor === Person; // false
Person.prototype.constructor === Object; // true
```

上面代码中，构造函数 `Person` 的原型对象改掉了，<s>但是没有修改 `constructor` 属性，导致这个属性不再指向 `Person`</s> 自然就丢失了原来的 `constructore` 的指向，从而被新原型的 `constructore` 指向所替代。

由于 Person 的新原型是一个普通对象，而普通对象的 `contructor` 属性指向 Object 构造函数，导致 `Person.prototype.constructor` 变成了 `Object`。

> 内置类的原型默认无法修改；只有浏览器默认开辟的堆内存才有 `constructor` 属性，若要修改地址（批量添加属性或方法），可以添加 `constructor：类`，引回原地址；

所以，修改原型对象时，一般要同时修改 `constructor` 属性的指向。

```javascript
// 坏的写法
C.prototype = {
  method1: function (...) { ... },
  // ...
};

// 好的写法
C.prototype = {
  constructor: C,
  method1: function (...) { ... },
  // ...
};

// 更好的写法（不改变原型）
C.prototype.method1 = function (...) { ... };
```

上面代码中，要么将 `constructor` 属性重新指向原来的构造函数，要么只在原型对象上添加方法，这样可以保证 `instanceof` 运算符不会失真。

如果不能确定 `constructor` 属性是什么函数，还有一个办法：通过 `name` 属性，从实例得到构造函数的名称。

```javascript
function Foo() {}
var f = new Foo();
// 构造函数的名称
f.constructor.name; // "Foo"
```

##### 3.1.2 构造函数的缺点

JavaScript 通过构造函数生成新对象，因此构造函数可以视为对象的模板。实例对象的属性和方法，可以定义在构造函数内部。

```javascript
function Cat(name, color) {
  this.name = name;
  this.color = color;
}

var cat = new Cat("大毛", "白色");

cat.name; // '大毛'
cat.color; // '白色'
```

通过构造函数为实例对象定义属性，虽然很方便，但是有一个缺点。**同一个构造函数的多个实例之间，无法共享属性**，从而造成对系统资源的浪费。

```javascript
function Cat(name, color) {
  this.name = name;
  this.color = color;
  this.meow = function() {
    console.log("喵喵");
  };
}

var cat1 = new Cat("大毛", "白色");
var cat2 = new Cat("二毛", "黑色");

cat1.meow === cat2.meow;
// false
```

由于 `meow` 方法是生成在每个实例对象上面，所以两个实例就生成了两次。也就是说，每新建一个实例，就会新建一个 `meow` 方法。这既没有必要，又浪费系统资源，因为所有 `meow` 方法都是同样的行为，完全应该共享。

构造函数方法很好用，但是存在一个浪费内存的问题 -- 即没有共享属性和方法，每次生成的实例的属性和方法都是私有的，这样就引入 `Prototype` 模式。

##### 3.1.3 prototype

**JavaScript 继承机制的设计思想就是，原型对象的所有属性和方法，都能被实例对象共享**。也就是说，如果属性和方法定义在原型上，那么所有实例对象就能共享，不仅节省了内存，还体现了实例对象之间的联系。

**Javascript 规定，每一个函数都有一个 `prototype` 属性**，指向另一个对象(即 `constructor`)。这个对象的所有属性和方法，都会被构造函数的实例继承。这意味着，我们可以把那些不变的属性和方法，直接定义在 `prototype` 对象上。

```javascript
function f() {}
typeof f.prototype; // "object"
```

对于普通函数来说，该属性基本无用。但是，对于构造函数来说，生成实例的时候，该属性会自动成为实例对象的原型。

```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.color = "white";

var cat1 = new Animal("大毛");
var cat2 = new Animal("二毛");

cat1.color; // 'white'
cat2.color; // 'white'
```

上面代码中，构造函数 Animal 的 `prototype` 属性，就是实例对象 cat1 和 cat2 的原型对象。原型对象上添加一个 color 属性，结果，实例对象都共享了该属性。

原型对象的属性不是实例对象自身的属性。只要修改原型对象，变动就立刻会体现在所有实例对象上。

```javascript
Animal.prototype.color = "yellow";

cat1.color; // "yellow"
cat2.color; // "yellow"
```

当实例对象本身没有某个属性或方法的时候，它会到原型对象去寻找该属性或方法（原型链）。这就是原型对象的特殊之处。

如果实例对象自身就有某个属性或方法，它就不会再去原型对象寻找这个属性或方法。

```javascript
cat1.color = "black";

cat1.color; // 'black'
cat2.color; // 'yellow'
Animal.prototype.color; // 'yellow';
```

总结一下，**原型对象的作用，就是定义所有实例对象共享的属性和方法**。这也是它被称为原型对象的原因，而实例对象可以视作从原型对象衍生出来的子对象。

```javascript
Animal.prototype.walk = function() {
  console.log(this.name + " is walking");
};
```

##### 3.1.4 `__proto__`

> 该特性已经从 Web 标准中删除，虽然一些浏览器目前仍然支持它，但也许会在未来的某个时间停止支持，请尽量不要使用该特性。

JavaScript 中任意对象都有一个内置属性 `[[prototype]]`，在 ES5 之前没有标准的方法访问这个内置属性，但是大多数浏览器都支持通过 `__proto__` 来访问。ES5 中有了对于这个内置属性标准的 Get 方法 `Object.getPrototypeOf()`。

> `__proto__`，可称为**隐式原型**，指向创建该对象的函数的 `prototype`。

使用 `__proto__` 是有争议的，也不鼓励使用它。因为它从来没有被包括在 EcmaScript 语言规范中，但是现代浏览器都实现了它。`__proto__` 属性已在 ECMAScript 6 语言规范中标准化，用于确保 Web 浏览器的兼容性，因此它未来将被支持。它已被不推荐使用, 现在更推荐使用 `Object.getPrototypeOf/Reflect.getPrototypeOf` 和 `Object.setPrototypeOf/Reflect.setPrototypeOf`（尽管如此，设置对象的 `[[Prototype]]` 是一个缓慢的操作，如果性能是一个问题，应该避免）。

`__proto__` 的设置器(setter)允许对象的 `[[Prototype]]` 被变更。前提是这个对象必须通过 `Object.isExtensible()` 判断为是可扩展的，如果不可扩展，则会抛出一个 `TypeError` 错误。要变更的值必须是一个 `object` 或 `null`，提供其它值将不起任何作用。

```js
foo.__proto__ === Foo.prototype; //true
Foo.__proto__ === Function.prototype; //true

// 内置对象(也是函数，除了 Math)的 __proto__ 都指向 Function.prototype
Object.__proto__ === Function.prototype; //true
Function.__proto__ === Function.prototype; //true

Symbol.__proto__ === Function.prototype; //true
Date.__proto__ === Function.prototype; //true
// typeof Math === 'object'
Math.__proto__ === Function.prototype; //false
Math.__proto__ === Object.prototype; //true

// 函数的 prototype 的 __proto__ 都指向 Object.prototype
Function.prototype.__proto__ === Object.prototype; //true
Foo.prototype.__proto__ === Object.prototype; //true

// Object 的 prototype 的 __proto__ 指向 null
Object.prototype.__proto__ === null; //true
```

![prototype-001](https://richyu.gitee.io/img_bed/doc/es5/prototype_01.png)

##### 3.1.5 原型链

JavaScript 规定，**所有对象都有自己的原型对象**。一方面，任何一个对象，都可以充当其他对象的原型；另一方面，由于原型对象也是对象，所以它也有自己的原型。如此层层递进，就构成了实例与原型的链条，就会形成一个**原型链（prototype chain）**。

> 简单回顾一下构造函数、原型和实例的关系：每一个构造函数 Function 都有一个原型对象 `prototype`，原型对象都包含一个指向构造函数的指针 `constructor`，而实例都包含一个指向原型对象的内部指针 `__proto__`。

如果一层层地上溯，所有对象的原型最终都可以上溯到 `Object.prototype`，即 `Object` 构造函数的 `prototype` 属性。也就是说，所有对象都继承了 `Object.prototype` 的属性。这就是所有对象都有 `valueOf` 和 `toString` 方法的原因，因为这是从 `Object.prototype` 继承的。

那么，`Object.prototype` 对象有没有它的原型呢？回答是 `Object.prototype` 的原型是 `null`。`null` 没有任何属性和方法，也没有自己的原型。因此，原型链的尽头就是 `null`。

`Object.getPrototypeOf(Object.prototype); // null`

```javascript
function SuperType() {
  this.property = true;
}

SuperType.prototype.getSuperValue = function() {
  return this.property;
};

function SubType() {
  this.subpropertype = false;
}

SubType.prototype.getSubValue = function() {
  return this.subproperty + "1";
};

SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function() {
  return this.subproperty + "2";
};

let instance = new SubType();

instance.getSubValue()); //undefined2
```

读取对象的某个属性时，JavaScript 引擎先寻找对象本身的属性，如果找不到，则通过 `__proto__` 到它的原型去找，如果还是找不到，就到原型的原型去找。如果直到最顶层的 `Object.prototype` 还是找不到，则返回 `undefined`。如果对象自身和它的原型，都定义了一个同名属性，那么优先读取对象自身的属性，这叫做**覆盖（overriding）**。

> 注意，一级级向上，在整个原型链上寻找某个属性，对性能是有影响的。所寻找的属性在越上层的原型对象，对性能的影响越大。如果寻找某个不存在的属性，将会遍历整个原型链。

举例来说，如果让构造函数的 `prototype` 属性指向一个数组，就意味着实例对象可以调用数组方法。

```javascript
var MyArray = function() {};

MyArray.prototype = new Array();
MyArray.prototype.constructor = MyArray;

var mine = new MyArray();
mine.push(1, 2, 3);
mine.length; // 3
mine instanceof Array; // true
```

#### 3.2.instanceof 运算符

`instanceof` 运算符返回一个布尔值，表示对象是否为某个构造函数的实例。

```javascript
var v = new Vehicle();
v instanceof Vehicle; // true
```

`instanceof` 运算符的左边是实例对象，右边是构造函数。原理是会检查右边构建函数的原型对象（`prototype`），是否在左边对象(通过 `__proto__`)的原型链上。因此，下面两种写法是等价的。

```javascript
v instanceof Vehicle;
// 等同于
Vehicle.prototype.isPrototypeOf(v);
```

由于 `instanceof` 检查整个原型链，因此同一个实例对象，可能会对多个构造函数都返回 true。

```javascript
var d = new Date();
d instanceof Date; // true
d instanceof Object; // true
```

有一种特殊情况，就是左边对象的原型链上，只有 `null` 对象。这时，`instanceof` 判断会失真。

```javascript
var obj = Object.create(null);
typeof obj; // "object"
obj instanceof Object; //false
obj instanceof null;
//TypeError: Right-hand side of 'instanceof' is not an object
```

上面代码中，`Object.create(null)` 返回一个新对象 obj，它的原型是 `null`。右边的构造函数 `Object` 的 `prototype` 属性，不在左边的原型链上，因此 `instanceof` 就认为 obj 不是 `Object` 的实例。但是，只要一个对象的原型不是`null`，`instanceof` 运算符的判断就不会失真。

`instanceof` 运算符的一个用处，是判断值的类型。

```javascript
var x = [1, 2, 3];
var y = {};
x instanceof Array; // true
y instanceof Object; // true
```

注意，`instanceof` 运算符只能用于对象，不适用原始类型的值。

```javascript
var s = "hello";
s instanceof String; // false
```

此外，对于 `undefined` 和 `null`，`instanceOf` 运算符总是返回 false。

```javascript
undefined instanceof Object; // false
null instanceof Object; // false
```

利用 `instanceof` 运算符，还可以巧妙地解决，调用构造函数时，忘了加 `new` 命令的问题。

```javascript
function Fubar(foo, bar) {
  if (this instanceof Fubar) {
    this._foo = foo;
    this._bar = bar;
  } else {
    return new Fubar(foo, bar);
  }
}
```

#### 3.3.继承

许多面向对象语言都支持两种继承方式：**接口继承**和**实现继承**。接口继承只继承方法签名，而实现继承则继承实际的方法。由于函数没有签名，所以无法实现接口继承，只支持实现继承，而且实现继承主要是依靠原型链来实现的。

大部分面向对象的编程语言，都是通过**类（class）**来实现对象的继承。JavaScript 语言的继承则是通过**原型对象（prototype）**。

##### 3.3.1.原型(链)继承

> [yum] 一句话，原型继承就是复制原型对象，并保留复制源信息。

原型继承是一种简化的继承机制，基于原型的编程是面向对象编程的一种特定的形式。实际上，JavaScript 就是一种基于原型的语言。

在原型继承中，类和实例概念就被淡化了，一切都从对象角度来考虑。所以直接定义对象，该对象被其他对象引用，这样就形成了一种【继承关系】，其中被引用对象就称之为**原型对象**，引用原型对象的对象称为**实例**。

> 基于原型的模型没有类的概念，原型继承中的类仅是一种模拟，从而不需要通过复制属性的方式进快速的实现继承。

我们需要创建的两个对象应该是相互独立的，显然，仅仅通过原型这样的方式会带来高耦合性的，在实际程序设计过程中单独使用原型模式来创建对象无疑会带来一些潜在的弊端，这也是面向对象程序设计理念“低耦合高复用”所不允许的。

```javascript
function Super() {
  this.property = true;
}

Super.prototype.getValue = function() {
  return this.property;
};

function Sub() {
  this.subProperty = false;
}

// 直接继承 Super，会丢失之前原型上的方法
Sub.prototype = new Super();

// 其他方法
// Object.assign(target,source) 方法只会拷贝源对象自身的并且可枚举的属性到目标对象,返回目标对象
//合并对象(只能获得 B 的私有变量，无法获得 B 的原型上的变量；但可以保留自身原来原型上的变量)；
Object.assign(A.prototype, new B());

//自定义 assign 方法；通过结合两者方法，使得实例可以获得两个类的私有属性和公有属性；
function assign(obj1, obj2) {
  for (var key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      obj1[key] = obj2[key];
    } else {
      obj1.__proto__[key] = obj2[key];
    }
  }
}
```

- **问题**
  >
  1. 引用类型值的原型属性会被所有实例共享；
  2. 创建子类型的实例时，不能向超类型的构造函数传递参数；

##### 3.3.2.构造函数继承

在解决原型包含引用类型值所带来的问题的过程中，开发人员开始使用一种叫作**借用构造函数**（constructor stealing）的技术，有时候也叫**伪造对象**或**经典继承**。这种技术的基本思想相当简单，即**在子类型构造函数的内部调用超类型构造函数**。

```javascript
function Super() {
  this.colors = ["red", "green", "blue"];
}

Super.prototype.getValue = function() {
  return this.colors;
};

function Sub(value) {
  // 在实例上调用父类的构造函数 Super，就会让子类实例具有父类实例的属性
  Super.call(this);
  this.prop = value;
}
```

- **缺点**：
  >
  1. 只能继承父类的实例属性和方法，不能继承原型属性/方法；
  2. 无法实现复用，每个子类都有父类实例函数的副本，影响性能；

##### 3.3.3.组合继承

组合上述两种方法就是**组合继承**（combination inheritance），也叫**伪经典继承**。**用原型链实现对原型属性和方法的继承，用借用构造函数技术来实现实例属性的继承**。

举例来说，下面是一个 Shape 构造函数。

```javascript
function Super(name) {
  this.name = name;
  this.colors = ["red", "green", "blue"];
}

Super.prototype.getName = function() {
  return this.name;
};

// 第一步，子类继承父类的实例
function Sub() {
  Super.call(this, '张三'); // 调用父类构造函数
}

// 另一种写法
function Sub() {
  this.base = Super;
  this.base();
}

// 第二步，子类继承父类的原型
Sub.prototype = new Super();
Sub.prototype.constructor = Sub;
```

采用这样的写法以后，`instanceof` 运算符会对子类和父类的构造函数，都返回 true。

```javascript
var sub = new Sub();
sub.getName(); // '张三'
sub instanceof Sub; // true
sub instanceof Super; // true
```

上面代码中，子类是整体继承父类。有时只需要单个方法的继承，这时可以采用下面的写法。

```javascript
ClassB.prototype.print = function() {
  ClassA.prototype.print.call(this);
  // some code
};
```

组合继承避免了原型链和构造函数的缺陷，融合了它们的优点，成为 JavaScript 中最常用的继承模式，而且， `instanceof` 和 `isPropertyOf()` 也能够用于识别基于组合继承创建的对象。

最大的问题是：无论什么情况下，都会调用两次超类型构造函数。第一次在子类型原型上添加属性，第二次在在调用子类型构造函数的时候，给子类型的实例添加同样的属性，这样就屏蔽了原型上的属性。解决这个问题，需要用到寄生组合式继承。

##### 3.3.4.原型式继承

> 构造一个构造函数，以实现从对象到对象继承。

利用一个空对象作为中介，将某个对象直接赋值给空对象构造函数的原型。

```js
function object(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
```

从本质上讲，`object()` 对传入其中的对象执行了一次浅复制，将构造函数 `F` 的原型直接指向传入的对象。

```js
var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = object(person);
// var anotherPerson = Object.create(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

alert(person.friends); //"Shelby,Court,Van,Rob,Barbie"
```

缺点：

- 原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
- 无法传递参数

另外，ES5 通过新增的 `Object.create()` 的方法规范了原型式继承。但是还是会像原型模式一样，引用类型值的属性始终都会共享相应的值。

##### 3.3.5.寄生式继承

寄生式（parasitic）继承是与原型式继承紧密相关的一种思路。寄生式继承的思路与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后返回对象。

```js
function createAnother(original) {
  var clone = object(original); // 通过调用函数创建一个新对象
  clone.sayHi = function() {
    // 以某种方式来增强对象
    alert("hi");
  };
  return clone; // 返回这个对象
}
```

函数的主要作用是为构造函数新增属性和方法，以增强函数

```js
var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //"hi"
```

在主要考虑对象而不是自定义类型和构造函数的情况下，寄生式继承也是一种有用的模式。

> 使用寄生式继承来为对象添加函数，会由于不能做到函数复用而降低效率，这一点和构造函数模式类似。

缺点（同原型式继承）：

- 原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
- 无法传递参数

##### 3.3.6.寄生组合式继承

所谓寄生组合式继承，即**通过借用构造函数来继承实例属性/方法，通过原型链的混成形式来继承原型属性/方法**。其背后的思路是：**不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本**。本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。

```js {.line-numbers}
function inheritPrototype(subType, superType) {
  var prototype = object(superType.prototype); // 创建对象，创建父类原型的一个副本
  prototype.constructor = subType; // 增强对象，弥补因重写原型而失去的默认的 constructor 属性
  subType.prototype = prototype; // 指定对象，将新创建的对象赋值给子类的原型
}

// 父类初始化实例属性和原型属性
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function() {
  alert(this.name);
};

// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

// 将父类原型指向子类
inheritPrototype(SubType, SuperType);

// 新增子类原型属性
SubType.prototype.sayAge = function() {
  alert(this.age);
};

var instance1 = new SubType("xyc", 23);
var instance2 = new SubType("lxy", 23);

instance1.colors.push("2"); // ["red", "blue", "green", "2"]
instance2.colors.push("3"); // ["red", "blue", "green", "3"]
```

这个例子的高效率体现在它只调用了一次 SuperType  构造函数，并且因此避免了在 `SubType.prototype` 上创建不必要的、多余的属性。于此同时，原型链还能保持不变；因此，还能够正常使用 `instanceof` 和 `isPrototypeOf()`。这是最成熟的方法，也是现在库实现的方法。

##### 3.3.7.多重继承

JavaScript 不提供多重继承功能，即不允许一个对象同时继承多个对象。但是，可以通过变通方法，实现这个功能。

```javascript
function M1() {
  this.hello = "hello";
}

function M2() {
  this.world = "world";
}

function S() {
  M1.call(this);
  M2.call(this);
}

// 继承 M1
S.prototype = Object.create(M1.prototype);

// 继承链上加入 M2
Object.assign(S.prototype, M2.prototype);

// 指定构造函数
S.prototype.constructor = S;

var s = new S();
s.hello; // 'hello'
s.world; // 'world'
```

这种模式又称为 **Mixin（混入）**。

![prototype-002](https://richyu.gitee.io/img_bed/doc/es5/prototype_02.png)

#### 3.4.模块

随着网站逐渐变成”互联网应用程序”，嵌入网页的 JavaScript 代码越来越庞大，越来越复杂。网页越来越像桌面程序，需要一个团队分工协作、进度管理、单元测试等等……开发者不得不使用软件工程的方法，管理网页的业务逻辑。

JavaScript 模块化编程，已经成为一个迫切的需求。理想情况下，开发者只需要实现核心的业务逻辑，其他都可以加载别人已经写好的模块。

但是，JavaScript 不是一种模块化编程语言，ES5 不支持”类”（class），更遑论”模块”（module）了。ES6 正式支持”类”和”模块”，但还没有成为主流。JavaScript 社区做了很多努力，在现有的运行环境中，实现模块的效果。

##### 3.4.1 基本的实现方法

**模块是实现特定功能的一组属性和方法的封装**。

只要把不同的函数（以及记录状态的变量）简单地放在一起，就算是一个模块。

```javascript
function m1() {
  //...
}
function m2() {
  //...
}
```

这种做法的缺点很明显：”污染”了全局变量，无法保证不与其他模块发生变量名冲突，而且模块成员之间看不出直接关系。

为了解决上面的缺点，可以把模块写成一个对象，所有的模块成员都放到这个对象里面。

```javascript
var module = new Object({
  _count: 0,
  m1: function() {
    //...
  },
  m2: function() {
    //...
  }
});
```

但是，这样的写法会暴露所有模块成员，内部状态可以被外部改写。

##### 3.4.2 封装私有变量：构造函数的写法

我们可以利用构造函数，封装私有变量。

```javascript
function StringBuilder() {
  var buffer = [];

  this.add = function(str) {
    buffer.push(str);
  };

  this.toString = function() {
    return buffer.join("");
  };
}
```

一旦生成实例对象，外部是无法直接访问 `buffer` 的。

但是，这种方法将私有变量封装在构造函数中，导致构造函数与实例对象是一体的，总是存在于内存之中，无法在使用完成后清除。这意味着，构造函数有双重作用，既用来塑造实例对象，又用来保存实例对象的数据，违背了构造函数与实例对象在数据上相分离的原则（即实例对象的数据，不应该保存在实例对象以外）。同时，非常耗费内存。

```javascript
function StringBuilder() {
  this._buffer = [];
}

StringBuilder.prototype = {
  constructor: StringBuilder,
  add: function(str) {
    this._buffer.push(str);
  },
  toString: function() {
    return this._buffer.join("");
  }
};
```

这种方法将私有变量放入实例对象中，好处是看上去更自然，但是它的私有变量可以从外部读写，不是很安全。

##### 3.4.3 封装私有变量：立即执行函数的写法

使用“立即执行函数”（Immediately-Invoked Function Expression，IIFE），将相关的属性和方法封装在一个函数作用域里面，可以达到不暴露私有成员的目的。

```javascript
var module = (function() {
  var _count = 0;
  var m1 = function() {
    //...
  };
  var m2 = function() {
    //...
  };
  return {
    m1: m1,
    m2: m2
  };
})();
```

使用上面的写法，外部代码无法读取内部的 `_count` 变量。

```js
console.info(module._count); //undefined
```

这种模式就是 JavaScript 模块的基本写法。

##### 3.4.4 模块的放大模式

如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，这时就有必要采用**放大模式（augmentation）**。

```javascript
var module = (function(mod) {
  mod.m3 = function() {
    //...
  };
  return mod;
})(module);
```

在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪个部分会先加载。如果采用上面的写法，第一个执行的部分有可能加载一个不存在空对象，这时就要采用**宽放大模式（Loose augmentation）**。

```javascript
var module = (function(mod) {
  //...
  return mod;
})(window.module || {});
```

与”放大模式”相比，“宽放大模式”就是“立即执行函数”的参数可以是空对象。

##### 3.4.5 输入全局变量

独立性是模块的重要特点，模块内部最好不与程序的其他部分直接交互。

为了在模块内部调用全局变量，必须显式地将其他变量输入模块。这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显。

```javascript
var module = (function($, YAHOO) {
  //...
})(jQuery, YAHOO);
```

立即执行函数还可以起到命名空间的作用。

```javascript
(function($, window, document) {
  function go(num) {}

  function handleEvents() {}

  function initialize() {}

  function dieCarouselDie() {}

  //attach to the global scope
  window.finalCarousel = {
    init: initialize,
    destroy: dieCouraselDie
  };
})(jQuery, window, document);
```

上面代码中，`finalCarousel` 对象输出到全局，对外暴露 `init` 和 `destroy` 接口，内部方法 `go`、`handleEvents`、`initialize`、`dieCarouselDie` 都是外部无法调用的。

#### 3.5.拷贝

如果要拷贝一个对象，需要做到下面两件事情。

- 确保拷贝后的对象，与原对象具有同样的原型。
- 确保拷贝后的对象，与原对象具有同样的实例属性。

##### 3.5.1.浅拷贝

创建一个新对象，新对象的属性和原来对象完全相同，对于非基本类型属性，仍指向原有属性所指向的对象的内存地址。

```js
function copyObject(orig) {
  var copy = Object.create(Object.getPrototypeOf(orig));
  copyOwnPropertiesFrom(copy, orig);
  return copy;
}

function copyOwnPropertiesFrom(target, source) {
  Object
    .getOwnPropertyNames(source)
    .forEach(function (propKey) {
      var desc = Object.getOwnPropertyDescriptor(source, propKey);
      Object.defineProperty(target, propKey, desc);
    });
  return target;
}
```

另一种更简单的写法，是利用 ES2017 才引入标准的 `Object.getOwnPropertyDescriptors` 方法。

```js
function copyObject(orig) {
  return Object.create(
    Object.getPrototypeOf(orig),
    Object.getOwnPropertyDescriptors(orig)
  );
}
```

##### 3.5.2.深拷贝

所谓"深拷贝"，就是能够实现真正意义上的数组和对象的拷贝。它的实现并不难，只要递归调用"浅拷贝"就行了。

```javascript
function deepCopy(p, c) {
  var c = c || {};
  for (var i in p) {
    if (typeof p[i] === "object") {
      c[i] = p[i].constructor === Array ? [] : {};
      deepCopy(p[i], c[i]);
    } else {
      c[i] = p[i];
    }
  }
  return c;
}
```

使用的时候这样写：

```js
var Doctor = deepCopy(Chinese);
```

现在，给父对象加一个属性，值为数组。然后，在子对象上修改这个属性：

```javascript
Chinese.birthPlaces = ["北京", "上海", "香港"];
Doctor.birthPlaces.push("厦门");
```

这时，父对象就不会受到影响了。

```javascript
alert(Doctor.birthPlaces); //北京, 上海, 香港, 厦门
alert(Chinese.birthPlaces); //北京, 上海, 香港
```

目前，jQuery 库使用的就是这种继承方法。
