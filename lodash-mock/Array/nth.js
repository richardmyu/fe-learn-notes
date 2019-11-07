/*
	_.nth(array, [n=0])
	  - 获取array数组的第n个元素。如果n为负数，则返回从数组结尾开始的第n个元素。

	参数
	  - array (Array): 要查询的数组。
	  - [n=0] (number): 要返回元素的索引值。

	返回值
	  - (*): 获取array数组的第n个元素。

	例子
		var array = ['a', 'b', 'c', 'd'];

		_.nth(array, 1);
		// => 'b'

		_.nth(array, -2);
		// => 'c';
*/
