/*
var removeDuplicates = function(nums) {
  for (let i = 0, length = nums.length; i < length; i++) {
    if (nums.slice(i + 1, length).includes(nums[i])) {
      nums = nums.slice(0, i).concat(nums.slice(i + 1, -1));
    }
  }
  return nums;
};

let nums = [0, 1, 1, 2, 3, 2];
let nums1 = [0, 1, 1, 2, 2, 2];
let nums2 = [0, 1, 1, 2, 3, 2, 3];
let nums3 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
console.log(removeDuplicates(nums));  
// [0, 1, 2, 3]
console.log(removeDuplicates(nums1));
// [0, 1]
console.log(removeDuplicates(nums2));
// [0, 1, 3]
console.log(removeDuplicates(nums3));
// [0, 1, 1, 2]

*/

var removeDuplicates = function(nums) {
  nums.forEach(function(item, index) {
    let newnums = nums.slice(0, index).concat(nums.slice(index + 1, -1));
    if (newnums.includes(item)) {
      let i = newnums.indexOf(item) + 1;
      nums = nums.slice(0, i).concat(nums.slice(i + 1, -1));
    }
  });
  return nums;
};

let nums = [0, 1, 1, 2, 3, 2];
let nums1 = [0, 1, 1, 2, 2, 2];
let nums2 = [0, 1, 1, 2, 3, 2, 3];
let nums3 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
// console.log(removeDuplicates(nums));
// [0, 1, 2, 3]
console.log(removeDuplicates(nums1));
// [0, 1]
// console.log(removeDuplicates(nums2));
// [0, 1, 2]
// console.log(removeDuplicates(nums3));
// [0, 1]
