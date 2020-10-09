# 小结

## 1.生成实例的方法

### 1.1.构造函数

必须以构造函数为模板；

用构造函数生成实例对象，有一个缺点，那就是无法共享属性和方法。

### 1.2.Object.create()

可以将对象作为模块，生成新的实例

## 2.对象的方法

|          方法           |                作用                |       参数        |         返回值         |
| :---------------------: | :--------------------------------: | :---------------: | :--------------------: |
| `Object.getPrototypeOf` |         返回参数对象的原型         |     现有对象      | （参数对象的）原型对象 |
| `Object.setPrototypeOf` | 为参数对象设置原型，返回该参数对象 | 参数对象,原型对象 |        参数对象        |

## 3.new 命令的模拟

## 4.prototype & `__proto__` & constructor ？？？

对象的 `constructor` 属性用于返回创建该对象的函数，也就是我们常说的构造函数。在 JavaScript 中，每个具有原型的对象都会自动获得 `constructor` 属性。除了 `arguments`、`Enumerator`、`Error`、`Global`、`Math`、`RegExp`、`Regular Expression` 等一些特殊对象之外，其他所有的 JavaScript 内置对象都具备 `constructor` 属性。例如：`Array`、`Boolean`、`Date`、`Function`、`Number`、`Object`、`String` 等。

几乎所有的函数（除了一些内建函数）都有一个名为 `prototype`（原型）的属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以有特定类型的所有实例共享的属性和方法。`prototype` 是通过调用构造函数而创建的那个对象实例的原型对象。

对象具有属性 `__proto__`，可称为隐式原型，一个对象的隐式原型指向构造该对象的构造函数的原型，这也保证了实例能够访问在构造函数原型中定义的属性和方法。

## 5.实现继承的 5 中方式

```javascript
// 比如，现在有一个"动物"对象的构造函数。
function Animal() {
  this.species = "动物";
}

// 还有一个"猫"对象的构造函数。
function Cat(name, color) {
  this.name = name;
  this.color = color;
}
```

### 5.1 构造函数绑定

第一种方法也是最简单的方法，使用 `call` 或 `apply` 方法，将父对象的构造函数绑定在子对象上，即在子对象构造函数中加一行：

```javascript
function Cat(name, color) {
  Animal.apply(this, arguments);

  this.name = name;

  this.color = color;
}

var cat1 = new Cat("大毛", "黄色");

alert(cat1.species); // 动物
```

### 5.2 prototype 模式

第二种方法更常见，使用 `prototype` 属性。

如果"猫"的 `prototype` 对象，指向一个 Animal 的实例，那么所有"猫"的实例，就能继承 Animal 了。

```javascript
Cat.prototype = new Animal();

Cat.prototype.constructor = Cat;

var cat1 = new Cat("大毛", "黄色");

alert(cat1.species); // 动物
```

代码的第一行，我们将 Cat 的 `prototype` 对象指向一个 Animal 的实例。

`Cat.prototype = new Animal();`

它相当于完全删除了 `prototype` 对象原先的值，然后赋予一个新值。但是，第二行又是什么意思呢？

`Cat.prototype.constructor = Cat;`

原来，任何一个 `prototype` 对象都有一个 `constructor` 属性，指向它的构造函数。如果没有"`Cat.prototype = new Animal();`"这一行，`Cat.prototype.constructor` 是指向 Cat 的；加了这一行以后，`Cat.prototype.constructor` 指向 Animal。

`alert(Cat.prototype.constructor == Animal); //true`

更重要的是，每一个实例也有一个 `constructor` 属性，默认调用 `prototype` 对象的 `constructor` 属性。

`alert(cat1.constructor == Cat.prototype.constructor); // true`

因此，在运行"`Cat.prototype = new Animal();`"这一行之后，`cat1.constructor` 也指向 Animal！

`alert(cat1.constructor == Animal); // true`

这显然会导致继承链的紊乱（cat1 明明是用构造函数 Cat 生成的），因此我们必须手动纠正，将 `Cat.prototype` 对象的 `constructor` 值改为 Cat。这就是第二行的意思。

这是很重要的一点，编程时务必要遵守。下文都遵循这一点，即如果替换了 `prototype` 对象，

`o.prototype = {};`

那么，下一步必然是为新的 `prototype` 对象加上 `constructor` 属性，并将这个属性指回原来的构造函数。

`o.prototype.constructor = o;`

### 5.3 直接继承 prototype

第三种方法是对第二种方法的改进。由于 Animal 对象中，不变的属性都可以直接写入 Animal.prototype。所以，我们也可以让 Cat() 跳过 Animal()，直接继承 Animal.prototype。

现在，我们先将 Animal 对象改写：

```javascript
function Animal() {}

Animal.prototype.species = "动物";
```

然后，将 Cat 的 `prototype` 对象，然后指向 Animal 的 `prototype` 对象，这样就完成了继承。

```javascript
Cat.prototype = Animal.prototype;

Cat.prototype.constructor = Cat;

var cat1 = new Cat("大毛", "黄色");

alert(cat1.species); // 动物
```

与前一种方法相比，这样做的优点是效率比较高（不用执行和建立 Animal 的实例了），比较省内存。缺点是 Cat.prototype 和 Animal.prototype 现在指向了同一个对象，那么任何对 Cat.prototype 的修改，都会反映到 Animal.prototype。

所以，上面这一段代码其实是有问题的。请看第二行

`Cat.prototype.constructor = Cat;`

这一句实际上把 Animal.prototype 对象的 `constructor` 属性也改掉了！

`alert(Animal.prototype.constructor); // Cat`

### 5.4 利用空对象作为中介

由于"直接继承 prototype"存在上述的缺点，所以就有第四种方法，利用一个空对象作为中介。

```javascript
var F = function() {};

F.prototype = Animal.prototype;

Cat.prototype = new F();

Cat.prototype.constructor = Cat;
```

F 是空对象，所以几乎不占内存。这时，修改 Cat 的 `prototype` 对象，就不会影响到 Animal 的 `prototype` 对象。

`alert(Animal.prototype.constructor); // Animal`

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

var cat1 = new Cat("大毛", "黄色");

alert(cat1.species); // 动物
```

这个 `extend` 函数，就是 YUI 库如何实现继承的方法。

另外，说明一点，函数体最后一行

`Child.uber = Parent.prototype;`

意思是为子对象设一个 uber 属性，这个属性直接指向父对象的 `prototype` 属性。（uber 是一个德语词，意思是"向上"、"上一层"。）这等于在子对象上打开一条通道，可以直接调用父对象的方法。这一行放在这里，只是为了实现继承的完备性，纯属备用性质。

### 5.5 拷贝继承

上面是采用 `prototype` 对象，实现继承。我们也可以换一种思路，纯粹采用"拷贝"方法实现继承。简单说，如果把父对象的所有属性和方法，拷贝进子对象，不也能够实现继承吗？这样我们就有了第五种方法。

首先，还是把 Animal 的所有不变属性，都放到它的 `prototype` 对象上。

```javascript
function Animal() {}

Animal.prototype.species = "动物";
```

然后，再写一个函数，实现属性拷贝的目的。

```javascript
function extend2(Child, Parent) {
  var p = Parent.prototype;

  var c = Child.prototype;

  for (var i in p) {
    c[i] = p[i];
  }

  c.uber = p;
}
```

这个函数的作用，就是将父对象的 `prototype` 对象中的属性，一一拷贝给 Child 对象的 `prototype` 对象。

使用的时候，这样写：

```javascript
extend2(Cat, Animal);

var cat1 = new Cat("大毛", "黄色");

alert(cat1.species); // 动物
```

## 6.检测属性

|                方法                 |              作用              |     参数     | 返回值 |      遍历性      |            私有性            |                  注                  |
| :---------------------------------: | :----------------------------: | :----------: | :----: | :--------------: | :--------------------------: | :----------------------------------: |
|   `Object.getOwnPropertyNames()`    | 返回参数对象自身所有属性的键名 |   参数对象   |  数组  |    不区分遍历    | 只遍历私有属性不包括继承属性 |                  无                  |
| `Object.prototype.hasOwnProperty()` |   判断某个属性是否定义在自身   |    属性名    | 布尔值 |    不区分遍历    |          只遍历私有          | 唯一一个处理对象属性时不会遍历原型链 |
|           `Object.keys()`           |    返回参数对象的可遍历属性    |   参数对象   |  数组  | 只遍历可遍历属性 |           暂时不明           |                  无                  |
|                `in`                 |    表示对象是否具有某个属性    | 属性名和对象 | 布尔值 |     暂时不明     |      不区分私有还是继承      |                  无                  |
|             `for...in`              |     获取对象所有可遍历属性     |     对象     |  键名  |    可遍历属性    |          暂时不明确          |                  无                  |
