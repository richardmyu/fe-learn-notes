/*
	_.includes(collection, value, [fromIndex=0])
	  - 检查 value(值) 是否在 collection(集合) 中。如果 collection(集合)是一个字符串，那么检查 value（值，子字符串） 是否在字符串中， 否则使用 SameValueZero 做等值比较。 如果指定 fromIndex 是负数，那么从 collection(集合) 的结尾开始检索。

	参数
	  - collection (Array|Object|string): 要检索的集合。
	  - value (*): 要检索的值。
	  - [fromIndex=0] (number): 要检索的 索引位置。

	返回
	  - (boolean): 如果找到 value 返回 true， 否则返回 false。

	例子
		_.includes([1, 2, 3], 1);
		// => true

		_.includes([1, 2, 3], 1, 2);
		// => false

		_.includes({ 'user': 'fred', 'age': 40 }, 'fred');
		// => true

		_.includes('pebbles', 'eb');
		// => true
*/
