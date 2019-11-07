/*
	_.flatMapDeep(collection, [iteratee=_.identity])
	  - 这个方法类似 _.flatMap 不同之处在于， _.flatMapDeep 会继续扁平化递归映射的结果。

	参数
	  - collection (Array|Object): 一个用来迭代的集合。
	  - [iteratee=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。

	返回
	  - (Array): 返回新扁平化数组。

	例子
		function duplicate(n) {
			return [[[n, n]]];
		}

		_.flatMapDeep([1, 2], duplicate);
		// => [1, 1, 2, 2]
*/
