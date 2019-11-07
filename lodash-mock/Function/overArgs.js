/*
	_.overArgs(func, [transforms=[_.identity]])
	  - 创建一个函数，调用func时参数为相对应的transforms的返回值。

	参数
	  - func (Function):要包裹的函数。

	返回
	  - (Function): 返回新函数。

	例子
		function doubled(n) {
			return n * 2;
		}

		function square(n) {
			return n * n;
		}

		var func = _.overArgs(function(x, y) {
			return [x, y];
		}, [square, doubled]);

		func(9, 3);
		// => [81, 6]

		func(10, 5);
		// => [100, 10]
*/
