const { parallel } = require('gulp');

console.log('111');

const copyRight = require('./footer.js').default;
const initLogo = require('./header.js').default;

console.log('222');

// exports.default = copyRight;

console.log(copyRight, initLogo);
exports.default = parallel(copyRight, initLogo);

console.log('333');
