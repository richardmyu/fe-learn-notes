const Vinyl = require('vinyl');
// const assert = require('assert').strict;

function createVinyl(cb) {
  const file = new Vinyl({
    cwd: '/',
    base: '/test/',
    path: '/test/file.js',
    contents: Buffer.from('var x = 123;')
  });

  // assert.strictEqual(file.relative, 'file.js');
  console.log(file.relative === 'file.js');

  console.log(file.dirname === '/test');
  console.log(file.dirname = '/specs');
  console.log(file.path === '/specs/file.js');

  console.log(file.basename === 'file.js');
  console.log(file.basename = 'file.txt');
  console.log(file.path === '/specs/file.txt');

  console.log(file.stem === 'file');
  console.log(file.stem = 'foo');
  console.log(file.path === '/specs/foo.txt');
  console.log(file.extname === '.txt');
  console.log(file.extname = '.js');
  console.log(file.path === '/specs/file.js');

  // Vinyl.isVinyl
  console.log('--- Vinyl.isVinyl ---');
  console.log(Vinyl.isVinyl(file));
  console.log(Vinyl.isVinyl({}));

  // Vinyl.isCustomProp
  console.log('--- Vinyl.isCustomProp ---');
  console.log(Vinyl.isCustomProp('sourceMap') === true);
  console.log(Vinyl.isCustomProp('path') === false);

  cb();
}

exports.createVinyl = createVinyl;
