const Koa = require("koa");
const router = require("koa-router")();
const app = new Koa();

app.use(async (ctx, next) => {
  console.log(`${ctx.request.method}`);
  await next();
});

router.get("/hello/:name", async (ctx, next) => {
  let name = ctx.params.name;
  ctx.response.body = "<h1>Hello, " + name + "</h1>";
});

router.get("/", async (ctx, next) => {
  ctx.response.body = "<h1>Index</h1>";
});

app.use(router.routes());

app.listen(3000);
console.log("app start at port 3000");
