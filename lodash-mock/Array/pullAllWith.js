/*
	_.pullAllWith(array, values, [comparator])
	  - 这个方法类似于 _.pullAll，区别是这个方法接受 comparator 调用array中的元素和values比较。comparator 会传入两个参数：(arrVal, othVal)。

	注意: 和 _.differenceWith 不同, 这个方法会改变数组 array。

	参数
	  - array (Array): 要修改的数组。
	  - values (Array): 要移除值的数组。
	  - [comparator] (Function): comparator（比较器）调用每个元素。

	返回值
	  - (Array): 返回 array。

	例子
	var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];

	_.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
	console.log(array);
	// => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
*/
