async (ctx, next) => {
  ctx.render("index.html", {
    title: "Welcome"
  });
};

async (ctx, next) => {
  let email = ctx.request.body.email || "";
  let password = ctx.request.body.password || "";
  if (email === "admin@example.com" && password === "123456") {
    ctx.render("sigin-ok.html", {
      title: "Signin In Ok",
      name: "Mr Node"
    });
  } else {
    ctx.render("signin-failed.html", {
      title: "Sign In Failed"
    });
  }
};
