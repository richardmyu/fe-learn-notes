/*
	_.sortBy(collection, [iteratees=[_.identity]])
	  - 创建一个元素数组。 以 iteratee 处理的结果升序排序。 这个方法执行稳定排序，也就是说相同元素会保持原始排序。 iteratees 调用1个参数： (value)。

	参数
	  - collection (Array|Object): 用来迭代的集合。
	  - [iteratees=[_.identity]] (...(Array|Array[]|Function|Function[]|Object|Object[]|string|string[])): 这个函数决定排序。

	返回
	  - (Array): 返回排序后的数组。

	例子
		var users = [
			{ 'user': 'fred',   'age': 48 },
			{ 'user': 'barney', 'age': 36 },
			{ 'user': 'fred',   'age': 40 },
			{ 'user': 'barney', 'age': 34 }
		];

		_.sortBy(users, function(o) { return o.user; });
		// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]

		_.sortBy(users, ['user', 'age']);
		// => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]

		_.sortBy(users, 'user', function(o) {
			return Math.floor(o.age / 10);
		});
		// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
*/
