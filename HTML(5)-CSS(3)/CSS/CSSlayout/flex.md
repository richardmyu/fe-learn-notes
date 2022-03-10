# Flex

## 1. 什么是 Flex 布局

Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为 Flex 布局。

`.box{ display: flex; }`

行内元素也可以使用 Flex 布局。

`.box{ display: inline-flex; }`

webkit 内核的浏览器，必须加上 `-webkit-` 前缀。

> 注意，设为 Flex 布局以后，子元素的 `float`、`clear` 和 `vertical-align` 属性将失效。
> 若子级元素没有指定宽度，则由其内容撑开；若是没有指定高度，则继承父级的高度。

## 2. 基本概念

采用 Flex 布局的元素，称为 **Flex 容器**（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 **Flex 项目**（flex item），简称"项目"。

> 弹性容器外及弹性子元素内是正常渲染的。弹性盒子只定义了弹性子元素如何在弹性容器内布局。

容器默认存在两根轴：水平的**主轴**（main axis）和垂直的**交叉轴**（cross axis）。主轴的开始位置（与边框的交叉点）叫做 main start，结束位置叫做 main end；交叉轴的开始位置叫做 cross start，结束位置叫做 cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做 main size，占据的交叉轴空间叫做 cross size。

## 3. 容器的属性

### 3.1 flex-direction

决定主轴的方向（即项目的排列方向）。

```css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

它可能有 4 个值：

- `row`（默认值）：主轴为水平方向，起点在左端。
- `row-reverse`：主轴为水平方向，起点在右端。
- `column`：主轴为垂直方向，起点在上沿。
- `column-reverse`：主轴为垂直方向，起点在下沿。

### 3.2 flex-wrap

定义是否换行以及如何换行。

```css
.box {
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

它可能取三个值：

- `nowrap`（默认）：不换行。
- `wrap`：换行，第一行在上方。
- `wrap-reverse`：换行，第一行在下方（即从左往右，从下往上）。

### 3.3 flex-flow

`flex-flow` 属性是 `flex-direction` 属性和 `flex-wrap` 属性的简写形式，默认值为 `row nowrap`。

```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

### 3.4 justify-content

属性定义了项目在主轴上的对齐方式。

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
}
```

它可能取 5 个值，具体对齐（前后顺序不变）方式与轴的方向有关。下面假设主轴为从左到右：

- `flex-start`：项目向行头紧挨着填充（默认值）
- `flex-end`：项目向行尾紧挨着填充
- `center`： 项目居中紧挨着填充（如果剩余的自由空间是负的，~~则弹性项目将在两个方向上同时溢出~~按项目宽度比进行缩小）
- `space-between`：弹性项目平均分布在该行上。如果剩余空间为负或者只有一个弹性项，则该值等同于 `flex-start`（空间为负时所用项目按照宽度比放缩）。否则，第 1 个弹性项的外边距和行的 main-start 边线对齐，而最后 1 个弹性项的外边距和行的 main-end 边线对齐，然后剩余的弹性项分布在该行上，相邻项目的间隔相等。
- `space-around`：弹性项目平均分布在该行上，两边留有一半的间隔空间。如果剩余空间为负或者只有一个弹性项，则该值等同于 `center`（空间为负时所用项目按照宽度比放缩）。否则，弹性项目沿该行分布，且彼此间隔相等，同时首尾两边和弹性容器之间留有一半的间隔
- `space-evenly` 所有间隔相等分布

### 3.5 align-items

定义项目在交叉轴上如何对齐。

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

它可能取 5 个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下：

- `flex-start`：项目起始位置的边界紧靠住该行的侧轴起始边界
- `flex-end`：项目起始位置的边界紧靠住该行的侧轴结束边界
- `center`：项目该行的侧轴（纵轴）上居中放置（如果该行的尺寸小于弹性盒子元素的尺寸，~~则会向两个方向溢出相同的长度~~，按宽度比放缩）
- `baseline`: 项目的第一行文字的基线对齐。
- `stretch`：如果指定侧轴大小的属性值为 `auto`，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照 `min/max-width/height` 属性的限制（即项目没有指定高度或者设定为 `auto`，则项目的高度会按照父级盒子的高度计，但会受到 `min/max-width/height` 的限制，定高情况下等效 `flex-start`)

### 3.6 align-content

定义了多根轴线的对齐方式（如果项目只有一根轴线，该属性不起作用）。

```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around |
    stretch;
}
```

该属性可能取 6 个值：

- `flex-start`：各行向弹性盒容器的起始位置堆叠
- `flex-end`：各行向弹性盒容器的结束位置堆叠
- `center`：各行向弹性盒容器的中间位置堆叠
- `space-between`：各行在弹性盒容器中平均分布
- `space-around`：各行在弹性盒容器中平均分布，两端保留子元素与子元素之间间距大小的一半
- `stretch`（默认值）：轴线占满整个交叉轴（高度等分；如果项目未设置高度或设为 auto，将占满整个容器的高度，但是一般除去最后一个交叉轴，其他轴线的高度会等分）。

> 项目之间在主轴或交叉轴方向没有间距，除非主动设置。

## 4. 项目的属性

### 4.1 order

定义项目的排列顺序（数值越小，排列越靠前，默认为 `0`）。

```css
.item {
  order: <integer>;
}
```

### 4.2 flex-grow

定义项目的放大比例，默认为 `0`，即如果存在剩余空间，也不放大。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

如果所有项目的 `flex-grow` 属性都为 `1`，则它们将等分剩余空间（如果有的话）。
如果有一个或多个项目的 `flex-grow` 属性没有设置，若至少有一个项目设置该属性，则后者将扩大占据多余的空间而前者不变。

### 4.3 flex-shrink

定义了项目的缩小比例，默认为 `1`，即如果空间不足，该项目将缩小。

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

如果所有项目的 `flex-shrink` 属性都为 `1`，当空间不足时，都将等比例缩小。如果一个项目的 `flex-shrink` 属性为 `0`，其他项目都为 `1`，则空间不足时，前者不缩小。

> 负值对以上两个属性均无效。总之，在以上两个属性中，该属性值为 0 时不会放大或缩小。

### 4.4 flex-basis

定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 `auto`，即项目的本来大小。

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

它可以设为跟 `width` 或 `height` 属性一样的值（比如 350px），则项目将占据固定空间（没有到达指定的空间大小？？？）。

### 4.5 flex

`flex` 属性是 `flex-grow`， `flex-shrink` 和 `flex-basis` 的简写，默认值为 `0 1 auto`。后两个属性可选。

```css
.item {
  flex: none | [ < "flex-grow" > < "flex-shrink" >? || < "flex-basis" > ];
}
```

该属性有三个快捷值：`initial (0 1 auto)`，`auto (1 1 auto)` 和 `none (0 0 auto)`。

> 建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

### 4.6 align-self

允许单个项目有与其他项目不一样的对齐方式，可覆盖 `align-items` 属性。默认值为 `auto`，表示继承父元素的 `align-items` 属性，如果父元素没有该属性，则等同于 `stretch`。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

该属性可能取 6 个值，除了 `auto`，其他都与 `align-items` 属性完全一致。

## 5.margin 妙用

设置 `margin` 值为 `auto` 值，自动获取弹性容器中剩余的空间。所以设置垂直方向 `margin` 值为 `auto`，可以使弹性子元素在弹性容器的两上轴方向都完全居中。

## 6. 小结

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

---

参考：

[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

[CSS3 弹性盒子 (Flex Box)](http://www.runoob.com/css3/css3-flexbox.html)

[A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

[A Visual Guide to CSS3 Flexbox Properties](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties)
