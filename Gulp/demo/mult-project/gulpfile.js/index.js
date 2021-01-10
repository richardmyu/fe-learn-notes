const { registry, series, parallel, task } = require('gulp');
const CommonRegistry = require('./commonRegistry');
const InitRegistryClass = require('./initRegistryClass');
const InitRegistryFn = require('./initRegistryFn');
const util = require('util');

// CommonRegistry
registry(new CommonRegistry({ buildDir: '../dist' }));

task('build', series('clean', function test(cb) {
  console.log('do something');
  cb();
}));



// InitRegistryFn
function MyRegistryFn() {
  InitRegistryFn.call(this);
}

util.inherits(MyRegistryFn, InitRegistryFn);

MyRegistryFn.prototype.init = function (gulpInst) {
  gulpInst.task('sayHello', async function () {
    console.log('will say hello');
    await Promise.resolve();
  })
}

registry(new MyRegistryFn());

task('my-fn', series('sayHello', function (cb) {
  console.log('oh, my-fn');
  cb();
}));

// InitRegistryClass
class MyRegistryClass extends InitRegistryClass {
  constructor() {
    super();
  }
  init(gulpInst) {
    gulpInst.task('sayHello', async function () {
      console.log('will say hello');
      await Promise.resolve();
    })
  }
}

registry(new MyRegistryClass());

task('my-class', series('sayHello', function (cb) {
  console.log('oh, my-class');
  cb();
}));

exports.default = parallel('build', 'my-fn', 'my-class');
