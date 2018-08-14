const fs = require("fs");

/* for (let f of js_files) {
  console.log(`process controller:${f}`);
  let mapping = require(__dirname + "/controller" + f);
  for (let url in mapping) {
    if (url.startsWith("GET")) {
      let path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith("POST")) {
      let path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else {
      console.log(`invalid URL: ${URL}`);
    }
  }
} */

String.prototype.startWith = function(str) {
  var reg = new RegExp("^" + str);
  return reg.test(this);
};

String.prototype.endWith = function(str) {
  var reg = new RegExp(str + "$");
  return reg.test(this);
};

function addMapping(router, mapping) {
  for (let url in mapping) {
    if (url.startsWith("GET")) {
      let path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith("POST")) {
      let path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}

function addControllers(router) {
  let files = fs.readdirSync(__dirname + "/controllers");
  let js_files = files.filter(f => {
    return f.endWith(".js");
  });

  for (let f of js_files) {
    console.log(`process controller: ${f}`);
    let mapping = require(__dirname + "/controllers/" + f);
    addMapping(router, mapping);
  }
}

// addControllers(router);
module.exports = function(dir) {
  let controllers_dir = dir || "controllers";
  let router = require("koa-router")();
  addControllers(router, controllers_dir);
  return router.routes();
};
