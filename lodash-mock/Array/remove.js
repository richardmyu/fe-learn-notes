/*
	_.remove(array, [predicate=_.identity])
	  - 移除数组中predicate（断言）返回为真值的所有元素，并返回移除元素组成的数组。predicate（断言） 会传入3个参数： (value, index, array)。

	Note: 和 _.filter不同, 这个方法会改变数组 array。使用 _.pull来根据提供的value值从数组中移除元素。

	参数
	  - array (Array): 要修改的数组。
	  - [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。

	返回
	  - (Array): 返回移除元素组成的新数组。

	例子
		var array = [1, 2, 3, 4];
		var evens = _.remove(array, function(n) {
			return n % 2 == 0;
		});

		console.log(array);
		// => [1, 3]

		console.log(evens);
		// => [2, 4]
*/
