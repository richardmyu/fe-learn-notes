const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const router = require("koa-router")();
const app = new Koa();

app.use(bodyparser());
router.get("/", async (ctx, next) => {
  ctx.response.body = `
    <h1>Index</h1>
    <form action="/login" method="post">
      <p>Name: <input name="name" value="koa"></p>
      <p>Password: <input name="password" type="password"></p>
      <p><input type="submit" value="Submit>"</p>
    </form>
  `;
});

router.post("/login", async (ctx, next) => {
  let name = ctx.request.body.name || "";
  let password = ctx.request.body.password || "";
  console.log(name, password);
  if (name === "koa" && password === "12345") {
    ctx.response.body = `<h1>Welcome,${name}!</h1>`;
  } else {
    ctx.response.body = `<h1>Login failed</h1>
    <p>
      <a href="/">Try again</a>
    </p>`;
  }
});

app.use(router.routes());

app.listen(3000);
console.log("app started at port 3000");
