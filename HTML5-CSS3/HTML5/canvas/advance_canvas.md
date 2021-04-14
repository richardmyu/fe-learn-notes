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


## 合成和剪辑


## 基本动画

## 高级动画

## 像素处理

## 点击区域和无障碍访问

## 优化

## 终曲
