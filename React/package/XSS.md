# XSS

跨站点脚本（XSS）是一种通常在 Web 应用程序中发现的计算机安全漏洞。XSS 使攻击者能够将客户端脚本注入其他用户查看的网页中。攻击者可能会使用跨站点脚本漏洞来绕过诸如同源策略之类的访问控制。

截至 2007 年，在网站上进行的跨站点脚本编写约占 Symantec 记录的所有安全漏洞的 84％。在 2017 年，XSS 仍被视为主要威胁媒介。

XSS 的影响范围从微小的滋扰到严重的安全风险，其范围取决于脆弱站点处理的数据的敏感性以及站点所有者网络实施的任何安全缓解措施的性质。

## 背景

Web 上的安全性取决于多种机制，包括称为“同源策略”的基本信任概念。 这基本上表明如果授予一个网站（例如 `https://mybank.example1.com`）的内容访问 Web 浏览器上的资源（例如 Cookie 等）的权限，则来自任何 URL 的内容都具有相同的内容
（1） URI 方案，
（2）主机名
（3）端口号
将共享这些权限。 如果这三个属性中的任何一个都不相同，则来自 URL 的内容必须分别授予权限。

---

参考：

1.[Cross-site scripting](https://en.wikipedia.org/wiki/Cross-site_scripting)

2.[Cross-site scripting（跨站脚本攻击）](https://developer.mozilla.org/zh-CN/docs/Glossary/Cross-site_scripting)

3.[前端安全系列（一）：如何防止 XSS 攻击？](https://tech.meituan.com/2018/09/27/fe-security.html)

4.[前端安全系列（二）：如何防止 CSRF 攻击？](https://tech.meituan.com/2018/10/11/fe-security-csrf.html)
