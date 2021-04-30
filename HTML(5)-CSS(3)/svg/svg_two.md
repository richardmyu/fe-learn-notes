# SVG

## Texts

在 SVG 中有两种截然不同的文本模式：一种是写在图像中的文本，另一种是 SVG 字体。

在一个 SVG 文档中，`<text>` 元素内部可以放任何的文字。

```xml
<text x="10" y="10">Hello World!</text>
```

属性 `x` 和属性 `y` 性决定了文本在视口中显示的位置。属性 `text-anchor`，可以有这些值：`start`、`middle`、`end` 或 `inherit`，允许决定从这一点开始的文本流的方向。

和形状元素类似，属性 `fill` 可以给文本填充颜色，属性 `stroke` 可以给文本描边，形状元素和文本元素都可以引用渐变或图案, 相比较 CSS2.1 只能绘制简单的彩色文字，SVG 显得更具有优势。

> [text demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/text.svg)

### `tspan`

该元素用来标记大块文本的子部分，它必须是一个 `text` 元素或别的 `tspan` 元素的子元素。

tspan元素有以下的自定义属性：

- `x/y`
  - 为容器设置一个新 **绝对** `x/y` 坐标。它覆盖了默认的当前的文本位置。这个属性可以包含一个数列，它们将一个一个地应用到 `tspan` 元素内的每一个字符上。
>
- `dx/dy`
  - 从当前位置，用一个水平/垂直偏移开始绘制文本。这里，可以提供一个值数列，可以应用到连续的字体，因此每次累积一个偏移。
>
- `rotate`
  - 把所有的字符旋转一个角度。如果是一个数列，则使每个字符旋转分别旋转到那个值，剩下的字符根据最后一个值旋转。
>
- `textLength`
  - 这是一个很模糊的属性，给出字符串的计算长度。它意味着如果它自己的度量文字和长度不满足这个提供的值，则允许渲染引擎精细调整字型的位置。

> [tspan x/dx demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/text_tspan.svg)
> [tspan y/dy demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/text_tspan_2.svg)
> [tspan rotate demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/text_tspan_3.svg)
> [tspan textLength demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/text_tspan_4.svg)

### `tref`

`tref` 元素允许引用已经定义的文本，高效地把它复制到当前位置。你可以使用 `xlink:href` 属性，把它指向一个元素，取得其文本内容。可以独立于源样式化它、修改它的外观。

```xml
<text id="example">This is an example text.</text>

<text>
  <tref xlink:href="#example" />
</text>
```

> 实测无效果，见[tref demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/text_tref.svg)

### `textPath`

该元素利用它的 `xlink:href` 属性取得一个任意路径，把字符对齐到路径，于是字体会环绕路径、顺着路径走：

```xml
<path id="my_path" d="M 20,20 C 40,40 80,40 100,20" fill="transparent" />
<text>
  <textPath xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#my_path">
    This text follows a curve.
  </textPath>
</text>
```

> [textPath demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/text_textPath.svg)

## 基础变形

利用 `<g>` 元素，可以把属性赋给一整个元素集合。实际上，这是它唯一的目的。

```xml
<g fill="red">
  <rect x="0" y="0" width="10" height="10" />
  <rect x="20" y="0" width="10" height="10" />
</g>
```

### 平移

`translate(<x> [<y>])` 变换函数通过 `x` 向量和 `y` 向量移动元素 (i.e. `xnew = xold + <x>`, `ynew = yold + <y>`)。如果 `y` 向量没有被提供，那么默认为 0。

> [translate demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/transform_translate.svg)

### 旋转

`rotate(<a> [<x> <y>])` 变换方法通过一个给定角度对一个指定的点进行旋转变换。如果 `x` 和 `y` 没有提供，那么默认为当前元素坐标系原点。否则，就以 `(x,y)` 为原点进行旋转。

> [rotate demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/transform_rotate.svg)

### 斜切

`skewX(<a>)` 变换函数指定了沿 `x` 轴倾斜 `a°` 的倾斜变换。
`skewY(<a>)` 变换函数指定了沿 `y` 轴倾斜 `a°` 的倾斜变换。

> [skewX demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/transform_skewX.svg)
> [skewY demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/transform_skewY.svg)

### 缩放

`scale(<x> [<y>])` 变换函数通过 `x` 和 `y` 指定一个 **等比例放大缩小** 操作。如果 `y` 没有被提供，那么假定为等同于 `x`。

> 等比例放大缩小：除了自身几何大小放大缩小，其坐标 `(x,y)` 也会等比放缩。

> [scale demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/transform_scale.svg)

### `matrix`

`matrix(<a> <b> <c> <d> <e> <f>)` 函数以六个值的变换矩阵形式指定一个  `transform`。

```xml
<rect x="10" y="10" width="30" height="20" fill="green" />
  <!--
  In the following example we are applying the matrix:
  [a c e]    [3 -1 30]
  [b d f] => [1  3 40]
  [0 0 1]    [0  0  1]

  which transform the rectangle as such:

  top left corner: oldX=10 oldY=10
  newX = a * oldX + c * oldY + e = 3 * 10 - 1 * 10 + 30 = 50
  newY = b * oldX + d * oldY + f = 1 * 10 + 3 * 10 + 40 = 80

  top right corner: oldX=40 oldY=10
  newX = a * oldX + c * oldY + e = 3 * 40 - 1 * 10 + 30 = 140
  newY = b * oldX + d * oldY + f = 1 * 40 + 3 * 10 + 40 = 110

  bottom left corner: oldX=10 oldY=30
  newX = a * oldX + c * oldY + e = 3 * 10 - 1 * 30 + 30 = 30
  newY = b * oldX + d * oldY + f = 1 * 10 + 3 * 30 + 40 = 140

  bottom right corner: oldX=40 oldY=30
  newX = a * oldX + c * oldY + e = 3 * 40 - 1 * 30 + 30 = 120
  newY = b * oldX + d * oldY + f = 1 * 40 + 3 * 30 + 40 = 170
  -->

  <!-- e,f 分别表示 x,y 方向的偏移量 -->
<rect x="10" y="10" width="30" height="20" fill="red" transform="matrix(3 1 -1 3 30 40)" />
```

> [matrix demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/transform_matrix.svg)

### 坐标系统上的效果

如果使用了变形，你会在元素内部建立了一个新的坐标系统，应用了这些变形，你为该元素和它的子元素指定的单位可能不是 1:1 像素映射。但是依然会根据这个变形进行歪曲、斜切、转换、缩放操作。

> [coordinate demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/transform_coordinate.svg)

### SVG嵌在SVG内部

SVG 允许无缝嵌入别的 `svg` 元素。因此你可以利用内部 `svg` 元素的属性 `viewBox`、属性 `width` 和属性 `height` 简单创建一个新的坐标系统。

> [embed demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/transform_embed.svg)

## 剪切和遮罩

### 剪切

SVG 元素 `<clipPath>` 定义一条剪切路径，可作为其他元素的 `clip-path` 属性的值。

```xml
<defs>
  <clipPath id="cut-off-bottom">
    <rect x="0" y="0" width="200" height="100" />
  </clipPath>
</defs>

<circle cx="100" cy="100" r="100" clip-path="url(#cut-off-bottom)" />
```

```xml
/* 如果浏览器支持几何属性 r，可以加一点 css */

@keyframes openYourHeart {from {r: 0} to {r: 60px}}

#myClip circle {
  animation: openYourHeart 15s infinite;
}
```

属性 `clip-path` 引用了一个带单个 `rect` 元素的 `<clipPath>` 元素。它内部的这个矩形将把画布的上半部分涂黑。注意，`clipPath` 元素经常放在一个 `defs` 元素内。

然而，该 `rect` 不会被绘制。它的象素数据将用来确定：圆形的哪些像素需要最终呈现出来。因为矩形只覆盖了圆形的上半部分，所以下半部分将消失了。

对于这个剪切，`clipPath` 内部的每个路径都会被检查到、与它的描边属性一起被估值、变形。然后目标的位于 `clipPath` 内容的结果的透明度区域的每一块都不会呈现。颜色、不透明度都没有这种效果，因为它们不能让一部分彻底消失。

从概念上讲，剪切路径等于给引用元素设置了一个自定义的可视区域。因此，它虽然会影响一个元素的绘制，但不会影响这个元素本身的几何形状，比如被剪切元素（通过 `clip-path` 属性引用了 `<clipPath>` 的元素及其子元素）的包围盒和没有被剪切时相同。

默认情况下，`pointer-events` 不会在被剪切掉的区域（不可见的区域）内触发。举个例子，如果一个半径为 10 的圆形被剪切成半径为 5 的圆形，那么这个圆在半径为 5 以外的区域不会收到 “`click`” 事件。

> [clipping demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/clipping.svg)

### 遮罩

在 SVG 中，可以指一个透明的遮罩层和当前对象合成，形成背景。透明遮罩层可以是任何其他图形对象或者 `<g>` 元素。`mask` 元素用于定义这样的遮罩元素。属性 `mask` 用来引用一个遮罩元素。

```xml
<defs>
  <linearGradient id="Gradient">
    <stop offset="0" stop-color="white" stop-opacity="0" />
    <stop offset="1" stop-color="white" stop-opacity="1" />
  </linearGradient>
  <mask id="Mask">
    <rect x="0" y="0" width="200" height="200" fill="url(#Gradient)"  />
  </mask>
</defs>

<rect x="0" y="0" width="200" height="200" fill="green" />
<rect x="0" y="0" width="200" height="200" fill="red" mask="url(#Mask)" />
```

> [mask demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/mask.svg)

### 用 `opacity` 定义透明度

有一个简单方法可以用来为整个元素设置透明度。它就是 `opacity` 属性：


```xml
<rect x="0" y="0" width="100" height="100" opacity=".5" />
```

填充和描边还有两个属性是 `fill-opacity` 和 `stroke-opacity`，分别用来控制填充和描边的不透明度。需要注意的是描边将绘制在填充的上面。因此，如果你在一个元素上设置了描边透明度，但它同时设有填充，则描边的一半应用填充色，另一半将应用背景色。

Web 开发工具箱中有一个很有用的工具是 `display:none`。它虽然几无悬念，但是依然可以在 SVG 上使用该 CSS 属性，连同 CSS2 定义的 `visibility` 和 `clip` 属性。为了恢复以前设置的 `display:none`，知道这一点很重要：所有的 SVG 元素的初始 `display` 值都是 `inline`。

> [opacity demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/opacity.svg)

## 其它 SVG 内容

