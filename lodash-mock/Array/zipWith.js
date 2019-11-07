/*
	_.zipWith([arrays], [iteratee=_.identity])
	  - 这个方法类似于 _.zip，不同之处在于它接受一个 iteratee（迭代函数），来 指定分组的值应该如何被组合。 该iteratee调用每个组的元素： (...group).

	参数
	  - [arrays] (...Array): 要处理的数组。
	  - [iteratee=_.identity] (Function): 函数用来组合分组的值。

	返回
	  - (Array): 返回分组元素的新数组。

	例子
		_.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
			return a + b + c;
		});
		// => [111, 222]
*/
