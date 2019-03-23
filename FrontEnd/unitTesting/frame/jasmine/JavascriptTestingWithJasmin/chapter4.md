## Chapter 4. Matchers in Depth

There are a lot of useful matchers that come with Jasmine. Later in this section, you’ll also see how to build your own.

### 1.Equality: toEqual

Perhaps the simplest matcher in Jasmine is toEqual. It simply checks if two things are equal (and not necessarily the same exact object, as you’ll see in Chapter 5).

The following `expect` functions will pass:

```javascript
expect(true).toEqual(true);
expect([1, 2, 3]).toEqual([1, 2, 3]);
expect({}).toEqual({});
```

Here are some examples of `toEqual` that will fail:

```javascript
expect(5).toEqual(12);
expect([1, 2, 3, 4]).toEqual([1, 2, 3]);
expect(true).toEqual(100);
```

Keep in mind that this is different from the toBe matcher. The subtle difference is noted next.

### 2.Identity: toBe

At first, the `toBe` matcher looks a lot like the `toEqual` matcher, but it’s not exactly the same. `toBe` checks if two things are the same object, not just if they are equivalent.

Here’s an example spec that illustrates the difference between `toEqual` and `toBe`:

```javascript
var spot = { species: "Border Collie" };
var cosmo = { species: "Border Collie" };
expect(spot).toEqual(cosmo); // success; equivalent
expect(spot).toBe(cosmo); // failure; not the same object
expect(spot).toBe(spot); // success; the same object
```

We see that, although `spot` and `cosmo` look really similar and are equal, they aren’t the same object. Because of that, they evaluate as equal, not the same.

The same is also true for arrays:

```javascript
var arr = [1, 2, 3];
expect(arr).toEqual([1, 2, 3]); // success; equivalent
expect(arr).toBe([1, 2, 3]); // failure; not the same array
```

You might notice that `toBe` works for primitives (numbers, Booleans, strings). This is because JavaScript’s `===` operator evaluates primitives as the same entity. Using toBe is essentially using the `===` operator.

Use `toEqual` when checking the equivalence of primitive types, even if `toBe` will work. Using `toBe` might break your tests if you later decide to change a number to an array, for example.

For more about how this nuance works in JavaScript, see the video [JavaScript Primitive Types vs Reference Types](https://www.youtube.com/watch?v=mh-hPzDfb_Q&feature=youtu.be).

### 3.Yes or No? toBeTruthy, toBeFalsy

To test if something evaluates to `true`, you use the `toBeTruthy` matcher:

```javascript
expect(true).toBeTruthy();
expect(12).toBeTruthy();
expect({}).toBeTruthy();
```

Likewise, to test if something evaluates to `false`, you use `toBeFalsy`:

```javascript
expect(false).toBeFalsy();
expect(null).toBeFalsy();
expect("").toBeFalsy();
```

Note that Jasmine’s evaluation of truthy and falsy are identical to JavaScript’s. This means that true is truthy, but so is "Hello world", or the number 12, or an object. It’s useful to think of all the things that are falsy, and then everything else as truthy.

For reference, here’s a list of things that are falsy in Jasmine (and in JavaScript, too):

---

- `false`
- 0
- ""
- `undefined` (note that the variable `undefined` isn’t always undefined!)
- `null`
- `NaN`

---

If you haven’t seen `NaN` before, it’s a special number value that stands for Not a Number. It represents nonsensical number values like 0/0. It’s also returned by some functions that return numbers (for example, parseInt("hello") returns `NaN` because it cannot properly parse a number).

If you want to make sure something is literally `true` or `false` and nothing else, use the `toEqual` matcher like so:

```javascript
expect(myVariable).toEqual(true);
expect(myOtherVariable).toEqual(false);
```

### 4.Negate Other Matchers with not

It’s frequently useful to reverse Jasmine’s matchers to make sure that they aren’t `true`. To do that, simply prefix things with `.not`:

```javascript
expect(foo).not.toEqual(bar);
expect("Hello planet").not.toContain("world");
```

### 5.Check If an Element Is Present with toContain

Sometimes you want to verify that an element is a member of an array, somewhere. To do that, you can use the `toContain` matcher:

```javascript
expect([1, 2, 3, 4]).toContain(3);
expect(["Penguin", "Turtle", "Pig", "Duck"]).toContain("Duck");
```

Note that `toContain` doesn’t check if the array contains the exact same object, so the following example will succeed:

```javascript
var dog = { name: "Fido" };
expect([{ name: "Spike" }, { name: "Fido" }, { name: "Spot" }]).toContain(dog);
```

The `toContain` matcher also works in strings, as we saw in the first example of this book:

```javascript
expect("Hello world").toContain("world");
expect(favoriteCandy).not.toContain("Almond");
```

### 6.Is It Defined? toBeDefined, toBeUndefined

As with truthiness and falsiness, there are matchers to check if something is defined or undefined.

Before we start, let’s briefly review JavaScript’s notion of `undefined` and how it compares to `null`: when you declare a new variable with no value specified, its type is “undefined” (just like 123’s type is “number”). In other languages, it might be `null` or `nil`. Not in JavaScript! There’s a lot of confusion around this, but it doesn’t directly apply to Jasmine.

For more background on `undefined` and how it works, check out [Understanding JavaScript’s “undefined”](https://javascriptweblog.wordpress.com/2010/08/16/understanding-undefined-and-preventing-referenceerrors/).

Here are a few examples to demonstrate how these matchers work:

```javascript
var somethingUndefined;
expect("Hello!").toBeDefined(); // success
expect(null).toBeDefined(); // success
expect(somethingUndefined).toBeDefined(); // failure
```

```javascript
var somethingElseUndefined;
expect(somethingElseUndefined).toBeUndefined(); // success
expect(12).toBeUndefined(); // failure
expect(null).toBeUndefined(); // failure
```

It’s worth noting that the variables you’re checking have to be defined. The following code throws a `ReferenceError` and will fail:

```javascript
it("tests toBeUndefined", function() {
  expect(someUndefinedVariable).toBeUndefined();
  // Throws a ReferenceError because someUndefinedVariable hasn't been declared.
});
```

### 7.Nullness: toBeNull

The `toBeNull` matcher is fairly straightforward. If you hadn’t guessed by now, it checks if something is `null`:

```javascript
expect(null).toBeNull(); // success
expect(false).toBeNull(); // failure
expect(somethingUndefined).toBeNull(); // failure
```

Fairly simple!

### 8.Is It NaN? toBeNaN

Like `toBeNull`, `toBeNaN` checks if something is `NaN`:

```javascript
expect(5).not.toBeNaN(); // success
expect(0 / 0).toBeNaN(); // success
expect(parseInt("hello")).toBeNaN(); // success
```

> NOTE
> This is different from JavaScript’s built-in isNaN function. The built-in isNaN will return true for many nonnumber types, such as nonnumeric strings, objects, and arrays. Jasmine’s will be positive only if it’s the NaN value.

### 9.Comparators: toBeGreaterThan, toBeLessThan

The `toBeGreaterThan` and `toBeLessThan` matchers check if something is greater than or less than something else. All of these will pass:

```javascript
expect(8).toBeGreaterThan(5);
expect(5).toBeLessThan(12);
expect("a").toBeLessThan("z"); // Notice that it works for strings too!
```

Not too difficult!

### 10.Nearness: toBeCloseTo

`toBeCloseTo` allows you to check if a number is close to another number, given a certain amount of decimal precision as the second argument.

If you want to make sure that a variable is close to 12.3 within one decimal point, you’d code it like this:

```javascript
expect(12.34).toBeCloseTo(12.3, 1); // success
```

If you want it to be the same within two decimal points, you’d change the 1 to a 2. This spec will fail, though—they differ at the second decimal digit:

```javascript
expect(12.34).toBeCloseTo(12.3, 2); // failure
```

In this case, any second argument over 2 will fail, so the following will fail as well:

```javascript
expect(12.34).toBeCloseTo(12.3, 3); // failure
expect(12.34).toBeCloseTo(12.3, 4); // failure
expect(12.34).toBeCloseTo(12.3, 5); // failure
// and so on...
```

Setting the second argument to 0 effectively rounds the numbers to integers:

```javascript
expect(12.3456789).toBeCloseTo(12, 0); // success
expect(500).toBeCloseTo(500.087315, 0); // success
expect(500.087315).toBeCloseTo(500, 0); // success
```

I find `toBeCloseTo` a little confusing and limiting. In <a href="#CustomMatchers">Custom Matchers</a>, we’ll make a matcher that aims to improve it.

### 11.Using toMatch with Regular Expressions

`toMatch` checks if something is matched, given a regular expression. It can be passed as a regular expression or a string, which is then parsed as a regular expression. All of the following will succeed:

```javascript
expect("foo bar").toMatch(/bar/);
expect("horse_ebooks.jpg").toMatch(/\w+.(jpg|gif|png|svg)/i);
expect("jasmine@example.com").toMatch("w+@w+.w+");
```

For more on regular expressions in JavaScript, check out [this very helpful article]() on the Mozilla Developer Network. (Note that these regular expression examples aren’t as thorough as they could be—a better email regular expression is very long!)

### 12.Checking If a Function Throws an Error with toThrow

`toThrow` lets you express, “Hey, I expect this function to throw an error”:

```javascript
var throwMeAnError = function() {
  throw new Error();
};
expect(throwMeAnError).toThrow();
```

You can use this with anonymous functions too, which can be more useful. For example, let’s say there’s a function that should throw an exception with bad input, like so:

```javascript
calculate("BAD INPUT"); // This should throw some exciting exception
```

To test that, we use Jasmine like so:

```javascript
expect(function() {
  calculate("BAD INPUT");
}).toThrow();
```

Whether you use an anonymous or named function, you still need to pass a function because Jasmine will call it when running your specs.

<h3 id="CustomMatchers">13.Custom Matchers</h3>

You can create custom matchers, too! You must add the matcher before every spec in which you want it, you must add it. To do that, we’ll be using `beforeEach`, which is explained in more detail in Chapter 5.

Let’s say you want to add a matcher called `toBeLarge`, which checks if a number is greater than 100. At the very top of a file (or at the top of a `describe`), you can add the following:

```javascript
beforeEach(function() {
  this.addMatchers({
    toBeLarge: function() {
      this.message = function() {
        return "Expected " + this.actual + " to be large";
      };
      return this.actual > 100;
    }
  });
});
```

This requires a little bit of knowledge about how Jasmine is put together. Every matcher takes an argument to the `expect` function, right? `expect(200)` has 200 as its argument. This argument, in Jasmine, is `this.actual` when we’re defining a new matcher; `this.message` is a function that, if the matcher fails, returns the explanatory output message. Finally, we return a Boolean indicating whether `this.actual` is large.

Now we can do the following in our specs:

```javascript
expect(5).toBeLarge(); // failure
expect(200).toBeLarge(); // success
expect(12).not.toBeLarge(); // success
```

A more complex matcher might want to introduce this syntax as a replacement for `toBeCloseTo`:

```javascript
// Expect 6 to be within 2 of 5 (between 3 and 7, inclusive).
expect(6).toBeWithinOf(2, 5);
```

This matcher will take two arguments and is otherwise similar to the previous example:

```javascript
beforeEach(function() {
  this.addMatchers({
    toBeWithinOf: function(distance, base) {
      this.message = function() {
        var lower = base - distance;
        var upper = base + distance;
        return (
          "Expected " +
          this.actual +
          " to be between " +
          lower +
          " and " +
          upper +
          " (inclusive)"
        );
      };
      return Math.abs(this.actual - base) <= distance;
    }
  });
});
```

In this example, we’re making sure that `this.actual` is, at most, `distance` away from `base`. The message calculates the lower and upper bounds, and the matcher’s result is a simple bounds check.

[Chapter 4. Matchers in Depth](https://www.oreilly.com/library/view/javascript-testing-with/9781449356729/ch04.html)
