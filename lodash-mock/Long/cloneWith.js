/*
	_.cloneWith(value, [customizer])
	  - 这个方法类似 _.clone，除了它接受一个 customizer 定制返回的克隆值。 如果 customizer 返回 undefined 将会使用拷贝方法代替处理。 customizer 调用4个参数： (value [, index|key, object, stack])。

	参数
	  - value (*): 要克隆的值。
	  - [customizer] (Function): 用来自定义克隆的函数。

	返回
	  - (*): 返回克隆值。

	例子
		function customizer(value) {
			if (_.isElement(value)) {
				return value.cloneNode(false);
			}
		}

		var el = _.cloneWith(document.body, customizer);

		console.log(el === document.body);
		// => false
		console.log(el.nodeName);
		// => 'BODY'
		console.log(el.childNodes.length);
		// => 0
*/
