/*
	_.conformsTo(object, source)
	  - 通过调用断言source的属性与 object 的相应属性值，检查 object是否符合 source。当source偏应用时，这种方法和 _.conforms函数是等价的。

	注意: 当source为偏应用时，这种方法等价于 _.conforms。（关于偏应用大家可以自己到google上搜索一下）。

	参数
	  - object (Object): 要检查的对象。
	  - source (Object): 要断言属性是否符合的对象。

	返回
	  - (boolean): 如果 object 符合，返回 true，否则 false。

	例子
		var object = { 'a': 1, 'b': 2 };

		_.conformsTo(object, { 'b': function(n) { return n > 1; } });
		// => true

		_.conformsTo(object, { 'b': function(n) { return n > 2; } });
		// => false
*/
