/*
	_.isArguments(value)
	  - 检查 value 是否是一个类 arguments 对象。

	参数
	  - value (*): 要检查的值。

	返回
	  - (boolean): 如果value是一个 arguments 对象 返回 true，否则返回 false。

	例子
		_.isArguments(function() { return arguments; }());
		// => true

		_.isArguments([1, 2, 3]);
		// => false
*/
