const { series, parallel } = require("gulp");

function sayHello(cb) {
  console.log('Hello world');
  cb();
}

function sayBye(cb) {
  console.log('bye bye');
  cb();
}

exports.order = series(sayHello, sayBye);

exports.concu = parallel(sayHello, sayBye);
// exports.default = parallel(sayHello, sayBye);
