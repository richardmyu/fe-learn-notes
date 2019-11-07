/*
	_.sortedUniqBy(array, [iteratee])
	  - 这个方法类似 _.uniqBy，除了它会优化排序数组。

	参数
	  - array (Array): 要检查的数组。
	  - [iteratee] (Function): 迭代函数，调用每个元素。

	返回
	  - (Array): 返回一个新的不重复的数组。

	例子
		_.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
		// => [1.1, 2.3]
*/
