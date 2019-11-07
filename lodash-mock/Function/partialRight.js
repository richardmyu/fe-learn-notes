/*
	_.partialRight(func, [partials])
	  - 这个函数类似 _.partial，除了预设参数被附加到接受参数的后面。

	这个 _.partialRight.placeholder 的值，默认是以 _ 作为附加部分参数的占位符。

	注意: 这个方法不会设置 "length" 到函数上。

	参数
	  - func (Function): 需要预设的函数。
	  - [partials] (...*): 预设的参数。

	返回
	  - (Function):返回预设参数的函数。

	例子
		var greet = function(greeting, name) {
			return greeting + ' ' + name;
		};

		var greetFred = _.partialRight(greet, 'fred');
		greetFred('hi');
		// => 'hi fred'

		// 使用了占位符。
		var sayHelloTo = _.partialRight(greet, 'hello', _);
		sayHelloTo('fred');
		// => 'hello fred'
*/
