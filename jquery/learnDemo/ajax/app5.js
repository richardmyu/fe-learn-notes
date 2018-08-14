const controller = require("../controllers/index.js");
const Koa = require("koa");
const app = new Koa();
app.use(controller);
