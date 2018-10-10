let express = require("express");

let hbs = require("express-handlebars").create({
  defaultLayout: "main",
  extname: ".hbs"
});

let app = express();

app.set("port", process.env.PORT || 8180);

// 设置模板引擎
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

// 使用static中间件，制定public为静态资源目录
app.use(express.static(__dirname + "/public"));

// home
app.get("/", function(req,res) {
  res.render("home", {
    title: "Home Page"
  });
});

// about
app.get("/about", function(req,res) {
  res.render("about", {
    title: "About Page"
  });
});

app.listen(app.get("port"), function() {
  console.log("服务器启动完成，端口为： " + app.get("port"));
});
