let Set = (function () {
  const items = new WeakMap();

  class Set {
    constructor() {
      items.set(this, {});
    }

    add(value) {
      if (!this.has(value)) {
        let items_ = items.get(this);
        items_[value] = value;
        return true;
      }
      return false;
    }

    remove(value) {
      if (this.has(value)) {
        let items_ = items.get(this);
        delete items_[value];
        return true;
      }
      return false;
    }

    has(value) {
      let items_ = items.get(this);
      return items_.hasOwnProperty(value);
    }

    clear() {
      items.set(this, {});
    }

    size() {
      let items_ = items.get(this);
      return Object.keys(items_).length;
    }

    values() {
      let values = [];
      let items_ = items.get(this);
      for (let i = 0, keys = Object.keys(items_); i < keys.length; i++) {
        values.push(items_[keys[i]]);
      }
      return values;
    }

    getItems() {
      return items.get(this);
    }

    union(otherSet) {
      let unionSet = new Set();
      let values = this.values();
      for (let i = 0; i < values.length; i++) {
        unionSet.add(values[i]);
      }
      values = otherSet.values();
      for (let i = 0; i < values.length; i++) {
        unionSet.add(values[i]);
      }
      return unionSet;
    }

    intersection(otherSet) {
      let intersectionSet = new Set();
      let values = this.values();
      for (let i = 0; i < values.length; i++) {
        if (otherSet.has(values[i])) {
          intersectionSet.add(values[i]);
        }
      }
      return intersectionSet;
    }

    difference(otherSet) {
      let differenSet = new Set();
      let values = this.values();
      for (let i = 0; i < values.length; i++) {
        if (!otherSet.has(values[i])) {
          differenceSet.add(values[i]);
        }
      }
      return differenSet;
    }

    subset(otherSet) {
      if (this.size() > otherSet.size()) {
        return false;
      } else {
        let values = this.values();
        for (let i = 0; i < values.length;
          i++
        ) {
          if (!otherSet.has(values[i])) {
            return false;
          }
        }
        return true;
      }
    };
  }

  return Set;
})();

let set = new Set();

set.add(1);
console.log(set.values()); // outputs [1]
console.log(set.has(1)); // outputs true
console.log(set.size()); // outputs 1

set.add(2);
console.log(set.values()); // outputs [1, 2]
console.log(set.has(2)); // true
console.log(set.size()); // 2

set.remove(1);
console.log(set.values()); // outputs [2]

set.remove(2);
console.log(set.values()); // outputs []
