const assert = require('assert').strict
const _ = require('lodash')
const tool = require('../util/index')

/*
	_.dropWhile(array, [predicate=_.identity])
	  - 创建一个切片数组，去除array中从起点开始到 predicate 返回假值结束部分。predicate 会传入3个参数： (value, index, array)。

	参数
	  - array (Array): 要查询的数组。
	  - [predicate=_.identity] (Function): 这个函数会在每一次迭代调用。

	返回值
	  - (Array): 返回array剩余切片。

	例子
		var users = [
			{ 'user': 'barney',  'active': false },
			{ 'user': 'fred',    'active': false },
			{ 'user': 'pebbles', 'active': true }
		];

		_.dropWhile(users, function(o) { return !o.active; });
		// => objects for ['pebbles']

		// The `_.matches` iteratee shorthand.
		_.dropWhile(users, { 'user': 'barney', 'active': false });
		// => objects for ['fred', 'pebbles']

		// The `_.matchesProperty` iteratee shorthand.
		_.dropWhile(users, ['active', false]);
		// => objects for ['pebbles']

		// The `_.property` iteratee shorthand.
		_.dropWhile(users, 'active');
		// => objects for ['barney', 'fred', 'pebbles']
*/
