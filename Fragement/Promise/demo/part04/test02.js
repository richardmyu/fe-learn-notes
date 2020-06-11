/**
 * @description 拒绝事件-浏览器中捕获
 */

console.log(window.onrejectionhandled)
console.log(window.onunhandledrejection)
console.log(window)
window.addEventListener("rejectionhandled", event => {
	console.log('rejectionhandled: ', event)
}, false)


window.addEventListener("unhandledrejection", event => {
	console.log('unhandledrejection: ', event)
}, false)

function foo() {
	return Promise.reject("Hello")
}

let fn = foo();

setTimeout(() => {
	fn.catch(err => {
		console.log('---', err)
	})
}, 3000)

// var unhandledRejections = new Map();

// window.addEventListener('unhandledrejection', event => {
// 	console.log('unhandledrejection fired: ' + event.reason);
// 	// Keep track of rejected promises by adding them to the Map.
// 	unhandledRejections.set(event.promise, event.reason);
// });

// window.addEventListener('rejectionhandled', event => {
// 	console.log('rejectionhandled fired: ' + event.reason);
// 	// If a previously rejected promise is handled, remove it from the Map.
// 	unhandledRejections.delete(event.promise);
// });

// function generateRejectedPromise(isEventuallyHandled) {
// 	// Create a promise which immediately rejects with a given reason.
// 	var rejectedPromise = Promise.reject('Error at ' +
// 		new Date().toLocaleTimeString());

// 	if (isEventuallyHandled) {
// 		// We need to handle the rejection "after the fact" in order to trigger a
// 		// unhandledrejection followed by rejectionhandled. Here we simulate that
// 		// via a setTimeout(), but in a real-world system this might take place due
// 		// to, e.g., fetch()ing resources at startup and then handling any rejected
// 		// requests at some point later on.
// 		setTimeout(() => {
// 			// We need to provide an actual function to .catch() or else the promise
// 			// won't be considered handled.
// 			rejectedPromise.catch(() => { });
// 		}, 1);
// 	}
// }

// function reportUnhandledRejections() {
// 	console.log('[Unhandled Rejections]');
// 	for (var reason of unhandledRejections.values()) {
// 		console.log(' ', reason);
// 	}
// 	unhandledRejections.clear();
// }

// document.querySelector('#handled').addEventListener('click', () => {
// 	generateRejectedPromise(true);
// });

// document.querySelector('#unhandled').addEventListener('click', () => {
// 	generateRejectedPromise(false);
// });

// document.querySelector('#report').addEventListener('click', () => {
// 	reportUnhandledRejections();
// });
