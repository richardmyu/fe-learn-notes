### 4.prototype 对象

面向对象编程很重要的一个方面，就是对象的继承。A 对象通过继承 B 对象，就能直接拥有 B 对象的所有属性和方法。这对于代码的复用是非常有用的。

许多面向语言都支持两种继承方式：**接口继承**和**实现继承**。接口继承只继承方法签名，而实现继承则继承实际的方法。由于函数没有签名，所以无法实现接口继承，只支持实现继承，而且实现继承主要是依靠原型链来实现的。

大部分面向对象的编程语言，都是通过**类（class）**来实现对象的继承。JavaScript 语言的继承则是通过**原型对象（prototype）**。

#### 4.1.原型对象概述

##### 4.1.1 构造函数的缺点

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

通过构造函数为实例对象定义属性，虽然很方便，但是有一个缺点。同一个构造函数的多个实例之间，无法共享属性，从而造成对系统资源的浪费。

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

由于 meow 方法是生成在每个实例对象上面，所以两个实例就生成了两次。也就是说，每新建一个实例，就会新建一个 meow 方法。这既没有必要，又浪费系统资源，因为所有 meow 方法都是同样的行为，完全应该共享。

这个问题的解决方法，就是 JavaScript 的原型对象。

##### 4.1.2 prototype 属性的作用

**JavaScript 继承机制的设计思想就是，原型对象的所有属性和方法，都能被实例对象共享**。也就是说，如果属性和方法定义在原型上，那么所有实例对象就能共享，不仅节省了内存，还体现了实例对象之间的联系。

下面，先看怎么为对象指定原型。JavaScript 规定，每个函数都有一个`prototype`属性，指向一个对象。

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

上面代码中，构造函数 Animal 的`prototype`属性，就是实例对象 cat1 和 cat2 的原型对象。原型对象上添加一个 color 属性，结果，实例对象都共享了该属性。

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

总结一下，原型对象的作用，就是定义所有实例对象共享的属性和方法。这也是它被称为原型对象的原因，而实例对象可以视作从原型对象衍生出来的子对象。

```javascript
Animal.prototype.walk = function() {
  console.log(this.name + " is walking");
};
```

##### 4.1.3 原型链

JavaScript 规定，所有对象都有自己的原型对象。一方面，任何一个对象，都可以充当其他对象的原型；另一方面，由于原型对象也是对象，所以它也有自己的原型。如此层层递进，就构成了实例与原型的链条，就会形成一个**原型链（prototype chain）**。

> 简单回顾一下构造函数、原型和实例的关系：每一个构造函数 Function 都有一个原型对象`prototype`，原型对象都包含一个指向构造函数的指针`constructor`，而实例都包含一个指向原型对象的内部指针`__proto__`。

如果一层层地上溯，所有对象的原型最终都可以上溯到`Object.prototype`，即`Object`构造函数的`prototype`属性。也就是说，所有对象都继承了`Object.prototype`的属性。这就是所有对象都有`valueOf`和`toString`方法的原因，因为这是从`Object.prototype`继承的。

那么，`Object.prototype`对象有没有它的原型呢？回答是`Object.prototype`的原型是`null`。`null`没有任何属性和方法，也没有自己的原型。因此，原型链的尽头就是`null`。

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

console.log(instance.getSubValue()); //undefined2
```

读取对象的某个属性时，JavaScript 引擎先寻找对象本身的属性，如果找不到，则通过`__proto__`到它的原型去找，如果还是找不到，就到原型的原型去找。如果直到最顶层的`Object.prototype`还是找不到，则返回`undefined`。如果对象自身和它的原型，都定义了一个同名属性，那么优先读取对象自身的属性，这叫做**覆盖（overriding）**。

> 注意，一级级向上，在整个原型链上寻找某个属性，对性能是有影响的。所寻找的属性在越上层的原型对象，对性能的影响越大。如果寻找某个不存在的属性，将会遍历整个原型链。

举例来说，如果让构造函数的`prototype`属性指向一个数组，就意味着实例对象可以调用数组方法。

```javascript
var MyArray = function() {};

MyArray.prototype = new Array();
MyArray.prototype.constructor = MyArray;

var mine = new MyArray();
mine.push(1, 2, 3);
mine.length; // 3
mine instanceof Array; // true
```

上面代码中，mine 是构造函数 MyArray 的实例对象，由于`MyArray.prototype`指向一个数组实例，使得 mine 可以调用数组方法（这些方法定义在数组实例的`prototype`对象上面）。最后那行`instanceof`表达式，用来比较一个对象是否为某个构造函数的实例，结果就是证明 mine 为`Array`的实例。

##### 4.1.4 constructor 属性

`prototype`对象有一个`constructor`属性，默认指向`prototype`对象所在的构造函数。

```javascript
function P() {}
P.prototype.constructor === P; // true
```

由于`constructor`属性定义在`prototype`对象上面，意味着可以被所有实例对象继承。

```javascript
function P() {}
var p = new P();

p.constructor === P; // true
p.constructor === P.prototype.constructor; // true
p.hasOwnProperty("constructor"); // false
```

上面代码中，p 是构造函数 P 的实例对象，但是 p 自身没有`constructor`属性，该属性其实是读取原型链上面的`P.prototype.constructor`属性。

`constructor`属性的作用是，可以得知某个实例对象，到底是哪一个构造函数产生的。

```javascript
function F() {}
var f = new F();

f.constructor === F; // true
f.constructor === RegExp; // false
```

上面代码中，`constructor`属性确定了实例对象 f 的构造函数是 F，而不是`RegExp`。

另一方面，有了`constructor`属性，就可以从一个实例对象新建另一个实例。

```javascript
function Constr() {}
var x = new Constr();

var y = new x.constructor();
y instanceof Constr; // true
```

上面代码中，x 是构造函数 Constr 的实例，可以从 x.constructor 间接调用构造函数。这使得在实例方法中，调用自身的构造函数成为可能。

```javascript
Constr.prototype.createCopy = function() {
  return new this.constructor();
};
```

上面代码中，createCopy 方法调用构造函数，新建另一个实例。

`constructor`属性表示原型对象与构造函数之间的关联关系，如果修改了原型对象，一般会同时修改`constructor`属性，防止引用的时候出错。

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.constructor === Person; // true

Person.prototype = {
  method: function() {}
};

// 注意 constructor 属性时继承属性
// 所以修改原型以后，constructor 指向的时新的原型的构造函数

Person.prototype.constructor === Person; // false
Person.prototype.constructor === Object; // true
```

上面代码中，构造函数 Person 的原型对象改掉了，但是没有修改`constructor`属性，导致这个属性不再指向 Person。由于 Person 的新原型是一个普通对象，而普通对象的`contructor`属性指向 Object 构造函数，导致`Person.prototype.constructor`变成了`Object`。

> 内置类的原型默认无法修改；只有浏览器默认开辟的堆内存才有`constructor`属性，若要修改地址（批量添加属性或方法），可以添加`constructor：类`，引回原地址；

所以，修改原型对象时，一般要同时修改`constructor`属性的指向。

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

// 更好的写法
C.prototype.method1 = function (...) { ... };
```

上面代码中，要么将`constructor`属性重新指向原来的构造函数，要么只在原型对象上添加方法，这样可以保证`instanceof`运算符不会失真。

如果不能确定`constructor`属性是什么函数，还有一个办法：通过`name`属性，从实例得到构造函数的名称。

```javascript
function Foo() {}
var f = new Foo();
// 构造函数的名称
f.constructor.name; // "Foo"
```

#### 4.2.继承

##### 4.2.1 原型继承

原型继承是一种简化的继承机制，实际上，JavaScript 就是一种基于原型的语言。

在原型继承中，类和实例概念就被淡化了，一切都从对象角度来考虑。所以直接定义对象，该对象被其他对引用，这样就形成了一种继承关系，其中被引用对象就称之为**原型对象**；JavaScript 可以根据原型链来查找对象之间的这种继承关系。

基于原型的编程是面向对象编程的一种特定的形式。在这种编程模型中，不需要声明静态类，而可以**通过复制语句存在的原型对象来实现继承关系**。因此，基于原型的模型没有类的概念，原型继承中的类仅是一种模拟，从而不需要通过复制属性的方式进快速的实现继承。

我们需要创建的两个对象应该是相互独立的，显然，仅仅通过原型这样的方式会带来高耦合性的，在实际程序设计过程中单独使用原型模式来创建对象无疑会带来一些潜在的弊端，这也是面向对象程序设计理念“低耦合高复用”所不允许的。

```javascript
//可以获得B的私有变量以及原型上的变量；但丢失自身原来原型上的变量
A.prototype = new B();

//合并对象(只能获得B的私有变量，无法获得B的原型上的变量；但可以保留自身原来原型上的变量)；
//Object.assign(obj1,obj2)
Object.assign(A.prototype, new B());

//自定义assign方法；通过结合两者方法，使得实例可以获得两个类的私有属性和公有属性；
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

##### 4.2.2 call 继承

在一个类中 A 执行另一个类 B，并用`call`使该类 B 指向类 A，从而使得 A 类的实例可以获得 B 类上的私有变量或属性，同时能保存自身原型上的公有变量或属性。

```javascript
function A() {
  this.a = 1;
  B.call(this);
}

function B() {
  this.b = 2;
}

B.prototype.getB = function() {};
var a = new A();
console.log(a); //A{a:1,b:2}
```

##### 4.2.3 寄生组合继承

原型继承和 `call` 继承组合

```javascript
function A() {
  this.a = 1;
  B.call(this);
}

function B() {
  this.b = 2;
}

B.prototype.getB = function() {};
A.prototype.getA = function() {};
Object.assign(A.prototype, B.prototype);
var a = new A();
console.log(a);
//A{a:1,b:2,[[__proto__]]{getA:f(),getB:f()}
```

##### 4.2.4 强制改变原型指向

```javascript
//只能改变引用类型数据或通过构造函数的方法产生的类型；
function sum() {
  arguments.__proto__ = Array.prototype;
  return arguments.join("+");
}
console.log(sum(1, 2, 3, 4));
//1+2+3+4

var ary = [1, 2, 3, 4];
console.log(ary.toString()); //"1,2,3,4"
ary.__proto__ = Object.prototype;
console.log(ary.toString()); //[object Array]

var time = new Date();
console.log(time.toString());
//Sat Sep 23 2017 15:46:08 GMT+0800 (中国标准时间)
time.__proto__ = Object.prototype;
console.log(time.toString()); //[object Date]
```

#### 4.3.instanceof 运算符

`instanceof`运算符返回一个布尔值，表示对象是否为某个构造函数的实例。

```javascript
var v = new Vehicle();
v instanceof Vehicle; // true
```

`instanceof`运算符的左边是实例对象，右边是构造函数。原理是会检查右边构建函数的原型对象（`prototype`），是否在左边对象的原型链上。因此，下面两种写法是等价的。

```javascript
v instanceof Vehicle;
// 等同于
Vehicle.prototype.isPrototypeOf(v);
```

由于`instanceof`检查整个原型链，因此同一个实例对象，可能会对多个构造函数都返回 true。

```javascript
var d = new Date();
d instanceof Date; // true
d instanceof Object; // true
```

有一种特殊情况，就是左边对象的原型链上，只有`null`对象。这时，`instanceof`判断会失真。

```javascript
var obj = Object.create(null);
typeof obj; // "object"
Object.create(null) instanceof Object; // false
```

上面代码中，`Object.create(null)`返回一个新对象 obj，它的原型是`null`。右边的构造函数`Object`的`prototype`属性，不在左边的原型链上，因此`instanceof`就认为 obj 不是`Object`的实例。但是，只要一个对象的原型不是`null`，`instanceof`运算符的判断就不会失真。

`instanceof`运算符的一个用处，是判断值的类型。

```javascript
var x = [1, 2, 3];
var y = {};
x instanceof Array; // true
y instanceof Object; // true
```

注意，`instanceof`运算符只能用于对象，不适用原始类型的值。

```javascript
var s = "hello";
s instanceof String; // false
```

上面代码中，字符串不是`String`对象的实例（因为字符串不是对象），所以返回 false。

此外，对于`undefined`和`null`，`instanceOf`运算符总是返回 false。

```javascript
undefined instanceof Object; // false
null instanceof Object; // false
```

利用`instanceof`运算符，还可以巧妙地解决，调用构造函数时，忘了加`new`命令的问题。

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

上面代码使用`instanceof`运算符，在函数体内部判断`this`关键字是否为构造函数 Fubar 的实例。如果不是，就表明忘了加`new`命令。
