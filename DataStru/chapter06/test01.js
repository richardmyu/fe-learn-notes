/*
* 集合是无须且唯一的项的组成
* */

function Set() {
  let items = {};
  this.has = function (value) {
    // return value in items;
    //更推荐
    return items.hasOwnProperty(value);
  };

  this.add = function (value) {
    if (!this.has(value)) {
      //同时作为键和值，有利于查找
      items[value] = value;
      return true;
    }
    return false;
  };

  this.remove = function (value) {
    if (this.has(value)) {
      delete items[value];
      return true;
    }
    return false;
  };

  this.clear = function () {
    items = {};
  };

  this.size = function () {
    return Object.keys(items).length;
  };

  this.sizeLegacy = function () {
    let count = 0;
    for (let key in items) {
      if (items.hasOwnProperty(key)) {
        ++count;
      }
    }
    return count;
  };

  this.values = function () {
    let values = [];
    for (let i = 0, keys = Object.keys(items); i < keys.length; i++) {
      values.push(items[keys[i]]);
    }
    return values;
  };

  this.valuesLegacy = function () {
    let values = [];
    for (let key in items) {
      if (items.hasOwnPorperty(key)) {
        values.push(items[key]);
      }
    }
    return values;
  };

  this.getItems = function () {
    return items;
  };

  //并集
  this.union = function (otherSet) {
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
  };

  //交集
  this.intersection = function (otherSet) {
    let intersectionSet = new Set();
    let values = this.values();
    for (let i = 0; i < values.length; i++) {
      console.log(values[i]);
      if (otherSet.has(values[i])) {
        intersectionSet.add(values[i]);
      }
    }
    return intersectionSet;
  };

  //差集
  this.difference = function (otherSet) {
    let differenceSet = new Set();
    let values = this.values();
    for (let i = 0; i < values.length; i++) {
      if (!otherSet.has(values[i])) {
        differenceSet.add(values[i]);
      }
    }
    return differenceSet;
  };

  //子集
  this.subset = function (otherSet) {
    if (this.size() > otherSet.size()) {
      return false;
    } else {
      let values = this.values();
      for (let i = 0; i < values.length; i++) {
        if (!otherSet.has(values[i])) {
          return false;
        }
      }
      return true;
    }
  };
};

let set = new Set();
set.add(1);
console.log(set.values());//[1]
console.log(set.has(1));//true
console.log(set.size());//1
set.add(2);
console.log(set.values());//[1, 2]
console.log(set.has(2));//true
console.log(set.size());//2
set.remove(1);
console.log(set.values());//[2]
set.remove(2);
console.log(set.values());//[]

let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
let setB = new Set();
setB.add(4);
setB.add(5);
setB.add(6);
let unionAB = setA.union(setB);
console.log(unionAB.values());

let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
let setB = new Set();
setB.add(2);
setB.add(3);
setB.add(6);

let intersectionAB = setA.intersection(setB);
console.log(intersectionAB.values());

let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
let setB = new Set();
setB.add(2);
setB.add(3);
setB.add(6);

let differenceAB = setA.difference(setB);
console.log(differenceAB.values());

let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
let setB = new Set();
setB.add(2);
setB.add(3);
setB.add(6);
let setC = new Set();
setC.add(2);
setC.add(6);

console.log(setA.subset(setB));
console.log(setA.subset(setC));
console.log(setC.subset(setB));
