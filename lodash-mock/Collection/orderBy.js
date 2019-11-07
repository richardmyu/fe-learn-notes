/*
	_.orderBy(collection, [iteratees=[_.identity]], [orders])
	  - 此方法类似于 _.sortBy，除了它允许指定 iteratee（迭代函数）结果如何排序。 如果没指定 orders（排序），所有值以升序排序。 否则，指定为"desc" 降序，或者指定为 "asc" 升序，排序对应值。

	参数
	  - collection (Array|Object): 用来迭代的集合。
	  - [iteratees=[_.identity]] (Array[]|Function[]|Object[]|string[]): 排序的迭代函数。
	  - [orders] (string[]): iteratees迭代函数的排序顺序。

	返回
	  - (Array): 排序排序后的新数组。

	例子
		var users = [
			{ 'user': 'fred',   'age': 48 },
			{ 'user': 'barney', 'age': 34 },
			{ 'user': 'fred',   'age': 40 },
			{ 'user': 'barney', 'age': 36 }
		];

		// 以 `user` 升序排序 再  `age` 以降序排序。
		_.orderBy(users, ['user', 'age'], ['asc', 'desc']);
		// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
*/
