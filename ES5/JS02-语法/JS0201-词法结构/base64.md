# Base64

有时，文本里面包含一些不可打印的符号，比如 ASCII 码 0 到 31 的符号都无法打印出来，这时可以使用 Base64 编码，将它们转成可以打印的字符。另一个场景是，有时需要以文本格式传递二进制数据，那么也可以使用 Base64 编码。

Base64 是一组相似的二进制到文本（binary-to-text）的编码规则，使得二进制数据在解释成 radix-64 的表现形式后能够用 ASCII 字符串的格式表示出来。

当然 Base64 编码也有多种编码形式，比如在 MIME 中，Base64 选择的是 `0～9、A～Z、a-z、+` 和 `/` 这 64 个字符组成的可打印字符。

> 所谓 Base64 就是一种 **编码方法**。使用它的主要目的，不是为了加密，而是 *为了不出现特殊字符*，简化程序的处理。

## 1.编码原理

Base64 编码之所以称为 Base64，是因为其使用 64 个字符来对任意数据进行编码，同理有 Base32、Base16 编码。标准 Base64 编码使用的 64 个字符为：`0～9`、`A～Z`、`a-z`、`+` 和 `/`。

| 字符 | 值  | 字符 | 值  | 字符 | 值  | 字符 | 值  |
| ---- | --- | ---- | --- | ---- | --- | ---- | --- |
| A    | 0   | Q    | 16  | g    | 32  | w    | 48  |
| B    | 1   | R    | 17  | h    | 33  | x    | 49  |
| C    | 2   | S    | 18  | i    | 34  | y    | 50  |
| D    | 3   | T    | 19  | j    | 35  | z    | 51  |
| E    | 4   | U    | 20  | k    | 36  | 0    | 52  |
| F    | 5   | V    | 21  | l    | 37  | 1    | 53  |
| G    | 6   | W    | 22  | m    | 38  | 2    | 54  |
| H    | 7   | X    | 23  | n    | 39  | 3    | 55  |
| I    | 8   | Y    | 24  | o    | 40  | 4    | 56  |
| J    | 9   | Z    | 25  | p    | 41  | 5    | 57  |
| K    | 10  | a    | 26  | q    | 42  | 6    | 58  |
| L    | 11  | b    | 27  | r    | 43  | 7    | 59  |
| M    | 12  | c    | 28  | s    | 44  | 8    | 60  |
| N    | 13  | d    | 29  | t    | 45  | 9    | 61  |
| O    | 14  | e    | 30  | u    | 46  | +    | 62  |
| P    | 15  | f    | 31  | v    | 47  | /    | 63  |

这 64 个字符是各种字符编码（比如 ASCII 编码）所使用字符的子集，并且可打印。唯一有点特殊的是最后两个字符，因对最后两个字符的选择不同，Base64 编码又有很多变种，比如 Base64 URL 编码。

> **Base64 URL**
>> 一种用于 URL 的改进 Base64 编码，它不在末尾填充'`=`'号，并将标准 Base64 中的`+` 和 `/` 分别改成了 `-` 和 `_` ，这样就免去了在 URL 编解码和数据库存储时所要作的转换，避免了编码信息长度在此过程中的增加，并统一了数据库、表单等处对象标识符的格式。
>>
>> 标准的 Base64 并不适合直接放在 URL 里传输，因为 URL 编码器会把标准 Base64 中的 `/` 和 `+` 字符变为形如 `%XX` 的形式，而这些 `%` 号在存入数据库时还需要再进行转换，因为 ANSI SQL 中已将 `%` 号用作通配符。

Base64 编码本质上是一种将二进制数据转成文本数据的方案。对于非二进制数据，是先将其转换成二进制形式，然后每连续 6 比特计算其十进制值，根据该值在上面的索引表中找到对应的字符，最终得到一个文本字符串。

```
|原始字符        |       H       |       e       |       l       |       l       |       o       |       !       |
|ASCII 十进制值  |       72      |      101      |      108      |      108      |      111      |       33      |
|二进制值        |0|1|0|0|1|0|0|0|0|1|1|0|0|1|0|1|0|1|1|0|1|1|0|0|0|1|1|0|1|1|0|0|0|1|1|0|1|1|1|1|0|0|1|0|0|0|0|1|
|Base64 十进制值 |     18    |     6     |     21    |     44    |     27    |     6     |     60    |     33    |
|Base64 编码后值 |     S     |     G     |     V     |     s     |     b     |     G     |     8     |     h     |
```

可知 `Hello!` 的 Base64 编码结果为 `SGVsbG8h`，原始字符串长度为 6 个字符，编码后长度为 8 个字符，每 3 个原始字符经 Base64 编码成 4 个字符，编码前后长度比 4/3，这个长度比很重要 - 比原始字符串长度短，则需要使用更大的编码字符集，这并不我们想要的；长度比越大，则需要传输越多的字符，传输时间越长。Base64 应用广泛的原因是在字符集大小与长度比之间取得一个较好的平衡，适用于各种场景。

但这里需要注意一个点：Base64 编码是每 3 个原始字符编码成 4 个字符，如果原始字符串长度不能被 3 整除，那怎么办？使用 `0` 值来补充原始字符串。

```
|原始字符        |       !       |               |               |
|ASCII 十进制值  |       33      |               |               |
|二进制值        |0|0|1|0|0|0|0|1|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|
|Base64 十进制值 |     8     |     16    |     0     |     0     |
|Base64 编码后值 |     I     |     Q     |     A     |     A     |
```

`!` Base64 编码的结果为 `IQAA`。最后 2 个零值只是为了 Base64 编码而补充的，在原始字符中并没有对应的字符，那么 Base64 编码结果中的最后两个字符 `AA` 实际不带有效信息，所以需要特殊处理，以免解码错误。

标准 Base64 编码通常用 `=` 字符来替换最后的 `A`，即编码结果为 `IQ==`。因为 `=` 字符并不在 Base64 编码索引表中，其意义在于结束符号，在 Base64 解码时遇到 `=` 时即可知道一个 Base64 编码字符串结束。

如果 Base64 编码字符串不会相互拼接再传输，那么最后的 `=` 也可以省略，解码时如果发现 Base64 编码字符串长度不能被 4 整除，则先补充 `=` 字符，再解码即可。

解码是对编码的逆向操作，但注意一点：对于最后的两个 `=` 字符，转换成两个 `A` 字符，再转成对应的两个 6 比特二进制 0 值，接着转成原始字符之前，需要将最后的两个 6 比特二进制 0 值丢弃，因为它们实际上不携带有效信息。

## 2.base64 变体

| 名称                                                    | 62位 | 63位 | 补全符        |
| ------------------------------------------------------- | ---- | ---- | ------------- |
| RFC 1421: Base64 for Privacy-Enhanced Mail (deprecated) | `+`  | `/`  | `=` mandatory |
| RFC 2045: Base64 transfer encoding for MIME             | `+`  | `/`  | `=` mandatory |
| RFC 2152: Base64 for UTF-7                              | `+`  | `/`  | No            |
| RFC 3501: Base64 encoding for IMAP mailbox names        | `+`  | `,`  | No            |
| RFC 4648: base64 (standard)                             | `+`  | `/`  | `=` optional  |
| RFC 4648: base64url (URL- and filename-safe standard)   | `-`  | `_`  | `=`  optional |
| RFC 4880: Radix-64 for OpenPGP                          | `+`  | `/`  | `=` mandatory |

> UTF-7
>> UTF-7 (7-位元 Unicode 转换格式）是一种可变长度字符编码方式，用以将 Unicode 字符以 ASCII 编码的字符串来呈现，可以应用在电子邮件传输之类的应用。
>>
>>UTF-7 首次被提出是在一个实验性的通讯协定里（RFC 1642，A Mail-Safe Transformation Format of Unicode），这份 [RFC](http://zh.wikipedia.org/wiki/RFC)（Request for Comments）提案后来因 RFC 2152 的提出而被取代（RFC 2152 本身为新闻型（informational）的文案）。在 RFC 2152 当中明确的指出该份 RFC 本身不为互联网的标准做出任何明确的定义（明列于文案前头的 Status of this Memo）。尽管这份 RFC 2152 在 IANA（Internet Assigned Numbers Authority）的字符集列表里被引述为 UTF-7，然而 UTF-7 本身并非 Unicode 的标准之一，即使在目前最新的 Unicode 5.0 里也仅列出 UTF-8、UTF-16 和 UTF-32。

## 3.base64 编码应用

### 3.1.HTML 内嵌 Base64 编码图片

前端在实现页面时，对于一些简单图片，通常会选择将图片内容直接内嵌在页面中，避免不必要的外部资源加载，增大页面加载时间，但是图片数据是二进制数据，该怎么嵌入呢？绝大多数现代浏览器都支持一种名为 Data URLs 的特性，允许使用 Base64 对图片或其他文件的二进制数据进行编码，将其作为文本字符串嵌入网页中。

```css
.ipt_rec{
  background: url(data:image/png;base64,iVB...CC) no-repeat center;
}
```

> Data URLs
>> 即前缀为 `data:` 协议的 URL，其允许内容创建者向文档中嵌入小文件。

当然，也可以直接基于 `image` 标签嵌入图片：

```html
<img alt="Image" src="data:image/png;base64,iVB...CC" />
```

### 3.2.MIME（多用途互联网邮件扩展）

我们的电子邮件系统，一般是使用 SMTP（简单邮件传输协议）将邮件从客户端发往服务器端，邮件客户端使用 POP3（邮局协议，第3版本）或 IMAP（交互邮件访问协议）从服务器端获取邮件。

SMTP 协议一开始是基于纯 ASCII文 本的，对于二进制文件（比如邮件附件中的图像、声音等）的处理并不好，所以后来新增 MIME 标准来编码二进制文件，使其能够通过 SMTP 协议传输。

导出邮件源码：

```sh
Mime-Version: 1.0
Content-Type: multipart/mixed;
	boundary="..."
# ...
Content-Type: text/plain;
	charset="gb18030"
Content-Transfer-Encoding: base64
# ...
Content-Type: text/html;
	charset="gb18030"
Content-Transfer-Encoding: base64

PGRpdj48YnI+PC9kaXY+
# ...
Content-Type: application/octet-stream;
	charset="gb18030";
	name="=?gb18030?B?MrTn1dUuanBn?="
Content-Disposition: attachment; filename="=?gb18030?B?MrTn1dUuanBn?="
Content-Transfer-Encoding: base64
```

## 4.base64 转码方法

JavaScript 原生提供两个 Base64 相关的方法。

- `btoa`：任意值转为 Base64 编码；
- `atob`：Base64 编码转为原来的值；

```js
btoa("i mess you"); // 'aSBtZXNzIHlvdQ=='
atob("aSBtZXNzIHlvdQ=="); // 'i mess you'
```

> 注意，这两个方法不适合非 ASCII 码的字符，会报错。由于 `DOMString` 是 16 位编码的字符串，所以如果有字符超出了 8 位 ASCII 编码的字符范围时，在大多数的浏览器中对 Unicode 字符串调用 `window.btoa` 将会造成一个 `Uncaught DOMException: Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.` 的异常。[Unicode 问题](https://developer.mozilla.org/zh-CN/docs/Glossary/Base64#unicode_%E9%97%AE%E9%A2%98)

要将非 ASCII 码字符转为 Base64 编码，必须中间插入一个转码环节，再使用这两个方法。

```js
btoa(encodeURIComponent("分分合合"));
// "JUU1JTg4JTg2JUU1JTg4JTg2JUU1JTkwJTg4JUU1JTkwJTg4"

decodeURIComponent(atob("JUU1JTg4JTg2JUU1JTg4JTg2JUU1JTkwJTg4JUU1JTkwJTg4"));
// 分分合合
```

---

参考：

1.[Base64 的编码与解码](https://developer.mozilla.org/zh-CN/docs/Glossary/Base64)
2.[Base64 编码原理与应用](http://blog.xiayf.cn/2016/01/24/base64-encoding/)
3.[计算机编码规则之:Base64编码](http://www.flydean.com/18-base64-encoding/)
4.[URL安全的Base64编码](https://www.cnblogs.com/shanyou/p/5474647.html)
5.[Data URLs](https://developer.mozilla.org/zh-CN/docs/web/http/basics_of_http/data_uris)
6.[UTF-7编码](https://www.jianshu.com/p/f599a4f289e7)
7.[UTF-7](https://datatracker.ietf.org/doc/html/rfc2152)
