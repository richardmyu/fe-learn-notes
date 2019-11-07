/*
	_.flip(func)
	  - 创建一个函数，调用func时候接收翻转的参数。

	参数
	  - func (Function): 要翻转参数的函数。

	返回
	  - (Function): 返回新的函数。

	例子
		var flipped = _.flip(function() {
			return _.toArray(arguments);
		});

		flipped('a', 'b', 'c', 'd');
		// => ['d', 'c', 'b', 'a']
*/
