const { parallel } = require('gulp');

console.log('111');

const copyRight = require('./footer.js');
const initLogo = require('./header.js');

console.log('222');

// exports.default = copyRight;

exports.default = parallel(copyRight, initLogo);

console.log('333');
