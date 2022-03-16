# Jasmine

## 1. 基本语法介绍

### 1.1.Suites

`Suites` 可以理解为一组测试，使用全局的 `Jasmin` 函数 `describe` 创建。`describe` 函数接受两个参数，一个字符串和一个函数。字符串是这个 `Suites` 的名字或标题（通常描述下测试内容），函数是实现 `Suites` 的代码块。

**`describe(string, function)`**：测试集

- 参数 `string`：描述测试包的信息
- 参数 `function`：测试集的具体实现

### 1.2.Specs

`Specs` 可以理解为一个测试，使用全局的 `Jasmine` 函数 `it` 创建。和`describe` 一样接受两个参数，一个字符串和一个函数，函数就是要执行的测试，字符串就是测试的名字。一个 `Spec` 可以包含多个 `expectations` 来测试代码。在 `Jasmine` 中，一个 `expectations` 就是一个断言，只能是 `true` 或 `false`。只有全部 `expectations` 是 `true` 的时候 `spec` 才会通过。

**`it(string, function)`**：测试用例

- 参数 `string`：描述测试用例的信息
- 参数 `function`：测试用例的具体实现

> 由于 `describe` 和 `it` 块实质上都函数，所有他可以包含任何的可执行代码。javascript 的作用域规则也是适用的，所以 `describe` 内定义的变量，其内部所有的 `it` 都能访问到。

### 1.3.Expectations

`expectations` 由 `expect` 函数创建。接受一个参数。和 `Matcher` 一起联用，设置测试的预期值。

**`expect()`**：断言表达式

```js
describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});
```

### 1.4. 嵌套 describe

可以嵌套使用 `describe`，形成一个 `Suite` 树，在一个 `spec` 执行之前，`Jasmine` 会顺序执行这颗树上的所有 `beforeEach`。同样的，执行完 `spec` 后，也会顺序执行树上的所有 `afterEach`。

```js
describe("测试嵌套 describe：level1", function() {
  var foo;

  beforeEach(function() {
    window.console.log("level1：Setup");
  });

  afterEach(function() {
    window.console.log("level1：Teardown");
  });

  it("level1：测试", function() {
    window.console.log("level1：测试");
  });

  describe("测试嵌套 describe:level2", function() {
    beforeEach(function() {
      window.console.log("level2：Setup");
    });

    afterEach(function() {
      window.console.log("level2：Teardown");
    });

    it("level2：测试", function() {
      window.console.log("level2：测试");
    });
  });
});
```

另外可以使用 `pending` 函数将 `specs` 挂起，挂起 `specs` 和使用 `xit` 函数定义的 `spec` 一样，`spec` 不会被执行，但是名字会出现在报表中（经过实践，没有出现，并且一旦有 `pending` 之前禁用的 `spec` 不会出现在报表中）。另外只有名字，没有实际代码的 `spec` 也会在结果中显示为挂起的状态（经过实践，效果更类似与 `xit`）。`pending` 可以在 `spec` 函数体的任何地方调用，不管函数体内有没有 `expectations`，还是看个例子：

```js
describe("Pending specs", function() {
  xit("can be declared 'xit'", function() {
    expect(true).toBe(false);
  });

  it("can be declared with 'it' but without a function");

  it("can be declared by calling 'pending' in the spec body", function() {
    expect(true).toBe(false);
    // 挂起
    pending();
  });
});
```

### 1.4.Matcher

在 `Jasmine` 中，每个 `Matcher` 实现一个“期望值”和“实际值”的布尔判断，`Jasmine` 会根据 `Mather` 判断 `expectation` 是 `true` 还是 `false`，然后决定 `spec` 是测试通过还是失败。所有 `Matcher` 可以通过 `not` 执行否定判断。

## 2. 内置 Matcher 方法的使用

测试实例见 [HelloWorld.spec.js](https://github.com/richardmyu/learnRep/blob/master/Notes/unitTesting/demo/vueTest/vue-test-demo-jest/test/unit/specs/HelloWorld.spec.js)

### 2.1.toBe

基本类型判断（执行 `===` 对比）

```js
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

```js
it("toEqual and not.toEqual for basic types", function() {
  expect(1).toEqual(1);
  // 同 toBe，也是 ===
  // expect(1).toEqual('1');
  expect("a").not.toEqual("b");
});
```

`toEqual` 还可以用来判断对象：

```js
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

```js
it("toMatch and not.toMatch", function() {
  var str = "Michael Jackson";
  expect(str).toMatch(/michael/i);
  expect(str).not.toMatch(/michael/);
  expect(str).not.toMatch(/tom/i);
});
```

### 2.4.toBeDefine

判断是否是定义

```js
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
  // 但可以挂载在全局对象下 window 检测（但那就是另外一个变量了。)
  expect(a).not.toBeDefined();
  expect(window.a).not.toBeDefined();

  // 但是有定义的变量，不能通过全局对象访问
  // 也即是说在该环境下 window.a 和 a 是两个不同的变量
  expect(b).toBeDefined();
  expect(window.b).not.toBeDefined();

  // 这里的定义包含声明和赋值行为
  expect(c).not.toBeDefined();
  expect(fn).toBeDefined();
});
```

### 2.5.toBeUndefined

判断是否是 `undefined`

```js
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

```js
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

判断是否能转换成 `boolean` 型（类似 `Boolean()`)，判断的是否是 `true`

```js
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

判断是否能转换成 `boolean` 型，判断的是否是 `false`

```js
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

判断数组集合是否包含某个基础类型的值

```js
it("toContain and not.toContain", function() {
  let arrStr = ["jack", "tom", "mary"];
  let arrObj = [{ name: "jack", age: 21 }, { name: "tom", age: 22 }];
  let aryAry = [[1], [2], [3]];

  expect(arrStr).toContain("jack");
  expect(arrStr).not.toContain("Jack");
  // ??? 不能用于对象类型 yong objectContaining
  // expect(arrObj).toContain({ name: "jack", age: 21 });
  expect(arrObj).not.toContain({ name: "jack", age: 21 });

  // ??? Expected array  To contain value
  // expect(aryAry).toContain([1]);
  expect(aryAry).not.toContain([1]);
});
```

### 2.10.toBeLessThan

判断值类型的大小，结果若小则为 `True`

```js
it("toBeLessThan and not.toBeLessThan", function() {
  expect(1).toBeLessThan(1.1);
  // Received value must be a number.
  expect("b").not.toBeLessThan("a");
});
```

### 2.11.toBeGreaterThan

判断值类型的大小，结果若大则为 `True`，与 `toBeLessThan` 相反

```js
it("toBeGreaterThan and not.toBeGreaterThan", function() {
  expect(1).not.toBeGreaterThan(1.1);
  // Received value must be a number.
  expect("b").toBeGreaterThan("a");
});
```

### 2.12.toBeCloseTo

比较两个值是否足够接近（不一定要相等），而这个“足够接近”就是 `toBeCloseTo` 的第二个参数指定的，它由 `Math.pow(10, -precision) / 2` 表示。

```js
it("toBeCloseTo and not.toBeCloseTo", function() {
  var a = 1.1;
  var b = 1.5;
  var c = 1.455;
  var d = 1.459;

  // pass :Math.abs(expected-actual) < (Math.pow(10,-precision)/2)
  // 0.4 < 0.5
  expect(a).toBeCloseTo(b, 0);
  // 0.4 < 0.05
  expect(a).not.toBeCloseTo(b, 1);

  // 0.045 < 0.05
  expect(b).toBeCloseTo(c, 1);

  // 0.355 < 0.05
  expect(a).not.toBeCloseTo(c, 1);

  // 0.004 < 0.005
  expect(c).toBeCloseTo(d);

  // 0.004 < 0.0005
  expect(c).not.toBeCloseTo(d, 3);
});
```

> 小结：第二个参数为 0，两数之差在 0.5 以内则为近似；参数为 1，两数之差在 0.05 以内则判定近似，以此类推。

再看看它的源码：

```js
getJasmineRequireObj().toBeCloseTo = function() {
  function toBeCloseTo() {
    return {
      compare: function(actual, expected, precision) {
        if (precision !== 0) {
          precision = precision || 2;
        }

        return {
          pass: Math.abs(expected - actual) < Math.pow(10, -precision) / 2
        };
      }
    };
  }

  return toBeCloseTo;
};
```

### 2.13.toThrow

判断是否抛出异常

```js
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

```js
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

```js
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

在 `beforeEach/it/afterEach` 中，还可以使用 `this` 关键字定义变量，需要注意的是，使用 `this` 关键字声明的变量，仅在 `beforeEach/it/afterEach` 这个过程中传递（根据一下代码的实践反应，无法共享 `this`)：

```js
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

```js
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

`Spy` 用来追踪函数的调用历史信息（是否被调用、调用参数列表、被请求次数等）。可以用来模拟函数的执行，以达到隔离复杂依赖的效果。例如，你要测试列表的处理是否正确，但是数据是异步请求接口取得的，这时你就可以使用 Spies，模拟返回各种不同的数据进行测试。`spy` 可以保存任何函数的调用记录和输入的参数，`Spy` 仅存在于定义它的 `describe` 和 `it` 方法块中，并且每次在 `spec` 执行完之后被销毁。

```js
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

那如果说我们想在使用 `Spy` 的同时也希望执行实际的代码呢？`spy` 链式调用 `and.callThrough` 后，在获取 `spy` 的同时，调用实际的函数

```js
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
    spyOn(foo, "getBar").and.callThrough();

    foo.setBar(123);
    fetchedBar = foo.getBar();
  });

  it("tracks that the spy was called", function() {
    expect(foo.setBar).toHaveBeenCalled();
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
    // 真实调用，但是 setBar 是模拟调用，即 bar 还是 undefined， 所以 fetchedBar 没有改变
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
    // 真实调用
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

    spyOn(foo, "setBar");
    spyOn(foo, "getBar");

    foo.setBar(123);
    fetchedBar = foo.getBar();
  });

  it("tracks that the spy was called", function() {
    expect(foo.setBar).toHaveBeenCalled();
    expect(foo.getBar).toHaveBeenCalled();
  });

  it("should not effect other functions", function() {
    expect(bar).toBeUndefined();
    // 模拟调用
  });

  it("when called returns the requested value", function() {
    expect(fetchedBar).toBeUndefined();
    // 模拟调用
  });
});
```

| set-and.callThrough | get-and.callThrough |  set  |  get  |    bar    | fetchedBar |
| :-----------------: | :-----------------: | :---: | :---: | :-------: | :--------: |
|          ✔          |          ×          |   ×   |   ×   |    123    |    123     |
|          ×          |          ✔          |   ×   |   ×   |    123    |    123     |
|          ✔          |          ✔          |   ×   |   ×   |    123    |    123     |
|          ×          |          ×          |   ✔   |   ×   | undefined | undefined  |
|          ×          |          ×          |   ×   |   ✔   |    123    | undefined  |
|          ×          |          ×          |   ✔   |   ✔   | undefined | undefined  |

> 没有被监听的函数，是正常执行的，而被监听的函数是隔离的，即实际没有执行，除非调用 `and.callThrough`。

### 5.2.and.returnValue

由于 `Spy` 是模拟函数的调用，因此我们也可以强制指定函数的返回值。

```js
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

```js
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

```js
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

`spy` 恢复到原始状态，不执行任何操作。

```js
describe("A spy stub", function() {
  let foo;
  let bar = null;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      },
      getBar: function() {
        return bar;
      }
    };

    spyOn(foo, "setBar").and.callThrough(); // 标记 1
    spyOn(foo, "getBar").and.returnValue(999); // 标记 2
  });

  foo.setBar(123);
  console.log("111", bar, getValue);

  expect(bar).toEqual(123);

  var getValue = foo.getBar();
  expect(getValue).toEqual(999);

  console.log("222", bar, getValue);

  foo.setBar.and.stub();
  console.log("333-1", bar, getValue);
  // 相当于'标记 1'中的代码变为了 spyOn(foo, 'setBar')
  // ??? 什么叫相当于
  // ??? 等价于去除 add.callThrough add.returnValue 的影响
  foo.getBar.and.stub();
  console.log("333-2", bar, getValue);
  // 相当于'标记 2'中的代码变为了 spyOn(foo, 'getBar')
  bar = null;
  console.log("444", bar, getValue);

  foo.setBar(123); //模拟执行
  console.log("555", bar, getValue);
  expect(bar).toBe(null);
  expect(foo.setBar).toHaveBeenCalled();
  // 函数调用追踪并没有被重置 ???

  getValue = foo.getBar(); //模拟执行
  console.log("666", bar, getValue);
  expect(getValue).toEqual(undefined);
  expect(foo.getBar).toHaveBeenCalled();
  // 函数调用追踪并没有被重置 ???
});
```

[源码](https://github.com/pivotal/jasmine/blob/master/src/core/SpyStrategy.js)

```js
getJasmineRequireObj().SpyStrategy = function(j$) {
  /**
   * @interface SpyStrategy
   */
  function SpyStrategy(options) {
    options = options || {};

    /**
     * Get the identifying information for the spy.
     * @name SpyStrategy#identity
     * @member
     * @type {String}
     */
    this.identity = options.name || "unknown";
    this.originalFn = options.fn || function() {};
    this.getSpy = options.getSpy || function() {};
    this.plan = this._defaultPlan = function() {};

    var k,
      cs = options.customStrategies || {};
    for (k in cs) {
      if (j$.util.has(cs, k) && !this[k]) {
        this[k] = createCustomPlan(cs[k]);
      }
    }
  }

  function createCustomPlan(factory) {
    return function() {
      var plan = factory.apply(null, arguments);

      if (!j$.isFunction_(plan)) {
        throw new Error("Spy strategy must return a function");
      }

      this.plan = plan;
      return this.getSpy();
    };
  }

  ...

  /**
   * Tell the spy to do nothing when invoked. This is the default.
   * @name SpyStrategy#stub
   * @function
   */
  SpyStrategy.prototype.stub = function(fn) {
    this.plan = function() {};
    return this.getSpy();
  };

  ...

  return SpyStrategy;
};
```

**其他追踪属性**：

> `calls`：对于被 `Spy` 的函数的调用，都可以在 `calls` 属性中跟踪。

---

- `.calls.any()`: 被 `Spy` 的函数一旦被调用过，则返回 `true`，否则为 `false`；
- `.calls.count()`: 返回被 `Spy` 的函数的被调用次数；
- `.calls.argsFor(index)`: 返回被 `Spy` 的函数的调用参数，以 `index` 来指定参数；
- `.calls.allArgs()`: 返回被 `Spy` 的函数的所有调用参数；
- `.calls.all()`: 返回 `calls` 的上下文，这将返回当前 `calls` 的整个实例数据；
- `.calls.mostRecent()`: 返回 `calls` 中追踪的最近一次的请求数据；
- `.calls.first()`: 返回 `calls` 中追踪的第一次请求的数据；
- `.object`: 当调用 `all()`，`mostRecent()`，`first()`方法时，返回对象的 `object` 属性返回的是当前上下文对象；
- `.calls.reset()`: 重置 `Spy` 的所有追踪数据；

---

```js
describe("A spy calls", function() {
  var foo,
    bar = null;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      }
    };

    spyOn(foo, "setBar");
  });

  it("tracks if it was called at all", function() {
    expect(foo.setBar.calls.any()).toEqual(false);
    foo.setBar();

    // 被 Spy 的函数一旦被调用过，则返回 true，否则为 false；
    expect(foo.setBar.calls.any()).toEqual(true);
  });

  it("tracks the number of times it was called", function() {
    expect(foo.setBar.calls.count()).toEqual(0);
    foo.setBar();

    // 返回被 Spy 的函数的被调用次数
    expect(foo.setBar.calls.count()).toEqual(2);
  });

  it("tracks the arguments of each call", function() {
    foo.setBar(123);
    foo.setBar(456, "baz");

    // 返回被 Spy 的函数的调用参数，以 index 来指定参数
    expect(foo.setBar.calls.argsFor(0)).toEqual([123]);
    expect(foo.setBar.calls.argsFor(1)).toEqual([456, "baz"]);
  });

  it("tracks the arguments of all calls", function() {
    foo.setBar(123);
    foo.setBar(456, "baz");

    // 返回被 Spy 的函数的所有调用参数；
    expect(foo.setBar.calls.allArgs()).toEqual([[123], [456, "baz"]]);
  });

  it("can provide the context and arguments to all calls", function() {
    foo.setBar(123);

    // 返回 calls 的上下文，这将返回当前 calls 的整个实例数据
    // ???
    expect(foo.setBar.calls.all()).toEqual([
      { object: foo, args: [123], returnValue: undefined }
    ]);
  });

  it("has a shortcut to the most recent call", function() {
    foo.setBar(123);
    foo.setBar(456, "baz");

    // 返回 calls 中追踪的最近一次的请求数据
    expect(foo.setBar.calls.mostRecent()).toEqual({
      object: foo,
      args: [456, "baz"],
      returnValue: undefined
    });
  });

  it("has a shortcut to the first call", function() {
    foo.setBar(123);
    foo.setBar(456, "baz");

    // 返回 calls 中追踪的第一次请求的数据
    expect(foo.setBar.calls.first()).toEqual({
      object: foo,
      args: [123],
      returnValue: undefined
    });
  });

  it("tracks the context", function() {
    // 创建一个空的 Spy
    var spy = jasmine.createSpy("spy");
    var baz = {
      fn: spy
    };
    var quux = {
      fn: spy
    };
    baz.fn(123);
    quux.fn(456);

    // 当调用 all() ，mostRecent() ，first() 方法时
    // 返回对象的 object 属性返回的是当前上下文对象
    // ???
    expect(spy.calls.first().object).toBe(baz);
    expect(spy.calls.mostRecent().object).toBe(quux);
  });

  it("can be reset", function() {
    foo.setBar(123);
    foo.setBar(456, "baz");
    expect(foo.setBar.calls.any()).toBe(true);

    // 重置 Spy 的所有追踪数据
    // 追踪失效
    foo.setBar.calls.reset();
    expect(foo.setBar.calls.any()).toBe(false);
  });
});
```

### 5.6.createSpy

假如没有函数可以追踪，我们可以自己创建一个空的 `Spy`。创建后的 `Spy` 功能与其他的 `Spy` 一样：跟踪调用、参数等，但该 `Spy` 没有实际的代码实现，这种方式经常会用在对 JavaScript 中的对象的测试。

```js
describe("A spy, when created manually", function() {
  var whatAmI;

  beforeEach(function() {
    whatAmI = jasmine.createSpy("whatAmI");

    whatAmI("I", "am", "a", "spy");
  });

  it("is named, which helps in error reporting", function() {
    // 初始值
    expect(whatAmI.and.identity()).toEqual("whatAmI");
  });

  it("tracks that the spy was called", function() {
    // 是否调用
    expect(whatAmI).toHaveBeenCalled();
  });

  it("tracks its number of calls", function() {
    // 调用次数
    expect(whatAmI.calls.count()).toEqual(1);
  });

  it("tracks all the arguments of its calls", function() {
    // 传入参数
    expect(whatAmI).toHaveBeenCalledWith("I", "am", "a", "spy");
  });

  it("allows access to the most recent call", function() {
    // 最近一次请求的第一个参数
    expect(whatAmI.calls.mostRecent().args[0]).toEqual("I");
    expect(whatAmI.calls.argsFor(0)).toEqual(["I", "am", "a", "spy"]);
    //  TypeError: Cannot read property '0' of undefined
    expect(whatAmI.calls.argsFor(0).args[0]).toEqual("I");
  });
});
```

[源码](https://github.com/jasmine/jasmine/blob/master/src/core/Spy.js)

```js
getJasmineRequireObj().Spy = function(j$) {
  var nextOrder = (function() {
    var order = 0;

    return function() {
      return order++;
    };
  })();

  /**
   * _Note:_ Do not construct this directly, use {@link spyOn}, {@link spyOnProperty}, {@link jasmine.createSpy}, or {@link jasmine.createSpyObj}
   * @constructor
   * @name Spy
   */
  function Spy(name, originalFn, customStrategies) {
    var numArgs = typeof originalFn === "function" ? originalFn.length : 0,
      wrapper = makeFunc(numArgs, function() {
        return spy.apply(this, Array.prototype.slice.call(arguments));
      }),
      strategyDispatcher = new SpyStrategyDispatcher({
        name: name,
        fn: originalFn,
        getSpy: function() {
          return wrapper;
        },
        customStrategies: customStrategies
      }),
      callTracker = new j$.CallTracker(),
      spy = function() {
        /**
         * @name Spy.callData
         * @property {object} object - `this` context for the invocation.
         * @property {number} invocationOrder - Order of the invocation.
         * @property {Array} args - The arguments passed for this invocation.
         */
        var callData = {
          object: this,
          invocationOrder: nextOrder(),
          args: Array.prototype.slice.apply(arguments)
        };

        callTracker.track(callData);
        var returnValue = strategyDispatcher.exec(this, arguments);
        callData.returnValue = returnValue;

        return returnValue;
      };

    function makeFunc(length, fn) {
      switch (length) {
        case 1:
          return function(a) {
            return fn.apply(this, arguments);
          };
        case 2:
          return function(a, b) {
            return fn.apply(this, arguments);
          };
        case 3:
          return function(a, b, c) {
            return fn.apply(this, arguments);
          };
        case 4:
          return function(a, b, c, d) {
            return fn.apply(this, arguments);
          };
        case 5:
          return function(a, b, c, d, e) {
            return fn.apply(this, arguments);
          };
        case 6:
          return function(a, b, c, d, e, f) {
            return fn.apply(this, arguments);
          };
        case 7:
          return function(a, b, c, d, e, f, g) {
            return fn.apply(this, arguments);
          };
        case 8:
          return function(a, b, c, d, e, f, g, h) {
            return fn.apply(this, arguments);
          };
        case 9:
          return function(a, b, c, d, e, f, g, h, i) {
            return fn.apply(this, arguments);
          };
        default:
          return function() {
            return fn.apply(this, arguments);
          };
      }
    }

    for (var prop in originalFn) {
      if (prop === "and" || prop === "calls") {
        throw new Error(
          "Jasmine spies would overwrite the 'and' and 'calls' properties on the object being spied upon"
        );
      }

      wrapper[prop] = originalFn[prop];
    }

    /**
     * @member {SpyStrategy} - Accesses the default strategy for the spy. This strategy will be used
     * whenever the spy is called with arguments that don't match any strategy
     * created with {@link Spy#withArgs}.
     * @name Spy#and
     * @example
     * spyOn(someObj, 'func').and.returnValue(42);
     */
    wrapper.and = strategyDispatcher.and;
    /**
     * Specifies a strategy to be used for calls to the spy that have the
     * specified arguments.
     * @name Spy#withArgs
     * @function
     * @param {...*} args - The arguments to match
     * @type {SpyStrategy}
     * @example
     * spyOn(someObj, 'func').withArgs(1, 2, 3).and.returnValue(42);
     * someObj.func(1, 2, 3); // returns 42
     */
    wrapper.withArgs = function() {
      return strategyDispatcher.withArgs.apply(strategyDispatcher, arguments);
    };
    wrapper.calls = callTracker;

    return wrapper;
  }

  function SpyStrategyDispatcher(strategyArgs) {
    var baseStrategy = new j$.SpyStrategy(strategyArgs);
    var argsStrategies = new StrategyDict(function() {
      return new j$.SpyStrategy(strategyArgs);
    });

    this.and = baseStrategy;

    this.exec = function(spy, args) {
      var strategy = argsStrategies.get(args);

      if (!strategy) {
        if (argsStrategies.any() && !baseStrategy.isConfigured()) {
          throw new Error(
            "Spy '" +
              strategyArgs.name +
              "' receieved a call with arguments " +
              j$.pp(Array.prototype.slice.call(args)) +
              " but all configured strategies specify other arguments."
          );
        } else {
          strategy = baseStrategy;
        }
      }

      return strategy.exec(spy, args);
    };

    this.withArgs = function() {
      return { and: argsStrategies.getOrCreate(arguments) };
    };
  }

  function StrategyDict(strategyFactory) {
    this.strategies = [];
    this.strategyFactory = strategyFactory;
  }

  StrategyDict.prototype.any = function() {
    return this.strategies.length > 0;
  };

  StrategyDict.prototype.getOrCreate = function(args) {
    var strategy = this.get(args);

    if (!strategy) {
      strategy = this.strategyFactory();
      this.strategies.push({
        args: args,
        strategy: strategy
      });
    }

    return strategy;
  };

  StrategyDict.prototype.get = function(args) {
    var i;

    for (i = 0; i < this.strategies.length; i++) {
      if (j$.matchersUtil.equals(args, this.strategies[i].args)) {
        return this.strategies[i].strategy;
      }
    }
  };

  return Spy;
};
```

### 5.7.createSpyObj （经过实践，没有该方法）

如果需要 `spy` 模拟多个函数调用，可以向 `jasmine.createSpyObj` 中传入一个字符串数组，它将返回一个对象，你所传入的所有字符串都将对应一个属性，每个属性即为一个 `Spy`。

```js
describe("Multiple spies, when created manually", function() {
  var tape;

  beforeEach(function() {
    // TypeError: jasmine.createSpyObj is not a function
    // ???
    tape = jasmine.createSpyObj("tape", ["play", "pause", "stop", "rewind"]);

    tape.play();
    tape.pause();
    tape.rewind(0);
  });

  it("creates spies for each requested function", function() {
    expect(tape.play).toBeDefined();
    expect(tape.pause).toBeDefined();
    expect(tape.stop).toBeDefined();
    expect(tape.rewind).toBeDefined();
  });

  it("tracks that the spies were called", function() {
    expect(tape.play).toHaveBeenCalled();
    expect(tape.pause).toHaveBeenCalled();
    expect(tape.rewind).toHaveBeenCalled();
    expect(tape.stop).not.toHaveBeenCalled();
  });

  it("tracks all the arguments of its calls", function() {
    expect(tape.rewind).toHaveBeenCalledWith(0);
  });
});
```

## 6. 其他匹配方式

### 6.1.jasmine.any

`jasmine.any` 方法以构造器或者类名作为参数，`Jasmine` 将判断期望值和真实值的构造器是否相同，若相同则返回 `true`。

```js
```

```js
describe("jasmine.any", function() {
  it("matches any value", function() {
    expect({}).toEqual(jasmine.any(Object));
    expect(12).toEqual(jasmine.any(Number));
  });

  describe("when used with a spy", function() {
    it("is useful for comparing arguments", function() {
      var foo = jasmine.createSpy("foo");
      foo(12, function() {
        return true;
      });

      expect(foo).toHaveBeenCalledWith(
        jasmine.any(Number),
        jasmine.any(Function)
      );
    });
  });
});
```

### 6.2.jasmine.anything

`jasmine.anything` 判断只要不是 `null` 或 `undefined` 类型的值，若不是则返回 `true`。

```js
describe("jasmine.anything", function() {
  it("matches anything", function() {
    expect(1).toEqual(jasmine.anything());
  });

  describe("when used with a spy", function() {
    it("is useful when the argument can be ignored", function() {
      var foo = jasmine.createSpy("foo");
      foo(12, function() {
        return false;
      });

      expect(foo).toHaveBeenCalledWith(12, jasmine.anything());
    });
  });
});
```

### 6.3.jasmine.objectContaining

`jasmine.objectContaining` 用来判断对象中是否存在指定的键值对。

```js
describe("jasmine.objectContaining", function() {
  var foo;

  beforeEach(function() {
    foo = {
      a: 1,
      b: 2,
      bar: "baz"
    };
  });

  it("matches objects with the expect key/value pairs", function() {
    expect(foo).toEqual(
      jasmine.objectContaining({
        bar: "baz"
      })
    );
    expect(foo).not.toEqual(
      jasmine.objectContaining({
        c: 37
      })
    );
  });

  describe("when used with a spy", function() {
    it("is useful for comparing arguments", function() {
      var callback = jasmine.createSpy("callback");

      callback({
        bar: "baz"
      });

      expect(callback).toHaveBeenCalledWith(
        jasmine.objectContaining({
          bar: "baz"
        })
      );
      expect(callback).not.toHaveBeenCalledWith(
        jasmine.objectContaining({
          c: 37
        })
      );
    });
  });
});
```

### 6.4.jasmine.arrayContaining

`jasmine.arrayContaining` 可以用来判断数组中是否有期望的值或者子集。

```js
describe("jasmine.arrayContaining", function() {
  var foo;

  beforeEach(function() {
    foo = [1, 2, 3, 4];
  });

  it("matches arrays with some of the values", function() {
    expect(foo).toEqual(jasmine.arrayContaining([3, 1]));
    // 直接在期望值中使用 jasmine.arrayContaining 达到目的
    expect(foo).not.toEqual(jasmine.arrayContaining([6]));
  });

  describe("when used with a spy", function() {
    it("is useful when comparing arguments", function() {
      var callback = jasmine.createSpy("callback");

      callback([1, 2, 3, 4]); // 将数组内容作为参数传入 Spy 中

      expect(callback).toHaveBeenCalledWith(jasmine.arrayContaining([4, 2, 3]));
      expect(callback).not.toHaveBeenCalledWith(
        jasmine.arrayContaining([5, 2])
      );
    });
  });
});
```

### 6.4.jasmine.stringMatching

`jasmine.stringMatching` 用来模糊匹配字符串，在 `jasmine.stringMatching` 中也可以使用正则表达式进行匹配，使用起来非常灵活。

```js
describe("jasmine.stringMatching", function() {
  it("matches as a regexp", function() {
    expect({ foo: "bar" }).toEqual({ foo: jasmine.stringMatching(/^bar$/) });
    expect({ foo: "foobarbaz" }).toEqual({
      foo: jasmine.stringMatching("bar")
    });
  });

  describe("when used with a spy", function() {
    it("is useful for comparing arguments", function() {
      var callback = jasmine.createSpy("callback");

      callback("foobarbaz");

      expect(callback).toHaveBeenCalledWith(jasmine.stringMatching("bar"));
      expect(callback).not.toHaveBeenCalledWith(
        jasmine.stringMatching(/^bar$/)
      );
    });
  });
});
```

### 6.5. 不规则匹配（自定义匹配）：asymmetricMatch

某些场景下，我们希望能按照自己设计的规则进行匹配，此时我们可以自定义一个对象，该对象只要包含一个名为 `asymmetricMatch` 的方法即可。

```js
describe("custom asymmetry", function() {
  var tester = {
    asymmetricMatch: function(actual) {
      var secondValue = actual.split(",")[1];
      return secondValue === "bar";
    }
  };

  it("dives in deep", function() {
    expect("foo,bar,baz,quux").toEqual(tester);
  });

  describe("when used with a spy", function() {
    it("is useful for comparing arguments", function() {
      var callback = jasmine.createSpy("callback");

      callback("foo,bar,baz");

      expect(callback).toHaveBeenCalledWith(tester);
    });
  });
});
```

## 7.Jasmine Clock

`Jasmine Clock` 可以用来测试 `setTimeout` 和 `setInterval` 的回调操作。它使回调函数同步执行，当 `Clock` 的时间超过 `timer` 的时间，回调函数会被触发一次。这使依赖于时间的代码更加易于测试。

要想使用 `jasmine.clock()`，先调用 `jasmine.clock().install` 在 `spec` 或者 `suite` 中初始化，在执行完测试的时候，一定要卸载，务必调用 `jasmine.clock().uninstall` 来恢复时间状态。

```js
describe("Manually ticking the Jasmine Clock", function() {
  var timerCallback;

  beforeEach(function() {
    timerCallback = jasmine.createSpy("timerCallback");
    // 开时间操作
    // jasmine.clock is not a function ？？？
    jasmine.clock().install();
  });

  afterEach(function() {
    // 关闭时间操作
    jasmine.clock().uninstall();
  });

  it("causes a timeout to be called synchronously", function() {
    setTimeout(function() {
      timerCallback();
    }, 100);

    expect(timerCallback).not.toHaveBeenCalled();

    // 时间
    jasmine.clock().tick(101);

    expect(timerCallback).toHaveBeenCalled();
  });

  it("causes an interval to be called synchronously", function() {
    setInterval(function() {
      timerCallback();
    }, 100);

    expect(timerCallback).not.toHaveBeenCalled();

    jasmine.clock().tick(101);
    expect(timerCallback.calls.count()).toEqual(1);

    jasmine.clock().tick(50);
    expect(timerCallback.calls.count()).toEqual(1);

    jasmine.clock().tick(50);
    expect(timerCallback.calls.count()).toEqual(2);
  });

  describe("Mocking the Date object", function() {
    it("mocks the Date object and sets it to a given time", function() {
      var baseTime = new Date(2013, 9, 23);

      jasmine.clock().mockDate(baseTime);

      jasmine.clock().tick(50);
      expect(new Date().getTime()).toEqual(baseTime.getTime() + 50);
    });
  });
});
```

## 8. 异步支持

`Jasmine` 可以支持 `spec` 中执行异步操作，当调用 `beforeEach`, `it` 和 `afterEach` 时，函数可以包含一个可选参数 `done`，当 `spec` 执行完毕之后，调用 `done` 通知 `Jasmine` 异步操作已执行完毕。

```js
describe("Asynchronous specs", function() {
  var value;

  beforeEach(function(done) {
    setTimeout(function() {
      value = 0;
      done();
    }, 10);
  });

  // 在上面 beforeEach 的 done() 被执行之前，这个测试用例不会被执行
  it("should support async execution of test preparation and expectations", function(done) {
    value++;
    expect(value).toBeGreaterThan(0);
    done(); // 执行完 done() 之后，该测试用例真正执行完成
  });

  // Jasmine 异步执行超时时间默认为 5 秒，超过后将报错 ？？？
  describe("long asynchronous specs", function() {
    // 如果要调整指定用例的默认的超时时间，可以在 beforeEach，it 和 afterEach 中传入一个时间参数
    beforeEach(function(done) {
      // setTimeout(function() {}, 2000);
      // 可以试试如果该方法执行超过 1 秒时 js 会报错
      // 没有报错
      done();
    }, 2000);

    it("takes a long time", function(done) {
      setTimeout(function() {
        done();
      }, 9000);
    }, 10000);

    afterEach(function(done) {
      done();
    }, 2000);
  });
});
```

## 9. 自定义 Matcher

自定义的 `Matcher` 从本质上讲是一个对比函数，它的函数名就是暴露给 `expect` 调用的名称，它接受 `actual` 值和 `expected` 值。这个函数会传入 `Jasmine` 作用域中，可以在 `beforeEach` 中调用到。每次 `spec` 执行完后，都会把自定义 `Matchers` 卸载，下面看个简单例子：

```js
var customMatchers = {
  toBeGoofy: function(util, customEqualityTesters) {
    return {
      compare: function(actual, expected) {
        if (expected === undefined) {
          expected = "";
        }

        var result = {};
        result.pass = util.equals(
          actual.hyuk,
          "gawrsh" + expected,
          customEqualityTesters
        );

        if (result.pass) {
          result.message = "Expected " + actual + " not to be quite so goofy";
        } else {
          result.message =
            "Expected " + actual + " to be goofy, but it was not very goofy";
        }

        return result;
      }
    };
  }
};
```

### 9.1.Matcher 构造函数

自定义 `Matcher` 的构造函数接受两个参数

- `util` ：给 `Matcher` 使用的一组工具函数
- `customEqualityTesters` ：调用 `util.equals` 的时候需要传入。

构造函数需要返回一个对象，这个对象要包含名为 `compare` 的函数，执行 `Matcher` 时会调用 `compare` 函数。

### 9.2.compare 函数

`compare` 函数接收传入 `expect` 的值作为它的第一个参数 `actual`，如果存在的话，传入 `Matcher` 自己的参数会作为 `compare` 函数的第二个参数。上例中的 `toBeGoofy` 就会接收一个可选的 `expected` 参数，默认不需要传入。

### 9.3.Result

`compare` 函数必须返回一个结果对象。结果对象必须包含一个布尔值类型的 `pass` 属性，告诉 `expectation Matcher` 是否通过。如果 `expectation` 调用了 `.not` 的话，会做相反的判断。上例中的 `toBeGoofy` 测试实际值得 `hyuk` 属性是否和期望值相等。

### 9.4. 错误信息

如果不指定错误信息，`expectation` 会尝试用 `Matcher` 生成一个错误信息。但是，如果返回的 `result` 对象包含了 `message` 属性的话，会使用 `message` 的值作错误提示。

先看看指定 `message` 的效果

```js
var customMatchers = {
  toBeGoofy: function(util, customEqualityTesters) {
    return {
      compare: function(actual, expected) {
        if (expected === undefined) {
          expected = "";
        }
        var result = {};
        // TypeError: Cannot read property 'equals' of null ???
        result.pass = util.equals(
          actual.hyuk,
          "gawrsh" + expected,
          customEqualityTesters
        );
        if (result.pass) {
          result.message = "通过了，通过了，通过了。..";
        } else {
          result.message = "没通过，没通过，没通过。..";
        }
        return result;
      }
    };
  }
};

describe("测试自定义错误信息", function() {
  beforeEach(function() {
    jasmine.addMatchers(customMatchers);
  });

  it("这是个失败的测试", function() {
    expect({
      hyuk: "gawrsh"
    }).toBeGoofy(123);
  });
});
```

再看看没有指定 `message` 的效果：

```js
var customMatchers = {
  toBeGoofy: function(util, customEqualityTesters) {
    return {
      compare: function(actual, expected) {
        if (expected === undefined) {
          expected = "";
        }
        var result = {};
        result.pass = util.equals(
          actual.hyuk,
          "gawrsh" + expected,
          customEqualityTesters
        );
        return result;
      }
    };
  }
};

describe("测试自动生成的错误信息", function() {
  beforeEach(function() {
    jasmine.addMatchers(customMatchers);
  });

  it("这是个失败的测试", function() {
    expect({
      hyuk: "gawrsh"
    }).toBeGoofy(123);
  });
});
```

可以看出，`Jasmine` 把 `Matcher` 的名字，按照驼峰命名法分隔开，生成错误信息。

### 9.5. 自定义“否定”比较规则

如果你的自定义 `Matcher` 需要控制 `.not` 的行为的话（不是简单的布尔值取反），那么你的 `Matcher` 构造函数里除了 `compare`，还可以包含另一个函数 `negativeCompare`。当使用了 `.not` 的时候会执行 `negativeCompare`。

### 9.6.Matcher 的注册和使用

向 `Jasmine` 注册自定义的 `Matcher` 后，所有的 `expectation` 都可以使用该 `Matcher`。

```js
describe("注册'toBeGoofy'", function() {
  beforeEach(function() {
    jasmine.addMatchers(customMatchers);
  });

  //...
});
```

---

参考：

[Jasmine 入门（上）](https://www.cnblogs.com/wushangjue/p/4541209.html)

[Jasmine 入门（下）](https://www.cnblogs.com/wushangjue/p/4575826.html)

[Javascript 测试框架 Jasmine（一）：简介](http://keenwon.com/1191.html)

[Javascript 测试框架 Jasmine（二）：Matchers](http://keenwon.com/1197.html)

[Javascript 测试框架 Jasmine（三）：Setup、Teardown、嵌套 describe 等](http://keenwon.com/1206.html)

[Javascript 测试框架 Jasmine（四）：自定义 Matcher](http://keenwon.com/1212.html)

[Javascript 测试框架 Jasmine（五）：Spies](http://keenwon.com/1218.html)

[Javascript 测试框架 Jasmine（六）：异步代码测试](http://keenwon.com/1223.html)

阅读：

[Chapter 4. Matchers in Depth](https://www.oreilly.com/library/view/javascript-testing-with/9781449356729/ch04.html)

[Javascript 测试框架 Jasmine（七）：jqPaginator 测试实例](http://keenwon.com/1225.html)

[jasmine 行为驱动，测试先行](http://blog.fens.me/nodejs-jasmine-bdd/)

[手把手教你如何安装和使用 Karma-Jasmine](https://www.cnblogs.com/wushangjue/p/4539189.html)

[JavaScript 单元测试框架：Jasmine 初探](https://www.ibm.com/developerworks/cn/web/1404_changwz_jasmine/index.html)

[使用 Karma + Jasmine 构建 Web 测试环境](https://www.ibm.com/developerworks/cn/web/wa-lo-use-karma-jasmine-build-test-environment/index.html)
