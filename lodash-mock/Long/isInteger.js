/*
	_.isInteger(value)
	  - 检查 value 是否为一个整数。

	注意: 这个方法基于 Number.isInteger.

	参数
	  - value (*): 要检查的值。

	返回
	  - (boolean): 如果 value 是一个整数，那么返回 true，否则返回 false。

	例子
		_.isInteger(3);
		// => true

		_.isInteger(Number.MIN_VALUE);
		// => false

		_.isInteger(Infinity);
		// => false

		_.isInteger('3');
		// => false
*/
