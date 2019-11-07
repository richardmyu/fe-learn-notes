/*
	_.isEmpty(value)
	  - 检查 value 是否为一个空对象，集合，映射或者set。 判断的依据是除非是有枚举属性的对象，length 大于 0 的 arguments object, array, string 或类jquery选择器。

	对象如果被认为为空，那么他们没有自己的可枚举属性的对象。

	类数组值，比如 arguments对象，array，buffer，string或者类jQuery集合的length 为 0，被认为是空。类似的，map（映射）和set 的size 为 0，被认为是空。

	参数
	  - value (*): 要检查的值。

	返回
	  - (boolean): 如果 value 为空，那么返回 true，否则返回 false。

	例子
		_.isEmpty(null);
		// => true

		_.isEmpty(true);
		// => true

		_.isEmpty(1);
		// => true

		_.isEmpty([1, 2, 3]);
		// => false

		_.isEmpty({ 'a': 1 });
		// => false
*/
