/*
	_.defer(func, [args])
	  - 推迟调用func，直到当前堆栈清理完毕。 调用时，任何附加的参数会传给func。

	参数
	  - func (Function): 要延迟的函数。
	  - [args] (...*): 会在调用时传给 func 的参数。

	返回
	  - (number):返回计时器 id。

	例子
		_.defer(function(text) {
			console.log(text);
		}, 'deferred');
		// => 一毫秒或更久一些输出 'deferred'。
*/
