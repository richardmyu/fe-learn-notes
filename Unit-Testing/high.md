# High-order reading

## 1.GUI

[用户界面（UI）测试初学者指南](https://blog.csdn.net/renshuaicsdn/article/details/80661702)

[GUI 功能测试自动化模式](https://www.infoq.cn/article/gui-automation-patterns)

[实战 GUI 产品的自动化测试](https://www.ibm.com/developerworks/cn/rational/r-cn-guiautotesting1/index.html)

## 2.Shallow Rendering（浅渲染） | Full Rendering （全渲染）| Static Rendering （静态渲染）

## 3.快照测试

## 4.TDD & BDD

TDD 是 Test Driven Development 的缩写，也就是测试驱动开发。

通常传统软件工程将测试描述为软件生命周期的一个环节，并且是在编码之后。但敏捷开发大师 Kent Beck 在 2003 年出版了 _Test Driven Development By Example_ 一书，从而确立了测试驱动开发这个领域。

### TDD 需要遵循如下规则

- 写一个单元测试去描述程序的一个方面。
- 运行它应该会失败，因为程序还缺少这个特性。
- 为这个程序添加一些尽可能简单的代码保证测试通过。
- 重构这部分代码，直到代码没有重复、代码责任清晰并且结构简单。
- 持续重复这样做，积累代码。

---

另外，衡量是否使用了 TDD 的一个重要标准是测试对代码的覆盖率，覆盖率在 80% 以下说明一个团队没有充分掌握 TDD，当然高覆盖率也不能说一定使用了 TDD，这仅仅是一个参考指标。

在我看来，TDD 是一种开发技术，而非测试技术，所以它对于代码构建的意义远大于代码测试。也许最终的代码和先开发再测试写的测试代码基本一致，但它们仍然是有很大不同的。TDD 具有很强的目的性，在直接结果的指导下开发生产代码，然后不断围绕这个目标去改进代码，其优势是高效和去冗余的。所以其特点应该是由需求得出测试，由测试代码得出生产代码。打个比方就像是自行车的两个轮子，虽然都是在向同一个方向转动，但是后轮是施力的，带动车子向前，而前轮是受力的，被向前的车子带动而转。

所谓的 BDD 行为驱动开发，即 Behaviour Driven Development，是一种新的敏捷开发方法。它更趋向于需求，需要共同利益者的参与，强调用户故事（User Story）和行为。2009 年，在伦敦发表的“敏捷规格，BDD 和极限测试交流”[3]中，Dan North 对 BDD 给出了如下定义：

> BDD 是第二代的、由外及内的、基于拉(pull)的、多方利益相关者的(stakeholder)、多种可扩展的、高自动化的敏捷方法。它描述了一个交互循环，可以具有带有良好定义的输出（即工作中交付的结果）：已测试过的软件。

另外最主观的区别就是用词，‘example’ 取代了 ‘test’，‘describe’ 取代了 ‘class’，‘behaviour’ 取代了 ‘method’等等。这正是其特征之一，自然语言的加入，使得非程序人员也能参与到测试用例的编写中来，也大大降低了客户、用户、项目管理者与开发者之间来回翻译的成本。

简单来说，我认为 BDD 更加注重业务需求而不是技术，虽然看起来 BDD 确实是比 ATDD 做的更好，但这是一种误导，这仅仅是就某种环境下而言的。而且以国内的现状来看 TDD 要比 BDD 更适合，因为它不需要所有人员的理解和加入。

[单元测试 Unit Test](http://www.tychio.net/tech/2013/07/10/unit-test.html)

[TDD 和 BDD](https://www.cnblogs.com/Leo_wl/p/4780678.html)

[测试之谈 TDD、BDD 和 ATDD](https://blog.csdn.net/hey_man2017/article/details/79934769)

[大话 TDD，BDD，ATDD 的本质](https://blog.csdn.net/chancein007/article/details/53959603)

[测试驱动开发（TDD）介绍中的误区](http://blog.jobbole.com/64431/)

[前端单元测试探索.md](https://github.com/ecmadao/Coding-Guide/blob/master/Notes/UnitTest/%E5%89%8D%E7%AB%AF%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E6%8E%A2%E7%B4%A2.md)

[今天我们还需要关注 DDD 吗？](https://www.infoq.cn/article/should-we-focus-on-ddd)

[领域驱动设计在互联网业务开发中的实践](https://zhuanlan.zhihu.com/p/32459776)

[TDD 并不是看上去的那么美](https://coolshell.cn/articles/3649.html)

### 4.Client/Server 测试

相比于服务端开发，前端开发在测试方面始终面临着一个严峻的问题，那就是浏览器兼容性。Paul Irish 曾发表文章 _Browser Market Pollution: IE[x] Is the New IE6_ 阐述了一个奇怪的设想，未来你可能需要在 76 个浏览器上开发，因为每次 IE 的新版本都是一个特别的浏览器，而且还有它对之前所有版本的兼容模式也是一样。虽然没人认为微软会继续如此愚蠢，不过这也说明了一个问题，前端开发中浏览器兼容性是一个永远的问题，而且我认为即使解决了浏览器的兼容性问题，未来在移动开发方面，设备兼容性也是一个问题。

所以在自动化测试方面也是如此，即使所有的单元测试集中在了一个 runner 中，前端测试仍然要面对至少 4 个浏览器内核以及 3 个电脑操作系统加 2 个或更多移动操作系统，何况还有令移动开发人员头疼的 Android 的碎片化问题。不过可以安心的是，早已存在这样的工具可以捕获不同设备上的不同浏览器，并使之随时更新测试结果，甚至可以在一个终端上看到所有结果。

工具介绍
JSTD（Javascript Test Driver）是一个最早的 C/S 测试工具，来自 Google，基于 JAVA 编写，跨平台，使用命令行控制，还有很好的编辑器支持，最常用于 eclipse。不过它无法显示测试对象的设备及浏览器版本，只有浏览器名是不够的。另外 JSTD 已经慢慢不再活跃，它的早正如它的老。

Google 的新贵 Karma 出现了，它使用 Nodejs 构建，因此跨平台，还支持 PhantomJS 浏览器，还支持多种框架，包括以上介绍的 Jasmine、Qunit 和 Mocha。一次可以在多个浏览器及设备中进行测试，并控制浏览器行为和测试报告。虽然它不支持 Nodejs 的测试，不过没什么影响，因为 Nodejs 并不依赖于浏览器。

还有 TestSwarm，出自 jQuery 之父 John Resig 之手，看来 jQuery 的强大果然不是偶然的，在测试方面非常到位，各种工具齐全。它最特别的地方在于所有测试环境由服务器提供，包括各种版本的主流浏览器以及 iOS5 的 iphone 设备，不过目前加入已经受限。

最受瞩目的当属 Buster，其作者之一就是 Christian Johansen。和 Karma 很像，也使用 Nodejs 编写跨平台并且支持 PhantomJS，一次测试所有客户端。更重要的是支持 Nodejs 的测试，同样支持各种主流测试框架。不过目前还在 Beta 测试中，很多 bug 而且不能很好的兼容 Windows 系统。它的目标还包括整合 Browser Stack。

[单元测试 Unit Test](http://www.tychio.net/tech/2013/07/10/unit-test.html)

### 5.基于网页的测试

### 6.持续集成测试

深究阅读：

[使用 TestCafe 进行 Web 自动化测试](https://zhaozhiming.github.io/blog/2019/01/28/hello-testcafe/)

英文文档参考

[What are Unit Testing, Integration Testing and Functional Testing?](https://codeutopia.net/blog/2015/04/11/what-are-unit-testing-integration-testing-and-functional-testing/)

[JavaScript Testing: Unit vs Functional vs Integration Tests](https://www.sitepoint.com/javascript-testing-unit-functional-integration/)

[The Difference Between TDD and BDD](https://joshldavis.com/2013/05/27/difference-between-tdd-and-bdd/)

[An Overview of JavaScript Testing in 2018](https://medium.com/welldone-software/an-overview-of-javascript-testing-in-2018-f68950900bc3)

[React Testing – Jest or Mocha?](https://spin.atomicobject.com/2017/05/02/react-testing-jest-vs-mocha/)

[Let’s Compare Javascript Testing Frameworks](https://medium.com/cardinal-solutions/lets-compare-javascript-testing-frameworks-bb500f0b1006)

[TestPyramid](https://martinfowler.com/bliki/TestPyramid.html)

[Test Driven Development](http://wiki.c2.com/?TestDrivenDevelopment)

[5 Questions Every Unit Test Must Answer](https://medium.com/javascript-scene/what-every-unit-test-needs-f6cd34d9836d)

[Getting started with Selenium WebDriver for node.js](https://team.goodeggs.com/getting-started-with-selenium-webdriver-for-node-js-f262a00c52e1)
