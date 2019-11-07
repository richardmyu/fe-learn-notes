/*
	_.reduceRight(collection, [iteratee=_.identity], [accumulator])
	  - 这个方法类似 _.reduce ，除了它是从右到左遍历collection（集合）中的元素的。

	参数
	  - collection (Array|Object): 用来迭代的集合。
	  - [iteratee=_.identity] (Function): 每次迭代调用的函数。
	  - [accumulator] (*): 初始值。

	返回
	  - (*): 返回累加后的值。

	例子
		var array = [[0, 1], [2, 3], [4, 5]];

		_.reduceRight(array, function(flattened, other) {
			return flattened.concat(other);
		}, []);
		// => [4, 5, 2, 3, 0, 1]
*/
