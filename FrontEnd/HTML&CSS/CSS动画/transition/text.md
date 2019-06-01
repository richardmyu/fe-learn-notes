# CSS transitions

CSS Transitions 是一个 CSS 模块，定义了如何创建一个平滑地变换 CSS 属性值的方法。它不仅允许创建变换方法，同时也允许通过定时函数来控制变换方法。

> `transition` 让 JavaScript 效果更平滑

CSS transitions 提供了一种在更改 CSS 属性时控制动画速度的方法。 其可以让属性变化成为一个持续一段时间的过程，而不是立即生效的。比如，将一个元素的颜色从白色改为黑色，通常这个改变是立即生效的，使用 CSS transitions 后该元素的颜色将逐渐从白色变为黑色，按照一定的曲线速率变化。这个过程可以自定义。

通常将两个状态之间的过渡称为**隐式过渡**（implicit transitions），因为开始与结束之间的状态由浏览器决定。

CSS transitions 可以决定哪些属性发生动画效果 (明确地列出这些属性)，何时开始 (设置 `delay`），持续多久 (设置 `duration`) 以及如何动画 (定义 `timing funtion`，比如匀速地或先快后慢)。

> 同时应当留意这种情形，在插入元素（如 `.appendChild()`）或改变属性 `display: none` 后立即使用过渡, 元素将视为没有开始状态，始终处于结束状态。简单的解决办法，改变属性前用 `window.setTimeout()` 延迟几毫秒。

## transition

是 `transition-property`，`transition-duration`，`transition-timing-function` 和 `transition-delay` 的一个简写属性。

过渡可以为一个元素在不同状态之间切换的时候定义不同的过渡效果。比如在不同的伪元素之间切换，像是 `:hover`，`:active` 或者通过 JavaScript 实现的状态变化。

`transition` 属性可以被指定为一个或多个 CSS 属性的过渡效果，多个属性之间用逗号进行分隔。

每个单属性转换都描述了应该应用于单个属性的转换（或特殊值 all 和 none）。 这包括：

- 零或一个值，表示转换应适用的属性。 这可能是以下任何一种：
  - 关键字 none
  - 关键字 all
  - 命名 CSS 属性的 `<custom-ident>` 。
- 零或一个 `<single-transition-timing-function>` 值表示要使用的过渡函数
- 零，一或两个 `<time>` 值。可以解析为时间的第一个值被分配给 `transition-duration`，并且可以解析为时间的第二个值被分配给 `transition-delay`。

> 当 `transition` 属性的值个数超过可以接收的值的个数时，多余的值都会被忽略掉，不再进行解析。

### 1.transition-property

指定哪个或哪些 CSS 属性用于过渡。只有指定的属性才会在过渡中发生动画，其它属性仍如通常那样瞬间变化。

> 如果指定简写属性（比如 background），那么其完整版中所有可以动画的属性都会被应用过渡。

---

`none` 没有过渡动画。
`all` 所有可被动画的属性都表现出过渡动画。
`IDENT` 属性名称。由小写字母 a 到 z，数字 0 到 9，下划线（`_`）和破折号（`-`）。第一个非破折号字符不能是数字。同时，不能以两个破折号开头。

---

### 2.transition-delay

规定了在过渡效果开始作用之前需要等待的时间。

值以秒（s）或毫秒（ms）为单位，表明动画过渡效果将在何时开始。取值为正时会延迟一段时间来响应过渡效果；取值为负时会导致过渡立即开始。

你可以指定多个延迟时间，每个延迟将会分别作用于你所指定的相符合的 css 属性（`transition-property`）

### 3.transition-duration

以秒或毫秒为单位指定过渡动画所需的时间。默认值为 0s ，表示不出现过渡动画。

可以指定多个时长，每个时长会被应用到由 `transition-property` 指定的对应属性上。如果指定的时长个数小于属性个数，那么时长列表会重复。如果时长列表更长，那么该列表会被裁减。两种情况下，属性列表都保持不变。

### 4.transition-timing-function

CSS 属性受到 `transition` 的影响，会产生不断变化的中间值，而 CSS `transition-timing-function` 属性用来描述这个中间值是怎样计算的。实质上，通过这个函数会建立一条加速度曲线，因此在整个 `transition` 变化过程中，变化速度可以不断改变。

这条加速度曲线被 `<timing-function>` 所定义，之后作用到每个 CSS 属性的过渡.

你可以规定多个 timing function,通过使用 `transition-property` 属性，可以根据主列表(transition property 的列表)给每个 CSS 属性应用相应的 timing function.如果 timing function 的个数比主列表中数量少，缺少的值被设置为初始值（ease） 。如果 timing function 比主列表要多，timing function 函数列表会被截断至合适的大小。这两种情况下声明的 CSS 属性都是有效的。

> 多数 timing functions 由四点定义一个 bezier 曲线。也可以从 [Easing Functions Cheat Sheet](https://easings.net/) 选择缓动效果。

## 检测过渡是否完成

当过渡完成时触发一个事件，在符合标准的浏览器下，这个事件是 `transitionend`, 在 WebKit 下是 `webkitTransitionEnd`. 详情查看页面底部的兼容性表格。 `transitionend` 事件提供两个属性:

---

`propertyName` 字符串，指示已完成过渡的属性。
`elapsedTime` 浮点数，指示当触发这个事件时过渡已运行的时间（秒）。这个值不受 `transition-delay` 影响。

---

照例可以用 `element.addEventListener()` 方法来监听这个事件：

`el.addEventListener("transitionend", updateTransition, true);`

> 如果取消了过渡则不会触发 `transitionend` 事件，因为在过渡完成前动画的属性值改变了。

## 当属性值列表长度不一致时

以 `transition-property` 的值列表长度为标准,如果某个属性值列表长度短于它的，则重复其值以长度一致:

```css
div {
  transition-property: opacity, left, top, height;
  transition-duration: 3s, 5s;
}
```

将按下面这样处理:

```css
div {
  transition-property: opacity, left, top, height;
  transition-duration: 3s, 5s, 3s, 5s;
}
```

类似地，如果某个属性的值列表长于 `transition-property` 的，将被截短:

```css
div {
  transition-property: opacity, left;
  transition-duration: 3s, 5s, 2s, 1s;
}
```

将按下面这样处理:

```css
div {
  transition-property: opacity, left;
  transition-duration: 3s, 5s;
}
```

## 不足

- 需要事件触发，所以没法在网页加载时自动发生
- 是一次性的，不能重复发生，除非一再触发
- 只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态
- 一条 transition 规则，只能定义一个属性的变化，不能涉及多个属性。
