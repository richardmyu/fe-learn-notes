/*
	_.zipObject([props=[]], [values=[]])
	  - 这个方法类似 _.fromPairs，除了它接受2个数组，第一个数组中的值作为属性标识符（属性名），第二个数组中的值作为相应的属性值。

	参数
	  - [props=[]] (Array): The property identifiers.
	  - [values=[]] (Array): The property values.

	返回
	  - (Object): Returns the new object.

	例子
		_.zipObject(['a', 'b'], [1, 2]);
		// => { 'a': 1, 'b': 2 }
*/
