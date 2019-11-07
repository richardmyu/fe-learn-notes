/*
	_.isNaN(value)
	  - 检查 value 是否是 NaN。

	注意: 这个方法基于 Number.isNaN，和全局的 isNaN 不同之处在于，全局的 isNaN对 于 undefined 和其他非数字的值返回 true。

	参数
	  - value (*): 要检查的值。

	返回
	  - (boolean): 如果 value 是一个 NaN，那么返回 true，否则返回 false。

	例子
		_.isNaN(NaN);
		// => true

		_.isNaN(new Number(NaN));
		// => true

		isNaN(undefined);
		// => true

		_.isNaN(undefined);
		// => false
*/
