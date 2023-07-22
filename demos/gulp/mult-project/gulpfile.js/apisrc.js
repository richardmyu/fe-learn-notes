const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');

// 内敛资源映射
function sourcemapInner() {
  return src('src/*.js', { sourcemaps: true })
    .pipe(uglify())
    .pipe(dest('output/', { sourcemaps: true }))
}

// 外部资源映射
function sourcemapOuter() {
  return src('src/*.js', { sourcemaps: true })
    .pipe(uglify())
    .pipe(dest('output/', { sourcemaps: '.' }))
}

exports.sourcemapInner = sourcemapInner;
exports.sourcemapOuter = sourcemapOuter;
