/*
	_.sortedLastIndexBy(array, value, [iteratee=_.identity])
	  - 这个方法类似 _.sortedLastIndex ，除了它接受一个 iteratee （迭代函数），调用每一个数组（array）元素，返回结果和value 值比较来计算排序。iteratee 会传入一个参数：(value)。

	参数
	  - array (Array): 要检查的排序数组。
	  - value (*): 要评估的值。
	  - [iteratee=_.identity] (Array|Function|Object|string): 迭代函数，调用每个元素。

	返回
	  - (number): 返回 value值 应该在数组array中插入的索引位置 index。

	例子
		var objects = [{ 'x': 4 }, { 'x': 5 }];

		_.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
		// => 1

		// The `_.property` iteratee shorthand.
		_.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
		// => 1
*/
