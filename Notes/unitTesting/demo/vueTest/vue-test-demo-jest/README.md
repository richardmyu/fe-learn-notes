# vue-test-demo-jest

> A Vue.js project

使用 vue-cli 内置 jest 时，要注意两点：

- 1.在 `jest.conf.js` 文件去掉 map..
- 2.在 `jest.conf.js` 中加 `verbose: true,testURL: "http://localhost/",`，家在 `package.json` 无效
