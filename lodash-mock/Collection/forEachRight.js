/*
	_.forEachRight(collection, [iteratee=_.identity])
	  - 这个方法类似 _.forEach，不同之处在于， _.forEachRight 是从右到左遍历集合中每一个元素的。

	别名
	_.eachRight

	参数
	  - collection (Array|Object): 一个用来迭代的集合。
	  - [iteratee=_.identity] (Function): 每次迭代调用的函数。

	返回
	  - (*): 返回集合 collection。

	例子
		_.forEachRight([1, 2], function(value) {
			console.log(value);
		});
		// => Logs `2` then `1`.
*/
