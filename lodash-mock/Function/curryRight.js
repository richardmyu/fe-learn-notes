/*
	_.curryRight(func, [arity=func.length])
	  - 这个方法类似 _.curry。 除了它接受参数的方式用 _.partialRight 代替了 _.partial。

	_.curryRight.placeholder值，默认是以 _ 作为附加部分参数的占位符。

	Note: 这个方法不会设置 curried 函数的 "length" 属性。

	参数
	  - func (Function): 用来柯里化（curry）的函数。
	  - [arity=func.length] (number): 需要提供给 func 的参数数量。

	返回
	  - (Function): 返回新的柯里化（curry）函数。

	例子
		var abc = function(a, b, c) {
			return [a, b, c];
		};

		var curried = _.curryRight(abc);

		curried(3)(2)(1);
		// => [1, 2, 3]

		curried(2, 3)(1);
		// => [1, 2, 3]

		curried(1, 2, 3);
		// => [1, 2, 3]

		// Curried with placeholders.
		curried(3)(1, _)(2);
		// => [1, 2, 3]
*/
