/*
	_.rest(func, [start=func.length-1])
	  - 创建一个函数，调用func时，this绑定到创建的新函数，并且start之后的参数作为数组传入。

	Note: 这个方法基于 rest parameter。

	参数
	  - func (Function): 要应用的函数。
	  - [start=func.length-1] (number): rest 参数的开始位置。

	返回
	  - (Function): 返回新的函数。

	例子
		var say = _.rest(function(what, names) {
			return what + ' ' + _.initial(names).join(', ') +
				(_.size(names) > 1 ? ', & ' : '') + _.last(names);
		});

		say('hello', 'fred', 'barney', 'pebbles');
		// => 'hello fred, barney, & pebbles'
*/
