const p1 = new Promise((res, rej) => {
	const timer = setTimeout(() => {
		clearTimeout(timer);
		// res(1);
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

const p = Promise.race([p1, p2, p3]);

p.then(res => {
	console.log("==== p.then ====");
	console.log("p-res: ", res);
	console.log("p1 ", p1);
	console.log("p2 ", p2);
	console.log("p3 ", p3);
	console.log("p ", p);
}).catch(err => [
	console.log(err)
]).finally(() => {
	const timer = setTimeout(() => {
		clearTimeout(timer);
		console.log("==== p.finally ====");
		console.log("p1 ", p1);
		console.log("p2 ", p2);
		console.log("p3 ", p3);
		console.log("p ", p);
	}, 4000);
});
