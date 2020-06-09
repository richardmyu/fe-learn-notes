/**
 * @description promise 的链式调用-1
 */

const doSomething = () => {
	return new Promise((res, rej) => {
		let num = Math.random();
		if (num > 0.5) {
			res(1);
		} else {
			rej(0);
		}
	})
}

const successCallback = (str) => {
	console.log("success: ", str);
}

const failureCallback = (str) => {
	console.log("failure: ", str);
}

const promise = doSomething();

const promise2 = promise.then(successCallback, failureCallback);

console.log('promise: ');
console.dir(promise);
console.log('promise2: ');
console.dir(promise2);
