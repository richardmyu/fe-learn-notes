// 自定义 Matcher
var customMatchers = {
  toBeGoofy: function(util, customEqualityTesters) {
    return {
      compare: function(actual, expected) {
        if (expected === undefined) {
          expected = "";
        }
        var result = {};
        // TypeError: Cannot read property 'equals' of null
        result.pass = util.equals(
          actual.hyuk,
          "gawrsh" + expected,
          customEqualityTesters
        );
        if (result.pass) {
          result.message = "通过了，通过了，通过了...";
        } else {
          result.message = "没通过，没通过，没通过...";
        }
        return result;
      }
    };
  }
};

xdescribe("测试自定义错误信息", function() {
  beforeEach(function() {
    jasmine.addMatchers(customMatchers);
  });

  it("这是个失败的测试", function() {
    expect({
      hyuk: "gawrsh"
    }).toBeGoofy(123);
  });
});

xdescribe("A spy, when configured to call through", function() {
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
  });

  it("when called returns the requested value", function() {
    expect(fetchedBar).not.toEqual(123);
  });
});
