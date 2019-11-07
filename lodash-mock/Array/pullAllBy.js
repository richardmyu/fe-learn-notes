/*
	_.pullAllBy(array, values, [iteratee=_.identity])
	  - 这个方法类似于 _.pullAll ，区别是这个方法接受一个 iteratee（迭代函数） 调用 array 和 values的每个值以产生一个值，通过产生的值进行了比较。iteratee 会传入一个参数： (value)。

	Note: 不同于 _.differenceBy, 这个方法会改变数组 array。

	参数
	  - array (Array): 要修改的数组。
	  - values (Array): 要移除值的数组。
	  - [iteratee=_.identity] (Array|Function|Object|string): iteratee（迭代器）调用每个元素。

	返回值
	  - (Array): 返回 array.

	例子
		var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];

		_.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
		console.log(array);
		// => [{ 'x': 2 }]
*/
