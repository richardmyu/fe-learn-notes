/*
	_.unionWith([arrays], [comparator])
	  - 这个方法类似 _.union， 除了它接受一个 comparator 调用比较arrays数组的每一个元素。 comparator 调用时会传入2个参数： (arrVal, othVal)。

	参数
	  - [arrays] (...Array): 要检查的数组。
	  - [comparator] (Function): 比较函数，调用每个元素。

	返回
	  - (Array): 返回一个新的联合数组。

	例子
		var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
		var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];

		_.unionWith(objects, others, _.isEqual);
		// => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 },
*/
