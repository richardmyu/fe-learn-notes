# Base64

有时，文本里面包含一些不可打印的符号，比如 ASCII 码 0 到 31 的符号都无法打印出来，这时可以使用 Base64 编码，将它们转成可以打印的字符。另一个场景是，有时需要以文本格式传递二进制数据，那么也可以使用 Base64 编码。

Base64 是一组相似的二进制到文本（binary-to-text）的编码规则，使得二进制数据在解释成 radix-64 的表现形式后能够用 ASCII 字符串的格式表示出来。Base64 这个词出自一种 MIME 数据传输编码。

所谓 Base64 就是一种 **编码方法**，可以将任意值转成 `0～9、A～Z、a-z、+` 和 `/` 这 64 个字符组成的可打印字符。使用它的主要目的，不是为了加密，而是 *为了不出现特殊字符*，简化程序的处理。

## 1.base 64 转码

JavaScript 原生提供两个 Base64 相关的方法。

- `btoa()`：任意值转为 Base64 编码
- `atob()`：Base64 编码转为原来的值

```js
btoa("i mess you"); // 'aSBtZXNzIHlvdQ=='
atob("aSBtZXNzIHlvdQ=="); // 'i mess you'
```

> 注意，这两个方法不适合非 ASCII 码的字符，会报错。由于 DOMString 是 16 位编码的字符串，所以如果有字符超出了 8 位 ASCII 编码的字符范围时，在大多数的浏览器中对 Unicode 字符串调用 `window.btoa` 将会造成一个 `Character Out Of Range` 的异常。[Unicode 问题](https://developer.mozilla.org/zh-CN/docs/Glossary/Base64#unicode_%E9%97%AE%E9%A2%98)

要将非 ASCII 码字符转为 Base64 编码，必须中间插入一个转码环节，再使用这两个方法。

```js
btoa(encodeURIComponent("分分合合"));
// "JUU1JTg4JTg2JUU1JTg4JTg2JUU1JTkwJTg4JUU1JTkwJTg4"

decodeURIComponent(atob("JUU1JTg4JTg2JUU1JTg4JTg2JUU1JTkwJTg4JUU1JTkwJTg4"));
// 分分合合
```

## 2. 编码尺寸增加

每一个 Base64 字符实际上代表着 6 比特位。因此，3 字节（一字节是 8 比特，3 字节也就是 24 比特）的字符串/二进制文件可以转换成 4 个 Base64 字符 (4x6 = 24 比特）。

这意味着 Base64 格式的字符串或文件的尺寸约是原始尺寸的 133%（增加了大约 33%）。如果编码的数据很少，增加的比例可能会更高。例如：字符串"a"的 length === 1 进行 Base64 编码后是"YQ=="的 length === 4，尺寸增加了 300%。

---

参考：

[Base64 的编码与解码](https://developer.mozilla.org/zh-CN/docs/Glossary/Base64)
