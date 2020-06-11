new Promise((res, rej) => {
	const num = Math.random();
	if (num > 0.5) {
		res(1);
	} else {
		rej(0)
	}
}).then(res => {
	console.log("resolve: ", res)
}).catch(err => {
	console.log("reject/err: ", err)
}).finally(() => {
	console.log("啦啦啦")
})
