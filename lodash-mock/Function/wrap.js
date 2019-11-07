/*
	_.wrap(value, [wrapper=identity])
	  - 创建一个函数。提供的 value 包装在 wrapper 函数的第一个参数里。 任何附加的参数都提供给 wrapper 函数。 被调用时 this 绑定在创建的函数上。

	参数
	  - value (*): 要包装的值。
	  - [wrapper=identity] (Function): 包装函数。

	返回
	  - (Function): 返回新的函数。

	例子
		var p = _.wrap(_.escape, function(func, text) {
			return '<p>' + func(text) + '</p>';
		});

		p('fred, barney, & pebbles');
		// => '<p>fred, barney, &amp; pebbles</p>'
*/
