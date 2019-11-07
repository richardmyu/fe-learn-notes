/*
	_.reduce(collection, [iteratee=_.identity], [accumulator])
	  - 压缩 collection（集合）为一个值，通过 iteratee（迭代函数）遍历 collection（集合）中的每个元素，每次返回的值会作为下一次迭代使用(作为iteratee（迭代函数）的第一个参数使用)。 如果没有提供 accumulator，则 collection（集合）中的第一个元素作为初始值。(accumulator参数在第一次迭代的时候作为iteratee（迭代函数）第一个参数使用。) iteratee 调用4个参数：
	(accumulator, value, index|key, collection).

	lodash 中有许多方法是防止作为其他方法的迭代函数（即不能作为iteratee参数传递给其他方法），例如： _.reduce, _.reduceRight, 和 _.transform。

	受保护的方法有（即这些方法不能使用 _.reduce, _.reduceRight, 和 _.transform作为 iteratee 迭代函数参数）：

	assign, defaults, defaultsDeep, includes, merge, orderBy, 和 sortBy

	参数
	  - collection (Array|Object): 用来迭代的集合。
	  - [iteratee=_.identity] (Function): 每次迭代调用的函数。
	  - [accumulator] (*): 初始值。

	返回
	  - (*): 返回累加后的值。

	例子
		_.reduce([1, 2], function(sum, n) {
			return sum + n;
		}, 0);
		// => 3

		_.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
			(result[value] || (result[value] = [])).push(key);
			return result;
		}, {});
		// => { '1': ['a', 'c'], '2': ['b'] } (无法保证遍历的顺序)
*/
