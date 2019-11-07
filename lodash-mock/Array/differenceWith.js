const assert = require('assert').strict
const _ = require('lodash')
const tool = require('../util/index')

/*
	_.differenceWith(array, [values], [comparator])
	  - 这个方法类似 _.difference ，除了它接受一个 comparator （比较器），它调用比较array，values中的元素。 结果值是从第一数组中选择。comparator 调用参数有两个：(arrVal, othVal)。

	Note: 不像 _.pullAllWith, 这个方法会返回一个新数组。

	参数
	  - array (Array): 要检查的数组。
	  - [values] (...Array): 排除的值。
	  - [comparator] (Function): comparator 调用每个元素。

	返回值
	  - (Array): 返回一个过滤值后的新数组。

	例子
		var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];

		_.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
		// => [{ 'x': 2, 'y': 1 }]
*/
