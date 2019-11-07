/*
	_.takeRight(array, [n=1])
	  - 创建一个数组切片，从array数组的最后一个元素开始提取n个元素。

	参数
	  - array (Array): 要检索的数组。
	  - [n=1] (number): 要提取的元素个数。

	返回
	  - (Array): 返回 array 数组的切片（从结尾元素开始n个元素）。

	例子
		_.takeRight([1, 2, 3]);
		// => [3]

		_.takeRight([1, 2, 3], 2);
		// => [2, 3]

		_.takeRight([1, 2, 3], 5);
		// => [1, 2, 3]

		_.takeRight([1, 2, 3], 0);
		// => []
*/
