const p1 = new Promise((res, rej) => {
	const timer = setTimeout(() => {
		clearTimeout(timer);
		rej(1);
	}, 1000)
});

const p2 = new Promise((res, rej) => {
	const timer = setTimeout(() => {
		clearTimeout(timer);
		res(2);
	}, 2000)
});

const p3 = new Promise((res, rej) => {
	const timer = setTimeout(() => {
		clearTimeout(timer);
		res(3);
	}, 3000)
});

const p = Promise.allSettled([p1, p2, p3]);

p.then(res => {
	console.log("p-res: ", res);
	console.log("p1 ", p1);
	console.log("p2 ", p2);
	console.log("p3 ", p3);
	console.log("p ", p);
});
