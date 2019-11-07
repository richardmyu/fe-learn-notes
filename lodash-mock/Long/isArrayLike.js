/*
	_.isArrayLike(value)
	  - 检查 value 是否是类数组。 如果一个值被认为是类数组，那么它不是一个函数，并且value.length是个整数，大于等于 0，小于或等于 Number.MAX_SAFE_INTEGER。

	参数
	  - value (*): 要检查的值。

	返回
	  - (boolean): 如果value是一个类数组，那么返回 true，否则返回 false。

	例子
		_.isArrayLike([1, 2, 3]);
		// => true

		_.isArrayLike(document.body.children);
		// => true

		_.isArrayLike('abc');
		// => true

		_.isArrayLike(_.noop);
		// => false
*/
