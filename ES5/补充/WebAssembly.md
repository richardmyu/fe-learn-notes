# WebAssembly

WebAssembly 或者 wasm 是一个可移植、体积小、加载快并且兼容 Web 的全新格式（**二进制格式**）。

- **高效**

WebAssembly 有一套完整的语义，实际上 wasm 是体积小且加载快的二进制格式， 其目标就是充分发挥硬件能力以达到原生执行效率。

- **安全**

WebAssembly 运行在一个沙箱化的执行环境中，甚至可以在现有的 JavaScript 虚拟机中实现。在 web 环境中，WebAssembly 将会严格遵守同源策略以及浏览器安全策略。

- **开放**

WebAssembly 设计了一个非常规整的文本格式用来、调试、测试、实验、优化、学习、教学或者编写程序。可以以这种文本格式在 web 页面上查看 wasm 模块的源码。

- **标准**

WebAssembly 在 web 中被设计成无版本、特性可测试、向后兼容的。WebAssembly 可以被 JavaScript 调用，进入 JavaScript 上下文，也可以像 Web API 一样调用浏览器的功能。当然，WebAssembly 不仅可以运行在浏览器上，也可以运行在非 web 环境下。

## 1.WebAssembly 是什么

由上面的定义，可知简单来说就是一个（二进制）数据格式。举例：

![what is wasm](https://user-gold-cdn.xitu.io/2018/11/7/166ed3c3acfb3aad?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

上图的左侧是用 C++ 实现的求递归的函数。中间是十六进制的 Binary Code。右侧是指令文本。可能有人就问，这跟 WebAssembly 有关系？其实，中间的十六进制的 Binary Code 就类似 WebAssembly。

- **编译目标**

大家可以看到，其可写性和可读性差到无法想象。那是因为 WebAssembly 不是用来给各位用手一行一行撸的代码，WebAssembly 是一个编译目标。什么是编译目标？当我们写 TypeScript 的时候，Webpack 最后打包生成的 JavaScript 文件就是编译目标。可能大家已经猜到了，上图的 Binary 就是左侧的 C++ 代码经过编译器编译之后的结果。

> 熊伟伦 [4]：
>
> WebAssembly 就是运行在 Web 平台上的 Assembly。
>
> Assembly 是指汇编代码，是直接操作 CPU 的指令代码，比如 x86 指令集上的汇编代码有指令集、寄存器、栈等等设计，CPU 根据汇编代码的指导进行运算。汇编代码相当于 CPU 执行的机器码能够转换成的人类适合读的一种语言。
>
> 一个典型的编译执行链路是 Cpp、Rust 等编译型语言编译成汇编指令，再转换成二进制机器码由 CPU 读取。其他例如 Java、Python 等语言是使用运行在 x86 一类的通用硬件指令集的虚拟机，再执行自己的“汇编语言”（例如 Java Bytecode）。
>
> Web 平台在浏览器上是类似于 Java、Python 的虚拟机环境，浏览器提供虚拟机环境执行一些 JavaScript 或者其他脚本语言。WebAssembly 可以看做是 Web 平台的 x86 硬件通用指令集，作为一层中间语言，上层对接 Java、Python、Rust、Cpp，让这些语言都能编译成统一的格式，用于 Web 平台运行。
>
> 在目前情况下，WebAssembly 在使用中可以取代部分 JavaScript 代码执行更高效的 CPU 计算程序。

WebAssembly 简称 wasm，是一种数据格式，对应的文件后缀名为 `.wasm`，文件由字节码组成；而 Javascript 对应的文件后缀名为 `.js`，文件由字符串组成。

## 2.WebAssembly 的由来

### 2.1.性能瓶颈

在业务需求越来越复杂的现在，前端的开发逻辑越来越复杂，相应的代码量随之变的越来越多。渐渐暴露出了 JavaScript 的问题：

1. 语法太灵活导致开发大型 Web 项目困难；
>
2. 性能不能满足一些场景的需要。

针对以上两点缺陷，近年来出现了一些 JS 的代替语言，例如：

- 微软的 TypeScript 通过为 JS 加入静态类型检查来改进 JS 松散的语法，提升代码健壮性；
>
- 谷歌的 Dart 则是为浏览器引入新的虚拟机去直接运行 Dart 程序以提升性能；
>
- 火狐的 asm.js 则是取 JS 的子集，JS 引擎针对 asm.js 做性能优化。

以上尝试各有优缺点，其中：

- TypeScript 只是解决了 JS 语法松散的问题，最后还是需要编译成 JS 去运行，对性能没有提升；
>
- Dart 只能在 Chrome 预览版中运行，无主流浏览器支持，用 Dart 开发的人不多；
>
- asm.js 语法太简单、有很大限制，开发效率低。

于是 WebAssembly 诞生了，WebAssembly 是一种新的字节码格式，主流浏览器都已经支持 WebAssembly。

> 1995 年 JavaScript 诞生。它的设计时间非常短，前十年发展迅速。
>
> 紧接着浏览器厂商们就开始了更多的竞争。
>
> 2008 年，人们称之为浏览器性能大战的时期开始了。很多浏览器加入了 **即时编译器**（JIT compiler，just-in-time compiler）。在这种模式下，JavaScript 在运行的时候，JIT 选择模式然后基于这些模式使代码运行更快。
>
>> 在部分的商用虚拟机（HotSpot）中，Java 程序最初是通过 **解释器**（Interpreter）进行解释执行的，当虚拟机发现某个方法或代码块运行的特别频繁时，就会把这些代码认定为 “**热点代码**”（Hot Spot Code）。为了提高热点代码的执行效率，在运行时，虚拟机将会把这些热点代码编译成与本地代码相关的机器码，并进行各种层次的优化，完成这个任务的编译器称为 **即时编译器**（Just In Time Compiler）。
>
> 这些 JIT 的引入是浏览器运行代码机制的一个转折点。所有的突然之间，JavaScript 的运行速度快了 10 倍。
>
> 随着这种改进的性能，JavaScript 开始被用于意想不到的事情，比如使用 Node.js 和 Electron 构建应用程序。
>
> 现在 WebAssembly 可能是的另一个转折点。

但是除了逻辑复杂、代码量大，还有另一个原因是 JavaScript 这门语言本身的缺陷，JavaScript 没有静态变量类型。

### 2.2.静态变量类型所带来的问题

![edge](https://user-gold-cdn.xitu.io/2018/11/7/166ed498c346cec4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

这是 Microsoft Edge 浏览器的 JavaScript 引擎 ChakraCore 的结构。我们来看一看我们的 JavaScript 代码在引擎中会经历什么。

1. JavaScript 文件会被下载下来；
2. 然后进入 Parser，Parser 会把代码转化成 AST（抽象语法树）；
3. 然后根据抽象语法树，Bytecode Compiler 字节码编译器会生成引擎能够直接阅读、执行的字节码；
4. 字节码进入翻译器，将字节码一行一行的翻译成效率十分高的 Machine Code。

在项目运行的过程中，引擎会对执行次数较多的 `function` 进行优化，引擎将其代码编译成 Machine Code 后打包送到顶部的 Just-In-Time(JIT) Compiler，下次再执行这个 `function`，就会直接执行编译好的 Machine Code。但是由于 JavaScript 的动态变量，上一秒可能是 `Array`，下一秒就变成了 `Object`。那么上一次引擎所做的优化，就失去了作用，此时又要再一次进行优化。

## 3.WebAssembly 的工作原理

每一种目标汇编语言（x86、ARM）都依赖于特定的机器结构。当你想要把你的代码放到用户的机器上执行的时候，你并不知道目标机器结构是什么样的。

而 WebAssembly 与其他的汇编语言不一样，它不依赖于具体的物理机器。可以抽象地理解成它是概念机器的机器语言，而不是实际的物理机器的机器语言。

正因为如此，WebAssembly 指令有时也被称为 **虚拟指令**。它比 JavaScript 代码更直接地映射到机器码，它也代表了“如何能在通用的硬件上更有效地执行代码”的一种理念。所以它并不直接映射成特定硬件的机器码。

---

参考：

1.[WebAssembly](https://www.wasm.com.cn/)
