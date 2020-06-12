const sp1 = 123;
const sp2 = "hello";
// const sp3 = { name: "张三" };
const sp3 = Promise.reject('ggg');

const sp = Promise.all([sp1, sp2, sp3]);

setTimeout(() => {
	console.log(sp);
})

//
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = new Promise((res, rej) => {
	const num = Math.random();
	if (num > 0.5) {
		res(1);
	} else {
		rej(0);
	}
}).then(res => {
	console.log(res);
});

const p = Promise.all([p1, p2, p3]);

setTimeout(() => {
	console.log(p1);
	console.log(p2);
	console.log(p3);
	console.log(p);
});

const pp1 = Promise.resolve(1);
const pp2 = Promise.resolve(2);
const pp3 = new Promise((res, rej) => {
	const num = Math.random();
	if (num > 0.5) {
		res(1);
	} else {
		rej(0);
	}
}).then(res => {
	console.log(res);
}).catch(err => {
	console.log(err);
});

const pp = Promise.all([pp1, pp2, pp3]);

setTimeout(() => {
	console.log(pp1);
	console.log(pp2);
	console.log(pp3);
	console.log(pp);
});

const rejP = Promise.reject(1).catch(err => {
	console.log(err);
})

setTimeout(() => {
	console.log(rejP);
});
