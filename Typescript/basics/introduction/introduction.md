# 什么是 TypeScript

首先，我对 TypeScript 的理解如下：
TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持，它由 Microsoft 开发，代码开源于 GitHub 上。

其次引用官网的定义：

> TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. Any browser. Any host. Any OS. Open source.

## 安装 TypeScript

TypeScript 的命令行工具安装方法如下：

`npm install -g typescript`

以上命令会在全局环境下安装 tsc 命令，安装完成之后，我们就可以在任何地方执行 tsc 命令了。

安装完成后，可以查看 typescript 模块的版本号

`$ tsc -v`

在当前项目目录，在命令窗口中进入该项目目录，创建 tsconfig.json。

`$ tsc --init`

里面有很多配置项，大家可以根据各自的需要来定制。本文用的示例配置如下，

```js
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs'",
    "esModuleInterop": true
  }
}
```

编译一个 TypeScript 文件很简单：

`tsc hello.ts`

我们约定使用 TypeScript 编写的文件以 `.ts` 为后缀，用 TypeScript 编写 React 时，以 `.tsx` 为后缀。

TypeScript 只会进行静态检查，如果发现有错误，编译的时候就会报错。TypeScript 编译的时候即使报错了，还是会生成编译结果，我们仍然可以使用这个编译之后的文件。
