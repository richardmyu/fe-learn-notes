/*
	_.takeRightWhile(array, [predicate=_.identity])
	从array数组的最后一个元素开始提取元素，直到 predicate 返回假值。predicate 会传入三个参数： (value, index, array)。

	参数
	array (Array): 要检索的数组。
	[predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。

	返回
	(Array): 返回 array 数组的切片。

	例子
		var users = [
			{ 'user': 'barney',  'active': true },
			{ 'user': 'fred',    'active': false },
			{ 'user': 'pebbles', 'active': false }
		];

		_.takeRightWhile(users, function(o) { return !o.active; });
		// => objects for ['fred', 'pebbles']

		// The `_.matches` iteratee shorthand.
		_.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
		// => objects for ['pebbles']

		// The `_.matchesProperty` iteratee shorthand.
		_.takeRightWhile(users, ['active', false]);
		// => objects for ['fred', 'pebbles']

		// The `_.property` iteratee shorthand.
		_.takeRightWhile(users, 'active');
		// => []
*/
