/**
 * @description promise 的链式调用-2
 */

//  promise
const doSomething = () => {
	let num = Math.random();
	console.log("doSomething：", num)
	return Promise.resolve(num);
}

const doSomethingElse = (result) => {
	if (!result) {
		return
	}
	let newResult = result.toFixed(2)
	console.log("doSomethingElse：", newResult)
	// return Promise.resolve(newResult);
	// 进一步表明，then 内会自动创建一个新的 promise 并绑定
	return newResult;
}

const doThirdThing = (newResult) => {
	if (!newResult) {
		return
	}
	let finalResult = newResult * 100
	console.log("doThirdThing：", finalResult)
	// return Promise.resolve(finalResult);
	return finalResult;
}

const failureCallback = (err) => {
	console.log('Error: ', err);
}

doSomething()
	.then(result => doSomethingElse(result))
	.then(newResult => doThirdThing(newResult))
	.then(finalResult => {
		console.log(`Got the final result: ${finalResult}`);
	})
	.catch(failureCallback);


