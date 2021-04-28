# SVG

**可缩放矢量图形**（Scalable Vector Graphics，SVG），是一种用于描述二维的矢量图形，基于 XML 的标记语言。作为一个基于文本的开放网络标准，SVG 能够优雅而简洁地渲染不同大小的图形，并和 CSS，DOM，JavaScript 和 SMIL 等其他网络标准无缝衔接。本质上，SVG 相对于图像，就好比 HTML 相对于文本。

SVG 图像及其相关行为被定义于 XML 文本文件之中，这意味着可以对它们进行搜索、索引、编写脚本以及压缩。此外，这也意味着可以使用任何文本编辑器和绘图软件来创建和编辑它们。

和传统的点阵图像模式（JPEG 和 PNG）不同，SVG 格式提供的是矢量图，这意味着它的图像能够被无限放大而不失真或降低质量，并且可以方便地修改内容。

## 引言

SVG 是一种 XML 语言，类似 XHTML，可以用来绘制矢量图形。SVG 可以通过定义必要的线和形状来创建一个图形，也可以修改已有的位图，或者将这两种方式结合起来创建图形。图形和其组成部分可以形变（be transformed）、合成、或者通过滤镜完全改变外观。

### 基本要素

SVG也提供了一些元素，用于定义圆形、矩形、简单或复杂的曲线。一个简单的 SVG 文档由 `<svg>` 根元素和基本的形状元素构成。

- SVG 的元素和属性必须按标准格式书写，因为 XML 是区分大小写的（这一点和HTML不同）
- SVG 里的属性值必须用引号引起来，就算是数值也必须这样做。

> [hello demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/hello.svg)

## 入门

### SVG 文件的基本属性

最值得注意的一点是元素的渲染顺序。SVG 文件全局有效的规则是“后来居上”，越后面的元素越可见。

web 上的 svg 文件可以直接在浏览器上展示，或者通过以下几种方法嵌入到 HTML 文件中：
- 如果 HTML 是 XHTML 并且声明类型为 `application/xhtml+xml`，可以直接把 SVG 嵌入到 XML 源码中。
- 如果 HTML 是 HTML5 并且浏览器支持 HTML5，同样可以直接嵌入 SVG。然而为了符合 HTML5 标准，可能需要做一些语法调整。
- 可以通过 `object` 元素引用 `SVG` 文件：

```xml
<object data="image.svg" type="image/svg+xml" />
```

- 类似的也可以使用 `iframe` 元素引用 SVG 文件（大小会被 `iframe` 影响）：

```xml
<iframe src="image.svg"></iframe>
```

- 理论上同样可以使用 `img` 元素，但是在低于 4.0 版本的 Firefox 中不起作用。
- 最后 SVG 可以通过 JavaScript 动态创建并注入到 HTML DOM 中。这样具有一个优点，可以对浏览器使用替代技术，在不能解析 SVG 的情况下，可以替换创建的内容。

> [hello demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/hello.html)

### SVG 文件类型

SVG 文件有两种形式。

- **普通 SVG 文件**：是包含 SVG 标记的简单文本文件。推荐使用 “`.svg`”（全部小写）作为此类文件的扩展名。

- **gzip 压缩的 SVG 文件**：由于在某些应用（比如地图应用等）中使用时，SVG 文件可能会很大，SVG 标准同样允许 gzip 压缩的 SVG 文件。推荐使用 “`.svgz`”（全部小写）作为此类文件扩展名 。

> 除非知道处理发布内容的 web 服务器可以正确的处理 gzip，否则要避免使用 gzip 压缩的 SVG。

## 坐标定位

### 网格

对于所有元素，SVG 使用的坐标系统或者说网格系统，和 Canvas 用的差不多（所有计算机绘图都差不多）。

**什么是 "像素"?**

基本上，在 SVG 文档中的1个像素对应输出设备（比如显示屏）上的1个像素。但是这种情况是可以改变的，否则 SVG 的名字里也不至于会有“Scalable”（可缩放）这个词。

在没有进一步规范说明的情况下，1 个用户单位等同于 1 个屏幕单位。要明确改变这种设定，SVG 里有多种方法。

```xml
<svg width="200" height="200" viewBox="0 0 100 100">
```

这里定义的画布尺寸是 `200*200px`。但是，`viewBox` 属性定义了画布上可以显示的区域：从 `(0,0)` 点开始，`100宽*100高` 的区域。这个 `100*100` 的区域，会放到 `200*200` 的画布上显示。于是就形成了放大两倍的效果。

用户单位和屏幕单位的映射关系被称为用户坐标系统。除了缩放之外，坐标系统还可以旋转、倾斜、翻转。。在定义了具体尺寸单位的 SVG 中，比如单位是 “`cm`” 或 “`in`”，最终图形会以实际大小的1比1比例呈现。

> [viewbox demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/viewbox.svg)

## 基本形状

要想插入一个形状，你可以在文档中创建一个元素。不同的元素对应着不同的形状，并且使用不同的属性来定义图形的大小和位置。有一些形状因为可以由其他的形状创建而略显冗余， 但是它们用起来方便，可让我们的 SVG 文档简洁易懂。

> 默认黑色(#000)。

### 矩形

```xml
<rect x="10" y="10" width="30" height="30"/>
<rect x="60" y="10" rx="10" ry="10" width="30" height="30"/>
```

- x`
  - 矩形左上角的x位置
- y`
  - 矩形左上角的y位置
- width`
  - 矩形的宽度
- height`
  - 矩形的高度
- rx`
  - 圆角的 x 方位的半径
- ry`
  - 圆角的 y 方位的半径

> 只指定 `rx` 和 `ry` 中任意一个，等价于 `rx=a ry=a`。

> [basic_shape_rect demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/basic_shape_rect.svg)

### 圆形

```xml
<circle cx="25" cy="75" r="20"/>
```

- `r`
  - 圆的半径
- `cx`
  - 圆心的x位置
- `cy`
  - 圆心的y位置

> [basic_shape_circle demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/basic_shape_circle.svg)

### 椭圆

椭圆不能指定精确的椭圆倾向（假设，举个例子，想画一个45度角倾斜的椭圆），但是可以利用 `transform` 属性实现旋转。

```xml
<ellipse cx="75" cy="75" rx="20" ry="5"/>
```

- `rx`
  - 椭圆的 x 半径
- `ry`
  - 椭圆的 y 半径
- `cx`
  - 椭圆中心的 x 位置
- `cy`
  - 椭圆中心的 y 位置

> [basic_shape_ellipse demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/basic_shape_ellipse.svg)

### 线条

```xml
<line x1="10" x2="50" y1="110" y2="150"/>
```

- `x1`
 - 起点的 x 位置
- `y1`
 - 起点的 y 位置
- `x2`
 - 终点的 x 位置
- `y2`
 - 终点的 y 位置

> [basic_shape_line demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/basic_shape_line.svg)

### 折线

```xml
<polyline points="60 110, 65 120, 70 115, 75 130, 80 125, 85 140, 90 135, 95 150, 100 145"/>
```

- `points`
  - 点集数列。每个数字用空白、逗号、终止命令符或者换行符分隔开。每个点必须包含 2 个数字，一个是 x 坐标，一个是 y 坐标。所以点列表 `(0,0), (1,1)` 和 `(2,2)` 可以写成这样：“`0 0, 1 1, 2 2`”。

> 非闭合。填充（`fill!=none`）类型，最少需要三个点集，才能绘制；描绘类型（`stroke="color" fill="none"`），最少需要两个点集。

> [basic_shape_polyline demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/basic_shape_polyline.svg)

### 多边形

`polygon` 和折线很像，它们都是由连接一组点集的直线构成。不同的是，`polygon` 的路径在最后一个点处自动回到第一个点。

> 需要注意的是，矩形也是一种多边形，如果需要更多灵活性的话，你也可以用多边形创建一个矩形。

```xml
<polygon points="50 160, 55 180, 70 180, 60 190, 65 205, 50 195, 35 205, 40 190, 30 180, 45 180"/>
```

- `points`
  - 点集数列。路径绘制完后闭合图形。

> [basic_shape_polygon demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/basic_shape_polygon.svg)

### 路径

`path` 可能是 SVG 中最常见的形状。你可以用 `path` 元素绘制矩形（直角矩形或者圆角矩形）、圆形、椭圆、折线形、多边形，以及一些其他的形状，例如贝塞尔曲线、2次曲线等曲线。

```xml
<path d="M 20 230 Q 40 205, 50 230 T 90230"/>
```

- `d`
  - 一个点集数列以及其它关于如何绘制路径的信息。

> [basic_shape_path demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/basic_shape_path.svg)

## 路径

`<path>` 元素是 SVG 基本形状中最强大的一个。你可以用它创建线条, 曲线, 弧形等等。另外，`path`只需要设定很少的点，就可以创建平滑流畅的线条（比如曲线）。虽然 `polyline` 元素也能实现类似的效果，但是必须设置大量的点（点越密集，越接近连续，看起来越平滑流畅），并且这种做法不能够放大（放大后，点的离散更明显）。所以在绘制 SVG 时，对路径的良好理解很重要。

`path` 元素的形状是通过属性 `d` 定义的，属性 `d` 的值是一个“命令+参数”的序列。

每一个命令都用一个关键字母来表示，比如，字母“`M`”表示的是“Move to”命令，当解析器读到这个命令时，它就知道你是打算移动到某个点。

跟在命令字母后面的，是你需要移动到的那个点的 x 和 y 轴坐标。比如移动到 `(10,10)` 这个点的命令，应该写成 “`M 10 10`”。这一段字符结束后，解析器就会去读下一段命令。

每一个命令都有两种表示方式，一种是用 **大写字母**，表示采用 *绝对定位*。另一种是用 **小写字母**，表示采用 *相对定位*。

> 因为属性 `d` 采用的是用户坐标系统，所以不需标明单位。

### 直线命令

`<path>` 元素里有 5 个画直线的命令，顾名思义，直线命令就是在两个点之间画直线。

能够真正画出线的命令有三个（M命令是移动画笔位置，但是不画线）:

- L
- H 绘制水平线
- V 绘制垂直线

**M**

```shell
M x y
# or
m dx dy
```

**L**

```shell
L x y
# or
l dx dy
```

**H**

```shell
H x
# or
h dx
```

**V**

```shell
V y
# or
v dy
```

**Z**

`Z` 命令会从当前点画一条直线到路径的起点，尽管我们不总是需要闭合路径，但是它还是经常被放到路径的最后。另外，`Z` 命令不用区分大小写。

```shell
Z
# or
z
```

> [line demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/path_line.svg)

### 曲线命令

**三次贝塞尔曲线**

三次贝塞尔曲线需要定义一个点和两个控制点，需要设置三组坐标参数：

```shell
C x1 y1, x2 y2, x y
# or
c dx1 dy1, dx2 dy2, dx dy
```

> 这里的最后一个坐标 `(x,y)` 表示的是曲线的终点，所以实际画三次贝塞尔曲线，还要设置一个起点。

```xml
<path d="M10 10 C 20 20, 40 20, 50 10" stroke="black" />
```

你可以将若干个贝塞尔曲线连起来，从而创建出一条很长的平滑曲线。通常情况下，一个点某一侧的控制点是它另一侧的控制点的对称（以保持斜率不变）。这样，你可以使用一个简写的贝塞尔曲线命令 `S`，如下所示：

```shell
S x2 y2, x y
# or
s dx2 dy2, dx dy
```

`S` 命令可以用来创建与前面一样的贝塞尔曲线，但是，如果 S 命令跟在一个 C 或 S 命令后面，则它的第一个控制点会被假设成前一个命令曲线的第二个控制点的中心对称点。如果 S 命令单独使用，前面没有 C 或 S 命令，那当前点将作为第一个控制点。

> [cubic_bezier_curve demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/path_cubic_bezier_curve.svg)

**二次贝塞尔曲线**

比三次贝塞尔曲线简单，只需要一个控制点，用来确定起点和终点的曲线斜率。因此它需要两组参数，控制点和终点坐标。

```shell
Q x1 y1, x y
# or
q dx1 dy1, dx dy
```

就像三次贝塞尔曲线有一个 `S` 命令，二次贝塞尔曲线有一个差不多的 `T` 命令，可以通过更简短的参数，延长二次贝塞尔曲线。

```shell
T x y
# or
t dx dy
```

> [quadratic_bezier_curve demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/path_quadratic_bezier_curve.svg)

**弧形**

基本上，弧形可以视为圆形或椭圆形的一部分。假设，已知椭圆形的长轴半径和短轴半径，并且已知两个点（在椭圆上），根据半径和两点，可以画出两个椭圆，在每个椭圆上根据两点都可以画出两种弧形。所以，仅仅根据半径和两点，可以画出四种弧形。为了保证创建的弧形唯一，`A` 命令需要用到比较多的参数：

```shell
A rx ry x-axis-rotation large-arc-flag sweep-flag x y
# or
a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
```

`rx ry` 同椭圆。

- `x-axis-rotation` x 轴旋转角度
- `large-arc-flag` 角度大小（0 表示小角度弧，1 表示大角度弧）
- `sweep-flag` 弧线方向 （0 表示从起点到终点沿逆时针画弧，1 表示从起点到终点沿顺时针画弧）
- `x`
- `y`

> [arc demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/path_arc.svg)
> [arc demo 2](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/path_arc_2.svg)

## 填充和边框

可以使用几种方法来着色（包括指定对象的属性）使用内联 CSS 样式、内嵌 CSS 样式，或者使用外部 CSS 样式文件。大多数的 web 网站的 SVG 使用的是内联样式 CSS，对于这些方法都有优缺点。

### 上色

大多数基本的涂色可以通过在元素上设置两个属性来搞定：`fill` 属性和 `stroke` 属性。

- `fill` 属性设置对象内部的颜色；
- `stroke` 属性设置绘制对象的线条的颜色；

> 可以使用在 HTML 中的 CSS 颜色命名方案定义它们的颜色。

```xml
<rect x="10" y="10" width="100" height="100" stroke="blue" fill="purple"
       fill-opacity="0.5" stroke-opacity="0.8"/><rect x="10" y="10" width="100" height="100" stroke="blue" fill="purple"
       fill-opacity="0.5" stroke-opacity="0.8"/>
```

此外，在 SVG 中可以分别定义填充色和边框色的不透明度，属性 `fill-opacity` 控制填充色的不透明度，属性 `stroke-opacity` 控制描边的不透明度。

> 如果同时指定了 `rgba` 值和填充/描边不透明度，它们将都被调用。

> [fill stroke](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/fill_stroke.svg)

### 描边

除了颜色属性，还有其他一些属性用来控制绘制描边的方式。

> 注意，描边是以路径为中心线绘制的注意，描边是以路径为中心线绘制的。

**`stroke-width`**

指定了当前对象的轮廓的宽度。它的默认值是 1。如果使用了一个 `<percentage>`，这个值代表 *当前视口* 的百分比。如果使用了 0 值，则将不绘制轮廓。

**`stroke-linecap`**

在开放子路径被设置描边的情况下，用于开放自路径两端的形状。

- `butt` 【默认值】用直边结束线段，它是常规做法，线段边界 90 度垂直于描边的方向、贯穿它的终点；
- `square` 的效果差不多，但是会稍微超出实际路径的范围，超出的大小由 `stroke-width` 控制；
- `round` 表示边框的终点是圆角，圆角的半径也是由 `stroke-width` 控制的；

> [stroke-linecap demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/fill_stroke_linecap.svg)

**`stroke-linejoin`**

指明路径的转角处使用的形状或者绘制的基础形状。

- `miter`【默认值】表示用方形画笔在连接处形成尖角；
- `round` 表示用圆角连接，实现平滑效果；
- `bevel` 连接处会形成一个斜接；

> [stroke-linejoin demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/fill_stroke_linejoin.svg)
> [stroke-linejoin demo-2](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/fill_stroke_linejoin_2.svg)

**`stroke-dasharray`**

用来描边的点划线的图案范式。

值是一个 `<length>` 和 `<percentage>` 数列，数与数之间用逗号或者空白隔开，指定短划线和缺口的长度。如果提供了奇数个值，则这个值的数列重复一次，从而变成偶数个值。因此，`5,3,2` 等同于 `5,3,2,5,3,2`。

> [stroke-dasharray demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/fill_stroke_dasharray.svg)

**`fill-rule`**

是一个外观属性，它定义了用来确定一个多边形内部区域的算法。

- `nonzero` 【默认值】
- `evenodd`

> [stroke-dasharray demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/fill_stroke_rule.svg)

### 使用 CSS

> [SVG 规范](https://www.w3.org/TR/SVG/propidx.html) 将属性区分成 `properties` 和其他 `attributes`，前者是可以用 CSS 设置的，后者不能。

除了定义对象的属性外，也可以通过 CSS 来样式化填充和描边。语法和在 HTML 里使用 CSS 一样，只不过要把 `background-color`、`border` 改成 `fill` 和 `stroke`。

注意，不是所有的属性都能用 CSS 来设置。上色和填充的部分一般是可以用 CSS 来设置的，比如 `fill`，`stroke`，`stroke-dasharray` 等，但是不包括渐变和图案等功能。另外，`width`、`height`，以及路径的命令等等，都不能用 CSS 设置。

> 一些可以在 HTML 里使用的 CSS，在 svg 里可能无法正常工作，比如 `before` 和 `after` 伪类。

也可以定义一个外部的样式表，但是要符合 [normal XML-stylesheet syntax] 的 CSS 规则:

```xml
<?xml version="1.0" standalone="no"?>
<?xml-stylesheet type="text/css" href="style.css"?>

<svg width="200" height="150" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <rect height="10" width="10" id="MyRect"/>
</svg>
```

`style.css` 看起来就像这样：

```css
#MyRect {
  fill: red;
  stroke: black;
}
```

> [use_css demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/fill_stroke_use_css.svg.svg)

## 渐变

有两种类型的渐变：线性渐变和径向渐变。你必须给渐变内容指定一个 `id` 属性，否则文档内的其他元素就不能引用它。为了让渐变能被重复使用，渐变内容需要定义在 `<defs>` 标签内部，而不是定义在形状上面。

### 线性渐变

线性渐变沿着直线改变颜色，要插入一个线性渐变，你需要在 SVG 文件的 `defs` 元素内部，创建一个 `<linearGradient>` 节点。

```xml
<svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
      <linearGradient id="Gradient1">
        <stop class="stop1" offset="0%"/>
        <stop class="stop2" offset="50%"/>
        <stop class="stop3" offset="100%"/>
      </linearGradient>
      <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="red"/>
        <stop offset="50%" stop-color="black" stop-opacity="0"/>
        <stop offset="100%" stop-color="blue"/>
      </linearGradient>
      <!-- style -->
      <style type="text/css"><![CDATA[
        #rect1 { fill: url(#Gradient1); }
        .stop1 { stop-color: red; }
        .stop2 { stop-color: black; stop-opacity: 0; }
        .stop3 { stop-color: blue; }
      ]]></style>
  </defs>

  <!-- id 引用 -->
  <rect id="rect1" x="10" y="10" rx="15" ry="15" width="100" height="100"/>
  <!-- fill 引用 -->
  <rect x="10" y="120" rx="15" ry="15" width="100" height="100" fill="url(#Gradient2)"/>

</svg>
```

线性渐变内部有几个 `<stop>` 结点，这些结点通过指定位置的 `offset`（偏移）属性和 `stop-color`（颜色中值）属性来说明在渐变的特定位置上应该是什么颜色；可以直接指定这两个属性值，也可以通过 CSS 来指定他们的值，该例子中混合使用了这两种方法。

偏移量应该始终从 0% 开始（或者 0 也可以，百分号可以扔掉），到 100%（或 1）结束。如果 `stop` 设置的位置有重合，将使用 XML 树中较晚设置的值。而且，类似于填充和描边，你也可以指定属性 `stop-opacity` 来设置某个位置的半透明度（同样也可以设置 `rgba` 值）。

```xml
<stop offset="100%" stop-color="yellow" stop-opacity="0.5"/>
```

使用渐变时，我们需要在一个对象的属性 `fill` 或属性 `stroke` 中引用它。

渐变的方向可以通过两个点来控制，它们分别是属性 `x1`、`x2`、`y1` 和 `y2`，这些属性定义了渐变路线走向。渐变色默认是水平方向的，但是通过修改这些属性，就可以旋转该方向。

```xml
<linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
```

也可以在渐变上使用 `xlink:href` 属性。如果使用了该属性时，一个渐变的属性和颜色中值（stop）可以被另一个渐变包含引用。

```xml

```
<linearGradient id="Gradient1">
  <stop class="stop1" offset="0%"/>
  <stop class="stop2" offset="50%"/>
  <stop class="stop3" offset="100%"/>
</linearGradient>

<linearGradient
    id="Gradient3"
    x1="0"
    x2="1"
    y1="0"
    y2="1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xlink:href="#Gradient1"
  >
  <!-- 可以直接使用 stopx -->
  <stop class="stop1" offset="0%" />
  <stop class="stop2" offset="50%" />
  <stop class="stop3" offset="100%" />
</linearGradient>

<style type="text/css">
  <![CDATA[
    #rect1 { fill: url(#Gradient1); }
    .stop1 { stop-color: red; }
    .stop2 { stop-color: black; stop-opacity: 0; }
    .stop3 { stop-color: blue; }
  ]]>
</style>

> [gradient_linear demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/gradient_linear.svg.svg)

### 径向渐变

径向渐变与线性渐变相似，只是它是从一个点开始发散绘制渐变。创建径向渐变需要在文档的 `defs` 中添加一个 `<radialGradient>` 元素。

```xml
<?xml version="1.0" standalone="no"?>
<svg width="120" height="240" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <defs>
      <radialGradient id="RadialGradient1">
        <stop offset="0%" stop-color="red"/>
        <stop offset="100%" stop-color="blue"/>
      </radialGradient>
      <radialGradient id="RadialGradient2" cx="0.25" cy="0.25" r="0.25">
        <stop offset="0%" stop-color="red"/>
        <stop offset="100%" stop-color="blue"/>
      </radialGradient>
  </defs>

  <rect x="10" y="10" rx="15" ry="15" width="100" height="100" fill="url(#RadialGradient1)"/>
  <rect x="10" y="120" rx="15" ry="15" width="100" height="100" fill="url(#RadialGradient2)"/>

</svg>
```

跟线性渐变一样，`<radialGradient>` 节点可以有多个属性来描述其位置和方向，但是它更加复杂。径向渐变也是通过两个点来定义其边缘位置：

- 第一个点定义了渐变结束所围绕的圆环，描述了渐变边缘位置，需要一个中心点，由 `cx` 和 `cy` 属性及半径 `r` 来定义；
- 第二个点被称为 **焦点**，描述了渐变的中心，由 `fx` 和 `fy` 属性定义。

```XML
<?xml version="1.0" standalone="no"?>

<svg width="120" height="120" version="1.1"
  xmlns="http://www.w3.org/2000/svg">
  <defs>
      <radialGradient id="Gradient"
            cx="0.5" cy="0.5" r="0.5" fx="0.25" fy="0.25">
        <stop offset="0%" stop-color="red"/>
        <stop offset="100%" stop-color="blue"/>
      </radialGradient>
  </defs>

  <rect x="10" y="10" rx="15" ry="15" width="00" height="100"
        fill="url(#Gradient)" stroke="black" stroke-width="2"/>

  <circle cx="60" cy="60" r="50" fill="transparent" stroke="white" stroke-width="2"/>

  <!-- cx = fx*width + x -->
  <!-- cx = 100*0.25 + 10 = 35 -->
  <circle cx="35" cy="35" r="2" fill="white" stroke="white"/>

  <!-- cx = 100*0.5 + 10 = 60-->
  <circle cx="60" cy="60" r="2" fill="white" stroke="white"/>

  <text x="38" y="40" fill="white" font-family="sans-serif" font-size="10pt">(fx,fy)</text>
  <text x="63" y="63" fill="white" font-family="sans-serif" font-size="10pt">(cx,cy)</text>

</svg>
```

如果没有给出焦点，将认为该点与中心点的位置一致。若焦点在渐变圆圈的外面，渐变将不能正确呈现。

> [gradient_radial demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/gradient_radial.svg)
> [gradient_radial demo-2](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/gradient_radial_2.svg)

### `spreadMethod`

控制了当渐变到达终点的行为，但是此时该对象尚未被填充颜色。

这个属性可以有三个值：

- `pad` 【默认值】当渐变到达终点时，最终的偏移颜色被用于填充对象剩下的空间；(1,2,2,2...)
- `reflect` 让渐变一直持续下去，不过它的效果是与渐变本身是相反的，以 100% 偏移位置的颜色开始，逐渐偏移到 0% 位置的颜色，然后再回到 100% 偏移位置的颜色；(1,2,2,1..)
- `repeat` 也会让渐变继续，但是它不会像 `reflect` 那样反向渐变，而是跳回到最初的颜色然后继续渐变；(1,2,1,2...)

> 对线性渐变似乎没有影响。

> [gradient_spreadmethod demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/gradient_spreadmethod.svg)

### `gradientUnits`

两种渐变都有一个叫做 `gradientUnits`（渐变单元）的属性，它描述了用来描述渐变的大小和方向的单元系统。

该属性有两个值：

- `userSpaceOnUse`
- `objectBoundingBox`【默认值】

## 图案

`patterns`（图案）是 SVG 中用到的最让人混淆的填充类型之一，它的功能非常强大。跟渐变一样，`<pattern>` 需要放在 SVG 文档的 `<defs>` 内部。

```xml
<defs>
  <linearGradient id="Gradient1">
    <stop offset="5%" stop-color="white"/>
    <stop offset="95%" stop-color="blue"/>
  </linearGradient>
  <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
    <stop offset="5%" stop-color="red"/>
    <stop offset="95%" stop-color="orange"/>
  </linearGradient>

  <pattern id="Pattern" x="0" y="0" width=".25" height=".25">
    <rect x="0" y="0" width="50" height="50" fill="skyblue"/>
    <rect x="0" y="0" width="25" height="25" fill="url(#Gradient2)"/>
    <circle cx="25" cy="25" r="20" fill="url(#Gradient1)" fill-opacity="0.5"/>
  </pattern>

</defs>

<rect fill="url(#Pattern)" stroke="black" x="0" y="0" width="200" height="200"/>
```

在 `pattern` 元素内部可以包含任何之前包含过的其它基本形状，并且每个形状都可以使用任何（有效的）样式，包括渐变和半透明。

关于 `pattern` 容易混淆的事是，`pattern` 定义了一个单元系统以及他们的大小。在 `pattern` 元素上定义 `width` 和 `height` 属性，可用于描述在重复下一个图案之前应该跨过多远。如果想要在绘制时偏移矩形的开始点，也可以使用 `x` 和 `y` 属性。

同样的 `pattern` 也有一个属性 `patternUnits` 用于描述我们使用的属性单元。这同之前使用的 `objectBoundingBox` 默认值一样，所以当一个值为 1 时，它被缩放到应用 `pattern` 对象的宽高值。

与渐变不同，`pattern` 有第二个属性 `patternContentUnits`，它描述了 `pattern` 元素基于基本形状使用的单元系统，这个属性默认值为 `userSpaceOnUse`，与 `patternUnits` 属性相反，这意味着除非你至少指定其中一个属性值（`patternContentUnits` 或 `patternUnits`），否则在 `pattern` 中绘制的形状将与 `pattern` 元素使用的坐标系不同，当手写这部分时会容易混淆。

> [patterns demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/patterns.svg)

---

参考

1.[SVG文档](https://developer.mozilla.org/zh-CN/docs/Web/SVG)
