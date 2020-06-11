new Promise((res, rej) => {
	const num = Math.random();
	if (num > 0.5) {
		res(1);
	} else {
		rej(0);
	}
}).then(res => {
	console.log("resolve: ", res)
}, err => {
	console.log("reject: ", err)
})

const p1 = new Promise((res, rej) => {
	const timer = setTimeout(() => {
		clearTimeout(timer)
		res(1);
	}, 2000)
})

const p2 = new Promise((res, rej) => {
	res(p1)
})

const p2then = p2.then(res => {
	console.log("res: ", res)
})

p2then.catch(err => {
	console.log(err)
}).finally(() => {
	console.log(p2)
	console.log(p2then)
})
