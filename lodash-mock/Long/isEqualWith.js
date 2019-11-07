/*
	_.isEqualWith(value, other, [customizer])
	  - 这个方法类似 _.isEqual。 除了它接受一个 customizer 用来定制比较值。 如果 customizer 返回 undefined 将会比较处理方法代替。 customizer 会传入6个参数：(objValue, othValue [, index|key, object, other, stack])

	参数
	  - value (*): 用来比较的值。
	  - other (*): 另一个用来比较的值。
	  - [customizer] (Function): 用来定制比较值的函数。

	返回
	  - (boolean): 如果 两个值完全相同，那么返回 true，否则返回 false。

	例子
	function isGreeting(value) {
		return /^h(?:i|ello)$/.test(value);
	}

	function customizer(objValue, othValue) {
		if (isGreeting(objValue) && isGreeting(othValue)) {
			return true;
		}
	}

	var array = ['hello', 'goodbye'];
	var other = ['hi', 'goodbye'];

	_.isEqualWith(array, other, customizer);
	// => true
*/
