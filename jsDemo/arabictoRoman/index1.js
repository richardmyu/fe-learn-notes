// 看到一篇文章后，也是解决这个问题，不过人家用的是贪心算法，我把代码转换为js代码添上

class Solution {
  constructor() {
    this.highDigit = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    this.symStr = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  }

  toRoman(num) {
    let roman = '';
    for (let i = 0; i < this.highDigit.length; i++) {
      // 取最高位数字
      let count = Math.floor(num / this.highDigit[i]);

      // 存在则拼接
      while (count > 0) {
        roman += this.symStr[i];
        count--;
      }

      // 检测下一位
      num %= this.highDigit[i];
    }
    return roman;
  }
};

let solu = new Solution();
console.log(solu.toRoman(19)); //XIX
console.log(solu.toRoman(20)); //XX
console.log(solu.toRoman(45)); //XLV
console.log(solu.toRoman(908)); //CMVIII
console.log(solu.toRoman(1980)); //MCMLXXX