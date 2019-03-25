### 4.CSS 一些属性

#### 4.1.Background

##### 4.1.1.`background`

设置所有背景属性，属性如下：`color，image，repeat，position，size，origin，clip，attachment`

语法：`background: #00FF00 url(bgimage.gif) no-repeat fixed top;`

> 通常建议使用这个属性，而不是分别使用单个属性，因为这个属性在较老的浏览器中能够得到更好的支持，而且需要键入的字母也更少。

##### 4.1.2.`background-color`

定义元素的背景色

- `color_name` 规定颜色值为颜色名称的背景颜色（比如 `red`）
- `hex_number` 规定颜色值为十六进制值的背景颜色（比如 `#ff0000`）
- `rgb_number` 规定颜色值为 `rgb` 代码的背景颜色（比如 `rgb(255，0，0)`）
- `transparent` 默认。背景颜色为透明
- `inherit` 规定应该从父元素继承 `background-color` 属性的设置。

`background-color` 属性为元素设置一种纯色。这种颜色会填充元素的内容、内边距和边框区域，扩展到元素边框的外边界（但不包括外边距）。如果边框有透明部分（如虚线边框），会透过这些透明部分显示出背景色。

> 提示：`background-color`不能继承，其默认值是 `transparent`。如果一个元素没有指定背景色，那么背景就是透明的，这样其父元素的背景才可见。

##### 4.1.3.`background-image`

定义元素的背景图像

- `url("URL")` 指向图像的路径
- `none` 默认值。不显示背景图像
- `inherit` 规定应该从父元素继承 `background-image` 属性的设置

元素的背景占据了元素的全部尺寸，包括内边距和边框，但不包括外边距。默认地，背景图像位于元素的左上角，并在水平和垂直方向上重复。

> 提示：请设置一种可用的背景颜色，这样的话，假如背景图像不可用，页面也可获得良好的视觉效果。

##### 4.1.4.`background-repeat`

设置是否及如何重复背景图像

- `repeat` 默认。背景图像将在垂直方向和水平方向重复
- `repeat-x` 水平平铺
- `repeat-y` 竖直平铺
- `no-repeat` 不平铺（背景图像将仅显示一次）
- `inherit` 规定应该从父元素继承

> 提示：背景图像的位置是根据 `background-position` 属性设置的。如果未规定 `background-position` 属性，图像会被放置在元素的左上角。

##### 4.1.5.`background-position`

设置背景图像的起始位置

- `top/bottom/left/right/center`
- 长度值：`100px` 或 `5cm`
- 百分比（第一个值是水平位置，第二个值是垂直位置）

图像放置关键字最容易理解的作用就像其名字的意义。例如，`top left` 使图像放置在元素内边距区的左上角。

只要保证不超过两个关键字：一个对应水平方向，另一个对应垂直方向，那么你可以设置位置关键字以任何顺序出现。

如果只有一个关键字，则会默认另一个关键字为 `center`；如果只规定了一个百分比值或长度值，另一个值将是 `50%`。

> 提示：您需要把 `background-attachment` 属性设置为 "`fixed`"，才能保证该属性在 Firefox 和 Opera 中正常工作。

##### 4.1.6.`background-attachment`

设置背景图像是否固定或者随着页面的其余部分滚动

- `scroll` 默认值。背景图像会随着页面其余部分的滚动而移动
- `fixed` 当页面的其余部分滚动时，背景图像不会移动
- `inherit` 规定应该从父元素继承属性

##### 4.1.7.`background-clip`

规定背景的绘制区域

- `border-box` 背景被裁剪到边框盒
- `padding-box` 背景被裁剪到内边距框
- `content-box` 背景被裁剪到内容框

##### 4.1.8.`background-origin`

规定 `background-position` 属性相对于什么位置来定位

- `border-box` 背景图像相对于边框盒来定位
- `padding-box` 背景图像相对于内边距框来定位
- `content-box` 背景图像相对于内容框来定位

> 注释：如果背景图像的 `background-attachment` 属性为 "`fixed`"，则该属性没有效果。

##### 4.1.9.`background-size`

规定背景图片的尺寸

- `length` 第一个值设置宽度，第二个值设置高度
- `percentage` 以父元素的百分比来设置背景图像的宽度和高度
- `cover` 把背景图像扩展至足够大，以使背景图像完全覆盖背景区域
- `contain` 把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域

> 在 `length` 和 `percentage` 中，如果只设置一个值，则第二个值会被设置为 "`auto`"。

#### 4.2.Border

##### 4.2.1.`border`

设置所有的边框属性

- `border-width` 规定边框的宽度
- `border-style` 规定边框的样式
- `border-color` 规定边框的颜色
- `inherit` 规定应该从父元素继承

##### 4.2.2.`border-width`

设置元素的所有边框宽度

- `thin` 定义细的边框(1px)
- `medium` 默认。定义中等的边框(3px)
- `thick` 定义粗的边框(5px)
- `length` 允许您自定义边框的宽度
- `inherit` 规定应该从父元素继承边框宽度

> 只有当边框样式不是 `none` 时才起作用。如果边框样式是 `none`，边框宽度实际上会重置为 0。不允许指定负长度值。
> 请始终在 `border-width` 属性之前声明 `border-style` 属性。元素只有在获得边框之后，才能改变其边框的宽度。

##### 4.2.3.`border-style`

设置元素的所有边框样式

- `none` 定义无边框
- `hidden` 与 `none` 相同。不过应用于表时除外，对于表，`hidden` 用于解决边框冲突
- `dotted` 定义点状边框。在大多数浏览器中呈现为实线
- `dashed` 定义虚线。在大多数浏览器中呈现为实线
- `solid` 定义实线
- `double` 定义双线。双线的宽度等于 `border-width` 的值
- `groove` 定义 3D 凹槽边框。其效果取决于 `border-color` 的值
- `ridge` 定义 3D 垄状边框。其效果取决于 `border-color` 的值
- `inset` 定义 3D `inset` 边框。其效果取决于 `border-color` 的值
- `outset` 定义 3D `outset` 边框。其效果取决于 `border-color` 的值
- `inherit` 规定应该从父元素继承边框样式

> 最不可预测的边框样式是 `double`。它定义为两条线的宽度再加上这两条线之间的空间等于 `border-width` 值。不过，CSS 规范并没有说其中一条线是否比另一条粗或者两条线是否应该是一样的粗，也没有指出线之间的空间是否应当比线粗。所有这些都有用户代理决定，创作人员对这个决定没有任何影响。

##### 4.2.4.`border-color`

设置元素的所有边框颜色

- `color_name` 规定颜色值为颜色名称的边框颜色
- `hex_number` 规定颜色值为十六进制值的边框颜色
- `rgb_number` 规定颜色值为 `rgb` 代码的边框颜色
- `transparent` 默认值。边框颜色为透明
- `inherit` 规定应该从父元素继承边框颜色

> `border-width、border-style、border-color` 属性是一个简写属性，可设置一个元素的所有边框中可见部分的颜色，或者为 4 个边分别设置不同的颜色。

##### 4.2.5.`border-top/right/bottom/left`

- `border-top/right/bottom/left-width` 规定上/右/下/左边框的宽度
- `border-top/right/bottom/left-style` 规定上/右/下/左边框的样式
- `border-top/right/bottom/left-color` 规定上/右/下/左边框的颜色
- `inherit` 规定应该从父元素继承

#### 4.3.Font

##### 4.3.1.`font`

设置所有字体属性

- `font-style` 规定字体样式
- `font-variant` 规定字体异体
- `font-weight` 规定字体粗细
- `font-size/line-height` 规定字体尺寸/行高
- `font-family` 规定字体系列
- `caption` 定义被标题控件（比如按钮、下拉列表等）使用的字体
- `icon` 定义被图标标记使用的字体
- `menu` 定义被下拉列表使用的字体
- `message-box` 定义被对话框使用的字体
- `small-caption caption` 字体的小型版本
- `status-bar` 定义被窗口状态栏使用的字体

> 说明:这个简写属性用于一次设置元素字体的两个或更多方面。使用 `icon` 等关键字可以适当地设置元素的字体，使之与用户计算机环境中的某个方面一致。注意，如果没有使用这些关键词，至少要指定字体大小和字体系列。
> 可以按顺序设置如下属性: `font-style、font-variant、font-weight、font-size/line-height、font-family`

##### 4.3.2.`font-family`

规定元素的字体系列

- `family-name/generic-family` 用于某个元素的字体族名称或/及类族名称的一个优先表。默认值：取决于浏览器。
- `inherit` 规定应该从父元素继承字体系列

`font-family` 可以把多个字体名称作为一个"回退"系统来保存。如果浏览器不支持第一个字体，则会尝试下一个。也就是说，`font-family` 属性的值是用于某个元素的字体族名称或/及类族名称的一个优先表。浏览器会使用它可识别的第一个值。

有两种类型的字体系列名称：

- 指定的系列名称：具体字体的名称，比如："times"、"courier"、"arial"。
- 通常字体系列名称：比如："serif"、"sans-serif"、"cursive"、"fantasy"、"monospace"

> 提示：使用逗号分割每个值，并始终提供一个类族名称作为最后的选择。
> 注意：使用某种特定的字体系列（Geneva）完全取决于用户机器上该字体系列是否可用；这个属性没有指示任何字体下载。因此，强烈推荐使用一个通用字体系列名作为后路。

##### 4.3.3.`font-size`

设置字体的尺寸

- `xx-small/x-small/small/medium/large/x-large/xx-large` 把字体的尺寸设置为不同的尺寸，从 `xx-small` 到 `xx-large`。默认值：`medium`
- `smaller` 把 `font-size` 设置为比父元素更小的尺寸。
- `larger` 把 `font-size` 设置为比父元素更大的尺寸。
- `length` 把 `font-size` 设置为一个固定的值。
- `%` 把 `font-size` 设置为基于父元素的一个百分比值。
- `inherit` 规定应该从父元素继承字体尺寸。

> 该属性设置元素的字体大小。注意，实际上它设置的是字体中字符框的高度；实际的字符字形可能比这些框高或矮（通常会矮）。
> 各关键字对应的字体必须比一个最小关键字相应字体要高，并且要小于下一个最大关键字对应的字体。

##### 4.3.4.`font-size-adjust`

为某个元素规定一个 `aspect` 值，这样就可以保持首选字体的 `x-height`。

- `none` 默认。如果此字体不可用，则不保持此字体的 `x-height`。
- `number` 定义字体的 `aspect` 值比率。

可使用的公式：
`首选字体的字体尺寸 * （font-size-adjust 值 / 可用字体的 aspect 值）= 可应用到可用字体的字体尺寸`

> Internet Explorer 不支持 `font-size-adjust` 属性。
> 字体的小写字母 "x" 的高度与 "`font-size`" 高度之间的比率被称为一个字体的 `aspect` 值。当字体拥有高的 `aspect` 值时，那么当此字体被设置为很小的尺寸时会更易阅读。举例：Verdana 的 `aspect` 值是 0.58（意味着当字体尺寸为 100px 时，它的 `x-height` 是 58px ）。Times New Roman 的 `aspect` 值是 0.46。这就意味着 Verdana 在小尺寸时比 Times New Roman 更易阅读。

##### 4.3.5.`font-stretch`

对当前的 `font-family` 进行伸缩变形

- `normal` 默认值。把缩放比例设置为标准。
- `wider` 把伸展比例设置为更进一步的伸展值
- `narrower` 把收缩比例设置为更进一步的收缩值
- `ultra-condensed/extra-condensed/condensed/semi-condensed/semi-expanded/expanded/extra-expanded/ultra-expanded` 设置 `font-family` 的缩放比例。"`ultra-condensed`" 是最宽的值，而 "`ultra-expanded`" 是最窄的值

> 所有主流浏览器都不支持 `font-stretch` 属性。

##### 4.3.6.`font-style`

定义字体的风格

- `normal` 默认值。浏览器显示一个标准的字体样式
- `italic` 浏览器会显示一个斜体的字体样式
- `oblique` 浏览器会显示一个倾斜的字体样式
- `inherit` 规定应该从父元素继承字体样式

> 该属性设置使用斜体、倾斜或正常字体。斜体字体通常定义为字体系列中的一个单独的字体。理论上讲，用户代理可以根据正常字体计算一个斜体字体。

##### 4.3.7.`font-variant`

设置小型大写字母的字体显示文本

- `normal` 默认值。浏览器会显示一个标准的字体
- `small-caps` 浏览器会显示小型大写字母的字体
- `inherit` 规定应该从父元素继承 `font-variant` 属性的值

> `font-variant` 属性设置小型大写字母的字体显示文本，这意味着所有的小写字母均会被转换为大写，但是所有使用小型大写字体的字母与其余文本相比，其字体尺寸更小。
> 该属性主要用于定义小型大写字母文本。理论上，用户代理可以根据正常字体计算出小型大写字母字体。

##### 4.3.8.`font-weight`

设置文本的粗细

- `normal` 默认值。定义标准的字符
- `bold` 定义粗体字符
- `bolder` 定义更粗的字符
- `lighter` 定义更细的字符
- `100-900` 定义由粗到细的字符。400 等同于 `normal`，而 700 等同于 `bold`
- `inherit` 规定应该从父元素继承字体的粗细

> 该属性用于设置显示元素的文本中所用的字体加粗。每个数字值对应的字体加粗必须至少与下一个最小数字一样细，而且至少与下一个最大数字一样粗。

#### 4.4.List

##### 4.4.1.`list-style`

设置所有的列表属性

- `list-style-type` 设置列表项标记的类型
- `list-style-position` 设置在何处放置列表项标记
- `list-style-image` 使用图像来替换列表项的标记
- `inherit` 规定应该从父元素继承

> 该属性是一个简写属性，涵盖了所有其他列表样式属性。由于它应用到所有 `display` 为 `list-item` 的元素，所以在普通的 HTML 和 XHTML 中只能用于 li 元素，不过实际上它可以应用到任何元素，并由 `list-item` 元素继承。
> 可以按顺序设置如下属性：`list-style-type、list-style-position、list-style-image`

##### 4.4.2.`list-style-image`

- `URL` 图像的路径
- `none` 默认。无图形被显示
- `inherit` 规定应该从父元素继承

> 这个属性指定作为一个有序或无序列表项标志的图像。图像相对于列表项内容的放置位置通常使用 `list-style-position` 属性控制。
> 注释：请始终规定一个 "`list-style-type`" 属性以防图像不可用。

##### 4.4.3.`list-style-position`

- `inside` 列表项目标记放置在文本以内，且环绕文本根据标记对齐
- `outside` 默认值。保持标记位于文本的左侧。列表项目标记放置在文本以外，且环绕文本不根据标记对齐
- `inherit` 规定应该从父元素继承

> 该属性用于声明列表标志相对于列表项内容的位置。外部 (`outside`) 标志会放在离列表项边框边界一定距离处，不过这距离在 CSS 中未定义。内部 (`inside`) 标志处理为好像它们是插入在列表项内容最前面的行内元素一样。

##### 4.4.4.`list-style-type`

- `none` 无标记
- `disc` 默认。标记是实心圆
- `circle` 标记是空心圆
- `square` 标记是实心方块
- `decimal` 标记是数字
- `decimal-leading-zero` 0 开头的数字标记。(01， 02， 03， 等。)

#### 4.5.Margin

##### 4.5.1.`margin`

设置所有外边距属性。该属性可以有 1 到 4 个值

- `auto` 浏览器计算外边距
- `length` 规定以具体单位计的外边距值，比如像素、厘米等。默认值是 0px
- `%` 规定基于父元素的宽度的百分比的外边距
- `inherit` 规定应该从父元素继承外边距

##### 4.5.2.`margin-top/right/botom/left`

设置元素的 `上/右/下/左` 外边距(这个属性对于不可替换的 `inline` 元素没有效果，比如 `<tt>` 或者 `<span>`)

- `auto` 浏览器设置的上/右/下/左外边距。
- `length` 定义固定的上/右/下/左外边距。默认值是 0。
- `%` 定义基于父对象总宽度的百分比上/右/下/左外边距。
- `inherit` 规定应该从父元素继承上/右/下/左外边距。

> 这个简写属性设置一个元素所有外边距的宽度，或者设置各边上外边距的宽度。
> 块级元素的垂直相邻外边距会合并，而行内元素实际上不占上下外边距。行内元素的的左右外边距不会合并。同样地，浮动元素的外边距也不会合并。允许指定负的外边距值，不过使用时要小心。
> 注释：允许使用负值。

**margin-top 的一个小 bug:**

当父级没有设置 `margin-top` 或 `border` 时，子级会把自身的 `margin-top` 值传递给父级元素

> 1.给父级元素设置 `border`；（缺点：影响盒子大小） 2.把子级的 `margin-top` 换成 `padding-top`；（缺点：影响盒子大小） 3.对父级用 `overflow:hidden/auto`； 4.对父级用 `display:inline-block`；（有时候可能会影响布局）

#### 4.6.Padding

##### 4.6.1.`padding`

设置所有内边距属性

- `auto` 浏览器计算内边距。
- `length` 规定以具体单位计的内边距值，比如像素、厘米等。默认值是 0px。
- `%` 规定基于父元素的宽度的百分比的内边距。
- `inherit` 规定应该从父元素继承内边距。

##### 4.6.2.`padding-top/right/botom/left`

[关于 margin/padding 的百分比是基于父级的宽度问题](https://www.zhihu.com/question/20983035/answer/16801491)

`margin/padding` 的百分比之所以按照 width 计算，其实理由很简单，就是要匹配主要的 `use cases`。那就是——要构建在纵横两个方向上相同的 `margin/padding`。如果两个百分比的相对方式不同，那用百分比就无法得到垂直和水平一致的留白。

有人也许会问，为什么不是垂直方向上的 height 而是水平方向的 width？这其实容易理解。因为 CSS 的基本模型是着重于"排版"的需求，因此水平和垂直方向其实并不是同等权重的，更精确的说，是文字书写方向决定的。

常见的横排文字时，我们排版的出发点是水平宽度一定，而垂直方向上是可以无限延展的。竖排文字则相反。所以在竖排文字时，`margin/padding-*` 其实就都按照 height 而不是 width 计算了。

类似的且大家更熟悉的是 `margin-top/bottom` 在垂直方向上的 `collapse`（或者当竖排文字时是 `margin-left/right` 水平方向上的 `collapse`）。为什么只有垂直方向 `collapse` 而水平就不呢？

因为在典型的排版中，段落间的空白进行 `collapse` 是常见和方便的。而反过来水平方向上就几乎没有那样的需求（只有表格在两个方向上有对称的 `border collapse` 的需求）。

同样的，在排版中，横向百分比控制是常见的需求，但是纵向其实很少这样的需求。有这样需求的其实是 GUI 界面布局，布局和排版的区别在这个答案（在 CSS 布局中，用 float 好还是用 position 好？分别有什么优势？）我也提到过。

至于说死循环问题，其实这不是根本原因。大家可以想想 width 为什么就不存在死循环了呢？

BTW，在现代 web 应用中，其实我们有更多的纵向横向布局分割需求，这是传统的百分比不能很好满足的，所以 CSS3 实际上加入了 `vw` 和 `vh` 单位（相对于 viewport 的宽度和长度百分比），这比较好的解决了传统 CSS 中`margin/padding`的百分比所不能满足的那些需求。

`writing-mode`改成`vertical`其实`margin-top`就会按高的百分比了。

#### 4.7.`writing-mode`

和 `float` 属性有些类似，`writing-mode` 原本设计的是控制内联元素的显示的（即所谓的文本布局 Text Layout）。因为在亚洲，尤其像中国这样的东亚国家，存在文字的排版不是水平式的，而是垂直的，例如中国的古诗古文。

因此，`writing-mode` 就是用来实现文字可以竖着呈现的。

- 需要关注的 `writing-mode` 属性值

如果你的项目需要兼容 IE7，则只有关注这两个值就可以了：初始值 `lr-tb` 和 `tb-rl`，对应于 CSS3 规范中的 `horizontal-tb` 和 `vertical-rl`！其他 9 个属性值就让它们去过家家好了。

如果你的项目只需要兼容 IE8+，恭喜你，你可以和 CSS3 规范属性完全对应上了，而且 IE8 下的 `writing-mode` 要比 IE7 强大的多。我们需要关注：初始值 `lr-tb`， `tb-rl` 以及 `tb-lr`，分别对应于 CSS3 中的 `horizontal-tb`， `vertical-rl` 以及 `vertical-lr`。

看上去复杂的属性是不是变得很简单了，重新整一个实战版：

```css
writing-mode: lr-tb | tb-rl | tb-lr (IE8 +);
writing-mode: horizontal-tb | vertical-rl | vertical-lr;
```

对，大家只要记住上面几个就可以了，enough! 因为所谓的垂直排版，实际 web 开发是很少很少遇到的。

有同学可能要疑问了，既然 `writing-mode` 实现文本垂直排版场景有限，那还有什么学习的意义呢？

前面也提到了，虽然 `writing-mode` 创造的本意是文本布局，但是，其带来的文档流向的改变，不仅改变了我们多年来正常的 CSS 认知，同时可以巧妙实现很多意想不到的需求和效果。

#### 4.8.`writing-mode` 不经意改变了哪些规则？

`writing-mode` 将页面默认的水平流改成了垂直流，颠覆了很多我们以往的认知，基于原本水平方向才适用的规则全部都可以在垂直方向适用！

- 1.水平方向也能 `margin` 重叠

清清楚楚写的 `bottom margin` 和 `top margin` 会重叠；然而，这是 CSS2 文档中的描述，在 CSS3 的世界中，由于 `writing-mode` 的存在，这种说法就不严谨了，应该是对立流方向的 `margin` 值会发生重叠。换句话说，如果元素是默认的水平流，则垂直 `margin` 会重叠；如果元素是垂直流，则水平 `margin` 会重叠。

- 2.可以使用 `margin:auto` 实现垂直居中

我们应该都是的，传统的 web 流中，`margin` 设置 `auto` 值的时候，只有水平方向才会居中，因为默认 `width` 是 100% 自适应的，`auto` 才有计算值可依，而垂直方向，`height` 没有任何设置的时候高度绝不会自动和父级高度一致，因此，`auto` 没有计算空间，于是无法实现垂直居中。但是，在 `writing-mode` 的世界里，纵横规则已经改变，元素的行为表现发生了翻天覆地的变化。

但是，在 IE 浏览器下，却没有垂直居中~~

难道 IE 不支持垂直流下的垂直居中？非也，根据鄙人的测试，也就是图片这类替换元素貌似不行，普通的 `block` 元素都是可以的。

- 3.可以使用 `text-align:center` 实现图片垂直居中

- 4.可以使用 `text-indent` 实现文字下沉效果

- 5.可以实现全兼容的 `icon fonts` 图标的旋转效果

- 6.充分利用高度的高度自适应布局

#### 4.9.`writing-mode` 和 `direction` 的关系

`writing-mode`， `direction`， `unicode-bidi`(MDN 文档)是 CSS 世界中 3 大可以改变文本布局流向的属性。其中 `direction`， `unicode-bidi` 属于近亲，经常在一起使用，也是唯一两个不受 CSS3 `all` 属性影响的 CSS 属性，基本上就是和内联元素一起使用使用。

乍一看，`writing-mode` 似乎包含了 `direction`， `unicode-bidi` 某些功能和行为，例如 `vertical-rl` 的 `rl` 和 `direction` 的 `rtl` 值有相似之处，都是从右往左。然而，实际上，两者是没有交集的。因为 `vertical-rl` 此时的文档流为垂直方向，`rl` 表示水平方向，此时再设置 `direction:rtl`，实际上值 `rtl` 改变的是垂直方向的内联元素的文本方向，一横一纵，没有交集。而且 `writing-mode` 可以对块状元素产生影响，直接改变了 CSS 世界的纵横规则，要比 `direction` 强大和鬼畜的多。

#### 4.10.`writing-mode` 和 `-start` 属性的流机制

CSS3 中出现了诸多 `-start/-end` 属性（亦称为**CSS 逻辑属性**），例如：`margin-start/margin-end， border-start/border-end， padding-start/padding-end`， 以及 `text-align:start/text-align:end` 声明。

下面问题来了，为什么会蹦出这么多 `-start/-end` 鬼？

那是因为现代浏览器加强了对流的支持，包括老江湖 `direction`，以及最近年月跟进的 `writing-mode`。

在很久以前，我们的认知里，网页布局就一种流向，就是从左往右，从上往下，因此，我们使用 `margin-left/margin-right` 没有任何问题。但是，如果我们流是可以变化的，例如，一张图片距离左边缘 20 像素，我们希望其文档流是从右往左，同时距离右侧是 20 像素，怎么办？

此时，`margin-left:20px` 在图片 `direction` 变化后，就无效了；但是，`margin-start` 就不会有此问题，所谓 `start`，指的是文档流开始的方向，换句话说，如果页面是默认的文档流，则 `margin-start` 等同于 `margin-left`，如果是水平从右往左文档流，则 `margin-start` 等同于 `margin-right`。`margin-end` 也是类似的。

webkit 内核的浏览器还支持 `-before和-end`，默认流下的 `margin-before` 近似于`margin-top`，`margin-after` 近似于 `margin-bottom`，然而，规范貌似没提及，FireFox 也没支持，`-before和-after` 出场的机会并不多，为什么呢？因为实际上，配合`writing-mode`，`-start/-end` 已经可以满足我们对逻辑位置的需求了，水平和垂直都可以控制，对立方向适用老的 `-top/-bottom`.

例如，我们设置 `writing-mode` 值为 `vertical-rl`，此时 `margin-start` 等同于 `margin-top`，如果此时 `margin-start`，`margin-top` 同时存在，会遵循权重和后来居上原则进行相互的覆盖。

可以看到，场景不同，`margin-start` 的作用也不能，能上能下，能左能右简直在世百变星君。

关于 `-start/-end` 以后有机会会具体展开论述，这里就先点到为止，大家估计目前也不会在实际项目中使用。

#### 4.11.`box-sizing`

`box-sizing` 属性用于更改用于计算元素宽度和高度的默认的 CSS 盒子模型。可以使用此属性来模拟不正确支持 CSS 盒子模型规范的浏览器的行为。

```css
/* 关键字 值 */
box-sizing: content-box;
box-sizing: border-box;

/* 全局 值 */
box-sizing: inherit;
box-sizing: initial;
box-sizing: unset;
```

在 CSS 中，你设置一个元素的 `width` 与 `height` 只会应用到这个元素的内容区。如果这个元素有任何的 `border` 或 `padding` ，绘制到屏幕上时的盒子宽度和高度会加上设置的边框和内边距值。这意味着当你调整一个元素的宽度和高度时需要时刻注意到这个元素的边框和内边距。当我们实现响应式布局时，这个特点尤其烦人。

`box-sizing` 属性可以被用来调整这些表现:

---

- `content-box` 是默认值，标准盒子模型。如果你设置一个元素的宽为 100px，那么这个元素的内容区会有 100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。

---

- `border-box` 告诉浏览器去理解你设置的边框 `border` 和内边距 `padding` 的值是包含在 `width` 内的。也就是说，如果你将一个元素的 `width` 设为 100px，那么这 100px 会包含其它的 `border` 和 `padding`，内容区的实际宽度会是 `width` 减去 `border` + `padding` 的计算值。大多数情况下这使得我们更容易的去设定一个元素的宽高。内容框不能为负，并且被分配到 0，使得不可能使用 `border-box` 使元素消失。

---

> 常用在移动端(设置宽时) `box-sizing:border-box`

#### 4.12.`display`

`display` 指定了元素渲染盒子的类型（_type of rendering box_）

元素默认的 `display` 值的情况如下

- block(块级元素)

`<div>、<p> <ul> <ol> <form> ……`

- inline（内联元素）

`<span> <a> <img> <input> <select> <label> ……`

- list-item（项目列表）

`<li>`

- none(不显示)

`<head>（头部元素都是）<title> <br> <thead> <tbody> <tfoot>`

常用的取值：

- `none`: 隐藏元素
- `inline`：行内元素，顾名思义，用于把一个元素放在行的内部
- `block`：块元素，用于显示占用一行的块
- `inline-block`：以 `block` 的方式渲染，以 `inline` 的方式放置
- `table-cell`：以表格元素的方式显示

##### 4.12.1.隐藏元素

`none` 是最容易理解的取值。当一个元素的 `display` 属性被设为 `none` 时，该元素不会被渲染，也不会占位，就像不存在一样。

一些特殊元素的默认 `display` 值是它，例如 `script` 。 `display: none;` 通常被 JavaScript 用来在不删除元素的情况下隐藏或显示元素。

它和 `visibility` 属性不一样。把 `display` 设置成 `none` 元素不会占据它本来应该显示的空间，但是设置成 `visibility: hidden;` 还会占据空间。

##### 4.12.2.行内元素

行内（`inline`）元素不会打断文本流。它们的出现不会使得后续元素另起一行。行内元素可以设置 `margin` 与 `padding`，但 `margin` 只在水平方向上起作用。另外，对 `inline` 元素设置 `width` 与 `height` 是不起作用的。

##### 4.12.3.块元素

块（`block`）元素会中断当前的文本流，另起一行，并在父元素中尽可能地占据最大宽度。通常块元素不可包含在行内元素内部。

##### 4.12.4.行内块

行内块（`inline-block`）将会产生一个块元素，并以行内元素的方式放置。该元素的样式是以块元素的方式来渲染的，例如可以设置宽和高，然后以行内元素的方式放置在其上下文中，就像在行内元素的位置上替换成这个块元素一样。

行内块还会遇到一个问题，行内块中间没有设置内外边距，但是会自动形成一个小小的白色间隙。这是因为 html 中的换行或空格被浏览器显示了出来。

这个间距这个问题可以通过三种方式解决。

第一种：把 Html 文档写成一行。但是这显然是不现实也不好看的。

第二种：借助 HTML 注释。

```html
<div>box1</div>
<!-- 我是注释
 -->
<div>box2</div>
```

第三种：使用 `letter-spacing: -xpx;`，问题是不好控制间距；

第四种：使用 `font-size: 0;` 基本上可以解决大部分浏览器下 `inline-block` 元素之间的间距(IE7 等浏览器有时候会有 1 像素的间距)。而且 HTML 代码也好看了一些。注意在这种情况下子元素也会继承 `font-size:0` 的属性。所以不要忘记单独给盒子里的文字设置一遍字体属性。

> `inline-block` 与 `inline` 的不同在于：垂直方向上的 `margin` 也会起作用，并且可以设置 `width` 和 `height`。`inline-block` 是非常常用的样式设置。

##### 4.12.5.表格元素

`display` 设为 `table-cell` 的元素与 `<td>` 标签的行为一致，即：可设置 `padding`，不接受 `margin`，可伸缩的 `width`。利用 `table-cell` 属性可以在不写 `<table>` 标签的情况下完成表格布局。

#### 4.13.overflow

指定当内容溢出其块级容器时，是否剪辑内容，显示滚动条或显示溢出的内容。

```css
/* 默认值。内容不会被修剪，会呈现在元素框之外 */
overflow: visible;

/* 内容会被修剪，并且其余内容不可见 */
overflow: hidden;

/* 内容会被修剪，浏览器会显示滚动条以便查看其余内容 */
overflow: scroll;

/* 由浏览器定夺，如果内容被修剪，就会显示滚动条 */
overflow: auto;

/* 规定从父元素继承overflow属性的值 */
overflow: inherit;
```

使用 `overflow` 默认值（`visible`）以外的值将创建一个新的 块级格式化上下文。这在技术层面上是必须的——如果一个浮动元素和滚动条相交，它会强制（重新）包围内容元素。这种行为（重新包围内容元素）会在每一次移动滚动条之后发生，会使得滚动体验变差（慢）。

为使 `overflow` 有效果，块级容器必须有一个指定的高度（`height` 或者 `max-height`）或者将 `white-space` 设置为 `nowrap`。

> 注意: 当相关 HTML 元素被设置为 `scrollTop` 时，即使 `overflow` 值为 `hidden`，这个元素依旧会滚动`。

#### 4.14.float

[浮动出现的意义其实只是用来让文字环绕图片而已，仅此而已。](http://www.zhangxinxu.com/wordpress/2010/01/css-float%E6%B5%AE%E5%8A%A8%E7%9A%84%E6%B7%B1%E5%85%A5%E7%A0%94%E7%A9%B6%E3%80%81%E8%AF%A6%E8%A7%A3%E5%8F%8A%E6%8B%93%E5%B1%95%E4%B8%80/)

指定一个元素应沿其容器的左侧或右侧放置，允许文本和内联元素环绕它。该元素从网页的正常流动中移除，尽管仍然保持部分的流动性（与绝对定位相反）。

##### 4.14.1. 浮动的"包裹性"

先说句您应该没有见过的结论：撇开浮动的"破坏性"，浮动就是个带有方位的 `display:inline-block` 属性。

`display:inline-block` 某种意义上的作用就是包裹(wrap)，而浮动也有类似的效果。举个常见例子，或许您有实现宽度自适应按钮的经验，实现宽度自适应的关键就是要让按钮的大小自适应于文字的个数，这就需要按钮要自动包裹在文字的外面。我们用什么方法实现呢？一就是 `display:inline-block`；二就是 `float`。

然而，`float` 无法等同于 `display:inline-block`，其中原因之一就是浮动的方向性，`display:inline-block` 仅仅一个水平排列方向，就是从左往右，而 `float` 可以从右往左排列，这就是两者的差异。

##### 4.14.2. 浮动的"破坏性"

浮动可以说是所有 CSS 属性中的"破坏之王"。要理解浮动的破坏性，我们要从浮动最原始的意义入手。

所以，只要您弄明白了为什么文字会环绕含浮动属性的图片，您就会知道我所说的浮动的"破坏性"是什么意思了。

先说结论：文字之所以会环绕含有 `float` 属性的图片，是因为浮动破坏了正常的 `line boxes`。

**`line boxes` 模型**: `inline boxes` 不会让内容成块显示，而是排成一行，如果外部含 `inline` 属性的标签(`<span>， <a>， <cite>` 等)，则属于 `inline boxes`，如果是个光秃秃的文字，则属于匿名 `inline boxes`。`line boxes` 的高度是由其内部最高的 `inline boxes` 的高度决定的

`content area` 是一种围绕文字看不见的 box。`content area` 的大小与 `font-size` 大小相关。

默认情况下，图片与文字基线对齐，图片与文字在同一行上；一张图片只能与一行文字对齐。而要想让一张图片要与多行文字对齐，您唯一能做的就是破坏正常的 `line boxes` 模型。

正常情况下，图片自身就是个 `inline boxes`，与两侧的文字 `inline boxes` 共同组成了 `line boxes`，但是，一旦图片加入了浮动，情况就完全变了。我认为是浮动彻底破坏了 `img` 图片的 `inline boxes` 特性，至少有一点我可以肯定，图片的 `inline boxes` 不存在了。一旦图片失去了 `inline boxes` 特性就无法与 `inline boxes` 的文字排在一行了，其会从 `line boxes` 上脱离出来，跟随自身的方位属性，靠边排列。

这个从 `line boxes` 上脱离的浮动元素其实就是一个躯体，一个空壳子，表象。因为其没有 `inline boxes`。有人可能会问，没有 `inline boxes` 就没有呗，有什么大不了的？非也非也！这个 `inline boxes` 很个很重要的概念。

在目前的 CSS 的世界中，所有的高度都是有两个 CSS 模型产生的，一个是 **box 盒状模型**，对应 CSS 为 "`height + padding + margin`"，另外一个是**line box 模型**，对应样式为 "`line-height`"。

前者的 `height` 属性分为明显的 `height` 值和隐藏的 `height` 值，所谓隐藏的 `height` 值是指图片的高度，一旦载入一张图片，其内在的 `height` 值就会起作用，即使您看不到 `"height"` 这个词。

而后者针对于文字等这类 `inline boxes` 的元素（图片也属于 `inline boxes`，但其 `height` 比 `line-height` 作用更凶猛，故其 `inline boxes` 高度等于其自身高度，对 `line-height` 无反应），`inline boxes` 的高度直接受 `line-height` 控制（改变`line-height` 文字拉开或重叠就是这个原因），而真正的高度表现则是由每行众多的 `inline boxes` 组成的 `line boxes`（等于内部最高的 `inline box` 的高度），而这些 `line boxes` 的高度垂直堆叠形成了 `containing box` 的高度，也就是我们见到的 `<div>` 或是 `<p>` 标签之类的高度了。

所以，对于 `line box` 模型的元素而言，没有 `inline boxes`，就没有高度了，而浮动却恰恰做了这么龌龊的事情，其直接将元素的 `inline boxes` 也破坏了，于是这些元素也就没有了高度。

浮动破坏了图片的 `inline box`，产生了两个结果：一是图片无法与文字同行显示，脱离了其原来所在的 `line box` 链；二是没有了高度（无 `inline box` -> 无 `line box` -> 无高度）。而这些结果恰恰是文字环绕图片显示所必须的。

我们可以拿浮动元素与绝对定位元素做对比或许可以帮助理解。与浮动元素一样，绝对定位元素也具有"包裹性"，此"包裹性"适用于任何元素。那么，浮动元素与绝对定位元素的差别在哪里呢？我觉得最主要的差别在于：绝对定位的元素脱离了文档流，而浮动元素依旧在文档流中；而这造成的显示上的差异就是：同处于文档流中的文字实体不会与浮动元素重叠，而会与绝对定位元素重叠。这就是文字环绕显示的重要原因之一：虽然图片实际占据的高度为 0，但是由于其宽度实体存在（包裹性），同样是 `content area` 实体的文字不会与之重叠（外部的容器盒子 `containing box`(`<p>， <div>， <li>`)会重叠），这就好比篮球场上站了个植物人，虽然其几乎不可能得分，运球之类，但是他的实体在那里，它可以阻挡同一水平空间上的同一类型的个体（即人）直接穿过去，要通过，得绕道。但是其无法阻挡整个球队的向前推进。

`display:inline-block` 将对象呈递为内联对象，但是对象的内容作为块对象呈递。所谓对象呈递为内联对象就是元素呈递为 `inline box`，所以浮动"包裹性"所产生的结果就是使得元素转为了 `line box` 模型中的 `inline box` 元素。浮动的"包裹性"让元素变成类似于 `inline box` 的元素，而浮动的"破坏性"正是破坏 `inline box` 元素的。对于 `block` 水平的这类块状元素需要先让其变成类似效果的内联元素，然后再破坏之。

> 注意：
> IE 浏览器：`obj.style.styleFloat = "left";`
> 其他浏览器：`obj.style.cssFloat = "left";`

##### 4.14.3.浮动的原理

浮动的框可以左右移动，直至它的外边缘遇到包含框或者另一个浮动框的边缘。浮动框不属于文档中的普通流，当一个元素浮动之后，不会影响到块级框的布局而只会影响内联框（通常是文本）的排列，文档中的普通流就会表现得和浮动框不存在一样，当浮动框高度超出包含框的时候，也就会出现包含框不会自动伸高来闭合浮动元素（"**高度塌陷**"现象）。

```css
/* Keyword values */
float: left;
float: right;
float: none;

/* Global values */
float: inherit;
float: initial;
float: unset;
```

> 由于 `float` 意味着使用块布局，它在某些情况下修改 `display` 值的计算值。

- 特点：
  - 脱离文档流(父级元素找不到子级元素)，相当于来到了第二层级，平行于基本的文档流
  - 所有元素可以设置这个属性
  - 将元素的 `display` 属性由 `inline` 或 `inline-block` 改为 `block`
  - 浮动元素不设置宽高时，宽高是由内容决定的
  - 行内元素、行内块级元素和文字会围绕着浮动元素排布

##### 4.14.4.清除浮动(clearfix hack)

- 1.给父级元素设置高度

  - 这个元素内是否有内容，高度都一定

- 2.给父级元素设置 `overflow: hidden;` 属性(IE6 中还需要 `zoom:1;`)

> 此方法不存在结构化和语义问题并且代码量也少，但是内容增多时不会自动换行导致内容被隐藏，无法显示需要溢出的元素；要是里面的元素要是想来个 `margin` 负值定位或是负的绝对定位，直接被裁掉了。

- 3.父元素设置 `overflow:auto;` (IE6 需要触发 hasLayout)

> 但是多个嵌套后，firefox 某些情况会造成内容全选；IE 中 `mouseover` 造成宽度改变时会出现最外层模块有滚动条等，firefox 早期版本会无故产生 `focus` 等；
> 如果有隐藏 box，会因为将隐藏 box 的高度加入，使得总体高度增加，影响布局（2017.08.09，）

- 4.给最后一个浮动元素之后加(从语义化的角度来看是不合理的)

`<div style="clear:both"></div>`

> 增加浏览器渲染负担。

然而这个方法只是在同一块级格式化上下文（`block formatting context`）中没有其他元素的时候才是有效的。

如果不能使用清除浮动，另一种做法是浮动容器的限制块级格式化上下文。即将其中一个非浮动元素的 `overflow` 属性值变成 `hidden` 或者 `auto`，因为这样可以让容器元素伸展到能够包含浮动元素，而不是让他们超出块元素的底部。？？？

> 设置 `overflow` 为 `scroll` 也可以让块元素撑大来包含所有的浮动子元素，但是这样不论内容有多少都会显示出一个滚动条。即使 `height` 默认值为 `auto`，我们还是设置了，是为了表明容器应该增大高度以便包裹住里面的内容。

- 5.`clear:both;` 清除浮动

  - 使用这个属性的元素必须是块级元素
  - 使用这个属性的元素必须放在最后一个浮动元素之后
  - 使用这个属性的元素不能带有 `float` 属性

- 6.父元素设置 `display:table`

结构语义化完全正确，代码量极少但是盒模型属性已经改变，由此造成的一系列问题，得不偿失，不推荐使用

> 注意：`display:table` 本身无法触发 BFC，但是它会产生匿名框(anonymous boxes)，而匿名框中的 `display:table-cell` 可以触发 BFC，简单说就是，触发块级格式化上下文的是匿名框，而不是 `display:table`。所以通过 `display:table` 和 `display:table-cell` 创建的 BFC 效果是不一样的。

- 7.使用伪元素

```css
.clearfix:after{
  display: block;
  content: "";
  clear: both;
}
.clearfix{
  *zoom:1; 兼容低版本浏览器
  css hack
}
```
