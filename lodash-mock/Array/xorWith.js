/*
	_.xorWith([arrays], [comparator])
	  - 该方法是像 _.xor，除了它接受一个 comparator ，以调用比较数组的元素。 comparator 调用2个参数：(arrVal, othVal).

	参数
	  - [arrays] (...Array): 要检查的数组。
	  - [comparator] (Function): 调用每一个元素的比较函数。

	返回
	  - (Array): 返回过滤值后的新数组。

	例子
		var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
		var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];

		_.xorWith(objects, others, _.isEqual);
		// => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
*/
