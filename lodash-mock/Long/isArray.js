/*
	_.isArray(value)
	  - 检查 value 是否是 Array 类对象。

	参数
	  - value (*): 要检查的值。

	返回
	  - (boolean): 如果value是一个数组返回 true，否则返回 false。

	例子
		_.isArray([1, 2, 3]);
		// => true

		_.isArray(document.body.children);
		// => false

		_.isArray('abc');
		// => false

		_.isArray(_.noop);
		// => false
*/
