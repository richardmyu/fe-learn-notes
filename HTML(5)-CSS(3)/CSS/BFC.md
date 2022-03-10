# 常规流 ( Normal flow )

## 格式化上下文 ( Formatting context )

**格式化上下文** (Formatting context) 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

格式化上下文指的是初始化元素定义的环境。包含两个要点，一个是元素定义的环境，一个是初始化。

在 CSS 中，元素定义的环境有两种，一种是**块格式化上下文** ( Block formatting context )，另一种是**行内格式化上下文** ( Inline formatting context )。 这两种上下文定义了在 CSS 中元素所处的环境，格式化则表明了在这个环境中，元素处于此环境中应当被初始化，即元素在此环境中应当如何布局等。

以上解释专业点的说法是：在常规流中的框，都属于一个格式化的上下文中。

### 1. 块格式化上下文 ( Block formatting context )

BFC 即 **块级格式化上下文** (Block Formatting Contexts)，它属于定位方案的普通流。

具有 BFC 特性的元素可以看作是隔离了的独立容器，用于管理块级元素，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。

通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

#### 1.1. 创建方式

只要元素满足下面任一条件即可创建 BFC 特性：

- 根元素或包含根元素的元素
  >
- 浮动元素：`float` 除 `none` 以外的值
  >
- 绝对定位元素：`position (absolute、fixed)`
  >
- 行内块元素（元素的 display 为 inline-block）
  >
- 表格单元格（元素的 display 为 table-cell，HTML 表格单元格默认为该值）
  >
- 表格标题（元素的 display 为 table-caption，HTML 表格标题默认为该值）
  >
- 匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是 HTML table、row、tbody、thead、tfoot 的默认属性）或 inline-table）
  >
- `overflow` 除了 `visible` 以外的值
  >
- 弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
  >
- 网格元素（display 为 grid 或 inline-grid 元素的直接子元素）

> 注意，是这些元素创建了块格式化上下文，它们本身不是块格式化上下文。

使用 overflow 或其他的方法创建 BFC 时会有两个问题。第一个是这些方法本身是有自身的设计目的的，所以在使用它们创建 BFC 时会可能产生副作用。另一个问题是，即使在没有出现副作用的情况下，使用 overflow 也可能会使另一个开发人员感到困惑。

最安全的做法应该是创建一个 BFC 时不会有任何副作用，它内部的元素都安安全全的呆在这个小布局里，这种方法不会引起任何意想不到的问题，也可以让开发者意图清晰。CSS 工作组也十分认同这种想法，所以他们定制了一个新的属性值：`display: flow-root`。

#### 1.2. 作用及现实意义

块格式化上下文是一个比较抽象的概念。可以把它想象成一个大箱子，很多元素装在里面，箱子把它们和外面的元素隔开。

块格式化上下文是个重要的概念，它对宽高的计算，外边距折叠，定位等都有一定的影响。

在块格式化上下文中，框会一个接一个地被垂直放置，它们的起点是一个包含块的顶部。 两个兄弟框之间的垂直距离取决于 'margin' 特性。在块格式化上下文中相邻的块级元素的垂直外边距会折叠 ( collapse )。

在块格式化上下文中，每一个元素左外边与包含块的左边相接触（对于从右到左的格式化，右外边接触右边），即使存在浮动也是如此（尽管一个元素的内容区域会由于浮动而压缩），除非这个元素也创建了一个新的块格式化上下文。

它与普通的块框类似，不同之处在于：

- 可以包含浮动元素
- 可以阻止外边距折叠
- 可以防止元素被浮动元素覆盖

#### 1.3.CSS3 草案中的 "flow root" 5

在 CSS3 中，对块格式化上下文这个概念做了改动，将 "Block formatting context" 叫做 "flow root"。

对于触发方式也做了修改，更加准确：
The value of 'position' is neither "static" nor "relative".

可见，CSS3 草案中的对触发方式的描述更加准确，'position' 在 "fixed" 的时候也会创建 "flow root"。这并不是 CSS2.1 的疏忽， 因为 "position:fixed" 本身就是 "position:absolute" 的一个子类。

注意，"display:table" 本身并不产生 "block formatting contexts"。但是，它可以产生匿名框， 其中包含 "display:table-cell" 的框会产生块格式化上下文。 总之，对于 "display:table" 的元素，产生块格式化上下文的是匿名框而不是 "display:table"。

#### 1.4.BFC 布局规则/特性

- 1. 内部的 Box 会在垂直方向，一个接一个地放置（即块级元素独占一行）。
  >
- 2.Box 垂直方向的距离由 `margin` 决定。属于同一个 BFC 的两个相邻 Box 的 `margin` 会发生重叠
  >
- 3. 每个元素的 `margin box` 的左边，与包含块 `border box` 的左边相接触（对于从左往右的格式化，否则相反）。即使存在浮动也是如此。
  >
- 4.BFC 的区域不会与 float box 重叠
  >
- 5.BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
  >
- 6. 计算 BFC 的高度时，浮动元素也参与计算。

#### 1.5. 应用

1. 同一个 BFC 下外边距会发生折叠

```css
div {
  width: 100px;
  height: 100px;
  background: lightblue;
  margin: 100px;
}
```

```html
<body>
  <div></div>
</body>
```

从效果上看，因为两个 `div` 元素都处于同一个 BFC 容器下 （这里指 `body` 元素） 所以第一个 `div` 的下边距和第二个 `div` 的上边距发生了重叠，所以两个盒子之间距离只有 100px，而不是 200px。

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
<div style="height: 100px;width: 100px;float: left;background: lightblue">
  我是一个左浮动的元素
</div>
<div style="width: 200px; height: 200px;background: #eee">
  我是一个没有设置浮动，也没有触发 BFC 元素。..
</div>
```

这时候其实第二个元素有部分被浮动元素所覆盖，（但是文本信息不会被浮动元素所覆盖） 如果想避免元素被覆盖，可触第二个元素的 BFC 特性，在第二个元素中加入 `overflow: hidden`。

> 一个新的 display 属性的值，它可以创建无副作用的 BFC。在父级块中使用 `display: flow-root 可以创建新的 BFC`。

### 2. 行内格式化上下文 ( Inline formatting context )

相对于块格式化上下文，在行内格式化上下文中，框 ( boxes ) 一个接一个地水平排列，起点是包含块的顶部。 水平方向上的 margin，border 和 padding 在框之间得到保留。 框在垂直方向上可以以不同的方式对齐：它们的顶部或底部对齐，或根据其中文字的基线对齐。 包含那些框的长方形区域，会形成一行，叫做行框。

## 常见定位方案

在讲 BFC 之前，我们先来了解一下常见的定位方案，定位方案是控制元素的布局，有三种常见方案：

### 1. 普通流 (normal flow)

在普通流中，元素按照其在 HTML 中的先后位置至上而下布局，在这个过程中，行内元素水平排列，直到当行被占满然后换行，块级元素则会被渲染为完整的一个新行，除非另外指定，否则所有元素默认都是普通流定位，也可以说，普通流中元素的位置由该元素在 HTML 文档中的位置决定。

### 2. 浮动 (float)

在浮动布局中，元素首先按照普通流的位置出现，然后根据浮动的方向尽可能的向左边或右边偏移，其效果与印刷排版中的文本环绕相似。

### 3. 绝对定位 (absolute positioning)

在绝对定位布局中，元素会整体脱离普通流，因此绝对定位元素不会对其兄弟元素造成影响，而元素具体的位置由绝对定位的坐标决定。

## 参考：

[KB010: 常规流 ( Normal flow )](http://www.w3help.org/zh-cn/kb/010/)

[CSS 深入理解流体特性和 BFC 特性下多栏自适应布局](https://www.zhangxinxu.com/wordpress/2015/02/css-deep-understand-flow-bfc-column-two-auto-layout/)

[扯点：FC - Formatting Context](https://segmentfault.com/a/1190000012770210)

[Understanding CSS Layout And The Block Formatting Context](https://www.smashingmagazine.com/2017/12/understanding-css-layout-block-formatting-context/)

[理解 CSS 布局和块级格式上下文](http://www.ferecord.com/understanding-css-layout-block-formatting-context.html)

[Understanding Block Formatting Contexts in CSS](https://www.sitepoint.com/understanding-block-formatting-contexts-in-css/)

[CSS 101: Block Formatting Contexts](https://yuiblog.com/blog/2010/05/19/css-101-block-formatting-contexts/)

[CSS layout 入门](https://www.cnblogs.com/winter-cn/archive/2012/11/13/2768732.html)

[前端精选文摘：BFC 神奇背后的原理](https://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html)

[CSS 之 BFC 详解](http://www.html-js.com/article/1866)

[css 学习专题-BFC](http://caibaojian.com/bfc.html)

[深入理解 BFC](https://github.com/ljianshu/Blog/issues/15)

[理解 CSS 布局和 BFC](https://www.w3cplus.com/css/understanding-css-layout-block-formatting-context.html)
