# SVG

## 滤镜效果

在某些情况下，一些基本的 SVG 图形并不能提供某种想要达到的效果。比如常见的阴影效果，就不能合理地与渐变类元素（`<linearGradient>`, `<radialGradient>`）一起被创建。滤镜（Filter）就是 SVG 中用于创建复杂效果的一种机制。

滤镜通过 `<filter>` 元素进行定义，并且置于 `<defs>` 区块中。在 `filter` 标签中提供一系列图元（primitives），以及在前一个基本变换操作上建立的另一个操作（比如添加模糊后又添加明亮效果）。如果要应用所创建的滤镜效果，只需要为 SVG 图形元素设置 `filter` 属性即可。

### `<filter>`

`filter` 元素作用是作为原子滤镜操作的容器。它不能直接呈现。可以利用目标 SVG 元素上的 `filter` 属性引用一个滤镜。

### `filterUnits`

> `<filter>` 独有属性。

`filterUnits` 属性定义 `x`, `y`, `width` 和 `height` 使用的坐标系系统。

如果 `filterUnits` 属性未指定,那么效果如同指定了值为 `objectBoundingBox`。

- `userSpaceOnUse`
  - `x`, `y`, `width` 和 `height` 表示当前坐标系统中的值，这些值表示 `<filter>` 元素在当前用户坐标系中的位置和大小(例如通过 `filter` 引用该`<filter>`元素的元素所在的坐标系系统)。
>
- `objectBoundingBox`
  - 在这种情况下，`x`，`y`，`width` 和 `heightbiao` 表示引用 `<filter>` 元素的元素的 `baow` 包围盒的分数或百分比。

### `<feGaussianBlur>`

该滤镜对输入图像进行高斯模糊，属性 `stdDeviation` 中指定的数量定义了钟形。

**`stdDeviation`**

`stdDeviation` 属性定义了模糊操作的标准差。如果列出两个 `<number>`，第一个数字表示沿着 x 轴的标准差值，第二个值表示沿着 y 轴的标准差值。如果只出现一个数字，那个值就表示在 x 轴和 y 轴上有着相同的标准差。

负值是不允许的。设为零即禁用了已有滤镜的原本效果。如果 `stdDeviation` 在 x 轴和 y 轴上只有一个为 0，那么模糊效果就只会应用于非 0 的那个方向。

如果此属性没被定义，就与标准差值被定义为 0 的效果一样。

> [feGaussianBlur demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/filter_feGaussianBlur.svg)

### `<feOffset>`

该输入图像作为一个整体，在属性 `dx` 和属性 `dy` 的值指定了它的偏移量。

**`in`**

`in` 属性标识输入的原语。

其值可以是下面六种关键词中的一种，或者是一个字符串匹配在同一个 `<filter>` 元素中前面的原语的 `result` 属性值。如果没有提供值并且这是 `filter` 中第一个原语,那么原语将相当于使用 `SourceGraphic` 作为输入值。如果没有提供值并且这不是第一个原语，那么原语将使用前面原语的 `result` 属性值作为输入。

如果 `result` 的值在同一个 `<filter>` 中出现多次，那么将使用前面的距离使用该 `result` 值的原语最近的该 `result` 值的原语作为输入。

- `SourceGraphic`
  - 该关键词表示图形元素自身将作为 `<filter>` 原语的原始输入。
- `SourceAlpha`
  - 该关键词表示图形元素自身将作为 `<filter>` 原语的原始输入。`SourceAlpha` 与 `SourceGraphic` 具有相同的规则除了 `SourceAlpha` 只使用元素的透明度。
- `BackgroundImage`
  - 该关键词表示 `filter` 元素当前底下的区域的图形快照将被调用。
- `BackgroundAlpha`
  - 跟 `BackgroundImage` 相同除了只使用透明度。
- `FillPaint`
- `StrokePaint`

> [feOffset demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/filter_feOffset.svg)

### `<feSpecularLighting>`

该滤镜照亮一个源图形，使用 `alpha` 通道作为隆起映射。该结果图像是一个基于光色的 RGBA 图象。该光照计算遵守标准冯氏照明模式的镜面组件。结果图像依赖于光色、光的位置以及输入隆起映射的表面几何形状。光照计算的结果是叠加的。该滤镜假定观察者在X方向无穷远处。

该滤镜制作了一个图像，图像包含光照计算的镜面反射部分。如此一个映射是为了与纹理相结合，使用算术 `<feComposite>` 方法的叠加。利用在应用到纹理图像前添加多个光映射，可以模拟多个光源。

**`surfaceScale`**

`surfaceScale` 属性表示滤光器基元的表面高度。

> [surfaceScale demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/filter_surfaceScale.svg)

**`specularConstant`**

`specularConstant` 属性控制镜面照明的反射率。它表示 Phong Lighting Model (冯氏光照模型) 中的 `ks` 值。值越大，反射越强。

> [Phong Lighting Model](https://blog.csdn.net/Lyn_B/article/details/89852600)

**`specularExponent`**

`specularExponent` 属性控制光源的焦点。 值越大，光线越亮。

### `<feComposite>`

该滤镜执行两个输入图像的智能像素组合，在图像空间中使用以下 Porter-Duff 合成操作之一：`over`、`in`、`atop`、`xor`。另外，还可以应用一个智能组件 `arithmetic` 操作（结果被压到 `[0,1]` 范围内）。

该 `arithmetic` 操作对组合来自 `<feDiffuseLighting>` 滤镜和来自 `<feSpecularLighting>` 滤镜的输出以及组合纹理数据很有用。如果选择了 `arithmetic` 操作，每个结果像素都要经过下面的方程式的计算：

```js
result = k1*i1*i2 + k2*i1 + k3*i2 + k4
```

在这里：

- `i1` 和 `i2` 标示了输入图像相应的像素通道值，分别映射到 `in` 和 `in2` 。
- `k1`、`k2`、`k3` 和 `k4` 标示了同名的属性值。

**`in2`**

`in2` 属性标识给定过滤器原语的第二个输入。它的工作原理与 `in` 属性相同。

三个元素使用此属性：`<feBlend>`，`<feComposite>` 和 `<feDisplacementMap>`。

**`operator`**

根据所使用的上下文，`operator` 属性具有两种含义。它定义了要执行的合成或变形操作。

对于 `<feComposite>`，操作员定义要执行的合成操作。

- `over`
  - 此值指示 `in` 属性中定义的源图形放置在 `in2` 属性中定义的目标图形上方。
>
- `in`
  - 此值表示 `in` 属性中定义的源图形中与 `in2` 属性中定义的目标图形重叠的部分替换了目标图形。
>
- `out`
  - 此值指示显示在 `in` 属性中定义的源图形中位于 `in2` 属性中定义的目标图形之外的部分。
>
- `atop`
  - 此值指示 `in` 属性中定义的源图形的部分与 `in2` 属性中定义的目标图形重叠的部分替换了目标图形。 目标图形中与源图形不重叠的部分保持不变。
>
- `xor`
  - 此值指示 `in` 属性中定义的源图形和 `in2` 属性中定义的目标图形的非重叠区域已合并。
>
- `lighter`
  - 此值指示显示 `in` 属性中定义的源图形和 `in2` 属性中定义的目标图形的总和。
>
- `arithmetic`
  - 值指示使用以下公式组合 `in` 属性中定义的源图形和 `in2` 属性中定义的目标图形：

```js
result = k1*i1*i2 + k2*i1 + k3*i2 + k4
```

对于 `<feMorphology>`，运算符定义是腐蚀（即薄化）还是扩大（胖化）源图形。

- `erode`
  - 此值使 `in` 属性中定义的源图形腐蚀。
- `dilate`
  - 此值使 `in` 属性中定义的源图形扩大。

> [operator demo](https://github.com/richardmyu/CSS-And-JS-Animate/blob/master/htmlcss/svg/filter_operator.svg)

### `<feMerge>`

`feMerge` 滤镜允许同时应用滤镜效果而不是按顺序应用滤镜效果。利用 `result` 存储别的滤镜的输出可以实现这一点，然后在一个 `<feMergeNode>` 子元素中访问它。

### `<feMergeNode>`

`feMergeNode` 元素拿另一个滤镜的结果，让它的父 `<feMerge>` 元素处理。

### `<feMorphology>`

该滤镜用来侵蚀或扩张输入的图像。它在增肥或瘦身效果方面特别有用。
