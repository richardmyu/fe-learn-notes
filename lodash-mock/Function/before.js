/*
	_.before(n, func)
	  - 创建一个调用func的函数，通过this绑定和创建函数的参数调用func，调用次数不超过 n 次。 之后再调用这个函数，将返回一次最后调用func的结果。

	参数
	  - n (number): 超过多少次不再调用func（限制调用func 的次数）。
	  - func (Function): 限制执行的函数。

	返回
	  - (Function): 返回新的限定函数。

	例子
		jQuery(element).on('click', _.before(5, addContactToList));
		// => allows adding up to 4 contacts to the list
*/
