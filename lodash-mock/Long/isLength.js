/*
	_.isLength(value)
	  - 检查 value 是否为有效的类数组长度。

	注意: 这个函数基于 ToLength.

	参数
	  - value (*): 要检查的值。

	返回
	  - (boolean): 如果 value 是一个有效长度，那么返回 true，否则返回 false。

	例子
		_.isLength(3);
		// => true

		_.isLength(Number.MIN_VALUE);
		// => false

		_.isLength(Infinity);
		// => false

		_.isLength('3');
		// => false
*/
