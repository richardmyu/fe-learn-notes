/*
	_.partial(func, [partials])
	  - 创建一个函数。 该函数调用 func，并传入预设的 partials 参数。 这个方法类似 _.bind，除了它不会绑定 this。

	这个 _.partial.placeholder 的值，默认是以 _ 作为附加部分参数的占位符。

	注意: 这个方法不会设置 "length" 到函数上。

	参数
	  - func (Function): 需要预设的函数
	  - [partials] (...*): 预设的参数

	返回
	  - (Function): 返回预设参数的函数。

	例子
		var greet = function(greeting, name) {
			return greeting + ' ' + name;
		};

		var sayHelloTo = _.partial(greet, 'hello');
		sayHelloTo('fred');
		// => 'hello fred'

		// 使用了占位符。
		var greetFred = _.partial(greet, _, 'fred');
		greetFred('hi');
		// => 'hi fred'
*/
