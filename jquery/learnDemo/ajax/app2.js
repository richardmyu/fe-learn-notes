const Koa = require("koa");
const app = new Koa();

app.use(async (ctx, next) => {
  if (ctx.request.path === "/") {
    ctx.response.body = "index.html";
  } else {
    await next();
  }
});

app.use(async (ctx, next) => {
  if (ctx.request.path === "/test") {
    ctx.response.body = "<H1>TEST page</H1>";
  } else {
    await next();
  }
});

app.use(async (ctx, next) => {
  if (ctx.request.path === "/error") {
    ctx.response.body = "<h1>ERROR PAGE</h1>";
  } else {
    await next();
  }
});

app.listen(3000);
console.log("app start in port 3000");
