## express

当我们只引入express时，前述的那些功能都是没有启用的。那么，如何将这些功能添加进来呢？express通过其中间件机制实现了这些功能的管理。每一个中间件对应一个功能，而中间件可以是第三方库，也可以是我们的业务逻辑。以后我们会经常用到express的中间件。下面我们来简单介绍其工作机制：

你可以把一个中间件理解为一个处理函数（从请求产生响应），通过app.use(<中间件名称>)方法将中间件添加到一个列表中。当HTTP请求到达时，Express会依次调用队列中的中间件，它们的功能便会依次执行，直到某个中间件返回了HTTP响应为止。

	核心归纳(重要的务必看三遍）
	1.中间件是一种功能的封装方式，具体来说就是封装在程序上处理HTTP请求的功能。

	2.中间件是在管道中执行的。你可以想象一个送水的真实管道。水从一端泵入，然后在到达目的地之前还会经过各种仪表与阀门。这个比喻很重要的一部分就是顺序问题，你把压力表放在阀门之前和之后效果是不同的。

	3.在管道最后面我们会放一个来处理和前面任何路由都不匹配的请求。也就是错误处理中间件一般返回状态吗404.

	4.最最重要的就是next()的调用，如果一个中间件你不调用next()那么请求就不会传递出去因为已经被终止了。


```
//get 请求
var express = require('express');
var app = express();
app.get('/',function(req,res){
    res.end('welcome to  首页');
});
app.get('/about',function(req,res){
 res.end('欢迎来到关于我们');
})
app.listen(3000);

//获取主机和路径
//req.host 返回请求头里取的主机名(不包含端口号)
//req.path 返回请求的URL的路径名
app.get('/',function(req,res){
   res.end('欢迎来到首页'+req.host+" "+req.path);
});

//获得查询字符串
//http://localhost:3000/?a=1&b=2&c=3
app.get('/',function(req,res){
   res.end(util.inspect(req.query));
});

//params路径参数
//req.params可以用来获取请求URL中的参数值
app.get('/:id/:name',function(req,res){
   res.send(req.params.id+" "+req.params.name);
});

//中间件
/*
中间件就是处理HTTP请求的函数，用来完成各种特定的任务 比如检查用户是否登录、检测用户是否有权限访问等，它的特点是:

1.一个中间件处理完请求和响应可以把相应数据再传递给下一个中间件
2.回调函数的next参数是一个函数，调用它表示调用后续的中间件,并将数据传递给下一个中间件.
3.还可以根据路径来区分进行返回执行不同的中间件
*/
var express = require('express');
var app = express();
var path = require('path');

app.use(function(req,res,next){
 res.setHeader('Content-Type','text/plain;charset=utf-8');
 next();
});

app.get('/',function(req,res){
 res.end('首页');
});
app.get('/about',function(req,res){
 res.end('关于我们');
});

app.listen(3000);

//send
//send方法向浏览器发送一个响应信息，并可以智能处理不同类型的数据 并在输出响应时会自动进行一些设置，比如HEAD信息、HTTP缓存支持等等。
res.send([body|status], [body])

//示例 1.当参数为一个String时，Content-Type默认设置为"text/html"。
res.send('Hello World'); //Hello World

//2.当参数为Array或Object时，Express会返回一个JSON
res.send({ user: 'tobi' }); //{"user":"tobi"}
res.send([1,2,3]); //[1,2,3]

//3.当参数为一个Number时，并且没有上面提到的任何一条在响应体里，Express会帮你设置一个响应体，比如：200会返回字符"OK"
require('_http_server').STATUS_CODES
res.send(200); // OK
res.send(404); // Not Found
res.send(500); // Internal Server Error
```


### cookie & session

	由于HTTP协议是无状态的协议，所以服务端需要记录用户的状态时，就需要用某种机制来识具体的用户，这个机制就是Session.典型的场景比如购物车，当你点击下单按钮时，由于HTTP协议无状态，所以并不知道是哪个用户操作的，所以服务端要为特定的用户创建了特定的Session，用用于标识这个用户，并且跟踪用户，这样才知道购物车里面有几本书。

	这个Session是保存在服务端的，有一个唯一标识。在服务端保存Session的方法很多，内存、数据库、文件都有。集群的时候也要考虑Session的转移，在大型的网站，一般会有专门的Session服务器集群，用来保存用户会话，这个时候 Session 信息都是放在内存的，使用一些缓存服务比如Memcached之类的来放 Session。

	思考一下服务端如何识别特定的客户？这个时候Cookie就登场了。每次HTTP请求的时候，客户端都会发送相应的Cookie信息到服务端。实际上大多数的应用都是用 Cookie 来实现Session跟踪的，第一次创建Session的时候，服务端会在HTTP协议中告诉客户端，需要在 Cookie 里面记录一个Session ID，以后每次请求把这个会话ID发送到服务器，我就知道你是谁了。

	有人问，如果客户端的浏览器禁用了 Cookie 怎么办？一般这种情况下，会使用一种叫做URL重写的技术来进行会话跟踪，即每次HTTP交互，URL后面都会被附加上一个诸如 sid=xxxxx 这样的参数，服务端据此来识别用户。

	3.Cookie其实还可以用在一些方便用户的场景下，设想你某次登陆过一个网站，下次登录的时候不想再次输入账号了，怎么办？这个信息可以写到Cookie里面，访问网站的时候，网站页面的脚本可以读取这个信息，就自动帮你把用户名给填了，能够方便一下用户。这也是Cookie名称的由来，给用户的一点甜头。

	所以，总结一下：Session是在服务端保存的一个数据结构，用来跟踪用户的状态，这个数据可以保存在集群、数据库、文件中；Cookie是客户端保存用户信息的一种机制，用来记录用户的一些信息，也是实现Session的一种方式。

作者：郭无心
链接：https://www.zhihu.com/question/19786827/answer/66706108
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

	当我们登录网站勾选保存用户名和密码的时候，一般保存的都是cookie，将用户名和密码的cookie保存到硬盘中，这样再次登录的时候浏览器直接将cookie发送到服务端验证，直接username和password保存到客户端，当然这样不安全，浏览器也可以加密解密这样做，每个浏览器都可以有自己的加密解密方式，这样方便了用户，再比如用户喜欢的网页背景色，比如QQ空间的背景，这些信息也是可以通过cookie保存到客户端的，这样登录之后直接浏览器直接就可以拿到相应的偏好设置。

	跟踪会话，比如某些网站中网页有不同的访问权限，有只能登录的用户访问的网页或者用户级别不同不能访问的，但是http请求是无状态的，每次访问服务端是不知道是否是登录用户，很自然的想到在http请求报文中加入登录标识就可以了，这个登录标识就可以是cookie，这样的cookie服务端要保存有所有登录用户的cookie，这样请求报文来了之后拿到登录标识cookie，在服务端进行比较久可以了。

	再比如购物网站，多次点击添加商品到购物车客户端很容易知道哪些物品在购物车中，但是服务端怎么知道每次添加的物品放到哪个登录用户的购物车中呢？也需要请求报文中带着cookie才行（在不登陆的情况下京东也是可以不断添加商品的，推测应该是登录的时候一并创建cookie并且发送物品信息），这些cookie都是为了跟踪会话用的，所以客户端有，服务端也有，并且服务端有全部的会话cookie。后面衍生出session技术,session技术是要使用到cookie的，之所以出现session技术，主要是为了安全。

	http是无状态的协议，客户每次读取web页面时，服务器都打开新的会话，而且服务器也不会自动维护客户的上下文信息，那么要怎么才能实现网上商店中的购物车呢，session就是一种保存上下文信息的机制，它是针对每一个用户的，变量的值保存在服务器端，通过SessionID来区分不同的客户,session是以cookie或URL重写为基础的，默认使用cookie来实现，系统会创造一个名为JSESSIONID的输出cookie，我们叫做session cookie,以区别persistent cookies,也就是我们通常所说的cookie,注意session cookie是存储于浏览器内存中的，并不是写到硬盘上的，这也就是我们刚才看到的JSESSIONID，我们通常情是看不到JSESSIONID的，但是当我们把浏览器的cookie禁止后，web服务器会采用URL重写的方式传递Sessionid，我们就可以在地址栏看到 sessionid=KWJHUG6JJM65HS2K6之类的字符串。

![Alt text](./session1.jpg)

	大家请看在HTTP请求报文头的最后一行有cookie，不过是JSessionID的cookie值Cookie: $Version=1; Skin=new;jsessionid=5F4771183629C9834F8382E23BE13C4C  比如前两个值，应该属于偏好设置之类的。服务端是怎么知道客户端的多个请求是隶属于一个Session呢？注意到后台的那个jsessionid=5F4771183629C9834F8382E23BE13C4C木有？原来就是通过HTTP请求报文头的Cookie属性的jsessionid的值关联起来的！（当然也可以通过重写URL的方式将会话ID附带在每个URL的后面哦）。

	明白了原理，我们就可以很容易的分辨出persistent cookies和session cookie的区别了，网上那些关于两者安全性的讨论也就一目了然了，session cookie针对某一次会话而言，会话结束session cookie也就随着消失了，而persistent cookie只是存在于客户端硬盘上的一段文本（通常是加密的），而且可能会遭到cookie欺骗以及针对cookie的跨站脚本攻击，自然不如 session cookie安全了。

	通常session cookie是不能跨窗口使用的，当你新开了一个浏览器窗口进入相同页面时，系统会赋予你一个新的sessionid，这样我们信息共享的目的就达不到了，此时我们可以先把sessionid保存在persistent cookie中，然后在新窗口中读出来，就可以得到上一个窗口SessionID了，这样通过session cookie和persistent cookie的结合我们就实现了跨窗口的session tracking（会话跟踪）。

	在一些web开发的书中，往往只是简单的把Session和cookie作为两种并列的http传送信息的方式，session cookies位于服务器端，persistent cookie位于客户端，可是session又是以cookie为基础的，明白的两者之间的联系和区别，我们就不难选择合适的技术来开发web service了。


### cookie

1. cookie是什么
HTTP1.0中协议是无状态的，但在WEB应用中，在多个请求之间共享会话是非常必要的，所以出现了Cookie
cookie是为了辩别用户身份，进行会话跟踪而存储在客户端上的数据

3. 使用步骤
客户端第一次访问服务器的时候服务器通过响应头向客户端发送Cookie,属性之间用分号空格分隔
`Set-Cookie:name=zfpx; Path=/`

客户端接收到Cookie之后保存在本地

以后客户端再请求服务器的时候会把此Cookie发送到服务器端

```
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
/**
 * 如果要加密的话 cookieParser里要指定密码，而且signed要等于true
 */

//使用中间件
app.use(cookieParser('zfpx'));
app.get('/write',function(req,res){

    //res.cookie(name, value [, options]);
    //name: 类型为String
    //value: 类型为String和Object，如果是Object会在cookie.serialize()之前自动调用JSON.stringify对其进行处理
    //Option: 类型为对象

    //1.普通设置
    res.cookie('name','value');

    //删除cookie
    res.clearCookie(name [, options]);
    //

    //2.设置域名
    res.cookie('name','zfpx',{domain:'a.zfpx.cn'});

    //3.设置路径
    res.cookie('name','zfpx',{path:'/visit'});

    //4.过期时间
    res.cookie('name','zfpx',{expires:new Date(Date.now()+20*1000)});//毫秒
    res.cookie('name','zfpx',{maxAge:20*1000});//过期时间 毫秒

    //httpOnly true还是false无意义 document.cookie取不到
    res.cookie('name','zfpx',{httpOnly:true});

    res.cookie('age','123',{signed:true});
    res.end('ok');
});

app.get('/read',function(req,res){
    //req.cookies 获取请求中的cookie对象
    res.send(req.cookies);
});

//记录这是客户端的第几次访问
app.get('/visit',function(req,res){
    res.cookie('count',isNaN(req.cookies.count)?0:parseInt(req.cookies.count)+1);
    res.send(req.cookies);
});


app.listen(9090);
```

### session

##### 1. 什么是session

session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而session保存在服务器上

客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上，这就是session。客户端浏览器再次访问时只需要从该Session中查找该客户的状态就可以了

### 用法

```
let express = require('express');
let session = require('express-session');
let app = express();
//使用session中间件，此中间件会在客户端请求服务器的时候，把客户端对应的会话对象放在req.session属性上

app.use(session({
  //每次客户端来请求的时候都要重新保存session
  resave:true,
  //保存未使用过的session
  saveUninitialized:true,
  //用来加密cookie的
  secret:'zfpx'
}));

app.get('/write',function(req,res){
  //给session赋属性 写入session对象
  //set-cookie:connect.sid=s%3AwLtrFtwD2RjFxbxxbsHblBEorblhj2FA.SBREk7RGvVt6E6Vph8zJNCAZSPDZZRS07G35rN8Yz1s; Path=/; HttpOnly
  req.session.username = 'zfpx';
  res.send('write');
});

app.get('/read',function(req,res){
  console.log(req.session);
  res.send(req.session.username);
});
app.listen(8080);
```

```
/**
 * 写一个权限管理系统
 * /reg
 * 有注册(get post)页面 登录(get post)页面 用户主页(get) /user
 * 1. 先GET访问注册页面，返回空白的注册表单
 * 2. 填写此注册表单，如果注册成功跳到登录页，如果注册失败返回注册表单。
 * /login
 * 3. 填写登录表单，然后发起POST登录请求，如果登录成功，跳到用户主页,如果登录失败，则跳回登录页
 */
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let session = require('express-session');
let crypto = require('crypto');
let app = express();
app.use(session({
  resave:true,
  saveUninitialized:true,
  secret:'zfpx'
}));

//此中间件是专门用来处理请求体的，会把查询字符串格式的请求体转成一个对象并赋给req.body
//把查询字符串变成对象 querystring.parse() qs.parse();
/*
 The `extended` option allows to choose between parsing the URL-encoded data
 with the `querystring` library (when `false`) or the `qs` library (when
 `true`).
 */
app.use(bodyParser.urlencoded({extended:false}));

//设置模板引擎
app.set('view engine','html');

//设置模板存放的根目录
app.set('views',path.resolve('views'));

//如果模板是html的话，用ejs来进行渲染
app.engine('html',require('ejs').__express);

/**
 * 1. 引入session中间件并使用
 * 2. 写session req.session.error = '用户名重复'
 * 3. 读session req.session.error
 * 4. 清除session delete req.session.error
 */

let users = [];
app.listen(8080);
//当客户端通过GET方式访问/reg的时候，服务器返回一个空白的注册表单
app.get('/reg',function(req,res){
  //把cookie中的error属性取出
  let error = req.session.error||'';
  //清除cookie中的error
  //res.clearCookie('error');
  delete req.session.error;
  res.render('reg',{title:'用户注册',error});
});

app.post('/reg',function(req,res){
   let user = req.body;
   //找一下用户数组中有没有跟当前传过来的用户用户名相同的用户
   let oldUser = users.find(item=>item.username == user.username);
   if(oldUser){//如果找到了同名用户，则重定向到注册页
     //back是一个关键字，表示上一个页面，从哪来回滚哪里去
     //向客户端写入cookie
     //res.cookie('error','此用户名已经被占用，请换一个试试');
     req.session.error = '此用户名已经被占用，请换一个试试';
     res.redirect('back');//让客户端重新向另外一个路径发起请求
   }else{//如果没有找到同名的用户，则重定向到登录页
     //先对密码进行md5加密后才保存
     user.password = crypto.createHash('md5').update(user.password).digest('hex');
     users.push(user);
     res.redirect('/login');
   }
});
//当客户端通过GET方式访问/login的时候，返回登录表单
app.get('/login',function(req,res){
  let error = req.session.error||'';
  delete req.session.error;
  res.render('login',{title:'用户登录',error});
});
//当客户端提交登录表单之后
app.post('/login',function(req,res){
 let user = req.body;//{username,password}
  //查找一下看看用户数组中有没有符合条件的用户
 let oldUser = users.find(item=>item.username==user.username && item.password == crypto.createHash('md5').update(user.password).digest('hex'));
 if(oldUser){//如果找到了说了登录是成功的
   req.session.success = '登录成功';
   req.session.username = oldUser.username;
   res.redirect('/user');
 }else{//如果没有找到，说明登录是失败的
   req.session.error = '用户名或密码输入错误';
   res.redirect('back');
 }
});
//用户主页
app.get('/user',function(req,res){
 let success = req.session.success||'';
 let error = req.session.error||'';
 let username = req.session.username||'';
 delete req.session.success;
 delete req.session.error;
 res.render('user',{title:'用户主页',success,error,username});
});
```