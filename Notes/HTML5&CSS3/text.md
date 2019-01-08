# HTML5 和 CSS3

## HTML5

### 新增标签

##### audio display: none;

- 处理音频，因为有些浏览器不支持某些音频格式。需要转化或者准备多个
  详细介绍：w3c[enter link description here](http://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp)

```javascript
<audio controls>你的浏览器不支持audio
    <source src="test.mp3" type="audio/mp3">
    <source src="test.ogg" type="audio/ogg">
</audio>
```

##### video

播放视频，注意兼容性。（转化工具：Miro Video Converter）

```javascript
<video controls width="640px" height="320px" poster="test.png">你的浏览器不支持video
    <source src="test.mp4" type="video/mp4">
    <source src="test.webm" type="video/webm">
</video>
```

##### article display: block;

代表的是一块独立的内容(模块)，例如一篇文章，帖子。类似于 html4 中的 div 元素，是 div 的细分。

```javascript
<article>
  <header>
    <h1>呆萌的来历</h1>
  </header>
  <p>呆萌来源于一个同学的名字，他就叫呆萌。。。</p>
  <footer>
    <p>发表日期:2015:3:29</p>
  </footer>
</article>
```

##### section

翻译为“部分”，比如页眉页脚或者文章中的区块(觉得还是 div 方便吧，但是这个和上面的都是为了语义化好点)

> 当没有标题时，不要使用 section。
> 当 article,aside,nav 元素更适合时，不要使用 section 元素。
> 不要讲其当做设置样式的容器，那是 div 做的

```javascript
<section>
  <header>
    <h1>呆萌的来历</h1>
  </header>
  <p>呆萌来源于一个同学的名字，他就叫呆萌。。。</p>
  <footer>
    <p>发表日期:2015:3:29</p>
  </footer>
</section>
```

##### nav

导航栏的语义化标签，类似于 div

```javascript
<nav>
  <ul>
    <li>联系信息</li>
    <li>个人经验</li>
    <li>求职意向</li>
  </ul>
</nav>
```

##### aside

旁白。用来表示文章或者页面的附属信息

##### header

区块的头部部分，一个网页内可以拥有多个 header

##### footer

区块的底部部分，通常包括脚注信息.类似于 header，可以放在 section，article，div，body 等元素中。

##### hgroup

将标题进行分组，适用于含有多个 h 系列标签

##### address

显示联系信息，不仅仅是地址或者邮箱

##### time

用来语义化显示时间

##### figure/figcation

实现带标题的插图

##### mark

高亮显示，类似于 strong

##### 新增的全局属性

contentEditable：是否可被重新编辑
hidden：是否被隐藏
spellcheck：对输入内容进行拼写和语法检查（input(type=text)）,textarea

### WebSocket

WebSocket 的出现，使得浏览器具备了实时双向通信的能力。

##### 什么是 WebSocket

HTML5 开始提供的一种浏览器与服务器进行双向通讯的网络技术，属于应用层协议。它基于 TCP 传输协议，并复用 HTTP 的握手通道。

## CSS3

##### Border-radius

- 1.`border-radius`:是一个简写属性，用于设置四个 `border-radius` 属性(即圆角边框)

  - `length` 定义圆角的形状
  - `%` 以百分比定义圆角的形状

- 2.`border-[top-left/top-right/bottom-left/bottom-right]-radius`
  - `length` 定义圆角的形状
  - `%` 以百分比定义圆角的形状

> 注释：`border-[--]-radius` 属性的长度值和百分比值定义四分之一椭圆（定义外部边框边缘的边角形状）的半径（radiu）。第一个值是水平半径，第二个值是垂直半径。如果省略第二个值，则复制第一个值。如果长度为零，则边角为方形，而不是圆形。水平半径的百分比值参考边框盒的宽度，而垂直半径的百分比值参考边框盒的高度。

##### Border-image

- 1.`border-image`:是一个简写属性，用于设置以下属性
  - `border-image-source` 用在边框的图片的路径
  - `border-image-slice` 图片边框向内偏移
  - `border-image-width` 图片边框的宽度
  - `border-image-outset` 边框图像区域超出边框的量
  - `border-image-repeat` 图像边框是否应平铺(`repeated`)、铺满(`rounded`)或拉伸(`stretched`)

> 语法 `border-image:url(border.png) 30 30 round;`

- 2.`border-image-source`:规定要使用的图像，代替 `border-style` 属性中设置的边框样式
  - `none` 不使用图像
  - `image` 用作边框的图像的路径

> 提示：如果值为 "`none`"，或者如果图像无法显示，则使用边框样式。

- 3.`border-image-slice`:规定图像边框的向内偏移
  - `number` 数字值，代表图像中像素（如果是光栅图像）或矢量坐标（如果是矢量图像）
  - `%` 相对于图像尺寸的百分比值：图像的宽度影响水平偏移，高度影响垂直偏移
  - `fill` 保留边框图像的中间部分

> 注释：该属性规定图像的上、右、下、左侧边缘的向内偏移，图像被分割为九个区域：四个角、四条边以及一个中间区域。除非使用了关键词 `fill`，否则中间的图像部分会被丢弃。如果省略第四个数值/百分比，则与第二个值相同。如果省略第三个值，则与第一个值相同。如果省略第二个值，则与第一个值相同。

- 4.`border-image-width`:规定图像边框的宽度
  - `number` 代表对应的 `border-width` 的倍数
  - `%` 参考边框图像区域的尺寸：区域的高度影响水平偏移，宽度影响垂直偏移
  - `auto` 如果规定该属性，则宽度为对应的图像切片的固有宽度

> 注释：该属性的四个之规定将边框图像分割为九个部分的偏移。它们代表了从区域的上、右、下、左侧向内的距离。如果忽略第四个值，则与第二个值相同。如果省略第三个值，则与第一个值相同。如果省略第二个值，则与第一个值相同。不允许任何负值作为 `border-image-width` 值。

- 5.`border-image-outset`:规定边框图像超过边框盒的量
  - `length`
  - `number` 代表对应的 `border-width` 的倍数

> 注释：属性规定边框图像超出边框盒的量。在上、右、下、左侧。如果忽略第四个值，则与第二个值相同。如果省略第三个值，则与第一个值相同。如果省略第二个值，则与第一个值相同。不允许任何负值作为 `border-image-outset` 值。

- 6.`border-image-repeat`:规定图像边框是否应该被重复（`repeated`）、拉伸（`stretched`）或铺满（`rounded`）
  - `stretch` 拉伸图像来填充区域
  - `repeat` 平铺（重复）图像来填充区域
  - `round` 类似 `repeat` 值。如果无法完整平铺所有图像，则对图像进行缩放以适应区域

> 注释：该属性规定如何延展和铺排边框图像的边缘和中间部分。因此，您可以规定两个值。如果省略第二个值，则采取与第一个值相同的值。

##### Outline

- 1.`outline`:绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用
  - `outline-color` 规定边框的颜色
  - `outline-style` 规定边框的样式
  - `outline-width` 规定边框的宽度
  - `inherit` 规定应该从父元素继承

> 语法：`outline:#00FF00 dotted thick;`
> 注释：轮廓线不会占据空间，也不一定是矩形。

> `outline` 简写属性在一个声明中设置所有的轮廓属性。可以按顺序设置如下属性：`outline-color`、`outline-style`、`outline-width`。

- 2.`outline-color`:设置轮廓的颜色
  - `color_name` 规定颜色值为颜色名称的轮廓颜色
  - `hex_number` 规定颜色值为十六进制值的轮廓颜色
  - `rgb_number` 规定颜色值为 rgb 代码的轮廓颜色
  - `invert` 默认。执行颜色反转。可使轮廓在不同的背景颜色中都是可见
  - `inherit` 规定应该从父元素继承轮廓颜色的设置

* 3.`outline-style`:设置轮廓的样式
  - `none` 默认。定义无轮廓
  - `dotted` 定义点状的轮廓
  - `dashed` 定义虚线轮廓
  - `solid` 定义实线轮廓
  - `double` 定义双线轮廓。双线的宽度等同于 `outline-width` 的值
  - `groove` 定义 3D 凹槽轮廓。此效果取决于 `outline-color` 值
  - `ridge` 定义 3D 凸槽轮廓。此效果取决于 `outline-color` 值
  - `inset` 定义 3D 凹边轮廓。此效果取决于 `outline-color` 值
  - `outset` 定义 3D 凸边轮廓。此效果取决于 `outline-color` 值
  - `inherit` 规定应该从父元素继承轮廓样式的设置

`outline-style` 属性用于设置元素的整个轮廓的样式。样式不能是 `none`，否则轮廓不会出现。

`outline` （轮廓）是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用。`outline` 属性设置元素周围的轮廓线。

> 注释：请始终在 `outline-color` 属性之前声明 `outline-style` 属性。元素只有获得轮廓以后才能改变其轮廓的颜色。

- 4.`outline-width`:设置轮廓的宽度
  - `thin` 规定细轮廓
  - `medium` 默认。规定中等的轮廓
  - `thick` 规定粗的轮廓
  - `length` 允许您规定轮廓粗细的值
  - `inherit` 规定应该从父元素继承轮廓宽度的设置

`outline-width` 属性设置元素整个轮廓的宽度，只有当轮廓样式不是 `none` 时，这个宽度才会起作用。如果样式为 `none`，宽度实际上会重置为 0。不允许设置负长度值。

> 注释：请始终在 `outline-width` 属性之前声明 `outline-style` 属性。元素只有获得轮廓以后才能改变其轮廓的颜色。

##### Box

- 1.`box-shadow`:向框添加一个或多个阴影
  - `h-shadow` 必需。水平阴影的位置。允许负值
  - `v-shadow` 必需。垂直阴影的位置。允许负值
  - `blur` 可选。模糊距离
  - `spread` 可选。阴影的尺寸
  - `color` 可选。阴影的颜色。请参阅 CSS 颜色值
  - `inset` 可选。将外部阴影 (`outset`) 改为内部阴影

### 5.阴影

- `text-shadow`是给文本添加阴影效果，`box-shadow`是给元素块添加周边阴影效果。
- 基本语法是：`{box-shadow：[inset] x-offset y-offset blur-radius spread-radius color}`
  对象选择器 {box-shadow:[投影方式] X 轴偏移量 Y 轴偏移量阴影模糊半径 阴影扩展半径 阴影颜色}

`box-shadow`属性的参数设置取值：

- 阴影类型：此参数可选。如不设值，默认投影方式是外阴影；如取其唯一值“inset”，其投影为内阴影；

- X-offset:阴影水平偏移量，其值可以是正负值。如果值为正值，则阴影在对象的右边，其值为负值时，阴影在对象的左边；

- Y-offset:阴影垂直偏移量，其值也可以是正负值。如果为正值，阴影在对象的底部，其值为负值时，阴影在对象的顶部；

- 阴影模糊半径：此参数可选，，但其值只能是为正值，如果其值为 0 时，表示阴影不具有模糊效果，其值越大阴影的边缘就越模糊；

- 阴影扩展半径：此参数可选，其值可以是正负值，如果值为正，则整个阴影都延展扩大，反之值为负值时，则缩小；

- 阴影颜色：此参数可选。如不设定颜色，浏览器会取默认色，但各浏览器默认取色不一致，特别是在 webkit 内核下的 safari 和 chrome 浏览器下表现为透明色，在 Firefox/Opera 下表现为黑色（已验证），建议不要省略此参数。

> 为了兼容各主流浏览器并支持这些主流浏览器的较低版本，在基于 Webkit 的 Chrome 和 Safari 等浏览器上使用 box-shadow 属性时，我们需要将属性的名称写成-webkit-box-shadow 的形式。Firefox 浏览器则需要写成-moz-box-shadow 的形式。

> 语法：`box-shadow: h-shadow v-shadow blur spread color inset;`
> 注释：`box-shadow` 向框添加一个或多个阴影。该属性是由逗号分隔的阴影列表，每个阴影由 2-4 个长度值、可选的颜色值以及可选的 `inset` 关键词来规定。省略长度的值是 0。

- 2.`box-decoration-break`

- 3.`overflow-x`:规定是否对内容的左/右边缘进行裁剪 - 如果溢出元素内容区域的话
  - `visible` 不裁剪内容，可能会显示在内容框之外
  - `hidden` 裁剪内容 - 不提供滚动机制
  - `scroll` 裁剪内容 - 提供滚动机制
  - `auto` 如果溢出框，则应该提供滚动机制
  - `no-display` 如果内容不适合内容框，则删除整个框
  - `no-content` 如果内容不适合内容框，则隐藏整个内容

> `overflow-x: visible|hidden|scroll|auto|no-display|no-content;`

- 4.`overflow-y`:规定是否对内容的上/下边缘进行裁剪 - 如果溢出元素内容区域的话
  - `visible` 不裁剪内容，可能会显示在内容框之外
  - `hidden` 裁剪内容 - 不提供滚动机制
  - `scroll` 裁剪内容 - 提供滚动机制
  - `auto` 如果溢出框，则应该提供滚动机制
  - `no-display` 如果内容不适合内容框，则删除整个框
  - `no-content` 如果内容不适合内容框，则隐藏整个内容

> `overflow-y: visible|hidden|scroll|auto|no-display|no-content;`

- 5.`overflow-style`:规定溢出元素的首选滚动方法
  - `auto`
  - `scrollbar` 为溢出元素添加滚动条
  - `panner`
  - `move` 用户能够直接移动元素的内容。通常，用户能够用鼠标拖动内容
  - `marquee` 内容自主移动，不需任何用户代理对其控制

> 目前没有浏览器支持 `overflow-style` 属性
> `overflow-style: auto|scrollbar|panner|move|marquee;`
> 注释：值既可以是 `auto`，或者是按照优先次序的方法列表。浏览器应该使用列表中其支持的的第一个滚动方法。

- 6.`rotation`:围绕由 `rotation-point` 属性定义的指定点，对块级元素进行逆时针旋转
  - `angle` 元素旋转角度。可能的值：0deg - 360deg。

> 目前没有浏览器支持 `rotation` 属性
> 提示：边框、内边距、内容以及背景（非固定）也会被旋转！

- 7.`rotation-point`:是一对值，定义从上左边框边缘进行偏移的点
  - `top/right/bottom/left` 如果只规定一个关键词，则第二个值将是 "center"
  - `x% y%` 百分比值，参考边框盒宽度和高度

> 目前没有浏览器支持 `rotation-point` 属性。
> 提示：`rotation-point` 属性需要与 `rotation` 属性结合使用。

##### Flexible Box \*\*\*\*

- 1.`box-align`:规定如何对齐框的子元素
  - `start` 对于正常方向的框，每个子元素的上边缘沿着框的顶边放置。对于反方向的框，每个子元素的下边缘沿着框的底边放置
  - `end` 对于正常方向的框，每个子元素的下边缘沿着框的底边放置。对于反方向的框，每个子元素的上边缘沿着框的顶边放置
  - `center` 均等地分割多余的空间，一半位于子元素之上，另一半位于子元素之下
  - `baseline` 如果 `box-orient` 是`inline-axis`或`horizontal`，所有子元素均与其基线对齐
  - `stretch` 拉伸子元素以填充包含块

> 目前没有浏览器支持 `box-align` 属性。
> `box-align: start|end|center|baseline|stretch;`

- 2.`box-direction`:规定框元素的子元素以什么方向来排列
  - `normal` 以默认方向显示子元素
  - `reverse` 以反方向显示子元素
  - `inherit` 应该从子元素继承

> 目前没有浏览器支持 `box-direction` 属性。
> `box-direction: normal|reverse|inherit;`

- 3.`box-flex`:规定框的子元素是否可伸缩其尺寸
  - `value` 元素的可伸缩行。柔性是相对的，例如 `box-flex` 为 2 的子元素两倍于 `box-flex` 为 1 的子元素

> 目前没有浏览器支持 `box-flex` 属性。
> 提示：可伸缩元素能够随着框的缩小或扩大而缩写或放大。只要框中有多余的空间，可伸缩元素就会扩展来填充这些空间。

- 4.`box-flex-group`:用于向柔性分组分配可伸缩元素
  - `integer` 一个整数。（第一个柔性分组是 1，后面的柔性分组是更大的值）

> 目前没有浏览器支持 `box-flex-group` 属性。
> 提示：可伸缩元素能够随着框的缩小和扩大而伸缩。

- 5.`box-lines`:规定如果列超出了父框中的空间，是否要换行显示
  - `single` 所有子元素会被放置在单独的行或列中。（无法匹配的元素会被视为溢出）
  - `multiple` 允许框扩展为多行，以容纳其所有子元素

> 目前没有浏览器支持 `box-lines` 属性。
> 提示：默认地，水平框会在单独的行中排列其子元素，而垂直框会在单独的列中排列其子元素。

- 6.`box-ordinal-group`:规定框中子元素的显示次序
  - `integer` 一个整数，指示子元素的显示次序

值更低的元素会显示在值更高的元素前面显示。

> 目前没有浏览器支持 `box-ordinal-group` 属性。
> 注释：分组值相同的元素，它们的显示次序取决于其源次序。

- 7.`box-orient`:规定框的子元素应该被水平或垂直排列
  - `horizontal` 在水平行中从左向右排列子元素
  - `vertical` 从上向下垂直排列子元素
  - `inline-axis` 沿着行内轴来排列子元素（映射为`horizontal`）
  - `block-axis` 沿着块轴来排列子元素（映射为`vertical`）
  - `inherit` 应该从父元素继承

> 目前没有浏览器支持 `box-orient` 属性。
> 提示：水平框中的子元素从左向右进行显示，而垂直框的子元素从上向下进行显示。不过，`box-direction` 和 `box-ordinal-group` 能够改变这种顺序。

- 8.`box-pack`:规定当框大于子元素的尺寸，在何处放置子元素
  - `start` 对于正常方向的框，首个子元素的左边缘被放在左侧（最后的子元素后是所有剩余的空间）。对于相反方向的框，最后子元素的右边缘被放在右侧（首个子元素前是所有剩余的空间）
  - `end` 对于正常方向的框，最后子元素的右边缘被放在右侧（首个子元素前是所有剩余的空间）。对于相反方向的框，首个子元素的左边缘被放在左侧（最后子元素后是所有剩余的空间）
  - `center` 均等地分割多余空间，其中一半空间被置于首个子元素前，另一半被置于最后一个子元素后
  - `justify` 在每个子元素之间分割多余的空间（首个子元素前和最后一个子元素后没有多余的空间）

> 对于相反方向的框，最后子元素的右边缘被放在右侧（首个子元素前是所有剩余的空间）
> 目前没有浏览器支持 `box-pack` 属性。
