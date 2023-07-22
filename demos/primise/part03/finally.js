const p1 = new Promise((res, rej) => {
	const num = Math.random();
	if (num > 0.5) {
		res(1);
	} else {
		rej(0);
	}
});

const p2 = p1.then(res => {
	console.log("then ", res);
});

const p3 = p2.catch(err => {
	console.log("catch ", err);
});

const p4 = p3.finally((str) => {
	console.log("finally ", str);
})

setTimeout(() => {
	console.log("p1 ", p1);
	console.log("p2 ", p2);
	console.log("p3 ", p3);
	console.log("p4 ", p4);
}, 1000)
