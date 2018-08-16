### 这个 demo 主要是记录学习跨域问题

在某个实际项目中，页面的一部分，是动态的图片展示，所以使用 ajax 请求获取资源加载，而请求的资源在本地，所以在浏览器打开页面的时候，会报错：`Failed to load file:///xx..xx Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.`，这是 ajax 跨域错误。

##### 问题描述

通过 ajax 请求本地资源，在浏览器打开主页面，会出现 ajax 跨域请求的错误。

##### 问题分析

