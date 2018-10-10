const Koa = require("koa");
const app = new Koa();
app.use(async (ctx, next) => {
  console.log(`${(ctx.request.method, ctx.request.url)}`);
  console.log("111");
  await next();
  console.log("222");
});

app.use(async (ctx, next) => {
  const start = new Date().getTime();
  console.log("333");
  await next();
  const ms = new Date().getTime() - start;
  console.log(`Time: ${ms}`);
  console.log("444");
});

app.use(async (ctx, next) => {
  console.log("555");
  await next();
  console.log("666");
  ctx.response.type = "text/html";
  ctx.response.body = "<h1>Hello word</h1>";
});

app.listen(3000);
