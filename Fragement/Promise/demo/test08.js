/**
 * @description 拒绝事件-node 中捕获
 */

const process = require("process");

process.on("rejectionhandled", event => {
	console.log('rejectionhandled: ---', event.reason);
	event.preventDefault();
});


process.on("unhandledrejection", event => {
	console.log('unhandledrejection: ---', event.reason);
	event.preventDefault();
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
