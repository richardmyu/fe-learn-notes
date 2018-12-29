### 3.面向对象编程的模式

#### 3.0.模式

##### 3.0.1 构造函数模式

为了解决从原型对象生成实例的问题，Javascript 提供了一个构造函数（Constructor）模式。

所谓"构造函数"，其实就是一个普通函数，但是内部使用了 `this` 变量。对构造函数使用 `new` 运算符，就能生成实例，并且 `this` 变量会绑定在实例对象上，同时实例会自动包含一个 `constructor` 属性，指向它们的构造函数。

构造函数方法很好用，但是存在一个浪费内存的问题 -- 即没有共享属性和方法，每次生成的实例的属性和方法都是私有的，这样就引入 Prototype 模式。

##### 3.0.2 Prototype 模式

Javascript 规定，每一个构造函数都有一个 `prototype` 属性，指向另一个对象。这个对象的所有属性和方法，都会被构造函数的实例继承。这意味着，我们可以把那些不变的属性和方法，直接定义在 `prototype` 对象上。

#### 3.1.构造函数的继承

让一个构造函数继承另一个构造函数，是非常常见的需求。

这可以分成两步实现。第一步是在子类的构造函数中，调用父类的构造函数。

```javascript
function Sub(value) {
  Super.call(this);
  this.prop = value;
}
```

上面代码中，Sub 是子类的构造函数，`this`是子类的实例。在实例上调用父类的构造函数 Super，就会让子类实例具有父类实例的属性。

第二步，是让子类的原型指向父类的原型，这样子类就可以继承父类原型。

```javascript
Sub.prototype = Object.create(Super.prototype);
//Sub.prototype --> Super
Sub.prototype.constructor = Sub;
Sub.prototype.method = "...";
```

上面代码中，`Sub.prototype`是子类的原型，要将它赋值为`Object.create(Super.prototype)`，而不是直接等于`Super.prototype`。否则后面两行对`Sub.prototype`的操作，会连父类的原型`Super.prototype`一起修改掉。

---

另外一种写法是`Sub.prototype`等于一个父类实例。

`Sub.prototype = new Super();`

上面这种写法也有继承的效果，但是子类会具有父类实例的方法。有时，这可能不是我们需要的，所以不推荐使用这种写法。

举例来说，下面是一个 Shape 构造函数。

```javascript
function Shape() {
  this.x = 0;
  this.y = 0;
}

Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info("Shape moved.");
};
```

我们需要让 Rectangle 构造函数继承 Shape。

```javascript
// 第一步，子类继承父类的实例
function Rectangle() {
  Shape.call(this); // 调用父类构造函数
}
// 另一种写法
function Rectangle() {
  this.base = Shape;
  this.base();
}

// 第二步，子类继承父类的原型
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
```

采用这样的写法以后，`instanceof`运算符会对子类和父类的构造函数，都返回 true。

```javascript
var rect = new Rectangle();
rect.move(1, 1); // 'Shape moved.'
rect instanceof Rectangle; // true
rect instanceof Shape; // true
```

上面代码中，子类是整体继承父类。有时只需要单个方法的继承，这时可以采用下面的写法。

```javascript
ClassB.prototype.print = function() {
  ClassA.prototype.print.call(this);
  // some code
};
```

上面代码中，子类 B 的 print 方法先调用父类 A 的 print 方法，再部署自己的代码。这就等于继承了父类 A 的 print 方法。

#### 3.2.非构造函数的继承

##### 3.2.1 什么是"非构造函数"的继承？

比如，现在有一个对象，叫做"中国人"。

```javascript
var Chinese = {
  nation: "中国"
};
```

还有一个对象，叫做"医生"。

```javascript
var Doctor = {
  career: "医生"
};
```

请问怎样才能让"医生"去继承"中国人"，也就是说，我怎样才能生成一个"中国医生"的对象？

这里要注意，这两个对象都是普通对象，不是构造函数，无法使用构造函数方法实现"继承"。

##### 3.2.2 object()方法

json 格式的发明人 Douglas Crockford，提出了一个 `object()` 函数，可以做到这一点。

```javascript
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

这个 `object()` 函数，其实只做一件事，就是把子对象的 `prototype` 属性，指向父对象，从而使得子对象与父对象连在一起。

使用的时候，第一步先在父对象的基础上，生成子对象：

`var Doctor = object(Chinese);`

然后，再加上子对象本身的属性：

`Doctor.career = '医生';`

这时，子对象已经继承了父对象的属性了。

`alert(Doctor.nation); //中国`

##### 3.2.3 浅拷贝

除了使用"prototype 链"以外，还有另一种思路：把父对象的属性，全部拷贝给子对象，也能实现继承。

下面这个函数，就是在做拷贝：

```javascript
function extendCopy(p) {
  var c = {};
  for (var i in p) {
    c[i] = p[i];
  }
  c.uber = p;
  return c;
}
```

使用的时候，这样写：

```javascript
var Doctor = extendCopy(Chinese);
Doctor.career = "医生";
alert(Doctor.nation); // 中国
```

但是，这样的拷贝有一个问题。那就是，如果父对象的属性等于数组或另一个对象，那么实际上，子对象获得的只是一个内存地址，而不是真正拷贝，因此存在父对象被篡改的可能。

请看，现在给 Chinese 添加一个"出生地"属性，它的值是一个数组。

`Chinese.birthPlaces = ['北京','上海','香港'];`

通过 `extendCopy()` 函数，Doctor 继承了 Chinese。

`var Doctor = extendCopy(Chinese);`

然后，我们为 Doctor 的"出生地"添加一个城市：

`Doctor.birthPlaces.push('厦门');`

发生了什么事？Chinese 的"出生地"也被改掉了！

```javascript
alert(Doctor.birthPlaces); //北京, 上海, 香港, 厦门
alert(Chinese.birthPlaces); //北京, 上海, 香港, 厦门
```

所以，`extendCopy()`只是拷贝基本类型的数据，我们把这种拷贝叫做"浅拷贝"。这是早期 jQuery 实现继承的方式。

##### 3.2.4 深拷贝

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

`var Doctor = deepCopy(Chinese);`

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

#### 3.3.多重继承

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
s.hello; // 'hello：'
s.world; // 'world'
```

上面代码中，子类 S 同时继承了父类 M1 和 M2。这种模式又称为 **Mixin（混入）**。

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

上面的函数 m1 和 m2，组成一个模块。使用的时候，直接调用就行了。

这种做法的缺点很明显：”污染”了全局变量，无法保证不与其他模块发生变量名冲突，而且模块成员之间看不出直接关系。

为了解决上面的缺点，可以把模块写成一个对象，所有的模块成员都放到这个对象里面。

```javascript
var module1 = new Object({
  _count: 0,
  m1: function() {
    //...
  },
  m2: function() {
    //...
  }
});
```

但是，这样的写法会暴露所有模块成员，内部状态可以被外部改写。比如，外部代码可以直接改变内部计数器的值。

`module1._count = 5;`

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

这种方法将私有变量封装在构造函数中，违反了构造函数与实例对象相分离的原则。并且，非常耗费内存。

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
var module1 = (function() {
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

使用上面的写法，外部代码无法读取内部的\_count 变量。

`console.info(module1._count); //undefined`

这种模式就是 JavaScript 模块的基本写法。

##### 3.4.4 模块的放大模式

如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，这时就有必要采用**放大模式（augmentation）**。

```javascript
var module1 = (function(mod) {
  mod.m3 = function() {
    //...
  };
  return mod;
})(module1);
```

在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪个部分会先加载。如果采用上面的写法，第一个执行的部分有可能加载一个不存在空对象，这时就要采用**宽放大模式（Loose augmentation）**。

```javascript
var module1 = (function(mod) {
  //...
  return mod;
})(window.module1 || {});
```

与”放大模式”相比，“宽放大模式”就是“立即执行函数”的参数可以是空对象。

##### 3.4.5 输入全局变量

独立性是模块的重要特点，模块内部最好不与程序的其他部分直接交互。

为了在模块内部调用全局变量，必须显式地将其他变量输入模块。

```javascript
var module1 = (function($, YAHOO) {
  //...
})(jQuery, YAHOO);
```

上面模块需要使用`jQuery`库和`YUI`库，就把这两个库（其实是两个模块）当作参数输入。这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显。

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

上面代码中，finalCarousel 对象输出到全局，对外暴露 init 和 destroy 接口，内部方法 go、handleEvents、initialize、dieCarouselDie 都是外部无法调用的。
