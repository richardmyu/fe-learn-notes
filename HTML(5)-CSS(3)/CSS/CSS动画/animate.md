# CSS animations

CSS Animations 是 CSS 的一个模块，它定义了如何用关键帧来随时间推移对 CSS 属性的值进行动画处理。关键帧动画的行为可以通过指定它们的持续时间，它们的重复次数以及它们如何重复来控制。

CSS animations 使得可以将从一个 CSS 样式配置转换到另一个 CSS 样式配置。动画包括两个部分：描述动画的样式规则和用于指定动画开始、结束以及中间点样式的关键帧。

相较于传统的脚本实现动画技术，使用 CSS 动画有三个主要优点：

- 1. 能够非常容易地创建简单动画，你甚至不需要了解 JavaScript 就能创建动画。
- 2. 动画运行效果良好，甚至在低性能的系统上。渲染引擎会使用跳帧或者其他技术以保证动画表现尽可能的流畅。而使用 JavaScript 实现的动画通常表现不佳（除非经过很好的设计）。
- 3. 让浏览器控制动画序列，允许浏览器优化性能和效果，如降低位于隐藏选项卡中的动画更新频率。

## CSS 动画支持检测

```js
var animation = false,
  animationstring = "animation",
  keyframeprefix = "",
  domPrefixes = "Webkit Moz O ms Khtml".split(" "),
  pfx = "",
  elm = document.createElement("div");

if (elm.style.animationName !== undefined) {
  animation = true;
}

if (animation === false) {
  for (var i = 0; i < domPrefixes.length; i++) {
    if (elm.style[domPrefixes[i] + "AnimationName"] !== undefined) {
      pfx = domPrefixes[i];
      animationstring = pfx + "Animation";
      keyframeprefix = "-" + pfx.toLowerCase() + "-";
      animation = true;
      break;
    }
  }
}

// 针对不同浏览器使用正确语法实现动画效果
if (animation === false) {
  // animate in JavaScript fallback
} else {
  elm.style[animationstring] = "rotate 1s linear infinite";

  var keyframes =
    "@" +
    keyframeprefix +
    "keyframes rotate { " +
    "from {" +
    keyframeprefix +
    "transform:rotate( 0deg ) }" +
    "to {" +
    keyframeprefix +
    "transform:rotate( 360deg ) }" +
    "}";

  if (document.styleSheets && document.styleSheets.length) {
    document.styleSheets[0].insertRule(keyframes, 0);
  } else {
    var s = document.createElement("style");
    s.innerHTML = keyframes;
    document.getElementsByTagName("head")[0].appendChild(s);
  }
}
```

设置 `animation` 属性是很简单的，可以在 `style` 属性集合中简单的更新它的值。然而，增加 `keyframes` 是有难度的，由于它们不能够通过传统的 css 语法来定义。（虽然这样使得它们更加灵活，但是通过脚本来定义更加不易）

使用 javascript 来定义 `keyframes`，需要将其具体语法写为字符串。为了创建 `keyframes` 变量，在构建 `keyframes` 时要在其所有属性前加前缀，该变量包含完整的所有动画序列所需要的 `keyframes` 描述。

## 配置动画

创建动画序列，需要使用 `animation` 属性或其子属性，该属性允许配置动画时间、时长以及其他动画细节，但该属性不能配置动画的实际表现，动画的实际表现是由 `@keyframes` 规则实现，具体情况参见使用 `keyframes` 定义动画序列小节部分。

animation 的子属性有：

- 1.**`animation-delay`**

设置延时，即从元素加载完成之后到动画序列开始执行的这段时间。

0s 是该属性的默认值，代表动画在应用到元素上后立即开始执行。否则，该属性的值代表动画样式应用到元素上后到开始执行前的时间长度；

定义一个负值会让动画立即开始。但是动画会从它的动画序列中某位置开始。例如，如果设定值为 -1s，动画会从它的动画序列的第 1 秒位置处立即开始。

如果为动画延迟指定了一个负值，但起始值是隐藏的，则从动画应用于元素的那一刻起就获取起始值。

> 该值可用单位为秒 (s) 和毫秒 (ms)。如果未设置单位，定义无效。
> 定义多个值无效。

- 2.**`animation-direction`**

设置动画在每次运行完后是反向运行还是重新回到开始位置重复运行。

---

`normal` 每个循环内动画向前循环，换言之，每个动画循环结束，动画重置到起点重新开始，这是默认属性。

`alternate` 动画交替反向运行，反向运行时，动画按步后退，同时，带时间功能的函数也反向，比如，`ease-in` 在反向时成为 `ease-out`。计数取决于开始时是奇数迭代还是偶数迭代（简单说，就是奇数次从起点到终点，偶数次从终点到起点）

`reverse` 反向运行动画，每周期结束动画由尾到头运行。（从终点到起点反向运行，等价于 反向 normal）

`alternate-reverse` 反向交替， 反向开始交替：动画第一次运行时是反向的，然后下一次是正向，后面依次循环。决定奇数次或偶数次的计数从 1 开始。（奇数次从终点到起点，偶数次从起点到终点，等价于 反向 alternate)

---

> 设置多个值，只有第一个起效。

- 3.`animation-duration`

设置动画一个周期的时长。默认值为 0s，表示无动画。

> 一个动画周期的时长，单位为秒 (s) 或者毫秒 (ms)，无单位值无效。
> 设置多个值，只有第一个值有效。
> 负值无效，浏览器会忽略该声明，但是一些早起的带前缀的声明会将负值当作 0s。

- 4.`animation-iteration-count`

设置动画重复次数，默认属性 `animation` 默认播放动画循环一次。可以指定 `infinite` 无限次重复动画。

动画播放的次数不可为负值。可以用小数定义循环 (0.5 将播放动画到关键帧的一半（from 0 ~ 50%)。

> 多个值只有第一个有效；
> 负数被当成 `infinite` 效果

- `animation-name`

指定应用的一系列动画，每个名称代表一个由 `@keyframes` 定义的动画序列。

---

`none` 特殊关键字，表示无关键帧。可以不改变其他标识符的顺序而使动画失效，或者使层叠的动画样式失效。

IDENT 标识动画的字符串，由大小写不敏感的字母 a-z、数字 0-9、下划线 `_` 和 `/` 或横线 `-` 组成。第一个非横线字符必须是字母，数字不能在字母前面，不允许两个横线出现在开始位置。

---

- 5.`animation-play-state`

定义一个动画是否运行或者暂停。可以通过查询它来确定动画是否正在运行。另外，它的值可以被设置为暂停和恢复的动画的重放。

---

`running` 当前动画正在运行。
`paused` 当前动画以被停止。

---

> 多个值只有第一个值有效；

- 6.`animation-timing-function`

定义 CSS 动画在每一动画周期中执行的节奏。可能值为一或多个 `<timing-function>`。

对于关键帧动画来说，`timing function` 作用于一个关键帧周期而非整个动画周期，即从关键帧开始开始，到关键帧结束结束。

定义于一个关键帧区块的缓动函数 (animation timing function) 应用到改关键帧；另外，若该关键帧没有定义缓动函数，则使用定义于整个动画的缓动函数。

- 7.`animation-fill-mode`

指定动画执行前后如何为目标元素应用样式。

---

`none` 当动画未执行时，动画将不会将任何样式应用于目标，而是已经赋予给该元素的 CSS 规则来显示该元素。这是默认值。

`forwards` 目标将保留由执行期间遇到的最后一个关键帧计算值。（简单说，就是将最后一帧的样式赋予动画结束后）最后一个关键帧取决于 `animation-direction` 和 `animation-iteration-count` 的值：

| animation-direction | animation-iteration-count | last keyframe encountered |
| ------------------- | ------------------------- | ------------------------- |
| normal              | even or odd               | 100% or to                |
| reverse             | even or odd               | 0% or from                |
| alternate           | even                      | 0% or from                |
| alternate           | odd                       | 100% or to                |
| alternate-reverse   | even                      | 100% or to                |
| alternate-reverse   | odd                       | 0% or from                |

`backwards` 动画将在应用于目标时立即应用第一个关键帧中定义的值，并在 `animation-delay` 期间保留此值。（简单说，就是将第一帧的样式赋予动画之前，包括延迟期间）第一个关键帧取决于 `animation-direction` 的值：

| animation-direction          | first relevant keyframe |
| ---------------------------- | ----------------------- |
| normal or alternate          | 0% or from              |
| reverse or alternate-reverse | 100% or to              |

`both` 动画将遵循 `forwards` 和 `backwards` 的规则，从而在两个方向上扩展动画属性。（动画开始前遵循 `forwards`，动画执行结束遵循 `backwards`）

---

## 使用 keyframes 定义动画序列

一旦完成动画的时间设置， 接下来就需要定义动画的表现。通过使用 `@keyframes` 建立两个或两个以上关键帧来实现。每一个关键帧都描述了动画元素在给定的时间点上应该如何渲染。

因为动画的时间设置是通过 CSS 样式定义的，关键帧使用 percentage 来指定动画发生的时间点。0% 表示动画的第一时刻，100% 表示动画的最终时刻。因为这两个时间点十分重要，所以还有特殊的别名：`from` 和 `to`。这两个都是可选的，若 `from/0%` 或 `to/100%` 未指定，则浏览器使用计算值开始或结束动画。

也可包含额外可选的关键帧，描述动画开始和结束之间的状态。

## 动画事件

利用动画事件可以更好的控制动画和信息。这些事件由 `AnimationEvent` 对象表示，可探测动画何时开始结束和开始新的循环。每个事件包括动画发生的时间和触发事件的动画名称。

监听所有三种可能的动画事件，`setup()`方法设置事件监听器，当文档第一次加载完成时执行该方法。

```js
let e = document.getElementById("anima");
console.log("e ", e);
e.addEventListener("animationstart", listener, true);
e.addEventListener("animationiteration", listener, false);
e.addEventListener("animationend", listener, false);
e.className = "kk";
```

以上是非常标准的代码写法，`setup()` 最后设置动画元素的 `class` 为 `kk`，启动动画。

为什么这样做？因为 `animationstart` 事件在动画一开始时就被触发，在示例中，该事件在我们的代码执行前就被触发，所以我们自己通过设置元素的的 `class` 来启动动画。

事件传递给 `listener()` 函数：

```js
function listener(e) {
  let l = document.createElement("li");
  // console.log("e.type ", e, e.type);
  switch (e.type) {
    case "animationstart":
      l.innerHTML = "Started: elapsed time is " + e.elapsedTime;
      break;
    case "animationend":
      l.innerHTML = "Ended: elpased time is " + e.elapsedTime;
      break;
    case "animationiteration":
      l.innerHTML = "New loop started at time " + e.elapsedTime;
      break;
  }
  // console.log("l.innerHTml", l.innerHTML);
  document.getElementById("output").appendChild(l);
}
```

> 注意以上时间非常接近预期时间，但不是完全相等。也要注意在最后一个周期完成后，不会触发 `animationiteration` 事件，而触发 `animationend` 事件。
