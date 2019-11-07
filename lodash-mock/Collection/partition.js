/*
	_.partition(collection, [predicate=_.identity])
	  - 创建一个分成两组的元素数组，第一组包含predicate（断言函数）返回为 truthy（真值）的元素，第二组包含predicate（断言函数）返回为 falsey（假值）的元素。predicate 调用1个参数：(value)。

	参数
	  - collection (Array|Object): 用来迭代的集合。
	  - [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。

	返回
	  - (Array): 返回元素分组后的数组。

	例子
		var users = [
			{ 'user': 'barney',  'age': 36, 'active': false },
			{ 'user': 'fred',    'age': 40, 'active': true },
			{ 'user': 'pebbles', 'age': 1,  'active': false }
		];

		_.partition(users, function(o) { return o.active; });
		// => objects for [['fred'], ['barney', 'pebbles']]

		// The `_.matches` iteratee shorthand.
		_.partition(users, { 'age': 1, 'active': false });
		// => objects for [['pebbles'], ['barney', 'fred']]

		// The `_.matchesProperty` iteratee shorthand.
		_.partition(users, ['active', false]);
		// => objects for [['barney', 'pebbles'], ['fred']]

		// The `_.property` iteratee shorthand.
		_.partition(users, 'active');
		// => objects for [['fred'], ['barney', 'pebbles']]
*/
