// const promise = new Promise((res, rej) => {
// 	console.log("同步执行")
// 	const timer = setTimeout(() => {
// 		clearTimeout(timer);
// 		const num = Math.random();
// 		if (num > 0.5) {
// 			debugger;
// 			res(1);
// 			debugger;
// 		} else {
// 			debugger;
// 			rej(0);
// 			debugger;
// 		}
// 	}, 1000)
// })
// console.log("我在 promise 外面哟");
// promise.then(res => {
// 	console.log("异步执行");
// 	console.log("result: ", res);
// 	debugger
// }).catch(err => {
// 	console.log("err info: ", err)
// })

const promiseErr = new Promise((res, rej) => {
	const num = Math.random();
	if (num < 1) {
		debugger;
		// num();
		throw Error("err...");
	}
}).then(() => {
	debugger;
}, err => {
	debugger;
	console.log("then err: ", err, promiseErr)
}).catch(err => {
	debugger;
	console.log(err, promiseErr)
})
