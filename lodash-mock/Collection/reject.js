/*
	_.reject(collection, [predicate=_.identity])
	  - _.filter的反向方法;此方法 返回 predicate（断言函数） 不 返回 truthy（真值）的collection（集合）元素（注：非真）。

	参数
	  - collection (Array|Object): 用来迭代的集合。
	  - [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。

	返回
	  - (Array): 返回过滤后的新数组

	例子
		var users = [
			{ 'user': 'barney', 'age': 36, 'active': false },
			{ 'user': 'fred',   'age': 40, 'active': true }
		];

		_.reject(users, function(o) { return !o.active; });
		// => objects for ['fred']

		// `_.matches` 迭代简写
		_.reject(users, { 'age': 40, 'active': true });
		// => objects for ['barney']

		// `_.matchesProperty` 迭代简写
		_.reject(users, ['active', false]);
		// => objects for ['fred']

		// `_.property` 迭代简写
		_.reject(users, 'active');
		// => objects for ['barney']
*/
