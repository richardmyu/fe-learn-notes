const assert = require('assert').strict
const _ = require('lodash')
const tool = require('../util/index')

/*
	_.findLastIndex(array, [predicate=_.identity], [fromIndex=array.length-1])
	  - 这个方式类似 _.findIndex， 区别是它是从右到左的迭代集合array中的元素。

	参数
	  - array (Array): 要搜索的数组。
	  - [predicate=_.identity] (Array|Function|Object|string): 这个函数会在每一次迭代调用。
	  - [fromIndex=array.length-1] (number): The index to search from.

	返回值
	  - (number): 返回找到元素的 索引值（index），否则返回 -1。

	例子
		var users = [
			{ 'user': 'barney',  'active': true },
			{ 'user': 'fred',    'active': false },
			{ 'user': 'pebbles', 'active': false }
		];

		_.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
		// => 2

		// The `_.matches` iteratee shorthand.
		_.findLastIndex(users, { 'user': 'barney', 'active': true });
		// => 0

		// The `_.matchesProperty` iteratee shorthand.
		_.findLastIndex(users, ['active', false]);
		// => 2

		// The `_.property` iteratee shorthand.
		_.findLastIndex(users, 'active');
		// => 0
*/
