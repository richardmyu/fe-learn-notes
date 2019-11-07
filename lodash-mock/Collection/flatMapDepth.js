/*
	_.flatMapDepth(collection, [iteratee=_.identity], [depth=1])
	  - 该方法类似 _.flatMap，不同之处在于， _.flatMapDepth 会根据指定的 depth（递归深度）继续扁平化递归映射结果。

	参数
	  - collection (Array|Object): 一个用来迭代的集合。
	  - [iteratee=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。
	  - [depth=1] (number): 最大递归深度。

	返回
	  - (Array): 返回新扁平化数组。

	例子
		function duplicate(n) {
			return [[[n, n]]];
		}

		_.flatMapDepth([1, 2], duplicate, 2);
		// => [[1, 1], [2, 2]]
*/
