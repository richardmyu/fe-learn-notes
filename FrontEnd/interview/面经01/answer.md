# answer

1.css 实现图片自适应宽高

`max-width/height`，见 'demo/01图片自适应宽高' 图片自适应宽高

2.讲 flex，手写出 flex 常用的属性，并且讲出作用

flex: 弹性布局

[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

[CSS3 弹性盒子(Flex Box)](http://www.runoob.com/css3/css3-flexbox.html)

[A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

[A Visual Guide to CSS3 Flexbox Properties](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties)

> 弹性容器外及弹性子元素内是正常渲染的。弹性盒子只定义了弹性子元素如何在弹性容器内布局。
> 弹性子元素通常在弹性盒子内一行显示。默认情况每个容器只有一行。

容器属性

---

- **flex-direction** 属性决定主轴的方向（即项目的排列方向）
  - `row` 横向从左到右排列（左对齐），默认的排列方式
  - `row-reverse` 反转横向排列
  - `column` 纵向排列(从上往下)
  - `column-reverse` 反转纵向排列

---

- **flex-wrap** 属性定义是否换行以及如何换行
  - `nowrap`  默认， 弹性容器为单行
  - `wrap` 多行。溢出的部分会被放置到新行
  - `wrap-reverse` 反转 wrap 排列

---

- **flex-flow** 属性是 `flex-direction` 属性和 `flex-wrap` 属性的简写形式
  - 默认值为 `row nowrap`

---

- **justify-content** 属性定义了项目在主轴上的对齐方式
  - `flex-start` 项目向行头紧挨着填充(默认值)
  - `flex-end` 项目向行尾紧挨着填充
  - `center` 项目居中紧挨着填充（如果剩余的自由空间是负的，~~则弹性项目将在两个方向上同时溢出~~按项目宽度比进行缩小）
  - `space-between` 弹性项目平均分布在该行上。如果剩余空间为负或者只有一个弹性项，则该值等同于 `flex-start`(空间为负时所用项目按照宽度比放缩)。否则，第 1 个弹性项的外边距和行的 main-start 边线对齐，而最后 1 个弹性项的外边距和行的 main-end 边线对齐，然后剩余的弹性项分布在该行上，相邻项目的间隔相等。
  - `space-around` 弹性项目平均分布在该行上，两边留有一半的间隔空间。如果剩余空间为负或者只有一个弹性项，则该值等同于 `center`(空间为负时所用项目按照宽度比放缩)。否则，弹性项目沿该行分布，且彼此间隔相等，同时首尾两边和弹性容器之间留有一半的间隔
  - `space-evenly` 所有间隔相等分布

---

- **align-items** 属性定义项目在交叉轴上如何对齐
  - `flex-start` 项目起始位置的边界紧靠住该行的侧轴起始边界
  - `flex-end` 项目起始位置的边界紧靠住该行的侧轴结束边界
  - `center` 项目该行的侧轴（纵轴）上居中放置（如果该行的尺寸小于弹性盒子元素的尺寸，~~则会向两个方向溢出相同的长度~~，按宽度比放缩）
  - `baseline` 基线对齐
  - `stretch` 如果指定侧轴大小的属性值为 `auto`，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照 `min/max-width/height` 属性的限制(即项目没有指定高度或者设定为 `auto`，则项目的高度会按照父级盒子的高度计，但会受到 `min/max-width/height` 的限制，定高情况下等效 `flex-start`)

---

- **align-content** 属性定义了多根轴线的对齐方式（如果项目只有一根轴线，该属性不起作用）
  - `flex-start` 各行向弹性盒容器的起始位置堆叠
  - `flex-end` 各行向弹性盒容器的结束位置堆叠
  - `center` 各行向弹性盒容器的中间位置堆叠
  - `space-between` 各行在弹性盒容器中平均分布
  - `space-around` 各行在弹性盒容器中平均分布，两端保留子元素与子元素之间间距大小的一半
  - `stretch` 默认。各行将会伸展以占用剩余的空间

---

项目的属性

---

- **order** 属性定义项目的排列顺序(数值越小，排列越靠前，默认为 0)
  - `order: <integer>;`

- **flex-grow** 属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大
  - `flex-grow: <number>; /* default 0 */`

- **flex-shrink** 属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
  - `flex-shrink: <number>; /* default 1 */`

- **flex-basis** 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 `auto`，即项目的本来大小
  - `flex-basis: <length>; /* default auto */`

---

- **flex** 属性是 `flex-grow`, `flex-shrink` 和 `flex-basis` 的简写，默认值为 `0 1 auto`。后两个属性可选
  - `none` 等价 `0 0 auto`
  - `auto` 等价 `1 1 auto`
  - `initial` 等价 `0 1 auto`(默认值)
  - `inherit` 从父元素继承

---

- **align-self** 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 `align-items` 属性。默认值为 `auto`，表示继承父元素的 `align-items` 属性，如果没有父元素，则等同于 `stretch`
  - `auto` 如果 `align-self` 的值为 `auto`，则其计算值为元素的父元素的 `align-items` 值，如果其没有父元素，则计算值为 `stretch`
  - `flex-start` 起始位置的边界紧靠住该行的侧轴起始边界
  - `flex-end` 起始位置的边界紧靠住该行的侧轴结束边界
  - `center` 居中放置
  - `baseline` 基线对齐
  - `stretch` 如果指定侧轴大小的属性值为 `auto`，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照 `min/max-width/height` 属性的限制

---

> 设置 `margin` 值为 `auto` 值，自动获取弹性容器中剩余的空间。所以设置垂直方向 `margin` 值为 `auto`，可以使弹性子元素在弹性容器的两上轴方向都完全居中。

3.BFC 是什么

**块格式化上下文**（Block Formatting Context，BFC） 是Web页面的可视化CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

下列方式会创建块格式化上下文：

---

- 根元素或包含根元素的元素
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 为 inline-block）
- 表格单元格（元素的 display为 table-cell，HTML表格单元格默认为该值）
- 表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
- 匿名表格单元格元素（元素的 display为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 inline-table）
- overflow 值不为 visible 的块元素
- display 值为 flow-root 的元素
- contain 值为 layout、content或 strict 的元素
- 弹性元素（display为 flex 或 inline-flex元素的直接子元素）
- 网格元素（display为 grid 或 inline-grid 元素的直接子元素）
- 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
- column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。

---

块格式化上下文包含创建它的元素内部的所有内容.

块格式化上下文对浮动定位（参见 float）与清除浮动（参见 clear）都很重要。浮动定位和清除浮动时只会应用于同一个BFC内的元素。浮动不会影响其它BFC中元素的布局，而清除浮动只能清除同一BFC中在它前面的元素的浮动。外边距折叠（Margin collapsing）也只会发生在属于同一BFC的块级元素之间。

4.项目里面的前端鉴权是怎么实现的？

5.vue 里面的虚拟 dom 是怎么回事？

6.vue 双向绑定讲一讲

7.手写函数防抖和函数节流

8.讲讲常用的 es6 语法，比如 let、promise、class 等等

9.浏览器渲染过程，回流重绘等等，load、DOMContentLoaded 等等事件的触发顺序
