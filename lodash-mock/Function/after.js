/*
	_.after(n, func)
	  - _.before的反向函数;此方法创建一个函数，当他被调用n或更多次之后将马上触发func 。

	参数
	  - n (number): func 方法应该在调用多少次后才执行。
	  - func (Function): 用来限定的函数。

	返回
	  - (Function): 返回新的限定函数。

	例子
		var saves = ['profile', 'settings'];

		var done = _.after(saves.length, function() {
			console.log('done saving!');
		});

		_.forEach(saves, function(type) {
			asyncSave({ 'type': type, 'complete': done });
		});
		// => Logs 'done saving!' after the two async saves have completed.
*/
