// 第一版
// function debounce(func, wait) {
// 	let timeout;
// 	return function () {
// 		clearTimeout(timeout);
// 		timeout = setTimeout(func, wait);
// 	}
// }

// 第二版 增加 this
// function debounce(func, wait) {
// 	let timeout;
// 	return function () {
// 		let context = this;
// 		clearTimeout(timeout);
// 		timeout = setTimeout(function () {
// 			func.apply(context);
// 		}, wait);
// 	}
// }

// 第三版 增加 event
// function debounce(func, wait) {
// 	let timeout;
// 	return function () {
// 		let context = this;
// 		let args = arguments;

// 		clearTimeout(timeout);
// 		timeout = setTimeout(function () {
// 			func.apply(context, args);
// 		}, wait);
// 	}
// }

// 第四版
// 不希望非要等到事件停止触发后才执行，我希望立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行。
// immediate 参数判断是否是立刻执行
// function debounce(func, wait, immediate) {
// 	let timeout;
// 	return function () {
// 		let context = this;
// 		let args = arguments;

// 		if (timeout) {
// 			clearTimeout(timeout);
// 		}
// 		if (immediate) {
// 			// 如果已经执行，不再执行
// 			let callNow = !timeout;
// 			timeout = setTimeout(function () {
// 				timeout = null;
// 			}, wait);
// 			if (callNow) {
// 				func.apply(context, args);
// 			}
// 		} else {
// 			timeout = setTimeout(function () {
// 				func.apply(context, args);
// 			}, wait);
// 		}
// 	}
// }

// 第五版
// 返回值
// 当 immediate 为 false 的时候，因为使用了 setTimeout ，我们将 func.apply(context, args) 的返回值赋给变量，最后再 return 的时候，值将会一直是 undefined，所以我们只在 immediate 为 true 的时候返回函数的执行结果。
// function debounce(func, wait, immediate) {
// 	let timeout;
// 	let result;
// 	return function () {
// 		let context = this;
// 		let args = arguments;

// 		if (timeout) {
// 			clearTimeout(timeout);
// 		}
// 		if (immediate) {
// 			let callNow = !timeout;
// 			timeout = setTimeout(function () {
// 				timeout = null;
// 			}, wait);
// 			if (callNow) {
// 				result = func.apply(context, args);
// 			}
// 		} else {
// 			timeout = setTimeout(function () {
// 				func.apply(context, args);
// 			}, wait);
// 		}
// 		console.log('result', result)
// 		return result;
// 	}
// }

// 第六版
// 取消
function debounce(func, wait, immediate) {
	let timeout;
	let result;
	let context;
	let args;
	let debounce = function () {
		context = this;
		args = arguments;

		if (timeout) {
			clearTimeout(timeout);
		}

		if (immediate) {
			let callNow = !timeout;
			timeout = setTimeout(function () {
				timeout = null;
			}, wait);
			if (callNow) {
				result = func.apply(context, args);
			}
		} else {
			timeout = setTimeout(function () {
				func.apply(context, args);
			}, wait);
		}
		// console.log('result', result)
		return result;
	};

	debounce.cancel = function () {
		clearTimeout(timeout);
		timeout = null;
	};
	return debounce;
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// _.debounce = function (func, wait, immediate) {
// 	var timeout, args, context, timestamp, result;

// 	var later = function () {
// 		var last = _.now() - timestamp;

// 		if (last < wait && last >= 0) {
// 			timeout = setTimeout(later, wait - last);
// 		} else {
// 			timeout = null;
// 			if (!immediate) {
// 				result = func.apply(context, args);
// 				if (!timeout) context = args = null;
// 			}
// 		}
// 	};

// 	return function () {
// 		context = this;
// 		args = arguments;
// 		timestamp = _.now();
// 		var callNow = immediate && !timeout;
// 		if (!timeout) timeout = setTimeout(later, wait);
// 		if (callNow) {
// 			result = func.apply(context, args);
// 			context = args = null;
// 		}

// 		return result;
// 	};
// };

export default debounce
