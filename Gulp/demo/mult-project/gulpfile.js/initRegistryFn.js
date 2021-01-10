'use strict';

function InitRegistryFn() {
  if (this instanceof InitRegistryFn === false) {
    return new InitRegistryFn();
  }

  this._tasks = {};
}

InitRegistryFn.prototype.init = function init(taker) { };

InitRegistryFn.prototype.get = function get(name) {
  return this._tasks[name];
};

InitRegistryFn.prototype.set = function set(name, fn) {
  return this._tasks[name] = fn;
};

InitRegistryFn.prototype.tasks = function tasks() {
  var self = this;

  return Object.keys(this._tasks).reduce(function (tasks, name) {
    tasks[name] = self.get(name);
    return tasks;
  }, {});
};

module.exports = InitRegistryFn;
