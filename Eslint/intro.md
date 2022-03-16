# Eslint

## Installation

```shell
npm install -g eslint

# 初始化 package.json，若有则不必
npm init -f

# 初始化 Eslint 配置，生成 .eslintrc 文件
eslint --init
```

## Usage

```shell
eslint file.js
```

## Configuration

```js
module.exports = {
  root: true,

  // env 关键字指定你想启用的环境，并设置它们为 true
  env: {
    es2021: true,
    node: true
  },

  extends: "eslint:recommended",

  parserOptions: {
    // 指定想要使用的 ECMAScript 版本
    ecmaVersion: 13,

    // 设置为 "script" （默认） 或 "module"
    sourceType: "module"
  },

  rules: {
    indent: ["error", 2],
    semi: ["error", "always"],
    quotes: ["error", "double"]
  }
};
```

## Ignore

可以通过在项目根目录创建一个 `.eslintignore` 文件告诉 ESLint 去忽略特定的文件和目录。`.eslintignore` 文件是一个纯文本文件，其中的每一行都是一个 `glob` 模式表明哪些路径应该忽略检测。

> 忽略模式同 `.gitignore` 规范。

```shell
# Valid
/root/src/*.js

# Invalid
\root\src\*.js
```

## Script

```json
// package.json
"scripts": {
  "lint": "eslint javascript/**/*.js",
  "lint:fix": "eslint --fix javascript/**/*.js"
}
```

---

1.[Getting Started with ESLint](http://eslint.cn/docs/user-guide/getting-started)
2.[Configuring ESLint](http://eslint.cn/docs/user-guide/configuring)
