//字典
function Dictionary() {
  let items = {};

  //has
  this.has = function (key) {
    // return key in items;
    return items.hasOwnProperty(key);
  };

  //set(key,value)
  this.set = function (key, value) {
    items[key] = value;
  };

  //delete
  this.delete = function (key) {
    if (this.has(key)) {
      delete items[key];
      return true;
    }
    return false;
  };

  //get
  this.get = function (key) {
    return this.has(key) ? items[key] : undefined;
  };

  //values
  this.values = function (key) {
    let values = [];
    for (let k in items) {
      if (this.has(k)) {
        values.push(items[k]);
      }
    }
    return values;
  };

  //keys
  this.keys = function () {
    return Object.keys(items);
  }

  //clear
  this.clear = function () {
    items = {};
  }

  //size
  this.size = function () {
    return Object.keys(items).length;
  }

  //each
  this.each = function (fn) {
    for (let k in items) {
      if (this.has(k)) {
        fn(k, items[k]);
      }
    }
  };

  //getItems
  this.getItems = function () {
    return items;
  }
}

var dictionary = new Dictionary();

dictionary.set('Gandalf', 'gandalf@email.com');
dictionary.set('John', 'johnsnow@email.com');
dictionary.set('Tyrion', 'tyrion@email.com');

console.log(dictionary.has('Gandalf'));//true
console.log(dictionary.size());//3

console.log(dictionary.keys());//["Gandalf", "John", "Tyrion"]
console.log(dictionary.values());// ["gandalf@email.com", "johnsnow@email.com", "tyrion@email.com"]
console.log(dictionary.get('Tyrion')); //tyrion@email.com

dictionary.delete('John');

console.log(dictionary.keys());//["Gandalf", "Tyrion"]
console.log(dictionary.values());//["gandalf@email.com", "tyrion@email.com"]

console.log(dictionary.getItems());//Object {Gandalf: "gandalf@email.com", Tyrion: "tyrion@email.com"}