/*
	_.pullAt(array, [indexes])
	  - 根据索引 indexes，移除array中对应的元素，并返回被移除元素的数组。

	Note: 和 _.at不同, 这个方法会改变数组 array。

	参数
	  - array (Array): 要修改的数组。
	  - [indexes] (...(number|number[])): 要移除元素的索引。

	返回值
	  - (Array): 返回移除元素组成的新数组。

	例子
		var array = [5, 10, 15, 20];
		var evens = _.pullAt(array, 1, 3);

		console.log(array);
		// => [5, 15]

		console.log(evens);
		// => [10, 20]
*/
