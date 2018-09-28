## 实际工作中遇到的问题

> 2018-09-19

在 vue 项目中，在配置 axios 时如果设置 `axios.defaults.withCredentials = true;`，将会导致错误：`The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'`

问题 (https://stackoverflow.com/questions/48861290/the-value-of-the-access-control-allow-origin-header-in-the-response-must-not-b)

在 vue 项目中，`-webkit-box-orient: vertical;`在打包时，会被忽略，可能的原因是 `webpack.prod.conf.js` 中的插件 `OptimizeCSSPlugin`；解决方法，在该属性前后加一条注释:

```javascript
/*! autoprefixer: off */
-webkit-box-orient: vertical;
/* autoprefixer: on */
```

> 2018-09-28

登录时，第一次请求总是回报 500，第二次登录才能成功？？？

```
Request URL: http://47.52.166.245:7009/api/v1/login
Request Method: POST
Status Code: 500 
Remote Address: 47.52.166.245:7009
Referrer Policy: no-referrer-when-downgrade

Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:8082
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Connection: close
Content-Type: application/json;charset=UTF-8
Date: Fri, 28 Sep 2018 08:40:25 GMT
Expires: 0
Pragma: no-cache
Transfer-Encoding: chunked
Vary: Origin, Access-Control-Request-Method, Access-Control-Request-Headers
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block

Provisional headers are shown
Accept: application/json, text/plain, */*
Content-Type: application/x-www-form-urlencoded;charset=UTF-8
Origin: http://localhost:8082
Referer: http://localhost:8082/
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36

mobile: 17612775246
code: 678508
```



