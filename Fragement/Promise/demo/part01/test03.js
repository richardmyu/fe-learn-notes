/**
 * @description promise 的链式调用-2
 */

// 回调
const doSomething = (fn, cb) => {
	let num = Math.random();
	console.log("doSomething：", num)
	try {
		fn(num);
	} catch (err) {
		cb(err);
	}
}

const doSomethingElse = (result, fn, cb) => {
	if (!result) {
		return
	}
	let newResult = result.toFixed(2)
	console.log("doSomethingElse：", newResult)
	try {
		fn(newResult);
	} catch (err) {
		cb(err);
	}
}

const doThirdThing = (newResult, fn, cb) => {
	if (!newResult) {
		return
	}
	let finalResult = newResult * 100
	console.log("doThirdThing：", finalResult)
	try {
		fn(finalResult);
	} catch (err) {
		cb(err);
	}
}

const failureCallback = (err) => {
	console.log('Error: ', err);
}

// 正确调用
doSomething(function (result) {
	doSomethingElse(result, function (newResult) {
		doThirdThing(newResult, function (finalResult) {
			console.log('Got the final result: ' + finalResult);
		}, failureCallback);
	}, failureCallback);
}, failureCallback);

console.log("==== ---- ====");

// 错误调用(doThirdThing 第二个参数不是函数，非函数使用()执行会报错)
doSomething(function (result) {
	doSomethingElse(result, function (newResult) {
		doThirdThing(newResult, console.log('Got the final result: '), failureCallback);
	}, failureCallback);
}, failureCallback);


