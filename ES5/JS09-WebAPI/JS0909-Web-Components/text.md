# Web Components

## 1.概述

各种网站往往需要一些相同的模块，比如日历、调色板等等，这种模块就被称为 “**组件**”（component）。Web Component 就是网页组件式开发的技术规范。

采用组件进行网站开发，有很多优点。

1. 管理和使用非常容易。加载或卸载组件，只要添加或删除一行代码就可以了。

```html
<link rel="import" href="my-dialog.htm">
<my-dialog heading="A Dialog">Lorem ipsum</my-dialog>
```
>
2. 定制非常容易。组件往往留出接口，供使用者设置常见属性，比如上面代码的 `heading` 属性，就是用来设置对话框的标题。
>
3. 组件是模块化编程思想的体现，非常有利于代码的重用。标准格式的模块，可以跨平台、跨框架使用，构建、部署和与其他 UI 元素互动都有统一做法。
>
4. 组件提供了 HTML、CSS、JavaScript 封装的方法，实现了与同一页面上其他代码的隔离。

未来的网站开发，可以像搭积木一样，把组件合在一起，就组成了一个网站。这是非常诱人的。

Web Components 不是单一的规范，而是一系列的技术组成，包括 `Template`、`Custom Element`、`Shadow DOM`、`HTML Import` 四种技术规范。使用时，并不一定这四者都要用到。其中，`Custom Element` 和 `Shadow DOM` 最重要，`Template` 和 `HTML Import` 只起到辅助作用。

## 2.`template` 标签

### 2.1.基本用法

`template` 标签表示网页中某些重复出现的部分的代码模板。它存在于 DOM 之中，但是在页面中不可见。

下面的代码用来检查，浏览器是否支持 `template` 标签。

```js
function supportsTemplate() {
  return "content" in document.createElement("template");
}

if (supportsTemplate()) {
  // 支持
} else {
  // 不支持
}
```

下面是一个模板的例子。

```html
<template id="profileTemplate">
  <div class="profile">
    <img src="" class="profile__img" />
    <div class="profile__name"></div>
    <div class="profile__social"></div>
  </div>
</template>
```

使用的时候，需要用 JavaScript 在模板中插入内容，然后将其插入 DOM。

```js
var template = document.querySelector("#profileTemplate");
template.content.querySelector(".profile__img").src = "profile.jpg";
template.content.querySelector(".profile__name").textContent = "Barack Obama";
template.content.querySelector(".profile__social").textContent = "Follow me on Twitter";
document.body.appendChild(template.content);
```

上面的代码是将模板直接插入 DOM，更好的做法是克隆 `template` 节点，然后将克隆的节点插入 DOM。这样做可以多次使用模板。

```js
var clone = document.importNode(template.content, true);
document.body.appendChild(clone);
```

接受 `template` 插入的元素，叫做 **宿主元素**（host）。在 `template` 之中，可以对宿主元素设置样式。

```html
<template>
  <style>
    :host {
      background: #f8f8f8;
    }
    :host(:hover) {
      background: #ccc;
    }
  </style>
</template>
```

### 2.2.`document.importNode`

`document.importNode` 方法用于克隆外部文档的 DOM 节点。

```js
var iframe = document.getElementsByTagName("iframe")[0];
var oldNode = iframe.contentWindow.document.getElementById("myNode");
var newNode = document.importNode(oldNode, true);
document.getElementById("container").appendChild(newNode);
```

上面例子是将 `iframe` 窗口之中的节点 `oldNode`，克隆进入当前文档。

注意，克隆节点之后，还必须用 `appendChild` 方法将其加入当前文档，否则不会显示。换个角度说，这意味着插入外部文档节点之前，必须用 `document.importNode` 方法先将这个节点准备好。

`document.importNode` 方法接受两个参数，第一个参数是外部文档的 DOM 节点，第二个参数是一个布尔值，表示是否连同子节点一起克隆，默认为 false。大多数情况下，必须显式地将第二个参数设为 true。

## 3.Custom Element

HTML 预定义的网页元素，有时并不符合我们的需要，这时可以自定义网页元素，这就叫做 `Custom Element`。它是 Web component 技术的核心。举例来说，你可以自定义一个叫做 `super-button` 的网页元素。

`<super-button></super-button>`

注意，自定义网页元素的标签名必须含有连字符（`-`），一个或多个都可。这是因为浏览器内置的的 HTML 元素标签名，都不含有连字符，这样可以做到有效区分。

下面的代码用于测试浏览器是否支持自定义元素。

```js
if ("registerElement" in document) {
  // 支持
} else {
  // 不支持
}
document.registerElement();
```

使用自定义元素前，必须用 `document` 对象的 `registerElement` 方法登记该元素。该方法返回一个自定义元素的构造函数。

```js
var SuperButton = document.registerElement("super-button");
document.body.appendChild(new SuperButton());
```

上面代码生成自定义网页元素的构造函数，然后通过构造函数生成一个实例，将其插入网页。

可以看到，`document.registerElement` 方法的第一个参数是一个字符串，表示自定义的网页元素标签名。该方法还可以接受第二个参数，表示自定义网页元素的原型对象。

```js
var MyElement = document.registerElement("user-profile", {
  prototype: Object.create(HTMLElement.prototype)
});
```

上面代码注册了自定义元素 `user-profile`。第二个参数指定该元素的原型为 `HTMLElement.prototype`（浏览器内部所有 Element 节点的原型）。

但是，如果写成上面这样，自定义网页元素就跟普通元素没有太大区别。自定义元素的真正优势在于，可以自定义它的 API。

```js
var buttonProto = Object.create(HTMLElement.prototype);

buttonProto.print = function() {
  console.log("Super Button!");
};

var SuperButton = document.registerElement("super-button", {
  prototype: buttonProto
});

var supperButton = document.querySelector("super-button");

supperButton.print();
```

上面代码在原型对象上定义了一个 `print` 方法，然后将其指定为 `super-button` 元素的原型。因此，所有 `supper-button` 实例都可以调用 `print` 这个方法。

如果想让自定义元素继承某种特定的网页元素，就要指定 `extends` 属性。比如，想让自定义元素继承 `h1` 元素，需要写成下面这样。

```js
var MyElement = document.registerElement("another-heading", {
  prototype: Object.create(HTMLElement.prototype),
  extends: "h1"
});
```

另一个是自定义按钮（`button`）元素的例子。

```js
var MyButton = document.registerElement("super-button", {
  prototype: Object.create(HTMLButtonElement.prototype),
  extends: "button"
});
```

如果要继承一个自定义元素（比如 `x-foo-extended` 继承 `x-foo`），也是采用 `extends` 属性。

```js
var XFooExtended = document.registerElement("x-foo-extended", {
  prototype: Object.create(HTMLElement.prototype),
  extends: "x-foo"
});
```

定义了自定义元素以后，使用的时候，有两种方法。一种是直接使用，另一种是间接使用，指定为某个现有元素是自定义元素的实例。

```html
<!-- 直接使用 -->
<supper-button></supper-button>

<!-- 间接使用 -->
<button is="supper-button"></button>
```

总之，如果 A 元素继承了 B 元素。那么，B 元素的 `is` 属性，可以指定 B 元素是 A 元素的一个实例。

### 3.2.添加属性和方法

自定义元素的强大之处，就是可以在它上面定义新的属性和方法。

```js
var XFooProto = Object.create(HTMLElement.prototype);
var XFoo = document.registerElement("x-foo", { prototype: XFooProto });
```

上面代码注册了一个 `x-foo` 标签，并且指明原型继承 `HTMLElement.prototype`。现在，我们就可以在原型上面，添加新的属性和方法。

```js
// 添加属性
Object.defineProperty(XFooProto, "bar", { value: 5 });

// 添加方法
XFooProto.foo = function() {
  console.log("foo() called");
};

// 另一种写法
var XFoo = document.registerElement("x-foo", {
  prototype: Object.create(HTMLElement.prototype, {
    bar: {
      get: function() {
        return 5;
      }
    },
    foo: {
      value: function() {
        console.log("foo() called");
      }
    }
  })
});
```

### 3.3.回调函数

自定义元素的原型有一些属性，用来指定回调函数，在特定事件发生时触发。

- `createdCallback`：实例生成时触发
- `attachedCallback`：实例插入 HTML 文档时触发
- `detachedCallback`：实例从 HTML 文档移除时触发
- `attributeChangedCallback(attrName, oldVal, newVal)`：实例的属性发生改变时（添加、移除、更新）触发

```js
var proto = Object.create(HTMLElement.prototype);

proto.createdCallback = function() {
  console.log("created");
  this.innerHTML = "This is a my-demo element!";
};

proto.attachedCallback = function() {
  console.log("attached");
};

var XFoo = document.registerElement("x-foo", { prototype: proto });
```

利用回调函数，可以方便地在自定义元素中插入 HTML 语句。

```js
var XFooProto = Object.create(HTMLElement.prototype);

XFooProto.createdCallback = function() {
  this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";
};

var XFoo = document.registerElement("x-foo-with-markup", {
  prototype: XFooProto
});
```

上面代码定义了 `createdCallback` 回调函数，生成实例时，该函数运行，插入如下的 HTML 语句。

```html
<x-foo-with-markup>
  <b>I'm an x-foo-with-markup!</b>
</x-foo-with-markup>
```

## 4.Shadow DOM

所谓 `Shadow DOM` 指的是，浏览器将模板、样式表、属性、JavaScript 代码等，封装成一个独立的 DOM 元素。外部的设置无法影响到其内部，而内部的设置也不会影响到外部，与浏览器处理原生网页元素（比如 `<video>` 元素）的方式很像。

`Shadow DOM` 最大的好处有两个，一是可以向用户隐藏细节，直接提供组件，二是可以封装内部样式表，不会影响到外部。Chrome 35+ 支持 `Shadow DOM`。

`Shadow DOM` 元素必须依存在一个现有的 DOM 元素之下，通过 `createShadowRoot` 方法创造，然后将其插入该元素。

```js
var shadowRoot = element.createShadowRoot();
document.body.appendChild(shadowRoot);
```

上面代码创造了一个 `shadowRoot` 元素，然后将其插入 HTML 文档。

下面的例子是指定网页中某个现存的元素，作为 `Shadow DOM` 的根元素。

```html
<button>Hello, world!</button>
<script>
  var host = document.querySelector("button");
  var root = host.createShadowRoot();
  root.textContent = "你好";
</script>
```

上面代码指定现存的 `button` 元素，为 `Shadow DOM` 的根元素，并将 `button` 的文字从英文改为中文。

通过 `innerHTML` 属性，可以为 `Shadow DOM` 指定内容。

```js
var shadow = document.querySelector("#hostElement").createShadowRoot();
shadow.innerHTML = "<p>Here is some new text</p>";
shadow.innerHTML += "<style>p { color: red };</style>";
```

下面的例子是为 `Shadow DOM` 加上独立的模板。

```html
<div id="nameTag">张三</div>

<template id="nameTagTemplate">
  <style>
    .outer {
      border: 2px solid brown;
    }
  </style>

  <div class="outer">
    <div class="boilerplate">Hi! My name is</div>
    <div class="name">Bob</div>
  </div>
</template>
```

上面代码是一个 `div` 元素和模板。接下来，就是要把模板应用到 `div` 元素上。

```js
var shadow = document.querySelector("#nameTag").createShadowRoot();
var template = document.querySelector("#nameTagTemplate");
shadow.appendChild(template.content.cloneNode(true));
```

上面代码先用 `createShadowRoot` 方法，对 `div` 创造一个根元素，用来指定 `Shadow DOM`，然后把模板元素添加为 `Shadow` 的子元素。

## 5.HTML Import

### 5.1.基本操作

长久以来，网页可以加载外部的样式表、脚本、图片、多媒体，却无法方便地加载其他网页，`iframe` 和 `ajax` 都只能提供部分的解决方案，且有很大的局限。`HTML Import` 就是为了解决加载外部网页这个问题，而提出来的。

下面代码用于测试当前浏览器是否支持 `HTML Import`。

```js
function supportsImports() {
  return "import" in document.createElement("link");
}

if (supportsImports()) {
  // 支持
} else {
  // 不支持
}
```

`HTML Import` 用于将外部的 HTML 文档加载进当前文档。我们可以将组件的 HTML、CSS、JavaScript 封装在一个文件里，然后使用下面的代码插入需要使用该组件的网页。

```html
<link rel="import" href="dialog.html">
```

上面代码在网页中插入一个对话框组件，该组建封装在 `dialog.html` 文件。注意，`dialog.html` 文件中的样式和 JavaScript 脚本，都对所插入的整个网页有效。

假定 A 网页通过 `HTML Import` 加载了 B 网页，即 B 是一个组件，那么 B 网页的样式表和脚本，对 A 网页也有效（准确得说，只有 `style` 标签中的样式对 A 网页有效，`link` 标签加载的样式表对 A 网页无效）。所以可以把多个样式表和脚本，都放在 B 网页中，都从那里加载。这对大型的框架，是很方便的加载方法。

如果 B 与 A 不在同一个域，那么 A 所在的域必须打开 `CORS`。

```html
<!-- example.com 必须打开 CORS -->
<link rel="import" href="http://example.com/elements.html" />
```

除了用 `link` 标签，也可以用 JavaScript 调用 `link` 元素，完成 `HTML Import`。

```js
var link = document.createElement('link');
link.rel = 'import';
link.href = 'file.html'
link.onload = function(e) {...};
link.onerror = function(e) {...};
document.head.appendChild(link);
```

`HTML Import` 加载成功时，会在 `link` 元素上触发 `load` 事件，加载失败时（比如 404 错误）会触发 `error` 事件，可以对这两个事件指定回调函数。

```html
<script async>
  function handleLoad(e) {
    console.log("Loaded import: " + e.target.href);
  }
  function handleError(e) {
    console.log("Error loading import: " + e.target.href);
  }
</script>

<link
  rel="import"
  href="file.html"
  onload="handleLoad(event)"
  onerror="handleError(event)"
/>
```

上面代码中，`handleLoad` 和 `handleError` 函数的定义，必须在 `link` 元素的前面。因为浏览器元素遇到 `link` 元素时，立刻解析并加载外部网页（同步操作），如果这时没有对这两个函数定义，就会报错。

`HTML Import` 是同步加载，会阻塞当前网页的渲染，这主要是为了样式表的考虑，因为外部网页的样式表对当前网页也有效。如果想避免这一点，可以为 `link` 元素加上 `async` 属性。当然，这也意味着，如果外部网页定义了组件，就不能立即使用了，必须等 `HTML Import` 完成，才能使用。

```html
<link rel="import" href="/path/to/import_that_takes_5secs.html" async>
```

但是，`HTML Import` 不会阻塞当前网页的解析和脚本执行（即阻塞渲染）。这意味着在加载的同时，主页面的脚本会继续执行。

最后，`HTML Import` 支持多重加载，即被加载的网页同时又加载其他网页。如果这些网页都重复加载同一个外部脚本，浏览器只会抓取并执行一次该脚本。比如，A 网页加载了 B 网页，它们各自都需要加载 jQuery，浏览器只会加载一次 jQuery。

### 5.2.脚本的执行

外部网页的内容，并不会自动显示在当前网页中，它只是储存在浏览器中，等到被调用的时候才加载进入当前网页。为了加载网页网页，必须用 DOM 操作获取加载的内容。具体来说，就是使用 `link` 元素的 `import` 属性，来获取加载的内容。这一点与 `iframe` 完全不同。

```js
var content = document.querySelector('link[rel="import"]').import;
```

发生以下情况时，`link.import` 属性为 `null`。

- 浏览器不支持 `HTML Import`
- `link` 元素没有声明 `rel="import"`
- `link` 元素没有被加入 DOM
- `link` 元素已经从 DOM 中移除
- 对方域名没有打开 `CORS`

下面代码用于从加载的外部网页选取 `id` 为 `template` 的元素，然后将其克隆后加入当前网页的 DOM。

```js
var el = linkElement.import.querySelector("#template");
document.body.appendChild(el.cloneNode(true));
```

当前网页可以获取外部网页，反过来也一样，外部网页中的脚本，不仅可以获取本身的 DOM，还可以获取 `link` 元素所在的当前网页的 DOM。

```js
// 以下代码位于被加载（import）的外部网页

// importDoc 指向被加载的 DOM
var importDoc = document.currentScript.ownerDocument;

// mainDoc 指向主文档的 DOM
var mainDoc = document;

// 将子页面的样式表添加主文档
var styles = importDoc.querySelector('link[rel="stylesheet"]');
mainDoc.head.appendChild(styles.cloneNode(true));
```

上面代码将所加载的外部网页的样式表，添加进当前网页。

被加载的外部网页的脚本是直接在当前网页的上下文执行，因为它的 `window.document` 指的是当前网页的 `document`，而且它定义的函数可以被当前网页的脚本直接引用。

### 5.3.Web Component 的封装

对于 `Web Component` 来说，`HTML Import` 的一个重要应用是在所加载的网页中，自动登记 `Custom Element`。

```html
<script>
  // 定义并登记<say-hi>
  var proto = Object.create(HTMLElement.prototype);

  proto.createdCallback = function() {
    this.innerHTML = "Hello, <b>" + (this.getAttribute("name") || "?") + "</b>";
  };

  document.registerElement("say-hi", { prototype: proto });
</script>

<template id="t">
  <style>
    ::content > * {
      color: red;
    }
  </style>
  <span>I'm a shadow-element using Shadow DOM!</span> <content></content>
</template>

<script>
  (function() {
    var importDoc = document.currentScript.ownerDocument; //指向被加载的网页

    // 定义并登记<shadow-element>
    var proto2 = Object.create(HTMLElement.prototype);

    proto2.createdCallback = function() {
      var template = importDoc.querySelector("#t");
      var clone = document.importNode(template.content, true);
      var root = this.createShadowRoot();
      root.appendChild(clone);
    };

    document.registerElement("shadow-element", { prototype: proto2 });
  })();
</script>
```

上面代码定义并登记了两个元素：`<say-hi>` 和 `<shadow-element>`。在主页面使用这两个元素，非常简单。

```html
<head>
  <link rel="import" href="elements.html" />
</head>
<body>
  <say-hi name="Eric"></say-hi>
  <shadow-element> <div>( I'm in the light dom )</div> </shadow-element>
</body>
```

不难想到，这意味着 `HTML Import` 使得 `Web Component` 变得可分享了，其他人只要拷贝 `elements.html`，就可以在自己的页面中使用了。

## 6.Polymer.js

`Web Components` 是非常新的技术，为了让老式浏览器也能使用，Google 推出了一个函数库 `Polymer.js`。这个库不仅可以帮助开发者，定义自己的网页元素，还提供许多预先制作好的组件，可以直接使用。

### 6.1.直接使用的组件

`Polymer.js` 提供的组件，可以直接插入网页，比如下面的 `google-map`。

```html
<script src="components/platform/platform.js"></script>
<link rel="import" href="google-map.html" />
<google-map lat="37.790" long="-122.390"></google-map>
```

再比如，在网页中插入一个时钟，可以直接使用下面的标签。

```html
<polymer-ui-clock></polymer-ui-clock>
```

自定义标签与其他标签的用法完全相同，也可以使用 CSS 指定它的样式。

```css
polymer-ui-clock {
  width: 320px;
  height: 320px;
  display: inline-block;
  background: url("../assets/glass.png") no-repeat;
  background-size: cover;
  border: 4px solid rgba(32, 32, 32, 0.3);
}
```

### 6.2.安装

如果使用 bower 安装，至少需要安装 `platform` 和 `core components` 这两个核心部分。

```sh
bower install --save Polymer/platform
bower install --save Polymer/polymer
```

你还可以安装所有预先定义的界面组件。

```sh
bower install Polymer/core-elements
bower install Polymer/polymer-ui-elements
```

还可以只安装单个组件。

```sh
bower install Polymer/polymer-ui-accordion
```

这时，组件根目录下的 `bower.json`，会指明该组件的依赖的模块，这些模块会被自动安装。

```json
{
  "name": "polymer-ui-accordion",
  "private": true,
  "dependencies": {
    "polymer": "Polymer/polymer#0.2.0",
    "polymer-selector": "Polymer/polymer-selector#0.2.0",
    "polymer-ui-collapsible": "Polymer/polymer-ui-collapsible#0.2.0"
  },
  "version": "0.2.0"
}
```

### 6.3.自定义组件

下面是一个最简单的自定义组件的例子。

```html
<link rel="import" href="../bower_components/polymer/polymer.html" />
<polymer-element name="lorem-element">
  <template>
    <p>Lorem ipsum</p>
  </template>
</polymer-element>
```

上面代码定义了 `lorem-element` 组件。它分成三个部分。

- `import` 命令
  - `import` 命令表示载入核心模块
>
- `polymer-element` 标签
  - `polymer-element` 标签定义了组件的名称（注意，组件名称中必须包含连字符）。它还可以使用 `extends` 属性，表示组件基于某种网页元素。

```html
<polymer-element name="w3c-disclosure" extends="button">
```
>
- `template` 标签
  - `template` 标签定义了网页元素的模板。

### 6.4.组件的使用方法

在调用组件的网页中，首先加载 `polymer.js` 库和组件文件。

```html
<script src="components/platform/platform.js"></script>
<link rel="import" href="w3c-disclosure.html" />
```

然后，分成两种情况。如果组件不基于任何现有的 HTML 网页元素（即定义的时候没有使用 `extends` 属性），则可以直接使用组件。

```html
<lorem-element></lorem-element>
```

这时网页上就会显示一行字 “Lorem ipsum”。

如果组件是基于（`extends`）现有的网页元素，则必须在该种元素上使用 `is` 属性指定组件。

```html
<button is="w3c-disclosure">Expand section 1</button>
```
