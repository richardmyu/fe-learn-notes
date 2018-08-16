//for...of
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
for (let n of numbers) {
  console.log(n, (n % 2 === 0) ? 'even' : 'odd');
}

//ES6为Array类增加了一个属性:@@iterator
//迭代器 @@iterator
//通过Symbol.iterator来访问
let iterator = numbers[Symbol.iterator]();
console.dir(iterator);//Array Iterator {}
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);
//...
console.log(iterator.next().value);//unde


//entries返回包含键值对的@@iterator
let aEntries = numbers.entries();
console.log(aEntries);//Array Iterator {}
console.log(aEntries.next().value);//[0, 1]
console.log(aEntries.next().value);//[1, 2]
console.log(aEntries.next().value);//[2, 3]

//key方法返回包含数组索引的@@iterator
let aKeys = numbers.keys();
console.log(aKeys);//Array Iterator {}
console.log(aKeys.next());//{value: 0, done: false}
console.log(aKeys.next());//{value: 1, done: false}
console.log(aKeys.next());//{value: 2, done: false}
//...
console.log(aKeys.next());//{value: undefined, done: true}

//value方法返回的@@iterator包含数组的值
let aValues = numbers.values();
console.log(aValues.next());
console.log(aValues.next());
console.log(aValues.next());
console.log(aValues.next());
console.log(aValues.next());
console.log(aValues.next());
console.log(aValues.next());
console.log(aValues.next());
console.log(aValues.next());
console.log(aValues.next());

//chrome、firefox不支持values

//Array.of

let params = [1, 3, 5, 7, 9, 11];
let nums = Array.of(...params);
console.log(nums);

//fill 静态填充数组
let numsCopy = Array.of(1, 3, 5, 7, 9, 11);
console.log(numsCopy); //[1, 3, 5, 7, 9, 11]
numsCopy.fill(0);
console.log(numsCopy); //[0, 0, 0, 0, 0, 0]
numsCopy.fill(2, 2);
console.log(numsCopy); //[0, 0, 2, 2, 2, 2]
numsCopy.fill(1, 3, 5);
console.log(numsCopy); //[0, 0, 2, 1, 1, 2]

//copyWithin
let copyArray = [2, 4, 6, 8, 10, 12];
copyArray.copyWithin(0, 3);
console.log(copyArray); //[8, 10, 12, 8, 10, 12]

let copyA = [1, 2, 3, 4, 5, 6];
copyA.copyWithin(1, 3, 5);
console.log(copyA); //[1, 4, 5, 4, 5, 6]

let copyB = [1, 2, 3, 4, 5, 6];
copyB.copyWithin(1, 3, 6);
console.log(copyB); //[1, 4, 5, 6, 5, 6]