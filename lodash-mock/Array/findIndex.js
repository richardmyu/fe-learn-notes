const assert = require('assert').strict
const _ = require('lodash')
const tool = require('../util/index')

/*
	_.findIndex(array, [predicate=_.identity], [fromIndex=0])
	  - 该方法类似 _.find，区别是该方法返回第一个通过 predicate 判断为真值的元素的索引值（index），而不是元素本身。

	参数
	  - array (Array): 要搜索的数组。
	  - [predicate=_.identity] (Array|Function|Object|string): 这个函数会在每一次迭代调用。
	  - [fromIndex=0] (number): The index to search from.

	返回值
	  - (number): 返回找到元素的 索引值（index），否则返回 -1。

	例子
		var users = [
			{ 'user': 'barney',  'active': false },
			{ 'user': 'fred',    'active': false },
			{ 'user': 'pebbles', 'active': true }
		];

		_.findIndex(users, function(o) { return o.user == 'barney'; });
		// => 0

		// The `_.matches` iteratee shorthand.
		_.findIndex(users, { 'user': 'fred', 'active': false });
		// => 1

		// The `_.matchesProperty` iteratee shorthand.
		_.findIndex(users, ['active', false]);
		// => 0

		// The `_.property` iteratee shorthand.
		_.findIndex(users, 'active');
		// => 2
*/
