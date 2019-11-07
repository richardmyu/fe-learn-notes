/*
	_.ary(func, [n=func.length])
	  - 创建一个调用func的函数。调用func时最多接受 n个参数，忽略多出的参数。

	参数
	  - func (Function): 需要被限制参数个数的函数。
	  - [n=func.length] (number): 限制的参数数量。

	返回
	  - (Function): 返回新的覆盖函数。

	例子
		_.map(['6', '8', '10'], _.ary(parseInt, 1));
		// => [6, 8, 10]
*/
