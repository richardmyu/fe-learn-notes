/**
 * @description 拒绝事件-node 中捕获
 */

const process = require("process");

process.on("rejectionhandled", (reason, promise) => {
	console.log('rejectionhandled: ---', reason);
});


process.on("unhandledrejection", (reason, promise) => {
	console.log('unhandledrejection: ---', reason);
});

function foo() {
	return Promise.reject("Hello")
}

let fn = foo();

setTimeout(() => {
	fn.catch(err => {
		console.log('err---', err)
	})
}, 3000)
