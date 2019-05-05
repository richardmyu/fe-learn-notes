// 执行用时为 56 ms 的范例
/**
 * @param {number[]} nums
 * @return {number}
 */
// ^ 异或运算符
// 两数同为 0
// 两数异为 1
// 任何数值异或 0 为其本身
// ...
var singleNumber = function (nums) {
    var res;
    console.log("res: ",res)
    nums.forEach(function (v) {
      console.log("v: ", v);
        res = res ^ v;
        console.log("res: ", res);
    });
    return res;
};

console.log(singleNumber([2, 2, 1]));
console.log(singleNumber([4, 2, 1, 2, 1]));
console.log(singleNumber([1, 2, 3, 2, 4, 1, 3]));