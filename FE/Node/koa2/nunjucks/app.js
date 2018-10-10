const Koa = require("koa");
const app = new Koa();
const nunjucks = require("nunjucks");

function createEnv(path, opts) {
  let autoescape = opts.autoescape === undefined ? true : opts.autoescape;
  let noCache = opts.noCache || false;
  let watch = opts.watch || false;
  let throwOnUndefined = opts.throwOnUndefined || false;
  let env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(path, {
      noCache: noCache,
      watch: watch
    }),
    {
      autoescape: autoescape,
      throwOnUndefined: throwOnUndefined
    }
  );
  if (opts.filters) {
    for (let f in opts.filters) {
      env.addFilter(f, opts.filters[f]);
    }
  }
  return env;
}

let env = createEnv("views", {
  watch: true,
  filters: {
    hex: function(n) {
      return "Ox" + n.toString(16);
    }
  }
});

/* let s = env.render("hello.html", { name: "小明" });

app.use(async (ctx, next) => {
  ctx.response.body = s;
}); */

let s = env.render("hello.html", { name: '<script>alert("小明")</script>' });

app.use(async (ctx, next) => {
  ctx.response.body = s;
});

app.listen(3000);
console.log("app started at port 3000");
