/*
	_.isEqual(value, other)
	  - 执行深比较来确定两者的值是否相等。

	**注意: **这个方法支持比较 arrays, array buffers, booleans, date objects, error objects, maps, numbers, Object objects, regexes, sets, strings, symbols, 以及 typed arrays. Object 对象值比较自身的属性，不包括继承的和可枚举的属性。 不支持函数和DOM节点比较。

	参数
	  - value (*): 用来比较的值。
	  - other (*): 另一个用来比较的值。

	返回
	  - (boolean): 如果 两个值完全相同，那么返回 true，否则返回 false。

	例子
		var object = { 'a': 1 };
		var other = { 'a': 1 };

		_.isEqual(object, other);
		// => true

		object === other;
		// => false
*/
