new Promise((res, rej) => {
	const num = Math.random();
	if (num > 0.5) {
		res(1);
	} else {
		rej(0);
	}
}).then(res => {
	console.log("resolve: ", res);
}).catch(err => {
	console.log("reject/err: ", err);
}).finally((str) => {
	console.log("啦啦啦", str);
});

// finally 也会返回 promise
const p1 = new Promise((res, rej) => {
	res(1);
});

const p2 = p1.then(res => {
	console.log("res ", res);
	console.log("p1 ", p1);
	console.log("p2 ", p2);
	console.log("==== --- ====");
});

const p3 = p2.catch(err => {
	console.log("err ", err);
	console.log("p1 ", p1);
	console.log("p2 ", p2);
	console.log("p3 ", p3);
	console.log("==== --- ====");
});

const p4 = p3.finally((str) => {
	console.log("str ", str);
	console.log("p1 ", p1);
	console.log("p2 ", p2);
	console.log("p3 ", p3);
	console.log("p4 ", p4);
	console.log("==== --- ====");
})

setTimeout(() => {
	console.log("p1 ", p1);
	console.log("p2 ", p2);
	console.log("p3 ", p3);
	console.log("p4 ", p4);
}, 1000)
