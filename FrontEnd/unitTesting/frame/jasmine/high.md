# [Jasmine](https://jasmine.github.io/index.html)

Jasmine is a behavior-driven development framework for testing JavaScript code. It does not depend on any other JavaScript frameworks. It does not require a DOM. And it has a clean, obvious syntax so that you can easily write tests.

## 1.Your first suite

### 1.1.Suites(describe)

The describe function is for grouping related specs, typically each test file has one at the top level. The string parameter is for naming the collection of specs, and will be concatenated with specs to make a spec's full name. This aids in finding specs in a large suite. If you name them well, your specs read as full sentences in traditional BDD style.

### 1.2.Specs(it)

Specs are defined by calling the global Jasmine function it, which, like describe takes a string and a function. The string is the title of the spec and the function is the spec, or test. A spec contains one or more expectations that test the state of the code. An expectation in Jasmine is an assertion that is either true or false. A spec with all true expectations is a passing spec. A spec with one or more false expectations is a failing spec.

```javascript
describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});
```

### 1.3.It's Just Functions

Since describe and it blocks are functions, they can contain any executable code necessary to implement the test. JavaScript scoping rules apply, so variables declared in a describe are available to any it block inside the suite.

```javascript
describe("A suite is just a function", function() {
  var a;

  it("and so is a spec", function() {
    a = true;

    expect(a).toBe(true);
  });
});
```

### 1.4.Expectations

Expectations are built with the function expect which takes a value, called the actual. It is chained with a Matcher function, which takes the expected value.

Matchers
Each matcher implements a boolean comparison between the actual value and the expected value. It is responsible for reporting to Jasmine if the expectation is true or false. Jasmine will then pass or fail the spec.

```javascript
describe("The 'toBe' matcher compares with ===", function() {

  it("and has a positive case", function() {
    expect(true).toBe(true);
  });

  it("and can have a negative case", function() {
    expect(false).not.toBe(true);
  });
});
```

Any matcher can evaluate to a negative assertion by chaining the call to expect with a not before calling the matcher.

Jasmine has a rich set of matchers included, you can find the full list in the API docs There is also the ability to write custom matchers for when a project's domain calls for specific assertions that are not included in Jasmine.

Setup and Teardown
To help a test suite DRY up any duplicated setup and teardown code, Jasmine provides the global beforeEach, afterEach, beforeAll, and afterAll functions.
