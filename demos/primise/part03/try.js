const f = () => console.log("hello");

// const f = () => {
// 	setTimeout(() => {
// 		console.log("hello")
// 	})
// };


// Promise.resolve().then(f);

// 1
(async () => f())().then(res => {
	console.log("稍后出场吧", res)
});

// 2
(() => new Promise(res => res(f())))();

// try
Promise.try = function (fn) {
	return new Promise(res => res(fn()))
};
Promise.try(f);


console.log('world');
