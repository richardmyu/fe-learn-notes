const Koa = require("koa");
const router = require("koa-router")();
const app = new Koa();

let lists = [
  {
    id: "001",
    name: "product1",
    price: 123
  },
  {
    id: "002",
    name: "product2",
    price: 124
  },
  {
    id: "003",
    name: "product3",
    price: 125
  },
  {
    id: "004",
    name: "product4",
    price: 126
  },
  {
    id: "005",
    name: "product5",
    price: 127
  }
];

router.get("/products", async (ctx, next) => {
  ctx.response.body = "successCallback(" + JSON.stringify(lists) + ")";
});

router.get("/products/:id", async (ctx, next) => {
  let id = ctx.params.id;

  ctx.response.body = JSON.stringify(
    lists.filter((item, index) => {
      // console.log(item.id,id);
      if (item.id === id) {
        return item;
      }
    })
  );
});

router.post("/products", async (ctx, next) => {
  ctx.response.body = JSON.stringify(lists);
});

app.use(router.routes());
app.listen(3333);
console.log("app started at port 3333");
