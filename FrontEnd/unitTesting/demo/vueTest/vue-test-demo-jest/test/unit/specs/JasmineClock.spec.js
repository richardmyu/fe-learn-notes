// Jasmine Clock
xdescribe("Manually ticking the Jasmine Clock", function () {
  var timerCallback;

  beforeEach(function () {
    console.log(jasmine);

    timerCallback = jasmine.createSpy("timerCallback");
    // 开时间操作
    // jasmine.clock is not a function
    jasmine.clock().install();
  });

  afterEach(function () {
    // 关闭时间操作
    jasmine.clock().uninstall();
  });

  it("causes a timeout to be called synchronously", function () {
    setTimeout(function () {
      timerCallback();
    }, 100);

    expect(timerCallback).not.toHaveBeenCalled();

    // 时间
    jasmine.clock().tick(101);

    expect(timerCallback).toHaveBeenCalled();
  });

  it("causes an interval to be called synchronously", function () {
    setInterval(function () {
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

  describe("Mocking the Date object", function () {
    it("mocks the Date object and sets it to a given time", function () {
      var baseTime = new Date(2013, 9, 23);

      jasmine.clock().mockDate(baseTime);

      jasmine.clock().tick(50);
      expect(new Date().getTime()).toEqual(baseTime.getTime() + 50);
    });
  });
});

xdescribe("Jasmine Clock 测试", function () {
  var timerCallback;

  beforeEach(function () {
    timerCallback = jasmine.createSpy("timerCallback");
    jasmine.clock().install();
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });

  it("同步触发setTimeout", function () {
    setTimeout(function () {
      timerCallback();
    }, 100);

    expect(timerCallback).not.toHaveBeenCalled();

    jasmine.clock().tick(101);

    expect(timerCallback).toHaveBeenCalled();
  });

  it("同步触发setInterval", function () {
    setInterval(function () {
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
});

