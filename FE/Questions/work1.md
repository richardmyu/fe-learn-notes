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

> 2018-09-20

