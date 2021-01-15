const registryTask = require('./registry').default;
const { sourcemapInner, sourcemapOuter } = require('./apisrc');
const { link } = require('./apiSymlink');
const { lastR } = require('./apiLastRun');
const { watchStart } = require('./apiWatch');
const { createVinyl } = require('./apiVinyl');

exports.registryTask = registryTask;
exports.sourcemapInner = sourcemapInner;
exports.sourcemapOuter = sourcemapOuter;
exports.link = link;
exports.lastR = lastR;
exports.watchStart = watchStart;
exports.createVinyl = createVinyl;

