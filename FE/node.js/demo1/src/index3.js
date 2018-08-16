const http = require("http");
const url = require("url");
const fs = require("fs");

// http
let server = http.createServer(function(req,res){
  // 服务响应调用
  console.log(req.url);
});


/* 
Server {
  domain: null,
  _events: { connection: [Function: connectionListener] },
  _eventsCount: 1,
  _maxListeners: undefined,
  _connections: 0,
  _handle: null,
  _usingSlaves: false,
  _slaves: [],
  _unref: false,
  allowHalfOpen: true,
  pauseOnConnect: false,
  httpAllowHalfOpen: false,
  timeout: 120000,
  keepAliveTimeout: 5000,
  _pendingResponseData: 0,
  maxHeadersCount: null,
  [Symbol(asyncId)]: -1 
} 
*/ 

// url

let str="https://richyu.com:666/index.html/?name=haoke&s=true#123456";
console.log(url.parse(str,true));

//url.parse()第二个参数将返回的query解析为对象
  
/* 
Url {
  protocol: 'https:',  
  slashes: true,
  auth: null,
  host: 'richyu.com:666',
  port: '666',
  hostname: 'richyu.com',
  hash: '#123456',
  search: '?name=haoke&s=true',
  query: 'name=haoke&s=true',
  pathname: '/index.html/',
  path: '/index.html/?name=haoke&s=true',
  href: 'https://richyu.com:666/index.html/?name=haoke&s=true#123456' }
*/
 

server.listen(666, function() {
  // 监听成功执行
  console.log("server is ok");
});
