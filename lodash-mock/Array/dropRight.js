const assert = require('assert').strict
const _ = require('lodash')
const tool = require('../util/index')

/*
	_.dropRight(array, [n=1])
	  - 创建一个切片数组，去除array尾部的n个元素。（n默认值为1。）

	参数
	  - array (Array): 要查询的数组。
	  - [n=1] (number): 要去除的元素个数。

	返回值
	  - (Array): 返回array剩余切片。

	例子
		_.dropRight([1, 2, 3]);
		// => [1, 2]

		_.dropRight([1, 2, 3], 2);
		// => [1]

		_.dropRight([1, 2, 3], 5);
		// => []

		_.dropRight([1, 2, 3], 0);
		// => [1, 2, 3]
*/
