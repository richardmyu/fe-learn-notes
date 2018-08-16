//let
let movie = 'Lord of the Rings';

function starWarsFan() {
  let movie = 'Star wars';
  return movie;
}

function marvelFan() {
  movie = 'The Avengers';
  return movie;
}

function blizzardFan() {
  let isFan = true;
  let phrase = 'Warcraft';
  console.log('Before if: ' + phrase);
  if (isFan) {
    let phrase = 'initial text';
    phrase = 'For the Horde!';
    console.log('Inside if: ' + phrase);
  }
  phrase = 'For the Alliance!';
  console.log('After if: ' + phrase);
}

console.log(movie); //'Lord of the Rings'
console.log(starWarsFan()); //'Star wars'
console.log(marvelFan()); //'The Avengers'
console.log(movie); //'The Avengers'
blizzardFan();
//Before if: Warcraft
//Inside if: For the Horde!
//After if: For the Alliance!


//函数的参数默认值
function threeSum(x = 1, y = 3, z = 5) {
  return x + y + z;
}

console.log(threeSum(0, 1)); //6

//声明展开
//ES5:用apply()函数把数组转化为参数
var param = [1, 3, 5];
console.log(threeSum.apply(undefined, param)); //9

//ES6:用展开运算符(...)
console.log(threeSum(...param)); //9

//在函数中(...)也可以代替arguments，当做剩余参数
function restParaFn(x, y, ...a) {
  return (x + y) * a.length;
}

console.log(restParaFn(1, 2, 3, 'a', [1, 2, 3])); //9

//等价
function restParamFn(x, y) {
  var a = Array.prototype.slice.call(arguments, 2);
  return (x + y) * a.length;
}

console.log(restParamFn(1, 2, 3, 4)); //6

