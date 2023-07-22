const promise = new Promise((res, rej) => {
	console.log("同步执行")
	const timer = setTimeout(() => {
		clearTimeout(timer);
		const num = Math.random();
		if (num > 0.5) {
			debugger;
			res(1);
			debugger;
		} else {
			debugger;
			rej(0);
			debugger;
		}
	}, 1000)
})
console.log("我在 promise 外面哟");
promise.then(res => {
	console.log("异步执行");
	console.log("result: ", res);
	debugger
}).catch(err => {
	console.log("err info: ", err)
})

// 异常
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

// 同时调用 resolve 和 reject
const p1 = new Promise((res, rej) => {
	res(1);
	rej(1);
});

p1.then(res => {
	console.log(res)
}).catch(err => {
	console.log(err)
})

p1.finally(() => {
	console.log(p1)
});

const p2 = new Promise((res, rej) => {
	rej(2);
	res(2);
});

p2.then(res => {
	console.log(res)
}).catch(err => {
	console.log(err)
})

p2.finally(() => {
	console.log(p2)
});
