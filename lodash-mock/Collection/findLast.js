/*
	_.findLast(collection, [predicate=_.identity], [fromIndex=collection.length-1])
	  - 这个方法类似 _.find ，不同之处在于， _.findLast是从右至左遍历collection （集合）元素的。

	参数
	  - collection (Array|Object): 一个用来迭代的集合。
	  - [predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。
	  - [fromIndex=collection.length-1] (number): 开始搜索的索引位置。

	返回
	  - (*): 返回匹配元素，否则返回 undefined。

	例子
		_.findLast([1, 2, 3, 4], function(n) {
			return n % 2 == 1;
		});
		// => 3
*/
