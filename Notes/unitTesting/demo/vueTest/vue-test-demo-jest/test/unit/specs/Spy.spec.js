// spy
xdescribe("A spy", function () {
  let foo;
  let bar = null;

  beforeEach(function () {
    foo = {
      setBar: function (value) {
        bar = value;
      }
    };

    spyOn(foo, "setBar"); // 在 foo 对象上添加 spy

    // 此时调用 foo 对象上的方法，均为模拟调用，因此不会执行实际的代码
    foo.setBar(123); // 调用 foo 的 setBar 方法
    foo.setBar(456, "another param");
  });

  it("tracks that the spy was called", function () {
    expect(foo.setBar).toHaveBeenCalled();
    //判断 foo 的 setBar 是否被调用
  });

  it("tracks all the arguments of its calls", function () {
    expect(foo.setBar).toHaveBeenCalledWith(123); //判断被调用时的参数
    expect(foo.setBar).toHaveBeenCalledWith(456, "another param");
  });

  it("stops all execution on a function", function () {
    expect(bar).toBeNull(); // 由于是模拟调用，因此 bar 值并没有改变
  });
});

xdescribe("A spy, when configured to call through", function () {
  var foo, bar, fetchedBar;

  beforeEach(function () {
    foo = {
      setBar: function (value) {
        bar = value;
      },
      getBar: function () {
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

  it("tracks that the spy was called", function () {
    // expect(foo.setBar).toHaveBeenCalled();
    expect(foo.getBar).toHaveBeenCalled();
  });

  it("should not effect other functions", function () {
    expect(bar).toEqual(123);
    // expect(bar).toBeUndefined();
    // 由于是真实调用，因此 bar 有了真实的值
  });

  it("when called returns the requested value", function () {
    // expect(fetchedBar).toEqual(123);
    expect(fetchedBar).toBeUndefined();
    // 由于是真实调用，fetchedBar 也有了真实的值
  });
});

// and.returnValue
xdescribe("A spy, when configured to fake a return value", function () {
  var foo, bar, fetchedBar;

  beforeEach(function () {
    foo = {
      setBar: function (value) {
        bar = value;
      },
      getBar: function () {
        return bar;
      }
    };

    spyOn(foo, "getBar").and.returnValue(745);
    // 这将指定 getBar 方法返回值为 745

    foo.setBar(123);
    fetchedBar = foo.getBar();
  });

  it("tracks that the spy was called", function () {
    expect(foo.getBar).toHaveBeenCalled();
  });

  it("should not effect other functions", function () {
    expect(bar).toEqual(123);
  });

  it("when called returns the requested value", function () {
    expect(fetchedBar).toEqual(745);
  });
});

// and.callFake
xdescribe("A spy, when configured with an alternate implementation", function () {
  var foo, bar, fetchedBar;

  beforeEach(function () {
    foo = {
      setBar: function (value) {
        bar = value;
      },
      getBar: function () {
        return bar;
      }
    };

    spyOn(foo, "getBar").and.callFake(function () {
      return 1001;
    });

    foo.setBar(123);
    fetchedBar = foo.getBar();
  });

  it("tracks that the spy was called", function () {
    expect(foo.getBar).toHaveBeenCalled();
  });

  it("should not effect other functions", function () {
    expect(bar).toEqual(123);
  });

  it("when called returns the requested value", function () {
    expect(fetchedBar).toEqual(1001);
  });
});

// and.throwError
xdescribe("A spy, when configured to throw an error", function () {
  var foo, bar;

  beforeEach(function () {
    foo = {
      setBar: function (value) {
        bar = value;
      }
    };

    spyOn(foo, "setBar").and.throwError("quux");
  });

  it("throws the value", function () {
    expect(function () {
      foo.setBar(123);
    }).toThrowError("quux");
  });
});

// and.stub
xdescribe("A spy stub", function () {
  let foo;
  let bar = null;

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
    console.log("111", bar, getValue);

    expect(bar).toEqual(123);

    var getValue = foo.getBar();
    expect(getValue).toEqual(999);

    console.log("222", bar, getValue);

    foo.setBar.and.stub();
    console.log("333-1", bar, getValue);
    // 相当于'标记1'中的代码变为了 spyOn(foo, 'setBar')
    // ??? 什么叫相当于
    // ??? 等价于去除 add.callThrough add.returnValue 的影响
    foo.getBar.and.stub();
    console.log("333-2", bar, getValue);
    // 相当于'标记2'中的代码变为了 spyOn(foo, 'getBar')
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
});

// calls
xdescribe("A spy calls", function () {
  var foo,
    bar = null;

  beforeEach(function () {
    foo = {
      setBar: function (value) {
        bar = value;
      }
    };

    spyOn(foo, "setBar");
  });

  it("tracks if it was called at all", function () {
    expect(foo.setBar.calls.any()).toEqual(false);
    foo.setBar();

    // 被 Spy 的函数一旦被调用过，则返回 true，否则为 false；
    expect(foo.setBar.calls.any()).toEqual(true);
  });

  it("tracks the number of times it was called", function () {
    expect(foo.setBar.calls.count()).toEqual(0);
    foo.setBar();
    foo.setBar();

    // 返回被 Spy 的函数的被调用次数
    expect(foo.setBar.calls.count()).toEqual(2);
  });

  it("tracks the arguments of each call", function () {
    foo.setBar(123);
    foo.setBar(456, "baz");

    // 返回被 Spy 的函数的调用参数，以 index 来指定参数
    expect(foo.setBar.calls.argsFor(0)).toEqual([123]);
    expect(foo.setBar.calls.argsFor(1)).toEqual([456, "baz"]);
  });

  it("tracks the arguments of all calls", function () {
    foo.setBar(123);
    foo.setBar(456, "baz");

    // 返回被 Spy 的函数的所有调用参数;
    expect(foo.setBar.calls.allArgs()).toEqual([[123], [456, "baz"]]);
  });

  it("can provide the context and arguments to all calls", function () {
    foo.setBar(123);

    // 返回 calls 的上下文，这将返回当前 calls 的整个实例数据
    // ???
    expect(foo.setBar.calls.all()).toEqual([
      { object: foo, args: [123], returnValue: undefined }
    ]);
  });

  it("has a shortcut to the most recent call", function () {
    foo.setBar(123);
    foo.setBar(456, "baz");

    // 返回 calls 中追踪的最近一次的请求数据
    expect(foo.setBar.calls.mostRecent()).toEqual({
      object: foo,
      args: [456, "baz"],
      returnValue: undefined
    });
  });

  it("has a shortcut to the first call", function () {
    foo.setBar(123);
    foo.setBar(456, "baz");

    // 返回 calls 中追踪的第一次请求的数据
    expect(foo.setBar.calls.first()).toEqual({
      object: foo,
      args: [123],
      returnValue: undefined
    });
  });

  it("tracks the context", function () {
    var spy = jasmine.createSpy("spy");
    var baz = {
      fn: spy
    };
    var quux = {
      fn: spy
    };
    baz.fn(123);
    quux.fn(456);

    // 当调用 all() ，mostRecent() ，first()方法时
    // 返回对象的 object 属性返回的是当前上下文对象
    // ???
    expect(spy.calls.first().object).toBe(baz);
    expect(spy.calls.mostRecent().object).toBe(quux);
  });

  it("can be reset", function () {
    foo.setBar(123);
    foo.setBar(456, "baz");
    expect(foo.setBar.calls.any()).toBe(true);

    // 重置 Spy 的所有追踪数据
    // 追踪失效
    foo.setBar.calls.reset();
    expect(foo.setBar.calls.any()).toBe(false);
  });
});

// createSpy
xdescribe("A spy, when created manually", function () {
  var whatAmI;

  beforeEach(function () {
    whatAmI = jasmine.createSpy("whatAmI");

    whatAmI("I", "am", "a", "spy");
  });

  it("is named, which helps in error reporting", function () {
    expect(whatAmI.and.identity()).toEqual("whatAmI");
  });

  it("tracks that the spy was called", function () {
    expect(whatAmI).toHaveBeenCalled();
  });

  it("tracks its number of calls", function () {
    expect(whatAmI.calls.count()).toEqual(1);
  });

  it("tracks all the arguments of its calls", function () {
    expect(whatAmI).toHaveBeenCalledWith("I", "am", "a", "spy");
  });

  it("allows access to the most recent call", function () {
    expect(whatAmI.calls.mostRecent().args[0]).toEqual("I");
    expect(whatAmI.calls.argsFor(0)).toEqual(["I", "am", "a", "spy"]);
    // expect(whatAmI.calls.argsFor(0).args[0]).toEqual('I')
  });
});

// createSpyObj
xdescribe("Multiple spies, when created manually", function () {
  var tape;

  beforeEach(function () {
    console.log(jasmine);

    // TypeError: jasmine.createSpyObj is not a function
    tape = jasmine.createSpyObj("tape", ["play", "pause", "stop", "rewind"]);
    console.log(tape);

    tape.play();
    tape.pause();
    tape.rewind(0);
  });

  it("creates spies for each requested function", function () {
    expect(tape.play).toBeDefined();
    expect(tape.pause).toBeDefined();
    expect(tape.stop).toBeDefined();
    expect(tape.rewind).toBeDefined();
  });

  it("tracks that the spies were called", function () {
    expect(tape.play).toHaveBeenCalled();
    expect(tape.pause).toHaveBeenCalled();
    expect(tape.rewind).toHaveBeenCalled();
    expect(tape.stop).not.toHaveBeenCalled();
  });

  it("tracks all the arguments of its calls", function () {
    expect(tape.rewind).toHaveBeenCalledWith(0);
  });
});
