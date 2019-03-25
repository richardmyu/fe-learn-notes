//排序
let nums = [1, 3, 5, 7, 11, 13];

//1.逆序
nums.reverse();
console.log(nums); //[13, 11, 7, 5, 3, 1]

//2.ASCII序
nums.sort();
console.log(nums); //[1, 11, 13, 3, 5, 7]

nums.sort(function (a, b) {
  return a - b;
})
console.log(nums); // [1, 3, 5, 7, 11, 13]

//自定义排序
const friends = [
  {name: 'John', age: 30},
  {name: 'Ana', age: 20},
  {name: 'Chris', age: 25}
];

function comparePerson(a, b) {
  if (a.age < b.age) {
    return -1;
  } else if (a.age > b.age) {
    return 1;
  } else {
    return 0;
  }
}

console.log(friends.sort(comparePerson));
//0: {name: "Ana", age: 20}
//1: {name: "Chris", age: 25}
//2: {name: "John", age: 30}

//字符串排序
const name = ['Ana', 'John', 'ana', 'john'];
console.log(name.sort()); //["Ana", "John", "ana", "john"]

name.sort(function (a, b) {
  if (a.toLowerCase() < a.toLowerCase()) {
    return -1;
  } else if (a.toLowerCase() > b.toLowerCase()) {
    return 1;
  } else {
    return 0;
  }
});
console.log(name); //["Ana", "ana", "John", "john"]

//search
let numbs = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

function multOf13(ele, index, array) {
  return (ele % 13 === 0) ? true : false;
}

console.log(numbs.find(multOf13));//13
console.log(numbs.findIndex(multOf13));//6

function multOf14(ele, index, array) {
  return (ele % 14 === 0) ? true : false;
}

console.log(numbs.find(multOf14));//undefined
console.log(numbs.findIndex(multOf14));//-1


let num = [2, 4, 5, 7, 9];

function multOf(ele, index, array) {
  console.log(ele);   //2
  console.log(index); //0
  console.log(array); //[2, 4, 5, 7, 9]
  return (ele % 2 === 0) ? true : false;
}

console.log(num.find(multOf));//2
console.log(num.findIndex(multOf));//0

//includes
let num = [1, 3, 5, 7, 9];
console.log(num.includes(3)); //true
console.log(num.includes(3,3)); //false
console.log(num.includes(3,1)); //true

console.log(num.toString()); //1,3,5,7,9
console.log(num.join('-')); //1-3-5-7-9
console.log(num.join(',')); //1,3,5,7,9
console.log(num.join('')); //13579
console.log(num.join(' ')); //1 3 5 7 9

//类型数组

let int16 = new Int16Array(5);
console.log(int16); //Int16Array [ 0, 0, 0, 0, 0 ]

let array16 = [];
array16.length = length;
for (let i = 0; i < length; i++) {
  int16[i] = i + 1;
}
console.log(int16);
