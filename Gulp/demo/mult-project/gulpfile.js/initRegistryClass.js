class InitRegistryClass {
  constructor() {
    this._tasks = {};
  }

  init(gulpInst) { }

  get(name) {
    return this._tasks[name];
  }

  set(name, fn) {
    return this._tasks[name] = fn;
  }

  tasks() {
    var self = this;
    return Object.keys(this._tasks).reduce(function (tasks, name) {
      tasks[name] = self.get(name);
      return tasks;
    }, {});
  }
}

module.exports = InitRegistryClass;
