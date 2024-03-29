# AJAX

AJAX (Async Javascript and XML)。浏览器与服务器之间，采用 HTTP 协议通信。用户在浏览器地址栏键入一个网址，或者通过网页表单向服务器提交内容，这时浏览器就会向服务器发出 HTTP 请求。

1999 年，微软公司发布 IE 浏览器 5.0 版，第一次引入新功能：允许 JavaScript 脚本向服务器发起 HTTP 请求。这个功能当时并没有引起注意，直到 2004 年 Gmail 发布和 2005 年 Google Map 发布，才引起广泛重视。2005 年 2 月，AJAX 这个词第一次正式提出，指围绕这个功能进行开发的一整套做法。从此，AJAX 成为脚本发起 HTTP 通信的代名词，W3C 也在 2006 年发布了它的国际标准。

具体来说，AJAX 包括以下几个步骤。

1. 创建 AJAX 对象
2. 发出 HTTP 请求
3. 接收服务器传回的数据
4. 更新网页数据

概括起来，就是一句话，AJAX 通过原生的 `XMLHttpRequest` 对象发出 HTTP 请求，得到服务器返回的数据后，再进行处理。

> AJAX 可以是同步请求，也可以是异步请求。但是，大多数情况下，特指异步请求。因为同步的 Ajax 请求，对浏览器有“堵塞效应”。

## 1.`XMLHttpRequest` 对象

`XMLHttpRequest` 对象用来在浏览器与服务器之间传送数据。

```js
// 1. 创建一个 ajax 的异步对象
let xhr = new XMLHttpRequest();

// 2. 配置 ajax 参数
xhr.open(meth, url, sync / async, [user.name, [user.password]]);

/*
 * 第一个参数
 * meth: 请求方式"get/post"
 *   get 系列：
 *     get : 一般是用来获取数据的
 *     delete : 一般用来从服务器删除某些资源
 *     head : 一般用来获取响应头，获取不到响应主体
 *   post 系列：
 *     post : 一般都是客户端向服务器发送大量数据，比如表单提交、登录注册
 *     put : 一般用来将资源存放到服务器上
 *
 * 第二个参数
 * url: 请求地址（API）
 *
 * 第三个参数
 * sync/async: 是否异步（默认 true）
 *
 * user.name,user.password
 * 用来限制用户访问某些服务器，一般不设置，
 * 只在特殊需要时，才设置，并且访问时需要账户和密码才能访问服务器
*/
```

然后，AJAX 指定回调函数，监听通信状态（`readyState` 属性）的变化。

`ajax.onreadystatechange = handleStateChange;`

一旦拿到服务器返回的数据，AJAX 不会刷新整个网页，而是只更新相关部分，从而不打断用户正在做的事情。

注意，AJAX 只能向同源网址（协议、域名、端口都相同）发出 HTTP 请求，如果发出跨源请求，就会报错。

虽然名字里面有 XML，但是实际上，`XMLHttpRequest` 可以报送各种数据，包括字符串和二进制，而且除了 HTTP，它还支持通过其他协议传送（比如 File 和 FTP）。

下面是 `XMLHttpRequest` 对象的典型用法。

```js
var xhr = new XMLHttpRequest();

// 指定通信过程中状态改变时的回调函数
xhr.onreadystatechange = function(){
  // 通信成功时，状态值为 4
  if (xhr.readyState === 4){
    if (xhr.status === 200){
      console.log(xhr.responseText);
    } else {
      console.error(xhr.statusText);
    }
  }
};

xhr.onerror = function (e) {
  console.error(xhr.statusText);
};

// open 方式用于指定 HTTP 动词、请求的网址、是否异步
xhr.open('GET', '/endpoint', true);

// 服务器与客户端交互的返回方式：
// 响应头 (Response Header)：
xhr.getResponseHeader("请求数据名");  // 获取响应头
xhr.getAllResponseHeaders();  // 获取响应头全部信息

// 响应主体：
xhr.responseText;

//客户端发送请求的多种方式：
// 请求头：
xhr.setRequestHeader();  // 设置请求头信息（一般是设置请求数据类型）
xhr.timeout;
// 设置请求的超时时间，超过规定时间没有获得响应，
// 请求失败，同时触发 ontimeout 事件（由超时行为触发），并且报错，

// 请求主体：
// URL 拼接查询参数：
// 发送 HTTP 请求
xhr.send(null);
```

## 2.`XMLHttpRequest` 实例的属性

### 2.1.`readyState`

`readyState` 是一个只读属性，用一个整数和对应的常量，表示 `XMLHttpRequest` 请求当前所处的状态。

- `0`：对应常量 `UNSENT`，表示 `XMLHttpRequest` 实例已经生成，但是 `open` 方法还没有被调用。
- `1`：对应常量 `OPENED`，表示 `send` 方法还没有被调用，`open` 执行后的状态，仍然可以使用 `setRequestHeader`，设定 HTTP 请求的头信息。
- `2`：对应常量 `HEADERS_RECEIVED`，表示 `send` 方法已经执行，并且头信息和状态码已经收到。
- `3`：对应常量 `LOADING`，表示正在接收服务器传来的 body 部分的数据，如果 `responseType` 属性是 `text` 或者空字符串，`responseText` 就会包含已经收到的部分信息。
- `4`：对应常量 `DONE`，表示服务器数据已经完全接收，或者本次接收已经失败了。

在通信过程中，每当发生状态变化的时候，`readyState` 属性的值就会发生改变。这个值每一次变化，都会触发 `readyStateChange` 事件。

```js
if (ajax.readyState == 4) {
  // Handle the response.
} else {
  // Show the 'Loading...' message or do nothing.
}
```

上面代码表示，只有 `readyState` 变为 4 时，才算确认请求已经成功，其他值都表示请求还在进行中。

### 2.2.`onreadystatechange`

`onreadystatechange` 属性指向一个回调函数，当 `readystatechange` 事件发生的时候，这个回调函数就会调用，并且 `XMLHttpRequest` 实例的 `readyState` 属性也会发生变化。

另外，如果使用 `abort` 方法，终止 `XMLHttpRequest` 请求，`onreadystatechange` 回调函数也会被调用。

```js
var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "http://example.com", true);

xmlhttp.onreadystatechange = function() {
  if (XMLHttpRequest.DONE != xmlhttp.readyState) {
    return;
  }
  if (200 != xmlhttp.status) {
    return;
  }
  console.log(xmlhttp.responseText);
};

xmlhttp.send();
```

### 2.3.`response`

`response` 属性为只读，返回接收到的数据体（即 `body` 部分）。它的类型可以是 `ArrayBuffer`、`Blob`、`Document`、`JSON` 对象、或者一个字符串，这由 `XMLHttpRequest.responseType` 属性的值决定。

如果本次请求没有成功或者数据不完整，该属性就会等于 `null`。

### 2.4.`responseType`

`responseType` 属性用来指定服务器返回数据（`xhr.response`）的类型。

```js
- ”“：字符串（默认值）
- “`arraybuffer`”：`ArrayBuffer` 对象
- “`blob`”：`Blob` 对象
- “`document`”：`Document` 对象
- “`json`”：`JSON` 对象
- “`text`”：字符串
```

`text` 类型适合大多数情况，而且直接处理文本也比较方便，`document` 类型适合返回 XML 文档的情况，`blob` 类型适合读取二进制数据，比如图片文件。

```js
var xhr = new XMLHttpRequest();
xhr.open("GET", "/path/to/image.png", true);
xhr.responseType = "blob";

xhr.onload = function(e) {
  if (this.status == 200) {
    var blob = new Blob([this.response], { type: "image/png" });

    // 或者
    var blob = oReq.response;
  }
};

xhr.send();
```

如果将这个属性设为 `ArrayBuffer`，就可以按照数组的方式处理二进制数据。

```js
var xhr = new XMLHttpRequest();
xhr.open("GET", "/path/to/image.png", true);
xhr.responseType = "arraybuffer";

xhr.onload = function(e) {
  var uInt8Array = new Uint8Array(this.response);
  for (var i = 0, len = binStr.length; i < len; ++i) {
    // var byte = uInt8Array[i];
  }
};

xhr.send();
```

如果将这个属性设为“`json`”，支持 JSON 的浏览器（Firefox>9，chrome>30），就会自动对返回数据调用 `JSON.parse` 方法。也就是说，你从 `xhr.response` 属性（注意，不是 `xhr.responseText` 属性）得到的不是文本，而是一个 JSON 对象。

XHR2 支持 Ajax 的返回类型为文档，即 `xhr.responseType=”document”`。这意味着，对于那些打开 CORS 的网站，我们可以直接用 Ajax 抓取网页，然后不用解析 HTML 字符串，直接对 XHR 回应进行 DOM 操作。

### 2.5.`responseText`

`responseText` 属性返回从服务器接收到的字符串，该属性为只读。如果本次请求没有成功或者数据不完整，该属性就会等于 `null`。

如果服务器返回的数据格式是 JSON，就可以使用 `responseText` 属性。

```js
var data = ajax.responseText;
data = JSON.parse(data);
```

### 2.6.`responseXML`

`responseXML` 属性返回从服务器接收到的 `Document` 对象，该属性为只读。如果本次请求没有成功，或者数据不完整，或者不能被解析为 XML 或 HTML，该属性等于 `null`。

返回的数据会被直接解析为 DOM 对象。

```js
/* 返回的 XML 文件如下
 * <?xml version="1.0" encoding="utf-8" standalone="yes" ?>
 * <book>
 *     <chapter id="1">(Re-)Introducing JavaScript</chapter>
 *     <chapter id="2">JavaScript in Action</chapter>
 * </book>
*/

var data = ajax.responseXML;
var chapters = data.getElementsByTagName("chapter");
```

如果服务器返回的数据，没有明示 `Content-Type` 头信息等于 `text/xml`，可以使用 `overrideMimeType` 方法，指定 `XMLHttpRequest` 对象将返回的数据解析为 XML。

### 2.7.`status`

`status` 属性为只读属性，表示本次请求所得到的 HTTP 状态码，它是一个整数。一般来说，如果通信成功的话，这个状态码是 200。

- 200：OK，访问正常
- 301：Moved Permanently，永久移动/永久重定向
- 302：Move temporarily，暂时移动/临时重定向或临时转义（服务器的负载均衡）
- 304：Not Modified，未修改/读取缓存（多次进行同一请求，改走缓存，以减轻服务器的访问压力）
- 307：Temporary Redirect，暂时重定向
- 400：请求参数错误
- 401：Unauthorized，未授权/权限错误
- 403：Forbidden，禁止访问
- 404：Not Found，未发现指定网址/请求地址不存在
- 500：Internal Server Error，服务器发生错误
- 503：服务器崩溃/超负荷

> 基本上，只有 2xx 和 304 的状态码，表示服务器返回是正常状态。

```js
if (ajax.readyState == 4) {
  if ((ajax.status >= 200 && ajax.status < 300) || ajax.status == 304) {
    // Handle the response.
  } else {
    // Status error!
  }
}
```

### 2.8.`statusText`

`statusText` 属性为只读属性，返回一个字符串，表示服务器发送的状态提示。不同于 `status` 属性，该属性包含整个状态信息，比如”200 OK“。

### 2.9.`timeout`

`timeout` 属性等于一个整数，表示多少毫秒后，如果请求仍然没有得到结果，就会自动终止。如果该属性等于 0，就表示没有时间限制。

```js
  var xhr = new XMLHttpRequest();

  xhr.ontimeout = function () {
    console.error("The request for " + url + " timed out.");
  };

  xhr.onload = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback.apply(xhr, args);
      } else {
        console.error(xhr.statusText);
      }
    }
  };

  xhr.open("GET", url, true);
  xhr.timeout = timeout;
  xhr.send(null);
```

### 2.10.事件监听接口

`XMLHttpRequest` 第一版，只能对 `onreadystatechange` 这一个事件指定回调函数。该事件对所有情况作出响应。 `XMLHttpRequest` 第二版允许对更多的事件指定回调函数。

- `onloadstart` 请求发出
- `onprogress` 正在发送和加载数据
- `onabort` 请求被中止，比如用户调用了 `abort` 方法
- `onerror` 请求失败
- `onload` 请求成功完成
- `ontimeout` 用户指定的时限到期，请求还未完成
- `onloadend` 请求完成，不管成果或失败

```js
xhr.onload = function() {
  var responseText = xhr.responseText;
  console.log(responseText);
  // process the response.
};

xhr.onerror = function() {
  console.log("There was an error!");
};
```

> 注意，如果发生网络错误（比如服务器无法连通），`onerror` 事件无法获取报错信息，所以只能显示报错。

### 2.11.`withCredentials`

`withCredentials` 属性是一个布尔值，表示跨域请求时，用户信息（比如 `Cookie` 和认证的 HTTP 头信息）是否会包含在请求之中，默认为 `false`。即向 `example.com` 发出跨域请求时，不会发送 `example.com` 设置在本机上的 `Cookie`（如果有的话）。

如果你需要通过跨域 AJAX 发送 `Cookie`，需要打开 `withCredentials`。

```js
xhr.withCredentials = true;
```

为了让这个属性生效，服务器必须显式返回 `Access-Control-Allow-Credentials` 这个头信息。

```sh
Access-Control-Allow-Credentials: true
```

`.withCredentials` 属性打开的话，不仅会发送 `Cookie`，还会设置远程主机指定的 `Cookie`。注意，此时你的脚本还是遵守同源政策，无法 从 `document.cookie` 或者 HTTP 回应的头信息之中，读取这些 `Cookie`。

## 3.`XMLHttpRequest` 实例的方法

### 3.1.`abort`

`abort` 方法用来终止已经发出的 HTTP 请求。

```js
ajax.open("GET", "http://www.example.com/page.php", true);

var ajaxAbortTimer = setTimeout(function() {
  if (ajax) {
    ajax.abort();
    ajax = null;
  }
}, 5000);
```

上面代码在发出 5 秒之后，终止一个 AJAX 请求。

### 3.2.`getAllResponseHeaders`

`getAllResponseHeaders` 方法返回服务器发来的所有 HTTP 头信息。格式为字符串，每个头信息之间使用 CRLF 分隔，如果没有受到服务器回应，该属性返回 `null`。

### 3.3.`getResponseHeader`

`getResponseHeader` 方法返回 HTTP 头信息指定字段的值，如果还没有收到服务器回应或者指定字段不存在，则该属性为 `null`。

```js
function getHeaderTime() {
  console.log(this.getResponseHeader("Last-Modified"));
}

var oReq = new XMLHttpRequest();
oReq.open("HEAD", "yourpage.html");
oReq.onload = getHeaderTime;
oReq.send();
```

如果有多个字段同名，则它们的值会被连接为一个字符串，每个字段之间使用“逗号+空格”分隔。

### 3.4.`open`

`XMLHttpRequest` 对象的 `open` 方法用于指定发送 HTTP 请求的参数，它的使用格式如下，一共可以接受五个参数。

```js
void open(
   string method,
   string url,
   optional boolean async,
   optional string user,
   optional string password
);
```

- `method`：表示 HTTP 动词，比如“`GET`”、“`POST`”、“`PUT`”和“`DELETE`”。
- `url`: 表示请求发送的网址。
- `async`: 格式为布尔值，默认为 `true`，表示请求是否为异步。如果设为 `false`，则 `send` 方法只有等到收到服务器返回的结果，才会有返回值。
- `user`：表示用于认证的用户名，默认为空字符串。
- `password`：表示用于认证的密码，默认为空字符串。

> 如果对使用过 `open` 方法的请求，再次使用这个方法，等同于调用 `abort`。

下面发送 `POST`` 请求的例子。

```js
xhr.open("POST", encodeURI("someURL"));
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.onload = function() {};
xhr.send(encodeURI("dataString"));
```

上面方法中，`open` 方法向指定 URL 发出 `POST` 请求，`send` 方法送出实际的数据。

下面是一个同步 AJAX 请求的例子。

```js
var request = new XMLHttpRequest();
request.open("GET", "/bar/foo.txt", false);
request.send(null);
if (request.status === 200) {
  console.log(request.responseText);
}
```

### 3.5.`send`

`send` 方法用于实际发出 HTTP 请求。如果不带参数，就表示 HTTP 请求只包含头信息，也就是只有一个 URL，典型例子就是 `GET` 请求；如果带有参数，就表示除了头信息，还带有包含具体数据的信息体，典型例子就是 `POST` 请求。

```js
ajax.open('GET'
  , 'http://www.example.com/somepage.php?id=' + encodeURIComponent(id)
  , true
);

// 等同于
var data = 'id=' + encodeURIComponent(id));
ajax.open('GET', 'http://www.example.com/somepage.php', true);
ajax.send(data);
```

上面代码中，`GET` 请求的参数，可以作为查询字符串附加在 URL 后面，也可以作为 `send` 方法的参数。

下面是发送 `POST` 请求的例子。

```js
var data =
  "email=" +
  encodeURIComponent(email) +
  "&password=" +
  encodeURIComponent(password);
ajax.open("POST", "http://www.example.com/somepage.php", true);
ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
ajax.send(data);
```

如果请求是异步的（默认为异步），该方法在发出请求后会立即返回。如果请求为同步，该方法只有等到收到服务器回应后，才会返回。

注意，所有 `XMLHttpRequest` 的监听事件，都必须在 `send` 方法调用之前设定。

`send` 方法的参数就是发送的数据。多种格式的数据，都可以作为它的参数。

```js
void send();
void send(ArrayBufferView data);
void send(Blob data);
void send(Document data);
void send(String data);
void send(FormData data);
```

如果发送 `Document` 数据，在发送之前，数据会先被串行化。

发送二进制数据，最好使用 `ArrayBufferView` 或 `Blob` 对象，这使得通过 Ajax 上传文件成为可能。

下面是一个上传 `ArrayBuffer` 对象的例子。

```js
function sendArrayBuffer() {
  var xhr = new XMLHttpRequest();
  var uInt8Array = new Uint8Array([1, 2, 3]);
  xhr.open('POST', '/server', true);
  xhr.onload = function(e) { ... };
  xhr.send(uInt8Array.buffer);
}
```

`FormData` 类型可以用于构造表单数据。

```js
var formData = new FormData();
formData.append("username", "张三");
formData.append("email", "zhangsan@example.com");
formData.append("birthDate", 1940);
var xhr = new XMLHttpRequest();
xhr.open("POST", "/register");
xhr.send(formData);
```

上面的代码构造了一个 `formData` 对象，然后使用 `send` 方法发送。它的效果与点击下面表单的 `submit` 按钮是一样的。

```html
<form id='registration' name='registration' action='/register'>
  <input type='text' name='username' value='张三'>
  <input type='email' name='email' value='zhangsan@example.com'>
  <input type='number' name='birthDate' value='1940'>
  <input type='submit' onclick='return sendForm(this.form);'>
</form>
```

`FormData` 也可以将现有表单构造生成。

```js
var formElement = document.querySelector("form");
var request = new XMLHttpRequest();
request.open("POST", "submitform.php");
request.send(new FormData(formElement));
```

`FormData` 对象还可以对现有表单添加数据，这为我们操作表单提供了极大的灵活性。

```js
function sendForm(form) {
  var formData = new FormData(form);
  formData.append("csrf", "e69a18d7db1286040586e6da1950128c");
  var xhr = new XMLHttpRequest();
  xhr.open("POST", form.action, true);

  xhr.onload = function(e) {
    // ...
  };

  xhr.send(formData);
  return false;
}

var form = document.querySelector("#registration");
sendForm(form);
```

`FormData` 对象也能用来模拟 `File` 控件，进行文件上传。

```js
function uploadFiles(url, files) {
  var formData = new FormData();
  for (var i = 0, file; file = files[i]; ++i) {
    formData.append(file.name, file);
    // 可加入第三个参数，表示文件名
  }
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);

  xhr.onload = function(e) {
    // ...
   };

  xhr.send(formData);  // multipart/form-data
}

document.querySelector('input[type="file"]').addEventListener('change', function(e) {
  uploadFiles('/server', this.files);
}, false);
```

`FormData` 也可以加入 JavaScript 生成的文件。

```js
// 添加 JavaScript 生成的文件
var content = '<a id="a"><b id="b">hey!</b></a>';
var blob = new Blob([content], { type: "text/xml" });
formData.append("webmasterfile", blob);
```

### 3.6.`setRequestHeader`

`setRequestHeader` 方法用于设置 HTTP 头信息。该方法必须在 `open` 之后、`send` 之前调用。如果该方法多次调用，设定同一个字段，则每一次调用的值会被合并成一个单一的值发送。

```js
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Content-Length", JSON.stringify(data).length);
xhr.send(JSON.stringify(data));
```

上面代码首先设置头信息 `Content-Type`，表示发送 JSON 格式的数据；然后设置 `Content-Length`，表示数据长度；最后发送 JSON 数据。

### 3.7.`overrideMimeType`

该方法用来指定服务器返回数据的 MIME 类型。该方法必须在 `send` 之前调用。

传统上，如果希望从服务器取回二进制数据，就要使用这个方法，人为将数据类型伪装成文本数据。

```js
var xhr = new XMLHttpRequest();
xhr.open("GET", "/path/to/image.png", true);

// 强制将 MIME 改为文本类型
xhr.overrideMimeType("text/plain; charset=x-user-defined");

xhr.onreadystatechange = function(e) {
  if (this.readyState == 4 && this.status == 200) {
    var binStr = this.responseText;
    for (var i = 0, len = binStr.length; i < len; ++i) {
      var c = binStr.charCodeAt(i);

      // 去除高位字节，留下低位字节
      var byte = c & 0xff;
    }
  }
};

xhr.send();
```

上面代码中，因为传回来的是二进制数据，首先用 `xhr.overrideMimeType` 方法强制改变它的 MIME 类型，伪装成文本数据。字符集必需指定为 “`x-user-defined`”，如果是其他字符集，浏览器内部会强制转码，将其保存成 UTF-16 的形式。字符集 “`x-user-defined`” 其实也会发生转码，浏览器会在每个字节前面再加上一个字节（`0xF700-0xF7ff`），因此后面要对每个字符进行一次与运算（`&`），将高位的 8 个位去除，只留下低位的 8 个位，由此逐一读出原文件二进制数据的每个字节。

这种方法很麻烦，在 `XMLHttpRequest` 版本升级以后，一般采用指定 `responseType` 的方法。

```js
var xhr = new XMLHttpRequest();

xhr.onload = function(e) {
  var arraybuffer = xhr.response;
  // ...
};

xhr.open("GET", url);
xhr.responseType = "arraybuffer";
xhr.send();
```

## 4.`XMLHttpRequest` 实例的事件

### 4.1.`readyStateChange` 事件

`readyState` 属性的值发生改变，就会触发 `readyStateChange` 事件。

我们可以通过 `onReadyStateChange` 属性，指定这个事件的回调函数，对不同状态进行不同处理。尤其是当状态变为 4 的时候，表示通信成功，这时回调函数就可以处理服务器传送回来的数据。

### 4.2.`progress` 事件

上传文件时，`XMLHTTPRequest` 对象的 `upload` 属性有一个 `progress`，会不断返回上传的进度。

假定网页上有一个 `progress` 元素。

```html
<progress min="0" max="100" value="0">0% complete</progress>
```

文件上传时，对 `upload` 属性指定 `progress` 事件回调函数，即可获得上传的进度。

```js
function upload(blobOrFile) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/server', true);
  xhr.onload = function(e) { ... };

  // Listen to the upload progress.
  var progressBar = document.querySelector('progress');

  xhr.upload.onprogress = function(e) {
    if (e.lengthComputable) {
      progressBar.value = (e.loaded / e.total) * 100;
      progressBar.textContent = progressBar.value;
      // Fallback for unsupported browsers.
    }
  };

  xhr.send(blobOrFile);
}

upload(new Blob(['hello world'], {type: 'text/plain'}));
```

### 4.3.`load` 事件、`error` 事件、`abort` 事件

`load` 事件表示服务器传来的数据接收完毕，`error` 事件表示请求出错，`abort` 事件表示请求被中断。

```js
var xhr = new XMLHttpRequest();
xhr.addEventListener("progress", updateProgress);
xhr.addEventListener("load", transferComplete);
xhr.addEventListener("error", transferFailed);
xhr.addEventListener("abort", transferCanceled);
xhr.open();

function updateProgress(oEvent) {
  if (oEvent.lengthComputable) {
    var percentComplete = oEvent.loaded / oEvent.total;
    // ...
  } else {
    // 回应的总数据量未知，导致无法计算百分比
  }
}

function transferComplete(evt) {
  console.log("The transfer is complete.");
}

function transferFailed(evt) {
  console.log("An error occurred while transferring the file.");
}

function transferCanceled(evt) {
  console.log("The transfer has been canceled by the user.");
}
```

### 4.4.`loadend` 事件

`abort`、`load` 和 `error` 这三个事件，会伴随一个 `loadend` 事件，表示请求结束，但不知道其是否成功。

```js
req.addEventListener("loadend", loadEnd);

function loadEnd(e) {
  alert("请求结束（不知道是否成功）");
}
```

## 5."get"和"post"请求的区别

1). 传递参数的方式

- `get` 请求的参数放置在 URL 上，通过 "`？参数=值&参数=值`" 的形式传递，`xhr.open("get","url")`；
- `post` 请求的参数放置在请求主体中，`xhr.send('参数=值&参数=值')`

2). 参数大小限制

- 浏览器对 URL 大小有限制，超出部分会自动截取；`post` 的请求主体没有大小限制（实际操作中会有一定程度上的限制，过大的请求数据会分次请求，以保证请求速度）；

3). 安全性

- `get` 请求的参数显示在 URL 上，安全性极低；一般考虑安全性时，会使用 `post` 请求

4). 缓存

- `get` 请求的 URL 问号传参很容易走缓存，一般在 URL 后面拼接一个时间戳，来防止缓存；`post` 请求不会走缓存；

## 6.文件上传

HTML 网页的 `<form>` 元素能够以四种格式，向服务器发送数据。

1). 使用 `POST` 方法，将 `enctype` 属性设为 `application/x-www-form-urlencoded`，这是默认方法。

```html
<form
  action="register.php"
  method="post"
  onsubmit="AJAXSubmit(this); return false;"
/>
```

2). 使用 `POST` 方法，将 `enctype` 属性设为 `text/plain`。

```html
<form
  action="register.php"
  method="post"
  enctype="text/plain"
  onsubmit="AJAXSubmit(this); return false;"
/>
```

3). 使用 `POST` 方法，将 `enctype` 属性设为 `multipart/form-data`。

```html
<form
  action="register.php"
  method="post"
  enctype="multipart/form-data"
  onsubmit="AJAXSubmit(this); return false;"
/>
```

4). 使用 `GET` 方法，`enctype` 属性将被忽略。

```html
<form
  action="register.php"
  method="get"
  onsubmit="AJAXSubmit(this); return false;"
/>
```

某个表单有两个字段，分别是 `foo` 和 `baz`，其中 `foo` 字段的值等于 `bar`，`baz` 字段的值一个分为两行的字符串。上面四种方法，都可以将这个表单发送到服务器。

第一种方法是默认方法，`POST` 发送，`Encoding type` 为 `application/x-www-form-urlencoded`。

```sh
Content-Type: application/x-www-form-urlencoded
foo=bar&baz=The+first+line.&#37;0D%0AThe+second+line.%0D%0A
```

第二种方法是 `POST` 发送，`Encoding type` 为 `text/plain`。

```sh
Content-Type: text/plain
foo=bar
baz=The first line.
The second line.
```

第三种方法是 `POST` 发送，`Encoding type` 为 `multipart/form-data`。

```sh
Content-Type: multipart/form-data; boundary=---------------------------314911788813839

-----------------------------314911788813839
Content-Disposition: form-data; name="foo"

bar
-----------------------------314911788813839
Content-Disposition: form-data; name="baz"

The first line.
The second line.

-----------------------------314911788813839--
```

第四种方法是 `GET` 请求。

```sh
?foo=bar&baz=The%20first%20line.%0AThe%20second%20line.
```

通常，我们使用 `file` 控件实现文件上传。

```html
<form id="file-form" action="handler.php" method="POST">
  <input type="file" id="file-select" name="photos[]" multiple />
  <button type="submit" id="upload-button">
    上传
  </button>
</form>
```

上面 HTML 代码中，`file` 控件的 `multiple` 属性，指定可以一次选择多个文件；如果没有这个属性，则一次只能选择一个文件。

`file` 对象的 `files` 属性，返回一个 `FileList` 对象，包含了用户选中的文件。

```js
var fileSelect = document.getElementById("file-select");
var files = fileSelect.files;
```

然后，新建一个 `FormData` 对象的实例，用来模拟发送到服务器的表单数据，把选中的文件添加到这个对象上面。

```js
var formData = new FormData();

for (var i = 0; i < files.length; i++) {
  var file = files[i];
  if (!file.type.match("image.*")) {
    continue;
  }
  formData.append("photos[]", file, file.name);
}
```

上面代码中的 `FormData` 对象的 `append` 方法，除了可以添加文件，还可以添加二进制对象（`Blob`）或者字符串。

```js
// Files
formData.append(name, file, filename);

// Blobs
formData.append(name, blob, filename);

// Strings
formData.append(name, value);
```

`append` 方法的第一个参数是表单的控件名，第二个参数是实际的值，第三个参数是可选的，通常是文件名。

最后，使用 Ajax 方法向服务器上传文件。

```js
var xhr = new XMLHttpRequest();
xhr.open("POST", "handler.php", true);

xhr.onload = function() {
  if (xhr.status !== 200) {
    alert("An error occurred!");
  }
};

xhr.send(formData);
```

> 目前，各大浏览器（包括 IE 10）都支持 Ajax 上传文件。

除了使用 `FormData` 接口上传，也可以直接使用 `File API` 上传。

```js
var file = document.getElementById("test-input").files[0];
var xhr = new XMLHttpRequest();
xhr.open("POST", "myserver/uploads");
xhr.setRequestHeader("Content-Type", file.type);
xhr.send(file);
```

可以看到，上面这种写法比 `FormData` 的写法，要简单很多。
