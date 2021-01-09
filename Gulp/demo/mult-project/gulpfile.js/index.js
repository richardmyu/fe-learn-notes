const { parallel } = require('gulp');

const copyRight = require('./footer.js').default;
const initLogo = require('./header.js').default;

exports.default = parallel(copyRight, initLogo);
