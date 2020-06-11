/**
 * @description 错误传递
 */

//  每一个都有返回值
/* new Promise((res, rej) => {
	let num = Math.random();
	if (num > 0.5) {
		res(1);
	} else {
		rej(0);
	}
}).then((res) => {
	console.log('promise1--res1: ', res);

	return res;
}, (err) => {
	console.log('promise1--err1: ', err);

	return err;
}).then((res) => {
	console.log('promise1--res2: ', res);

	return res;
}, (err) => {
	console.log('promise1--err2: ', err);

	return err;
}).then((res) => {
	console.log('promise1--res3: ', res);

}, (err) => {
	console.log('promise1--err3: ', err);

}).catch(err => {
	console.log('promise1--catch: ', err);

}); */

// onReject 没有返回值
/* new Promise((res, rej) => {
	let num = Math.random();
	if (num > 0.5) {
		res(1);
	} else {
		rej(0);
	}
}).then((res) => {
	console.log('promise1--res1: ', res);

	return res;
}, (err) => {
	console.log('promise1--err1: ', err);

}).then((res) => {
	console.log('promise1--res2: ', res)

	return res;
}, (err) => {
	console.log('promise1--err2: ', err);

}).then((res) => {
	console.log('promise1--res3: ', res);

}, (err) => {
	console.log('promise1--err3: ', err);

}).catch(err => {
	console.log('promise1--catch: ', err);

}); */

// 没有层层设置 onReject
/* new Promise((res, rej) => {
	let num = Math.random();
	if (num > 0.5) {
		res(1);
	} else {
		rej(0);
	}
}).then((res) => {
	console.log('promise2--res1: ', res);

	return res;
}).then((res) => {
	console.log('promise2--res2: ', res);

	return res;
}).then((res) => {
	console.log('promise2--res3: ', res);

}, (err) => {
	console.log('promise2--err3: ', err);

}).catch(err => {
	console.log('promise2--catch: ', err);

}); */

// 没有设置 onReject
new Promise((res, rej) => {
	let num = Math.random();
	if (num > 0.5) {
		res(1);
	} else {
		rej(0);
	}
}).then((res) => {
	console.log('promise3--res1: ', res);

	return res;
}).then((res) => {
	console.log('promise3--res2: ', res);

	return res;
}).then((res) => {
	console.log('promise3--res3: ', res);

}).catch(err => {
	console.log('promise3--catch: ', err);

})

