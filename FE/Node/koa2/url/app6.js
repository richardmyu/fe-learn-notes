const Koa = require("koa");
const router = require("koa-router")();
const cors = require("koa-cors");
const app = new Koa();
app.use(cors());

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

/* app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  await next();
}); */

router.get("/products", async (ctx, next) => {
  ctx.response.body = JSON.stringify(lists);
  console.log("********************************");
  console.log("get_all");
  console.log(lists);
  console.log("********************************");
});

router.get("/products/:id", async (ctx, next) => {
  let id = ctx.params.id;
  let item = lists.filter(item => {
    if (item.id === id) {
      return item;
    }
  });
  ctx.response.body = JSON.stringify(item);
  console.log("********************************");
  console.log("get");
  console.log(item, lists);
  console.log("********************************");
});

router.post("/products", async (ctx, next) => {
  function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
      try {
        let postData = "";
        ctx.req.addListener("data", data => {
          postData += data;
        });
        ctx.req.addListener("end", function() {
          resolve(postData);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  lists = await parsePostData(ctx);
  ctx.response.body = lists;
  console.log("********************************");
  console.log("post");
  console.log(lists, lists);
  console.log("********************************");
});

router.put("/products", async (ctx, next) => {
  function parsePostData(ctx) {
    return new Promise((resolve, reject) => {
      try {
        let postData = "";
        ctx.req.addListener("data", data => {
          postData += data;
        });
        ctx.req.addListener("end", function() {
          resolve(postData);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  let postData = await parsePostData(ctx);
  // console.log(lists, postData);
  ctx.response.body = postData;
  lists = JSON.parse(lists);
  lists.push(JSON.parse(postData));
  console.log("********************************");
  console.log("put");
  console.log(postData, lists);
  console.log("********************************");
});

router.delete("/products/:id", async (ctx, next) => {
  let id = ctx.params.id;
  // lists = JSON.parse(lists);
  let i = 0;
  let list = lists.filter((item, index) => {
    if (item.id === id) {
      i = index;
      return index;
    }
  });
  lists.splice(i, 1);
  // console.log(lists);
  ctx.response.body = JSON.stringify(list);
  console.log("********************************");
  console.log("delete");
  console.log(list, lists);
  console.log("********************************");
});

app.use(router.routes());
app.listen(3333);
console.log("app started at port 3333");
