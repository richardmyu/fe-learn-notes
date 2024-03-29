# CSS

一种用来表现 HTML 或 XML（标准通用语言的一个子集）等文件样式的计算机语言。CSS 不仅可以静态的修饰网页，还可以配合各种脚本语言动态地对网页各元素进行格式化。

CSS 能对网页元素位置的排版进行像素级精确控制，支持几乎所有的字体字号样式，拥有对网页对象和模型样式编辑的能力。

## CSS 基础

### 1.css 的作用

---

- 样式定义如何显示 HTML 元素，存储在样式表中；
- 添加样式到 HTML，是为了解决内容与表现分离的问题；
- 外部样式表可以极大提高工作效率，存储在 CSS 文件中；
- 多个样式定义可以层叠为一；

---

> 作用：给 html 文档添加静态或者动态的样式

### 2.html 引入 css 的四种方式

#### 2.1. 行内式

直接写在标签内部，通过标签属性 `style` 引入：

```html
<div style="css 属性名：属性值；css 属性名：属性值；"></div>
<img src="" alt="" style="css 属性名：属性值；" />
```

#### 2.2. 内嵌式

将 css 代码写在 `style` 元素内，通过 css 选择器选择 `html` 元素，将 css 样式添加给这个元素

> `style` 这个元素，一般放在 head 元素内

```html
<style>
  div {
    color: red;
  }
</style>
<div>div 标签</div>
<div>我是第二个 div 标签</div>
```

#### 2.3. 外链式

将 css 代码单独放置在一个 css 文件中，再通过 `link` 元素将这个 css 文件引入到 html 页面中

```html
<link rel="stylesheet" href="url" type="text/css" />
<!-- link //标签 -->
<!-- rel="stylesheet" //标签属性名：标签属性值 -->
<!-- rel //不可缺少 -->
<!-- stylesheet //样式表 -->
<!-- type //可以省略，但是建议写全 -->
```

#### 2.4. 导入式

`@import "url";` 都是引入一个单独的 CSS 文件

---

- 导入式在日常工作中，我们不用
- `@import "url"`; 既不是 html 标签，也不是 css 属性，它是一条声明语句；
- 这条声明语句必须写在 `style` 属性内，且要至于所有 CSS 属性之前

---

```html
<style>
  @import "url";
</style>
```

> 常用的引入方式是外链式
> **四种引入的权重：内联式 > 嵌入式 > 外部式**
> 在选择器相同的情况下，最后加载会覆盖前面的样式

### 3. 外部式和导入式的差别

1. 类型：`link` 是 `HTML` 标签，`@import` 完全是 CSS 提供的方式，要写在 CSS 文件或者 `style` 标签中；

2. 加载：当一个页面加载时，`link` 引用的 CSS 文件会被同时加载，而 `@import` 引入的 CSS 文件要等到页面全部加载完后再加载；

3. 控制 DOM：当使用 JavaScript 控制 DOM 取改变 CSS 样式的时候，只能用 `link` 标签，因为 `@import` 是不能被 DOM 控制的；

4. 兼容性：由于 `@import` 是 CSS2.1 提出的，所以旧版浏览器不支持，只有在 IE5 以上的才能识别，而 `link` 标签无此问题。

### 4. 选择器

| 选择器       | 样式                       | 代码样式            | 作用                                 |  权重  |
| ------------ | -------------------------- | ------------------- | ------------------------------------ | :----: |
| 标签选择器   | `标签名{属性名：属性值；}` | `div{width：20px;}` | 给文档内所有的该标签添加样式         |   1    |
| 类选择器     | `类名`                     | `.div1{}`           | 给文档内所有该类名的标签添加样式     |   10   |
| ID 选择器    | `ID 名`                    | `#div1{}`           | 给有 ID 名的标签添加样式             |  100   |
| 通配符选择器 |                            | `*`                 | 给文档内所有标签添加样式             |  0~1   |
| 并集选择器   | `,`                        | `h2，p{}`           | 给不同的选择器添加相同的样式         | 不叠加 |
| 交集选择器   | `.`                        | `li.list1{}`        | 更有针对性选择标签（实质是增加权重） |  权和  |
| 子代选择器   | `>`                        | `div>ul>li{}`       | 特定选择直系子代添加样式             |  权和  |
| 后代选择器   | ``                         | `div ul li{}`       | 作用于所有子代标签来添加样式         |  权和  |
| 类型选择器   | `[属性名=属性值]`          | `[type="text"]`     | 通过标签的属性值的不同来区分元素     |   10   |
| 伪类选择器   | `标签：伪类元素名`         | `a:after{}`         | 指这个标签的一种状态                 |

> 一个 HTML 元素可以有多个 class 属性值，每一个类名用空格隔开；（类名可以重复使用； ID 属性值只能用一次；)

标签具有 class 属性，class 属性值即为类名，选择类名时注意：

- 严格区分大小写；
- 不能用汉字、纯数字来命名，也不能用数字开头；
- 可以取多个，用空格隔开

> 注意：
> 一般不使用通配符选择器，因为全部匹配耗能耗时；
> 标签选择器和其他类型选择器组合时，通常把标签选择器放前面；
> 组成交集选择器的所有选择器必须作用于同一元素；
> 交集选择器组合模式：标签和类型，标签和类，类和类，标签和 ID；
> 类型选择器：两个类名不生效；**作用于不同元素**;
> 类型选择器一般用在表单元素；不仅限于 class 和 ID 属性；
> 子级选择器不能跨级，必须一代一代传递；
> CSS 查找一般是从右到左，越靠近 `{}` 的选择器越精确，查找速度越快，耗费性能越少；
> ID 选择器权重为 100，即使被组合选择器超越，也不会被覆盖；
> 选择器数量不要过多；靠近 `{}` 的如果是类名，速度会比较快；
> 标签属性选择器在使用的时候，如果有两个类名（属性名），它们是不生效的

### 5. 伪类和伪元素

CSS 引入伪类和伪元素概念是为了格式化文档树以外的信息。也就是说，伪类和伪元素是用来修饰不在文档树中的部分。

伪类和伪元素是预定义的、独立于文档元素的。它们获取元素的途径也不是基于 `id`、`class`、属性这些基础的元素特征，而是在处于特殊状态的元素（伪类），或者是元素中特别的内容（伪元素）。

目前为止，伪元素在一个选择器里只能出现一次，并且只能出现在末尾。实则，伪元素是选中了某个元素的符合逻辑的某个实际却不存在的部分，所以应用中也不会有人将其误写成多个。

伪类则是像真正的类一样发挥着类的作用，没有数量上的限制，只要不是相互排斥的伪类，也可以同时使用在相同的元素上。

### 6. 伪类

伪类用于当已有元素处于的某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，我们可以通过 `:hover` 来描述这个元素的状态。虽然它和普通的 css 类相似，可以为已有的元素添加样式，但是它只有处于 dom 树无法描述的状态下才能为元素添加样式，所以将其称为伪类。

### 7. 伪元素

伪元素用于创建一些不在文档树中的元素，并为其添加样式。比如说，我们可以通过 `:before` 来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

与伪类针对特殊状态的元素不同的是，伪元素是对元素中的特定内容进行操作，它所操作的层次比伪类更深了一层，也因此它的动态性比伪类要低得多。

实际上，设计伪元素的目的就是去选取诸如元素内容第一个字（母）、第一行，选取某些内容前面或后面这种普通的选择器无法完成的工作。它控制的内容实际上和元素是相同的，但是它本身只是基于元素的抽象，并不存在于文档中，所以叫伪元素。

通过 css 代码向指定元素内添加假的 (html 中不存在）的元素

- `before` 会出现在元素所有内容之前
- `after` 会出现在元素所有内容之后

使用伪元素的时候要保证两个前提：

- 要有 `display:block` 这个属性
- 要有 `content` 这个属性，这个属性的属性值可以为空，但是引号不能少；

### 8. 伪类和伪元素的区别

- 1. 伪类的操作对象是文档树中已有的元素，而伪元素则创建了一个文档数外的元素。因此，伪类与伪元素的区别在于：有没有创建一个文档树之外的元素。

- 2. 伪元素和伪类之所以这么容易混淆，是因为他们的效果类似而且写法相仿，但实际上 CSS3 为了区分两者，已经明确规定了伪类用一个冒号来表示，而伪元素则用两个冒号来表示；

- 3. 除了一些低于 IE8 版本的浏览器外，大部分浏览器都支持伪元素的双冒号 (`::`) 表示方法。然而，除了少部分伪元素，如 `::backdrop` 必须使用双冒号，大部分伪元素都支持单冒号和双冒号的写法，比如 `::after`，写成 `:after` 也可以正确运行。

### 9. 伪类选择器

#### 9.1. 动态伪类

因为这些伪类并不存在于 HTML 中，而只有当用户和网站交互的时候才能体现出来，动态伪类包含两种，第一种是我们在链接中常看到的锚点伪类；如 "`:link`"，"`:visited`"; 另外一种被称作用户行为伪类，如 "`:hover`"，"`:active`" 和 "`:focus`"。

```css
.demo a:link {
  color: gray;
} /*链接没有被访问时前景色为灰色*/
.demo a:visited {
  color: yellow;
} /*链接被访问过后前景色为黄色*/
.demo a:hover {
  color: green;
} /*鼠标悬浮在链接上时前景色为绿色*/
.demo a:active {
  color: blue;
} /*鼠标点中激活链接那一下前景色为蓝色*/
```

对于这四个锚点伪类的设置，有一点需要特别注意，那就是他们的先后顺序，要让他们遵守一个爱恨原则 **LoVe/HAte**，也就是 `link--visited--hover--active`。其中 `:hover` 和 `:active` 又同时被列入到用户行为伪类中，他们所表达的意思是：

- `:hover` 用于当用户把鼠标移动到元素上面时的效果；**只能用于块状元素**

- `:active` 用于用户点击元素那一下的效果（正发生在点的那一下，松开鼠标左键此动作也就完成了）

- `:focus` 用于元素成为焦点，这个经常用在表单元素上。

> `:link` 和 `:visited` 互斥，存一不二；常用 `:hover`;

#### 9.2.UI 元素状态伪类

我们把 "`:enabled`"，"`:disabled`"，"`:checked`" 伪类称为 UI 元素状态伪类，这些主要是针对于 HTML 中的表单元素操作，最常见的比如 "`type='text'`" 有 `enable` 和 `disabled` 两种状态，前者为可写状态而后者为不可写状态；

另外在 `type="radio"` 和 `type="checkbox"` 中，会有有 "`checked`" 和 "`unchecked`" 两种状态。来看两个实例，比如说你想将 "`disabled`" 的文本框与别的文本框区别出来，你就可以这样应用：

```css
input[type="text"]:disabled {
  border: 1px solid #999;
  background-color: #fefefe;
}
```

> 这样一来就把页面中禁用的文本框应用了一个不同的样式。那么对于其他几个用法是一样的，这里就不在讲述。IE6-8 不支持 "`:checked`"，"`:enabled`"，"`:disabled`"这三种选择器。

#### 9.3.CSS3 的子类选择器

这节内容才是关键，也是 CSS3 选择器最新部分，有人也称这种选择器为 CSS3 结构类，下面我们通过实际的应用来具体了解他们的使用和区别，首先列出他具有的选择方法：

```css
:first-child() /*选择某个元素的第一个子元素；*/
:last-child() /*选择某个元素的最后一个子元素；*/

:nth-child() /*选择某个元素的一个或多个特定的子元素；*/
:nth-last-child() /*选择某个元素的一个或多个特定的子元素，从这个元素的最后一个子元素开始算；*/
:nth-of-type() /*选择指定类型的元素；*/
:nth-last-of-type()/*选择指定的元素，从元素的最后一个开始计算；*/

:first-of-type() /*选择一个上级元素下的第一个同类子元素；*/
:last-of-type() /*选择一个上级元素的最后一个同类子元素；*/

:only-child() /*选择的元素是它的父元素的唯一一个了元素；*/
:only-of-type() /*选择一个元素是它的上级元素的唯一一个相同类型的子元素；*/

:empty() /*选择的元素里面没有任何内容。*/
```

- `:nth-child(n)`，其中 n 是一个简单的表达式，那么 "n" 取值是从 "1" 开始计算的（非 n 的表达式则是从 "0" 开始）；如果你在实际应用中直接这样使用的话，将会选中所有子元素。

> 请注意了，这里的 "n" 只能是 "n"，不能使用其他字母代替，不然会没有任何效果的。

- `:nth-child(2n)`，这中方式是前一种的变身，我们可以选择 n 的 2 倍数，当然其中 "2" 可以换成你自己需要的数字。

> `:nth-child(2n)` 也等于 `:nth-child(even)` 效果。

- `:nth-child(2n-1)`，这个选择器是在 "`:nth-child(2n)`" 基础上演变过来的，上面说了人是选择偶数，那么我们在他的基础上减去 "1" 就变成奇数选择。
- `:nth-child(n+5)`，这个选择器是选择从第五个元素开始选择，这里的数字你可以自己定义；
- `:nth-child(-n+5)`，这种选择器刚好和上面的选择器相反，这个是选择第 5 个前面的；
- `:nth-child(4n+1)`，这种方法是实现隔几选一的效果，比如我们这里是隔三选一；

#### 9.4. 否定选择器`:not`

否定选择器和 jQuery 中的 `:not` 选择器一模一样，就拿 `form` 中的元素来说明这个选择器的用法，比如你想对 `form` 中所有 `input` 加边框，但又不想 `submit` 也起变化，此时就可以使用 `:not` 为实现：

```css
input:not([type="submit"]) {
  border: 1px solid red;
}
```

> 否定选择器 `:not()`，可以让你定位不匹配该选择器的元素。

#### 9.5. 伪元素

CSS 中的伪元素大家以前看过："`:first-line`，`:first-letter`，`:before`，`:after`" 那么在 CSS3 中，他对伪元素进行了一定的调整，在以前的基础上增加了一个 "`:`" 也就是现在变成了 "`::first-letter`，`::first-line`，`::before`，`::after`"，另外他还增加了一个 "`::selection`"，两个 "`::`" 和一个 "`:`" 在 CSS3 中主要用来区分伪类和伪元素，到目前来说，这两种方式都是被接受的，也就是说不管使用哪种写法所起的作用都是一样的，只是一个书写格式不同而以。

## CSS 属性

### 1.Text 文本属性

通过 CSS 的 `Text` 属性，你可以改变页面中文本的颜色、字符间距、对齐文本、装饰文本、对文本进行缩进等等

#### 1.1. 设置文字的颜色

- `color`
  - 十六进制值 - 如"`＃FF0000`"
  - 一个 RGB 值 - 如"`RGB（255，0，0）`"
  - 颜色的名称 - 如"`red`"

> 对于 W3C 标准的 CSS：如果你定义了颜色属性，你还必须定义背景色属性。

#### 1.2. 文本的水平对齐 text-align

定义行内内容（例如文字）如何相对它的块父元素对齐。`text-align` 并不控制块元素自己的对齐，只控制它的行内内容的对齐。

- 值：
  - `left` 左对齐
  - `right` 右对齐
  - `center` 居中对齐
  - `justify` 两端对齐（每一行被展开为宽度相等，左，右外边距是对齐，对最后一行不起作用）
  - `justify-all`：效果等同于 `justify`，但还会让最后一行也两端对齐。
  - `start`：内容对齐开始边界（如果内容方向是左至右，则等于 `left`，反之则为 `right`。)。
  - `end`：内容对齐结束边界。
  - `match-parent`：这个值和 `inherit` 表现一致，只是该值继承的 `start` 或 `end` 关键字是针对父母的 `direction`值并计算的，计算值可以是 `left` 和 `right` 。

> 如果想把一个行内元素的第一行"缩进"，可以用左内边距或外边距创造这种效果。

#### 1.3. 文本修饰 text-decoration

- `text-decoration`
  - `none` 默认。定义标准的文本
  - `overline` 定义文本下的一条线
  - `underline` 定义文本上的一条线
  - `line-through` 定义穿过文本下的一条线

> 但是，无论什么字体，什么浏览器，`inline` 元素的上横行 (`text-decoration`) 和上边框 (`border-top`) 和上外框 (`outline`) 都是紧密连接在一起的。

#### 1.4. 文本转换 text-transform

- `text-transform:`
  - `none`
  - `uppercase` 转大写
  - `lowercase` 转小写
  - `capitalize` 每个单词的首字母大写

#### 1.5. 文本缩进

指定文本的第一行的缩进

- `text-indent: 2em;`

> 一般来说，可以为所有块级元素应用 `text-indent`，但无法将该属性应用于行内元素，图像之类的替换元素上也无法应用 `text-indent` 属性。不过，如果一个块级元素（比如段落）的首行中有一个图像，它会随该行的其余文本移动。
> `text-indent` 还可以设置为负值。利用这种技术，可以实现很多有趣的效果，比如"悬挂缩进"，即第一行悬挂在元素中余下部分的左边。

#### 1.6. 文本间隔

- 字间距：`letter-spacing;`
- 词间距：`word-spacing;`
- 行间距：`line-height;`

#### 1.7. 处理空白符

`white-space` 属性会影响到用户代理对源文档中的空格、换行和 tab 字符的处理。

#### 1.8. 文字内换行（断点）

`word-break` :

- `normal`: 使用浏览器默认的换行规则
- `break-all`: 允许在单词内换行。
- `keep-all`: 只能在半角空格或连字符处换行。

#### 1.9. 文本换行

`word-wrap`:

- `normal`: 只在允许的断字点换行（浏览器保持默认处理）。
- `break-word`: 在长单词或 URL 地址内部进行换行。

> `word-wrap` 属性其实也是很有故事的，之前由于和 `word-break` 长得太像，难免会让人记不住搞混淆，晕头转向，于是在 CSS3 规范里，把这个属性的名称给改了，叫做：`overflow-wrap`。哎呀，这个新属性名称显然语义更准确，也更容易区别和记忆。但是呢，也就 Chrome/Safari 等 WebKit/Blink 浏览器支持。

#### 1.10. 单行文本溢出的省略（满足四个条件）

- 必须设置宽度
- `white-space: nowrap;` 强制文本不换行
- `overflow: hidden;` 溢出隐藏
- `text-overflow: ellipsis` 省略多余文本

`text-overflow`: 定义文本溢出时如何处理，有 2 个有效值：

- `clip`：当内联内容溢出块容器时，将溢出部分裁切掉。
- `ellipsis`：当内联内容溢出块容器时，将溢出部分替换为（...）。

#### 1.11. 多行文本溢出省略

与单行文本不同的是，这里不能使用上面的 `text-overflow` 属性，这里使用 webkit 内核浏览器专用方法，所以可以用在移动端。

- `display: -webkit-box;`
- `-webkit-box-orient: vertical;`
- `-webkit-line-clamp: 3;`
- `overflow: hidden;`

> `-webkit-line-clamp` 用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的 WebKit 属性。常见结合属性：
> `display: -webkit-box;` 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
> `-webkit-box-orient` 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。

#### 1.12. 竖直对齐 verticla-align

- `verticla-align`
  - 长度：通过距离升高（正值）或降低（负值）元素。'0cm' 等同于 '`baseline`'
  - 百分值：通过距离（相对于 `line-height` 值的百分大小）升高（正值）或降低（负值）元素。'0%' 等同于 '`baseline`'
  - `baseline`: 默认。元素的基线与父元素的基线对齐。
  - `sub`: 降低元素的基线到父元素合适的下标位置。
  - `super`: 升高元素的基线到父元素合适的上标位置。
  - `top`: 把对齐的子元素的顶端与 line box 顶端对齐。
  - `text-top`: 把元素的顶端与父元素内容区域的顶端对齐。
  - `middle`: 元素的中垂点与 父元素的基线加 1/2 父元素中字母 x 的高度对齐。
  - `bottom`: 把对齐的子元素的底端与 line box 底端对齐。
  - `text-bottom`: 把元素的底端与父元素内容区域的底端对齐。
  - `inherit`: 采用父元素相关属性的相同的指定值。

> 改变对齐方式的时候，所有元素（参与排列的）都要加上这个属性

#### 1.13. 为什么 vertical-align 属性不起作用？

`vertical-align`，是 "`inline-block` 依赖型元素"，也就是说，只有一个元素属于 `inline` 或是 `inline-block` 水平，其身上的 `vertical-align` 属性才会起作用。

例如图片，按钮，单复选框，单行/多行文本框等 HTML 控件，只有这些元素默认情况下会对 `vertical-align` 属性起作用。

虽然 `vertical-align` 属性只会在 `inline-block` 水平的元素上起作用，但是其影响到的元素涉及到 `inline` 属性的元素，这里千万记住，`inline` 水平元素受 `vertical-align` 属性而位置改变等不是因为其对 `vertical-align` 属性敏感或起作用，而是受制于整个 `line box` 的变化而不得不变化的，这个后面会较为深入的分析。

### 2.Background

#### 2.1.`background`

设置所有背景属性，属性如下：`color，image，repeat，position，size，origin，clip，attachment`

语法：`background: #00FF00 url(bgimage.gif) no-repeat fixed top;`

> 通常建议使用这个属性，而不是分别使用单个属性，因为这个属性在较老的浏览器中能够得到更好的支持，而且需要键入的字母也更少。

#### 2.2.`background-color`

定义元素的背景色

- `color_name` 规定颜色值为颜色名称的背景颜色（比如 `red`）
- `hex_number` 规定颜色值为十六进制值的背景颜色（比如 `#ff0000`）
- `rgb_number` 规定颜色值为 `rgb` 代码的背景颜色（比如 `rgb(255，0，0)`）
- `transparent` 默认。背景颜色为透明
- `inherit` 规定应该从父元素继承 `background-color` 属性的设置。

`background-color` 属性为元素设置一种纯色。这种颜色会填充元素的内容、内边距和边框区域，扩展到元素边框的外边界（但不包括外边距）。如果边框有透明部分（如虚线边框），会透过这些透明部分显示出背景色。

> 提示：`background-color`不能继承，其默认值是 `transparent`。如果一个元素没有指定背景色，那么背景就是透明的，这样其父元素的背景才可见。

##### 2.2.3.`background-image`

定义元素的背景图像

- `url("URL")` 指向图像的路径
- `none` 默认值。不显示背景图像
- `inherit` 规定应该从父元素继承 `background-image` 属性的设置

元素的背景占据了元素的全部尺寸，包括内边距和边框，但不包括外边距。默认地，背景图像位于元素的左上角，并在水平和垂直方向上重复。

> 提示：请设置一种可用的背景颜色，这样的话，假如背景图像不可用，页面也可获得良好的视觉效果。

##### 2.2.4.`background-repeat`

设置是否及如何重复背景图像

- `repeat` 默认。背景图像将在垂直方向和水平方向重复
- `repeat-x` 水平平铺
- `repeat-y` 竖直平铺
- `no-repeat` 不平铺（背景图像将仅显示一次）
- `inherit` 规定应该从父元素继承

> 提示：背景图像的位置是根据 `background-position` 属性设置的。如果未规定 `background-position` 属性，图像会被放置在元素的左上角。

##### 2.2.5.`background-position`

设置背景图像的起始位置

- `top/bottom/left/right/center`
- 长度值：`100px` 或 `5cm`
- 百分比（第一个值是水平位置，第二个值是垂直位置）

图像放置关键字最容易理解的作用就像其名字的意义。例如，`top left` 使图像放置在元素内边距区的左上角。

只要保证不超过两个关键字：一个对应水平方向，另一个对应垂直方向，那么你可以设置位置关键字以任何顺序出现。

如果只有一个关键字，则会默认另一个关键字为 `center`；如果只规定了一个百分比值或长度值，另一个值将是 `50%`。

> 提示：您需要把 `background-attachment` 属性设置为 "`fixed`"，才能保证该属性在 Firefox 和 Opera 中正常工作。

##### 2.2.6.`background-attachment`

设置背景图像是否固定或者随着页面的其余部分滚动

- `scroll` 默认值。背景图像会随着页面其余部分的滚动而移动
- `fixed` 当页面的其余部分滚动时，背景图像不会移动
- `inherit` 规定应该从父元素继承属性

##### 2.2.7.`background-clip`

规定背景的绘制区域

- `border-box` 背景被裁剪到边框盒
- `padding-box` 背景被裁剪到内边距框
- `content-box` 背景被裁剪到内容框

##### 2.2.8.`background-origin`

规定 `background-position` 属性相对于什么位置来定位

- `border-box` 背景图像相对于边框盒来定位
- `padding-box` 背景图像相对于内边距框来定位
- `content-box` 背景图像相对于内容框来定位

> 注释：如果背景图像的 `background-attachment` 属性为 "`fixed`"，则该属性没有效果。

##### 2.2.9.`background-size`

规定背景图片的尺寸

- `length` 第一个值设置宽度，第二个值设置高度
- `percentage` 以父元素的百分比来设置背景图像的宽度和高度
- `cover` 把背景图像扩展至足够大，以使背景图像完全覆盖背景区域
- `contain` 把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域

> 在 `length` 和 `percentage` 中，如果只设置一个值，则第二个值会被设置为 "`auto`"。

### 3.Border

#### 3.1.border

设置所有的边框属性

- `border-width` 规定边框的宽度
- `border-style` 规定边框的样式
- `border-color` 规定边框的颜色
- `inherit` 规定应该从父元素继承

#### 3.2.border-width

设置元素的所有边框宽度

- `thin` 定义细的边框 (1px)
- `medium` 默认。定义中等的边框 (3px)
- `thick` 定义粗的边框 (5px)
- `length` 允许您自定义边框的宽度
- `inherit` 规定应该从父元素继承边框宽度

> 只有当边框样式不是 `none` 时才起作用。如果边框样式是 `none`，边框宽度实际上会重置为 0。不允许指定负长度值。
> 请始终在 `border-width` 属性之前声明 `border-style` 属性。元素只有在获得边框之后，才能改变其边框的宽度。

#### 3.3.border-style

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

#### 3.4.border-color

设置元素的所有边框颜色

- `color_name` 规定颜色值为颜色名称的边框颜色
- `hex_number` 规定颜色值为十六进制值的边框颜色
- `rgb_number` 规定颜色值为 `rgb` 代码的边框颜色
- `transparent` 默认值。边框颜色为透明
- `inherit` 规定应该从父元素继承边框颜色

> `border-width、border-style、border-color` 属性是一个简写属性，可设置一个元素的所有边框中可见部分的颜色，或者为 4 个边分别设置不同的颜色。

#### 3.5.border-top/right/bottom/left

- `border-top/right/bottom/left-width` 规定 上/右/下/左 边框的宽度
- `border-top/right/bottom/left-style` 规定 上/右/下/左 边框的样式
- `border-top/right/bottom/left-color` 规定 上/右/下/左 边框的颜色
- `inherit` 规定应该从父元素继承

### 4.Font

#### 4.1.font

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

> 说明：这个简写属性用于一次设置元素字体的两个或更多方面。使用 `icon` 等关键字可以适当地设置元素的字体，使之与用户计算机环境中的某个方面一致。注意，如果没有使用这些关键词，至少要指定字体大小和字体系列。
> 可以按顺序设置如下属性：`font-style、font-variant、font-weight、font-size/line-height、font-family`

#### 4.2.font-family

规定元素的字体系列

- `family-name/generic-family` 用于某个元素的字体族名称或/及类族名称的一个优先表。默认值：取决于浏览器。
- `inherit` 规定应该从父元素继承字体系列

`font-family` 可以把多个字体名称作为一个"回退"系统来保存。如果浏览器不支持第一个字体，则会尝试下一个。也就是说，`font-family` 属性的值是用于某个元素的字体族名称或/及类族名称的一个优先表。浏览器会使用它可识别的第一个值。

有两种类型的字体系列名称：

- 指定的系列名称：具体字体的名称，比如："times"、"courier"、"arial"。
- 通常字体系列名称：比如："serif"、"sans-serif"、"cursive"、"fantasy"、"monospace"

> 提示：使用逗号分割每个值，并始终提供一个类族名称作为最后的选择。
> 注意：使用某种特定的字体系列（Geneva）完全取决于用户机器上该字体系列是否可用；这个属性没有指示任何字体下载。因此，强烈推荐使用一个通用字体系列名作为后路。

#### 4.3.font-size

设置字体的尺寸

- `xx-small/x-small/small/medium/large/x-large/xx-large` 把字体的尺寸设置为不同的尺寸，从 `xx-small` 到 `xx-large`。默认值：`medium`
- `smaller` 把 `font-size` 设置为比父元素更小的尺寸。
- `larger` 把 `font-size` 设置为比父元素更大的尺寸。
- `length` 把 `font-size` 设置为一个固定的值。
- `%` 把 `font-size` 设置为基于父元素的一个百分比值。
- `inherit` 规定应该从父元素继承字体尺寸。

> 该属性设置元素的字体大小。注意，实际上它设置的是字体中字符框的高度；实际的字符字形可能比这些框高或矮（通常会矮）。
> 各关键字对应的字体必须比一个最小关键字相应字体要高，并且要小于下一个最大关键字对应的字体。

#### 4.4.font-size-adjust

为某个元素规定一个 `aspect` 值，这样就可以保持首选字体的 `x-height`。

- `none` 默认。如果此字体不可用，则不保持此字体的 `x-height`。
- `number` 定义字体的 `aspect` 值比率。

可使用的公式：
`首选字体的字体尺寸 * （font-size-adjust 值 / 可用字体的 aspect 值）= 可应用到可用字体的字体尺寸`

> Internet Explorer 不支持 `font-size-adjust` 属性。
> 字体的小写字母 "x" 的高度与 "`font-size`" 高度之间的比率被称为一个字体的 `aspect` 值。当字体拥有高的 `aspect` 值时，那么当此字体被设置为很小的尺寸时会更易阅读。举例：Verdana 的 `aspect` 值是 0.58（意味着当字体尺寸为 100px 时，它的 `x-height` 是 58px ）。Times New Roman 的 `aspect` 值是 0.46。这就意味着 Verdana 在小尺寸时比 Times New Roman 更易阅读。

#### 4.5.font-stretch

对当前的 `font-family` 进行伸缩变形

- `normal` 默认值。把缩放比例设置为标准。
- `wider` 把伸展比例设置为更进一步的伸展值
- `narrower` 把收缩比例设置为更进一步的收缩值
- `ultra-condensed/extra-condensed/condensed/semi-condensed/semi-expanded/expanded/extra-expanded/ultra-expanded` 设置 `font-family` 的缩放比例。"`ultra-condensed`" 是最宽的值，而 "`ultra-expanded`" 是最窄的值

> 所有主流浏览器都不支持 `font-stretch` 属性。

#### 4.6.font-style

定义字体的风格

- `normal` 默认值。浏览器显示一个标准的字体样式
- `italic` 浏览器会显示一个斜体的字体样式
- `oblique` 浏览器会显示一个倾斜的字体样式
- `inherit` 规定应该从父元素继承字体样式

> 该属性设置使用斜体、倾斜或正常字体。斜体字体通常定义为字体系列中的一个单独的字体。理论上讲，用户代理可以根据正常字体计算一个斜体字体。

#### 4.7.font-variant

设置小型大写字母的字体显示文本

- `normal` 默认值。浏览器会显示一个标准的字体
- `small-caps` 浏览器会显示小型大写字母的字体
- `inherit` 规定应该从父元素继承 `font-variant` 属性的值

> `font-variant` 属性设置小型大写字母的字体显示文本，这意味着所有的小写字母均会被转换为大写，但是所有使用小型大写字体的字母与其余文本相比，其字体尺寸更小。
> 该属性主要用于定义小型大写字母文本。理论上，用户代理可以根据正常字体计算出小型大写字母字体。

#### 4.8.font-weight

设置文本的粗细

- `normal` 默认值。定义标准的字符
- `bold` 定义粗体字符
- `bolder` 定义更粗的字符
- `lighter` 定义更细的字符
- `100-900` 定义由粗到细的字符。400 等同于 `normal`，而 700 等同于 `bold`
- `inherit` 规定应该从父元素继承字体的粗细

> 该属性用于设置显示元素的文本中所用的字体加粗。每个数字值对应的字体加粗必须至少与下一个最小数字一样细，而且至少与下一个最大数字一样粗。

### 5.List

#### 5.1.list-style

设置所有的列表属性

- `list-style-type` 设置列表项标记的类型
- `list-style-position` 设置在何处放置列表项标记
- `list-style-image` 使用图像来替换列表项的标记
- `inherit` 规定应该从父元素继承

> 该属性是一个简写属性，涵盖了所有其他列表样式属性。由于它应用到所有 `display` 为 `list-item` 的元素，所以在普通的 HTML 和 XHTML 中只能用于 li 元素，不过实际上它可以应用到任何元素，并由 `list-item` 元素继承。
> 可以按顺序设置如下属性：`list-style-type、list-style-position、list-style-image`

#### 5.2.list-style-image

- `URL` 图像的路径
- `none` 默认。无图形被显示
- `inherit` 规定应该从父元素继承

> 这个属性指定作为一个有序或无序列表项标志的图像。图像相对于列表项内容的放置位置通常使用 `list-style-position` 属性控制。
> 注释：请始终规定一个 "`list-style-type`" 属性以防图像不可用。

#### 5.3.list-style-position

- `inside` 列表项目标记放置在文本以内，且环绕文本根据标记对齐
- `outside` 默认值。保持标记位于文本的左侧。列表项目标记放置在文本以外，且环绕文本不根据标记对齐
- `inherit` 规定应该从父元素继承

> 该属性用于声明列表标志相对于列表项内容的位置。外部 (`outside`) 标志会放在离列表项边框边界一定距离处，不过这距离在 CSS 中未定义。内部 (`inside`) 标志处理为好像它们是插入在列表项内容最前面的行内元素一样。

#### 5.4.list-style-type

- `none` 无标记
- `disc` 默认。标记是实心圆
- `circle` 标记是空心圆
- `square` 标记是实心方块
- `decimal` 标记是数字
- `decimal-leading-zero` 0 开头的数字标记。(01， 02， 03， 等。)

### 6.Margin

#### 6.1.margin

设置所有外边距属性。该属性可以有 1 到 4 个值

- `auto` 浏览器计算外边距
- `length` 规定以具体单位计的外边距值，比如像素、厘米等。默认值是 0px
- `%` 规定基于父元素的宽度的百分比的外边距
- `inherit` 规定应该从父元素继承外边距

#### 6.2.margin-top/right/botom/left

设置元素的 `上/右/下/左` 外边距（这个属性对于不可替换的 `inline` 元素没有效果，比如 `<tt>` 或者 `<span>`)

- `auto` 浏览器设置的上/右/下/左外边距。
- `length` 定义固定的上/右/下/左外边距。默认值是 0。
- `%` 定义基于父对象总宽度的百分比上/右/下/左外边距。
- `inherit` 规定应该从父元素继承上/右/下/左外边距。

> 这个简写属性设置一个元素所有外边距的宽度，或者设置各边上外边距的宽度。
> 块级元素的垂直相邻外边距会合并，而行内元素实际上不占上下外边距。行内元素的的左右外边距不会合并。同样地，浮动元素的外边距也不会合并。允许指定负的外边距值，不过使用时要小心。
> 注释：允许使用负值。

**margin-top 的一个小 bug:**

当父级没有设置 `margin-top` 或 `border` 时，子级会把自身的 `margin-top` 值传递给父级元素

> 1. 给父级元素设置 `border`；（缺点：影响盒子大小） 2. 把子级的 `margin-top` 换成 `padding-top`；（缺点：影响盒子大小） 3. 对父级用 `overflow:hidden/auto`； 4. 对父级用 `display:inline-block`；（有时候可能会影响布局）

### 7.Padding

#### 7.1.padding

设置所有内边距属性

- `auto` 浏览器计算内边距。
- `length` 规定以具体单位计的内边距值，比如像素、厘米等。默认值是 0px。
- `%` 规定基于父元素的宽度的百分比的内边距。
- `inherit` 规定应该从父元素继承内边距。

#### 7.2.padding-top/right/botom/left

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

### 8.box-sizing

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

`box-sizing` 属性可以被用来调整这些表现：

---

- `content-box` 是默认值，标准盒子模型。如果你设置一个元素的宽为 100px，那么这个元素的内容区会有 100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。

---

- `border-box` 告诉浏览器去理解你设置的边框 `border` 和内边距 `padding` 的值是包含在 `width` 内的。也就是说，如果你将一个元素的 `width` 设为 100px，那么这 100px 会包含其它的 `border` 和 `padding`，内容区的实际宽度会是 `width` 减去 `border` + `padding` 的计算值。大多数情况下这使得我们更容易的去设定一个元素的宽高。内容框不能为负，并且被分配到 0，使得不可能使用 `border-box` 使元素消失。

---

> 常用在移动端（设置宽时） `box-sizing:border-box`

### 9.display

`display` 指定了元素渲染盒子的类型（_type of rendering box_）

元素默认的 `display` 值的情况如下

- block（块级元素）

`<div>、<p> <ul> <ol> <form> ……`

- inline（内联元素）

`<span> <a> <img> <input> <select> <label> ……`

- list-item（项目列表）

`<li>`

- none（不显示）

`<head>（头部元素都是）<title> <br> <thead> <tbody> <tfoot>`

常用的取值：

- `none`: 隐藏元素
- `inline`：行内元素，顾名思义，用于把一个元素放在行的内部
- `block`：块元素，用于显示占用一行的块
- `inline-block`：以 `block` 的方式渲染，以 `inline` 的方式放置
- `table-cell`：以表格元素的方式显示

#### 9.1. 隐藏元素

`none` 是最容易理解的取值。当一个元素的 `display` 属性被设为 `none` 时，该元素不会被渲染，也不会占位，就像不存在一样。

一些特殊元素的默认 `display` 值是它，例如 `script` 。 `display: none;` 通常被 JavaScript 用来在不删除元素的情况下隐藏或显示元素。

它和 `visibility` 属性不一样。把 `display` 设置成 `none` 元素不会占据它本来应该显示的空间，但是设置成 `visibility: hidden;` 还会占据空间。

#### 9.2. 行内元素

行内（`inline`）元素不会打断文本流。它们的出现不会使得后续元素另起一行。行内元素可以设置 `margin` 与 `padding`，但 `margin` 只在水平方向上起作用。另外，对 `inline` 元素设置 `width` 与 `height` 是不起作用的。

#### 9.3. 块元素

块（`block`）元素会中断当前的文本流，另起一行，并在父元素中尽可能地占据最大宽度。通常块元素不可包含在行内元素内部。

#### 9.4. 行内块

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

第四种：使用 `font-size: 0;` 基本上可以解决大部分浏览器下 `inline-block` 元素之间的间距 (IE7 等浏览器有时候会有 1 像素的间距）。而且 HTML 代码也好看了一些。注意在这种情况下子元素也会继承 `font-size:0` 的属性。所以不要忘记单独给盒子里的文字设置一遍字体属性。

> `inline-block` 与 `inline` 的不同在于：垂直方向上的 `margin` 也会起作用，并且可以设置 `width` 和 `height`。`inline-block` 是非常常用的样式设置。

#### 9.5. 表格元素

`display` 设为 `table-cell` 的元素与 `<td>` 标签的行为一致，即：可设置 `padding`，不接受 `margin`，可伸缩的 `width`。利用 `table-cell` 属性可以在不写 `<table>` 标签的情况下完成表格布局。

### 10.overflow

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

/* 规定从父元素继承 overflow 属性的值 */
overflow: inherit;
```

使用 `overflow` 默认值（`visible`）以外的值将创建一个新的 块级格式化上下文。这在技术层面上是必须的——如果一个浮动元素和滚动条相交，它会强制（重新）包围内容元素。这种行为（重新包围内容元素）会在每一次移动滚动条之后发生，会使得滚动体验变差（慢）。

为使 `overflow` 有效果，块级容器必须有一个指定的高度（`height` 或者 `max-height`）或者将 `white-space` 设置为 `nowrap`。

> 注意：当相关 HTML 元素被设置为 `scrollTop` 时，即使 `overflow` 值为 `hidden`，这个元素依旧会滚动`。

### 11.float

[浮动出现的意义其实只是用来让文字环绕图片而已，仅此而已。](http://www.zhangxinxu.com/wordpress/2010/01/css-float%E6%B5%AE%E5%8A%A8%E7%9A%84%E6%B7%B1%E5%85%A5%E7%A0%94%E7%A9%B6%E3%80%81%E8%AF%A6%E8%A7%A3%E5%8F%8A%E6%8B%93%E5%B1%95%E4%B8%80/)

指定一个元素应沿其容器的左侧或右侧放置，允许文本和内联元素环绕它。该元素从网页的正常流动中移除，尽管仍然保持部分的流动性（与绝对定位相反）。

#### 11.1. 浮动的"包裹性"

先说句您应该没有见过的结论：撇开浮动的"破坏性"，浮动就是个带有方位的 `display:inline-block` 属性。

`display:inline-block` 某种意义上的作用就是包裹 (wrap)，而浮动也有类似的效果。举个常见例子，或许您有实现宽度自适应按钮的经验，实现宽度自适应的关键就是要让按钮的大小自适应于文字的个数，这就需要按钮要自动包裹在文字的外面。我们用什么方法实现呢？一就是 `display:inline-block`；二就是 `float`。

然而，`float` 无法等同于 `display:inline-block`，其中原因之一就是浮动的方向性，`display:inline-block` 仅仅一个水平排列方向，就是从左往右，而 `float` 可以从右往左排列，这就是两者的差异。

#### 11.2. 浮动的"破坏性"

浮动可以说是所有 CSS 属性中的"破坏之王"。要理解浮动的破坏性，我们要从浮动最原始的意义入手。

所以，只要您弄明白了为什么文字会环绕含浮动属性的图片，您就会知道我所说的浮动的"破坏性"是什么意思了。

先说结论：文字之所以会环绕含有 `float` 属性的图片，是因为浮动破坏了正常的 `line boxes`。

**`line boxes` 模型**: `inline boxes` 不会让内容成块显示，而是排成一行，如果外部含 `inline` 属性的标签 (`<span>， <a>， <cite>` 等），则属于 `inline boxes`，如果是个光秃秃的文字，则属于匿名 `inline boxes`。`line boxes` 的高度是由其内部最高的 `inline boxes` 的高度决定的

`content area` 是一种围绕文字看不见的 box。`content area` 的大小与 `font-size` 大小相关。

默认情况下，图片与文字基线对齐，图片与文字在同一行上；一张图片只能与一行文字对齐。而要想让一张图片要与多行文字对齐，您唯一能做的就是破坏正常的 `line boxes` 模型。

正常情况下，图片自身就是个 `inline boxes`，与两侧的文字 `inline boxes` 共同组成了 `line boxes`，但是，一旦图片加入了浮动，情况就完全变了。我认为是浮动彻底破坏了 `img` 图片的 `inline boxes` 特性，至少有一点我可以肯定，图片的 `inline boxes` 不存在了。一旦图片失去了 `inline boxes` 特性就无法与 `inline boxes` 的文字排在一行了，其会从 `line boxes` 上脱离出来，跟随自身的方位属性，靠边排列。

这个从 `line boxes` 上脱离的浮动元素其实就是一个躯体，一个空壳子，表象。因为其没有 `inline boxes`。有人可能会问，没有 `inline boxes` 就没有呗，有什么大不了的？非也非也！这个 `inline boxes` 很个很重要的概念。

在目前的 CSS 的世界中，所有的高度都是有两个 CSS 模型产生的，一个是  **box 盒状模型**，对应 CSS 为 "`height + padding + margin`"，另外一个是 **line box 模型**，对应样式为 "`line-height`"。

前者的 `height` 属性分为明显的 `height` 值和隐藏的 `height` 值，所谓隐藏的 `height` 值是指图片的高度，一旦载入一张图片，其内在的 `height` 值就会起作用，即使您看不到 `"height"` 这个词。

而后者针对于文字等这类 `inline boxes` 的元素（图片也属于 `inline boxes`，但其 `height` 比 `line-height` 作用更凶猛，故其 `inline boxes` 高度等于其自身高度，对 `line-height` 无反应），`inline boxes` 的高度直接受 `line-height` 控制（改变`line-height` 文字拉开或重叠就是这个原因），而真正的高度表现则是由每行众多的 `inline boxes` 组成的 `line boxes`（等于内部最高的 `inline box` 的高度），而这些 `line boxes` 的高度垂直堆叠形成了 `containing box` 的高度，也就是我们见到的 `<div>` 或是 `<p>` 标签之类的高度了。

所以，对于 `line box` 模型的元素而言，没有 `inline boxes`，就没有高度了，而浮动却恰恰做了这么龌龊的事情，其直接将元素的 `inline boxes` 也破坏了，于是这些元素也就没有了高度。

浮动破坏了图片的 `inline box`，产生了两个结果：一是图片无法与文字同行显示，脱离了其原来所在的 `line box` 链；二是没有了高度（无 `inline box` -> 无 `line box` -> 无高度）。而这些结果恰恰是文字环绕图片显示所必须的。

我们可以拿浮动元素与绝对定位元素做对比或许可以帮助理解。与浮动元素一样，绝对定位元素也具有"包裹性"，此"包裹性"适用于任何元素。那么，浮动元素与绝对定位元素的差别在哪里呢？我觉得最主要的差别在于：绝对定位的元素脱离了文档流，而浮动元素依旧在文档流中；而这造成的显示上的差异就是：同处于文档流中的文字实体不会与浮动元素重叠，而会与绝对定位元素重叠。这就是文字环绕显示的重要原因之一：虽然图片实际占据的高度为 0，但是由于其宽度实体存在（包裹性），同样是 `content area` 实体的文字不会与之重叠（外部的容器盒子 `containing box`(`<p>， <div>， <li>`) 会重叠），这就好比篮球场上站了个植物人，虽然其几乎不可能得分，运球之类，但是他的实体在那里，它可以阻挡同一水平空间上的同一类型的个体（即人）直接穿过去，要通过，得绕道。但是其无法阻挡整个球队的向前推进。

`display:inline-block` 将对象呈递为内联对象，但是对象的内容作为块对象呈递。所谓对象呈递为内联对象就是元素呈递为 `inline box`，所以浮动"包裹性"所产生的结果就是使得元素转为了 `line box` 模型中的 `inline box` 元素。浮动的"包裹性"让元素变成类似于 `inline box` 的元素，而浮动的"破坏性"正是破坏 `inline box` 元素的。对于 `block` 水平的这类块状元素需要先让其变成类似效果的内联元素，然后再破坏之。

> 注意：
> IE 浏览器：`obj.style.styleFloat = "left";`
> 其他浏览器：`obj.style.cssFloat = "left";`

#### 11.3. 浮动的原理

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
  - 脱离文档流（父级元素找不到子级元素），相当于来到了第二层级，平行于基本的文档流
  - 所有元素可以设置这个属性
  - 将元素的 `display` 属性由 `inline` 或 `inline-block` 改为 `block`
  - 浮动元素不设置宽高时，宽高是由内容决定的
  - 行内元素、行内块级元素和文字会围绕着浮动元素排布

#### 11.4. 清除浮动 (clearfix hack)

- 1. 给父级元素设置高度

  - 这个元素内是否有内容，高度都一定

- 2. 给父级元素设置 `overflow: hidden;` 属性 (IE6 中还需要 `zoom:1;`)

> 此方法不存在结构化和语义问题并且代码量也少，但是内容增多时不会自动换行导致内容被隐藏，无法显示需要溢出的元素；要是里面的元素要是想来个 `margin` 负值定位或是负的绝对定位，直接被裁掉了。

- 3. 父元素设置 `overflow:auto;` (IE6 需要触发 hasLayout)

> 但是多个嵌套后，firefox 某些情况会造成内容全选；IE 中 `mouseover` 造成宽度改变时会出现最外层模块有滚动条等，firefox 早期版本会无故产生 `focus` 等；
> 如果有隐藏 box，会因为将隐藏 box 的高度加入，使得总体高度增加，影响布局（2017.08.09，）

- 4. 给最后一个浮动元素之后加（从语义化的角度来看是不合理的）

`<div style="clear:both"></div>`

> 增加浏览器渲染负担。

然而这个方法只是在同一块级格式化上下文（`block formatting context`）中没有其他元素的时候才是有效的。

如果不能使用清除浮动，另一种做法是浮动容器的限制块级格式化上下文。即将其中一个非浮动元素的 `overflow` 属性值变成 `hidden` 或者 `auto`，因为这样可以让容器元素伸展到能够包含浮动元素，而不是让他们超出块元素的底部。？？？

> 设置 `overflow` 为 `scroll` 也可以让块元素撑大来包含所有的浮动子元素，但是这样不论内容有多少都会显示出一个滚动条。即使 `height` 默认值为 `auto`，我们还是设置了，是为了表明容器应该增大高度以便包裹住里面的内容。

- 5.`clear:both;` 清除浮动

  - 使用这个属性的元素必须是块级元素
  - 使用这个属性的元素必须放在最后一个浮动元素之后
  - 使用这个属性的元素不能带有 `float` 属性

- 6. 父元素设置 `display:table`

结构语义化完全正确，代码量极少但是盒模型属性已经改变，由此造成的一系列问题，得不偿失，不推荐使用

> 注意：`display:table` 本身无法触发 BFC，但是它会产生匿名框 (anonymous boxes)，而匿名框中的 `display:table-cell` 可以触发 BFC，简单说就是，触发块级格式化上下文的是匿名框，而不是 `display:table`。所以通过 `display:table` 和 `display:table-cell` 创建的 BFC 效果是不一样的。

- 7. 使用伪元素

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

### 12.position

#### 12.1.static

`static` 是默认值。任意 `position:static;` 的元素不会被特殊的定位。一个 `static` 元素表示它不会被"`positioned`"，一个 `position` 属性被设置为其他值的元素表示它会被 "`positioned`"。

#### 12.2.relative

---

- 不脱离文档流
- 发生位置改变的时候，原来的位置还占用
- 层级大于文档流其他元素（会盖在其他元素之上）
- 参照物是本身
- 给绝对定位当参照物 ---**常用**
- `position: relative;` 相对定位，同时设置 `top` 和 `bottom` 的值，`top` 生效。同时设置 `right` 和 `left` 的值，`left` 生效

---

> 当盒子本身发生改变时，不影响其他元素，这时候我们用相对定位

#### 12.3.absolute

---

- 脱离文档流，但不在同一个平面上，因此不会相互识别，反而会相互覆盖；
- 所有元素默认都会去找参照物的起点位置（参照物的左上角）
- 不设置参照物时，参照物是 ICB（inital container block， 初始包含块）([`body` 这种说法不严谨](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position))
- 人为设置参照物
  - 只能是这个绝对定位元素的父级（或以上）元素
  - 参照物必须带有定位属性的元素（相对、绝对、固定）
- 绝对定位元素有宽高的时候，`top` 和 `bottom` 的值同时设置，`top` 生效。`left` 和 `right` 的值同时设置，`left` 生效
- 在不设置宽高时，宽度和高度是由本身内容决定的
- 绝对定位元素，如果不设置四个方向的值，并且同级之前有其他内容（元素），它会默认排到这个内容（元素）之后（绝对定位的元素脱离文档流以后，只会影响后面的元素，而不会影响前面的元素，所以当没有设定绝对定位元素的定位值时，绝对定位元素会默认从前面元素之后的左上角开始排布；）
- 绝对定位元素设置宽高为 100%，继承参照物的宽高

---

> 父级（或以上）元素都有定位属性，绝对定位的参照物是离它最近的那个父级元素

#### 12.4.fixed

---

- 脱离文档流
- 参照物是浏览器的可视窗口
- 在不设置宽高时，宽高是由内容决定
- 多用在页面中的辅助导航、回到顶部等位置
- 可以作为绝对定位的参照物；

---

#### 12.5.float 和 position 的区别

> 作者：贺师俊
> 链接：`https://www.zhihu.com/question/19588854/answer/13243044`
> 来源：知乎

在绝大多数 Web 开发者的语境中，"布局"这个术语和"排版"是有差异的。"布局"偏向于指宏观的 GUI 区域划分，比如双栏布局或三栏布局等。从这一点出发，`float` 其实本不是一项用于"布局"的属性。

`float` 对应的其实是传统印刷排版中图文混排中的环绕。这其实可以理解，因为 CSS 的模型和术语脱胎于传统排版，故而与计算机 GUI 技术通常基于组件的模型相差甚远。除了 `float` 之外，另一个例子是 CSS 中上下 `margin` 的 `collapse`，显然这是为了满足段落排版的需求。所以像 `float、margin collapse` 等，在典型的 GUI 技术中是没有的。还有，CSS box model 中，`width/height` 不算入 `padding` 和 `border`，许多开发者对这点很不适应，这实际上是 GUI 的控件思维与 CSS 排版思维的冲突。这个冲突在浏览器技术实现上的遗迹就是 IE 臭名昭著的 "`hasLayout`"。

元素 "`has layout`" 的真实意思是这样的元素直接对应一个控件。也正是由于 IE 很 naive 的在实现中直接结合了这两种矛盾的模型，从而导致了无数的布局 bug。

言归正传，CSS1 时代的网页还很简陋，但是随着万维网的迅猛发展，Web 界面也迅速进化，当初简单的如同书页般的通栏式网页迅速绝迹，`frameset` 由于天生存在的一堆问题也很快退出主流，这时 CSS 在 GUI 布局方面就显出了缺陷，开发者被迫使用各种 `trick`。比如历史悠久的 `table` 布局。后来 `table` 布局被鄙视，开发者逐渐转向了 `float` 布局。

要说 `float` 布局之所以流行，IE "功"不可没。在 IE 中，`has layout` 的元素是不会环绕 `float` 元素的（因为 `has layout` 的元素自己是一个控件，所以总是保持一个矩形区域）。这本来是一个 bug，但是其效果却正好符合常见的双栏布局的需要。另外 IE 下 `float` 元素会自动撑开其父级 `container` 元素（当然前提是 `container` 元素也是 `has layout` 的），这其实也是 bug，但是也恰好符合模块布局的需求。后来所谓`inline-block` 布局其实正是这些 bug 的合理化。

站在今天回望过去十多年的 CSS 实践，我们可以发现，无论 `float` 布局还是后来的 `inline-block` 布局，其实都是 `trick`。所谓 **`trick`**，就是将一些特性挪作他用，以很曲折的方式实现出想要的效果。

CSS 作为样式语言，其可维护性的最终来源，就是代码能清晰的表达出设计意图。而 CSS trick 当然不能很好的满足这一点。那么如何才能真正用 CSS 来表达布局？这有赖于 "CSS3 的进化"。如 `multiple column`、`flex box`、`grid layout` 等。其中直接对应目前 `float` 布局/`inline-block` 布局所要达到效果的，是 `flex box`。当然，考虑到兼容性问题（IE9 仍不支持 flex box 模块，IE10 才支持），我们可能很长时间内还是会继续使用 `float` 布局，不过必须始终牢记这是 `trick`，是 `workaround`。如有可能，最好引入 SCSS/LESS 之类的 CS S 框架来对此种布局 `trick` 做进一步抽象和解耦。

再说 `position` 布局。`position` 其实比 `float` 要更接近"布局"属性。但是 `position` 的问题是，所谓布局是设定各区域（元素）的关联和约束，而定位只是设定单一元素的位置大小。要实现一个布局，要对多个定位元素中手动设定相关的参数（如左栏 `width:200px`，右栏 `left:200px`），相当于人为的把大小和位置参数计算出来。这违背了 DRY 原则，也无法真正实现关联约束。（如左栏设了 `max/min-width` 之后，最终实际 `width` 未必是 200px，此时右栏怎么设 `left` 值？又如一个水平固定 `width`、垂直自适应 `height` 的绝对定位元素，我们如何从它的底部继续排下一个元素？）除非我们引入 JavaScript 脚本来进行计算。因此运用 `position` 布局的限制条件相当多，通常只适合那些相对孤立的部件（如页头页脚）或较为简单且各区域大小位置固定的布局。至于说以 JavaScript 实现的布局管理器，是将 `position` 作为实现布局的底层技术，已经算不得 CSS 了（因为你也不写 CSS）。

## CSS 布局（layout）

- 固定布局：宽高写死； `float+position` — 最常用在 PC 上
- 流式布局（百分比布局） + 媒体查询 + px 单位 —最常用在 PC 端和移动端公用一套页面结构
- 流式布局（百分比布局） + 媒体查询 + rem 单位 最常用移动端上 h5 页面上
- flexbox 弹性盒模型

### 1. 百分比布局

百分比布局，也叫流式布局，因为宽度是百分比，但是高度是按 px 来写的。

百分比是一种相对于包含块的计量单位，它对图片很有用，甚至还能同时使用 `min-width` 和 `max-width` 来限制图片的最大或最小宽度！

当布局很窄时， 固定定位的导航栏就会被挤扁。更糟糕的是，你不能在 `nav` 上使用 `min-width` 来修复这个问题，因为右边的那列是不会遵守它的。

适用页面特点：左侧固定 + 右侧自适应/左右固定宽度 + 中间自适应

开发思路：
自适应意味着百分比（0% - 100%) -> 思考：如何确定是不是自适应？

- 多列等分 -> 百分比等分

---

- 左侧固定宽度 + 右侧自适应宽度
  - 思路一 -> 左侧左浮动+右侧利用 BFC 特性在右侧
  - 思路二 -> 父级给`padding-left`，预留出来左侧区域的宽度，左侧用绝对定位上去，右侧用百分百宽度

---

- 左侧自适应 + 右侧固定宽度
  - 思路一 -> 左侧用百分百宽度，右侧用绝对定位上去

---

- 左右固定宽度 + 中间自适应
  - 思路一 -> 左侧左浮动 + 中间百分之百（中间部分再分为左侧百分之百+右侧右浮动）
  - 思路二 -> 左侧左浮动 + 中间百分之百 + 右侧右浮动（负 `margin` 法减掉左右侧）
  - 思路三 -> 左右绝对定位 + 中间百分之百（父元素 `padding-left`，`padding-right` 预留左右侧的位置）

---

- 左中右全自适应 -> 全部用百分比

- `font-size、padding，margin，height` 直接量像素

- 小的地方可以用 `display:inline-block;` 让几个容器放在一排

- 小图标之类的，可以考虑用 `::before，::after` 来实现

### 2. 媒体查询

"响应式设计（Responsive Design)" 是一种让网站针对不同的浏览器和设备"呈现"不同显示效果的策略，这样可以让网站在任何情况下显示的很棒！

媒体查询是做此事所需的最强大的工具。使用 `meta viewport` 之后可以让你的布局在移动浏览器上显示的更好。

```css
@media (min-width: 375px) {
  .box {
    width: 200px;
    height: 200px;
    background: #000;
    border: 10px solid #73cf17;
  }
}
```

x < 375 `max-width` 最大宽度 375 小于等于 375
x > 375 `min-width` 最小宽度 375 大于等于 375

> 注意点：单词之间空格隔开

1.`@media` 媒体 媒介

2.媒体类型
all 所有类型
screen 设备类型
print 打印类型

3.连接符
`and` 和

4.判断条件 `()`

5.`{ css 样式代码 }`

### 3.rem 布局分析

`rem = root element` 根元素
rem(font size of root element) 根元素 (html) 的字体大小
`1rem = 16px` （谷歌 html 默认的字体大小是 16px）。

```css
html{
  font-size:100px;
  /! *设置 100px 原因：1. 减少和设计稿的偏差 2. 方便计算*!/
  /!*1rem:100px;*!/
}

/*
设计稿的尺寸   分辨率          1rem = 100px
  640         320            100px
              375            117.1875px
              414            129.375px
              640            200px
*/

media screen and (min-width: 320px){
  /*320 分辨率 以 iphone5 参考 做的设计稿*/
  html{
    font-size:100px;
  }
}
```

### 4.inline-block 布局

使用 `inline-block` 来布局。有一些事情需要你牢记：

- `vertical-align` 属性会影响到 `inline-block` 元素，你可能会把它的值设置为 `top` 。
- 你需要设置每一列的宽度
- 如果 HTML 源代码中元素之间有空格，那么列与列之间会产生空隙

### 5.colum

可以帮助你很轻松的实现文字的多列布局。CSS columns 是很新的标准，所以你需要使用前缀，并且它不被 IE9 及以下和 Opera Mini 支持。

```css
.three-column {
  padding: 1em;
  -moz-column-count: 3;
  -moz-column-gap: 1em;
  -webkit-column-count: 3;
  -webkit-column-gap: 1em;
  column-count: 3;
  column-gap: 1em;
}
```

### 6.Flex 布局

> If you are looking at a blog post (or whatever) about Flexbox and you see `display: box;` or a property that is box-{_}， you are looking at the old 2009 version of Flexbox.
> If you are looking at a blog post (or whatever) about Flexbox and you see `display: flexbox;` or the flex() function， you are looking at an awkward tweener phase in 2011.
> If you are looking at a blog post (or whatever) about Flexbox and you see `display: flex;` and flex-{_} properties， you are looking at the current (as of this writing) specification.

网页布局是 CSS 的一个重点应用。布局的传统解决方案，基于盒状模型，依赖 `display` 属性 + `position` 属性 + `float` 属性。它对于那些特殊布局非常不方便，比如，垂直居中就不容易实现。

2009 年，W3C 提出了一种新的方案 ---- Flex 布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。

## 兼容性和继承

### 1. 选择器的兼容性

所有浏览器都支持的选择器（单个选择器）：通配符选择器，标签选择器，类选择器，ID 选择器，后代选择器，子代选择器（IE6 不支持），相邻兄弟选择器（IE6 不支持），通用兄弟选择器（CSS3 新加）（IE6 不支持），并集选择器；类型选择器（IE6 不支持）；

其中最常用的是：标签选择器，类选择器，ID 选择器，后代选择器，并集选择器。

类型选择器中 `E[attr="value"]` 和 `E[attr*="value"]` 是最实用的，其中 `E[attr="value"]` 能帮我们定位不同类型的元素，特别是表单 `form` 元素的操作，而 `E[attr*="value"]` 能在网站中帮助我们匹配不同类型的文件，比如说你的网站上不同的文件类型的链接需要使用不同的 `icon` 图标，用来帮助你的网站提高用户体验，就像前面的实例，可以通过这个属性给 "`.doc`"，"`.pdf`"，"`.png`"，"`.ppt`" 配置不同的 `icon` 图标。

对于 `:hover` 在 IE6 下只有 `a` 元素支持，`:active` 只有 IE7-6 不支持，`:focus` 在 IE6-7 下不被支持。

IE6-8 不支持 `:checked`，`:enabled`，`:disabled`，`:only-child`，`:empty`，`:not()`；

IE6 不支持 `:first-child`;

IE6-8 和 FF3- 浏览器不支持：`:nth-child"`，`:nth-last-child()`，`:nth-of-type`，`:nth-last-of-type`，`:only-of-type`，`:nth-child`。

### 2.CSS 属性的继承

CSS 属性继承是指，子级元素从父级元素继承的 CSS 属性。（一般跟文字有关的属性可以继承，而非文字相关属性一般不能继承）
具体如下：

1. 可以继承的：文本相关属性和列表相关属性：

2. 不能继承的：

3. 所有元素都可以继承的和终端块状元素可以继承的：

### 3.URL 路径

#### 3.1. 绝对路径

指带域名的文件的完整路径和磁盘中指定文件的全部路径
网址（网站的尾部）-- `a 标` 签用的比较多

> chrome 不支持绝对路径，即使在绝对路径前面加 "`file:///`"；IE 支持绝对路径；

#### 3.2. 相对路径

是指在同一个文件夹下，通过一个参考点来找到其他文件

- 返回上一级 `./`
- 同级之间直接写文件名
- 下一级用 `/`

## CSS Hack

### 1.hasLayout

hasLayout 是 IE 特有的一个属性。很多的 IE 下的 css bug 都与其息息相关。在 IE 中，一个元素要么自己对自身的内容进行计算大小和组织，要么依赖于父元素来计算尺寸和组织内容。

当 hasLayout 为 true 时（就是所谓的"拥有布局")，相当于元素产生新 BFC，元素自己对自身内容进行组织和尺寸计算；

当 hasLayout 为 false 时（就是所谓的"不拥有布局")，相当于元素不产生新 BFC，元素由其所属的 `containing block` 进行组织和尺寸计算。

和产生新 BFC 的特性一样，hasLayout 无法通过 CSS 属性直接设置，而是通过某些 CSS 属性间接开启这一特性。不同的是某些 CSS 属性是以不可逆方式间接开启 hasLayout 为 true。并且默认产生新 BFC 的只有 `html` 元素，而默认 hasLayout 为 true 的元素就不只有 `html` 元素了。

另外我们可以通过 `object.currentStyle.hasLayout` 属性来判断元素是否开启了 hasLayout 特性。

IE 使用 Layout 概念来控制元素的尺寸和位置。如果一个元素有 Layout，它就有自身的尺寸和位置；如果没有，它的尺寸和位置由最近的拥有布局的祖先元素控制。

在默认情况下，拥有 Layout 的元素包括：

```html
<html>、<body>
<table>、<tr>、<th>、<td>
<img>
<hr>
<input>、<button>、<select>、<textarea>、<fieldset>、<legend>
<iframe>、<embed>、<object>、<applet>
<marquee>
```

> 注意，`<p>` 和 `<div>` 默认不拥有 Layout

下列元素默认 `hasLayout = true`

```html
<table> <td> <body> <img> <hr> <input> <select> <textarea> <button> <iframe> <embed> <object> <applet> <marquee>
```

hasLayout 属性不能直接设定，你只能通过设定一些特定的 css 属性来触发并改变 hasLayout 状态。下面列出可以触发 hasLayout 的一些 CSS 属性值：

```css
display
启动 haslayout 的值：inline-block
取消 hasLayout 的值：其他值
————————————–
width/height
启动 hasLayout 的值：除了 auto 以外的值
取消 hasLayou t 的值：auto
—————————————
position
启动 hasLayout 的值：absolute
取消 hasLayout 的值：static
—————————————-
float
启动 hasLayout 的值：left 或 right
取消 hasLayout 的值：none
—————————————
zoom
启动 hasLayout 的值：有值
取消 hasLayout 的值：narmal 或者空值
（zoom 是微软 IE 专有属性，可以触发 hasLayout 但不会影响页面的显示效果。'zoom: 1;' 常用来除错，不过 ie 5 对这个属性不支持。）
—————————————-
writing-mode: tb-rl
这也是微软专有的属性。
ie7 还有一些额外的属性可以触发该属性（不完全列表）：
min-height: （任何值）
max-height: （任何值除了 none)
min-width: （任何值）
max-width: （任何值除了 none)
overflow: （任何值除了 visible)
overflow-x: （任何值除了 visible)
overflow-y: （任何值除了 visible)
position: fixed;
```

因元素 hasLayout 而导致的问题其实一般都很容易发现：往往是内容出现错位甚至完全不可见。

通常 firefox 等标准的遵守浏览器可以加上 `overflow: hidden;` 来解决，而 IE 则不行，需要触发其 hasLayout 属性才可以。

hasLayout 对于内联元素也可以有效果，当内联元素的 hasLayout 为 true 的时候，可以给这个内联元素设定高度和宽度并得到期望的效果。

要注意的是，hasLayout 是微软专有的东西，对 firefox 等比较遵守标准的浏览器就无效了，因此不可太过依赖。貌似现在的 IE8 就已经不用特意去触发 hasLayout 就可以得到和 firefox 一致的效果，不知 ie8 是否已经弃用这个属性了？

一般如果是因为 layout 而引起的显示不符期望效果的话，在 ff 下会表现正常，而在 ie 下会出现错误。这个时候可以尝试触发父容器及其中的子容器的 haslayout 属性，通常可以通过加上 `zoom: 1;` 来调试。直到找到了产生问题的元素，再进行针对性的修正。最好的办法是对这个元素设置尺寸属性。但是，有时不便指定尺寸属性的情况下，就只能寻找替代方案了。

对于 ie7 ，最好的办法是设置最小高度属性为 0；这个技术是无害的，因为 0 本来就是这个属性的初始值。而且没有必要对其他浏览器隐藏这个属性。而对于 ie6 和更早版本中触发一个元素 hasLayout 的方法是在 `overflow` 属性是 `visible` 的情况下设置这个元素的高度属性为 1%，然后对其他浏览器隐藏这个设置。这种技术就是著名的 **Holly hack**。

## CSS 技巧-居中

### 1. 单列布局水平居中

水平居中的页面布局中最为常见的一种布局形式，多出现于标题，以及内容区域的组织形式，下面介绍几种实现水平居中的方法（注：下面各个实例中实现的是 `child` 元素的对齐操作，`child` 元素的父容器是 `parent` 元素）

- 1. 使用 `inline-block` 和 `text-align` 实现

```css
.parent {
  text-align: center;
}
.child {
  display: inline-block;
}
```

> 优点：兼容性好；
> 不足：需要同时设置子元素和父元素

- 2. 使用 `margin:0 auto;` 来实现

```css
.child {
  width: 200px;
  margin: 0 auto;
}
```

> 优点：兼容性好
> 缺点：需要指定宽度（居中的是设定宽度的盒子）

- 3. 使用 `display:table;` 实现

```css
.child {
  display: table;
  margin: 0 auto;
}
```

> 优点：只需要对自身进行设置
> 不足：IE6，7 需要调整结构

- 4. 使用绝对定位实现

```css
.parent {
  position: relative;
}
/*或者实用 margin-left 的负值为盒子宽度的一半也可以实现，不过这样就必须知道盒子的宽度，但兼容性好*/
.child {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
```

> 不足：兼容性差，IE9 及以上可用（表现效果是居中，但两边外边距值差一个盒宽）

- 5. 实用 `flex` 布局实现

```css
/*第一种方法 没有外边距居中*/
.parent {
  display: flex;
  justify-content: center;
}

/*第二种方法 有外边距居中*/
.parent {
  display: flex;
}
.child {
  margin: 0 auto;
}
```

> 缺点：兼容性差，如果进行大面积的布局可能会影响效率

### 2. 垂直居中

- 1.`vertical-align`

在使用 `vertical-align` 的时候，由于对齐的基线是用行高的基线作为标记，故需要设置 `line-height` 或设置 `display:table-cell;`

```css
/*第一种方法*/
.parent {
  display: table-cell;
  vertical-align: middle;
  height: 20px;
}

/*第二种方法*/
.parent {
  display: inline-block;
  vertical-align: middle;
  line-height: 20px;
}
/*
* 以行高强制撑开盒子，从而居中
* 内容设定了高度，则不需要设置行高
*/
```

- 2. 实用绝对定位

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  transform: translate(0，-50%);
}
```

- 3. 实用 flex 实现

```css
.parent {
  display: flex;
  align-items: center;
}
```

### 3. 水平垂直全部居中

- 1. 利用 `vertical-align，text-align，inline-block` 实现

```css
.parent {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.child {
  display: inline-block;
}
```

- 2. 利用绝对定位实现

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%，-50%);
}
```

- 3. 利用 flex 实现

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 4. 多列布局左列定宽，右列自适应

该布局方式非常常见，适用于定宽的一侧常为导航，自适应的一侧为内容的布局

- 1. 利用 `float + margin` 实现

```css
.left {
  float: left;
  width: 100px;
}
.right {
  margin-left: 100px;
}
```

> 注：IE6 会有 3px 的 bug

- 2. 利用 `float + margin(fix)` 实现

```html
<div class="parent">
  <div class="left"></div>
  <div class="right-fix">
    <div class="right"></div>
  </div>
</div>
```

```css
.left {
  width: 100px;
  float: left;
}
.right-fix {
  width: 100%;
  margin-left: -100px;
}
.right {
  margin-left: 100px;
}
```

- 3. 使用 `float + overflow` 实现

```css
.left {
  width: 100px;
  float: left;
}
.right {
  overflow: hidden;
}
```

`overflow:hidden`，触发 bfc 模式，浮动无法影响，隔离其他元素，IE6 不支持，左侧 `left` 设置 `margin-left` 当作 `left` 与 `right` 之间的边距，右侧利用 `overflow:hidden;` 进行形成 bfc 模式

如果我们需要将两列设置为等高，可以用下述方法将"背景"设置为等高，其实并不是内容的等高

```css
.left {
  width: 100px;
  float: left;
}
.right {
  overflow: hidden;
}
.parent {
  overflow: hidden;
}
.left,
.right {
  padding-bottom: 9999px;
  margin-bottom: -9999px;
}
```

- 4. 使用 table 实现

```css
.parent {
  display: table;
  table-layout: fixed;
  width: 100%;
}
.left {
  width: 100px;
}
.right，.left {
  display: table-cell;
}
```

> 实现的效果是两列等高的

- 5. 实用 flex 实现

```css
.parent {
  display: flex;
}
.left {
  width: 100px;
}
.right {
  flex: 1;
}
```

利用右侧容器的 `flex: 1;`，均分了剩余的宽度，也实现了同样的效果。而 `align-items` 默认值为 `stretch`，故二者高度相等

### 5. 右列定宽，左列自适应

- 1. 使用 `float + margin` 实现

```css
.parent {
  height: 100px;
  margin: 0 auto;
}
.left {
  margin-right: -100px;
  width: 100%;
  float: left;
}
.right {
  float: right;
  width: 100px;
}

//实践后，没能达到预定目标，内容会被遮挡 (margin-right:-100px 没有起到预定的作用）

//绝对定位和怪异盒子
.parent {
  width: 100%;
  positon: relative;
}
.left {
  width: 100%;
  box-sizing: border-box;
  padding-right: 100px;
}
.right {
  width: 100px;
  position: absolute;
  top: 0;
  right: 0;
}
```

- 2. 使用 table 实现（等高）

```css
.parent {
  display: table;
  table-layout: fixed;
  width: 100%;
}
.left {
  display: table-cell;
}
.right {
  width: 100px;
  display: table-cell;
}
```

- 3. 实用 flex 实现（等高）

```css
.parent {
  display: flex;
}
.left {
  flex: 1;
}
.right {
  width: 100px;
}
```

### 6. 左中两列定宽，右列自适应

- 1. 利用 `float + margin` 实现

```css
.left，.center{
  float: left:
  width: 200px;
}
.right{
  margin-left: 400px;
}
```

> 当父级盒子宽度小于定宽两列之和时，自适应盒子在页面无显示；

- 2. 利用 `float + overflow` 实现

```css
.left，.center{
  float: left:
  width: 200px;
}
.right{
  overflow: hidden;
}
```

> 当父级盒子宽度小于定宽两列之和时，自适应盒子会取代第二个定宽列的位置，第二列下移；

- 3. 利用 table 实现

```css
.parent {
  display: table;
  table-layout: fixed;
  width: 100%;
}
.left，.center，.right {
  display: table-cell;
}
.left，.center {
  width: 200px;
}
```

> 等高队列。父级盒子宽度减小，从右至左逐渐消失

- 4. 利用 flex 实现

```css
.parent {
  display: flex;
}
.left，.center {
  width: 100px;
}
.right {
  flex: 1;
}
```

> 等高。父级盒子宽度减小，右边盒子减小；当减到两列定宽之和时，两列等比例减小

### 7. 两侧定宽，中栏自适应

- 1. 利用 `float + margin` 实现

```css
.left{
  width：100px;
  float: left;
}
.center{
  float: left;
  width: 100%;
  margin-right: -200px;
}
.right{
  width: 100px;
  float: right;
}
```

> 父级盒子减小，中间盒子也减小；当小于两侧宽度之和时，右侧下移，消失的中间列出现，直至小于单列宽度；

- 2. 利用 table 实现

```css
.parent {
  width: 100%;
  display: table;
  table-layout: fixed;
}
.left，.center，.right {
  display: table-cell;
}
.left {
  width: 100px;
}
.right {
  width: 100px;
}
```

> 等高。中间先减小，消失后，右侧减小；

- 3. 利用 flex 实现

```css
.parent {
  display: flex;
}
.left {
  width: 100px;
}
.center {
  flex: 1;
}
.right {
  width: 100px;
}
```

> 等高；减小到中间最小，左右两侧等比减小；

### 8. 一列不定宽，一列自适应

- 1. 利用 `float + overflow` 实现

```css
.left {
  float: left;
}
.right {
  overflow: hidden;
}
```

- 2. 利用 table 实现

```css
.parent {
  display: table;
  table-layout: fixed;
  width: 100%;
}
.left {
  width: 0.1%;
}
.left，.right {
  display: table-cell;
}
```

> `.left` 设置宽度，违背不定宽；不设置，两列都是自适应；

- 3. 利用 flex 实现

```css
.parent {
  display: flex;
}
.right {
  flex: 1;
}
```

> 完美符合需求

### 9. 多列等分布局

多列等分布局常出现在内容中，多数为功能的，同阶级内容的并排显示等。

- 1. 实用 float 实现

```css
.parent {
  margin-left: -20px;
}
/*假设列之间的间距为 20px*/
.column {
  float: left;
  width: 25%;
  padding-left: 20px;
  box-sizing: border-box;
}
```

> 单纯设置百分比就好了；不明白为什么还要偏移。..？？？

- 2. 利用 table 实现

```css
.parent {
  display: table;
  table-layout: fixed;
  width: 100%;
}
.column {
  display: table-cell;
}

.parent-fix {
  margin-left: -20px;
}
.parent {
  display: table;
  table-layout: fixed;
  width: 100%;
}
.column {
  display: table-cell;
  padding-left: 20px;
}
```

- 3. 利用 flex 实现

```css
.parent {
  display: flex;
}
.column {
  flex: 1;
}
/*将 flex:1; 换成 width:100%; 效果也是一样的*/
```

### 10. 九宫格布局

- 1. 使用 table 实现

```html
<div class="parent">
  <div class="row">
    <div class="item"></div>
  </div>
  <div class="row">
    <div class="item"></div>
  </div>
  <div class="row">
    <div class="item"></div>
  </div>
</div>
```

```css
.parent {
  display: table;
  table-layout: fixed;
  width: 100%;
}
.row {
  display: table-row;
}
.item {
  display: table-cell;
  width: 33.3%;
  height: 200px;
}
```

- 2. 实用 flex 实现

```css
.parent {
  display: flex;
  flex-direction: column;
}
.row {
  height: 100px;
  display: flex;
}
.item {
  width: 100px;
  background: red;
}
```

## CSS 重构

### 1.CSS 代码为什么要重构

#### 1.1. 提高代码性能

- 1. 提高页面加载速度

也就是说减小 css 文件的大小，提高页面加载速度，尽可能的利用 http 缓存；

- 2. 提高 css 代码性能

不同的 css 代码，浏览器对其解析的速度不同，如何提高浏览器解析 css 戴拿的速度也是要考虑的，例如 css 选择器是从右侧开始查找。

#### 1.2. 提高代码可维护性

- 1. 可重用

一个网站风格基本保持一致，首页上可能有很多模块样式相同，内容不同，内容从后台调取，那么 css 样式和 html 结构就可以重复使用，那么 html 通过负值即可，css 代码就可以很多 html 模块使用同一部分的 css 样式；

- 2. 可拓展

如果有新的需求增加模块，我们应该保证新增代码不会影响旧的代码和页面，并尽量减少新增，能重用尽量重用；

- 3. 可修改

如果"万恶"的产品要求修改样式或者删除，如果当初没有进行很好的规划，那么你肯能就不会在原来的基础上"动刀"，因为你怕会影响其他，那有些无用的代码就会一直存在，影响性能。

### 2. 如何重构

---

1、将 CSS 样式单独写在单独的 CSS 文件中，在 `head` 标签中进行调用

- a、内容样式分离，利于维护
- b、减少 html 页面体积，加快加载速度
- c、css 文件可以被缓存、重用，维护成本降低

---

2、不使用 `@import`，这种形式会影响 css 文件的加载速度

---

3、避免使用复杂的选择器，层级越少越好

> 选择器最好不要嵌套三层以上，尽量不用标签选择器在最末尾

---

4、精简页面样式文件，去掉无用样式

很多页面的样式融合到一起，这样一个页面引用了很多无用样式，导致文件过大，加载速度慢，浏览器也会进行很多的匹配，影响渲染时间，我们应该合理的合并当前页面样式，而不是多有的 css 文件放到一起，在这里也不是绝对的，如果是小型项目，利用缓存我们可以将文件合并在一起，如果是未知的大项目，我们就要一一的分割；

---

5、利用 css 的继承性

例如文字有关的 css 属性都是可继承的属性，字体的大小、样式等。

---

## 提高代码的可维护性

### 1. 命名规范

命名是 css 选择器的第一步，整个团队的命名风格一致，这样其他人接收的时候才会更加的高效。

---

- 不能是数字，不能以数字开头
- 可以写全拼：weibu
- 遵循行业规范 CSS 法则，比如：`header` 头部、`nav` 导航、`footer` 尾部
- 是由两个单词组成，例如：`car-icon、carIcon、car_icon`

---

- 1) 页面结构
  - 容器：container
  - 页头：header
  - 内容：content/container
  - 页面主体：main
  - 页尾：footer
  - 导航：nav
  - 侧栏：sidebar
  - 栏目：column
  - 页面外围控制整体佈局宽度：wrapper
  - 左右中：left right center

---

- 2) 导航
  - 导航：nav
  - 主导航：mainnav
  - 子导航：subnav
  - 顶导航：topnav
  - 边导航：sidebar
  - 左导航：leftsidebar
  - 右导航：rightsidebar
  - 菜单：menu
  - 子菜单：submenu
  - 标题：title
  - 摘要：summary

---

- 3) 功能
  - 标志：logo
  - 广告：banner
  - 登陆：login
  - 登录条：loginbar
  - 注册：register
  - 搜索：search
  - 功能区：shop
  - 标题：title
  - 加入：joinus
  - 状态：status
  - 按钮：btn
  - 滚动：scroll
  - 标籤页：tab
  - 文章列表：list
  - 提示信息：msg
  - 当前的：current
  - 小技巧：tips
  - 图标：icon
  - 注释：note
  - 指南：guild
  - 服务：service
  - 热点：hot
  - 新闻：news
  - 下载：download
  - 投票：vote
  - 合作伙伴：partner
  - 友情链接：link
  - 版权：copyright

---

### 2. 注释

注释得当，每一个模块的意义别人一读就明了；

### 3. 重复样式封装，一次定义多次调用

将相同的样式形成单独的类再进行引用，更加利于维护

### 4. 书写的顺序（是指演示的书写顺序）

```css
.header{
    位置属性{position top z-index display float}
    盒子模型{width height padding margin}
    文字{font line-height}
    背景{background border}
    其他{animation transition}
```

总结自己的习惯，尽量成系统的去解析页面，从 psd 开始就有一个基本思想，不要随心的去理解效果图，命名的时候要注意，选择器的长度也不要太长哦，能重复使用的代码尽量封装到一个类中，可以多次调用。
