// 异步支持
xdescribe("Asynchronous specs", function () {
  var value;

  beforeEach(function (done) {
    setTimeout(function () {
      value = 0;
      done();
    }, 10);
  });

  // 在上面 beforeEach 的 done() 被执行之前，这个测试用例不会被执行
  it("should support async execution of test preparation and expectations", function (done) {
    value++;
    expect(value).toBeGreaterThan(0);
    console.log("111");

    done(); // 执行完 done() 之后，该测试用例真正执行完成
    console.log("222");
  });

  // Jasmine 异步执行超时时间默认为 5 秒，超过后将报错 ？？？
  xdescribe("long asynchronous specs", function () {
    // 如果要调整指定用例的默认的超时时间，可以在 beforeEach，it 和 afterEach 中传入一个时间参数
    beforeEach(function (done) {
      console.log("333");
      setTimeout(function () { }, 2000);
      // 可以试试如果该方法执行超过 1 秒时 js 会报错
      // 没有报错
      console.log("444");
      done();
      console.log("555");
    }, 2000);

    it("takes a long time", function (done) {
      setTimeout(function () {
        console.log("666");
        done();
        console.log("777");
      }, 9000);
    }, 10000);

    afterEach(function (done) {
      console.log("888");
      done();
      console.log("999");
    }, 2000);
  });
});
