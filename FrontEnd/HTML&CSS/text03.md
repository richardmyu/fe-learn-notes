#### 4.15.`position`

##### 4.15.1.`static`

`static` 是默认值。任意 `position:static;` 的元素不会被特殊的定位。一个 `static` 元素表示它不会被"`positioned`"，一个 `position` 属性被设置为其他值的元素表示它会被 "`positioned`"。

##### 4.15.2.`relative`

---

- 不脱离文档流
- 发生位置改变的时候，原来的位置还占用
- 层级大于文档流其他元素(会盖在其他元素之上)
- 参照物是本身
- 给绝对定位当参照物 ---**常用**
- `position: relative;` 相对定位，同时设置 `top` 和 `bottom` 的值，`top` 生效。同时设置 `right` 和 `left` 的值，`left` 生效

---

> 当盒子本身发生改变时，不影响其他元素，这时候我们用相对定位

##### 4.15.3.`absolute`

---

- 脱离文档流，但不在同一个平面上，因此不会相互识别，反而会相互覆盖；
- 所有元素默认都会去找参照物的起点位置（参照物的左上角）
- 不设置参照物时，参照物是 ICB（inital container block， 初始包含块）([`body` 这种说法不严谨](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position))
- 人为设置参照物
  - 只能是这个绝对定位元素的父级（或以上）元素
  - 参照物必须带有定位属性的元素(相对、绝对、固定)
- 绝对定位元素有宽高的时候，`top` 和 `bottom` 的值同时设置，`top` 生效。`left` 和 `right` 的值同时设置，`left` 生效
- 在不设置宽高时，宽度和高度是由本身内容决定的
- 绝对定位元素，如果不设置四个方向的值，并且同级之前有其他内容(元素)，它会默认排到这个内容(元素)之后（绝对定位的元素脱离文档流以后，只会影响后面的元素，而不会影响前面的元素，所以当没有设定绝对定位元素的定位值时，绝对定位元素会默认从前面元素之后的左上角开始排布；）
- 绝对定位元素设置宽高为100%，继承参照物的宽高

---

> 父级（或以上）元素都有定位属性，绝对定位的参照物是离它最近的那个父级元素

##### 4.15.4.`fixed`

---

- 脱离文档流
- 参照物是浏览器的可视窗口
- 在不设置宽高时，宽高是由内容决定
- 多用在页面中的辅助导航、回到顶部等位置
- 可以作为绝对定位的参照物；

---

#### 4.16.`float` 和 `position` 的区别

> 作者：贺师俊
> 链接：`https://www.zhihu.com/question/19588854/answer/13243044`
> 来源：知乎

在绝大多数 Web 开发者的语境中，"布局"这个术语和"排版"是有差异的。"布局"偏向于指宏观的 GUI 区域划分，比如双栏布局或三栏布局等。从这一点出发，`float` 其实本不是一项用于"布局"的属性。

`float` 对应的其实是传统印刷排版中图文混排中的环绕。这其实可以理解，因为 CSS 的模型和术语脱胎于传统排版，故而与计算机 GUI 技术通常基于组件的模型相差甚远。除了 `float` 之外，另一个例子是 CSS 中上下 `margin` 的 `collapse`，显然这是为了满足段落排版的需求。所以像 `float、margin collapse` 等，在典型的 GUI 技术中是没有的。还有，CSS box model 中，`width/height` 不算入 `padding` 和 `border`，许多开发者对这点很不适应，这实际上是 GUI 的控件思维与 CSS 排版思维的冲突。这个冲突在浏览器技术实现上的遗迹就是 IE 臭名昭著的 "`hasLayout`"。

元素 "`has layout`" 的真实意思是这样的元素直接对应一个控件。也正是由于 IE 很 naive 的在实现中直接结合了这两种矛盾的模型，从而导致了无数的布局 bug。

言归正传，CSS1 时代的网页还很简陋，但是随着万维网的迅猛发展，Web 界面也迅速进化，当初简单的如同书页般的通栏式网页迅速绝迹，`frameset` 由于天生存在的一堆问题也很快退出主流，这时 CSS 在 GUI 布局方面就显出了缺陷，开发者被迫使用各种 `trick`。比如历史悠久的 `table` 布局。后来 `table` 布局被鄙视，开发者逐渐转向了 `float` 布局。

要说 `float` 布局之所以流行，IE "功"不可没。在 IE 中，`has layout` 的元素是不会环绕 `float` 元素的（因为 `has layout` 的元素自己是一个控件，所以总是保持一个矩形区域）。这本来是一个 bug，但是其效果却正好符合常见的双栏布局的需要。另外 IE 下 `float` 元素会自动撑开其父级 `container` 元素（当然前提是 `container` 元素也是 `has layout` 的），这其实也是 bug，但是也恰好符合模块布局的需求。后来所谓`inline-block` 布局其实正是这些 bug 的合理化。

站在今天回望过去十多年的 CSS 实践，我们可以发现，无论 `float` 布局还是后来的 `inline-block` 布局，其实都是 `trick`。所谓 **`trick`**，就是将一些特性挪作他用，以很曲折的方式实现出想要的效果。

CSS 作为样式语言，其可维护性的最终来源，就是代码能清晰的表达出设计意图。而 CSS trick 当然不能很好的满足这一点。那么如何才能真正用 CSS 来表达布局？这有赖于 "CSS3 的进化"。如 `multiple column`、`flex box`、`grid layout` 等。其中直接对应目前 `float` 布局/`inline-block` 布局所要达到效果的，是 `flex box`。当然，考虑到兼容性问题（IE9 仍不支持 flex box 模块，IE10 才支持），我们可能很长时间内还是会继续使用 `float` 布局，不过必须始终牢记这是 `trick`，是 `workaround`。如有可能，最好引入 SCSS/LESS 之类的 CS S框架来对此种布局 `trick` 做进一步抽象和解耦。

再说 `position` 布局。`position` 其实比 `float` 要更接近"布局"属性。但是 `position` 的问题是，所谓布局是设定各区域（元素）的关联和约束，而定位只是设定单一元素的位置大小。要实现一个布局，要对多个定位元素中手动设定相关的参数（如左栏 `width:200px`，右栏 `left:200px`），相当于人为的把大小和位置参数计算出来。这违背了 DRY 原则，也无法真正实现关联约束。（如左栏设了 `max/min-width` 之后，最终实际 `width` 未必是 200px，此时右栏怎么设 `left` 值？又如一个水平固定 `width`、垂直自适应 `height` 的绝对定位元素，我们如何从它的底部继续排下一个元素？）除非我们引入 JavaScript 脚本来进行计算。因此运用 `position` 布局的限制条件相当多，通常只适合那些相对孤立的部件（如页头页脚）或较为简单且各区域大小位置固定的布局。至于说以 JavaScript 实现的布局管理器，是将 `position` 作为实现布局的底层技术，已经算不得 CSS 了（因为你也不写 CSS）。

### 5.css命名规范

- 不能是数字，不能以数字开头
- 可以写全拼:weibu
- 遵循行业规范 CSS 法则，比如：`header` 头部、`nav` 导航、`footer` 尾部
- 是由两个单词组成，例如：`car-icon、carIcon、car_icon`

### 6.hasLayout

hasLayout 是 IE 特有的一个属性。很多的 IE 下的 css bug 都与其息息相关。在 IE 中，一个元素要么自己对自身的内容进行计算大小和组织，要么依赖于父元素来计算尺寸和组织内容。

当 hasLayout 为 true 时(就是所谓的"拥有布局")，相当于元素产生新 BFC，元素自己对自身内容进行组织和尺寸计算;

当 hasLayout 为 false 时(就是所谓的"不拥有布局")，相当于元素不产生新 BFC，元素由其所属的 `containing block` 进行组织和尺寸计算。

和产生新 BFC 的特性一样，hasLayout 无法通过 CSS 属性直接设置，而是通过某些 CSS属性间接开启这一特性。不同的是某些 CSS 属性是以不可逆方式间接开启 hasLayout 为 true。并且默认产生新 BFC 的只有 `html` 元素，而默认 hasLayout 为 true 的元素就不只有 `html` 元素了。

另外我们可以通过 `object.currentStyle.hasLayout` 属性来判断元素是否开启了 hasLayout 特性。

IE 使用 Layout 概念来控制元素的尺寸和位置。如果一个元素有 Layout，它就有自身的尺寸和位置；如果没有，它的尺寸和位置由最近的拥有布局的祖先元素控制。

在默认情况下，拥有 Layout 的元素包括：

```html
<html>、<body>
<table>、<tr>、<th>、<td>
<img>
<hr>
<input>、<button>、<select>、<textarea>、<fieldset>、<legend>
<iframe>、<embed>、<object>、<applet>
<marquee>
```

> 注意，`<p>` 和 `<div>` 默认不拥有 Layout

下列元素默认 `hasLayout = true`

```html
<table> <td> <body> <img> <hr> <input> <select> <textarea> <button> <iframe> <embed> <object> <applet> <marquee>
```

hasLayout 属性不能直接设定，你只能通过设定一些特定的 css 属性来触发并改变 hasLayout 状态。下面列出可以触发 hasLayout 的一些 CSS 属性值:

```css
display
启动 haslayout 的值:inline-block
取消 hasLayout 的值:其他值
————————————–
width/height
启动 hasLayout 的值：除了 auto 以外的值
取消 hasLayou t的值：auto
—————————————
position
启动 hasLayout 的值：absolute
取消 hasLayout 的值：static
—————————————-
float
启动 hasLayout 的值：left 或 right
取消 hasLayout 的值：none
—————————————
zoom
启动 hasLayout 的值：有值
取消 hasLayout 的值：narmal 或者空值
（zoom 是微软 IE 专有属性，可以触发 hasLayout 但不会影响页面的显示效果。'zoom: 1;' 常用来除错，不过 ie 5 对这个属性不支持。）
—————————————-
writing-mode: tb-rl
这也是微软专有的属性。
ie7还有一些额外的属性可以触发该属性（不完全列表）：
min-height: (任何值)
max-height: (任何值除了 none)
min-width: (任何值)
max-width: (任何值除了 none)
overflow: (任何值除了 visible)
overflow-x: (任何值除了 visible)
overflow-y: (任何值除了 visible)
position: fixed;
```

因元素 hasLayout 而导致的问题其实一般都很容易发现：往往是内容出现错位甚至完全不可见。

通常 firefox 等标准的遵守浏览器可以加上 `overflow: hidden;` 来解决，而 IE 则不行，需要触发其 hasLayout 属性才可以。

hasLayout 对于内联元素也可以有效果，当内联元素的 hasLayout 为 true 的时候，可以给这个内联元素设定高度和宽度并得到期望的效果。

要注意的是，hasLayout 是微软专有的东西，对 firefox 等比较遵守标准的浏览器就无效了，因此不可太过依赖。貌似现在的 IE8 就已经不用特意去触发 hasLayout 就可以得到和 firefox 一致的效果，不知 ie8 是否已经弃用这个属性了？

一般如果是因为 layout 而引起的显示不符期望效果的话，在 ff 下会表现正常，而在 ie 下会出现错误。这个时候可以尝试触发父容器及其中的子容器的 haslayout 属性，通常可以通过加上 `zoom: 1;` 来调试。直到找到了产生问题的元素，再进行针对性的修正。最好的办法是对这个元素设置尺寸属性。但是，有时不便指定尺寸属性的情况下，就只能寻找替代方案了。

对于 ie7 ，最好的办法是设置最小高度属性为 0；这个技术是无害的，因为 0 本来就是这个属性的初始值。而且没有必要对其他浏览器隐藏这个属性。而对于 ie6 和更早版本中触发一个元素 hasLayout 的方法是在 `overflow` 属性是 `visible` 的情况下设置这个元素的高度属性为 1%，然后对其他浏览器隐藏这个设置。这种技术就是著名的 **Holly hack**。

### 7.BFC（*block formatting context*）

块格式化上下文（BFC）是 Web 页面的可视化 CSS 渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。

块格式化上下文对浮动定位与清除浮动都很重要。浮动定位和清除浮动时只会应用于同一个 BFC 内的元素。浮动不会影响其它 BFC 中元素的布局，而清除浮动只能清除同一 BFC 中在它前面的元素的浮动。外边距折叠（*Margin collapsing*）也只会发生在属于同一 BFC 的块级元素之间。

#### 7.1.常见定位方案

在讲 BFC 之前，我们先来了解一下常见的定位方案，定位方案是控制元素的布局，有三种常见方案:

##### 7.1.1.普通流 (normal flow)

在普通流中，元素按照其在 HTML 中的先后位置至上而下布局，在这个过程中，行内元素水平排列，直到当行被占满然后换行，块级元素则会被渲染为完整的一个新行，除非另外指定，否则所有元素默认都是普通流定位，也可以说，普通流中元素的位置由该元素在 HTML 文档中的位置决定。

##### 7.1.2.浮动 (float)

在浮动布局中，元素首先按照普通流的位置出现，然后根据浮动的方向尽可能的向左边或右边偏移，其效果与印刷排版中的文本环绕相似。

##### 7.1.3.绝对定位 (absolute positioning)

在绝对定位布局中，元素会整体脱离普通流，因此绝对定位元素不会对其兄弟元素造成影响，而元素具体的位置由绝对定位的坐标决定。

#### 7.2.BFC概念

格式化上下文(*Formatting context*) 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

那么 BFC 是什么呢？

BFC 即 块级格式化上下文 (*Block Formatting Contexts*)，它属于上述定位方案的普通流。

具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。

通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

#### 7.3.触发 BFC

只要元素满足下面任一条件即可触发 BFC 特性：

- body 根元素
- 浮动元素：`float` 除 `none` 以外的值
- 绝对定位元素：`position (absolute、fixed)`
- `display` 为 `inline-block`、`table-cells`、`flex`
- `overflow` 除了 `visible` 以外的值 (`hidden、auto、scroll`)

#### 7.4.特性

- 1.内部的Box会在垂直方向，一个接一个地放置。
- 2.Box垂直方向的距离由`margin`决定。属于同一个BFC的两个相邻Box的`margin`会发生重叠
- 3.每个元素的`margin box`的左边，与包含块`border box`的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如 此。
- 4.BFC的区域不会与`float box`重叠。
- 5.BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
- 6.计算BFC的高度时，浮动元素也参与计算。

#### 7.5.BFC 特性及应用

1.同一个 BFC 下外边距会发生折叠

```css
div{
  width: 100px;
  height: 100px;
  background: lightblue;
  margin: 100px;
}
```

```html
<body>
  <div></div>
  <div></div>
</body>
```

从效果上看，因为两个 `div` 元素都处于同一个 BFC 容器下 (这里指 `body` 元素) 所以第一个 `div` 的下边距和第二个 `div` 的上边距发生了重叠，所以两个盒子之间距离只有 100px，而不是 200px。

首先这不是 CSS 的 bug，我们可以理解为一种规范，如果想要避免外边距的重叠，可以将其放在不同的 BFC 容器中。

```html
<div class="container">
  <p></p>
</div>
<div class="container">
  <p></p>
</div>
```

```css
.container {
  overflow: hidden;
}
p {
  width: 100px;
  height: 100px;
  background: lightblue;
  margin: 100px;
}
```

这时候，两个盒子边距就变成了 200px 。

2.BFC 可以包含浮动的元素（清除浮动）
我们都知道，浮动的元素会脱离普通文档流，来看下下面一个例子

```html
<div style="border: 1px solid #000;">
  <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>
```

由于容器内元素浮动，脱离了文档流，所以容器只剩下 2px 的边距高度。如果使触发容器的 BFC，那么容器将会包裹着浮动元素。

```html
<div style="border: 1px solid #000;overflow: hidden">
  <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>
```

3.BFC 可以阻止元素被浮动元素覆盖

先来看一个文字环绕效果：

```html
<div style="height: 100px;width: 100px;float: left;background: lightblue">我是一个左浮动的元素</div>
<div style="width: 200px; height: 200px;background: #eee">我是一个没有设置浮动，也没有触发 BFC 元素...</div>
```

这时候其实第二个元素有部分被浮动元素所覆盖，(但是文本信息不会被浮动元素所覆盖) 如果想避免元素被覆盖，可触第二个元素的 BFC 特性，在第二个元素中加入 `overflow: hidden`，就会变成：

这个方法可以用来实现两列自适应布局，效果不错，这时候左边的宽度固定，右边的内容自适应宽度(去掉上面右边内容的宽度)。

## 七.CSS布局（layout）

- 固定布局：宽高写死； `float+position` — 最常用在PC上
- 流式布局(百分比布局) + 媒体查询 + px 单位 —最常用在 PC 端和移动端公用一套页面结构
- 流式布局(百分比布局) + 媒体查询 + rem 单位 最常用移动端上 h5 页面上
- flexbox 弹性盒模型

### 1.百分比布局

百分比布局，也叫流式布局，因为宽度是百分比，但是高度是按 px 来写的。

百分比是一种相对于包含块的计量单位，它对图片很有用，甚至还能同时使用 `min-width` 和 `max-width` 来限制图片的最大或最小宽度！

当布局很窄时， 固定定位的导航栏就会被挤扁。更糟糕的是，你不能在 `nav` 上使用 `min-width` 来修复这个问题，因为右边的那列是不会遵守它的。

适用页面特点：左侧固定 + 右侧自适应/左右固定宽度 + 中间自适应

开发思路：
自适应意味着百分比（0% - 100%) -> 思考：如何确定是不是自适应？

- 多列等分 -> 百分比等分

---

- 左侧固定宽度 + 右侧自适应宽度
  - 思路一 -> 左侧左浮动+右侧利用BFC特性在右侧
  - 思路二 -> 父级给`padding-left`，预留出来左侧区域的宽度，左侧用绝对定位上去，右侧用百分百宽度

---

- 左侧自适应 + 右侧固定宽度
  - 思路一 -> 左侧用百分百宽度，右侧用绝对定位上去

---

- 左右固定宽度 + 中间自适应
  - 思路一 -> 左侧左浮动 + 中间百分之百（中间部分再分为左侧百分之百+右侧右浮动）
  - 思路二 -> 左侧左浮动 + 中间百分之百 + 右侧右浮动（负 `margin` 法减掉左右侧）
  - 思路三 -> 左右绝对定位 + 中间百分之百（父元素 `padding-left`，`padding-right` 预留左右侧的位置）

---

- 左中右全自适应 -> 全部用百分比

- `font-size、padding，margin，height` 直接量像素

- 小的地方可以用 `display:inline-block;` 让几个容器放在一排

- 小图标之类的，可以考虑用 `::before，::after` 来实现

### 2.媒体查询

"响应式设计（Responsive Design)" 是一种让网站针对不同的浏览器和设备"呈现"不同显示效果的策略，这样可以让网站在任何情况下显示的很棒！

媒体查询是做此事所需的最强大的工具。使用 `meta viewport` 之后可以让你的布局在移动浏览器上显示的更好。

```css
@media (min-width:375px){
  .box{
    width:200px;
    height:200px;
    background:#000;
    border:10px solid #73cf17;
  }
}
```

x < 375 `max-width` 最大宽度 375 小于等于 375
x > 375 `min-width` 最小宽度 375 大于等于 375

> 注意点:单词之间空格隔开

1.`@media` 媒体 媒介

2.媒体类型
  all 所有类型
  screen 设备类型
  print 打印类型

3.连接符
  `and` 和

4.判断条件 `()`

5.`{ css 样式代码 }`

### 3.rem布局分析

`rem = root element` 根元素
rem(font size of root element) 根元素(html)的字体大小
`1rem = 16px` （谷歌 html 默认的字体大小是 16px）。

```css
html{
  font-size:100px;
  /!*设置100px 原因:1.减少和设计稿的偏差 2.方便计算*!/
  /!*1rem:100px;*!/
}

/*
设计稿的尺寸   分辨率          1rem = 100px
  640         320            100px
              375            117.1875px
              414            129.375px
              640            200px
*/

media screen and (min-width: 320px){
  /*320分辨率 以iphone5参考 做的设计稿*/
  html{
    font-size:100px;
  }
}
```

### 4.`inline-block` 布局

使用 `inline-block` 来布局。有一些事情需要你牢记：

- `vertical-align` 属性会影响到 `inline-block` 元素，你可能会把它的值设置为 `top` 。
- 你需要设置每一列的宽度
- 如果 HTML 源代码中元素之间有空格，那么列与列之间会产生空隙

### 5.`column`

可以帮助你很轻松的实现文字的多列布局。CSS columns 是很新的标准，所以你需要使用前缀，并且它不被 IE9 及以下和 Opera Mini 支持。

```css
.three-column {
  padding: 1em;
  -moz-column-count: 3;
  -moz-column-gap: 1em;
  -webkit-column-count: 3;
  -webkit-column-gap: 1em;
  column-count: 3;
  column-gap: 1em;
}
```

### 6.Flex 布局

> If you are looking at a blog post (or whatever) about Flexbox and you see `display: box;` or a property that is box-{*}， you are looking at the old 2009 version of Flexbox.
> If you are looking at a blog post (or whatever) about Flexbox and you see `display: flexbox;` or the flex() function， you are looking at an awkward tweener phase in 2011.
> If you are looking at a blog post (or whatever) about Flexbox and you see `display: flex;` and flex-{*} properties， you are looking at the current (as of this writing) specification.

网页布局是 CSS 的一个重点应用。布局的传统解决方案，基于盒状模型，依赖 `display`  属性 + `position` 属性 + `float` 属性。它对于那些特殊布局非常不方便，比如，垂直居中就不容易实现。

2009 年，W3C 提出了一种新的方案 ---- Flex 布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。

以下内容主要参考了下面两篇文章：
[A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
[A Visual Guide to CSS3 Flexbox Properties](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties)

#### 6.1.什么是 Flex 布局

Flex 是 *Flexible Box* 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为 Flex 布局。

`.box{display:flex;}`

行内元素也可以使用 Flex 布局。

`.box{display:inline-flex;}`

webkit 内核的浏览器，必须加上 `-webkit-` 前缀。

> 注意，设为 Flex 布局以后，子元素的 `float`、`clear` 和 `vertical-align` 属性将失效。
> 若子级元素没有指定宽度，则由其内容撑开；若是没有指定高度，则继承父级的高度。

#### 6.2.基本概念

采用 Flex 布局的元素，称为 **Flex 容器**（*flex container*），简称"容器"。它的所有子元素自动成为容器成员，称为 **Flex 项目**（*flex item*），简称"项目"。

容器默认存在两根轴：水平的**主轴**（*main axis*）和垂直的**交叉轴**（*cross axis*）。主轴的开始位置（与边框的交叉点）叫做 main start，结束位置叫做 main end；交叉轴的开始位置叫做 cross start，结束位置叫做 cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做 main size，占据的交叉轴空间叫做 cross size。

#### 6.3.容器的属性

##### 6.3.1 `flex-direction`

决定主轴的方向（即项目的排列方向）。

```css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

它可能有4个值:

- `row`（默认值）：主轴为水平方向，起点在左端。
- `row-reverse`：主轴为水平方向，起点在右端。
- `column`：主轴为垂直方向，起点在上沿。
- `column-reverse`：主轴为垂直方向，起点在下沿。

##### 6.3.2 `flex-wrap`

定义如果一条轴线排不下，如何换行。

```css
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

它可能取三个值:

- `nowrap`（默认）：不换行。
- `wrap`：换行，第一行在上方。
- `wrap-reverse`：换行，第一行在下方（即从左往右，从下往上）。

##### 6.3.3 `flex-flow`

`flex-flow` 属性是 `flex-direction` 属性和 `flex-wrap` 属性的简写形式，默认值为 `row nowrap`。

```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

##### 6.3.4 `justify-content`

属性定义了项目在主轴上的对齐方式。

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

它可能取 5 个值，具体对齐（前后顺序不变）方式与轴的方向有关。下面假设主轴为从左到右:

- `flex-start`（默认值）：左对齐
- `flex-end`：右对齐
- `center`： 居中，项目距两端的间距相同
- `space-between`：两端对齐，项目之间的间隔都相等。
- `space-around`：每个项目两侧的间隔相等（所以，项目之间的间隔比项目与边框的间隔大一倍）

##### 6.3.5 `align-items`

定义项目在交叉轴上如何对齐。

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下:

- `flex-start`：交叉轴的起点对齐。
- `flex-end`：交叉轴的终点对齐。
- `center`：交叉轴的中点对齐。
- `baseline`: 项目的第一行文字的基线对齐。
- `stretch`（默认值）：如果项目未设置高度或设为 `auto`，将占满整个容器的高度（指定高度，效果类似 `flex-start`）。

##### 6.3.6 `align-content`

定义了多根轴线的对齐方式（如果项目只有一根轴线，该属性不起作用）。

```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

该属性可能取 6 个值:

- `flex-start`：与交叉轴的起点对齐。
- `flex-end`：与交叉轴的终点对齐。
- `center`：与交叉轴的中点对齐（项目之间没有间隙）。
- `space-between`：与交叉轴两端对齐（与两端没有间隙，除非设置 `margin`值），轴线之间的间隔平均分布。
- `space-around`：每根轴线两侧的间隔都相等（所以，轴线之间的间隔比轴线与边框的间隔大一倍）。
- `stretch`（默认值）：轴线占满整个交叉轴（高度等分；如果项目未设置高度或设为auto，将占满整个容器的高度，但是一般除去最后一个交叉轴，其他轴线的高度会等分）。

> 项目之间在主轴或交叉轴方向没有间距，除非主动设置。

#### 6.4.项目的属性

##### 6.4.1 `order`

定义项目的排列顺序（数值越小，排列越靠前，默认为 `0`）。

```css
.item {
  order: <integer>;
}
```

##### 6.4.2 `flex-grow`

定义项目的放大比例，默认为 `0`，即如果存在剩余空间，也不放大。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

如果所有项目的 `flex-grow` 属性都为 `1`，则它们将等分剩余空间（如果有的话）。
如果有一个或多个项目的 `flex-grow` 属性没有设置，若至少有一个项目设置该属性，则后者将扩大占据多余的空间而前者不变。

##### 6.4.3 `flex-shrink`

定义了项目的缩小比例，默认为 `1`，即如果空间不足，该项目将缩小。

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

如果所有项目的 `flex-shrink` 属性都为 `1`，当空间不足时，都将等比例缩小。如果一个项目的 `flex-shrink` 属性为 `0`，其他项目都为 `1`，则空间不足时，前者不缩小。

> 负值对以上两个属性均无效。总之，在以上两个属性中，该属性值为0时不会放大或缩小。

##### 6.4.4 `flex-basis`

定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 `auto`，即项目的本来大小。

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

它可以设为跟 `width` 或 `height` 属性一样的值（比如 350px），则项目将占据固定空间（没有到达指定的空间大小？？？）。

##### 6.4.5 `flex`

  `flex` 属性是 `flex-grow`， `flex-shrink` 和 `flex-basis` 的简写，默认值为 `0 1 auto`。后两个属性可选。

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值：`auto (1 1 auto)` 和 `none (0 0 auto)`。

> 建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

##### 6.4.6 `align-self`

  允许单个项目有与其他项目不一样的对齐方式，可覆盖 `align-items` 属性。默认值为 `auto`，表示继承父元素的 `align-items` 属性，如果父元素没有该属性，则等同于 `stretch`。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

该属性可能取 6 个值，除了 `auto`，其他都与 `align-items` 属性完全一致。

#### 6.5.小结

| 作用层级 |        作用        |       属性        | 值                                                                        |
| :------: | :----------------: | :---------------: | ------------------------------------------------------------------------- |
|    父    |      主轴方向      | `flex-direction`  | `row / row-reverse / column / column-reverse`                             |
|    父    |   是否及如何换行   |    `flex-wrap`    | `nowrap / wrap / wrap-reverse`                                            |
|    父    |        简写        |    `flex-flow`    | `<flex-direction> / <flex-wrap>`                                          |
|    父    |  主轴上的对齐方式  | `justify-content` | `flex-start / flex-end / center / space-between / space-around`           |
|    父    |  交叉轴上如何对齐  |   `align-items`   | `flex-start / flex-end / center / baseline / stretch`                     |
|    父    | 多根轴线的对齐方式 |  `align-content`  | `flex-start / flex-end / center / space-between / space-around / stretch` |
|          |                    |                   |                                                                           |
|    子    |   项目的排列顺序   |      `order`      | `<integer>`                                                               |
|    子    |      放大比例      |    `flex-grow`    | `<number>`                                                                |
|    子    |      缩小比例      |   `flex-shrink`   | `<number>`                                                                |
|    子    |  项目占据的主轴空  |   `flex-basis`    | `<length> / auto`                                                         |
|    子    |        简写        |      `flex`       | `none / [ <'flex-grow'> <'flex-shrink'>? / <'flex-basis'> ]`              |
|    子    |  单个项目对齐方式  |   `align-self`    | `auto / flex-start / flex-end / center / baseline / stretch`              |
