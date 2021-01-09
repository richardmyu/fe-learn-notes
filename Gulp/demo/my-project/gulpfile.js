const { src, dest, series, parallel, watch } = require("gulp");
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const gulpIf = require('gulp-if');
const through2 = require('through2');
const uglifyJs = require('uglify-js');

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
    .pipe(uglify())
    .pipe(dest('output/'));
}

// 分段输出
function segmentOutput() {
  return src('src/index.js')
    .pipe(babel())
    .pipe(dest('output/'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('output/'));
}

// 取反
function negateGlob() {
  return src(['src/**/*.js', '!src/vendor/*.js', 'src/vendor/index.js'])
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest('output/'));
}

function negateGlobTwo() {
  return src(['**/*.js', '!node_modules/**/*.js'])
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest('output/'));
}

// 插件条件
function isJs(file) {
  console.log('=============== start ====================');
  console.log(file.extname);
  console.log('--------------------');
  console.log(file.contents);
  console.log('--------------------');
  console.log(file);
  console.log('================ end =====================');
  return file.extname === '.js';
}
// 只对 JavaScript 文件应用 gulp-uglify 插件
function pluginCondition() {
  return src('src/*.*')
    .pipe(gulpIf(isJs, uglify()))
    .pipe(dest('output/'));
}

// 内联插件/一次性转换流
// 创建一个内联插件，从而避免使用 gulp-uglify 插件
function inlineStream() {
  return src('src/*.js')
    .pipe(through2.obj(function (file, _, cb) {
      if (file.isBuffer()) {
        const { code } = uglifyJs.minify(file.contents.toString());
        console.log(code);
        file.contents = Buffer.from(code);
      }
      cb(null, file)
    }))
    .pipe(dest('output/'));
}

// 不报错，无法执行
function setT() {
  setTimeout(function () {
    return src('src/*.js')
      .pipe(uglify())
      .pipe(dest('output/'));
  }, 300)
}

// 文件监测
//   初始次执行
// watch('src/**.js', { ignoreInitial: true }, inlineStream);
// watch('src/**.js', { ignoreInitial: false }, inlineStream);

//   队列
// watch('src/**.js', { queue: true }, inlineStream);
// watch('src/**.js', { queue: false }, setT);


exports.seriesFn = series(sayHello, sayBye);

exports.parallelFn = parallel(sayHello, sayBye);

exports.deal = dealJs;

exports.dealSrc = dealNestSrc;

exports.segmentOutput = segmentOutput;

exports.negateGlob = negateGlob;

exports.negateGlobTwo = negateGlobTwo;

exports.pluginCondition = pluginCondition;

exports.inlineStream = inlineStream;

exports.default = sayHello;
