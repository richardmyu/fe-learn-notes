# Cnavas

`<canvas>` 是一个可以使用脚本(通常为 JavaScript )来绘制图形的 HTML 元素。

## 基本用法

### `<canvas>` 元素

`<canvas id="canvas" width="150" height="150"></canvas>`

`<canvas>` 标签只有两个属性—— `width` 和 `height`（每个标签都有 `id` 和 `class`、`style` 等属性）。这些都是可选的，并且同样利用 DOM properties 来设置。当没有设置宽度和高度的时候，canvas 会初始化宽度为 300 像素和高度为 150 像素。该元素可以使用 CSS 来定义大小，但在绘制时图像会伸缩以适应它的框架尺寸：如果 CSS 的尺寸与初始画布的比例不一致，它会出现扭曲。

> 注意: 如果你绘制出来的图像是扭曲的, 尝试用 `width` 和 `height` 属性为 `<canvas>` 明确规定宽高，而不是使用 CSS。

与 `<img>` 不同：

1. 容易定义一些替代内容；
2. `<canvas>` 元素需要结束标签(`</canvas>`)。如果结束标签不存在，则文档的其余部分会被认为是替代内容，将不会显示出来。

### 渲染上下文（The rendering context）

`<canvas>` 元素创造了一个固定大小的画布，它公开了一个或多个渲染上下文，其可以用来绘制和处理要展示的内容。

canvas 起初是空白的。为了展示，首先脚本需要找到渲染上下文，然后在它的上面绘制。`<canvas>` 元素有一个叫做 `getContext()` 的方法，这个方法是用来获得渲染上下文和它的绘画功能。`getContext()` 只有一个参数，上下文的格式。对于2D图像而言，你可以使用 `CanvasRenderingContext2D`。

```js
var canvas = document.getElementById('convas');
var ctx = canvas.getContext('2d');
```

> [简单例子](../canvas/demo/index.html)

## 绘制图形

不同于 SVG，`<canvas>` 只支持两种形式的图形绘制：矩形和路径（由一系列点连成的线段）。所有其他类型的图形都是通过一条或者多条路径组合而成的。

### 绘制矩形

canvas提供了三种方法绘制矩形：

- `fillRect(x, y, width, height)`
  - 绘制一个填充的矩形
- `strokeRect(x, y, width, height)`
  - 绘制一个矩形的边框
- `clearRect(x, y, width, height)`
  - 清除指定矩形区域，让清除部分完全透明。

> [demo](../canvas/demo/rect.html)

#### 1.`ctx.fillRect()`

Canvas 2D API 绘制填充矩形的方法。当前渲染上下文中的 `fillStyle` 属性决定了对这个矩形对的填充样式。

这个方法是直接在画布上绘制填充，并不修改当前路径，所以在这个方法后面调用 `fill()` 或者 `stroke()`方法并不会对这个方法有什么影响。

#### 2.`ctx.strokeRect()`

Canvas 2D API 在 canvas 中，使用当前的绘画样式，描绘一个起点在 `(x, y)` 、宽度为 `w` 、高度为 `h` 的矩形的方法。

此方法直接绘制到画布而不修改当前路径，因此任何后续 `fill()` 或 `stroke()` 调用对它没有影响。

#### 3.`ctx.clearRect()`

Canvas 2D API 的方法，这个方法通过把像素设置为透明以达到擦除一个矩形区域的目的。

> 如果没有依照 *绘制路径* 的步骤，使用 `clearRect()` 会导致意想之外的结果。请确保在调用 `clearRect()` 之后绘制新内容前调用 `beginPath()`。

### 绘制路径

图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。使用路径绘制图形需要一些额外的步骤。

1. 首先，你需要创建路径起始点。
2. 然后你使用画图命令去画出路径。
3. 之后你把路径封闭。
4. 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。

> 当调用 `fill()` 函数时，所有没有闭合的形状都会自动闭合，所以不需要调用 `closePath()` 函数。但是调用 `stroke()` 时并不会自动闭合。

#### 1.`ctx.beginPath()`

Canvas 2D API 通过清空子路径列表开始一个新路径的方法。当你想创建一个新的路径时，调用此方法。

```js
ctx.beginPath();
```

新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。

> 调用 `beginPath()` 之后，或者 canvas 刚建的时候，第一条路径构造命令通常被视为是 `moveTo()`，无论实际上是什么。出于这个原因，你几乎总是要在设置路径之后专门指定你的起始位置。

#### 2.`ctx.closePath()`

Canvas 2D API 将笔点返回到当前子路径起始点的方法。它尝试从当前点到起始点绘制一条直线。如果图形已经是封闭的或者只有一个点，那么此方法不会做任何操作。

```js
ctx.closePath();
```

闭合路径之后图形绘制命令又重新指向到上下文中。

> 不是必需的。这个方法会通过绘制一条从当前点到开始点的直线来闭合图形。如果图形是已经闭合了的，即当前点为开始点，该函数什么也不做。

#### 3.`ctx.fill()`

Canvas 2D API 根据当前的填充样式，填充当前或已存在的路径的方法。采取 *非零环绕* 或者 *奇偶环绕规则*。

**语法**

```js
ctx.fill();

ctx.fill(fillRule);
ctx.fill(path, fillRule);
```

`fillRule`

- 一种算法，决定点是在路径内还是在路径外。
允许的值：
  - "nonzero": 非零环绕规则（默认的规则）。
  - "evenodd": 奇偶环绕规则。

`path`

- 需要填充的 Path2D 路径。

> Path2D：这是一个实验中的功能。Canvas 2D API 的接口 Path2D 用来声明路径，此路径稍后会被 CanvasRenderingContext2D 对象使用。CanvasRenderingContext2D 接口的 *路径方法* 也存在于 Path2D 这个接口中，允许你在 canvas 中根据需要创建可以保留并重用的路径。

#### 4.`ctx.stroke()`

Canvas 2D API 使用 *非零环绕规则*，根据当前的画线样式，绘制当前或已经存在的路径的方法。

```js
ctx.stroke();
ctx.stroke(path);
```

#### 5.`ctx.moveTo()`

Canvas 2D API 将一个新的子路径的起始点移动到 `(x，y)` 坐标的方法。

```js
ctx.moveTo(x, y);
```

当 canvas 初始化或者 `beginPath()` 调用后，通常会使用 `moveTo()` 函数设置起点，也能够使用 `moveTo()` 绘制一些不连续的路径。

#### 6.`ctx.lineTo()`

Canvas 2D API 使用直线连接子路径的终点到 `(x，y)` 坐标的方法（并不会真正地绘制）。

```js
lineTo(x, y);
```

> 使用 `beginPath()` 绘制路径的起始点，使用 `moveTo()` 移动画笔，使用 `stroke()` 方法真正地画线。

#### 7.`ctx.arc()`

Canvas 2D API 绘制圆弧路径的方法。圆弧路径的圆心在 `(x, y)` 位置，半径为 `r`，根据 `anticlockwise` （默认为顺时针）指定的方向从 `startAngle` 开始绘制，到 `endAngle` 结束。

```js
arc(x, y, radius, startAngle, endAngle[, anticlockwise]);
```

> 注意：`arc()` 函数中表示角的单位是弧度，不是角度。角度与弧度的表达式：`弧度 = (Math.PI / 180) * 角度`。

#### 8.`ctx.arcTo()`

Canvas 2D API 根据控制点和半径绘制圆弧路径，使用当前的描点(前一个 `moveTo` 或 `lineTo` 等函数的止点)。根据当前描点与给定的控制点 1 连接的直线，和控制点 1 与控制点 2 连接的直线，作为使用指定半径的圆的切线，画出两条切线之间的弧线路径。

```js
ctx.arcTo(x1, y1, x2, y2, radius);
```

> 三个点：当前点 X，控制点 A 和 B，X-A 和 A-B 内切圆（radius）的交线。

#### 9.`ctx.quadraticCurveTo()`

Canvas 2D API 新增二次贝塞尔曲线路径的方法。它需要 2 个点。第一个点是控制点，第二个点是终点。起始点是当前路径最新的点，当创建二次贝赛尔曲线之前，可以使用 `moveTo()` 方法进行改变。

```js
ctx.quadraticCurveTo(cpx, cpy, x, y);
```

> 三个点：起始点 A，控制点 X，终点点 B，根据 X 连接 A - B。

#### 10.`ctx.bezierCurveTo()`

Canvas 2D API 绘制三次贝赛尔曲线路径的方法。 该方法需要三个点。 第一、第二个点是控制点，第三个点是结束点。起始点是当前路径的最后一个点，绘制贝赛尔曲线前，可以通过调用 `moveTo()` 进行修改。

```js
ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
```

> 四个点：起始点 A，控制点 X 和 Y，终点点 B，根据 X & Y 连接 A - B。

#### 11.`ctx.rect()`

Canvas 2D API 创建矩形路径的方法，矩形的起点位置是 `(x, y)`，尺寸为 `width` 和 `height`。矩形的 4 个点通过直线连接，子路径做为闭合的标记，所以你可以填充或者描边矩形。

```js
ctx.rect(x, y, width, height);
```

### Path2D 对象

为了简化代码和提高性能，Path2D 对象已可以在较新版本的浏览器中使用，用来缓存或记录绘画命令，这样你将能快速地回顾路径。

#### 1.`Path2D()`

`Path2D()` 会返回一个新初始化的 Path2D 对象（可能将某一个路径作为变量——创建一个它的副本，或者将一个包含 SVG path 数据的字符串作为变量）。

```js
new Path2D();     // 空的 Path 对象
new Path2D(path); // 克隆 Path 对象
new Path2D(d);    // 从 SVG 建立 Path 对象
```

#### 2.`Path2D.addPath()`

Canvas 2D API 根据指定路径变量添加路径的方法。

```js
path.addPath(path [, transform]);
```

- `path`
  - 需要添加的 Path2D 路径。
- `transform` 【可选】
  - `SVGMatrix` 作为新增路径的变换矩阵。

> `SVGMatrix` 该特性已经从 Web 标准中删除，虽然一些浏览器目前仍然支持它，但也许会在未来的某个时间停止支持，请尽量不要使用该特性。

## 使用样式与颜色

## 绘制文本

## 使用图像

## 变形

## 合成和剪辑


## 基本动画

## 高级动画

## 像素处理

## 点击区域和无障碍访问

## 优化

## 终曲
