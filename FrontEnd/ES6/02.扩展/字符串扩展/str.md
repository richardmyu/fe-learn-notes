# 字符串的扩展

## 2.字符串的遍历器接口

ES6 为字符串添加了遍历器接口，使得字符串可以被 for...of 循环遍历。

```js
for (let codePoint of "foo") {
  console.log(codePoint);
}
// "f"
// "o"
// "o"
```

除了遍历字符串，这个遍历器最大的优点是可以识别大于 `0xFFFF` 的码点，传统的 for 循环无法识别这样的码点。

```js
let text = String.fromCodePoint(0x20bb7);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// " "
// " "

for (let i of text) {
  console.log(i);
}
// "𠮷"
```

上面代码中，字符串 text 只有一个字符，但是 for 循环会认为它包含两个字符（都不可打印），而 for...of 循环会正确识别出这一个字符。

## 5.模板字符串

模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

```js
// 普通字符串
`In JavaScript '\n' is a line-feed.``In JavaScript this is // 多行字符串
 not legal.`;

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量，需要将变量名写在 ${} 之中
let name = "Bob",
  time = "today";
`Hello ${name}, how are you ${time}?`;
```

如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。

```js
let greeting = `\`Yo\` World!`;
```

如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。

```js
$("#list").html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`);
```

`${}` 内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。还能调用函数。

```js
let x = 1;
let y = 2;

`${x} + ${y} = ${x + y}`; // "1 + 2 = 3"

function fn() {
  return "Hello World";
}

`foo ${fn()} bar`;
// foo Hello World bar
```

如果大括号中的值不是字符串，将按照一般的规则转为字符串。如果模板字符串中的变量没有声明，将报错。

```js
// 变量place没有声明
let msg = `Hello, ${place}`;
// 报错
```

模板字符串甚至还能嵌套。

```js
const tmpl = addrs => `
  <table>
  ${addrs
    .map(
      addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
    `
    )
    .join("")}
  </table>
`;
```

如果需要引用模板字符串本身，在需要时执行，可以写成函数。

```js
let func = name => `Hello ${name}!`;
func("Jack"); // "Hello Jack!"
```

## 7.标签模板

模板字符串的功能，不仅仅是上面这些。它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“**标签模板**”功能（tagged template）。

```js
alert`123`;
// 等同于
alert(123);
```

标签模板其实不是模板，而是函数调用的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。

但是，如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。

```js
let a = 5;
let b = 10;

tag`Hello ${a + b} world ${a * b}`;
// 等同于
tag(["Hello ", " world ", ""], 15, 50);
```

tag 函数的第一个参数是一个数组，该数组的成员是模板字符串中那些没有变量替换的部分。其他参数，都是模板字符串各个变量被替换后的值。

“标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容。

```js
let sender = "<&&&>";
let message = SaferHTML`<p>${sender} has sent you a message.</p>`;

function SaferHTML(templateData) {
  let s = templateData[0];
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}

message; //<p>&lt;&amp;&amp;&amp;&gt; has sent you a message.</p>
```

标签模板的另一个应用，就是多语言转换（国际化处理）。

```js
i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`;
// "欢迎访问xxx，您是第xxxx位访问者！"
```

模板字符串本身并不能取代 Mustache 之类的模板库，因为没有条件判断和循环处理功能，但是通过标签函数，你可以自己添加这些功能。

```js
// 下面的hashTemplate函数
// 是一个自定义的模板处理函数
let libraryHtml = hashTemplate`
  <ul>
    #for book in ${myBooks}
      <li><i>#{book.title}</i> by #{book.author}</li>
    #end
  </ul>
`;
```

除此之外，你甚至可以使用标签模板，在 JavaScript 语言之中嵌入其他语言。

```js
jsx`
  <div>
    <input
      ref='input'
      onChange='${this.handleChange}'
      defaultValue='${this.state.value}' />
      ${this.state.value}
   </div>
`;
```

通过 jsx 函数，将一个 DOM 字符串转为 React 对象。你可以在 GitHub 找到 [jsx](https://gist.github.com/lygaret/a68220defa69174bdec5) 函数的具体实现。

模板处理函数的第一个参数（模板字符串数组），还有一个 raw 属性，保存的是转义后的原字符串。

```js
console.log`123`;
// ["123", raw: Array[1]]
```
