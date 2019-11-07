/*
	_.isArrayBuffer(value)
	  - 检查 value 是否是 ArrayBuffer 对象。

	参数
	  - value (*): 要检查的值。

	返回
	  - (boolean): 如果value是一个数组 buffer 返回 true，否则返回 false。

	例子
		_.isArrayBuffer(new ArrayBuffer(2));
		// => true

		_.isArrayBuffer(new Array(2));
		// => false
*/
