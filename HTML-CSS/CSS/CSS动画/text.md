# CSS 动画

一些 CSS 属性可以是动画的，也就是说，当它的值改变时，或者当 CSS 动画 (CSS animation) 或 CSS 转换 (CSS transition) 使用时，它可以以平滑的方式改变。[CSS animated properties](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_animated_properties)

## transition、transform 和 animation

### transition

transition 的中文含义是**过渡**。过渡可以实现元素**不同状态间的平滑过渡**（补间动画），经常用来制作动画效果。就是元素从这个属性 (color) 的某个值 (red) 过渡到这个属性 (color) 的另外一个值 (green)，这是一个状态的转变，需要一种条件来触发这种转变，比如我们平时用到的 `:hoever`、`:focus`、`:checked`、媒体查询或者 JavaScript。

- 补间动画：自动完成从起始状态到终止状态的的过渡。不用管中间的状态。

- 帧动画：通过一帧一帧的画面按照固定顺序和速度播放。如电影胶片。

### transform

**转换/变形**可以实现元素的位移、旋转、变形、缩放，甚至支持矩阵方式。

转换再配合过渡和动画，可以取代大量早期只能靠 Flash 才可以实现的效果。

在 CSS3 当中，通过 `transform` 转换来实现 2D 转换或者 3D 转换。

- 2D 转换包括：缩放（scale）、移动（translate）、旋转（rotate）。

- 3D 转换：旋转（rotateX、rotateY、rotateZ）、移动（translateX、translateY、translateZ）、透视（perspective）、3D 呈现（transform-style）

> transform 本身并没有过度状态，配合 transition 属性，才会有平滑效果。

### animation

用于设置**动画**属性，可通过设置多个节点

来精确控制一个或一组动画，常用来实现复杂的动画效果。

> animation 与 transition 不同的是，keyframes 提供更多的控制，尤其是时间轴的控制，这点让 css animation 更加强大，使得 flash 的部分动画效果可以由 css 直接控制完成

## 动画其他概念

### 1. 绘制频率

页面上每一帧变化都是系统绘制出来的 (GPU 或者 CPU)。但这种绘制又和 PC 游戏的绘制不同，它的最高绘制频率受限于显示器的刷新频率（而非显卡），所以大多数情况下最高的绘制频率只能是每秒 60 帧 (frame per second，以下用 fps 简称），对应于显示器的 60Hz。60fps 是一个最理想的状态。

### 2. 刷新频率

图像在屏幕上更新的速度，也即屏幕上的图像每秒钟出现的次数，它的单位是赫兹（Hz）。刷新频率越高，屏幕上图像闪烁感就越小，稳定性也就越高，换言之对视力的保护也越好。一般人的眼睛、不容易察觉 75Hz 以上刷新频率带来的闪烁感，因此最好能将您显示卡刷新频率调到 75Hz 以上。要注意的是，并不是所有的显示卡都能够在最大分辨率下达到 70Hz 以上的刷新频率（这个性能取决于显示卡上 RAMDAC 的速度），而且显示器也可能因为带宽不够而不能达到要求。影响刷新率最主要的还是显示器的带宽。

显示器带宽是显示器视频放大器通频带宽度的简称，指电子枪每秒钟在屏幕上扫过的最大总像素数，以 MHz（兆赫兹）为单位。 带宽的值越大，显示器性能越好。

### 3. 硬件加速

硬件有三个处理器，CPU、GPU 和 APU（不是加速处理器是声音处理器）。他们通过 PCI/AGP/PCIE 总线交换数据。今天，GPU 已经不再局限于 3D 图形处理了，GPU 通用计算技术发展已经引起业界不少的关注，事实也证明在浮点运算、并行计算等部分计算方面，GPU 可以提供数十倍乃至于上百倍于 CPU 的性能。

### 4.60Hz 和 60fps 是什么关系

没有任何关系。fps 代表 GPU 渲染画面的频率，Hz 代表显示器刷新屏幕的频率。一幅静态图片，你可以说这副图片的 fps 是 0 帧/秒，但绝对不能说此时屏幕的刷新率是 0Hz，也就是说刷新率不随图像内容的变化而变化。游戏也好浏览器也好，我们谈到掉帧，是指 GPU 渲染画面频率降低。比如跌落到 30fps 甚至 20fps，但因为视觉暂留原理，我们看到的画面仍然是运动和连贯的。

### 5. 动画类型

常见的 css3 动画一般有补间动画（又叫“关键帧动画”）和逐帧动画两种。

- 1. 补间动画/关键帧动画：

常用于实现位移、颜色（透明度）、大小、旋转、倾斜等变化。一般有 `Transitions` 和 `Keyframes animation` 两种方法实现补间动画。

`Transitions`：用于实现简单的动画，只有起始两帧过渡。多用于页面的交互操作，使交互效果更生动活泼。

> CSS 的 transition 允许 CSS 的属性值在一定的时间区间内平滑地过渡。
> 这种效果可以在鼠标单击、获得焦点、被点击或对元素任何改变中触发，并圆滑地以动画效果改变 CSS 的属性值。

`Keyframes animation`：用于实现较为复杂的动画，一般关键帧较多。

> 设置动画的关键帧规则。
> animation 的 timing-function 设置为 ease、linear 或 cubic-bezier，它会在每个关键帧之间插入补间动画，产生具有连贯性的动画。

- 2. 逐帧动画

逐帧动画可用于 loading 动画，但更多的用于 Sprite 精灵动画（人物运动）。精灵动画把所有帧都放在一起，通过 CSS3 的 `animation` 控制 `background-position`。

> animation 的 timing-function 默认值为 ease，它会在每个关键帧之间插入补间动画，所以动画效果是连贯性的。
> 除了 ease、linear、cubic-bezier 之类的过渡函数都会为其插入补间。
> 有些效果不需要补间，只需要关键帧之间的跳跃，这时应该使用 steps 过渡方式。

### 6. 动画的优缺点

- 1. 优点：

简单、高效
声明式的
不依赖于主线程，采用硬件加速（GPU）
简单的控制 keyframe animation 播放和暂停

- 2. 缺点：

不能动态修改或定义动画内容
不同的动画无法实现同步
多个动画彼此无法堆叠

> 1.CSS3 `transition` 强制硬件加速会加大 GPU 消耗，高负荷情形下将导致运行不流畅。这种情况在移动设备上尤为明显。（特殊情况下，比如当数据在浏览器主线程和排版线程之间传递产生的瓶颈也会导致不流畅）。某些 CSS 属性，比如 transform 和 opacity，则不受这些瓶颈影响。Adobe 在这里精心总结了这些问题。详细请戳
> 2.`transition` 的兼容性问题是个诟病，IE10+及现代浏览器，使用起来会造成很多不便。
> 3. 由于 `transition` 并不是由 JavaScript 原生控制（而仅仅是由 JavaScript 触发），浏览器无法获知如何与控制这些 `transition` 的 JavaScript 代码同步地优化他们。
> 4.keyframes animation 的动画曲线会应用到所有变化的属性上，而且手写比较复杂的动画，写起来就是噩梦。

### timing-function

[timing-function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/timing-function)

CSS 数据类型表示一个数学函数，它描述了在一个过渡或动画中一维数值的改变速度。这实质上让你可以自己定义一个加速度曲线，以便动画的速度在动画的过程中可以进行改变。这些函数通常被称为**缓动函数**。

#### 定时函数

CSS 支持两种定时函数：立方贝塞尔曲线的子集和阶梯函数。这些函数中最有用的是一个关键字，可以很容易地引用它们。

##### cubic-bezier 定时函数

`cubic-bezier()` 定义了一条 立方贝塞尔曲线（cubic Bézier curve）。这些曲线是连续的，一般用于动画的平滑变换，也被称为缓动函数（easing functions）。

一条立方贝塞尔曲线需要四个点来定义，P0 、P1 、P2 和 P3。P0 和 P3 是起点和终点，这两个点被作为比例固定在坐标系上，横轴为时间比例，纵轴为完成状态。P0 是 (0, 0)，表示初始时间和初始状态。P3 是 (1, 1) ，表示终止时间和终止状态。

并非所有的三次贝塞尔曲线都适合作为计时函数，也并非所有的曲线都是数学函数，即给定横坐标为 0 或 1 的曲线。在 CSS 定义的 P0 和 P3 固定的情况下，三次贝塞尔曲线是一个函数，因此，当且仅当 P1 和 P2 的横坐标都在 `[0,1]` 范围内时，三次贝塞尔曲线是有效的。

CSS 中允许使用这些贝塞尔曲线：

```js
cubic-bezier(0.1, 0.7, 1.0, 0.1);
cubic-bezier(0, 0, 1, 1);
cubic-bezier(-0.2, 0.6, -0.1, 0);
cubic-bezier(1.1, 0, 4, 0);
```

##### steps 定时函数

`steps(number_of_steps, direction)`

### custom-ident

[custom-ident](https://developer.mozilla.org/zh-CN/docs/Web/CSS/custom-ident)

用户自定义字符串标识符。一种 CSS 数据类型；要区分大小写，值不能有任何歧义。

语法同 CSS 属性名相似，但它是区分大小写的。可以由以下字符组成：

- 字母 (A - Z, a - z),
- 十进制数 (0 - 9),
- 连字符 (`-`),
- 下划线 (`\_`), 下划线
- 转义字符 ( `\`),
- Unicode 编码（格式：转义字符（`\`）后跟 1 到 6 位十六进制数）

> 注意：id1, Id1, iD1 和 ID1 都是不同标识符，因为标识符是区分大小写的。另一方面，因为可以解码，所有 `toto\?` 和 `toto\3F` 是相同的。

#### 禁用值

不能用单引号或双引号包起来。此外，第一个字符不能为数字，字符串开头不能是连字符 (-) 后跟数字或连字符。

为避免歧义，各个属性对应的 `<custom-ident>` 禁止使用以下特殊值：

---

- **animation-name**

禁用 CSS 关键字 unset, initial, inherit, none

- **counter-reset**
- **counter-increment**

禁止使用 unset, initial, inherit, none.

---

- **@counter-style**
- **list-style-type**

禁止使用 unset, initial, inherit, none, inline, outside

同时不同浏览器预定义的值如：disc, circle, square, decimal, cjk-decimal, decimal-leading-zero, lower-roman, upper-roman, lower-greek, lower-alpha, lower-latin, upper-alpha, upper-latin, arabic-indic, armenian, bengali, cambodian, cjk-earthly-branch, cjk-heavenly-stem, cjk-ideographic, devanagari, ethiopic-numeric, georgian, gujarati, gurmukhi, hebrew, hiragana, hiragana-iroha, japanese-formal, japanese-informal, kannada, katakana, katakana-iroha, khmer, korean-hangul-formal, korean-hanja-formal, korean-hanja-informal, lao, lower-armenian, malayalam, mongolian, myanmar, oriya, persian, simp-chinese-formal, simp-chinese-informal, tamil, telugu, thai, tibetan, trad-chinese-formal, trad-chinese-informal, upper-armenian, disclosure-open, 和 disclosure-close 也不能使用。

---

- **grid-row-start**
- **grid-row-end**
- **grid-column-start**
- **grid-column-end**

禁止使用 span 。

- **will-change**

禁止使用 unset, initial, inherit, 以及 will-change, auto, scroll-position, and contents.

---

阅读：

[CSS3 Transitions, Transforms 和 Animation 使用简介与应用展示](https://www.zhangxinxu.com/wordpress/2010/11/css3-transitions-transforms-animation-introduction/)

[CSS3 transition 实现超酷图片墙动画效果](https://www.zhangxinxu.com/wordpress/2009/12/css3-transformtransition%E5%AE%9E%E7%8E%B0%E8%B6%85%E9%85%B7%E5%9B%BE%E7%89%87%E5%A2%99%E5%8A%A8%E7%94%BB%E6%95%88%E6%9E%9C/)

[CSS3 动画实践](https://aotu.io/notes/2016/01/04/css3-animation/index.html)

[主流动画实现方式总结](http://www.zuojj.com/archives/1292.html)

[深入理解 CSS3 Animation 帧动画](https://www.cnblogs.com/aaronjs/p/4642015.html)

[CSS 动画：animation、transition、transform、translate 傻傻分不清](https://juejin.im/post/5b137e6e51882513ac201dfb)
