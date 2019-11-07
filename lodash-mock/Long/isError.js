/*
	_.isError(value)
	  - 检查 value 是否是 Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, 或者 URIError对象。

	参数
	  - value (*): 要检查的值。

	返回
	  - (boolean): 如果 value 是一个错误（Error）对象，那么返回 true，否则返回 false。

	例子
		_.isError(new Error);
		// => true

		_.isError(Error);
		// => false
*/
