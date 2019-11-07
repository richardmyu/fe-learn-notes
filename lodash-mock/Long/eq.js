/*
	_.eq(value, other)
	  - 执行 SameValueZero 比较两者的值，来确定它们是否相等。

	参数
	  - value (*): 要比较的值。
	  - other (*): 另一个要比较的值。

	返回
	  - (boolean): 如果两个值相等返回 true ，否则返回 false 。

	例子
		var object = { 'a': 1 };
		var other = { 'a': 1 };

		_.eq(object, object);
		// => true

		_.eq(object, other);
		// => false

		_.eq('a', 'a');
		// => true

		_.eq('a', Object('a'));
		// => false

		_.eq(NaN, NaN);
		// => true
*/
