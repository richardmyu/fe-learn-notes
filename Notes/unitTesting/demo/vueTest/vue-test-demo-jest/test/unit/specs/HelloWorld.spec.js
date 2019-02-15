import Vue from "vue";
import HelloWorld from "@/components/HelloWorld";

describe("HelloWorld.vue", () => {
  /* it("should render correct contents", () => {
    const Constructor = Vue.extend(HelloWorld);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector(".hello h1").textContent).toEqual(
      "Welcome to Your Vue.js App"
    );
  }); */
  // test jasmine
  // toBe：基本类型判断 ===
  it("toBe and .not.toBe", () => {
    expect(1).toBe(1);
    // expect(1).toBe('1');
    expect("a").not.toBe("b");
    expect(true).toBe(true);
    // expect({}).toBe({});
    // expect({ name: 'ok' }).toBe({ name: 'ok' });
  });

  // toEqual: toEqual 有两种用法，对于基本的类型，toEqual 相当于 toBe
  it("toEqual and not.toEqual for basic types", function() {
    expect(1).toEqual(1);
    // expect(1).toEqual('1');
    expect("a").not.toEqual("b");
  });

  // toEqual 还可以用来判断对象
  it("toEqual and not.toEqual for obj", () => {
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

    function fn1() {
      return "1";
    }

    function fn2() {
      return "1";
    }

    function fn3() {
      return "3";
    }

    function fn4() {}

    function fn5() {}

    expect(obj1).toEqual(obj2);
    expect(obj1).not.toEqual(obj3);
    expect(obj4).toEqual(obj5);
    expect(obj2).toEqual(obj6);

    expect(ary1).toEqual(ary2);
    expect(ary1).not.toEqual(ary3);
    expect(ary4).toEqual(ary5);
    expect(ary2).toEqual(ary6);

    expect(f1).not.toEqual(f2);
    expect(f1).not.toEqual(f3);
    expect(f4).not.toEqual(f5);
    expect(f2).toEqual(f6);

    expect(fn1).not.toEqual(fn2);
    expect(fn1).not.toEqual(fn3);
    expect(fn4).not.toEqual(fn5);
  });

  // toMatch: 使用正则表达式判断
  it("toMatch and not.toMatch", () => {
    let str = "Michael Jackson";
    expect(str).toMatch(/michael/i);
    expect(str).not.toMatch(/michael/);
    expect(str).not.toMatch(/tom/i);
  });

  // toBeDefine: 判断是否是 undefined
  // 注释：解释未是否定义更合理吧
  // .toBeDefined() ---> true（已定义） ---> 不是 undefined
  // .not.toBeDefined() ---> false（未定义） ---> 是 undefined
  it("toBeDefine and not.toBeDefine", () => {
    let student = {
      name: "Jack",
      age: 12
    };
    let b = 2;
    let c;
    function fn() {}

    expect(student.name).toBeDefined();
    expect(student.gender).not.toBeDefined();
    // expect(a).not.toBeDefined();
    expect(window.a).not.toBeDefined();
    expect(b).toBeDefined();
    expect(window.b).not.toBeDefined();
    expect(c).not.toBeDefined();
    expect(fn).toBeDefined();
  });

  // toBeUndefined: 判断是否是undefined
  it("toBeUndefined and not.toBeUndefined", () => {
    let student = {
      name: "jack",
      age: 12
    };
    let b = 2;
    let c;
    function fn() {}

    expect(student.gender).toBeUndefined();
    expect(student.name).not.toBeUndefined();
    // expect(a).toBeUndefined();
    expect(window.a).toBeUndefined();
    expect(b).not.toBeUndefined();
    expect(window.b).toBeUndefined();
    expect(c).toBeUndefined();
    expect(fn).not.toBeUndefined();
    expect(undefined).toBeUndefined();
  });

  // toBeNull：判断是否是 null
  it("toBeNull and not.toBeNull", () => {
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

  // toBeTruthy：判断是否能转换成 bool 型，判断的是否是 True
  it("toBeTruthy and not.toBeTruthy", () => {
    let str1;
    let str2 = "tom";
    expect(true).toBeTruthy();
    expect(str1).not.toBeTruthy();
    expect(str2).toBeTruthy();
    expect(undefined).not.toBeTruthy();
    expect(null).not.toBeTruthy();
    expect("").not.toBeTruthy();
    expect(false).not.toBeTruthy();
    expect(NaN).not.toBeTruthy();
    expect([]).toBeTruthy();
    expect({}).toBeTruthy();
  });

  //  toBeTruthy：判断是否能转换成 bool 型，判断的是否是 False
  it("toBeFalsy and not.toBeFalsy", () => {
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

  // toContain： 判断集合是否包含（可以是普通类型，和可以是对象）
  it("toContain and not.toContain", () => {
    let arrStr = ["jack", "tom", "mary"];
    let arrObj = [{ name: "jack", age: 21 }, { name: "tom", age: 22 }];
    let aryAry = [[1], [2], [3]];

    expect(arrStr).toContain("jack");
    expect(arrStr).not.toContain("Jack");
    // ??? 不能用于对象类型
    // expect(arrObj).toContain({ name: "jack", age: 21 });
    expect(arrObj).not.toContain({ name: "jack", age: 21 });
    expect(arrObj).not.toContain({ name: "Jack", age: 21 });

    // ??? Expected array  To contain value
    // expect(aryAry).toContain([1]);
    expect(aryAry).not.toContain([4]);
  });

  // toBeLessThan: 判断值类型的大小，结果若小则为 True
  it("toBeLessThan and not.toBeLessThan", () => {
    expect(1).toBeLessThan(1.1);
    // Received value must be a number.
    // expect("a").toBeLessThan("b");
  });

  //  toBeGreaterThan: 判断值类型的大小，结果若大则为 True，与 toBeLessThan 相反
  it("toBeGreaterThan and not.toBeGreaterThan", () => {
    expect(1).not.toBeGreaterThan(1.1);
    // Received value must be a number.
    // expect("b").toBeGreaterThan("a");
  });

  // toBeCloseTo：判断数字是否相似（第二个参数为小数精度，默认为2位）
  it("toBeCloseTo and not.toBeCloseTo", () => {
    let a = 1.1;
    let b = 1.5;
    let c = 1.455;
    let d = 1.459;
    expect(a).toBeCloseTo(b, 0);
    expect(a).not.toBeCloseTo(c, 1);
    expect(a).toBeCloseTo(c, 0);
    expect(c).toBeCloseTo(d);
  });

  // toThrow： 判断是否抛出异常
  it("toThrow and not.toThrow", () => {
    let foo = function() {
      return 1 + 2;
    };
    let bar = function() {
      return a + 1;
    };

    expect(foo).not.toThrow();
    expect(bar).toThrow();
  });

  // toThrowError: 判断是否抛出了指定的错误
  it("toThrowError and not.toThrowError", () => {
    let foo = function() {
      throw new TypeError("foo bar baz");
    };
    expect(foo).toThrowError("foo bar baz");
    expect(foo).toThrowError(/bar/);
    expect(foo).not.toThrowError(/bak/);
    expect(foo).toThrowError(TypeError);
    expect(foo).toThrowError(TypeError, "foo bar baz");
    expect(foo).toThrowError(TypeError, /bar/);
  });
});

// Setup 和 Teardown
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

describe("Setup and Teardown suite 2", function() {
  beforeEach(function() {
    globalCount += 2;
  });

  it("Spec 1", function() {
    expect(globalCount).toBe(4);
  });
});

describe("Test 'this'", function() {
  let testCount = 0;
  beforeEach(function() {
    testCount++;
  });

  afterEach(function() {
    //this.testCount = 0;
    //无论是否有这行，结果是一样的，因为 this 指定的变量只能在每个 spec 的 beforeEach/it/afterEach 过程中传递
  });

  it("Spec 1", function() {
    expect(testCount).toBe(1);
  });

  it("Spec 2", function() {
    expect(testCount).toBe(2);
  });
});

// xdescribe / xit
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

// spy
describe("A spy", function() {
  let foo;
  let bar = null;

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

    // spyOn(foo, "setBar");
    spyOn(foo, "getBar");
    // 可以使用上例中的模拟方式，看看测试集执行的结果

    foo.setBar(123);
    fetchedBar = foo.getBar();
  });

  it("tracks that the spy was called", function() {
    // expect(foo.setBar).toHaveBeenCalled();
    expect(foo.getBar).toHaveBeenCalled();
  });

  it("should not effect other functions", function() {
    expect(bar).toEqual(123);
    // expect(bar).toBeUndefined();
    // 由于是真实调用，因此 bar 有了真实的值
  });

  it("when called returns the requested value", function() {
    // expect(fetchedBar).toEqual(123);
    expect(fetchedBar).toBeUndefined();
    // 由于是真实调用，fetchedBar 也有了真实的值
  });
});

// and.returnValue
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

// and.callFake
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

// and.throwError
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

// and.stub
describe("A spy stub", function () {
  var foo,
    bar = null;

  beforeEach(function () {
    foo = {
      setBar: function (value) {
        bar = value;
      },
      getBar: function () {
        return bar;
      }
    };

    spyOn(foo, "setBar").and.callThrough(); // 标记1
    spyOn(foo, "getBar").and.returnValue(999); // 标记2
  });

  it("can call through and then stub in the same spec", function () {
    foo.setBar(123);
    expect(bar).toEqual(123);

    var getValue = foo.getBar();
    expect(getValue).toEqual(999);

    foo.setBar.and.stub(); // 相当于'标记1'中的代码变为了spyOn(foo, 'setBar')
    foo.getBar.and.stub(); // 相当于'标记2'中的代码变为了spyOn(foo, 'getBar')
    bar = null;

    foo.setBar(123);
    expect(bar).toBe(null);
    expect(foo.setBar).toHaveBeenCalled(); // 函数调用追踪并没有被重置

    getValue = foo.getBar();
    expect(getValue).toEqual(undefined);
    expect(foo.getBar).toHaveBeenCalled(); // 函数调用追踪并没有被重置
  });
});
