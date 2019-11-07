/*
	_.forEach(collection, [iteratee=_.identity])
	  - 调用 iteratee 遍历 collection(集合) 中的每个元素， iteratee 调用3个参数： (value, index|key, collection)。 如果迭代函数（iteratee）显式的返回 false ，迭代会提前退出。

	注意: 与其他"集合"方法一样，类似于数组，对象的 "length" 属性也会被遍历。想避免这种情况，可以用 _.forIn 或者 _.forOwn 代替。

	别名
	_.each

	参数
	  - collection (Array|Object): 一个用来迭代的集合。
	  - [iteratee=_.identity] (Function): 每次迭代调用的函数。

	返回
	  - (*): 返回集合 collection。

	例子
		_([1, 2]).forEach(function(value) {
			console.log(value);
		});
		// => Logs `1` then `2`.

		_.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
			console.log(key);
		});
		// => Logs 'a' then 'b' (iteration order is not guaranteed).
*/
