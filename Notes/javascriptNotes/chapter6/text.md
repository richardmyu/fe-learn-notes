# JavaScript笔记六

<!-- TOC -->

- [JavaScript笔记六](#javascript%E7%AC%94%E8%AE%B0%E5%85%AD)
    - [8.CSS操作](#8css%E6%93%8D%E4%BD%9C)
      - [1.HTML 元素的 style 属性](#1html-%E5%85%83%E7%B4%A0%E7%9A%84-style-%E5%B1%9E%E6%80%A7)
      - [2.CSSStyleDeclaration 接口](#2cssstyledeclaration-%E6%8E%A5%E5%8F%A3)
        - [2.1 简介](#21-%E7%AE%80%E4%BB%8B)
        - [2.2 CSSStyleDeclaration 实例属性](#22-cssstyledeclaration-%E5%AE%9E%E4%BE%8B%E5%B1%9E%E6%80%A7)
        - [2.3 CSSStyleDeclaration 实例方法](#23-cssstyledeclaration-%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95)
      - [3.CSS 模块的侦测](#3css-%E6%A8%A1%E5%9D%97%E7%9A%84%E4%BE%A6%E6%B5%8B)
      - [4.CSS 对象](#4css-%E5%AF%B9%E8%B1%A1)
        - [4.1 CSS.escape()](#41-cssescape)
        - [4.2 CSS.supports()](#42-csssupports)
      - [5.window.getComputedStyle()](#5windowgetcomputedstyle)
      - [6.CSS 伪元素](#6css-%E4%BC%AA%E5%85%83%E7%B4%A0)
      - [7.StyleSheet 接口](#7stylesheet-%E6%8E%A5%E5%8F%A3)
        - [7.1 概述](#71-%E6%A6%82%E8%BF%B0)
        - [7.2 实例属性](#72-%E5%AE%9E%E4%BE%8B%E5%B1%9E%E6%80%A7)
        - [7.3 实例方法](#73-%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95)
      - [8.实例：添加样式表](#8%E5%AE%9E%E4%BE%8B%E6%B7%BB%E5%8A%A0%E6%A0%B7%E5%BC%8F%E8%A1%A8)
      - [9.CSSRuleList 接口](#9cssrulelist-%E6%8E%A5%E5%8F%A3)
      - [10.CSSRule 接口](#10cssrule-%E6%8E%A5%E5%8F%A3)
        - [10.1 概述](#101-%E6%A6%82%E8%BF%B0)
        - [10.2 CSSRule 实例的属性](#102-cssrule-%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%B1%9E%E6%80%A7)
        - [10.3 CSSStyleRule 接口](#103-cssstylerule-%E6%8E%A5%E5%8F%A3)
        - [10.4 CSSMediaRule 接口](#104-cssmediarule-%E6%8E%A5%E5%8F%A3)
      - [11.window.matchMedia()](#11windowmatchmedia)
        - [11.1 基本用法](#111-%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95)
        - [11.2 MediaQueryList 接口的实例属性](#112-mediaquerylist-%E6%8E%A5%E5%8F%A3%E7%9A%84%E5%AE%9E%E4%BE%8B%E5%B1%9E%E6%80%A7)
        - [11.3 MediaQueryList 接口的实例方法](#113-mediaquerylist-%E6%8E%A5%E5%8F%A3%E7%9A%84%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95)
      - [12.CSS事件](#12css%E4%BA%8B%E4%BB%B6)
        - [12.1 transitionEnd事件](#121-transitionend%E4%BA%8B%E4%BB%B6)
        - [12.2 animationstart事件，animationend事件，animationiteration事件](#122-animationstart%E4%BA%8B%E4%BB%B6animationend%E4%BA%8B%E4%BB%B6animationiteration%E4%BA%8B%E4%BB%B6)
    - [9.Mutation Observer API](#9mutation-observer-api)
      - [1.概述](#1%E6%A6%82%E8%BF%B0)
      - [2.MutationObserver 构造函数](#2mutationobserver-%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0)
      - [3.MutationObserver 的实例方法](#3mutationobserver-%E7%9A%84%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95)
        - [3.1 observe()](#31-observe)
        - [3.2 disconnect()，takeRecords（）](#32-disconnecttakerecords)
      - [4.MutationRecord 对象](#4mutationrecord-%E5%AF%B9%E8%B1%A1)
      - [5.应用示例](#5%E5%BA%94%E7%94%A8%E7%A4%BA%E4%BE%8B)
        - [5.1 子元素的变动](#51-%E5%AD%90%E5%85%83%E7%B4%A0%E7%9A%84%E5%8F%98%E5%8A%A8)
        - [5.2 属性的变动](#52-%E5%B1%9E%E6%80%A7%E7%9A%84%E5%8F%98%E5%8A%A8)
        - [5.3 取代 DOMContentLoaded 事件](#53-%E5%8F%96%E4%BB%A3-domcontentloaded-%E4%BA%8B%E4%BB%B6)
  - [八.浏览器环境](#%E5%85%AB%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8E%AF%E5%A2%83)
    - [1.浏览器环境概述](#1%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8E%AF%E5%A2%83%E6%A6%82%E8%BF%B0)
      - [1.JavaScript代码嵌入网页的方法](#1javascript%E4%BB%A3%E7%A0%81%E5%B5%8C%E5%85%A5%E7%BD%91%E9%A1%B5%E7%9A%84%E6%96%B9%E6%B3%95)
        - [1.1 script标签：代码嵌入网页](#11-script%E6%A0%87%E7%AD%BE%E4%BB%A3%E7%A0%81%E5%B5%8C%E5%85%A5%E7%BD%91%E9%A1%B5)
        - [1.2 script标签：加载外部脚本](#12-script%E6%A0%87%E7%AD%BE%E5%8A%A0%E8%BD%BD%E5%A4%96%E9%83%A8%E8%84%9A%E6%9C%AC)
        - [1.3 事件属性](#13-%E4%BA%8B%E4%BB%B6%E5%B1%9E%E6%80%A7)
        - [1.4 URL协议](#14-url%E5%8D%8F%E8%AE%AE)
      - [2.script标签](#2script%E6%A0%87%E7%AD%BE)
        - [2.1 工作原理](#21-%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86)
        - [2.2 defer属性](#22-defer%E5%B1%9E%E6%80%A7)
        - [2.3 async属性](#23-async%E5%B1%9E%E6%80%A7)
        - [2.4 脚本的动态加载](#24-%E8%84%9A%E6%9C%AC%E7%9A%84%E5%8A%A8%E6%80%81%E5%8A%A0%E8%BD%BD)
        - [2.5 加载使用的协议](#25-%E5%8A%A0%E8%BD%BD%E4%BD%BF%E7%94%A8%E7%9A%84%E5%8D%8F%E8%AE%AE)
      - [3.浏览器的组成](#3%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E7%BB%84%E6%88%90)
        - [3.1 渲染引擎](#31-%E6%B8%B2%E6%9F%93%E5%BC%95%E6%93%8E)
        - [3.2 重流和重绘](#32-%E9%87%8D%E6%B5%81%E5%92%8C%E9%87%8D%E7%BB%98)
        - [3.3 JavaScript引擎](#33-javascript%E5%BC%95%E6%93%8E)
    - [2.window对象](#2window%E5%AF%B9%E8%B1%A1)
      - [1.概述](#1%E6%A6%82%E8%BF%B0)
      - [2.window对象的属性](#2window%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%B1%9E%E6%80%A7)
        - [2.1 window.window，window.name](#21-windowwindowwindowname)
        - [2.2 window.location](#22-windowlocation)
        - [2.3 window.closed，window.opener](#23-windowclosedwindowopener)
        - [2.4 window.frames，window.length](#24-windowframeswindowlength)
        - [2.5 window.screenX，window.screenY](#25-windowscreenxwindowscreeny)
        - [2.6 window.innerHeight，window.innerWidth](#26-windowinnerheightwindowinnerwidth)
        - [2.7 window.outerHeight，window.outerWidth](#27-windowouterheightwindowouterwidth)
        - [2.8 window.pageXOffset，window.pageYOffset](#28-windowpagexoffsetwindowpageyoffset)
      - [3.navigator对象](#3navigator%E5%AF%B9%E8%B1%A1)
        - [3.1 navigator.userAgent](#31-navigatoruseragent)
        - [3.2 navigator.plugins](#32-navigatorplugins)
        - [3.3 navigator.platform](#33-navigatorplatform)
        - [3.4 navigator.onLine](#34-navigatoronline)
        - [3.5 navigator.geolocation](#35-navigatorgeolocation)
        - [3.6 navigator.javaEnabled()，navigator.cookieEnabled](#36-navigatorjavaenablednavigatorcookieenabled)
      - [4.window.screen对象](#4windowscreen%E5%AF%B9%E8%B1%A1)
      - [5.window对象的方法](#5window%E5%AF%B9%E8%B1%A1%E7%9A%84%E6%96%B9%E6%B3%95)
        - [5.1 window.moveTo()，window.moveBy()](#51-windowmovetowindowmoveby)
        - [5.2 window.scrollTo()，window.scrollBy()](#52-windowscrolltowindowscrollby)
        - [5.3 window.open(), window.close()](#53-windowopen-windowclose)
        - [5.4 window.print()](#54-windowprint)
        - [5.5 window.getComputedStyle()](#55-windowgetcomputedstyle)
        - [5.6 window.matchMedia()](#56-windowmatchmedia)
        - [5.7 window.focus()](#57-windowfocus)
        - [5.8 window.getSelection()](#58-windowgetselection)
      - [6.多窗口操作](#6%E5%A4%9A%E7%AA%97%E5%8F%A3%E6%93%8D%E4%BD%9C)
        - [6.1 窗口的引用](#61-%E7%AA%97%E5%8F%A3%E7%9A%84%E5%BC%95%E7%94%A8)
        - [6.2 iframe标签](#62-iframe%E6%A0%87%E7%AD%BE)
        - [6.3 frames属性](#63-frames%E5%B1%9E%E6%80%A7)
      - [7.事件](#7%E4%BA%8B%E4%BB%B6)
        - [7.1 load事件和onload属性](#71-load%E4%BA%8B%E4%BB%B6%E5%92%8Conload%E5%B1%9E%E6%80%A7)
        - [7.2 error 事件和 onerror 属性](#72-error-%E4%BA%8B%E4%BB%B6%E5%92%8C-onerror-%E5%B1%9E%E6%80%A7)
      - [8.URL的编码/解码方法](#8url%E7%9A%84%E7%BC%96%E7%A0%81%E8%A7%A3%E7%A0%81%E6%96%B9%E6%B3%95)
        - [8.1 encodeURI](#81-encodeuri)
        - [8.2 encodeURIComponent](#82-encodeuricomponent)
        - [8.3 decodeURI](#83-decodeuri)
        - [8.4 decodeURIComponent](#84-decodeuricomponent)
      - [9.alert()，prompt()，confirm()](#9alertpromptconfirm)
    - [3.history对象](#3history%E5%AF%B9%E8%B1%A1)
      - [1.概述](#1%E6%A6%82%E8%BF%B0)
      - [2.history.pushState()](#2historypushstate)
      - [3.history.replaceState()](#3historyreplacestate)
      - [4.history.state属性](#4historystate%E5%B1%9E%E6%80%A7)
      - [5.popstate 事件](#5popstate-%E4%BA%8B%E4%BB%B6)
      - [6.URLSearchParams API](#6urlsearchparams-api)

<!-- /TOC -->

### 8.CSS操作

CSS 与 JavaScript 是两个有着明确分工的领域，前者负责页面的视觉效果，后者负责与用户的行为互动。但是，它们毕竟同属网页开发的前端，因此不可避免有着交叉和互相配合。

#### 1.HTML 元素的 style 属性

操作 CSS 样式最简单的方法，就是使用网页元素节点的`getAttribute`方法、`setAttribute`方法和`removeAttribute`方法，直接读写或删除网页元素的`style`属性。

```
div.setAttribute(
  'style',
  'background-color:red;' + 'border:1px solid black;'
);
```

上面的代码相当于下面的 HTML 代码。

`<div style="background-color:red; border:1px solid black;" />`

#### 2.CSSStyleDeclaration 接口

##### 2.1 简介

`CSSStyleDeclaration` 接口用来操作元素的样式。三个地方部署了这个接口。

- --
- 元素节点的`style`属性（`Element.style`）
- `CSSStyle`实例的`style`属性
- `window.getComputedStyle()`的返回值
- --

`CSSStyleDeclaration` 接口可以直接读写 CSS 的样式属性，不过，连词号需要变成骆驼拼写法。

```
var divStyle = document.querySelector('div').style;

divStyle.backgroundColor = 'red';
divStyle.border = '1px solid black';
divStyle.width = '100px';
divStyle.height = '100px';
divStyle.fontSize = '10em';

divStyle.backgroundColor // red
divStyle.border // 1px solid black
divStyle.height // 100px
divStyle.width // 100px
```

上面代码中，`style`属性的值是一个 `CSSStyleDeclaration` 实例。这个对象所包含的属性与 CSS 规则一一对应，但是名字需要改写，比如`background-color`写成`backgroundColor`。改写的规则是将横杠从 CSS 属性名中去除，然后将横杠后的第一个字母大写。如果 CSS 属性名是 JavaScript 保留字，则规则名之前需要加上字符串css，比如`float`写成`cssFloat`。

注意，该对象的属性值都是字符串，设置时必须包括单位，但是不含规则结尾的分号。比如，divStyle.width不能写为100，而要写为100px。

另外，`Element.style`返回的只是行内样式，并不是该元素的全部样式。通过样式表设置的样式，或者从父元素继承的样式，无法通过这个属性得到。元素的全部样式要通过`window.getComputedStyle()`得到。

##### 2.2 CSSStyleDeclaration 实例属性

1).CSSStyleDeclaration.cssText

`CSSStyleDeclaration.cssText`属性用来读写当前规则的所有样式声明文本。

```
var divStyle = document.querySelector('div').style;

divStyle.cssText = 'background-color: red;'
  + 'border: 1px solid black;'
  + 'height: 100px;'
  + 'width: 100px;';
```

> 注意，`cssText`的属性值不用改写 CSS 属性名。

删除一个元素的所有行内样式，最简便的方法就是设置`cssText`为空字符串。

`divStyle.cssText = '';`

2).CSSStyleDeclaration.length

`CSSStyleDeclaration.length`属性返回一个整数值，表示当前规则包含多少条样式声明。

```
// HTML 代码如下
// <div id="myDiv"
//   style="margin: 0 10px; background-color: #CA1; border: 1px solid red;"
// ></div>
var myDiv = document.getElementById('myDiv');
var divStyle = myDiv.style;
divStyles.length // 3
```

上面代码中，myDiv元素的行内样式共包含3条样式规则。

3).CSSStyleDeclaration.parentRule

`CSSStyleDeclaration.parentRule`属性返回当前规则所属的那个样式块（`CSSRule` 实例）。如果不存在所属的样式块，该属性返回`null`。

该属性只读，且只在使用 `CSSRule` 接口时有意义。

```
var declaration = document.styleSheets[0].rules[0].style;
declaration.parentRule === document.styleSheets[0].rules[0]
// true
```

##### 2.3 CSSStyleDeclaration 实例方法

1).CSSStyleDeclaration.getPropertyPriority()

`CSSStyleDeclaration.getPropertyPriority`方法接受 CSS 样式的属性名作为参数，返回一个字符串，表示有没有设置`important`优先级。如果有就返回`important`，否则返回空字符串。

```
// HTML 代码为
// <div id="myDiv" style="margin: 10px!important; color: red;"/>
var style = document.getElementById('myDiv').style;
style.margin // "10px"
style.getPropertyPriority('margin') // "important"
style.getPropertyPriority('color') // ""
```

上面代码中，`margin`属性有`important`优先级，`color`属性没有。

2).CSSStyleDeclaration.getPropertyValue()

`CSSStyleDeclaration.getPropertyValue`方法接受 CSS 样式属性名作为参数，返回一个字符串，表示该属性的属性值。

```
// HTML 代码为
// <div id="myDiv" style="margin: 10px!important; color: red;"/>
var style = document.getElementById('myDiv').style;
style.margin // "10px"
style.getPropertyValue("margin") // "10px"
```

3).CSSStyleDeclaration.item()

`CSSStyleDeclaration.item`方法接受一个整数值作为参数，返回该位置的 CSS 属性名。

```
// HTML 代码为
// <div id="myDiv" style="color: red; background-color: white;"/>
var style = document.getElementById('myDiv').style;
style.item(0) // "color"
style.item(1) // "background-color"
```

上面代码中，0号位置的 CSS 属性名是`color`，1号位置的 CSS 属性名是`background-color`。

如果没有提供参数，这个方法会报错。如果参数值超过实际的属性数目，这个方法返回一个空字符值。

4).CSSStyleDeclaration.removeProperty()

`CSSStyleDeclaration.removeProperty`方法接受一个属性名作为参数，在 CSS 规则里面移除这个属性，返回这个属性原来的值。

```
// HTML 代码为
// <div id="myDiv" style="color: red; background-color: white;">
//   111
// </div>
var style = document.getElementById('myDiv').style;
style.removeProperty('color') // 'red'
// HTML 代码变为
// <div id="myDiv" style="background-color: white;">
```

上面代码中，删除`color`属性以后，字体颜色从红色变成默认颜色。

5).CSSStyleDeclaration.setProperty()

`CSSStyleDeclaration.setProperty`方法用来设置新的 CSS 属性。该方法没有返回值。

该方法可以接受三个参数。

- --
- 第一个参数：属性名，该参数是必需的。
- 第二个参数：属性值，该参数可选。如果省略，则参数值默认为空字符串。
- 第三个参数：优先级，该参数可选。如果设置，唯一的合法值是important，表示 CSS 规则里面的!important。
- --

```
// HTML 代码为
// <div id="myDiv" style="color: red; background-color: white;">
//   111
// </div>
var style = document.getElementById('myDiv').style;
style.setProperty('border', '1px solid blue');
```

上面代码执行后，myDiv元素就会出现蓝色的边框。

#### 3.CSS 模块的侦测

CSS 的规格发展太快，新的模块层出不穷。不同浏览器的不同版本，对 CSS 模块的支持情况都不一样。有时候，需要知道当前浏览器是否支持某个模块，这就叫做“CSS模块的侦测”。

一个比较普遍适用的方法是，判断元素的style对象的某个属性值是否为字符串。

```
typeof element.style.animationName === 'string';
typeof element.style.transform === 'string';
```

如果该 CSS 属性确实存在，会返回一个字符串。即使该属性实际上并未设置，也会返回一个空字符串。如果该属性不存在，则会返回`undefined`。

```
document.body.style['maxWidth'] // ""
document.body.style['maximumWidth'] // undefined
```

上面代码说明，这个浏览器支持`max-width`属性，但是不支持`maximum-width`属性。

注意，不管 CSS 属性名的写法带不带连词线，`style`属性上都能反映出该属性是否存在。

```
document.body.style['backgroundColor'] // ""
document.body.style['background-color'] // ""
```

另外，使用的时候，需要把不同浏览器的 CSS 前缀也考虑进去。

```
var content = document.getElementById('content');
typeof content.style['webkitAnimation'] === 'string'
```

这种侦测方法可以写成一个函数。

```
function isPropertySupported(property) {
  if (property in document.body.style) return true;
  var prefixes = ['Moz', 'Webkit', 'O', 'ms', 'Khtml'];
  var prefProperty = property.charAt(0).toUpperCase() + property.substr(1);

  for(var i = 0; i < prefixes.length; i++){
    if((prefixes[i] + prefProperty) in document.body.style) return true;
  }

  return false;
}

isPropertySupported('background-clip')
// true
```

#### 4.CSS 对象

浏览器原生提供 CSS 对象，为 JavaScript 操作 CSS 提供一些工具方法。

##### 4.1 CSS.escape()

`CSS.escape`方法用于转义 CSS 选择器里面的特殊字符。

`<div id="foo#bar">`

上面代码中，该元素的id属性包含一个`#`号，该字符在 CSS 选择器里面有特殊含义。不能直接写成`document.querySelector('#foo#bar')`，只能写成`document.querySelector('#foo\\#bar')`。这里必须使用双斜杠的原因是，单引号字符串本身会转义一次斜杠。

`CSS.escape`方法就用来转义那些特殊字符。

`document.querySelector('#' + CSS.escape('foo#bar'))`

##### 4.2 CSS.supports()

`CSS.supports`方法返回一个布尔值，表示当前环境是否支持某一句 CSS 规则。

它的参数有两种写法，一种是第一个参数是属性名，第二个参数是属性值；另一种是整个参数就是一行完整的 CSS 语句。

```
// 第一种写法
CSS.supports('transform-origin', '5px') // true

// 第二种写法
CSS.supports('display: table-cell') // true
```

注意，第二种写法的参数结尾不能带有分号，否则结果不准确。

`CSS.supports('display: table-cell;') // false`

#### 5.window.getComputedStyle()

行内样式（inline style）具有最高的优先级，改变行内样式，通常会立即反映出来。但是，网页元素最终的样式是综合各种规则计算出来的。因此，如果想得到元素实际的样式，只读取行内样式是不够的，需要得到浏览器最终计算出来的样式规则。

`window.getComputedStyle`方法，就用来返回浏览器计算后得到的最终规则。它接受一个节点对象作为参数，返回一个 `CSSStyleDeclaration` 实例，包含了指定节点的最终样式信息。所谓“最终样式信息”，指的是各种 CSS 规则叠加后的结果。

```
var div = document.querySelector('div');
var styleObj = window.getComputedStyle(div);
styleObj.backgroundColor
```

上面代码中，得到的背景色就是div元素真正的背景色。

注意，`CSSStyleDeclaration` 实例是一个活的对象，任何对于样式的修改，会实时反映到这个实例上面。另外，这个实例是只读的。

`getComputedStyle`方法还可以接受第二个参数，表示当前元素的伪元素（比如`:before`、`:after`、`:first-line`、`:first-letter`等）。

`var result = window.getComputedStyle(div, ':before');`

下面的例子是如何获取元素的高度。

```
var elem = document.getElementById('elem-container');
var styleObj = window.getComputedStyle(elem, null)
var height = styleObj.height;
// 等同于
var height = styleObj['height'];
var height = styleObj.getPropertyValue('height');
```

上面代码得到的`height`属性，是浏览器最终渲染出来的高度，比其他方法得到的高度更可靠。由于`styleObj`是 `CSSStyleDeclaration` 实例，所以可以使用各种 `CSSStyleDeclaration` 的实例属性和方法。

有几点需要注意。

- --
- `CSSStyleDeclaration` 实例返回的 CSS 值都是绝对单位。比如，长度都是像素单位（返回值包括px后缀），颜色是`rgb(#, #, #)`或`rgba(#, #, #, #)`格式。
- --
- CSS 规则的简写形式无效。比如，想读取`margin`属性的值，不能直接读，只能读`marginLeft`、`marginTop`等属性；再比如，`font`属性也是不能直接读的，只能读`font-size`等单个属性。
- --
- 如果读取 CSS 原始的属性名，要用方括号运算符，比如`styleObj['z-index']`；如果读取骆驼拼写法的 CSS 属性名，可以直接读取`styleObj.zIndex`。
- --
- 该方法返回的 `CSSStyleDeclaration` 实例的`cssText`属性无效，返回`undefined`。
- --

#### 6.CSS 伪元素

CSS 伪元素是通过 CSS 向 DOM 添加的元素，主要是通过`:before`和`:after`选择器生成，然后用`content`属性指定伪元素的内容。

下面是一段 HTML 代码。

`<div id="test">Test content</div>`

CSS 添加伪元素:before的写法如下。

```
#test:before {
  content: 'Before ';
  color: #FF0;
}
```

节点元素的`style`对象无法读写伪元素的样式，这时就要用到`window.getComputedStyle()`。JavaScript 获取伪元素，可以使用下面的方法。

```
var test = document.querySelector('#test');

var result = window.getComputedStyle(test, ':before').content;
var color = window.getComputedStyle(test, ':before').color;
```

此外，也可以使用 `CSSStyleDeclaration` 实例的`getPropertyValue`方法，获取伪元素的属性。

```
var result = window.getComputedStyle(test, ':before')
  .getPropertyValue('content');
var color = window.getComputedStyle(test, ':before')
  .getPropertyValue('color');
```

#### 7.StyleSheet 接口

##### 7.1 概述

`StyleSheet`接口代表网页的一张样式表，包括`<link>`元素加载的样式表和`<style>`元素内嵌的样式表。

`document`对象的`styleSheets`属性，可以返回当前页面的所有`StyleSheet`实例（即所有样式表）。它是一个类似数组的对象。

```
var sheets = document.styleSheets;
var sheet = document.styleSheets[0];
sheet instanceof StyleSheet // true
```

如果是`<style>`元素嵌入的样式表，还有另一种获取`StyleSheet`实例的方法，就是这个节点元素的`sheet`属性。

```
// HTML 代码为 <style id="myStyle"></style>
var myStyleSheet = document.getElementById('myStyle').sheet;
myStyleSheet instanceof StyleSheet // true
```

##### 7.2 实例属性

`StyleSheet`实例有以下属性。

1).StyleSheet.disabled

`StyleSheet.disabled`返回一个布尔值，表示该样式表是否处于禁用状态。手动设置`disabled`属性为true，等同于在`<link>`元素里面，将这张样式表设为`alternate stylesheet`，即该样式表将不会生效。

注意，`disabled`属性只能在 JavaScript 脚本中设置，不能在 HTML 语句中设置。

2).Stylesheet.href

`Stylesheet.href`返回样式表的网址。对于内嵌样式表，该属性返回`null`。该属性只读。

`document.styleSheets[0].href`

3).StyleSheet.media

`StyleSheet.media`属性返回一个类似数组的对象（`MediaList`实例），成员是表示适用媒介的字符串。表示当前样式表是用于屏幕（screen），还是用于打印（print）或手持设备（handheld），或各种媒介都适用（all）。该属性只读，默认值是screen。

`document.styleSheets[0].media.mediaText// "all"`

`MediaList`实例的`appendMedium`方法，用于增加媒介；`deleteMedium`方法用于删除媒介。

```
document.styleSheets[0].media.appendMedium('handheld');
document.styleSheets[0].media.deleteMedium('print');
```

4).StyleSheet.title

`StyleSheet.title`属性返回样式表的title属性。

5).StyleSheet.type

`StyleSheet.type`属性返回样式表的`type`属性，通常是`text/css`。

`document.styleSheets[0].type  // "text/css"`

6).StyleSheet.parentStyleSheet

CSS 的`@import`命令允许在样式表中加载其他样式表。`StyleSheet.parentStyleSheet`属性返回包含了当前样式表的那张样式表。如果当前样式表是顶层样式表，则该属性返回`null`。

```
if (stylesheet.parentStyleSheet) {
  sheet = stylesheet.parentStyleSheet;
} else {
  sheet = stylesheet;
}
```

7).StyleSheet.ownerNode

`StyleSheet.ownerNode`属性返回`StyleSheet`对象所在的 DOM 节点，通常是`<link>`或`<style>`。对于那些由其他样式表引用的样式表，该属性为`null`。

```
// HTML代码为
// <link rel="StyleSheet" href="example.css" type="text/css" />
document.styleSheets[0].ownerNode // [object HTMLLinkElement]
```

8).StyleSheet.cssRules

`StyleSheet.cssRules`属性指向一个类似数组的对象（`CSSRuleList`实例），里面每一个成员就是当前样式表的一条 CSS 规则。使用该规则的`cssText`属性，可以得到 CSS 规则对应的字符串。

```
var sheet = document.querySelector('#styleElement').sheet;

sheet.cssRules[0].cssText
// "body { background-color: red; margin: 20px; }"

sheet.cssRules[1].cssText
// "p { line-height: 1.4em; color: blue; }"
```

每条 CSS 规则还有一个`style`属性，指向一个对象，用来读写具体的 CSS 命令。

```
styleSheet.cssRules[0].style.color = 'red';
styleSheet.cssRules[1].style.color = 'purple';
```

9).StyleSheet.ownerRule

有些样式表是通过`@import`规则输入的，它的`ownerRule`属性会返回一个`CSSRule`实例，代表那行`@import`规则。如果当前样式表不是通过`@import`引入的，`ownerRule`属性返回`null`。

##### 7.3 实例方法

1).CSSStyleSheet.insertRule()

`CSSStyleSheet.insertRule`方法用于在当前样式表的插入一个新的 CSS 规则。

```
var sheet = document.querySelector('#styleElement').sheet;
sheet.insertRule('#block { color: white }', 0);
sheet.insertRule('p { color: red }', 1);
```

该方法可以接受两个参数，第一个参数是表示 CSS 规则的字符串，这里只能有一条规则，否则会报错。第二个参数是该规则在样式表的插入位置（从0开始），该参数可选，默认为0（即默认插在样式表的头部）。注意，如果插入位置大于现有规则的数目，会报错。

该方法的返回值是新插入规则的位置序号。

注意，浏览器对脚本在样式表里面插入规则有很多限制。所以，这个方法最好放在`try...catch`里使用。

2).CSSStyleSheet.deleteRule()

`CSSStyleSheet.deleteRule`方法用来在样式表里面移除一条规则，它的参数是该条规则在`cssRules`对象中的位置。该方法没有返回值。

`document.styleSheets[0].deleteRule(1);`

#### 8.实例：添加样式表

网页添加样式表有两种方式。一种是添加一张内置样式表，即在文档中添加一个`<style>`节点。

```
// 写法一
var style = document.createElement('style');
style.setAttribute('media', 'screen');
style.innerHTML = 'body{color:red}';
document.head.appendChild(style);

// 写法二
var style = (function () {
  var style = document.createElement('style');
  document.head.appendChild(style);
  return style;
})();
style.sheet.insertRule('.foo{color:red;}', 0);
```

另一种是添加外部样式表，即在文档中添加一个`<link>`节点，然后将`href`属性指向外部样式表的 URL。

```
var linkElm = document.createElement('link');
linkElm.setAttribute('rel', 'stylesheet');
linkElm.setAttribute('type', 'text/css');
linkElm.setAttribute('href', 'reset-min.css');

document.head.appendChild(linkElm);
```

#### 9.CSSRuleList 接口

`CSSRuleList` 接口是一个类似数组的对象，表示一组 CSS 规则，成员都是 `CSSRule` 实例。

获取 `CSSRuleList` 实例，一般是通过`StyleSheet.cssRules`属性。

```
// HTML 代码如下
// <style id="myStyle">
//   h1 { color: red; }
//   p { color: blue; }
// </style>
var myStyleSheet = document.getElementById('myStyle').sheet;
var crl = myStyleSheet.cssRules;
crl instanceof CSSRuleList // true
```

`CSSRuleList` 实例里面，每一条规则（`CSSRule` 实例）可以通过`rules.item(index)`或者`rules[index]`拿到。CSS 规则的条数通过`rules.length`拿到。还是用上面的例子。

```
crl[0] instanceof CSSRule // true
crl.length // 2
```

注意，添加规则和删除规则不能在 `CSSRuleList` 实例操作，而要在它的父元素 `StyleSheet` 实例上，通过`StyleSheet.insertRule()`和`StyleSheet.deleteRule()`操作。

#### 10.CSSRule 接口

##### 10.1 概述

一条 CSS 规则包括两个部分：CSS 选择器和样式声明。下面就是一条典型的 CSS 规则。

```
.myClass {
  color: red;
  background-color: yellow;
}
```

JavaScript 通过 `CSSRule` 接口操作 CSS 规则。一般通过 `CSSRuleList` 接口（`StyleSheet.cssRules`）获取 `CSSRule` 实例。

```
// HTML 代码如下
// <style id="myStyle">
//   .myClass {
//     color: red;
//     background-color: yellow;
//   }
// </style>
var myStyleSheet = document.getElementById('myStyle').sheet;
var ruleList = myStyleSheet.cssRules;
var rule = ruleList[0];
rule instanceof CSSRule // true
```

##### 10.2 CSSRule 实例的属性

1).CSSRule.cssText

`CSSRule.cssText`属性返回当前规则的文本，还是使用上面的例子。

`rule.cssText// ".myClass { color: red; background-color: yellow; }"`

如果规则是加载（`@import`）其他样式表，`cssText`属性返回`@import 'url'`。

2).CSSRule.parentStyleSheet

`CSSRule.parentStyleSheet`属性返回当前规则所在的样式表对象（`StyleSheet` 实例），还是使用上面的例子。

`rule.parentStyleSheet === myStyleSheet // true`

3).CSSRule.parentRule

`CSSRule.parentRule`属性返回包含当前规则的父规则，如果不存在父规则（即当前规则是顶层规则），则返回`null`。

父规则最常见的情况是，当前规则包含在`@media`规则代码块之中。

```
// HTML 代码如下
// <style id="myStyle">
//   @supports (display: flex) {
//     @media screen and (min-width: 900px) {
//       article {
//         display: flex;
//       }
//     }
//  }
// </style>
var myStyleSheet = document.getElementById('myStyle').sheet;
var ruleList = myStyleSheet.cssRules;

var rule0 = ruleList[0];
rule0.cssText
// "@supports (display: flex) {
//    @media screen and (min-width: 900px) {
//      article { display: flex; }
//    }
// }"

// 由于这条规则内嵌其他规则，
// 所以它有 cssRules 属性，且该属性是 CSSRuleList 实例
rule0.cssRules instanceof CSSRuleList // true

var rule1 = rule0.cssRules[0];
rule1.cssText
// "@media screen and (min-width: 900px) {
//   article { display: flex; }
// }"

var rule2 = rule1.cssRules[0];
rule2.cssText
// "article { display: flex; }"

rule1.parentRule === rule0 // true
rule2.parentRule === rule1 // true
```

4).CSSRule.type

`CSSRule.type`属性返回一个整数值，表示当前规则的类型。

最常见的类型有以下几种。

- --
- 1：普通样式规则（`CSSStyleRule` 实例）
- 2：`@import`规则
- 3：`@media`规则（`CSSMediaRule` 实例）
- 4：`@font-face`规则
- --

##### 10.3 CSSStyleRule 接口

如果一条 CSS 规则是普通的样式规则（不含特殊的 CSS 命令），那么除了 `CSSRule` 接口，它还部署了 `CSSStyleRule` 接口。

`CSSStyleRule` 接口有以下两个属性。

1).CSSStyleRule.selectorText

`CSSStyleRule.selectorText`属性返回当前规则的选择器。

```
var stylesheet = document.styleSheets[0];
stylesheet.cssRules[0].selectorText // ".myClass"
```

注意，这个属性是可写的。

2).CSSStyleRule.style

`CSSStyleRule.style`属性返回一个对象（`CSSStyleDeclaration` 实例），代表当前规则的样式声明，也就是选择器后面的大括号里面的部分。

```
// HTML 代码为
// <style id="myStyle">
//   p { color: red; }
// </style>
var styleSheet = document.getElementById('myStyle').sheet;
styleSheet.cssRules[0].style instanceof CSSStyleDeclaration
// true
```

`CSSStyleDeclaration` 实例的`cssText`属性，可以返回所有样式声明，格式为字符串。

```
styleSheet.cssRules[0].style.cssText
// "color: red;"
styleSheet.cssRules[0].selectorText
// "p"
```

##### 10.4 CSSMediaRule 接口

如果一条 CSS 规则是`@media`代码块，那么它除了 `CSSRule` 接口，还部署了 `CSSMediaRule` 接口。

该接口主要提供`media`属性和`conditionText`属性。前者返回代表`@media`规则的一个对象（`MediaList` 实例），后者返回`@media`规则的生效条件。

```
// HTML 代码如下
// <style id="myStyle">
//   @media screen and (min-width: 900px) {
//     article { display: flex; }
//   }
// </style>
var styleSheet = document.getElementById('myStyle').sheet;
styleSheet.cssRules[0] instanceof CSSMediaRule
// true

styleSheet.cssRules[0].media
//  {
//    0: "screen and (min-width: 900px)",
//    appendMedium: function,
//    deleteMedium: function,
//    item: function,
//    length: 1,
//    mediaText: "screen and (min-width: 900px)"
// }

styleSheet.cssRules[0].conditionText
// "screen and (min-width: 900px)"
```

#### 11.window.matchMedia()

##### 11.1 基本用法

`window.matchMedia`方法用来将 CSS 的`MediaQuery`条件语句，转换成一个 `MediaQueryList` 实例。

```
var mdl = window.matchMedia('(min-width: 400px)');
mdl instanceof MediaQueryList // true
```

注意，如果参数不是有效的`MediaQuery`条件语句，`window.matchMedia`不会报错，依然返回的一个 `MediaQueryList` 实例。

`window.matchMedia('bad string') instanceof MediaQueryList // true`

##### 11.2 MediaQueryList 接口的实例属性

`MediaQueryList` 实例有三个属性。

1).MediaQueryList.media

`MediaQueryList.media`属性返回一个字符串，表示对应的 `MediaQuery`条件语句。

```
var mql = window.matchMedia('(min-width: 400px)');
mql.media // "(min-width: 400px)"
```

2).MediaQueryList.matches

`MediaQueryList.matches`属性返回一个布尔值，表示当前页面是否符合指定的 `MediaQuery` 条件语句。

```
if (window.matchMedia('(min-width: 400px)').matches) {
  /* 当前视口不小于 400 像素 */
} else {
  /* 当前视口小于 400 像素 */
}
```

下面的例子根据`mediaQuery`是否匹配当前环境，加载相应的 CSS 样式表。

```
var result = window.matchMedia("(max-width: 700px)");

if (result.matches){
  var linkElm = document.createElement('link');
  linkElm.setAttribute('rel', 'stylesheet');
  linkElm.setAttribute('type', 'text/css');
  linkElm.setAttribute('href', 'small.css');

  document.head.appendChild(linkElm);
}
```

3).MediaQueryList.onchange

如果 `MediaQuery` 条件语句的适配环境发生变化，会触发`change`事件。`MediaQueryList.onchange`属性用来指定`change`事件的监听函数。该函数的参数是`change`事件对象（`MediaQueryListEvent` 实例），该对象与 `MediaQueryList` 实例类似，也有`media`和`matches`属性。

```
var mql = window.matchMedia('(max-width: 600px)');

mql.onchange = function(e) {
  if (e.matches) {
    /* 视口不超过 600 像素 */
  } else {
    /* 视口超过 600 像素 */
  }
}
```

上面代码中，`change`事件发生后，存在两种可能。一种是显示宽度从700像素以上变为以下，另一种是从700像素以下变为以上，所以在监听函数内部要判断一下当前是哪一种情况。

##### 11.3 MediaQueryList 接口的实例方法

`MediaQueryList` 实例有两个方法`MediaQueryList.addListener()`和`MediaQueryList.removeListener()`，用来为`change`事件添加或撤销监听函数。

```
var mql = window.matchMedia('(max-width: 600px)');

// 指定监听函数
mql.addListener(mqCallback);

// 撤销监听函数
mql.removeListener(mqCallback);

function mqCallback(e) {
  if (e.matches) {
    /* 视口不超过 600 像素 */
  } else {
    /* 视口超过 600 像素 */
  }
}
```

#### 12.CSS事件

##### 12.1 transitionEnd事件

CSS的**过渡效果（transition）**结束后，触发`transitionEnd`事件。

```
el.addEventListener('transitionend', onTransitionEnd, false);

function onTransitionEnd() {
  console.log('Transition end');
}
```

`transitionEnd`的事件对象具有以下属性。

- --
- `propertyName`：发生`transition`效果的CSS属性名。
- `elapsedTime`：`transition`效果持续的秒数，不含`transition-delay`的时间。
- `pseudoElement`：如果`transition`效果发生在伪元素，会返回该伪元素的名称，以“`::`”开头。如果不发生在伪元素上，则返回一个空字符串。
- --

实际使用`transitionend`事件时，可能需要添加浏览器前缀。

```
el.addEventListener('webkitTransitionEnd', function () {
    el.style.transition = 'none';
});
```

##### 12.2 animationstart事件，animationend事件，animationiteration事件

CSS动画有以下三个事件。

- --
- `animationstart`事件：动画开始时触发。
- `animationend`事件：动画结束时触发。
- `animationiteration`事件：开始新一轮动画循环时触发。如果`animation-iteration-count`属性等于1，该事件不触发，即只播放一轮的CSS动画，不会触发`animationiteration`事件。
- --

```
div.addEventListener('animationiteration', function() {
  console.log('完成一次动画');
});
```

这三个事件的事件对象，都有`animationName`属性（返回产生过渡效果的CSS属性名）和`elapsedTime`属性（动画已经运行的秒数）。对于`animationstart`事件，`elapsedTime`属性等于0，除非`animation-delay`属性等于负值。

```
var el = document.getElementById("animation");

el.addEventListener("animationstart", listener, false);
el.addEventListener("animationend", listener, false);
el.addEventListener("animationiteration", listener, false);

function listener(e) {
  var li = document.createElement("li");
  switch(e.type) {
    case "animationstart":
      li.innerHTML = "Started: elapsed time is " + e.elapsedTime;
      break;
    case "animationend":
      li.innerHTML = "Ended: elapsed time is " + e.elapsedTime;
      break;
    case "animationiteration":
      li.innerHTML = "New loop started at time " + e.elapsedTime;
      break;
  }
  document.getElementById("output").appendChild(li);
}
```

上面代码的运行结果是下面的样子。

```
Started: elapsed time is 0
New loop started at time 3.01200008392334
New loop started at time 6.00600004196167
Ended: elapsed time is 9.234000205993652
```

`animation-play-state`属性可以控制动画的状态（暂停/播放），该属性需求加上浏览器前缀。

```
element.style.webkitAnimationPlayState = "paused";
element.style.webkitAnimationPlayState = "running";
```

### 9.Mutation Observer API

#### 1.概述

Mutation Observer API 用来监视 DOM 变动。DOM 的任何变动，比如节点的增减、属性的变动、文本内容的变动，这个 API 都可以得到通知。

概念上，它很接近事件，可以理解为 DOM 发生变动就会触发 `Mutation Observer` 事件。但是，它与事件有一个本质不同：事件是同步触发，也就是说，DOM 的变动立刻会触发相应的事件；`Mutation Observer` 则是异步触发，DOM 的变动并不会马上触发，而是要等到当前所有 DOM 操作都结束才触发。

这样设计是为了应付 DOM 变动频繁的特点。举例来说，如果文档中连续插入1000个`<p>`元素，就会连续触发1000个插入事件，执行每个事件的回调函数，这很可能造成浏览器的卡顿；而 `Mutation Observer` 完全不同，只在1000个段落都插入结束后才会触发，而且只触发一次。

`Mutation Observer` 有以下特点。

- --
- a.它等待所有脚本任务完成后，才会运行（即异步触发方式）。
- b.它把 DOM 变动记录封装成一个数组进行处理，而不是一条条个别处理 DOM 变动。
- c.它既可以观察 DOM 的所有类型变动，也可以指定只观察某一类变动。
- --

#### 2.MutationObserver 构造函数

使用时，首先使用`MutationObserver`构造函数，新建一个观察器实例，同时指定这个实例的回调函数。

`var observer = new MutationObserver(callback);`

上面代码中的回调函数，会在每次 DOM 变动后调用。该回调函数接受两个参数，第一个是变动数组，第二个是观察器实例，下面是一个例子。

```
var observer = new MutationObserver(function (mutations, observer) {
  mutations.forEach(function(mutation) {
    console.log(mutation);
  });
});
```

#### 3.MutationObserver 的实例方法

##### 3.1 observe()

`observe`方法用来启动监听，它接受两个参数。

- --
- 第一个参数：所要观察的 DOM 节点
- 第二个参数：一个配置对象，指定所要观察的特定变动
- --

```
var article = document.querySelector('article');

var  options = {
  'childList': true,
  'attributes':true
} ;

observer.observe(article, options);
```

上面代码中，`observe`方法接受两个参数，第一个是所要观察的DOM元素是article，第二个是所要观察的变动类型（子节点变动和属性变动）。

观察器所能观察的 DOM 变动类型（即上面代码的`options`对象），有以下几种。

- --
- `childList`：子节点的变动。
- `attributes`：属性的变动。
- `characterData`：节点内容或节点文本的变动。
- `subtree`：所有后代节点的变动。
- --

想要观察哪一种变动类型，就在`option`对象中指定它的值为true。需要注意的是，如果设置观察`subtree`的变动，必须同时指定`childList`、`attributes`和`characterData`中的一种或多种。

除了变动类型，`options`对象还可以设定以下属性：

- --
- `attributeOldValue`：布尔值，表示观察`attributes`变动时，是否需要记录变动前的属性值。
- `characterDataOldValue`：布尔值，表示观察`characterData`变动时，是否需要记录变动前的值。
- `attributeFilter`：数组，表示需要观察的特定属性（比如`['class','src']`）。
- --

```
// 开始监听文档根节点（即<html>标签）的变动
mutationObserver.observe(document.documentElement, {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true
});
```

对一个节点添加观察器，就像使用`addEventListener`方法一样，多次添加同一个观察器是无效的，回调函数依然只会触发一次。但是，如果指定不同的`options`对象，就会被当作两个不同的观察器。

下面的例子是观察新增的子节点。

```
var insertedNodes = [];
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    for (var i = 0; i < mutation.addedNodes.length; i++)
      insertedNodes.push(mutation.addedNodes[i]);
  })
});
observer.observe(document, { childList: true });
console.log(insertedNodes);
```

##### 3.2 disconnect()，takeRecords（）

`disconnect`方法用来停止观察。调用该方法后，DOM 再发生变动，也不会触发观察器。

`observer.disconnect();`

`takeRecords`方法用来清除变动记录，即不再处理未处理的变动。该方法返回变动记录的数组。

`observer.takeRecords();`

下面是一个例子。

```
// 保存所有没有被观察器处理的变动
var changes = mutationObserver.takeRecords();

// 停止观察
mutationObserver.disconnect();
```

#### 4.MutationRecord 对象

DOM 每次发生变化，就会生成一条变动记录（`MutationRecord` 实例）。该实例包含了与变动相关的所有信息。`Mutation Observer` 处理的就是一个个`MutationRecord`实例所组成的数组。

`MutationRecord`对象包含了DOM的相关信息，有如下属性：

- --
- `type`：观察的变动类型（`attribute`、`characterData`或者`childList`）。
- `target`：发生变动的DOM节点。
- `addedNodes`：新增的DOM节点。
- `removedNodes`：删除的DOM节点。
- `previousSibling`：前一个同级节点，如果没有则返回`null`。
- `nextSibling`：下一个同级节点，如果没有则返回`null`。
- `attributeName`：发生变动的属性。如果设置了`attributeFilter`，则只返回预先指定的属性。
- `oldValue`：变动前的值。这个属性只对`attribute`和`characterData`变动有效，如果发生`childList`变动，则返回`null`。
- --

#### 5.应用示例

##### 5.1 子元素的变动

下面的例子说明如何读取变动记录。

```
var callback = function (records){
  records.map(function(record){
    console.log('Mutation type: ' + record.type);
    console.log('Mutation target: ' + record.target);
  });
};

var mo = new MutationObserver(callback);

var option = {
  'childList': true,
  'subtree': true
};

mo.observe(document.body, option);
```

上面代码的观察器，观察`<body>`的所有下级节点（`childList`表示观察子节点，`subtree`表示观察后代节点）的变动。回调函数会在控制台显示所有变动的类型和目标节点。

##### 5.2 属性的变动

下面的例子说明如何追踪属性的变动。

```
var callback = function (records) {
  records.map(function (record) {
    console.log('Previous attribute value: ' + record.oldValue);
  });
};

var mo = new MutationObserver(callback);

var element = document.getElementById('#my_element');

var options = {
  'attributes': true,
  'attributeOldValue': true
}

mo.observe(element, options);
```

上面代码先设定追踪属性变动（`'attributes': true`），然后设定记录变动前的值。实际发生变动时，会将变动前的值显示在控制台。

##### 5.3 取代 DOMContentLoaded 事件

网页加载的时候，DOM 节点的生成会产生变动记录，因此只要观察 DOM 的变动，就能在第一时间触发相关事件，因此也就没有必要使用`DOMContentLoaded`事件。

```
var observer = new MutationObserver(callback);
observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});
```

上面代码中，监听`document.documentElement`（即HTML节点）的子节点的变动，`subtree`属性指定监听还包括后代节点。因此，任意一个网页元素一旦生成，就能立刻被监听到。

下面的代码，使用`MutationObserver`对象封装一个监听 DOM 生成的函数。

```
(function(win){
  'use strict';

  var listeners = [];
  var doc = win.document;
  var MutationObserver = win.MutationObserver || win.WebKitMutationObserver;
  var observer;

  function ready(selector, fn){
    // 储存选择器和回调函数
    listeners.push({
      selector: selector,
      fn: fn
    });
    if(!observer){
      // 监听document变化
      observer = new MutationObserver(check);
      observer.observe(doc.documentElement, {
        childList: true,
        subtree: true
      });
    }
    // 检查该节点是否已经在DOM中
    check();
  }

  function check(){
  // 检查是否匹配已储存的节点
    for(var i = 0; i < listeners.length; i++){
      var listener = listeners[i];
      // 检查指定节点是否有匹配
      var elements = doc.querySelectorAll(listener.selector);
      for(var j = 0; j < elements.length; j++){
        var element = elements[j];
        // 确保回调函数只会对该元素调用一次
        if(!element.ready){
          element.ready = true;
          // 对该节点调用回调函数
          listener.fn.call(element, element);
        }
      }
    }
  }

  // 对外暴露ready
  win.ready = ready;

})(this);

ready('.foo', function(element){
  // ...
});
```

## 八.浏览器环境

### 1.浏览器环境概述

#### 1.JavaScript代码嵌入网页的方法

JavaScript代码只有嵌入网页，才能在用户浏览网页时运行。

网页中嵌入JavaScript代码，主要有四种方法。

- --
- `<script>`标签：代码嵌入网页
- `<script>`标签：加载外部脚本
- 事件属性：代码写入HTML元素的事件处理属性，比如`onclick`或者`onmouseover`
- URL协议：URL支持以`javascript:`协议的方式，执行JavaScript代码
- --

后两种方法用得很少，常用的是前两种方法。由于内容（HTML代码）和行为代码（JavaScript）应该分离，所以第一种方法应当谨慎使用。

##### 1.1 script标签：代码嵌入网页

通过`<script>`标签，可以直接将JavaScript代码嵌入网页。

```
<script>
  console.log('Hello World');
</script>
```

`<script>`标签有一个`type`属性，用来指定脚本类型。对JavaScript脚本来说，`type`属性可以设为两种值。

- --
- `text/javascript`：这是默认值，也是历史上一贯设定的值。如果你省略`type`属性，默认就是这个值。对于老式浏览器，设为这个值比较好。
- `application/javascript`：对于较新的浏览器，建议设为这个值。
- --

```
<script type="application/javascript">
  console.log('Hello World');
</script>
```

由于`<script>`标签默认就是JavaScript代码。所以，嵌入JavaScript脚本时，`type`属性也可以省略。

如果`type`属性的值，浏览器不认识，那么它不会执行其中的代码。利用这一点，可以在`<script>`标签之中嵌入任意的文本内容，然后加上一个浏览器不认识的`type`属性即可。

```
<script id="mydata" type="x-custom-data">
  console.log('Hello World');
</script>
```

上面的代码，浏览器不会执行，也不会显示它的内容，因为不认识它的`type`属性。但是，这个`<script>`节点依然存在于DOM之中，可以使用`<script>`节点的text属性读出它的内容。

```
document.getElementById('mydata').text
// "
//   console.log('Hello World');
// "
```

##### 1.2 script标签：加载外部脚本

`<script>`标签也可以指定加载外部的脚本文件。

`<script src="example.js"></script>`

如果脚本文件使用了非英语字符，还应该注明编码。

`<script charset="utf-8" src="example.js"></script>`

所加载的脚本必须是纯的 JavaScript 代码，不能有HTML代码和`<script>`标签。

加载外部脚本和直接添加代码块，这两种方法不能混用。下面代码的`console.log`语句直接被忽略。

```
<script charset="utf-8" src="example.js">
  console.log('Hello World!');
</script>
```

为了防止攻击者篡改外部脚本，`script`标签允许设置一个`integrity`属性，写入该外部脚本的`Hash`签名，用来验证脚本的一致性。

```
<script src="/assets/application.js"
  integrity="sha256-TvVUHzSfftWg1rcfL6TIJ0XKEGrgLyEq6lEpcmrG9qs=">
</script>
```

上面代码中，script标签有一个`integrity`属性，指定了外部脚本`/assets/application.js`的 `SHA256` 签名。一旦有人改了这个脚本，导致 `SHA256` 签名不匹配，浏览器就会拒绝加载。

##### 1.3 事件属性

某些HTML元素的事件属性（比如`onclick`和`onmouseover`），可以写入JavaScript代码。当指定事件发生时，就会调用这些代码。

`<div onclick="alert('Hello')"></div>`

上面的事件属性代码只有一个语句。如果有多个语句，用分号分隔即可。

##### 1.4 URL协议

URL支持`javascript:`协议，调用这个URL时，就会执行JavaScript代码。

`<a href="javascript:alert('Hello')"></a>`

浏览器的地址栏也可以执行`javascipt:`协议。将`javascript:alert('Hello')`放入地址栏，按回车键，就会跳出提示框。

如果JavaScript代码返回一个字符串，浏览器就会新建一个文档，展示这个字符串的内容，原有文档的内容都会消失。

```
<a href="javascript:new Date().toLocaleTimeString();">
  What time is it?
</a>
```

上面代码中，用户点击链接以后，会打开一个新文档，里面有当前时间。

如果返回的不是字符串，那么浏览器不会新建文档，也不会跳转。

```
<a href="javascript:console.log(new Date().toLocaleTimeString())">
What time is it?
</a>
```

上面代码中，用户点击链接后，网页不会跳转，只会在控制台显示当前时间。

`javascript:`协议的常见用途是书签脚本`Bookmarklet`。由于浏览器的书签保存的是一个网址，所以`javascript:`网址也可以保存在里面，用户选择这个书签的时候，就会在当前页面执行这个脚本。为了防止书签替换掉当前文档，可以在脚本最后返回`void 0`。

#### 2.script标签

##### 2.1 工作原理

浏览器加载JavaScript脚本，主要通过`<script>`标签完成。正常的网页加载流程是这样的。

- --
- a.浏览器一边下载HTML网页，一边开始解析
- b.解析过程中，发现`<script>`标签
- c.暂停解析，网页渲染的控制权转交给JavaScript引擎
- d.如果`<script>`标签引用了外部脚本，就下载该脚本，否则就直接执行
- e.执行完毕，控制权交还渲染引擎，恢复往下解析HTML网页
- --

加载外部脚本时，浏览器会暂停页面渲染，等待脚本下载并执行完成后，再继续渲染。原因是JavaScript可以修改DOM（比如使用`document.write`方法），所以必须把控制权让给它，否则会导致复杂的线程竞赛的问题。

如果外部脚本加载时间很长（比如一直无法完成下载），就会造成网页长时间失去响应，浏览器就会呈现“假死”状态，这被称为“阻塞效应”。

为了避免这种情况，较好的做法是将`<script>`标签都放在页面底部，而不是头部。这样即使遇到脚本失去响应，网页主体的渲染也已经完成了，用户至少可以看到内容，而不是面对一张空白的页面。

如果某些脚本代码非常重要，一定要放在页面头部的话，最好直接将代码嵌入页面，而不是连接外部脚本文件，这样能缩短加载时间。

将脚本文件都放在网页尾部加载，还有一个好处。在DOM结构生成之前就调用DOM，JavaScript会报错，如果脚本都在网页尾部加载，就不存在这个问题，因为这时DOM肯定已经生成了。

```
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

```
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

```
<script src="jquery.min.js" onload="console.log(document.body.innerHTML)">
</script>
```

但是，如果将脚本放在页面底部，就可以完全按照正常的方式写，上面两种方式都不需要。

```
<body>
  <!-- 其他代码  -->
  <script>
    console.log(document.body.innerHTML);
  </script>
</body>
```

如果有多个`script`标签，比如下面这样。

```
<script src="a.js"></script>
<script src="b.js"></script>
```

浏览器会同时并行下载a.js和b.js，但是，执行时会保证先执行a.js，然后再执行b.js，即使后者先下载完成，也是如此。也就是说，脚本的执行顺序由它们在页面中的出现顺序决定，这是为了保证脚本之间的依赖关系不受到破坏。当然，加载这两个脚本都会产生“阻塞效应”，必须等到它们都加载完成，浏览器才会继续页面渲染。

> Gecko和Webkit引擎在网页被阻塞后，会生成第二个线程解析文档，下载外部资源，但是不会修改DOM，网页还是处于阻塞状态。

解析和执行CSS，也会产生阻塞。Firefox会等到脚本前面的所有样式表，都下载并解析完，再执行脚本；Webkit则是一旦发现脚本引用了样式，就会暂停执行脚本，等到样式表下载并解析完，再恢复执行。

此外，对于来自同一个域名的资源，比如脚本文件、样式表文件、图片文件等，浏览器一般最多同时下载六个（IE11允许同时下载13个）。如果是来自不同域名的资源，就没有这个限制。所以，通常把静态文件放在不同的域名之下，以加快下载速度。

##### 2.2 defer属性

为了解决脚本文件下载阻塞网页渲染的问题，一个方法是加入`defer`属性。

```
<script src="a.js" defer></script>
<script src="b.js" defer></script>
```

上面代码中，只有等到DOM加载完成后，才会执行a.js和b.js。

`defer`的运行流程如下。

- --
- a.浏览器开始解析HTML网页
- b.解析过程中，发现带有`defer`属性的`script`标签
- c.浏览器继续往下解析HTML网页，同时并行下载`script`标签中的外部脚本
- d.浏览器完成解析HTML网页，此时再执行下载的脚本
- --

有了`defer`属性，浏览器下载脚本文件的时候，不会阻塞页面渲染。下载的脚本文件在`DOMContentLoaded`事件触发前执行（即刚刚读取完`</html>`标签），而且可以保证执行顺序就是它们在页面上出现的顺序。

对于内置而不是加载外部脚本的`script`标签，以及动态生成的`script`标签，`defer`属性不起作用。另外，使用`defer`加载的外部脚本不应该使用`document.write`方法。

##### 2.3 async属性

解决“阻塞效应”的另一个方法是加入`async`属性。

```
<script src="a.js" async></script>
<script src="b.js" async></script>
```

`async`属性的作用是，使用另一个进程下载脚本，下载时不会阻塞渲染。

- --
- a.浏览器开始解析HTML网页
- b.解析过程中，发现带有`async`属性的`script`标签
- c.浏览器继续往下解析HTML网页，同时并行下载`script`标签中的外部脚本
- d.脚本下载完成，浏览器暂停解析HTML网页，开始执行下载的脚本
- e.脚本执行完毕，浏览器恢复解析HTML网页
- --

`async`属性可以保证脚本下载的同时，浏览器继续渲染。需要注意的是，一旦采用这个属性，就无法保证脚本的执行顺序。哪个脚本先下载结束，就先执行那个脚本。另外，使用`async`属性的脚本文件中，不应该使用`document.write`方法。

`defer`属性和`async`属性到底应该使用哪一个？

一般来说，如果脚本之间没有依赖关系，就使用`async`属性，如果脚本之间有依赖关系，就使用`defer`属性。如果同时使用`async`和`defer`属性，后者不起作用，浏览器行为由`async`属性决定。

##### 2.4 脚本的动态加载

除了静态的`script`标签，还可以动态生成`script`标签，然后加入页面，从而实现脚本的动态加载。

```
['a.js', 'b.js'].forEach(function(src) {
  var script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
});
```

这种方法的好处是，动态生成的`script`标签不会阻塞页面渲染，也就不会造成浏览器假死。但是问题在于，这种方法无法保证脚本的执行顺序，哪个脚本文件先下载完成，就先执行哪个。

如果想避免这个问题，可以设置`async`属性为false。

```
['a.js', 'b.js'].forEach(function(src) {
  var script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.head.appendChild(script);
});
```

上面的代码依然不会阻塞页面渲染，而且可以保证b.js在a.js后面执行。不过需要注意的是，在这段代码后面加载的脚本文件，会因此都等待b.js执行完成后再执行。

我们可以把上面的写法，封装成一个函数。

```
(function() {
  var scripts = document.getElementsByTagName('script')[0];
  function load(url) {
    var script = document.createElement('script');
    script.async = true;
    script.src = url;
    scripts.parentNode.insertBefore(script, scripts);
  }
  load('//apis.google.com/js/plusone.js');
  load('//platform.twitter.com/widgets.js');
  load('//s.thirdpartywidget.com/widget.js');
}());
```

上面代码中，`async`属性设为true，是因为加载的脚本没有互相依赖关系。而且，这样就不会造成堵塞。

如果想为动态加载的脚本指定回调函数，可以使用下面的写法。

```
function loadScript(src, done) {
  var js = document.createElement('script');
  js.src = src;
  js.onload = function() {
    done();
  };
  js.onerror = function() {
    done(new Error('Failed to load script ' + src));
  };
  document.head.appendChild(js);
}
```

此外，动态嵌入还有一个地方需要注意。动态嵌入必须等待CSS文件加载完成后，才会去下载外部脚本文件。静态加载就不存在这个问题，`script`标签指定的外部脚本文件，都是与CSS文件同时并发下载的。

##### 2.5 加载使用的协议

如果不指定协议，浏览器默认采用HTTP协议下载。

`<script src="example.js"></script>`

上面的example.js默认就是采用HTTP协议下载，如果要采用HTTPS协议下载，必需写明（假定服务器支持）。

`<script src="https://example.js"></script>`

但是有时我们会希望，根据页面本身的协议来决定加载协议，这时可以采用下面的写法。

`<script src="//example.js"></script>`

#### 3.浏览器的组成

浏览器的核心是两部分：渲染引擎和JavaScript解释器（又称JavaScript引擎）。

##### 3.1 渲染引擎

渲染引擎的主要作用是，将网页代码渲染为用户视觉可以感知的平面文档。

不同的浏览器有不同的渲染引擎。

- --
- Firefox：Gecko引擎
- Safari：WebKit引擎
- Chrome：Blink引擎(基于 WebKit 的 fork Web 渲染引擎)
- Opera：Presto引擎
- IE: Trident引擎
- Edge: EdgeHTML引擎
- --

渲染引擎处理网页，通常分成四个阶段。

- --
- a.解析代码：HTML代码解析为DOM，CSS代码解析为CSSOM（CSS Object Model）
- b.对象合成：将DOM和CSSOM合成一棵渲染树（render tree）
- c.布局：计算出渲染树的布局（layout）
- d.绘制：将渲染树绘制到屏幕
- --

以上四步并非严格按顺序执行，往往第一步还没完成，第二步和第三步就已经开始了。所以，会看到这种情况：网页的HTML代码还没下载完，但浏览器已经显示出内容了。

##### 3.2 重流和重绘

渲染树转换为网页布局，称为**布局流（flow）**；布局显示到页面的这个过程，称为**绘制（paint）**。它们都具有阻塞效应，并且会耗费很多时间和计算资源。

页面生成以后，脚本操作和样式表操作，都会触发重流**（reflow）**和**重绘（repaint）**。用户的互动，也会触发，比如设置了鼠标悬停（`a:hover`）效果、页面滚动、在输入框中输入文本、改变窗口大小等等。

重流和重绘并不一定一起发生，重流必然导致重绘，重绘不一定需要重流。比如改变元素颜色，只会导致重绘，而不会导致重流；改变元素的布局，则会导致重绘和重流。

大多数情况下，浏览器会智能判断，将重流和重绘只限制到相关的子树上面，最小化所耗费的代价，而不会全局重新生成网页。

作为开发者，应该尽量设法降低重绘的次数和成本。比如，尽量不要变动高层的DOM元素，而以底层DOM元素的变动代替；再比如，重绘`table`布局和`flex`布局，开销都会比较大。

```
var foo = document.getElementById('foobar');

foo.style.color = 'blue';
foo.style.marginTop = '30px';
```

上面的代码只会导致一次重绘，因为浏览器会累积DOM变动，然后一次性执行。

下面是一些优化技巧。

- --
- a.读取DOM或者写入DOM，尽量写在一起，不要混杂
- b.缓存DOM信息
- c.不要一项一项地改变样式，而是使用`CSS class`一次性改变样式
- d.使用`document fragment`操作DOM
- e.动画时使用`absolute`定位或`fixed`定位，这样可以减少对其他元素的影响
- f.只在必要时才显示元素
- g.使用`window.requestAnimationFrame()`，因为它可以把代码推迟到下一次重流时执行，而不是立即要求页面重流
- e.使用虚拟DOM（virtual DOM）库
- --

下面是一个`window.requestAnimationFrame()`对比效果的例子。

```
// 重绘代价高
function doubleHeight(element) {
  var currentHeight = element.clientHeight;
  element.style.height = (currentHeight * 2) + 'px';
}

all_my_elements.forEach(doubleHeight);

// 重绘代价低
function doubleHeight(element) {
  var currentHeight = element.clientHeight;

  window.requestAnimationFrame(function () {
    element.style.height = (currentHeight * 2) + 'px';
  });
}

all_my_elements.forEach(doubleHeight);
```

##### 3.3 JavaScript引擎

JavaScript引擎的主要作用是，读取网页中的JavaScript代码，对其处理后运行。

JavaScript是一种解释型语言，也就是说，它不需要编译，由解释器实时运行。这样的好处是运行和修改都比较方便，刷新页面就可以重新解释；缺点是每次运行都要调用解释器，系统开销较大，运行速度慢于编译型语言。

为了提高运行速度，目前的浏览器都将JavaScript进行一定程度的编译，生成类似字节码（bytecode）的中间代码，以提高运行速度。

早期，浏览器内部对JavaScript的处理过程如下：

- --
- a.读取代码，进行词法分析（Lexical analysis），将代码分解成词元（token）。
- b.对词元进行语法分析（parsing），将代码整理成“语法树”（syntax tree）。
- c.使用“翻译器”（translator），将代码转为字节码（bytecode）。
- d.使用“字节码解释器”（bytecode interpreter），将字节码转为机器码。
- --

逐行解释将字节码转为机器码，是很低效的。为了提高运行速度，现代浏览器改为采用“**即时编译**”（Just In Time compiler，缩写JIT），即字节码只在运行时编译，用到哪一行就编译哪一行，并且把编译结果缓存（inline cache）。通常，一个程序被经常用到的，只是其中一小部分代码，有了缓存的编译结果，整个程序的运行速度就会显著提升。不同的浏览器有不同的编译策略。有的浏览器只编译最经常用到的部分，比如循环的部分；有的浏览器索性省略了字节码的翻译步骤，直接编译成机器码，比如chrome浏览器的V8引擎。

字节码不能直接运行，而是运行在一个虚拟机（Virtual Machine）之上，一般也把虚拟机称为JavaScript引擎。因为JavaScript运行时未必有字节码，所以JavaScript虚拟机并不完全基于字节码，而是部分基于源码，即只要有可能，就通过JIT（just in time）编译器直接把源码编译成机器码运行，省略字节码步骤。这一点与其他采用虚拟机（比如Java）的语言不尽相同。这样做的目的，是为了尽可能地优化代码、提高性能。下面是目前最常见的一些JavaScript虚拟机：

- --
- Chakra(Microsoft Internet Explorer)
- Nitro/JavaScript Core (Safari)
- Carakan (Opera)
- SpiderMonkey (Firefox)
- V8 (Chrome, Chromium)
- --

### 2.window对象

#### 1.概述

在浏览器中，`window`对象指当前的浏览器窗口。它也是所有对象的顶层对象。

“顶层对象”指的是最高一层的对象，所有其他对象都是它的下属。JavaScript规定，浏览器环境的所有全局变量，都是`window`对象的属性。

```
var a = 1;
window.a // 1
```

上面代码中，变量a是一个全局变量，但是实质上它是`window`对象的属性。声明一个全局变量，就是为`window`对象的同名属性赋值。

从语言设计的角度看，所有变量都是`window`对象的属性，其实不是很合理。因为`window`对象有自己的实体含义，不适合当作最高一层的顶层对象。这个设计失误与JavaScript语言匆忙的设计过程有关，最早的设想是语言内置的对象越少越好，这样可以提高浏览器的性能。因此，语言设计者Brendan Eich就把`window`对象当作顶层对象，所有未声明就赋值的变量都自动变成window对象的属性。这种设计使得编译阶段无法检测出未声明变量，但到了今天已经没有办法纠正了。

#### 2.window对象的属性

##### 2.1 window.window，window.name

`window`对象的`window`属性指向自身。

`window.window === this // true`

`window.name`属性用于设置当前浏览器窗口的名字。

```
window.name = 'Hello World!';
console.log(window.name)
// "Hello World!"
```

各个浏览器对这个值的储存容量有所不同，但是一般来说，可以高达几MB。

该属性只能保存字符串，且当浏览器窗口关闭后，所保存的值就会消失。因此局限性比较大，但是与`<iframe>`窗口通信时，非常有用。

##### 2.2 window.location

`window.location`返回一个`location`对象，用于获取窗口当前的URL信息。它等同于`document.location`对象。

`window.location === document.location // true`

##### 2.3 window.closed，window.opener

`window.closed`属性返回一个布尔值，表示窗口是否关闭。

`window.closed // false`

上面代码检查当前窗口是否关闭。这种检查意义不大，因为只要能运行代码，当前窗口肯定没有关闭。这个属性一般用来检查，使用脚本打开的新窗口是否关闭。

```
var popup = window.open();

if ((popup !== null) && !popup.closed) {
  // 窗口仍然打开着
}
```

`window.opener`属性返回打开当前窗口的父窗口。如果当前窗口没有父窗口，则返回`null`。

`window.open().opener === window // true`

上面表达式会打开一个新窗口，然后返回true。

通过`opener`属性，可以获得父窗口的的全局变量和方法，比如`window.opener.propertyName`和`window.opener.functionName()`。但这只限于两个窗口属于同源的情况，且其中一个窗口由另一个打开。

##### 2.4 window.frames，window.length

`window.frames`属性返回一个类似数组的对象，成员为页面内所有框架窗口，包括`frame`元素和`iframe`元素。`window.frames[0]`表示页面中第一个框架窗口。

如果`iframe`元素设置了`id`或`name`属性，那么就可以用属性值，引用这个`iframe`窗口。比如`<iframe name="myIFrame">`就可以用`frames['myIFrame']`或者`frames.myIFrame`来引用。

`frames`属性实际上是`window`对象的别名。

`frames === window // true`

因此，`frames[0]`也可以用`window[0]`表示。但是，从语义上看，`frames`更清晰，而且考虑到`window`还是全局对象，因此推荐表示多窗口时，总是使用`frames[0]`的写法。

`window.length`属性返回当前网页包含的框架总数。如果当前网页不包含`frame`和`iframe`元素，那么`window.length`就返回0。

`window.frames.length === window.length // true`

`window.frames.length`与`window.length`应该是相等的。

##### 2.5 window.screenX，window.screenY

`window.screenX`和`window.screenY`属性，返回浏览器窗口左上角相对于当前屏幕左上角（(0, 0)）的水平距离和垂直距离，单位为像素。

##### 2.6 window.innerHeight，window.innerWidth

`window.innerHeight`和`window.innerWidth`属性，返回网页在当前窗口中可见部分的高度和宽度，即“视口”（viewport），单位为像素。

当用户放大网页的时候（比如将网页从100%的大小放大为200%），这两个属性会变小。因为这时网页的像素大小不变（比如宽度还是960像素），只是每个像素占据的屏幕空间变大了，因为可见部分（视口）就变小了。

注意，这两个属性值包括滚动条的高度和宽度。

##### 2.7 window.outerHeight，window.outerWidth

`window.outerHeight`和`window.outerWidth`属性返回浏览器窗口的高度和宽度，包括浏览器菜单和边框，单位为像素。

##### 2.8 window.pageXOffset，window.pageYOffset

`window.pageXOffset`属性返回页面的水平滚动距离，`window.pageYOffset`属性返回页面的垂直滚动距离，单位都为像素。

举例来说，如果用户向下拉动了垂直滚动条75像素，那么`window.pageYOffset`就是75。用户水平向右拉动水平滚动条200像素，`window.pageXOffset`就是200。

#### 3.navigator对象

`window`对象的`navigator`属性，指向一个包含浏览器信息的对象。

##### 3.1 navigator.userAgent

`navigator.userAgent`属性返回浏览器的`User-Agent`字符串，标示浏览器的厂商和版本信息。

下面是Chrome浏览器的`userAgent`。

```
navigator.userAgent
// "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36"
```

通过`userAgent`属性识别浏览器，不是一个好办法。因为必须考虑所有的情况（不同的浏览器，不同的版本），非常麻烦，而且无法保证未来的适用性，更何况各种上网设备层出不穷，难以穷尽。所以，现在一般不再识别浏览器了，而是使用“功能识别”方法，即逐一测试当前浏览器是否支持要用到的JavaScript功能。

不过，通过`userAgent`可以大致准确地识别手机浏览器，方法就是测试是否包含mobi字符串。

```
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

`navigator.plugins`属性返回一个类似数组的对象，成员是浏览器安装的插件，比如Flash、ActiveX等。

##### 3.3 navigator.platform

`navigator.platform`属性返回用户的操作系统信息。

```
navigator.platform
// "Linux x86_64"
```

##### 3.4 navigator.onLine

`navigator.onLine`属性返回一个布尔值，表示用户当前在线还是离线。

`navigator.onLine // true`

##### 3.5 navigator.geolocation

`navigator.geolocation`返回一个Geolocation对象，包含用户地理位置的信息。

##### 3.6 navigator.javaEnabled()，navigator.cookieEnabled

javaEnabled方法返回一个布尔值，表示浏览器是否能运行Java Applet小程序。

`navigator.javaEnabled() // false`

`cookieEnabled`属性返回一个布尔值，表示浏览器是否能储存`Cookie`。

`navigator.cookieEnabled // true`

注意，这个返回值与是否储存某个网站的`Cookie`无关。用户可以设置某个网站不得储存`Cookie`，这时`cookieEnabled`返回的还是true。

#### 4.window.screen对象

`window.screen`对象包含了显示设备的信息。

`screen.height`和`screen.width`两个属性，一般用来了解设备的分辨率。

```
// 显示设备的高度，单位为像素
screen.height // 1920

// 显示设备的宽度，单位为像素
screen.width // 1080
```

上面代码显示，某设备的分辨率是1920x1080。

除非调整显示器的分辨率，否则这两个值可以看作常量，不会发生变化。显示器的分辨率与浏览器设置无关，缩放网页并不会改变分辨率。

下面是根据屏幕分辨率，将用户导向不同网页的代码。

```
if ((screen.width <= 800) && (screen.height <= 600)) {
  window.location.replace('small.html');
} else {
  window.location.replace('wide.html');
}
```

`screen.availHeight`和`screen.availWidth`属性返回屏幕可用的高度和宽度，单位为像素。它们的值为屏幕的实际大小减去操作系统某些功能占据的空间，比如系统的任务栏。

`screen.colorDepth`属性返回屏幕的颜色深度，一般为16（表示16-bit）或24（表示24-bit）。

#### 5.window对象的方法

##### 5.1 window.moveTo()，window.moveBy()

`window.moveTo`方法用于移动浏览器窗口到指定位置。它接受两个参数，分别是窗口左上角距离屏幕左上角的水平距离和垂直距离，单位为像素。

`window.moveTo(100, 200)`

上面代码将窗口移动到屏幕(100, 200)的位置。

`window.moveBy`方法将窗口移动到一个相对位置。它接受两个参数，分布是窗口左上角向右移动的水平距离和向下移动的垂直距离，单位为像素。

`window.moveBy(25, 50)`

上面代码将窗口向右移动25像素、向下移动50像素。

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

- --
- 第一个参数：字符串，表示新窗口的网址。如果省略，默认网址就是`about:blank`。
- --
- 第二个参数：字符串，表示新窗口的名字。如果该名字的窗口已经存在，则跳到该窗口，不再新建窗口。如果省略，就默认使用`_blank`，表示新建一个没有名字的窗口。
- --
- 第三个参数：字符串，内容为逗号分隔的键值对，表示新窗口的参数，比如有没有提示栏、工具条等等。如果省略，则默认打开一个完整UI的新窗口。
- --
- 第四个参数：布尔值，表示第一个参数指定的网址，是否应该替换`history`对象之中的当前网址记录，默认值为false。显然，这个参数只有在第二个参数指向已经存在的窗口时，才有意义。
- --

下面是一个例子。

```
var popup = window.open(
  'somepage.html',
  'DefinitionsWindows',
  'height=200,width=200,location=no,status=yes,resizable=yes,scrollbars=yes'
);
```

上面代码表示，打开的新窗口高度和宽度都为200像素，没有地址栏和滚动条，但有状态栏，允许用户调整大小。

注意，如果在第三个参数中设置了一部分参数，其他没有被设置的yes/no参数都会被设成no，只有`titlebar`和关闭按钮除外（它们的值默认为yes）。

另外，`open`方法的第二个参数虽然可以指定已经存在的窗口，但是不等于可以任意控制其他窗口。为了防止被不相干的窗口控制，浏览器只有在两个窗口同源，或者目标窗口被当前网页打开的情况下，才允许`open`方法指向该窗口。

`open`方法返回新窗口的引用。

```
var windowB = window.open('windowB.html', 'WindowB');
windowB.window.name // "WindowB"
```

下面是另一个例子。

```
var w = window.open();
w.alert('已经打开新窗口');
w.location = 'http://example.com';
```

上面代码先打开一个新窗口，然后在该窗口弹出一个对话框，再将网址导向example.com。

由于`open`这个方法很容易被滥用，许多浏览器默认都不允许脚本自动新建窗口。只允许在用户点击链接或按钮，脚本做出反应，弹出新窗口。因此，有必要检查一下打开新窗口是否成功。

```
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

```
document.getElementById('printLink').onclick = function() {
  window.print();
}
```

非桌面设备（比如手机）可能没有打印功能，这时可以这样判断。

```
if (typeof window.print === 'function') {
  // 支持打印功能
}
```

##### 5.5 window.getComputedStyle()

`getComputedStyle`方法接受一个HTML元素作为参数，返回一个包含该HTML元素的最终样式信息的对象。

##### 5.6 window.matchMedia()

`window.matchMedia`方法用来检查CSS的`mediaQuery`语句。

##### 5.7 window.focus()

`focus`方法会激活指定当前窗口，使其获得焦点。

```
var popup = window.open('popup.html', 'Popup Window');

if ((popup !== null) && !popup.closed) {
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

- --
- top：顶层窗口，即最上层的那个窗口
- parent：父窗口
- self：当前窗口，即自身
- --

下面代码可以判断，当前窗口是否为顶层窗口。

```
top === self

// 更好的写法
window.top === window.self
```

下面的代码让父窗口的访问历史后退一次。

`parent.history.back();`

与这些变量对应，浏览器还提供一些特殊的窗口名，供`open`方法、`<a>`标签、`<form>`标签等引用。

- --
_top：顶层窗口
_parent：父窗口
_blank：新窗口
- --

下面代码就表示在顶层窗口打开链接。

`<a href="somepage.html" target="_top">Link</a>`

##### 6.2 iframe标签

对于`iframe`嵌入的窗口，`document.getElementById`方法可以拿到该窗口的DOM节点，然后使用`contentWindow`属性获得`iframe`节点包含的`window`对象，或者使用`contentDocument`属性获得包含的`document`对象。

```
var frame = document.getElementById('theFrame');
var frameWindow = frame.contentWindow;

// 等同于 frame.contentWindow.document
var frameDoc = frame.contentDocument;

// 获取子窗口的变量和属性
frameWindow.function()

// 获取子窗口的标题
frameWindow.title
```

`iframe`元素遵守同源政策，只有当父页面与框架页面来自同一个域名，两者之间才可以用脚本通信，否则只有使用`window.postMessage`方法。

`iframe`窗口内部，使用`window.parent`引用父窗口。如果当前页面没有父窗口，则`window.parent`属性返回自身。因此，可以通过`window.parent`是否等于`window.self`，判断当前窗口是否为`iframe`窗口。

```
if (window.parent !== window.self) {
  // 当前窗口是子窗口
}
```

`iframe`嵌入窗口的`window`对象，有一个`frameElement`属性，返回它在父窗口中的DOM节点。对于那么非嵌入的窗口，该属性等于`null`。

```
var f1Element = document.getElementById('f1');
var fiWindow = f1Element.contentWindow;
f1Window.frameElement === f1Element // true
window.frameElement === null // true
```

##### 6.3 frames属性

`window`对象的`frames`属性返回一个类似数组的对象，成员是所有子窗口的`window`对象。可以使用这个属性，实现窗口之间的互相引用。比如，`frames[0]`返回第一个子窗口，`frames[1].frames[2]`返回第二个子窗口内部的第三个子窗口，`parent.frames[1]`返回父窗口的第二个子窗口。

需要注意的是，`window.frames`每个成员的值，是框架内的窗口（即框架的`window`对象），而不是`iframe`标签在父窗口的DOM节点。如果要获取每个框架内部的DOM树，需要使用`window.frames[0].document`的写法。

另外，如果`iframe`元素设置了`name`或`id`属性，那么属性值会自动成为全局变量，并且可以通过`window.frames`属性引用，返回子窗口的`window`对象。

```
// HTML代码为<iframe id="myFrame">
myFrame // [HTMLIFrameElement]
frames.myframe === myFrame // true
```

另外，`name`属性的值会自动成为子窗口的名称，可以用在`window.open`方法的第二个参数，或者`<a>`和`<frame>`标签的`target`属性。

#### 7.事件

`window`对象可以接收以下事件。

##### 7.1 load事件和onload属性

`load`事件发生在文档在浏览器窗口加载完毕时。`window.onload`属性可以指定这个事件的回调函数。

```
window.onload = function() {
  var elements = document.getElementsByClassName('example');
  for (var i = 0; i < elements.length; i++) {
    var elt = elements[i];
    // ...
  }
};
```

上面代码在网页加载完毕后，获取指定元素并进行处理。

##### 7.2 error 事件和 onerror 属性

浏览器脚本发生错误时，会触发`window`对象的`error`事件。我们可以通过`window.onerror`属性对该事件指定回调函数。

```
window.onerror = function (message, filename, lineno, colno, error) {
  console.log("出错了！--> %s", error.stack);
};
```

由于历史原因，`window`的`error`事件的回调函数不接受错误对象作为参数，而是一共可以接受五个参数，它们的含义依次如下。

- --
- a.出错信息
- b.出错脚本的网址
- c.行号
- d.列号
- e.错误对象
- --

> 老式浏览器只支持前三个参数。

并不是所有的错误，都会触发 JavaScript 的`error`事件（即让 JavaScript 报错）。一般来说，只有 JavaScript 脚本的错误，才会触发这个事件，而像资源文件不存在之类的错误，都不会触发。

下面是一个例子，如果整个页面未捕获错误超过3个，就显示警告。

```
window.onerror = function(msg, url, line) {
  if (onerror.num++ > onerror.max) {
    alert('ERROR: ' + msg + '\n' + url + ':' + line);
    return true;
  }
}
onerror.max = 3;
onerror.num = 0;
```

需要注意的是，如果脚本网址与网页网址不在同一个域（比如使用了CDN），浏览器根本不会提供详细的出错信息，只会提示出错，错误类型是“`Script error.`”，行号为0，其他信息都没有。这是浏览器防止向外部脚本泄漏信息。一个解决方法是在脚本所在的服务器，设置`Access-Control-Allow-Origin`的HTTP头信息。

`Access-Control-Allow-Origin: *`

然后，在网页的`<script>`标签中设置`crossorigin`属性。

`<script crossorigin="anonymous" src="//example.com/file.js"></script>`

上面代码的`crossorigin="anonymous"`表示，读取文件不需要身份信息，即不需要`cookie`和HTTP认证信息。如果设为`crossorigin="use-credentials"`，就表示浏览器会上传`cookie`和`HTTP`认证信息，同时还需要服务器端打开HTTP头信息`Access-Control-Allow-Credentials`。

#### 8.URL的编码/解码方法

网页URL的合法字符分成两类。

- --
- URL元字符：分号（`;`），逗号（`,`），斜杠（`/`），问号（`?`），冒号（`:`），at（`@`），`&`，等号（`=`），加号（`+`），美元符号（`$`），井号（`#`）
- 语义字符：a-z，A-Z，0-9，连词号（`-`），下划线（`_`），点（`.`），感叹号（`!`），波浪线（`~`），星号（`*`），单引号（`\`），圆括号（`()`）
- --

除了以上字符，其他字符出现在URL之中都必须转义，规则是根据操作系统的默认编码，将每个字节转为百分号（`%`）加上两个大写的十六进制字母。比如，`UTF-8`的操作系统上，`http://www.example.com/q=春节`这个URL之中，汉字“春节”不是URL的合法字符，所以被浏览器自动转成`http://www.example.com/q=%E6%98%A5%E8%8A%82`。其中，“春”转成了`%E6%98%A5`，“节”转成了“`%E8%8A%82`”。这是因为“春”和”节“的UTF-8编码分别是`E6 98 A5`和`E8 8A 82`，将每个字节前面加上百分号，就构成了**URL编码**。

JavaScript提供四个URL的编码/解码方法。

- --
- `encodeURI()`
- `encodeURIComponent()`
- `decodeURI()`
- `decodeURIComponent()`
- --

##### 8.1 encodeURI

`encodeURI` 方法的参数是一个字符串，代表整个URL。它会将元字符和语义字符之外的字符，都进行转义。

```
encodeURI('http://www.example.com/q=春节')
// "http://www.example.com/q=%E6%98%A5%E8%8A%82"
```

##### 8.2 encodeURIComponent

`encodeURIComponent`只转除了语义字符之外的字符，元字符也会被转义。因此，它的参数通常是URL的路径或参数值，而不是整个URL。

```
encodeURIComponent('春节')
// "%E6%98%A5%E8%8A%82"
encodeURIComponent('http://www.example.com/q=春节')
// "http%3A%2F%2Fwww.example.com%2Fq%3D%E6%98%A5%E8%8A%82"
```

上面代码中，`encodeURIComponent`会连URL元字符一起转义，所以通常只用它转URL的片段。

##### 8.3 decodeURI

`decodeURI`用于还原转义后的URL。它是`encodeURI`方法的逆运算。

```
decodeURI('http://www.example.com/q=%E6%98%A5%E8%8A%82')
// "http://www.example.com/q=春节"
```

##### 8.4 decodeURIComponent

`decodeURIComponent`用于还原转义后的URL片段。它是`encodeURIComponent`方法的逆运算。

`decodeURIComponent('%E6%98%A5%E8%8A%82')// "春节"`

#### 9.alert()，prompt()，confirm()

`alert()`、`prompt()`、`confirm()`都是浏览器与用户互动的全局方法。它们会弹出不同的对话框，要求用户做出回应。

需要注意的是，`alert()`、`prompt()`、`confirm()`这三个方法弹出的对话框，都是浏览器统一规定的式样，是无法定制的。

1).`alert`

`alert`方法弹出的对话框，只有一个“确定”按钮，往往用来通知用户某些信息。

```
// 格式
alert(message);

// 实例
alert('Hello World');
```

用户只有点击“确定”按钮，对话框才会消失。在对话框弹出期间，浏览器窗口处于冻结状态，如果不点“确定”按钮，用户什么也干不了。

`alert`方法的参数只能是字符串，没法使用CSS样式，但是可以用`\n`指定换行。

2).`prompt`

`prompt`方法弹出的对话框，在提示文字的下方，还有一个输入框，要求用户输入信息，并有“确定”和“取消”两个按钮。它往往用来获取用户输入的数据。

```
// 格式
var result = prompt(text[, default]);

// 实例
var result = prompt('您的年龄？', 25)
```

上面代码会跳出一个对话框，文字提示为“您的年龄？”，要求用户在对话框中输入自己的年龄（默认显示25）。

`prompt`方法的返回值是一个字符串（有可能为空）或者`null`，具体分成三种情况。

- --
- 用户输入信息，并点击“确定”，则用户输入的信息就是返回值。
- 用户没有输入信息，直接点击“确定”，则输入框的默认值就是返回值。
- 用户点击了“取消”（或者按了Esc按钮），则返回值是`null`。
- --

`prompt`方法的第二个参数是可选的，但是如果不提供的话，IE浏览器会在输入框中显示`undefined`。因此，最好总是提供第二个参数，作为输入框的默认值。

3).`confirm`

`confirm`方法弹出的对话框，除了提示信息之外，只有“确定”和“取消”两个按钮，往往用来征询用户的意见。

```
// 格式
var result = confirm(message);

// 实例
var result = confirm("你最近好吗？");
```

上面代码弹出一个对话框，上面只有一行文字“你最近好吗？”，用户选择点击“确定”或“取消”。

`confirm`方法返回一个布尔值，如果用户点击“确定”，则返回true；如果用户点击“取消”，则返回false。

```
var okay = confirm('Please confirm this message.');
if (okay) {
  // 用户按下“确定”
} else {
  // 用户按下“取消”
}
```

`confirm`的一个用途是，当用户离开当前页面时，弹出一个对话框，问用户是否真的要离开。

```
window.onunload = function() {
  return confirm('你确定要离开当面页面吗？');
}
```

这三个方法都具有堵塞效应，一旦弹出对话框，整个页面就是暂停执行，等待用户做出反应。

### 3.history对象

#### 1.概述

浏览器窗口有一个`history`对象，用来保存浏览历史。

如果当前窗口先后访问了三个网址，那么`history`对象就包括三项，`history.length`属性等于3。

`history`对象提供了一系列方法，允许在浏览历史之间移动。

- --
- `back()`：移动到上一个访问页面，等同于浏览器的后退键。
- `forward()`：移动到下一个访问页面，等同于浏览器的前进键。
- `go()`：接受一个整数作为参数，移动到该整数指定的页面，比如`go(1)`相当于`forward()`，`go(-1)`相当于`back()`。
- --

```
history.back();
history.forward();
history.go(-2);
```

如果移动的位置超出了访问历史的边界，以上三个方法并不报错，而是默默的失败。

`history.go(0)`相当于刷新当前页面。

常见的“返回上一页”链接，代码如下。

```
document.getElementById('backLink').onclick = function () {
  window.history.back();
}
```

> 注意，返回上一页时，页面通常是从浏览器缓存之中加载，而不是重新要求服务器发送新的网页。

#### 2.history.pushState()

HTML5为`history`对象添加了两个新方法，`history.pushState()`和`history.replaceState()`，用来在浏览历史中添加和修改记录。

```
if (!!(window.history && history.pushState)){
  // 支持History API
} else {
  // 不支持
}
```

上面代码可以用来检查，当前浏览器是否支持History API。如果不支持的话，可以考虑使用Polyfill库History.js。

`history.pushState`方法接受三个参数，依次为：

- --
- `state`：一个与指定网址相关的状态对象，`popstate`事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填`null`。
- `title`：新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填`null`。
- `url`：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。
- --

假定当前网址是example.com/1.html，我们使用`pushState`方法在浏览记录（`history`对象）中添加一个新记录。

```
var stateObj = { foo: 'bar' };
history.pushState(stateObj, 'page 2', '2.html');
```

添加上面这个新记录后，浏览器地址栏立刻显示example.com/2.html，但并不会跳转到2.html，甚至也不会检查2.html是否存在，它只是成为浏览历史中的最新记录。这时，你在地址栏输入一个新的地址(比如访问google.com)，然后点击了倒退按钮，页面的 URL 将显示2.html；你再点击一次倒退按钮，URL 将显示1.html。

总之，`pushState`方法不会触发页面刷新，只是导致`history`对象发生变化，地址栏会有反应。

如果`pushState`的url参数，设置了一个新的锚点值（即`hash`），并不会触发`hashchange`事件。如果设置了一个跨域网址，则会报错。

```
// 报错
history.pushState(null, null, 'https://twitter.com/hello');
```

上面代码中，`pushState`想要插入一个跨域的网址，导致报错。这样设计的目的是，防止恶意代码让用户以为他们是在另一个网站上。

#### 3.history.replaceState()

`history.replaceState`方法的参数与`pushState`方法一模一样，区别是它修改浏览历史中当前纪录。

假定当前网页是example.com/example.html。

```
history.pushState({page: 1}, 'title 1', '?page=1');
history.pushState({page: 2}, 'title 2', '?page=2');
history.replaceState({page: 3}, 'title 3', '?page=3');

history.back()
// url显示为http://example.com/example.html?page=1

history.back()
// url显示为http://example.com/example.html

history.go(2)
// url显示为http://example.com/example.html?page=3
```

#### 4.history.state属性

`history.state`属性返回当前页面的`state`对象。

```
history.pushState({page: 1}, 'title 1', '?page=1');

history.state
// { page: 1 }
```

#### 5.popstate 事件

每当同一个文档的浏览历史（即`history`对象）出现变化时，就会触发`popstate`事件。

需要注意的是，仅仅调用`pushState`方法或`replaceState`方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用`back`、`forward`、`go`方法时才会触发。另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。

使用的时候，可以为`popstate`事件指定回调函数。

```
window.onpopstate = function (event) {
  console.log('location: ' + document.location);
  console.log('state: ' + JSON.stringify(event.state));
};

// 或者

window.addEventListener('popstate', function(event) {
  console.log('location: ' + document.location);
  console.log('state: ' + JSON.stringify(event.state));
});
```

回调函数的参数是一个`event`事件对象，它的`state`属性指向`pushState`和`replaceState`方法为当前 URL 所提供的状态对象（即这两个方法的第一个参数）。上面代码中的`event.state`，就是通过`pushState`和`replaceState`方法，为当前URL绑定的`state`对象。

这个`state`对象也可以直接通过`history`对象读取。

`var currentState = history.state;`

注意，页面第一次加载的时候，浏览器不会触发`popstate`事件。

#### 6.URLSearchParams API

URLSearchParams API用于处理URL之中的查询字符串，即问号之后的部分。没有部署这个API的浏览器，可以用url-search-params这个垫片库。

```
var paramsString = 'q=URLUtils.searchParams&topic=api';
var searchParams = new URLSearchParams(paramsString);
```

`URLSearchParams`有以下方法，用来操作某个参数。

- --
- `has()`：返回一个布尔值，表示是否具有某个参数
- `get()`：返回指定参数的第一个值
- `getAll()`：返回一个数组，成员是指定参数的所有值
- `set()`：设置指定参数
- `delete()`：删除指定参数
- `append()`：在查询字符串之中，追加一个键值对
- `toString()`：返回整个查询字符串
- --

```
var paramsString = 'q=URLUtils.searchParams&topic=api';
var searchParams = new URLSearchParams(paramsString);

searchParams.has('topic') // true
searchParams.get('topic') // "api"
searchParams.getAll('topic') // ["api"]

searchParams.get('foo') // null，注意Firefox返回空字符串
searchParams.set('foo', 2);
searchParams.get('foo') // 2

searchParams.append('topic', 'webdev');
searchParams.toString() // "q=URLUtils.searchParams&topic=api&foo=2&topic=webdev"

searchParams.append('foo', 3);
searchParams.getAll('foo') // [2, 3]

searchParams.delete('topic');
searchParams.toString() // "q=URLUtils.searchParams&foo=2&foo=3"
```

`URLSearchParams`还有三个方法，用来遍历所有参数。

- --
- `keys()`：遍历所有参数名
- `values()`：遍历所有参数值
- `entries()`：遍历所有参数的键值对
- --

上面三个方法返回的都是`Iterator`对象。

```
var searchParams = new URLSearchParams('key1=value1&key2=value2');

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
  console.log(pair[0]+ ', '+ pair[1]);
}
// key1, value1
// key2, value2
```

在Chrome浏览器之中，`URLSearchParams`实例本身就是`Iterator`对象，与`entries`方法返回值相同。所以，可以写成下面的样子。

```
for (var p of searchParams) {
  console.log(p);
}
```

下面是一个替换当前URL的例子。

```
// URL: https://example.com?version=1.0
var params = new URLSearchParams(location.search.slice(1));
params.set('version', 2.0);

window.history.replaceState({}, '', `${location.pathname}?${params}`);
// URL: https://example.com?version=2.0
```

`URLSearchParams`实例可以当作POST数据发送，所有数据都会URL编码。

```
let params = new URLSearchParams();
params.append('api_key', '1234567890');

fetch('https://example.com/api', {
  method: 'POST',
  body: params
}).then(...)
```

DOM的a元素节点的`searchParams`属性，就是一个`URLSearchParams`实例。

```
var a = document.createElement('a');
a.href = 'https://example.com?filter=api';
a.searchParams.get('filter') // "api"
```

`URLSearchParams`还可以与URL接口结合使用。

```
var url = new URL(location);
var foo = url.searchParams.get('foo') || 'somedefault';
```
