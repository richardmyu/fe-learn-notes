// // catch
// new Promise((res, rej) => {
// 	rej(1);
// }).catch(err => {
// 	console.log(err)
// })

// // 等价方法 1
// new Promise((res, rej) => {
// 	rej(2);
// }).then(null, err => {
// 	console.log(err)
// })

// // 等价方法 2
// new Promise((res, rej) => {
// 	rej(3);
// }).then(undefined, err => {
// 	console.log(err)
// })

// // 等价方法 3
// new Promise((res, rej) => {
// 	rej(4);
// }).then(() => { }, err => {
// 	console.log(err)
// })

// // 状态固定，再抛出错误
// new Promise((res, rej) => {
// 	res(1);
// 	throw new Error('err res');
// }).then(res => {
// 	console.log('res-res', res)
// }).catch(err => {
// 	console.log('res-err', err)
// });

// new Promise((res, rej) => {
// 	throw new Error('err res');
// 	res(11);
// }).then(res => {
// 	console.log('res-res', res)
// }).catch(err => {
// 	console.log('res-err', err)
// });

// new Promise((res, rej) => {
// 	rej(2);
// 	throw new Error('err res');
// }).then(res => {
// 	console.log('rej-res', res)
// }).catch(err => {
// 	console.log('rej-err', err)
// });

new Promise((res, rej) => {
	rej(22);
	setTimeout(() => {
		throw new Error('err res');
	}, 0)
}).then(res => {
	console.log('rej-res', res)
}).catch(err => {
	console.log('rej-err', err)
});

// new Promise((res, rej) => {
// 	console.log("初始化");
// 	res();
// }).then(() => {
// 	throw new Error("哪里不对");
// 	console.log("执行【这个】");
// }).catch(err => {
// 	console.log("执行【那个】");
// }).then(() => {
// 	console.log("不管你们执行不执行，反正我要执行")
// }).then(() => {
// 	console.log("有点不信邪")
// }).then(() => {
// 	console.log("哇咔咔")
// });
