/*
	_.unzipWith(array, [iteratee=_.identity])
	  - 此方法类似于 _.unzip，除了它接受一个iteratee指定重组值应该如何被组合。iteratee 调用时会传入每个分组的值： (...group)。

	参数
	  - array (Array): 要处理的分组元素数组。
	  - [iteratee=_.identity] (Function): 这个函数用来组合重组的值。

	返回
	  - (Array): 返回重组元素的新数组。

	例子
		var zipped = _.zip([1, 2], [10, 20], [100, 200]);
		// => [[1, 10, 100], [2, 20, 200]]

		_.unzipWith(zipped, _.add);
		// => [3, 30, 300]
*/
