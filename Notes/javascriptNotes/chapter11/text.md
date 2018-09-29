# 关于JS一些问题的详解

<!-- TOC -->

- [关于JS一些问题的详解](#关于js一些问题的详解)
    - [1.src与href的区别](#1src与href的区别)
    - [2.`<script>`与`<img>`的src属性的跨域问题](#2script与img的src属性的跨域问题)
    - [3.`String()`,`toString()`和`valueOf()`的原理及区别](#3stringtostring和valueof的原理及区别)
    - [4.JavaScript中函数传参问题](#4javascript中函数传参问题)
        - [传参问题](#传参问题)
    - [5.函数与形参,局部变量同名问题](#5函数与形参局部变量同名问题)
    - [6.`String`方法中的`indexOf()`与`lastIndexOf()`在匹配空字符和空数组的问题](#6string方法中的indexof与lastindexof在匹配空字符和空数组的问题)
      - [forEach,for in, for,for of的区别](#foreachfor-in-forfor-of的区别)
      - [12.`$$`和`RegExp.$n`的应用](#12和regexpn的应用)
    - [js中函数的参数声明是var声明类型还是let声明类型？？？](#js中函数的参数声明是var声明类型还是let声明类型)

<!-- /TOC -->


### 1.src与href的区别

### 2.`<script>`与`<img>`的src属性的跨域问题

### 3.`String()`,`toString()`和`valueOf()`的原理及区别

### 4.JavaScript中函数传参问题

##### 传参问题

JS中传参有两种方式：*by value and by sharing*，像C，C++，Java，他们传参方式是*by value*和*by reference*。前者就是传值，后者是传址。而JS也是这样的，前者是传值，后者是传址。
[Is JavaScript a pass-by-reference or pass-by-value language?](https://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language?lq=1)

```
function changeStuff(a, b, c){
    a = a * 10;
    b.item = "changed";
    c = {item: "changed"};
}
var num = 10;
var obj1 = {item: "unchanged"};
var obj2 = {item: "unchanged"};
changeStuff(num, obj1, obj2);

console.log(num);//10
console.log(obj1.item);//changed
console.log(obj2.item);//unchanged
```


### 5.函数与形参,局部变量同名问题

- 同名（变量声明不涉及到let和const的情况）

```
function testOrder(arg) {
    console.log(arg);
    var arg = 'hello';
    function arg() {
	    console.log('fun');
    }
    console.log(arg);
};
testOrder('hi');

//参数和变量同名 -- 先声明（默认）参数，忽略变量声明；若变量赋值，代码执行后则会改变参数的值

//参数和函数同名 -- 函数的声明优先级高于参数声明，同时会改变参数的值

//函数和变量同名 -- 函数的声明优先级高于变量声明；若变量只是声明没有赋值，效果等价于只声明了该函数；若变量声明并且赋值，执行代码后若函数在前会被变量的值覆盖，若函数在后不会影响变量的赋值（即函数的赋值被忽略）；

//三者同名 -- 函数的声明优先级高于参数和变量的声明，同时会改变参数的值；若变量只是声明没有赋值，效果等价于只声明了该函数；若变量声明并且赋值，执行代码后若函数在前会被变量的值覆盖，若函数在后不会影响变量的赋值；

//小结：
//1.可以把参数看做函数体之前就用var声明的变量，再声明同名的变量，声明被忽略，但不忽略赋值；

//2.可以把函数看做特殊的变量，即在声明的同时赋予该变量一个函数对象作为值，并且声明的优先级高于其他普通的变量声明；也可以将这个函数对象看做特殊的“undefined”，即其初始值，若在函数之后拥有同名的变量，忽略变量的声明，但不忽略变量的赋值；同时注意该函数对象不会覆盖之前同名变量的值，即被赋值的变量遇到同名函数，会忽略函数的声明及其赋值（及函数对象），若变量只声明未赋值，则会忽略声明，但会将函数对象赋给变量（这样一来就会把这个普通变量变成函数）；
```


### 6.`String`方法中的`indexOf()`与`lastIndexOf()`在匹配空字符和空数组的问题

衍生问题：在字符方法中（indexOf(),lastIndexOf(),concat()...），为什么将一些非字符类型的参数转换为字符类型的参数或者说为什么应该输入字符型参数的参数允许输入非字符型的参数？？？这样的设计有什么目的？？？


#### forEach,for in, for,for of的区别

for          编程式：
forEach()    声明式：不关心如何实现；没有返回值；
for - in     key是string;数组的私有属性也会遍历出来;key代表索引;
for - of     不会遍历私有属性(对象);支持return；key代表遍历项;


#### 12.`$$`和`RegExp.$n`的应用

```
//$的使用（替换文本中$有特殊意义，若需要使用$字符，则要写成$$形式；）
//$只能作为replace方法的第二个参数使用

var reg=/(\w+).(\w+).(\w+)/;
var str="hao.hao.xue.";
var s1=str.replace(reg,"$1.$2.$3");
var s2=str.replace(reg,"$1$2");
var s3=str.replace(reg,RegExp.$1);
var s4=str.replace(reg,RegExp.$1,RegExp.$1);
console.log(s1);//hao.hao.xue.
console.log(s2);//haohao.
console.log(s3);//hao.
console.log(s4);//hao.

//arguments:表示每次匹配的数组集合；arguments[n]等价于$(n+1)
//RegExp.$1:不加全局修饰符表示第一次匹配的内容；加了全局修饰符。代表最后一个匹配项的内容；？？？
//$n:表示每一次匹配返回的数组的第n项；
    var str="m{0}n{1}q{2}a{3}";
    var a=["e","g","i","n"];
    var reg=/{(\d)}/g;
    var s=str.replace(reg,function(){
        console.log(arguments);
        //["{0}", "0", 1, "m{0}n{1}q{2}a{3}", callee: ƒ]
        //["{1}", "1", 5, "m{0}n{1}q{2}a{3}", callee: ƒ]
        //["{2}", "2", 9, "m{0}n{1}q{2}a{3}", callee: ƒ]
        //["{3}", "3", 13, "m{0}n{1}q{2}a{3}", callee: ƒ]
        return a[arguments[1]];
    });
    console.log(s);
    //mengqian

    var str="m{0}n{1}q{2}a{3}";
    var a=["e","g","i","n"];
    var reg=/{(\d)}/g;
    var s=str.replace(reg,function($1,$2,$3,$4){
        console.log('$1:'+$1,'$2:'+$2,'$3:'+$3,'$4:'+$4);
        //$1:{0} $2:0 $3:1 $4:m{0}n{1}q{2}a{3}
        //$1:{1} $2:1 $3:5 $4:m{0}n{1}q{2}a{3}
        //$1:{2} $2:2 $3:9 $4:m{0}n{1}q{2}a{3}
        //$1:{3} $2:3 $3:13 $4:m{0}n{1}q{2}a{3}

        return a[$2];
    });
    console.log(s);
    //mengqian

    var str="m{0}n{1}q{2}a{3}";
    var a=["e","g","i","n"];
    var reg=/{(\d)}/g,reg1=/{(\d)}/;
    var s=str.replace(reg,function(){
        console.log('RegExp.$1:'+RegExp.$1,'RegExp.$2:'+RegExp.$2);
        //RegExp.$1:3 RegExp.$2:
        return a[RegExp.$1];
    });
    var s1=str.replace(reg1,function(){
        console.log('RegExp.$1:'+RegExp.$1,'RegExp.$2:'+RegExp.$2);
        //RegExp.$1:0 RegExp.$2:
        return a[RegExp.$1];
    });
    console.log(s);//mnnnqnan
    console.log(s1);//men{1}q{2}a{3}
    //mnnnqnan
```

### js中函数的参数声明是var声明类型还是let声明类型？？？