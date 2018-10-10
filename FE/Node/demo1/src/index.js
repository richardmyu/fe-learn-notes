const http = require("http");
const url = require("url");
const fs = require("fs");
const webPath = {
  "/": "hello world\n",
  "/about": "ID:z3f\nQQ:10590916"
};

let on200 = function(req, res, bodyStr) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(bodyStr);
};

let on404 = function(req, res) {
  fs.readFile("server/404.html", "binary", function(err, file) {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write(file, "binary");
    res.end();
  });
};

http
  .createServer(function(req, res) {
    let pathname = url.parse(req.url).pathname;
    let bodyStr = webPath[pathname];
    if (bodyStr) {
      on200(req, res, bodyStr);
    } else {
      on404(req, res);
    }
  })
  .listen(1337, "127.0.0.1");
console.log("Server running at http://127.0.0.1:1337");
