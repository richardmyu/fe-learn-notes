# 前端测试

JavaScript 作为 web 端使用最广泛的编程语言，它是动态语言，缺乏静态类型检查，所以在代码编译期间，很难发现像变量名写错，调用不存在的方法, 赋值或传值的类型错误等错误。当开发完一个功能模块的时候，如何确定你的模块有没有 bug 呢？通常的做法是根据具体的业务，执行 debug 模式，一点一点深入到代码中去查看。如果你一直都是这样，那么你早就已经 OUT 了。现在更先进的做法是自动化测试, 写好测试用例, 执行一个指令，就可快速知道代码有没有缺陷，以及出错的地方。<sub>[[3]](#data3)</sub>

前端测试一直是前端项目开发过程中机器重要的一个环节，高效的测试方法可以减少我们进行代码自测的时间，提高我们的开发效率，如果你的代码涉及的测试用例较多，而且项目需要长期维护，这时就可以考虑使用一下自动化测试了。<sub>[[1]](#data1)</sub>

前端自动化测试一般是指是在预设条件下运行前端页面或逻辑模块，评估运行结果。预设条件应包括正常条件和异常条件，以达到自动运行测试过程、减少或避免人工干预测试的目的。在前端自动化测试中，我们通常是通过不同的工具来解决不同场景下不同的问题的。就测试类型来看，主要分为 BDD(Bebavior Driven Developement，行为驱动测试)和 TDD(Testing Driven Developement，测试驱动开发)。BDD 可以让项目成员（甚至是不懂编程的）使用自然描述语言来描述系统功能和业务逻辑，从而根据这些描述步骤进行系统自动化的测试；TDD 则要求在编写某个功能的代码之前先编写测试代码，然后只编写使测试通过的功能代码，通过测试来推动整个开发的进行。这有助于编写简洁可用和高质量的代码，并加速实际开发过程。<sub>[[1]](#data1)</sub>

BDD 和 TDD 均有各自的适用场景，BDD 一般更偏向于系统功能和业务逻辑的自动化测试设计，而 TDD 在快速开发并测试功能模块的过程中则更加高效，以快速完成开发为目的。下面我们看下 BDD 和 TDD 具体的特点：<sub>[[1]](#data1)</sub>

当然，凡事都有两面性，好处虽然明显，却并不是所有的项目都值得引入测试框架，毕竟维护测试用例也是需要成本的。对于一些需求频繁变更、复用性较低的内容，比如活动页面，让开发专门抽出人力来写测试用例确实得不偿失。<sub>[[3]](#data3)</sub>

而适合引入测试场景大概有这么几个：<sub>[[3]](#data3)</sub>

- 需要长期维护的项目。它们需要测试来保障代码可维护性、功能的稳定性
- 较为稳定的项目、或项目中较为稳定的部分。给它们写测试用例，维护成本低
- 被多次复用的部分，比如一些通用组件和库函数。因为多处复用，更要保障质量

---

**BDD 的特点**：

- 从业务逻辑的角度定义具体的输入与预期输出，以及可衡量的目标；
- 尽可能覆盖所有的测试用例情况；
- 描述一系列可执行的行为，根据业务的分析来定义预期输出。例如，`expect`, `should`, `assert`；
- 设定关键的测试通过节点输出提示，便于测试人员理解；
- 最大程度的交付出符合用户期望的产品，避免输出不一致带来的问题。

> 站在用户的角度，写测试代码。 是测试驱动开发的进化，测试代码的风格是预期结果，更关注功能和设计，看起来像需求文档。定义系统的行为是主要工作，而对系统行为的描述则变成了测试标准。<sub>[[3]](#data3)</sub>

---

**TDD 的特点**：

- 需求分析，快速编写对应的输入输出测试脚本；
- 实现代码让测试为成功；
- 重构，然后重复测试，最终让程序符合所有要求。

> 站在程序员的角度，写测试代码。测试驱动型的开发方式，先写测试代码，之后编写能通过测试的业务代码，可以不断的在能通过测试的情况下重构 。<sub>[[3]](#data3)</sub>

---

## 一.测试方法 <sub>[[2]](#data2)</sub>

### 1.黑盒测试

黑盒测试一般也被称为**功能测试**，黑盒测试要求测试人员将程序看作一个整体，不考虑其内部结构和特性，只是按照期望验证程序是否能正常工作。黑盒测试更接近用户使用的真实场景，因为对于用户来说，程序的内部是不可见的。

以下是黑盒测试中常用的测试方法：

---

**等价类划分**

等价类划分主要是在已有输入规则的情况下，确定合法输入与非法输入区间来设计测试用例

- 如网站登录密码必须由 6 位数字构成
- 有效等价类：6 位数字
- 无效等价类：位数 > 6，位数 < 6，全角数字，字母、特殊字符等……

---

**边界值分析**

顾名思义，主要是根据输入输出范围的边界值进行测试用例的设计。原因是大量的错误往往发生在输入或输出范围的边界上（程序员往往在容易在这些地方犯错），边界值分析一般结合等价类划分进行使用，等价类划分区间边界一般就是边界值。

- 如网站登录密码长度必须为 6-12 位
- 有效等价类：位数 [6-12]
- 无效等价类：位数 < 6 位数 > 12
- 边界值：6 12

---

**错误推测、异常分析等**

黑盒测试还包含一些其他的测试方式，由于测试往往是不可穷举性的，因此如何如何设计测试用例保证测试覆盖尽可能多的场景，不仅仅是依靠这些总结出来的方法，也考验测试人员自身的天赋。

---

### 2.白盒测试

白盒测试是基于代码本身的测试，一般指对代码逻辑结构的测试。白盒测试是在了解代码结构的前提下进行的测试，目的是遍历尽可能多的可执行路径，得出测试数据。白盒测试方法比较多，主要是**逻辑覆盖**，即检查代码的每一行、每一次判断结果。

逻辑覆盖方式从发现错误能力上排序主要有以下几种：

---

1. 语句覆盖 （让程序执行到每一行语句）
2. 判定覆盖 （让每一个判断语句满足真假）
3. 条件覆盖 （让每一个判断语句里面的每一个条件都取到真假值）
4. 判定/条件覆盖 （同时满足 2 和 3）
5. 条件组合覆盖 （判断语句中条件的每种组合至少出现一次）
6. 路径覆盖 （覆盖程序每一条执行路径）

---

## 二.测试分类 <sub>[[2]](#data2)</sub><sub>[[3]](#data3)</sub>

按照软件工程自底而上的概念，前端测试一般分为**单元测试**（Unit Testing ）、**集成测试**（Integration Testing）和**端到端测试**（E2E Testing）。

### 1.单元测试（Unit Testing）

单元测试是指对程序中最小可测试单元进行的测试，一般而言是指对函数进行的测试。如果某个测试依赖于一些外部资源，比如网络或者数据库，那它就不是单元测试。单元测试是从程序员的角度编写的，保证一些方法执行特定的任务，给出特定输入，得到预期的结果。

单元测试混合了编程和测试，由于是对代码内部逻辑进行测试，因此更多的使用白盒的测试方式。单元测试能强迫开发者写出更可测试的代码，一般而言这样的代码可读性也会高很多，同时良好的单元测试可以作为被测代码的文档使用。

> 函数可测性：可测试性高的函数一般而言是纯函数，即输入输出可预测的函数。即在函数内部不修改传入参数，不执行 API 请求或者 IO 请求，不调用其他非纯函数如 `Math.random()` 等。

单元测试最大的特点是测试对象的细颗粒度性，即被测对象独立性高、复杂度低。

#### 1.1.前端单元测试

前端单元测试和后端单元测试最大的区别在于，前端单元测试无法避免的会存在兼容性问题，如调用浏览器兼容性 API，以及对 BOM（浏览器对象模型）API 的调用，因此前端单元测试需要运行在（伪）浏览器环境下。

就测试运行环境分类，主要有以下几种测试方案：

---

- **基于 JSDOM**
  - 优点：快，执行速度最快，因为不需要浏览器启动
  - 缺点：无法测试如 `seesion` 或 `cookie` 等相关操作，并且由于不是真实浏览器环境因此无法保证一些如 DOM 相关和 BOM 相关的操作的正确性，并且 JSDOM 未实现 `localStorage`，如果需要进行覆盖，只能使用第三方库如 `node-localStorage` （这个库本身对与执行环境的判断有一些问题）进行模拟。

---

- **基于 PhantomJs 等无头浏览器**
  - 优点: 相对较快，并且具有真实的 DOM 环境
  - 缺点: 同样不在真实浏览器中运行，难以调试，并且项目 `issue` 非常多，`puppeteer` 发布后作者宣布不再维护

---

- **使用 Karma 或 puppeteer 等工具，调用真实的浏览器环境进行测试**
  - 优点：配置简单，能在真实的浏览器中运行测试，并且 `karma` 能将测试代码在多个浏览器中运行,同时方便调试
  - 缺点: 唯一的缺点就是相对前两者运行稍慢，但是在单元测试可接受范围内

---

#### 1.2.前端单元测试工具

前端在近几年如雨后春笋一般涌现出非常多的测试框架和相关工具。

---

- **测试平台**
  - `karma` – Google Angular 团队开发的测试运行平台，配置简单灵活，能够很方便将测试在多个真实浏览器中运行。

---

- **测试框架**
  - `mocha` – Tj 大神开发的很优秀的测试框架，有完善的生态系统，简单的测试组织方式，不对断言库和工具做任何限制，非常灵活。
  - `jasmine` – 和 `Mocha` 语法非常相似，最大的差别是提供了自建的断言和 `Spy` 和 `Stub`
  - `jest` – facebook 出品的大而全的测试框架，React 官方推荐的单元测试框架，配置简单运行速度快。（备注：无法和 `Karma` 进行集成）
  - `AVA` – 和上面的测试框架最大的区别在于多线程，运行速度更快。
  - 其他 – 还有一些其他的前端测试框架，但是相似度比较高，无非是对断言和测试桩等工具的集成度不同，如果考虑稳定以及成熟度建议选择 `Mocha`，对测试运行速度有非常高的要求可以考虑 `jest` 和 `AVA`

---

- **测试辅助工具**
  - 断言库 – `Chai` 如果单元测试不跑在真实的浏览器环境中，可以简单使用 node 的 `assert`，但是建议使用 `Chai` 作为断言库（提供了 TDD 和 BDD 风格多种断言方式，并且生态系统繁荣）。
  - 测试桩（又称为测试替身） – `Sinon`、`testDouble` 等工具提供了如测试桩、拦截模拟请求、”时间旅行“等功能，主要用于解决”函数不纯”（比如测试回调是否被正确调用，XHR 是否正确发起请求，时间延迟后函数行为是否正确）的测试问题。

---

- **测试覆盖率工具**
  - `istanbul` istanbul 的基础实现，提供了命令行等工具，但是无法解决代码编译打点的问题
  - `istanbul-instrumenter-loader` istanbul 的 Webpack 插件，能解决代码编译打点和测试报告输出的问题

---

> 其他参考
>
> - [chai-as-promise](https://github.com/domenic/chai-as-promised) 扩展 `Chai` 在 `Promise` 上的断言功能
> - [sinon-chai](https://github.com/domenic/sinon-chai) 扩展 `Chai` 搭配 `Sinon` 时的断言功能
> - [chai-jquery](https://github.com/chaijs/chai-jquery) 扩展 `Chai` 在 UI 测试中的断言
> - [istanbul 官网](https://istanbul.js.org/) 介绍了 `istanbul` 如何与多中测试框架集成以及对于 Typescript 等语言的支持
> - [阮一峰-代码覆盖率工具 Istanbul 入门教程](http://www.ruanyifeng.com/blog/2015/06/istanbul.html) 介绍了代码覆盖率相关的概念以及 `Istanbul` 搭配 `Mocha` 的简单使用

---

### 2.集成测试（Integration Testing）

集成测试就是测试应用中不同模块如何集成。在单元测试的基础上，将已测试过的单元测试函数进行组合集成暴露出的高层函数或类的封装，对这些函数或类进行的测试。

集成测试最大的难点就是颗粒度较大，逻辑更加复杂，外部因素更多，无法保证测试的可控和独立性。解决方式是使用测试桩（测试替身），即将调用的子函数或模块替换掉，即可以隐藏子模块的细节并且可以控制子模块的行为以达到预期的测试。（这里的前提是子模块已经经过完整的单元测试进行覆盖，因此可以假定为子模块状态可知。）

集成测试通常比单元测试慢，因为它更加复杂。并且，集成测试还需要配置测试环境，比如配置测试数据库或者其他依赖的组件。这就使得编写和维护集成测试更加困难，因此，你应该专注于单元测试，除非你真的需要集成测试。

你需要的集成测试应该少于单元测试。除非你需要测试多个模块，或者你的代码太复杂时，你才需要集成测试。并且，当你的代码过于复杂时，建议优化代码以便进行单元测试，而不是直接写集成测试。

通常，我们可以使用单元测试工具编写集成测试。

### 3.端到端测试（E2E Testing）

端到端测试有时候也被称作功能测试，或者浏览器测试，它们指的是同一件事。功能测试是从用户的角度编写的，测试确保用户执行它所期望的工作。

端到端测试是最顶层的测试，即测试应用的某个完整的功能，它从一个用户的角度出发，认为整个系统都是一个黑箱，只有 UI 会暴露给用户。对于网页应用，功能测试意味着使用工具模拟浏览器，然后通过点击页面来测试应用。

单元测试可以测试单个函数，集成测试可以测试两个模块一起工作。功能测试则完全是另外一个层次。你可以有上百个单元测试，但是通常你只有少量的功能测试。这是因为功能测试太复杂了，难于编写和维护。功能测试很慢，因为它需要模拟真实用户进行网页交互。

事实上，你不需要编写非常详细的功能测试。功能测试并不意味着你需要测试每一个功能，其实，你只需要测试一些常见的用户行为。如果你需要在浏览器中手动测试应用的某个流程，比如注册账号，这时你可以编写一个功能测试。

对于单元测试，你会使用代码去验证结果，在功能测试中也应该这样做。以注册账号为例，你可以验证浏览器是否跳转到了”感谢注册”页面。

当有些测试你需要手动在浏览器下重复进行时，你应该编写功能测试。注意不要写得太细致了，否则维护这些测试将是一个噩梦。

测试 JavaScript 代码时，应该着重于单元测试，它非常容易编写和维护，除了可以减少 BUG 还有很多益处。而集成测试与功能测试应该作为补充。

端到端测试需要解决的一些问题：

---

- **环境问题**

即如何保证每次执行测试前的环境是“干净的”，比如需要检查列表为空的表现，如果上一次测试新增了列表，则后一次测试将无法得到列表为空的状态。

最简单的解决方式是在所有测试执行前或测试执行后调用外部脚本清除数据库等，或者可以通过拦截请求并自定义响应的方式来解决（这样会导致测试复杂度变高，并且不够”真实“）。

---

- **元素查找**

如果代码经常变动，组件结构经常变化，如果根据 DOM 结构来查找操作元素，那么你将陷入维护选择器的地狱中。最佳实践是使用 `test-id` 的方式，但是这种方式需要开发人员和测试人员配合，在可操作元素上定义语义化的 `test-id`。

---

- **操作等待**

诸如异步网络请求导致界面变化，或界面动画等，将使得获取操作元素的时机未知。解决方案持续等待直到监听的请求完成，期望的元素成功获取到。

---

- **使用操作而不是断言**

应该更多的依赖操作，而不是依赖断言。例如如果某个操作依赖元素 A 存在，你不需要”判断元素 A 在页面中是否存在”，而应该去”直接获取元素 A，并操作”，因为如果元素 A 不存在，那么肯定将获取不到，断言后的操作将没有意义，因此可以直接使用操作取代断言等待功能。

---

## 三.测试系统构成 <sub>[[3]](#data3)</sub>

测试主要是测试框架、断言库, 代码覆盖率工具，仿真工具 , 测试驱动（测试任务管理工具）组成：

---

**测试框架**： 如何组织测试，主要由 Mocha、Jasmine，Jest ，AVA, Tape 等，测试主要提供了清晰简明的语法来描述测试用例，以及对测试用例分组，测试框架会抓取到代码抛出的 AssertionError，并增加一大堆附加信息，比如那个用例挂了，为什么挂等等。测试框架通常提供 TDD（测试驱动开发）或 BDD（行为驱动开发）的测试语法来编写测试用例。不同的测试框架支持不同的测试语法，比如 Mocha 既支持 TDD 也支持 BDD，而 Jasmine 只支持 BDD。当前流行 BDD 的测试结构。

---

**断言库**：Should.js、chai、expect.js 等等，断言库提供了很多语义化的方法来对值做各种各样的判断。当然也可以不用断言库，Node.js 中也可以直接使用原生 assert 库。

---

**代码覆盖率**：istanbul 等为代码在语法级分支上打点，运行了打点后的代码，根据运行结束后收集到的信息和打点时的信息来统计出当前测试用例对源码的覆盖情况。

---

**仿真工具**(mocks, spies and stubs) 模拟方法，模块，甚至服务器，获取方法的调用信息。先来说说为什么需要仿真吧：需要测试的单元依赖于外部的模块，而这些依赖的模块具有一些特点，例如不能控制、实现成本较高、操作危险等原因，不能直接使用依赖的模块，这样情况下就需要对其进行 mock，要完整运行前端代码，通常并不需要完整的后端环境。能伪造出前端页面渲染所需要的数据就行，这类工具有 sinon，easy-mock，RAP，甚至手工伪造一些假数据都可以。

---

**测试驱动**（测试任务管理工具）

- karma: 是一个基于 Node.js 的 JavaScript 测试执行过程管理工具（Test Runner）。设置测试需要的框架、环境、源文件、测试文件等，配置完后，就可以轻松地执行测试，该工具可用于测试所有主流 Web 浏览器，

这个测试工具的一个强大特性就是，它可以监控 (Watch) 文件的变化，然后自行执行，通过 `console.log` 显示测试结果。

- buster.js: 另外一个工具，不过目前处于 deta 版本，不仅可以在浏览器端，还可以在 node 端

---

**类浏览器测试环境** 这类工具有 Protractor, Nightwatch, Phantom, Casper

---

### 1.测试覆盖率

- 行覆盖率（line coverage）：是否每一行都执行了

可执行语句的每一行是否都被执行了，不包括注释，空白行 行覆盖常常被人指责为“最弱的覆盖”，为什么这么说呢，举一个例子

```javascript
function foo(a, b) {
  return a / b;
}
TestCase: (a = 10), (b = 5);
```

测试人员的测试结果会告诉你，他的代码覆盖率达到了 100％，并且所有测试案例都通过了。我们的语句覆盖率达到了所谓的 100%，但是却没有发现最简单的 Bug，比如，当我让 `b = 0` 时，会抛出一个除零异常。

- 函数覆盖率（function coverage）：是否每个函数都调用了
- 分支覆盖率（branch coverage）：是否每个 if 代码块都执行了
- 语句覆盖率（statement coverage）：是否每个语句都执行了

4 个指标当中，行覆盖率和语句覆盖率很相近；在代码规范的情况下，规范要求一行写一个语句 它们应该是一样的

4 个指标当中，分支覆盖率是最重要的，它包括： `!`, `&&`, `||`, `? : ;` ,`if` 和 `else-if`, `else` ,`switch - case` 等等各种包含分支的情况

> 覆盖率数据只能代表你测试过哪些代码，不能代表你是否测试好这些代码。（比如上面第一个除零 Bug）
> 不要过于相信覆盖率数据。
> 分支覆盖率 > 函数覆盖 > 语句覆盖
> 测试人员不能盲目追求代码覆盖率，而应该想办法设计更多更好的案例，哪怕多设计出来的案例对覆盖率一点影响也没有。

## 四.选择单元测试框架 <sub>[[3]](#data3)</sub>

测试框架做的事情：

- 描述你要测试的东西
- 对其进行测试
- 判断是否符合预期

单元测试应该：简单，快速执行，有清晰的错误报告。

选择框架要考虑下面这些方面：

- 断言：有些框架内置了断言库,有的框架可以自己选择断言库。
- 测试风格：支持的测试风格 测试驱动型 / 行为驱动型 是否喜欢。
- 异步测试支持：测试框架对异步测试支持是否良好。
- 使用的语言：测试框架使用的语言，前端测试框架选择 JS 语言。
- 社区是否活跃, 有没有完整的 API 文档, 使用的公司多不多，有没有大公司维护 。

## 五.根据测试环境选择测试框架 <sub>[[4]](#data4)</sub>

大前端时代不谈环境不成方圆，本文从下面几个环境一一分析下如何敏捷测试：

- node 环境
- vue 环境
- nuxt 服务端渲染环境
- react 环境
- next 服务端渲染环境
- angular 环境

理解测试前需要补充下单元测试（unit）和端到端测试（e2e）的概念，这里不赘述。

### 1.node 环境

推荐测试框架 `jest`

`jest` 是 FB 的杰作之一，方便各种场景的 js 代码测试，这里选择 `jest` 是因为确实方便。

配置的注意事项：

```javascript
{
  testEnvironment: "node"; // 如不声明默认浏览器环境
}
```

针对 node 只聊一下单元测试，e2e 测试比较少见。

当决定写一个 npm 模块时，代码完成后必不可少的就是单元测试，单元测试需要注意的问题比较琐碎。

当引入三方库时，不得不 mock 数据，因为单元测试更多讲求的是局部测试，不要受外界三方引入包的影响。

### 2.vue 环境

在 vue 使用场景下，无非就是组件库和业务逻辑，组件库偏向于 `unit` 测试，业务逻辑偏向于 `e2e` 测试，当然两者并不冲突。

#### 2.1.unit 测试

推荐神器：`vue-test-utils`

README 给了多个测试库配置的例子，这里还是推荐使用 `jest`，给个例子

```javascript
export default {
  props: ["value"],
  data() {
    return {
      currentValue: 0
    };
  },
  watch: {
    value(val) {
      this.currentValue = val;
    }
  }
};

// 复制代码测试如下
import { mount } from "@vue/test-utils";
import Test from "./Test.vue";

test("props value", () => {
  const options = { propsData: { value: 3 } };

  const wrapper = mount(Test);

  expect(wrapper.vm.currentValue).toBe(3);
});
```

十分简单的例子，亮点在测试文件的 `wrapper` 上，通过 `mount` 方法创建了一个组件实例，创建过程中允许加入一些配置信息，甚至是 mock 组件中的 `method` 方法。

vue 单元测试的范围仅限于数据流动是否正确，逻辑渲染是否正确（`v-if` `v-show` `v-for`），`style` 和 `class` 是否正确，我们并不需要关系这个组件在浏览器渲染中的位置，也不需要关系对其它组件会造成什么影响，只要保证组件本身正确即可，前面说的断言，`vue-test-utils` 都能提供对应的方案，总体上节约很多测试成本。

#### 2.2.e2e 测试

也是推荐尤大基于最新脚手架的 [@vue/cli-plugin-e2e-nightwatch](https://www.npmjs.com/package/@vue/cli-plugin-e2e-nightwatch)

`e2e` 测试的重点在于判断真实 DOM 是否满足预期要求，甚至很少出现 mock 场景，不可或缺的是一个浏览器运行环境，具体细节不赘述，可以看官方文档。

### 3.nuxt 服务端渲染环境

`nuxt` 官方推荐 `ava`，顺势带出 `ava` 的方案

#### 3.1.unit 测试

麻烦在配置上面，先给出需要安装的依赖

```javascript
"@vue/test-utils",
  "ava",
  "browser-env",
  "require-extension-hooks",
  "require-extension-hooks-babel",
  "require-extension-hooks-vue",
  "sinon";
```

在 `package.json` 里加几行 `ava` 配置

```javascript
"ava": {
  "require": [
    "./tests/helpers/setup.js"
  ]
}
```

下面来写 `./tests/helpers/setup.js`

```javascript
const hooks = require("require-extension-hooks");

// Setup browser environment
require("browser-env")();

// Setup vue files to be processed by `require-extension-hooks-vue`
hooks("vue")
  .plugin("vue")
  .push();
// Setup vue and js files to be processed by `require-extension-hooks-babel`
hooks(["vue", "js"])
  .plugin("babel")
  .push();
```

上面的代码唯独没看到 `sinon` 这个库，说到 `ava` 是没有 `mock` 功能的，这就给单元测试的 `mock` 带来巨大困难，不过我们可以通过引入 `sinon` 来解决 `mock` 数据的问题，在 `mock` 方面上 `sinon` 做的比 `jest` 还要优秀，支持沙箱模式，不影响外部数据

#### 3.2.e2e 测试

这里有个歧义点，`nuxt` 官网只给出了 `e2e` 的测试案例 [end-to-end-testing](https://nuxtjs.org/guide/development-tools#end-to-end-testing)，当使用默认脚手架构建的项目，也就是没有 `server` 端入口文件的项目，这个方案确实可行。

但是涉及到其它框架（express|koa）的时候就显得不够用了，很有可能在自定义 `server` 入口是加入了大量中间件，这对于官网给出的例子是个巨大考验，不可能在每个测试文件里实现一遍 `new Nuxt`，所以需要更高层的封装，也就是忽略 `server` 启动流程的差异性，直接在浏览器中抓取页面。

推荐：[nuxt-jest-puppeteer](https://github.com/alidcastano/nuxt-jest-puppeteer)

### 4.react 环境

#### 4.1.unit 测试

这一波没得可选，`jest` 完胜，人家官网就有 React，RN 的支持文档

#### 4.2.e2e 测试

其实上面讲了两个 `e2e` 的方案选择，大同小异，需要一个能在 `node` 跑的无头浏览器，官方没有推荐，这里站 vue 一票，选择 [Nightwatch.js](http://nightwatchjs.org/)

### 5.next 服务端渲染环境

#### 5.1.unit 测试

主要讲一下如何配置，先是依赖包

```javascript
"babel-core",
  "babel-jest",
  "enzyme",
  "enzyme-adapter-react-16",
  "jest",
  "react-addons-test-utils",
  "react-test-renderer";
```

在 `package.json` 里面加 `script "test": "NODE_ENV=test jest"`，在根路径下加 `jest.config.js`

```javascript
module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"]
};
```

在根路径下加 `jest.setup.js`

```javascript
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
  adapter: new Adapter()
});
```

### 6.angular 环境

angular 作为框架本身就是全面的，cli 新建的项目自身就带有 `unit` 测试和 `e2e` 测试。

`unit` 测试默认是 [karma](https://karma-runner.github.io/2.0/index.html) + [jasmine](https://jasmine.github.io/)

`e2e` 测试默认是 [protractor](https://www.protractortest.org/#/)

## 六.测试框架风格 <sub>[[5]](#data5)</sub>

**要测试的代码**

```javascript
"use strict";
var Math = {
  add(a, b) {
    return a + b;
  }
};
module.exports = Math;
```

**AVA**

```javascript
const test = require("ava");
const math = require("../Math");

const firstOperand = 2;
const secondOperand = 3;

test("Math add function", t => {
  const result = math.add(firstOperand, secondOperand);

  t.is(result, firstOperand + secondOperand);
});
```

**Jasmine**

```javascript
var math = require("../Math");
describe("Math", function() {
  var firstOperand;
  var secondOperand;
  beforeEach(function() {
    firstOperand = 2;
    secondOperand = 3;
  });
  it("should add two numbers", function() {
    var result = math.add(firstOperand, secondOperand);
    expect(result).toEqual(firstOperand + secondOperand);
  });
});
```

**Jest**

```javascript
jest.unmock("../Math"); // unmock to use the actual implementation of Math

var math = require("../Math");

describe("Math", function() {
  var firstOperand;
  var secondOperand;

  beforeEach(function() {
    firstOperand = 2;
    secondOperand = 3;
  });

  it("should add two numbers", function() {
    var result = math.add(firstOperand, secondOperand);
    expect(result).toEqual(firstOperand + secondOperand);
  });
});
```

**Mocha**

```javascript
var assert = require("assert"); // nodejs 内建断言
var math = require("../Math");
describe("Math", function() {
  var firstOperand;
  var secondOperand;
  beforeEach(function() {
    firstOperand = 2;
    secondOperand = 3;
  });
  it("should add two numbers", function() {
    var result = math.add(firstOperand, secondOperand);
    assert.equal(result, firstOperand + secondOperand);
  });
});
```

**Tape**

```javascript
var test = require("tape");
var math = require("../Math");
var firstOperand = 2;
var secondOperand = 3;
test("Math add function", function(t) {
  var result = math.add(firstOperand, secondOperand);
  t.equal(result, firstOperand + secondOperand);
  t.end();
});
```

## 七.断言库的风格 <sub>[[3]](#data3)</sub>

### 1.Assert

```javascript
var assert = require("chai").assert,
  foo = "bar",
  beverages = { tea: ["chai", "matcha", "oolong"] };
assert.typeOf(foo, "string"); // without optional message
assert.typeOf(foo, "string", "foo is a string"); // with optional message
assert.equal(foo, "bar", "foo equal `bar`");
assert.lengthOf(foo, 3, "foo`s value has a length of 3");
assert.lengthOf(beverages.tea, 3, "beverages has 3 types of tea");
```

### 2.BDD 风格的断言库

- `expect`

```javascript
var expect = require("chai").expect,
  foo = "bar",
  beverages = { tea: ["chai", "matcha", "oolong"] };

expect(foo).to.be.a("string");
expect(foo).to.equal("bar");
expect(foo).to.have.lengthOf(3);
expect(beverages)
  .to.have.property("tea")
  .with.lengthOf(3);
```

- `should`

```javascript
var should = require("chai").should(), //actually call the function
  foo = "bar",
  beverages = { tea: ["chai", "matcha", "oolong"] };

foo.should.be.a("string");
foo.should.equal("bar");
foo.should.have.lengthOf(3);
beverages.should.have.property("tea").with.lengthOf(3);
```

> 建议使用 `expect`，`should` 不兼容 IE

### 3.expect 断言语法

```javascript
// equal 相等或不相等
expect(4 + 5).to.be.equal(9);
expect(4 + 5).to.be.not.equal(10);
expect('hello').to.equal('hello');
expect(42).to.equal(42);
expect(1).to.not.equal(true);
expect({ foo: 'bar' }).to.not.equal({ foo: 'bar' });
expect({ foo: 'bar' }).to.deep.equal({ foo: 'bar' });

// above 断言目标的值大于某个 value,如果前面有 length 的链式标记，则可以用来判断数组长度或者字符串长度
expect(10).to.be.above(5);
expect('foo').to.have.length.above(2);
expect([ 1, 2, 3 ]).to.have.length.above(2);
类似的还有least(value)表示大于等于；below(value)表示小于；most(value)表示小于等于

// 判断目标是否为布尔值 true（隐式转换）
expect('everthing').to.be.ok;
expect(1).to.be.ok;
expect(false).to.not.be.ok;
expect(undefined).to.not.be.ok;
expect(null).to.not.be.ok;

// true/false 断言目标是否为 true 或 false
expect(true).to.be.true;
expect(1).to.not.be.true;
expect(false).to.be.false;
expect(0).to.not.be.false;

// null/undefined 断言目标是否为 null/undefined
expect(null).to.be.null;
expect(undefined).not.to.be.null;
expect(undefined).to.be.undefined;
expect(null).to.not.be.undefined;


// NaN  断言目标值不是数值
expect('foo').to.be.NaN;
expect(4).not.to.be.NaN;

// 判断类型大法(可以实现上面的一些例子):a/an
expect('test').to.be.a('string');
expect({ foo: 'bar' }).to.be.an('object');
expect(foo).to.be.an.instanceof(Foo);
expect(null).to.be.a('null');
expect(undefined).to.be.an('undefined');
expect(new Error).to.be.an('error');
expect(new Promise).to.be.a('promise');

// 包含关系:用来断言字符串包含和数组包含。如果用在链式调用中，可以用来测试对象是否包含某key 可以混着用。
expect([1,2,3]).to.include(2);
expect('foobar').to.contain('foo');
expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');

// 判断空值
expect([]).to.be.empty;
expect('').to.be.empty;
expect({}).to.be.empty;

// match
expect('foobar').to.match(/^foo/);

// exist 断言目标既不是 null 也不是 undefined
var foo = 'hi' , bar = null, baz;
expect(foo).to.exist;
expect(bar).to.not.exist;
expect(baz).to.not.exist;

// within 断言目标值在某个区间范围内，可以与 length 连用
expect(7).to.be.within(5,10);
expect('foo').to.have.length.within(2,4);
expect([ 1, 2, 3 ]).to.have.length.within(2,4);

// instanceOf 断言目标是某个构造器产生的事例
var Tea = function (name) { this.name = name; } , Chai = new Tea('chai');
expect(Chai).to.be.an.instanceof(Tea);
expect([ 1, 2, 3 ]).to.be.instanceof(Array);

// property(name, [value])  断言目标有以 name 为 key 的属性,并且可以指定 value 断言属性值是严格相等的,此 [value] 参数为可选,如果使用 deep 链式调用,可以在 name 中指定对象或数组的引用表示方法
// simple referencing
var obj = { foo: 'bar' };
expect(obj).to.have.property('foo');
expect(obj).to.have.property('foo', 'bar');// 类似于expect(obj).to.contains.keys('foo')

// deep referencing
var deepObj = {
  green: { tea: 'matcha' },
  teas: [ 'chai', 'matcha', { tea: 'konacha' } ]
};
expect(deepObj).to.have.deep.property('green.tea', 'matcha');
expect(deepObj).to.have.deep.property('teas[1]', 'matcha');
expect(deepObj).to.have.deep.property('teas[2].tea', 'konacha');

// ownproperty 断言目标拥有自己的属性，非原型链继承
expect('test').to.have.ownProperty('length');

// throw 断言目标抛出特定的异常
var err = new ReferenceError('This is a bad function.');
var fn = function () { throw err; }
expect(fn).to.throw(ReferenceError);
expect(fn).to.throw(Error);
expect(fn).to.throw(/bad function/);
expect(fn).to.not.throw('good function');
expect(fn).to.throw(ReferenceError, /bad function/);
expect(fn).to.throw(err);
expect(fn).to.not.throw(new RangeError('Out of range.'));

// satisfy(method) 断言目标通过一个真值测试
expect(1).to.satisfy(function(num) { return num > 0; })
```

## 参考：

<p id="data1"><a href="http://jixianqianduan.com/frontend-javascript/2016/11/22/front-end-auto-test.html">1.前端自动化测试解决方案探析</a></p>

<p id="data2"><a href="http://alonecat.com/2018/06/19/%E5%89%8D%E7%AB%AF%E8%87%AA%E5%8A%A8%E5%8C%96%E6%B5%8B%E8%AF%95/">2.前端自动化测试</a></p>

<p id="data3"><a href="https://www.cnblogs.com/wangpenghui522/p/8955497.html">3.前端测试框架</a></p>

<p id="data4"><a href="https://juejin.im/post/5b374d8c6fb9a00e2d480bfe">4.浅谈前端测试</a></p>

<p id="data5"><a href="https://www.cnblogs.com/lihuanqing/p/8533552.html">5.前端测试框架对比(js单元测试框架对比)</a></p>

更多阅读：

[聊聊前端开发的测试](https://blog.coding.net/blog/frontend-testing)

[你需要了解的前端测试“金字塔”](http://web.jobbole.com/93120/)

[关于前端开发谈谈单元测试](https://segmentfault.com/a/1190000000317146)

[浅谈前端单元测试](https://juejin.im/post/5b2da89cf265da597f1c7cab?spm=a2c4e.11153940.blogcont610101.27.eb7e64f5LGXAmC)

[浏览器端测试：mocha，chai，phantomjs](https://github.com/alsotang/node-lessons/tree/master/lesson7)

[前端单元测试探索](https://github.com/ecmadao/Coding-Guide/blob/master/Notes/UnitTest/%E5%89%8D%E7%AB%AF%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E6%8E%A2%E7%B4%A2.md)

[Web 前端测试与集成](http://www.tup.tsinghua.edu.cn/upload/books/yz/073070-01.pdf)

[使用 TestCafe 进行 Web 自动化测试](https://zhaozhiming.github.io/blog/2019/01/28/hello-testcafe/)

[今天我们还需要关注 DDD 吗？](https://www.infoq.cn/article/should-we-focus-on-ddd)

[领域驱动设计在互联网业务开发中的实践](https://zhuanlan.zhihu.com/p/32459776)

[单元测试要做多细？](https://coolshell.cn/articles/8209.html)

[JavaScript 测试︰ 单元 vs 功能 vs 集成测试](https://www.kancloud.cn/chandler/web_technology/387265)

[What are Unit Testing, Integration Testing and Functional Testing?](https://codeutopia.net/blog/2015/04/11/what-are-unit-testing-integration-testing-and-functional-testing/)

[JavaScript Testing: Unit vs Functional vs Integration Tests](https://www.sitepoint.com/javascript-testing-unit-functional-integration/)

[The Difference Between TDD and BDD](https://joshldavis.com/2013/05/27/difference-between-tdd-and-bdd/)

[An Overview of JavaScript Testing in 2018](https://medium.com/welldone-software/an-overview-of-javascript-testing-in-2018-f68950900bc3)

[React Testing – Jest or Mocha?](https://spin.atomicobject.com/2017/05/02/react-testing-jest-vs-mocha/)

[Let’s Compare Javascript Testing Frameworks](https://medium.com/cardinal-solutions/lets-compare-javascript-testing-frameworks-bb500f0b1006)

[TestPyramid](https://martinfowler.com/bliki/TestPyramid.html)

[用户界面（UI）测试初学者指南](https://blog.csdn.net/renshuaicsdn/article/details/80661702)

[GUI 功能测试自动化模式](https://www.infoq.cn/article/gui-automation-patterns)

[实战 GUI 产品的自动化测试](https://www.ibm.com/developerworks/cn/rational/r-cn-guiautotesting1/index.html)

[前端测试框架Jest系列教程](https://www.cnblogs.com/Wolfmanlq/p/8012847.html)

[前端测试框架 Jest](https://juejin.im/post/597aa518f265da3e345f3262#heading-13)

[前端单元测试框架-Mocha](https://www.cnblogs.com/sampapa/p/6963936.html)

深究阅读：

[聊一聊前端自动化测试](https://github.com/tmallfe/tmallfe.github.io/issues/37)

[前端自动化测试探索](http://fex.baidu.com/blog/2015/07/front-end-test/)

[如何进行前端自动化测试？](https://www.zhihu.com/question/29922082)

[前端测试回顾及我们为什么选择 Karma](http://www.alloyteam.com/2015/06/qian-duan-ce-shi-hui-gu-ji-wo-men-wei-shi-me-xuan-ze-karma/)

[前端工程——基础篇](https://www.w3cschool.cn/fouber/jyse1ozt.html)

[实例入门 Vue.js 单元测试](https://juejin.im/post/5bd0979f5188251fab50a551)

[使用karma+mocha进行前端测试驱动开发（一）](https://iyaozhen.com/use-karma-and-mocha-for-fe-tdd.html)

[Vue 组件的单元测试](https://cn.vuejs.org/v2/cookbook/unit-testing-vue-components.html)

[vue 项目中添加单元测试](https://my.oschina.net/yxmBetter/blog/2877978)

[Vue 单元测试实战教程(Mocha/Karma + Vue-Test-Utils + Chai)](https://segmentfault.com/a/1190000012654035)

[如何為 vue 補上單元測試來確保品質(vue 單元測試系列-1)](https://dotblogs.com.tw/kinanson/2017/07/20/075338)

[Vue.js 学习系列六——Vue 单元测试 Karma+Mocha 学习笔记](https://blog.csdn.net/violetjack0808/article/details/73740395)
