## 八.居中

### 1.单列布局水平居中

水平居中的页面布局中最为常见的一种布局形式，多出现于标题，以及内容区域的组织形式，下面介绍几种实现水平居中的方法（注：下面各个实例中实现的是 `child` 元素的对齐操作，`child` 元素的父容器是 `parent` 元素）

- 1.使用 `inline-block` 和 `text-align` 实现

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

- 2.使用 `margin:0 auto;` 来实现

```css
.child {
  width: 200px;
  margin: 0 auto;
}
```

> 优点：兼容性好
> 缺点: 需要指定宽度(居中的是设定宽度的盒子)

- 3.使用 `display:table;` 实现

```css
.child {
  display: table;
  margin: 0 auto;
}
```

> 优点:只需要对自身进行设置
> 不足:IE6，7 需要调整结构

- 4.使用绝对定位实现

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

> 不足：兼容性差，IE9 及以上可用(表现效果是居中，但两边外边距值差一个盒宽)

- 5.实用 `flex` 布局实现

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

### 2.垂直居中

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

- 2.实用绝对定位

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

- 3.实用 flex 实现

```css
.parent {
  display: flex;
  align-items: center;
}
```

### 3.水平垂直全部居中

- 1.利用 `vertical-align，text-align，inline-block` 实现

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

- 2.利用绝对定位实现

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

- 3.利用 flex 实现

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 4.多列布局左列定宽，右列自适应

该布局方式非常常见，适用于定宽的一侧常为导航，自适应的一侧为内容的布局

- 1.利用 `float + margin` 实现

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

- 2.利用 `float + margin(fix)` 实现

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

- 3.使用 `float + overflow` 实现

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

- 4.使用 table 实现

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

- 5.实用 flex 实现

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

### 5.右列定宽，左列自适应

- 1.使用 `float + margin` 实现

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

//实践后，没能达到预定目标，内容会被遮挡(margin-right:-100px 没有起到预定的作用)

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

- 2.使用 table 实现(等高)

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

- 3.实用 flex 实现(等高)

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

### 6.左中两列定宽，右列自适应

- 1.利用 `float + margin` 实现

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

- 2.利用 `float + overflow` 实现

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

- 3.利用 table 实现

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

- 4.利用 flex 实现

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

### 7.两侧定宽，中栏自适应

- 1.利用 `float + margin` 实现

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

- 2.利用 table 实现

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

- 3.利用 flex 实现

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

### 8.一列不定宽，一列自适应

- 1.利用 `float + overflow` 实现

```css
.left {
  float: left;
}
.right {
  overflow: hidden;
}
```

- 2.利用 table 实现

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

- 3.利用 flex 实现

```css
.parent {
  display: flex;
}
.right {
  flex: 1;
}
```

> 完美符合需求

### 9.多列等分布局

多列等分布局常出现在内容中，多数为功能的，同阶级内容的并排显示等。

- 1.实用 float 实现

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

> 单纯设置百分比就好了；不明白为什么还要偏移...？？？

- 2.利用 table 实现

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

- 3.利用 flex 实现

```css
.parent {
  display: flex;
}
.column {
  flex: 1;
}
/*将 flex:1; 换成 width:100%; 效果也是一样的*/
```

### 10.九宫格布局

- 1.使用 table 实现

```html
<div class="parent">
  <div class="row">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
  <div class="row">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
  <div class="row">
    <div class="item"></div>
    <div class="item"></div>
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

- 2.实用 flex 实现

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

## 九.移动端学习

### 1.了解移动端

#### 1.1.产品形态

- PC 端和移动端共用一套项目

  - 猎豹、苹果、华为
  - 项目结构比较简单
  - 共用一个域名

- PC 端和移动端分离，两套项目

  - 京东、淘宝
  - 项目结构比较复杂（内容比较多）
  - 不共用一个域名
    > m 淘宝、京东的移动端
    > i 凤凰网的移动端

- PC 和移动端公用一套页面结构 （**响应式布局**）

  - 媒体查询+px+流式布局(百分比布局)
  - 布局简单

- PC 和移动端分离开 H5
  - 媒体查询+ rem 单位+流式布局(百分比布局)
  - 布局复杂

#### 1.2.PC 端和移动端的区别

- 浏览器区别

  - PC 浏览器兼容（IE 低版本）；移动端不支持 IE9 以下；
  - 移动端适配各个机型，分辨率不同

- 效果
  - PC 端伪类选择器（：hover）
  - 移动端没有划过效果，有轮播图切换

#### 1.3.viewport 视口

> 快捷键（`meta:vp + tab`）必须置于 `head` 之内; 写移动端页面必须加上；

`<meta name="viewport" content="width=device-width，user-scale=no， initial-scale=1.0， maximum-scale=1.0， minimum-scale=1.0>"`

- `viewport` 视口 手机端页面屏幕宽度
- `width=device-width` html 页面宽度等于设备(手机，平板)的宽度
- `user-scalable=no` 禁止用户缩放
- `initial-scale=1.0` 初始缩放比例
- `maximum-scale=1.0` 最大缩放比例
- `minimum-scale=1.0` 最小缩放比例

#### 1.4.CSS3 属性不同浏览器前缀

```css
-webkit-border-radius: 50%; /*-webkit 谷歌*/
-moz-border-radius: 50%; /*火狐*/
-ms-border-radius: 50%; /*IE*/
-o-border-radius: 50%; /*欧朋*/
border-radius: 50%;
/*
  我们的 css3 属性不支持低版本浏览器在我们日常工作中，必须至少写两个
  -webkit-border-radius: 50%;（移动端支持浏览器是 -webkit 内核）
  border-radius: 50%;
  */
```

## 十.CSS 重构

### 1.CSS 代码为什么要重构

#### 1.1.提高代码性能

- 1.提高页面加载速度

也就是说减小 css 文件的大小，提高页面加载速度，尽可能的利用 http 缓存；

- 2.提高 css 代码性能

不同的 css 代码，浏览器对其解析的速度不同，如何提高浏览器解析 css 戴拿的速度也是要考虑的，例如 css 选择器是从右侧开始查找。

#### 1.2.提高代码可维护性

- 1.可重用

一个网站风格基本保持一致，首页上可能有很多模块样式相同，内容不同，内容从后台调取，那么 css 样式和 html 结构就可以重复使用，那么 html 通过负值即可，css 代码就可以很多 html 模块使用同一部分的 css 样式；

- 2.可拓展

如果有新的需求增加模块，我们应该保证新增代码不会影响旧的代码和页面，并尽量减少新增，能重用尽量重用；

- 3.可修改

如果"万恶"的产品要求修改样式或者删除，如果当初没有进行很好的规划，那么你肯能就不会在原来的基础上"动刀"，因为你怕会影响其他，那有些无用的代码就会一直存在，影响性能。

### 2.如何重构

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

## 十一.提高代码的可维护性

### 1.命名

命名是 css 选择器的第一步，整个团队的命名风格一致，这样其他人接收的时候才会更加的高效，这里给大家一些参考：

- 1)页面结构
  - 容器: container
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

- 2)导航
  - 导航：nav
  - 主导航：mainnav
  - 子导航：subnav
  - 顶导航：topnav
  - 边导航：sidebar
  - 左导航：leftsidebar
  - 右导航：rightsidebar
  - 菜单：menu
  - 子菜单：submenu
  - 标题: title
  - 摘要: summary

---

- 3)功能
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
  - 当前的: current
  - 小技巧：tips
  - 图标: icon
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

> 注意事项: 1.一律小写; 2.尽量用英文; 3.不加中划线和下划线; 4.尽量不缩写，除非一看就明白的单词。

### 2.备注

备注得当，每一个模块的意义别人一读就明了；

### 3.重复样式封装，一次定义多次调用

将相同的样式形成单独的类再进行引用，更加利于维护

### 4.书写的顺序（是指演示的书写顺序）

```css
.header{
    位置属性{position top z-index display float}
    盒子模型{width height padding margin}
    文字{font line-height}
    背景{background border}
    其他{animation transition}
```

总结自己的习惯，尽量成系统的去解析页面，从 psd 开始就有一个基本思想，不要随心的去理解效果图，命名的时候要注意，选择器的长度也不要太长哦，能重复使用的代码尽量封装到一个类中，可以多次调用。
