/*let set=new Set();

set.add(1);
console.log(set.values());//SetIterator {1}
console.log(set.has(1));//true
console.log(set.size);//1

set.add(2);
console.log(set.values());//SetIterator {1,2}
console.log(set.has(2));//true
console.log(set.size);//2

set.delete(1);
console.log(set.values());//SetIterator {}
console.log(set.size);//1

set.delete(2);
console.log(set.values());//SetIterator {}
console.log(set.size);//0*/


let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

let setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);

//用Set类模拟并集、交集、差集、子集等

//---union---
let unionAB = new Set();
for (let x of setA)
  unionAB.add(x);
for (let x of setB) {
  unionAB.add(x);
}
console.log(unionAB);//Set(4) {1, 2, 3, 4}

//---intersection--
let intersection = function (setA, setB) {
  let intersectionSet = new Set();
  for (let x of setA) {
    if (setB.has(x)) {
      intersectionSet.add(x);
    }
  }
  return intersectionSet;
};
let intersectionAB = intersection(setA, setB);
console.log(intersectionAB);//Set(2) {2, 3}

/*
let intersectionAtoB = new Set([y for (y of setA) if (setB.has(y))]);
console.log(intersectionAtoB);*/

//---difference---
let difference = function (setA, setB) {
  let differenceSet = new Set();
  for (let x of setA) {
    if (!setB.has(x)) {
      differenceSet.add(x);
    }
  }
  return differenceSet;
};
let differenceAB = difference(setA, setB);
console.log(differenceAB);//Set(1) {1}
