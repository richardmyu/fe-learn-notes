/*
	_.every(collection, [predicate=_.identity])
	  - 通过 predicate（断言函数） 检查 collection（集合）中的 所有 元素是否都返回真值。一旦 predicate（断言函数） 返回假值，迭代就马上停止。predicate（断言函数）调用三个参数： (value, index|key, collection)。

	注意: 这个方法对于对于 空集合返回 true，因为空集合的 任何元素都是 true 。

	参数
	  - collection (Array|Object): 一个用来迭代的集合。
	  - [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。

	返回
	  - (boolean): 如果所有元素经 predicate（断言函数） 检查后都都返回真值，那么就返回true，否则返回 false 。

	例子
		_.every([true, 1, null, 'yes'], Boolean);
		// => false

		var users = [
			{ 'user': 'barney', 'age': 36, 'active': false },
			{ 'user': 'fred',   'age': 40, 'active': false }
		];

		// The `_.matches` iteratee shorthand.
		_.every(users, { 'user': 'barney', 'active': false });
		// => false

		// The `_.matchesProperty` iteratee shorthand.
		_.every(users, ['active', false]);
		// => true

		// The `_.property` iteratee shorthand.
		_.every(users, 'active');
		// => false
*/
