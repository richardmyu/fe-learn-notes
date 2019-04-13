# answer

1.css 实现图片自适应宽高

max-width/height，见 demo/01图片自适应宽高

2.讲 flex，手写出 flex 常用的属性，并且讲出作用

flex: 弹性布局

容器属性

---

- flex-direction 属性决定主轴的方向（即项目的排列方向）
  - `flex-direction: row | row-reverse | column | column-reverse;`

- flex-wrap 属性定义是否换行以及如何换行
  - `flex-wrap: nowrap | wrap | wrap-reverse;`

- lex-flow 属性是 flex-direction 属性和 flex-wrap 属性的简写形式
  - 默认值为 `row nowrap`

- justify-content 属性定义了项目在主轴上的对齐方式
  - `justify-content: flex-start | flex-end | center | space-between | space-around;`

- align-items 属性定义项目在交叉轴上如何对齐
  - `align-items: flex-start | flex-end | center | baseline | stretch;`

- align-content 属性定义了多根轴线的对齐方式（如果项目只有一根轴线，该属性不起作用）
  - `align-content: flex-start | flex-end | center | space-between | space-around | stretch;`

---

项目的属性

---

- **order** 属性定义项目的排列顺序(数值越小，排列越靠前，默认为 0)
  - `order: <integer>;`

- **flex-grow** 属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大
  - `flex-grow: <number>; /* default 0 */`

- **flex-shrink** 属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
  - `flex-shrink: <number>; /* default 1 */`



---

3.BFC 是什么

4.项目里面的前端鉴权是怎么实现的？

5.vue 里面的虚拟 dom 是怎么回事？

6.vue 双向绑定讲一讲

7.手写函数防抖和函数节流

8.讲讲常用的 es6 语法，比如 let、promise、class 等等

9.浏览器渲染过程，回流重绘等等，load、DOMContentLoaded 等等事件的触发顺序
