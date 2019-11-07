/*
	_.flatMap(collection, [iteratee=_.identity])
	  - 创建一个扁平化（同阶数组）的数组，这个数组的值来自collection（集合）中的每一个值经过 iteratee（迭代函数） 处理后返回的结果，并且扁平化合并。 iteratee 调用三个参数： (value, index|key, collection)。

	参数
	  - collection (Array|Object): 一个用来迭代遍历的集合。
	  - [iteratee=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。

	返回
	  - (Array): 返回新扁平化数组。

	例子
		function duplicate(n) {
			return [n, n];
		}

		_.flatMap([1, 2], duplicate);
		// => [1, 1, 2, 2]
*/
