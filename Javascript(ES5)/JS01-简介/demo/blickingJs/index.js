console.log("import js")
var container = document.querySelector('.container');

// 此时文档不存在获取元素
console.log(container);

for (var i = 0; i < 1000000; i++) {
  console.log(i)
}
