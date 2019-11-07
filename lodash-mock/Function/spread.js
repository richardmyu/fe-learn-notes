/*
	_.spread(func, [start=0])
	  - 创建一个函数，调用func时，this绑定到创建的新函数，把参数作为数组传入，类似于 Function#apply.

	Note: 这个方法基于 spread operator.

	参数
	  - func (Function): 要应用传播参数的函数。
	  - [start=0] (number): spread 参数的开始位置.

	返回
	  - (Function): 返回新的函数。

	例子
		var say = _.spread(function(who, what) {
			return who + ' says ' + what;
		});

		say(['fred', 'hello']);
		// => 'fred says hello'

		var numbers = Promise.all([
			Promise.resolve(40),
			Promise.resolve(36)
		]);

		numbers.then(_.spread(function(x, y) {
			return x + y;
		}));
		// => a Promise of 76
*/
