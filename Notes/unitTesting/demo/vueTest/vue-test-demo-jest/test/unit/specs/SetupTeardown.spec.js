// Setup 和 Teardown
var globalCount;
xdescribe("Setup and Teardown suite 1", function () {
  var suiteGlobalCount;
  var eachTestCount;

  beforeAll(function () {
    globalCount = 0; // 试试注释这行代码，看看对运行结果的影响
    suiteGlobalCount = 0;
    eachTestCount = 0;
  });

  afterAll(function () {
    // globalCount = 0; // 试试取消这行代码的注释，看看对运行结果的影响
    suiteGlobalCount = 0;
  });

  beforeEach(function () {
    globalCount++;
    suiteGlobalCount++;
    eachTestCount++;
  });

  afterEach(function () {
    eachTestCount = 0;
  });

  it("Spec 1", function () {
    expect(globalCount).toBe(1);
    expect(suiteGlobalCount).toBe(1);
    expect(eachTestCount).toBe(1);
  });

  it("Spec 2", function () {
    expect(globalCount).toBe(2);
    expect(suiteGlobalCount).toBe(2);
    expect(eachTestCount).toBe(1);
  });
});

xdescribe("Setup and Teardown suite 2", function () {
  beforeEach(function () {
    globalCount += 2;
  });

  it("Spec 1", function () {
    expect(globalCount).toBe(4);
  });
});

xdescribe("Test 'this'", function () {
  beforeEach(function () {
    this.testCount = 0;
    this.testCount++;
  });

  afterEach(function () {
    this.testCount = 0;
    //无论是否有这行，结果是一样的，因为 this 指定的变量只能在每个 spec 的 beforeEach/it/afterEach 过程中传递
  });

  it("Spec 1", function () {
    expect(this.testCount).toBe(1);
  });

  it("Spec 2", function () {
    expect(this.testCount).toBe(2);
  });
});

xdescribe("this 用法示例", function () {
  beforeEach(function () {
    this.foo = 0;
  });

  it("使用 this 共享状态", function () {
    expect(this.foo).not.toEqual(0);
    this.bar = "test pollution?";
  });

  it("下个 Spec 执行前 this 会被重置为空 Object", function () {
    expect(this.foo).not.toEqual(0);
    expect(this.foo).toBe(undefined);
    expect(this.foo).toBeUndefined();
    expect(this.bar).toBe(undefined);
  });
});

// xdescribe / xit
xdescribe("Test xdescribe", function () {
  it("Spec 1", function () {
    expect(1).toBe(1);
  });

  it("Spec 2", function () {
    expect(2).toBe(2);
  });
});

xdescribe("Test xit", function () {
  it("Spec 1", function () {
    expect(1).toBe(1);
  });

  xit("Spec 2", function () {
    expect(2).toBe(1);
  });

  xit("Spec 3", function () {
    expect(3).toBe(3);
  });
});
