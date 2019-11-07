/*
	_.delay(func, wait, [args])
	  - 延迟 wait 毫秒后调用 func。 调用时，任何附加的参数会传给func。

	参数
	  - func (Function): 要延迟的函数。
	  - wait (number): 要延迟的毫秒数。
	  - [args] (...*): 会在调用时传入到 func 的参数。

	返回
	  - (number): 返回计时器 id

	例子
		_.delay(function(text) {
			console.log(text);
		}, 1000, 'later');
		// => 一秒后输出 'later'。
*/
