/*
	_.sortedIndex(array, value)
	  - 使用二进制的方式检索来决定 value值 应该插入到数组中 尽可能小的索引位置，以保证array的排序。

	参数
	  - array (Array): 要检查的排序数组。
	  - value (*): 要评估的值。

	返回
	  - (number): 返回 value值 应该在数组array中插入的索引位置 index。

	例子
		_.sortedIndex([30, 50], 40);
		// => 1
*/
