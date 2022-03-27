# CSS transforms

通过改变坐标空间，CSS transforms 可以在不影响正常文档流的情况下改变作用内容的位置。

CSS transforms 通过一系列 CSS 属性实现，通过使用这些属性，可以对 HTML 元素进行线性仿射变形（affine linear transformations）。可以进行的变形包括旋转，倾斜，缩放以及位移，这些变形同时适用于平面与三维空间。

> 只有使用盒模型（Box Model）来定位的元素可以被变换（transformed）。根据一般经验（原文：As a rule of thumb），拥有 `display: block` 的元素是由盒模型定位的。

有两个主要的属性被用来定义 CSS transforms：`transform` 和 `transform-origin`。

## 1.transform

指定作用在元素上的变形。取值为空格分隔的一系列变形的列表，他们会像被组合操作请求一样被分别执行。

### 1.1.2d 转换

#### 1.1.1.translate

根据左 (X 轴）和顶部 (Y 轴）位置给定的参数，从当前元素位置移动。

#### 1.1.2.rotate

在一个给定度数顺时针旋转的元素。负值是允许的，这样是元素逆时针旋转。

#### 1.1.3.scale

缩放，该元素增加或减少的大小，取决于宽度（X 轴）和高度（Y 轴）的参数

> 负数会被转换为对应的正数。若想缩小，用小数表达。

#### 1.1.4.skew

斜拉，包含两个参数值，分别表示 X 轴和 Y 轴倾斜的角度，如果第二个参数为空，则默认为 0，参数为负表示向相反方向倾斜。

#### 1.1.5.matrix

定义 2D 转换，使用六个值的矩阵。

> 无论是旋转还是拉伸什么的，本质上都是应用的 `matrix` 方法实现的。

默认是绕着中心点旋转的，而这个中心点就是 `transform-origin` 属性对应的点，也是所有矩阵计算的一个重要依据点。

CSS3 transform 的 `matrix()`方法写法如下：

```css
transform: matrix(a, b, c, d, e, f);

/* 移动/缩放 */
transform: matrix(scaleX, 0, 0, scaleY, tanslateX, tanslateY);

/* 旋转 */
/* 假设角度为 θ */
transform: matrix(cosθ, sinθ, -sinθ, cosθ, 0, 0);

/* 拉伸 */
/* 其中，θx 表示 x 轴倾斜的角度，θy 表示 y 轴，两者并无关联。 */
transform: matrix(1, tan(θy), tan(θx), 1, 0, 0);
```

实际上，这 6 参数，对应的矩阵就是：

![matrix(a,b,c,d,e,f)](http://image.zhangxinxu.com/image/blog/201206/css-transforms-matrix3.gif)

注意书写方向是竖着的。

![转换公式](http://image.zhangxinxu.com/image/blog/201206/css-transforms-matrix5.gif)

> x、y 表示矩阵偏移元素的中心点的 (x,y)；
> 对于一般地交互应用，`transform` 属性默认提供的些方法是足够了，但是，一些其他的效果，如果 `transform` 属性没有提供接口方法就只能靠 `matrix` 矩阵了。

### 1.2.3d 转换

#### 1.2.1.rotate

- rotateX(x)
- rotateY(y)
- rotateZ(z)
- rotate3d(x,y,z,angle)

> 在设置 `transform-style: preserve-3d;`，rotate 效果等效于 rotateZ

#### 1.2.2.translate

- translateX(x)
- translateY(y)
- translateZ(z)
- translate3d(x,y,z)

#### 1.2.3.scale

- scaleX(x)
- scaleY(y)
- scaleZ(z)
- scale3d(x,y,z)

#### 1.2.4.matrix3d

```css
/* 简写： */
matrix(a, b, c, d, tx, ty)

matrix3d(a, b, 0, 0, c, d, 0, 0, 0, 0, 1, 0, tx, ty, 0, 1)
```

## 2.transform-origin

指定原点的位置。默认值为元素的中心，可以被移动。很多变形需要用到这个属性，比如旋转，缩放和倾斜，他们都需要一个指定的点作为参数。

可以使用一个，两个或三个值来指定，其中每个值都表示一个偏移量。 没有明确定义的偏移将重置为其对应的初始值。

如果定义了两个或更多值并且没有值的关键字，或者唯一使用的关键字是 center，则第一个值表示水平偏移量，第二个值表示垂直偏移量。

`transform-origin: x-offset y-offset z-offset;`

- 一个值：
  - 必须是 length，percentage，或 left, center, right, top, bottom 关键字中的一个。
- 两个值：
  - 其中一个必须是 length，percentage，或 left, center, right 关键字中的一个。
  - 另一个必须是 length，percentage，或 top, center, bottom 关键字中的一个。
- 三个值：
  - 前两个值和只有两个值时的用法相同。
  - 第三个值必须是 length。它始终代表 Z 轴偏移量。

> z-offset 定义变形中心距离用户视线（z=0 处）的 length（不能是 percentage）偏移值。

## 3.transform-style

设置元素的子元素是位于 3D 空间中还是平面中。

```css
/* 2D/3D */
transform-style: flat|preserve-3d;
```

如果选择平面，元素的子元素将不会有 3D 的遮挡关系。

> 这个属性不会被继承。

## 4.perspective

透视。指定了观察者与 z=0 平面的距离，使具有三维位置变换的元素产生透视效果。 z>0 的三维元素比正常大，而 z<0 时则比正常小，大小程度由该属性的值决定。

> 当值为 0 或负值时，无透视变换。
> `perspective` 属性只影响 3D 转换元素。
> CSS3 3D transform 的透视点是在浏览器的前方！

三维元素在观察者后面的部分不会绘制出来，即 z 轴坐标值大于 `perspective` 属性值的部分。

默认情况下，消失点位于元素的中心，但是可以通过设置 `perspective-origin` 属性来改变其位置。

当该属性值不为 0 和 none 时，会创建新的 层叠上下文。在这种情况下，容器内元素的层叠关系像是使用了 `position: fixed` 一样。

两种书写：

```css
/* 在舞台元素上 */
.stage {
  perspective: 600px;
}

/* 用在当前动画元素上，与 transform 的其他属性写在一起 */
.stage .box {
  transform: perspective(600px) rotateY(45deg);
}

/* 但效果不一样（多个元素时）！！！ 当然不一样嘛 o-o */
```

## 5.perspective-origin

指定了观察者的位置，用作 `perspective` 属性的消失点。

- **x-position**

指定消失点的横坐标，其值有以下形式：

- length-percentage 长度值或相对于元素宽度的百分比值，可为负值。
- left, 关键字，0 值的简记。
- center, 关键字，50%的简记。
- right, 关键字，100%的简记。

- **y-position**

指定消失点的纵坐标，其值有以下形式：

- length-percentage 长度值或相对于元素高度的百分比值，可为负值。
- top, 关键字，0 值的简记。
- center, 关键字，50%的简记。
- bottom, 关键字，100%的简记。

## 6.backface-visibility

指定当元素背面朝向观察者时是否可见。

元素的背面是其正面的镜像。虽然在 2D 中不可见，但是当变换导致元素在 3D 空间中旋转时，背面可以变得可见。 （此属性对 2D 变换没有影响，它没有透视。）

- visible 背面朝向用户时可见。
- hidden 背面朝向用户时不可见。
