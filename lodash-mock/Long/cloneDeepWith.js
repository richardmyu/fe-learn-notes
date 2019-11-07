/*
	_.cloneDeepWith(value, [customizer])
	  - 这个方法类似 _.cloneWith，除了它会递归克隆 value。

	参数
	  - value (*): 用来递归克隆的值。
	  - [customizer] (Function): 用来自定义克隆的函数。

	返回
	  - (*): 返回深度克隆后的值。

	例子
		function customizer(value) {
			if (_.isElement(value)) {
				return value.cloneNode(true);
			}
		}

		var el = _.cloneDeepWith(document.body, customizer);

		console.log(el === document.body);
		// => false
		console.log(el.nodeName);
		// => 'BODY'
		console.log(el.childNodes.length);
		// => 20
*/
