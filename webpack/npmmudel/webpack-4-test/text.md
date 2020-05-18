# webpack 4：从零配置开始

创建一个新目录并进入该目录：

```shell
mkdir webpack-4-test
cd webpack-4-test
```

通过运行以下命令初始化 package.json ：

`npm init -y`

并引入 webpack 4：

`npm i webpack -S`

我们还需要 webpack-cli ，作为一个单独的包引入：

`npm i webpack-cli -S`

现在打开 package.json 并添加一个 build(构建) 脚本：

package.json 代码:

```json
"scripts": {
  "build": "webpack"
}
```

关闭文件并保存。

尝试运行：

`npm run build`


参考：

1.[Webpack 4 教程：从零配置到生产发布（2018）](https://www.html.cn/archives/9436)
