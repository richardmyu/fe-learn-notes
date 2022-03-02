let averageTemp = [];
averageTemp[0] = 31.9;
averageTemp[1] = 35.3;
averageTemp[2] = 42.4;
averageTemp[3] = 52;
averageTemp[4] = 60.8;
console.log(averageTemp);

let fibonacci = [];
fibonacci[1] = 1;
fibonacci[2] = 2;
for (let i = 3; i < 20; i++) {
  fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
}
for (let i = 1; i < fibonacci.length; i++) {
  console.log(fibonacci[i]);
}

function aryAdd(ary, ...params) {
  for (let i = 0; i < params.length; i++) {
    // ary[length+i]=params[i];
    ary.push(params[i]);
  }
  return ary;
}

console.log(aryAdd([], 1, 2, 3, 4, 5));

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
for (let i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i + 1];
}
console.log(numbers);
//numbers[i-1]=numbers[i]; ==>
//[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, -1: 1]
//numbers[i]=numbers[i+1]; ==>
//[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, undefined]

//二维和多维数组
let averageTemps = [];
averageTemps[0] = [72, 75, 79, 79, 81, 81];
averageTemps[1] = [81, 79, 75, 75, 73, 72];
console.log(averageTemps);

function printMatrix(myMat) {
  for (var i = 0; i < myMat.length; i++) {
    for (var j = 0; j < myMat[i].length; j++) {
      console.log(myMat[i][j]);
    }
  }
}

printMatrix(averageTemps);

let matrix3x3x3 = [];
for (var i = 0; i < 3; i++) {
  matrix3x3x3[i] = [];
  for (var j = 0; j < 3; j++) {
    matrix3x3x3[i][j] = [];
    for (var z = 0; z < 3; z++) {
      matrix3x3x3[i][j][z] = i + j + z;
    }
  }
}
console.log(matrix3x3x3);

















