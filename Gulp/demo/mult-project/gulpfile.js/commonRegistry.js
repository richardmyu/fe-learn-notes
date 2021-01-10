const fs = require('fs');
const util = require('util');

// Default registry in gulp 4.
const DefaultRegistry = require('undertaker-registry');
// Delete files and directories using globs
const del = require('del');

//
function CommonRegistry(opts) {
  DefaultRegistry.call(this);
  opts = opts || {};
  this.buildDir = opts.buildDir || './build';
}

// 原型继承
util.inherits(CommonRegistry, DefaultRegistry);

CommonRegistry.prototype.init = function (gulpInst) {
  const buildDir = this.buildDir;
  const exists = fs.existsSync(buildDir);

  // if (!exists) {
  //   throw new Error('Directory exists.');
  // }

  gulpInst.task('clean', function () {
    return del([buildDir]);
  });
}

module.exports = CommonRegistry;
