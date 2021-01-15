const { src, symlink } = require('gulp');

// operation not permitted, symlink???
function link() {
  return src('src/*.js')
    .pipe(symlink('output/'));
}

exports.link = link;
