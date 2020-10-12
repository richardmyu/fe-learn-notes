# 关于 JS 一些问题的详解

## 4.forEach,for in, for,for of 的区别

for 编程式：
forEach() 声明式：不关心如何实现；没有返回值；
for - in key 是 string;数组的私有属性也会遍历出来;key 代表索引;
for - of 不会遍历私有属性(对象);支持 return；key 代表遍历项;

## 5.`$$` 和 `RegExp.$n` 的应用

```javascript
//$的使用（替换文本中$有特殊意义，若需要使用$字符，则要写成$$形式；）
//$只能作为replace方法的第二个参数使用

var reg = /(\w+).(\w+).(\w+)/;
var str = "hao.hao.xue.";
var s1 = str.replace(reg, "$1.$2.$3");
var s2 = str.replace(reg, "$1$2");
var s3 = str.replace(reg, RegExp.$1);
var s4 = str.replace(reg, RegExp.$1, RegExp.$1);
console.log(s1); //hao.hao.xue.
console.log(s2); //haohao.
console.log(s3); //hao.
console.log(s4); //hao.

//arguments:表示每次匹配的数组集合；arguments[n]等价于$(n+1)
//RegExp.$1:不加全局修饰符表示第一次匹配的内容；加了全局修饰符。代表最后一个匹配项的内容；？？？
//$n:表示每一次匹配返回的数组的第n项；
var str = "m{0}n{1}q{2}a{3}";
var a = ["e", "g", "i", "n"];
var reg = /{(\d)}/g;
var s = str.replace(reg, function() {
  console.log(arguments);
  //["{0}", "0", 1, "m{0}n{1}q{2}a{3}", callee: ƒ]
  //["{1}", "1", 5, "m{0}n{1}q{2}a{3}", callee: ƒ]
  //["{2}", "2", 9, "m{0}n{1}q{2}a{3}", callee: ƒ]
  //["{3}", "3", 13, "m{0}n{1}q{2}a{3}", callee: ƒ]
  return a[arguments[1]];
});
console.log(s);
//mengqian

var str = "m{0}n{1}q{2}a{3}";
var a = ["e", "g", "i", "n"];
var reg = /{(\d)}/g;
var s = str.replace(reg, function($1, $2, $3, $4) {
  console.log("$1:" + $1, "$2:" + $2, "$3:" + $3, "$4:" + $4);
  //$1:{0} $2:0 $3:1 $4:m{0}n{1}q{2}a{3}
  //$1:{1} $2:1 $3:5 $4:m{0}n{1}q{2}a{3}
  //$1:{2} $2:2 $3:9 $4:m{0}n{1}q{2}a{3}
  //$1:{3} $2:3 $3:13 $4:m{0}n{1}q{2}a{3}

  return a[$2];
});
console.log(s);
//mengqian

var str = "m{0}n{1}q{2}a{3}";
var a = ["e", "g", "i", "n"];
var reg = /{(\d)}/g,
  reg1 = /{(\d)}/;
var s = str.replace(reg, function() {
  console.log("RegExp.$1:" + RegExp.$1, "RegExp.$2:" + RegExp.$2);
  //RegExp.$1:3 RegExp.$2:
  return a[RegExp.$1];
});
var s1 = str.replace(reg1, function() {
  console.log("RegExp.$1:" + RegExp.$1, "RegExp.$2:" + RegExp.$2);
  //RegExp.$1:0 RegExp.$2:
  return a[RegExp.$1];
});
console.log(s); //mnnnqnan
console.log(s1); //men{1}q{2}a{3}
//mnnnqnan
```
