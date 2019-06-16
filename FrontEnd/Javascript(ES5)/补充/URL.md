## 1.JavaScript URIs

当用户点击一个以 `javascript: URI` 时，它会评估 URI 中的代码，然后用返回的值替换页面内容，除非返回的值是 `undefined`。`void` 运算符可用于返回 `undefined`。例如：

```html
<!-- 以下四种，在 chrome,opera,firefox and IE 都不跳转，除了第四个在 firefox 会跳转 -->
<p><a href="javascript:void(0);">点点呀</a></p>
<p><a href="javascript:;">点点呀</a></p>
<p><a href="javascript:">点点呀</a></p>
<p><a href="javascript:0;">点点呀</a></p>
F
<p>
  <a href="javascript:void(document.body.style.backgroundColor='green');">
    点击这个链接会让页面背景变成绿色。
  </a>
</p>
```

> 注意，虽然这么做是可行的，但利用 `javascript:` 伪协议来执行 JavaScript 代码是不推荐的，推荐的做法是为链接元素绑定事件。

## 2.JavaScript 中伪协议 javascript: 使用探讨

将 javascript 代码添加到客户端的方法是把它放置在伪协议说明符 `javascript:` 后的 URL 中。这个特殊的协议类型声明了 URL 的主体是任意的 javascript 代码，它由 javascript 的解释器运行。如果 `javascript:URL` 中的 javascript 代码含有多个语句，必须使用分号将这些语句分隔开。这样的 URL 如下所示：

`javascript:var now = new Date(); "<h1>The time is:</h1>" + now;`

当浏览器装载了这样的 URL 时，它将执行这个 URL 中包含的 javascript 代码，并把最后一条 javascript 语句的字符串值作为新文档的内容显示出来。这个字符串值可以含有 HTML 标记，并被格式化，其显示与其他装载进浏览器的文档完全相同。

javascript URL 还可以含有只执行动作，但不返回值的 javascript 语句。例如：

`javascript:alert("hello world!")`

装载了这种 URL 时，浏览器仅执行其中的 javascript 代码，但由于没有作为新文档来显示的值，因此它并不改变当前显示的文档。

通常我们想用 `javascript:URL` 执行某些不改变当前显示的文档的 javascript 代码。要做到这一点，必须确保 URL 中的最后一条语句没有返回值。

```html
<p>
  <a href="javascript:var now = new Date(); '<h1>The time is:</h1>' + now;"
    >多语句</a
  >
</p>
<p>
  <a href="javascript:window.prompt('输入内容将替换当前页面!','');"
    >输入内容将替换当前页面</a
  >
</p>

<!-- 不改变当前文档-->
<p>
  <a href="javascript:window.prompt('输入内容将替换当前页面!','');undefined;"
    >不会替换当前页面</a
  >
</p>
<p>
  <a href="javascript:window.prompt('输入内容将替换当前页面!','');void 0;"
    >不会替换当前页面</a
  >
</p>
```

## 3.SHA-2

SHA-2，名称来自于安全散列算法 2（英语：Secure Hash Algorithm 2）的缩写，一种密码散列函数算法标准，由美国国家安全局研发，由美国国家标准与技术研究院（NIST）在 2001 年发布。属于 SHA 算法之一，是 SHA-1 的后继者。其下又可再分为六个不同的算法标准，包括了：SHA-224、SHA-256、SHA-384、SHA-512、SHA-512/224、SHA-512/256。

NIST 发布了三个额外的 SHA 变体，这三个函数都将消息对应到更长的消息摘要。以它们的摘要长度（以比特计算）加在原名后面来命名：SHA-256，SHA-384 和 SHA-512。它们发布于 2001 年的 FIPS PUB 180-2 草稿中，随即通过审查和评论。包含 SHA-1 的 FIPS PUB 180-2，于 2002 年以官方标准发布。2004 年 2 月，发布了一次 FIPS PUB 180-2 的变更通知，加入了一个额外的变种 SHA-224，这是为了匹配双密钥 3DES 所需的密钥长度而定义。

SHA-256 和 SHA-512 是很新的散列函数，前者以定义一个 word 为 32 位，后者则定义一个 word 为 64 位。它们分别使用了不同的偏移量，或用不同的常量，然而，实际上二者结构是相同的，只在循环运行的次数上有所差异。SHA-224 以及 SHA-384 则是前述二种散列函数的截短版，利用不同的初始值做计算。

这些新的散列函数并没有接受像 SHA-1 一样的公众密码社群做详细的检验，所以它们的密码安全性还不被大家广泛的信任。Gilbert 和 Handschuh 在 2003 年曾对这些新变种作过一些研究，声称他们没有找到弱点。

## 4.散列函数

**散列函数**（英语：Hash function）又称**散列算法**、**哈希函数**，是一种从任何一种数据中创建小的数字“指纹”的方法。散列函数把消息或数据压缩成摘要，使得数据量变小，将数据的格式固定下来。该函数将数据打乱混合，重新创建一个叫做**散列值**（hash values，hash codes，hash sums，或 hashes）的指纹。散列值通常用一个短的随机字母和数字组成的字符串来代表。好的散列函数在输入域中很少出现散列冲突。在散列表和数据处理中，不抑制冲突来区别数据，会使得数据库记录更难找到。

### 4.1 散列函数的性质

所有散列函数都有如下一个基本特性：如果两个散列值是不相同的（根据同一函数），那么这两个散列值的原始输入也是不相同的。这个特性是散列函数具有确定性的结果，具有这种性质的散列函数称为**单向散列函数**。

但另一方面，散列函数的输入和输出不是唯一对应关系的，如果两个散列值相同，两个输入值很可能是相同的，但也可能不同，这种情况称为“**散列碰撞**（collision）”，这通常是两个不同长度的输入值，刻意计算出相同的输出值。输入一些数据计算出散列值，然后部分改变输入值，一个具有强混淆特性的散列函数会产生一个完全不同的散列值。

典型的散列函数都有非常大的定义域，比如 SHA-2 最高接受(264-1)/8 长度的字节字符串。同时散列函数一定有着有限的值域，比如固定长度的比特串。在某些情况下，散列函数可以设计成具有相同大小的定义域和值域间的单射。散列函数必须具有不可逆性。

### 4.2 散列函数的应用

由于散列函数的应用的多样性，它们经常是专为某一应用而设计的。例如，[加密散列函数](https://zh.wikipedia.org/wiki/%E5%AF%86%E7%A2%BC%E9%9B%9C%E6%B9%8A%E5%87%BD%E6%95%B8)假设存在一个要找到具有相同散列值的原始输入的敌人。一个设计优秀的加密散列函数是一个“单向”操作：对于给定的散列值，没有实用的方法可以计算出一个原始输入，也就是说很难伪造。为加密散列为目的设计的函数，如 SHA-2，被广泛的用作检验散列函数。这样软件下载的时候，就会对照验证代码之后才下载正确的文件部分。此代码有可能因为环境因素的变化，如机器配置或者 IP 地址的改变而有变动。以保证源文件的安全性。

错误监测和修复函数主要用于辨别数据被随机的过程所扰乱的事例。当散列函数被用于校验和的时候，可以用相对较短(但不能短于某个安全参数, 通常不能短于 160 位)的散列值来验证任意长度的数据是否被更改过。

### 4.2.1 保护数据

散列值可用于唯一地识别机密信息。这需要散列函数是**抗碰撞**(collision-resistant)的，意味着很难找到产生相同散列值的数据。散列函数分类为**密码散列函数**和**可证明的安全散列函数**。第二类中的函数最安全，但对于大多数实际目的而言也太慢。透过生成非常大的散列值来部分地实现抗碰撞。例如，SHA-2 是最广泛使用的密码散列函数之一，它生成 256 比特值。

### 4.2.2 确保传递真实的信息

消息或数据的接受者确认消息是否被篡改的性质叫数据的真实性，也称为完整性。发信人通过将原消息和散列值一起发送，可以保证真实性。

### 4.2.3 散列表

散列表是散列函数的一个主要应用，使用散列表能够快速的按照关键字查找数据记录。（注意：关键字不是像在加密中所使用的那样是秘密的，但它们都是用来“解锁”或者访问数据的。）例如，在英语字典中的关键字是英文单词，和它们相关的记录包含这些单词的定义。在这种情况下，散列函数必须把按照字母顺序排列的字符串映射到为散列表的内部数组所创建的索引上。

散列表散列函数的几乎不可能/不切实际的理想是把每个关键字映射到唯一的索引上（参考[完美散列](https://zh.wikipedia.org/wiki/%E5%AE%8C%E7%BE%8E%E6%95%A3%E5%88%97)），因为这样能够保证直接访问表中的每一个数据。

一个好的散列函数（包括大多数加密散列函数）具有均匀的真正随机输出，因而平均只需要一两次探测（依赖于装填因子）就能找到目标。同样重要的是，随机散列函数不太会出现非常高的冲突率。但是，少量的可以估计的冲突在实际状况下是不可避免的（参考[生日悖论](https://zh.wikipedia.org/wiki/%E7%94%9F%E6%97%A5%E6%82%96%E8%AE%BA)或[鸽洞原理](https://zh.wikipedia.org/wiki/%E9%B4%BF%E5%B7%A2%E5%8E%9F%E7%90%86)）。

在很多情况下，heuristic 散列函数所产生的冲突比随机散列函数少的多。Heuristic 函数利用了相似关键字的相似性。例如，可以设计一个 heuristic 函数使得像 FILE0000.CHK, FILE0001.CHK, FILE0002.CHK，等等这样的文件名映射到表的连续指针上，也就是说这样的序列不会发生冲突。相比之下，对于一组好的关键字性能出色的随机散列函数，对于一组坏的关键字经常性能很差，这种坏的关键字会自然产生而不仅仅在攻击中才出现。性能不佳的散列函数表意味着查找操作会退化为费时的[线性搜索](https://zh.wikipedia.org/wiki/%E7%BA%BF%E6%80%A7%E6%90%9C%E7%B4%A2)。

### 4.2.4 错误校正

使用一个散列函数可以很直观的检测出数据在传输时发生的错误。在数据的发送方，对将要发送的数据应用散列函数，并将计算的结果同原始数据一同发送。在数据的接收方，同样的散列函数被再一次应用到接收到的数据上，如果两次散列函数计算出来的结果不一致，那么就说明数据在传输的过程中某些地方有错误了。这就叫做[冗余校验](https://zh.wikipedia.org/wiki/%E5%86%97%E4%BD%99%E6%A0%A1%E9%AA%8C)。

校正错误时，至少会对可能出现的扰动大致假定一个分布模式。对于一个信息串的微扰可以被分为两类，大的（不可能的）错误和小的（可能的）错误。我们对于第二类错误重新定义如下，假如给定 H（x）和 x+s，那么只要 s 足够小，我们就能有效的计算出 x。那样的散列函数被称作错误校正编码。这些错误校正编码有两个重要的分类：[循环冗余校验](https://zh.wikipedia.org/wiki/%E5%BE%AA%E7%92%B0%E5%86%97%E9%A4%98%E6%A0%A1%E9%A9%97)和[里德-所罗门码](https://zh.wikipedia.org/wiki/%E9%87%8C%E5%BE%B7-%E6%89%80%E7%BD%97%E9%97%A8%E7%A0%81)。

### 4.2.5 语音识别

对于像从一个已知列表中匹配一个 MP3 文件这样的应用，一种可能的方案是使用传统的散列函数——例如 [MD5](https://zh.wikipedia.org/wiki/MD5)，但是这种方案会对时间平移、CD 读取错误、不同的音频压缩算法或者音量调整的实现机制等情况非常敏感。使用一些类似于 MD5 的方法有利于迅速找到那些严格相同（从音频文件的二进制数据来看）的音频文件，但是要找到全部相同（从音频文件的内容来看）的音频文件就需要使用其他更高级的算法了。

那些并不紧随 IT 工业潮流的人往往能反其道而行之，对于那些微小差异足够健壮的散列函数确实存在。现存的绝大多数散列算法都是不够健壮的，但是有少数散列算法能够达到辨别从嘈杂房间里的扬声器里播放出来的音乐的健壮性。有一个实际的例子是 Shazam 服务。用户可以用手机打开其 app，并将话筒靠近用于播放音乐的扬声器。该项服务会分析正在播放的音乐，并将它于存储在数据库中的已知的散列值进行比较。用户就能够收到被识别的音乐的曲名。

### 4.2.6 Rabin-Karp 字符串搜索算法

Rabin-Karp 字符串搜索算法是一个相对快速的[字符串搜索算法](https://zh.wikipedia.org/wiki/%E5%AD%97%E4%B8%B2%E6%90%9C%E5%B0%8B%E6%BC%94%E7%AE%97%E6%B3%95)，它所需要的平均搜索时间是 `O(n)`。这个算法是创建在使用散列来比较字符串的基础上的。

## 5.DocumentFragment

`DocumentFragment` 接口表示一个没有父级文件的最小文档对象。它被当做一个轻量版的 `Document` 使用，用于存储已排好版的或尚未打理好格式的 XML 片段。最大的区别是因为 `DocumentFragment` 不是真实 DOM 树的一部分，它的变化不会引起 DOM 树的重新渲染的操作(reflow) ，且不会导致性能等问题。

最常用的方法是使用文档片段（`DocumentFragment`）作为参数（例如，任何 Node 接口类似 `Node.appendChild` 和 `Node.insertBefore`) 的方法），这种情况下被添加(append)或被插入(inserted)的是片段的所有子节点, 而非片段本身。因为所有的节点会被一次插入到文档中，而这个操作仅发生一个重渲染的操作，而不是每个节点分别被插入到文档中，因为后者会发生多次重渲染的操作。

该接口在 Web 组件中也非常有用: 模板 元素在其 `HTMLTemplateElement.content` 属性中包含了一个 `DocumentFragment` 。

可以使用 `document.createDocumentFragment` 方法或者构造函数来创建一个空的 `DocumentFragment`.

很明显，它有一种特殊的行为，该行为使得它非常有用，即当请求把一个 `DocumentFragment` 节点插入文档树时，插入的不是 `DocumentFragment` 自身，而是它的所有子孙节点。这使得 `DocumentFragment` 成了有用的占位符，暂时存放那些一次插入文档的节点。它还有利于实现文档的剪切、复制和粘贴操作。

### 5.1 JavaScript Tips - 使用 DocumentFragment 加快 DOM 渲染速度

大家在使用 JavaScript 的时候，DOM 操作是最平常不过的了， 随着 Web 前端技术的发展,我们越来越多的使用 JS 来操作 DOM 元素，比如通过 ajax 请求获取到数据，然后更新页面上的元素，一般情况下，这种操作我们会用类似 `node.appendChild()` 这中方式来完成。这个方法是无缓冲的，也就是说我们每次调用 `appendChild` 方法的时候，浏览器都会重新渲染页面。当然，使用这种方法也没有什么不行，因为我们在一般情况下都是对少量的 DOM 节点进行更新，也并不会带来太大的性能问题，但是如果大量的更新 DOM 节点，那么性能的差距就会越来越明显了。因为浏览器要不停的渲染页面，尤其是一些复杂的标签，大量的重新渲染非常消耗性能，影响用户体验。那么有什么好的方法能让这类 DOM 操作的效率提高呢？

虽然我们平时在开发中遇到这样情况的时候并不多，但还是有必要了解一下，JS 中提供了一个 `DocumentFragment` 的机制，相信大家对这个并不陌生，它可以提供一个缓冲的机制，将 DOM 节点先放到内存中，当节点都构造完成后，再将 `DocumentFragment` 对象添加到页面中，这时所有的节点都会一次渲染出来，这样就能减少浏览器很多的负担，明显的提高页面渲染速度。例如下面的代码：

```javascript
function CreateNodes() {
  for (var i = 0; i < 100000; i++) {
    var tmpNode = document.createElement("div");
    var oText = document.createTextNode(i);
    tmpNode.appendChild(oText);
    document.body.appendChild(tmpNode);
  }
}
console.time("普通模式");
CreateNodes();
console.timeEnd("普通模式");
//10000 20 23 23 20 23
//100000 174 164 166 177 170

function CreateFragments() {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 100000; i++) {
    var tmpNode = document.createElement("div");
    var oText = document.createTextNode(i);
    tmpNode.appendChild(oText);
    fragment.appendChild(tmpNode);
  }

  document.body.appendChild(fragment);
}

console.time("DocumentFragment 模式");
CreateFragments();
console.timeEnd("DocumentFragment 模式");
//10000 22 24 24 23 30
//100000 175 182 175 187 202
```

> 也没有怎么快呀 O_O

上面的代码给出了两个函数，分别是用普通的 DOM 方法和 `DocumentFragment` 两种方式向页面添加一万个 div 节点，大家可以自己实验一下，使用第二种方式要比第一种快很多。这里只是简单的 div 标签的平铺添加，如果是更加复杂的 HTML 标签或是多层的嵌套标签，那么性能的差距就会更加明显。???

参考：

[JavaScript URIs](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/void)

[A 标签使用 javascript: 伪协议](http://www.cnblogs.com/song-song/p/5277838.html)

[JavaScript 中伪协议 javascript:使用探讨](https://www.jb51.net/article/52358.htm)

[SHA-2](https://zh.wikipedia.org/wiki/SHA-2)

[散列函数](https://zh.wikipedia.org/wiki/%E6%95%A3%E5%88%97%E5%87%BD%E6%95%B8)

[DocumentFragment](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)

[JavaScript Tips - 使用 DocumentFragment 加快 DOM 渲染速度](https://www.cnblogs.com/springfield/archive/2010/06/27/1765589.html)

[DocumentFragment 的优化小知识](https://juejin.im/post/590f4eadac502e006cf718c3)
