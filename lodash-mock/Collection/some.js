/*
	_.some(collection, [predicate=_.identity])
	  - 通过 predicate（断言函数） 检查collection（集合）中的元素是否存在 任意 truthy（真值）的元素，一旦 predicate（断言函数） 返回 truthy（真值），遍历就停止。 predicate 调用3个参数：(value, index|key, collection)。

	参数
	  - collection (Array|Object): 用来迭代的集合。
	  - [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。

	返回
	  - (boolean): 如果任意元素经 predicate 检查都为 truthy（真值），返回 true ，否则返回 false 。

	例子
		_.some([null, 0, 'yes', false], Boolean);
		// => true

		var users = [
			{ 'user': 'barney', 'active': true },
			{ 'user': 'fred',   'active': false }
		];

		// The `_.matches` iteratee shorthand.
		_.some(users, { 'user': 'barney', 'active': false });
		// => false

		// The `_.matchesProperty` iteratee shorthand.
		_.some(users, ['active', false]);
		// => true

		// The `_.property` iteratee shorthand.
		_.some(users, 'active');
		// => true
*/
