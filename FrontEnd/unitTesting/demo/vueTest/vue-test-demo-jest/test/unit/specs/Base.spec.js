describe("Base.vue", () => {
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
    // ??? 不能用于对象类型 yong objectContaining
    // expect(arrObj).toContain({ name: "jack", age: 21 });
    expect(arrObj).not.toContain({ name: "jack", age: 21 });

    // ??? Expected array  To contain value
    // expect(aryAry).toContain([1]);
    expect(aryAry).not.toContain([1]);
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

  // toBeCloseTo：判断数字是否相似
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

xdescribe("测试嵌套describe：level1", function () {
  var foo;

  beforeEach(function () {
    window.console.log("level1：Setup");
  });

  afterEach(function () {
    window.console.log("level1：Teardown");
  });

  it("level1：测试", function () {
    window.console.log("level1：测试");
  });

  describe("测试嵌套describe:level2", function () {
    beforeEach(function () {
      window.console.log("level2：Setup");
    });

    afterEach(function () {
      window.console.log("level2：Teardown");
    });

    it("level2：测试", function () {
      window.console.log("level2：测试");
    });
  });
});

xdescribe("Pending specs", function () {
  xit("can be declared 'xit'", function () {
    expect(true).toBe(false);
  });

  it("can be declared with 'it' but without a function");

  it("can be declared by calling 'pending' in the spec body", function () {
    expect(true).not.toBe(false);
    // 挂起
    // pending();
  });
});
