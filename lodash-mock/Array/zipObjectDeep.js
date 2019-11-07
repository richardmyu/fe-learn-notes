/*
	_.zipObjectDeep([props=[]], [values=[]])
	  - 这个方法类似 _.zipObject，除了它支持属性路径。

	参数
	  - [props=[]] (Array): 属性标识符（属性名）。
	  - [values=[]] (Array): 属性值。

	返回
	  - (Object): 返回新对象。

	例子
		_.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
		// => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
*/
