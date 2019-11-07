const assert = require('assert').strict
const _ = require('lodash')
const tool = require('../util/index')

/*
	_.flatten(array)
	  - 减少一级array嵌套深度。

	参数
	  - array (Array): 需要减少嵌套层级的数组。

	返回值
	  - (Array): 返回减少嵌套层级后的新数组。

	例子
		_.flatten([1, [2, [3, [4]], 5]]);
		// => [1, 2, [3, [4]], 5]
*/
