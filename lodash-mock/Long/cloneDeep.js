/*
	_.cloneDeep(value)
	  - 这个方法类似 _.clone，除了它会递归拷贝 value。（也叫深拷贝）。

	参数
	  - value (*): 要深拷贝的值。

	返回
	  - (*): 返回拷贝后的值。

	例子
		var objects = [{ 'a': 1 }, { 'b': 2 }];

		var deep = _.cloneDeep(objects);
		console.log(deep[0] === objects[0]);
		// => false
*/
