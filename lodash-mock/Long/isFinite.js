/*
	_.isFinite(value)
	  - 检查 value 是否是原始有限数值。

	** 注意:** 这个方法基于 Number.isFinite.

	参数
	  - value (*): 要检查的值。

	返回
	  - (boolean): 如果 value 是一个有限数值，那么返回 true，否则返回 false。

	例子
		_.isFinite(3);
		// => true

		_.isFinite(Number.MIN_VALUE);
		// => true

		_.isFinite(Infinity);
		// => false

		_.isFinite('3');
		// => false
*/
