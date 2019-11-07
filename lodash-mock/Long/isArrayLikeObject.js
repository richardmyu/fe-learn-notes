/*
	_.isArrayLikeObject(value)
	  - 这个方法类似 _.isArrayLike。除了它还检查value是否是个对象。

	参数
	  - value (*): 要检查的值。

	返回
	  - (boolean): 如果 value 是一个类数组对象，那么返回 true，否则返回 false。

	例子
		_.isArrayLikeObject([1, 2, 3]);
		// => true

		_.isArrayLikeObject(document.body.children);
		// => true

		_.isArrayLikeObject('abc');
		// => false

		_.isArrayLikeObject(_.noop);
		// => false
*/
