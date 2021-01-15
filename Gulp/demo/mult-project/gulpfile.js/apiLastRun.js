const { src, dest, lastRun, watch } = require('gulp');
const uglify = require('gulp-uglify');

function lastR() {
  return src('src/*.js', { since: lastRun(lastR) })
    .pipe(uglify())
    .pipe(dest('output/'));
}

exports.lastR = lastR;
