const { src, dest, series, parallel } = require("gulp");
const babel = require('gulp-babel');
const uglifyes = require('gulp-uglify-es').default;
const rename = require('gulp-rename');

function sayHello(cb) {
  console.log('Hello world');
  // cb(new Error('no hello'));
  cb();
}

// async await 方案
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

// 分段输出
function segmentOutput() {
  return src('src/index.js')
    .pipe(babel())
    .pipe(dest('output/'))
    .pipe(uglifyes())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('output/'));
}

// 取反
function negateGlob() {
  return src(['src/**/*.js', '!src/vendor/*.js', 'src/vendor/index.js'])
    .pipe(babel())
    .pipe(uglifyes())
    .pipe(dest('output/'));
}

function negateGlobTwo() {
  return src(['**/*.js', '!node_modules/**/*.js'])
    .pipe(babel())
    .pipe(uglifyes())
    .pipe(dest('output/'));
}

exports.seriesFn = series(sayHello, sayBye);

exports.parallelFn = parallel(sayHello, sayBye);

exports.deal = dealJs;

exports.dealSrc = dealNestSrc;

exports.segmentOutput = segmentOutput;

exports.negateGlob = negateGlob;

exports.negateGlobTwo = negateGlobTwo;

exports.default = parallel(sayHello, sayBye);
