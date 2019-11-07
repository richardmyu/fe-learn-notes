/*
	_.castArray(value)
	  - 如果 value 不是数组, 那么强制转为数组。

	参数
	  - value (*): 要处理的值。

	返回
	  - (Array): 返回转换后的数组。

	例子
		_.castArray(1);
		// => [1]

		_.castArray({ 'a': 1 });
		// => [{ 'a': 1 }]

		_.castArray('abc');
		// => ['abc']

		_.castArray(null);
		// => [null]

		_.castArray(undefined);
		// => [undefined]

		_.castArray();
		// => []

		var array = [1, 2, 3];
		console.log(_.castArray(array) === array);
		// => true
*/
