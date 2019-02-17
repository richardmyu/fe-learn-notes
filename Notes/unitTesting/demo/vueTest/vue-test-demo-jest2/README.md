# vue-test-demo-jest2

> A Vue.js project

使用 `vue-cli` 内置 `jest` 时，直接执行 `npm run test` 会报错：

```javascript
Option "mapCoverage" has been removed, as it's no longer necessary.

  Please update your configuration.

  Configuration Documentation:
  https://facebook.github.io/jest/docs/configuration.html

 FAIL  test\unit\specs\HelloWorld.spec.js
  ● Test suite failed to run

    SecurityError: localStorage is not available for opaque origins

      at Window.get localStorage [as localStorage] (node_modules/jsdom/lib/jsdom/browser/Window.js:257:15)
          at Array.forEach (<anonymous>)

```

解决警告：

在 `jest.conf.js` 中，去掉 `mapCoverage: true,`

解决报错：

在 `jest.conf.js` 中添加：

```javascript
module.exports = {
  verbose: true,
  testURL: "http://localhost/",
  ...
}
```

> 注意：如果添加在 `package.json` 无效
