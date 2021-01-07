console.log('111');

const copyRight = require('./footer.js');
const initLogo = require('./header.js');

console.log('222');

const { task, parallel } = require('gulp');
console.log('333');

// exports.default = copyRight;

// exports.default = parallel(copyRight, initLogo);
task('default', parallel(copyRight, initLogo));
