# Node.js

### Node.js

Node.js是基于V8引擎的JavaScript运行环境，不是一门编程语言，就像一个看不到页面效果的谷歌浏览器；

##### 1.后台语言
用JavaScript语言可以编写后台程序，然后在node.js中运行，可以起到后台语言的作用，所以称之为后台语言。

客户端发送请求到服务器上，服务器也需要编写相关程序，把客户端请求的内容返回；以前使用Java或PHP等语言来编写相关后台程序，但现在可以使用JavaScript来编写后台程序（所以称JavaScript是全栈语言）；

##### 2.安装
`https://nodejs.org/en/` 英文
`http://nodejs.cn/`  中文
`node -v` 查看版本

##### 3.基础知识
优势：
- 1.基于V8引擎，渲染和解析代码；
- 2.基于事件驱动，非阻塞 （I/O 操作）；
- 3.异步单线程开发；
- 4.npm包管理器（全球最大的开源库）；
- 5.基于前端开发，门槛低；

##### 4.node中的模块
1）内置模块
2）自定义模块
3）第三方模块（即引入的模块），可以在npm包管理器中找到；
安装模块操作:`npm install xx`

##### 5.npm包管理器及第三方模块的安装

> 注意，在浏览器中最大的全局对象是window，但node中没有window，全局对象是global；

1).安装模块到全局
`npm install xx -g/-global`

2).安装到当前项目下
`npm install xx `

3).安装到当前项目下，并且将安装的配置信息记录在package.json清单中，生成一条**开发**环境依赖项
`npm install xx --save-dev`

4).安装到当前项目下，并且将安装的信息记录在package.json清单中，生成一条**生产**环境依赖项
`npm install xx --save`

5).删除指定情况的模块
`npm uninstall xx -g/--save/--save-dev`

6).安装指定版本号的模块
`npm install jquery@1.11.3`

##### 6.安装到全局和当前项目的区别：
安装到全局环境：可以使用dos命令来操作，但是只能使用命令操作，不能引入到自己的js代码中；

安装到当前项目：安装完成后，会在当前目录下生成一个文件`node_modules`，此文件夹中会多一个模块less，用户再装模块的时候，会自动加在这个文件夹中；默认情况下不能用doc目录来操作；可以使用`require`导入js代码中，其他模块也是通过`require`来导入js代码中的。`require("less");`。

##### 7.命令操作和导入JS
真实项目中，开发时，很少将模块安装到全局中，因为可能会有版本冲突问题，所以一般都是安装到当前项目中。

在本项目中使用命令来配置模块：
1）执行`npm init -y`（**初始化项目**），在本地项目中生成一个`package.json`文件，是项目的配置信息。添加`-y`是为了在该文件中自动生成配置信息，无须手动添加。

2）在`package.json`的`script`对象中加入自定义的命令`"bb": "lessc less/style.less > less/style.min.css -x"`，接下来执行自定义命令：`npm run bb`。（可以把一些常用的命名写到一些简单的自定义属性中再去执行，方便快捷）。注意`script`中不接受注释。

> 自定义属性名的属性值存储要执行的命令，在dos命令窗口执行属性名的时候，实际执行的是属性值中的命令。

> 如果是执行js模块，写成:node B.js；

> 如果执行代码是写在自定义属性中，那么执行:npm run 属性名

##### 8.`npm install xx --save-dev`和`npm install xx --save`

> 开发环境：项目在本地开发的过程，此时所需要的模块就做开发依赖项；如less；
> 生产环境：项目完成之后，部署到服务器的过程，此时所需要的模块就做生成依赖项；如bootstrap,

```
//npm install bootstrap --save
    "dependencies":{    //生产依赖项
        "bootstrap":"^3.3.7"
    },

//npm install less --save-dev
    "devDependencies":{    //开发依赖项
        "less":"^2.7.3"
    },
```

##### 9.依赖项

实际项目中是多人合作开发，比如使用git管理项目代码以及团队协作处理。将每个人本地开发所用的模块（在`node_modules`中）通过依赖项记录（`package.json`）可以很方便的去除重复的模块，而不遗漏任何模块。拿到别人的项目，只需要`npm install`，就会把当前依赖的模块自动装上，又名“跑环境”。

##### 10.查询版本号

`npm view xx`
因为内容很多，所以将信息输入自定义文件`version.xx`中，`xx`并非文件类型，而是文件名称后缀。
`npm view xx > version.xx`

![Alt text](./wendingbanben.png)



##### 11.自定义模块

在node环境中，可以实现模块之间的相互调用；一个js文件可以看做一个自定义模块；

1）`require("xx")`
将当前xx模块导入其他模块；这种写法是用来导入第三方模块或内置模块使用该方法导入时，先检查第三方模块中有没有该模块，若没有再检查内置模块中是否有该模块，如没有则报错；

2）`require("./xx(.js))`
导入模块时，加入路径，则导入的是自定义模块；路径错误则会报错；一般使用一个const声明变量来接收；被导入的js文件必须要有导出内容；

3）`module.exports`
module是node环境的内置属性，用来进行node模块管理；该对象下有一个属性--exports，作用是将该模块中的某些方法导出提供给其他模块使用；
```
//A.js
    let sum=(...ag)=>{
        return eval(ag.join("+"));
    };
    let product=(...ag)=>{
        return eval(ag.join("*"));
    };

//部分导出
    module.exports.sum=sum;
//批量导出
    module.exports={
        sum:sum,
        product:product
    }

//B.js
//在CMD中执行:node B.js
//如果执行代码是写在自定义属性中，那么执行:npm run 属性名
    const sum=require("./A");
    console.log(sum);
    console.log(sum.sum(1, 2, 3, 4, 5, 6));
```

##### 13.node的内置模块
常用内置模块
- http
- url
- fs

**fs的方法**

fs模块提供了一些属性和方法让js可以读取和写入本地文件进行I/O操作，（input/output输入输出），也就是可以对本地文件进行增删改查的处理。

浏览器是不允许进行I/O操作的，但可以进行简单的上传图片和文件的操作，且必须由用户手动操作才能执行。node环境允许对本地文件进行I/O操作。

以下方法中，不带"Sync"后缀的是异步操作，有该后缀的是同步操作；读取出来的内容都是字符串；

1).读取文件夹中的内容
`fs.readFileSync([pathName路径，必填],[encode编码格式，选填]);`
`fs.readFile([pathName],[encode],[callback(error,value)]);`

同步读取，获取内容：
`let red=fs.readFileSync("./json/data.json","utf-8")`

异步读取，获取的内容储存在其callback的value中：
```
    fs.readFile("./json/data1.json","utf-8",(error,value)=>{
        if(error){
            // console.log(error);//null
//错误时会抛出一个null；故作如下处理：
            console.log("读取错误");
        }else {
            console.log(value);
            //[{"name":"珠峰"},{"age":"9"}]
        }
    });
```

2).写入内容
注意：写入文件内容都是覆盖式的，不是增加式的；如果要保留之前的数据，可以先读取出来，和新内容一起放回去，类似innerHTML操作；
如果没有路径，会自动创建文件夹；

`fs.writeFile([pathName],[content],[encode],[callback]);`
`fs.writeFileSync([pathName],[content],[encode]);`

3).读取文件夹的目录
`fs.readdir([pathName],[callback(error,value)]);`
error:读取失败时返回的信息;
value:读取成功后的返回值，是一个数组，记录当前目录下的文件列表;

`fs.readdirSync([pathName]);`
返回值是一个数组，记录当前目录下的文件列表

fs案例:批量将less格式转换为CSS格式
```
//引入模块
    let fs=require("fs");
    let less=require("less");
    let fileA=fs.readdirSync("./less");
    fileAN=fileA.filter((item)=>{
        return /\.less$/i.test(item);
    });

    fileAN.forEach((item)=>{
        let con= fs.readFileSync("./less/"+item,"utf-8");

//将读出的内容编译成CSS，使用less模块下的render方法
        //compress:true 允许压缩
        less.render(con,{compress:true},(error,value)=>{
        if(error){
            console.log("编译失败");
        }else{
            fs.writeFileSync("./css/"+item.split(".")[0]+".min.css",value.css);
//此处的value的返回值是一个对象，有属性CSS、import
        }
    });
});
```

**url模块**
```
    let url=require("url");
    let utlStr='https://www.zhufengpeixun.com:8080/stu/index.html?name=zf&age=9&course=JS#box';
    console.log(url.parse(utlStr,false));

Url {
    protocol: 'https:',  //传输协议
    slashes: true,  //斜杠
    auth: null,    //作者
    host: 'www.zhufengpeixun.com:8080',  //域名+端口号
    port: '8080',   //端口号
    hostname: 'www.zhufengpeixun.com',  //域名
    hash: '#box',  //哈希值
    search: '?name=zf&age=9&course=JS',  //查询参数 ?+参数
    query: 'name=zf&age=9&course=JS',   //参数
    pathname: '/stu/index.html',   //文件路径名
    path: '/stu/index.html?name=zf&age=9&course=JS',   //路径+查询参数
    href: 'https://www.zhufengpeixun.com:8080/stu/index.html?name=zf&age=9&course=JS#box'
    }

    console.log(url.parse(utlStr,true));
//第二个参数是一个布尔值，默认值是false;
//参数为true的时候，其他的值都不变,只有query会变成一个对象,方便后续操作参数
    // query: { name: 'zf', age: '9', course: 'JS' },

//常使用ES6中对象的解构赋值来拿到解析url后的某些内容
    let{pathname:pn,query:q}=url.parse(utlStr,true);
```

**http模块**
后台创建一个服务，用来接收客户端请求，并且把请求数据准备好然后返回给客户端。

```
    let http=require("http");
    let server=http.createServer((request,response)=>{

//不是在创建服务时执行，只要服务对应的端口号被客户端发出请求，就会执行；请求多少次执行多少次

//1.发起服务请求：
//请求都是基于浏览器完成的,在浏览器地址栏输入地址
//http://localhost:8080  访问本机

//2.这个callback每次执行会默认传递两个参数(request,response)
//request:储存客户端请求的全部信息，例如request.url就是当前客户端请求资源路径以及传递的数据等
//response:对象，提供一系列方法，使服务器能将客户端请求的内容返回给客户端；

});

//让特定服务监听一个端口号
    server.listen(8080,()=>{console.log("8080ok");});

    let server1=http.createServer((request,response)=>{});
    server1.listen(8880,()=>{console.log("8880ok");});

//在此处，一个服务只能监听一个端口号，如果不同服务监听同一个端口则会报错，如下图
```

![Alt text](./http-port-error.png)



```
    let http=require("http"),
        url=require("url"),
        fs=require("fs");
    let sev=http.createServer((request,response)=>{
        let {pathname}=url.parse(request.url);
        try{
            let result=fs.readFileSync(`.${pathname}`,"utf-8");
            //response.end()  将读取的内容返回客户端
            response.end(result);
        }catch(e){
            res.end("not found");
        }
});
    sev.listen(456,()=>{
        console.log("456端口监听成功");
    });
```

不光是你在浏览器的地址栏中写入地址的时候会发请求,html页面加载的时候(浏览器渲染页面的时候遇到link标签,href中需要一个css 文件此时就会主动的再发一次请求,如果请求成功继续往下加载页面,假如有遇到script标签了,也许要加载一个JS文件此时又会发一次请求.....还有img,audio,video,这些都是请求资源文件的,所以就有一个问题,优化的问题,优化的一个方法就是减少页面资源文件的请求次数。

客户端向服务器发请求有两种方式：
第一种:请求html后,浏览器进行页面的渲染,渲染的过程中去不断请求资源文件
第二种:页面加载完成后,用户手动发出的请求,ajax请求,一般都是请求数据的
静态资源:.css,.js,.html,.jpg,.png,.gif,......,后面都是有后缀的.XXX；判断是否是静态资源的请求的时候只需要判断是否有后缀即可

我们发送给客户端的数据都是字符串,在标准浏览器中他可以自己判断是什么类型的文件,比如是html他就按照渲染html的方式去渲染,如果是js那就按照js的方式去加载,但是部分IE浏览器就没有这个本事了,他只知道这个是字符串,不是知道是什么类型的,一加载就乱套了,这时候我们需要给他返回的时候顺便告诉他这个是什么类型的文件,怎么告诉他呢,重写响应头（overWrite response header）

```
let http=require("http"),
    url=require("url"),
    fs=require("fs");
http.createServer((req,res)=>{
    let {pathname}=url.parse(req.url);
    let reg=/\.([0-9a-zA-Z]+)$/i;
    if(pathname=="/"){
        res.end(fs.readFileSync("./index.html","utf-8"));
    }
    if(reg.test(pathname)){
        //result:返回给客户端的数据status:网络状态码
        let result=null,status=404;
        try {
            result=fs.readFileSync(`./${pathname}`);
            status=200;
        }catch (e){
            result="this file is not found";
            status=404;
        }
        let type=reg.exec(pathname)[1].toUpperCase();
        let typeMIME="text/plain";
        switch (type){
            case "HTML":
                typeMIME="text/html";
                break;
            case "CSS":
                typeMIME="text/css";
                break;
        };

//重写响应头 overWrite response header
        res.writeHead(status,{"content-type":typeMIME+";charset=UTF-8"});
        res.end(result);
    }
}).listen(666,()=>{
    console.log("666没毛病");
});
```

```
let http=require("http"),
    url=require("url"),
    fs=require("fs");
http.createServer((req,res)=>{
    let {pathname,query}=url.parse(req.url,true);
    //query=={code:"1"}
    console.log(query);
    let reg=/\.[0-9a-zA-Z]+$/i;
    if(pathname=="/"){
        res.end(fs.readFileSync("./list.html","utf-8"))
    }
    if(reg.test(pathname)){
        let result="";
        try {
            result=fs.readFileSync(`./${pathname}`);
        }catch (e){
            result="is not found";
        }
        res.end(result)
    }

//处理ajax数据请求

    if(pathname=="/list"){

//1.根据解析url后得到的query参数,拿到code,code就是客户端想要的数据的条数

        let code=query.code;

//2.读取data/data.json中的数据,读出的数据是个JSON字符串,我们先把他变成JSON对象是个数组,然后根据code值获取出数组的前code项得到一个新的数组data

        let data=(JSON.parse(fs.readFileSync("./data/data.json","utf-8"))).slice(0,code);

//3.因为数据中可能有中午我们需要重写响应头告诉浏览器这个是什么类型的数据(text/json)以及他的编码格式(charset=utf-8)

        res.writeHead(200,{"content-type":"text/json;charset=utf-8"});

//4.返回data,但是data是个数组,我们需要使用JSON.stringify将它变成字符串

        res.end(JSON.stringify(data));
    }
}).listen(1111,()=>{
    console.log("localhost:1111");
});
```

> img图片不是字符串，默认读取时，不加编码类型；


### Buffer

在 ECMAScript 2015 (ES6) 引入 TypedArray 之前，JavaScript 语言没有读取或操作二进制数据流的机制。Buffer 类被引入作为 Node.js API 的一部分，使其可以在 TCP 流或文件系统操作等场景中处理二进制数据流。

##### 什么是buffer

Buffer 类的实例类似于整数数组，但 Buffer 的大小是固定的、且在 V8 堆外分配物理内存。Buffer 的大小在被创建时确定，且无法调整。

Buffer 类在 Node.js 中是一个全局变量，因此无需使用 require('buffer').Buffer。

Buffer 实例一般用于表示编码字符的序列，比如 UTF-8 、 UCS2 、 Base64 、或十六进制编码的数据。 通过使用显式的字符编码，就可以在 Buffer 实例与普通的 JavaScript 字符串之间进行相互转换。

##### 字节

0b开头代表二进制；0开头代表八进制；0x代表十六进制；

字节(Byte)是计算机存储时的一种计量单位，一个字节等于8位二进制数；
一个位就代表一个0或1，每8个位（bit）组成一个字节（Byte）；注意，在这里，一个汉字是3字节；

字节是通过网络传输信息的单位；

一个字节最大值十进制数是255,十六进制数是ff；

##### 定义buffer的方式

1.通过长度定义（只能是number）
`Buffer.alloc(size[, fill[, encoding]])`

```
第一个参数指定长度（字节），第二个参数用来填充；
let buffer1=Buffer.alloc(6);
let buffer2=Buffer.alloc(6,1);
console.log(buffer1);
//<Buffer 00 00 00 00 00 00>
console.log(buffer2);
//<Buffer 01 01 01 01 01 01>
//调用 Buffer.alloc() 会明显地比另一个方法 Buffer.allocUnsafe() 慢，但是能确保新建的 Buffer 实例的内容不会包含敏感数据。

Buffer.allocUnsafe(size)
//以这种方式创建的 Buffer 实例的底层内存是未初始化的。 新创建的 Buffer 的内容是未知的，且可能包含敏感数据。 可以使用 buf.fill(0) 初始化 Buffer 实例为0。
```

> err:
> 如果 size 大于 buffer.constants.MAX_LENGTH 或小于 0，则抛出 RangeError 错误。 如果 size 为 0，则创建一个长度为 0 的 Buffer。
> 如果 size 不是一个数值，则抛出 TypeError 错误。

2.通过数组定义
`Buffer.from(array)`
```
let buffer=Buffer.from([1,2,3]);
//<Buffer 01 02 03>
//会自动把10进制转换为16进制
```

3.字符串创建
`Buffer.from(string[, encoding])`
```
参数：string <string> 要编码的字符串
     encoding <string> string 的字符编码。 默认: 'utf8'
返回：新建一个包含所给的 JavaScript 字符串 string 的 Buffer

let buffer=Buffer.from('自行车')
//<Buffer e8 87 aa e8 a1 8c e8 bd a6>
```

##### 进制转换

任意进制转换成十进制
parseInt(0b11,10);
```
console.log(parseInt(0b11, 10));//3
console.log(parseInt(0x15, 10));//21
console.log(parseInt(015, 10));//13
```

任意进制转换成十六进制
(0b11).toString(16);
```
let buffer1=Buffer.from("zxcv");
let buffer2=Buffer.from("差别");
let buffer3=Buffer.allocUnsafe(10);
buffer1.copy(buffer3,0);
buffer2.copy(buffer3,4);
console.log(buffer3.toString());//zxcv差别
```

##### buffer常用方法

- `buf.fill(value[, offset[, end]][, encoding])`

```
参数：value <string> | <Buffer> | <integer> 用来填充 buf 的值。
     offset <integer> 开始填充 buf 前要跳过的字节数。默认: 0。
     end <integer> 结束填充 buf 的位置（不包含）。默认: buf.length。
     encoding <string> 如果 value 是一个字符串，则这是它的字符编码。默认: 'utf8'。
返回: <Buffer> buf 的引用。

如果未指定 offset 和 end，则填充整个 buf。 这个简化使得一个 Buffer 的创建与填充可以在一行内完成

const a = Buffer.allocUnsafe(6);
const b = Buffer.allocUnsafe(6).fill('hxh');
console.log(a.toString());//
console.log(b.toString());//hxhhxh

value 如果不是一个字符串或整数，则会被强行转换为 uint32 值。

如果 fill() 操作的最后一次写入的是一个多字节字符，则只有字符中适合 buf 的第一个字节会被写入。
```

- `buf.toString([encoding[, start[, end]]])`

```
参数：encoding <string> 解码使用的字符编码。默认: 'utf8'
     start <integer> 开始解码的字节偏移量。默认: 0
     end <integer> 结束解码的字节偏移量（不包含）。 默认: buf.length
返回: <string>

根据 encoding 指定的字符编码解码 buf 成一个字符串。 start 和 end 可传入用于只解码 buf 的一部分。

```

- `buf.slice([start[, end]])`

```
参数：start <integer> 新建的 Buffer 开始的位置。 默认: 0
     end <integer> 新建的 Buffer 结束的位置（不包含）。 默认: buf.length
返回: <Buffer>

返回一个指向相同原始内存的新建的 Buffer，但做了偏移且通过 start 和 end 索引进行裁剪。

const buf1 = Buffer.alloc(26);
for (let i = 0; i < 26; i++) {
    buf1[i] = i + 97;
}
const buf2 = buf1.slice(0, 3);
console.log(buf2.toString('ascii', 0, buf2.length));//abc
buf1[0] = 33;
console.log(buf2.toString('ascii', 0, buf2.length));//!bc

指定负的索引会导致切片的生成是相对于 buf 的末尾而不是开头。（等价于加上字符长度，从开头复制）
```

> 注意，修改这个新建的 Buffer 切片，也会同时修改原始的 Buffer 的内存，因为这两个对象所分配的内存是重叠的。

- `buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])`

```
参数：target <Buffer> | <Uint8Array> 要拷贝进的 Buffer 或 Uint8Array。
     targetStart <integer> target 中开始拷贝进的偏移量。 默认: 0
     sourceStart <integer> buf 中开始拷贝的偏移量。 当 targetStart 为 undefined 时忽略。 默认: 0
     sourceEnd <integer> buf 中结束拷贝的偏移量（不包含）。 当 sourceStart 为 undefined 时忽略。 默认: buf.length
返回: <integer> 被拷贝的字节数。

拷贝 buf 的一个区域的数据到 target 的一个区域，即便 target 的内存区域与 buf 的重叠。

const buf = Buffer.allocUnsafe(26);
for (let i = 0; i < 26; i++) {
    // 97 是 'a' 的十进制 ASCII 值
    buf[i] = i + 97;
}
buf.copy(buf, 0, 4, 10);
console.log(buf.toString());//efghijghijklmnopqrstuvwxyz
```

- `Buffer.concat(list[, totalLength])`

```
参数：list <Array> 要合并的 Buffer 或 Uint8Array 实例的数组
     totalLength <integer> 合并时 list 中 Buffer 实例的总长度
返回： <Buffer>

返回一个合并了 list 中所有 Buffer 实例的新建的 Buffer 。

如果 list 中没有元素、或 totalLength 为 0 ，则返回一个新建的长度为 0 的 Buffer 。

如果没有提供 totalLength ，则从 list 中的 Buffer 实例计算得到。 为了计算 totalLength 会导致需要执行额外的循环，所以提供明确的长度会运行更快。

如果提供了 totalLength，totalLength 必须是一个正整数。如果从 list 中计算得到的 Buffer 长度超过了 totalLength，则合并的结果将会被截断为 totalLength 的长度。

const buf1 = Buffer.alloc(12);
const buf2 = Buffer.alloc(13);
const buf3 = Buffer.alloc(14);
const totalLength = buf1.length + buf2.length + buf3.length;
console.log(totalLength);//39
const bufA = Buffer.concat([buf1, buf2, buf3], totalLength);
console.log(bufA);//<Buffer 00 00 00 ... 00 00 00 00>
console.log(bufA.length);//39
```

- `Buffer.isBuffer(obj)`

判断是否buffer类型；如果 obj 是一个 Buffer 则返回 true ，否则返回 false 。

##### 克隆

在深/浅克隆中，被复制的是对象中的成员。

浅克隆:在浅克隆中，如果原型对象的成员变量是值类型，将复制一份给克隆对象；如果原型对象的成员变量是引用类型，则将引用对象的地址复制一份给克隆对象，也就是说原型对象和克隆对象的成员变量指向相同的内存地址。简单来说，在浅克隆中，当对象被复制时只复制它本身和其中包含的值类型的成员变量，而引用类型的成员对象并没有复制。例如：Object.assign()，{...{},...{}}，
slice,

```
let obj1 = {a:'1',b:'2'};
let obj2={...obj1};
console.log('obj1: '+obj1.a); //1
console.log('...obj1: '+{...obj1}.a); //1
console.log('obj2: '+obj2.a); //1

obj1.a=12;
console.log('obj1: '+obj1.a); //12
console.log('...obj1: '+{...obj1}.a); //12
console.log('obj2: '+obj2.a); //1
```

深克隆:在深克隆中，无论原型对象的成员变量是值类型还是引用类型，都将复制一份给克隆对象，深克隆将原型对象的所有引用对象也复制一份给克隆对象。简单来说，在深克隆中，除了对象本身被复制外，对象所包含的所有成员变量也将复制。如：递归循环，JSON.parse(JSON.stringify())

> 函数的克隆会在内存单独开辟一块空间，互不影响。

> 判断对象是否相等？
> 在js中用`==`和`===`来判断对象是否相等的意思是，看对象在内存中是否为一个对象，实际比较其引用地址是否一样，而不关注其内容；

##### fs(fileSyetem)

- `readFile(/Sync) & writeFile(/Sync)`

读取都是类型都是buffer 写入的时候utf8；
读取的文件必须存在，写的时候文件不存在会自动创建，里面有内容会覆盖掉；
默认会调用toString方法；
不能通过'/'读取内容（'/'表示根目录）;
```
let fs = require('fs');
function copySync(source,target) {
    let result = fs.readFileSync(source);
    fs.writeFileSync(target,result);
}
function copy(source,target,callback) {
    fs.readFile(source,function (err,data) {
        if(err) return callback(err);
        fs.writeFile(target,data,callback)
    })
}
copy('a.txt','b.txt',function (err) {
   console.log('气温考量');
});
```

- `fs.stat`

```
stats.isFile(); //判断是否文件
stats.isDirectory(); // 判断是否目录

function makeDire(url,cb) {
    let urlArr = url.split('/');
    let i = 0;
    function produ(item) {
        if(urlArr.length<index) return cb();
        // 在创建之前先检查是否存在，如果不存在则创建；存在则进行下一次创建
        fs.stat(item,function (err,stats) {
            if(err){
                fs.mkdir(item,function (err) {
                    if(err)return console.log(err);
                    produ(urlArr.slice(0,++i+1).join('/'));
                });
            }else{
                produ(urlArr.slice(0,++i+1).join('/'));
            }
        })
    }
    produ(urlArr[i]);
}
makeDire('q/w/e/r',function (err) {
    console.log('解开了')
})
```

##### 回调地狱

由于回调函数是异步的，在上面的代码中每一层的回调函数都需要依赖上一层的回调执行完，回调的嵌套过多，代码复杂度增加，可读性降低，维护起来也复杂，调试也复杂，这就是回调地狱。

用promise解决回调地狱
```
let fs = require('fs');
let util = require('util');
let read = util.promisify(fs.readFile);
// promise实例上有个then方法，有两个参数：success，error
// 只有promise实例可以调用then

read('./12.txt','utf8').then(function (data) {
    return read(data,'utf8');
    //如果第一个promise中返回了一个promise实例，会把当前执行的结果传到下一个then中
}).then(function (data) {
    // 如果返回的不是promise 会把结果结果继续向下传递
    return data;
}).then(function (data) {
    console.log(data);
}).catch((err)=>{
    // 处理错误,如果自定义了错误走callback，没写同一走catch
    console.log(err);
});

//第二种解决方案 async-await
//async-await 简化promise写法的 （语法糖）
//await后面只能跟随promise 终极解决方案
async function result () {
    let content1 = await read('./12.txt','utf8');
    let content2 = await read(content1,'utf8');
    let str = content2;
    console.log(str);
}
result();
```

##### Promise

在JavaScript的世界中，所有代码都是单线程执行的。由于这个“缺陷”，导致JavaScript的所有网络操作，浏览器事件，都必须是异步执行。异步执行可以用回调函数实现：
```
function callback() {
    console.log('Done');
}
console.log('before setTimeout()');
setTimeout(callback, 1000);
console.log('after setTimeout()');
```

观察上述代码执行，在Chrome的控制台输出可以看到：
```
before setTimeout()
after setTimeout()
(等待1秒后)
Done
```

可见，异步操作会在将来的某个时间点触发一个函数调用。
AJAX就是典型的异步操作。以上一节的代码为例：
```
request.onreadystatechange = function () {
    if (request.readyState === 4) {
        if (request.status === 200) {
            return success(request.responseText);
        } else {
            return fail(request.status);
        }
    }
}
```

把回调函数`success(request.responseText)`和`fail(request.status)`写到一个AJAX操作里很正常，但是不好看，而且不利于代码复用。

有没有更好的写法？比如写成这样：

```
var ajax = ajaxGet('http://...');
ajax.ifSuccess(success);
ajax.ifFail(fail);
```

这种链式写法的好处在于，先统一执行AJAX逻辑，不关心如何处理结果，然后根据结果是成功还是失败，再来决定在将来的某个时候调用success函数或fail函数。这种“承诺将来会执行”的对象在JavaScript中称为Promise对象。

我们先看一个最简单的Promise例子：生成一个0-2之间的随机数，如果小于1，则等待一段时间后返回成功，否则返回失败：
```
function test(resolve, reject) {
    var timeOut = Math.random() * 2;
    setTimeout(function () {
        if (timeOut < 1) {
            resolve('200 OK');
        }else {
            reject('timeout in ' + timeOut + ' seconds.');
        }
    }, timeOut * 1000);
}
```
这个`test()`函数有两个参数，这两个参数都是函数，如果执行成功，我们将调用`resolve('200 OK')`，如果执行失败，我们将调用`reject('timeout in ' + timeOut + ' seconds.')`。可以看出，`test()`函数只关心自身的逻辑，并不关心具体的resolve和reject将如何处理结果。

有了执行函数，我们就可以用一个Promise对象来执行它，并在将来某个时刻获得成功或失败的结果：
```
var p1 = new Promise(test);
var p2 = p1.then(function (result) {
    console.log('成功：' + result);
});
var p3 = p2.catch(function (reason) {
    console.log('失败：' + reason);
});
```

变量p1是一个Promise对象，它负责执行test函数。由于test函数在内部是异步执行的，当test函数执行成功时，我们告诉Promise对象：
```
// 如果成功，执行这个函数：
p1.then(function (result) {
console.log('成功：' + result);
});
```

当test函数执行失败时，我们告诉Promise对象：
```
p2.catch(function (reason) {
console.log('失败：' + reason);
});
```

Promise对象可以串联起来，所以上述代码可以简化为：
```
new Promise(test).then(function (result) {
    console.log('成功：' + result);
}).catch(function (reason) {
    console.log('失败：' + reason);
});
```

实际测试一下，看看Promise是如何异步执行的：
```
'use strict';

// 清除log:
var logging = document.getElementById('test-promise-log');
while (logging.children.length > 1) {
logging.removeChild(logging.children[logging.children.length - 1]);
}

// 输出log到页面:
function log(s) {
var p = document.createElement('p');
p.innerHTML = s;
logging.appendChild(p);
}
```

可见Promise最大的好处是在异步执行的流程中，把执行代码和处理结果的代码清晰地分离了：

Promise还可以做更多的事情，比如，有若干个异步任务，需要先做任务1，如果成功后再做任务2，任何任务失败则不再继续并执行错误处理函数。

要串行执行这样的异步任务，不用Promise需要写一层一层的嵌套代码。有了Promise，我们只需要简单地写：
`job1.then(job2).then(job3).catch(handleError);`

其中，job1、job2和job3都是Promise对象。

setTimeout可以看成一个模拟网络等异步执行的函数。现在，我们把上一节的AJAX异步执行函数转换为Promise对象，看看用Promise如何简化异步处理：
```
'use strict';

// ajax函数将返回Promise对象:
function ajax(method, url, data) {
    var request = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    resolve(request.responseText);
                 } else {
                    reject(request.status);
                 }
            }
        };
        request.open(method, url);
        request.send(data);
    });
}
```

除了串行执行若干异步任务外，Promise还可以并行执行异步任务。

试想一个页面聊天系统，我们需要从两个不同的URL分别获得用户的个人信息和好友列表，这两个任务是可以并行执行的，用`Promise.all()`实现如下：
```
var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'P1');
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 600, 'P2');
});
// 同时执行p1和p2，并在它们都完成后执行then:
Promise.all([p1, p2]).then(function (results) {
    console.log(results); // 获得一个Array: ['P1', 'P2']
});
```

有些时候，多个异步任务是为了容错。比如，同时向两个URL读取用户的个人信息，只需要获得先返回的结果即可。这种情况下，用`Promise.race()`实现：
```
var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'P1');
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 600, 'P2');
});
Promise.race([p1, p2]).then(function (result) {
    console.log(result); // 'P1'
});
```

由于p1执行较快，Promise的then()将获得结果'P1'。p2仍在继续执行，但执行结果将被丢弃。

**如果我们组合使用Promise，就可以把很多异步任务以并行和串行的方式组合起来执行。**

> promise解决的问题：
> 1.解决回调地狱;
> 2.合并异步的返回结果

```
//合并异步的返回结果
let fs = require('fs');
let {promisify} = require('util');
let read = promisify(fs.readFile);
let s ={};

//方法一：Promise.all
//调用all方法后 会返回一个新的promise的实例
Promise.all([read('a.txt','utf8'),read('b.txt','utf8')]).then(function (data) {
    //data是一个数组类型，和前面请求的顺序相同（会把成功后的结果放到数组中）；只要有一个失败，就抛出错误
    console.log(data);
}).catch(err=>{});

//Promise.race() 以先得到结果的为准，得到结果以后就结束
Promise.race([read('y.txt','utf8'),read('3.txt','utf8')]).then(data=>{console.log(data);},err=>{
    console.log(err)
});


//方法二：await后面只能跟随promise
async function result() {
    let [qwe,asd]=await Promise.all([read('a.txt','utf8'),read('b.txt','utf8')]);
    console.log(qwe,asd);
}
result();
```

Promise类上拥有两个方法可以把结果保证成promise对象：reject 和resolve

```
Promise.reject('123').then(function (data) {
    return data+456
}).then(function (data) {
    console.log(data);
}).catch(err=>{
    console.log(err)
});

一般能异步就不用同步的方法，那什么时候使用同步方法呢？如果程序只在开始或结束去执行一次的话，就可以同步的方法。readFile会把内容读到内存中，用这种方式会导致淹没可用内存。
```

##### path

```
// 拼接路径
// __dirname 表示当前目录
//若有三个及以上的参数，则从第三个参数都算作上一个参数对应目录下的一个子目录（注意是'./xx'）的形式；
path.join(__dirname, './a','./b');
// 解析绝对路径
console.log(path.resolve('./a','./b'));

// 环境变量分隔符
console.log(path.delimiter); // ;
//mc
console.log(path.posix.delimiter); // :
//win
console.log(path.win32.delimiter); // ;
console.log(path.posix.sep); // /
```

##### stream

流分可读流和可写流；特点，可以边读边写；流是基于事件的，所以只有监听事件才能获取数据；所谓要监听的事件是监听数据到来事件

可读流
```
let fs = require('fs');
// highWaterMark 设置每次能读取多少字节， 默认64*1024即64k
// 读取默认时buffer类型

let rs = fs.createReadStream('1.txt',{highWaterMark:1});
// 监听数据到来的事件 rs.emit('data',数据);
// 默认是非流动模式

let arr = [];
rs.on('data',function (chunk) {
    arr.push(chunk);
    console.log(chunk);
    rs.pause();
    // 暂停，是停止on('data')的触发
    setTimeout(function () {
        rs.resume();
        // 恢复data事件的触发
    },1000);
});
// 默认data事件不停触发，直到文件数据读完
rs.on('end',function () {
    console.log(Buffer.concat(arr).toString());
});
rs.on('err',function (err) {

});
```

可写流
```

```

### http

##### 服务器

能在特定IP(服务器)的特定端口上监听客户端的请求，并根据请求的路径返
回相应结果都叫服务器。

##### 客户端

只要能向特定IP(服务器)的特定端口发起请求并接受响应的都叫客户端
可以是mac、iphone、ipad、apple等等。



### 开发组件安装

##### 1.cnpm

```
npm install -g cnpm --registry=https://registry.npm.taobao.org

//安装失败，清理缓存
npm cache clean

//检查是否安装成功
cnpm -v

//更新版本(如果提示“无法识别vue”，有可能是npm版本过低)
npm install -g npm
```

##### 2.vue-cli

下载一个全局生成vue项目的脚手架

```
cnpm install -g vue-cli

npm install vue-cli -g
vue init webpack <项目名字>
cd 项目名字
npm install
npm run dev
```

##### 3.模块

- node模块的规范commonjs
- cmd seajs amd require
- umd 为了做兼容处理的
- esmodule
    - 如何定义模块 (一个js就是一个模块)
    - 如何导出模块  (export)
    - 如何使用模块  (import)

##### 4.先下载webpack

webpack必须采用commonjs写法
```
npm init -y
npm install webpack --save-dev

如果安装报错：Package require os(darwin) not compatible with you platform(win32)
解决：虽然提示不适合Windows，但是问题好像是sass loader出问题的
cnpm install node-sass
```

> 安装webpack或者less最好不要安装全局的，否则可能导致webpack的版本差异

在package.json中配置一个脚本，这个脚本用的命令是webpack，会去当前的node_modules下找bin对应的webpack名字让其执行，执行的就是bin/webpack.js，webpack.js需要当前目录下有个名字叫webpack.config.js的文件；通过`npm run build`执行的目录是当前文件的目录，所以会去当前目录下查找；

##### 5.babel

将es6语法 -> es5语法（单独使用没有效果）

```
npm install babel-core --save-dev
npm install babel-loader --save-dev
```

##### 6.解析es6语法

让babel拥有解析es6语法的功能(不能识别es7)；引入时，要在根目录建立一个“.babelrc”文件，`{"presets": ["es2015"]}`；

```
npm install babel-preset-es2015 --save-dev
```

##### 7.解析es7语法

在“.babelrc”文件写入，`{"presets": ["es2015","stage-0"]}`；

```
npm install babel-preset-stage-0 --save-dev
```

##### 8.解析样式

css-loader将css解析成模块；将解析的内容插入到style标签内(style-loader)

```
npm install css-loader --save-dev
npm install style-loader --save-dev
```

##### 9.less,sass,stylus(预处理语言)

- less-loader less
- sass-loader
- stylus-loader
```
npm install less less-loader --save-dev
```

##### 10.解析图片

- file-loader url-loader(是依赖于file-loader的)

```
npm install file-loader url-loader --save-dev
```


##### 11.解析html插件

- 插件的作用是以我们自己的html为模板将打包后的结果，自动引入到html中产出到dist目录下
```
npm install html-webpack-plugin --save-dev
```


##### 12.webpack-dev-server

- 这里面内置了服务，可以启动一个端口号，当代码更新时，可以自动打包（内存中打包），代码有变化就重新执行
```
npm install webpack-dev-server --save-dev
```


##### 13.安装vue-loader vue-template-compiler

- vue-loader用来解析.vue文件，vue会自动的调用vue-template-compiler；
- vue-template-compiler用来解析vue模板的；

##### 14.webpack.config.js

```
//webpack必须采用commonjs写法

//用来处理路径的
let path=require("path");
//输入相对路径，返回绝对路径
// path.resolve("./dist")

//HTML插件
let HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports={
    //这是打包的入口文件，会自动查找依赖文件
    //如果有多个，则可以写成对象的形式
    entry:'./2.src/main.js',

    //出口
    output:{
        //打包后给文件命名
        filename:'bundle.js',
        //注意此处的路径必须是绝对路径
        path:path.resolve('./list')
    },

    //建立模块的解析规则
    //匹配.js，同时排除node_modules
    module:{
        rules:[
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
            //use中遵循从右往左写
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            //限定转换base64的图片大小
            {test:/\.(jpg|png|gif)$/,use:'url-loader?limit:8192'},
            {test:/\.(eot|svg|woff|woff2|wtf)$/,use:'url-loader'},
            {test:/\.vue$/,use:'vue-loader'}
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            //自动插入到list目录中，通过模板
            template:'./2.src/index.html',

            //自定义HTML文件名
            //filename:'login.html'
        }),
    ],
}


//在main.js中引入css等样式
import './index.css'; //引入css
import './style.less';

//在main.js中引入图片
// 在js中引入图片需要import,或者写一个线上路径
import page from './2.jpg';
console.log(page);
// page就是打包后图片的路径
let img = new Image();
img.src = page;
// 写了一个字符串 webpack不会进行查找
document.body.appendChild(img);
```

##### 15.`compiler` & `runtime`

vue由两部分组成：compiler 和 runtime ；compiler 是可以编译的模板， runtime 则是运行模板；

```
import Vue from 'vue';
// 这样直接引用vue,引用的并不是vue.js 引用的是vue的runtime中的vue.runtime.common.js
// compiler有6k

import App from './App.vue';
new Vue({
    // render函数的作用是将虚拟dom渲染成真实的dom
    // createElement返回的是虚拟的dom
    render:h=>h(App)

}).$mount('#app');
//挂载，写法等价于 el:("#app")
```

##### 16.import

```
// 如果是第三方模块不须要加'./';自定义模块需要加'./'
// import拥有声明功能,可以变量提升
// import放到页面的顶部
// import {str,str2,a} from './a.js';
import * as b from './a.js'
console.log(b.str,b.str2);
b.a();

// xx代表的是default后的结果
import xx from './b.js';
console.log(xx);
```

### Cookie

##### 1.什么是Cookie

HTTP1.0中协议是无状态的，但在WEB应用中，在多个请求之间共享会话是非常必要的，所以出现了Cookie
cookie是为了辩别用户身份，进行会话跟踪而存储在客户端上的数据

##### 2.Cookie的处理流程

![Alt text](./nodecookies.png)


##### 3.cookie的重要属性

|属性|说明|
|--|--|
|name=value|键值对，可以设置要保存的Key/Value|
|Domain|
|maxAge|
|secure|
|Path|

