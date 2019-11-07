/*
	_.invokeMap(collection, path, [args])
	  - 调用path（路径）上的方法处理 collection(集合)中的每个元素，返回一个数组，包含每次调用方法得到的结果。任何附加的参数提供给每个被调用的方法。如果methodName（方法名）是一个函数，每次调用函数时，内部的 this 指向集合中的每个元素。

	参数
	  - collection (Array|Object): 用来迭代的集合。
	  - path (Array|Function|string): 用来调用方法的路径 或 者每次迭代调用的函数。
	  - [args] (...*): 调用每个方法的参数。

	返回
	  - (Array): 返回的结果数组。

	例子
		_.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
		// => [[1, 5, 7], [1, 2, 3]]

		_.invokeMap([123, 456], String.prototype.split, '');
		// => [['1', '2', '3'], ['4', '5', '6']]
*/
