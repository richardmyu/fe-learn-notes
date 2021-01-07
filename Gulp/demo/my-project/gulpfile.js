const { src, dest, series, parallel } = require("gulp");
const babel = require('gulp-babel');
const uglifyes = require('gulp-uglify-es').default;

function sayHello(cb) {
  console.log('Hello world');
  // cb(new Error('no hello'));
  cb();
}

async function sayBye(cb) {
  console.log('bye bye');
  // cb();
  await Promise.resolve('pp');
}

function dealJs() {
  return src('src/test.js')
    .pipe(babel())
    .pipe(dest('output/'));
}

// 嵌套 src 行为，类似 src([...])
function dealNestSrc() {
  return src('src/index.js')
    .pipe(babel())
    .pipe(src('src/test.js'))
    .pipe(babel())
    .pipe(uglifyes())
    .pipe(dest('output/'));
}

function dealNestDest() {
  return src('src/index.js')
    .pipe(babel())
    .pipe(src('src/test.js'))
    .pipe(dest('output/'))
    .pipe(uglifyes())
    .pipe(dest('output'));
}

exports.order = series(sayHello, sayBye);

exports.concu = parallel(sayHello, sayBye);

exports.deal = dealJs;

exports.dealSrc = dealNestSrc;

exports.dealNestDest = dealNestDest;

// exports.default = parallel(sayHello, sayBye);
