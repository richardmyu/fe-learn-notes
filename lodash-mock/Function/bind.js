/*
	_.bind(func, thisArg, [partials])
	  - 创建一个调用func的函数，thisArg绑定func函数中的 this (this的上下文为thisArg) ，并且func函数会接收partials附加参数。

	_.bind.placeholder值，默认是以 _ 作为附加部分参数的占位符。

	注意: 不同于原生的 Function#bind，这个方法不会设置绑定函数的 "length" 属性。

	参数
	  - func (Function): 绑定的函数。
	  - thisArg (*): func 绑定的this对象。
	  - [partials] (...*): 附加的部分参数。

	返回
	  - (Function): 返回新的绑定函数。

	例子
		var greet = function(greeting, punctuation) {
			return greeting + ' ' + this.user + punctuation;
		};

		var object = { 'user': 'fred' };

		var bound = _.bind(greet, object, 'hi');
		bound('!');
		// => 'hi fred!'

		// Bound with placeholders.
		var bound = _.bind(greet, object, _, '!');
		bound('hi');
		// => 'hi fred!'
*/
