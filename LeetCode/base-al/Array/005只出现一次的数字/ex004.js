// 执行用时为 84 ms 的范例
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    nums.sort();
    var l = nums.length;
     if (l==1){
            return nums[0]
        }
    for(var i = 1; i < l; i++){

        if (nums[0] != nums[1]){
            return nums[0]
        }

        if ((nums[i] != nums[i+1]) && (nums[i] != nums[i-1])){
            return nums[i]
        }
    }
};