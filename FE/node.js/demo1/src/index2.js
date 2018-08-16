// 编译less
let less = require("less");
let fs = require("fs");
less.render(
  fs.readFileSync("./style.less", "utf-8"),
  { compress: true },
  function(error, output) {
    fs.writeFileSync("./style.css", output.css, "utf-8");
  }
);


