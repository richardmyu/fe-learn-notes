const assert = require('assert').strict
const _ = require('lodash')
const tool = require('../util/index')

/*
	_.fill(array, value, [start=0], [end=array.length])
	  - 使用 value 值来填充（替换） array，从start位置开始, 到end位置结束（但不包含end位置）。

	Note: 这个方法会改变 array（不是创建新数组）。

	参数
	  - array (Array): 要填充改变的数组。
	  - value (*): 填充给 array 的值。
	  - [start=0] (number): 开始位置（默认0）。
	  - [end=array.length] (number):结束位置（默认array.length）。

	返回值
	  - (Array): 返回 array。

	例子
		var array = [1, 2, 3];

		_.fill(array, 'a');
		console.log(array);
		// => ['a', 'a', 'a']

		_.fill(Array(3), 2);
		// => [2, 2, 2]

		_.fill([4, 6, 8, 10], '*', 1, 3);
		// => [4, '*', '*', 10]
*/
