/*
	_.lastIndexOf(array, value, [fromIndex=array.length-1])
	  - 这个方法类似 _.indexOf ，区别是它是从右到左遍历array的元素。

	参数
	  - array (Array): 要搜索的数组。
	  - value (*): 要搜索的值。
	  - [fromIndex=array.length-1] (number): 开始搜索的索引值。

	返回值
	  - (number): 返回匹配值的索引值，否则返回 -1。

	例子
		_.lastIndexOf([1, 2, 1, 2], 2);
		// => 3

		// Search from the `fromIndex`.
		_.lastIndexOf([1, 2, 1, 2], 2, 2);
		// => 1
*/
