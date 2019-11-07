/*
	_.isBuffer(value)
	  - 检查 value 是否是个 buffer。

	参数
	  - value (*): 要检查的值。

	返回
	  - (boolean): 如果 value 是一个buffer，那么返回 true，否则返回 false。

	例子
		_.isBuffer(new Buffer(2));
		// => true

		_.isBuffer(new Uint8Array(2));
		// => false
*/
