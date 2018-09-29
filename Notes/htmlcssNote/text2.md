# HTML & CSS 基础补充

<!-- TOC -->

- [HTML & CSS 基础补充](#html--css-基础补充)
    - [隐藏元素的方法](#隐藏元素的方法)
      - [HTML](#html)
    - [`zoom`和`scale`的区别](#zoom和scale的区别)
        - [一、IE和Chrome等浏览器与zoom](#一ie和chrome等浏览器与zoom)
        - [二、CSS3 `transform`下的`scale`](#二css3-transform下的scale)
        - [三、差异](#三差异)
    - [常见的浏览器兼容问题有哪些](#常见的浏览器兼容问题有哪些)
        - [1.不同浏览器的标签默认margin和padding不同](#1不同浏览器的标签默认margin和padding不同)
        - [2.IE6双边距bug](#2ie6双边距bug)
        - [3.设置较小的高度标签（一般小于10px），在IE6，IE7，遨游中超出自己设置的高度](#3设置较小的高度标签一般小于10px在ie6ie7遨游中超出自己设置的高度)
        - [4.图片默认有间距](#4图片默认有间距)
        - [5.标签最低高度设置`min-height`不兼容](#5标签最低高度设置min-height不兼容)
        - [6. 透明度兼容设置](#6-透明度兼容设置)
        - [7.Box Model的bug](#7box-model的bug)
        - [8.IE6中的列表li楼梯状bug](#8ie6中的列表li楼梯状bug)
        - [9.li空白间距](#9li空白间距)
        - [10.overflow：auto;和position:relative的碰撞](#10overflowauto和positionrelative的碰撞)
        - [11.浮动层的错位](#11浮动层的错位)
        - [12.IE6克隆文本的bug](#12ie6克隆文本的bug)
        - [13.IE的图片缩放](#13ie的图片缩放)
        - [14.IE6下png图片的透明bug](#14ie6下png图片的透明bug)
        - [15.`<iframe>`透明背景bug](#15iframe透明背景bug)
        - [16.禁用IE默认的垂直滚动条](#16禁用ie默认的垂直滚动条)
        - [17.居中问题](#17居中问题)
    - [[通用hack方法/CSS兼容方案/js兼容方案全推送](https://zhuanlan.zhihu.com/p/25123086?refer=dreawer)](#通用hack方法css兼容方案js兼容方案全推送httpszhuanlanzhihucomp25123086referdreawer)
      - [1.通用hack方法篇](#1通用hack方法篇)
        - [1.1 CSS hack和filter原理](#11-css-hack和filter原理)
        - [1.2 IE条件注释](#12-ie条件注释)
        - [1.3 !important 关键字](#13-important-关键字)
        - [1.4 属性过滤器（较为常用的hack方法）](#14-属性过滤器较为常用的hack方法)
      - [2.CSS兼容方案篇](#2css兼容方案篇)
        - [2.1 a标签CSS顺序](#21-a标签css顺序)
        - [2.2 24位的png图片](#22-24位的png图片)
          - [2.3 透明度](#23-透明度)
        - [2.4 IE6双边距](#24-ie6双边距)
        - [2.5 双倍margin](#25-双倍margin)
        - [2.6 min-height的兼容写法](#26-min-height的兼容写法)
        - [2.7 盒模型差异](#27-盒模型差异)
        - [2.8 img标签-图片存在边距](#28-img标签-图片存在边距)
        - [2.9 IE6 高度无法小于10px](#29-ie6-高度无法小于10px)
        - [2.10 双倍float](#210-双倍float)
        - [2.11 ul列表边距属性不统一](#211-ul列表边距属性不统一)
        - [2.12 IE6下select元素显示bug](#212-ie6下select元素显示bug)
      - [3.js兼容方案篇](#3js兼容方案篇)
        - [3.1 document.formName.item()](#31-documentformnameitem)
        - [3.2 获取属性](#32-获取属性)
        - [3.3 ID](#33-id)
        - [3.4 input.type](#34-inputtype)
        - [3.5 setattribute](#35-setattribute)
        - [3.6 style与cssText](#36-style与csstext)
        - [3.7 indexof()](#37-indexof)
        - [3.8 event.srcElement](#38-eventsrcelement)
        - [3.9 父节点parentElement](#39-父节点parentelement)
        - [3.10 table使用innerHtml](#310-table使用innerhtml)
        - [3.11 移除节点](#311-移除节点)
        - [3.12 坐标](#312-坐标)
        - [3.13 事件监听](#313-事件监听)
        - [3.14 键盘事件 keyCode](#314-键盘事件-keycode)

<!-- /TOC -->

### 隐藏元素的方法

#### HTML

- `display: none;`
- `visibility: hidden;`
- `opacity: 0;`
- `position: relative/absolute/fixed; left:-120px;`
- `margin-left: -110px;`
- `clip-path: polygon(0px 0px, 0px 0px, 0px 0px, 0px 0px);`


### `zoom`和`scale`的区别

参考：[小tips: zoom和transform:scale的区别](http://www.zhangxinxu.com/wordpress/2015/11/zoom-transform-scale-diff/)

##### 一、IE和Chrome等浏览器与zoom

zoom的字面意思是“变焦”，摄影的时候常用到的一个概念。对于web上的zoom效果，你也可以按照此概念理解。可以改变页面上元素的尺寸，属于真实尺寸。

其支持的值类型有：

- 百分比值：`zoom:50%`，表示缩小到原来的一半。
- 数值：`zoom:0.5`，表示缩小到原来的一半。
- `normal`关键字：`zoom:normal`等同于`zoom:1`。

> 注意，虽然Chrome/Safari浏览器支持了zoom属性，但是，其实zoom并不是标准属性。

##### 二、CSS3 `transform`下的`scale`

而`transform`下的`scale`就不一样了，是明明确确写入规范的。从IE9+到其他现代浏览器都支持。语法为：`transform: scale(<x> [<y>])`. 同时有`scaleX`, `scaleY`专门的x, y方向的控制。

和`zoom`不同，`scale`值只能是数值。而且，还能是负数，没错，负数。而`zoom`不能是负值！

##### 三、差异

先总结下上面表面所见的差异：

- 浏览器兼容性。
- 控制缩放的值不一样。`zoom`更全面，但是不能是负数，只能等比例控制；而`scale`虽然只能是数值，但是能负数，可以只控制1个维度。

然而，更深层次的差异才是更重要的。

- `zoom`的缩放是相对于左上角的；而`scale`默认是居中缩放；
- `zoom`的缩放改变了元素占据的空间大小；而`scale`的缩放占据的原始尺寸不变，页面布局不会发生变化(影响的是视距？？？)；
- 对文字的缩放规则不一致。`zoom`缩放依然受限于最小12像素中文大小限制；而`scale`就是纯粹的对图形进行比例控制，文字50%原来尺寸。
- 还有一个肉眼看不见却更重要的差异，**渲染的性能差异明显**(`zoom`会引起页面重绘，而`scale`只会导致当前元素的重绘)。

由于`zoom`的缩放会改变元素的真实空间大小，换句话说，实时影响了其他小伙伴。

根据我的一些同事的测试，在文档流中`zoom`加在任意一个元素上都会引起一整个页面的重新渲染，而`scale`只是在当前的元素上重绘。这其实很好理解，对吧。`scale`呢变化时候，其原本的尺寸是不变的，因此，就没有layout的重计算；但是`zoom`牵一发动全身，就麻烦地多！

这就让我们要斟酌下移动端一些功能的实现了。

我们要实现元素的缩放效果，可以使用CSS3 `animation`, 但是存在这样一种情况，就是元素原本就使用了一些`transform`属性进行，此时，再使用`scale`进行`animation`缩放，就会覆盖原来的值，事情就会变得麻烦。

聪明的小伙伴想到了一个方法，就是使用zoom做动画。从效果上讲，`zoom`是可以的；但是，从性能上讲，大家就要掂量掂量了。


至于`zoom`缩放不是按照中心点缩放的这个兼容性差异，通过使用「海洋布局」实现，具体可参考“[IE下zoom或Matrix矩阵滤镜中心点变换实现](http://www.zhangxinxu.com/wordpress/2015/02/ie-zoom-transform-filter/)”一文，其中就有兼容使用`zoom/scale`的例子。

在移动端，大家也可以使用`zoom`进行一些静态内容的控制，可以避免为了`scale`而占有`translate`, `rotate`, `skew`等公用的`transform`属性。

> 需要注意的是，Chrome等浏览器下，`zoom/scale`不要同时使用，因为，缩放效果会累加。

### 常见的浏览器兼容问题有哪些

##### 1.不同浏览器的标签默认margin和padding不同

发生概率：100%

解决方案：

`*{ margin: 0; padding: 0;}`

##### 2.IE6双边距bug

块属性标签float之后，又有横向的margin值，在IE6中显示会比设置的大

发生概率：90%

解决方案：在float标签样式控制中加入`display:inline`;

##### 3.设置较小的高度标签（一般小于10px），在IE6，IE7，遨游中超出自己设置的高度

发生概率：60%

解决方案：给超出高度的标签设置`overflow:hidden`;或者设置行高`line-height`小于你设置的高度。

##### 4.图片默认有间距

发生概率：20%

解决方案：使用float为img布局

##### 5.标签最低高度设置`min-height`不兼容

发生概率：5%

解决方案：例如要设置一个标签的最小高度为200px

```
{ min-height: 200px;
  height: auto!important;
  height: 200px;
  overflow: visible;}
```

##### 6. 透明度兼容设置

发生概率：主要看你要写的东西设不设透明度

解决方案：一句话

```
transparent_class {
  filter:alpha(opacity=50);
  -moz-opacity:0.5;
  -khtml-opacity: 0.5;
  opacity: 0.5;
}
```

##### 7.Box Model的bug

描述：给一个元素设置了高度和宽度的同时，还为其设置margin和padding的值，会改变该元素的实际大小。

解决办法：在需要加 margin和padding的div内部加一个div,在这个div里设置margin和padding值。

##### 8.IE6中的列表li楼梯状bug

描述：通常在li中的元素（比如a）设置了浮动float，但li本身不浮动。

解决办法：

`ul li{float:left;}`或 `ul li{display:inline;}`

##### 9.li空白间距

描述：在IE下，会增加li和li之间的垂直间距

解决办法：给li里的a显式的添加宽度或者高度

`li a{width:20px;}`

或者

`li a{display:block;float:left;clear:left;}`

或者

`li {display:inline;}`
`li a{display:block;}`

或者

在每个列表li上设置一个实线的底边，颜色和li的背景色相同

##### 10.overflow：auto;和position:relative的碰撞

描述：此bug只出现在IE6和IE7中，有两个块级元素，父元素设置了`overflow：auto;`子元素设置了`position:relative;`且高度大于父元素，在IE6-7中子元素不会被隐藏而是溢出。

解决方案：给父元素也设置`position:relative`;

##### 11.浮动层的错位

描述：当内容超出外包容器定义的宽度时会导致浮动层错位问题。在Firefox、IE7、IE8及其他标准浏览器里,超出的内容仅仅只是超出边缘;但在IE6中容器会忽视定义的width值,宽度会错误地随内容宽度增长而增长。如果在这个浮动元素之后还跟着一个浮动元素,那么就会导致错位问题。

解决方案：`overflow：hidden;`

##### 12.IE6克隆文本的bug

描述：若你的代码结构如下
```
<!--这是注释-->

<div>

……

</div>
<!--这是注释-->
```

很有可能在IE6网页上出现一段空白文本

解决方案：

- 使用条件注释
- 删除所有注释
- 在注释前面的那个浮动元素加上 `display：inline；`

##### 13.IE的图片缩放

描述：图片在IE下缩放有时会影响其质量

解决方案：`img{ -mg-interpolation-mode:bicubic;}`

##### 14.IE6下png图片的透明bug

描述：使用透明图片,使用png24或png32图片在IE6下面显示图片会有一层淡蓝色的背景。

解决方案：

```
.img{

background:url('xxx');

_background:0;

_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='xxx',sizingMethod='scale');

}

img{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='xxx',sizingMethod='scale');}
```

或

```
<imgsrc="test.png" width="247" height="216"style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='xxx',sizingMethod='scale');" alt="" />
```

##### 15.`<iframe>`透明背景bug


描述：在IE浏览器中，`<iframe>`框架不会自动把背景设为透明

解决方案：

`<iframesrc="content.html" allowTransparency="true"></iframe>`

在iframe调用的content.html页面中设置

`body{background-color: transparent;}`

##### 16.禁用IE默认的垂直滚动条

解决方案：

```
html{
  overflow:auto;
}
```

##### 17.居中问题

div里的内容，IE默认为居中，而FF默认为左对齐，可以尝试增加代码：

`margin: 0 auto;`

### [通用hack方法/CSS兼容方案/js兼容方案全推送](https://zhuanlan.zhihu.com/p/25123086?refer=dreawer)


#### 1.通用hack方法篇

##### 1.1 CSS hack和filter原理

1).利用浏览器自身的bug来实现特定浏览器的样式
2).利用浏览器对CSS的完善度来实现，例如某些CSS规则或语法的支持程度，原理类似目前我们经常使用的 `-wekit-`　之类的属性；

##### 1.2 IE条件注释

IE的条件注释仅仅针对IE浏览器，对其他浏览器无效；例如下面的语法：

```
<!-- [if IE]>
  		//你想要执行的代码
<![endif]-->
<!-- [if lt IE 8]>
  			//你想要执行的代码
<![endif]-->
<!-- [if ! IE 8]>
  		//你想要执行的代码
<![endif]-->
```

![Alt text](./llqjr-1.jpg)


##### 1.3 !important 关键字

!important 在css中是声明拥有最高优先级，也就是说，不管css的其他优先级，只要!important出现，他的优先级就最高！遨游1.6及更低版本、IE6及更低版本浏览器不能识别它。尽管这个!important 很实用，但是非到必要的时刻，不要使用它！

##### 1.4 属性过滤器（较为常用的hack方法）

针对不同的IE浏览器，可以使用不同的字符来让特定的版本的IE浏览器进行样式控制。

![Alt text](./llqjr-2.jpg)


IE hack写法一览

![Alt text](./llqjr-3.jpg)



#### 2.CSS兼容方案篇

上一篇文章介绍了一些常用hack方法，这次来讲一些之前遇到过或者尝试过的一些CSS兼容问题与解决问题，这些是自己的一些收集整理，肯定不可能大而全，只是一些比较常见的问题，等我整理下，下次来写篇JS的兼容问题。

##### 2.1 a标签CSS顺序

很多新人在写a标签的样式，会疑惑为什么写的样式没有效果，其实只是写的样式被覆盖了，正确的a标签顺序应该：

link - visited - hover - active

##### 2.2 24位的png图片

IE6不支持透明咋办？使用png透明图片呗，但是需要注意的是24位的PNG图片在IE6是不支持的，解决方案有两种：

- 使用8位的PNG图片
- 为IE6准备一套特殊的图片

###### 2.3 透明度

```
opacity: 0.8; //通用
filter: alpha(opacity=80); //IE
filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=80); //IE6的写法
```

##### 2.4 IE6双边距

行内属性设置了块级属性（`display: block;`）后，会产生双倍边距。
解决方案是在添加一个 `display: inline;` 或者 `display: table;`

##### 2.5 双倍margin

浮动元素设置了margin在IE6下会产生双倍margin。
只要给浮动元素设置 `display: inline;`就可以了。或者说使用IE6的`hack：_margin；`

##### 2.6 min-height的兼容写法

```
.divBox{
  min-height:200px;
  height:auto !important;
  height:200px;
  overflow:visible;
}
```

##### 2.7 盒模型差异

IE盒模型：margin 、 content（包含border、padding）
W3C盒模型： margin 、border、 padding、 content

CSS3中的`box-sizing`的属性就是为了这两种模式，`border-box`（IE盒明星）和`content-box`（W3C）

##### 2.8 img标签-图片存在边距

使用 `vertical-align` 属性可以清楚这种边距

顺便说下a标签同样会存在边距，具体的解决方法可以看看去除`inline-block`元素间间距的N种方法;

##### 2.9 IE6 高度无法小于10px

添加`overflow`的属性
设置`font-size`的属性为高度的大小

##### 2.10 双倍float

```
.divBox{
  float:left;
  width:100px;
  margin:0 0 0 100px;		     //这种情况之下IE会产生200px的距离
  display:inline; 				 //使浮动忽略
}
```

##### 2.11 ul列表边距属性不统一

IE下 ul的边距是使用margin
firefox下ul的边距是使用padding

重置CSS基本样式， 统一使用margin或者padding

##### 2.12 IE6下select元素显示bug

select元素在IE6下是以窗口的形式展现的，所以在你需要弹出一个提示框（modal）的时候，你会发现select在modal的上面，无论你设置多大`z-index`都无效。解决的方法也很简单，利用一个透明的iframe盖住select就可以了

```
<div class=””wrapper>
	<!--[if IE 6]>
    <iframe style="position:absolute;top:0;left:0;width:100%;height:100px;
    z-index:-1;filter:alpha(opacity=0);opacity=0;border-style:none;">
    </iframe>
  <![endif]-->
	// TODO;
</div>
```

#### 3.js兼容方案篇

js兼容性方案如期而至，虽然现在有了前端框架和各种库已经帮我们解决了各种兼容问题，或是现代浏览器已经不需要考虑这些繁琐的兼容性，但是我们还是有必要了解下这些兼容问题,毕竟有些时候我们还是需要原生JavaScript来实现我们的功能，或是需要兼容至万恶的IE6。

以下的所说的浏览器都是特指低版本浏览器，毕竟现代浏览器已经很少有兼容性问题了

##### 3.1 document.formName.item()

```
document.formName.item(”itemName”);
//IE支持
document.formName.elements["elementName"];
//均支持
```

##### 3.2 获取属性

根据很多的人的反馈来看，无论是常规的获取自定义属性，或是jq的`attr()`在不同的环境下都是存在着些许兼容性问题，所以为了保险起见，最好是使用原生的`getAttribute()`来获取属性；

##### 3.3 ID

在IE下，我们是可以通过`document.idName`来获取元素，但是Firefox是不允许的。

而且Firefox中我们使用与html对象ID相同的变量名，所以，获取元素最好使用`document.getElementById(”idName”)` 代替 `document.idName`，避免不必要的bug

##### 3.4 input.type

IE下不允许修改input的类型，Firefox可以修改。尽量避免修改input的类型。

##### 3.5 setattribute

```
object.setAttribute("class","style");
//在IE8、Chrome、火狐、Opera10中都能设置成功；但是在IE7下无法设置。
object.setAttribute("className","className");
//只有IE7能设置成功，但是其他浏览器均无法设置。
```

统一使用 `object.className=”content”`

##### 3.6 style与cssText

```
object.setAttribute("style","width:100px; height:200px");
//在IE8、Chrome、火狐、Opera10中都能设置成功；但是在IE7下无法设置。
object.setAttribute("cssText","width:100px; height:200px");
//所有浏览器均不支持。
object.style.cssText="width:100px; height:200px";
//统一使用如上方法
```

##### 3.7 indexof()

IE8以下不兼容`indexof()`方法, 添加indexof的原型方法即可；

```
if (!Array.prototype.indexOf){
  Array.prototype.indexOf = function(elt){
    var len = this.length >>> 0;
    var from = Number(arguments[1]) || 0;
    from = (from < 0)? Math.ceil(from): Math.floor(from);
    if (from < 0){
      from += len;
    }
    for (; from < len; from++){
      if (from in this && this[from] === elt){
        return from;
      }
    }
    return -1;
  };
}
```

##### 3.8 event.srcElement

IE下，even不存在target属性

`srcObj = event.srcElement ? event.srcElement : event.target;`

##### 3.9 父节点parentElement

```
ele.parentElement
//firebox不支持
ele.parentNode
//通用
```

##### 3.10 table使用innerHtml

在IE中使用innerHtml和appendChild无效，解决方法是将内容插入到tbody中

```
var row = document.createElement("tr");
var cell = document.createElement("td");
var cell_text = document.createTextNode("插入的内容");
cell.appendChild(cell_text);
row.appendChild(cell);
document.getElementsByTagName("tbody")[0].appendChild(row);
```

##### 3.11 移除节点

```
removeNode();
//firebox不支持
removeChild();
//通用，取上一层父节点再移除子节点
```

##### 3.12 坐标

```
var page = {};
page.x = event.x ? event.x : event.pageX;
page.y = event.y ? event.y : event.pageY;
//event的x,y在IE中支持，pageX和pageY在Firefox中支持
```

##### 3.13 事件监听

```
//先判断是否支持通用的方法 addEventListener，然后判断 attachEvent

function addEvent(elem, eventName, handler) {
　　if (elem.attachEvent) {
　　　　elem.attachEvent("on" + eventName,function(){
　　　　　　handler.call(elem)}); 　
　　　　　　//此处使用回调函数call()，让this指向elem　　
  } else if (elem.addEventListener) {
　　    elem.addEventListener(eventName, handler, false);　　
  }
}

function removeEvent(elem, eventName, handler) {
  if (elem.detachEvent) {
  　　elem.detachEvent("on" + eventName,function(){
  　　　	handler.call(elem)}); 　　　　
  　　　	//此处使用回调函数call()，让this指向elem　　
  } else if (elem.removeEventListener) {
  　　elem.removeEventListener(eventName, handler, false);　　
  }
}
//IE提供了attachEvent和detachEvent两个接口，而Firefox提供的是addEventListener和removeEventListener。
```

##### 3.14 键盘事件 keyCode

```
function getKeyCode(e){
  //兼容IE和Firefox获得keyBoardEvent对象
  e = e ? e : (window.event ? window.event : "")
  //兼容IE和Firefox获得keyBoardEvent对象的键值
  return e.keyCode ? e.keyCode : e.which;
}
//IE：e.keyCode
//fireFox: e.which
```

