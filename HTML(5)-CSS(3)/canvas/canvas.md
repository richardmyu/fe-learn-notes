# Cnavas

`<canvas>` 是一个可以使用脚本（通常为 JavaScript ) 来绘制图形的 HTML 元素。

## 1. 基本用法

### 1.1.`<canvas>` 元素

`<canvas id="canvas" width="150" height="150"></canvas>`

`<canvas>` 标签只有两个属性—— `width` 和 `height`（每个标签都有 `id` 和 `class`、`style` 等属性）。这些都是可选的，并且同样利用 DOM properties 来设置。当没有设置宽度和高度的时候，canvas 会初始化宽度为 300 像素和高度为 150 像素。该元素可以使用 CSS 来定义大小，但在绘制时图像会伸缩以适应它的框架尺寸：如果 CSS 的尺寸与初始画布的比例不一致，它会出现扭曲。

> 注意：如果你绘制出来的图像是扭曲的，尝试用 `width` 和 `height` 属性为 `<canvas>` 明确规定宽高，而不是使用 CSS。

与 `<img>` 不同：

1. 容易定义一些替代内容；
2. `<canvas>` 元素需要结束标签 (`</canvas>`)。如果结束标签不存在，则文档的其余部分会被认为是替代内容，将不会显示出来。

### 1.2. 渲染上下文（The rendering context）

`<canvas>` 元素创造了一个固定大小的画布，它公开了一个或多个渲染上下文，其可以用来绘制和处理要展示的内容。

canvas 起初是空白的。为了展示，首先脚本需要找到渲染上下文，然后在它的上面绘制。`<canvas>` 元素有一个叫做 `getContext()` 的方法，这个方法是用来获得渲染上下文和它的绘画功能。`getContext()` 只有一个参数，上下文的格式。对于 2D 图像而言，你可以使用 `CanvasRenderingContext2D`。

```js
var canvas = document.getElementById('convas');
var ctx = canvas.getContext('2d');
```

> [简单例子](https://github.com/richardmyu/CSS-And-JS-Animate/tree/master/canvas/basic/index.html)

## 2. 绘制图形

不同于 SVG，`<canvas>` 只支持两种形式的图形绘制：矩形和路径（由一系列点连成的线段）。所有其他类型的图形都是通过一条或者多条路径组合而成的。

### 2.1. 绘制矩形

canvas 提供了三种方法绘制矩形：

- `fillRect(x, y, width, height)`
  - 绘制一个填充的矩形
- `strokeRect(x, y, width, height)`
  - 绘制一个矩形的边框
- `clearRect(x, y, width, height)`
  - 清除指定矩形区域，让清除部分完全透明。

> [demo](https://github.com/richardmyu/CSS-And-JS-Animate/tree/master/canvas/basic/rect.html)

#### 2.1.1.`ctx.fillRect()`

绘制填充矩形的方法。当前渲染上下文中的 `fillStyle` 属性决定了对这个矩形对的填充样式。

这个方法是直接在画布上绘制填充，并不修改当前路径，所以在这个方法后面调用 `fill()` 或者 `stroke()`方法并不会对这个方法有什么影响。

#### 2.1.2.`ctx.strokeRect()`

在 canvas 中，使用当前的绘画样式，描绘一个起点在 `(x, y)` 、宽度为 `w` 、高度为 `h` 的矩形的方法。

此方法直接绘制到画布而不修改当前路径，因此任何后续 `fill()` 或 `stroke()` 调用对它没有影响。

#### 2.1.3.`ctx.clearRect()`

的方法，这个方法通过把像素设置为透明以达到擦除一个矩形区域的目的。

> 如果没有依照 *绘制路径* 的步骤，使用 `clearRect()` 会导致意想之外的结果。请确保在调用 `clearRect()` 之后绘制新内容前调用 `beginPath()`。

### 2.2. 绘制路径

图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。使用路径绘制图形需要一些额外的步骤。

1. 首先，你需要创建路径起始点。
2. 然后你使用画图命令去画出路径。
3. 之后你把路径封闭。
4. 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。

> 当调用 `fill()` 函数时，所有没有闭合的形状都会自动闭合，所以不需要调用 `closePath()` 函数。但是调用 `stroke()` 时并不会自动闭合。

#### 2.2.1.`ctx.beginPath()`

通过清空子路径列表开始一个新路径的方法。当你想创建一个新的路径时，调用此方法。

```js
ctx.beginPath();
```

新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。

> 调用 `beginPath()` 之后，或者 canvas 刚建的时候，第一条路径构造命令通常被视为是 `moveTo()`，无论实际上是什么。出于这个原因，你几乎总是要在设置路径之后专门指定你的起始位置。

#### 2.2.2.`ctx.closePath()`

将笔点返回到当前子路径起始点的方法。它尝试从当前点到起始点绘制一条直线。如果图形已经是封闭的或者只有一个点，那么此方法不会做任何操作。

```js
ctx.closePath();
```

闭合路径之后图形绘制命令又重新指向到上下文中。

> 不是必需的。这个方法会通过绘制一条从当前点到开始点的直线来闭合图形。如果图形是已经闭合了的，即当前点为开始点，该函数什么也不做。

#### 2.2.3.`ctx.fill()`

根据当前的填充样式，填充当前或已存在的路径的方法。采取 *非零环绕* 或者 *奇偶环绕规则*。

- **语法**

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

> Path2D：这是一个实验中的功能。的接口 Path2D 用来声明路径，此路径稍后会被 CanvasRenderingContext2D 对象使用。CanvasRenderingContext2D 接口的 *路径方法* 也存在于 Path2D 这个接口中，允许你在 canvas 中根据需要创建可以保留并重用的路径。

#### 2.2.4.`ctx.stroke()`

使用 *非零环绕规则*，根据当前的画线样式，绘制当前或已经存在的路径的方法。

```js
ctx.stroke();
ctx.stroke(path);
```

#### 2.2.5.`ctx.moveTo()`

将一个新的子路径的起始点移动到 `(x，y)` 坐标的方法。

```js
ctx.moveTo(x, y);
```

当 canvas 初始化或者 `beginPath()` 调用后，通常会使用 `moveTo()` 函数设置起点，也能够使用 `moveTo()` 绘制一些不连续的路径。

#### 2.2.6.`ctx.lineTo()`

使用直线连接子路径的终点到 `(x，y)` 坐标的方法（并不会真正地绘制）。

```js
lineTo(x, y);
```

> 使用 `beginPath()` 绘制路径的起始点，使用 `moveTo()` 移动画笔，使用 `stroke()` 方法真正地画线。

#### 2.2.7.`ctx.arc()`

绘制圆弧路径的方法。圆弧路径的圆心在 `(x, y)` 位置，半径为 `r`，根据 `anticlockwise` （默认为顺时针）指定的方向从 `startAngle` 开始绘制，到 `endAngle` 结束。

```js
arc(x, y, radius, startAngle, endAngle[, anticlockwise]);
```

> 注意：`arc()` 函数中表示角的单位是弧度，不是角度。角度与弧度的表达式：`弧度 = (Math.PI / 180) * 角度`。

#### 2.2.8.`ctx.arcTo()`

根据控制点和半径绘制圆弧路径，使用当前的描点（前一个 `moveTo` 或 `lineTo` 等函数的止点）。根据当前描点与给定的控制点 1 连接的直线，和控制点 1 与控制点 2 连接的直线，作为使用指定半径的圆的切线，画出两条切线之间的弧线路径。

```js
ctx.arcTo(x1, y1, x2, y2, radius);
```

> 三个点：当前点 X，控制点 A 和 B，X-A 和 A-B 内切圆（radius）的交线。

#### 2.2.9.`ctx.quadraticCurveTo()`

新增二次贝塞尔曲线路径的方法。它需要 2 个点。第一个点是控制点，第二个点是终点。起始点是当前路径最新的点，当创建二次贝赛尔曲线之前，可以使用 `moveTo()` 方法进行改变。

```js
ctx.quadraticCurveTo(cpx, cpy, x, y);
```

> 三个点：起始点 A，控制点 X，终点点 B，根据 X 连接 A - B。

#### 2.2.10.`ctx.bezierCurveTo()`

绘制三次贝赛尔曲线路径的方法。 该方法需要三个点。 第一、第二个点是控制点，第三个点是结束点。起始点是当前路径的最后一个点，绘制贝赛尔曲线前，可以通过调用 `moveTo()` 进行修改。

```js
ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
```

> 四个点：起始点 A，控制点 X 和 Y，终点点 B，根据 X & Y 连接 A - B。

#### 2.2.11.`ctx.rect()`

创建矩形路径的方法，矩形的起点位置是 `(x, y)`，尺寸为 `width` 和 `height`。矩形的 4 个点通过直线连接，子路径做为闭合的标记，所以你可以填充或者描边矩形。

```js
ctx.rect(x, y, width, height);
```

### 2.3.Path2D 对象

为了简化代码和提高性能，Path2D 对象已可以在较新版本的浏览器中使用，用来缓存或记录绘画命令，这样你将能快速地回顾路径。

#### 2.3.1.`Path2D()`

`Path2D()` 会返回一个新初始化的 Path2D 对象（可能将某一个路径作为变量——创建一个它的副本，或者将一个包含 SVG path 数据的字符串作为变量）。

```js
new Path2D();     // 空的 Path 对象
new Path2D(path); // 克隆 Path 对象
new Path2D(d);    // 从 SVG 建立 Path 对象
```

#### 2.3.2.`Path2D.addPath()`

根据指定路径变量添加路径的方法。

```js
path.addPath(path [, transform]);
```

- `path`
  - 需要添加的 Path2D 路径。
- `transform` 【可选】
  - `SVGMatrix` 作为新增路径的变换矩阵。

> `SVGMatrix` 该特性已经从 Web 标准中删除，虽然一些浏览器目前仍然支持它，但也许会在未来的某个时间停止支持，请尽量不要使用该特性。

## 3. 使用样式与颜色

### 3.1. 色彩

如果我们想要给图形上色，有两个重要的属性可以做到：`fillStyle` 和 `strokeStyle`。

> 一旦您设置了 `strokeStyle` 或者 `fillStyle` 的值，那么这个新值就会成为新绘制的图形的默认值。如果要给每个图形上不同的颜色，需要重新设置 `fillStyle` 或 `strokeStyle` 的值。

#### 3.1.1.`ctx.fillStyle`

使用内部方式描述颜色和样式的属性。默认值是 `#000`（黑色）。

```js
ctx.fillStyle = color;
ctx.fillStyle = gradient;
ctx.fillStyle = pattern;
```

- `color`
  - DOMString 字符串，被转换成 CSS `<color>` 颜色值。
- `gradient`
  - CanvasGradient 对象 （线性渐变或者放射性渐变）。
- `pattern`
  - CanvasPattern 对象 （可重复图像）。

```js
//  符合 *CSS3 颜色值标准* 的有效字符串
ctx.fillStyle = "orange";
ctx.fillStyle = "#FFA500";
ctx.fillStyle = "rgb(255,165,0)";
ctx.fillStyle = "rgba(255,165,0,1)";
```

#### 3.1.2.`ctx.strokeStyle`

描述画笔（绘制图形）颜色或者样式的属性。默认值是 `#000`。

```js
ctx.strokeStyle = color;
ctx.strokeStyle = gradient;
ctx.strokeStyle = pattern;
```

### 3.2. 透明度 Transparency

除了可以绘制实色图形，我们还可以用 canvas 来绘制半透明的图形。通过设置 `globalAlpha` 属性或者使用一个半透明颜色作为轮廓或填充的样式。

#### 3.2.1.`ctx.globalAlpha`

用来描述在 canvas 上绘图之前，设置图形和图片透明度的属性。 数值的范围从 0.0 （完全透明）到 1.0 （完全不透明）。默认值是 1.0。 如果数值不在范围内，包括 `Infinity` 和 `NaN` ，无法赋值，并且 `globalAlpha` 会保持原有的数值。

`globalAlpha` 属性在需要绘制大量拥有相同透明度的图形时候相当高效。不过，我认为下面的方法可操作性更强一点。因为 `strokeStyle` 和 `fillStyle` 属性接受符合 CSS 3 规范的颜色值，可以用下面的写法来设置具有透明度的颜色。

```js
// 指定透明颜色，用于描边和填充样式
ctx.strokeStyle = "rgba(255,0,0,0.5)";
ctx.fillStyle = "rgba(255,0,0,0.5)";
```

### 3.3. 线型

#### 3.3.1.`ctx.lineWidth`

 设置线段厚度的属性（即线段的宽度）。线宽是指给定路径的中心到两边的粗细。换句话说就是在路径的两边各绘制线宽的一半。因为画布的坐标并不和像素直接对应，当需要获得精确的水平或垂直线的时候要特别注意。

 > 线可以通过 `stroke()`, `strokeRect()`, 和 `strokeText()` 方法绘制。

```js
ctx.lineWidth = value;
```

> 0、 负数、`Infinity` 和 `NaN` 会被忽略。

#### 3.3.2.`ctx.lineCap`

指定如何绘制每一条线段末端的属性。

```js
ctx.lineCap = "butt";
```

- `butt` （默认值）
  - 线段末端以方形结束。
- `round`
  - 线段末端以圆形结束。
- `square`
  - 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

#### 3.3.3.`ctx.lineJoin`

用来设置 2 个长度不为 0 的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为 0 的变形部分，其指定的末端和控制点在同一位置，会被忽略）。

```js
ctx.lineJoin = "round";
```

- `round`
  - 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
- `bevel`
  - 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
- `miter` （默认值）
  - 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置可以通过 `miterLimit` 属性看到效果。

> 基于 WebKit- 和 Blink- 的浏览器中， 实现了一个不标准的并且不赞成使用的方法 `ctx.setLineJoin()`。

#### 3.3.4.`ctx.miterLimit`

设置斜接面限制比例的属性。 当获取属性值时， 会返回当前的值（默认值是 10.0 ）。

线段之间夹角比较大时，交点不会太远，但随着夹角变小，交点距离会呈指数级增大。

`miterLimit` 属性就是用来设定外延交点与连接点的最大距离，如果交点距离大于此值，连接效果会变成了 `bevel`。注意，最大斜接长度（即交点距离）是当前坐标系测量线宽与此 `miterLimit` 属性值（HTML `<canvas>` 默认为 10.0）的乘积，所以 `miterLimit` 可以单独设置，不受显示比例改变或任何仿射变换的影响：它只影响线条边缘的有效绘制形状。

```js
ctx.miterLimit = value;
```

当给属性赋值时， 0、负数、 `Infinity` 和 `NaN` 都会被忽略；除此之外都会被赋予一个新值。

只有当 `lineJoin` 显示为 "`>`"  时，`miterLimit` 才有效。边角的角度越小，斜接长度就会越大。为了避免斜接长度过长，我们可以使用 `miterLimit` 属性。如果斜接长度超过 `miterLimit` 的值，边角会以 `lineJoin` 的 " ] " 类型来显示。

#### 3.3.5.`ctx.getLineDash()`

获取当前线段样式的方法。返回一个 Array 数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。如果数组元素的数量是奇数，数组元素会被复制并重复。 例如， 设置线段为 `[5, 15, 25]` 将会得到以下返回值 `[5, 15, 25, 5, 15, 25]`。

```js
ctx.getLineDash();
```

#### 3.3.6.`ctx.setLineDash()`

在填充线时使用虚线模式。 它使用一组值来指定描述模式的线和间隙的交替长度。

```js
ctx.setLineDash(segments);
```

- `segments`
  - 一个 Array 数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。

返回值：`undefined`。

#### 3.3.7.`ctx.lineDashOffset`

设置虚线起始偏移量，例如可以实现 “蚂蚁线“ 的效果。

```js
ctx.lineDashOffset = value;
```

- `value`
  - 偏移量是 `float` 精度的数字。 初始值为 0.0。

### 3.4. 渐变 Gradients

#### 3.4.1.`ctx.createLinearGradient()`

创建一个沿参数坐标指定的 **线性渐变**（linear gradients）。该方法返回一个线性 `CanvasGradient` 对象。想要应用这个渐变，需要把这个返回值赋值给 `fillStyle` 或者 `strokeStyle`。

```js
ctx.createLinearGradient(x0, y0, x1, y1);
```

方法需要指定四个参数，分别表示渐变线段的开始和结束点。

#### 3.4.2.`ctx.createRadialGradient()`

根据参数确定两个圆的坐标，绘制 **径向渐变**（radial gradients）的方法。这个方法返回 `CanvasGradient`。

```js
ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
```

#### 3.4.3.`ctx.addColorStop()`

添加一个由偏移值和颜色值指定的断点到渐变。如果偏移值不在 0 到 1 之间，将抛出 `INDEX_SIZE_ERR` 错误，如果颜色值不能被解析为有效的 CSS 颜色值  `<color>`，将抛出 `SYNTAX_ERR` 错误。

```js
gradient.addColorStop(offset, color);
```

- `offset`
  - 0 到 1 之间的值，超出范围将抛出 `INDEX_SIZE_ERR` 错误。
- `color`
  - CSS 颜色值 `<color>`。如果颜色值不能被解析为有效的 CSS 颜色值 `<color>`，将抛出 `SYNTAX_ERR` 错误。

### 3.5. 图案样式 Patterns

#### 3.5.1.`ctx.createPattern()`

使用指定的图像 (CanvasImageSource) 创建模式的方法。 它通过 `repetition` 参数在指定的方向上重复元图像。此方法返回一个 `CanvasPattern` 对象。

```js
ctx.createPattern(image, repetition);
```

- `image`
作为重复图像源的 `CanvasImageSource` 对象。可以是下列之一：
  - `HTMLImageElement` (`<img>`)
  - `HTMLVideoElement` (`<video>`)
  - `HTMLCanvasElement` (`<canvas>`)
  - `CanvasRenderingContext2D`
  - `ImageBitmap`
  - `ImageData`
  - `Blob`
- `repetition`
`DOMString`，指定如何重复图像。允许的值有：
  - `"repeat"` (both directions)
  - `"repeat-x"` (horizontal only)
  - `"repeat-y"` (vertical only)
  - `"no-repeat"` (neither)
如果为空字符串 (`''`) 或 `null` （但不是 `undefined`)，`repetition` 将被当作 `"repeat"`。

### 3.6. 阴影 Shadows

#### 3.6.1.`ctx.shadowOffsetX / ctx.shadowOffsetY`

描述阴影 *水平 / 垂直* 偏移距离的属性。

```js
ctx.shadowOffsetX = offset;
ctx.shadowOffsetY = offset;
```

- `offset`
  - 阴影水平偏移距离的 `float` 类型的值。默认值是 0。  `Infinity` 或者 `NaN` 都会被忽略。

> 不受变换矩阵所影响的。正右负左，正下负上。

#### 3.6.2.`ctx.shadowBlur`

描述模糊效果程度的属性； 它既不对应像素值也不受当前转换矩阵的影响。 默认值是 0。

```js
ctx.shadowBlur = level;
```

- `level`
  - 描述模糊效果程度的，`float` 类型的值。默认值是 0。 负数、 `Infinity` 或者 `NaN` 都会被忽略。

> 注意：只有设置 `shadowColor` 属性值为不透明，阴影才会被绘制。

#### 3.6.3.`ctx.shadowColor`

描述阴影颜色的属性。

```js
ctx.shadowColor = color;
```

- `color`
  - 可以转换成 CSS `<color>` 值的 DOMString 字符串。 默认值是 fully-transparent black。

> 注意：`shadowColor` 属性设置成不透明的，并且 `shadowBlur`、 `shadowOffsetX` 或者 `shadowOffsetY` 属性不为 0，阴影才会被绘制。

### 3.7.Canvas 填充规则

当我们用到 `fill`（或者 `clip` 和 `isPointinPath`）你可以选择一个填充规则，该填充规则根据某处在路径的外面或者里面来决定该处是否被填充，这对于自己与自己路径相交或者路径被嵌套的时候是有用的。

两个可能的值：

- `"nonzero"`：non-zero winding rule，默认值。
- `"evenodd"`：even-odd winding rule。

详见 [rule](./rule.md)

## 4. 绘制文本

### 4.1. 绘制文本

#### 1.`ctx.fillText() / ctx.strokeText()`

在 `(x, y)` 位置 *填充 / 绘制* 文本的方法。

```js
ctx.fillText(text, x, y, [maxWidth]);
ctx.strokeText(text, x, y [, maxWidth]);
```

- `text`
  - 使用当前的 `font`, `textAlign`, `textBaseline` 和 `direction` 值对文本进行渲染。
- `x`
  - 文本起点的 `x` 轴坐标。
- `y`
  - 文本起点的 `y` 轴坐标。
- `maxWidth` 【可选】
  - 绘制的最大宽度。如果指定了值，并且经过计算字符串的值比最大宽度还要宽，字体为了适应会水平缩放（如果通过水平缩放当前字体，可以进行有效的或者合理可读的处理）或者使用小号的字体。（但是不会放大）

### 二。有样式的文本

#### 1.`ctx.font`

描述绘制文字时，当前字体样式的属性。

```js
ctx.font = value;
```

- `value`
  - 符合 CSS font 语法的 DOMString 字符串。默认字体是 `10px sans-serif`。

#### 2.`ctx.textAlign`

描述绘制文本时，文本的对齐方式的属性。注意，该对齐是基于 `ctx.fillText` 方法的 `x` 的值。所以如果 `textAlign="center"`，那么该文本将画在 `x-50%*width`。

> 这里的 `textAlign="center"` 比较特殊。`textAlign` 的值为 `center` 时候文本的居中是基于你在 `fillText` 的时候所给的 `x` 的值，也就是说文本一半在 x 的左边，一半在 `x` 的右边（可以理解为计算 `x` 的位置时从默认文字的左端，改为文字的中心，因此你只需要考虑 `x` 的位置即可）。所以，如果你想让文本在整个 canvas 居中，就需要将 `fillText` 的 `x` 值设置成 canvas 的宽度的一半。

```js
// 默认值是 start
ctx.textAlign = "left" || "right" || "center" || "start" || "end";
```

> `direction` 属性会对此属性产生影响。如果 `direction` 属性设置为 `ltr`，则 `left` 和 `start` 的效果相同，`right` 和 `end` 的效果相同；如果 `direction` 属性设置为 `rtl`，则 `left` 和 `end` 的效果相同，`right` 和 `start` 的效果相同。

#### 3.`ctx.textBaseline`

描述绘制文本时，当前文本基线（垂直方向的对齐方式）的属性。

```js
ctx.textBaseline = "top" || "hanging" || "middle" || "alphabetic" || "ideographic" || "bottom";
```

- `top`
  - 文本基线在文本块的顶部。
- `hanging`
  - 文本基线是悬挂基线。
- `middle`
  - 文本基线在文本块的中间。
- `alphabetic` 【默认值】
  - 文本基线是标准的字母基线。
- `ideographic`
  - 文字基线是表意字基线；如果字符本身超出了 `alphabetic` 基线，那么 `ideograhpic` 基线位置在字符本身的底部。
- `bottom`
  - 文本基线在文本块的底部。 与 `ideographic` 基线的区别在于 `ideographic` 基线不需要考虑下行字母。

![baselines](http://www.whatwg.org/specs/web-apps/current-work/images/baselines.png)

#### 4.`ctx.direction` :mag:Experimental

用来在绘制文本时，描述当前文本方向的属性。

```js
ctx.direction = "ltr" || "rtl" || "inherit";
```

- `ltr`
  - 文本方向从左向右。
- `rtl`
  - 文本方向从右向左。
- `inherit` 【默认值】
  - 根据情况继承 `<canvas>` 元素或者 Document 。

> 实际没有改变文本（字母和汉字的顺序），只改变了标点符号与文本的顺序。同时起点反转了，但是像素坐标没变（即设置像素点，依旧以左边为基准）。

### 三。预测量文本宽度

#### 1.`ctx.measureText()`

返回一个关于被测量文本 `TextMetrics` 对象包含的信息（例如它的宽度）。

```js
ctx.measureText(text);
```

## 使用图像

可以用于动态的图像合成或者作为图形的背景，以及游戏界面（Sprites）等等。浏览器支持的任意格式的外部图片都可以使用，比如 PNG、GIF 或者 JPEG。 你甚至可以将同一个页面中其他 canvas 元素生成的图片作为图片源。

引入图像到 canvas 里需要以下两步基本操作：

1. 获得一个指向 `HTMLImageElement` 的对象或者另一个 canvas 元素的引用作为源，也可以通过提供一个 UR L 的方式来使用图片（参见例子）；
2. 使用 `drawImage()` 函数将图片绘制到画布上。

### 一。获得需要绘制的图片

canvas 的 API 可以使用下面这些类型中的一种作为图片的源：

- `HTMLImageElement`
  - 这些图片是由 Image() 函数构造出来的，或者任何的 `<img>` 元素；
- `HTMLVideoElement`
  - 用一个 HTML 的 `<video>` 元素作为你的图片源，可以从视频中抓取当前帧作为一个图像；
- `HTMLCanvasElement`
  - 可以使用另一个 `<canvas>` 元素作为你的图片源；
- `ImageBitmap`
  - 这是一个高性能的位图，可以低延迟地绘制，它可以从上述的所有源以及其它几种源中生成；

这些源统一由 `CanvasImageSource` 类型来引用。

#### 1. 使用相同页面内的图片

我们可以通过下列方法的一种来获得与 canvas 相同页面内的图片的引用：

- `document.images` 集合（返回当前文档中所有 `image` 元素的集合）；
- `document.getElementsByTagName()/document.getElementById()` 等方法；

#### 2. 使用其它域名下的图片

在 HTMLImageElement 上使用 `crossOrigin` 属性，你可以请求加载其它域名上的图片。如果图片的服务器允许跨域访问这个图片，那么你可以使用这个图片而不污染 canvas，否则，使用这个图片将会污染 canvas。

> 在 HTML5 中，一些 HTML 元素提供了对 CORS 的支持， 例如 `<audio>`、`<img>`、`<link>`、`<script>` 和 `<video>` 均有一个跨域属性 (crossOrigin property)，它允许你配置元素获取数据的 CORS 请求。

#### 3. 使用其它 canvas 元素

和引用页面内的图片类似地，用 `document.getElementsByTagName` 或 `document.getElementById` 方法来获取其它 canvas 元素。但引入的应该是已经准备好的 canvas。

> 一个常用的应用就是将第二个 canvas  作为另一个大的 canvas 的缩略图。

#### 4. 由零开始创建图像

可以用脚本创建一个新的 HTMLImageElement 对象。要实现这个方法，我们可以使用很方便的 `Image()` 构造函数。

```js
var img = new Image();   // 创建一个 img 元素
img.src = 'myImage.png'; // 设置图片源地址
```

当脚本执行后，图片开始装载。

若调用 `drawImage` 时，图片没装载完，那什么都不会发生（在一些旧的浏览器中可能会抛出异常）。因此应该用 `load` 事件来保证不会在加载完毕之前使用这个图片：

```js
var img = new Image();   // 创建 img 元 素
img.onload = function(){
  // 执行 drawImage 语句
}
img.src = 'myImage.png'; // 设置图片源地址
```

#### 5. 通过 `data: url` 方式嵌入图像

我们还可以通过 `data: url` 方式来引用图像。Data urls 允许用一串 Base64 编码的字符串的方式来定义一个图片。

```js
img.src = 'data:image/gif;base64,R0lGODlhCwALAIAAAAAA3pn/ZiH5BAEAAAEALAAAAAALAAsAAAIUhA+hkcuO4lmNVindo7qyrIXiGBYAOw==';
```

其优点就是图片内容即时可用，无须再到服务器兜一圈。（还有一个优点是，可以将 CSS，JavaScript，HTML 和 图片全部封装在一起，迁移起来十分方便。）缺点就是图像没法缓存，图片大的话内嵌的 `url` 数据会相当的长。

#### 6. 使用视频帧

还可以使用 `<video>` 中的视频帧（即便视频是不可见的）。

```js
function getMyVideo() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    return document.getElementById('myvideo');
  }
}
```

它将为这个视频返回 `HTMLVideoElement` 对象，正如前面提到的，它可以作为我们的 Canvas 图片源。

### 二。绘制图片

一旦获得了源图对象，我们就可以使用 `drawImage` 方法将它渲染到 canvas 里。

#### 1.`drawImage(image, x, y)`

其中 `image` 是 `image` 或者 `canvas` 对象，`x` 和 `y` 是其在目标 canvas 里的起始坐标。

> SVG 图像必须在 `<svg>` 根指定元素的宽度和高度。

`drawImage()` 方法在绘制时使用源元素的 CSS 大小。

**抛出异常**

- `INDEX_SIZE_ERR`
  - 如果 canvas 或者图像矩形区域的宽度或高度为 0 。
- `INVALID_STATE_ERR`
  - 图像没有数据。
- `TYPE_MISMATCH_ERR`
  - 提供的原始元素不支持。
- `NS_ERROR_NOT_AVAILABLE`
  - 图像尚未加载。使用 `.complete === true` 和 `.onload` 确定何时准备就绪。

#### 2. 缩放 Scaling

```js
ctx.drawImage(image, x, y, width, height);
```

这个方法多了 2 个参数：`width` 和 `height`，这两个参数用来控制 当向 canvas 画入时应该缩放的大小。

> 图像可能会因为大幅度的缩放而变得起杂点或者模糊。如果图像里面有文字，那么最好还是不要进行缩放，因为那样处理之后很可能图像里的文字就会变得无法辨认了。

#### 3. 切片 Slicing

```js
ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
```

前 4 个是定义图像源的切片位置和大小，后 4 个则是定义切片的目标显示位置和大小。

![slicing](https://developer.mozilla.org/@api/deki/files/79/=Canvas_drawimage.jpg)

### 三。控制图像的缩放行为

过度缩放图像可能会导致图像模糊或像素化。可以通过使用绘图环境的 `imageSmoothingEnabled` 属性来控制是否在缩放图像时使用平滑算法。默认值为 `true`，即启用平滑缩放。也可以像这样禁用此功能：

```js
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
```
