# WebGL

WebGL（Web图形库）是一个JavaScript API，可在任何兼容的 Web 浏览器中渲染高性能的交互式 3D 和 2D 图形，而无需使用插件。WebGL 通过引入一个与OpenGL ES 2.0 非常一致的 API 来做到这一点，该API可以在HTML5 `<canvas>` 元素中使用。这种一致性使 API 可以利用用户设备提供的硬件图形加速。

WebGL 2 API 引入了对大部分的 OpenGL ES 3.0 功能集的支持；它是通过 `WebGL2RenderingContext` 界面提供的。

目前所有主流浏览器都支持 WebGL，即便如此，WebGL 一些特性是否可用还是取决于硬件设备等其他因素（比如 GPU 是否支持 WebGL）。

WebGL 程序由 javascript 的控制代码，和在计算机的图形处理单元（GPU，Graphics Processing Unit）中执行的特效代码(shader code，渲染代码) 组成。WebGL 元素可以和其他HTML元素混合，并且会和页面的其他部分或页面背景相合成。

---

参考

1.[WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API)

2.[WebGL 教程](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/Tutorial)
