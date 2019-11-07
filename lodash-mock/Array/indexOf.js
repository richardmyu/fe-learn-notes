/*
	_.indexOf(array, value, [fromIndex=0])
	  - 使用 SameValueZero 等值比较，返回首次 value 在数组array中被找到的 索引值， 如果 fromIndex 为负值，将从数组array尾端索引进行匹配。

	参数
	  - array (Array): 需要查找的数组。
	  - value (*): 需要查找的值。
	  - [fromIndex=0] (number): 开始查询的位置。

	返回值
	  - (number): 返回 值value在数组中的索引位置, 没有找到为返回-1。

	例子
		_.indexOf([1, 2, 1, 2], 2);
		// => 1

		// Search from the `fromIndex`.
		_.indexOf([1, 2, 1, 2], 2, 2);
		// => 3
*/
