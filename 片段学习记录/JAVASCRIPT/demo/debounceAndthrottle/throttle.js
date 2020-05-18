// 第一版
// 使用时间戳
// function throttle(func, wait) {
// 	let context;
// 	let args;
// 	let previous = 0;

// 	return function () {
// 		let now = +new Date();
// 		context = this;
// 		args = arguments;
// 		if (now - previous > wait) {
// 			func.apply(context, args);
// 			previous = now;
// 		}
// 	}
// }

// // 第二版
// // 使用定时器
// function throttle(func, wait) {
// 	let context, args, timeout;

// 	return function () {
// 		context = this;
// 		args = arguments;
// 		if (!timeout) {
// 			timeout = setTimeout(function () {
// 				clearTimeout(timeout)
// 				timeout = null;
// 				func.apply(context, args)
// 			}, wait)
// 		}
// 	}
// }

// // 第三版
// // 就是鼠标移入能立刻执行，停止触发的时候还能再执行一次！
// function throttle(func, wait) {
// 	let timeout, context, args;
// 	let previous = 0;

// 	let later = function () {
// 		previous = +new Date();
// 		timeout = null;
// 		func.apply(context, args);
// 	}

// 	let throttled = function () {
// 		let now = +new Date();

// 		// 下次触发剩余时间
// 		let remaining = wait - (now - previous);
// 		context = this;
// 		args = arguments;

// 		// 如果没有剩余时间或者修改了系统时间
// 		if (remaining <= 0 || remaining > wait) {
// 			if (timeout) {
// 				clearTimeout(timeout);
// 				timeout = null;
// 			}
// 			previous = now;
// 			func.apply(context, args);
// 		} else if (!timeout) {
// 			timeout = setTimeout(later, remaining);
// 		}
// 	};

// 	return throttled;
// }

// // 第四版
// // 增加第三个参数
// function throttle(func, wait, options) {
// 	let timeout, context, args;
// 	let previous = 0;
// 	if (!options) {
// 		options = {}
// 	} else if (options.leading === false && options.trailing === false) {
// 		return new Error('不能同时设置 leading 和 trailing 为 false')
// 	}

// 	let later = function () {
// 		previous = options.leading === false ? 0 : new Date().getTime();
// 		timeout = null;
// 		func.apply(context, args);
// 		if (!timeout) {
// 			context = args = null;
// 		}
// 	};

// 	let throttled = function () {
// 		let now = new Date().getTime();
// 		if (!previous && options.leading === false) {
// 			previous = now;
// 		}
// 		let remaining = wait - (now - previous);
// 		context = this;
// 		args = arguments;
// 		if (remaining <= 0 || remaining > wait) {
// 			if (timeout) {
// 				clearTimeout(timeout);
// 				timeout = null;
// 			}

// 			previous = now;
// 			func.apply(context, args);
// 			if (!timeout) {
// 				context = args = null
// 			} else if (!timeout && options.trailing !== false) {
// 				timeout = setTimeout(later, remaining)
// 			}
// 		}
// 	};

// 	return throttled;
// }

// 第五版
function throttle(func, wait, options) {
	let timeout, context, args;
	let previous = 0;
	if (!options) {
		options = {}
	} else if (options.leading === false && options.trailing === false) {
		return new Error('不能同时设置 leading 和 trailing 为 false')
	}

	let later = function () {
		previous = options.leading === false ? 0 : new Date().getTime();
		timeout = null;
		func.apply(context, args);
		if (!timeout) {
			context = args = null;
		}
	};

	let throttled = function () {
		let now = new Date().getTime();
		if (!previous && options.leading === false) {
			previous = now;
		}
		let remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}

			previous = now;
			func.apply(context, args);
			if (!timeout) {
				context = args = null
			} else if (!timeout && options.trailing !== false) {
				timeout = setTimeout(later, remaining)
			}
		}
	};

	throttled.cancel = function () {
		clearTimeout(timeout);
		previous = 0;
		timeout = null;
	};

	return throttled;
}


// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
// _.throttle = function (func, wait, options) {
// 	var context, args, result;
// 	var timeout = null;
// 	var previous = 0;
// 	if (!options) options = {};
// 	var later = function () {
// 		previous = options.leading === false ? 0 : _.now();
// 		timeout = null;
// 		result = func.apply(context, args);
// 		if (!timeout) context = args = null;
// 	};
// 	return function () {
// 		var now = _.now();
// 		if (!previous && options.leading === false) previous = now;
// 		var remaining = wait - (now - previous);
// 		context = this;
// 		args = arguments;
// 		if (remaining <= 0 || remaining > wait) {
// 			if (timeout) {
// 				clearTimeout(timeout);
// 				timeout = null;
// 			}
// 			previous = now;
// 			result = func.apply(context, args);
// 			if (!timeout) context = args = null;
// 		} else if (!timeout && options.trailing !== false) {
// 			timeout = setTimeout(later, remaining);
// 		}
// 		return result;
// 	};
// };

export default throttle
