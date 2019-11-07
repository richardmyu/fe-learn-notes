/*
	_.now()
	  - 获得 Unix 纪元 (1 January 1970 00:00:00 UTC) 直到现在的毫秒数。

	返回
	  - (number): 返回时间戳。

	例子
		_.defer(function(stamp) {
			console.log(_.now() - stamp);
		}, _.now());
		// => 记录延迟函数调用的毫秒数
*/
