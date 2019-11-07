/*
	_.intersectionBy([arrays], [iteratee=_.identity])
    - 这个方法类似 _.intersection，区别是它接受一个 iteratee 调用每一个arrays的每个值以产生一个值，通过产生的值进行了比较。结果值是从第一数组中选择。iteratee 会传入一个参数：(value)。

	参数
	  - [arrays] (...Array): 待检查的数组。
	  - [iteratee=_.identity] (Array|Function|Object|string): iteratee（迭代器）调用每个元素。

	返回值
	  - (Array): 返回一个包含所有传入数组交集元素的新数组。

	例子
		_.intersectionBy([2.1, 1.2], [4.3, 2.4], Math.floor);
		// => [2.1]

		// The `_.property` iteratee shorthand.
		_.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
		// => [{ 'x': 1 }]
*/
