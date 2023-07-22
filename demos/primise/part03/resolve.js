// 参数是一个 Promise 实例
const p1 = new Promise((res, rej) => {
	res(1);
});

const p2 = Promise.resolve(p1);

p2.then(res => {
	console.log("res: ", res);
	console.log("p1 ", p1);
	console.log("p2 ", p2);
});

// 带 then 的 promise
const p11 = new Promise((res, rej) => {
	res(1);
}).then(res => {
	console.log("p11-res: ", res);
	// return "noiii";
});

const p22 = Promise.resolve(p11);

p22.then(res => {
	console.log("res: ", res);
	console.log("p11 ", p11);
	console.log("p22 ", p22);
});

// 带 then catch 的 promise
const p111 = new Promise((res, rej) => {
	rej(1);
}).then(res => {
	console.log("p111-res: ", res);
}).catch(err => {
	console.log("p111-err: ", err);
	// return 'errrr';
});

const p222 = Promise.resolve(p111);

p222.then(res => {
	console.log("res: ", res);
	console.log("p111 ", p111);
	console.log("p222 ", p222);
});

// 参数是一个 thenable 对象
const p3 = {
	then: function (resolve, reject) {
		resolve(11);
	}
};

const p4 = Promise.resolve(p3);

p4.then(res => {
	console.log("p4-res: ", res);
	console.log("p3 ", p3);
	console.log("p4 ", p4);
});

// 参数不是具有 then 方法的对象，或根本就不是对象
const p5 = {
	say: function () {
		return 'hi';
	}
}
const p6 = Promise.resolve(p5);

p6.then(res => {
	console.log("p6-res: ", res);
	console.log("p5 ", p5);
	console.log("p6 ", p6);
});

const p7 = 123
const p8 = Promise.resolve(p7);

p8.then(res => {
	console.log("p8-res: ", res);
	console.log("p7 ", p7);
	console.log("p8 ", p8);
});

// 不带有任何参数
const p9 = Promise.resolve();
p9.then(res => {
	console.log("p9-res: ", res);
	console.log("p9 ", p9);
});

// 函数
const p10 = Promise.resolve(() => {
	console.log("---");
});
p10.then(res => {
	console.log();
	console.log("p10-res: ", res);
	console.log("p10 ", p10);
})
