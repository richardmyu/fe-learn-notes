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


## 基本动画

## 高级动画

## 像素处理

## 点击区域和无障碍访问

## 优化

## 终曲
