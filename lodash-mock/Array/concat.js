const assert = require('assert').strict
const _ = require('lodash')
const tool = require('../util/index')

/*
	_.concat(array, [values])
	  - 创建一个新数组，将array与任何数组 或 值连接在一起。

	参数
	  - array (Array): 被连接的数组。
	  - [values] (...*): 连接的值。

	返回值
	  - (Array): 返回连接后的新数组。

	例子
		var array = [1];
		var other = _.concat(array, 2, [3], [[4]]);

		console.log(other);
		// => [1, 2, 3, [4]]

		console.log(array);
		// => [1]
*/
