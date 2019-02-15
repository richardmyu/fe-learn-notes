# Jasmine

## 1.基本语法介绍

---

**describe(string, function)**：可以理解为是一个测试集或者测试包（为了便于称呼，我们本文中统一叫测试集，官方称之为 suite），主要功能是用来划分单元测试的，`describe` 是可以嵌套使用的

- 参数 `string`：描述测试包的信息
- 参数 `function`：测试集的具体实现

---

**it(string, function)**：测试用例（官方称之为 `spec`）

- 参数 `string`：描述测试用例的信息
- 参数 `function`：测试用例的具体实现

---

**expect**：断言表达式

---

## 2.expect 的使用

> 首先说一下，所有的 `expect` 都可以使用 `not` 表示否定的断言。

测试实例见 [HelloWorld.spec.js](https://github.com/richardmyu/learnRep/blob/master/Notes/unitTesting/demo/vueTest/vue-test-demo-jest/test/unit/specs/HelloWorld.spec.js)

### 2.1.toBe

基本类型判断

```javascript
it("toBe and not.toBe", function() {
  expect(1).toBe(1);

  // 判断采用 ===
  // expect(1).toBe('1');
  expect("a").not.toBe("b");
  expect(true).toBe(true);

  // 只对基本数据类型进行判断
  // expect({}).toBe({});
  // expect({ name: 'ok' }).toBe({ name: 'ok' });
});
```

### 2.2.toEqual

`toEqual` 有两种用法，对于基本的类型，`toEqual` 相当于 `toBe`

```javascript
it("toEqual and not.toEqual for basic types", function() {
  expect(1).toEqual(1);
  // 同 toBe，也是 ===
  // expect(1).toEqual('1');
  expect("a").not.toEqual("b");
});
```

`toEqual` 还可以用来判断对象：

```javascript
it("toEqual and not.toEqual for objects", function() {
  let obj1 = { name: "jack", age: 12 };
  let obj2 = { name: "jack", age: 12 };
  let obj3 = { name: "tom", age: 13 };
  let obj4 = {};
  let obj5 = {};
  let obj6 = obj2;

  let ary1 = [1];
  let ary2 = [1];
  let ary3 = [2];
  let ary4 = [];
  let ary5 = [];
  let ary6 = ary2;

  let f1 = function() {
    return "1";
  };
  let f2 = function() {
    return "1";
  };
  let f3 = function() {
    return "3";
  };
  let f4 = function() {};
  let f5 = function() {};
  let f6 = f2;

  // 对象和数组行为类似
  // 定义相同，或者一个给另一个赋值的情况下，两个变量被判定相同
  // 其他情况判定不同
  expect(obj1).toEqual(obj2);
  expect(obj1).not.toEqual(obj3);
  expect(obj4).toEqual(obj5);
  expect(obj2).toEqual(obj6);

  expect(ary1).toEqual(ary2);
  expect(ary1).not.toEqual(ary3);
  expect(ary4).toEqual(ary5);
  expect(ary2).toEqual(ary6);

  // 而对函数而言，只有赋值才会判定相同
  expect(f1).not.toEqual(f2);
  expect(f1).not.toEqual(f3);
  expect(f4).not.toEqual(f5);
  expect(f2).toEqual(f6);
});
```

### 2.3.toMatch

使用正则表达式判断

```javascript
it("toMatch and not.toMatch", function() {
  var str = "Michael Jackson";
  expect(str).toMatch(/michael/i);
  expect(str).not.toMatch(/michael/);
  expect(str).not.toMatch(/tom/i);
});
```

### 2.4.toBeDefine

判断是否是定义

```javascript
it("toBeDefined and not.toBeDefined", function() {
  var student = {
    name: "Jack",
    age: 12
  };
  let b = 2;
  let c;
  function fn() {}

  expect(student.name).toBeDefined();
  expect(student.gender).not.toBeDefined();

  // 下面这种情况会报错（ ReferenceError: a is not defined）
  // 本意是用来判断对象的属性是否存在，不能直接用来判断变量
  // 但可以挂载在全局对象下 window 检测
  expect(a).not.toBeDefined();
  expect(window.a).not.toBeDefined();

  // 但是有定义的变量，不能通过全局对象访问
  expect(b).toBeDefined();
  expect(window.b).not.toBeDefined();

  // 这里的定义包含声明和赋值行为
  expect(c).not.toBeDefined();
  expect(fn).toBeDefined();
});
```

### 2.5.toBeUndefined

判断是否是 `undefined`

```javascript
it("toBeUndefined and not.toBeUndefined", function() {
  var student = {
    name: "Jack",
    age: 12
  };

  let b = 2;
  let c;
  function fn() {}

  // 行为和 toBeDefine 相同，只是结果相反
  expect(student.gender).toBeUndefined();
  expect(student.name).not.toBeUndefined();

  //  ReferenceError: a is not defined
  expect(a).toBeUndefined();
  expect(window.a).toBeUndefined();

  expect(b).not.toBeUndefined();
  expect(window.b).toBeUndefined();

  expect(c).toBeUndefined();
  expect(fn).not.toBeUndefined();
  expect(undefined).toBeUndefined();
});
```

### 2.6.toBeNull

判断是否是 `null`

```javascript
it("toBeNull and not.toBeNull", function() {
  let student = {
    name: "jack",
    age: 12,
    desk: null
  };
  let b = null;
  let c;
  function fn() {}

  expect(student.desk).toBeNull();
  expect(student.name).not.toBeNull();

  // 这里报错，是因为传入的 a = undefined
  // expect(a).toBeNull();
  // 这里报错，是因为  a is not defined
  // expect(a).not.toBeNull();
  expect(window.a).not.toBeNull();

  expect(b).toBeNull();
  expect(window.b).not.toBeNull();

  expect(c).not.toBeNull();
  expect(fn).not.toBeNull();
  expect(null).toBeNull();
});
```

### 2.7.toBeTruthy

判断是否能转换成 `bool` 型(类似 `Boolean()`)，判断的是否是 `True`

```javascript
it("toBeTruthy and not.toBeTruthy", function() {
  var stu1;
  var stu2 = "Tom";

  expect(true).toBeTruthy();
  expect(str1).not.toBeTruthy();
  expect(str2).toBeTruthy();

  // undefined, null, "", false, NaN
  expect(undefined).not.toBeTruthy();
  expect(null).not.toBeTruthy();
  expect("").not.toBeTruthy();
  expect(false).not.toBeTruthy();
  expect(NaN).not.toBeTruthy();

  expect([]).toBeTruthy();
  expect({}).toBeTruthy();
});
```

### 2.8.toBeFalsy

判断是否能转换成 `bool` 型，判断的是否是 `False`

```javascript
it("toBeFalsy and not.toBeFalsy", function() {
  var stu1;
  var stu2 = "Tom";

  // 跟 toBeTruthy 相反
  let str1;
  let str2 = "tom";
  expect(true).not.toBeFalsy();
  expect(str1).toBeFalsy();
  expect(str2).not.toBeFalsy();
  expect(undefined).toBeFalsy();
  expect(null).toBeFalsy();
  expect("").toBeFalsy();
  expect(false).toBeFalsy();
  expect(NaN).toBeFalsy();
  expect([]).not.toBeFalsy();
  expect({}).not.toBeFalsy();
});
```

### 2.9.toContain

判断集合是否包含（可以是普通类型，和可以是对象）

```javascript
it("toContain and not.toContain", function() {
  let arrStr = ["jack", "tom", "mary"];
  let arrObj = [{ name: "jack", age: 21 }, { name: "tom", age: 22 }];
  let aryAry = [[1], [2], [3]];

  expect(arrStr).toContain("jack");
  expect(arrStr).not.toContain("Jack");
  // ??? 不能用于对象类型
  expect(arrObj).toContain({ name: "jack", age: 21 });
  expect(arrObj).not.toContain({ name: "jack", age: 21 });
  expect(arrObj).not.toContain({ name: "Jack", age: 21 });

  // ??? Expected array  To contain value
  expect(aryAry).toContain([1]);
  expect(aryAry).not.toContain([4]);
});
```

### 2.10.toBeLessThan

判断值类型的大小，结果若小则为 `True`

```javascript
it("toBeLessThan and not.toBeLessThan", function() {
  expect(1).toBeLessThan(1.1);
  // Received value must be a number.
  expect("b").not.toBeLessThan("a");
});
```

### 2.11.toBeGreaterThan

判断值类型的大小，结果若大则为 `True`，与 `toBeLessThan` 相反

```javascript
it("toBeGreaterThan and not.toBeGreaterThan", function() {
  expect(1).not.toBeGreaterThan(1.1);
  // Received value must be a number.
  expect("b").toBeGreaterThan("a");
});
```

### 2.12.toBeCloseTo

判断数字是否相似（第二个参数为小数精度，默认为 2 位）

> 根据指定小数位数来判断两个数是否相同

```javascript
it("toBeCloseTo and not.toBeCloseTo", function() {
  var a = 1.1;
  var b = 1.5;
  var c = 1.455;
  var d = 1.459;

  // 1   1
  expect(a).toBeCloseTo(b, 0);
  // 1.1  1.5
  expect(a).not.toBeCloseTo(c, 1);
  // 1  1
  expect(a).toBeCloseTo(c, 0);
  // 1.45  1.45
  expect(c).toBeCloseTo(d);
});
```

### 2.13.toThrow

判断是否抛出异常

```javascript
it("toThrow and not.toThrow", function() {
  var foo = function() {
    return 1 + 2;
  };
  var bar = function() {
    return a + 1;
  };

  expect(foo).not.toThrow();
  expect(bar).toThrow();
});
```

### 2.14.toThrowError

判断是否抛出了指定的错误

```javascript
it("toThrowError and not.toThrowError", function() {
  var foo = function() {
    throw new TypeError("foo bar baz");
  };

  expect(foo).toThrowError("foo bar baz");
  expect(foo).toThrowError(/bar/);
  expect(foo).not.toThrowError(/bak/);
  expect(foo).toThrowError(TypeError);
  expect(foo).toThrowError(TypeError, "foo bar baz");
  expect(foo).toThrowError(TypeError, /bar/);
});
```

## 3.Setup 和 Teardown

Jasmine 允许在执行测试集/测试用例的开始前/结束后做一些初始化/销毁的操作。

- `Setup` 方法：
  - `beforeAll`：每个 `suite`（即 `describe`）中所有 `spec`（即 `it`）运行之前运行
  - `beforeEach`：每个 `spec`（即 `it`）运行之前运行
- `Teardown` 方法：
  - `afterAll`：每个 `suite`（即 `describe`）中所有 `spec`（即 `it`）运行之后运行
  - `afterEach`：每个 `spec`（即 `it`）运行之后运行

```javascript
var globalCount;
describe("Setup and Teardown suite 1", function() {
  var suiteGlobalCount;
  var eachTestCount;

  beforeAll(function() {
    globalCount = 0; // 试试注释这行代码，看看对运行结果的影响
    suiteGlobalCount = 0;
    eachTestCount = 0;
  });

  afterAll(function() {
    // globalCount = 0; // 试试取消这行代码的注释，看看对运行结果的影响
    suiteGlobalCount = 0;
  });

  beforeEach(function() {
    globalCount++;
    suiteGlobalCount++;
    eachTestCount++;
  });

  afterEach(function() {
    eachTestCount = 0;
  });

  it("Spec 1", function() {
    expect(globalCount).toBe(1);
    expect(suiteGlobalCount).toBe(1);
    expect(eachTestCount).toBe(1);
  });

  it("Spec 2", function() {
    expect(globalCount).toBe(2);
    expect(suiteGlobalCount).toBe(2);
    expect(eachTestCount).toBe(1);
  });
});

// 第一次运行 describe 将 globalCount 初始化为 0
describe("Setup and Teardown suite 2", function() {
  beforeEach(function() {
    globalCount += 2;
  });

  it("Spec 1", function() {
    expect(globalCount).toBe(4);
  });
});
```

示例中的第一个 `describe`，在 `beforeAll` 中初始化了各个计数变量，在 `beforeEach` 中设置每次执行 `it` 后，各个计数变量自增 1，在 `afterAll` 中，重置了全局性的计数变量（尝试取消 `afterAll` 中对 `globalCount` 的注释，看看运行结果的变化），在 `afterEach` 中，重置了局部计数变量。

第二个 `describe`，在 `beforeEach` 中对全局变量 `globalCount` 自增 2，上述代码中，第一个 `describe` 中 `afterAll` 中没有对 `globalCount` 进行重置，因此执行完第一个 `describe` 后，`globalCount` 的值为 2，因此第二个 `describe` 的 `globalCount` 的初始值即为 2。

在 `beforeEach/it/afterEach` 中，还可以使用 `this` 关键字定义变量，需要注意的是，使用 `this` 关键字声明的变量，仅在 `beforeEach/it/afterEach` 这个过程中传递(??? 不能使用 `this`)：

```javascript
describe("Test 'this'", function() {
  beforeEach(function() {
    this.testCount = this.testCount || 0;
    this.testCount++;
  });

  afterEach(function() {
    //this.testCount = 0;
    //无论是否有这行，结果是一样的，因为 this 指定的变量只能在每个 spec 的 beforeEach/it/afterEach 过程中传递
  });

  it("Spec 1", function() {
    expect(this.testCount).toBe(1);
  });

  it("Spec 2", function() {
    expect(this.testCount).toBe(1);
  });
});
```

## 4.xdescribe/xit 的使用

在实际项目中，需要由于发布的版本需要选择测试用例包，`xdescribe` 和 `xit` 能很方便的将不包含在版本中的测试用例排除在外。不过 `xdescribe` 和 `xit` 略有不同：

- `xdescribe`：该 `describe` 下的所有 `it` 将被忽略，`Jasmine` 将直接忽略这些 `it`，因此不会被运行
- `xit`：运行到该 `it` 时，挂起它不执行

```javascript
xdescribe("Test xdescribe", function() {
  it("Spec 1", function() {
    expect(1).toBe(1);
  });

  it("Spec 2", function() {
    expect(2).toBe(2);
  });
});

describe("Test xit", function() {
  it("Spec 1", function() {
    expect(1).toBe(1);
  });

  xit("Spec 2", function() {
    expect(2).toBe(1);
  });

  xit("Spec 3", function() {
    expect(3).toBe(3);
  });
});
```

## 5.spy

`Spy` 用来追踪函数的调用历史信息（是否被调用、调用参数列表、被请求次数等）。`Spy` 仅存在于定义它的 `describe` 和 `it` 方法块中，并且每次在 `spec` 执行完之后被销毁。

```javascript
describe("A spy", function() {
  var foo,
    bar = null;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      }
    };

    spyOn(foo, "setBar"); // 在 foo 对象上添加 spy

    // 此时调用 foo 对象上的方法，均为模拟调用，因此不会执行实际的代码
    foo.setBar(123); // 调用 foo 的 setBar 方法
    foo.setBar(456, "another param");
  });

  it("tracks that the spy was called", function() {
    expect(foo.setBar).toHaveBeenCalled();
    //判断 foo 的 setBar 是否被调用
  });

  it("tracks all the arguments of its calls", function() {
    expect(foo.setBar).toHaveBeenCalledWith(123); //判断被调用时的参数
    expect(foo.setBar).toHaveBeenCalledWith(456, "another param");
  });

  it("stops all execution on a function", function() {
    expect(bar).toBeNull(); // 由于是模拟调用，因此 bar 值并没有改变
  });
});
```

> 当在一个对象上使用 `spyOn` 方法后即可模拟调用对象上的函数，此时对所有函数的调用是不会执行实际代码的。

两个 `Spy` 常用的 `expect`：

- `toHaveBeenCalled`: 函数是否被调用
- `toHaveBeenCalledWith`: 调用函数时的参数

### 5.1.and.callThrough

那如果说我们想在使用 `Spy` 的同时也希望执行实际的代码呢？

```javascript
// situation 1
describe("A spy, when configured to call through", function() {
  var foo, bar, fetchedBar;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      },
      getBar: function() {
        return bar;
      }
    };

    spyOn(foo, "getBar").and.callThrough();
    // 与上例中不同之处在于使用了 callThrough，这将时所有的函数调用为真实的执行
    foo.setBar(123);
    fetchedBar = foo.getBar();
  });

  it("tracks that the spy was called", function() {
    expect(foo.getBar).toHaveBeenCalled();
  });

  it("should not effect other functions", function() {
    expect(bar).toEqual(123);
    // 由于是真实调用，因此 bar 有了真实的值
  });

  it("when called returns the requested value", function() {
    expect(fetchedBar).toEqual(123);
    // 由于是真实调用，fetchedBar 也有了真实的值
  });
});

// situation 2
describe("A spy, when configured to call through", function() {
  var foo, bar, fetchedBar;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      },
      getBar: function() {
        return bar;
      }
    };

    spyOn(foo, "setBar").and.callThrough();

    foo.setBar(123);
    fetchedBar = foo.getBar();
  });

  it("tracks that the spy was called", function() {
    expect(foo.setBar).toHaveBeenCalled();
  });

  it("should not effect other functions", function() {
    expect(bar).toEqual(123);
    // 由于是真实调用，因此 bar 有了真实的值
  });

  it("when called returns the requested value", function() {
    expect(fetchedBar).toEqual(123);
    // 由于是真实调用，fetchedBar 也有了真实的值
  });
});

// situation 3

// situation 4
describe("A spy, when configured to call through", function() {
  var foo, bar, fetchedBar;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      },
      getBar: function() {
        return bar;
      }
    };

    spyOn(foo, "setBar");

    foo.setBar(123);
    fetchedBar = foo.getBar();
  });

  it("tracks that the spy was called", function() {
    expect(foo.setBar).toHaveBeenCalled();
    // expect(foo.getBar).toHaveBeenCalled();
  });

  it("should not effect other functions", function() {
    expect(bar).toBeUndefined();
    // 由于是模拟调用，因此 bar 没有改变
  });

  it("when called returns the requested value", function() {
    expect(fetchedBar).toBeUndefined();
    // 由于是模拟调用，fetchedBar 没有改变
  });
});

// situation 5
describe("A spy, when configured to call through", function() {
  var foo, bar, fetchedBar;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      },
      getBar: function() {
        return bar;
      }
    };

    spyOn(foo, "getBar");

    foo.setBar(123);
    fetchedBar = foo.getBar();
  });

  it("tracks that the spy was called", function() {
    expect(foo.getBar).toHaveBeenCalled();
  });

  it("should not effect other functions", function() {
    expect(bar).toEqual(123);
    // 由于是模拟调用？？？
  });

  it("when called returns the requested value", function() {
    expect(fetchedBar).toBeUndefined();
    // 由于是模拟调用，fetchedBar 没有改变
  });
});

// situation 6
describe("A spy, when configured to call through", function() {
  var foo, bar, fetchedBar;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      },
      getBar: function() {
        return bar;
      }
    };

    // spyOn(foo, "setBar").and.callThrough();
    // spyOn(foo, "getBar").and.callThrough();
    // 与上例不同之处在于使用了 callThrough，这将时所有的函数调用为真实的执行

    spyOn(foo, "setBar");
    spyOn(foo, "getBar");
    // 可以使用上例中的模拟方式，看看测试集执行的结果

    foo.setBar(123);
    fetchedBar = foo.getBar();
  });

  it("tracks that the spy was called", function() {
    expect(foo.setBar).toHaveBeenCalled();
    expect(foo.getBar).toHaveBeenCalled();
  });

  it("should not effect other functions", function() {
    // expect(bar).toEqual(123);
    expect(bar).toBeUndefined();
    // 由于是真实调用，因此 bar 有了真实的值
  });

  it("when called returns the requested value", function() {
    // expect(fetchedBar).toEqual(123);
    expect(fetchedBar).toBeUndefined();
    // 由于是真实调用，fetchedBar 也有了真实的值
  });
});
```

> 模拟数据的情况下，只监听 `set` 函数，被设置的变量不会改变，监听 `get` 函数的时候会改变。？？？被监听的函数只会模拟执行，没被监听的函数正常执行？？？

| set-and.callThrough | get-and.callThrough | set | get |    bar    | fetchedBar |
| :-----------------: | :-----------------: | :-: | :-: | :-------: | :--------: |
|          ✔          |          ×          |  ×  |  ×  |    123    |    123     |
|          ×          |          ✔          |  ×  |  ×  |    123    |    123     |
|          ✔          |          ✔          |  ×  |  ×  |    123    |    123     |
|          ×          |          ×          |  ✔  |  ×  | undefined | undefined  |
|          ×          |          ×          |  ×  |  ✔  |    123    | undefined  |
|          ×          |          ×          |  ✔  |  ✔  | undefined | undefined  |

### 5.2.and.returnValue

由于 `Spy` 是模拟函数的调用，因此我们也可以强制指定函数的返回值。

```javascript
describe("A spy, when configured to fake a return value", function() {
  var foo, bar, fetchedBar;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      },
      getBar: function() {
        return bar;
      }
    };

    spyOn(foo, "getBar").and.returnValue(745);
    // 这将指定 getBar 方法返回值为 745

    foo.setBar(123);
    fetchedBar = foo.getBar();
  });

  it("tracks that the spy was called", function() {
    expect(foo.getBar).toHaveBeenCalled();
  });

  it("should not effect other functions", function() {
    expect(bar).toEqual(123);
  });

  it("when called returns the requested value", function() {
    expect(fetchedBar).toEqual(745);
  });
});
```

> 如果被调用的函数是通过从其他函数获取某些值，我们通过使用 `returnValue` 模拟函数的返回值。这样做的好处是可以有效的隔离依赖，使测试流程变得更简单。

### 5.3.and.callFake

与 `returnValue` 相似，`callFake` 则更进一步，直接通过指定一个假的自定义函数来执行。这种方式比 `returnValue` 更灵活，我们可以任意捏造一个函数来达到我们的测试要求。

```javascript
describe("A spy, when configured with an alternate implementation", function() {
  var foo, bar, fetchedBar;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      },
      getBar: function() {
        return bar;
      }
    };

    spyOn(foo, "getBar").and.callFake(function() {
      return 1001;
    });

    foo.setBar(123);
    fetchedBar = foo.getBar();
  });

  it("tracks that the spy was called", function() {
    expect(foo.getBar).toHaveBeenCalled();
  });

  it("should not effect other functions", function() {
    expect(bar).toEqual(123);
  });

  it("when called returns the requested value", function() {
    expect(fetchedBar).toEqual(1001);
  });
});
```

### 5.4.and.throwError

`throwError` 便于我们模拟异常的抛出。

```javascript
describe("A spy, when configured to throw an error", function() {
  var foo, bar;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      }
    };

    spyOn(foo, "setBar").and.throwError("quux");
  });

  it("throws the value", function() {
    expect(function() {
      foo.setBar(123);
    }).toThrowError("quux");
  });
});
```

### 5.5.and.stub

```javascript
describe("A spy", function() {
  var foo,
    bar = null;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      },
      getBar: function() {
        return bar;
      }
    };

    spyOn(foo, "setBar").and.callThrough(); // 标记1
    spyOn(foo, "getBar").and.returnValue(999); // 标记2
  });

  it("can call through and then stub in the same spec", function() {
    foo.setBar(123);
    expect(bar).toEqual(123);

    var getValue = foo.getBar();
    expect(getValue).toEqual(999);

    foo.setBar.and.stub(); 
    // 相当于'标记1'中的代码变为了 spyOn(foo, 'setBar')
    foo.getBar.and.stub(); 
    // 相当于'标记2'中的代码变为了 spyOn(foo, 'getBar')

    bar = null;

    foo.setBar(123);
    expect(bar).toBe(null);
    expect(foo.setBar).toHaveBeenCalled(); // 函数调用追踪并没有被重置

    getValue = foo.getBar();
    expect(getValue).toEqual(undefined);
    expect(foo.getBar).toHaveBeenCalled(); // 函数调用追踪并没有被重置
  });
});
```

参考：

[Jasmine 入门（上）](https://www.cnblogs.com/wushangjue/p/4541209.html)

[Jasmine 入门（下）](https://www.cnblogs.com/wushangjue/p/4575826.html)

阅读：

[Javascript 测试框架 Jasmine（五）：Spies](http://keenwon.com/1218.html)

[jasmine行为驱动,测试先行](http://blog.fens.me/nodejs-jasmine-bdd/)

[手把手教你如何安装和使用 Karma-Jasmine](https://www.cnblogs.com/wushangjue/p/4539189.html)

[JavaScript 单元测试框架：Jasmine 初探](https://www.ibm.com/developerworks/cn/web/1404_changwz_jasmine/index.html)

[使用 Karma + Jasmine 构建 Web 测试环境](https://www.ibm.com/developerworks/cn/web/wa-lo-use-karma-jasmine-build-test-environment/index.html)
