# 文件和二进制数据的操作

[TOC]

历史上，JavaScript 无法处理二进制数据。如果一定要处理的话，只能使用 `charCodeAt()` 方法，一个个字节地从文字编码转成二进制数据，还有一种办法是将二进制数据转成 Base64 编码，再进行处理。这两种方法不仅速度慢，而且容易出错。ECMAScript 5 引入了 `Blob` 对象，允许直接操作二进制数据。

`Blob` 对象是一个代表二进制数据的基本对象，在它的基础上，又衍生出一系列相关的 API，用来操作文件。

- `File` 对象：负责处理那些以文件形式存在的二进制数据，也就是操作本地文件；
- `FileList` 对象：`File` 对象的网页表单接口；
- `FileReader` 对象：负责将二进制数据读入内存内容；
- `URL` 对象：用于对二进制数据生成 `URL`。

## 1.`ArrayBuffer`

与其他语言相比，JavaScript 中的二进制数据是以非标准方式实现的。

基本的二进制对象是 `ArrayBuffer` —— 对固定长度的连续内存空间的引用。

```js
let buffer = new ArrayBuffer(16); // 创建一个长度为 16 的 buffer
alert(buffer.byteLength); // 16
```

它会分配一个 16 字节的连续内存空间，并用 0 进行预填充。

> *ArrayBuffer 不是某种东西的数组*
> ArrayBuffer 与 Array 没有任何共同之处：
> 它的长度是固定的，我们无法增加或减少它的长度。
> 它正好占用了内存中的那么多空间。
> 要访问单个字节，需要另一个“视图”对象，而不是 `buffer[index]`。

`ArrayBuffer` 是一个内存区域。它里面存储了什么？无从判断。只是一个原始的字节序列。

如要操作 `ArrayBuffer`，我们需要使用“视图”对象。

```js
let buffer = new ArrayBuffer(16); // 创建一个长度为 16 的 buffer

let view = new Uint32Array(buffer); // 将 buffer 视为一个 32 位整数的序列

alert(Uint32Array.BYTES_PER_ELEMENT); // 每个整数 4 个字节

alert(view.length); // 4，它存储了 4 个整数
alert(view.byteLength); // 16，字节中的大小

// 让我们写入一个值
view[0] = 123456;

// 遍历值
for(let num of view) {
  alert(num); // 123456，然后 0，0，0（一共 4 个值）
}
```

视图对象本身并不存储任何东西。它是一副“眼镜”，透过它来解释存储在 `ArrayBuffer` 中的字节。

例如：

- `Uint8Array` —— 将 ArrayBuffer 中的每个字节视为 0 到 255 之间的单个数字（每个字节是 8 位，因此只能容纳那么多）。这称为 “8 位无符号整数”。
- `Uint16Array` —— 将每 2 个字节视为一个 `0` 到 `65535` 之间的整数。这称为 “16 位无符号整数”。
- `Uint32Array` —— 将每 4 个字节视为一个 `0` 到 `4294967295` 之间的整数。这称为 “32 位无符号整数”。
- `Float64Array` —— 将每 8 个字节视为一个 `5.0x10-324` 到 `1.8x10308` 之间的浮点数。

因此，一个 16 字节 `ArrayBuffer` 中的二进制数据可以解释为 16 个“小数字”，或 8 个更大的数字（每个数字 2 个字节），或 4 个更大的数字（每个数字 4 个字节），或 2 个高精度的浮点数（每个数字 8 个字节）。

![https://zh.javascript.info//article/arraybuffer-binary-arrays/arraybuffer-views.svg](https://zh.javascript.info//article/arraybuffer-binary-arrays/arraybuffer-views.svg)

### 1.1.`TypedArray`

所有这些视图（`Uint8Array`，`Uint32Array` 等）的通用术语是 `TypedArray`。它们都享有同一组方法和属性。

> 注意，没有名为 `TypedArray` 的构造器，它只是表示 `ArrayBuffer` 上的视图之一的通用总称术语：`Int8Array`，`Uint8Array` 及其他。

当看到 `new TypedArray` 之类的内容时，它表示 `new Int8Array`、`new Uint8Array` 及其他中之一。

**类型化数组** 的行为类似于常规数组：具有索引，并且是可迭代的。

一个类型化数组的构造器（无论是 `Int8Array` 或 `Float64Array`，都无关紧要），其行为各不相同，并且取决于参数类型。

参数有 5 种变体：

```js
new TypedArray(buffer, [byteOffset], [length]);
new TypedArray(object);
new TypedArray(typedArray);
new TypedArray(length);
new TypedArray();
```

1).如果给定的是 `ArrayBuffer` 参数，则会在其上创建视图。

可选，可以给定起始位置 `byteOffset`（默认为 0）以及 `length`（默认至 `buffer` 的末尾），这样视图将仅涵盖 `buffer` 的一部分。

2).如果给定的是 `Array`，或任何类数组对象，则会创建一个相同长度的类型化数组，并复制其内容。

可以使用它来预填充数组的数据：

```js
let arr = new Uint8Array([0, 1, 2, 3]);
alert( arr.length ); // 4，创建了相同长度的二进制数组
alert( arr[1] ); // 1，用给定值填充了 4 个字节（无符号 8 位整数）
```

3).如果给定的是另一个 `TypedArray`，也是如此：创建一个相同长度的类型化数组，并复制其内容。如果需要的话，数据在此过程中会被转换为新的类型。

```js
let arr16 = new Uint16Array([1, 1000]);
let arr8 = new Uint8Array(arr16);
alert( arr8[0] ); // 1
alert( arr8[1] ); // 232，试图复制 1000，但无法将 1000 放进 8 位字节中。
```

4).对于数字参数 `length` —— 创建类型化数组以包含这么多元素。它的字节长度将是 `length` 乘以单个 `TypedArray.BYTES_PER_ELEMENT` 中的字节数：

```js
let arr = new Uint16Array(4); // 为 4 个整数创建类型化数组
alert( Uint16Array.BYTES_PER_ELEMENT ); // 每个整数 2 个字节
alert( arr.byteLength ); // 8（字节中的大小）
```

5).不带参数的情况下，创建长度为零的类型化数组。

可以直接创建一个 `TypedArray`，而无需提及 `ArrayBuffer`。但是，视图离不开底层的 `ArrayBuffer`，因此，除第一种情况（已提供 `ArrayBuffer`）外，其他所有情况都会自动创建 `ArrayBuffer`。

如要访问 ArrayBuffer，可以用以下属性：

- `arr.buffer` —— 引用 `ArrayBuffer`。
- `arr.byteLength` —— `ArrayBuffer` 的长度。

因此，总是可以从一个视图转到另一个视图：

```js
let arr8 = new Uint8Array([0, 1, 2, 3]);

// 同一数据的另一个视图
let arr16 = new Uint16Array(arr8.buffer);
```

下面是类型化数组的列表：

- `Uint8Array`，`Uint16Array`，`Uint32Array` —— 用于 8、16 和 32 位的整数。
  - `Uint8ClampedArray` —— 用于 8 位整数，在赋值时便“固定“其值。
>
- `Int8Array`，`Int16Array`，`Int32Array` —— 用于有符号整数（可以为负数）。
- `Float32Array`，`Float64Array` —— 用于 32 位和 64 位的有符号浮点数。

> 没有 `int8` 或类似的单值类型
> 请注意，尽管有类似 `Int8Array` 这样的名称，但 JavaScript 中并没有像 `int`，或 `int8` 这样的单值类型。
> 这是合乎逻辑的，因为 `Int8Array` 不是这些单值的数组，而是 `ArrayBuffer` 上的视图。

## 2.`Blob` 对象

**Blob**（Binary Large Object）对象代表了一段二进制数据，提供了一系列操作接口。其他操作二进制数据的 API（比如 `File` 对象），都是建立在 `Blob` 对象基础上的，继承了它的属性和方法。

生成 `Blob` 对象有两种方法：一种是使用 `Blob` 构造函数，另一种是对现有的 `Blob` 对象使用 `slice` 方法切出一部分。

（1）`Blob` 构造函数，接受两个参数。第一个参数是一个包含实际数据的数组，第二个参数是数据的类型，这两个参数都不是必需的。

```js
var htmlParts = ['<a id="a"><b id="b">hey!</b></a>'];
var myBlob = new Blob(htmlParts, { type: "text/xml" });
```

下面是一个利用 `Blob` 对象，生成可下载文件的例子。

```js
var blob = new Blob(["Hello World"]);

var a = document.createElement("a");
a.href = window.URL.createObjectURL(blob);
a.download = "hello-world.txt";
a.textContent = "Download Hello World!";

body.appendChild(a);
```

上面的代码生成了一个超级链接，点击后提示下载文本文件 `hello-world.txt`，文件内容为 “Hello World”。

（2）`Blob` 对象的 `slice` 方法，将二进制数据按照字节分块，返回一个新的 `Blob` 对象。

`var newBlob = oldBlob.slice(startingByte, endindByte);`

下面是一个使用 `XMLHttpRequest` 对象，将大文件分割上传的例子。

```js
function upload(blobOrFile) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/server', true);
  xhr.onload = function(e) { ... };
  xhr.send(blobOrFile);
}

document.querySelector('input[type="file"]').addEventListener('change', function(e) {
  var blob = this.files[0];

  const BYTES_PER_CHUNK = 1024 * 1024; // 1MB chunk sizes.
  const SIZE = blob.size;

  var start = 0;
  var end = BYTES_PER_CHUNK;

  while(start < SIZE) {
    upload(blob.slice(start, end));

    start = end;
    end = start + BYTES_PER_CHUNK;
  }
}, false);

})();
```

（3）`Blob` 对象有两个只读属性：

- `size`：二进制数据的大小，单位为字节。
- `type`：二进制数据的 MIME 类型，全部为小写，如果类型未知，则该值为空字符串。

在 Ajax 操作中，如果 `xhr.responseType` 设为 `blob`，接收的就是二进制数据。

## 3.`TextDecoder` 和 `TextEncoder`

## 4.`FileList` 对象

`FileList` 对象针对表单的 `file` 控件。当用户通过 `file` 控件选取文件后，这个控件的 `files` 属性值就是 `FileList` 对象。它在结构上类似于数组，包含用户选取的多个文件。

`<input type="file" id="input" onchange="console.log(this.files.length)" multiple />`

当用户选取文件后，就可以读取该文件。

`var selected_file = document.getElementById('input').files[0];`

采用拖放方式，也可以得到 `FileList` 对象。

```js
var dropZone = document.getElementById("drop_zone");
dropZone.addEventListener("drop", handleFileSelect, false);

function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files; // FileList object.

  // ...
}
```

上面代码的 `handleFileSelect` 是拖放事件的回调函数，它的参数 `evt` 是一个事件对象，该参数的 `dataTransfer.files` 属性就是一个 `FileList` 对象，里面包含了拖放的文件。

## 5.File API

File API 提供 `File` 对象，它是 `FileList` 对象的成员，包含了文件的一些元信息，比如文件名、上次改动时间、文件大小和文件类型。

```js
var selected_file = document.getElementById("input").files[0];

var fileName = selected_file.name;
var fileSize = selected_file.size;
var fileType = selected_file.type;
```

`File` 对象的属性值如下。

- `name`：文件名，该属性只读。
- `size`：文件大小，单位为字节，该属性只读。
- `type`：文件的 MIME 类型，如果分辨不出类型，则为空字符串，该属性只读。
- `lastModified`：文件的上次修改时间，格式为时间戳。
- `lastModifiedDate`：文件的上次修改时间，格式为 `Date` 对象实例。

```js
$("#upload-file")[0].files[0];
// {
//   lastModified: 1449370355682,
//   lastModifiedDate: Sun Dec 06 2015 10:52:35 GMT+0800 (CST),
//   name: "HTTP 2 is here Goodbye SPDY Not quite yet.png",
//   size: 17044,
//   type: "image/png"
// }
```

## 6.FileReader API

FileReader API 用于读取文件，即把文件内容读入内存。它的参数是 `File` 对象或 `Blob` 对象。

对于不同类型的文件，FileReader 提供不同的方法读取文件。

- `readAsBinaryString(Blob|File)`：返回二进制字符串，该字符串每个字节包含一个 0 到 255 之间的整数。
- `readAsText(Blob|File, opt_encoding)`：返回文本字符串。默认情况下，文本编码格式是 ’UTF-8’，可以通过可选的格式参数，指定其他编码格式的文本。
- `readAsDataURL(Blob|File)`：返回一个基于 `Base64` 编码的 `data-uri` 对象。
- `readAsArrayBuffer(Blob|File)`：返回一个 `ArrayBuffer` 对象。

`readAsText` 方法用于读取文本文件，它的第一个参数是 `File` 或 `Blob` 对象，第二个参数是前一个参数的编码方法，如果省略就默认为 `UTF-8` 编码。该方法是异步方法，一般监听 `onload` 件，用来确定文件是否加载结束，方法是判断 `FileReader` 实例的 `result` 属性是否有值。其他三种读取方法，用法与 `readAsText` 方法类似。

```js
var reader = new FileReader();
reader.onload = function(e) {
  var text = reader.result;
};

reader.readAsText(file, encoding);
```

`readAsDataURL` 方法返回一个 `data URL`，它的作用基本上是将文件数据进行 `Base64` 编码。你可以将返回值设为图像的 `src` 属性。

```js
var file = document.getElementById("destination").files[0];
if (file.type.indexOf("image") !== -1) {
  var reader = new FileReader();
  reader.onload = function(e) {
    var dataURL = reader.result;
  };
  reader.readAsDataURL(file);
}
```

`readAsBinaryString` 方法可以读取任意类型的文件，而不仅仅是文本文件，返回文件的原始的二进制内容。这个方法与 `XMLHttpRequest.sendAsBinary` 方法结合使用，就可以使用 JavaScript 上传任意文件到服务器。

```js
var reader = new FileReader();
reader.onload = function(e) {
  var rawData = reader.result;
};
reader.readAsBinaryString(file);
```

`readAsArrayBuffer` 方法读取文件，返回一个类型化数组（`ArrayBuffer`），即固定长度的二进制缓存数据。在文件操作时（比如将 JPEG 图像转为 PNG 图像），这个方法非常方便。

```js
var reader = new FileReader();
reader.onload = function(e) {
  var arrayBuffer = reader.result;
};

reader.readAsArrayBuffer(file);
```

除了以上四种不同的读取文件方法，FileReader API 还有一个 `abort` 方法，用于中止文件上传。

```js
var reader = new FileReader();
reader.abort();
```

`FileReader` 对象采用异步方式读取文件，可以为一系列事件指定回调函数。

- `onabort` 方法：读取中断或调用 `reader.abort()` 方法时触发。
- `onerror` 方法：读取出错时触发。
- `onload` 方法：读取成功后触发。
- `onloadend` 方法：读取完成后触发，不管是否成功。触发顺序排在 `onload` 或 `onerror` 后面。
- `onloadstart` 方法：读取将要开始时触发。
- `onprogress` 方法：读取过程中周期性触发。

下面的代码是如何展示文本文件的内容。

```js
var reader = new FileReader();
reader.onload = function(e) {
  console.log(e.target.result);
};
reader.readAsText(blob);
```

`onload` 事件的回调函数接受一个事件对象，该对象的 `target.result` 就是文件的内容。

下面是一个使用 `readAsDataURL` 方法，为 `img` 元素添加 `src` 属性的例子。

```js
var reader = new FileReader();
reader.onload = function(e) {
  document.createElement("img").src = e.target.result;
};
reader.readAsDataURL(f);
```

下面是一个 `onerror` 事件回调函数的例子。

```js
var reader = new FileReader();
reader.onerror = errorHandler;

function errorHandler(evt) {
  switch (evt.target.error.code) {
    case evt.target.error.NOT_FOUND_ERR:
      alert("File Not Found!");
      break;
    case evt.target.error.NOT_READABLE_ERR:
      alert("File is not readable");
      break;
    case evt.target.error.ABORT_ERR:
      break;
    default:
      alert("An error occurred reading this file.");
  }
}
```

下面是一个 `onprogress` 事件回调函数的例子，主要用来显示读取进度。

```js
var reader = new FileReader();
reader.onprogress = updateProgress;
function updateProgress(evt) {
  if (evt.lengthComputable) {
    var percentLoaded = Math.round((evt.loaded / evt.totalEric Bidelman) * 100);
    var progress = document.querySelector('.percent');
    if (percentLoaded < 100) {
      progress.style.width = percentLoaded + '%';
      progress.textContent = percentLoaded + '%';
    }
  }
}
```

读取大文件的时候，可以利用 `Blob` 对象的 `slice` 方法，将大文件分成小段，逐一读取，这样可以加快处理速度。

## 7.综合实例：显示用户选取的本地图片

假设有一个表单，用于用户选取图片。

`<input type="file" name="picture" accept="image/png, image/jpeg"/>`

一旦用户选中图片，将其显示在 `canvas` 的函数可以这样写：

```js
document.querySelector("input[name=picture]").onchange = function(e) {
  readFile(e.target.files[0]);
};

function readFile(file) {
  var reader = new FileReader();
  reader.onload = function(e) {
    applyDataUrlToCanvas(reader.result);
  };
  reader.readAsDataURL(file);
}
```

还可以在 `canvas` 上面定义拖放事件，允许用户直接拖放图片到上面。

```js
// stop FireFox from replacing the whole page with the file.
canvas.ondragover = function() {
  return false;
};

// Add drop handler
canvas.ondrop = function(e) {
  e.stopPropagation();
  e.preventDefault();
  e = e || window.event;
  var files = e.dataTransfer.files;
  if (files) {
    readFile(files[0]);
  }
};
```

所有的拖放事件都有一个 `dataTransfer` 属性，它包含拖放过程涉及的二进制数据。

还可以让 `canvas` 显示剪贴板中的图片。

```js
document.onpaste = function(e) {
  e.preventDefault();
  if (e.clipboardData && e.clipboardData.items) {
    // pasted image
    for (var i = 0, items = e.clipboardData.items; i < items.length; i++) {
      if (items[i].kind === "file" && items[i].type.match(/^image/)) {
        readFile(items[i].getAsFile());
        break;
      }
    }
  }
  return false;
};
```

## 8.URL 对象

`URL` 对象用于生成指向 `File` 对象或 `Blob` 对象的 `URL`。

`var objecturl = window.URL.createObjectURL(blob);`

上面的代码会对二进制数据生成一个 `URL`，类似于 `“blob:http%3A//test.com/666e6730-f45c-47c1-8012-ccc706f17191”`。这个 `URL` 可以放置于任何通常可以放置 `URL` 的地方，比如 `img` 标签的 `src` 属性。需要注意的是，即使是同样的二进制数据，每调用一次 `URL.createObjectURL` 方法，就会得到一个不一样的 `URL`。

这个 `URL` 的存在时间，等同于网页的存在时间，一旦网页刷新或卸载，这个 `URL` 就失效。除此之外，也可以手动调用 `URL.revokeObjectURL` 方法，使 `URL` 失效。

`window.URL.revokeObjectURL(objectURL);`

下面是一个利用 `URL` 对象，在网页插入图片的例子。

```js
var img = document.createElement("img");
img.src = window.URL.createObjectURL(files[0]);
img.height = 60;
img.onload = function(e) {
  window.URL.revokeObjectURL(this.src);
};

body.appendChild(img);
var info = document.createElement("span");
info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
document.querySelector("body").appendChild(info);
```

还有一个本机视频预览的例子。

```js
var video = document.getElementById("video");
var obj_url = window.URL.createObjectURL(blob);
video.src = obj_url;
video.play();
window.URL.revokeObjectURL(obj_url);
```
