# Canvas

## 变形

变形是一种更强大的方法，可以将原点移动到另一点、对网格进行旋转和缩放。

### 一.状态的保存和恢复

#### 1.`ctx.save()`

通过将当前状态放入栈中，保存 canvas 全部状态的方法。

```js
ctx.save();
```

保存到栈中的绘制状态有下面部分组成：

- 当前的变换矩阵；
- 当前的剪切区域；
- 当前的虚线列表；
- 以下属性当前的值：
  - `strokeStyle`, `fillStyle`；
  - `globalAlpha`；
  - `lineWidth`, `lineCap`, `lineJoin`, `miterLimit`, `lineDashOffset`；
  - `shadowOffsetX`, `shadowOffsetY`, `shadowBlur`, `shadowColor`,
  - `globalCompositeOperation`；
  - `font`, `textAlign`, `textBaseline`, `direction`；
  - `imageSmoothingEnabled`；

> Canvas 的状态就是当前画面应用的所有样式和变形的一个快照。

#### 2.`ctx.restore()`

通过在绘图状态栈中弹出顶端的状态，将 canvas 恢复到最近的保存状态的方法。 如果没有保存状态，此方法不做任何改变。

```js
ctx.restore();
```

### 二.移动

#### 1.`ctx.translate()`

将 canvas 按原始 `x` 点的水平方向、原始的 `y` 点垂直方向进行平移变换。

```js
ctx.translate(x, y);
```

在做变形之前先保存状态是一个良好的习惯。大多数情况下，调用 `restore` 方法比手动恢复原先的状态要简单得多。如果在一个循环中做位移但没有保存和恢复 canvas 的状态，很可能到最后会发现怎么有些东西不见了，那是因为它很可能已经超出 canvas 范围以外了。

### 三.旋转

#### 1.`ctx.rotate()`

在变换矩阵中增加旋转。角度变量表示一个顺时针旋转角度并且用弧度表示。

```js
ctx.rotate(angle);
```

- `angle`
  - 顺时针旋转的弧度。如果你想通过角度值计算，可以使用公式： `degree * Math.PI / 180` 。

> 旋转中心点一直是 canvas 的起始点。 如果想改变中心点，可以通过 `translate()` 方法移动 canvas 。

### 四.缩放

#### 1.`ctx.scale()`

根据 `x` 水平方向和 `y` 垂直方向，为 canvas 单位添加缩放变换。

```js
ctx.scale(x, y);
```

两个参数都是实数，可以为负数，如果比1小，会缩小图形， 如果比1大会放大图形。默认值为 1， 为实际大小。

画布初始情况下， 是以左上角坐标为原点的第一象限。如果参数为负实数， 相当于以 x 或 y 轴作为对称轴镜像反转（例如， 使用 `translate(0,canvas.height); scale(1,-1);` 以 y 轴作为对称轴镜像反转， 就可得到著名的笛卡尔坐标系，左下角为原点）。

默认的， 在 canvas 中一个单位实际上就是一个像素。例如，如果我们将 0.5 作为缩放因子，最终的单位会变成 0.5 像素，并且形状的尺寸会变成原来的一半。相似的方式，我们将 2.0 作为缩放因子，将会增大单位尺寸变成 2 像素。形状的尺寸将会变成原来的两倍。

> 可以使用 `ctx.scale(-1, 1)` 水平翻转上下文，使用 `ctx.scale(1, -1)` 垂直翻转上下文。

### 五.变形

#### 1.`ctx.transform()`

使用矩阵多次叠加当前变换，矩阵由方法的参数进行描述。可以缩放、旋转、移动和倾斜上下文。

> 这个方法使用单位矩阵重新设置当前的变换并且会调用 `transform()`。

```js
ctx.transform(a, b, c, d, e, f);
```

- `a (m11)`
  - 水平缩放。
- `b (m12)`
  - 垂直倾斜。
- `c (m21)`
  - 水平倾斜。
- `d (m22)`
  - 垂直缩放。
- `e (dx)`
  - 水平移动。
- `f (dy)`
  - 垂直移动。

> 如果任意一个参数是 `Infinity`，变形矩阵也必须被标记为无限大，否则会抛出异常。

#### 2.`ctx.setTransform()`

使用 *单位矩阵* 重新设置（覆盖）当前的变换并调用变换，此变换由方法的变量进行描述。

> 从根本上来说，该方法是取消了当前变形,然后设置为指定的变形,一步完成。

> 这个方法不会覆盖当前的变换矩阵，会多次叠加变换。

```js
ctx.setTransform(a, b, c, d, e, f);
```

#### 3.`ctx.resetTransform()` :mag:Experimental

使用单位矩阵重新设置当前变形。和调用以下语句是一样的：`ctx.setTransform(1, 0, 0, 1, 0, 0);`。

```js
ctx.resetTransform();
```

## 合成和剪辑

### 一.组合 Compositing


不仅可以在已有图形后面再画新图形，还可以用来遮盖指定区域，清除画布中的某些部分（清除区域不仅限于矩形，像 `clearRect()` 方法做的那样）以及更多其他操作。

#### 1.`ctx.globalCompositeOperation`

设定了在画新图形时采用的遮盖策略，其值是一个标识遮盖方式的字符串。

```js
ctx.globalCompositeOperation = type;
```

> [图](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)

- `source-over`
  - 这是默认设置，并在现有画布上下文之上绘制新图形。
- `source-in`
  - 新图形只在新图形和目标画布重叠的地方绘制。其他的都是透明的。
- `source-out`
  - 在不与现有画布内容重叠的地方绘制新图形。
- `source-atop`
  - 新图形只在与现有画布内容重叠的地方绘制。
- `destination-over`
  - 在现有的画布内容后面绘制新的图形。
- `destination-in`
  - 现有的画布内容保持在新图形和现有画布内容重叠的位置。其他的都是透明的。
- `destination-out`
  - 现有内容保持在新图形不重叠的地方。
- `destination-atop`
  - 现有的画布只保留与新图形重叠的部分，新的图形是在画布内容后面绘制的。
- `lighter`
  - 两个重叠图形的颜色是通过颜色值相加来确定的。
- `copy`
  - 只显示新图形。
- `xor`
  - 图像中，那些重叠和正常绘制之外的其他地方是透明的。
- `multiply`
  - 将顶层像素与底层相应像素相乘，结果是一幅更黑暗的图片。
- `screen`
  - 像素被倒转，相乘，再倒转，结果是一幅更明亮的图片。
- `overlay`
  - `multiply` 和 `screen` 的结合，原本暗的地方更暗，原本亮的地方更亮。
- `darken`
  - 保留两个图层中最暗的像素。
- `lighten`
  - 保留两个图层中最亮的像素。
- `color-dodge`
  - 将底层除以顶层的反置。
- `color-burn`
  - 将反置的底层除以顶层，然后将结果反过来。
- `hard-light`
  - 屏幕相乘（A combination of multiply and screen）类似于叠加，但上下图层互换了。
- `soft-light`
  - 用顶层减去底层或者相反来得到一个正值。
- `difference`
  - 一个柔和版本的强光（hard-light）。纯黑或纯白不会导致纯黑或纯白。
- `exclusion`
  - 和 `difference` 相似，但对比度较低。
- `hue`
  - 保留了底层的亮度（luma）和色度（chroma），同时采用了顶层的色调（hue）。
- `saturation`
  - 保留底层的亮度（luma）和色调（hue），同时采用顶层的色度（chroma）。
- `color`
  - 保留了底层的亮度（luma），同时采用了顶层的色调(hue)和色度(chroma)。
- `luminosity`
  - 保持底层的色调（hue）和色度（chroma），同时采用顶层的亮度（luma）。

### 二.裁切路径

裁切路径和普通的 canvas 图形差不多，不同的是它的作用是遮罩，用来隐藏不需要的部分。

和 `globalCompositeOperation` 比较，它可以实现与 `source-in` 和 `source-atop` 差不多的效果。最重要的区别是裁切路径不会在 canvas 上绘制东西，而且它永远不受新图形的影响。这些特性使得它在特定区域里绘制图形时相当好用。

#### 1.`ctx.clip()`

当前创建的路径设置为当前剪切路径。

```js
ctx.clip();
ctx.clip(fillRule);
ctx.clip(path, fillRule);
```

## 基本动画

可能最大的限制就是图像一旦绘制出来，它就是一直保持那样了。如果需要移动它，我们不得不对所有东西（包括之前的）进行重绘。重绘是相当费时的，而且性能很依赖于电脑的速度。

### 一.动画的基本步骤

可以通过以下的步骤来画出一帧:

1. **清空 canvas**
  除非接下来要画的内容会完全充满 canvas （例如背景图），否则就需要清空所有。最简单的做法就是用 `clearRect` 方法。
2. **保存 canvas 状态**
  如果要改变一些会改变 canvas 状态的设置（样式，变形之类的），又要在每画一帧之时都是原始状态的话，需要先保存一下。
3. **绘制动画图形（animated shapes）**
  这一步才是重绘动画帧。
4. **恢复 canvas 状态**
  如果已经保存了 canvas 的状态，可以先恢复它，然后重绘下一帧。

### 二.操控动画

为了实现动画，我们需要一些可以定时执行重绘的方法。有两种方法可以实现这样的动画操控。

首先，可以用 `window.setInterval()`, `window.setTimeout()` 和 `window.requestAnimationFrame()` 来设定定期执行一个指定函数。

```js
// 当设定好间隔时间后，function 会定期执行。
setInterval(function, delay);

// 在设定好的时间之后执行函数
setTimeout(function, delay);

// 告诉浏览器执行一个动画，并在重绘之前，请求浏览器执行一个特定的函数来更新动画。
window.requestAnimationFrame(callback);
```

## 像素处理

### 一.ImageData 对象

`ImageData` 对象中存储着 canvas 对象真实的像素数据，它包含以下几个只读属性：

- `width`
  - 图片宽度，单位是像素
- `height`
  - 图片高度，单位是像素
- `data`
  - `Uint8ClampedArray` 类型的一维数组，包含着 RGBA`格式的整型数据，范围在 0 至 255 之间（包括 255）。

`Uint8ClampedArray`  包含 `高度 × 宽度 × 4 bytes` 数据，索引值从 0 到 `(高度×宽度×4)-1`。

例如，要读取图片中位于第 50 行，第 200 列的像素的 R/G/B/A 值：

```js
blueComponent = imageData.data[((50 * (imageData.width * 4)) + (200 * 4)) + 0/1/2/3];
```

#### 1.创建一个 ImageData 对象

```js
// 创建一个新的，空白的 `ImageData` 对象
var myImageData = ctx.createImageData(width, height);

// 创建一个被 `anotherImageData` 对象指定的相同像素的 `ImageData` 对象
var myImageData = ctx.createImageData(anotherImageData);
```

> 所有像素被预设为透明黑。

#### 2.得到场景像素数据

```js
var myImageData = ctx.getImageData(left, top, width, height);
```

这个方法会返回一个 `ImageData` 对象，它代表了画布区域的对象数据，此画布的四个角落分别表示为 `(left, top)`, `(left + width, top)`, `(left, top + height)`, 以及 `(left + width, top + height)` 四个点。这些坐标点被设定为画布坐标空间元素。

> 任何在画布以外的元素都会被返回成一个透明黑的 `ImageData` 对像。

> [demo](../canvas/animate/imagedata.html)

#### 3.在场景中写入像素数据

```js
ctx.putImageData(myImageData, dx, dy);
```

> [demo](../canvas/animate/imagedata_2.html)

![gamma](<img src="https://latex.codecogs.com/svg.image?V_{out}=AV_{in}^{\gamma&space;}" title="V_{out}=AV_{in}^{\gamma }" />)

## 点击区域和无障碍访问

## 优化

## 终曲
