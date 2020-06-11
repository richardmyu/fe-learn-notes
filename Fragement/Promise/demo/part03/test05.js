/**
 * @description catch 的后续链式操作
 */
new Promise((res, rej) => {
	console.log("初始化");
	res();
}).then(() => {
	throw new Error("哪里不对");
	console.log("执行【这个】");
}).catch(err => {
	// console.log('err: ', err);
	console.log("执行【那个】");
}).then(() => {
	console.log("不管你们执行不执行，反正我要执行")
}).then(() => {
	console.log("有点不信邪")
}).then(() => {
	console.log("哇咔咔")
})
