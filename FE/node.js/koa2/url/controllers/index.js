let fn_index = async (ctx, next) => {
  console.log("exe fn_index");
  ctx.response.body = `
    <h1>Index</h1>
    <form action="/signin" method="post">
      <p>Name: <input name="name" value="koa"></p>
      <p>Password: <input name="password" type="password"></p>
      <p><input type="submit" value="Submit>"</p>
    </form>
  `;
};

let fn_signin = async (ctx, next) => {
  console.log("exe fn_signin");
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
};

module.exports = {
  "GET /": fn_index,
  "POST /signin": fn_signin
};
