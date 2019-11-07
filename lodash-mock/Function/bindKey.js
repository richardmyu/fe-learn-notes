/*
	_.bindKey(object, key, [partials])
	  - 创建一个函数,在object[key]上通过接收partials附加参数，调用这个方法。

	这个方法与 _.bind 的不同之处在于允许重新定义绑定函数即使它还不存在。 浏览 Peter Michaux's article 了解更多详情。

	_.bind.placeholder值，默认是以 _ 作为附加部分参数的占位符。

	参数
	  - object (Object): 需要绑定函数的对象。
	  - key (string): 需要绑定函数对象的键。
	  - [partials] (...*): 附加的部分参数。

	返回
	  - (Function): 返回新的绑定函数。

	例子
		var object = {
			'user': 'fred',
			'greet': function(greeting, punctuation) {
				return greeting + ' ' + this.user + punctuation;
			}
		};

		var bound = _.bindKey(object, 'greet', 'hi');
		bound('!');
		// => 'hi fred!'

		object.greet = function(greeting, punctuation) {
			return greeting + 'ya ' + this.user + punctuation;
		};

		bound('!');
		// => 'hiya fred!'

		// Bound with placeholders.
		var bound = _.bindKey(object, 'greet', _, '!');
		bound('hi');
		// => 'hiya fred!'
*/
