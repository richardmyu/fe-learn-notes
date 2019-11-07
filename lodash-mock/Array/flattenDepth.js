/*
	_.flattenDepth(array, [depth=1])
	  - 根据 depth 递归减少 array 的嵌套层级

	参数
	  - array (Array): 需要减少嵌套层级的数组。
	  - [depth=1] (number):最多减少的嵌套层级数。

	返回值
	  - (Array): 返回减少嵌套层级后的新数组。

	例子
		var array = [1, [2, [3, [4]], 5]];

		_.flattenDepth(array, 1);
		// => [1, 2, [3, [4]], 5]

		_.flattenDepth(array, 2);
		// => [1, 2, 3, [4], 5]
*/
