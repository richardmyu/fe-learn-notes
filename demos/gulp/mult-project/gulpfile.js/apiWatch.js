const { src, dest, watch } = require('gulp');

function watchStart() {
  const watcher = watch('src/index.js');

  watcher.on('change', function (path, stats) {
    console.log(`File ${path} was changed`);
  });

  watcher.on('add', function (path, stats) {
    console.log(`File ${path} was added`);
  });

  watcher.on('unlink', function (path, stats) {
    console.log(`File ${path} was removed`);
  });

  // watcher.close();
  return src('src/*.js')
    .pipe(dest('output/'));
}

exports.watchStart = watchStart;
