# Fullscreen API：全屏操作

全屏 API 可以控制浏览器的全屏显示，让一个 Element 节点（以及子节点）占满用户的整个屏幕。目前各大浏览器的最新版本都支持这个 API（包括 IE11），但是使用的时候需要加上浏览器前缀。

The API allows a single element to be viewed full-screen. Unlike pressing F11 to force your browser to full-screen, the API is intended for images, videos and games running within a container.

全屏 API 没有它自己的接口实现。相反，它提供了一些其他接口以供实现全屏所需的方法、属性、事件处理函数。

只有包含在顶层文档内部的标准 HTML 元素、`svg` 元素和 `math` 元素， 以及拥有 `allowfullscreen` 属性的 `iframe` 的内部元素可以进入全屏模式。 这意味着在 `iframe` 内部的元素，以及 `object` 的内部元素不能进入全屏模式。

## 0. 基础

在了解全屏功能之前，先了解三个全屏相关概念：伪全屏，浏览器全屏 和 元素全屏。

- **伪全屏**

保持页面大小，将页面中的次要的内容隐藏起来，把页面空间让给需要突出给用户的内容。伪全屏并没有改变页面在显示器中的展示面积，只是优化了页面呈现的内容，所以称为 伪全屏。

- **浏览器全屏**

浏览器全屏一般通过浏览器菜单或浏览器快捷键触发。浏览器全屏是操作系统的窗口全屏在浏览器上的实现，其他桌面软件一般也支持窗口全屏。

- **元素全屏**

元素全屏是浏览器实现的页面全屏能力，由 js 代码控制页面中的某个元素进行全屏展示。

## 1. 方法

全屏 API 在 `Document` 和 `Element` 接口中增加了一些方法，可用于允许打开关闭全屏模式。

### 1.1.`element.requestFullscreen`

`Element.requestFullscreen` 方法用于发出 异步请求 使元素进入全屏模式。

调用此 API 并不能保证元素一定能够进入全屏模式。

如果元素被允许进入全屏幕模式，返回的 Promise 会 `resolve`，并且该元素会收到一个 `fullscreenchange` 事件，通知它已经进入全屏模式。

如果全屏请求被拒绝，返回的 promise 会变成 `rejected` 并且该元素会收到一个 `fullscreenerror` 事件。

如果该元素已经从原来的文档中分离，那么该文档将会收到这些事件。

> 注意：这个方法只能在用户交互或者设备方向改变的时候调用，否则将会失败。

- **参数**
  - `options`
    - 一个 `FullscreenOptions` 对象提供切换到全屏模式的控制选项。目前，唯一的选项是 `navigationUI`，这控制了是否在元素处于全屏模式时显示导航条 UI。默认值是"`auto`"，表明这将由浏览器来决定是否显示导航条。

- **返回值**
  - 在完成切换全屏模式后，返回一个 Promise。

- **异常**

`requestFullscreen()` 通过拒绝返回的 Promise 来生成错误条件，而不是抛出一个传统的异常。拒绝控制器接收以下的某一个值：

在以下几种情况下，会抛出 `TypeError`：

1. 文档中包含的元素未完全激活，也就是说不是当前活动的元素。

2. 元素不在文档之内。

3. 因为功能策略限制配置或其他访问控制，元素不被允许使用"`fullscreen`"功能。

4. 元素和它的文档是同一个节点。

```js
function launchFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
}

// 调用
launchFullscreen(document.documentElement);
launchFullscreen(document.getElementById("videoElement"));
```

在放大一个节点时，Gecko 和 WebKit 在行为上略有不同。Gecko 自动为该节点增加一条 CSS 规则，将该元素放大至全屏状态，`width: 100%; height: 100%`，而 WebKit 则是将该节点放在屏幕的中央，保持原来大小，其他部分变黑。为了让 WebKit 的行为与 Gecko 保持一致，可以自定义一条 CSS 规则：

```css
#myNode:-webkit-full-screen  {
  width: 100%;
  height: 100%;
}
```

### 1.2.`document.exitFullscreen`

`document` 对象的 `exitFullscreen` 方法用于取消全屏，会返回一个 Promise，会在全屏模式完全关闭的时候被置为 `resolved` 状态。该方法也带有浏览器前缀。

> 备注：如果一个元素在请求进去全屏模式之前，已经存在其他元素处于全屏状态，当这个元素退出全屏模式之后，之前的元素仍然处于全屏状态。浏览器内部维护了一个全屏元素栈用于实现这个目的。

```js
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

// 调用
exitFullscreen();
```

> 注意，`exitFullscreen` 仅在文档对象上调用，而不需要传递元素本身。

用户手动按下 ESC 键或 F11 键，也可以退出全屏键。此外，加载新的页面，或者切换 tab，或者从浏览器转向其他应用（按下 Alt - Tab），也会导致退出全屏状态。

## 2. 属性

### 2.1.`document.fullscreenElement`

`fullscreenElement` 属性返回正处于全屏状态的 `Element` 节点，如果当前没有 `Element` 节点处于全屏状态，则返回 `null`。

```js
var fullscreenElement =
  document.fullscreenElement ||
  document.mozFullScreenElement ||
  document.webkitFullscreenElement;
```

### 2.2.`document.fullscreenEnabled`

`fullscreenEnabled` 属性提供了启用全屏模式的可能性。当它的值是 `false` 的时候，表示全屏模式不可用（可能的原因有 "`fullscreen`" 特性不被允许，或全屏模式不被支持等 ）。

```js
var fullscreenEnabled =
  document.fullscreenEnabled ||
  document.mozFullScreenEnabled ||
  document.webkitFullscreenEnabled ||
  document.msFullscreenEnabled;

if (fullscreenEnabled) {
  videoElement.requestFullScreen();
} else {
  console.log("浏览器当前不能全屏");
}
```

### 2.3.`Document` 上的事件处理程序

#### 2.3.1.`Document.onfullscreenchange`

`fullscreenchange` 事件的处理程序，当进入全屏或退出全屏时，事件将被发送到 `Document` 上。此处理程序仅在整个文档全屏模式更改时有效。

#### 2.3.2.`Document.onfullscreenerror`

`fullscreenerror` 事件的处理程序，当进入全屏或退出全屏出错时，事件将被发送到 `Document` 上，仅对整个稳定的全屏模式更改出错时候有效。

### 2.4.`Element` 上的事件处理程序

#### 2.4.1.`Element.onfullscreenchange`

`fullscreenchange` 事件的处理程序，当指定的 `Element` 进入退出全屏程序时，事件将被发送到该指定的 Element 上。

#### 2.4.2.`Element.onfullscreenerror`

`fullscreenerror` 事件的处理程序，当指定 `Element` 改变全屏模式时候出现错误，该事件将被发送到指定的 Element 上。

> 注意：这些事件处理函数特性不可以当成 HTML 内容属性来使用。换句话说，你无法在 HTML 内容中为 `fullscreenchange` 和 `fullscreenerror` 指定事件处理程序，你必须通过 JavaScript 代码添加它们。

## 3. 全屏事件

全屏 API 定义了两个事件：

1. 可用来检测全屏模式何时打开和关闭。
2. 在全屏模式和窗口模式之间切换过程中何时发生错误。

- `fullscreenchange`
  >
  - 当全屏或退出全屏时发送消息给（监听的）的 `Document` 或 `Element`。
>
- `fullscreenerror`
  >
  - 当全屏或退出全屏是发生了错误时，将错误消息发送给（监听的）的 `Document` 或 `Element`。

你并不总是可以进入全屏模式。例如 `<iframe>` 元素具有 `allowfullscreen` 属性，可选择是否将其内容以全屏模式显示。另外，几种特定的内容，比如窗体插件（windowed plug-ins），不能以全屏模式显示。

尝试将不能以全屏模式显示的元素（或者此元素的父元素和后代元素）的时候，全屏请求是无效的。而相应元素会收到一个 `fullscreenerror` 事件。

```js
document.addEventListener("fullscreenchange", function(event) {
  if (document.fullscreenElement) {
    console.log("进入全屏");
  } else {
    console.log("退出全屏");
  }
});
```

> 注意：`fullscreenchange` 事件，不管在文档进入和退出全屏模式时，都不会提供任何信息

## 4. 全屏状态的 CSS

全屏状态下，大多数浏览器的 CSS 支持 `:full-screen` 伪类，只有 IE11 支持 `:fullscreen` 伪类。使用这个伪类，可以对全屏状态设置单独的 CSS 属性。

```css
:-webkit-full-screen {}

:-moz-full-screen {}

:-ms-fullscreen {}

:full-screen {}

:fullscreen {}

/* styling the backdrop*/
::backdrop {}
::-ms-backdrop {}
```

### 4.1.`:backdrop` 伪元素

> 这是一个实验中的功能

`::backdrop` CSS 伪元素 是在任何处于全屏模式的元素下的即刻渲染的盒子（并且在所有其他在堆中的层级更低的元素之上）。

```css
dialog::backdrop {
  background: rgba(255,0,0,.25);
}
```

全屏元素 是 top layer 堆中的一部分， 他们处于其他所有内容的上层。`::backdrop` 伪元素可用来给下层文档设置样式或隐藏它。

`::backdrop` 不继承任何元素同时也不被任何元素继承。没有规定什么属性不能应用于该伪元素

## 5. 一些问题

```shell
# 测试环境
# win 7     64
# chrome    78.0（正式版本） （32 位）
# firefox   69.0 (64 位）
# opera     64.0
# IE        11.0

# 测试时间
# 2019-10-30
```

1. 正常页面，监听键盘输入，拦截 F11 的默认行为，用 fullscreen API 行为取代，chrome 和 FF 表现正常，但欧鹏浏览器无法监听 F11，Edg 可以监听 F11，但无法阻止默认行为？其次，在 chrome 浏览器中，部分按键被输入以后，会干扰对 F11 的默认行为的拦截，比如 F3，F6，F8，F10 等等，FF 也是如此，个别时候，没有按键，也会出现默认行为拦截失败。

2. 全屏状态下，监听不到 ESC 和 F11。

3. 默认的 F11 不会触发  `fullscreenchange` 事件，而 ESC 可以。

4.`fullscreenchange`的回调函数中出现 `alert`：chrome 全屏被破坏；FF 正常；欧鹏同样也失败，但和谷歌不同的是，进入全屏和退出全屏中的 `alert` 会一同触发（如果有的话），而谷歌只会触发一个（有时也会触发两个）；至于 IE，好像直接忽略了 `alert`。

---

参考：

1.[Fullscreen API：全屏操作](https://javascript.ruanyifeng.com/htmlapi/fullscreen.html)

2.[全屏 API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fullscreen_API)

3.[全屏指南](https://developer.mozilla.org/zh-CN/docs/Web/API/Fullscreen_API/%E6%8C%87%E5%8D%97)

4.[Element.requestFullscreen()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/requestFullScreen)

5.[Document.exitFullscreen()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/exitFullscreen)

6.[几个有用的 Web API——全屏模式](https://denzel.netlify.com/js/useful_webapis_fullscreen.html?_=0987654334523)

7.[::backdrop](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::backdrop)

8.[HTML5 全屏 API 在 FireFox/Chrome 中的显示差异](https://www.zhangxinxu.com/wordpress/2012/10/html5-full-screen-api-firefox-chrome-difference/)

9.[浏览器的全屏功能小结 #16](https://github.com/CntChen/cntchen.github.io/issues/16)
