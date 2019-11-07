const assert = require('assert').strict
const _ = require('lodash')
const tool = require('../util/index')

/*
	_.flattenDeep(array)
	  - 将array递归为一维数组。

	参数
	  - array (Array): 需要处理的数组。

	返回值
	  - (Array): 返回一个的新一维数组。

	例子
		_.flattenDeep([1, [2, [3, [4]], 5]]);
		// => [1, 2, 3, 4, 5]
*/
