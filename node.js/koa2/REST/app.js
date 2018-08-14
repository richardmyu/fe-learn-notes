const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const controller = require("./controller");
const app = new Koa();
app.use(bodyparser);
app.use(controller());

app.listen(3333);
console.log("app started at port 3000");