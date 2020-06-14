// 参数是一个 Promise 实例
const p1 = new Promise((res, rej) => {
	res(1);
});

const p2 = Promise.reject(p1);

p2.catch(err => {
	console.log("p2-err: ", err)
}).finally(() => {
	console.log("p1 ", p1);
	console.log("p2 ", p2);
});

// 带 then 的 promise
const p11 = new Promise((res, rej) => {
	res(1);
}).then(res => {
	console.log("p11-res: ", res);
});

const p22 = Promise.reject(p11);

p22.catch(err => {
	console.log("p22-err ", err)
}).finally(() => {
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

const p222 = Promise.reject(p111);

p222.catch(err => {
	console.log("p222: ", err);
}).finally(() => {
	console.log("p111 ", p111);
	console.log("p222 ", p222);
});

// 参数是一个 thenable 对象
const p3 = {
	then: function (resolve, reject) {
		resolve(11);
	}
};

const p4 = Promise.reject(p3);

p4.catch(res => {
	console.log("p4-res: ", res);
}).finally(() => {
	console.log("p3 ", p3);
	console.log("p4 ", p4);
});

// 参数不是具有 then 方法的对象，或根本就不是对象
const p5 = {
	say: function () {
		return 'hi';
	}
}
const p6 = Promise.reject(p5);

p6.catch(res => {
	console.log("p6-res: ", res);
}).finally(() => {
	console.log("p5 ", p5);
	console.log("p6 ", p6);
});

const p7 = 123
const p8 = Promise.reject(p7);

p8.catch(res => {
	console.log("p8-res: ", res);
}).finally(() => {
	console.log("p7 ", p7);
	console.log("p8 ", p8);
});

// 不带有任何参数
const p9 = Promise.reject();
p9.catch(err => {
	console.log("p9-err: ", err);
}).finally(() => {
	console.log("p9 ", p9);
});

// 函数
const p10 = Promise.reject(() => {
	console.log("---");
});
p10.catch(err => {
	console.log("p10-err: ", err);
}).finally(() => {
	console.log("p10 ", p10);
});
