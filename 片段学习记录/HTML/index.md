# HTML

## DOCTYPE 有什么用

```html
<!DOCTYPE html>
```

在 HTML5 中，DOCTYPE 唯一的作用是启用标准模式。更早期的 HTML 标准中，DOCTYPE 会附加其他意义，但没有任何浏览器会将 DOCTYPE 用于怪异模式和标准模式之间互换以外的用途。

出于历史原因，浏览器在解析以所谓的 Doctype 声明开头的 HTML 文档时，行为会更加可预测和更加统一。

由于该声明的存在通常表明文档作者遵循标准惯例，因此该声明在 HTML5 中用于区分标准兼容的解析模式和所谓的怪异解析模式。

> 请确定你把 DOCTYPE 正确地置于 HTML 文件的顶端。如果有任何其他字符位于 DOCTYPE 之前，比如注释或 XML 声明，会导致 Internet Explorer 9 或更早期的浏览器触发怪异模式。

### 模式

目前浏览器的排版引擎使用三种模式：**怪异模式**（Quirks mode）、**接近标准模式**（Almost standards mode）、以及**标准模式**（Standards mode）。在怪异模式下，排版会模拟 Navigator 4 与 Internet Explorer 5 的非标准行为。为了支持在网络标准被广泛采用前，就已经建好的网站，这么做是必要的。在标准模式下，行为即（但愿如此）由 HTML 与 CSS 的规范描述的行为。在接近标准模式下，只有少数的怪异行为被实现。

- **怪异模式**

“怪异”模式是指某些 Web 浏览器使用的一种技术，目的是保持与为 Internet Explorer 5 和更早版本设计的网页的向后兼容性。简单来说，Quirks Mode 就是浏览器为了兼容很早之前针对旧版本浏览器设计、并未严格遵循 W3C 标准的网页而产生的一种页面渲染模式。

> [source](https://medium.com/@bsendray/what-is-quirks-mode-4dc6d421057e)

- **接近标准模式**

从 Mozilla 1.0.1 和 1.1 beta 开始，存在一种新的渲染模式，称为“几乎标准”模式。这已添加到长期存在的“怪异”和“标准”模式中。

“几乎是标准”的渲染模式在所有细节中都与“标准”模式完全相同，唯一的区别在于，某些情况下它的工作方式类似于“怪异”模式：

- 线框和其中一些内嵌元素的高度计算。
- 受影响的一个常见情况是表格单元格内图像的布局。

这意味着在“怪异”或“几乎标准”模式下，基于 Mozilla 1.0.1 或更高版本中提供的呈现引擎的基于 Gecko 的浏览器中，表中切片图像的布局不太可能崩溃。

但是这只是极少数的情况，在大部分情况下 Almost Standards 和 Standards 两种模式是一致的，所以我们一般不专门区分二者，后面我们会提到如何查看浏览器渲染引擎信息，在这个信息中同样对 Almost Standards Mode 和 Standards Mode 是不做区分的。

> [source](https://developer.mozilla.org/en-US/docs/Mozilla/Gecko_Almost_Standards_Mode)

- **标准模式**

满足 w3c 规范的

### 标准模式下的页面与怪异模式下的页面区别

- **盒模型**

盒模型（box mode）是浏览器 Quirks Mode 和 Standards Mode 的主要区别。

对于“盒模型”一词并没有明确的文档定义，它是开发人员描述 CSS 中块级元素的一种约定俗称。

具体而言，针对一个块级元素，如 `<p>`、`<div>` 等，CSS 的规范定义了一个宽度和高度，以及 3 个级别的环绕它的框 padding、border 和 margin 。这些属性我们可以把它转移到我们日常生活中的盒子上来理解，所以将这种模型称为盒模式。对于盒模型，针对高度和宽度的定义，不同浏览器的解释不同。

出于历史原因，早期的 IE 浏览器（IE 6 以前）将盒子的 padding 和 border 算到了盒子的尺寸中，这一模型被称为 **IE 盒模型**。而在 W3C **标准的盒模型**中，box 的大小就是 content 的大小。

阅读：

[怪异模式和标准模式](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Quirks_Mode_and_Standards_Mode)
[What happens in Quirks Mode?](http://jkorpela.fi/quirks-mode.html)
[怪异模式（Quirks Mode）对 HTML 页面的影响](https://www.ibm.com/developerworks/cn/web/1310_shatao_quirks/index.html)
