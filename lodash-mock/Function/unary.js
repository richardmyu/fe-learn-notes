/*
	_.unary(func)
	  - 创建一个最多接受一个参数的函数，忽略多余的参数。

	参数
	  - func (Function): 要处理的函数。

	返回
	  - (Function): 返回新函数。

	例子
		_.map(['6', '8', '10'], _.unary(parseInt));
		// => [6, 8, 10]
*/
