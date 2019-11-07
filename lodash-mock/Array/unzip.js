/*
	_.unzip(array)
	  - 这个方法类似于 _.zip，除了它接收分组元素的数组，并且创建一个数组，分组元素到打包前的结构。（返回数组的第一个元素包含所有的输入数组的第一元素，第一个元素包含了所有的输入数组的第二元素，依此类推。）

	参数
	  - array (Array): 要处理的分组元素数组。

	返回
	  - (Array): 返回重组元素的新数组。

	例子
		var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
		// => [['fred', 30, true], ['barney', 40, false]]

		_.unzip(zipped);
		// => [['fred', 'barney'], [30, 40], [true, false]]
*/
