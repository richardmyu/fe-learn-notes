/*
	_.uniqWith(array, [comparator])
	  - 这个方法类似 _.uniq， 除了它接受一个 comparator 调用比较arrays数组的每一个元素。 comparator 调用时会传入2个参数： (arrVal, othVal)。

	参数
	  - array (Array): 要检查的数组。
	  - [comparator] (Function): 比较函数，调用每个元素。

	返回
	  - (Array): 返回新的去重后的数组。

	例子
		var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];

		_.uniqWith(objects, _.isEqual);
		// => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
*/
