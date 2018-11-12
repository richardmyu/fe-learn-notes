#### 2.循环语句

##### 1.`do-while`

`do-while` 语句是一种**后测试循环语句**，即只有在循环体中的代码执行之后，才会测试出口条件。即在对表达式求值之前，循环体内的代码至少会被执行一次。

```javascript
var i = 0;
do {
  i += 2;
} while (i < 10);
```

> 后测试循环语句最常用于循环体中的代码至少要执行一次的情形。

##### 2.`while`

`while` 语句属于**前测试循环语句**，也就是说，在循环体内的代码被执行之前，就会对出口条件求值。因此，循环体内的代码有可能永远不会被执行。

```javascript
var i = 0;
while (i < 10) {
  i += 2;
}
```

##### 3.`for`

`for` 语句也是一种前测试循环语句，但他具有在执行循环之前初始化变量和定义循环后要执行的代码的能力。

四部曲

---

- 1).设置初始值(initiale)；
- 2).设置循环执行条件(test)；
- 3).执行循环体中的命令；
- 4).每一轮**循环完成后**都会执行 `i++` 累加操作(increment)；

---

```javascript
var count = 6;
for (var i = 0; i < count; i++) {
  //var i=0   初始化表达式
  //i<count   条件表达式
  //i++       定义循环后表达式
  //{...}     循环体
  console.log(i); //0 1 2 3 4 5
}
console.log(i); //6
```

只有条件表达式为 true 时，才会进入 `for` 循环，一次也有可能不会执行循环体中的代码。使用 `while` 循环做不到，使用 `for` 循环也做不到。也就是说，`for` 循环只是把与循环有关的代码集中在一个位置。

有必要指出的是初始化表达式可以在在外部执行，同时由于没有块级作用域，在外部可以访问到循环内部定义的变量。

此外，`for` 语句中的初始化表达式、条件语句和循环定义后表达式都是可选的，将这三个表达式全部省略，就会创建一个无限循环。

##### 4.`for in`

`for in` 语句是一种精准的迭代语句，可以用来枚举对象的属性：

```javascript
var obj = { a: "小明", b: "中明", c: "大明" };
for (var key in obj) {
  console.log(key, obj[key]);
  //a 小明   b 中明   c 大明
}
```

对象中有多少组属性对，就循环多少次；在 `for in` 循环中，只能通过 `对象名[key]` 来获取，不能写成 `obj.key`（不确定属性名中是不是会有数字）；

顺序问题：首先循环带数字的属性名（由小到大）；再把剩下的属性名按照定义的顺序循环；

ECMAScript 对象的属性没有顺序。因此，通过 `for in` 循环输出的属性名的顺序是不可预测的。具体来讲，所有属性都会被返回一次，但返回的先后顺序可能会因浏览器而异。

但是，如果要迭代的对象是 `null` 和 `undefined`，`for in` 会抛出错误。ECMAScript5 更正了这一行为；对这种情况不再抛出错误，而只是不执行循环体。

#### 6.`label`

使用 `label` 语句可以在代码中添加标签，以便将来使用：

```javascript
label: statement;

start: for (var i = 0; i < 10; i++) {
  console.log(i);
}
```

这个例子中定义的 start 标签可以在将来由 `break` 或 `continue` 语句所用。加标签语句一般要与 `for` 语句等循环语句配合使用。

#### 7.`break` 或 `continue`

`break` 或 `continue` 用于在循环中精确的控制代码的执行。其中 `break` 语句会立即退出循环结构，强制继续执行循环后面的语句。而 `continue` 语句会立即退出本轮循环进行下一轮的循环。

> `break` 或 `continue` 后面的语句不会被执行，但 `continue` 会执行递增表达式这一步。

```javascript
var num = 0;
for (var i = 1; i < 10; i++) {
  if (i % 5 == 0) {
    break;
  }
  num++;
}
console.log(num); //4

for (var i = 1; i < 10; i++) {
  console.log("one:" + i, num);
  if (i % 5 == 0) {
    continue;
  }
  console.log("two:" + i, num);
  num++;
}
console.log(num); //8
```

`break` 或 `continue` 语句都可以与 `label` 语句联合使用，从而返回代码中特定的位置。这种联合使用的情况多发生在循环嵌套的情况下：

```javascript
var num = 0;
outermost: for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    if (i === 5 && j === 5) {
      break outermost;
    }
    num++;
  }
}
console.log(num); //55

outermost: for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    if (i === 5 && j === 5) {
      continue outermost;
    }
    num++;
  }
}
console.log(num); //95
```

在以上例子中，outermost 标签表示外部的 `for` 语句。内部的 `break` 语句带有一个参数：要返回的标签。添加这个标签，不仅导致 `break` 语句会退出内部的 `for` 循环，并且还会退出外部的 `for` 循环。`continue` 语句同理。

如果存在多重循环，不带参数的 `break` 语句和 `continue` 语句都只针对最内层循环。

> 过度使用，可能会带来调试的麻烦。建议使用 `label` 语句，一定要使用描述性的标签，同时不要嵌套过多的循环。

#### 8.`with`

`with` 语句的作用是将代码的作用域设置到一个特定的对象中。定义`with` 语句的主要目的是为了简化多次编写同一个对象的工作：

```javascript
var qs = location.search.substring(1);
var hostName = location.hostname;
var url = location.href;

with (location) {
  var qs = search.substring(1);
  var hostName = hostname;
  var url = href;
}
```

使用 `with` 语句关联了 location 对象，着意味着在 `with` 语句的代码块内部，每个变量首先被认为是一个局部变量，而如果在局部变量环境中找不到该变量的定义，就会查询 location 对象中是否有同名的属性。如果有，则以 location 对象中的属性值作为变量的值。

> 严格模式下，不允许使用 `with` 语句，否则被视为语法错误。
> 大量使用 `with` 语句会降低性能，同时也会给调试代码带来困难，因此，在开发大型医用程序时，不建议使用 `with` 语句。

### 7.Function

函数是一段可以反复调用的代码块。

#### 1.函数声明

JavaScript 有三种声明函数的方法。

##### 1.1 `function` 声明

ECMAScript 中的函数用 `function` 关键字来定义，可以用在函数定义表达式或者函数声明语句中，后面跟随以下组成部分：

1).函数名标识符

是函数声明语句必需的部分。用途类似变量名，新定义的函数对象会赋值给这个变量。对于函数定义表达式，这个名是可选的；如果存在，则该名字只存在于函数体中，并指代该函数本身。

2).一对圆括号

其中包含 0 个或多个标识符组成的列表，这些标识符是函数的参数名称；

3).一对花括号

其中包含 0 条或多条 JavaScript 语句，这些语句构成函数体，一旦函数调用，就会执行这些语句。

> 一条函数声明语句实际上声明了一个变量，并把一个函数对象赋值给它。相对而言，定义函数表达式时并没有声明一个变量。

```javascript
function print(s) {
  console.log(s);
}
```

上面的代码命名了一个 print 函数，以后使用 `print()` 这种形式，就可以调用相应的代码。这叫做**函数的声明（Function Declaration）**。

##### 1.2 函数表达式

除了用 `function` 命令声明函数，还可以采用变量赋值的写法。

```javascript
var print = function(s) {
  console.log(s);
};
```

这种写法将一个匿名函数赋值给变量。这时，这个匿名函数又称**函数表达式（Function Expression）**，因为赋值语句的等号右侧只能放表达式。

采用函数表达式声明函数时，`function` 命令后面不带有函数名。如果加上函数名，该函数名只在函数体内部有效，指代函数表达式本身，在函数体外部无效。

```javascript
var print = function x() {
  console.log(typeof x);
};

x;
// ReferenceError: x is not defined

print();
// function
```

这种写法的用处有两个，一是可以在函数体内部调用自身，二是方便除错（除错工具显示函数调用栈时，将显示函数名，而不再显示这里是一个匿名函数）。因此，下面的形式声明函数也非常常见。

`var f = function f() {};`

需要注意的是，函数的表达式需要在语句的结尾加上分号，表示语句结束。而函数的声明在结尾的大括号后面不用加分号。总的来说，这两种声明函数的方式，差别很细微，可以近似认为是等价的。

> 函数表达式特别适合用来定义那些只会用到一次的函数。

##### 1.3 Function 构造函数

第三种声明函数的方式是 `Function` 构造函数。

```javascript
var add = new Function("x", "y", "return x + y");

// 等同于
function add(x, y) {
  return x + y;
}
```

上面代码中，`Function` 构造函数接受三个参数，除了最后一个参数是 add 函数的“函数体”，其他参数都是 add 函数的参数。

你可以传递任意数量的参数给 `Function` 构造函数，只有最后一个参数会被当做函数体，如果只有一个参数，该参数就是函数体。

> `Function` 构造函数可以不使用 `new` 命令，返回结果完全一样。总的来说，这种声明函数的方式非常不直观，几乎无人使用。

#### 2.重复声明

如果同一个函数被同种方式多次声明，后面的声明就会覆盖前面的声明。

> 由于函数名的提升，前一次声明在任何时候都是无效的，这一点要特别注意。

严格模式的限制：

---

- 不能把函数命名为 `eval` 或 `arguments`
- 不能把参数命名为 `eval` 或 `arguments`
- 不能出现两个命名参数同名的情况

---

#### 3.`return` 语句和递归

调用函数时，要使用圆括号运算符。圆括号之中，可以加入函数的参数。

ECMAScript 中的函数在定义时不必指定是否返回值，实际上，任何函数在任何时候都可以通过 `return` 语句后跟要返回的值来实现返回值；当然应该函数中也可以包含多个 `return` 语句。

另外，`return` 语句也可以不带有任何返回值，在这种情况下，函数停止执行返回 `undefined`，这种用法一般应在需要提前停止函数执行而又不需要返回值的时候。

> 注意，`return` 语句后面的语句是不会被执行的；对于多个 `return` 语句的情况，也是如此。
> 推荐的做法是要么让函数始终返回一个值，要么永远都不要返回值。
> `return` 语句后面，访问 `window` 属性，返回都是 false；

函数可以调用自身，这就是**递归（recursion）**。下面就是通过递归，计算斐波那契数列的代码。

```javascript
function fib(num) {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fib(num - 2) + fib(num - 1);
}

fib(6); // 8
```

#### 4.数据函数

JavaScript 语言将函数看作一种值，与其它值（数值、字符串、布尔值等等）地位相同。**凡是可以使用值的地方，就能使用函数**。比如，可以把函数赋值给变量和对象的属性，也可以当作参数传入其他函数，或者作为函数的结果返回。函数只是一个可以执行的值，此外并无特殊之处。

由于函数与其他数据类型地位平等，所以在 JavaScript 语言中又称函数为第一等公民。

#### 5.函数名的提升

JavaScript 引擎将函数名视同变量名，所以采用 `function` 命令声明函数时，整个函数会像变量声明一样，被提升到代码头部。但是，如果采用赋值语句定义函数，不会提升。

如果同时采用 `function` 命令和赋值语句声明(`var`)同一个函数，最后总是采用赋值语句的定义。

#### 6.不能在条件语句中声明函数

根据 ES5 的规范，不得在非函数的代码块中声明函数，最常见的情况就是`if`和`try`语句。

```javascript
if (foo) {
  function x() {}
}

try {
  function x() {}
} catch (e) {
  console.log(e);
}
```

上面代码按照语言规范，这是不合法的。但是，实际情况是各家浏览器往往并不报错，能够运行。

但是由于存在函数名的提升，所以在条件语句中声明函数，可能是无效的，这是非常容易出错的地方。

```javascript
if (false) {
  function f() {}
}

f(); // 不报错
```

上面代码的原始意图是不声明函数 f，但是由于 f 的提升，导致 `if` 语句无效，所以上面的代码不会报错。要达到在条件语句中定义函数的目的，只有使用函数表达式。

```javascript
if (false) {
  var f = function() {};
}

f(); // undefined
```

#### 7.函数的属性

##### 7.1 `name` 属性

函数的 `name` 属性返回函数的名字。

```javascript
function f1() {}
f1.name; // "f1"
```

如果是通过变量赋值定义的函数，那么 `name` 属性返回变量名。

```javascript
var f2 = function() {};
f2.name; // "f2"
```

但是，上面这种情况，只有在变量的值是一个匿名函数时才是如此。如果变量的值是一个具名函数，那么 `name` 属性返回 `function` 关键字之后的那个函数名。

```javascript
var f3 = function myName() {};
f3.name; // 'myName'
```

上面代码中，`f3.name` 返回函数表达式的名字。注意，真正的函数名还是 f3，而 `myName` 这个名字只在函数体内部可用。

`name` 属性的一个用处，就是获取参数函数的名字。

```javascript
var myFunc = function() {};
function test(f) {
  console.log(f.name);
}
test(myFunc); // myFunc

//1.函数f.bind 函数的函数名是:  bound 函数f
function f1() {}
var f2 = f1.bind(1);
console.log(f2.name); //bound f1

//2.通过构造函数创建方式创建的函数,name :anonymous
var ff = new Function();
console.log(ff.name); //anonymous
console.log(function() {}.name); //""
```

##### 7.2 `length` 属性

函数的 `length` 属性返回函数预期传入的参数个数，即形参个数。

```javascript
function f(a, b) {}
f.length; // 2
```

`length` 属性提供了一种机制，判断定义时和调用时参数的差异，以便实现面向对象编程的方法**重载（overload）**。

#### 8.`toString()`

函数的 `toString` 方法返回一个字符串，内容是函数的源码。函数内部的注释也可以返回。

#### 9.函数作用域

形成私有作用域 -> 变量提声 -> 给形参赋值 -> 执行代码

##### 9.1 定义

**作用域（scope）**指的是变量存在的范围。在 ES5 的规范中，Javascript 只有两种作用域：一种是全局作用域，变量在整个程序中一直存在，所有地方都可以读取；另一种是函数作用域，变量只在函数内部存在。

函数外部声明的变量就是**全局变量（global variable）**，它可以在函数内部读取。在函数内部定义的变量，外部无法读取，称为**局部变量（local variable）**。函数内部定义的变量，会在该作用域内覆盖同名全局变量。

JavaScript 中的函数运行在它们被定义的作用域里,而不是它们被执行的作用域里。

在一个函数被定义的时候, 会将它定义时刻的**作用域链（scope chain）**链接到这个函数对象的 `[[Scopes]]` 属性.

在一个函数对象被调用的时候，会创建一个活动对象(也就是一个对象)，然后对于每一个函数的形参，都命名为该活动对象的命名属性，然后将这个活动对象做为此时的作用域链最前端，并将这个函数对象的 `[[Scopes]]` 加入到 `scope chain` 中。

```javascript
var fn = function(lps, rps) {
  var name = "laruence";
};
fn();
```

在执行 fn 的定义语句的时候，会创建一个这个函数对象的 `[[Scopes]]` 属性(内部属性，只有 JS 引擎可以访问，但 FireFox 的几个引擎(SpiderMonkey 和 Rhino)提供了私有属性 `__parent__` 来访问它)，并将这个 `[[Scopes]]` 属性，链接到定义它的作用域链上，此时因为 fn 定义在全局环境，所以此时的 `[[Scopes]]` 只是指向全局活动对象 `window active object`。

在调用 fn 的时候，会创建一个活动对象(假设为 `aObj`，由 JS 引擎预编译时刻创建)，并创建 `arguments` 属性，然后会给这个对象添加俩个命名属性 `aObj.lps`，`aObj.rps`；对于每一个在这个函数中申明的局部变量和函数定义，都作为该活动对象的同名命名属性。然后将调用参数赋值给形参数，对于缺少的调用参数，赋值为 `undefined`。

然后将这个活动对象做为 `scope chain` 的最前端，并将 fn 的 `[[Scopes]]` 属性所指向的，定义 fn 时候的顶级活动对象，加入到 `scope chain`。

有了上面的作用域链, 在发生标识符解析的时候，就会逆向查询当前 `scope chain` 列表的每一个活动对象的属性，如果找到同名的就返回。找不到，那就是这个标识符没有被定义。

注意到，因为函数对象的 `[[Scopes]]` 属性是在定义一个函数的时候决定的，而非调用的时候，所以如下面的例子：

```javascript
var name = "laruence";
function echo() {
  console.log(name);
}

function env() {
  var name = "eve";
  echo();
}

env(); //laruence
```

##### 9.2 函数内部的变量提升

与全局作用域一样，函数作用域内部也会产生“**变量提升**”现象。`var` 命令声明的变量，不管在什么位置，变量声明都会被提升到函数体的头部。

##### 9.3 函数本身的作用域

函数本身也是一个值，也有自己的作用域。它的作用域与变量一样，就是其声明时所在的作用域，与其运行时所在的作用域无关。

```javascript
var a = 1;
var x = function() {
  console.log(a);
};

function f() {
  var a = 2;
  x();
}

f(); // 1
```

总之，**函数执行时所在的作用域，是定义时的作用域**，而不是调用时所在的作用域。同样的，函数体内部声明的函数，作用域绑定函数体内部。
