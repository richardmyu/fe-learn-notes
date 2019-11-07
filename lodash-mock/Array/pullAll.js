/*
	_.pullAll(array, values)
	  - 这个方法类似 _.pull，区别是这个方法接收一个要移除值的数组。

	Note: 不同于 _.difference, 这个方法会改变数组 array。

	参数
	  - array (Array): 要修改的数组。
	  - values (Array): 要移除值的数组。

	返回值
	  - (Array): 返回 array。

	例子
		var array = [1, 2, 3, 1, 2, 3];

		_.pullAll(array, [2, 3]);
		console.log(array);
		// => [1, 1]
*/
