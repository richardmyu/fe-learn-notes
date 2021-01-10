const { registry, series, task } = require('gulp');
const CommonRegistry = require('./commonRegistry');

registry(new CommonRegistry({ buildDir: '../dist' }));

task('build', series('clean', function test(cb) {
  console.log('do something');
  cb();
}));
