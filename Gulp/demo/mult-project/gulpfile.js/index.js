const { registry, series, parallel, task } = require('gulp');
const registryTask = require('./registry').default;
const { sourcemapInner, sourcemapOuter } = require('./apisrc');
const { link } = require('./apiSymlink');
const { lastR } = require('./apiLastRun');

exports.registryTask = registryTask;
exports.sourcemapInner = sourcemapInner;
exports.sourcemapOuter = sourcemapOuter;
exports.link = link;
exports.lastR = lastR;
