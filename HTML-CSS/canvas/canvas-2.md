# Canvas

## 1.变形

变形是一种更强大的方法，可以将原点移动到另一点、对网格进行旋转和缩放。

### 1.1.状态的保存和恢复

#### 1.1.1.`ctx.save`

通过将当前状态放入栈中，保存 `canvas` 全部状态的方法。

```js
ctx.save();
```

保存到栈中的绘制状态有下面部分组成：

- 当前的变换矩阵；
- 当前的剪切区域；
- 当前的虚线列表；
>
- 以下属性当前的值：
  - `strokeStyle`, `fillStyle`；
  - `globalAlpha`；
  - `lineWidth`, `lineCap`, `lineJoin`, `miterLimit`, `lineDashOffset`；
  - `shadowOffsetX`, `shadowOffsetY`, `shadowBlur`, `shadowColor`,
  - `globalCompositeOperation`；
  - `font`, `textAlign`, `textBaseline`, `direction`；
  - `imageSmoothingEnabled`；

> Canvas 的状态就是当前画面应用的所有样式和变形的一个快照。

#### 1.1.2.`ctx.restore`

通过在绘图状态栈中弹出顶端的状态，将 `canvas` 恢复到最近的保存状态的方法。如果没有保存状态，此方法不做任何改变。

```js
ctx.restore();
```

### 1.2.移动

#### 1.2.1.`ctx.translate`

将 canvas 按原始 `x` 点的水平方向、原始的 `y` 点垂直方向进行平移变换。

```js
ctx.translate(x, y);
```

在做变形之前先保存状态是一个良好的习惯。大多数情况下，调用 `restore` 方法比手动恢复原先的状态要简单得多。如果在一个循环中做位移但没有保存和恢复 canvas 的状态，很可能到最后会发现怎么有些东西不见了，那是因为它很可能已经超出 canvas 范围以外了。

### 1.3.旋转

#### 1.3.1.`ctx.rotate`

在变换矩阵中增加旋转。角度变量表示一个顺时针旋转角度并且用弧度表示。

```js
ctx.rotate(angle);
```

- `angle`
  - 顺时针旋转的弧度。如果你想通过角度值计算，可以使用公式： `degree * Math.PI / 180` 。

> 旋转中心点一直是 canvas 的起始点。 如果想改变中心点，可以通过 `translate` 方法移动 canvas 。

### 1.4.缩放

#### 1.4.1.`ctx.scale`

根据 `x` 水平方向和 `y` 垂直方向，为 canvas 单位添加缩放变换。

```js
ctx.scale(x, y);
```

两个参数都是实数，可以为负数，如果比 1 小，会缩小图形， 如果比 1 大会放大图形。默认值为 1， 为实际大小。

画布初始情况下， 是以左上角坐标为原点的第一象限。如果参数为负实数， 相当于以 x 或 y 轴作为对称轴镜像反转（例如， 使用 `translate(0,canvas.height); scale(1,-1);` 以 y 轴作为对称轴镜像反转， 就可得到著名的笛卡尔坐标系，左下角为原点）。

默认的， 在 canvas 中一个单位实际上就是一个像素。例如，如果我们将 0.5 作为缩放因子，最终的单位会变成 0.5 像素，并且形状的尺寸会变成原来的一半。相似的方式，我们将 2.0 作为缩放因子，将会增大单位尺寸变成 2 像素。形状的尺寸将会变成原来的两倍。

> 可以使用 `ctx.scale(-1, 1)` 水平翻转上下文，使用 `ctx.scale(1, -1)` 垂直翻转上下文。

### 1.5.变形

#### 1.5.1.`ctx.transform`

使用矩阵多次叠加当前变换，矩阵由方法的参数进行描述。可以缩放、旋转、移动和倾斜上下文。

> 这个方法使用单位矩阵重新设置当前的变换并且会调用 `transform`。

```js
ctx.transform(a, b, c, d, e, f);
```

- `a (m11)`
  - 水平缩放。
>
- `b (m12)`
  - 垂直倾斜。
>
- `c (m21)`
  - 水平倾斜。
>
- `d (m22)`
  - 垂直缩放。
>
- `e (dx)`
  - 水平移动。
>
- `f (dy)`
  - 垂直移动。

> 如果任意一个参数是 `Infinity`，变形矩阵也必须被标记为无限大，否则会抛出异常。

#### 1.5.2.`ctx.setTransform`

使用 *单位矩阵* 重新设置（覆盖）当前的变换并调用变换，此变换由方法的变量进行描述。

> 从根本上来说，该方法是取消了当前变形，然后设置为指定的变形，一步完成。这个方法不会覆盖当前的变换矩阵，会多次叠加变换。

```js
ctx.setTransform(a, b, c, d, e, f);
```

#### 1.5.3.`ctx.resetTransform` :mag:Experimental

使用单位矩阵重新设置当前变形。和调用以下语句是一样的：`ctx.setTransform(1, 0, 0, 1, 0, 0);`。

```js
ctx.resetTransform();
```

## 2.合成和剪辑

## 2.1.组合 Compositing

不仅可以在已有图形后面再画新图形，还可以用来遮盖指定区域，清除画布中的某些部分（清除区域不仅限于矩形，像 `clearRect()` 方法做的那样）以及更多其他操作。

### 2.1.1.`ctx.globalCompositeOperation`

设定了在画新图形时采用的遮盖策略，其值是一个标识遮盖方式的字符串。

```js
ctx.globalCompositeOperation = type;
```

> [图](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)

- `source-over`
  - 这是默认设置，并在现有画布上下文之上绘制新图形。
>
- `source-in`
  - 新图形只在新图形和目标画布重叠的地方绘制。其他的都是透明的。
>
- `source-out`
  - 在不与现有画布内容重叠的地方绘制新图形。
>
- `source-atop`
  - 新图形只在与现有画布内容重叠的地方绘制。
>
- `destination-over`
  - 在现有的画布内容后面绘制新的图形。
>
- `destination-in`
  - 现有的画布内容保持在新图形和现有画布内容重叠的位置。其他的都是透明的。
>
- `destination-out`
  - 现有内容保持在新图形不重叠的地方。
>
- `destination-atop`
  - 现有的画布只保留与新图形重叠的部分，新的图形是在画布内容后面绘制的。
>
- `lighter`
  - 两个重叠图形的颜色是通过颜色值相加来确定的。
>
- `copy`
  - 只显示新图形。
>
- `xor`
  - 图像中，那些重叠和正常绘制之外的其他地方是透明的。
>
- `multiply`
  - 将顶层像素与底层相应像素相乘，结果是一幅更黑暗的图片。
>
- `screen`
  - 像素被倒转，相乘，再倒转，结果是一幅更明亮的图片。
>
- `overlay`
  - `multiply` 和 `screen` 的结合，原本暗的地方更暗，原本亮的地方更亮。
>
- `darken`
  - 保留两个图层中最暗的像素。
>
- `lighten`
  - 保留两个图层中最亮的像素。
>
- `color-dodge`
  - 将底层除以顶层的反置。
>
- `color-burn`
  - 将反置的底层除以顶层，然后将结果反过来。
>
- `hard-light`
  - 屏幕相乘（A combination of multiply and screen）类似于叠加，但上下图层互换了。
>
- `soft-light`
  - 用顶层减去底层或者相反来得到一个正值。
>
- `difference`
  - 一个柔和版本的强光（hard-light）。纯黑或纯白不会导致纯黑或纯白。
>
- `exclusion`
  - 和 `difference` 相似，但对比度较低。
>
- `hue`
  - 保留了底层的亮度（luma）和色度（chroma），同时采用了顶层的色调（hue）。
>
- `saturation`
  - 保留底层的亮度（luma）和色调（hue），同时采用顶层的色度（chroma）。
>
- `color`
  - 保留了底层的亮度（luma），同时采用了顶层的色调 (hue) 和色度 (chroma)。
>
- `luminosity`
  - 保持底层的色调（hue）和色度（chroma），同时采用顶层的亮度（luma）。

### 2.2.裁切路径

裁切路径和普通的 canvas 图形差不多，不同的是它的作用是遮罩，用来隐藏不需要的部分。

和 `globalCompositeOperation` 比较，它可以实现与 `source-in` 和 `source-atop` 差不多的效果。最重要的区别是裁切路径不会在 canvas 上绘制东西，而且它永远不受新图形的影响。这些特性使得它在特定区域里绘制图形时相当好用。

#### 2.2.1.`ctx.clip`

当前创建的路径设置为当前剪切路径。

```js
ctx.clip();
ctx.clip(fillRule);
ctx.clip(path, fillRule);
```

## 3.基本动画

可能最大的限制就是图像一旦绘制出来，它就是一直保持那样了。如果需要移动它，我们不得不对所有东西（包括之前的）进行重绘。重绘是相当费时的，而且性能很依赖于电脑的速度。

### 3.1.动画的基本步骤

可以通过以下的步骤来画出一帧：

1. **清空 canvas**
  除非接下来要画的内容会完全充满 canvas （例如背景图），否则就需要清空所有。最简单的做法就是用 `clearRect` 方法。
>
2. **保存 canvas 状态**
  如果要改变一些会改变 canvas 状态的设置（样式，变形之类的），又要在每画一帧之时都是原始状态的话，需要先保存一下。
>
3. **绘制动画图形**（animated shapes）
  这一步才是重绘动画帧。
>
4. **恢复 canvas 状态**
  如果已经保存了 canvas 的状态，可以先恢复它，然后重绘下一帧。

### 3.2.操控动画

为了实现动画，我们需要一些可以定时执行重绘的方法。有两种方法可以实现这样的动画操控。

首先，可以用 `window.setInterval`, `window.setTimeout` 和 `window.requestAnimationFrame` 来设定定期执行一个指定函数。

```js
// 当设定好间隔时间后，function 会定期执行。
setInterval(function, delay);

// 在设定好的时间之后执行函数
setTimeout(function, delay);

// 告诉浏览器执行一个动画，并在重绘之前，
// 请求浏览器执行一个特定的函数来更新动画。
window.requestAnimationFrame(callback);
```

### 4.像素处理

#### 4.1.`ImageData` 对象

`ImageData` 对象中存储着 canvas 对象真实的像素数据，它包含以下几个只读属性：

- `width`
  - 图片宽度，单位是像素
>
- `height`
  - 图片高度，单位是像素
>
- `data`
  - `Uint8ClampedArray` 类型的一维数组，包含着 RGBA`格式的整型数据，范围在 0 至 255 之间（包括 255）。

`Uint8ClampedArray`  包含 `高度 × 宽度 × 4 bytes` 数据，索引值从 0 到 `（高度×宽度×4)-1`。

例如，要读取图片中位于第 50 行，第 200 列的像素的 R/G/B/A 值：

```js
blueComponent = imageData.data[((50 * (imageData.width * 4)) + (200 * 4)) + 0/1/2/3];
```

#### 4.1.1.创建一个 `ImageData` 对象

```js
// 创建一个新的，空白的 `ImageData` 对象
var myImageData = ctx.createImageData(width, height);

// 创建一个被 `anotherImageData` 对象指定的相同像素的 `ImageData` 对象
var myImageData = ctx.createImageData(anotherImageData);
```

> 所有像素被预设为透明黑。

#### 4.1.2.得到场景像素数据

```js
var myImageData = ctx.getImageData(left, top, width, height);
```

这个方法会返回一个 `ImageData` 对象，它代表了画布区域的对象数据，此画布的四个角落分别表示为 `(left, top)`, `(left + width, top)`, `(left, top + height)`, 以及 `(left + width, top + height)` 四个点。这些坐标点被设定为画布坐标空间元素。

任何在画布以外的元素都会被返回成一个透明黑的 `ImageData` 对像。

> [demo](https://github.com/richardmyu/CSS-And-JS-Animate/tree/master/canvas/basic/imagedata.html)

#### 4.1.3.在场景中写入像素数据

```js
ctx.putImageData(myImageData, dx, dy);
```

> [demo](https://github.com/richardmyu/CSS-And-JS-Animate/tree/master/canvas/basic/imagedata_2.html)

### 4.2.保存图片

#### 4.2.1.`canvas.toDataURL`

返回一个包含图片展示的 data URI 。可以使用 `type` 参数其类型，默认为 PNG 格式。图片的分辨率为 96dpi。

- 如果画布的高度或宽度是 0，那么会返回字符串 “`data:,`”。
- 如果传入的类型非 “`image/png`”，但是返回的值以 “`data:image/png`” 开头，那么该传入的类型是不支持的。
- Chrome 支持 “`image/webp`” 类型。

```js
canvas.toDataURL(type, encoderOptions);
```

- `type` 【可选】
  - 图片格式，默认为 `image/png`；
- `encoderOptions` 【可选】
  - 在指定图片格式为 `image/jpeg` 或 `image/webp` 的情况下，可以从 0 到 1 的区间内选择图片的质量（1 表示最好品质，0 基本不被辨析但有比较小的文件大小）。如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略。

> 当你从画布中生成了一个数据链接，例如，你可以将它用于任何 `<image>` 元素，或者将它放在一个有 `download` 属性的超链接里用于保存到本地。`jpeg` 默认黑色背景。

#### 4.2.2.`canvas.toBlob(callback, type, encoderOptions)`

创造 `Blob` 对象，用以展示 canvas 上的图片；这个图片文件可以被缓存或保存到本地，由用户代理端自行决定。如不特别指明，图片的类型默认为 `image/png`，分辨率为 96dpi。

```js
canvas.toBlob(callback, type, encoderOptions);
```

- `callback`
  - 回调函数，可获得一个单独的 `Blob` 对象参数。
- `type` 【可选】
  - `DOMString` 类型，指定图片格式，默认格式为 `image/png`。
- `encoderOptions` 【可选】
  - `Number` 类型，值在 0 与 1 之间，当请求图片格式为 `image/jpeg` 或者 `image/webp` 时用来指定图片展示质量。如果这个参数的值不在指定类型与范围之内，则使用默认值（0.92），其余参数将被忽略。

## 5.点击区域和无障碍访问

### 5.1.内容兼容

`<canvas>` 标签只是一个位图，它并不提供任何已经绘制在上面的对象的信息。 canvas 的内容不能像语义化的 HTML 一样暴露给一些协助工具。一般来说，应该避免在交互型的网站或者 App 上使用 canvas。

### 5.2.ARIA 规则

Accessible Rich Internet Applications (ARIA) 定义了让 Web 内容和 Web 应用更容易被有身体缺陷的人获取的办法。可以用 ARIA 属性来描述 canvas 元素的行为和存在目的。

ARIA 是一组特殊的易用性属性，可以添加到任意标签上，尤其适用于 HTML。`role` 属性定义了对象的通用类型（例如文章、警告，或幻灯片）。额外的 ARIA 属性提供了其他有用的特性，例如表单的描述或进度条的当前值。

### 5.3.点击区域

判断鼠标坐标是否在 canvas 上一个特定区域里一直是个有待解决的问题。 hit region API 让你可以在 canvas 上定义一个区域，这让无障碍工具获取 canvas 上的交互内容成为可能。它能让你更容易地进行点击检测并把事件转发到 DOM 元素去。这个 API 有以下三个方法：

- `CanvasRenderingContext2D.addHitRegion()`
  - 在 canvas 上添加一个点击区域。
- `CanvasRenderingContext2D.removeHitRegion()`
  - 从 canvas 上移除指定 id 的点击区域。
- `CanvasRenderingContext2D.clearHitRegions()`
  - 移除 canvas 上的所有点击区域。

> 均已废弃。慎用！

### 5.4.焦点圈

当用键盘控制时，焦点圈是一个能帮我们在页面上快速导航的标记。要在 canvas 上绘制焦点圈，可以使用 `drawFocusIfNeeded` 属性。

#### 5.4.1.`ctx.drawFocusIfNeeded`

（如果给定的元素获取了焦点）用来给当前路径或特定路径绘制焦点。

```js
ctx.drawFocusIfNeeded(element);
ctx.drawFocusIfNeeded(path, element);
```

#### 5.4.2.`ctx.scrollPathIntoView` :mag:Experimental

把当前的路径或者一个给定的路径滚动到显示区域内。

```js
ctx.scrollPathIntoView();
ctx.scrollPathIntoView(path);
```

## 6.优化

`<canvas>` 元素是众多广泛使用的网络 2D 图像渲染标准之一。它被广泛用于游戏及复杂的图像可视化中。然而，随着网站和应用将 canvas 画布推至极限，性能开始成为问题。

1. 在离屏 canvas 上预渲染相似的图形或重复的对象

如果发现自己在每个动画帧上重复了一些相同的绘制操作，请考虑将其分流到屏幕外的画布上。然后，可以根据需要频繁地将屏幕外图像渲染到主画布上，而不必首先重复生成该图像的步骤。
>
2. 避免浮点数的坐标点，用整数取而代之

当画一个没有整数坐标点的对象时会发生子像素渲染。浏览器为了达到抗锯齿的效果会做额外的运算。为了避免这种情况，请保证在你调用 `drawImage()` 函数时，用 `Math.floor()` 函数对所有的坐标点取整。
>
3. 不要在用 `drawImage` 时缩放图像

在离屏 canvas 中缓存图片的不同尺寸，而不要用 `drawImage()` 去缩放它们。
>
4. 使用多层画布去画一个复杂的场景

在应用程序中，如果会发现某些对象需要经常移动或更改，而其他对象则保持相对静态。在这种情况下，可能的优化是使用多个 `<canvas>` 元素对项目进行分层。
>
5. 用 CSS 设置大的背景图

如果像大多数游戏那样，有一张静态的背景图，用一个静态的 `<div>` 元素，结合 `background` 特性，以及将它置于画布元素之后。这么做可以避免在每一帧在画布上绘制大图。
>
6. 用 CSS `transforms` 特性缩放画布

CSS `transforms` 使用 GPU，因此速度更快。 最好的情况是不直接缩放画布，或者具有较小的画布并按比例放大，而不是较大的画布并按比例缩小。
>
7. 关闭透明度

如果游戏使用画布而且不需要透明，当使用 `HTMLCanvasElement.getContext()` 创建一个绘图上下文时把 `alpha` 选项设置为 `false` 。这个选项可以帮助浏览器进行内部优化。

```js
var ctx = canvas.getContext('2d', { alpha: false });
```
>
8. 将画布的函数调用集合到一起

例如，画一条折线，而不要画多条分开的直线。
>
9. 避免不必要的画布状态改变
>
10. 渲染画布中的不同点，而非整个新状态
>
11. 尽可能避免 `shadowBlur` 特性
>
12. 尽可能避免 `text rendering`
>
13. 尝试不同的方法来清除画布

`clearRect` vs. `fillRect` vs. 调整 canvas 大小。
>
14. 使用 `window.requestAnimationFrame` 而非 `window.setInterval`
>
15. 谨慎使用大型物理库

## 7.安全性和“被污染”的 canvas

由于在 `<canvas>` 位图中的像素可能来自多种来源，包括从其他主机检索的图像或视频，因此不可避免的会出现安全问题。

尽管不通过 CORS 就可以在 `<canvas>` 中使用其他来源的图片，但是这会污染画布，并且不再认为是安全的画布，这将可能在 `<canvas>` 检索数据过程中引发异常。

如果从外部引入的 HTML `<img>` 或 SVG `<svg>` ，并且图像源不符合规则，将会被阻止从 `<canvas>` 中读取数据。

在"被污染"的画布中调用以下方法将会抛出安全错误：

- 在 `<canvas>` 的上下文上调用 `getImageData`；
- 在 `<canvas>` 上调用 `toBlob`；
- 在 `<canvas>` 上调用 `toDataURL`。

这种机制可以避免未经许可拉取远程网站信息而导致的用户隐私泄露。

> [more](https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_enabled_image)
